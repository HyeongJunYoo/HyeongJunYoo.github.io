# #about Readability + Pretendard Load Optimization

**Date:** 2026-05-18
**Status:** Design approved, ready to plan
**Affects:** `src/styles/global.css`, `src/components/Layout.astro`

## Goal

Fix the readability of the `#about` section's prose by introducing a reusable set of "reading" typography tokens (line length, leading, size, paragraph gap, tracking) and applying them to `.about-body`. In the same pass, optimize the *already-present* Pretendard webfont load (currently static + unpinned) to a pinned variable dynamic-subset, and add font-smoothing.

The reading tokens are designed as a single source of truth so the same treatment can later be extended section-by-section (Career / Projects / Education / Showcases) in separate iterations.

## Why now

A visual review of `https://hyeongjunyoo.github.io/#about` found the body text hard to read. Diagnosis (faithful reproduction of the live styles) identified four issues, in priority order:

1. **Line length far too long (critical).** `.about-body` resolves to `width: min(100%, var(--content-max))` where `--content-max` is `1180px`, and `.about-body > p` is `max-width: 100%`. Korean body text at ~16px renders ~60–75 characters per line. Comfortable Korean measure is ~40 characters; the eye loses the line on return sweep. Research corroborates 40–60 chars/line for Korean, single column.
2. **Paragraph separation too tight.** `.about-body { gap: 10px }` against a ~27px line-box makes the two paragraphs read as one block.
3. **`word-break: keep-all` not set.** Mixed Latin/Korean tokens (`PC/VR`, `UGUI`, `SDK`) break at arbitrary points, producing a ragged, hard-to-scan right edge.
4. **Leading / size under-tuned.** Body `line-height: 1.68`, `.about-body > p` `font-size: 1.02rem`. Once the measure is fixed, slightly more generous values read better for Korean.

Separately, the user asked to "change the font to Pretendard." Investigation of `src/components/Layout.astro:46` showed Pretendard is **already loaded** — but as the heavy **static** build from an **unpinned** jsDelivr path (`orioncactus/pretendard/dist/web/static/pretendard.css`, no `@version` → tracks default branch). So the font is not the cause of the perceived readability problem; the layout/typography issues above are. The actionable font improvement is to *optimize the existing load*, not add a font.

## Scope

### In scope

1. **Reading tokens** — five CSS custom properties in `:root` (`global.css`).
2. **`#about` application** — apply tokens to `.about-body` and `.about-body > p`, including left-aligning the body under the heading.
3. **Pretendard load optimization** — `Layout.astro`: replace the unpinned static link with a pinned (`@v1.3.9`) variable dynamic-subset link + `preconnect`.
4. **Font stack + smoothing** — `global.css` `body`: prepend `"Pretendard Variable"` to the family stack; add `-webkit-font-smoothing: antialiased` + `-moz-osx-font-smoothing: grayscale`.

### Out of scope

- **Applying the reading tokens to other sections.** Career / Projects / Education / Showcases have the same wide-measure issue but are list/grid structures needing per-section target selection. Each is a separate spec/iteration (see "Progressive expansion" below). Decision: validate on `#about` first.
- **Changing colors, alignment intent, or the font *family* choice.** Contrast already passes WCAG AA; text stays left-aligned; Pretendard stays the typeface (only its delivery changes).
- **Self-hosting the font (npm `pretendard` / fontsource).** CDN variable dynamic-subset chosen over self-host for payload + simplicity on a personal GitHub Pages site (see Decisions).
- **The pre-existing dark `html` background mismatch** (`Layout.astro` inline `#0c0c0c` vs `global.css --bg #11110f`). Untouched — unrelated to readability.
- **Print stylesheet changes.** The `@media print` block already neutralizes the relevant `.about-body` properties (see Verification).

## Detailed design

### 1. Reading tokens (`global.css` `:root`)

The `:root` block currently ends:

```css
  --entry-meta-width: 400px;
}
```

Add the reading tokens before the closing brace. Theme-independent (not redefined in `:root[data-theme="dark"]` or the print `:root`):

```css
  --entry-meta-width: 400px;
  --reading-measure: 40rem;     /* line length — ~38 Korean chars at 1.08rem */
  --reading-leading: 1.8;       /* line-height */
  --reading-size: 1.08rem;      /* body font-size (rem = root 16px, mobile-safe) */
  --reading-gap: 1.3em;         /* inter-paragraph spacing */
  --reading-tracking: -0.01em;  /* letter-spacing for Korean body */
}
```

