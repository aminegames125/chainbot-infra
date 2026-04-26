import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import 'nextra-theme-docs/style.css'
import './globals.css'

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

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
})

export const metadata = {
    title: {
        template: '%s – ChainBot Docs',
        default: 'ChainBot Docs',
    },
}

export default async function RootLayout({ children }) {
    const pageMap = await getPageMap('/')
    
    return (
        <html lang="en" dir="ltr" suppressHydrationWarning>
            <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-body`} suppressHydrationWarning>
                <Layout
                    navbar={<Navbar logo={<b>ChainBot</b>} />}
                    footer={<Footer>MIT {new Date().getFullYear()} © ChainBot.</Footer>}
                    pageMap={pageMap}
                >
                    {children}
                </Layout>
            </body>
        </html>
    )
}