import { allWorlds } from '@/data/worlds'
import WorldCard from '@/components/WorldCard'

export default function WorldsPage() {
  // TODO: 실제로는 사용자의 진행도를 DB에서 가져와야 함
  const mockProgress = {
    'world-1': 30,
    'world-2': 0,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            🗺️ 체스 퀘스트 월드맵
          </h1>
          <p className="text-lg text-center text-purple-100 max-w-2xl mx-auto">
            각 월드를 탐험하며 체스의 비밀을 하나씩 풀어보세요!
          </p>
        </div>
      </div>

      {/* 사용자 정보 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">👤</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  게스트 플레이어
                </h2>
                <p className="text-gray-600">레벨 1 - 초보 기사</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">0</div>
                <div className="text-sm text-gray-600">총 XP</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">0</div>
                <div className="text-sm text-gray-600">연속일</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {allWorlds.reduce((acc, w) => acc + w.totalModules, 0)}
                </div>
                <div className="text-sm text-gray-600">총 모듈</div>
              </div>
            </div>
          </div>
        </div>

        {/* 월드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allWorlds.map((world) => (
            <WorldCard
              key={world.id}
              world={world}
              progress={mockProgress[world.id as keyof typeof mockProgress] || 0}
            />
          ))}
        </div>

        {/* 안내 문구 */}
        <div className="mt-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            💡 학습 팁
          </h3>
          <p className="text-gray-700">
            각 월드의 모듈을 순서대로 완료하면서 체스 실력을 차근차근 키워보세요.
            <br />
            매일 조금씩 플레이하면 연속일 보너스를 받을 수 있어요!
          </p>
        </div>
      </div>
    </div>
  )
}
