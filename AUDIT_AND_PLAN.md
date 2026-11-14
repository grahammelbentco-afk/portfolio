# Webleta Website MVP V0.1: audit and plan

Date: 2026-11-13. Status: audit and plan only. Nothing was changed, scaffolded or deployed.
Paths are relative to `C:\Users\jaspe\Documents\Webleta\` unless stated.

## 1. What exists
- **No Next.js project exists for Webleta.** No `package.json` or `next.config.*` anywhere under `Webleta/`. Node 24.22.1, npm 11.19.1 and git 2.55 are installed.
- **`Webleta/` is not a git repo.** The `.git` folders found belong to other projects (CT Radar, CT Sentinel, CT Trader Hub, edgeledger, Webtec).
- **Usable base: Preview V2** at `Homepage-Experiments/2026-11-12_TryWebtec-Benchmark_Lagoon-Ember_Split-Arc/`. Plain HTML, CSS and JS with GSAP, about 1,050 lines, 55/55 on its own QA run.
- **Preview V2 sections (11):** frosted nav, hero, intro, services (7), selected work (4), video philosophy, process (5 steps), why Webleta, ways to work (5 tabs), contact form, footer.
- The contact form validates but sends nothing.
- **Live webleta.com** is on GitHub Pages behind Fastly (Wappalyzer scan at `Brand-Discovery/08_Documentation/Live-Site/`). A static or low-cost host is likely.
- **Status of references:**
  - Brand Guidelines V1.6 and Logo Kit V2 are both marked "proposed, not approved."
  - `RESOURCE_INDEX.md` still lists V0.1 as the source of truth and does not mention V1.6 or Kit V2.
  - `Documents/internal foundation - Webleta.txt` says "branding - done - Lagoon Ember", so the palette looks settled. Graham has not signed off on V1.6 itself.

## 2. Tokens, logos, type
Source: `Brand-Discovery/Final/Brand Guideline/brand-guidelines-v1.6.md`, V1.6 `Source/style.css`, and Preview V2 `assets/css/styles.css` (the palettes match).

| Token | Hex |
| --- | --- |
| Deep Water | `#07223B` |
| Ember | `#FF7A3D` |
| Aqua | `#3CCFC3` |
| Seafoam | `#BFF0E3` |
| Shallows | `#EEF7F6` |
| Wet Slate | `#4A6273` |

- **Ember rules:** CTAs and small marks only. No Ember text on light. No large Ember surfaces.
- **Proposed supporting colours (V1.6 p.14):** Ochre `#C99A3C`, Coral Clay `#C4614B`, Dusk Violet `#6B6A9F`, Kelp `#3E7C66`, Shell `#E4BCB2`, Harbour `#2D6AA0`. One per layout at about 5%, never in the logo or on the main button. Leave out of the MVP.
- **Type:** Cabinet Grotesk 700/800 for headings, Instrument Sans for body. V1.6 scale: H1 64px, H2 44px, H3 24px, body 17px. Preview V2 hero: `clamp(3rem, 7.4vw, 7rem)`.
- **Logo files** (approved-for-review Kit V2, outlined SVGs), in `Brand-Discovery/Final/Logo/Webleta-Logo-Kit-V2/Webleta-Logo-Kit-V2/`:
  - Header on dark: `SVG/Horizontal/webleta-horizontal-primary-on-dark.svg`
  - Header on light: `SVG/Horizontal/webleta-horizontal-primary-on-light.svg`
  - Symbol set: `SVG/Symbol/`
  - Favicons: `Favicon/` (including `head-snippet.html`, `site.webmanifest`)
  - Never retype "Webleta" in the font to make a logo.
  - Confirm the Cabinet Grotesk (ITF Free Font License) terms for web self-hosting.
- **Font files:** `Homepage-Experiments/2026-11-12_.../assets/fonts/CabinetGrotesk-{500,700,800}.woff2` and `InstrumentSans-normal-latin.woff2`.
- **Images:** V1.6 `Publication/img/` (g01, g02, g06, g07, g08, g24, g25, g26, m-*) and Preview V2 caustics images and loop. All AI-generated and illustrative, not licensed photography or client work. The "real photos" in `04_Images-and-Videos/` carry a watermark and can't be used.

## 3. Gaps and blockers
- **Graham's Figma could not be read.** The link returned HTTP 403 (login needed) and no Figma export exists locally. The only written homepage direction found is `Documents/note for webleta homepage.txt` (max width 2080px, 8-point grid, side padding on small screens, big type, different colours per section, frosted and rounded, scroll reveals, video and image backgrounds, highlighted text).
- **Preview V2 contains invented content:** four fictional concept projects (Red Gum Cellar Door, Peel and Press, Saltwater Baths Club, and a fourth), seven services, five engagement models, and a five-step process. They are labelled as concepts, but none is confirmed by Graham. Don't ship any as fact. No pricing was found, but not every line of copy was read.

## 4. Implementation path
**Recommend Next.js (App Router) with TypeScript, exported as a static site** (`output: 'export'`), compatible with the current GitHub Pages hosting.
- Preview V2 already has the section structure.
- GSAP ports into client components.
- A form backend can be added later.
- Trade-off: more tooling than a 1,000-line page strictly needs. Astro or plain static HTML would be lighter. React/Next is used as requested.

Port, don't redesign. Preview V2's CSS variables become design tokens.

## 5. Proposed homepage sections (confirm against Graham's Figma)
Hero, what we do (intro), services, ways to work, process, why Webleta, contact. Keep "Selected work" and the philosophy video optional or placeholder until real work and imagery exist.

## 6. Content editing for Graham
**Plain content files in the repo, not a CMS.** A single `content/homepage.ts` (or `.json`) holds all section copy. Graham edits text in one file; changes are reviewed before a rebuild. Needs a Git-literate helper. If he wants visual editing later, add Decap CMS or Sanity then. A CMS now adds a login and hosting to a one-page site.

## 7. Implementation plan with exact paths
New work goes in a new dated experiment folder per `RESOURCE_INDEX.md` conventions. No existing file is touched.

Root: `Homepage-Experiments/2026-11-13_Website-MVP-V0.1_Nextjs/`

```
package.json, next.config.ts (output: 'export'), tsconfig.json
app/layout.tsx, app/page.tsx, app/globals.css
components/Nav.tsx, Hero.tsx, Intro.tsx, Services.tsx, Process.tsx,
           Why.tsx, WaysToWork.tsx, Contact.tsx, Footer.tsx
content/homepage.ts          (all copy; unconfirmed items marked TODO)
styles/tokens.css            (palette, type scale, spacing from V1.6)
public/logo/                 (copies from Logo-Kit-V2/SVG)
public/favicon/              (copies from Logo-Kit-V2/Favicon)
public/fonts/                (copies of Cabinet Grotesk and Instrument Sans woff2)
REPORT.md, screenshots/
```

Steps:
1. Scaffold with `create-next-app` inside that folder only.
2. Copy tokens, fonts, logos and favicons; add `tokens.css`.
3. Port the shell: nav, hero, footer.
4. Port remaining sections, with copy read from `content/homepage.ts`.
5. Check at 1440 and 390px widths; write `REPORT.md`.

No deploy and no paid generation at any step.

## Next safe action
1. Provide Graham's Figma outline (PNG or PDF into `Brand-Discovery/00_Inbox/`, or paste the section list).
2. Approve scaffolding the new folder above; the first checkpoint is the shell only (tokens, logo, nav, hero, footer).
3. Optional: update `RESOURCE_INDEX.md` to point at V1.6 and Kit V2 (not done).
