'use client'

import { World } from '@/types/curriculum'
import Link from 'next/link'

interface WorldCardProps {
  world: World
  progress?: number // 0-100
}

export default function WorldCard({ world, progress = 0 }: WorldCardProps) {
  const completedModules = Math.floor((progress / 100) * world.totalModules)

  return (
    <Link href={world.isLocked ? '#' : `/worlds/${world.id}`}>
      <div
        className={`
        relative overflow-hidden rounded-2xl p-6 shadow-xl transition-all duration-300
        ${
          world.isLocked
            ? 'bg-gray-300 cursor-not-allowed opacity-60'
            : `bg-gradient-to-br ${world.theme} hover:scale-105 hover:shadow-2xl cursor-pointer`
        }
      `}
      >
        {/* 잠금 아이콘 */}
        {world.isLocked && (
          <div className="absolute top-4 right-4 text-4xl">🔒</div>
        )}

        {/* 월드 아이콘 */}
        <div className="text-6xl mb-4">{world.icon}</div>

        {/* 월드 번호 */}
        <div className="text-white/80 text-sm font-bold mb-2">
          WORLD {world.worldNumber}
        </div>

        {/* 월드 제목 */}
        <h3 className="text-2xl font-bold text-white mb-2">{world.title}</h3>

        {/* 부제목 */}
        <p className="text-white/90 text-sm mb-3">{world.subtitle}</p>

        {/* 설명 */}
        <p className="text-white/80 text-xs mb-4 line-clamp-2">
          {world.description}
        </p>

        {/* 진행도 */}
        {!world.isLocked && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/90 text-xs font-medium">
                진행도
              </span>
              <span className="text-white font-bold text-sm">
                {completedModules}/{world.totalModules}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* 잠금 메시지 */}
        {world.isLocked && (
          <div className="mt-4 text-gray-600 text-xs font-medium">
            이전 월드를 완료하세요
          </div>
        )}
      </div>
    </Link>
  )
}
