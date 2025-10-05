import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Modern Calculator',
  description: 'A modern calculator web application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}