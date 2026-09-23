# Masters of the Design · Geometry Study

An interactive study of the Sufi Enneagram and eleven Naqshbandi principles. One generated geometric sign changes through a prologue, eleven principles, and an epilogue. The relationships between the sign and the principles are contemporary visual interpretations; the site distinguishes them from the historical sources.

**[Explore the live site](https://jameel7007.github.io/masters-of-design-geometry-study/)**

## What you can explore

- See a point develop into a circle, nine equally spaced positions, the `9 → 3 → 6` triangle, the `1 → 4 → 2 → 8 → 5 → 7` movement line, and a smaller heart triangle.
- Move through eleven scenes that change the behavior of the same sign, with an overview and source/interpretation notes.
- Read the [research and source distinctions](RESEARCH.md) and the [experience specification](SPEC.md).

The geometry is calculated from a center, radius, and angular divisions. The project does not assign the eleven principles to nine positions as a historical claim.

## Run locally

Requires **Node.js 22.13 or newer** and npm.

```bash
git clone https://github.com/Jameel7007/masters-of-design-geometry-study.git
cd masters-of-design-geometry-study
npm ci
npm run dev
```

Open the local address printed by the development server. To check a production build, run `npm run build`. The repository also has `npm run lint`. GitHub Pages uses `npm run build:pages` with a repository-specific base path; the deployment steps are in [`.github/workflows/pages.yml`](.github/workflows/pages.yml).

## Where to start in the code

| File | Purpose |
| --- | --- |
| [`app/page.tsx`](app/page.tsx) | Scene data, geometric construction, interaction, and page composition |
| [`app/globals.css`](app/globals.css) | Visual system and responsive styles |
| [`app/layout.tsx`](app/layout.tsx) | Document metadata and root layout |
| [`next.config.ts`](next.config.ts) | Static export settings for GitHub Pages |
| [`RESEARCH.md`](RESEARCH.md) | Source evidence, interpretive limits, and terminology |
| [`SPEC.md`](SPEC.md) | Narrative sequence and design decisions |

Built with React, TypeScript, Next.js, and Vinext. The current scene implementation is primarily in `app/page.tsx`; the research and specification explain which elements are sourced and which are artistic choices.
