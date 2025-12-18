import type { Metadata } from 'next'

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
    <html lang="th">
      <body>
        {children}
      </body>
    </html>
  )
}
