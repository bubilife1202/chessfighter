import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getModuleById } from '@/data/worlds'
import ChessGame from '@/components/ChessGame'

interface ModuleStartPageProps {
  params: Promise<{
    moduleId?: string
  } | undefined>
}

export default async function ModuleStartPage({ params }: ModuleStartPageProps) {
  const resolvedParams = await params
  const moduleId = resolvedParams?.moduleId
  const moduleData = typeof moduleId === 'string' ? getModuleById(moduleId) : undefined

  if (!moduleData) {
    notFound()
  }

  const { module, world } = moduleData

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-purple-50 text-gray-900">
      <header className={`bg-gradient-to-r ${world.theme} text-white pb-10 pt-8`}>
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-4 text-sm text-white/80">
          <Link href="/worlds" className="hover:text-white transition-colors">월드맵</Link>
          <span>›</span>
          <Link href={`/worlds/${world.id}`} className="hover:text-white transition-colors">
            {world.title}
          </Link>
          <span>›</span>
          <Link href={`/modules/${module.id}`} className="hover:text-white transition-colors">
            모듈 {module.moduleNumber}
          </Link>
          <span>›</span>
          <span className="font-semibold text-white">학습 시작</span>
        </div>

        <div className="max-w-5xl mx-auto px-4 mt-6 flex items-start gap-6">
          <div className="text-6xl">{world.icon}</div>
          <div className="space-y-2">
            <div className="text-xs font-bold text-white/80">WORLD {world.worldNumber}</div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">{module.title}</h1>
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
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <section className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-1">
              <div className="text-sm font-semibold text-purple-600">학습 세션</div>
              <h2 className="text-2xl font-bold text-gray-900">{module.title} 진행하기</h2>
              <p className="text-gray-700">체스 보드에서 바로 연습을 시작하세요.</p>
            </div>
            <Link
              href={`/modules/${module.id}`}
              className="text-sm font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1"
            >
              ↩ 모듈 정보로 돌아가기
            </Link>
          </div>

          <div className="grid lg:grid-cols-[2fr,1fr] gap-6 items-start">
            <div className="bg-purple-50 rounded-xl border border-purple-100 p-4">
              <ChessGame />
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <h3 className="font-bold text-gray-800 mb-2">학습 목표</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  {module.objectives.map((objective) => (
                    <li key={objective}>{objective}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-bold text-gray-800 mb-2">팁</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  이동할 때마다 AI가 응답합니다. 느리다고 느껴진다면 난이도나 플레이 속도를 조절해 보세요.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
