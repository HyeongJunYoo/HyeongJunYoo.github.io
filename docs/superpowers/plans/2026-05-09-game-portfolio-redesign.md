# Game Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reshape `src/pages/portfolio.astro` and `src/styles/portfolio.css` from an abstract UI/motion-designer presentation into a game-programmer portfolio — fixed cinematic 16:9 hero, mode-switched (Grid default) project section, and game-specific detail modal slots — using sample placeholder content.

**Architecture:** Single Astro page (`portfolio.astro`) renders all 5 projects into one `cards` collection so the existing prev/next/deck/world JS continues to work uniformly. The first project (`featuredProject = projects[0]`) is *also* rendered separately as a Hero block above the project section. In Grid mode only, the featured card is CSS-hidden via an `.is-hero` class, so the visible Grid contains 4 cards (`Other Projects`); Deck and World still show all 5. Card data carries new game-domain fields (engine, platform, role, team, period, status, gallery, stats, links). The detail modal is extended in place — replacing the 2-up meta with a 4-up strip, swapping the 3-section "challenge/build/outcome" block for a single "What I Built" narrative, and adding new sections (CTA row, stats, gallery). All client-side interaction (mode toggle, drag, deck swipe, detail open/close, prev/next) stays in the existing inline `<script is:inline>` block.

**Tech Stack:** Astro 6, plain CSS (CSS variables + grid + 3D transforms), inline JS, no build-time framework. Pretendard / Noto Sans KR via CDN. Dev: `npm run dev` (Astro default port `4321`).

**Spec reference:** `docs/superpowers/specs/2026-05-09-game-portfolio-redesign-design.md`

**Verification approach:** This codebase has no test framework. Each task is verified by running `npm run dev`, visiting `http://localhost:4321/portfolio`, and visually confirming the described outcome at the desktop breakpoint (≥1100px) plus quick spot-checks at tablet (`~900px`) and mobile (`~390px`). Use browser DevTools device emulation for the latter two.

**Branch strategy:** Work on `main` (per recent project history). Commit after each task.

---

## Task 1: Expand project data model with game-domain fields

**Files:**
- Modify: `src/pages/portfolio.astro:5-174` (the `projects` array)

- [ ] **Step 1: Replace the `projects` array with the 5-project sample**

Replace lines 5–174 (the entire `const projects = [ ... ];` array) with the new array below. The new shape adds `engine`, `platform`, `genre`, `team`, `status`, `whatIBuilt`, `stats`, `gallery`, `links` while keeping the geometry fields (`theta`, `phi`, `width`, `height`, `gridX`, `gridY`) the existing scripts already read.

```astro
const projects = [
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
    summary: "한 줄 요약 — 어떤 게임이고 본인이 어떤 시스템을 책임졌는지 한 문장으로.",
    whatIBuilt: "멀티플레이어 동기화 레이어, 무기 lag-compensation, 커스텀 매치메이킹, 인벤토리 직렬화. 30 tickrate에서 64명 동시접속까지 검증.",
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
  },
  {
    id: "echo-runner",
    title: "ECHO RUNNER",
    level: "core",
    eyebrow: "Core 02",
    period: "2024 · 4 months",
    role: "Gameplay Programmer",
    engine: "Unity 6",
    platform: "PC",
    genre: "Action",
    team: "Solo",
    status: "Prototype",
    summary: "리듬 기반 액션 러너 프로토타입. 입력 윈도우와 비주얼 큐가 BPM에 맞춰 동기화.",
    whatIBuilt: "오디오 타임라인 동기화, 입력 윈도우 시스템, ScriptableObject 기반 패턴 빌더, URP shader 핏.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=84",
    tone: "aqua",
    stack: ["Unity 6", "C#", "URP", "DOTween", "Audio Timeline"],
    stats: [
      { value: "120", label: "FPS @ 1440p" },
      { value: "<8ms", label: "Input latency" },
      { value: "320MB", label: "Build size" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?auto=format&fit=crop&w=900&q=80"
    ],
    links: {
      play: "#",
      source: "#"
    },
    theta: 72,
    phi: 10,
    width: 238,
    height: 294,
    gridX: -120,
    gridY: -160
  },
  {
    id: "rune-tactics",
    title: "RUNE TACTICS",
    level: "core",
    eyebrow: "Core 03",
    period: "2024 · 48-hour jam",
    role: "Tools / Gameplay",
    engine: "Unreal 5.3",
    platform: "PC",
    genre: "FPS",
    team: "3명",
    status: "Game Jam",
    summary: "48시간 잼 출품작 — 룬을 조합해 무기를 만드는 FPS.",
    whatIBuilt: "런타임 룬 결합 시스템, 데이터 드리븐 무기 빌더, 절차적 던전 청크 스폰, AI 패스 그리드.",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1400&q=84",
    tone: "violet",
    stack: ["Unreal 5.3", "Blueprints", "C++", "Behavior Tree"],
    stats: [
      { value: "48h", label: "Dev time" },
      { value: "12+", label: "Rune combos" },
      { value: "2nd", label: "Jam ranking" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80"
    ],
    links: {
      source: "#",
      devlog: "#"
    },
    theta: 142,
    phi: -4,
    width: 220,
    height: 270,
    gridX: 150,
    gridY: -150
  },
  {
    id: "poly-drift",
    title: "POLY DRIFT",
    level: "core",
    eyebrow: "Core 04",
    period: "2023 · 6 months",
    role: "Gameplay Programmer",
    engine: "Godot 4",
    platform: "PC / Mobile",
    genre: "Puzzle",
    team: "2명",
    status: "Shipped",
    summary: "로우폴리 드리프트 퍼즐. 코너 드리프트 라인을 그려 시간 경쟁.",
    whatIBuilt: "차량 물리 컨트롤러, 시간 압축 리플레이, 모바일 터치 입력 어댑터, 리더보드 백엔드 연동.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=84",
    tone: "lime",
    stack: ["Godot 4", "GDScript", "C#", "REST"],
    stats: [
      { value: "60", label: "FPS @ 4K" },
      { value: "120", label: "Tracks" },
      { value: "180MB", label: "Build size" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80"
    ],
    links: {
      play: "#",
      source: "#"
    },
    theta: 214,
    phi: 12,
    width: 200,
    height: 240,
    gridX: 400,
    gridY: -110
  },
  {
    id: "render-lab",
    title: "RENDER LAB",
    level: "core",
    eyebrow: "Core 05",
    period: "2023 · ongoing",
    role: "Tech Programmer",
    engine: "Custom (C++/Vulkan)",
    platform: "PC",
    genre: "Tech Demo",
    team: "Solo",
    status: "Prototype",
    summary: "취미 프로젝트 — 자체 C++/Vulkan 렌더러로 PBR 머티리얼·쉐도우 캐스케이드 실험.",
    whatIBuilt: "Vulkan 커맨드 그래프, GLTF 로더, PBR uber shader, CSM, 디퍼드 G-buffer.",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1400&q=84",
    tone: "orange",
    stack: ["C++", "Vulkan", "GLSL", "GLTF"],
    stats: [
      { value: "144", label: "FPS @ 1440p" },
      { value: "6", label: "Cascade splits" },
      { value: "OSS", label: "License" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80"
    ],
    links: {
      source: "#",
      devlog: "#"
    },
    theta: 288,
    phi: -2,
    width: 200,
    height: 240,
    gridX: -380,
    gridY: 150
  }
];

const featuredProject = projects[0];
const otherProjects = projects.slice(1);
```

