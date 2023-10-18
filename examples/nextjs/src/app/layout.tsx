import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { WagmiContext } from '@/context/wagmi'
import { ReactQueryProvider } from '@/context/reactQuery'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sound.xyz SDK - Next.js Example',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiContext>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </WagmiContext>
      </body>
    </html>
  )
}
