# Detail Page — Editorial Layer Improvements

**Date:** 2026-05-10
**Status:** Design approved, ready to plan
**Affects:** `src/pages/portfolio/[slug].astro`, `src/styles/portfolio.css`, `src/data/projects.ts`

## Goal

Add a layer of editorial design treatments on top of the just-completed detail page redesign so the page reads as a curated case study, not a card stack. Seven independent improvements that combine to elevate visual rhythm, scan-ability, and information density without restructuring the underlying information architecture.

## Why now

The previous redesign locked in the *information architecture* of the detail page: hero → intro card (header + meta + stack) → goal card → challenge cards with 문제 원인 / 해결 과정 / 결과. The data model and layout grid are settled.

What's missing is the *editorial layer*: the visual treatments that turn a faithful case-study list into a memorable read. A design review surfaced six weaknesses against five strengths:

- 시각 리듬 단조 (every section has identical card elevation)
- 01/02/03 인덱스가 너무 작아 visual anchor 역할 못함
- Outcome (결과) 가 평범한 단락 — measurable claims 묻힘
- 섹션 헤딩 위계 약함
- 본문 메트릭 강조 없음
- 시각적 surprise 0

This spec addresses 6 of those concerns through 7 targeted changes, plus adds a global reading-progress affordance.

## Scope

### In scope (7 proposals)

1. **Massive numerals (inline)** — Challenge index `01`/`02`/`03` upgraded from 0.7rem mono to 1.6rem Bricolage italic, placed inline with the title on the same line.
2. **Side sticky chapter indicator** — Vertical right-edge nav with current-challenge highlight + click-to-jump, visible at ≥1280px.
3. **Terminal-style meta block** — `$ project --info` header + `--flag value` lines for each meta entry; replaces the visual treatment of the existing 4-up `<dl>` (markup unchanged).
4. **Tone-tinted challenge gradient (per-index intensity)** — Each challenge card carries a subtle linear-gradient using the project's own tone color at varying intensities by index (8% / 12% / 16%). Maintains per-project identity.
5. **Inline metric highlight** — Numbers/units inside challenge body text marked explicitly with `[[…]]` syntax, rendered as mono+tone-color highlights.
6. **Decorative section dividers** — `◆ ◆ ◆` ornaments in tone color between intro-card→narrative and narrative→challenges.
7. **Reading progress bar** — 3px fixed bar at top of viewport, fills with tone color as user scrolls.

### Out of scope

- Adding new fonts. Bricolage italic, Pretendard, JetBrains Mono are already loaded; no Fraunces or other new face.
- Auto-detecting metrics in body text. The explicit `[[…]]` syntax was chosen over regex (Q2 decision) to prevent false positives.
- 3-color cycling for tones across challenges. Per-project tone identity wins over visual variety (Q1 decision).
- Movie-poster H1 overlay on hero image (proposal #9 from review — not selected).
- Pull-quote treatment for Project goal (proposal #5 — not selected).
- Collapsible challenge cards (proposal #6 — not selected).
- Two-column challenge layout at wide viewports (proposal #8 — not selected).

## Detailed design

### 1. Massive numerals (inline)

The challenge index moves from a small mono label *above* the title to an inline editorial numeral *beside* the title.

#### Markup

Wrap the existing index span and title in a header element:

```astro
<header class="detail-challenge-head">
  <span class="detail-challenge-index">{String(index + 1).padStart(2, "0")}</span>
  <h4 class="detail-challenge-title">{challenge.title}</h4>
</header>
```

The index span and h4 are siblings inside a flex container.

#### Style

```css
.detail-challenge-head {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 36px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(244, 241, 232, 0.1);
}

.detail-challenge-index {
  font-family: var(--font-display);  /* Bricolage Grotesque */
  font-style: italic;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--tone);
  line-height: 1;
}

.detail-challenge-title {
  /* unchanged from current — keep 1.35rem, weight 800, etc. — but
     remove its own margin-bottom + padding-bottom + border-bottom
     since the parent header now owns those concerns. */
  margin: 0;
  padding: 0;
  border: none;
}
```

The index sits at the title's baseline. If the title is long enough to wrap, only the title text wraps below; the index stays anchored at the top-left.

The previous title's bottom-border is moved to the parent `.detail-challenge-head` so the visual divider survives the restructure.

### 2. Side sticky chapter indicator

A vertical right-rail nav showing all challenges of the current project, with the in-view one highlighted.

#### Markup

After the `<ol class="detail-challenges-list">`, add a `<nav>` adjacent (still inside `.detail-challenges`):

```astro
{project.challenges.length > 1 && (
  <nav class="detail-challenge-nav" aria-label="Challenge navigation">
    {project.challenges.map((c, i) => (
      <a href={`#challenge-${i + 1}`} data-challenge-target={i + 1}>
        <span class="nav-dot" aria-hidden="true"></span>
        <span class="nav-label">{String(i + 1).padStart(2, "0")}</span>
      </a>
    ))}
  </nav>
)}
```

Each `<li class="detail-challenge">` gets a matching `id={`challenge-${index + 1}`}` for the anchor link.

#### Style

```css
.detail-challenge-nav {
  position: fixed;
  right: 32px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 14px;
  z-index: 10;
}

