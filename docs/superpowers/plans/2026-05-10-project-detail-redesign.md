# Project Detail Page Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the eleven-decision visual redesign captured in `docs/superpowers/specs/2026-05-10-project-detail-redesign-design.md` to `src/pages/portfolio/[slug].astro`, `src/data/projects.ts`, and `src/styles/portfolio.css`.

**Architecture:** Pure presentation work — no new modules, no new components, no test framework changes. Every task edits one or two existing files, verifies in the dev server's browser preview, and commits. Each commit leaves the detail page renderable (the cosmetic state may be partly old + partly new mid-sequence, but never broken).

**Tech Stack:** Astro 6 static site, TypeScript, plain CSS with custom properties. No JavaScript framework runtime (the IIFE in `portfolio.astro` is unrelated to the detail page). The dev server runs via the `portfolio-dev` launch config (`npm run dev`, port 4321) — already running per `.claude/launch.json`.

---

## Pre-flight context

**The dev server is already running** at http://localhost:4321 — verify with `curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/portfolio/project-nemesis` (expect `200`). If it isn't, start it with `mcp__Claude_Preview__preview_start name="portfolio-dev"`. Astro hot-module-reloads CSS and template changes automatically — no restart needed between tasks.

**Two viewports to verify each task at:**
- Wide: 1920×1080 (default desktop)
- Narrow: 720×1080 (mobile breakpoint)

The preview tool exposes `mcp__Claude_Preview__preview_resize` for both. Most tasks only need the wide viewport unless the spec calls out a mobile-specific rule.

**The page where every change is visible:** http://localhost:4321/portfolio/project-nemesis (the featured project, longest content). For tone-color verification across projects, also load `/portfolio/echo-runner` (aqua), `/portfolio/rune-tactics` (violet), `/portfolio/poly-drift` (lime), `/portfolio/render-lab` (orange).

**Self-review checkpoint before each commit:** open `mcp__Claude_Preview__preview_inspect` on the affected element with the relevant CSS properties — synthetic check that the rule applied, not just that the page didn't crash.

---

## File responsibilities

| File | Role in this redesign |
|------|----------------------|
| `src/data/projects.ts` | Add one optional field (`image?: string`) to the `ProjectChallenge` type. No other changes. |
| `src/pages/portfolio/[slug].astro` | Restructure the detail-page DOM: header row, label text, render-or-not branches. |
| `src/styles/portfolio.css` | All visual changes — body text, stack chips, challenge card, header row, deletion of stats/gallery rules. |

No new files are created. No existing file is split.

---

## Task list

### Task 1: Add `image?` field to `ProjectChallenge`

**Files:**
- Modify: `src/data/projects.ts:14-19`

- [ ] **Step 1: Open the type and add the optional field**

The current type is:

```ts
export type ProjectChallenge = {
  title: string;
  problem: string;
  solution: string;
  outcome?: string;
};
```

Replace with:

```ts
export type ProjectChallenge = {
  title: string;
  problem: string;
  solution: string;
  outcome?: string;
  /**
   * Optional 16:9 image URL rendered inside the challenge card between
   * the title and the first label. Leave undefined when there's no
   * meaningful screenshot — placeholder/filler images are worse than
   * no image. The detail template handles missing values cleanly.
   */
  image?: string;
};
```

- [ ] **Step 2: Run TypeScript check**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && npx astro check
```

Expected: `0 errors, 0 warnings, 0 hints`. If you see errors, the field syntax is wrong — recheck the comma after `outcome?: string;` and the JSDoc comment block.

- [ ] **Step 3: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/data/projects.ts && git commit -m "$(cat <<'EOF'
feat(projects): add optional image field to ProjectChallenge

Allows each challenge to carry a 16:9 screenshot URL rendered inline
in the detail-page challenge card. Optional so existing data files
need no changes.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Body text readability — white #fff, weight 450, line-height 1.75

**Files:**
- Modify: `src/styles/portfolio.css:906-914` (`.detail-summary`)
- Modify: `src/styles/portfolio.css:974-981` (`.detail-narrative p`)
- Modify: `src/styles/portfolio.css:1063-1070` (`.detail-challenge-block p`)

- [ ] **Step 1: Update `.detail-summary`**

Find the rule starting at line 906. Replace the whole block:

```css
.detail-summary {
  max-width: min(620px, 100%);
  margin: 0;
  color: rgba(244, 241, 232, 0.8);
  font-size: clamp(1rem, 1.6vw, 1.18rem);
  font-weight: 700;
  line-height: 1.6;
  overflow-wrap: anywhere;
}
```

with:

```css
.detail-summary {
  max-width: min(620px, 100%);
  margin: 0;
  color: #ffffff;
  font-family: "Pretendard", "Noto Sans KR", system-ui, sans-serif;
  font-size: 1.05rem;
  font-weight: 450;
  line-height: 1.75;
  overflow-wrap: anywhere;
}
```

(The `.detail-summary` element will be removed in Task 9 — but updating it now keeps the body-text rule consistent across all three selectors and avoids a half-finished CSS state if Task 9 is delayed.)

- [ ] **Step 2: Update `.detail-narrative p`**

Find the rule starting at line 974. Replace:

```css
.detail-narrative p {
  margin: 0;
  color: rgba(244, 241, 232, 0.82);
  font-size: 1rem;
  font-weight: 650;
  line-height: 1.6;
  overflow-wrap: anywhere;
}
```

with:

```css
.detail-narrative p {
  margin: 0;
  color: #ffffff;
  font-family: "Pretendard", "Noto Sans KR", system-ui, sans-serif;
  font-size: 1.05rem;
  font-weight: 450;
  line-height: 1.75;
  overflow-wrap: anywhere;
}
```

- [ ] **Step 3: Update `.detail-challenge-block p`**

Find the rule starting at line 1063. Replace:

```css
.detail-challenge-block p {
  margin: 0;
  color: rgba(244, 241, 232, 0.82);
  font-size: 0.96rem;
  font-weight: 650;
  line-height: 1.6;
  overflow-wrap: anywhere;
}
```

with:

```css
.detail-challenge-block p {
  margin: 0;
  color: #ffffff;
  font-family: "Pretendard", "Noto Sans KR", system-ui, sans-serif;
  font-size: 1.05rem;
  font-weight: 450;
  line-height: 1.75;
  overflow-wrap: anywhere;
}
```

- [ ] **Step 4: Verify in browser**

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
```