Then **delete** the existing `const firstProject = projects[0];` line (originally line 176) and **rename every `firstProject` reference** in the JSX template to `featuredProject`. There are originally 9 such references: in the `<img data-detail-image src={firstProject.image} alt="" />` tag, the eyebrow `{firstProject.eyebrow}`, title `{firstProject.title}`, summary `{firstProject.summary}`, period `{firstProject.period}`, role `{firstProject.role}`, challenge `{firstProject.challenge}`, build `{firstProject.build}`, outcome `{firstProject.outcome}`, and the stack mapping `{firstProject.stack.map(...)}`. Replace each occurrence; the values they read are the same since `featuredProject === projects[0]`. The unused fields (`challenge`, `build`, `outcome`) will resolve to `undefined` for the new sample data — that's fine because Tasks 7–9 will replace those JSX bindings entirely.

- [ ] **Step 2: Verify the page still renders without errors**

Start dev: `npm run dev`. Visit http://localhost:4321/portfolio. Expected: page renders unchanged visually (cards still show 5 projects' Unsplash images and the original detail panel still works) — only the underlying data changed. Confirm no 500 error and that 5 cards (not 8) appear in the World view.

- [ ] **Step 3: Commit**

```
git add src/pages/portfolio.astro
git commit -m "feat(portfolio): expand project data with game-domain fields"
```

---

## Task 2: Add Featured Hero block (16:9 cinematic)

**Files:**
- Modify: `src/pages/portfolio.astro` — insert new `<section class="featured-hero">` immediately inside `<main id="main">`, above the existing `<section class="world-stage">`.
- Modify: `src/styles/portfolio.css` — append `.featured-hero` styles.

- [ ] **Step 1: Insert the Hero markup**

In `src/pages/portfolio.astro`, locate `<main id="main">` (around line 201) and insert the following section directly after it, before `<section class="world-stage" ...>`:

```astro
      <section class="featured-hero" data-tone={featuredProject.tone} aria-labelledby="hero-title">
        <div class="hero-media" aria-hidden="true">
          <img src={featuredProject.image} alt="" />
          <span class="hero-scrim"></span>
        </div>
        <div class="hero-overlay">
          <p class="hero-eyebrow">
            <span>{featuredProject.eyebrow}</span>
            <span>{featuredProject.period.split("·")[0].trim()} · {featuredProject.engine} · {featuredProject.genre} · {featuredProject.status}</span>
          </p>
          <h1 id="hero-title" class="hero-title">{featuredProject.title}</h1>
          <p class="hero-summary">{featuredProject.summary}</p>
          <div class="hero-cta">
            {featuredProject.links?.play && (
              <a class="hero-cta-primary" href={featuredProject.links.play}>▶ Play Demo</a>
            )}
            <button type="button" class="hero-cta-secondary" data-hero-case-study>Case Study →</button>
            {featuredProject.links?.source && (
              <a class="hero-cta-secondary" href={featuredProject.links.source}>Source</a>
            )}
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Append Hero CSS to `src/styles/portfolio.css`**

Add this block at the end of `src/styles/portfolio.css` (before the existing `@media` blocks if you want it scoped neatly; otherwise simply append — the existing media queries are at the very bottom and will still apply):

```css
.featured-hero {
  position: relative;
  width: min(100%, 1480px);
  margin: 88px auto 0;
  padding: 0 max(22px, calc((100vw - 1480px) / 2));
}

.featured-hero .hero-media {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--tone) 45%, rgba(244, 241, 232, 0.18));
  background: #111;
  box-shadow:
    0 40px 120px rgba(0, 0, 0, 0.42),
    0 0 80px color-mix(in srgb, var(--tone) 18%, transparent);
}

.featured-hero .hero-media img {
  width: 100%;
  height: 100%;
  filter: saturate(1.02) contrast(1.06);
  object-fit: cover;
}

.featured-hero .hero-scrim {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.12), transparent 38%),
    linear-gradient(180deg, transparent 38%, rgba(0, 0, 0, 0.86));
  pointer-events: none;
}

.featured-hero .hero-overlay {
  position: absolute;
  left: max(40px, calc((100vw - 1480px) / 2 + 40px));
  right: max(40px, calc((100vw - 1480px) / 2 + 40px));
  bottom: clamp(28px, 5vw, 64px);
  display: grid;
  gap: 14px;
  pointer-events: none;
}

.featured-hero .hero-overlay > * {
  pointer-events: auto;
}

.featured-hero .hero-eyebrow {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0;
  font-size: 0.78rem;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.featured-hero .hero-eyebrow span:first-child {
  color: var(--tone);
}

.featured-hero .hero-eyebrow span:last-child {
  color: rgba(244, 241, 232, 0.72);
}

.featured-hero .hero-title {
  margin: 0;
  color: var(--ink);
  font-size: clamp(2.4rem, 6vw, 5.4rem);
  font-weight: 950;
  letter-spacing: -0.02em;
  line-height: 0.92;
  text-transform: uppercase;
}

.featured-hero .hero-summary {
  max-width: min(680px, 60%);
  margin: 0;
  color: rgba(244, 241, 232, 0.86);
  font-size: clamp(1rem, 1.6vw, 1.18rem);
  font-weight: 700;
  line-height: 1.55;
}

.featured-hero .hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.featured-hero .hero-cta-primary,
.featured-hero .hero-cta-secondary {
  display: inline-flex;
  align-items: center;
  border: 1px solid transparent;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.02em;
  padding: 12px 16px;
  cursor: pointer;
  text-decoration: none;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    transform 160ms ease;
}

.featured-hero .hero-cta-primary {
  background: var(--ink);
  color: #0c0c0c;
}

.featured-hero .hero-cta-primary:hover {
  transform: translateY(-1px);
}

.featured-hero .hero-cta-secondary {
  background: rgba(12, 12, 12, 0.55);
  border-color: rgba(244, 241, 232, 0.4);
  color: var(--ink);
  backdrop-filter: blur(10px);
}

.featured-hero .hero-cta-secondary:hover {
  border-color: var(--tone);
  color: var(--tone);
}
```

- [ ] **Step 3: Wire Hero "Case Study →" button to open the featured project's detail modal**

In the inline `<script is:inline>` block in `src/pages/portfolio.astro`, find the line that registers `detailClose?.addEventListener("click", closeDetail);` (approximately line 895). Immediately before it, add:

```js
      const heroCaseStudy = document.querySelector("[data-hero-case-study]");
      heroCaseStudy?.addEventListener("click", () => {
        const featuredCard = cards[0];
        if (featuredCard) openDetail(featuredCard);
      });
```

This relies on the featured project being `projects[0]` and therefore `cards[0]` (Task 1 guarantees this).

- [ ] **Step 4: Verify the Hero renders above the project section**

Restart dev server (`npm run dev`) if it's already running and reload the page. Expected at desktop:
- A wide 16:9 image block sits below the header, with the project title `PROJECT NEMESIS` overlaid bottom-left
- The eyebrow shows `Featured 01 · 2025 · Unreal 5.3 · Multiplayer Action · Shipped` (or close)
- Three buttons appear: `▶ Play Demo`, `Case Study →`, `Source`
- Clicking `Case Study →` opens the existing detail modal populated with project[0]'s data

If the modal doesn't open, confirm `cards[0]` exists in the JS by adding `console.log(cards)` once and removing it.

- [ ] **Step 5: Commit**

```
git add src/pages/portfolio.astro src/styles/portfolio.css
git commit -m "feat(portfolio): add 16:9 featured hero block above project section"
```

---

## Task 3: Slim the Header and add a dedicated Projects-Section header

**Files:**
- Modify: `src/pages/portfolio.astro` — replace the `<header class="world-header">` markup; insert a new `<div class="projects-section-header">` block inside `<section class="world-stage">` above `<div class="world-scene" ...>`.
- Modify: `src/styles/portfolio.css` — replace `.world-header` rule and add `.projects-section-header` rules.

- [ ] **Step 1: Replace the `<header>` block**

Find the existing `<header class="world-header" aria-label="World navigation">` (around line 187) and replace its entire content (through the closing `</header>`) with:

```astro
    <header class="world-header" aria-label="Site navigation">
      <a class="site-mark" href="/">● HYEONGJUN YOO <span>/ Game Programmer</span></a>
      <nav class="site-nav" aria-label="Primary">
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="https://github.com/HyeongJunYoo" rel="noreferrer noopener" target="_blank">GitHub</a>
        <a href="https://www.linkedin.com/" rel="noreferrer noopener" target="_blank">LinkedIn</a>
      </nav>
    </header>
```

The `mode-tabs`, `sound-toggle` markup is intentionally removed here — Step 2 reinstates it inside the project section header.

- [ ] **Step 2: Insert Projects-Section header before the world scene**

Inside `<section class="world-stage">`, find `<div class="world-title-block">…</div>` (around line 211). The original title block is now redundant — replace the entire `<div class="world-title-block">…</div>` block with:

```astro
        <div class="projects-section-header">
          <div class="projects-section-label">
            <p class="eyebrow">Other projects</p>
            <h2>Work archive</h2>
          </div>
          <div class="projects-section-controls" role="group" aria-label="Project view mode">
            <div class="mode-tabs">
              <button type="button" data-mode-button="grid" aria-pressed="true">Grid</button>
              <button type="button" data-mode-button="deck" aria-pressed="false">Deck</button>
              <button type="button" data-mode-button="world" aria-pressed="false">World</button>
            </div>
            <button type="button" class="sound-toggle" data-pause-toggle aria-pressed="false" aria-label="Pause globe motion">
              <span></span>
            </button>
          </div>
        </div>
```

Note that the default-pressed mode is now `grid` (Task 4 makes Grid the actual default).

- [ ] **Step 3: Replace the `.world-header` CSS block**

In `src/styles/portfolio.css`, find the existing `.world-header { … }` rule (lines 112–142, including `.mode-tabs`/`.sound-toggle` rules currently nested or adjacent). Replace lines 112–199 (everything from `.world-header` through the closing brace of `.sound-toggle[aria-pressed="true"] span { ... }`) with the consolidated rules below. Keep the rest of the file unchanged.

```css
.world-header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px max(22px, calc((100vw - 1480px) / 2));
  background: rgba(12, 12, 12, 0.78);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(244, 241, 232, 0.06);
}

