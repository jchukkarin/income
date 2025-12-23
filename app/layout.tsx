import type { Metadata } from 'next'
import { Providers } from '@/components/providers'
import './globals.css'


export const metadata: Metadata = {
  title: 'Income Expense App',
  description: 'บันทึกรายรับรายจ่าย',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
