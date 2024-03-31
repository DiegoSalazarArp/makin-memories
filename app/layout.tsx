import { GeistMono } from "geist/font/mono"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/provider/theme-provider"

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
      <body className={GeistMono.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
