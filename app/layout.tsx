import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chess Quest: 아이의 두뇌를 깨우는 64칸의 모험',
  description:
    '5-13세 아이들을 위한 최고의 체스 교육 플랫폼. 게임처럼 재미있게 논리력·집중력·문제해결력을 키워주세요. 과학적 학습법으로 입증된 효과!',
  keywords: [
    '체스',
    '어린이 체스',
    '체스 교육',
    '두뇌 개발',
    '논리력',
    '집중력',
    '문제해결력',
    'Chess Quest',
    '게임화 학습',
  ],
  authors: [{ name: 'Chess Quest' }],
  creator: 'Chess Quest',
  publisher: 'Chess Quest',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://chessfighter.netlify.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Chess Quest: 아이의 두뇌를 깨우는 64칸의 모험',
    description:
      '게임처럼 재미있게 체스를 배우는 최고의 교육 플랫폼. 1,234명의 부모님이 선택했습니다!',
    url: 'https://chessfighter.netlify.app',
    siteName: 'Chess Quest',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Chess Quest - 아이의 두뇌를 깨우는 64칸의 모험',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chess Quest: 아이의 두뇌를 깨우는 64칸의 모험',
    description: '게임처럼 재미있게 체스를 배우는 최고의 교육 플랫폼',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Chess Quest',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#9333ea' },
    { media: '(prefers-color-scheme: dark)', color: '#7e22ce' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="application-name" content="Chess Quest" />
        <meta name="apple-mobile-web-app-title" content="Chess Quest" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
