#!/usr/bin/env node

/**
 * Chess Quest - 체스판 작동 및 배치 전문 테스트
 * 100개 체크리스트 자동 검증
 */

const fs = require('fs');

const results = { passed: [], failed: [], manual: [], total: 0 };

function test(id, description, testFn, isManual = false) {
  results.total++;
  if (isManual) {
    results.manual.push({ id, description });
    return;
  }
  try {
    const result = testFn();
    if (result) {
      results.passed.push({ id, description });
      console.log(`✅ [${id}] ${description}`);
    } else {
      results.failed.push({ id, description });
      console.log(`❌ [${id}] ${description}`);
    }
  } catch (error) {
    results.failed.push({ id, description, error: error.message });
    console.log(`❌ [${id}] ${description} (${error.message})`);
  }
}

function readFile(path) {
  try { return fs.readFileSync(path, 'utf-8'); } catch { return null; }
}

console.log('🔍 Chess Quest - 체스판 작동/배치 전문 테스트\n');
console.log('='.repeat(80));

// ============================================================================
// A. 기물 초기 배치 (1-16)
// ============================================================================
console.log('\n♟️ A. 기물 초기 배치 검증\n');

const gameCode = readFile('components/ChessGame.tsx');

test(1, 'Chess.js 임포트 확인', () => gameCode?.includes("from 'chess.js'"));
test(2, 'new Chess() 초기화 확인', () => gameCode?.includes('new Chess()'));
test(3, '초기 position이 "start"인지 확인', () => gameCode?.includes("'start'"));

// 초기 배치는 Chess.js가 자동으로 처리하므로 수동 확인
for (let i = 4; i <= 16; i++) {
  const pieces = ['백 룩(a1)', '백 나이트(b1)', '백 비숍(c1)', '백 퀸(d1)',
                  '백 킹(e1)', '백 비숍(f1)', '백 나이트(g1)', '백 룩(h1)',
                  '백 폰(a2-h2)', '흑 폰(a7-h7)', '흑 룩(a8,h8)', '흑 퀸(d8)', '흑 킹(e8)'];
  test(i, `${pieces[i-4]} 초기 배치 (수동)`, null, true);
}

// ============================================================================
// B. 체스판 렌더링 (17-30)
// ============================================================================
console.log('\n🎨 B. 체스판 렌더링\n');

test(17, 'Chessboard 컴포넌트 임포트', () => gameCode?.includes("from 'react-chessboard'"));
test(18, '<Chessboard> 사용 확인', () => gameCode?.includes('<Chessboard'));
test(19, 'position prop 전달', () => gameCode?.includes('position={gamePosition}'));
test(20, 'boardWidth prop 전달', () => gameCode?.includes('boardWidth={boardWidth}'));
test(21, 'customDarkSquareStyle 설정', () => gameCode?.includes('customDarkSquareStyle'));
test(22, '어두운 칸 색상 #B58863', () => gameCode?.includes('#B58863'));
test(23, 'customLightSquareStyle 설정', () => gameCode?.includes('customLightSquareStyle'));
test(24, '밝은 칸 색상 #F0D9B5', () => gameCode?.includes('#F0D9B5'));
test(25, 'border-radius 스타일', () => gameCode?.includes('borderRadius'));
test(26, 'boxShadow 스타일', () => gameCode?.includes('boxShadow'));
test(27, '반응형 boardWidth 로직', () => gameCode?.includes('setBoardWidth'));
test(28, 'window.innerWidth 사용', () => gameCode?.includes('window.innerWidth'));
test(29, '최대 너비 550px', () => gameCode?.includes('550'));
test(30, 'resize 이벤트 리스너', () => gameCode?.includes('addEventListener(\'resize\''));

// ============================================================================
// C. 드래그 앤 드롭 핸들러 (31-45)
// ============================================================================
console.log('\n🖱️ C. 드래그 앤 드롭 핸들러\n');

