import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Relaq - Beauty Services Booking",
  description: "Book nail and hair services easily",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <Header />
        <main className="flex justify-center items-center  md:min-h-full bg-background">{children}</main>
      </body>
    </html>
  )
}



import './globals.css'