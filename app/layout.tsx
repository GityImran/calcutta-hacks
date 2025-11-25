import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { FooterWithPanels } from "@/components/landing/footer-with-panels"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Research. Learn. Verify.",
  description: "AI-verified learning + professor endorsements — an immutable academic registry for real skills.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Only show footer on the root path
  const isLandingPage = typeof window !== 'undefined' ? window.location.pathname === '/' : false;
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <main className="flex-grow">
          {children}
        </main>
        {isLandingPage && <FooterWithPanels />}
        <Analytics />
      </body>
    </html>
  )
}
