import './globals.css'
import '@radix-ui/themes/styles.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { WagmiContext } from '@/context/wagmi'
import { ReactQueryProvider } from '@/context/reactQuery'
import { Theme } from '@radix-ui/themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sound.xyz SDK - Next.js Example',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiContext>
          <ReactQueryProvider>
            <Theme>{children}</Theme>
          </ReactQueryProvider>
        </WagmiContext>
      </body>
    </html>
  )
}
