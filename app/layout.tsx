import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import FaviconManager from '@/components/FaviconManager'
import './globals.css'

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Soham Kadam - Full Stack Developer',
  description: 'Full-Stack Developer crafting responsive, scalable web applications using React.js, Next.js, Node.js, and modern UI frameworks.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/light_mode.ico',
        sizes: 'any',
      },
      {
        url: '/light_mode.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/light_mode-16x16.png',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
    apple: [
      {
        url: '/light_mode.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: ['/light_mode.ico'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FaviconManager />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}