import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getModuleById } from '@/data/worlds'

interface ModulePageProps {
  params: Promise<{
    moduleId?: string
  } | undefined>
}

export default async function ModuleDetailPage({ params }: ModulePageProps) {
  const resolvedParams = await params
  const moduleId = resolvedParams?.moduleId
  const moduleData = typeof moduleId === 'string' ? getModuleById(moduleId) : undefined

  if (!moduleData) {
    notFound()
  }

  const { world, module } = moduleData
  const progressPercent = module.isLocked ? 0 : 40

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-purple-50 text-gray-900">
      <header className={`bg-gradient-to-r ${world.theme} text-white pb-12 pt-10`}> 
        <div className="max-w-5xl mx-auto px-4 flex flex-col gap-6">
          <div className="flex items-center gap-3 text-sm text-white/80">
            <Link href="/worlds" className="hover:text-white transition-colors">월드맵</Link>
            <span>›</span>
            <Link href={`/worlds/${world.id}`} className="hover:text-white transition-colors">
              {world.title}
            </Link>
            <span>›</span>
            <span className="font-semibold text-white">모듈 {module.moduleNumber}</span>
          </div>

          <div className="flex items-start gap-6">
            <div className="text-7xl">{world.icon}</div>
            <div className="space-y-3">
              <div className="text-xs font-bold text-white/80">WORLD {world.worldNumber}</div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">{module.title}</h1>
              <p className="text-lg text-white/90">{module.subtitle}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 font-semibold">
                  난이도 {module.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 font-semibold">
                  예상 {module.estimatedTime}분
                </span>
                <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 font-semibold">
                  보상 +{module.xpReward} XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <section className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-purple-600">모듈 개요</div>
              <p className="text-lg text-gray-700 leading-relaxed">{module.description}</p>
            </div>
            <div className="min-w-[220px] bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 p-4 shadow-inner">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="font-semibold text-gray-700">진행도</span>
                <span className="font-bold text-purple-700">{progressPercent}%</span>
              </div>
              <div className="mt-2 h-2 bg-purple-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <Link href={module.isLocked ? '#' : `/modules/${module.id}/start`} className="block">
                <button
                  className="mt-4 w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
                  disabled={module.isLocked}
                >
                  {module.isLocked ? '잠금 해제 필요' : '모듈 시작하기'}
                </button>
              </Link>
              {module.requiredModules && module.requiredModules.length > 0 && (
                <p className="mt-2 text-xs text-gray-600">이전 모듈 완료 후 시작할 수 있습니다.</p>
              )}
            </div>
          </div>

          {module.objectives.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {module.objectives.map((objective, idx) => (
                <div
                  key={objective}
                  className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50"
                >
                  <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center font-bold text-purple-600">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">학습 목표 {idx + 1}</p>
                    <p className="text-sm text-gray-600 leading-snug">{objective}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl shadow p-5 border border-gray-100">
            <div className="text-2xl mb-2">🧭</div>
            <h3 className="font-bold text-gray-800 mb-2">학습 팁</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              설명을 읽은 뒤 바로 연습 문제로 이어지며, 움직임을 직접 체험할 수 있습니다. 집중이 흐트러지면 잠시 휴식한 후 다시 도전하세요.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 border border-gray-100">
            <div className="text-2xl mb-2">📌</div>
            <h3 className="font-bold text-gray-800 mb-2">선행 조건</h3>
            {module.requiredModules && module.requiredModules.length > 0 ? (
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                {module.requiredModules.map((req) => (
                  <li key={req}>{req} 완료 필요</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">바로 시작할 수 있습니다.</p>
            )}
          </div>
          <div className="bg-white rounded-2xl shadow p-5 border border-gray-100">
            <div className="text-2xl mb-2">🎁</div>
            <h3 className="font-bold text-gray-800 mb-2">획득 보상</h3>
            <p className="text-sm text-gray-700">완료 시 +{module.xpReward} XP</p>
            <p className="text-sm text-gray-600">월드 {world.worldNumber} 진행도에 반영됩니다.</p>
          </div>
        </section>
      </main>
    </div>
  )
}