.detail-challenge-nav a {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(244, 241, 232, 0.4);
  font-family: var(--font-mono);
  font-size: 0.74rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 0.1em;
  transition: color 160ms ease;
}

.detail-challenge-nav a:hover { color: rgba(244, 241, 232, 0.8); }

.detail-challenge-nav .nav-dot {
  width: 8px;
  height: 8px;
  border: 1.5px solid rgba(244, 241, 232, 0.3);
  background: transparent;
  transition: background 160ms ease, border-color 160ms ease;
}

.detail-challenge-nav a.is-active { color: var(--tone); }
.detail-challenge-nav a.is-active .nav-dot {
  background: var(--tone);
  border-color: var(--tone);
}

@media (max-width: 1279px) { .detail-challenge-nav { display: none; } }
```

#### Behavior

`IntersectionObserver` on each `.detail-challenge` `<li>`. When a challenge is at least 50% in viewport, mark the corresponding `<a>` as `.is-active`. The observer is set up in the existing `<script is:inline>` block in `[slug].astro`.

```js
const challenges = document.querySelectorAll('.detail-challenge[id]');
const navLinks = document.querySelectorAll('.detail-challenge-nav a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      const targetNum = id.replace('challenge-', '');
      navLinks.forEach((a) => {
        a.classList.toggle('is-active', a.dataset.challengeTarget === targetNum);
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
challenges.forEach((c) => observer.observe(c));
```

`rootMargin: -40% 0px -40% 0px` constrains "in view" to a 20%-tall band in the middle of the viewport — only one challenge can be active at a time.

### 3. Terminal-style meta block

The 4-up `<dl class="detail-meta">` keeps its semantic markup but visually renders as a CLI command output.

```
$ project --info
  --engine     Unreal 5.3
  --platform   PC / Steam
  --role       Lead Programmer
  --team       5명 · 2025
```

#### Markup

Unchanged. The existing `<dl>` with `<div><dt>…</dt><dd>…</dd></div>` per row stays.

#### Style

```css
.detail-meta {
  display: block;
  background: rgba(0, 0, 0, 0.32);
  border: 1px solid rgba(244, 241, 232, 0.08);
  padding: 14px 18px 12px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  margin: 0;
}

.detail-meta::before {
  content: "$ project --info";
  display: block;
  color: var(--tone);
  font-weight: 700;
  margin-bottom: 8px;
}

.detail-meta div {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 0;
  padding: 2px 0;
  border: none;
}

.detail-meta div + div { padding-left: 0; border-left: none; }

.detail-meta dt {
  color: var(--tone);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: lowercase;
  letter-spacing: 0;
}

.detail-meta dt::before { content: "  --"; color: rgba(244, 241, 232, 0.5); }

.detail-meta dd {
  color: var(--ink);
  font-size: 0.85rem;
  font-weight: 700;
}
```

The `dt::before` adds `--` prefix; `text-transform: lowercase` makes "Engine" render as `engine`. The "Team / Period" label keeps its slash and renders as `--team / period` (visually slightly off but readable in mono).

### 4. Tone-tinted challenge gradient (per-index intensity)

Each challenge card gets a subtle gradient washed with the project's tone color, with intensity rising by index.

#### Per-index intensity table

| Index (0-based) | Strength | Visual effect |
|---|---|---|
| 0 (challenge 01) | 8% | subtle |
| 1 (challenge 02) | 12% | moderate |
| 2 (challenge 03) | 16% | most prominent |
| 3+ | 16% | clamps |

#### Markup

Add an inline style on each `<li>` exposing the strength variable:

```astro
<li
  class="detail-challenge"
  id={`challenge-${index + 1}`}
  style={`--challenge-tint: ${[8, 12, 16][Math.min(index, 2)]}%;`}
>
```

#### Style

Update the existing `.detail-challenge` background:

```css
.detail-challenge {
  /* was: background: #1a1a1a; */
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--tone) var(--challenge-tint, 8%), #1a1a1a) 0%,
    #1a1a1a 70%
  );
  /* other properties unchanged */
}
```

The gradient washes the top-left corner with the tone color, fading to solid `#1a1a1a` at 70% across the diagonal. Stronger intensity for later challenges = visual "the deeper the case study goes, the more the project's color saturates."

### 5. Inline metric highlight

Numbers/units in the challenge body are marked with `[[value]]` syntax in the data file; the template substitutes them with `<span class="metric">value</span>` at render time.

#### Data

Update `src/data/projects.ts` so that body text contains `[[…]]` markers around metrics:

```ts
problem: "초기 빌드는 모든 hit 판정을 server-authoritative로 처리했습니다. [[30 tickrate]] 환경에서 latency가 [[80ms]]를 넘으면 클라이언트가 보는 적의 위치와 서버가 검증하는 위치 사이에 [[1-2 프레임]] 어긋남이 발생해, [[베타 첫 주에 130건+]] 신고가 들어왔습니다."
```

Apply to all `problem`, `solution`, `outcome` fields across all 5 projects.

#### Template helper

In the frontmatter of `src/pages/portfolio/[slug].astro`, add:

```ts
const renderMetrics = (text: string) => {
  return text.split(/(\[\[.+?\]\])/g).map((part) => {
    const match = part.match(/^\[\[(.+)\]\]$/);
    if (match) {
      return { type: 'metric', value: match[1] };
    }
    return { type: 'text', value: part };
  });
};
```

In the template, replace `<p>{challenge.problem}</p>` with:

```astro
<p>
  {renderMetrics(challenge.problem).map((part) =>
    part.type === 'metric'
      ? <span class="metric">{part.value}</span>
      : part.value
  )}
</p>
```

Same for `challenge.solution` and `challenge.outcome`.

#### Style

```css
.detail-challenge-block .metric {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.95em;
  font-weight: 700;
  color: var(--tone);
  background: color-mix(in srgb, var(--tone) 12%, transparent);
  padding: 0 5px;
  margin: 0 1px;
  letter-spacing: 0;
}
```

Note: `font-size: 0.95em` (relative, not absolute) so the metric matches the surrounding body line-height. Without this, mono characters bleed taller than Pretendard and break vertical rhythm.

### 6. Decorative section dividers

Three diamonds in tone color between major sections.

#### Markup

In `[slug].astro`, add `<div class="detail-divider" aria-hidden="true">◆ ◆ ◆</div>` in two places:

```astro
<div class="detail-intro-card">…</div>
<div class="detail-divider" aria-hidden="true">◆ ◆ ◆</div>
<section class="detail-narrative">…</section>
<div class="detail-divider" aria-hidden="true">◆ ◆ ◆</div>
<section class="detail-challenges">…</section>
```

#### Style

```css
.detail-divider {
  text-align: center;
  color: var(--tone);
  font-size: 0.9rem;
  letter-spacing: 1.4em;
  padding-left: 1.4em;     /* compensate for trailing letter-spacing pulling left */
  margin: 4px 0;
  opacity: 0.55;
  user-select: none;
}
```

Two dividers total. Both inherit the project tone via `var(--tone)`.

### 7. Reading progress bar

A 3px fixed bar at the top of the viewport that fills with the project's tone color as the user scrolls the page.

#### Markup

Add at the top of the `<div class="world-shell">` in `[slug].astro`:

```astro
<div class="detail-progress" aria-hidden="true">
  <div class="detail-progress-fill"></div>
</div>
```

#### Style

```css
.detail-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(244, 241, 232, 0.04);
  z-index: 100;
  pointer-events: none;
}

.detail-progress-fill {
  height: 100%;
  background: var(--tone);
  width: 0%;
  transform-origin: left;
}
```

#### Behavior

Add to the existing `<script is:inline>` in `[slug].astro`:

```js
const progressFill = document.querySelector('.detail-progress-fill');
if (progressFill) {
  let raf = 0;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
    progressFill.style.width = `${pct}%`;
    raf = 0;
  };
  window.addEventListener('scroll', () => {
    if (!raf) raf = requestAnimationFrame(update);
  }, { passive: true });
  update();
}
```

`requestAnimationFrame` throttling prevents layout-thrash on rapid scroll. Passive listener so the scroll itself isn't blocked.

## Decisions made during brainstorming

- **Q1 = B over A**: Per-index intensity (8/12/16% gradient strength using the project's own tone) over 3-color cycling (hot/aqua/violet across challenges). Maintains per-project tone identity which is a load-bearing part of the existing visual system.
- **Q2 = A over B**: Explicit `[[…]]` markup over regex auto-detect. Prevents false positives like highlighting "5" in "5명 팀" when the author didn't intend it. ~15 challenge entries × ~3 metric phrases each = ~45 manual marker insertions, one-time content edit.
- **Q3 = A over B/C**: Bricolage italic for the index over JetBrains Mono or Bricolage 800. The italic display number paired with the bold sans title creates an editorial rhythm (italic ↔ roman) without adding a new font dependency.
- **Side nav: position:fixed over position:sticky**: Simpler markup. The trade-off — nav always visible even when scrolled past challenges — is acceptable since the nav is small and unobtrusive at the page edge.
- **Reading progress: JS over CSS scroll-timeline**: Browser support breadth wins. `animation-timeline: scroll()` is Chrome 115+ and Firefox flag-only as of 2026; the JS fallback is ~10 lines and works everywhere.

## Files touched

- `src/pages/portfolio/[slug].astro` — wrap challenge index+title in `<header>`, add side-nav `<nav>`, add 2 dividers, add progress-bar div, add `id` per challenge, add `renderMetrics` helper in frontmatter, update body paragraph rendering to use the helper, add IntersectionObserver + scroll listener in inline script.
- `src/styles/portfolio.css` — `.detail-challenge-head` rule, `.detail-challenge-index` restyle, `.detail-challenge-title` strip-down, `.detail-challenge-nav` rules, `.detail-meta` terminal restyle, `.detail-challenge` gradient background, `.detail-challenge-block .metric` rule, `.detail-divider` rule, `.detail-progress` + `.detail-progress-fill` rules.
- `src/data/projects.ts` — wrap metric phrases in `[[…]]` across all 5 projects' challenge bodies.

## Risks

- **Metric markup data volume.** ~45 manual edits across `problem` / `solution` / `outcome` fields. Mistakes are content-only (an unmatched `[[` ends up rendered literally) so the failure mode is cosmetic, not broken.
- **Side nav overlap on mid-width viewports.** The nav is hidden below 1280px. Above 1280px, the page content is centered with margins; the nav at `right: 32px` should clear content. If a future redesign widens the content area, this could collide.
- **Reading progress bar layout impact.** A 3px fixed bar at top:0 is below most browser chrome. On the home page (which has its own layout), this rule won't apply since the element is only added in `[slug].astro`.
- **Editor wraps of long metric strings.** `[[베타 첫 주에 130건+]]` is a 16-char metric. If the surrounding text and the metric span don't break the same way, lines could feel uneven. Mitigation: keep metric phrases short (≤12 chars where possible).
- **IntersectionObserver and short pages.** A project with only 1 challenge skips the side nav entirely (`length > 1` guard). A project with 2 challenges shows just 2 dots — fine. The observer tolerates any count.