.world-header .site-mark {
  color: var(--ink);
  font-size: 0.86rem;
  font-weight: 900;
  letter-spacing: 0.02em;
  text-decoration: none;
  white-space: nowrap;
}

.world-header .site-mark span {
  color: var(--muted);
  font-weight: 800;
}

.world-header .site-nav {
  display: flex;
  gap: 18px;
}

.world-header .site-nav a {
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  text-decoration: none;
  transition: color 160ms ease;
}

.world-header .site-nav a:hover {
  color: var(--ink);
}

.projects-section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  width: min(100%, 1480px);
  margin: 56px auto 18px;
  padding: 0 max(22px, calc((100vw - 1480px) / 2));
}

.projects-section-label .eyebrow {
  margin: 0;
  color: var(--tone);
  font-size: 0.74rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  line-height: 1;
  text-transform: uppercase;
}

.projects-section-label h2 {
  margin: 6px 0 0;
  color: var(--ink);
  font-size: clamp(1.2rem, 2vw, 1.7rem);
  font-weight: 950;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
}

.projects-section-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mode-tabs {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 1px solid rgba(244, 241, 232, 0.12);
  background: rgba(12, 12, 12, 0.62);
  padding: 5px;
  backdrop-filter: blur(16px);
}

.mode-tabs button {
  background: transparent;
  border: 0;
  color: var(--muted);
  font: inherit;
  font-size: 0.78rem;
  font-weight: 850;
  line-height: 1;
  padding: 7px 9px;
  cursor: pointer;
  transition:
    background-color 160ms ease,
    color 160ms ease;
}

.mode-tabs button[aria-pressed="true"] {
  background: rgba(244, 241, 232, 0.1);
  color: var(--ink);
}

.sound-toggle {
  display: grid;
  place-items: center;
  width: 34px;
  height: 24px;
  border: 1px solid rgba(244, 241, 232, 0.12);
  border-radius: 999px;
  background: rgba(244, 241, 232, 0.08);
  cursor: pointer;
}

.sound-toggle span {
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--ink);
  box-shadow: 0 0 14px color-mix(in srgb, var(--tone) 40%, transparent);
  transition:
    background-color 160ms ease,
    transform 160ms ease;
}

.sound-toggle[aria-pressed="true"] span {
  background: var(--tone);
  transform: translateX(5px);
}
```

- [ ] **Step 4: Remove the now-orphaned `.world-title-block` rule from CSS**

In `src/styles/portfolio.css`, find and delete the rules `.world-title-block { … }`, `.world-title-block p, .detail-eyebrow { … }`, and `.world-title-block h1 { … }` (originally lines 211–238). The `.detail-eyebrow` rule body must be preserved — extract just that selector into a new standalone rule:

```css
.detail-eyebrow {
  margin: 0;
  color: var(--tone);
  font-size: 0.78rem;
  font-weight: 900;
  line-height: 1.2;
}
```

- [ ] **Step 5: Adjust `.world-stage` padding-top**

The existing `.world-stage` rule has `padding: 86px 24px 74px;` to clear the old fixed header. The new fixed header is shorter and the projects-section-header sits above the stage. Change the rule to:

```css
.world-stage {
  position: relative;
  display: grid;
  min-height: auto;
  place-items: center;
  overflow: hidden;
  padding: 0 24px 74px;
  perspective: 1500px;
}
```

Find the existing `.world-stage { ... }` block and replace it with the above.

- [ ] **Step 6: Verify**

Reload http://localhost:4321/portfolio. Expected at desktop:
- Top of page shows a slim header: `● HYEONGJUN YOO / Game Programmer` left, `About · Contact · GitHub · LinkedIn` right. No mode tabs, no pause toggle.
- Below the Hero, a row reads `OTHER PROJECTS` (small, tone-colored) above `WORK ARCHIVE` (larger). On its right are the three mode buttons (Grid pressed) and the pause toggle.
- The 3D world / grid / deck still functions when clicking those mode buttons.

- [ ] **Step 7: Commit**

```
git add src/pages/portfolio.astro src/styles/portfolio.css
git commit -m "refactor(portfolio): slim global header and move mode tabs into project section"
```

---

## Task 4: Redesign Grid mode — 16:10 cards via CSS Grid, with status chip and meta line, hide featured

**Files:**
- Modify: `src/styles/portfolio.css` — rewrite `.world-shell[data-mode="grid"]` block.
- Modify: `src/pages/portfolio.astro` — extend each `.world-card` markup with status + meta-line elements. Render only `otherProjects` into the rotator (featured stays out of the grid; remains in deck/world via JS-driven shadow card — see Step 2).

- [ ] **Step 1: Update card markup to include status chip + meta line**

In `src/pages/portfolio.astro`, locate the `{projects.map((project, index) => ( … ))}` block inside `<div class="world-rotator">` (around lines 211–266). Replace the entire mapping block with:

```astro
            {projects.map((project, index) => (
              <button
                type="button"
                class={`world-card is-${project.level}`}
                data-world-card
                data-project-index={index}
                data-card-id={project.id}
                data-title={project.title}
                data-eyebrow={project.eyebrow}
                data-summary={project.summary}
                data-what-i-built={project.whatIBuilt}
                data-role={project.role}
                data-period={project.period}
                data-engine={project.engine}
                data-platform={project.platform}
                data-genre={project.genre}
                data-team={project.team}
                data-status={project.status}
                data-image={project.image}
                data-tone={project.tone}
                data-level={project.level}
                data-stack={project.stack.join("|")}
                data-stats={JSON.stringify(project.stats || [])}
                data-gallery={JSON.stringify(project.gallery || [])}
                data-links={JSON.stringify(project.links || {})}
                aria-pressed={index === 0 ? "true" : "false"}
                style={`
                  --theta: ${project.theta}deg;
                  --phi: ${project.phi}deg;
                  --theta-back: ${-project.theta}deg;
                  --phi-back: ${-project.phi}deg;
                  --w: ${project.width}px;
                  --h: ${project.height}px;
                  --gx: ${project.gridX}px;
                  --gy: ${project.gridY}px;
                  --delay: ${index * -0.12}s;
                  --deck-x: 0px;
                  --deck-y: 0px;
                  --deck-z: 0px;
                  --deck-rotate: 0deg;
                  --deck-scale: 1;
                  --deck-opacity: 1;
                  --deck-z-index: ${100 - index};
                `}
              >
                <span class="card-inner">
                  <img src={project.image} alt="" loading={index > 1 ? "lazy" : "eager"} decoding="async" />
                  <span class="card-scrim"></span>
                  <span class="card-status">{project.status}</span>
                  <span class="card-eyebrow">{project.eyebrow}</span>
                  <span class="card-meta">
                    <strong>{project.title}</strong>
                    <span>{project.engine} · {project.genre} · {project.period.split("·")[0].trim()}</span>
                  </span>
                </span>
              </button>
            ))}
