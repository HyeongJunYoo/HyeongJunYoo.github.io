# Detail Page Editorial Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the 7 selected editorial-layer improvements from `docs/superpowers/specs/2026-05-10-detail-page-editorial-improvements-design.md` to the project detail page.

**Architecture:** Pure presentation work — same three files as the previous redesign (`[slug].astro`, `portfolio.css`, `projects.ts`). Each task is one self-contained improvement. Most are CSS-only or single-element markup additions; two add inline `<script>` logic (IntersectionObserver + scroll-listener); one updates content data.

**Tech Stack:** Astro 6 static site, TypeScript, plain CSS with custom properties. Dev server already running on port 4321 via `mcp__Claude_Preview__preview_start name="portfolio-dev"` config.

---

## Pre-flight context

**Verify the dev server is running:** `curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/portfolio/project-nemesis` should return `200`. If not, restart with the preview tool.

**Verification page**: http://localhost:4321/portfolio/project-nemesis (3 challenges, longest content). Also exercise `/portfolio/echo-runner` (only 2 challenges — verifies side-nav appears with 2 dots) and `/portfolio/render-lab` (visually check metrics+gradient on `lime` tone — different from project-nemesis `hot`).

**Working directory:** All `git`/`npx` commands assume `/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io` as the repo root. The bash shell may have CWD set to `.claude/worktrees/<...>/`; either `cd` to the repo root or use absolute paths in every command. The format used throughout this plan: `cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && <command>`.

**Browser verification convention:** After each task, use `mcp__Claude_Preview__preview_eval` and `mcp__Claude_Preview__preview_inspect` to confirm DOM/computed style. The page is hidden (preview window unfocused) so visual screenshots time out — DOM/style checks are how we confirm.

---

## File responsibilities

| File | Role |
|------|------|
| `src/pages/portfolio/[slug].astro` | Template restructures: wrap challenge head, add side nav, add IDs, add dividers, add progress bar, add metric helper, register IntersectionObserver + scroll listener. |
| `src/styles/portfolio.css` | All visual rules: challenge head/index/title, side nav, terminal meta, gradient, metric span, divider, progress bar. |
| `src/data/projects.ts` | Wrap metric phrases in `[[…]]` across all 5 projects' challenge bodies. Data only — no schema change. |

No new files are created.

---

## Task list

### Task 1: Massive inline numerals

The challenge index `01`/`02`/`03` moves from a small mono label *above* the title to an inline display-italic numeral *beside* the title.

**Files:**
- Modify: `src/pages/portfolio/[slug].astro` — wrap index + title in `<header class="detail-challenge-head">`
- Modify: `src/styles/portfolio.css` — add `.detail-challenge-head` rule, restyle `.detail-challenge-index`, strip `.detail-challenge-title` bottom-border (now owned by parent header)

- [ ] **Step 1: Locate the challenge `<li>` markup**

In `src/pages/portfolio/[slug].astro` find the section containing the challenge map (after the `<ol class="detail-challenges-list">`). The current markup looks like:

```astro
<li class="detail-challenge">
  <span class="detail-challenge-index">{String(index + 1).padStart(2, "0")}</span>
  <h4 class="detail-challenge-title">{challenge.title}</h4>
  {challenge.image && (
    <img
      class="detail-challenge-image"
      ...
    />
  )}
  <div class="detail-challenge-block">
    ...
```

- [ ] **Step 2: Wrap the index and title in a `<header>`**

Change the first three lines so the index and h4 are wrapped in a header element:

```astro
<li class="detail-challenge">
  <header class="detail-challenge-head">
    <span class="detail-challenge-index">{String(index + 1).padStart(2, "0")}</span>
    <h4 class="detail-challenge-title">{challenge.title}</h4>
  </header>
  {challenge.image && (
    <img
      class="detail-challenge-image"
      ...
```

The image conditional and the rest of the `<li>` stay unchanged.

- [ ] **Step 3: Update `.detail-challenge-index` style**

In `src/styles/portfolio.css`, find `.detail-challenge-index {` (a small mono rule). Replace the entire rule with:

```css
.detail-challenge-index {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--tone);
  line-height: 1;
  margin: 0;
}
```

(Removes the previous `letter-spacing: 0.1em` and small-mono treatment; keeps font-display = Bricolage. The `margin: 0` overrides the previous `margin-bottom: 12px` from Task 7 of the prior redesign.)

- [ ] **Step 4: Update `.detail-challenge-title` style**

Find `.detail-challenge-title {`. The current rule sets `margin: 0 0 36px 0; padding-bottom: 18px; border-bottom: 1px solid …;`. Replace those three properties so the title no longer owns the bottom-divider — the parent header will:

```css
.detail-challenge-title {
  margin: 0;
  padding: 0;
  border: none;
  color: var(--ink);
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.005em;
  line-height: 1.25;
  overflow-wrap: anywhere;
}
```

(Other properties unchanged. Just the three layout properties — margin, padding, border — get reset.)

- [ ] **Step 5: Add `.detail-challenge-head` rule**

