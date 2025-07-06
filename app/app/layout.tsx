
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChatLLM Master Training Course | Abacus.AI',
  description: 'Master Large Language Models with hands-on training and AI-powered guidance. From novice to expert with our comprehensive ChatLLM course.',
  keywords: ['ChatLLM', 'AI Training', 'Machine Learning', 'Large Language Models', 'Abacus.AI'],
  authors: [{ name: 'Abacus.AI' }],
  creator: 'Abacus.AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
