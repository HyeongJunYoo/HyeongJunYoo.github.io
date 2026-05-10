# Project Detail Page — Goal + Challenges & Solutions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the lightweight "What I Built" narrative on the per-project detail page with a richer two-section structure — Project Goal paragraph + a numbered Challenges & Solutions list — so the page reads as a case study with measurable outcomes instead of a feature list.

**Architecture:** Astro static site. Single source of truth `src/data/projects.ts` exports a typed `projects` array consumed by both the portfolio index (`src/pages/portfolio.astro`) and the dynamic detail route (`src/pages/portfolio/[slug].astro`). The detail page reads `project.goal` and `project.challenges` and renders two new sections in the existing flex column. Styling is appended to the same `src/styles/portfolio.css` that backs the rest of the portfolio.

**Tech Stack:** Astro 6 (static SSG, dynamic routes via `getStaticPaths`), TypeScript types in `src/data/projects.ts`, plain CSS with custom properties (`--tone`, `--font-display`, `--font-mono`). Pretendard / Bricolage Grotesque / JetBrains Mono via CDN. Dev server: `npm run dev` on port 4321.

**Spec reference:** `docs/superpowers/specs/2026-05-10-project-detail-fields-design.md`

**Verification approach:** No test framework in this codebase. Each task is verified by running `npm run build` and visiting `http://localhost:4321/portfolio/echo-runner` (or any other slug) at desktop (≥1100px), tablet (~768px), and mobile (≤560px) widths via browser DevTools device emulation, plus a content sanity check via `document.querySelector` snippets shown inline.

**Branch strategy:** Work on `main`. Each task ends with a commit.

---

## Task 1: Extend the Project type with Goal + Challenges

**Files:**
- Modify: `src/data/projects.ts:8-40` (add `ProjectChallenge` type, update `Project` type)

- [ ] **Step 1: Add the `ProjectChallenge` type definition**

Insert this block in `src/data/projects.ts` immediately after the existing `ProjectLinks` type (around line 12):

```ts
export type ProjectChallenge = {
  title: string;
  problem: string;
  solution: string;
  outcome?: string;
};
```

- [ ] **Step 2: Update the `Project` type**

In the same file, replace the existing `Project` type. Find the block that currently reads:

```ts
export type Project = {
  id: string;
  title: string;
  level: "featured" | "core" | "support";
  eyebrow: string;
  period: string;
  role: string;
  engine: string;
  platform: string;
  genre: string;
  team: string;
  status: string;
  summary: string;
  whatIBuilt: string;
  image: string;
  tone: ProjectTone;
  stack: string[];
  stats: ProjectStat[];
  gallery: string[];
  links: ProjectLinks;
  theta: number;
  phi: number;
  width: number;
  height: number;
  gridX: number;
  gridY: number;
};
```

Replace `whatIBuilt: string;` with the two new fields:

```ts
export type Project = {
  id: string;
  title: string;
  level: "featured" | "core" | "support";
  eyebrow: string;
  period: string;
  role: string;
  engine: string;
  platform: string;
  genre: string;
  team: string;
  status: string;
  summary: string;
  goal: string;
  challenges: ProjectChallenge[];
  image: string;
  tone: ProjectTone;
  stack: string[];
  stats: ProjectStat[];
  gallery: string[];
  links: ProjectLinks;
  theta: number;
  phi: number;
  width: number;
  height: number;
  gridX: number;
  gridY: number;
};
```

- [ ] **Step 3: Run the build to confirm TypeScript catches the now-missing data**

Run: `npm run build`

Expected: Build fails with type errors on each of the 5 project records — `whatIBuilt` is now an unknown property AND `goal`/`challenges` are missing. This is the signal that the type is wired correctly. Errors look like:

```
src/data/projects.ts:42:5 - error TS2322: Type '{ ... whatIBuilt: string; ... }' is not assignable to type 'Project'.
  Object literal may only specify known properties, and 'whatIBuilt' does not exist in type 'Project'.
```

The next task fills in the missing fields. Do NOT commit yet — Task 2 finishes the data shape.

- [ ] **Step 4: Defer commit**

Skip the commit for this task. Tasks 1 and 2 ship together as one logical change ("type + data updated to match"). Committing the broken intermediate state would leave `main` un-buildable.

---

## Task 2: Fill Goal + Challenges for all 5 projects

**Files:**
- Modify: `src/data/projects.ts:42-220` (the `projects` array — every project record)

- [ ] **Step 1: Update `project-nemesis` record**