```

Two changes from the original: a new `<span class="card-status">` (top-right chip), a new `<span class="card-eyebrow">` (top-left badge replacing the old `card-level`), and the meta block now has the title above an `engine · genre · year` line.

- [ ] **Step 2: Replace the `[data-mode="grid"]` CSS rules to use CSS Grid**

In `src/styles/portfolio.css`, find the block `.world-shell[data-mode="grid"] .world-rotator { ... }` and the four selectors that follow (`.world-shell[data-mode="grid"] .world-card`, `.world-shell[data-mode="grid"] .world-card.is-featured, .world-shell[data-mode="grid"] .world-card.is-support`, `.world-shell[data-mode="grid"] .world-card:nth-child(3n)`, `.world-shell[data-mode="grid"] .world-card .card-inner`, and `.world-shell[data-mode="grid"] .world-card.is-featured .card-meta strong`). Replace **all of them** with this new block:

```css
.world-shell[data-mode="grid"] .world-scene {
  width: min(100%, 1480px);
  aspect-ratio: auto;
  cursor: default;
  transform: none;
}

.world-shell[data-mode="grid"] .world-halo {
  display: none;
}

.world-shell[data-mode="grid"] .world-rotator {
  position: static;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
  transform: none;
}

.world-shell[data-mode="grid"] .world-card {
  position: static;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  margin: 0;
  opacity: 1;
  transform: none;
  animation: none;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
  z-index: auto;
}

.world-shell[data-mode="grid"] .world-card.is-hero {
  display: none;
}

.world-shell[data-mode="grid"] .world-card .card-inner {
  border-color: color-mix(in srgb, var(--card-tone, var(--tone)) 30%, rgba(244, 241, 232, 0.16));
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.36);
}

.world-shell[data-mode="grid"] .world-card:hover {
  transform: translateY(-2px);
}

.world-shell[data-mode="grid"] .world-card:hover .card-inner {
  border-color: var(--card-tone, var(--tone));
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--card-tone, var(--tone)) 50%, transparent),
    0 24px 56px rgba(0, 0, 0, 0.42),
    0 0 36px color-mix(in srgb, var(--card-tone, var(--tone)) 30%, transparent);
}
```

The selector `.world-card.is-hero` will be set in Step 3 to mark the featured card so it gets hidden in Grid mode only.

- [ ] **Step 3: Mark the featured card with `is-hero` so Grid mode can hide it**

In `src/pages/portfolio.astro`, modify the card class string from Step 1 to also tag the featured project. Change:

```astro
                class={`world-card is-${project.level}`}
```

to:

```astro
                class={`world-card is-${project.level} ${project.id === featuredProject.id ? "is-hero" : ""}`}
