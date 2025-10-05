'use client'

import { useState, useEffect } from 'react'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key
      if (/[0-9]/.test(key)) inputNumber(key)
      if (['+', '-', '*', '/'].includes(key)) performOperation(key)
      if (key === 'Enter' || key === '=') calculate()
      if (key === 'Escape') clear()
      if (key === '.') inputDot()
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [display, previousValue, operation, waitingForOperand])

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue?: number, secondValue?: number, operation?: string) => {
    const prev = firstValue ?? previousValue
    const current = secondValue ?? parseFloat(display)
    const op = operation ?? (arguments.length === 0 ? undefined : operation)

    if (prev === null || !op) return current

    let result = 0

    switch (op) {
      case '+': result = prev + current; break
      case '-': result = prev - current; break
      case '*': result = prev * current; break
      case '/': result = prev / current; break
      default: return current
    }

    const expression = `${prev} ${op} ${current} = ${result}`
    setHistory(prev => [expression, ...prev.slice(0, 4)])

    if (arguments.length === 0) {
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }

    return result
  }

  const Button = ({ onClick, className = '', children, ...props }: any) => (
    <button
      onClick={onClick}
      className={`h-14 rounded-xl font-medium transition-all duration-150 active:scale-95 hover:scale-105 animate-scale-in ${className}`}
      {...props}
    >
      {children}
    </button>
  )

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold dark:text-white">Calculator</h1>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:scale-105 transition-transform"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 animate-fade-in">
            <div className="mb-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
                <div className="text-right text-3xl font-mono dark:text-white overflow-hidden">
                  {display}
                </div>
              </div>

              {history.length > 0 && (
                <div className="text-xs text-gray-500 space-y-1 max-h-20 overflow-y-auto">
                  {history.map((item, index) => (
                    <div key={index} className="font-mono">{item}</div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-3">
              <Button onClick={clear} className="col-span-2 bg-red-500 hover:bg-red-600 text-white">
                Clear
              </Button>
              <Button onClick={() => performOperation('/')} className="bg-orange-500 hover:bg-orange-600 text-white">
                ÷
              </Button>
              <Button onClick={() => performOperation('*')} className="bg-orange-500 hover:bg-orange-600 text-white">
                ×
              </Button>

              <Button onClick={() => inputNumber('7')} className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 dark:text-white">
                7
              </Button>
              <Button onClick={() => inputNumber('8')} className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 dark:text-white">
                8
              </Button>
              <Button onClick={() => inputNumber('9')} className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 dark:text-white">
                9
              </Button>
              <Button onClick={() => performOperation('-')} className="bg-orange-500 hover:bg-orange-600 text-white">
                −
              </Button>

              <Button onClick={() => inputNumber('4')} className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 dark:text-white">
                4
              </Button>
              <Button onClick={() => inputNumber('5')} className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 dark:text-white">
                5
              </Button>
              <Button onClick={() => inputNumber('6')} className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 dark:text-white">
                6
              </Button>
              <Button onClick={() => performOperation('+')} className="bg-orange-500 hover:bg-orange-600 text-white">
                +
              </Button>

              <Button onClick={() => inputNumber('1')} className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 dark:text-white">
                1
              </Button>
              <Button onClick={() => inputNumber('2')} className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 dark:text-white">
                2
              </Button>
              <Button onClick={() => inputNumber('3')} className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 dark:text-white">
                3
              </Button>
              <Button onClick={() => calculate()} className="row-span-2 bg-blue-500 hover:bg-blue-600 text-white">
                =
              </Button>

              <Button onClick={() => inputNumber('0')} className="col-span-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 dark:text-white">
                0
              </Button>
              <Button onClick={inputDot} className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 dark:text-white">
                .
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}