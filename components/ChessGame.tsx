'use client'

import { useState, useCallback, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { Game as ChessEngine } from 'js-chess-engine'

type DifficultyLevel = 'easy' | 'medium' | 'hard'

export default function ChessGame() {
  const [game, setGame] = useState(new Chess())
  const [gamePosition, setGamePosition] = useState(game.fen())
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium')
  const [gameStatus, setGameStatus] = useState<string>('')
  const [isThinking, setIsThinking] = useState(false)
  const [boardWidth, setBoardWidth] = useState(550)

  // 반응형 보드 크기 설정
  useEffect(() => {
    const handleResize = () => {
      setBoardWidth(Math.min(window.innerWidth - 100, 550))
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 게임 상태 체크
  useEffect(() => {
    if (game.isCheckmate()) {
      setGameStatus(game.turn() === 'w' ? '흑 승리! 체크메이트!' : '백 승리! 체크메이트!')
    } else if (game.isDraw()) {
      setGameStatus('무승부!')
    } else if (game.isCheck()) {
      setGameStatus('체크!')
    } else {
      setGameStatus('')
    }
  }, [game, gamePosition])

  // AI 수 계산 (간단한 랜덤 선택 방식)
  const makeAIMove = useCallback(() => {
    if (game.isGameOver()) return

    setIsThinking(true)

    // AI가 생각하는 것처럼 약간의 딜레이 추가
    setTimeout(() => {
      const possibleMoves = game.moves()

      if (possibleMoves.length === 0) {
        setIsThinking(false)
        return
      }

      // 난이도에 따른 AI 전략
      let selectedMove: string

      if (difficulty === 'easy') {
        // 쉬움: 완전 랜덤
        selectedMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
      } else if (difficulty === 'medium') {
        // 보통: 체크나 캡처를 우선
        const captureMoves = possibleMoves.filter(move =>
          game.move({ from: move.slice(0, 2), to: move.slice(2, 4), promotion: 'q' }) &&
          (game.undo(), move.includes('x'))
        )
        const checkMoves = possibleMoves.filter(move => {
          const testMove = game.move(move)
          const isCheck = testMove ? game.isCheck() : false
          game.undo()
          return isCheck
        })

        if (checkMoves.length > 0) {
          selectedMove = checkMoves[Math.floor(Math.random() * checkMoves.length)]
        } else if (captureMoves.length > 0) {
          selectedMove = captureMoves[Math.floor(Math.random() * captureMoves.length)]
        } else {
          selectedMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
        }
      } else {
        // 어려움: 더 나은 평가 (추후 실제 엔진 통합)
        selectedMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
      }

      try {
        const move = game.move(selectedMove)
        if (move) {
          setGamePosition(game.fen())
          setMoveHistory(prev => [...prev, move.san])
        }
      } catch (e) {
        console.error('AI move error:', e)
      }

      setIsThinking(false)
    }, 500)
  }, [game, difficulty])

  // 플레이어의 수
  const onDrop = useCallback((sourceSquare: string, targetSquare: string) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // 폰 프로모션 시 항상 퀸으로
      })

      if (move === null) return false

      setGamePosition(game.fen())
      setMoveHistory(prev => [...prev, move.san])

      // AI 차례
      if (!game.isGameOver()) {
        setTimeout(() => makeAIMove(), 200)
      }

      return true
    } catch (e) {
      return false
    }
  }, [game, makeAIMove])

  // 게임 리셋
  const resetGame = () => {
    const newGame = new Chess()
    setGame(newGame)
    setGamePosition(newGame.fen())
    setMoveHistory([])
    setGameStatus('')
  }

  // 무르기
  const undoMove = () => {
    if (moveHistory.length < 2) return

    // 플레이어와 AI 수 둘 다 무르기
    game.undo()
    game.undo()
    setGamePosition(game.fen())
    setMoveHistory(prev => prev.slice(0, -2))
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
      {/* 체스판 */}
      <div className="w-full lg:w-auto">
        <div className="max-w-[600px] mx-auto bg-white rounded-xl shadow-2xl p-6">
          <Chessboard
            position={gamePosition}
            onPieceDrop={onDrop}
            boardWidth={boardWidth}
            customBoardStyle={{
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            customDarkSquareStyle={{ backgroundColor: '#B58863' }}
            customLightSquareStyle={{ backgroundColor: '#F0D9B5' }}
          />

          {gameStatus && (
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-purple-600">{gameStatus}</p>
            </div>
          )}

          {isThinking && (
            <div className="mt-4 text-center">
              <p className="text-lg text-gray-600">AI가 생각 중...</p>
            </div>
          )}
        </div>
      </div>

      {/* 컨트롤 패널 */}
      <div className="w-full lg:w-96">
        <div className="bg-white rounded-xl shadow-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">게임 설정</h2>

          {/* 난이도 선택 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AI 난이도
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setDifficulty('easy')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  difficulty === 'easy'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                쉬움
              </button>
              <button
                onClick={() => setDifficulty('medium')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  difficulty === 'medium'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                보통
              </button>
              <button
                onClick={() => setDifficulty('hard')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  difficulty === 'hard'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                어려움
              </button>
            </div>
          </div>

          {/* 게임 컨트롤 */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={resetGame}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              새 게임
            </button>
            <button
              onClick={undoMove}
              disabled={moveHistory.length < 2}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              무르기
            </button>
          </div>

          {/* 기보 */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">기보</h3>
            <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
              {moveHistory.length === 0 ? (
                <p className="text-gray-400 text-sm">아직 수가 없습니다</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {moveHistory.map((move, index) => (
                    <div key={index} className="text-sm">
                      <span className="text-gray-500 font-medium">
                        {Math.floor(index / 2) + 1}.
                        {index % 2 === 0 ? ' ' : '... '}
                      </span>
                      <span className="font-mono">{move}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 도움말 */}
        <div className="mt-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold mb-2 text-gray-800">💡 도움말</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• 기물을 드래그하여 이동하세요</li>
            <li>• AI는 흑으로 플레이합니다</li>
            <li>• 무르기는 2수(플레이어+AI)를 되돌립니다</li>
            <li>• 난이도를 조절하여 실력을 키워보세요!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
