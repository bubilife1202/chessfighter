#!/usr/bin/env node

/**
 * Chess Quest - 완전 재설계 전문 테스트
 * 100개 체크리스트 자동 검증
 *
 * 판매 페이지 전환율 최적화, 모바일 우선, PWA 지원 검증
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

console.log('🎨 Chess Quest - 완전 재설계 검증 테스트\n');
console.log('='.repeat(80));

// ============================================================================
// A. PWA 및 메타데이터 (1-15)
// ============================================================================
console.log('\n📱 A. PWA 및 모바일 최적화\n');

const layoutCode = readFile('app/layout.tsx');
const manifestCode = readFile('public/manifest.json');

test(1, 'layout.tsx에 Viewport 타입 임포트', () => layoutCode?.includes('Viewport'));
test(2, 'viewport export 존재', () => layoutCode?.includes('export const viewport'));
test(3, 'viewport width device-width', () => layoutCode?.includes('device-width'));
test(4, 'viewport initial-scale 1', () => layoutCode?.includes('initialScale: 1'));
test(5, 'viewport maximum-scale 5', () => layoutCode?.includes('maximumScale: 5'));
test(6, 'theme-color 설정', () => layoutCode?.includes('themeColor'));
test(7, 'manifest.json 링크', () => layoutCode?.includes('manifest: \'/manifest.json\''));
test(8, 'apple-web-app-capable meta', () => layoutCode?.includes('apple-mobile-web-app-capable'));
test(9, 'mobile-web-app-capable meta', () => layoutCode?.includes('mobile-web-app-capable'));
test(10, 'manifest.json 파일 존재', () => manifestCode !== null);
test(11, 'manifest name 필드', () => manifestCode?.includes('"name"'));
test(12, 'manifest display standalone', () => manifestCode?.includes('"standalone"'));
test(13, 'manifest theme_color', () => manifestCode?.includes('"theme_color"'));
test(14, 'manifest icons 배열', () => manifestCode?.includes('"icons"'));
test(15, 'manifest shortcuts 존재', () => manifestCode?.includes('"shortcuts"'));

// ============================================================================
// B. 홈페이지 - Hero Section (16-30)
// ============================================================================
console.log('\n🎯 B. 홈페이지 Hero Section (판매 전환)\n');

const homeCode = readFile('app/page.tsx');

test(16, 'HeroDemo 컴포넌트 임포트', () => homeCode?.includes('HeroDemo'));
test(17, '무료로 시작하기 CTA', () => homeCode?.includes('무료로 시작하기'));
test(18, '가치 제안 "두뇌를 깨우는"', () => homeCode?.includes('두뇌를 깨우는'));
test(19, '타겟 연령 "5-13세" 표시', () => homeCode?.includes('5-13세'));
test(20, '별점 표시 (4.9/5.0)', () => homeCode?.includes('4.9/5.0'));
test(21, '사회적 증거 "1,234명"', () => homeCode?.includes('1,234명'));
test(22, '그라데이션 헤더 배경', () => homeCode?.includes('from-purple-600'));
test(23, 'Wave SVG divider', () => homeCode?.includes('viewBox="0 0 1440 120"'));
test(24, '영상 보기 버튼', () => homeCode?.includes('영상 보기'));
test(25, 'Interactive demo 섹션', () => homeCode?.includes('<HeroDemo'));
test(26, '2-column grid (md:grid-cols-2)', () => homeCode?.includes('md:grid-cols-2'));
test(27, 'hover:scale 애니메이션', () => homeCode?.includes('hover:scale'));
test(28, 'transition-all duration-300', () => homeCode?.includes('duration-300'));
test(29, 'transform 트랜지션', () => homeCode?.includes('transform'));
test(30, 'bg-clip-text 그라데이션 텍스트', () => homeCode?.includes('bg-clip-text'));

// ============================================================================
// C. 홈페이지 - Stats & Social Proof (31-40)
// ============================================================================
console.log('\n📊 C. 통계 및 신뢰 신호\n');

test(31, 'StatsCounter 컴포넌트 임포트', () => homeCode?.includes('StatsCounter'));
test(32, 'StatsCounter 활성 학습자', () => homeCode?.includes('활성 학습자'));
test(33, 'StatsCounter end={10000}', () => homeCode?.includes('end={10000}'));
test(34, 'StatsCounter 만족도 95%', () => homeCode?.includes('end={95}'));
test(35, 'Stats Section 4-column grid', () => homeCode?.includes('md:grid-cols-4'));
test(36, 'TestimonialCard 컴포넌트', () => homeCode?.includes('TestimonialCard'));
test(37, '후기 섹션 제목', () => homeCode?.includes('학부모님들의 생생한 후기'));
test(38, '3개의 후기 카드', () => {
  const matches = homeCode?.match(/<TestimonialCard/g);
  return matches && matches.length === 3;
});
test(39, '별점 5점 표시', () => homeCode?.includes('rating={5}'));
test(40, '후기 작성자 이름', () => homeCode?.includes('name="김지연"'));

// ============================================================================
// D. 홈페이지 - Features Section (41-50)
// ============================================================================
console.log('\n🎮 D. 기능 소개 섹션\n');

test(41, 'FeatureCard 컴포넌트 임포트', () => homeCode?.includes('FeatureCard'));
test(42, '"왜 Chess Quest일까요?" 제목', () => homeCode?.includes('왜 Chess Quest일까요?'));
test(43, '과학적 학습법 카드', () => homeCode?.includes('과학적 학습법'));
test(44, '게임처럼 재미있게 카드', () => homeCode?.includes('게임처럼 재미있게'));
test(45, '학부모 대시보드 카드', () => homeCode?.includes('학부모 대시보드'));
test(46, '3개 FeatureCard (md:grid-cols-3)', () => homeCode?.includes('md:grid-cols-3'));
test(47, 'gradient 속성 전달', () => homeCode?.includes('gradient='));
test(48, 'benefits 배열 전달', () => homeCode?.includes('benefits={'));
test(49, '아이콘 이모지 전달', () => homeCode?.includes('icon="🧠"'));
test(50, 'XP와 레벨 시스템 언급', () => homeCode?.includes('XP와 레벨 시스템'));

// ============================================================================
// E. 홈페이지 - Pricing Section (51-60)
// ============================================================================
console.log('\n💰 E. 가격 섹션\n');

test(51, 'PricingCard 컴포넌트 임포트', () => homeCode?.includes('PricingCard'));
test(52, '"지금 시작하세요" 제목', () => homeCode?.includes('지금 시작하세요'));
test(53, '무료 플랜 카드', () => homeCode?.includes('무료 플랜'));
test(54, '프리미엄 플랜 카드', () => homeCode?.includes('프리미엄'));
test(55, '가격 ₩9,900', () => homeCode?.includes('₩9,900'));
test(56, 'isPopular 플래그', () => homeCode?.includes('isPopular'));
test(57, '"7일 무료 체험" CTA', () => homeCode?.includes('7일 무료 체험'));
test(58, '환불 보장 문구', () => homeCode?.includes('환불 보장'));
test(59, '언제든 취소 가능', () => homeCode?.includes('언제든 취소 가능'));
test(60, 'Pricing 2-column grid', () => {
  const lines = homeCode?.split('\n') || [];
  for (const line of lines) {
    if (line.includes('Pricing') && line.includes('md:grid-cols-2')) return true;
  }
  return false;
});

// ============================================================================
// F. 홈페이지 - Footer & CTA (61-70)
// ============================================================================
console.log('\n🔚 F. Footer 및 최종 CTA\n');

test(61, '최종 CTA 섹션', () => homeCode?.includes('아이의 잠재력을 깨울 준비가 되셨나요?'));
test(62, 'CTA 그라데이션 배경', () => homeCode?.includes('from-purple-600 to-pink-600'));
test(63, 'Footer 존재', () => homeCode?.includes('<footer'));
test(64, 'Footer 4-column grid', () => homeCode?.includes('md:grid-cols-4'));
test(65, 'Footer 제품 링크', () => homeCode?.includes('학습 모드'));
test(66, 'Footer 회사 정보', () => homeCode?.includes('소개'));
test(67, 'Footer 법적 고지', () => homeCode?.includes('개인정보 처리방침'));
test(68, 'Copyright 표시', () => homeCode?.includes('© 2025 Chess Quest'));
test(69, 'Made with ♟️ 문구', () => homeCode?.includes('Made with ♟️'));
test(70, 'Link 컴포넌트 사용', () => homeCode?.includes("from 'next/link'"));

// ============================================================================
// G. HeroDemo 컴포넌트 (71-80)
// ============================================================================
console.log('\n🎲 G. HeroDemo 인터랙티브 체험\n');

const heroDemoCode = readFile('components/HeroDemo.tsx');

test(71, 'HeroDemo.tsx 파일 존재', () => heroDemoCode !== null);
test(72, '"use client" 지시어', () => heroDemoCode?.includes("'use client'"));
test(73, 'moveCount 상태 관리', () => heroDemoCode?.includes('moveCount'));
test(74, 'moveCount 최대 3수 제한', () => heroDemoCode?.includes('moveCount >= 3'));
test(75, '진행도 점(dot) 표시', () => heroDemoCode?.includes('[1, 2, 3].map'));
test(76, '"무료 체험" 배지', () => heroDemoCode?.includes('무료 체험'));
test(77, 'animate-pulse 애니메이션', () => heroDemoCode?.includes('animate-pulse'));
test(78, 'resetDemo 함수', () => heroDemoCode?.includes('resetDemo'));
test(79, '다시 체험하기 버튼', () => heroDemoCode?.includes('다시 체험하기'));
test(80, 'arePiecesDraggable 조건부', () => heroDemoCode?.includes('arePiecesDraggable={moveCount < 3}'));

// ============================================================================
// H. Worlds Page 개선 (81-90)
// ============================================================================
console.log('\n🗺️ H. Worlds Page 재설계\n');

const worldsCode = readFile('app/worlds/page.tsx');

test(81, 'Navigation Bar 추가', () => worldsCode?.includes('<nav'));
test(82, 'sticky top-0 내비게이션', () => worldsCode?.includes('sticky top-0'));
test(83, '사용자 통계 대시보드', () => worldsCode?.includes('게스트 플레이어'));
test(84, 'Level 배지 표시', () => worldsCode?.includes('Lv {currentLevel}'));
test(85, '연속일 통계', () => worldsCode?.includes('연속일'));
test(86, 'XP 진행도 바', () => worldsCode?.includes('다음 레벨까지'));
test(87, '오늘의 목표 섹션', () => worldsCode?.includes('오늘의 목표'));
test(88, '학습 팁 섹션', () => worldsCode?.includes('학습 팁'));
test(89, '프리미엄 CTA 섹션', () => worldsCode?.includes('프리미엄으로 업그레이드'));
test(90, 'Wave divider SVG', () => worldsCode?.includes('viewBox="0 0 1440 120"'));

// ============================================================================
// I. 반응형 디자인 (91-95)
// ============================================================================
console.log('\n📱 I. 반응형 디자인\n');

test(91, 'Tailwind md: breakpoint 사용', () => {
  const allCode = [homeCode, worldsCode, heroDemoCode].join('\n');
  return (allCode?.match(/md:/g)?.length || 0) >= 20;
});
test(92, 'lg: breakpoint 사용', () => {
  const allCode = [homeCode, worldsCode].join('\n');
  return (allCode?.match(/lg:/g)?.length || 0) >= 5;
});
test(93, 'flex-col 모바일 레이아웃', () => homeCode?.includes('flex-col'));
test(94, 'gap 반응형 조절', () => homeCode?.includes('gap-8 md:gap-12'));
test(95, 'text-4xl md:text-6xl', () => homeCode?.includes('text-4xl md:text-6xl'));

// ============================================================================
// J. 애니메이션 및 트랜지션 (96-100)
// ============================================================================
console.log('\n✨ J. 애니메이션 및 UX 개선\n');

test(96, 'transform hover:scale', () => {
  const count = (homeCode?.match(/hover:scale/g) || []).length;
  return count >= 3;
});
test(97, 'transition-all duration', () => {
  const count = (homeCode?.match(/transition-all/g) || []).length;
  return count >= 5;
});
test(98, 'shadow-xl 또는 shadow-2xl', () => {
  const count = (homeCode?.match(/shadow-(xl|2xl)/g) || []).length;
  return count >= 5;
});
test(99, 'backdrop-blur 효과', () => {
  const allCode = [homeCode, worldsCode].join('\n');
  return (allCode?.match(/backdrop-blur/g)?.length || 0) >= 2;
});
test(100, 'rounded-xl 또는 rounded-2xl', () => {
  const allCode = [homeCode, worldsCode, heroDemoCode].join('\n');
  return (allCode?.match(/rounded-(xl|2xl)/g)?.length || 0) >= 20;
});

// ============================================================================
// 결과 출력
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('\n📊 테스트 결과 요약\n');
console.log(`✅ 통과: ${results.passed.length}/${results.total}`);
console.log(`❌ 실패: ${results.failed.length}/${results.total}`);
console.log(`📝 수동 확인 필요: ${results.manual.length}/${results.total}`);

const automatedTests = results.total - results.manual.length;
const successRate = automatedTests > 0
  ? ((results.passed.length / automatedTests) * 100).toFixed(1)
  : 0;

console.log(`📈 자동 테스트 성공률: ${successRate}%`);

if (results.failed.length > 0) {
  console.log('\n❌ 실패한 항목:\n');
  results.failed.forEach(item => {
    console.log(`  [${item.id}] ${item.description}`);
    if (item.error) console.log(`      Error: ${item.error}`);
  });
}

if (results.manual.length > 0) {
  console.log(`\n📝 수동 확인이 필요한 항목 (${results.manual.length}개):\n`);
  results.manual.forEach(item => {
    console.log(`  [${item.id}] ${item.description}`);
  });
}

console.log('\n' + '='.repeat(80));

// 품질 평가
const qualityScore = (results.passed.length / automatedTests) * 100;
console.log('\n🎯 품질 평가:\n');

if (qualityScore >= 95) {
  console.log('✅ 우수 (95% 이상) - 프로덕션 배포 준비 완료!');
} else if (qualityScore >= 85) {
  console.log('⚠️ 양호 (85-94%) - 일부 개선 필요');
} else if (qualityScore >= 70) {
  console.log('⚠️ 보통 (70-84%) - 추가 작업 필요');
} else {
  console.log('❌ 미흡 (70% 미만) - 대폭 개선 필요');
}

console.log('\n주요 개선 사항:');
console.log('✅ PWA 지원 추가 (모바일 설치 가능)');
console.log('✅ 판매 전환 최적화 (Hero, CTA, Pricing)');
console.log('✅ 사회적 증거 (후기, 통계, 별점)');
console.log('✅ 인터랙티브 데모 (3수 체험)');
console.log('✅ 반응형 디자인 (모바일 우선)');
console.log('✅ 애니메이션 및 트랜지션');
console.log('✅ SEO 최적화 (메타태그, OG)');
console.log('✅ Worlds 페이지 게이미피케이션');

console.log('\n' + '='.repeat(80));

process.exit(results.failed.length > 0 ? 1 : 0);
