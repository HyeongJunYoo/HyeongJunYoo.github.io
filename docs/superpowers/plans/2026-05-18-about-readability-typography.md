# #about Readability + Pretendard Load Optimization — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the `#about` prose readable by introducing reusable `--reading-*` typography tokens and applying them to `.about-body`, while optimizing the already-present Pretendard webfont load (static+unpinned → pinned variable dynamic-subset).

**Architecture:** Five CSS custom properties in `:root` (`global.css`) act as the single source of truth for reading typography. `.about-body` / `.about-body > p` consume them; a new `.about-body` rule placed *after* the existing shared centering rule overrides width+alignment (equal specificity → source order wins). `Layout.astro`'s font `<link>` is swapped to a pinned variable dynamic-subset URL and the font stack gains `"Pretendard Variable"` + smoothing.

**Tech Stack:** Astro 6 static site, plain CSS (no preprocessor), no test runner. Verification = `npm run build` (syntax/build validity) + exact source-string assertions + browser preview (`npm run dev`) for visual/computed-style confirmation.

---

## Spec

Implements `docs/superpowers/specs/2026-05-18-about-readability-typography-design.md` in full. Read it before starting.

## File Structure

- **`src/styles/global.css`** — owns all typography. Five edits: (1) add `--reading-*` tokens to `:root`; (2) `body` font-family + smoothing; (3) rewrite `.about-body > p`; (4) `.about-body` gap → token; (5) new post-shared-rule `.about-body` width/align override.
- **`src/components/Layout.astro`** — owns the document `<head>`. One edit: replace the Pretendard `<link>` (line 46) with `preconnect` + pinned variable dynamic-subset `<link>`.

No new files. No other files touched.

## Task ordering rationale

Task 1 (tokens) must precede Task 3 (which consumes them). Task 2 (font load/stack) is independent. Order 1→2→3 matches spec section order and keeps the site working after every commit (each change degrades gracefully on its own).

---

### Task 1: Add reading tokens to `:root`

**Files:**
- Modify: `src/styles/global.css` (the light-theme `:root` block, ends ~line 20)

- [ ] **Step 1: Add the five tokens**

Use Edit on `src/styles/global.css`.

old_string:
```css
  --entry-meta-width: 400px;
}
```

new_string:
```css
  --entry-meta-width: 400px;
  --reading-measure: 40rem;
  --reading-leading: 1.8;
  --reading-size: 1.08rem;
  --reading-gap: 1.3em;
  --reading-tracking: -0.01em;
}
```

(This string occurs once — only the light `:root` defines `--entry-meta-width`. The `:root[data-theme="dark"]` and print `:root` blocks do not, so the tokens stay theme/print-independent as the spec requires.)

- [ ] **Step 2: Verify the tokens are present in source**

Run: `npm run build`
Expected: build completes with no CSS error; `dist/` is (re)generated.

Then assert the source contains each token. Run:
```
grep -n -- "--reading-measure: 40rem;" src/styles/global.css
grep -n -- "--reading-tracking: -0.01em;" src/styles/global.css
```
Expected: each prints one matching line inside the `:root { … }` block (line number < the `:root[data-theme="dark"]` selector line).

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(style): add --reading-* typography tokens to :root"
```

---

### Task 2: Optimize Pretendard load + font stack + smoothing

The `<link>` and the font-family name are interdependent (`"Pretendard Variable"` only resolves when the variable CSS is loaded), so they ship in one commit. Both intermediate states still render via fallback, but committing together avoids a mismatched repo state.

**Files:**
- Modify: `src/components/Layout.astro:46`
- Modify: `src/styles/global.css` (`body` rule, lines ~53–59)

- [ ] **Step 1: Replace the Pretendard `<link>` with preconnect + pinned variable dynamic-subset**

Use Edit on `src/components/Layout.astro`.

old_string:
```html
    <link rel="stylesheet" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" />
```

new_string:
```html
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
    <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
```

- [ ] **Step 2: Update the `body` font-family stack**

Use Edit on `src/styles/global.css`.

old_string:
```css
  font-family:
    Pretendard, "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic",
    sans-serif;
```

new_string:
```css
  font-family:
    "Pretendard Variable", Pretendard, "Noto Sans KR",
    "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
```

- [ ] **Step 3: Add font-smoothing declarations**

Use Edit on `src/styles/global.css`. (`text-rendering: optimizeLegibility;` occurs once — in the `body` rule.)

old_string:
```css
  text-rendering: optimizeLegibility;
  transition:
```

new_string:
```css
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition:
```

- [ ] **Step 4: Build + assert source strings**

Run: `npm run build`
Expected: completes with no error.

Run:
```
grep -n "pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" src/components/Layout.astro
grep -n "preconnect" src/components/Layout.astro
grep -n '"Pretendard Variable", Pretendard,' src/styles/global.css
grep -n -- "-webkit-font-smoothing: antialiased;" src/styles/global.css
```
Expected: the variable-subset link line, a `cdn.jsdelivr.net` preconnect line, the new font-family line, and the smoothing line each return exactly one match. Confirm the old `static/pretendard.css` URL no longer appears: `grep -n "static/pretendard.css" src/components/Layout.astro` → no output.

- [ ] **Step 5: Browser check — Pretendard Variable actually applied**

Run: `npm run dev` (Astro dev server, default `http://localhost:4321`). Open the home page.

In DevTools:
- Console: `getComputedStyle(document.querySelector('.about-body > p')).fontFamily` → string begins with `"Pretendard Variable"`.
- Network tab, reload: a request to `…/pretendardvariable-dynamic-subset.min.css` returns **200**, and subset `*.woff2` slices load 200 (not 404). No request to the old `static/pretendard.css`.

Stop the dev server when done.

- [ ] **Step 6: Commit**

```bash
git add src/components/Layout.astro src/styles/global.css
git commit -m "perf(font): pin Pretendard + switch to variable dynamic-subset, add smoothing"
```

---

### Task 3: Apply reading tokens to `#about`

**Files:**
- Modify: `src/styles/global.css` — `.about-body > p` (lines ~420–425), `.about-body` (lines ~427–430), and add a new rule after the shared centering rule (after line ~442)

- [ ] **Step 1: Rewrite `.about-body > p`**

Use Edit on `src/styles/global.css`. Drops `max-width: 100%` (the container now governs width), keeps color + margin, adds reading typography. `text-wrap: pretty` is NOT added here — it already applies to every `p` via the global `h1,h2,h3,h4,p,li { text-wrap: pretty }` rule.

old_string:
```css
.about-body > p {
  max-width: 100%;
  margin-bottom: 0;
  color: var(--text);
  font-size: 1.02rem;
}
```

new_string:
```css
.about-body > p {
  margin-bottom: 0;
  color: var(--text);
  font-size: var(--reading-size);
  line-height: var(--reading-leading);
  letter-spacing: var(--reading-tracking);
  word-break: keep-all;
  overflow-wrap: anywhere;
}
```

- [ ] **Step 2: Switch `.about-body` gap to the token**

Use Edit on `src/styles/global.css`. (This exact 4-line block occurs once.)

old_string:
```css
.about-body {
  display: grid;
  gap: 10px;
}
```

new_string:
```css
.about-body {
  display: grid;
  gap: var(--reading-gap);
}
```

- [ ] **Step 3: Add the width/align override AFTER the shared centering rule**

Use Edit on `src/styles/global.css`. Appending immediately after the shared rule guarantees correct source order (equal specificity → later rule wins), so `.about-body` caps at the measure and left-aligns under the "About Me" heading instead of centering.

old_string:
```css
.activity-actions,
.education-list {
  width: min(100%, var(--content-max));
  margin-right: auto;
  margin-left: auto;
}
```

new_string:
```css
.activity-actions,
.education-list {
  width: min(100%, var(--content-max));
  margin-right: auto;
  margin-left: auto;
}

.about-body {
  max-width: var(--reading-measure);
  margin-left: 0;
  margin-right: auto;
}
```

- [ ] **Step 4: Build + assert source strings**

Run: `npm run build`
Expected: completes with no error.

Run:
```
grep -n "font-size: var(--reading-size);" src/styles/global.css
grep -n "word-break: keep-all;" src/styles/global.css
grep -n "gap: var(--reading-gap);" src/styles/global.css
grep -n "max-width: var(--reading-measure);" src/styles/global.css
```
Expected: each returns one match. Confirm `max-width: 100%;` is gone from the `.about-body > p` rule (`grep -n "max-width: 100%;" src/styles/global.css` should show no line inside the `.about-body > p` block; other unrelated `max-width: 100%` declarations elsewhere are fine).