Find the `project-nemesis` block. Replace the line `whatIBuilt: "..."` and update `summary` to a tighter one-liner. The full block becomes:

```ts
{
  id: "project-nemesis",
  title: "PROJECT NEMESIS",
  level: "featured",
  eyebrow: "Featured 01",
  period: "2025 · 9 months",
  role: "Lead Programmer",
  engine: "Unreal 5.3",
  platform: "PC / Steam",
  genre: "Multiplayer Action",
  team: "5명",
  status: "Shipped",
  summary: "PvPvE 멀티플레이어 액션. 30 tickrate에서 64명 동시접속까지 검증한 동기화 레이어를 직접 책임졌습니다.",
  goal: "스팀 출시를 목표로 한 시즌 기반 PvPvE 멀티플레이어 액션. 매치당 64명 동시접속과 30 tickrate에서의 정확한 hit detection을 핵심 가치로 잡고, 5인 팀 환경에서 9개월 안에 alpha → shipped까지 빌드를 다듬은 프로젝트입니다. 본인은 lead programmer로 멀티플레이어 동기화 전반(Replication, lag compensation, matchmaking, state persistence)과 클라이언트 ↔ 데디케이티드 서버 architecture 설계를 책임졌고, EOS(Epic Online Services)와 자체 게임 백엔드를 함께 운용하는 구조를 마무리했습니다. 콘솔 출시 검토를 위해 cross-platform input 호환성도 초기부터 고려했고, 베타 테스트 기간 동안 동시접속 1만 명 부하 테스트까지 통과시켰습니다.",
  challenges: [
    {
      title: "30 tickrate hit detection 1프레임 흔들림",
      problem: "초기 빌드는 모든 hit 판정을 server-authoritative로 처리했습니다. 30 tickrate 환경에서 latency가 80ms를 넘으면 클라이언트가 보는 적의 위치와 서버가 검증하는 위치 사이에 1-2 프레임 어긋남이 발생해, '분명히 맞췄는데 데미지 안 들어감' 신고가 베타 첫 주에 130건 이상 들어왔습니다. Discord 커뮤니티 분위기가 빠르게 부정적으로 흘러 즉시 대응이 필요한 상황이었습니다.",
      solution: "Valve의 lag compensation 패턴을 참고해 client-side prediction + server-side rewind 시스템을 구축했습니다. 각 클라이언트는 자기 입력을 즉시 시뮬레이션하면서 서버에 input을 보내고, 서버는 해당 input을 받은 시점에 그 클라이언트의 RTT만큼 과거로 모든 적의 위치를 되돌려 hit detection을 수행합니다. Rewind window는 최대 200ms로 캡, 그 이상의 비정상 latency는 클라이언트 부정으로 간주해 무효화합니다. 클라이언트 측에선 prediction이 서버 결과와 다르면 부드럽게 보정(reconciliation) 처리합니다.",
      outcome: "perceived hit latency 60-80ms → 8-12ms, 'hit not registered' 신고 130건/주 → 4건/주"
    },
    {
      title: "64명 매치 인벤토리 동기화 패킷 폭증",
      problem: "초기 디자인은 모든 클라이언트가 모든 플레이어의 inventory 변경을 broadcast로 받는 구조였습니다. 64명 매치에서 한 번에 다수가 인벤토리를 열거나 줍기/버리기 액션을 하면 서버 → 클라이언트 업로드가 초당 10MB를 초과해, 중하위 ISP 사용자가 패킷 드롭과 함께 게임에서 튕기는 현상이 발생했습니다. 빌드 안정성 지표(Steam crash report)에서 'connection lost'가 매치당 3-4건으로 급증했습니다.",
      solution: "두 가지 최적화를 결합했습니다. 첫째, delta replication — inventory 전체 상태가 아니라 변경분만 보내고 sequence number 기반 reliable delivery 채널을 만들었습니다. 둘째, AOI(Area of Interest) 필터링 — 본인 시야 안의 플레이어 inventory만 풀 동기화하고, 시야 밖은 metadata(존재 여부, 클래스만)만 동기화합니다. AOI 갱신 주기는 클라이언트 카메라 frustum 기준 200ms마다 재계산했습니다.",
      outcome: "평균 업로드 트래픽 10.4MB/s → 1.6MB/s (-85%), connection lost 3-4건/매치 → 0.2건/매치"
    },
    {
      title: "Cross-platform input prompt 추상화",
      problem: "PC 키보드/마우스, Steam Controller, Xbox/PS 컨트롤러까지 지원하면서, 입력 방식이 바뀌면 UI prompt(키 표시)가 즉시 바뀌어야 했습니다. UE5 기본 EnhancedInput 시스템은 device 변경 감지와 prompt 자동 전환을 지원하지 않아, in-game UI에서 'E to interact'와 'X to interact' 같은 표기가 컨트롤러 연결 후에도 키보드 표기로 남는 버그가 있었습니다.",
      solution: "InputDeviceObserver subsystem을 만들어 마지막 input event의 device source를 추적하고, UI widget이 binding한 PromptToken에 글로벌 broadcast하는 구조로 만들었습니다. UI 측은 PromptToken을 키 텍스트가 아닌 추상 액션 이름('Interact')으로 받고, observer가 device 변경을 알리면 token 매핑 테이블에서 현재 device 기준 표기를 자동 교체합니다. 추가로 Steam Input API를 통해 사용자가 컨트롤러 prompt 스타일(Xbox/PS/Switch)을 강제 지정할 수 있도록 지원했습니다.",
      outcome: "QA 발견 prompt 관련 버그 27건 → 0건, controller hot-swap 1프레임 안에 반영"
    }
  ],
  image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=84",
  tone: "hot",
  stack: ["Unreal 5.3", "C++", "Replication", "EOS", "Niagara"],
  stats: [
    { value: "60", label: "FPS @ 1080p" },
    { value: "64", label: "Concurrent players" },
    { value: "2.1GB", label: "Build size" }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&w=900&q=80"
  ],
  links: {
    play: "#",
    source: "#",
    devlog: "#"
  },
  theta: 0,
  phi: -8,
  width: 260,
  height: 330,
  gridX: -410,
  gridY: -150
}
```

