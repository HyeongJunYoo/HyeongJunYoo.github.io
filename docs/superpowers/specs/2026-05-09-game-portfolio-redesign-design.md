# Game Portfolio Redesign — Design Spec

**Date:** 2026-05-09
**Scope:** `src/pages/portfolio.astro` + `src/styles/portfolio.css` 의 레이아웃·디자인 개선
**Status:** Draft

## 1. Goal & Non-Goals

### Goal

현재 포트폴리오는 추상 UI/모션 디자이너 톤으로 구성되어 있다. 이를 **게임 프로그래머용 포트폴리오** 레이아웃으로 전환한다. 본 스펙은 **레이아웃·디자인·정보 구조**만 다루며, 실제 프로젝트 콘텐츠와 이미지는 샘플 placeholder로 채운다.

### Non-Goals

- 실제 프로젝트 데이터 입력 (별도 작업)
- 실제 트레일러·스크린샷 교체 (별도 작업)
- 백엔드/CMS 연동
- About / Contact 페이지 본문 (이번엔 footer 슬롯만)
- i18n 다국어 처리

## 2. Direction Summary

세 가지 방향성 (A. Avant-garde 유지 / B. Cinematic Studio / C. Hybrid Lab) 중 **C. Hybrid Lab** 선택.

- 차별화(현재 인터랙션 자산) + 친숙함(채용담당자 빠른 스캔)의 중간점
- 기존 World/Grid/Deck 3가지 뷰 모드는 **유지** — 게임 프로그래머의 "인터랙션 시스템 능력"을 메타적으로 시연
- 단, **Grid를 기본 모드**로 하고, 정보 밀도를 가장 높게 부여
- Featured Hero는 **모드와 무관**하게 항상 고정 (별도 영역)

## 3. Page-Level Structure

스크롤 흐름: Header → Hero → Project Section → Footer.
디테일 페이지는 카드 클릭 시 풀스크린 모달로 take-over.

```
┌─ Header (slim, fixed top) ────────────────────────────────┐
│  ● HYEONGJUN YOO / GAME PROGRAMMER     About · Contact ·  │
│                                         GitHub · LinkedIn │
├──────────────────────────────────────────────────────────┤
│                                                          │
│            FEATURED HERO  (16:9, full container width)    │
│            Trailer loop / big still                       │
│            ┌─────────── gradient scrim ──────────┐        │
│            │ FEATURED 01 · UNREAL · MULTIPLAYER  │        │
│            │ PROJECT TITLE                       │        │
│            │ 한 줄 요약                           │        │
│            │ [▶ PLAY]  [CASE STUDY →]  [SOURCE]  │        │
│            └─────────────────────────────────────┘        │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  OTHER PROJECTS                       [Grid|Deck|World]⏸  │
│  WORK ARCHIVE                                            │
│                                                          │
│  ┌──────────┐  ┌──────────┐                              │
│  │  CORE 02 │  │  CORE 03 │   (mode-switched area)       │
│  └──────────┘  └──────────┘                              │
│  ┌──────────┐  ┌──────────┐                              │
│  │  CORE 04 │  │  CORE 05 │                              │
│  └──────────┘  └──────────┘                              │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  About — 한 줄 본인 소개         contact · GitHub · LinkedIn │
└──────────────────────────────────────────────────────────┘
```

## 4. Component Specs

### 4.1 Header (slim, fixed top)

- **Position:** `position: fixed`, top, 풀폭. 백드롭 블러 유지 (현재 스타일 차용).
- **Left:** `● HYEONGJUN YOO / GAME PROGRAMMER` — 본인 이름 + 역할 한 줄.
- **Right:** Nav 링크 (`About` · `Contact` · `GitHub` · `LinkedIn`). 모두 외부 링크 또는 페이지 내 앵커.
- **Mode 탭과 Pause 토글은 Header에서 제거** — Projects 섹션으로 이동.
- 높이: 약 48–56px. 단순.

### 4.2 Featured Hero (16:9 cinematic)

- **비율:** `aspect-ratio: 16/9`. 컨테이너 max-width(약 1480px) 안에서 풀폭.
- **Media slot:** 비디오 자동재생 루프(음소거) 또는 큰 스틸 이미지. `<video>` 또는 `<img>` 둘 다 받을 수 있는 구조.
  - 샘플 단계에서는 큰 plain 그라디언트 + 더미 텍스트 "▶ TRAILER LOOP" 로 채움.
