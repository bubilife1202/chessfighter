'use client'

import { Module } from '@/types/curriculum'
import Link from 'next/link'

interface ModuleCardProps {
  module: Module
  isCompleted?: boolean
}

// 난이도별 색상
const difficultyColors = {
  1: 'bg-green-100 text-green-800 border-green-300',
  2: 'bg-blue-100 text-blue-800 border-blue-300',
  3: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  4: 'bg-orange-100 text-orange-800 border-orange-300',
  5: 'bg-red-100 text-red-800 border-red-300',
}

// 타입별 아이콘
const typeIcons = {
  tutorial: '📚',
  puzzle: '🧩',
  practice: '⚔️',
  challenge: '🏆',
}

// 기물별 이모지
const pieceEmojis = {
  pawn: '♟️',
  rook: '♜',
  knight: '♞',
  bishop: '♝',
  queen: '♛',
  king: '♚',
}

export default function ModuleCard({ module, isCompleted = false }: ModuleCardProps) {
  const difficultyColor = difficultyColors[module.difficulty as keyof typeof difficultyColors] || difficultyColors[3]
  const typeIcon = typeIcons[module.type]
  const pieceEmoji = module.targetPiece ? pieceEmojis[module.targetPiece] : '♟️'

  return (
    <Link href={module.isLocked ? '#' : `/modules/${module.id}`}>
      <div
        className={`
        relative rounded-xl p-5 border-2 transition-all duration-300
        ${
          module.isLocked
            ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-60'
            : isCompleted
            ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300 hover:shadow-lg cursor-pointer'
            : 'bg-white border-gray-200 hover:border-purple-400 hover:shadow-lg cursor-pointer'
        }
      `}
      >
        {/* 상태 아이콘 */}
        <div className="absolute top-3 right-3">
          {module.isLocked && <span className="text-2xl">🔒</span>}
          {isCompleted && <span className="text-2xl">✅</span>}
          {!module.isLocked && !isCompleted && (
            <span className="text-2xl opacity-50">⭐</span>
          )}
        </div>

        {/* 모듈 번호와 타입 */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{typeIcon}</span>
          <div className="text-xs font-bold text-gray-500">
            모듈 {module.moduleNumber}
          </div>
        </div>

        {/* 기물 아이콘 */}
        {module.targetPiece && (
          <div className="text-4xl mb-3">{pieceEmoji}</div>
        )}

        {/* 제목 */}
        <h4 className="text-lg font-bold text-gray-800 mb-1">
          {module.title}
        </h4>

        {/* 부제목 */}
        <p className="text-sm text-gray-600 mb-3">{module.subtitle}</p>

        {/* 설명 */}
        <p className="text-xs text-gray-500 mb-4 line-clamp-2">
          {module.description}
        </p>

        {/* 하단 정보 */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          {/* 난이도 */}
          <div
            className={`px-2 py-1 rounded text-xs font-bold border ${difficultyColor}`}
          >
            난이도 {module.difficulty}
          </div>

          {/* XP 보상 */}
          <div className="flex items-center gap-1 text-yellow-600">
            <span className="text-sm">⭐</span>
            <span className="text-xs font-bold">+{module.xpReward} XP</span>
          </div>
        </div>

        {/* 예상 시간 */}
        <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
          <span>⏱️</span>
          <span>약 {module.estimatedTime}분</span>
        </div>

        {/* 잠금 메시지 */}
        {module.isLocked && (
          <div className="mt-3 text-xs text-gray-500 font-medium">
            이전 모듈을 먼저 완료하세요
          </div>
        )}
      </div>
    </Link>
  )
}