Then inspect:

```javascript
// mcp__Claude_Preview__preview_inspect
selector: '.detail-narrative p'
styles: ['color', 'font-family', 'font-size', 'font-weight', 'line-height']
```

Expected:
- `color: rgb(255, 255, 255)`
- `font-family: Pretendard, "Noto Sans KR", system-ui, sans-serif`
- `font-size: 16.8px` (1.05rem at 16px root)
- `font-weight: 450`
- `line-height: 29.4px` (1.75 × 16.8)

- [ ] **Step 5: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/styles/portfolio.css && git commit -m "$(cat <<'EOF'
style(detail): body text readability — white 100%, weight 450, line-height 1.75

Pretendard moved first in the font stack for proper Korean rendering;
weight dropped from 650-700 to 450 for less character bunching;
opacity lifted from 0.82 to 1.0 for full contrast on dark background.
Applied to .detail-summary, .detail-narrative p, .detail-challenge-block p.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Stack chips — tone-color outline

**Files:**
- Modify: `src/styles/portfolio.css:1106-1114` (`.detail-stack span`)

- [ ] **Step 1: Update `.detail-stack span`**

Find the rule starting at line 1106. Replace:

```css
.detail-stack span {
  border: 1px solid rgba(244, 241, 232, 0.16);
  background: rgba(244, 241, 232, 0.07);
  color: rgba(244, 241, 232, 0.82);
  font-size: 0.8rem;
  font-weight: 850;
  line-height: 1;
  padding: 8px 9px;
}
```

with:

```css
.detail-stack span {
  border: 1px solid var(--tone);
  background: color-mix(in srgb, var(--tone) 8%, transparent);
  color: var(--tone);
  font-size: 0.8rem;
  font-weight: 850;
  line-height: 1;
  padding: 8px 9px;
}
```

- [ ] **Step 2: Verify chip color matches project tone across 5 projects**

Load each project and inspect `.detail-stack span` — the computed `color` should be the project's tone hex:

| Project URL | Tone | Expected color |
|-------------|------|----------------|
| `/portfolio/project-nemesis` | hot | `rgb(255, 60, 121)` |
| `/portfolio/echo-runner` | aqua | `rgb(86, 243, 255)` |
| `/portfolio/rune-tactics` | violet | `rgb(157, 104, 255)` |
| `/portfolio/poly-drift` | lime | `rgb(120, 255, 139)` |
| `/portfolio/render-lab` | orange | `rgb(255, 138, 50)` |

For each URL, run:

```javascript
// mcp__Claude_Preview__preview_eval — replace SLUG per project
window.location.href = '/portfolio/SLUG';
```

then:

```javascript
// mcp__Claude_Preview__preview_inspect
selector: '.detail-stack span'
styles: ['color', 'border-color']
```

If color comes back `rgba(244, 241, 232, ...)` instead of a tone color, the `--tone` variable isn't being set on the page — that's a pre-existing infrastructure issue, not a regression from this task. Check that `<main data-tone={project.tone}>` and the `[data-active-tone]` rules in `portfolio.css:101-130` are intact.

- [ ] **Step 3: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/styles/portfolio.css && git commit -m "$(cat <<'EOF'
style(detail): stack chips use project tone color (outline)

Each project's stack tags now use its tone color (hot / aqua / violet /
lime / orange) for border, text, and a translucent background tint.
The page tones the chips automatically via the existing --tone CSS
variable; no per-project HTML changes needed.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Remove `.detail-stats` (FPS / Tracks / Build Size)

**Files:**
- Modify: `src/pages/portfolio/[slug].astro:136-145` (delete the stats render block)
- Modify: `src/styles/portfolio.css:1588-1631` (delete `.detail-stats` rule blocks)

- [ ] **Step 1: Delete the stats render block from the Astro template**

Find lines 136-145 in `src/pages/portfolio/[slug].astro`:

```astro
          {project.stats.length > 0 && (
            <section class="detail-stats">
              {project.stats.map((stat) => (
                <div class="stat">
                  <span class="stat-value">{stat.value}</span>
                  <span class="stat-label">{stat.label}</span>
                </div>
              ))}
            </section>
          )}
```

Delete the entire block (those 10 lines), including the blank line above and below if you can keep the file tidy.

- [ ] **Step 2: Delete `.detail-stats` CSS**

Find and delete the entire `.detail-stats`-prefixed block from line 1588 through 1631 in `src/styles/portfolio.css`. The block is:

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
    /* responsive override */
  }