- [ ] **Step 5: Browser check — measure, alignment, wrapping, themes, responsive**

Run: `npm run dev`. Open `http://localhost:4321/#about`.

Confirm visually:
- The two About paragraphs form a column roughly 40rem wide (≈640px), **flush-left**, its left edge aligned with the "About Me" heading (not centered in the page).
- Clear blank-line separation between the two paragraphs.
- No mid-token breaks on `PC/VR`, `UGUI`, `SDK` (tokens stay intact; lines wrap at spaces).
- Toggle the theme switch: text stays high-contrast and legible in both light and dark.
- Narrow the window below ~640px: the column shrinks to the viewport (no horizontal scroll); body text stays ≈17px.

Stop the dev server when done.

- [ ] **Step 6: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(style): apply reading tokens to #about (measure, leading, keep-all, left-align)"
```

---

### Task 4: Full verification gate (no code, no commit)

Runs the spec's Verification checklist end-to-end against the final built site. Pure verification — produces no code and nothing to commit. If any check fails, fix the responsible task's edit and re-run from that task.

**Files:** none.

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: completes with no error; `dist/` generated.

- [ ] **Step 2: Preview the production build**

Run: `npm run preview` and open the served URL (Astro preview, typically `http://localhost:4321`).

- [ ] **Step 3: Pretendard applied (computed + network)**

DevTools Console: `getComputedStyle(document.querySelector('.about-body > p')).fontFamily` begins with `"Pretendard Variable"`.
Network (reload): pinned `pretendardvariable-dynamic-subset.min.css` → 200; subset woff2 slices → 200; no `static/pretendard.css` request.

- [ ] **Step 4: Light + dark legibility**

Toggle theme. `#about` body remains high-contrast and comfortably readable in both (no rule changed color — this is a confirmation, not a change). Expected token colors unchanged: light `#191817` on `#f7f7f5`, dark `#f4f1ec` on `#11110f`.

- [ ] **Step 5: Responsive**

Resize/emulate a ≤640px viewport. `.about-body` shrinks to the viewport, no horizontal scrollbar, body text stays ≈17px (rem is root-relative, unaffected by the mobile `body { font-size: 15px }` rule).

- [ ] **Step 6: Print unchanged**

Browser Print Preview (Ctrl/Cmd+P). The A4 résumé layout — including the About block — looks the same as before this change (the `@media print` block already resets `.about-body { max-width: none }` at global.css:1157 and re-specifies `.about-body p` size/leading; the screen tokens must not leak into print). If the printed About column is narrowed or mis-spaced, the print override is being bypassed — investigate before declaring done.

- [ ] **Step 7: Report**

State explicitly which of Steps 1–6 passed. Do not claim completion unless all pass. Visual steps require the browser preview — if it could not be run, say so rather than asserting success.

---

## Self-Review

**1. Spec coverage**

| Spec item | Task |
|---|---|
| `:root` 5 reading tokens | Task 1 |
| `body` font-family → `"Pretendard Variable"` first | Task 2 Step 2 |
| `body` `-webkit-font-smoothing` + `-moz-osx-font-smoothing` | Task 2 Step 3 |
| `Layout.astro` preconnect + pinned variable dynamic-subset link | Task 2 Step 1 |
| `.about-body > p` reading typography, drop `max-width:100%` | Task 3 Step 1 |
| `.about-body` gap → token | Task 3 Step 2 |
| New post-shared-rule `.about-body` max-width + left-align | Task 3 Step 3 |
| Verification: build, font applied, light/dark, responsive, print | Task 4 |
| Out of scope (other sections, colors, self-host, dark-bg mismatch, print edits) | Not in any task — correctly excluded |

No spec requirement is unaddressed.

**2. Placeholder scan**

No "TBD/TODO/handle edge cases/similar to Task N". Every code step shows the exact old/new strings. Verification steps give exact commands and expected outputs. Adapted (honestly) from TDD because the project has no test runner and the change is presentational CSS — verification is build + deterministic source-string assertions + browser computed-style/visual checks, all concrete.

**3. Type/name consistency**

Token names identical across Task 1 (definition) and Task 3 (use): `--reading-measure`, `--reading-leading`, `--reading-size`, `--reading-gap`, `--reading-tracking`. Font family string identical in Task 2 link family and stack: `"Pretendard Variable"`. URL identical in Task 2 Step 1 and Task 2/4 verification: `pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css`. Consistent.
