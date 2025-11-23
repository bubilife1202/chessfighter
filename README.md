# ♟️ Chess Quest: The Grandmaster's Journey

**부제: 아이의 두뇌를 깨우는 64칸의 모험**

전 세계 아이들이 가장 처음 만나는, 그리고 가장 오래 머무는 체스 교육 플랫폼입니다.

## 🎯 프로젝트 비전

복잡한 체스 이론을 RPG 게임처럼 재미있게 분해하여, 5세 아이도 자연스럽게 그랜드마스터의 사고방식을 습득하게 합니다.

## 🚀 주요 기능

### Phase 1: MVP (현재 버전)
- ✅ **인터랙티브 체스판**: 드래그 앤 드롭으로 직관적인 기물 이동
- ✅ **AI 대국**: 3단계 난이도 (쉬움, 보통, 어려움)
- ✅ **게임 기능**:
  - 새 게임 시작
  - 무르기 (2수 되돌리기)
  - 실시간 기보 표시
  - 체크/체크메이트 알림
- ✅ **반응형 디자인**: 모바일부터 데스크톱까지 대응

### 예정된 기능 (Phase 2-4)
- 📚 월드맵 기반 커리큘럼 (World 1-5)
- 🎮 게이미피케이션 (XP, 레벨, 스트릭 시스템)
- 🎨 아바타 커스터마이징
- 🧩 전술 퍼즐 모드
- 📊 학부모 대시보드
- 💾 사용자 계정 시스템 (Supabase 연동)

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Chess Engine**:
  - chess.js (게임 로직 및 규칙 검증)
  - react-chessboard (체스판 UI)
  - js-chess-engine (AI 엔진)

### State Management
- Zustand (계획 중)

### Backend (예정)
- Supabase (인증, 데이터베이스, 실시간 기능)

## 📦 설치 및 실행

### 요구사항
- Node.js 18.17 이상
- npm 또는 yarn

### 설치
```bash
# 저장소 클론
git clone <repository-url>
cd chessfighter

# 의존성 설치
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 빌드
```bash
npm run build
npm start
```

## 📁 프로젝트 구조

```
chessfighter/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   └── globals.css        # 글로벌 스타일
├── components/            # React 컴포넌트
│   └── ChessGame.tsx      # 메인 체스 게임 컴포넌트
├── public/               # 정적 파일
├── package.json          # 프로젝트 의존성
├── tsconfig.json         # TypeScript 설정
├── tailwind.config.ts    # Tailwind CSS 설정
└── next.config.js        # Next.js 설정
```

## 🎮 사용 방법

1. **게임 시작**: 페이지 로드 시 자동으로 새 게임이 시작됩니다
2. **기물 이동**: 백(흰색) 기물을 드래그하여 원하는 위치에 드롭
3. **AI 턴**: 플레이어가 수를 두면 AI가 자동으로 응수합니다
4. **난이도 조절**: 게임 중 언제든지 난이도 변경 가능
5. **무르기**: 실수한 경우 무르기 버튼으로 2수 되돌리기 가능
6. **새 게임**: 언제든지 새 게임 버튼으로 재시작

## 🎓 교육 커리큘럼 (예정)

### World 1: The Awakening (기초 규칙)
- 룩, 비숍, 퀸, 나이트, 폰의 움직임
- 체크메이트의 개념

### World 2: The Tactical Forest (전술의 숲)
- 핀(Pin), 포크(Fork), 스큐어(Skewer)
- 디스커버드 어택

### World 3: The Strategy Castle (전략의 성)
- 중앙 지배, 기물 전개
- 킹의 안전, 캐슬링

### World 4: The Grandmaster's Challenge (심화 전술)
- 쯔비셴추그, 엑스레이 공격
- 희생 전술

### World 5: Endgame Mastery (엔드게임)
- 킹과 폰 엔드게임
- 룩 엔드게임
- 스테일메이트 회피

## 🎨 디자인 철학

"체스를 '공부'가 아닌 '모험'으로"

- **판타지 어드벤처 테마**: 스토리텔링 기반 학습
- **시각적 피드백**: 애니메이션과 이펙트로 몰입감 극대화
- **청각적 보상**: 배경음악과 효과음 (예정)
- **즉각적인 보상**: XP, 레벨업, 아바타 커스터마이징 (예정)

## 📊 개발 로드맵

- [x] **Phase 1**: MVP (1개월) - 기본 체스 대국 기능
- [ ] **Phase 2**: Content & Curriculum (2-3개월) - 교육 모듈 구현
- [ ] **Phase 3**: Gamification & Polish (4개월) - 게임 요소 추가
- [ ] **Phase 4**: Launch & Monetization (5개월) - 정식 출시

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면 Pull Request를 보내주세요!

## 📄 라이센스

MIT License

## 👨‍💻 개발자

Chess Quest Development Team

---

**Made with ♟️ and ❤️ for young minds**