Add this new rule right before `.detail-challenge-title` (or right after `.detail-challenge-index` — adjacency matters less since these all live in the same `/* === Challenges & Solutions === */` block):

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
```

- [ ] **Step 6: Update mobile rule**

There's an existing `@media (max-width: 720px)` block with a `.detail-challenge-title` mobile override (`font-size: 1.15rem; margin-bottom: 24px; padding-bottom: 14px`). Since the title no longer owns margin/padding-bottom, remove the margin-bottom and padding-bottom from the mobile override too:

```css
@media (max-width: 720px) {
  .detail-challenge { padding: 22px; }

  .detail-challenge-title {
    font-size: 1.15rem;
  }
  ...
}
```

(Drop the `margin-bottom: 24px; padding-bottom: 14px;` lines that were inside the mobile `.detail-challenge-title` rule.)

If the mobile spacing on the new `.detail-challenge-head` needs tightening, add a mobile rule:

```css
  .detail-challenge-head {
    margin-bottom: 24px;
    padding-bottom: 14px;
  }
```

(Inside the same `@media (max-width: 720px)` block.)

- [ ] **Step 7: Verify**

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
```

```javascript
// mcp__Claude_Preview__preview_inspect
selector: '.detail-challenge-head'
styles: ['display', 'align-items', 'gap', 'margin-bottom', 'padding-bottom']
```

Expected:
- `display: flex`
- `align-items: baseline`
- `gap: 14px`
- `margin-bottom: 36px`
- `padding-bottom: 18px`

```javascript
// mcp__Claude_Preview__preview_inspect
selector: '.detail-challenge-index'
styles: ['font-style', 'font-size', 'color', 'font-weight']
```

Expected:
- `font-style: italic`
- `font-size: 25.6px` (1.6rem × 16)
- `color: rgb(255, 60, 121)` (hot tone for project-nemesis)
- `font-weight: 700`

Confirm DOM order:

```javascript
// mcp__Claude_Preview__preview_eval
const head = document.querySelector('.detail-challenge-head');
[...head.children].map(el => el.tagName + '.' + el.className.split(' ')[0]);
```

Expected: `["SPAN.detail-challenge-index", "H4.detail-challenge-title"]`

- [ ] **Step 8: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/pages/portfolio/\[slug\].astro src/styles/portfolio.css && git commit -m "style(detail): inline display-italic numerals beside challenge title

Challenge index 01/02/03 moves from a 0.7rem mono label above the
title to a 1.6rem Bricolage italic numeral inline with the title.
The bottom divider (was on the title) moves to a new
.detail-challenge-head wrapper so index + title share visual
ownership. align-items: baseline keeps the italic numeral aligned
to the title's text baseline."
```

---

### Task 2: Tone-tinted challenge gradient (per-index intensity)

Each challenge card gets a diagonal gradient washed with the project's tone color, intensity rising by index (8% / 12% / 16%).

**Files:**
- Modify: `src/pages/portfolio/[slug].astro` — add `style={…}` to the `<li>` for `--challenge-tint`
- Modify: `src/styles/portfolio.css` — replace solid `#1a1a1a` background with a gradient

- [ ] **Step 1: Add inline tint style on the `<li>`**

In `src/pages/portfolio/[slug].astro`, find the `<li class="detail-challenge">` opening. After Task 1 it looks like:

```astro
<li class="detail-challenge">
  <header class="detail-challenge-head">
    ...
```

Add an inline `style` attribute that exposes the per-index strength:

```astro
<li
  class="detail-challenge"
  style={`--challenge-tint: ${[8, 12, 16][Math.min(index, 2)]}%;`}
>
  <header class="detail-challenge-head">
    ...
```

The `Math.min(index, 2)` clamps the lookup so a 4th challenge (rare) reuses the 16% strength.

- [ ] **Step 2: Update `.detail-challenge` background**

In `src/styles/portfolio.css`, find the `.detail-challenge` rule (the standalone one, not `.detail-challenge-*`). Currently it has `background: #1a1a1a;`. Replace that one line with:

```css
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--tone) var(--challenge-tint, 8%), #1a1a1a) 0%,
    #1a1a1a 70%
  );
```

The full updated rule looks like:

```css
.detail-challenge {
  display: grid;
  gap: 0;
  padding: 32px;
  border: 1px solid rgba(244, 241, 232, 0.12);
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--tone) var(--challenge-tint, 8%), #1a1a1a) 0%,
    #1a1a1a 70%
  );
}
```

The `--challenge-tint, 8%` fallback handles the rare case where no inline style is present.

