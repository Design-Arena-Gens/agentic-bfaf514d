import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fashion Store - Premium Clothing',
  description: 'Discover the latest fashion trends and premium clothing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
