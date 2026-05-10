# Project Detail Page — Visual Redesign

**Date:** 2026-05-10
**Status:** Design approved, ready to plan
**Affects:** `src/pages/portfolio/[slug].astro`, `src/data/projects.ts`, `src/styles/portfolio.css`

## Goal

Improve the project detail page in five focused ways: body text readability, removal of placeholder stats, color-tagged stack chips, redesigned challenge cards, and per-challenge optional photo support. The current page is functional but text is hard to read against the dark background, the stats card row holds placeholder numbers that don't survive a real recruiter's scrutiny, and the case-study cards lack visual hierarchy that makes 문제 원인 / 해결 과정 / 결과 land.

## Why now

The previous detail page was built quickly to validate the case-study structure (Goal + Challenges & Solutions). Now that the structure is settled, the visual layer needs polish before the user fills in real project content. Specifically:

- **Body text** uses `weight: 650` with `opacity: 0.82` against a near-black background — too dim, too dense for Korean text where each character is already information-rich.
- **Stats cards** (FPS / Tracks / Build Size) are placeholder values. Showing fabricated numbers is the fastest way to fail an interview if the recruiter asks about them.
- **Stack chips** are uniform neutral-gray. The site already encodes a per-project tone color (hot / aqua / violet / lime / orange) in the rest of the UI; the chips don't participate.
- **Challenge cards** have a tone-colored vertical bar on the left and a special tinted "outcome" panel that gives the result line disproportionate visual weight. The user's intent is to treat 원인 / 과정 / 결과 as equal beats of a single narrative.
- **Photos** sit only in a 4-up grid at the bottom, disconnected from the case-study text. Recruiters scanning a challenge can't see the visual evidence next to the claim.

## Scope

### In scope

1. Body text styling overhaul (white #fff, weight 450, line-height 1.75, size 1.05rem).
2. Remove the `.detail-stats` section entirely.
3. Stack chips colored with project tone (outline style).
4. Challenge card redesign: lighter card background, no left bar, equal styling for all three sections, mono-typeset tone-colored underlined labels, increased padding and inter-section spacing, optional inline photo.
5. Top of detail page restructure: remove eyebrow ("FEATURED·01"), remove 1-line summary, replace 3-button CTA with single "View Source" outline button inline with the H1, move stack chips from bottom of page to right after the meta strip.
6. Remove the bottom 4-up gallery (its role is taken over by per-challenge photos).
7. Korean labels on challenge sections (문제 원인 / 해결 과정 / 결과 instead of PROBLEM / SOLUTION / OUTCOME).

### Out of scope

- Project content rewrites. The placeholder Korean text stays as-is; the user replaces with real project history later.
- Hero image / video changes. The 16:9 hero stays.
- Detail page navigation (next/prev project). Not part of this redesign.
- Mobile-specific layout overhauls. Existing responsive rules continue to apply; this redesign only adjusts breakpoints where the new content demands it (challenge card padding shrinks on narrow viewports).

## Detailed design

### 1. Body text readability

Single visual treatment applied everywhere body text appears: `.detail-summary`, `.detail-narrative p`, `.detail-challenge` body paragraphs.

```css
color: #ffffff;
font-family: "Pretendard", "Noto Sans KR", system-ui, sans-serif;
font-size: 1.05rem;          /* was ~1rem */
font-weight: 450;             /* was 650-700 */
line-height: 1.75;            /* was 1.6 */
```

Pretendard is moved to first position because it's the actual Korean-supporting font — Bricolage Grotesque was acting as a label font that Korean characters fell through to fallback for. Weight 450 in Pretendard renders as a comfortable Light/Regular for long Korean passages; 650+ was rendering as bold-bordering, which makes Korean characters bunch.

### 2. Remove stats, color the stack

`.detail-stats` and the surrounding render block in `[slug].astro` are deleted. The `stats: ProjectStat[]` field on the Project type stays for now — it's referenced by the data files and removing it triggers a wider type/data cleanup that's out of scope for this redesign. The detail page just stops rendering it.

`.detail-stack span` switches to:

```css
border: 1px solid var(--tone);
background: color-mix(in srgb, var(--tone) 8%, transparent);
color: var(--tone);
```

The `--tone` CSS variable is already set on the page root (`<main data-tone={project.tone}>`); this rule just opts the chips into it. Each project's stack visually matches its theme color (red for nemesis, cyan for echo-runner, violet for rune-tactics, etc.).

### 3. Challenge card redesign

#### Visual changes

| Element | Before | After |
|---------|--------|-------|
| Left tone-colored bar | 3px `::before` pseudo | **Removed** |
| Card background | `rgba(12,12,12,0.4)` (transparent on dark) | **`#1a1a1a`** (solid, slightly lighter than page bg) |
| Card padding | 22px / 22px / 22px / 28px | **32px** all sides |
| Title size | clamp 1.15-1.55rem | **1.35rem** |
| Title bottom | (no separator) | **18px padding-bottom + 1px hairline border** |
| Title margin-bottom | 12px | **36px** |
| Section labels | mono 0.66rem, muted gray | **mono 0.88rem, `var(--tone)` color, 6px bottom-padding, 1px tone-color underline (display: inline-block)** |
| Section body margin-top after previous body | 18px (via gap) | **36px** (visible breathing room) |
| Label → body gap | 8px | **14px** |
| Outcome special panel | tinted background + tone border + tone text | **Removed — outcome renders identically to problem and solution** |

The label change is the design's keystone. Mono + tone color + underline gives 원인 / 과정 / 결과 the role of an inline section heading without using a real `<h>` element (preserves outline semantics — the card's `<h4>` title still owns the heading).