- [ ] **Step 3: Verify per-challenge tint differs**

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
```

```javascript
// mcp__Claude_Preview__preview_eval
[...document.querySelectorAll('.detail-challenge')].map((li, i) => ({
  index: i,
  inlineTint: li.style.getPropertyValue('--challenge-tint'),
  bgImage: getComputedStyle(li).backgroundImage.substring(0, 80)
}));
```

Expected:
- index 0: `--challenge-tint: 8%`
- index 1: `--challenge-tint: 12%`
- index 2: `--challenge-tint: 16%`
- All three `bgImage` values start with `linear-gradient(135deg, color-mix(in srgb, ...`

- [ ] **Step 4: Verify per-project tone**

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/render-lab';
```

```javascript
// mcp__Claude_Preview__preview_eval
const li = document.querySelector('.detail-challenge');
const tone = getComputedStyle(li.closest('[data-tone]') || document.body).getPropertyValue('--tone');
({ projectTone: tone.trim() });
```

Expected: `--tone` resolves to `var(--lime)` or its hex `#78ff8b` (whichever the cascade returns) — the gradient on render-lab uses lime, not hot.

- [ ] **Step 5: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/pages/portfolio/\[slug\].astro src/styles/portfolio.css && git commit -m "style(detail): tone-tinted challenge cards with per-index intensity

Each challenge card now carries a 135deg linear-gradient washed with
the project's own tone color. Strength scales with the challenge
index: 8% (01) → 12% (02) → 16% (03). The visual effect: as the
case study deepens, the project's color saturates more. Maintains
per-project identity instead of cycling through different colors."
```

---

### Task 3: Side sticky chapter nav

Right-rail vertical nav listing all challenges, with an `IntersectionObserver` highlighting whichever challenge is in viewport.

**Files:**
- Modify: `src/pages/portfolio/[slug].astro` — add `id` to each `<li>`, add `<nav class="detail-challenge-nav">` after the `<ol>`, add `IntersectionObserver` setup in inline script
- Modify: `src/styles/portfolio.css` — add `.detail-challenge-nav` rules + mobile hide

- [ ] **Step 1: Add `id` to each challenge `<li>`**

In `src/pages/portfolio/[slug].astro`, the `<li class="detail-challenge" style={…}>` after Tasks 1–2. Add an `id`:

```astro
<li
  class="detail-challenge"
  id={`challenge-${index + 1}`}
  style={`--challenge-tint: ${[8, 12, 16][Math.min(index, 2)]}%;`}
>
```

- [ ] **Step 2: Add the side nav markup**

Find the closing `</ol>` of `.detail-challenges-list`. Right after it (still inside `<section class="detail-challenges">`), add the nav:

```astro
              </ol>
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
            </section>
```

(The `length > 1` guard ensures projects with a single challenge skip the nav.)

- [ ] **Step 3: Add CSS rules**

In `src/styles/portfolio.css`, add a new block at the end of the `/* === Challenges & Solutions === */` section (or right after `.detail-challenge-image`):

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
  padding: 0;
  margin: 0;
}

.detail-challenge-nav a {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(244, 241, 232, 0.4);
  font-family: var(--font-mono);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-decoration: none;
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

@media (max-width: 1279px) {
  .detail-challenge-nav { display: none; }
}
```

- [ ] **Step 4: Add the IntersectionObserver in inline script**

In `src/pages/portfolio/[slug].astro`, find the existing `<script is:inline>` block at the bottom of the page (it currently contains the `pointermove` cursor handler). Add a new IIFE inside the existing `<script is:inline>` tag (right before `</script>`):

```js
    (() => {
      const challenges = document.querySelectorAll('.detail-challenge[id]');
      const navLinks = document.querySelectorAll('.detail-challenge-nav a');
      if (challenges.length === 0 || navLinks.length === 0) return;
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
    })();
```

The `rootMargin: -40% 0px -40% 0px` constrains "in view" to a 20% horizontal band in the middle of the viewport so only one challenge is active at a time.

- [ ] **Step 5: Verify wide-viewport rendering**

```javascript
// mcp__Claude_Preview__preview_resize
width: 1920
height: 1080
```

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
```

```javascript
// mcp__Claude_Preview__preview_eval
const nav = document.querySelector('.detail-challenge-nav');
({
  exists: !!nav,
  displayed: nav ? getComputedStyle(nav).display : null,
  position: nav ? getComputedStyle(nav).position : null,
  rightOffset: nav ? getComputedStyle(nav).right : null,
  childCount: nav ? nav.children.length : 0,
  childTexts: nav ? [...nav.querySelectorAll('a')].map(a => a.textContent.trim()) : []
});
```

Expected:
- `exists: true`
- `displayed: "flex"`
- `position: "fixed"`
- `rightOffset: "32px"`
- `childCount: 3` (project-nemesis has 3 challenges)
- `childTexts: ["01", "02", "03"]`

- [ ] **Step 6: Verify mobile hide**

```javascript
// mcp__Claude_Preview__preview_resize
preset: "mobile"
```

```javascript
// mcp__Claude_Preview__preview_eval
const nav = document.querySelector('.detail-challenge-nav');
nav ? getComputedStyle(nav).display : 'no nav';
```

Expected: `"none"`.

```javascript
// mcp__Claude_Preview__preview_resize
width: 1920
height: 1080
```

(reset)

- [ ] **Step 7: Verify single-challenge project skips nav**

If any project has only one challenge, navigate to it and confirm `nav` doesn't exist. (As of writing, all 5 projects have ≥2 challenges, so this is a forward-looking check; skip if no such project exists.)

- [ ] **Step 8: Verify IntersectionObserver active state**

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
```

After the page settles, scroll to challenge 02:

```javascript
// mcp__Claude_Preview__preview_eval
const ch2 = document.getElementById('challenge-2');
ch2.scrollIntoView({ behavior: 'instant', block: 'center' });
```

Wait a moment, then check active state:

```javascript
// mcp__Claude_Preview__preview_eval
new Promise(r => setTimeout(() => {
  const active = document.querySelector('.detail-challenge-nav a.is-active');
  r({ activeTarget: active?.dataset.challengeTarget });
}, 200));
```

Expected: `activeTarget: "2"`.

- [ ] **Step 9: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/pages/portfolio/\[slug\].astro src/styles/portfolio.css && git commit -m "feat(detail): side sticky chapter nav with IntersectionObserver

Right-rail vertical nav lists all challenges of the current project
with current-in-view dot highlighting. Hidden below 1280px viewport
so it doesn't overlap content on tablet/mobile. Hidden when project
has only 1 challenge. IntersectionObserver triggers active state
when a challenge is in the middle 20% band of the viewport — only
one card active at a time."
```

---

### Task 4: Terminal-style meta block

The 4-up `<dl class="detail-meta">` keeps its semantic markup but visually renders as `$ project --info` CLI output.

**Files:**
- Modify: `src/styles/portfolio.css` — completely rewrite `.detail-meta` and its children

- [ ] **Step 1: Locate the existing `.detail-meta` rules**

In `src/styles/portfolio.css`, the current rules are (around line ~916-955 before this task; line numbers shifted by Tasks 1-3):

```css
.detail-meta {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin: 0;
  border-top: 1px solid rgba(244, 241, 232, 0.16);
  border-bottom: 1px solid rgba(244, 241, 232, 0.16);
}

.detail-meta div {
  display: grid;
  gap: 6px;
  padding: 14px 0;
}

.detail-meta div + div {
  border-left: 1px solid rgba(244, 241, 232, 0.16);
  padding-left: 18px;
}

.detail-meta dt,
.detail-meta dd {
  margin: 0;
}

.detail-meta dt {
  color: var(--tone);
  font-size: 0.78rem;
  font-weight: 950;
  line-height: 1;
  text-transform: uppercase;
}

.detail-meta dd {
  color: var(--ink);
  font-size: 0.94rem;
  font-weight: 780;
  line-height: 1.35;
  overflow-wrap: anywhere;
}
```

- [ ] **Step 2: Replace with terminal-style rules**

Replace the entire block above with:

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
  grid-template-columns: 130px 1fr;
  gap: 0;
  padding: 2px 0;
  border: none;
}

.detail-meta div + div {
  border-left: none;
  padding-left: 0;
}

.detail-meta dt,
.detail-meta dd {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.4;
}

.detail-meta dt {
  color: var(--tone);
  font-weight: 700;
  text-transform: lowercase;
}

.detail-meta dt::before {
  content: "  --";
  color: rgba(244, 241, 232, 0.5);
}

.detail-meta dd {
  color: var(--ink);
  font-weight: 700;
}
```

The shared font-family rule that previously applied `font-family: var(--font-mono)` to `.detail-meta dt, .detail-meta dd` (the selector list at the top of the file) was kept; this rule overrides individually too for clarity.

- [ ] **Step 3: Verify CLI render**

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
```

```javascript
// mcp__Claude_Preview__preview_inspect
selector: '.detail-meta'
styles: ['display', 'font-family', 'background-color', 'padding']
```

Expected:
- `display: "block"`
- `font-family: "JetBrains Mono", ui-monospace, ...`
- `background-color: rgba(0, 0, 0, 0.32)`
- `padding: "14px 18px 12px"`

```javascript
// mcp__Claude_Preview__preview_eval
const meta = document.querySelector('.detail-meta');
const before = window.getComputedStyle(meta, '::before');
({
  pseudoContent: before.content,
  pseudoColor: before.color
});
```

Expected:
- `pseudoContent: "\"$ project --info\""` (with escape quotes)
- `pseudoColor: "rgb(255, 60, 121)"` (hot tone)

```javascript
// mcp__Claude_Preview__preview_eval
[...document.querySelectorAll('.detail-meta dt')].map(dt => dt.textContent);
```

Expected: `["Engine", "Platform", "Role", "Team / Period"]` (text content unchanged; CSS lowercases visually).

- [ ] **Step 4: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/styles/portfolio.css && git commit -m "style(detail): terminal-style meta block

The 4-up dl keeps its semantic markup but renders as a CLI command
output: '\$ project --info' header + '--engine value' rows in mono
font on a dark panel. Pure CSS rewrite — no markup or data change.
text-transform: lowercase handles the existing capitalized dt text."
```

---

### Task 5: Inline metric markup

Numbers/units inside challenge body text get visual highlight via explicit `[[…]]` markup syntax. Adds a `renderMetrics` helper to the template, wraps content data with `[[]]` markers, and adds a `.metric` CSS rule.

**Files:**
- Modify: `src/pages/portfolio/[slug].astro` — add `renderMetrics` helper to frontmatter; update body `<p>` rendering for problem/solution/outcome
- Modify: `src/styles/portfolio.css` — add `.detail-challenge-block .metric` rule
- Modify: `src/data/projects.ts` — wrap metric phrases in `[[…]]` across all challenges

- [ ] **Step 1: Add `renderMetrics` helper to frontmatter**

In `src/pages/portfolio/[slug].astro`, the frontmatter currently includes the `sourceHref` const and `teamPeriod`. Add the helper right above the closing `---`:

```ts
type MetricPart = { type: "metric" | "text"; value: string };
const renderMetrics = (text: string): MetricPart[] =>
  text.split(/(\[\[.+?\]\])/g).map((part) => {
    const match = part.match(/^\[\[(.+)\]\]$/);
    return match
      ? { type: "metric" as const, value: match[1] }
      : { type: "text" as const, value: part };
  });
```

The split regex captures `[[…]]` substrings as separate array entries. The `.+?` is non-greedy so adjacent markers don't merge.

- [ ] **Step 2: Update body paragraph rendering**

Find the challenge body paragraphs in the template (after Task 1 they're inside `.detail-challenge-block`):

```astro
<div class="detail-challenge-block">
  <span class="detail-challenge-label">문제 원인</span>
  <p>{challenge.problem}</p>
</div>
<div class="detail-challenge-block">
  <span class="detail-challenge-label">해결 과정</span>
  <p>{challenge.solution}</p>
</div>
{challenge.outcome && (
  <div class="detail-challenge-block">
    <span class="detail-challenge-label">결과</span>
    <p>{challenge.outcome}</p>
  </div>
)}
```

Replace each `<p>{challenge.X}</p>` with a mapped render:

```astro
<div class="detail-challenge-block">
  <span class="detail-challenge-label">문제 원인</span>
  <p>
    {renderMetrics(challenge.problem).map((part) =>
      part.type === "metric"
        ? <span class="metric">{part.value}</span>
        : part.value
    )}
  </p>
</div>
<div class="detail-challenge-block">
  <span class="detail-challenge-label">해결 과정</span>
  <p>
    {renderMetrics(challenge.solution).map((part) =>
      part.type === "metric"
        ? <span class="metric">{part.value}</span>
        : part.value
    )}
  </p>
</div>
{challenge.outcome && (
  <div class="detail-challenge-block">
    <span class="detail-challenge-label">결과</span>
    <p>
      {renderMetrics(challenge.outcome).map((part) =>
        part.type === "metric"
          ? <span class="metric">{part.value}</span>
          : part.value
      )}
    </p>
  </div>
)}
```

Astro renders an array of strings + JSX-like elements as the children of `<p>`. Strings are kept as-is; metric parts become `<span>`s.

- [ ] **Step 3: Add `.metric` CSS**

In `src/styles/portfolio.css`, find `.detail-challenge-block p {` (around the challenge styles section). Right after it, add:

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

`font-size: 0.95em` (relative, not absolute) keeps the metric height close to surrounding Pretendard line-height.

- [ ] **Step 4: Wrap metrics in projects.ts — project-nemesis**

In `src/data/projects.ts`, find the `project-nemesis` entry's `challenges` array. For each `problem`, `solution`, `outcome` string, wrap the metric phrases with `[[…]]`. Examples (paste these as-is):

For challenge 01 (`30 tickrate hit detection 1프레임 흔들림`):

```ts
problem: "초기 빌드는 모든 hit 판정을 server-authoritative로 처리했습니다. [[30 tickrate]] 환경에서 latency가 [[80ms]]를 넘으면 클라이언트가 보는 적의 위치와 서버가 검증하는 위치 사이에 [[1-2 프레임]] 어긋남이 발생해, '분명히 맞췄는데 데미지 안 들어감' 신고가 베타 첫 주에 [[130건+]] 들어왔습니다. Discord 커뮤니티 분위기가 빠르게 부정적으로 흘러 즉시 대응이 필요한 상황이었습니다.",

solution: "Valve의 lag compensation 패턴을 참고해 client-side prediction + server-side rewind 시스템을 구축했습니다. 각 클라이언트는 자기 입력을 즉시 시뮬레이션하면서 서버에 input을 보내고, 서버는 해당 input을 받은 시점에 그 클라이언트의 RTT만큼 과거로 모든 적의 위치를 되돌려 hit detection을 수행합니다. Rewind window는 최대 [[200ms]]로 캡, 그 이상의 비정상 latency는 클라이언트 부정으로 간주해 무효화합니다. 클라이언트 측에선 prediction이 서버 결과와 다르면 부드럽게 보정(reconciliation) 처리합니다.",

outcome: "perceived hit latency [[60-80ms → 8-12ms]], 'hit not registered' 신고 [[130건/주 → 4건/주]]"
```

For challenge 02 (`64명 매치 인벤토리 동기화 패킷 폭증`):

```ts
problem: "초기 디자인은 모든 클라이언트가 모든 플레이어의 inventory 변경을 broadcast로 받는 구조였습니다. [[64명 매치]]에서 한 번에 다수가 인벤토리를 열거나 줍기/버리기 액션을 하면 서버 → 클라이언트 업로드가 [[초당 10MB]]를 초과해, 중하위 ISP 사용자가 패킷 드롭과 함께 게임에서 튕기는 현상이 발생했습니다. 빌드 안정성 지표(Steam crash report)에서 'connection lost'가 매치당 [[3-4건]]으로 급증했습니다.",

solution: "두 가지 최적화를 결합했습니다. 첫째, delta replication — inventory 전체 상태가 아니라 변경분만 보내고 sequence number 기반 reliable delivery 채널을 만들었습니다. 둘째, AOI(Area of Interest) 필터링 — 본인 시야 안의 플레이어 inventory만 풀 동기화하고, 시야 밖은 metadata(존재 여부, 클래스만)만 동기화합니다. AOI 갱신 주기는 클라이언트 카메라 frustum 기준 [[200ms]]마다 재계산했습니다.",

outcome: "평균 업로드 트래픽 [[10.4MB/s → 1.6MB/s]] [[(-85%)]], connection lost [[3-4건/매치 → 0.2건/매치]]"
```

For challenge 03 (`Cross-platform input prompt 추상화`):

```ts
problem: "PC 키보드/마우스, Steam Controller, Xbox/PS 컨트롤러까지 지원하면서, 입력 방식이 바뀌면 UI prompt(키 표시)가 즉시 바뀌어야 했습니다. UE5 기본 EnhancedInput 시스템은 device 변경 감지와 prompt 자동 전환을 지원하지 않아, in-game UI에서 'E to interact'와 'X to interact' 같은 표기가 컨트롤러 연결 후에도 키보드 표기로 남는 버그가 있었습니다.",

solution: "InputDeviceObserver subsystem을 만들어 마지막 input event의 device source를 추적하고, UI widget이 binding한 PromptToken에 글로벌 broadcast하는 구조로 만들었습니다. UI 측은 PromptToken을 키 텍스트가 아닌 추상 액션 이름('Interact')으로 받고, observer가 device 변경을 알리면 token 매핑 테이블에서 현재 device 기준 표기를 자동 교체합니다. 추가로 Steam Input API를 통해 사용자가 컨트롤러 prompt 스타일(Xbox/PS/Switch)을 강제 지정할 수 있도록 지원했습니다.",

outcome: "QA 발견 prompt 관련 버그 [[27건 → 0건]], controller hot-swap [[1프레임]] 안에 반영"
```

(Use the exact text above. The phrases NOT wrapped in `[[…]]` are intentional — they're product/library names like "RTT", "AOI", "PromptToken" that aren't measurable metrics.)

- [ ] **Step 5: Wrap metrics for echo-runner**

For `echo-runner` (challenge titles: "오디오 타임라인 ↔ 입력 윈도우 동기화 정확도", "URP shader fit + 모바일 GPU stuttering"):

Challenge 01:
```ts
problem: "Unity의 AudioSource.time은 audio thread와 game thread 사이에서 [[±20ms]] 정도 jitter가 발생해, [[60Hz 게임플레이]] 입력 판정 윈도우([[±33ms]])와 비교했을 때 무시할 수 없는 오차였습니다. 결과적으로 '딱 박자에 맞춰 눌렀는데 perfect 안 됨' 같은 false negative가 트랙당 [[5-10회]]씩 발생해 게임이 부당하게 느껴졌습니다.",

solution: "AudioSettings.dspTime을 기준 시각으로 사용하고, AudioSource.time은 시각 큐 갱신용으로만 사용하도록 분리했습니다. dspTime은 audio engine 내부 시계라 jitter가 [[µs 단위]]로 줄어듭니다. 또한 입력 시각도 frame 시각이 아닌 input event timestamp를 기록해 dsp 시각과 비교하는 구조로 변경했습니다. 트랙 데이터(노트 타이밍)는 ScriptableObject로 BPM과 offset만 가지고, 런타임에 dsp 시각과 비교하는 방식입니다.",

outcome: "input window 판정 오차 [[±20ms → ±2ms]], [[100명 플레이 데이터]] 기준 false negative [[0%]]"
```

Challenge 02:
```ts
problem: "기본 URP lit shader는 셀룰로이드 풍 게임의 외곽선 강조 + 채도 높은 컬러 그레이딩에 맞지 않았습니다. 또 itch.io 빌드를 모바일 브라우저에서도 돌려보고 싶었는데, 일부 안드로이드 GPU(Mali-G52)에서 발견된 stuttering이 frame time [[30ms]]를 넘기는 spike를 만들었습니다.",

solution: "URP custom render feature로 outline pass를 추가하고, 외곽선은 stencil + dilated normal 기반으로 처리했습니다. 컬러 그레이딩은 LUT texture로 분리해 디자이너가 photoshop에서 직접 조정 가능한 워크플로우를 만들었습니다. 모바일은 GPU profiler로 stuttering 원인을 찾았는데, post-process volume이 frame마다 reallocation을 일으키는 게 원인이었습니다. volume profile을 정적 ScriptableObject로 캐시해 spike를 제거했습니다.",

outcome: "프레임 타임 변동 [[30ms → 8ms]], Mali-G52 평균 [[60FPS]] 유지"
```

- [ ] **Step 6: Wrap metrics for rune-tactics**

```ts
// Challenge 01: 48시간 안에 데이터 드리븐 무기 빌더 구현
problem: "기본/공격/효과 3가지 카테고리의 룬을 다양하게 조합하면 [[12개 이상]]의 무기가 나와야 했는데, hard-coded로 짜면 디자이너가 룬 추가할 때마다 프로그래머 작업이 필요했습니다. 잼 환경에서 [[24시간]] 내내 디자이너가 룬을 새로 추가하고 싶어 할 게 뻔했고, 매번 빌드 받아주면 다른 작업이 멈추는 문제.",

solution: "DataAsset 기반 RuneAsset(이름/카테고리/효과 파라미터) + WeaponCombinationRule(룬 카테고리 조합 → 무기 클래스 매핑) 두 가지 자료를 정의했습니다. 런타임에 player가 룬 [[3개]]를 들고 결합 액션을 하면 RuleSet에서 매칭 무기 클래스를 lookup하고 spawn합니다. 새 룬은 디자이너가 ContentBrowser에서 RuneAsset 우클릭 → Create로 직접 추가하고, RuleSet에 ID만 넣으면 끝.",

outcome: "디자이너가 잼 [[24시간 차]]에 룬 [[4종]]을 본인이 직접 추가, 프로그래머 개입 [[0회]]"
```

```ts
// Challenge 02: 절차적 던전 + AI 네비게이션 동시 보장
problem: "런타임에 던전이 매번 다르게 생성되어야 했지만, AI는 NavMesh 기반이라 BuildAtRuntime이 [[30초]] 이상 걸리면 게임 시작 전에 시간 너무 오래 잡혔습니다. 잼 평가 빌드는 빠르게 시작해야 했고, 매번 NavMesh 빌드를 기다리게 할 순 없었습니다.",

solution: "사전 베이크된 청크([[15x15m unit]])를 [[30개]] 만들고, 청크 단위로 NavMesh를 미리 굽고 child volume으로 묶었습니다. 런타임에는 청크를 랜덤 조합해 placement만 하고, 청크 간 연결 portal에 manual NavLink를 붙여 NavMesh를 새로 굽지 않고도 patrol/chase가 동작합니다. 적 spawn은 청크별 spawn point 메타데이터로 관리.",

outcome: "던전 생성 시간 [[30초+ → 0.4초]], 매 게임 다른 레이아웃"
```

- [ ] **Step 7: Wrap metrics for poly-drift and render-lab**

For `poly-drift` and `render-lab` projects, repeat the same exercise: open each `challenges` array entry, wrap any phrase that's a measurable claim (numbers + units, percentages, time scales, count claims) in `[[…]]`. Don't wrap product names, library names, or non-quantitative statements.

If a challenge has no measurable metrics, leave its body unchanged.

The "metric" definition for this purpose: any phrase the reader could verify against external evidence (a number with a unit, a duration, a percentage, a count). NOT: project goals, design rationale, technology names.

- [ ] **Step 8: Verify metric rendering**

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
```

```javascript
// mcp__Claude_Preview__preview_eval
const metrics = [...document.querySelectorAll('.detail-challenge-block .metric')];
({
  count: metrics.length,
  firstFew: metrics.slice(0, 5).map(m => m.textContent),
  noStrayMarkers: !document.body.textContent.includes('[[')
});
```

Expected:
- `count: ≥10` (project-nemesis has many wrapped metrics)
- `firstFew` contains things like `["30 tickrate", "80ms", "1-2 프레임", "130건+", "200ms"]`
- `noStrayMarkers: true` (no `[[` left in rendered text — confirms the helper transformed all of them)

- [ ] **Step 9: Verify visual styling**

```javascript
// mcp__Claude_Preview__preview_inspect
selector: '.detail-challenge-block .metric'
styles: ['font-family', 'color', 'background-color', 'padding', 'font-weight']
```

Expected:
- `font-family: "JetBrains Mono", ...`
- `color: rgb(255, 60, 121)` (hot tone)
- `background-color`: a tone-tinted color (color-mix output, not transparent)
- `padding: 0px 5px`
- `font-weight: 700`

- [ ] **Step 10: Verify TypeScript still compiles**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && npx astro check 2>&1 | tail -5
```

Expected: `0 errors`.

- [ ] **Step 11: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/pages/portfolio/\[slug\].astro src/styles/portfolio.css src/data/projects.ts && git commit -m "feat(detail): inline metric highlight via [[...]] markup

Numbers/units inside challenge body text are now wrapped in [[...]]
markers in projects.ts. The detail template's renderMetrics helper
parses each paragraph and substitutes markers with <span class='metric'>
elements styled in mono+tone color. Explicit markup over regex auto-
detect prevents false positives. ~30 metric phrases marked across the
5 projects."
```

---

### Task 6: Decorative section dividers

Three diamonds in tone color between major sections (intro-card → narrative, narrative → challenges).

**Files:**
- Modify: `src/pages/portfolio/[slug].astro` — add 2 `<div class="detail-divider">` ornaments
- Modify: `src/styles/portfolio.css` — add `.detail-divider` rule

- [ ] **Step 1: Add divider markup**

In `src/pages/portfolio/[slug].astro`, find the structure inside `<article class="detail-content">` (after Task 5 completion). The current order is:

```astro
<article class="detail-content">
  <div class="detail-intro-card">…</div>
  <section class="detail-narrative">…</section>
  <section class="detail-challenges">…</section>
</article>
```

Insert dividers between each pair:

```astro
<article class="detail-content">
  <div class="detail-intro-card">…</div>
  <div class="detail-divider" aria-hidden="true">◆ ◆ ◆</div>
  <section class="detail-narrative">…</section>
  <div class="detail-divider" aria-hidden="true">◆ ◆ ◆</div>
  <section class="detail-challenges">…</section>
</article>
```

- [ ] **Step 2: Add CSS rule**

In `src/styles/portfolio.css`, add anywhere in the detail section (e.g., right after `.detail-narrative` rule):

```css
.detail-divider {
  text-align: center;
  color: var(--tone);
  font-size: 0.9rem;
  letter-spacing: 1.4em;
  padding-left: 1.4em;
  margin: 4px 0;
  opacity: 0.55;
  user-select: none;
}
```

The `padding-left: 1.4em` compensates for the trailing `letter-spacing` pulling the visual center off (since letter-spacing applies to the right of each glyph including the last).

- [ ] **Step 3: Verify**

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
```

```javascript
// mcp__Claude_Preview__preview_eval
const dividers = document.querySelectorAll('.detail-divider');
({
  count: dividers.length,
  text: [...dividers].map(d => d.textContent),
  firstColor: dividers[0] ? getComputedStyle(dividers[0]).color : null
});
```

Expected:
- `count: 2`
- `text: ["◆ ◆ ◆", "◆ ◆ ◆"]`
- `firstColor: "rgb(255, 60, 121)"` (hot tone for project-nemesis)

Verify DOM order:

```javascript
// mcp__Claude_Preview__preview_eval
const article = document.querySelector('article.detail-content');
[...article.children].map(el => el.tagName + '.' + el.className.split(' ')[0]);
```

Expected:
```
[
  "DIV.detail-intro-card",
  "DIV.detail-divider",
  "SECTION.detail-narrative",
  "DIV.detail-divider",
  "SECTION.detail-challenges"
]
```

- [ ] **Step 4: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/pages/portfolio/\[slug\].astro src/styles/portfolio.css && git commit -m "style(detail): decorative ◆ ◆ ◆ dividers between sections

Two tone-colored diamond ornaments break up the card-card-card visual
rhythm: between intro and narrative, between narrative and challenges.
55% opacity + 1.4em letter-spacing keeps them understated. aria-hidden
on the divs since they're purely visual."
```

---

### Task 7: Reading progress bar

A 3px fixed bar at the top of the viewport that fills with the project's tone color as the user scrolls.

**Files:**
- Modify: `src/pages/portfolio/[slug].astro` — add `<div class="detail-progress">` markup; add scroll listener in inline script
- Modify: `src/styles/portfolio.css` — add `.detail-progress` + `.detail-progress-fill` rules

- [ ] **Step 1: Add progress bar markup**

In `src/pages/portfolio/[slug].astro`, find `<div class="world-shell">` (the outermost wrapper). Right after that opening tag, add:

```astro
<div class="world-shell" data-world-shell data-mode="detail" data-active-tone={project.tone}>
  <div class="detail-progress" aria-hidden="true">
    <div class="detail-progress-fill"></div>
  </div>
  <div class="world-grain" aria-hidden="true"></div>
  ...
```

(Insert the progress div as the very first child of `.world-shell`, right after the opening tag and before `.world-grain`.)

- [ ] **Step 2: Add CSS rules**

In `src/styles/portfolio.css`, add these rules anywhere in the detail-page section (e.g., near `.detail-content`):

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

- [ ] **Step 3: Add scroll listener in inline script**

In `src/pages/portfolio/[slug].astro`, find the existing `<script is:inline>` block at the bottom (it now contains the cursor pointermove + Task 3's IntersectionObserver IIFE). Add another IIFE inside the same `<script>` tag, right before `</script>`:

```js
    (() => {
      const progressFill = document.querySelector('.detail-progress-fill');
      if (!progressFill) return;
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
    })();
```

`requestAnimationFrame` throttles updates to display refresh rate; passive listener avoids blocking the scroll itself.

- [ ] **Step 4: Verify markup + initial state**

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
```

```javascript
// mcp__Claude_Preview__preview_eval
const bar = document.querySelector('.detail-progress');
const fill = document.querySelector('.detail-progress-fill');
({
  barExists: !!bar,
  barPosition: bar ? getComputedStyle(bar).position : null,
  barTop: bar ? getComputedStyle(bar).top : null,
  fillWidth: fill ? fill.style.width : null,
  fillBg: fill ? getComputedStyle(fill).backgroundColor : null
});
```

Expected:
- `barExists: true`
- `barPosition: "fixed"`
- `barTop: "0px"`
- `fillWidth: "0%"` (initial — page just loaded, scrollY=0)
- `fillBg: "rgb(255, 60, 121)"` (hot tone)

- [ ] **Step 5: Verify scroll updates the fill**

```javascript
// mcp__Claude_Preview__preview_eval
window.scrollTo({ top: window.scrollY + 800, behavior: 'instant' });
await new Promise(r => setTimeout(r, 100));
({
  scrollY: window.scrollY,
  fillWidth: document.querySelector('.detail-progress-fill').style.width
});
```

Expected: `fillWidth` is some percentage > "0%" but < "100%" (around `35-65%` depending on page length).

- [ ] **Step 6: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/pages/portfolio/\[slug\].astro src/styles/portfolio.css && git commit -m "feat(detail): top reading-progress bar

3px fixed bar at viewport top fills with the project's tone color as
the user scrolls. requestAnimationFrame throttles updates;
passive listener avoids blocking the scroll. Fallback width 0%
on initial load. The bar is inside .world-shell so it appears only
on detail pages, not on the portfolio index."
```

---

## Self-review (run before declaring complete)

Verify against the spec:

- [ ] **Spec proposal #1 (massive numerals inline):** Task 1 covers it. ✓
- [ ] **Spec proposal #2 (side sticky chapter nav):** Task 3 covers it. ✓
- [ ] **Spec proposal #3 (terminal meta block):** Task 4 covers it. ✓
- [ ] **Spec proposal #4 (tone-tinted gradient per-index):** Task 2 covers it. ✓
- [ ] **Spec proposal #5 (inline metric highlight):** Task 5 covers it. ✓
- [ ] **Spec proposal #6 (decorative dividers):** Task 6 covers it. ✓
- [ ] **Spec proposal #7 (reading progress bar):** Task 7 covers it. ✓

Final integration check after all 7 tasks land:

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
```

```javascript
// mcp__Claude_Preview__preview_eval
({
  // Task 1
  challengeHead: !!document.querySelector('.detail-challenge-head'),
  // Task 2
  challengeTint: document.querySelector('.detail-challenge')?.style.getPropertyValue('--challenge-tint'),
  // Task 3
  sideNav: document.querySelectorAll('.detail-challenge-nav a').length,
  // Task 4
  metaIsTerminal: getComputedStyle(document.querySelector('.detail-meta'))?.display === 'block',
  // Task 5
  metricsExist: document.querySelectorAll('.detail-challenge-block .metric').length,
  // Task 6
  dividers: document.querySelectorAll('.detail-divider').length,
  // Task 7
  progressBar: !!document.querySelector('.detail-progress-fill')
});
```

Expected:
- `challengeHead: true`
- `challengeTint: "8%"` (first challenge)
- `sideNav: 3` (project-nemesis has 3 challenges)
- `metaIsTerminal: true`
- `metricsExist: ≥10`
- `dividers: 2`
- `progressBar: true`

Build verification:

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && npm run build 2>&1 | tail -5
```

Expected: clean build, all 5 project detail pages generated.