- **하단 오버레이:** `linear-gradient(180deg, transparent, rgba(0,0,0,.85) 60%)` 그라디언트 위에 다음을 겹친다:
  - Eyebrow line: `FEATURED 01 · 2025 · UNREAL · MULTIPLAYER · SHIPPED` (작은 글씨, 액센트 톤 컬러)
  - **Title** — 큰 타이틀 (clamp 32px → 88px), uppercase, 950 weight
  - Lead paragraph — 한 줄 요약 (max-width 60%)
  - **CTA 3개:**
    - Primary `▶ PLAY DEMO` (밝은 배경, 다크 텍스트)
    - Secondary `CASE STUDY →` (외곽선)
    - Secondary `SOURCE` (외곽선)
- **Tone:** Featured 프로젝트의 톤(예: hot=핑크) 컬러를 보더 + 액센트로 사용.
- **Hover/idle interaction:** 비디오는 자동 루프. 사용자가 hover 시 약간의 zoom 효과 가능 (선택).
- **Responsive:** 모바일에서도 16:9 유지. 텍스트 크기는 clamp.
- **Featured 1개 고정** — 데이터에서 `level: "featured"` 인 **첫 항목**만 Hero에 사용. 샘플 데이터(§6)에는 featured 1개만 두어 충돌 없음.

### 4.3 Project Section Header

좌·우 분리된 한 줄.

- **좌측 (라벨 그룹):**
  - 작은 eyebrow (액센트 컬러, uppercase): `OTHER PROJECTS`
  - 큰 헤딩: `WORK ARCHIVE`
- **우측 (모드 컨트롤 그룹):**
  - **Mode 탭** — 가로 3-segment toggle: `Grid` | `Deck` | `World`
    - 현재 선택 상태는 fill + ink 컬러
    - 비선택은 muted 컬러
  - **Pause 토글** (⏸ / ▶) — 작은 정사각형 버튼, World 모드 자동회전 일시정지용. Grid 모드에선 disabled 또는 숨김.

### 4.4 Project Section — Mode Behaviors

**3가지 모드는 같은 카드 데이터를 다르게 렌더한다.** 카드 자체의 정보는 모드별로 디테일이 달라짐.

#### 4.4.1 Grid (default — 가장 정보 밀도 높음)

- **레이아웃:** 2열 그리드 (데스크탑), 카드 4개 = 2x2.
- **카드 비율:** `aspect-ratio: 16/10` (게임 스크린샷용, 현재 squarish 카드 대비 와이드)
- **카드 내부 (top-left, top-right, bottom-left/right):**
  - 좌상단: `CORE 02` 같은 레벨/번호 라벨, 액센트 컬러
  - 우상단: 릴리스 상태 칩 — `SHIPPED` / `PROTO` / `JAM` (외곽선 칩)
  - 좌하단: 큰 타이틀 (white) + 작은 메타 한 줄 (`UNITY · ACTION · 2024`)
- **보더:** 프로젝트의 톤 컬러로 약하게 (불투명도 0.3 정도). hover 시 강조.
- **Hover:** 살짝 lift + 이미지 약간 zoom + 보더 밝아짐.

#### 4.4.2 Deck (한 카드씩 풀스크린)

- 기존 Deck 모드 인터랙션 유지.
- **카드 비율:** Deck 모드에선 `16:9` 큰 카드 1장 중심 (Hero·Grid와 일관, 현재의 squarish 카드 대신 와이드).
- 좌우 swipe / wheel로 이동, 클릭으로 디테일.
- 카드 내부에는 더 큰 이미지 + 큰 타이틀 + 메타.

#### 4.4.3 World (3D 구체)

- 기존 World 인터랙션 유지.
- **카드 비율:** 3D 구체 안에선 squarish 유지 (3D 표면에 맞음). 기존 200×260 정도.
- 카드 내부 정보는 최소 — 번호 + 타이틀만.
- Hover시 톤 컬러 + 살짝 확대.
- 자동회전 + Pause 토글로 멈춤.

### 4.5 Detail Modal (full-screen takeover)