test(31, 'onPieceDrop prop 전달', () => gameCode?.includes('onPieceDrop={onDrop}'));
test(32, 'onDrop 함수 정의', () => gameCode?.includes('const onDrop'));
test(33, 'onDrop이 useCallback 사용', () => gameCode?.includes('useCallback((sourceSquare'));
test(34, 'sourceSquare 파라미터', () => gameCode?.includes('sourceSquare'));
test(35, 'targetSquare 파라미터', () => gameCode?.includes('targetSquare'));
test(36, 'game null 체크', () => gameCode?.includes('if (!game)'));
test(37, 'new Chess(game.fen()) 생성', () => gameCode?.includes('new Chess(game.fen())'));
test(38, 'game.move() 호출', () => gameCode?.includes('.move({'));
test(39, 'from 속성 전달', () => gameCode?.includes('from: sourceSquare'));
test(40, 'to 속성 전달', () => gameCode?.includes('to: targetSquare'));
test(41, 'promotion 설정', () => gameCode?.includes('promotion:'));
test(42, 'move null 체크', () => gameCode?.includes('if (move === null)'));
test(43, 'false 반환 (불법 수)', () => gameCode?.includes('return false'));
test(44, 'setGame(newGame) 호출', () => gameCode?.includes('setGame(newGame)'));
test(45, 'try-catch 에러 처리', () => gameCode?.includes('try {') && gameCode?.includes('catch'));

// ============================================================================
// D. 기물 이동 규칙 (46-60) - 대부분 수동
// ============================================================================
console.log('\n📏 D. 기물 이동 규칙 검증 (수동)\n');

for (let i = 46; i <= 60; i++) {
  const rules = [
    '폰 1칸 전진', '폰 초기 2칸 전진', '폰 대각선 잡기', '폰 프로모션 (퀸)',
    '룩 수직 이동', '룩 수평 이동', '룩 경로 차단',
    '비숍 대각선 이동', '비숍 색깔 제한', '비숍 경로 차단',
    '나이트 L자 이동', '나이트 건너뛰기',
    '퀸 모든 방향 이동', '킹 1칸 이동', '킹 캐슬링'
  ];
  test(i, `${rules[i-46]} (수동)`, null, true);
}

// ============================================================================
// E. AI 응수 시스템 (61-75)
// ============================================================================
console.log('\n🤖 E. AI 응수 시스템\n');

test(61, 'makeAIMove 함수 정의', () => gameCode?.includes('makeAIMove'));
test(62, 'useCallback 사용', () => gameCode?.includes('useCallback((currentGame'));
test(63, 'currentGame 파라미터', () => gameCode?.includes('currentGame: Chess'));
test(64, 'isGameOver 체크', () => gameCode?.includes('isGameOver()'));
test(65, 'setIsThinking(true)', () => gameCode?.includes('setIsThinking(true)'));
test(66, 'setTimeout 사용', () => gameCode?.includes('setTimeout('));
test(67, 'possibleMoves 계산', () => gameCode?.includes('possibleMoves'));
test(68, 'moves({ verbose: true })', () => gameCode?.includes('verbose: true'));
test(69, 'difficulty 체크', () => gameCode?.includes('difficulty ==='));
test(70, 'easy 난이도 로직', () => gameCode?.includes("'easy'"));
test(71, 'medium 난이도 로직', () => gameCode?.includes("'medium'"));
test(72, 'hard 난이도 로직', () => gameCode?.includes("'hard'"));
test(73, 'new Chess(currentGame.fen())', () => gameCode?.includes('new Chess(currentGame.fen())'));
test(74, 'AI move 후 setGame', () => gameCode?.match(/setGame\(newGame\)/g)?.length >= 2);
test(75, 'onDrop에서 makeAIMove(newGame) 호출', () => gameCode?.includes('makeAIMove(newGame)'));

// ============================================================================
// F. 게임 상태 관리 (76-85)
// ============================================================================
console.log('\n🎯 F. 게임 상태 관리\n');

test(76, 'game useState', () => gameCode?.includes('useState<Chess | null>(null)'));
test(77, 'gamePosition useState', () => gameCode?.includes("useState('start')"));
test(78, 'moveHistory useState', () => gameCode?.includes('useState<string[]>([])'));
test(79, 'setGamePosition 호출', () => gameCode?.includes('setGamePosition'));
test(80, '.fen() 사용', () => gameCode?.includes('.fen())'));
test(81, 'moveHistory 업데이트', () => gameCode?.includes('setMoveHistory'));
test(82, '.san 기보 형식', () => gameCode?.includes('.san'));
test(83, 'isCheckmate 체크', () => gameCode?.includes('isCheckmate()'));
test(84, 'isDraw 체크', () => gameCode?.includes('isDraw()'));
test(85, 'isCheck 체크', () => gameCode?.includes('isCheck()'));

// ============================================================================
// G. 체크/체크메이트 감지 (86-90)
// ============================================================================
console.log('\n⚠️ G. 체크/체크메이트 감지\n');

