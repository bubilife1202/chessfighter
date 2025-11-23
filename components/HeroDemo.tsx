'use client'

import { useState, useEffect } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'

export default function HeroDemo() {
  const [game, setGame] = useState<Chess | null>(null)
  const [position, setPosition] = useState('start')
  const [moveCount, setMoveCount] = useState(0)
  const [message, setMessage] = useState('♟️ 기물을 움직여보세요!')
  const [boardWidth, setBoardWidth] = useState(400)

  useEffect(() => {
    setGame(new Chess())
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(window.innerWidth - 40, 400)
      setBoardWidth(width)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    if (!game || moveCount >= 3) return false

    try {
      const newGame = new Chess(game.fen())
      const move = newGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      })

      if (move === null) return false

      setGame(newGame)
      setPosition(newGame.fen())
      setMoveCount(moveCount + 1)

      if (moveCount + 1 === 3) {
        setMessage('🎉 체험 완료! 학습 모드에서 더 배워보세요')
      } else {
        setMessage(`✨ 좋아요! ${3 - (moveCount + 1)}수 더 가능해요`)
      }

      return true
    } catch {
      return false
    }
  }

  const resetDemo = () => {
    const newGame = new Chess()
    setGame(newGame)
    setPosition(newGame.fen())
    setMoveCount(0)
    setMessage('♟️ 기물을 움직여보세요!')
  }

  if (!game) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-center">
          <div className="text-4xl mb-4">♟️</div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6">
        <Chessboard
          position={position}
          onPieceDrop={onDrop}
          boardWidth={boardWidth}
          customBoardStyle={{
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          customDarkSquareStyle={{ backgroundColor: '#B58863' }}
          customLightSquareStyle={{ backgroundColor: '#F0D9B5' }}
          arePiecesDraggable={moveCount < 3}
        />

        <div className="mt-4 text-center">
          <p className="text-lg font-semibold text-gray-800 mb-2">{message}</p>
          <div className="flex justify-center gap-2 mb-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`w-3 h-3 rounded-full ${
                  n <= moveCount ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          {moveCount >= 3 && (
            <button
              onClick={resetDemo}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              다시 체험하기
            </button>
          )}
        </div>
      </div>

      {moveCount < 3 && (
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
          무료 체험
        </div>
      )}
    </div>
  )
}
