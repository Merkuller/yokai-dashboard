import type { Metadata } from 'next'
import QueryClientProviderWrapper from '@/shared/providers/QueryClientProvider'
import ToasterProvider from '@/shared/providers/ToasterProvider'
import './globals.scss'

export const metadata: Metadata = {
  title: 'Yokai Dashboard',
  description: 'Real-time yokai monitoring'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProviderWrapper>
          <ToasterProvider />
          {children}
        </QueryClientProviderWrapper>
      </body>
    </html>
  )
}