```

Important: there's also a `.detail-stats` reference in the shared mono-font selector list at line 66-67:

```css
.detail-stats .stat-value,
.detail-stats .stat-label,
```

Delete those two lines too. The remaining selectors in that group continue working.

- [ ] **Step 3: Check the @media block above closes cleanly**

The `.detail-stats` rules end inside (or just before) a `@media (max-width: 560px) { }` block at line 1626. Make sure that media block doesn't have an orphan `.detail-stats { ... }` left over after your delete. If the block becomes empty (`@media (max-width: 560px) { }` with nothing inside), delete the whole `@media` wrapper too.

- [ ] **Step 4: Verify the page renders without stats**

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
```

Confirm no stats cards appear:

```javascript
// mcp__Claude_Preview__preview_eval
document.querySelectorAll('.detail-stats').length
```

Expected: `0`.

Also verify build still works:

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && npx astro check
```

Expected: `0 errors`.

- [ ] **Step 5: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/pages/portfolio/\[slug\].astro src/styles/portfolio.css && git commit -m "$(cat <<'EOF'
refactor(detail): remove stats card section

The FPS / Tracks / Build Size stats row held placeholder values that
wouldn't survive a recruiter's inspection. The Project type still
carries a stats field for now; the detail page just stops rendering it.
Reintroducing per-project stats is a future spec.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Remove bottom `.detail-gallery` (4-up image grid)

**Files:**
- Modify: `src/pages/portfolio/[slug].astro:128-134` (delete the gallery render block)
- Modify: `src/styles/portfolio.css:1632-1665` (delete `.detail-gallery` rule blocks)

- [ ] **Step 1: Delete the gallery render block**

Find lines 128-134 in `src/pages/portfolio/[slug].astro`:

```astro
          {project.gallery.length > 0 && (
            <section class="detail-gallery">
              {project.gallery.map((src) => (
                <img src={src} alt="" loading="lazy" decoding="async" />
              ))}
            </section>
          )}
```

Delete those 7 lines.

- [ ] **Step 2: Delete `.detail-gallery` CSS**

Find and delete from line 1632 through ~1665 in `src/styles/portfolio.css`:

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
```

Including the `@media (max-width: 1100px)` block — that's only there for the gallery rule, so it goes too.

- [ ] **Step 3: Verify**

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
document.querySelectorAll('.detail-gallery').length
```

Expected: `0`.

- [ ] **Step 4: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/pages/portfolio/\[slug\].astro src/styles/portfolio.css && git commit -m "$(cat <<'EOF'
refactor(detail): remove bottom 4-up gallery section

Per-challenge inline photos replace the bottom gallery. The Project
type still carries the gallery field; the detail page no longer
renders it. (Each challenge gets an optional image via the new
ProjectChallenge.image field, added in a prior commit.)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Challenge card visual structure — background, padding, drop left bar

**Files:**
- Modify: `src/styles/portfolio.css:1010-1028` (`.detail-challenge` and `.detail-challenge::before`)

- [ ] **Step 1: Replace the `.detail-challenge` rule and delete the `::before`**

Find the rule starting at line 1010:

```css
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
```

Replace both rules with this single rule:

```css
.detail-challenge {
  display: grid;
  gap: 0;
  padding: 32px;
  border: 1px solid rgba(244, 241, 232, 0.12);
  background: #1a1a1a;
}
```

Notes:
- `position: relative` is dropped because there's no `::before` to absolute-position any more.
- `gap: 0` because spacing between children is now controlled per-rule (title bottom-margin, label top-margin) — uniform `gap` would over-space the title-to-photo and label-to-body distances.
- `padding: 32px` (was `22px 22px 22px 28px`) — equal sides since the left bar is gone.
- Background changes from `rgba(12, 12, 12, 0.4)` (semi-transparent dark on dark) to `#1a1a1a` (solid, lighter than the page's `#0c0c0c` so the card has elevation).

- [ ] **Step 2: Update mobile padding**

Find the existing mobile rule at line 1086:

```css
@media (max-width: 720px) {
  .detail-challenge {
    padding: 18px 18px 18px 22px;
  }
  ...
}
```

Change it to:

```css
@media (max-width: 720px) {
  .detail-challenge {
    padding: 22px;
  }
  ...
}
```

