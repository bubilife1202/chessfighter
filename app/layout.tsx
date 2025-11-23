import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chess Quest: The Grandmaster\'s Journey',
  description: '아이의 두뇌를 깨우는 64칸의 모험',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
