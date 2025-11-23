import ChessGame from '@/components/ChessGame'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            ♟️ Chess Quest
          </h1>
          <p className="text-xl text-gray-600">
            The Grandmaster&apos;s Journey
          </p>
          <p className="text-md text-gray-500 mt-2">
            아이의 두뇌를 깨우는 64칸의 모험
          </p>
        </div>

        {/* 네비게이션 카드 */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* 학습 모드 */}
          <Link href="/worlds">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-8 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-6xl mb-4">🗺️</div>
              <h2 className="text-3xl font-bold mb-3">학습 모드</h2>
              <p className="text-purple-100 mb-4">
                월드맵을 탐험하며 체스를 단계별로 배워보세요
              </p>
              <ul className="space-y-2 text-sm text-purple-100">
                <li>✓ 5개의 월드, 30개 이상의 모듈</li>
                <li>✓ 인터랙티브 튜토리얼</li>
                <li>✓ XP와 레벨 시스템</li>
              </ul>
              <div className="mt-6 inline-block bg-white text-purple-600 px-6 py-2 rounded-lg font-bold">
                시작하기 →
              </div>
            </div>
          </Link>

          {/* AI 대국 */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
            <div className="text-6xl mb-4">🤖</div>
            <h2 className="text-3xl font-bold mb-3">AI 대국</h2>
            <p className="text-green-100 mb-4">
              AI와 실전 대국을 펼쳐보세요 (아래에서 바로 플레이)
            </p>
            <ul className="space-y-2 text-sm text-green-100">
              <li>✓ 3단계 난이도 선택</li>
              <li>✓ 무르기 기능</li>
              <li>✓ 실시간 기보 제공</li>
            </ul>
          </div>
        </div>

        {/* AI 대국 섹션 */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            🤖 AI와 대국하기
          </h2>
          <ChessGame />
        </div>

        {/* 푸터 정보 */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>Made with ♟️ and ❤️ for young minds</p>
        </div>
      </div>
    </main>
  )
}
