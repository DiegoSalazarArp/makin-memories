import { GeistMono } from "geist/font/mono"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Makin memories",
  description: "An app to help you remember the good times",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={GeistMono.className}>{children}</body>
    </html>
  )
}