카드 클릭 → 풀스크린 모달이 떠서 케이스 스터디 표시. 기존 detail UI 골격을 발전.

**섹션 순서 (위→아래):**

1. **Top bar (fixed within modal):** 좌측 `← Back to projects`, 우측 `Prev / Next`
2. **Eyebrow line:** `FEATURED 01 · 2025` (작은 글씨, 톤 컬러)
3. **Title** — 큰 타이틀 (clamp 36px → 96px), uppercase
4. **Summary** — 1–2 문장
5. **CTA row** — `▶ PLAY` / `SOURCE` / `DEVLOG` (옵션). 디테일에선 대형 버튼은 아님, 작은 칩 형태.
6. **Hero media (16:9)** — YouTube embed 또는 GIF 또는 큰 이미지
7. **Meta strip (4-up grid)** — 4개의 정보 키:
   - `ENGINE` (e.g., Unreal 5.3)
   - `PLATFORM` (e.g., PC / Steam)
   - `ROLE` (e.g., Lead Programmer)
   - `TEAM / PERIOD` (e.g., 5명 · 9개월)
   - 모바일에선 2x2.
8. **"What I Built"** — 서술형 단락 (2–4 문장). 본인이 직접 구현한 시스템들 설명. 게임 프로그래머 정체성의 핵심 슬롯.
9. **Stats grid (3-up)** — 3개의 큰 숫자 + 작은 라벨 (예: `60` FPS @ 1080p, `64` Concurrent players, `2.1GB` Build size). 옵셔널 — 데이터 없으면 숨김.
10. **Screenshot gallery (4-up grid)** — `aspect-ratio: 1` 또는 `4/3`, 클릭 시 lightbox(이번 단계에선 placeholder 동작만).
11. **Tech Stack chips** — 기존 stack chip 재사용. 게임용 태그 (Unreal / C++ / Replication / Niagara 등).
12. **(선택) Postmortem 링크** — 외부 블로그 또는 내부 페이지로 향하는 작은 링크 행. 데이터에 있을 때만 표시.

**전환:** 기존 detail의 cinematic 진입 애니메이션 유지. 진입 시 이미지 stage clip-path 애니메이션.

### 4.6 Footer

- 한 줄 짜리. 좌측: About 한 줄 본인 소개 텍스트. 우측: 컨택 링크들 (이메일 · GitHub · LinkedIn).
- 페이지 길이가 길어졌으므로 단순한 footer로 마감.

## 5. Visual System

### 5.1 Color Tones

기존 톤 시스템 유지하되 게임 장르에 매핑.

| Token | Hex | Suggested mapping |
|-------|-----|-------------------|
| `--acid` | `#f0ff47` | UI 강조, 기본 액센트, "now" featured |
| `--hot` | `#ff3c79` | 멀티플레이/액션 |
| `--aqua` | `#56f3ff` | Sci-fi/시뮬레이션 |
| `--violet` | `#9d68ff` | RPG/판타지/미스터리 |
| `--orange` | `#ff8a32` | Tech demo / 도구 |
| `--lime` | `#78ff8b` | 캐주얼/퍼즐 |

샘플 데이터에서는 5개 프로젝트에 각각 다른 톤 부여.

### 5.2 Typography

기존 Pretendard / Noto Sans KR 시스템 유지. 가중치는 950 / 900 / 800 / 700 / 650 그대로 사용.

크기 시스템 (변경):

- **Hero title:** clamp(2.4rem, 6vw, 5.4rem) — 현재 detail title보다 작게 (hero는 영상이 주인공)
- **Detail title:** clamp(2.8rem, 7vw, 6.4rem)
- **Section labels:** 0.78rem, 950, uppercase, 액센트 컬러
- **Body:** 0.95rem, 650
- **Small meta:** 0.78rem, 850, muted

### 5.3 Card Aspect Ratios

| Mode | Aspect | Reason |
|------|--------|--------|
| Grid | 16:10 | 게임 스크린샷에 가까움, 정보 슬롯 넉넉 |
| Deck | 16:9 | 풀스크린 한 장 — 시네마틱 (Hero·Grid와 일관) |
| World | 1:1.3 (현재 유지) | 3D 구체 표면에 자연스러움 |

## 6. Sample Data Plan

