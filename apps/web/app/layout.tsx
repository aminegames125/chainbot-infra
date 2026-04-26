import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono, Syncopate } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-brand',
  display: 'swap',
})

const syncopate = Syncopate({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-title',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ChainBot — Mine Crypto in Discord',
  description:
    'The first Discord economy bot where every mint, burn, and transfer is publicly on-chain.',
  metadataBase: new URL('https://chainbot.animeos.dev'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${syncopate.variable} ${jetbrainsMono.variable} dark`}>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