#### Korean labels

Display strings change in the Astro template (data structure is unchanged):

| Field | Old display | New display |
|-------|-------------|-------------|
| `challenge.problem` | `Problem` | `문제 원인` |
| `challenge.solution` | `Solution` | `해결 과정` |
| `challenge.outcome` | `Outcome` (rendered as special line) | `결과` (rendered as another body paragraph with same label style) |

The outcome is now rendered as just another `<p class="detail-challenge-block">` — same DOM structure as problem and solution. The previous `.detail-challenge-outcome` class and its tinted panel CSS go away.

#### Optional inline photo

A new field on `ProjectChallenge`:

```ts
export type ProjectChallenge = {
  title: string;
  problem: string;
  solution: string;
  outcome?: string;
  image?: string;   // ← NEW: optional. URL string, 16:9 recommended.
};
```

When present, the image renders inside the card between the title and the first label, full-width, `aspect-ratio: 16/9`, with a thin border and a subtle gradient placeholder while loading. When absent, the card flows directly from title to "문제 원인" label as today.

### 4. Top-of-page restructure

The order changes from:

```
eyebrow → H1 → summary → CTA(Play/Source/Devlog) → meta → goal → challenges → gallery → stats → stack
```

to:

```
H1 (with right-aligned Source button) → meta → stack → goal → challenges
```

Removed: eyebrow ("FEATURED·01"), 1-line summary (Project goal already covers this), Play and Devlog CTA buttons, bottom gallery, stats.

The H1 row uses flex with `justify-content: space-between; align-items: baseline` so the Source button hugs the right edge of the H1's container. On narrow viewports (≤720px) `flex-wrap: wrap` lets the button drop below the H1 naturally.

```html
<header class="detail-header">
  <h1 class="detail-title">{project.title}</h1>
  {project.links.source && (
    <a href={project.links.source} class="detail-source" target="_blank" rel="noreferrer noopener">
      ▸ View Source
    </a>
  )}
</header>
```

```css
.detail-source {
  color: var(--tone);
  border: 1px solid var(--tone);
  padding: 8px 14px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
}
.detail-source:hover { background: color-mix(in srgb, var(--tone) 12%, transparent); }
```

The `links.play` and `links.devlog` data fields stay (they cost nothing in the type) but are no longer rendered on the detail page. If a future spec wants those CTAs back, the data is still there.

### 5. Stack position move

Stack chips move out of the bottom area and render right after the meta strip. The DOM order in `[slug].astro`:

```
detail-header (H1 + Source)
detail-meta (4-up dl)
detail-stack (chip row)        ← moved up
detail-narrative (Project goal)
detail-challenges (case-study list)
```