이번 단계는 placeholder. 다음 5개 샘플 프로젝트로 데이터 구조 채움:

```
[
  { id: "featured-01", level: "featured", tone: "hot",
    title: "PROJECT NEMESIS", engine: "Unreal 5.3", platform: "PC / Steam",
    genre: "Multiplayer Action", role: "Lead Programmer",
    team: "5명", period: "2025 · 9개월", status: "Shipped" },
  { id: "core-02", level: "core", tone: "aqua",
    title: "ECHO RUNNER", engine: "Unity 6", genre: "Action",
    status: "Prototype" },
  { id: "core-03", level: "core", tone: "violet",
    title: "RUNE TACTICS", engine: "Unreal 5.3", genre: "FPS",
    status: "Game Jam" },
  { id: "core-04", level: "core", tone: "lime",
    title: "POLY DRIFT", engine: "Godot 4", genre: "Puzzle",
    status: "Shipped" },
  { id: "core-05", level: "core", tone: "orange",
    title: "RENDER LAB", engine: "Custom", genre: "Tech Demo",
    status: "Prototype" }
]
```

각 프로젝트는 위 4.5에서 정의된 모든 필드(stats, gallery, tech stack 등)를 placeholder로 가짐.

샘플 이미지는 현재처럼 Unsplash 게임/사이버 톤 키워드로 대체.

## 7. Responsive Plan

| Breakpoint | Layout adjustments |
|-----------|--------------------|
| `> 1100px` (Desktop) | Hero 16:9, Grid 2-col, Detail 2-col (image left / content right) |
| `560–1100px` (Tablet) | Hero 16:9, Grid 2-col 좁게, Detail 1-col (image 위 / content 아래), Meta 2x2 |
| `< 560px` (Mobile) | Hero 16:9 (작아짐), Grid 1-col, 카드 텍스트 축소, Detail 1-col 풀, Meta 2x2, Stats 1-col 또는 가로 스크롤 |

기존 `@media (max-width: 1100px)` / `@media (max-width: 560px)` 분기 재사용.

## 8. Interaction & Motion

- **Header:** 스크롤 시 변화 없음 (항상 fixed slim).
- **Hero:** 비디오 루프 자동 + hover 시 약간 brightness up. 진입 시 페이드 인.
- **Mode 전환:** 기존 World ↔ Grid ↔ Deck 전환 애니메이션 유지. 모드 전환은 Hero에 영향 없음.
- **Card hover:** 기존 lift + 톤 글로우 유지.
- **Detail 진입:** 기존 cinematic clip-path 애니메이션 유지. 단, 새로운 섹션(stats, gallery)은 페이드 in.
- **Detail 닫기:** 기존 ESC + Back 버튼.
- **prefers-reduced-motion:** 기존 분기 유지.

## 9. Accessibility

- Hero 비디오는 `muted` + `playsinline` + `autoplay` + 일시정지 컨트롤 추가 (Hero 영역 hover 시 노출되는 작은 ⏸ 버튼).
- 모든 버튼/링크는 키보드 포커스 가능.
- Modal 진입 시 첫 포커스를 닫기 버튼에 할당, ESC로 닫기 (기존 로직 유지).
- 카드 보더 색상은 텍스트와 별개 단서 — 상태 칩 텍스트로 보강 (`SHIPPED` 등).
- Color tone 외에 텍스트 정보로도 구분 가능해야 함 (이미 충족).

## 10. Out of Scope

- 실제 트레일러 영상 업로드/링크
- 실제 스크린샷 큐레이션
- About 페이지 풀 컨텐츠 (footer 한 줄만)
- 검색 / 정렬 / 필터 (Lean 3-5개라서 불필요)
- 다크/라이트 토글 (다크 단일)
- i18n
- CMS 연동

## 11. File Touch Plan

- `src/pages/portfolio.astro` — 데이터 모델 확장(engine/platform/role/team/period/status/stats/gallery), 마크업 재구성(hero / project section / detail), 스크립트는 모드 토글·디테일 로직만 약간 조정 (Header에서 모드탭 제거, Projects 섹션으로 이동)
- `src/styles/portfolio.css` — Hero 16:9, Grid 16:10, project section header, detail modal 새로운 섹션 스타일링, 반응형 분기 재정렬

새 파일 생성 없음(현 단계).
