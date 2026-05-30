import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { StudentProvider } from '@/context/student-context'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

export const metadata: Metadata = {
  title: 'EduPilot AI - Your AI Copilot for Study Abroad & Education Loans',
  description: 'AI-powered platform to guide students from exploration to loan application for studying abroad. Get personalized college recommendations, skill gap analysis, and loan planning.',
  keywords: ['study abroad', 'education loan', 'AI copilot', 'college recommendations', 'skill gap analysis'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <StudentProvider>
          {children}
        </StudentProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