- [ ] **Step 2: Update `echo-runner` record**

Replace `whatIBuilt: "..."` and update `summary`. The relevant slice becomes:

```ts
summary: "BPM 기반 입력 윈도우와 비주얼 큐가 동기화되는 1인 개발 리듬 액션 러너 프로토타입.",
goal: "사이드 스크롤 러너 장르에 리듬 게임의 정확한 입력 판정 시스템을 결합한 1인 개발 프로토타입. 음악에 맞춰 점프와 슬라이드를 입력하는 4단계 난이도의 트랙 5개를 만들었습니다. Unity 6와 URP를 처음부터 깊게 사용해보는 학습 목표도 함께 두고, 오디오 타임라인 ↔ 게임플레이 동기화의 모든 단계를 본인이 설계해 4개월 안에 playable build를 만들었습니다. 결과물은 itch.io에 무료 공개해 100명 이상의 플레이어 데이터를 수집해 input window 튜닝의 기반 자료로 사용했습니다.",
challenges: [
  {
    title: "오디오 타임라인 ↔ 입력 윈도우 동기화 정확도",
    problem: "Unity의 AudioSource.time은 audio thread와 game thread 사이에서 ±20ms 정도 jitter가 발생해, 60Hz 게임플레이 입력 판정 윈도우(±33ms)와 비교했을 때 무시할 수 없는 오차였습니다. 결과적으로 '딱 박자에 맞춰 눌렀는데 perfect 안 됨' 같은 false negative가 트랙당 5-10회씩 발생해 게임이 부당하게 느껴졌습니다.",
    solution: "AudioSettings.dspTime을 기준 시각으로 사용하고, AudioSource.time은 시각 큐 갱신용으로만 사용하도록 분리했습니다. dspTime은 audio engine 내부 시계라 jitter가 µs 단위로 줄어듭니다. 또한 입력 시각도 frame 시각이 아닌 input event timestamp를 기록해 dsp 시각과 비교하는 구조로 변경했습니다. 트랙 데이터(노트 타이밍)는 ScriptableObject로 BPM과 offset만 가지고, 런타임에 dsp 시각과 비교하는 방식입니다.",
    outcome: "input window 판정 오차 ±20ms → ±2ms, 100명 플레이 데이터 기준 false negative 0%"
  },
  {
    title: "URP shader fit + 모바일 GPU stuttering",
    problem: "기본 URP lit shader는 셀룰로이드 풍 게임의 외곽선 강조 + 채도 높은 컬러 그레이딩에 맞지 않았습니다. 또 itch.io 빌드를 모바일 브라우저에서도 돌려보고 싶었는데, 일부 안드로이드 GPU(Mali-G52)에서 발견된 stuttering이 frame time 30ms를 넘기는 spike를 만들었습니다.",
    solution: "URP custom render feature로 outline pass를 추가하고, 외곽선은 stencil + dilated normal 기반으로 처리했습니다. 컬러 그레이딩은 LUT texture로 분리해 디자이너가 photoshop에서 직접 조정 가능한 워크플로우를 만들었습니다. 모바일은 GPU profiler로 stuttering 원인을 찾았는데, post-process volume이 frame마다 reallocation을 일으키는 게 원인이었습니다. volume profile을 정적 ScriptableObject로 캐시해 spike를 제거했습니다.",
    outcome: "프레임 타임 변동 30ms → 8ms, Mali-G52 평균 60FPS 유지"
  }
],
```

