# Webleta Website MVP V0.1: deployment report

Date: 2026-11-14. Staging only. **webleta.com and its DNS were not touched.**

## Where it lives

| What | Value |
|---|---|
| Repository | https://github.com/jasperdiaz/webleta-website (**private**, branch `main`) |
| Staging URL | **https://webleta-preview.pages.dev** |
| Host | Cloudflare Pages, Free plan, project `webleta-preview`, connected to GitHub (not Direct Upload) |
| Build | Framework preset "Next.js (Static HTML Export)", command `npx next build`, output `out`, Node 22 (`.node-version`) |
| Local source | `Homepage-Experiments/2026-11-13_Website-MVP-V0.1_Nextjs/` (the only folder with a git repo) |

**Automatic deploys:** every push to `main` builds and publishes. This was verified with commit `b3b4e24`: Cloudflare built it unprompted and reported a "Cloudflare Pages: success" check on GitHub.

**How to update the site:** commit in the project folder and run `git push`. The local repo uses the `gh` login for **jasperdiaz** to push (repo-level credential helper). The machine also has a second `gh` account, **jasperdiaz-web**, which is not used for this repo.

## Changes made for deployment

Only these. No site code or design changed.

- `.node-version`: Node 22 for the Cloudflare build image (Next 16 needs at least Node 20.9).
- `public/_headers`: `X-Robots-Tag: noindex, nofollow` on every path. The page already had `<meta name="robots" content="noindex, nofollow">`.
- `.gitignore`: also excludes `screenshots/` (50 MB of review images), QA output files, `__pycache__/` and `.env*`.
- `qa/qa.py` and `qa/shoot_sections.py`: read `QA_URL`, and the network check compares requests against the tested URL's own origin. This lets the suite run against staging.

## Audit (Phase 1)

- `next.config.ts` already had `output: "export"` and `images.unoptimized`. The build produces a valid `out/` folder (5 MB, `index.html` + `_headers`).
- No API routes, server actions, middleware, `process.env` use, `.env` files, keys or tokens.
- The contact form has no backend. It opens the visitor's email app with the request filled in (`mailto:`), so static hosting is fine.
- The repo has 124 files (3.5 MB): source, fonts, WebP images, logos, QA scripts and docs. `node_modules`, `.next`, `out` and screenshots are excluded.
- Fonts: Cabinet Grotesk (Fontshare free licence) and Instrument Sans (OFL), both self-hosted. Images are AI-generated illustrations (fal) reused from V1.6 and Preview V2. No licensed stock or watermarked photos.

## Verification (Phase 4), against https://webleta-preview.pages.dev

- Page, images, logos, favicon, manifest and the three Cabinet Grotesk font files all return 200. An unknown path returns 404.
- The `x-robots-tag: noindex, nofollow` header and the robots meta tag are both live.
- Every in-page link (`#services`, `#work`, `#reviews`, `#pricing`, `#contact`, `#top`, `#main`) has a matching section. There are no external links.
- Full QA suite run live (`QA_URL=https://webleta-preview.pages.dev/ python -I qa/qa.py`): **139/140**. The one failure is the known flaky "shader still frame" pixel check, which also fails about one run in three locally. Covered:
  - layout at 1440, 768 and 390 with no overflow
  - hero motion, shader, header states, logo and nav hover
  - Benefits carousel, Pricing tabs (click and keyboard), Steps compare slider (keyboard)
  - contact form validation and the `?website=` handoff from the hero
  - reduced motion, no-JS fallback, layout shift under 0.1, and no requests to other domains
- **Sensitive data:** none found in the published build. No personal email, file paths or internal notes ("Graham", "UNCONFIRMED" and similar appear only in source comments, not in the output). The shown contact details are the unconfirmed `hello@webleta.com` and the dummy WhatsApp number `+61 491 570 156` (an ACMA fiction range that can't reach anyone).

## Remaining issues

1. **The site is public, by Jasper's choice (no Cloudflare Access).** Anyone with the link can see it. Search engines are told not to index it. It still shows content that isn't real:
   - fictional reviews with named people
   - fictional client names
   - placeholder prices
   - four concept projects (these are labelled "Concept" on the page)

   Replace these, or remove those sections, before the link is shared widely or the site moves to webleta.com. Everything is flagged `UNCONFIRMED` in `content/homepage.ts`.
2. **Contact email** `hello@webleta.com` isn't confirmed. If the mailbox doesn't exist, form requests bounce.
3. **No form service.** Requests depend on the visitor having an email app set up. Add a form service (for example Formspree or Cloudflare's own) before launch.
4. **WhatsApp:** the button goes to `#contact` until a real business number is set (`whatsapp.number` in `content/homepage.ts`).
5. **Preview deployments:** pushes to branches other than `main` get their own `*.webleta-preview.pages.dev` URLs, which are public too.
6. **Before going live on webleta.com:** remove `public/_headers` and the `robots` line in `app/layout.tsx`, and get Graham's sign-off on the open brand points in `REPORT.md`.