### 2. Font stack + smoothing (`global.css` `body`)

Current (lines 48–63):

```css
body {
  margin: 0;
  overflow-x: hidden;
  background: var(--bg);
  color: var(--text);
  font-family:
    Pretendard, "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic",
    sans-serif;
  font-size: 16px;
  line-height: 1.68;
  letter-spacing: 0;
  text-rendering: optimizeLegibility;
  transition:
    background-color 180ms ease,
    color 180ms ease;
}
```

Change only the `font-family` value and add two smoothing declarations. Everything else (incl. base `line-height: 1.68` for non-reading UI, `letter-spacing: 0`, `text-rendering`, `transition`) is unchanged:

```css
  font-family:
    "Pretendard Variable", Pretendard, "Noto Sans KR",
    "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  font-size: 16px;
  line-height: 1.68;
  letter-spacing: 0;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
```

`"Pretendard Variable"` is the family name exposed by the variable dynamic-subset CSS. `Pretendard` is kept next as fallback (covers a locally installed copy or any static load). Base `line-height`/`letter-spacing` stay as-is — only `.about-body > p` gets the reading values, so cards/nav/lists are unaffected.

### 3. `#about` application (`global.css`)

Three current rules are relevant:

```css
/* lines 420–425 */
.about-body > p {
  max-width: 100%;
  margin-bottom: 0;
  color: var(--text);
  font-size: 1.02rem;
}

/* lines 427–430 */
.about-body {
  display: grid;
  gap: 10px;
}

/* lines 432–442 — SHARED rule; applies width + centering to .about-body */
.about-body,
.skill-list,
.career-list,
.project-timeline,
.activity-list,
.activity-actions,
.education-list {
  width: min(100%, var(--content-max));
  margin-right: auto;
  margin-left: auto;
}
```

**Edit the `.about-body > p` rule** (drop `max-width: 100%`, which is now governed by the container; add reading typography; keep color + margin):

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

(`text-wrap: pretty` already applies to `p` via the global `h1,h2,h3,h4,p,li { text-wrap: pretty }` rule at lines 296–303 — no change needed.)

**Edit the `.about-body` rule** to use the gap token:

```css
.about-body {
  display: grid;
  gap: var(--reading-gap);
}
```

**Add a NEW `.about-body` override rule placed AFTER the shared rule** (i.e., after line 442). This is required because the shared rule sets `width: min(100%, var(--content-max))` and centers the block; an equal-specificity override must come *later in source order* to win. It caps the measure and left-aligns the body under the "About Me" heading:

```css
/* must appear after the .about-body,.skill-list,… shared rule */
.about-body {
  max-width: var(--reading-measure);
  margin-left: 0;
  margin-right: auto;
}
```

Result: effective width = `min(100%, 40rem)`, flush-left, aligned with the left-aligned `.section-heading.compact` "About Me" — matching the approved mockup.

### 4. Pretendard load optimization (`Layout.astro`)

Current (line 46):

```html
<link rel="stylesheet" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" />
```

Replace with a pinned variable dynamic-subset link, preceded by a `preconnect` for the CDN origin:

```html
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
<link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
```

- **Pinned `@v1.3.9`** — removes the unpinned-default-branch risk.
- **Variable dynamic-subset** — smallest payload: only the glyph slices used by the page are fetched, and weights come from one variable file. Family name: `"Pretendard Variable"` (matches §2).
- **`font-display`** — Pretendard's `@font-face` ships `font-display: swap`, so there is no FOIT; fallback stack shows immediately, then swaps.
- The `as="style"` attribute follows Pretendard's official documented snippet (harmless on `rel="stylesheet"`); `crossorigin` is kept (consistent with the existing link and required for the font fetch).
- The unrelated Google Fonts `preconnect`/links (lines 47–49, Bricolage / JetBrains Mono) are untouched.

## Verification

Run after implementation:

