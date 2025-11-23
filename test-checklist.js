#!/usr/bin/env node

/**
 * Chess Quest - 자동 검증 스크립트
 * 100개 체크리스트 항목을 자동으로 검증합니다.
 */

const fs = require('fs');
const path = require('path');

// 결과 저장
const results = {
  passed: [],
  failed: [],
  manual: [], // 수동 확인 필요
  total: 0
};

// 유틸리티: 파일 존재 확인
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

// 유틸리티: 파일 내용 읽기
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

// 유틸리티: JSON 파싱
function parseJSON(filePath) {
  try {
    const content = readFile(filePath);
    return content ? JSON.parse(content) : null;
  } catch {
    return null;
  }
}

// 테스트 실행
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
    console.log(`❌ [${id}] ${description} (Error: ${error.message})`);
  }
}

console.log('🚀 Chess Quest 자동 테스트 시작\n');
console.log('=' .repeat(80));

// ============================================================================
// A. 프로젝트 설정 & 빌드 (1-10)
// ============================================================================
console.log('\n📦 A. 프로젝트 설정 & 빌드\n');

test(1, 'package.json 존재 확인', () => fileExists('package.json'));

test(2, 'package.json에 필수 의존성 확인', () => {
  const pkg = parseJSON('package.json');
  return pkg &&
    pkg.dependencies?.['react'] &&
    pkg.dependencies?.['next'] &&
    pkg.dependencies?.['chess.js'] &&
    pkg.dependencies?.['react-chessboard'];
});

test(3, 'tsconfig.json 존재 및 설정 확인', () => {
  const tsconfig = parseJSON('tsconfig.json');
  return tsconfig && tsconfig.compilerOptions?.strict === true;
});

test(4, 'next.config.js 존재 확인', () => fileExists('next.config.js'));

test(5, 'tailwind.config.ts 존재 확인', () => fileExists('tailwind.config.ts'));

test(6, '.eslintrc.json 존재 확인', () => fileExists('.eslintrc.json'));

test(7, 'dev 스크립트 존재 확인', () => {
  const pkg = parseJSON('package.json');
  return pkg?.scripts?.dev === 'next dev';
});

test(8, 'build 스크립트 존재 확인', () => {
  const pkg = parseJSON('package.json');
  return pkg?.scripts?.build === 'next build';
});

test(9, '.gitignore 존재 확인', () => fileExists('.gitignore'));

test(10, 'README.md 존재 확인', () => fileExists('README.md'));

// ============================================================================
// B. 홈페이지 (11-20)
// ============================================================================
console.log('\n🏠 B. 홈페이지 구조\n');

test(11, 'app/page.tsx 존재 확인', () => fileExists('app/page.tsx'));

test(12, '홈페이지에 Chess Quest 타이틀 포함', () => {
  const content = readFile('app/page.tsx');
  return content?.includes('Chess Quest');
});

test(13, '홈페이지에 부제 포함', () => {
  const content = readFile('app/page.tsx');
  return content?.includes('The Grandmaster');
});

test(14, '홈페이지에 한글 부제 포함', () => {
  const content = readFile('app/page.tsx');
  return content?.includes('아이의 두뇌를 깨우는 64칸의 모험');
});

test(15, '학습 모드 카드 존재 확인', () => {
  const content = readFile('app/page.tsx');
  return content?.includes('학습 모드');
});

test(16, 'AI 대국 카드 존재 확인', () => {
  const content = readFile('app/page.tsx');
  return content?.includes('AI 대국');
});

test(17, '/worlds 링크 존재 확인', () => {
  const content = readFile('app/page.tsx');
  return content?.includes('href="/worlds"');
});

test(18, 'ChessGame 컴포넌트 임포트 확인', () => {
  const content = readFile('app/page.tsx');
  return content?.includes("import ChessGame from '@/components/ChessGame'");
});

test(19, '푸터 텍스트 확인', () => {
  const content = readFile('app/page.tsx');
  return content?.includes('Made with');
});