(Equal padding, smaller than 32px to fit narrow viewports. Keep the other rules in this `@media` block as-is — they're addressed by Tasks 7 and 8.)

- [ ] **Step 3: Verify**

```javascript
// mcp__Claude_Preview__preview_inspect
selector: '.detail-challenge'
styles: ['background-color', 'padding', 'border-color', 'position']
```

Expected:
- `background-color: rgb(26, 26, 26)`
- `padding: 32px`
- `border-color: rgba(244, 241, 232, 0.12)`
- `position: static`

Also verify the left bar is gone:

```javascript
// mcp__Claude_Preview__preview_eval
window.getComputedStyle(document.querySelector('.detail-challenge'), '::before').content
```

Expected: `"none"` (no `::before` content).

- [ ] **Step 4: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/styles/portfolio.css && git commit -m "$(cat <<'EOF'
style(detail): challenge card — solid lighter card, no left bar

Background changes from rgba(12,12,12,0.4) to solid #1a1a1a so the
card has clear elevation against the page #0c0c0c. Drops the 3px
tone-colored left ::before so all four sides have equal 32px padding.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Challenge card title — bigger size + bottom border + spacing

**Files:**
- Modify: `src/styles/portfolio.css:1030-1047` (`.detail-challenge-index` and `.detail-challenge-title`)
- Modify: `src/styles/portfolio.css:1086-1094` (mobile rule for `.detail-challenge-title`)

- [ ] **Step 1: Update `.detail-challenge-index` (the `01`/`02`/`03` number)**

Find the rule starting at line 1030:

```css
.detail-challenge-index {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--tone);
}
```

Replace with:

```css
.detail-challenge-index {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--tone);
  margin-bottom: 12px;
}
```

(Adds breathing room between the number and the title.)

- [ ] **Step 2: Update `.detail-challenge-title`**

Find the rule starting at line 1038:

```css
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
```

Replace with:

```css
.detail-challenge-title {
  margin: 0 0 36px 0;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(244, 241, 232, 0.1);
  color: var(--ink);
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.005em;
  line-height: 1.25;
  overflow-wrap: anywhere;
}
```

Changes: fixed size `1.35rem` (was `clamp` from 1.15 to 1.55), `36px` margin-bottom, `18px` padding-bottom with a 1px hairline divider that visually separates the title from the case-study body.

- [ ] **Step 3: Update the mobile title size**

Find the existing rule in the `@media (max-width: 720px)` block (line ~1090):

```css
  .detail-challenge-title {
    font-size: clamp(1rem, 4.4vw, 1.25rem);
  }
```

Replace with:

```css
  .detail-challenge-title {
    font-size: 1.15rem;
    margin-bottom: 24px;
    padding-bottom: 14px;
  }
```

(Slightly smaller title and tighter spacing on mobile so the card doesn't dominate the viewport.)

- [ ] **Step 4: Verify**

```javascript
// mcp__Claude_Preview__preview_inspect
selector: '.detail-challenge-title'
styles: ['font-size', 'margin-bottom', 'padding-bottom', 'border-bottom-style']
```

Expected (at 1920px viewport):
- `font-size: 21.6px` (1.35rem × 16)
- `margin-bottom: 36px`
- `padding-bottom: 18px`
- `border-bottom-style: solid`

- [ ] **Step 5: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/styles/portfolio.css && git commit -m "$(cat <<'EOF'
style(detail): challenge title — bigger, bottom-bordered, more breathing room

Title moves from clamp(1.15-1.55rem) to a fixed 1.35rem and gains an
18px-padding bottom hairline. The 36px margin-bottom separates the
title from the case-study body so the index/title/divider reads as a
coherent header block.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: Challenge card labels and section spacing

**Files:**
- Modify: `src/styles/portfolio.css:1049-1070` (`.detail-challenge-block`, `.detail-challenge-label`, `.detail-challenge-block p`)
- Modify: `src/styles/portfolio.css:1086-1098` (mobile media rules for label / body)

- [ ] **Step 1: Update `.detail-challenge-block`**

Find the rule starting at line 1049:

```css
.detail-challenge-block {
  display: grid;
  gap: 6px;
}
```

Replace with:

```css
.detail-challenge-block {
  display: grid;
  gap: 14px;
}

.detail-challenge-block + .detail-challenge-block {
  margin-top: 36px;
}
```

(The `+` adjacent-sibling rule adds a `36px` gap between consecutive blocks — this is the spec's "section gap 36px". Within a block, label-to-body is `14px`.)

- [ ] **Step 2: Update `.detail-challenge-label`**

Find the rule starting at line 1054:

```css
.detail-challenge-label {
  color: rgba(244, 241, 232, 0.62);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

Replace with:

```css
.detail-challenge-label {
  align-self: start;
  justify-self: start;
  color: var(--tone);
  font-family: var(--font-mono);
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding-bottom: 6px;
  border-bottom: 1px solid color-mix(in srgb, var(--tone) 40%, transparent);
}
```

The `align-self: start` and `justify-self: start` make the label hug its content width inside the grid block — without them the label's `border-bottom` would stretch across the full card width.

- [ ] **Step 3: Note that `.detail-challenge-block p` is already updated by Task 2**

Don't touch it again. Skip to verification.

- [ ] **Step 4: Update mobile rules**

Find the existing mobile rule at line ~1095:

```css
  .detail-challenge-block p {
    font-size: 0.92rem;
  }
```

Delete it. Body text size at mobile uses the same `1.05rem` from the desktop rule — Korean text is already small enough at 1.05rem and reducing further hurts readability.

The mobile `@media (max-width: 720px)` block should now contain only the challenge padding override (Task 6) and the title size override (Task 7). If you see an orphan `.detail-challenge-block p` rule, delete it.

- [ ] **Step 5: Verify**

```javascript
// mcp__Claude_Preview__preview_inspect
selector: '.detail-challenge-label'
styles: ['color', 'font-size', 'border-bottom-color', 'padding-bottom', 'text-transform']
```

Expected (project-nemesis with hot tone):
- `color: rgb(255, 60, 121)`
- `font-size: 14.08px` (0.88rem × 16)
- `border-bottom-color: rgba(255, 60, 121, 0.4)` (or color-mix output)
- `padding-bottom: 6px`
- `text-transform: uppercase`

Also verify the section spacing exists. Click the page, then:

```javascript
// mcp__Claude_Preview__preview_eval
const blocks = [...document.querySelectorAll('.detail-challenge-block')];
blocks.length >= 2 ? getComputedStyle(blocks[1]).marginTop : 'no second block';
```

Expected: `36px`.

- [ ] **Step 6: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/styles/portfolio.css && git commit -m "$(cat <<'EOF'
style(detail): challenge labels — mono+tone+underline, 36px section gap

Section labels (Problem/Solution/Outcome) become inline-block
heading-like elements: tone color, mono font, 6px padding-bottom,
40%-opacity tone-color underline. Each label hugs its text width via
align-self:start so the underline doesn't stretch across the card.
Adjacent .detail-challenge-block siblings get a 36px margin-top so
the three sections breathe.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 9: Challenge outcome → body block + Korean labels

**Files:**
- Modify: `src/pages/portfolio/[slug].astro:108-124` (the challenge `<li>` markup)
- Modify: `src/styles/portfolio.css:1072-1084` (delete `.detail-challenge-outcome` rule)

- [ ] **Step 1: Update the challenge `<li>` markup in the Astro template**

Find lines 108-122 in `src/pages/portfolio/[slug].astro`:

```astro
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
```

Replace with:

```astro
                  <li class="detail-challenge">
                    <span class="detail-challenge-index">{String(index + 1).padStart(2, "0")}</span>
                    <h4 class="detail-challenge-title">{challenge.title}</h4>
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
                  </li>
```

Two changes in one edit: the outcome render now uses `.detail-challenge-block` markup (same as Problem and Solution) so it inherits the 36px sibling spacing and the same label styling. The labels are translated to 문제 원인 / 해결 과정 / 결과.

- [ ] **Step 2: Delete `.detail-challenge-outcome` CSS**

Find and delete the entire rule starting at line 1072 in `src/styles/portfolio.css`:

```css
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
```

Delete the whole 13-line block.

- [ ] **Step 3: Verify**

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
const labels = [...document.querySelectorAll('.detail-challenge-label')].map(el => el.textContent);
labels;
```

Expected: array containing `문제 원인`, `해결 과정`, `결과` per challenge. For project-nemesis (3 challenges), the array length is 9 (3 challenges × 3 labels).

Also confirm the outcome no longer has special styling:

```javascript
// mcp__Claude_Preview__preview_eval
document.querySelectorAll('.detail-challenge-outcome').length
```

Expected: `0`.

- [ ] **Step 4: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/pages/portfolio/\[slug\].astro src/styles/portfolio.css && git commit -m "$(cat <<'EOF'
refactor(detail): outcome renders as a regular block; Korean labels

Drops the special tinted outcome panel — the result line now uses the
same .detail-challenge-block markup as Problem and Solution, so all
three sections of a challenge share spacing and label styling.
Labels translate to 문제 원인 / 해결 과정 / 결과 to match the page's
Korean body content.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 10: Challenge card optional inline photo

**Files:**
- Modify: `src/pages/portfolio/[slug].astro:108-122` (the challenge `<li>` markup, again)
- Modify: `src/styles/portfolio.css` (add `.detail-challenge-image` rule near the other `.detail-challenge-*` rules)

- [ ] **Step 1: Add the image render to the `<li>`**

Find the challenge `<li>` markup (the version you just committed in Task 9). Add the image render between the title and the first block:

```astro
                  <li class="detail-challenge">
                    <span class="detail-challenge-index">{String(index + 1).padStart(2, "0")}</span>
                    <h4 class="detail-challenge-title">{challenge.title}</h4>
                    {challenge.image && (
                      <img
                        class="detail-challenge-image"
                        src={challenge.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    )}
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
                  </li>
```

The `draggable={false}` prevents the browser's native image-drag from interfering with text selection, matching the pattern used for portfolio grid card images.

- [ ] **Step 2: Add the CSS rule**

Open `src/styles/portfolio.css`. Find the `.detail-challenge-block` rule (around line 1049 after the prior tasks' edits). Add immediately after the `.detail-challenge-block + .detail-challenge-block` rule (and before `.detail-challenge-label`):

```css
.detail-challenge-image {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 36px;
  border: 1px solid rgba(244, 241, 232, 0.1);
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  object-fit: cover;
}
```

The `margin-bottom: 36px` matches the section gap so an image-then-block flows the same as block-then-block. The gradient background shows during image load (low FCP cost, never empty white box).

- [ ] **Step 3: Add a test image to one challenge to verify rendering**

Open `src/data/projects.ts`. Find the first project (`project-nemesis`) and its first challenge. Add an `image` field:

```ts
challenges: [
  {
    title: "30 tickrate hit detection 1프레임 흔들림",
    problem: "...",
    solution: "...",
    outcome: "...",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=84"
  },
  // ...other challenges unchanged
]
```

This is a temporary test image — pick any URL from the existing `gallery` field of any project (they're all Unsplash URLs). The verification check below confirms the rendering, then we can leave it in or remove it depending on whether the user wants placeholder content.

- [ ] **Step 4: Verify both rendering paths**

Image present:

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
const firstChallenge = document.querySelector('.detail-challenge');
const img = firstChallenge.querySelector('.detail-challenge-image');
({
  imagePresent: !!img,
  src: img?.src,
  aspectRatio: img ? getComputedStyle(img).aspectRatio : null,
  marginBottom: img ? getComputedStyle(img).marginBottom : null
});
```

Expected:
```
imagePresent: true
src: <the URL>
aspectRatio: "16 / 9"
marginBottom: "36px"
```

Image absent (subsequent challenges in nemesis don't have an image — verify they render cleanly):

```javascript
// mcp__Claude_Preview__preview_eval
const challenges = [...document.querySelectorAll('.detail-challenge')];
challenges.map((c, i) => ({
  idx: i,
  hasImage: !!c.querySelector('.detail-challenge-image'),
  firstChild: c.firstElementChild.className
}));
```

Expected: first challenge has an image; later challenges don't have one but render the title → block sequence without gaps.

- [ ] **Step 5: Decide on the test image**

If the user wants real placeholder content for development, leave the test image in projects.ts. If they prefer a clean state until they add real screenshots, remove the `image:` field you added in Step 3.

The recommendation: **remove the test image** and stage only the type-system + template + CSS changes. The user explicitly noted (in the spec, "Risks" section) that filler images are worse than no image.

- [ ] **Step 6: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/pages/portfolio/\[slug\].astro src/styles/portfolio.css && git commit -m "$(cat <<'EOF'
feat(detail): optional inline image inside each challenge card

Renders the 16:9 image when ProjectChallenge.image is set; nothing
when undefined. Image sits between the challenge title and the
'문제 원인' block, with the same 36px margin-bottom as a content
block so the flow into the labels stays consistent.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

(If you decided to keep the test image in Step 5, also `git add src/data/projects.ts` and reflect that in the commit message body.)

---

### Task 11: Remove eyebrow + summary from the top of the page

**Files:**
- Modify: `src/pages/portfolio/[slug].astro:21` (delete the `eyebrowDisplay` const)
- Modify: `src/pages/portfolio/[slug].astro:62` (delete the eyebrow `<p>`)
- Modify: `src/pages/portfolio/[slug].astro:64` (delete the summary `<p>`)
- Modify: `src/styles/portfolio.css:311-317` (delete `.detail-eyebrow` rule)
- Modify: `src/styles/portfolio.css:62` (remove `.detail-eyebrow,` from the shared mono-font selector list)
- Modify: `src/styles/portfolio.css:906-914` (delete `.detail-summary` rule — already updated in Task 2 but the element no longer exists)

- [ ] **Step 1: Delete the `eyebrowDisplay` const**

Find line 21 in `src/pages/portfolio/[slug].astro`:

```ts
const eyebrowDisplay = project.eyebrow.toUpperCase().replace(/\s+/g, "·");
```

Delete that line. The line above (`const teamPeriod = ...`) stays.

- [ ] **Step 2: Delete the eyebrow `<p>` and summary `<p>`**

Find lines 62 and 64 in the same file:

```astro
          <p class="detail-eyebrow">{eyebrowDisplay}</p>
          <h1 id="detail-title" class="detail-title">{project.title}</h1>
          <p class="detail-summary">{project.summary}</p>
```

Delete the eyebrow line and the summary line. Keep the H1.

- [ ] **Step 3: Delete the `.detail-eyebrow` CSS rule**

Find the rule starting at line 311 in `src/styles/portfolio.css`:

```css
.detail-eyebrow {
  margin: 0;
  color: var(--tone);
  font-size: 0.78rem;
  font-weight: 900;
  line-height: 1.2;
}
```

Delete that whole 7-line rule.

- [ ] **Step 4: Remove `.detail-eyebrow` from the shared mono-font selector list**

Find the shared selector at the top of portfolio.css (around line 62):

```css
.detail-eyebrow,
.detail-meta dt,
.detail-meta dd,
.detail-narrative h3,
.detail-cta a,
.detail-stack span,
.portfolio-footer-links a,
.system-ticker {
  font-family: var(--font-mono);
}
```

Delete the `.detail-eyebrow,` line. The remaining selectors continue working.

- [ ] **Step 5: Delete `.detail-summary` CSS rule**

Find the rule at line ~906 (the version you updated in Task 2):

```css
.detail-summary {
  max-width: min(620px, 100%);
  margin: 0;
  color: #ffffff;
  font-family: "Pretendard", "Noto Sans KR", system-ui, sans-serif;
  font-size: 1.05rem;
  font-weight: 450;
  line-height: 1.75;
  overflow-wrap: anywhere;
}
```

Delete the whole block. The `.detail-narrative p` selector retains the same body styling for the Project goal text.

- [ ] **Step 6: Verify**

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
({
  eyebrows: document.querySelectorAll('.detail-eyebrow').length,
  summaries: document.querySelectorAll('.detail-summary').length,
  h1Visible: !!document.querySelector('h1.detail-title')
});
```

Expected:
```
eyebrows: 0
summaries: 0
h1Visible: true
```

Build still works:

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && npx astro check
```

Expected: `0 errors`.

- [ ] **Step 7: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/pages/portfolio/\[slug\].astro src/styles/portfolio.css && git commit -m "$(cat <<'EOF'
refactor(detail): drop eyebrow and 1-line summary from page top

The Featured·NN eyebrow and the 1-line project summary both restated
information that the title and Project goal section already carry.
Removing both lets the H1 + meta strip + stack chips form a tighter
introduction. The Project type still has the eyebrow and summary
fields; the detail page just stops rendering them.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 12: Header row with Source button (right-aligned with H1)

**Files:**
- Modify: `src/pages/portfolio/[slug].astro:15-18` (replace `ctaEntries` with single source link)
- Modify: `src/pages/portfolio/[slug].astro:63-77` (replace H1 + CTA block with `.detail-header`)
- Modify: `src/styles/portfolio.css` (add `.detail-header` and `.detail-source` rules; delete `.detail-cta` rules)

- [ ] **Step 1: Simplify the frontmatter — replace `ctaEntries` array with a single `sourceHref` value**

Find lines 15-18 in `src/pages/portfolio/[slug].astro`:

```ts
const ctaEntries: Array<{ key: string; label: string; primary: boolean; href: string }> = [];
if (project.links.play) ctaEntries.push({ key: "play", label: "▶ Play", primary: true, href: project.links.play });
if (project.links.source) ctaEntries.push({ key: "source", label: "Source", primary: false, href: project.links.source });
if (project.links.devlog) ctaEntries.push({ key: "devlog", label: "Devlog", primary: false, href: project.links.devlog });
```

Replace with:

```ts
const sourceHref = project.links.source;
```

The `play` and `devlog` links remain in the data (no schema change) but aren't surfaced on the detail page.

- [ ] **Step 2: Replace the H1 + CTA block with `.detail-header`**

Find the H1 line (now around line 60 after Task 11's deletions) and the surrounding CTA block:

```astro
          <h1 id="detail-title" class="detail-title">{project.title}</h1>

          {ctaEntries.length > 0 && (
            <div class="detail-cta">
              {ctaEntries.map((entry) => (
                <a
                  href={entry.href}
                  class={entry.primary ? "is-primary" : undefined}
                  rel={entry.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  target={entry.href.startsWith("http") ? "_blank" : undefined}
                >{entry.label}</a>
              ))}
            </div>
          )}
```

Replace both with:

```astro
          <header class="detail-header">
            <h1 id="detail-title" class="detail-title">{project.title}</h1>
            {sourceHref && (
              <a
                class="detail-source"
                href={sourceHref}
                rel={sourceHref.startsWith("http") ? "noreferrer noopener" : undefined}
                target={sourceHref.startsWith("http") ? "_blank" : undefined}
              >▸ View Source</a>
            )}
          </header>
```

Note: H1 stays as `<h1>` (not changed to `<h2>` despite being in a `<header>`) — the page only has one H1, that's fine.

- [ ] **Step 3: Add `.detail-header` and `.detail-source` CSS rules**

Open `src/styles/portfolio.css`. Find the `.detail-content` rule (around line 885 — it's the parent container's grid). Right after `.detail-content`'s rule block, add:

```css
.detail-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin: 0;
}

.detail-source {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--tone);
  background: transparent;
  color: var(--tone);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1;
  padding: 10px 14px;
  text-decoration: none;
  text-transform: uppercase;
  transition: background 160ms ease, color 160ms ease;
}

.detail-source:hover {
  background: color-mix(in srgb, var(--tone) 14%, transparent);
}
```

`flex-wrap: wrap` lets the Source button drop below the H1 on narrow viewports without an explicit mobile rule.

- [ ] **Step 4: Delete the now-unused `.detail-cta` CSS rules**

Find the rule starting at line ~1673 (after prior tasks may have shifted line numbers — search for `.detail-cta {`):

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
  text-transform: uppercase;
  transition: background 160ms ease, color 160ms ease;
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

Delete all six `.detail-cta`-related rule blocks (about 38 lines total).

- [ ] **Step 5: Remove `.detail-cta a,` from the shared mono-font selector list**

The shared list at line ~62-72 still has `.detail-cta a,` on a line. Delete that line.

- [ ] **Step 6: Verify**

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
const header = document.querySelector('.detail-header');
const source = document.querySelector('.detail-source');
({
  headerExists: !!header,
  headerDisplay: header ? getComputedStyle(header).display : null,
  headerJustify: header ? getComputedStyle(header).justifyContent : null,
  sourceText: source?.textContent,
  sourceColor: source ? getComputedStyle(source).color : null,
  ctaCount: document.querySelectorAll('.detail-cta').length
});
```

Expected (project-nemesis with hot tone):
```
headerExists: true
headerDisplay: "flex"
headerJustify: "space-between"
sourceText: "▸ View Source"
sourceColor: "rgb(255, 60, 121)"
ctaCount: 0
```

Resize to mobile and verify the button wraps below the title:

```javascript
// mcp__Claude_Preview__preview_resize
preset: "mobile"
```

```javascript
// mcp__Claude_Preview__preview_eval
const h1 = document.querySelector('h1.detail-title');
const a = document.querySelector('.detail-source');
const r1 = h1.getBoundingClientRect();
const r2 = a.getBoundingClientRect();
({ h1Top: r1.top, sourceTop: r2.top, wrapped: r2.top > r1.bottom - 5 });
```

Expected: `wrapped: true` (Source button is below the H1's bottom edge).

Reset viewport:

```javascript
// mcp__Claude_Preview__preview_resize
width: 1920
height: 1080
```

- [ ] **Step 7: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/pages/portfolio/\[slug\].astro src/styles/portfolio.css && git commit -m "$(cat <<'EOF'
refactor(detail): single Source button right-aligned with the H1

The Play/Source/Devlog three-button row collapses to just Source,
positioned at the right edge of the H1 row via a flex header. On
narrow viewports the button wraps below the title automatically.
Tone-colored outline gives the button moderate visibility without
competing with the H1. Drops the .detail-cta CSS along with the
ctaEntries setup logic; play and devlog remain in the data type
but are no longer rendered on the detail page.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 13: Move stack chips up — render between meta and Project goal

**Files:**
- Modify: `src/pages/portfolio/[slug].astro` (move the `.detail-stack` block from after `.detail-challenges` to between `.detail-meta` and `.detail-narrative`)

- [ ] **Step 1: Cut the existing stack render block from the bottom**

Find the stack render block — it's the last block inside `<article class="detail-content">`. After the previous tasks' deletions (eyebrow, summary, CTA, gallery, stats), it should look like this:

```astro
          {project.stack.length > 0 && (
            <div class="detail-stack">
              {project.stack.map((item) => <span>{item}</span>)}
            </div>
          )}
        </article>
```

Cut that whole conditional block (4 lines). Leave the closing `</article>` in place.

- [ ] **Step 2: Paste the stack render block immediately after the `<dl class="detail-meta">` closing tag**

Find the `<dl class="detail-meta">...</dl>` block (around line 79 after prior task edits). Right after the closing `</dl>` and before `<section class="detail-narrative">`, paste:

```astro
          {project.stack.length > 0 && (
            <div class="detail-stack">
              {project.stack.map((item) => <span>{item}</span>)}
            </div>
          )}
```

So the new order inside `<article class="detail-content">` reads:

```
<header class="detail-header"> ... </header>
<dl class="detail-meta"> ... </dl>
<div class="detail-stack"> ... </div>          ← moved up
<section class="detail-narrative"> ... </section>
<section class="detail-challenges"> ... </section>
```

- [ ] **Step 3: Verify the DOM order**

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
const article = document.querySelector('article.detail-content');
[...article.children].map(el => el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''));
```

Expected:
```json
[
  "HEADER.detail-header",
  "DL.detail-meta",
  "DIV.detail-stack",
  "SECTION.detail-narrative",
  "SECTION.detail-challenges"
]
```

(Exactly five children, in that order. No `.detail-cta`, no `.detail-eyebrow`, no `.detail-summary`, no `.detail-gallery`, no `.detail-stats`.)

- [ ] **Step 4: Final visual review at both viewports**

Wide:

```javascript
// mcp__Claude_Preview__preview_resize
width: 1920
height: 1080
```

```javascript
// mcp__Claude_Preview__preview_eval
window.location.href = '/portfolio/project-nemesis';
```

Take a screenshot for posterity:

```javascript
// mcp__Claude_Preview__preview_screenshot
```

Mobile:

```javascript
// mcp__Claude_Preview__preview_resize
preset: "mobile"
```

```javascript
// mcp__Claude_Preview__preview_screenshot
```

(If the screenshot times out — same preview-window-hidden issue as earlier in this conversation — skip it. The earlier `preview_eval` checks already verified the DOM and computed styles.)

Run a final build check:

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && npm run build
```

Expected: build completes with `[build] 5 page(s) built` (or similar). No TypeScript errors, no Astro template errors.

Reset viewport:

```javascript
// mcp__Claude_Preview__preview_resize
width: 1920
height: 1080
```

- [ ] **Step 5: Commit**

```bash
cd "/c/Users/jun/Desktop/Resume/HyeongJunYoo.github.io" && git add src/pages/portfolio/\[slug\].astro && git commit -m "$(cat <<'EOF'
refactor(detail): move stack chips up — between meta strip and goal

Clusters the technical context (Engine/Platform/Role/Team in meta + the
stack chip row) into a single block above Project goal. The Engine
"Unreal 5.3" intentionally repeats between meta and stack — for a
recruiter scanning the page in 5-10 seconds, doubling the most
important technical fact is a feature, not redundancy.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Self-review (run before declaring complete)

Before marking the plan done, verify against the spec:

- [ ] **Spec section 1 (body text):** Task 2 covers `.detail-summary`, `.detail-narrative p`, `.detail-challenge-block p`. ✓
- [ ] **Spec section 2 (stats removal + colored stack):** Task 3 colors the stack, Task 4 removes stats. ✓
- [ ] **Spec section 3 (challenge card):** Tasks 6, 7, 8, 9 cover container, title, labels+spacing, outcome→body+Korean. ✓
- [ ] **Spec section 4 (top-of-page restructure):** Tasks 11 (eyebrow+summary), 12 (header+source), 13 (stack move up). ✓
- [ ] **Spec section 5 (stack move):** Task 13. ✓
- [ ] **Spec data shape (image? field):** Task 1. ✓
- [ ] **Spec optional photo:** Task 10. ✓
- [ ] **Spec gallery removal:** Task 5. ✓

After all 13 tasks land, run one final manual review:

```javascript
// Confirm zero remaining old elements
window.location.href = '/portfolio/project-nemesis';
({
  eyebrow: document.querySelectorAll('.detail-eyebrow').length,
  summary: document.querySelectorAll('.detail-summary').length,
  cta: document.querySelectorAll('.detail-cta').length,
  stats: document.querySelectorAll('.detail-stats').length,
  gallery: document.querySelectorAll('.detail-gallery').length,
  outcomePanel: document.querySelectorAll('.detail-challenge-outcome').length,
  // expected presence:
  header: document.querySelectorAll('.detail-header').length,
  source: document.querySelectorAll('.detail-source').length,
  challengeBlocks: document.querySelectorAll('.detail-challenge-block').length
});
```

Expected: first six counts all `0`. `.detail-header` and `.detail-source` present (`1` each per page). `.detail-challenge-block` should be `9` for project-nemesis (3 challenges × 3 blocks each).