- [ ] **Step 3: Update `rune-tactics` record**

Replace `whatIBuilt: "..."` and update `summary`. The relevant slice becomes:

```ts
summary: "48시간 게임잼 2위 출품작. 룬 결합 기반 FPS를 데이터 드리븐 무기 시스템으로 단기간에 구현.",
goal: "48시간 게임잼 출품작으로 만든 룬 결합 시스템 기반 1인칭 슈터. 플레이어가 던전을 클리어하며 7가지 기본 룬을 모으고, 이를 2-3개씩 결합해 12개 이상의 무기 변형을 만들어내는 데이터 드리븐 무기 시스템을 단기간에 구현해 잼 2위에 랭크되었습니다. 3인 팀이었지만 본인이 모든 코드(C++ + Blueprint)와 절차적 던전 생성을 담당했고, 디자이너 동료가 룬 조합 룰을 DataAsset으로 직접 편집할 수 있는 in-editor 툴까지 만들어 협업 속도를 끌어올렸습니다. 게임잼 후 Steam Greenlight 진행 검토 단계입니다.",
challenges: [
  {
    title: "48시간 안에 데이터 드리븐 무기 빌더 구현",
    problem: "기본/공격/효과 3가지 카테고리의 룬을 다양하게 조합하면 12개 이상의 무기가 나와야 했는데, hard-coded로 짜면 디자이너가 룬 추가할 때마다 프로그래머 작업이 필요했습니다. 잼 환경에서 24시간 내내 디자이너가 룬을 새로 추가하고 싶어 할 게 뻔했고, 매번 빌드 받아주면 다른 작업이 멈추는 문제.",
    solution: "DataAsset 기반 RuneAsset(이름/카테고리/효과 파라미터) + WeaponCombinationRule(룬 카테고리 조합 → 무기 클래스 매핑) 두 가지 자료를 정의했습니다. 런타임에 player가 룬 3개를 들고 결합 액션을 하면 RuleSet에서 매칭 무기 클래스를 lookup하고 spawn합니다. 새 룬은 디자이너가 ContentBrowser에서 RuneAsset 우클릭 → Create로 직접 추가하고, RuleSet에 ID만 넣으면 끝.",
    outcome: "디자이너가 잼 24시간 차에 룬 4종을 본인이 직접 추가, 프로그래머 개입 0회"
  },
  {
    title: "절차적 던전 + AI 네비게이션 동시 보장",
    problem: "런타임에 던전이 매번 다르게 생성되어야 했지만, AI는 NavMesh 기반이라 BuildAtRuntime이 30초 이상 걸리면 게임 시작 전에 시간 너무 오래 잡혔습니다. 잼 평가 빌드는 빠르게 시작해야 했고, 매번 NavMesh 빌드를 기다리게 할 순 없었습니다.",
    solution: "사전 베이크된 청크(15x15m unit)를 30개 만들고, 청크 단위로 NavMesh를 미리 굽고 child volume으로 묶었습니다. 런타임에는 청크를 랜덤 조합해 placement만 하고, 청크 간 연결 portal에 manual NavLink를 붙여 NavMesh를 새로 굽지 않고도 patrol/chase가 동작합니다. 적 spawn은 청크별 spawn point 메타데이터로 관리.",
    outcome: "던전 생성 시간 30초+ → 0.4초, 매 게임 다른 레이아웃"
  }
],
```

- [ ] **Step 4: Update `poly-drift` record**

Replace `whatIBuilt: "..."` and update `summary`. The relevant slice becomes:

```ts
summary: "로우폴리 드리프트 퍼즐. PC + 모바일 동시 출시, 첫 달 12K DAU 달성.",
goal: "로우폴리 미감의 모바일/PC 동시 출시 드리프트 퍼즐 게임. 코너에서 그리는 드리프트 라인의 길이/각도가 점수가 되고, 시간 압축 리플레이로 자기 베스트와 경쟁하는 솔로 모드 + 글로벌 리더보드를 핵심 루프로 잡았습니다. 2인 팀에서 본인은 차량 물리 컨트롤러, 트랙 데이터 시스템, 모바일 터치 입력 어댑터, 리플레이 직렬화/재생, REST 백엔드 연동까지 클라이언트 전반을 담당했고, 디자이너 파트너가 트랙 디자인과 UI/UX를 맡았습니다. 6개월 개발 후 Steam과 Google Play 동시 출시했고, 출시 첫 달에 두 플랫폼 합산 12,000 DAU를 기록했습니다.",
challenges: [
  {
    title: "터치 ↔ 키보드/게임패드 입력 일관성",
    problem: "PC는 좌/우 키와 아날로그 스틱(점진적 입력), 모바일은 좌/우 화면 터치(이산 입력)가 들어옵니다. 같은 코너에서 PC는 부드러운 드리프트가 나오는데 모바일은 핸들이 갑자기 꺾여 드리프트 라인이 끊겨 점수가 절반 이하로 떨어지는 형평성 문제가 있었습니다. 리더보드 1위가 모두 PC 사용자로 쏠리면 모바일 사용자 이탈이 우려됐습니다.",
    solution: "터치 입력을 InputAdapter에서 가상 아날로그 신호로 변환했습니다. 터치 시작 ~ 종료 사이의 시간을 곡선으로 mapping해(touch hold time 0~250ms 동안 0→1로 ease-out), 게임 측은 항상 0~1 사이의 analog steering 값을 받습니다. 같은 코너 통과 시 PC와 모바일이 거의 동일한 드리프트 라인이 그려지도록 튜닝했고, 모바일에서도 분기 가능한 advanced flicking 동작도 지원합니다.",
    outcome: "동일 트랙 PC vs 모바일 평균 점수 격차 47% → 4%"
  },
  {
    title: "리플레이 데이터 사이즈 + 백엔드 비용",
    problem: "리플레이를 매 프레임 raw position으로 저장하니 60초 트랙이 800KB가 되고, 글로벌 리더보드 백엔드 S3 저장 + 다운로드 비용이 무시 못할 수준이었습니다. 모바일 사용자 데이터 비용 부담도 있어 출시 후 운영비가 매출보다 빠르게 늘어날 위험.",
    solution: "delta-encoded keyframe 방식으로 변경했습니다. 위치/회전을 100ms 간격으로 keyframe하고 사이는 spline interpolation. 입력 변화가 없는 구간은 더 듬성듬성 keyframe. quaternion은 8-byte fixed-point로 압축. 추가로 zstd(level 5)로 후처리 압축까지 적용해 평균 사이즈를 대폭 줄였습니다.",
    outcome: "리플레이 평균 사이즈 800KB → 18KB (-97.7%), S3 비용 월 $40 → $2"
  }
],
```

- [ ] **Step 5: Update `render-lab` record**

Replace `whatIBuilt: "..."` and update `summary`. The relevant slice becomes:

```ts
summary: "자체 C++/Vulkan 렌더링 엔진. PBR · CSM · 디퍼드 G-buffer를 직접 구현한 OSS 사이드 프로젝트.",
goal: "취미 프로젝트로 시작한 자체 C++/Vulkan 렌더링 엔진. PBR 머티리얼, cascaded shadow map, 디퍼드 G-buffer까지 직접 구현하면서 modern GPU pipeline의 동작 방식을 깊이 이해하는 게 목표입니다. 게임 엔진을 만들려는 게 아니라, 그래픽스 인터뷰에서 자신 있게 설명할 수 있는 수준의 baseline 코드를 갖는 것이 핵심 동기였습니다. 1년차 현재 GLTF 2.0 모델 로딩, IBL 기반 PBR, 6 cascade shadow, post-process(bloom, tonemap) 파이프라인이 동작하고, GitHub에 OSS로 공개해 contributors 3명을 받았습니다.",
challenges: [
  {
    title: "Vulkan command graph 추상화",
    problem: "Vulkan은 raw API라서 command buffer 빌딩, descriptor set, render pass synchronization을 직접 다 관리해야 합니다. 초기엔 모든 frame의 command를 매번 새로 빌드했는데, 이러면 60FPS @ 1440p에서 CPU에 30% 이상 시간을 쓰는 비효율이 발생했습니다. 144Hz 목표는커녕 60Hz도 위태로운 상황.",
    solution: "frame graph 패턴을 도입해 pass 간 의존성을 그래프로 선언하고, 매 프레임 command 빌드를 cache 가능한 형태로 분리했습니다. 변경된 pass만 재빌드하고, descriptor set도 pass 단위로 pre-allocated pool에서 리사이클합니다. synchronization barrier는 frame graph가 자동으로 추론해 삽입합니다. 결과적으로 일반 frame은 빌드 비용이 거의 0에 가깝습니다.",
    outcome: "프레임당 CPU 시간 12.4ms → 3.1ms, 144Hz 안정 유지"
  },
  {
    title: "PBR uber shader + 6 cascade shadow",
    problem: "metallic-roughness 모델을 표준 GLTF 그대로 따르되, 동시에 emissive, clearcoat, transmission까지 옵션 확장하려니 shader variants가 폭발했습니다. 또 6 cascade shadow는 cascade 경계에서 acne와 peter-panning이 동시에 발생해 시각적 아티팩트가 두드러졌습니다.",
    solution: "uber shader를 작성하고 shader variant를 spec constant로 컴파일 타임에 선택하도록 했습니다. cascade shadow는 Variance Shadow Map의 cascading 변형을 적용해 경계 부드럽게 처리하고, normal-bias + slope-scale depth-bias 조합으로 acne 제거. 추가로 cascade 간 blend region을 8% 폭으로 두어 갑작스러운 해상도 변화도 가렸습니다.",
    outcome: "shader binary 21개 → 1개, shadow 경계 artifact 시각적으로 제거"
  }
],
```

- [ ] **Step 6: Run the build to confirm types pass**

Run: `npm run build`

Expected: Build succeeds. 7 pages generated (`/`, `/portfolio`, and 5 `/portfolio/<slug>` pages).

- [ ] **Step 7: Commit Tasks 1+2 together**

```bash
git add src/data/projects.ts
git commit -m "feat(portfolio): add Goal + Challenges fields to Project type and data"
```

---

## Task 3: Render Goal + Challenges in the detail page template

**Files:**
- Modify: `src/pages/portfolio/[slug].astro:97-101` (the `.detail-narrative` section that currently renders `whatIBuilt`)

- [ ] **Step 1: Replace the What I Built section with Goal + Challenges markup**

Open `src/pages/portfolio/[slug].astro`. Find:

```astro
          <section class="detail-narrative">
            <h3>What I built</h3>
            <p>{project.whatIBuilt}</p>
          </section>
```

Replace with:

```astro
          <section class="detail-narrative">
            <h3>Project goal</h3>
            <p>{project.goal}</p>
          </section>

          {project.challenges.length > 0 && (
            <section class="detail-challenges" aria-label="Challenges and solutions">
              <h3 class="detail-challenges-heading">Challenges &amp; Solutions</h3>
              <ol class="detail-challenges-list">
                {project.challenges.map((challenge, index) => (
                  <li class="detail-challenge">
                    <span class="detail-challenge-index">{String(index + 1).padStart(2, "0")}</span>
                    <h4 class="detail-challenge-title">{challenge.title}</h4>
                    <div class="detail-challenge-block">
                      <span class="detail-challenge-label">Problem</span>
                      <p>{challenge.problem}</p>
                    </div>
                    <div class="detail-challenge-block">
                      <span class="detail-challenge-label">Solution</span>
                      <p>{challenge.solution}</p>
                    </div>
                    {challenge.outcome && (
                      <p class="detail-challenge-outcome">→ {challenge.outcome}</p>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}
```

The `{project.challenges.length > 0 && ...}` guard makes this safe if a future project has no challenges — the section disappears entirely instead of rendering an empty heading.

- [ ] **Step 2: Run the build to confirm template parses**

Run: `npm run build`

Expected: Build succeeds. The page now renders Project Goal + the unstyled Challenges list (CSS in next task).

- [ ] **Step 3: Defer commit**

Skip the commit — Task 4 adds the CSS that styles the new markup. Committing now would land an unstyled Challenges list on `main`.

---

## Task 4: Style the Challenges & Solutions cards

**Files:**
- Modify: `src/styles/portfolio.css:933-940` (append new rules immediately after the `.detail-narrative p` block, before the existing `.detail-stack` block)

- [ ] **Step 1: Append the Challenges block CSS**

Open `src/styles/portfolio.css`. Find the rule:

```css
.detail-narrative p {
  margin: 0;
  color: rgba(244, 241, 232, 0.82);
  font-size: 1rem;
  font-weight: 650;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.detail-stack {
```

Insert this block between `.detail-narrative p { ... }` and `.detail-stack {`:

```css
/* === Challenges & Solutions === */
.detail-challenges {
  display: grid;
  gap: 18px;
  border-bottom: 1px solid rgba(244, 241, 232, 0.12);
  padding-bottom: 24px;
}

.detail-challenges-heading {
  margin: 0;
  color: var(--tone);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1;
  text-transform: uppercase;
}

.detail-challenges-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 16px;
}

.detail-challenge {
  position: relative;
  display: grid;
  gap: 12px;
  padding: 22px 22px 22px 28px;
  border: 1px solid rgba(244, 241, 232, 0.1);
  background: rgba(12, 12, 12, 0.4);
}

.detail-challenge::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--tone);
  opacity: 0.85;
}

.detail-challenge-index {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--tone);
}

.detail-challenge-title {
  margin: 0;
  color: var(--ink);
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 2vw, 1.55rem);
  font-weight: 800;
  letter-spacing: -0.005em;
  line-height: 1.2;
  overflow-wrap: anywhere;
}

.detail-challenge-block {
  display: grid;
  gap: 6px;
}

.detail-challenge-label {
  color: rgba(244, 241, 232, 0.62);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.detail-challenge-block p {
  margin: 0;
  color: rgba(244, 241, 232, 0.82);
  font-size: 0.96rem;
  font-weight: 650;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.detail-challenge-outcome {
  margin: 4px 0 0;
  padding: 10px 14px;
  border-left: 2px solid var(--tone);
  background: color-mix(in srgb, var(--tone) 8%, transparent);
  color: var(--tone);
  font-family: var(--font-mono);
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

@media (max-width: 720px) {
  .detail-challenge {
    padding: 18px 18px 18px 22px;
  }

  .detail-challenge-title {
    font-size: clamp(1rem, 4.4vw, 1.25rem);
  }

  .detail-challenge-block p {
    font-size: 0.92rem;
  }
}
```

- [ ] **Step 2: Run the build to confirm CSS parses**

Run: `npm run build`

Expected: Build succeeds, no CSS errors in the output.

- [ ] **Step 3: Commit Tasks 3+4 together**

```bash
git add src/pages/portfolio/[slug].astro src/styles/portfolio.css
git commit -m "feat(portfolio): render Goal + Challenges sections on detail page"
```

---

## Task 5: Visual verification at three breakpoints

**Files:** none modified

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

Expected: Astro dev server reports "Local: http://localhost:4321/" within 3 seconds. Leave running for the rest of this task.

- [ ] **Step 2: Verify desktop (1280px) layout**

Open Chrome / Edge. Navigate to `http://localhost:4321/portfolio/project-nemesis`. Use DevTools device toolbar to set the viewport to **1280 × 800**.

Verify visually:

- "Project goal" heading appears under the 4-up meta strip in the project's tone color (hot pink).
- Below the goal paragraph, "Challenges & Solutions" heading is visible.
- 3 cards render below, each with a 3px hot-pink left bar, `01`/`02`/`03` index, display-font title, separate Problem and Solution paragraphs, and a `→ Outcome` line on a tinted background panel.
- Cards stack vertically with 16px gap between them.

In DevTools console, run this sanity check:

```js
({
  goalHeading: document.querySelector('.detail-narrative h3').textContent,
  challengeCount: document.querySelectorAll('.detail-challenge').length,
  outcomeCount: document.querySelectorAll('.detail-challenge-outcome').length
})
```

Expected: `{ goalHeading: "Project goal", challengeCount: 3, outcomeCount: 3 }`

- [ ] **Step 3: Verify tablet (768px) layout**

In the device toolbar, set viewport to **768 × 1024**. Reload the page.

Verify visually:

- Cards still single column.
- Card padding feels comparable to desktop (no responsive override at this breakpoint).
- Title font size scales down via `clamp(1.15rem, 2vw, 1.55rem)` — at 768px, 2vw = 15.36px which floors to the 1.15rem minimum (~18.4px).

- [ ] **Step 4: Verify mobile (390px) layout**

Set viewport to **390 × 844**. Reload.

Verify visually:

- Card padding tightens — left padding from 28px to 22px (the `@media (max-width: 720px)` rule kicks in).
- Title becomes smaller: `clamp(1rem, 4.4vw, 1.25rem)` — 4.4vw at 390px = 17.16px (~1.07rem).
- Problem and Solution paragraphs use 0.92rem instead of 0.96rem.
- Outcome panel still has its left border + background tint, no overflow.