```

- [ ] **Step 4: Set the per-card tone variable so each card uses its own color**

Inside the `style={` block of each card (added in Step 1), add a `--card-tone` line. Change the style block so it ends with these two new lines added before the closing backtick:

```js
                  --card-tone: var(--${project.tone});
                  ...
                `}
```

Concretely, the style block becomes (showing only the addition — keep all other lines):

```astro
                style={`
                  --card-tone: var(--${project.tone});
                  --theta: ${project.theta}deg;
                  --phi: ${project.phi}deg;
                  --theta-back: ${-project.theta}deg;
                  --phi-back: ${-project.phi}deg;
                  --w: ${project.width}px;
                  --h: ${project.height}px;
                  --gx: ${project.gridX}px;
                  --gy: ${project.gridY}px;
                  --delay: ${index * -0.12}s;
                  --deck-x: 0px;
                  --deck-y: 0px;
                  --deck-z: 0px;
                  --deck-rotate: 0deg;
                  --deck-scale: 1;
                  --deck-opacity: 1;
                  --deck-z-index: ${100 - index};
                `}
```

- [ ] **Step 5: Update card-status / card-eyebrow / card-meta CSS**

In `src/styles/portfolio.css`, find the rule `.card-level { ... }` (lines 488–500) and **replace it plus the immediately following `.world-card.is-support .card-level { ... }` rule** with the rules below. Then find the `.card-meta { ... }` block (lines 506–528) and replace it with the new `.card-meta` rules below. Finally remove the rule `.world-card.is-featured .card-meta strong { ... }` (lines 530–532) entirely — Grid mode no longer has visible featured cards (they're hidden), and Hero handles that styling.

```css
.card-eyebrow {
  position: absolute;
  top: 10px;
  left: 10px;
  color: var(--card-tone, var(--tone));
  font-size: 0.62rem;
  font-weight: 950;
  line-height: 1;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
}

.card-status {
  position: absolute;
  top: 10px;
  right: 10px;
  border: 1px solid rgba(244, 241, 232, 0.32);
  background: rgba(0, 0, 0, 0.52);
  color: var(--ink);
  font-size: 0.58rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  line-height: 1;
  padding: 5px 7px;
  text-transform: uppercase;
  backdrop-filter: blur(6px);
}

.card-meta {
  position: absolute;
  right: 12px;
  bottom: 12px;
  left: 12px;
  display: grid;
  gap: 4px;
}

.card-meta strong {
  color: #fffaf0;
  font-size: clamp(0.95rem, 1.3vw, 1.18rem);
  font-weight: 950;
  letter-spacing: 0;
  line-height: 1.04;
  text-transform: uppercase;
}

.card-meta span {
  color: rgba(244, 241, 232, 0.7);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1;
}
```

- [ ] **Step 6: Set Grid as the initial mode on the world-shell**

The existing `<div class="world-shell" ... data-mode="world">` (line 183) defaults the page to World mode. Change `data-mode="world"` to `data-mode="grid"`. (The mode-tab `aria-pressed` defaults were already set in Task 3.)

- [ ] **Step 7: Verify**

Reload the page. Expected:
- Page lands in Grid mode by default.
- 4 cards (CORE 02–05) appear in a 2x2 16:10 grid below the projects-section-header.
- The featured `PROJECT NEMESIS` card does NOT appear in the grid (hidden by `.is-hero` rule).
- Each card shows: top-left tone-colored eyebrow (e.g., `CORE 02`), top-right status chip (e.g., `PROTOTYPE`), bottom title + `Unity 6 · Action · 2024` style meta line.
- Hovering a card lifts it slightly and intensifies the toned border.
- Clicking a card opens the detail modal as before (modal still shows old `challenge/build/outcome` — that's Task 9).
- Switching to Deck or World mode brings back the original 3D / deck behavior (the featured card is still in those collections — only Grid mode hides it).

- [ ] **Step 8: Commit**

```
git add src/pages/portfolio.astro src/styles/portfolio.css
git commit -m "feat(portfolio): redesign grid mode with 16:10 cards, status chips, and tonal accents"
```

---

## Task 5: Adjust Deck mode card to 16:9

**Files:**
- Modify: `src/styles/portfolio.css` — change the `.world-shell[data-mode="deck"] .world-card` width/height rules.

- [ ] **Step 1: Update Deck card sizing**

Find the rule `.world-shell[data-mode="deck"] .world-card { ... }` (around lines 384–397) and replace its `width`, `height`, `margin-top`, `margin-left` values:

Original:
```css
.world-shell[data-mode="deck"] .world-card {
  z-index: var(--deck-z-index);
  width: clamp(180px, 24vw, 320px);
  height: clamp(300px, 56vh, 560px);
  margin-top: calc(clamp(300px, 56vh, 560px) / -2);
  margin-left: calc(clamp(180px, 24vw, 320px) / -2);
  ...
}
```

Replace with:
```css
.world-shell[data-mode="deck"] .world-card {
  z-index: var(--deck-z-index);
  width: clamp(280px, 38vw, 560px);
  height: calc(clamp(280px, 38vw, 560px) * 9 / 16);
  aspect-ratio: 16 / 9;
  margin-top: calc((clamp(280px, 38vw, 560px) * 9 / 16) / -2);
  margin-left: calc(clamp(280px, 38vw, 560px) / -2);
  opacity: var(--deck-opacity);
  transform:
    translate3d(calc(var(--deck-x) + var(--deck-peek, 0px)), var(--deck-y), var(--deck-z))
    rotateY(var(--deck-rotate))
    rotateZ(calc(var(--deck-rotate) * -0.18))
    scale(var(--deck-scale));
  pointer-events: none;
}
```

- [ ] **Step 2: Update the mobile breakpoint Deck card sizing**

Inside `@media (max-width: 560px)`, find the rule `.world-shell[data-mode="deck"] .world-card { ... }` (around lines 1004–1009) and replace with:

```css
  .world-shell[data-mode="deck"] .world-card {
    width: clamp(240px, 76vw, 360px);
    height: calc(clamp(240px, 76vw, 360px) * 9 / 16);
    aspect-ratio: 16 / 9;
    margin-top: calc((clamp(240px, 76vw, 360px) * 9 / 16) / -2);
    margin-left: calc(clamp(240px, 76vw, 360px) / -2);
  }
```

- [ ] **Step 3: Verify**

Switch to Deck mode in the project section. Expected: a single wide card centered (16:9), with neighbors fanned out behind. Drag/swipe still works.

- [ ] **Step 4: Commit**

```
git add src/styles/portfolio.css
git commit -m "feat(portfolio): align deck mode cards to 16:9 aspect"
```

---

## Task 6: Minimize World mode card content

**Files:**
- Modify: `src/styles/portfolio.css` — add a `[data-mode="world"]` scoped rule to hide eyebrow/status and shrink meta.

- [ ] **Step 1: Add World-mode-specific card minimization**

Append the following at the bottom of `src/styles/portfolio.css` (just above the existing `@keyframes` block):

```css
.world-shell[data-mode="world"] .card-status,
.world-shell[data-mode="world"] .card-meta span {
  display: none;
}

.world-shell[data-mode="world"] .card-eyebrow {
  font-size: 0.55rem;
}

.world-shell[data-mode="world"] .card-meta strong {
  font-size: 0.78rem;
}

.world-shell[data-mode="world"] .world-card.is-featured .card-meta strong {
  font-size: 1rem;
}

.world-shell[data-mode="world"] .world-card:hover .card-meta span {
  display: block;
}
```

The hover rule lets viewers see the engine/genre line by hovering a world card.

- [ ] **Step 2: Verify**

Switch to World mode. Expected: cards in the 3D sphere show only the eyebrow (small) and title — engine/genre line and status chip are hidden. Hovering a card reveals the engine/genre line.

- [ ] **Step 3: Commit**

```
git add src/styles/portfolio.css
git commit -m "feat(portfolio): minimize world-mode card content for sphere readability"
```

---

## Task 7: Detail modal — replace image stage with 16:9 hero media

**Files:**
- Modify: `src/pages/portfolio.astro` — rename/replace `.detail-image-stage` with `.detail-hero-media`.
- Modify: `src/styles/portfolio.css` — replace `.detail-image-stage` rules with `.detail-hero-media`.
- Modify: `src/pages/portfolio.astro` (script) — update the JS selector reading the detail image.

- [ ] **Step 1: Update the detail markup**

In `src/pages/portfolio.astro`, find `<div class="detail-image-stage" aria-hidden="true">` (around line 281) and replace it through its closing `</div>` with:

```astro
        <div class="detail-hero-media" data-detail-hero-media aria-hidden="true">
          <img data-detail-image src={featuredProject.image} alt="" />
          <span class="detail-hero-scrim"></span>
        </div>
```

(Same `data-detail-image` attribute so the existing JS that updates the image still works without changes.)

- [ ] **Step 2: Replace the detail-image-stage CSS with detail-hero-media**

In `src/styles/portfolio.css`, find the rule `.detail-image-stage { ... }` (around lines 657–667), the rule `.detail-image-stage::after { ... }` (lines 669–676), and the rule `.detail-image-stage img { ... }` (lines 678–685). Replace **all three** with:

```css
.detail-hero-media {
  position: relative;
  aspect-ratio: 16 / 9;
  width: 100%;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--tone) 50%, rgba(244, 241, 232, 0.18));
  background: #111;
  box-shadow:
    0 40px 120px rgba(0, 0, 0, 0.42),
    0 0 70px color-mix(in srgb, var(--tone) 20%, transparent);
}

.detail-hero-media img {
  display: block;
  width: 100%;
  height: 100%;
  filter: saturate(1.02) contrast(1.06);
  object-fit: cover;
}

.detail-hero-scrim {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.16), transparent 30%),
    linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.55));
  pointer-events: none;
}
```

- [ ] **Step 3: Update the entrance animation**

Find the `@keyframes detail-image-enter` block (around lines 845–857) and replace it with a simpler 16:9-friendly animation (clip-path on a rectangular shape would jitter — use scale + opacity):

```css
@keyframes detail-image-enter {
  from {
    opacity: 0.25;
    transform: translate3d(0, 18px, 0) scale(0.92);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}
```

Also update the rule `.project-detail.is-entering .detail-image-stage` (line 626–628) to target the new class:

Original:
```css
.project-detail.is-entering .detail-image-stage {
  animation: detail-image-enter 620ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

Replace with:
```css
.project-detail.is-entering .detail-hero-media {
  animation: detail-image-enter 620ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

- [ ] **Step 4: Update the project-detail grid layout to stack hero on top**

The existing `.project-detail` rule uses a 2-column grid (`grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr)`). The new layout puts the 16:9 hero on top and content below. Replace the `.project-detail { ... }` block (around lines 598–618) with:

```css
.project-detail {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: clamp(20px, 3vw, 36px);
  align-content: start;
  overflow-x: hidden;
  overflow-y: auto;
  background:
    radial-gradient(circle at 24% 28%, color-mix(in srgb, var(--tone) 18%, transparent), transparent 28rem),
    rgba(8, 8, 8, 0.94);
  padding: clamp(64px, 8vw, 96px) max(22px, calc((100vw - 1180px) / 2)) 56px;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.96);
  transition:
    opacity 420ms ease,
    transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

Also remove the `.project-detail` 2-col override inside `@media (max-width: 1100px)` (around lines 938–943, the `grid-template-columns: 1fr;` is now redundant). You can leave the `gap` override for mobile.

- [ ] **Step 5: Verify**

Click any project card. Expected: detail modal opens with a 16:9 hero image at the top and the existing text content below. The image fade/scale entrance still plays. Closing (Back / Esc) and prev/next still work.

- [ ] **Step 6: Commit**

```
git add src/pages/portfolio.astro src/styles/portfolio.css
git commit -m "refactor(portfolio): replace detail image stage with 16:9 hero media block"
```

---

## Task 8: Detail modal — 4-up meta strip (engine / platform / role / team-period)

**Files:**
- Modify: `src/pages/portfolio.astro` — replace the existing `<dl class="detail-meta">` block.
- Modify: `src/styles/portfolio.css` — replace `.detail-meta` rules.
- Modify: `src/pages/portfolio.astro` (script) — adjust the JS that updates `detailPeriod` / `detailRole` to also populate engine/platform/team.

- [ ] **Step 1: Replace the meta strip markup**

In `src/pages/portfolio.astro`, find the existing `<dl class="detail-meta">` block (around lines 290–299) and replace it with:

```astro
          <dl class="detail-meta">
            <div>
              <dt>Engine</dt>
              <dd data-detail-engine>{featuredProject.engine}</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd data-detail-platform>{featuredProject.platform}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd data-detail-role>{featuredProject.role}</dd>
            </div>
            <div>
              <dt>Team / Period</dt>
              <dd data-detail-team>{featuredProject.team} · {featuredProject.period}</dd>
            </div>
          </dl>
```

- [ ] **Step 2: Update `.detail-meta` CSS to a 4-up grid**

In `src/styles/portfolio.css`, replace the existing `.detail-meta { ... }` rule (lines 718–725) with:

```css
.detail-meta {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin: 0;
  border-top: 1px solid rgba(244, 241, 232, 0.16);
  border-bottom: 1px solid rgba(244, 241, 232, 0.16);
}
```

Also replace the rule `.detail-meta div + div { ... }` (lines 733–736) with:

```css
.detail-meta div + div {
  border-left: 1px solid rgba(244, 241, 232, 0.16);
  padding-left: 18px;
}
```

(The padding rule moves with it.)

- [ ] **Step 3: Update the JS that populates detail meta**

In the `<script is:inline>` block, find the variable declarations `const detailPeriod = ...` and `const detailRole = ...` (around lines 349–350). Replace those two lines plus the lines in `setActiveCard` that update them with the expanded set. Specifically:

Find:
```js
      const detailPeriod = document.querySelector("[data-detail-period]");
      const detailRole = document.querySelector("[data-detail-role]");
```

Replace with:
```js
      const detailEngine = document.querySelector("[data-detail-engine]");
      const detailPlatform = document.querySelector("[data-detail-platform]");
      const detailRole = document.querySelector("[data-detail-role]");
      const detailTeam = document.querySelector("[data-detail-team]");
```

Then in the `setActiveCard` function (around lines 580–581), find:
```js
        if (detailPeriod) detailPeriod.textContent = card.dataset.period || "";
        if (detailRole) detailRole.textContent = card.dataset.role || "";
```

Replace with:
```js
        if (detailEngine) detailEngine.textContent = card.dataset.engine || "";
        if (detailPlatform) detailPlatform.textContent = card.dataset.platform || "";
        if (detailRole) detailRole.textContent = card.dataset.role || "";
        if (detailTeam) detailTeam.textContent = `${card.dataset.team || ""} · ${card.dataset.period || ""}`.replace(/^·\s|\s·\s*$/g, "");
```

- [ ] **Step 4: Mobile breakpoint — fall back to 2x2**

In `@media (max-width: 1100px)`, no change needed (4-up still fits at tablet width).

In `@media (max-width: 560px)`, find the existing block:
```css
  .detail-meta {
    grid-template-columns: 1fr;
  }
  .detail-meta div + div {
    border-top: 1px solid rgba(244, 241, 232, 0.16);
    border-left: 0;
    padding-left: 0;
  }
```

Replace with:
```css
  .detail-meta {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .detail-meta div {
    padding: 14px;
  }
  .detail-meta div:nth-child(2n) {
    border-left: 1px solid rgba(244, 241, 232, 0.16);
    padding-left: 14px;
  }
  .detail-meta div:nth-child(2n+1) {
    border-left: 0;
    padding-left: 0;
  }
  .detail-meta div:nth-child(n+3) {
    border-top: 1px solid rgba(244, 241, 232, 0.16);
  }
```

- [ ] **Step 5: Verify**

Open detail. Expected: 4 columns showing Engine / Platform / Role / Team · Period. Resize to mobile width — the strip becomes 2x2.

- [ ] **Step 6: Commit**

```
git add src/pages/portfolio.astro src/styles/portfolio.css
git commit -m "feat(portfolio): expand detail meta strip to 4-up engine/platform/role/team"
```

---

## Task 9: Detail modal — replace 3-section detail-grid with single "What I Built" narrative

**Files:**
- Modify: `src/pages/portfolio.astro` — replace `<div class="detail-grid">` block.
- Modify: `src/styles/portfolio.css` — replace `.detail-grid` rules with `.detail-narrative`.
- Modify: `src/pages/portfolio.astro` (script) — replace the three challenge/build/outcome handlers with one.

- [ ] **Step 1: Replace the detail-grid markup**

In `src/pages/portfolio.astro`, find `<div class="detail-grid">` and its three nested `<section>` blocks (around lines 301–314). Replace the entire `<div class="detail-grid">…</div>` with:

```astro
          <section class="detail-narrative">
            <h3>What I built</h3>
            <p data-detail-what-i-built>{featuredProject.whatIBuilt}</p>
          </section>
```

- [ ] **Step 2: Replace `.detail-grid` CSS with `.detail-narrative`**

In `src/styles/portfolio.css`, find the rules `.detail-grid { ... }`, `.detail-grid section { ... }`, `.detail-grid h3, .detail-grid p { ... }`, `.detail-grid p { ... }` (around lines 760–783). Replace **all four** with:

```css
.detail-narrative {
  display: grid;
  gap: 8px;
  border-bottom: 1px solid rgba(244, 241, 232, 0.12);
  padding-bottom: 18px;
}

.detail-narrative h3 {
  margin: 0;
  color: var(--tone);
  font-size: 0.78rem;
  font-weight: 950;
  letter-spacing: 0.06em;
  line-height: 1;
  text-transform: uppercase;
}

.detail-narrative p {
  margin: 0;
  color: rgba(244, 241, 232, 0.82);
  font-size: 1rem;
  font-weight: 650;
  line-height: 1.6;
  overflow-wrap: anywhere;
}
```

Also find the rule `.detail-meta dt, .detail-grid h3 { ... }` (around lines 743–750) — drop the `.detail-grid h3` from that selector list. The new `.detail-meta dt` rule alone:

```css
.detail-meta dt {
  color: var(--tone);
  font-size: 0.78rem;
  font-weight: 950;
  line-height: 1;
  text-transform: uppercase;
}
```

- [ ] **Step 3: Update JS to populate `what I built`**

In the script, find the lines that grab `detailChallenge`, `detailBuild`, `detailOutcome` (around lines 351–353):

```js
      const detailChallenge = document.querySelector("[data-detail-challenge]");
      const detailBuild = document.querySelector("[data-detail-build]");
      const detailOutcome = document.querySelector("[data-detail-outcome]");
```

Replace with:
```js
      const detailWhatIBuilt = document.querySelector("[data-detail-what-i-built]");
```

Then in `setActiveCard`, find lines (around 582–584):
```js
        if (detailChallenge) detailChallenge.textContent = card.dataset.challenge || "";
        if (detailBuild) detailBuild.textContent = card.dataset.build || "";
        if (detailOutcome) detailOutcome.textContent = card.dataset.outcome || "";
```

Replace with:
```js
        if (detailWhatIBuilt) detailWhatIBuilt.textContent = card.dataset.whatIBuilt || "";
```

- [ ] **Step 4: Verify**

Open any project's detail. Expected: a single section labeled `WHAT I BUILT` shows the project's `whatIBuilt` paragraph (e.g., "멀티플레이어 동기화 레이어, 무기 lag-compensation, …"). The previous 3-section layout is gone.

- [ ] **Step 5: Commit**

```
git add src/pages/portfolio.astro src/styles/portfolio.css
git commit -m "refactor(portfolio): replace detail challenge/build/outcome with single What I Built narrative"
```

---

## Task 10: Detail modal — Stats grid (3-up)

**Files:**
- Modify: `src/pages/portfolio.astro` — append a new `<section class="detail-stats">` before the `.detail-stack` element.
- Modify: `src/styles/portfolio.css` — append `.detail-stats` rules.
- Modify: `src/pages/portfolio.astro` (script) — render stats from `card.dataset.stats`.

- [ ] **Step 1: Insert the Stats markup**

In `src/pages/portfolio.astro`, find `<div class="detail-stack" data-detail-stack>` (the existing tech-stack chip container, around line 316). Immediately before it, insert:

```astro
          <section class="detail-stats" data-detail-stats hidden>
          </section>
```

(Empty — the JS populates it. The `hidden` attribute starts it collapsed; JS removes it when stats exist.)

- [ ] **Step 2: Append `.detail-stats` CSS**

Append to `src/styles/portfolio.css`:

```css
.detail-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.detail-stats[hidden] {
  display: none;
}

.detail-stats .stat {
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 6px;
  border: 1px solid color-mix(in srgb, var(--tone) 35%, rgba(244, 241, 232, 0.16));
  background: color-mix(in srgb, var(--tone) 6%, transparent);
  padding: 18px 12px;
  text-align: center;
}

.detail-stats .stat-value {
  color: var(--tone);
  font-size: clamp(1.4rem, 2.6vw, 2.1rem);
  font-weight: 950;
  letter-spacing: -0.02em;
  line-height: 1;
}

.detail-stats .stat-label {
  color: rgba(244, 241, 232, 0.64);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1.2;
  text-transform: uppercase;
}

@media (max-width: 560px) {
  .detail-stats {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Wire JS to render stats per active card**

In the script block, after the existing detail elements declarations, add:

```js
      const detailStats = document.querySelector("[data-detail-stats]");
```

Then, in `setActiveCard`, after the `replaceStack(card.dataset.stack || "")` line (around line 585), add:

```js
        if (detailStats) {
          let stats = [];
          try {
            stats = JSON.parse(card.dataset.stats || "[]");
          } catch (error) {
            stats = [];
          }
          detailStats.replaceChildren();
          if (stats.length > 0) {
            detailStats.removeAttribute("hidden");
            stats.forEach((stat) => {
              const statEl = document.createElement("div");
              statEl.className = "stat";
              const value = document.createElement("span");
              value.className = "stat-value";
              value.textContent = stat.value;
              const label = document.createElement("span");
              label.className = "stat-label";
              label.textContent = stat.label;
              statEl.append(value, label);
              detailStats.append(statEl);
            });
          } else {
            detailStats.setAttribute("hidden", "");
          }
        }
```

- [ ] **Step 4: Verify**

Open `PROJECT NEMESIS` detail. Expected: a row of 3 cards reading `60 / FPS @ 1080p`, `64 / Concurrent players`, `2.1GB / Build size`. Switch to a different project (e.g., via prev/next) and confirm stats update accordingly.

- [ ] **Step 5: Commit**

```
git add src/pages/portfolio.astro src/styles/portfolio.css
git commit -m "feat(portfolio): add 3-up stats grid to detail modal"
```

---

## Task 11: Detail modal — Screenshot gallery (4-up)

**Files:**
- Modify: `src/pages/portfolio.astro` — append `<section class="detail-gallery">` before `.detail-stats`.
- Modify: `src/styles/portfolio.css` — append `.detail-gallery` rules.
- Modify: `src/pages/portfolio.astro` (script) — render gallery from `card.dataset.gallery`.

- [ ] **Step 1: Insert gallery markup**

In `src/pages/portfolio.astro`, find `<section class="detail-stats" ...>` (added in Task 10). Immediately **before** it, insert:

```astro
          <section class="detail-gallery" data-detail-gallery hidden>
          </section>
```

- [ ] **Step 2: Append `.detail-gallery` CSS**

Append to `src/styles/portfolio.css`:

```css
.detail-gallery {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
}

.detail-gallery[hidden] {
  display: none;
}

.detail-gallery img {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  border: 1px solid rgba(244, 241, 232, 0.12);
  background: #161616;
  filter: saturate(0.96) contrast(1.04);
  object-fit: cover;
  cursor: zoom-in;
  transition:
    transform 160ms ease,
    border-color 160ms ease;
}

.detail-gallery img:hover {
  border-color: var(--tone);
  transform: scale(1.02);
}

@media (max-width: 1100px) {
  .detail-gallery {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .detail-gallery {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

- [ ] **Step 3: Wire JS to render gallery per active card**

In the script, after the `detailStats` declaration added in Task 10, add:

```js
      const detailGallery = document.querySelector("[data-detail-gallery]");
```

Then in `setActiveCard`, immediately after the stats-render block from Task 10, add:

```js
        if (detailGallery) {
          let gallery = [];
          try {
            gallery = JSON.parse(card.dataset.gallery || "[]");
          } catch (error) {
            gallery = [];
          }
          detailGallery.replaceChildren();
          if (gallery.length > 0) {
            detailGallery.removeAttribute("hidden");
            gallery.forEach((src) => {
              const img = document.createElement("img");
              img.src = src;
              img.alt = "";
              img.loading = "lazy";
              img.decoding = "async";
              detailGallery.append(img);
            });
          } else {
            detailGallery.setAttribute("hidden", "");
          }
        }
```

(No lightbox in this phase — `cursor: zoom-in` hints at future behavior. Out of scope per spec.)

- [ ] **Step 4: Verify**

Open `PROJECT NEMESIS` detail. Expected: 4 square images appear above the stats row. They are responsive (4 columns desktop, 2 columns mobile). Hover changes the border to the project tone and slightly scales.

- [ ] **Step 5: Commit**

```
git add src/pages/portfolio.astro src/styles/portfolio.css
git commit -m "feat(portfolio): add 4-up screenshot gallery to detail modal"
```

---

## Task 12: Detail modal — CTA row

**Files:**
- Modify: `src/pages/portfolio.astro` — insert a `<div class="detail-cta">` between summary and meta.
- Modify: `src/styles/portfolio.css` — append `.detail-cta` rules.
- Modify: `src/pages/portfolio.astro` (script) — populate the CTA from `card.dataset.links`.

- [ ] **Step 1: Insert CTA markup**

In `src/pages/portfolio.astro`, find `<dl class="detail-meta">` inside `<article class="detail-content">`. Immediately **before** it, insert:

```astro
          <div class="detail-cta" data-detail-cta hidden>
          </div>
```

- [ ] **Step 2: Append `.detail-cta` CSS**

Append to `src/styles/portfolio.css`:

```css
.detail-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.detail-cta[hidden] {
  display: none;
}

.detail-cta a {
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(244, 241, 232, 0.32);
  background: rgba(12, 12, 12, 0.55);
  color: var(--ink);
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.02em;
  line-height: 1;
  padding: 10px 14px;
  text-decoration: none;
  transition:
    border-color 160ms ease,
    color 160ms ease,
    background-color 160ms ease;
}

.detail-cta a.is-primary {
  background: var(--ink);
  border-color: var(--ink);
  color: #0c0c0c;
}

.detail-cta a:hover {
  border-color: var(--tone);
  color: var(--tone);
}

.detail-cta a.is-primary:hover {
  border-color: var(--ink);
  color: #0c0c0c;
  filter: brightness(1.04);
}
```

- [ ] **Step 3: Wire JS to populate CTAs per card**

In the script, after the `detailGallery` declaration (Task 11), add:

```js
      const detailCta = document.querySelector("[data-detail-cta]");
```

Then in `setActiveCard`, after the gallery-render block, add:

```js
        if (detailCta) {
          let links = {};
          try {
            links = JSON.parse(card.dataset.links || "{}");
          } catch (error) {
            links = {};
          }
          detailCta.replaceChildren();
          const entries = [];
          if (links.play) entries.push({ key: "play", label: "▶ Play", primary: true, href: links.play });
          if (links.source) entries.push({ key: "source", label: "Source", primary: false, href: links.source });
          if (links.devlog) entries.push({ key: "devlog", label: "Devlog", primary: false, href: links.devlog });

          if (entries.length > 0) {
            detailCta.removeAttribute("hidden");
            entries.forEach((entry) => {
              const a = document.createElement("a");
              a.href = entry.href;
              a.textContent = entry.label;
              if (entry.primary) a.classList.add("is-primary");
              if (entry.href.startsWith("http")) {
                a.rel = "noreferrer noopener";
                a.target = "_blank";
              }
              detailCta.append(a);
            });
          } else {
            detailCta.setAttribute("hidden", "");
          }
        }
```

- [ ] **Step 4: Verify**

Open `PROJECT NEMESIS` detail. Expected: a row of three buttons (`▶ Play` filled, `Source` outlined, `Devlog` outlined) appears between the summary and the meta strip. Switch to `RUNE TACTICS` (no `play` link) — only `Source` and `Devlog` appear. `ECHO RUNNER` shows `▶ Play` and `Source`.

- [ ] **Step 5: Commit**

```
git add src/pages/portfolio.astro src/styles/portfolio.css
git commit -m "feat(portfolio): add detail CTA row for play/source/devlog links"
```

---

## Task 13: Add slim footer

**Files:**
- Modify: `src/pages/portfolio.astro` — insert a `<footer>` after `<main id="main">` closes.
- Modify: `src/styles/portfolio.css` — append `.portfolio-footer` rules.

- [ ] **Step 1: Insert the footer markup**

In `src/pages/portfolio.astro`, find `</main>` (the closing tag, around line 326). Immediately after it (still inside `<div class="world-shell">`), insert:

```astro
    <footer class="portfolio-footer" id="contact">
      <p class="portfolio-footer-about" id="about">
        Game programmer. Unity / Unreal · multiplayer · tools · tech-art-friendly.
      </p>
      <p class="portfolio-footer-links">
        <a href="mailto:yoojoo97@gmail.com">yoojoo97@gmail.com</a>
        <a href="https://github.com/HyeongJunYoo" rel="noreferrer noopener" target="_blank">GitHub</a>
        <a href="https://www.linkedin.com/" rel="noreferrer noopener" target="_blank">LinkedIn</a>
      </p>
    </footer>
```

- [ ] **Step 2: Append footer CSS**

Append to `src/styles/portfolio.css`:

```css
.portfolio-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 18px;
  width: min(100%, 1480px);
  margin: 56px auto 0;
  padding: 28px max(22px, calc((100vw - 1480px) / 2));
  border-top: 1px solid rgba(244, 241, 232, 0.08);
}

.portfolio-footer p {
  margin: 0;
  color: rgba(244, 241, 232, 0.72);
  font-size: 0.86rem;
  font-weight: 750;
  line-height: 1.4;
}

.portfolio-footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.portfolio-footer-links a {
  color: var(--ink);
  font-weight: 850;
  text-decoration: none;
  border-bottom: 1px solid rgba(244, 241, 232, 0.18);
  padding-bottom: 2px;
  transition:
    border-color 160ms ease,
    color 160ms ease;
}

.portfolio-footer-links a:hover {
  border-color: var(--tone);
  color: var(--tone);
}

@media (max-width: 560px) {
  .portfolio-footer {
    flex-direction: column;
    gap: 14px;
  }
}
```

- [ ] **Step 3: Verify**

Scroll to the bottom of http://localhost:4321/portfolio. Expected: a slim footer with the about line on the left and three contact links on the right, separated by a hairline above. The Header's `About` and `Contact` links jump to `#about` / `#contact` anchors here.

- [ ] **Step 4: Commit**

```
git add src/pages/portfolio.astro src/styles/portfolio.css
git commit -m "feat(portfolio): add slim footer with about line and contact links"
```

---

## Task 14: Responsive polish — hero, project header, modal

**Files:**
- Modify: `src/styles/portfolio.css` — adjust the `@media (max-width: 1100px)` and `@media (max-width: 560px)` blocks.

- [ ] **Step 1: Add hero / project header / footer responsive rules**

Inside the existing `@media (max-width: 1100px)` block, append:

```css
  .featured-hero {
    margin-top: 76px;
  }

  .featured-hero .hero-overlay {
    left: 22px;
    right: 22px;
    bottom: 22px;
    gap: 10px;
  }

  .featured-hero .hero-summary {
    max-width: 100%;
    font-size: 0.95rem;
  }

  .projects-section-header {
    flex-wrap: wrap;
    gap: 14px;
  }

  .projects-section-header .projects-section-controls {
    width: 100%;
    justify-content: flex-end;
  }
```

Inside the existing `@media (max-width: 560px)` block, append:

```css
  .featured-hero {
    margin-top: 64px;
  }

  .featured-hero .hero-cta {
    gap: 6px;
  }

  .featured-hero .hero-cta-primary,
  .featured-hero .hero-cta-secondary {
    padding: 10px 12px;
    font-size: 0.78rem;
  }

  .world-header {
    padding: 12px 16px;
  }

  .world-header .site-nav {
    gap: 12px;
  }

  .world-shell[data-mode="grid"] .world-rotator {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .projects-section-header h2 {
    font-size: 1.1rem;
  }
```

- [ ] **Step 2: Verify mobile**

Open DevTools device emulation at `iPhone 12 Pro` (390×844). Expected:
- Header is slim with a tighter horizontal padding.
- Hero is still 16:9 (now smaller).
- Hero CTAs wrap if needed.
- Projects-section-header stacks: label left, controls below right-aligned.
- Grid mode shows cards in a single column.
- Detail modal meta strip is 2x2.

Verify at `iPad` (768×1024). Expected: 2-column grid still applies; controls right-aligned in the projects header.

- [ ] **Step 3: Commit**

```
git add src/styles/portfolio.css
git commit -m "feat(portfolio): responsive adjustments for hero, project header, and grid"
```

---

## Self-Review

After completing all tasks, the engineer should:

1. **Confirm commit history:** `git log --oneline main` should show ~14 new commits, one per task, with clear messages.
2. **End-to-end smoke test at desktop:** open http://localhost:4321/portfolio and walk the entire page once — Hero loads, hero `Case Study →` opens detail with full new layout (hero image, CTAs, meta 4-up, What I Built, gallery 4-up, stats 3-up, stack chips), back button closes, mode tabs switch Grid ↔ Deck ↔ World, every card click opens the right detail.
3. **End-to-end smoke test at mobile (DevTools 390px):** scroll header, hero, projects header (stacked), 1-col grid, footer. Open detail — confirm 16:9 hero, 2x2 meta, 2-col gallery, single-column stats.
4. **Reduced motion:** in DevTools "Rendering" tab enable `prefers-reduced-motion: reduce`. Reload. Animations should be near-instant; entrance still works.

If any of those break, fix the smallest task that owns the affected code and commit that fix.