The `Engine` field in meta (e.g., `Unreal 5.3`) intentionally repeats in the stack chips. We're keeping the duplication — it's the most important technical fact and showing it twice within 100 vertical pixels is a feature, not a bug.

## Data shape changes

```ts
// src/data/projects.ts
export type ProjectChallenge = {
  title: string;
  problem: string;
  solution: string;
  outcome?: string;
  image?: string;   // NEW — optional, 16:9 recommended URL
};
```

No other data changes. Existing fields (`stats`, `gallery`, `links.play`, `links.devlog`) remain on the type even though some are no longer rendered, so we don't trigger a wider data file rewrite.

## Decisions made during brainstorming

- **D over A/B/C/E for body text**: white 100% over cream variants. The user explicitly chose maximum readability over palette purity. Pretendard at weight 450 keeps the page feeling Light despite the brighter color.
- **B over A/C/D for stack chips**: outline tone over neutral / filled / partial-highlight. Outline gives visual variety per project without the loudness of filled chips, and avoids the data-side complication of marking "key" tags.
- **Per-card over grouped**: Challenges stay as 01/02/03 with all three of 원인/과정/결과 inside each card. Grouped (all problems together, then all processes, then all results) breaks the narrative — recruiters can't follow "this person faced X, solved with Y, won Z" without cross-referencing index numbers across three sections.
- **A over B/C for card visual** (lighter background + tone-color underlined labels) over (tone-tinted card + filled pill labels) and (heading-style large labels). A keeps the page calm at the project-archive level (5 cards × 3 challenges × tone shouldn't shout) while still elevating the labels.
- **Equal label treatment, not special outcome panel**: User explicitly chose to drop the special tinted outcome line. All three labels (원인/과정/결과) render identically — recruiters get the result through context, not visual emphasis.
- **C over A/B/D for photos**: optional per-challenge inline image. Forcing photos on every challenge (B) would push the user to add filler images they don't have; keeping the bottom gallery (A or D) duplicates the role. Optional + remove gallery is the lowest-cost, highest-yield arrangement.
- **A over B for stack chip position**: chips below meta (clustered with technical context) over chips below H1 (max prominence). The H1 keeps its weight; stack joins the technical-context block.
- **A over B/C/D for Source button**: outline button right-aligned with H1. The user's "moderately visible" requirement matched A's profile better than the others (B is too loud, C buries it, D's sticky overlay distracts during reading).

## Files touched

- `src/data/projects.ts` — add `image?: string` to `ProjectChallenge`. No other data changes.
- `src/pages/portfolio/[slug].astro` — remove eyebrow + summary + 3-button CTA + stats + gallery rendering. Add header row with H1 + Source button. Move stack render up. Add optional `<img>` inside each challenge card. Update label text to Korean.
- `src/styles/portfolio.css` — body text overhaul. Stack chips → tone color. Challenge card: drop `::before` left bar, drop `.detail-challenge-outcome`, raise padding/spacing/title size, swap labels to mono+tone+underline. New `.detail-header` flex row + `.detail-source` button styles. Delete `.detail-stats` and `.detail-gallery` rule blocks (git history retains them if a future spec brings either back).

## Risks

- **Engine field duplicated visually.** Showing "Unreal 5.3" both in meta and stack chips within 80px of each other is intentional, but a small recruiter sample might read it as a templating mistake. Decision is to ship as-is and re-evaluate if anyone flags it.
- **Pretendard font availability.** The detail page now depends on Pretendard rendering correctly for body text. Pretendard is loaded via the same font stack as the rest of the site — already validated. If Pretendard fails to load, system-ui takes over and the visual is still legible (just different).
- **No outcome emphasis.** Removing the tinted outcome panel means the "win" line is no longer visually loudest. The mitigation: outcome content itself is short and includes a measurable claim ("→ 60ms → 8ms") — it survives without special styling. If user feedback says wins disappear, we can re-introduce a subtler emphasis (bolder body weight or tone-color text) in a follow-up spec.
- **Per-challenge image asset burden.** The `image?: string` field is optional, so the immediate burden is zero. But once the user starts filling in real project content, they'll feel the pull to add an image to every challenge. Recommendation in the implementation: add a comment in `projects.ts` explaining "leave undefined when there's no meaningful screenshot — placeholder images are worse than no image."