In DevTools console:

```js
const card = document.querySelector('.detail-challenge');
({
  padding: getComputedStyle(card).padding,
  titleSize: getComputedStyle(card.querySelector('.detail-challenge-title')).fontSize
})
```

Expected: `padding` is `"18px 18px 18px 22px"` (or close — browser may resolve in different order), `titleSize` around `17px`.

- [ ] **Step 5: Spot-check a different project for tone color flow**

Navigate to `http://localhost:4321/portfolio/echo-runner`. Verify the tone is aqua, not hot pink — every accent (left bar, index, outcome panel) should be aqua.

Run:

```js
getComputedStyle(document.querySelector('.detail-challenge::before')).color
```

(`::before` not directly inspectable; instead inspect the index span which uses the same `var(--tone)`):

```js
getComputedStyle(document.querySelector('.detail-challenge-index')).color
```

Expected: `rgb(86, 243, 255)` — aqua tone resolved from `--tone: var(--aqua)`. Each project has a different tone (hot/aqua/violet/lime/orange).

- [ ] **Step 6: Commit verification notes**

No code changed in this task. Skip the commit. If verification revealed a bug, return to the appropriate prior task.

---

## Task 6: Replace placeholder content with real project history (deferred to author)

**Files:**
- Modify: `src/data/projects.ts` (the `goal` and `challenges` fields on each of the 5 project records)

This task is the user's responsibility and intentionally has no code in this plan. The placeholder content shipped in Task 2 represents *what the field should look like* — realistic-feeling Korean prose with measurable outcomes — but it must be replaced with the user's actual project history before the portfolio goes public.

- [ ] **Step 1: For each project, write the real `goal` field (3-5 sentences)**

For each of the 5 records, the `goal` paragraph must answer all four questions:

1. What is this game / system? (genre + premise + platform)
2. What was the team configuration and your role inside it? (team size + your title + what you owned end-to-end)
3. What were the key constraints? (timeline + technical limits + business pressure)
4. What did you personally ship? (the systems/features you can defend in an interview)

Length target: 4-5 sentences. Avoid marketing language ("amazing", "innovative") — use specific nouns (system names, API names, third-party tools).

- [ ] **Step 2: For each project, write 1-3 real `challenges` entries**

Each entry needs:

- `title` (16-30 chars): One-line problem identifier in your project's vocabulary. Example: "30 tickrate hit detection 1프레임 흔들림". NOT "performance optimization" or "the lag problem".
- `problem` (2-3 sentences): Why was this hard? Who was affected? What would have happened if unsolved? Include specific numbers (latency, FPS, user counts) wherever possible.
- `solution` (2-3 sentences): What approach did you take? Name specific patterns (lag compensation, frame graph, AOI filtering), APIs (Steam Input, AudioSettings.dspTime), or libraries you used. Why this approach and not another?
- `outcome` (optional, 1 line): Measurable improvement only. "60ms → 8ms", "패킷 80% 감소", "FPS 45 → 60". If you can't measure it, omit `outcome` rather than guess.

Cap at 3 challenges per project. Pick the ones that best demonstrate the kind of problem-solving you want to be hired for.

- [ ] **Step 3: Run the build to confirm all replacements still compile**

Run: `npm run build`

Expected: Build succeeds, all 7 pages generate.

- [ ] **Step 4: Re-run Task 5 visual verification with real content**

Long titles and paragraphs in real content can break layout in ways the placeholder doesn't. Re-walk Task 5 Steps 2-5 with the real text in place.

- [ ] **Step 5: Commit when ready to publish**

```bash
git add src/data/projects.ts
git commit -m "content(portfolio): replace placeholder Goal + Challenges with real project history"
```

---

## Notes on out-of-scope work referenced in the spec

These appear in the spec's "Out of scope" section. Listed here so a future plan can pick them up:

- Reflection / postmortem section ("What I'd do differently"). Would slot between Challenges and Gallery, similar `.detail-narrative` styling.
- Inline code snippet block per challenge. Would need a `<pre><code>` slot inside `.detail-challenge` plus a syntax-highlighting strategy (Shiki via Astro is the natural fit).
- Video hero (autoplay WebM). Would replace the `<img>` in the hero block with `<video>`, requires per-project video URL field.

None of these are required for the current spec; they're future-plan candidates.
