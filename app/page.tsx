import Link from 'next/link'
import HeroDemo from '@/components/HeroDemo'
import FeatureCard from '@/components/FeatureCard'
import TestimonialCard from '@/components/TestimonialCard'
import PricingCard from '@/components/PricingCard'
import StatsCounter from '@/components/StatsCounter'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white">
        <div className="absolute inset-0 bg-[url('/chess-pattern.svg')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Value Proposition */}
            <div className="text-center md:text-left">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                ✨ 5-13세 아이들을 위한 최고의 체스 교육
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                아이의 두뇌를
                <br />
                <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                  깨우는 64칸의 모험
                </span>
              </h1>

              <p className="text-lg md:text-xl mb-8 text-purple-100">
                게임처럼 재미있게, 과학적으로 입증된 방법으로
                <br />
                논리력·집중력·문제해결력을 키워주세요
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/worlds">
                  <button className="bg-white text-purple-600 font-bold py-4 px-8 rounded-xl hover:bg-yellow-300 hover:text-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl text-lg">
                    🚀 무료로 시작하기
                  </button>
                </Link>
                <button className="bg-purple-800/50 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-xl hover:bg-purple-700 transition-all duration-300 border-2 border-white/50">
                  📹 영상 보기
                </button>
              </div>

              <div className="mt-8 flex items-center gap-4 justify-center md:justify-start text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-300 text-xl">★★★★★</span>
                  <span className="font-semibold">4.9/5.0</span>
                </div>
                <div className="text-purple-100">| 1,234명의 부모님이 선택</div>
              </div>
            </div>

            {/* Right: Interactive Demo */}
            <div className="transform hover:scale-105 transition-transform duration-500">
              <HeroDemo />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-20">
            <path
              fill="#ffffff"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCounter end={10000} label="활성 학습자" suffix="+" />
            <StatsCounter end={30} label="학습 모듈" suffix="+" />
            <StatsCounter end={95} label="만족도" suffix="%" />
            <StatsCounter end={50000} label="완료된 레슨" suffix="+" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              왜 Chess Quest일까요?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              단순한 체스 게임이 아닙니다. 아이의 미래를 위한 두뇌 트레이닝입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              icon="🧠"
              title="과학적 학습법"
              description="게임화 기반 교육과학 적용"
              gradient="from-blue-500 to-cyan-500"
              benefits={[
                '단계별 난이도 조절',
                '즉각적인 피드백',
                '성취감 극대화 설계',
              ]}
            />
            <FeatureCard
              icon="🎮"
              title="게임처럼 재미있게"
              description="아이들이 스스로 찾는 학습"
              gradient="from-purple-500 to-pink-500"
              benefits={[
                '5개 월드, 30+ 모듈',
                'XP와 레벨 시스템',
                '업적 배지 수집',
              ]}
            />
            <FeatureCard
              icon="📊"
              title="학부모 대시보드"
              description="아이의 성장을 한눈에"
              gradient="from-green-500 to-emerald-500"
              benefits={[
                '학습 시간 트래킹',
                '실력 향상 그래프',
                '주간 리포트 발송',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white shadow-2xl transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              학부모님들의 생생한 후기
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              1,000명 이상의 부모님이 효과를 경험했습니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <TestimonialCard
              name="김지연"
              role="7세 자녀 어머니"
              avatar="👩"
              rating={5}
              comment="아이가 하루도 빠짐없이 스스로 켜서 공부해요. 게임하듯 배우니까 집중력이 정말 좋아졌어요!"
            />
            <TestimonialCard
              name="박민수"
              role="10세 자녀 아버지"
              avatar="👨"
              rating={5}
              comment="수학 성적이 눈에 띄게 올랐습니다. 논리적 사고력이 확실히 발전한 것 같아요."
            />
            <TestimonialCard
              name="이수정"
              role="9세 자녀 어머니"
              avatar="👩"
              rating={5}
              comment="학원 안 보내도 되니 비용도 절약되고, 아이는 더 재미있어 합니다. 최고예요!"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              지금 시작하세요
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              먼저 무료로 체험하고, 마음에 들면 업그레이드하세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            <PricingCard
              title="무료 플랜"
              price="₩0"
              period="영구 무료"
              gradient="from-gray-500 to-gray-600"
              features={[
                'World 1 (기초 규칙) 전체 무료',
                'AI 대국 (쉬움 난이도)',
                '기본 통계 제공',
                '광고 포함',
              ]}
              cta="무료로 시작하기"
              href="/worlds"
            />
            <PricingCard
              title="프리미엄"
              price="₩9,900"
              period="월"
              gradient="from-purple-600 to-pink-600"
              isPopular
              features={[
                '모든 월드 무제한 접근 (30+ 모듈)',
                'AI 대국 (모든 난이도)',
                '학부모 대시보드',
                '광고 없음',
                '1:1 코칭 (주 1회)',
                '수료증 발급',
              ]}
              cta="7일 무료 체험 시작"
              href="/worlds"
            />
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              💳 언제든 취소 가능 · 환불 보장 · 안전한 결제
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl transition-all duration-700 rounded-t-3xl">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            아이의 잠재력을 깨울 준비가 되셨나요?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-purple-100">
            지금 바로 무료로 시작하세요. 신용카드 필요 없습니다.
          </p>
          <Link href="/worlds">
            <button className="bg-white text-purple-600 font-bold py-5 px-10 rounded-xl hover:bg-yellow-300 hover:text-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl text-xl">
              🚀 무료로 시작하기
            </button>
          </Link>
          <p className="mt-6 text-sm text-purple-200">
            이미 1,234명의 부모님이 선택했습니다
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Chess Quest</h3>
              <p className="text-sm">
                아이의 두뇌를 깨우는
                <br />
                64칸의 모험
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">제품</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/worlds" className="hover:text-white transition-colors">
                    학습 모드
                  </Link>
                </li>
                <li>
                  <Link href="/#ai" className="hover:text-white transition-colors">
                    AI 대국
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    가격
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">회사</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    소개
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    블로그
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    문의
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">법적 고지</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    개인정보 처리방침
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    이용약관
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>© 2025 Chess Quest. All rights reserved.</p>
            <p className="mt-2">Made with ♟️ and ❤️ for young minds</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