- **Build + screen render.** `npm run build` (or dev) and view `#about`: measure ~40rem, flush-left under "About Me", clear paragraph separation, no mid-token breaks on `PC/VR` / `UGUI`.
- **Pretendard actually applied.** DevTools → computed `font-family` on an `.about-body > p` resolves to `Pretendard Variable`; Network shows the pinned `pretendardvariable-dynamic-subset` CSS + subset woff2 slices loading (200, not 404).
- **Light + dark.** Toggle theme; body text stays high-contrast and legible in both (no rule changes color — verification only; #191817/#f7f7f5 and #f4f1ec/#11110f both exceed WCAG AA 4.5:1).
- **Responsive.** At <640px viewport, `.about-body` shrinks to viewport (40rem no longer constrains); body stays ~17px (rem is root-relative, unaffected by the mobile `body { font-size: 15px }` rule).
- **Print unaffected.** Print preview: the `@media print` block already sets `.about-body { max-width: none }` (global.css:1157) and re-specifies `.about-body p` size/leading (≈1163–1165) and centering is moot at print full-width. Confirm the A4 résumé layout is visually unchanged from before this spec.

## Progressive expansion (out of scope, future iterations)

Once `#about` is validated, the same five `--reading-*` tokens can be applied, one section per iteration, to the *prose* text of other sections — e.g. `.career-content .check-list`, `.project-definition p`, `.project-detail-grid ul`, `.education-content .check-list`, `.activity-content .entry-summary`. Each needs its own target selection (these are list/grid layouts, not single prose columns) and its own print-safety check, so each is a separate spec rather than part of this change.

## Decisions made during brainstorming

- **Measure = B (40rem) over A (33rem) / C (52rem).** Chosen by direct visual comparison of the real About content at all three widths. ~38 Korean chars/line — comfortable low end of the researched 40–60 range, good for dense Korean prose.
- **Leading = 1.80**, locked via a 1.70/1.80/1.90 micro-comparison. Above the WCAG 1.5 floor; Korean benefits from generous leading.
- **Tracking = -0.01em** over 0 / -0.02em. Matches the Korean 16–17pt convention of slight negative tracking; -0.02em felt too tight at the locked size.
- **Font: optimize load, not add.** Discovered Pretendard was already loaded (static, unpinned). Corrected course: pin + variable dynamic-subset rather than "adding" a font. User chose load-optimization over version-pin-only or status-quo.
- **CDN variable dynamic-subset over self-host.** Dynamic subsetting is purpose-built for large Korean fonts (loads only used glyph slices); on a personal GitHub Pages résumé the payload + zero-build-wiring win over eliminating the third-party origin. font-display:swap in Pretendard's @font-face makes the load non-blocking.
- **Token architecture over one-off literals.** A `--reading-*` token set in `:root` gives a single tuning point and a clean path to extend section-by-section, matching the user's "find a method and apply it one by one, then expand" intent. A body-wide global change was rejected (regression risk to cards/grids/nav/print).
- **`#about` first, expand later.** Scope deliberately limited to one section to validate the treatment before propagating.

## Files touched

- `src/styles/global.css` — add 5 `--reading-*` tokens to `:root`; change `body` `font-family` + add 2 font-smoothing declarations; rewrite `.about-body > p` (reading typography, drop `max-width:100%`); change `.about-body` `gap` to token; add a new post-shared-rule `.about-body` override (max-width + left-align).
- `src/components/Layout.astro` — replace the unpinned static Pretendard `<link>` (line 46) with a CDN `preconnect` + pinned variable dynamic-subset `<link>`.

## Risks

- **CSS source order for the `.about-body` override.** The left-align/max-width override must be placed *after* the shared `.about-body,.skill-list,…` centering rule or the centering wins (equal specificity). Called out explicitly in §3; verify rendered alignment.
- **Pinned font version drift.** `@v1.3.9` is fixed and current as of this spec. A future Pretendard release won't auto-apply (intended trade-off: stability over auto-updates). Revisit the pin deliberately later.
- **Variable dynamic-subset family name.** Must be exactly `"Pretendard Variable"` in the stack; a mismatch silently falls back to `Pretendard`/Noto without an error. Covered by the "Pretendard actually applied" verification step.
- **rem vs mobile base size.** `--reading-size: 1.08rem` is root-relative, so it stays ~17px even where `body { font-size: 15px }` (≤640px). This is intended (16–19px recommended) but is a deliberate divergence from the surrounding 15px mobile UI — confirm it reads well on a narrow viewport.
- **Print regression.** Low: the print block already overrides the touched `.about-body` properties. Still explicitly in the Verification checklist because the change is to a print-sensitive selector.
