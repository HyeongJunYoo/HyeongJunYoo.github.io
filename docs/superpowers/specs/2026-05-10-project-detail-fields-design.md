# Project Detail Page — Goal + Challenges & Solutions

**Date:** 2026-05-10
**Status:** Implemented (placeholder content). Author content fill is the only remaining work for this spec.
**Affects:** `src/pages/portfolio/[slug].astro`, `src/data/projects.ts`, `src/styles/portfolio.css`

## Goal

Replace the lightweight "What I Built" narrative on each project detail page with a richer two-section structure that matches the case-study format used by shipped game programmer portfolios. The new structure makes it easy for a recruiter or hiring manager to answer **What / Why / How** in under 60 seconds without scrolling past the fold.

## Why now

The previous detail page had:

- Title + 1-line summary
- 4-up meta strip (Engine / Platform / Role / Team-Period)
- A single "What I Built" paragraph listing systems
- Gallery + Stats + Stack chips

That layout reads as a feature list, not a case study. Industry guidance ([Game Industry Career Guide](https://www.gameindustrycareerguide.com/what-should-i-put-into-my-video-game-programming-portfolio/), [Wayline](https://www.wayline.io/blog/building-a-game-dev-portfolio), [Vancouver Film School](https://vfs.edu/news/2025/06/20/game-programming-portfolio-tips), Hugo Peters and Dean Tate portfolios) converges on the same structure for game programming work:

1. Project pitch — what's the game, why does it matter
2. Role — what was the author responsible for
3. Specific technical challenges and how they were solved, with measurable outcomes
4. Evidence — gallery, stats, source/play links

This spec adds the missing pieces (1) and (3); pieces (2) and (4) already exist on the page.

## What's added

### 1. Project Goal section

A single paragraph (3-5 sentences) that answers:

- What is this game / system?
- What was the team configuration and the author's role inside it?
- What were the key constraints (platform, time, scale)?
- What did the author personally own end-to-end?

Renders directly under the 4-up meta strip with the same visual weight as the prior narrative section (`.detail-narrative` styling, `<h3>Project goal</h3>` heading).

### 2. Challenges & Solutions section

A numbered list of 1-3 case-study cards. Each card represents one technical problem the author solved on the project. Card fields:

| Field | Required | Length | Purpose |
|-------|----------|--------|---------|
| `title` | yes | 16-30 chars | One-line problem identifier ("30 tickrate hit detection 1프레임 흔들림") |
| `problem` | yes | 2-3 sentences | Why it was hard, who it affected, what would happen if unsolved |
| `solution` | yes | 2-3 sentences | The approach taken, including specific patterns / APIs / techniques |
| `outcome` | optional | 1 line | Measurable improvement ("60ms → 8ms", "패킷 80% 감소") |

Cards stack vertically. Visual hierarchy:

- 3px tone-colored bar on the left edge of each card.
- `01`, `02`, `03` zero-padded index in JetBrains Mono.
- Title in Bricolage Grotesque 800 (clamp 1.15-1.55rem).
- `PROBLEM` and `SOLUTION` mono labels above each paragraph.
- Outcome line painted with `--tone` color, prefixed with `→`, on a tinted background panel — visually the loudest element so the win lands first.

## Page flow after the change

```
1. Hero (16:9 image with HUD brackets)
2. Eyebrow + H1 Title + 1-line Summary
3. CTAs (Play / Source / Devlog)
4. 4-up Meta strip (Engine / Platform / Role / Team-Period)
5. Project Goal              ← new
6. Challenges & Solutions    ← new
7. Gallery (4-up)
8. Stats (3-up)
9. Stack chips
```

## Data shape

```ts
export type ProjectChallenge = {
  title: string;
  problem: string;
  solution: string;
  outcome?: string;
};

export type Project = {
  // ...existing fields unchanged...
  summary: string;             // 1-line hero summary (existing)
  goal: string;                // new — 3-5 sentence pitch
  challenges: ProjectChallenge[]; // new — 1-3 entries per project
  // whatIBuilt removed
};
```

`whatIBuilt` is intentionally removed rather than deprecated. Its content overlaps too much with the Solution fields to keep both — every "what I built" line is the answer to a more specific Challenge.

## Decisions made during brainstorming

- **B over A or C: which sections to add.** Picked Project Goal + Challenges + Solutions over the maximalist (also adding Reflection / Postmortem) and the minimalist (Goal only) options. Three is the sweet spot — adds the recruiter-impact pieces without doubling content authoring effort. Reflection can be added later as a separate section if needed.
- **B over C or D: how to structure Challenges.** Picked Challenge-Solution pairs over a single combined narrative or a 2-column table. Pairs read as "I faced this hard problem, here's how I solved it" — the same pattern as a system-design interview answer. Tables and narratives bury the problem statement.
- **B over A or C: relationship to the existing What I Built.** Picked "remove What I Built and let Challenge Solutions carry that weight" over keeping both. The old What I Built was a flat list; every item there is a candidate Challenge title under the new structure.

## Visual / theming

The `--tone` color flows through every accent on the section: bar on the left of each card, index number, outcome border + text + tinted panel. Each project's tone is unchanged from the existing palette (hot / aqua / violet / lime / orange).

Mobile (≤720px) tightens the card padding from `22px 22px 22px 28px` to `18px 18px 18px 22px` and reduces the title clamp range. The card structure is otherwise identical across breakpoints — content stays single-column.

## Out of scope

- Reflection / postmortem section ("what I'd do differently"). The Wayline / VFS guides flag it as a "nice to have" rather than a must. Add later if the user wants it.
- Code snippets inline in the detail page. Source link in the existing CTA row covers this; embedding code blocks would compete with the case-study reading flow.
- Replacing the hero image with a video / WebM autoplay. The current hero is `<img>` — a future spec can layer in video without touching this layout.
- Translating the placeholder Korean content. The currently-committed content is realistic-looking placeholder for layout testing only; the user will replace with their actual project history before merge.

## Implementation notes

- The Astro template guards the Challenges section behind `{project.challenges.length > 0 && ...}` so a project with no challenges renders cleanly without an empty heading.
- `<ol class="detail-challenges-list">` keeps the list semantic for screen readers; the index span inside each `<li>` is purely decorative (`role="presentation"` not strictly required since it's a `<span>`).
- The outcome line uses `color-mix(in srgb, var(--tone) 8%, transparent)` for the background tint — fails gracefully on browsers without `color-mix` because the alpha-blend is light enough that solid fallback wouldn't be missed.

## Files touched

- `src/data/projects.ts` — type addition, all 5 project records updated.
- `src/pages/portfolio/[slug].astro` — replace `<section class="detail-narrative">What I built</section>` with goal narrative + challenges list.
- `src/styles/portfolio.css` — append `.detail-challenges` block + responsive rules.

## Risks

- **Authoring burden.** Five projects × 2-3 challenges each is 10-15 case-study cards the user must write. The placeholder content shows what "good" looks like; user can write half as much and still beat the prior layout for recruiter signal.
- **Card count creep.** Cap at 3 challenges per project. More than 3 turns the page into a scroll-heavy doc and dilutes the strongest two.
- **Outcome fabrication.** The outcome field strongly invites measurable claims. The user must own actual numbers — fabricating metrics is the fastest way to fail a technical interview after recruiters bring up the portfolio.
