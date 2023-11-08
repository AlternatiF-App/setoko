import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Header from '@/components/header'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Setoko Test',
  description: 'For test Frontend Developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Header/>
        {children}
      </body>
    </html>
  )
}
