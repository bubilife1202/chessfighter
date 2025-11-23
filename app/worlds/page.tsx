import { allWorlds } from '@/data/worlds'
import WorldCard from '@/components/WorldCard'
import Link from 'next/link'

export default function WorldsPage() {
  // TODO: 실제로는 사용자의 진행도를 DB에서 가져와야 함
  const mockProgress = {
    'world-1': 30,
    'world-2': 0,
  }

  const totalXP = 0
  const currentLevel = 1
  const streak = 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-3xl">♟️</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Chess Quest
            </span>
          </Link>
          <div className="flex gap-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
            >
              홈
            </Link>
            <Link
              href="/worlds"
              className="text-purple-600 font-semibold border-b-2 border-purple-600"
            >
              학습 모드
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 px-4">
        <div className="absolute inset-0 bg-[url('/chess-pattern.svg')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            🗺️ 체스 퀘스트 월드맵
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto mb-8">
            각 월드를 탐험하며 체스의 비밀을 하나씩 풀어보세요!
            <br />
            게임처럼 재미있는 학습이 여기 있습니다.
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto bg-white/20 backdrop-blur-sm rounded-full p-2">
            <div className="flex items-center justify-between text-sm mb-1 px-2">
              <span className="font-semibold">전체 진행도</span>
              <span className="font-bold">
                {Math.round((mockProgress['world-1'] / allWorlds.reduce((acc, w) => acc + w.totalModules, 0)) * 100)}%
              </span>
            </div>
            <div className="bg-white/30 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${(mockProgress['world-1'] / allWorlds.reduce((acc, w) => acc + w.totalModules, 0)) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-16">
            <path
              fill="rgb(238, 242, 255)"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* User Stats Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="text-6xl">👤</div>
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  Lv {currentLevel}
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">게스트 플레이어</h2>
                <p className="text-gray-600 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  초보 기사 · 열정적인 학습자
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {totalXP.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <span>⭐</span>
                  <span>총 XP</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {streak}
                </div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <span>🔥</span>
                  <span>연속일</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {allWorlds.reduce((acc, w) => acc + w.totalModules, 0)}
                </div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <span>📚</span>
                  <span>총 모듈</span>
                </div>
              </div>
            </div>
          </div>

          {/* XP Progress to Next Level */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-semibold text-gray-700">다음 레벨까지</span>
              <span className="font-bold text-purple-600">0 / 1000 XP</span>
            </div>
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: '0%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Worlds Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">모든 월드</h2>
            <div className="text-sm text-gray-600">
              {allWorlds.filter((w) => !w.isLocked).length} / {allWorlds.length} 잠금 해제됨
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allWorlds.map((world) => (
              <WorldCard
                key={world.id}
                world={world}
                progress={mockProgress[world.id as keyof typeof mockProgress] || 0}
              />
            ))}
          </div>
        </div>

        {/* Learning Tips */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-3xl">💡</span>
              학습 팁
            </h3>
            <p className="text-gray-700 leading-relaxed">
              각 월드의 모듈을 순서대로 완료하면서 체스 실력을 차근차근 키워보세요. 매일 조금씩
              플레이하면 연속일 보너스를 받을 수 있어요!
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-100 to-orange-100 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-3xl">🎯</span>
              오늘의 목표
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span>모듈 1개 완료하기</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span>AI와 대국하기</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span>연속 출석 유지하기</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Free Access Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">🎉 모든 기능이 완전 무료!</h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            모든 월드, 모든 모듈에 무제한 접근하세요. 결제 없이 체스 마스터가 될 수 있어요!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/worlds/world-1">
              <button className="bg-white text-green-600 font-bold py-4 px-8 rounded-xl hover:bg-yellow-300 hover:text-green-700 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                🌱 World 1 시작하기
              </button>
            </Link>
            <Link href="/worlds/world-2">
              <button className="bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-xl hover:bg-white/30 transition-all duration-300 border-2 border-white">
                🌲 World 2 도전하기
              </button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-green-100">💚 평생 무료 · 광고 없음 · 신용카드 불필요</p>
        </div>
      </div>
    </div>
  )
}
