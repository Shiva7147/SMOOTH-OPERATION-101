import type { Metadata, Viewport } from 'next'
import { Inter, Outfit } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Smooth Operator — Fix the vibe before you fix the reply',
  description:
    'AI + human feedback platform to improve your dating profile, matrimony profile, bio, chats, and first impression. Get your Smooth Score and private feedback from verified women.',
  keywords: [
    'dating profile',
    'matrimony profile',
    'smooth operator',
    'first impression',
    'dating tips india',
    'bio rewrite',
    'chat improvement',
  ],
  openGraph: {
    title: 'Smooth Operator — Fix the vibe before you fix the reply',
    description:
      'Upload your dating profile, matrimony profile, bio, or chat. Smooth Operator tells you what is killing your first impression — and how to fix it.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0f',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="min-h-screen bg-background text-foreground font-body antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
