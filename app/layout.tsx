import type { Metadata } from 'next'
import { Providers } from '@/components/providers'
import '@/styles/index.css'
import AppLayout from '@/components/AppLayout'


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
      <body className="h-screen overflow-hidden">
        <Providers>
          <AppLayout>
            {children}
          </AppLayout>
        </Providers>
      </body>
    </html>
  )
}