test(20, '그라데이션 배경 확인', () => {
  const content = readFile('app/page.tsx');
  return content?.includes('from-blue-50 to-purple-50');
});

// ============================================================================
// C. 체스판 & 게임 기본 (21-35)
// ============================================================================
console.log('\n♟️ C. 체스판 & 게임 컴포넌트\n');

test(21, 'ChessGame.tsx 존재 확인', () => fileExists('components/ChessGame.tsx'));

test(22, 'Chessboard 컴포넌트 임포트 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes("import { Chessboard } from 'react-chessboard'");
});

test(23, 'Chess.js 임포트 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes("import { Chess } from 'chess.js'");
});

test(24, '체스판 색상 설정 확인 (밝은 칸)', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('#F0D9B5');
});

test(25, '체스판 색상 설정 확인 (어두운 칸)', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('#B58863');
});

test(26, 'useState 사용 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('useState');
});

test(27, 'useEffect 사용 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('useEffect');
});

test(28, 'border-radius 스타일 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('borderRadius');
});

test(29, 'box-shadow 스타일 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('boxShadow');
});

test(30, '배경 카드 스타일 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('bg-white');
});

test(31, 'client component 선언 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.startsWith("'use client'");
});

test(32, '로딩 상태 처리 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('게임을 불러오는 중');
});

test(33, 'game null 체크 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('if (!game)');
});

test(34, '반응형 보드 크기 설정 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('setBoardWidth');
});

test(35, '최대 너비 550px 설정 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('550');
});

// ============================================================================
// D. 게임 플레이 - 기물 이동 (36-50) - 대부분 수동 확인 필요
// ============================================================================
console.log('\n🎮 D. 게임 플레이 - 기물 이동 (수동 확인 필요)\n');

test(36, 'onDrop 핸들러 존재 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('onDrop');
});

test(37, 'onPieceDrop prop 전달 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('onPieceDrop={onDrop}');
});

for (let i = 38; i <= 50; i++) {
  test(i, `기물 이동 기능 ${i-37} (수동 테스트)`, null, true);
}

// ============================================================================
// E. AI 대국 기능 (51-65)
// ============================================================================
console.log('\n🤖 E. AI 대국 기능\n');

test(51, 'makeAIMove 함수 존재 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('makeAIMove');
});

test(52, 'AI 생각 중 메시지 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('AI가 생각 중');
});

test(53, 'AI 응수 딜레이 확인 (500ms)', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('500');
});

test(54, 'possibleMoves 사용 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('possibleMoves');
});

test(55, '난이도 타입 정의 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes("type DifficultyLevel = 'easy' | 'medium' | 'hard'");
});

test(56, 'easy 난이도 로직 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes("difficulty === 'easy'");
});

test(57, 'medium 난이도 로직 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes("difficulty === 'medium'");
});

test(58, 'hard 난이도 로직 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes("difficulty === 'hard'");
});

test(59, 'setDifficulty 함수 사용 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('setDifficulty');
});

test(60, '난이도 버튼 존재 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('쉬움') && content?.includes('보통') && content?.includes('어려움');
});

test(61, '쉬움 버튼 색상 (초록색)', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('bg-green-500');
});

test(62, '보통 버튼 색상 (노란색)', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('bg-yellow-500');
});

test(63, '어려움 버튼 색상 (빨간색)', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('bg-red-500');
});

test(64, '난이도 상태 관리 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('useState<DifficultyLevel>');
});

test(65, 'AI는 흑으로 플레이 (수동 확인)', null, true);

// ============================================================================
// F. 게임 상태 & 규칙 (66-75)
// ============================================================================
console.log('\n🎯 F. 게임 상태 & 규칙\n');

test(66, 'isCheck 체크 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('isCheck()');
});

test(67, '체크 메시지 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('체크!');
});

test(68, 'isCheckmate 체크 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('isCheckmate()');
});

