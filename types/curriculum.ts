// 커리큘럼 타입 정의

export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king'

export type ModuleType = 'tutorial' | 'puzzle' | 'practice' | 'challenge'

export interface Module {
  id: string
  worldId: string
  moduleNumber: number
  title: string
  subtitle: string
  description: string
  type: ModuleType
  targetPiece?: PieceType
  objectives: string[]
  difficulty: number // 1-5
  estimatedTime: number // minutes
  xpReward: number
  requiredModules?: string[] // 선행 모듈 ID
  isLocked: boolean
}

export interface World {
  id: string
  worldNumber: number
  title: string
  subtitle: string
  description: string
  theme: string // 테마 색상
  icon: string // 이모지 아이콘
  totalModules: number
  requiredWorldIds?: string[] // 선행 월드 ID
  isLocked: boolean
  modules: Module[]
}

export interface UserProgress {
  userId: string
  completedModules: string[]
  currentModule?: string
  totalXP: number
  level: number
  streak: number
  lastPlayedDate: string
}

export interface LessonContent {
  moduleId: string
  steps: LessonStep[]
}

export interface LessonStep {
  stepNumber: number
  type: 'explanation' | 'demonstration' | 'interactive' | 'quiz'
  title: string
  content: string
  fen?: string // 체스판 포지션 (FEN 표기법)
  highlightSquares?: string[] // 강조할 칸들
  validMoves?: string[] // 허용되는 수들
  hint?: string
}
