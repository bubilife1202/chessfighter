import { getWorldById } from '@/data/worlds'
import ModuleCard from '@/components/ModuleCard'
import Link from 'next/link'

interface WorldDetailPageProps {
  params: Promise<{
    worldId: string
  }>
}

export default async function WorldDetailPage({ params }: WorldDetailPageProps) {
  const { worldId } = await params
  const world = getWorldById(worldId)

  if (!world) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            월드를 찾을 수 없습니다
          </h1>
          <Link
            href="/worlds"
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            ← 월드맵으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  // TODO: 실제로는 사용자의 완료 모듈을 DB에서 가져와야 함
  const completedModules: string[] = []

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50">
      {/* 헤더 */}
      <div className={`bg-gradient-to-r ${world.theme} text-white py-12 px-4`}>
        <div className="max-w-7xl mx-auto">
          <Link
            href="/worlds"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <span className="mr-2">←</span>
            월드맵으로 돌아가기
          </Link>

          <div className="flex items-start gap-6">
            <div className="text-8xl">{world.icon}</div>
            <div className="flex-1">
              <div className="text-sm font-bold text-white/80 mb-2">
                WORLD {world.worldNumber}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {world.title}
              </h1>
              <p className="text-xl text-white/90 mb-4">{world.subtitle}</p>
              <p className="text-white/80 max-w-2xl">{world.description}</p>
            </div>
          </div>

          {/* 진행도 */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-medium">전체 진행도</span>
              <span className="text-white font-bold text-lg">
                {completedModules.length}/{world.totalModules} 모듈 완료
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(completedModules.length / world.totalModules) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 모듈 목록 */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          📚 학습 모듈
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {world.modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              isCompleted={completedModules.includes(module.id)}
            />
          ))}
        </div>

        {/* 도움말 */}
        <div className="mt-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            🎯 학습 목표
          </h3>
          <div className="text-gray-700 space-y-2">
            <p>
              이 월드에서는 체스 기물들의 기본적인 움직임과 규칙을 배웁니다.
            </p>
            <p>
              각 모듈을 완료하면 XP를 획득하고, 모든 모듈을 완료하면 다음 월드가
              열립니다!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