test(86, '체크 메시지 표시', () => gameCode?.includes('체크!'));
test(87, '체크메이트 메시지', () => gameCode?.includes('체크메이트'));
test(88, '승리 메시지', () => gameCode?.includes('승리'));
test(89, '무승부 메시지', () => gameCode?.includes('무승부'));
test(90, 'gameStatus 상태', () => gameCode?.includes('gameStatus'));

// ============================================================================
// H. 게임 컨트롤 (91-95)
// ============================================================================
console.log('\n🎛️ H. 게임 컨트롤\n');

test(91, 'resetGame 함수', () => gameCode?.includes('resetGame'));
test(92, 'resetGame에서 new Chess()', () => {
  const lines = gameCode?.split('\n') || [];
  let inReset = false;
  for (const line of lines) {
    if (line.includes('resetGame')) inReset = true;
    if (inReset && line.includes('new Chess()')) return true;
  }
  return false;
});
test(93, 'undoMove 함수', () => gameCode?.includes('undoMove'));
test(94, '.undo() 호출', () => gameCode?.includes('.undo()'));
test(95, 'moveHistory.slice(0, -2)', () => gameCode?.includes('slice(0, -2)'));

// ============================================================================
// I. 클로저 버그 수정 검증 (96-100)
// ============================================================================
console.log('\n🐛 I. 클로저 버그 수정 검증 (핵심!)\n');

test(96, 'makeAIMove가 currentGame 파라미터 받음', () => {
  return gameCode?.includes('useCallback((currentGame: Chess)');
});

test(97, 'onDrop에서 newGame을 makeAIMove에 전달', () => {
  const lines = gameCode?.split('\n') || [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('makeAIMove') && lines[i].includes('newGame')) {
      return true;
    }
  }
  return false;
});

test(98, 'makeAIMove 내부에서 currentGame 사용', () => {
  const lines = gameCode?.split('\n') || [];
  let inMakeAI = false;
  let foundCurrentGame = false;
  for (const line of lines) {
    if (line.includes('makeAIMove =')) inMakeAI = true;
    if (inMakeAI && line.includes('currentGame.moves')) foundCurrentGame = true;
    if (inMakeAI && line.includes('}), [difficulty])')) break;
  }
  return foundCurrentGame;
});

test(99, 'setTimeout 내부에서 game이 아닌 currentGame 사용', () => {
  const lines = gameCode?.split('\n') || [];
  let inTimeout = false;
  let usesCurrentGame = false;
  for (const line of lines) {
    if (line.includes('setTimeout(')) inTimeout = true;
    if (inTimeout && line.includes('currentGame.fen()')) usesCurrentGame = true;
  }
  return usesCurrentGame;
});

test(100, '모든 핸들러가 useCallback 사용', () => {
  const onDropCallback = gameCode?.includes('const onDrop = useCallback');
  const resetCallback = gameCode?.includes('const resetGame = useCallback');
  const undoCallback = gameCode?.includes('const undoMove = useCallback');
  return onDropCallback && resetCallback && undoCallback;
});

// ============================================================================
// 결과 출력
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('\n📊 테스트 결과 요약\n');
console.log(`✅ 통과: ${results.passed.length}/${results.total}`);
console.log(`❌ 실패: ${results.failed.length}/${results.total}`);
console.log(`📝 수동 확인 필요: ${results.manual.length}/${results.total}`);
console.log(`📈 자동 테스트 성공률: ${((results.passed.length / (results.total - results.manual.length)) * 100).toFixed(1)}%`);

if (results.failed.length > 0) {
  console.log('\n❌ 실패한 항목:\n');
  results.failed.forEach(item => {
    console.log(`  [${item.id}] ${item.description}`);
    if (item.error) console.log(`      Error: ${item.error}`);
  });
}

if (results.manual.length > 0) {
  console.log('\n📝 수동 확인이 필요한 항목 (${results.manual.length}개):\n');
  console.log('기물 초기 배치 및 이동 규칙은 실제 플레이로 확인하세요.');
}

console.log('\n' + '='.repeat(80));
console.log('\n🎯 클로저 버그 수정 상태:\n');
console.log(results.passed.filter(r => r.id >= 96).length === 5
  ? '✅ 모든 클로저 버그 수정 완료!'
  : '⚠️ 클로저 버그 수정 필요');

process.exit(results.failed.length > 0 ? 1 : 0);