test(69, '승리 메시지 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('승리');
});

test(70, 'isDraw 체크 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('isDraw()');
});

test(71, '무승부 메시지 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('무승부');
});

test(72, 'isGameOver 체크 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('isGameOver()');
});

test(73, '프로모션 설정 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes("promotion: 'q'");
});

test(74, '캐슬링 (수동 테스트)', null, true);
test(75, '앙파상 (수동 테스트)', null, true);

// ============================================================================
// G. 게임 컨트롤 (76-85)
// ============================================================================
console.log('\n🎛️ G. 게임 컨트롤\n');

test(76, '새 게임 버튼 텍스트 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('새 게임');
});

test(77, 'resetGame 함수 존재 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('resetGame');
});

test(78, 'resetGame에서 new Chess() 호출 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  const lines = content?.split('\n') || [];
  let inResetGame = false;
  for (const line of lines) {
    if (line.includes('const resetGame')) inResetGame = true;
    if (inResetGame && line.includes('new Chess()')) return true;
  }
  return false;
});

test(79, 'resetGame에서 기보 초기화 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('setMoveHistory([])');
});

test(80, '무르기 버튼 텍스트 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('무르기');
});

test(81, '무르기 버튼 disabled 조건 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('moveHistory.length < 2');
});

test(82, 'undoMove 함수 존재 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('undoMove');
});

test(83, 'undo() 호출 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('undo()');
});

test(84, '무르기 후 기보 업데이트 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('slice(0, -2)');
});

test(85, '버튼 스타일 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('bg-blue-500') || content?.includes('bg-purple-500');
});

// ============================================================================
// H. 기보 (86-90)
// ============================================================================
console.log('\n📜 H. 기보 (Notation)\n');

test(86, '기보 섹션 제목 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('기보');
});

test(87, 'moveHistory 상태 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('moveHistory');
});

test(88, '수 번호 표시 로직 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('Math.floor(index / 2) + 1');
});

test(89, '기보 스크롤 가능 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('overflow-y-auto');
});

test(90, '빈 기보 메시지 확인', () => {
  const content = readFile('components/ChessGame.tsx');
  return content?.includes('아직 수가 없습니다');
});

// ============================================================================
// I. 월드맵 시스템 (91-100)
// ============================================================================
console.log('\n🗺️ I. 월드맵 시스템\n');

test(91, '/worlds 페이지 존재 확인', () => fileExists('app/worlds/page.tsx'));

test(92, 'WorldCard 컴포넌트 존재 확인', () => fileExists('components/WorldCard.tsx'));

test(93, 'ModuleCard 컴포넌트 존재 확인', () => fileExists('components/ModuleCard.tsx'));

test(94, 'worlds 데이터 파일 존재 확인', () => fileExists('data/worlds.ts'));

test(95, 'curriculum 타입 정의 존재 확인', () => fileExists('types/curriculum.ts'));

test(96, 'world1 데이터 확인', () => {
  const content = readFile('data/worlds.ts');
  return content?.includes('world1');
});

test(97, 'world2 데이터 확인', () => {
  const content = readFile('data/worlds.ts');
  return content?.includes('world2');
});

test(98, '월드 상세 페이지 존재 확인', () => fileExists('app/worlds/[worldId]/page.tsx'));

test(99, '진행도 바 표시 로직 확인', () => {
  const content = readFile('components/WorldCard.tsx');
  return content?.includes('progress');
});

test(100, '사용자 통계 표시 확인', () => {
  const content = readFile('app/worlds/page.tsx');
  return content?.includes('총 XP') || content?.includes('연속일');
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
  console.log('\n📝 수동 확인이 필요한 항목:\n');
  results.manual.forEach(item => {
    console.log(`  [${item.id}] ${item.description}`);
  });
}

console.log('\n' + '='.repeat(80));

// 종료 코드
process.exit(results.failed.length > 0 ? 1 : 0);
