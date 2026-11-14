# Webleta Website MVP V0.1: report

Date: 2026-11-13. **Status: internal preview for Jasper and Graham.** It's not deployed and not the live site. Split Arc and Lagoon Ember are confirmed by Jasper; Cabinet Grotesk is the heading face.

- **Phase 1:** foundation, Header, Hero and Footer, with placeholders for every other section.
- **Refinement 1:** Header, Hero, stats rail, full-width layout and pill buttons.
- **Revision 2 (this round, desktop first, 1440px):** Header, Hero and the stats and trust band, made to read like a live site.

Work stops here for visual review. Services and the other sections haven't been started.

---

## Revision 45: CTA back to the studio desk, centre cleared (latest)

- **Ask (Jasper):** he prefers the Revision 43 studio-desk photo; make it less busy instead of replacing it.
- **Edit (fal flux-pro/kontext, $0.04 each, 2 edits, $0.08):** the source is `cta-call-b`. In edit A (used, `public/images/cta-studio-*.webp`), the two laptops, the sketch sheets and the typing hands are removed from the middle. The lamps, gear, mug, plant and the person's head stay at the edges. Edit B kept the laptop and hands, which would sit under the platform chips. The output is 1392×752, which is enough behind the veil. The veil is a 55% centre radial plus a light floor.
- **CTA photo spend, Revisions 42–45:** $0.32.

## Revision 44: CTA photo with a clean centre

- **Ask (Jasper):** the Revision 43 desk photo was too busy behind the text. Keep objects outside the text area, or only slightly overlapping it.
- **New photo (fal flux-pro v1.1-ultra, 21:9 raw, 2 generated, $0.12):** `cta-edges-c` is used (`public/images/cta-edges-*.webp`): a Deep Water desk from above, with a laptop, notebook and brass lamp only at the corners and the centre empty. `cta-edges-d` (phone and mug) is an alternate. With the clean centre, the veil is now a light radial (45% Deep Water at the centre), down from 78%.
- **CTA photo spend, Revisions 42–44:** $0.24 (4 images).
- **QA:** `qa/qa.py` 146/146 (the shader check is flaky as before).

## Revision 43: CTA banner centred, new photo

- **Ask (Jasper):** follow Graham's centred CTA references ("Be the name they say", "Need a WordPress production partner?") in our brand, with centred text and buttons. Rewrite the copy with the humanizer skill and generate one new image that fits. It must transition well from Services (white) to Steps (Seafoam).
- **Layout:** an inset Deep Water panel on the white ground under Services, over a full-bleed photo with a Deep Water veil (heaviest at the centre). Everything is centred:
  - an eyebrow pill
  - the headline, using the hero's device (gradient phrase on line one, outline word on line two)
  - one line of text
  - **Ember** "Book a 30-minute call" and a glass "See pricing" button
  - a row of the platforms we build on (WordPress, Next.js, Astro, React, Google)

  The panel's top-right corner has the same 24° cut as the Services tiles. Revision 42 (photo on the right, text on the left) was replaced at Jasper's request.
- **Copy (humanizer pass, UNCONFIRMED):** "Need a web partner who actually ships?" / "Book a 30-minute call. Tell us about your business or your agency's workload, and we'll come back with a plan and a price." The 30-minute length needs Graham's confirmation.
- **Photo (fal flux-pro v1.1-ultra, 16:9 raw, $0.06 each, 2 generated, $0.12 in total):**
  - `cta-call-b` is used (`public/images/cta-desk-*.webp`): an overhead studio desk at night, two people working at opposite ends, a dark empty centre for the text. No text cleanup was needed.
  - `cta-blue-hour-a` (a corner shop at dusk; garbled sign lettering painted out in the web copy) was used in Revision 42 and then replaced. Its `cta-shop-*.webp` files are left in place.
  - Both are in `manifest-2026-11-14-services.csv`. `cta-caustics` is no longer used.
- **QA:** `qa/qa.py` **146/146**, with no overflow at 1440 and 390. Screenshots: `screenshots/2026-11-14_cta-r42/`.

## Revision 41: Services bento made our own, type and contrast aligned (latest)

- **Ask (Jasper):**
  - He prefers the Revision 40 first-pass structure (hero left, tiles right, a bottom row), but made our own rather than a copy of the reference.
  - Remove the half-moon sparks.
  - Fix the corner residue and the cut-off look on Content marketing.
  - Match fonts and the highlighter to the established sections.
  - Check contrast.
  - Icons: lighter glass, all white. Logos: white discs with a ring in the tile colour, as before.
- **Layout (12 columns):**
  - Rows 1–2: **Website design and development** (hero, Aqua, 6 columns × 2 rows) | **Web applications**, wide across the top right on the laptop with a new coded **job-booking dashboard** | **SEO** and **Email marketing** under it.
  - Row 3: three equal tiles: **Social media marketing**, **Content marketing**, **Mobile apps**.
  - The call tile is now a closing text line under the grid: "Not sure where to start? … Book a call".
  - At 640–1023px: 2 columns. Below 640px: 1 column.
- **Ours, not the reference's:**
  - Every tile's top-right corner is **cut at the Split Arc's 24° channel** (a white notch; the tile's top-right radius is 0). The spark in the notch was tried and removed at Jasper's request.
  - On hover, the duotone photo gives way to the **photo's real colour** (a second, untinted image fades in over 700ms; off under reduced motion).
- **Corner residue (cause and fix):** the tile clips its children to its rounded corner, so the white notch was clipped on the same curve. The anti-aliased edge left an arc of tile colour. The notched corner is now square. A hairline edge (8% Deep Water) on every tile, plus a top tint on the pale Shell tile, keeps Content marketing's corner visible against the white page.
- **Type, matched to the established sections:**
  - Section title uses the shared `.sec-title` (700, `clamp(2.25rem … 4.75rem)`, −0.04em).
  - Tile titles match the Benefits card titles (700, `clamp(1.5rem … 2rem)`, −0.03em). The hero tile is 700, up to 3.5rem.
  - Body text matches the Benefits card body (15px, 400, line height 1.5).
  - The heading highlighter is **Seafoam at 0.34em**, exactly as in About. It was Aqua.
- **Icons:** very subtle frosted glass (8px blur), a two-tone hairline border (40% white inside, 10% Deep Water outside) and a soft shadow under the chip, with no shadow on the glyph. The glyph colour follows the photo behind it: **Deep Water** where the corner is light (Website design, SEO, Social, Content: `lightCorner` in `content/homepage.ts`, glass 30% white) and **white** where it's dark (Web apps, Email, Mobile: glass 14% Deep Water). **Logos:** white discs with a 2px ring in the tile colour, overlapping.
- **Contrast, measured from rendered pixels** (`qa/contrast_services.py`: text and icons hidden, background captured, WCAG ratio at the darkest 5% of pixels), at 1440 and 390:
  - Titles: 4.3–10.4:1. Needs 3:1, as large text.
  - Body: 5.5–10.6:1. Needs 4.5:1.
  - Icons: **4.4–19.5:1** at 1440 and 390. Needs 3:1. All pass, including Web apps on mobile, which was 3.0:1 until its glass took the faint Deep Water tint.
- **Awwwards MCP:** searches for bento, cards and grid returned nothing usable.
- **QA:**
  - Services checks updated: order, device photos cover their tiles, all photos duotone, 7 corner cuts, hover brings back the true colour, hero tech logos.
  - The closing line sits in its own container, so it passes the side-padding check.
  - `qa/qa.py` **146/146**.
- Screenshots: `screenshots/2026-11-14_services-r41-own/`.
- **No fal spend. Not pushed.**

## Revision 40: Services colour-blocked after Graham's reference, core services first

- **Ask (Jasper):**
  - The section didn't pop. Follow Graham's colour-blocked reference ("Ten services. One goal.").
  - Then reshuffle the rows and columns so it doesn't copy the reference, and let the core services stand out more than the optional ones.
  - Rewrite the copy in our own voice (humanizer skill) and use existing images.
- **Content source:** Notion's "Agency Business Model & Positioning Notes" (Nov 12, 2026), with seven proposed services, the same as V1.6 p.5.
  - Notion says which services launch first is still open, so the Revision 39 Available now / Coming soon split is gone.
  - The hero's logos (WordPress, Next.js, Astro, React) follow Notion's "flexible technology stack" principle (Nov 14).
  - Core services follow Notion's "web design/development as the clearest core starting offer", then web apps and SEO.
- **Layout (12 columns, white ground):**
  - Rows 1–2: **SEO** and **Web applications** stacked (5 columns each), beside the **Website design and development** hero (7 columns × 2 rows, Aqua). The hero is on the right, a mirror image of the reference.
  - Row 3, a shorter row of supporting services with smaller titles: Email marketing, Social media marketing, Content marketing, Mobile apps.
  - Row 4: a full-width "Not sure where to start?" strip.
  - At 640–1023px: 2 columns. Below 640px: 1 column.
- **Look:**
  - Solid colour blocks: an **Aqua** hero, then **Ochre**, **Harbour**, **Dusk Violet**, **Kelp**, **Shell** and **Coral Clay**, plus a Deep Water strip.
  - Existing photos in **duotone** (`mix-blend-mode: luminosity` over the tile colour).
  - The hero's graphic is a rising "enquiries" chart with an outlined axis word and a small **Ember** spark at the peak.
  - The heading uses the brand Aqua highlighter.
  - Email and Mobile reuse the blank-screen laptop and phone with new coded screens: a Harlow Joinery newsletter and a booking app.
- **Copy (humanizer pass):**
  - Heading: "Websites first. The rest brings people to them."
  - Every blurb was rewritten plain, with no contrasts or sales language. All **UNCONFIRMED**.
- **Images:** all existing (`svc-*`, `bento-wordpress`, `bento-seo`). **No fal spend.**
- **Removed:** the Revision 39 screens (WordPress editor, Google results, design-to-page, care dashboard) and their CSS. The image files stay.
- **⚠ For Graham:** all six supporting colours in one section (V1.6 says one per layout); third-party logos; the service hierarchy.
- **QA:** the Services checks were replaced with 4 new ones:
  - Notion's seven services, in order
  - device photos cover their tiles
  - all six photos are duotone
  - the hero shows WordPress, Next.js, Astro and React

  `qa/qa.py` **144/144** on the final run (the flaky shader check passed this time).
- Screenshots: `screenshots/2026-11-14_services-r40-colour/`.
- **Not pushed.**

## Revision 39: Services as a true bento, each tile showing the service in use

- **Ask (Jasper):** Graham wants a bento. The Revision 38 photos were out of context. Each tile should show the service's real-world use, with real platform logos. Permission to generate new images.
- **Layout (12 columns, Deep Water):**
  - Row 1–2: **WordPress development** (6×2) | **SEO support** (3×2) | **Design implementation** (3×2).
  - Row 3: **Website production** (6, horizontal on desktop) | **Web emails** (3) | **Social media** (3).
  - Row 4: **Web and mobile apps** (3) | **Content marketing** (3) | **"Not sure which you need?"** call tile (6, ripples).
  - At 640–1023px: 2 columns. Below 640px: 1 column.
  - A legend in the heading (● Available now ○ Coming soon) replaces the row labels.
- **Live tiles = the service in use:** a fal device photo with a **blank screen**, plus a **coded interface laid exactly on the glass**, over a caption band in the tile's V1.6 supporting colour.
  - WordPress (**Harbour**): laptop showing a WordPress block editor with Harlow Joinery's hero block selected.
  - SEO (**Ochre**): phone in hand showing Google results for "joiner fremantle", with Harlow Joinery first, ringed in Ochre.
  - Design (**Dusk Violet**): tablet showing a design frame with selection handles above the finished page.
  - Production (**Kelp**): no photo. A site-care dashboard (core up to date, plugins updated, backup, security scan, 30-day uptime bars).
  - Screen positions were **measured from each photo** (flood fill of the blank screen). Photo and screen share one "stage" that covers the tile like `object-fit: cover`, so they stay aligned at every width. The screens are HTML and CSS sized in container units, so they stay sharp.
- **Real logos:** Simple Icons SVGs (CC0 data; the marks belong to their owners), saved locally in `public/brands/si/` (no requests to other domains) and shown in brand colours on white discs.
  - WordPress (WordPress, Production), Google (SEO, Content), Figma (Design), Gmail (Web emails), Apple and Android (Apps), Instagram, Facebook, TikTok and LinkedIn (Social).
- **Coming-soon tiles:** a dashed outline over 24° channel hairlines, a "Coming soon" chip and their platform logos.
- **Bug found and fixed:** container-query height (`cqh`) resolves to 0 on a flex-stretched container in Chrome, which letterboxed the photos. The container is now an absolutely inset `.box`.
- **Photos (fal flux-pro v1.1-ultra, raw, $0.06 each): 6 generated, $0.36, 3 used:** `bento-laptop-a` (16:9), `bento-phone-a` (4:3) and `bento-tablet-b` (4:3, portrait tablet). Alternates are kept. Manifest rows were appended to `manifest-2026-11-14-services.csv`. Services spend across Revisions 38–39: **$0.84**.
- The Revision 38 `svc-*.webp` photos are no longer used. They're left in place.
- **UNCONFIRMED:** the service list and split, all copy, and the on-screen details (Harlow Joinery is the fictional concept business; "12 updated" and similar figures are illustrative). Logo use should be cleared with Graham.
- **QA:** the Revision 38 checks were replaced with 5 bento checks:
  - 4 live + 4 coming-soon tiles
  - every device photo covers its tile
  - coded screens sit inside their photos
  - 12 platform logos
  - every coming-soon tile says so

  `qa/qa.py` **144/145**. The one failure is the known flaky shader check.
- Screenshots: `screenshots/2026-11-14_services-r39-bento/` (1440, 1024, 390, per-tile shots, and `screen-*@2x.png` close-ups).
- **Not pushed.**

## Revision 38: Services redesigned as an expanding bento

- **Ask (Jasper):** don't copy the reference layout. Make our own premium bento, keep Graham's content and structure, use the supporting colours, generate photos with fal, and use the Awwwards MCP.
- **Content (Graham's reference, his dark eight-card grid):** his eight services and his **Available now / Coming soon** split.
  - Available now: WordPress development, Design implementation, Website production, SEO support.
  - Coming soon: Web emails, Web and mobile apps, Social media, Content marketing.
  - The copy is adapted to read for both businesses and agencies. Each live service has three short points. All **UNCONFIRMED** in `content/homepage.ts`. This replaces Revision 37's V1.6 seven-service list.
- **Design (Deep Water ground, like Graham's reference):**
  - **Available now:** an expanding row of four photo tiles. One is open at a time. Hover, keyboard focus or a tap opens a tile, and it grows to 3.4× the width of the others (720ms, brand ease-out). The open tile shows its photo in full colour with its **V1.6 supporting colour** rising from the bottom, its icon, text and points, and the **24° channel cut** in its top-right corner. Closed tiles turn into dark, desaturated spines with a vertical title and a colour dot. Colours: WordPress **Harbour**, Design **Dusk Violet**, Production **Kelp**, SEO **Ochre**.
  - **Coming soon:** four quiet dashed-outline tiles over **24° channel hairlines** (V1.6 p.16), with no photos, so "ready" and "not yet" read apart at once. On hover the hairlines drift.
  - **Closing line:** "Not sure which you need? Book a call."
  - **Mobile (<960px):** every live tile is shown open and stacked, each with the cut.
- **Accessibility:** each tile's title is an `h4` button with `aria-expanded`/`aria-controls`, so focus opens the tile. Under reduced motion, all transitions are off.
- **Awwwards MCP:** the elements index returned nothing for bento, services or expanding-gallery searches, and the SOTD agency results weren't useful for a services grid. No reference was used.
- **Photos (fal flux-pro v1.1-ultra, 1:1 raw, $0.06 each): 8 generated, $0.48 in total, 4 used.**
  - Used: developer at a navy wall (`svc-wordpress`), hands with layouts and violet swatches (`svc-design`; its garbled printout heading was painted out in the **web copy only**, `05-web-cleaned/2026-11-14/service-design-a-clean.jpg`), nursery owner with a tablet (`svc-production`), man on an ochre wall with leaf shadows (`svc-seo`).
  - Rejected: laptop showing a video-call grid, and three SEO shots with garbled signs or sleeve text.
  - Manifest: `Webleta-AI-Generated-Images/manifest-2026-11-14-services.csv`.
- **Also:** the CTA banner now has white space above its panel (`padding-block: var(--section-y)`), so the dark panel doesn't sit right against the dark Services section. The Revision 37 `service-*.webp` files are no longer used. They're left in place, not deleted.
- **⚠ For Graham:** all four supporting colours in one section (V1.6 says one per layout), as Jasper asked. He should also confirm the service list and which services are available now.
- **QA:** 3 new checks (4 + 4 tiles; hover opens that tile and it's the widest; keyboard focus opens a tile with `aria-expanded` following). The side-padding check now exempts closed tiles, whose text is hidden and clipped. `qa/qa.py` **142/143**. The one failure is the known flaky shader check.
- Screenshots: `screenshots/2026-11-14_services-r38/` (rest, SEO hovered, mid-transition, 390).
- **Not pushed.** Staging is unchanged until Jasper says push.

## Revision 37: every remaining section, down to the footer

- **Ask (Jasper):** build all the remaining sections in one go, following Graham's outline and references. Jasper will revise what he doesn't like afterwards.
- **Order (Graham's outline):** Services → CTA banner → Steps (marked optional in the outline, built anyway) → Work → Reviews → Clients → Pricing → Contact → Footer. Not built: Graham's "Additional sections" (Business industries, FAQ). No placeholder sections are left.
- **Grounds:** white, dark panel, Seafoam, Deep Water, white, Abyss strip, Shallows, Deep Water. Every section sets `data-ground`, so the header switches correctly.
- **No fal spend.** Images are copies of files that already existed: V1.6 g24, g22, g11 and g07 (Services), plus Preview V2's caustics and four concept-project photos (CTA, Steps, Work). They live in `public/images/{service,cta,work}-*.webp`. The originals weren't touched.

| Section | Graham's reference | What makes it ours |
|---|---|---|
| **Services** (`Services.tsx`) | "Ten services. One goal." bento | The V1.6 p.5 list (7 services). Website design is the big tile, with the **24° channel cut**. Core palette only, plus a "Not sure what you need?" tile with a call button |
| **CTA banner** (`CtaBanner.tsx`) | "Be the name they say" | An inset Deep Water panel lit by the **caustics photo** (water light, the Lagoon). Ripples in the corner. "Let's make *yours*." uses the hero's outline device on one word |
| **Steps** (`Steps.tsx`) | "See it before we build it" | Three numbered steps (a real sequence) and a **draggable before/after compare**: a generic template site against a Harlow Joinery preview. It's a native range input, so it works with keyboard and screen readers. Ties to the band's "See it first" hook |
| **Work** (`Work.tsx`) | "Portfolio, freedom of display" | Four concept sites, each drawn as a live homepage in **its own palette and typeface** (serif winery, heavy juice bar, light swim club, mono joinery) inside browser frames. It shows "look nothing alike" rather than saying it. Each is **labelled "Concept"** on the page |
| **Reviews** (`Reviews.tsx`) | "Text based for now, reserve space for portrait video" | A **9:16 portrait card** with the featured quote, so a portrait video can replace its contents later without a layout change. Three text reviews beside it |
| **Clients** (`Clients.tsx`) | Dark logo strip | A slim Abyss strip. The names are set in type, each with its own character, because there are no logo files |
| **Pricing** (`Pricing.tsx`) | Three plans, one featured | A **"For local businesses / For agencies" switch** (the hero's two audiences) using the V1.6 p.5 ways to work. The featured plan is Deep Water with the section's one Ember button. Spark markers are the bullets |
| **Contact** (`Contact.tsx`) | "Tell us your win" | The form fills the website field from the hero switch's `?website=`. It has goal chips (the same four wins as Benefits). **Sending opens the visitor's email app** with the request filled in, because no form service exists. Nothing pretends to send |

- **⚠ Everything below is placeholder, flagged UNCONFIRMED in `content/homepage.ts`. Replace it before launch:**
  - **Prices and terms:** every figure ($2,400 / $190 a month / $95 an hour; agencies $85 an hour / $1,800 / $3,200 a month) is made up. V1.6 says pricing isn't in the book.
  - **Reviews:** four fictional reviewers. These need to be real reviews, used with permission.
  - **Clients:** six fictional names. These need real clients, with permission to show each logo.
  - **Work:** four fictional concept projects (from Preview V2), labelled "Concept" on the page.
  - **Contact email** `hello@webleta.com`: it appears only in older notes.
  - **Free preview offer** (Steps): Graham hasn't confirmed it.
- **Departures to flag for Graham:** V1.6 calls for one Ember moment per layout. The CTA banner, Steps, Pricing and Contact each have an Ember main action (one per section).
- **QA:** 16 new checks: all eight sections built, no placeholders left, new images load, no overflow at 1440 and 390, the contact form picks up `?website=`, the pricing tabs (click and arrow keys, one Ember button per audience), the compare slider with the keyboard, empty-form validation, and the Work concept labels. The hero toggle checks are now scoped to `#top` because Pricing adds a second tablist. `qa/qa.py` **139/140**. The one failure is the known flaky shader still-frame check.
- Screenshots: `screenshots/2026-11-14_remaining-sections/` (`<section>-1440.png`, `<section>-390.png`). Re-shoot with `python -I qa/shoot_sections.py` while the preview runs.

## Revision 36: Benefits rebuilt as a six-story carousel

- **Ask (Jasper):** Revision 32 was "a good start but not there yet". Follow Graham's reference (a scrollable row of outcome cards with prev/next, real photos and floating UI) without copying it. Six stories, not four. fal generation approved, and use the supporting colours.
- **Ours, not the reference's:**
  - **Channel cut:** every photo's top-right corner is cut at the Split Arc's 24° (V1.6 p.16 identity element).
  - **One V1.6 supporting colour per story, matched to V1.6's "Use for" notes:** Sales/Retail **Coral Clay** ("retail stories"), Bookings/Salons **Dusk Violet** ("the evening sky", for booking at 10pm on a Sunday), Quotes/Trades **Harbour**, Found first/Food **Kelp** ("growth and SEO stories"), Calls/Automotive **Ochre**, Taken seriously/Health clinics **Shell**. Each colour drives the tag spark, a colour wash rising from the bottom of the photo, the title marker (the About highlighter device) and the accent in the UI card.
  - **UI card breaking the frame:** a small website moment overlaps each photo's bottom edge: new order, time picker, quote request sent, local search result, an incoming call with a pulsing ring, and "Meet the team".
  - **Rhythm:** every second card sits 56px lower on desktop.
- **Carousel:** native horizontal scroll with snap (swipe, trackpad, and arrow keys on the focused track). **Previous/Next** buttons move exactly one card and disable at each end, and a thin progress line fills as you go. The track starts aligned with the heading and runs to the window's right edge, so the next card peeks in. Reduced motion jumps instead of smooth-scrolling.
- **Photos (fal flux-pro v1.1-ultra, 3:4 raw, $0.06 each):** 10 generated, **$0.60** in total. 6 used: potter packing an order, salon, plumber at his ute, bakery counter, mechanic on a call, physio clinic. 4 rejected: tiny mirror subjects, garbled bakery sign, and two alternates. The plumber's garbled shirt logo, patch, stickers and number plate were filled in the **web copy only** (`05-web-cleaned/2026-11-14/`). Manifest: `Webleta-AI-Generated-Images/manifest-2026-11-14-benefits.csv`. Web copies: `public/images/benefit-*-{480,800}.webp`, cropped 4:5.
- **Copy:** `benefits` in `content/homepage.ts`, **UNCONFIRMED**. Business names, items and prices in the UI cards are fictional.
- **⚠ Departure to flag for Graham:** V1.6 says one supporting colour per layout (~5%). This section uses all six, one per story card, as accents only (no large flat fills). Jasper asked for the supporting colours here.
- **QA:** Benefits checks updated (6 cards; starts at the first card with Previous disabled; Next moves exactly one card; Next disabled at the end; no overflow at 1440 and 390). The edge-padding check now exempts carousel cards, which run past the edge by design. `qa/qa.py` **124/124**.
- The Revision 32 `public/images/benefit-potter-*.webp` files are no longer referenced. Left in place, not deleted.
- Screenshots: `screenshots/2026-11-14_benefits/` (`benefits-1440-full.png`, `benefits-1440-scrolled.png`, `benefits-390-view*.png`).

## Revision 35: nav link hover

- **Ask (Jasper):** an elegant, premium hover on the nav links.
- **Effect:** a staggered **letter roll**. Each letter carries a white copy of itself one line below (via `text-shadow`). On hover the letters lift one line from left to right, 24ms apart, on a slow ease-in-out (640ms), so the Cloud word rolls out and the white word rolls in. A small **Aqua spark marker** (V1.6's list device) turns and settles into place just left of the word. Keyboard focus triggers the same effect. Under reduced motion it's a plain colour change and the spark fades in.
- **Accessibility:** the letters are `aria-hidden`, and each link carries its name as `aria-label`, so screen readers hear "Services", not single letters. Link size and layout are unchanged.
- **QA:** 2 new checks (link names intact; letters rolled and spark shown on hover).
- Screenshots: `screenshots/2026-11-14_nav-hover/sheet.png` (rest → 120ms → 250ms → settled).

## Revision 34: header logo hover

- **Ask (Jasper):** the logo should react on hover, for example by colouring the small half or closing the halves into a circle with the divider still showing.
- **Effect:** on hover or keyboard focus, the Split Arc's two halves slide from their Logo Kit offsets (big half −8,+8, spark +12,−26) to 0,0. That closes them into one full circle, and the parallel 24° channel stays open as the divider. The spark turns **Aqua**, matching the site's teal-spark logo. It takes 520ms on the brand ease-out curve and reverses on mouse-out. Under reduced motion only the colour changes.
- **How:** `components/HeaderLogo.tsx` inlines the exact Logo Kit V2 white lockup paths (copied from `public/logo/webleta-horizontal-white.svg`, nothing retyped), so the halves can move. At rest it's pixel-identical to the old `<img>`. The footer logo is unchanged.
- **QA:** 2 new checks (at-rest offsets and white; on hover closed and Aqua). `qa/qa.py` 115/116. The one failure is the known flaky shader still-frame check (Revision 31).
- Screenshots: `screenshots/2026-11-14_logo-hover/` (rest, mid, hover).

## Revision 33: dark header over light sections

- **Problem (Jasper):** over white and Shallows sections, the header's 72% Deep Water glass mixed into a muddy slate-grey bar with weak contrast.
- **Fix:** the header checks which section sits under it (every section carries `data-ground="light|dark"`) and sets `data-over`. Over light sections it goes **near-solid Deep Water (96%)** with a faint hairline and shadow. Over the hero and other dark sections it keeps the frosted glass. The colour change fades over 320ms. It updates on scroll (rAF-throttled) and on resize.
- New sections only need `data-ground` on their `<section>` and the header follows automatically.
- **QA:** 4 new checks (glass over the hero, solid over About and Benefits, glass again over a dark section). `qa/qa.py` **114/114**.

## Revision 32: Benefits section

- **Brief:** Graham's outline: "Pros of having digital presence, more sales / more booking, create dummy for now". His reference is the four-card "Every business wins differently" row.
- **Layout (Shallows ground):** "Why it pays off" eyebrow, the heading **A good website brings work in.** and a short intro on the right. Below are four staggered outcome cards (the 2nd and 4th sit 80px lower, like the hero cards), each showing the moment on a site where that benefit happens:
  - **More sales** (white): the V1.6 potter photo (g06, already generated, no spend) with a "New order · Stoneware bowl × 2 · $84" chip.
  - **More bookings** (Deep Water): a time picker with 10:30 selected and an Ember "Book 10:30" button.
  - **More quote requests** (Seafoam): a quote form with a "Request sent" state.
  - **Found first** (white): a "florist near me" search and a local result card, with no stars or ratings.
- **Built in code, not images:** the UI moments are HTML/CSS, so they stay sharp and editable. They're decorative (`aria-hidden`), and the card titles and text carry the meaning. All names, items and prices are **fictional examples**, flagged in `content/homepage.ts`.
- **Motion (CSS scroll timelines):** cards rise as they enter, each UI detail pops in once it's fully on screen, and the potter photo slowly settles. Everything shows at rest under reduced motion.
- **Copy:** `benefits` in `content/homepage.ts`, **UNCONFIRMED** placeholder copy with no statistics.
- **QA:** 8 new checks. The image check now fetches lazy-loaded images directly instead of failing on ones not yet scrolled to. `qa/qa.py` **110/110**.
- Screenshots: `screenshots/2026-11-14_benefits/`.

## Revision 31: About section

- **Brief:** Graham's outline says "About us: freedom for creativity", with the layout left to us. Jasper signed off the hero, so this is the first section after it.
- **References (Awwwards MCP):** **Signal-A Studio** (SOTD), a full-width studio statement in mixed weights, and **AUGE Experience** (SOTD), an editorial split of a large image beside a short block of text.
- **Layout (white ground, 12 columns at desktop):**
  - "About Webleta" eyebrow with an Aqua spark, then a large statement from V1.6 p.3: *Webleta designs and builds websites for local businesses, and for the agencies that serve them.* The two audiences get a Seafoam highlighter band.
  - **Arc crop (V1.6 p.16):** the V1.6 nursery photo (g26, already generated, no new spend) clipped to the Split Arc's larger half, with the Aqua spark beside it so the pair reads as the symbol. Caption: "The kind of business we build for." On desktop the photo stays pinned beside the story while it scrolls.
  - **Story:** V1.6 p.4's "Templates made websites easy to launch…" as a subhead, one short paragraph, then the two audiences as a spark-marker list (Ember on local businesses only), three facts (Where / How / Care, from V1.6 p.5) and a "See the work" link.
- **Motion (CSS scroll timelines, no JS):** statement words fill from Cloud to Deep Water as the section scrolls in, the photo settles from 1.14× to 1×, and the spark drifts into place. Under reduced motion or without browser support, everything shows in its final state.
- **Copy:** in `about` in `content/homepage.ts`, all **UNCONFIRMED** until Graham approves V1.6 p.3–5. V1.6's AI-assisted-tools paragraph is left out (Jasper: no mention of tools or AI).
- **Files:** `components/About.tsx`, `components/About.module.css`, `public/images/about-nursery-{720,1280}.webp` (copies of V1.6 `g26-nursery.jpg`; the original is untouched). `app/page.tsx` renders About in place of the placeholder.
- **Checks:** build passes, lint 0, `qa/qa.py` **101/102**. There are 9 new About checks (section and heading, photo loads, statement fully filled once scrolled, no overflow at 1440 and 390, reduced motion). The one failure is the hero's "reduced motion: shader still frame" check (diff 5 against a limit of 3). It's flaky: an A/B run with About switched off fails the same way about 1 run in 3, so it's existing noise, not this change.
- **Open:** over white sections the header's scrolled glass reads as a muddy slate-grey bar. It's worth a light-ground header state when we next touch the header.
- Screenshots: `screenshots/2026-11-14_about/`.

## Revision 30: collage reverted, nav beside the logo, WhatsApp number

- **Collage reverted:** Jasper didn't like the Revision 29 collage. The hero is back to the staggered 16:9 cards with pill labels and dashed connectors (`HeroDecor.tsx` restored), exactly as before.
- **Nav:** the links (Services to Contact) now sit beside the logo on the left. The WhatsApp and Book a call group stays on the right.
- **WhatsApp:** the button shows a number instead of the word. The placeholder is **+61 491 570 156**, from ACMA's range reserved for fiction, so it can't reach a real person. It's in `whatsapp.display` in `content/homepage.ts` (`UNCONFIRMED`). Screen readers hear "Chat with us on WhatsApp, +61 491 570 156". It still links to #contact until `whatsapp.number` is set.
- **Checks:** build passes, lint 0, `qa/qa.py` **93/93**.

## Revision 29: hero images as an editorial collage (reverted in Revision 30)

- **Why it changed:** the three equal staggered cards, the pill labels on the photos and the dashed connectors read as a stock SaaS illustration.
- **Collage:** **Market** is the lead print (4:5, 60% of the column, cropped on the florist). **Design** (4:3) and **Conversion** (1:1) are smaller prints laid over its top-left and bottom-right corners, each separated by a 4px dark frame instead of a shadow.
- **Captions:** they sit outside the photos as small editorial type. A Seafoam number (1/2/3), justified because Design → Market → Conversion is a sequence, then the word in Cloud. They read diagonally from top left to bottom right, and the lead's caption sits above its top-right corner.
- **Removed:** the dashed flow connectors (`HeroDecor.tsx` deleted) and the pill labels. The list is now an `<ol>`, and the scroll parallax remains as depth between the layers.
- **Checks:** build passes, lint 0, `qa/qa.py` **93/93**. The new check confirms Market is the largest print and the captions read 1, 2, 3 from left to right.

## Revision 28: shader opens bright, smaller hook headings

- **Bright start:** brightness was measured across about 40 seconds of the loop. The brightest phase is about 16.8s in, and the darkest about 5 seconds later. `uTime` now starts at **16.8**, so the hero opens on the icy light and drifts toward dark (right-half mean brightness 69 at load, down to about 32 by 9s) instead of opening on a grey-teal phase.
- **Smaller hook headings:** `clamp(24px … 32px)`, down from 28–40px. The spark and the description indent scale with them.
- **Checks:** build passes, lint 0, `qa/qa.py` **93/93**.

## Revision 27: calm first paint, no flash before the shader

- **Cause:** before the shader loaded, the CSS fallback showed its own "halo" layer (concentric ring bands) and a diagonal sheen. That arc-shaped background flashed briefly on load before the live Halo faded in.
- **Fallback:** the CSS layer is now a static stand-in that matches the shader: a dark #030F1C base with the same icy light at the lower right. The ring and sheen layers are removed, leaving 2 layers (depth, bloom).
- **Faster start:** the shader starts after at most 200ms of idle, down from 1.5s.
- **Checks:** build passes, lint 0, `qa/qa.py` **93/93**.

## Revision 26: hero line artefacts removed, 1920px containers

Three sources of the subtle lines, each found by capturing the bare background at 2000px and boosting the contrast:

1. **Line under the header (~120px):** the header's dark fade ended abruptly and had a kink at 55%. It's now a cosine-eased fade over 200px, with no kink and no visible end.
2. **Line above the band:** the band's glass faded in through a linear 96px mask. It's now a cosine-eased mask over 160px. The deliberate 1px hairline at the band's top edge stays.
3. **Diagonal wedge, top right:** the tilted Halo plane didn't reach the corner on wide screens. `cameraZoom` goes from 1 to 1.25 so the plane covers it.

- **Containers:** `--content-max` is **1920px** (was 2080px). Backgrounds stay full width. QA checks 1920.
- **Checks:** build passes, lint 0, `qa/qa.py` **93/93** (containers 1920px at 2080 and 2560).

## Revision 25: hero CTA per audience

- **Scope:** only the CTA area changed.
- **For local businesses:** the URL field stays (`yourbusiness.com.au`) and the button reads **Get my free preview**. On submit the typed URL is added to the page address as `?website=<url>` and the page scrolls to #contact, so the next step can read it without asking again.
- **For agencies:** the URL field is removed. A standalone Ember pill reads **Send a project brief** (same `btn-primary` style and size) and links to #contact. "Or see the work" is kept on both tabs.
- **Fix:** the input now has a zero base width, so the longer button text can't push the field wider than a phone screen.
- **⚠ To connect:** there's no preview workflow and no brief form or booking tool yet. Both actions only jump to the placeholder Contact section and send nothing. Whatever tool Graham picks for the preview request should read `?website=`. The agency button needs a real brief form or booking link (`href` in `content/homepage.ts`).
- **Checks:** build passes, lint 0, `qa/qa.py` **93/93**. New check: the business URL is carried as `?website=` and lands on #contact.

## Revision 24: hooks led by the spark marker

- **Change:** the Revision 23 tiles read as the generic "SaaS card kit" (identical rounded boxes, icons in circles, a hover lift on every card), so they're gone.
- **Design:** each hook is now set straight on the band, led by the **Split Arc spark** from Logo Kit V2. That's V1.6's "spark marker" identity element (p.16), the brand's own list device. The spark is Seafoam, and **Ember on "See it first"** only, per V1.6's "Ember only on the one that matters". The headings keep the gradient, and the body text aligns past the spark.
- **Implementation:** `hook.icon` is replaced by `hook.lead`. Headings are `<p>` so the heading outline doesn't skip a level. They stay on one line at 1100px and wider and wrap below that.
- **Checks:** build passes, lint 0, `qa/qa.py` **92/92**.

## Revision 23: hook tiles with icons

- **Tiles:** the three band hooks are now glass tiles (16px corners, faint border, soft top-left sheen) and replace the hairline dividers.
- **Icons:** each tile has a line icon in a 44px ring with a Seafoam to Aqua gradient border: a browser window with a play mark (See it first), sliders (Pay your way) and a price tag (Priced up front). Icons are set by `hook.icon` in `content/homepage.ts`.
- **Hover:** tiles lift 2px and the border turns Seafoam. There's no lift under reduced motion.
- **Checks:** build passes, lint 0, `qa/qa.py` **92/92**. The preview server was started only for QA and stopped afterwards.

## Revision 22: header buttons grouped, stronger WhatsApp icon

- **Grouping:** WhatsApp and Book a call sit in one `.actions` group, 8px apart.
- **Icon contrast:** the glyph is now WhatsApp green #25D366 drawn directly on the dark pill, about 8:1 against Deep Water. Before, a white glyph on a green circle was about 2:1.
- **Checks:** build passes, lint 0, `qa/qa.py` **92/92**.

## Revision 21: WhatsApp in the header

- **Button:** a "WhatsApp" pill before "Book a call", also in the mobile menu as "Chat on WhatsApp". It uses the official glyph (Simple Icons, CC0) in WhatsApp green **#25D366**. The green is only on the glyph's circle: white text on that green is about 2:1, so the label stays white on a glass pill. The border turns green on hover. Files: `components/WhatsAppIcon.tsx` and `Header.tsx` / `.module.css`.
- **⚠ `UNCONFIRMED`:** there's no business number yet. Set `whatsapp.number` in `content/homepage.ts` (for example `61400000000`) and the button opens `wa.me` with a pre-filled message in a new tab. Until then it links to #contact.
- **Checks:** build passes, lint 0, `qa/qa.py` **92/92**. Tab order now includes WhatsApp between Contact and Book a call.

## Revision 20: all-white header logo

- **Header:** the official Logo Kit V2 all-white lockup (`SVG/Horizontal/webleta-horizontal-white.svg`), copied unchanged to `public/logo/`. It's an approved kit variant, so it needs no sign-off.
- **Footer:** still the white and teal logo.
- **Checks:** build passes, `qa/qa.py` **92/92**.

## Revision 19: band top border

- **Change:** the band gets a 1px top hairline, Shallows at 16% opacity, where it meets the hero. It's drawn as `.rail::after` so it sits above the band's glass layer; a plain border was hidden underneath it.
- **Fix:** band headings no longer wrap. "Pay your way" was breaking onto two lines at 1440.
- **Checks:** build passes, `qa/qa.py` **92/92**.

## Revision 18: back to the Halo preset, icy light

- **Movement:** the ShaderGradient Halo preset again, with the values from Jasper's link: plane, `uStrength` 4, `uDensity` 1.3, `uFrequency` 5.5, camera azimuth 180 and distance 3.6, `positionX` -1.4, rotations 0/10/50, brightness 1.2, envPreset city. Two changes: speed **0.25** (the link has 0.4; Jasper wanted calmer motion earlier), and the preset's full grain replaced by the soft grain pass.
- **Colours ("surprise me"):** base **#030F1C** and middle **#10304A** from Jasper's ramp, with a pale icy light **#9FD8E4** between his #76B5CE and V1.6 Seafoam.
- **Result:** near-black at top left behind the headline, with a cool aqua-white light sweeping up from the lower right and drifting with the loop. No grey and no Ember.
- **Checks:** build passes, lint 0, `qa/qa.py` **92/92** (frames change by up to 87 levels over 5 seconds).

## Revision 17: Jasper's dark blue ramp, readable nav

- **Ramp:** #030F1C → #061B30 → #10304A → #24526A → #76B5CE. ShaderGradient takes three colours: base `color2` **#030F1C**, middle `color3` **#10304A**, light `color1` **#76B5CE**. The CSS fallback uses the in-between stops (#24526A, #10304A) and #030F1C as its ground. The Sunset movement is unchanged.
- **Nav readability:** the lightest patch sat behind the right-hand nav (about 1.8:1). A dark fade now sits behind the header at the top of the page (`.header::before`) and fades out once the frosted bar appears on scroll. Measured contrast for the nav links is 7.3–8.0:1.
- **Checks:** build passes, lint 0, `qa/qa.py` **92/92**.

## Revision 16: V1.6 Halo colours with the Sunset movement

- **Colours:** the shader colours are V1.6 p.8's three: `color1` Shallows `#EEF7F6`, `color2` Deep Water `#07223B`, `color3` Wet Slate `#4A6273`. The Sunset movement is unchanged, and the CSS fallback matches.
- **⚠ Readability:** with Sunset's zoomed sphere at brightness 1.5, these light colours fill most of the hero, so it reads light grey-blue. The nav links (Pricing, Contact) and the outlined "Built to" lose contrast on the bright top-right area.
- **The fix depends on direction:** go back to the Halo camera and movement (the dark-cornered look on the V1.6 cover), or keep Sunset and lower brightness to about 1.0.
- **Checks:** build passes, lint 0, `qa/qa.py` **92/92**. QA doesn't measure text contrast against the shader.

## Revision 15: ShaderGradient "Sunset" movement, Deep Water colours

- **Motion:** the shader now uses the Sunset settings from Jasper's shadergradient.co link: `type: sphere`, `cameraZoom` 15.3, `cDistance` 7.1, `cAzimuthAngle` 60, `uAmplitude` 1.4, `uDensity` 1.1, `uFrequency` 5.5, `uSpeed` 0.1, `uStrength` 0.4, `brightness` 1.5, `envPreset` dawn, `positionY` -0.15, rotations 0. Only the export-only props are left out.
- **Colours unchanged:** the Deep Water ramp, `#437C8D`, `#07223B`, `#1A4964`. The soft grain pass is kept; Sunset's own grain stays off.
- **Effect:** the zoomed-in sphere fills the hero with slow, wide blue-teal swells. Frames 3 seconds apart differ by 12–15 levels. With brightness 1.5 it's lighter than Revision 14, and still has no grey or white.
- **Checks:** build passes, lint 0, `qa/qa.py` **92/92**.

## Revision 14: Deep Water ramp in the Halo

- **Colours:** the Halo uses Jasper's ramp of lighter Deep Water steps: light `color1` **`#437C8D`**, middle `color3` **`#1A4964`**, base `color2` **`#07223B`**. The CSS fallback matches.
- **Motion:** a bit more visible again, `uSpeed` 0.2 and `uStrength` 3 (Revision 13 had 0.12 and 2.4 and looked static). Bare-background frames 3 seconds apart differ by up to 28 levels, with no grey and no crease lines.
- **Checks:** build passes, lint 0, `qa/qa.py` **92/92**.

## Revision 13: dark navy Halo with no grey, smooth loop, soft band edge

- **No grey:** the Halo's third colour was Wet Slate `#4A6273`, which turned parts of the loop grey. It's now **`#0B2B47`**, a navy between the base `#07223B` and the light `#103451`. All three colours stay dark, with a blue-teal nuance. The CSS fallback swapped its slate and off-white tones for `#103451` too.
- **No lines in the loop:** the preset's plane deformation folded hard enough to show crease lines as it moved. It's softened from `uStrength` 4, `uDensity` 1.3, `uFrequency` 5.5 to **2.4, 1.1 and 4**. Bare-background frames sampled over 12.5 seconds show no lines or solid divisions, and the frames still change (maximum channel difference 4–7, a slow ambient drift).
- **No division at the band:** the band's glass now starts 96px above it and fades in through a mask, so the hero flows into the band without a hard edge.
- **QA:** the animation check now compares a large area over 5 seconds, because the darker, slower loop changes too little in 1.2 seconds.
- **Checks:** build passes, lint 0, `qa/qa.py` **92/92**.

## Revision 12: new hook headline, outlined words, all copy rewritten, no AI mention

Strategist pass with `/humanizer`. At Jasper's request, no copy mentions tools or AI.

| Spot | Now |
| --- | --- |
| Headline | Made to **stand out** (gradient). *Built to* (outline) get booked. |
| Intro (3 lines at 1280, 1440 and 2080) | Most local sites share the same few templates. We design yours around what makes you different, and build it to win enquiries. |
| Businesses tab | Your own design, never a theme with your logo on it. (Book a call) |
| Agencies tab | Say yes to more clients. We design and build under your name. (Send us a brief) |
| Band hooks | **See it first:** Get a free demo of your homepage before you pay a cent. **Pay your way:** One project, a monthly plan, or help when you need it. **Priced up front:** The quote you agree to is the price you pay. |
| Footer and meta | Websites for local businesses and agencies, made to stand out and built to get booked. Page title "Webleta: websites made to stand out". |
| Section intros | Each sharpened to one line, for example "Customers look you up before they call. Give them a reason to pick up the phone." |

- **Outlined words:** the `.outline` style draws text as a white stroke only. The stroke is `max(1.5px, 0.022em)` with slightly looser spacing so the letters don't overlap. Windows High Contrast mode shows solid text instead.
- **Headline source:** it replaces V1.6's working line "Build faster. Look nothing alike.", so it needs Graham's approval.
- **Still `UNCONFIRMED`:** the free demo, the fixed quote, the payment options, and "get booked" (a benefit we aim for, not a guarantee).
- **Checks:** build passes, lint 0, `qa/qa.py` **92/92**. The copy contains no dashes.

## Revision 11: strategist copy pass with the humanizer skill

- **Approach:** the hero and band copy were rewritten for punch with `/humanizer`. Every claim still traces to V1.6 (p.3, p.4, p.18) or the Notion business model, with no invented timelines, numbers or results.
- **Kept:** the headline, "Build faster. Look nothing alike."

| Spot | Now |
| --- | --- |
| Lede | Most local sites start from the same template and end up looking alike. We design yours around your business and use AI for the repetitive build work, so the hours go into the parts your customers see. |
| Businesses tab | A site your customers remember, and one you can update without calling us. |
| Agencies tab | Hand us the design and build. It ships under your name, inside your process. (Action: **Send us a brief**) |
| Free demo | See your new homepage before you spend a cent. |
| Flexible | A project, a monthly plan, or help when you need it. |
| Affordable | One price, agreed before we start. No surprise invoices. |

- **Still `UNCONFIRMED`:** the free demo, the fixed price ("no surprise invoices") and the payment options are promises Graham hasn't confirmed.
- **Checks:** build passes, lint 0, `qa/qa.py` **92/92**. The copy contains no dashes.
- **QA note:** in `desktop-1440-full.png` the Design card can show blank. Playwright resizes the viewport for full-page captures, so the browser switches image size mid-capture. The fold screenshots and the image-load checks show it loading correctly.

## Revision 10: flat cards

- **Change:** the three hero cards lose their drop shadow and the labels lose theirs. Cards keep only a 1px edge (`components/Hero.module.css`).
- **Checks:** build passes, `qa/qa.py` **92/92**.

## Revision 9: #103451 light in the Halo (test)

- **Change:** the background gradient's light (`color1`) is **`#103451`**, a deep blue-teal Jasper picked. It's not one of the V1.6 colours.
- **Effect:** with a dark light colour, the Halo is almost uniformly deep navy, with a faint blue-teal sheen on the right and no bright corner. It's the darkest and quietest version so far.
- **Unchanged:** text gradients and the logo.
- **Values tried for `color1`:** Shallows `#EEF7F6` (V1.6), Aqua `#3CCFC3`, Seafoam `#BFF0E3`, and now `#103451`.
- **Checks:** build passes, `qa/qa.py` **92/92**.

## Revision 8: Seafoam light in the Halo (test)

- **Change:** at Jasper's request, the background gradient's light (`color1`) is **Seafoam `#BFF0E3`** as a test. It replaces Aqua in the shader (`components/ShaderHalo.tsx`) and in the CSS fallback.
- **Effect:** the glow is softer and mintier than Aqua's saturated teal, and the hero stays dark.
- **Unchanged:** text gradients and the logo.
- **To switch back:** set `color1` to `#3CCFC3` for Aqua, or `#EEF7F6` for V1.6's Shallows.
- **Checks:** build passes, `qa/qa.py` **92/92**.

## Revision 7: teal Halo, gradient band headings, white and teal logo

- **Hero gradient:** the Halo's light colour (`color1`) is now **Aqua `#3CCFC3`**, where V1.6 uses Shallows. The hero stays dark (Deep Water, Wet Slate), with teal coming through instead of grey. Brightness is 1.05 (preset 1.2). The CSS fallback's light is teal too.
- **Band headings:** Free demo, Flexible and Affordable now use the same white → Seafoam → Aqua gradient as "faster". It's one shared `.text-gradient` class in `app/globals.css`, also used by the hero highlight. The headings are smaller: `clamp(28px … 40px)`, down from up to 56px.
- **Logo:** white and teal. The larger half goes back to Shallows (white) and the spark is **Aqua** instead of Ember. It's a new file, `public/logo/webleta-horizontal-teal-on-dark.svg`, used in the header and footer. The Revision 6 aqua-half file was deleted, and the Kit V2 originals are unchanged. **For sign-off:** V1.6 fixes the spark as Ember, so the teal spark needs Graham's agreement before it goes into the kit.
- **Checks:** build passes, lint 0, `qa/qa.py` **92/92**.

## Revision 6: softer light, teal logo half, hooks band, humanized copy

### Gradient

- Less white: the Halo's `brightness` goes from 1.2 to 0.9, so the Shallows light reads as a glow rather than a white patch.

### Logo

- The Split Arc's larger half is now **Aqua `#3CCFC3`**, the brand teal, as Jasper asked. The spark stays Ember and the wordmark Shallows.
- It's a new file, `public/logo/webleta-horizontal-aqua-on-dark.svg`, used in the header and footer. The Kit V2 original is unchanged.
- **For sign-off:** V1.6 marks logo colours as fixed, so this needs Graham's agreement before it goes into the kit.

### Card labels and location line

- Card labels (Design, Market, Conversion) are solid Shallows tags with Deep Water text and a soft shadow, with no border and no dot.
- "Based in Australia, starting to work with clients in the US." is removed from the hero.

### Band

- **Darker:** the Deep Water glass is now about 86–90% opaque, so the band stands apart from the hero.
- **Hooks** replace the numbers, from Graham's "free demo / flexible / affordable":

  | Hook | Line |
  | --- | --- |
  | Free demo | See a first version of your homepage before you pay anything. |
  | Flexible | Pay per project, monthly, or only when you need us. |
  | Affordable | You get the price before we start, and it doesn't change. |

  ⚠ All three are `UNCONFIRMED` in `content/homepage.ts`. The free demo and the fixed price are offers Graham hasn't confirmed. "Flexible" follows the proposed engagement models in Notion.
- **Trust:** "Find us on", then each platform as its icon on a white circle plus its name, Google Reviews and Trustindex. The Google "G" uses the standard four-colour paths (`public/brands/google-g.svg`). The Trustindex icon comes from its platform CDN. There are still no ratings, counts or links.

### Copy (humanizer skill)

- **Install:** `blader/humanizer` (MIT, commit b48c832) is installed globally at `~/.claude/skills/humanizer/` (SKILL.md, LICENSE, README). It was checked first: Markdown instructions only, no scripts.
- **Applied to the hero copy:**
  - **Lede:** passive voice ("is made to look") is now active and specific: "We design and build websites for local businesses, and for agencies that need extra hands. Every site starts from the business it's for, so no two look alike."
  - **Business tab:** a forced triad ("looks like your business, that you can update, built to be found") is now "A site designed around your business, that you can update yourself."
  - **Agency tab:** "We take on design and build work inside your process and deliver it under your name."
  - **Hooks:** plain verbs, no sales words, no dashes.
  - **Headline:** unchanged ("Build faster. Look nothing alike.").

### Checks (final run)

- **Build, lint and type check:** `npm run build` passes and lint shows 0 problems.
- **Browser QA:** `qa/qa.py` **92/92 passed**. Changed checks: the band shows the three hooks, and both platform icons load on white circles.

## Revision 5: new hero photos, service toggle, calmer and more minimal

### Background

- **Speed:** the Halo is slower. `uSpeed` goes from 0.4 (preset) to 0.12, so it drifts instead of moving noticeably.
- **No pause button:** the pause button is gone, as requested. Visitors who turn motion off still get a still frame.
- **Accessibility trade-off:** WCAG 2.2.2 asks for a pause control on motion that lasts longer than 5 seconds. With the motion this slow and purely ambient, Jasper chose to drop it.

### Decoration

- The arc circle, channel lines, ripples and spark marker are removed.
- Only the thin dashed **flow connectors** (Design → Market → Conversion) remain.

### Composition

- The hero now uses **two equal columns**. The card stack (max 620px, 760px from 1600px) is **centred** in its column, which closes the gap between the copy and the cards on wide screens.

### New hero photos (fal)

- **Model:** `fal-ai/flux-pro/v1.1-ultra`, raw mode, **16:9**, 2 variants per label.
- **Cost:** 6 images × $0.06 = **$0.36**, approved by Jasper in this request.
- **Prompts:** candid, real editorial photography in Lagoon Ember tones: deep navy, seafoam and teal, one warm orange accent, natural light.
- **Originals:** saved as new files `01-originals-from-fal/2026-11-13/1955_hero-*.jpg`, with a new `manifest-2026-11-13-hero-cards.csv` (request IDs, seeds, prompts, which were used and why). Nothing was overwritten.

| Card | Chosen | Rejected variant | Web-copy fix (original untouched) |
| --- | --- | --- | --- |
| Design | design-a: a designer sketching at a navy-walled studio desk, swatches in navy, seafoam and orange | design-b (Apple logo, garbled heading) | Monitor softened with a feathered blur, reading as depth of field over garbled UI text |
| Market | market-a: a florist photographing her flowers for social media while a customer browses | market-b (garbled "FLODURS" sign) | None |
| Conversion | conversion-a: a thumb about to tap the orange button on a navy booking screen | conversion-b (more garbled text) | Garbled screen heading painted out with the screen's own colour |

- **Card geometry:** 16:9, 62% of the visual wide, 3% between rows, same stagger as before (`scripts/prepare-images.py`, 720 and 1280px WebP).

### Service toggle (Webtec-style)

- **Tabs:** **For local businesses | For agencies**, the two client types in Notion ("Agency Business Model & Positioning", Target client types).
- **Each tab swaps** the field placeholder, the Ember action (**Book a call** or **Partner with us**) and the line underneath (from V1.6 p.4). The line ends with "Or see the work".
- **Style:** a glass pill holding two pills, then a white pill field with the Ember button inside, like Webtec's.
- **Accessibility:** follows the ARIA tabs pattern (roving tabindex, arrow keys, `aria-selected`), and the field has a label.
- **⚠ Not connected:** **no form service exists**. Submitting only jumps to the contact section and sends nothing. It's marked `UNCONFIRMED` in `content/homepage.ts`.

### Stats band

- **Top border removed.**
- **Logos:** the Google and Trustindex logos no longer sit on dark tiles. They sit straight on the glass with a hairline between them, like the stat dividers, so they blend into the band.

### Checks (final run)

- **Build, lint and type check:** `npm run build` passes, lint shows 0 problems, and `tsc` is clean.
- **Browser QA:** `qa/qa.py`, **92/92 passed**. New or changed checks:
  - no pause control
  - the agencies tab switches the field to `youragency.com` and the button to "Partner with us"
  - arrow keys move between tabs
  - tab order runs header, toggle, field, Book a call, see the work
  - the cards are still staggered
  - the shader still animates and is still under reduced motion
  - no network requests outside the local server
- **Screenshots:** `screenshots/desktop-1440-fold.png`, `desktop-1440-toggle-agencies.png`, `wide-2080-fold.png`, `ultra-2560-fold.png`.

### Files (Revision 5)

- **Created:**
  - `components/ServiceSwitch.tsx` and `.module.css`
  - `public/images/card-*-{720,1280}.webp`
  - `Webleta-AI-Generated-Images/manifest-2026-11-13-hero-cards.csv`
  - six originals in `01-originals-from-fal/2026-11-13/`
- **Edited:**
  - `components/Hero.tsx` and `.module.css`
  - `HeroDecor.tsx`
  - `HeroShader.tsx`
  - `ShaderHalo.tsx`
  - `HeroGradient.module.css`
  - `StatsRail.module.css`
  - `content/homepage.ts`
  - `app/layout.tsx`
  - `scripts/prepare-images.py`
  - `qa/qa.py`
- **Deleted:** `components/BackgroundToggle.tsx`

## Revision 4: subtle shader grain, card decor, glass band

- **Grain back, softer:**
  - ShaderGradient's grain is three's `HalftonePass` at full strength (`blending: 1`), and the package only switches it on or off.
  - `ShaderHalo.tsx` now runs **the same pass with the preset's exact parameters** through its own `EffectComposer`, at `GRAIN_STRENGTH = 0.32`. Change that one number to tune it.
  - The CSS mono grain now shows only on the no-WebGL fallback.
  - `@types/three` 0.169 was added for the postprocessing imports.
- **Design elements around the cards** (`HeroDecor.tsx`), all V1.6 identity elements, drawn in the cards' own coordinates so they stay aligned at any width:
  - dashed **flow connectors** with nodes, Design → Market → Conversion
  - **channel lines** at 24° in the gap left of Market, faded at the edges
  - **ripples** at the foot of the column
  - one Seafoam **spark marker** top right (Ember stays on the main button)
  - They fade in after the cards. A faint partial Split Arc circle still sits behind.
- **Glass stats band:**
  - The band is now frosted glass over the live Halo (`backdrop-filter: blur(28px) saturate(1.4)`), with a Deep Water tint that deepens toward the bright right side.
  - The trust tiles are darker glass.
  - Captions are Cloud and Shallows.
  - **Measured contrast on the band** at its brightest point: Cloud 5.2:1 and Shallows 7.5:1 in the open band; Cloud 9.4:1 inside the tiles.
- **Checks:** build passes, lint 0, `tsc` clean, `qa/qa.py` **92/92**.
- **Files:**
  - created: `components/HeroDecor.tsx`
  - edited: `ShaderHalo.tsx`, `Hero.tsx` and `.module.css`, `HeroMotion.tsx`, `HeroGradient.module.css`, `StatsRail.module.css`, `package.json`

## Revision 3: hero cards and live ShaderGradient

### Hero image: Graham's three staggered cards

- **Change:** following Jasper's sketch of Graham's outline, the Split Arc composition is replaced by **three landscape cards** at 9:4.
- **Layout:**
  - **Design:** top left
  - **Market:** offset to the right edge
  - **Conversion:** back toward the left
- Sizes are in % of the column (`cqw`), so the stagger holds at every width. Each card has 16px corners, a hairline edge, a deep shadow, a soft Deep Water fade at its foot, and a glass label.
- One quiet brand device sits behind the cards: a partial circle from the Split Arc at 14% opacity.
- **Images**, one per word, with no repeats (`scripts/prepare-images.py`, originals untouched):

  | Card | Source | Why |
  | --- | --- | --- |
  | Design | g24, designers reviewing layouts (overhead) | Craft in progress; swatches in Ember, Seafoam and navy |
  | Market | `m-shelter`, Webleta Split Arc poster in a bus shelter at dusk | Reaching people where they are; cropped above the poster copy |
  | Conversion | `m-phone`, the concept homepage on a phone with its Book a call button | The moment of conversion |

- **Comparison:** nine crops were compared first (g24 ×2, g25, g26, shelter, phone, m-desk, m-desk-hero, m-laptop).
- **Motion:**
  - On load, the cards arrive in reading order from the right.
  - On desktop, they drift upward at slightly different speeds as the hero scrolls away.
- **Removed:** the old Split Arc images (`hero-laptop-*`, `hero-swatch-*`).

### Background: the live ShaderGradient Halo, as on the V1.6 cover

- **Shader:** `@shadergradient/react` 2.4.20 (shadergradient.co, MIT) is back. It uses the **Halo preset as published**, with V1.6's three colours: Shallows, Deep Water, Wet Slate. It's the same setup as the guideline cover (V1.6 `Source/entry.jsx`).
- **Pin:** three.js is pinned to 0.169.x. Later versions break the shader (`cube_uv_reflection_fragment`).
- **Fallback:** the CSS gradient from Revision 2 stays underneath. It paints first, it's what visitors without WebGL or JavaScript see, and it stops drifting once the shader covers it (`data-sg-ready`).
- **Loading:** `HeroShader.tsx` checks for WebGL and waits until the page is idle before loading the shader (`next/dynamic`, client only). The shader is a separate lazy chunk of about 262 KB gzipped.
- **Pause and reduced motion:** the pause button now controls the shader as well, through a `webleta:background-toggle` event. With reduced motion turned on, the shader renders a still frame and the button is hidden.
- **Two web adjustments, to match the cover on screen:**
  1. **Grain:** the preset's grain is off. At standard pixel density it drew coarse rainbow speckle. In its place is a fine **monochrome** CSS grain at 9% (soft-light), which gives the cover's texture without the colour noise.
  2. **Scrim:** without the shader's grain the Halo renders lighter than the cover. An angled Deep Water scrim, near-black at top left and clear at bottom right, restores the cover's depth and keeps the headline contrast.

### Checks (final run)

- **Build, lint and type check:** `npm run build` passes, lint shows 0 problems, and `tsc --noEmit` is clean.
- **Browser QA:** `qa/qa.py`, **92/92 passed** (`qa/last-run.txt`). New or changed checks:
  - the live shader canvas sits over the CSS fallback
  - it animates (maximum channel difference 35)
  - pause freezes it (difference 0) and play resumes it
  - reduced motion shows a still frame (difference 0)
  - the cards are in the order Design, Market, Conversion, with Market furthest right and each card lower than the last
  - no network requests outside the local server
- **Desktop screenshots:** `screenshots/desktop-1440-fold.png`, `wide-2080-fold.png`, `ultra-2560-fold.png`.

### Files (Revision 3)

- **Created:**
  - `components/HeroShader.tsx`
  - `components/ShaderHalo.tsx`
  - `types/shadergradient.d.ts`
  - `public/images/card-{design,market,conversion}-{640,1100}.webp`
- **Edited:**
  - `components/Hero.tsx` and `.module.css`
  - `components/HeroMotion.tsx`
  - `components/HeroGradient.tsx` and `.module.css`
  - `components/BackgroundToggle.tsx`
  - `content/homepage.ts` (`hero.cards`)
  - `app/layout.tsx` (preload)
  - `scripts/prepare-images.py`
  - `qa/qa.py`
  - `package.json`

---

## Revision 2: exactly what changed

*Revision 3 supersedes the hero media (now three cards) and the background (now the live shader over this CSS gradient).*

**Brief:** desktop first, no annotations or helper text in the UI, realistic placeholder content, a CSS gradient instead of the WebGL one, real platform logos.

### Hero background: coded CSS gradient (WebGL removed)

- **Removed:** the ShaderGradient WebGL background, along with `@shadergradient/react`, `@react-three/fiber`, three.js and three other packages. That drops the 262 KB gzipped lazy chunk. Initial JS is now 215 KB gzipped.
- **New:** `HeroGradient.tsx` and `.module.css` build the Halo idea from four layered CSS gradients, with no images and no canvas:
  - **Depth:** darker water at the upper left, behind the headline
  - **Bloom:** Shallows breaking through Wet Slate at the lower right
  - **Current:** a slow diagonal sheen plus a faint Seafoam
  - **Halo:** two soft concentric bands around the light, an echo of the Split Arc's circle
- **Finish:** a Deep Water scrim keeps the headline on the darkest area. A 3.5%-opacity noise layer only stops banding; it isn't visible as grain.
- **Motion:**
  - Three layers drift slowly (18, 24 and 30 second cycles), using `transform` only, which keeps the work on the GPU compositor.
  - Under `prefers-reduced-motion` all motion stops and the pause control is hidden.
  - For everyone else, a small icon-only pause button sits in the bottom-right corner of the hero (`BackgroundToggle.tsx`, WCAG 2.2.2).
- **Fix during QA:** the layers overhang the hero by 10% so they can drift. The first version placed the light off-screen, so positions are now set in layer space (visible % = layer % × 1.2 − 10).

### Headline

- The underline stays removed.
- "faster" now runs **white → Seafoam → Aqua**, starting in the headline's own white so it reads as part of the line.
- Aqua is about 8:1 on Deep Water. Browsers without text clipping fall back to solid Seafoam, and High Contrast mode uses the system text colour.
- The headline stays on two lines at every desktop width: 91.9px at 1440, 101.5px at 2080 and 2560.

### Hero media: better composition, same Split Arc idea

- **Larger half:** a tighter crop of m-laptop, so the Webleta homepage on screen fills the left of the circle and its headline sits clear of the channel.
- **Spark:** a new crop of g24 showing only the **paper swatches in Ember orange, Seafoam and Aqua**. That's the Lagoon Ember palette appearing in the photo itself, and the spark's tip lands on the orange swatch.
- **Comparison:** eight combinations were rendered in the real Split Arc geometry first. Candidates were m-laptop, m-desk, g22, g25 studio, the g24 crops, the potter and the phone. The other pairings had a cut-off screen, a blank screen or repeated laptop imagery.
- **Details:**
  - A 1px hairline (arc line element) traces the larger half's edge.
  - Graham's Design / Market / Conversion became glass tags with a Seafoam dot.
- **Removed from the UI:** the "Generated images, for illustration" caption.
- **Source note:** both images are generated. The screen shows Webleta's own concept page, not a client project. The alt text describes them plainly.

### Header and buttons

- **Header:** still no bottom border when scrolled, and the frosted glass is kept.
- **Buttons:** pills, as before, now with a hero size (56px tall).
- **Ember "Book a call":** a fine inner highlight and a warm Ember shadow that deepens on hover.
- **"See the work":** a glass pill with a stronger border on hover.
- **States:** hover lifts 1px, active presses 1px, and the focus ring follows the pill shape. Under reduced motion there's no lift.

### Supporting content

- **Social row:** the placeholder note is replaced by **Graham's row of four icons**: Facebook, Instagram and X (Simple Icons 16.37.0, CC0) and LinkedIn's "in" mark.
- **Icon styling:** all four are tinted Cloud, in 40px circles.
- **Links:** no profile URLs exist, so the icons render without links (`href: null` in content). Add URLs and they become links.

### Stats and trust band

- **Stats:**
  - **8+** "Years designing and building websites"
  - **120+** "Websites launched"
  - **15+** "Industries served"
  - Large Cabinet Grotesk 800 figures, with the "+" small, raised and in Seafoam. Hairline dividers between columns.
- **Trust:** "Find us on", with two glass tiles carrying the **official logos**:
  - Google's full-colour wordmark ("Google Reviews")
  - Trustindex's light wordmark ("Customer reviews")
  - Both are SVGs from Trustindex's platform CDN (`cdn.trustindex.io/assets/platform/<Platform>/`), checked to contain no scripts or external references, and saved in `public/brands/`.
- **Not shown on purpose:** star ratings, scores and review counts. Nothing asked for them, and invented ratings are the riskiest thing to ship by mistake.

### Helper and dev text removed from the whole UI

- **Removed:**
  - "Open" and "Sample" marks
  - "Not connected"
  - the social-link note
  - the image caption
  - "Placeholder, to be designed" and the "Needed before this is built" boxes
  - the footer's "to be confirmed" and preview or AI notes
- **Placeholder sections:** now show a heading and one plain line (for example, "A clear scope and a clear price before we start."). Each section's `needs` list stays in `content/homepage.ts` as a dev note that's never rendered.
- **Footer:** shows "Book a call" and "Based in Australia".
- **QA:** a new check fails if any of those words appear in the page text.

### ⚠ Before anything goes public

Search `content/homepage.ts` for **UNCONFIRMED**:

1. **Stats 8+, 120+, 15+:** Jasper's placeholder figures, not verified Webleta facts. Replace them with figures Graham confirms.
2. **Google and Trustindex tiles:** they imply Webleta profiles exist. Add the real profile URLs or remove the tiles. The logos are trademarks; use them only with a real listing.
3. **Social icons:** need real profile URLs.
4. **Section intro lines:** draft copy.
5. **Generated images:** V1.6 says concept images are labelled as such. The UI label was removed on request, so this is a decision to make before launch.

### Files (Revision 2)

- **Created:**
  - `components/BackgroundToggle.tsx`
  - `components/SocialIcon.tsx`
  - `public/brands/google.svg`
  - `public/brands/trustindex.svg`
  - `public/images/hero-swatch-480/800.webp`
- **Rewritten:**
  - `components/HeroGradient.tsx` and `.module.css`
  - `components/StatsRail.tsx` and `.module.css`
  - `components/PlaceholderSection.tsx` and `.module.css`
  - `content/homepage.ts`
- **Edited:**
  - `components/Hero.tsx` and `Hero.module.css`
  - `components/Footer.tsx` and `.module.css`
  - `app/globals.css`
  - `scripts/prepare-images.py` (new crops)
  - `qa/qa.py`
  - `package.json`
- **Deleted:**
  - `components/ShaderHalo.tsx`
  - `components/ReviewSourceBadge.*`
  - `types/shadergradient.d.ts`
  - `public/images/hero-review-*`
- **Originals:** untouched.

### Checks (actual, final run)

- **Build and code checks:** `npm run build` passes, `npm run lint` shows 0 problems, and `tsc --noEmit` is clean.
- **Browser QA:** `qa/qa.py`, **90/90 passed** (`qa/last-run.txt`). Desktop checks:
  - 1440, 2080 and 2560: no overflow, no console errors, full-width backgrounds, containers at most 2080px and centred, pill buttons, images and fonts load
  - the background is CSS layers only (no canvas, no images), it drifts, pause freezes it and play resumes it
  - reduced motion stops all layers and hides the pause control
  - no network requests outside the local server; CLS 0.0000, LCP 628 ms (local)
  - the gradient is on "faster" only, and there's no underline
  - **no helper or dev text in the page**
  - stats read 8+ / 120+ / 15+, and both official logos load
  - no stars or counts
  - four social icons
  - the header is frosted with no border
  - tab order runs logo, nav, header button, hero buttons, pause
- **Mobile and tablet:** still pass the generic checks (overflow, padding, menu), but weren't designed in this pass.
- **Screenshots (desktop):** `screenshots/desktop-1440-fold.png`, `desktop-1440-full.png`, `desktop-1440-header-scrolled.png`, `desktop-1440-button-hover.png`, `desktop-1440-reduced-motion.png`, `wide-2080-fold.png`, `ultra-2560-fold.png`.

---

*The sections below describe Refinement 1. Where they mention the WebGL shader, "Sample"/"Open" marks, review badges reading "Not connected", or the image credit, Revision 2 has replaced them.*

## Run it

```powershell
cd "C:\Users\jaspe\Documents\Webleta\Homepage-Experiments\2026-11-13_Website-MVP-V0.1_Nextjs"
npm install          # first time, or after this round (new packages)
npm run build        # static export to out/
npm run preview      # serves out/ at http://127.0.0.1:4173/
```

- `npm run dev` gives live editing at <http://localhost:3000>.
- `npm run preview` now uses `scripts/serve.mjs`, a dependency-free Node server. Python's `http.server` refused connections under three.js's parallel chunk requests.

To re-run the browser QA, keep the preview running and use a second window:

```powershell
$env:CHROME = "$env:LOCALAPPDATA\ms-playwright\chromium-1248\chrome-win64\chrome.exe"
python -I qa\qa.py
```

---

## Refinement 1: what changed

| # | Request | Done | Where |
| --- | --- | --- | --- |
| 1 | Remove the line under the sticky nav | Bottom border removed in every state, including the mobile panel's top border. Frosted blur kept. | `Header.module.css` |
| 2 | Remove the underline; gradient on "faster" only | Arc underline and its component deleted. "faster" uses a Shallows → Seafoam → Aqua gradient. | `Hero.tsx`, `Hero.module.css` |
| 3 | Live animated gradient | Official ShaderGradient **Halo** preset, rendered live in WebGL, with a pause button and reduced-motion support | `HeroGradient.tsx`, `ShaderHalo.tsx` |
| 4 | Full-width backgrounds, 2080px inner containers | The page-wide 2080 cap is gone. Every section paints edge to edge, and `.container` is at most 2080px including gutters, centred. | `globals.css`, `tokens.css` |
| 5 | Pill buttons | `--r-pill: 9999px` on all buttons, the skip link, status marks, labels and the pause control. Cards and panels keep 8–16px corners. | `globals.css` |
| 6 | Stats instead of the promise strip | Three columns of large figures with labels. Values are neutral placeholders, marked as samples. | `StatsRail.tsx` |
| 7 | Trust / review placeholders | Reusable `ReviewSourceBadge` for Google Reviews, Trustindex and one other platform. Each shows "Not connected". | `ReviewSourceBadge.tsx` |
| 8 | Stronger hero imagery | The three floating cards are replaced by one composition cut from the Split Arc | `Hero.tsx` |

### 1. Header

- The border was removed from the scrolled state and from the mobile panel.
- The frosted glass is unchanged: Deep Water at 72% opacity with `blur(16px) saturate(1.2)`.
- Mobile menu behaviour is unchanged and still passes every check: focus moves in, the page behind is inert, Escape closes the menu, and focus returns to the button.

### 2. Headline

- "Build **faster**. Look nothing alike."
- Only "faster" has the gradient: `linear-gradient(100deg, Shallows 0%, Seafoam 38%, Aqua 100%)`, clipped to the text.
- **Contrast on Deep Water:**
  - Aqua, the darkest stop, is about 8:1.
  - Seafoam and Shallows are higher.
  - It only ever sits over the darkest, scrimmed part of the gradient.
- **Fallbacks:**
  - Browsers without text clipping get solid Seafoam.
  - Windows High Contrast mode gets the system text colour.
- **Open question:** V1.6's contrast table says "Aqua or Seafoam as text: never". That rule is written for light backgrounds. On Deep Water the contrast is strong, but the exception needs Jasper and Graham's sign-off.
- The headline is still sized to its column (`min(fluid size, 12.2cqi)`) and stays on two lines at every tested width: 43.7px at 390, 69px at 768, 91.9px at 1440 and 101.5px at 2080 and 2560.

### 3. Live gradient: investigation and result

**What was checked:**
- V1.6 itself ran the gradient through `@shadergradient/react` (its `Source/entry.jsx`): the Halo preset with only `color1/2/3` swapped. That's the official implementation.
- The current package, `@shadergradient/react` 2.4.20 (MIT, ruucm), declares React `^18.2 || ^19` as its peer.
- It needs `@react-three/fiber`. Version 9.8.2 supports React `>=19 <19.4`, and this project has React 19.3.1, so it's compatible.
- The Halo preset was read from the package's own `dist` (`chunk-PMGWUTR2.mjs`) and copied verbatim into `components/ShaderHalo.tsx`.

**Issue found and fixed:**
- With the latest three.js (0.187), every shader failed: `Can not resolve #include <cube_uv_reflection_fragment>`.
- ShaderGradient was developed against three `^0.169`, so three is pinned to **0.169.0**. With that pin, no WebGL errors appear in the console at any of the five tested widths.

**How it's wired:**
- `HeroGradient.tsx` is a client component. It checks for WebGL, waits until the browser is idle, and then loads `ShaderHalo` with `next/dynamic` and `ssr: false`.
- Nothing in WebGL runs during the static export.
- The canvas fades in over a CSS gradient. That CSS layer covers the first paint, browsers without WebGL and JavaScript-off. It isn't an image, and it isn't the hero's look once the shader runs.

**Deviations from "used as published"** (need sign-off):
- Colours are Shallows, Deep Water and Wet Slate, exactly as in V1.6.
- `grain` is `off`. The preset default is `on`, and the brief asked for no excessive grain.
- Export-only props are dropped, as V1.6's own code did.

**Pause and reduced motion:**
- A "Pause background" / "Play background" pill sits top right under the header. In tab order it comes straight after the header.
- With `prefers-reduced-motion: reduce`, the shader renders as a still frame, the button reads "Play background", and the visitor can still choose to play it.

**Performance:**
- three.js plus ShaderGradient form one lazy chunk: 1,068 KB raw, **262 KB gzipped**. It isn't in the initial load.
- Initial JavaScript is 217 KB gzipped (Next.js, React, GSAP).
- The canvas renders at `pixelDensity: 1` with a `low-power` GPU preference.
- ShaderGradient's lazy loading removes the canvas when the hero scrolls 200px out of view.
- CLS is 0.0000. LCP was 588 ms on the local server.
- Headless Chromium drew 181 fps (uncapped, software GL). That's not a real device figure: test on a mid-range phone before launch.

**Network:** QA logged every request. None went outside the local server. Halo uses `lightType: "3d"`, so ShaderGradient's remote HDR files aren't requested.

### 4. Full-width layout

- The old `.site` wrapper capped the whole page at 2080px. Now the hero, header, sections and footer measure exactly the viewport width at every tested size.
- `.container` has `max-width: 2080px`, including the fluid gutter (16 / 25 / 42 / 48px), centred.
- At 2560 the containers measure 2080px, centred with 240px either side, and the gradient and section colours run to the window edges.
- The hero composition grows to 760px wide from 1600px, so ultrawide layouts don't look sparse.
- No horizontal overflow at any width.

### 5. Buttons

- All buttons are pills: Ember "Book a call", ghost "See the work", the header and footer buttons, the mobile-menu button and the pause control. Padding is 12 × 28px, with a minimum height of 48px.
- **States:**
  - Hover lifts the button 1px and changes its colour.
  - Active presses it down 1px.
  - The focus ring is 3px with a 4px offset and follows the pill shape.
- Cards, panels and the dashed placeholder frames keep their 8–16px corners.

### 6. Stats rail

- Three columns: big Cabinet Grotesk 800 figures (48–88px) with short labels underneath.
- On wide screens a reviews column sits to the right, behind a hairline. On mobile everything stacks.
- **No numbers were invented:**
  - Every `value` in `content/homepage.ts` is `null`.
  - The page shows neutral "00" / "000" placeholders, **drawn as outlines** so they can't pass as real figures.
  - Screen readers hear "(sample, not a real figure)".
  - A "Sample" status mark reads "Sample figures for layout. Real numbers to be confirmed by Graham."
- When Graham confirms a figure, set its `value` and it renders solid. The labels ("Years designing and building websites", "Websites launched", "Industries served") are suggestions too.

### 7. Review placeholders

- `ReviewSourceBadge` shows a dashed circle with a neutral initial (G, T, +), the platform name and "Not connected".
- It uses no platform logos, no stars, no scores, no counts and no "verified" wording.
- It renders a rating only when `profileUrl`, `rating` and `reviewCount` are all set from a real public profile. It then becomes a link to that profile, opening in a new tab.
- No widgets or scripts are embedded. Trustindex's embed can replace or sit beside this once a real profile exists.

### 8. Hero imagery

**Candidates reviewed:**
- All 41 originals, the 7 mockups and the earlier working copies.
- Strongest four:
  - **m-laptop:** the concept Webleta site on a laptop, navy wall, oak desk
  - **g24:** designers reviewing layouts and swatches
  - **g25:** a calm warehouse studio
  - **m-desk:** laptop and phone, navy wall, stone desk
- Rejected:
  - g23 (a real brand logo appears in it)
  - g03 and g04 (garbled text)
  - the 10 and 11 November set (an earlier palette, unrelated subjects)
  - g26 and m-phone from Phase 1 (weaker, and the floating cards were the problem)

**Chosen composition:** one figure in the exact Split Arc geometry from Logo Kit V2, using V1.6's "arc crop" identity element.
- **Larger half:** m-laptop. Its navy wall blends into the Halo, and the laptop shows a website, not a stock scene.
- **Spark:** g24, a tall crop on the hands and swatches. It adds the one warm, human note.
- **Channel:** the live gradient shows through the 24° gap between them.
- **Motion:** on load the spark starts closed into the circle and **lifts 20 right, 34 up**, the symbol's own offset and V1.6's "one thing lifts" idea. On desktop it lifts slightly further along the channel as you scroll.
- **Labels:** Graham's Design / Market / Conversion sit as small pill labels on the arc's edge.
- **Credit:** "Generated images, for illustration. Not client work." sits on a solid pill.
- Both images are generated. The laptop screen is Webleta's own concept page, not a client.
- **For review:** making both halves of the symbol out of photos is a new use of the arc crop, which V1.6 describes for the larger half only.

**Web copies** (`scripts/prepare-images.py`; originals are only read):

| File | Source | Crop | Sizes |
| --- | --- | --- | --- |
| `hero-laptop-720/1200.webp` | `02-composited-mockups/m-laptop.jpg` | square on the laptop | 19 / 60 KB |
| `hero-review-480/800.webp` | g24 `0747_overhead-editorial-photograph-of-two-des_01a1d3e0.jpg` | tall, left 46% | 21 / 41 KB |

The Phase 1 web copies (halo-navy, g24 3:2, g26, m-phone) were deleted from `public/images/`. Only derivatives I'd made were deleted; originals weren't touched.

---

## Components (current)

| Component | File |
| --- | --- |
| Header and mobile navigation | `components/Header.tsx` |
| Hero: copy, Split Arc composition | `components/Hero.tsx`, `HeroMotion.tsx` (GSAP) |
| Live gradient and pause control | `components/HeroGradient.tsx`, `ShaderHalo.tsx` |
| Stats and reviews rail | `components/StatsRail.tsx`, `ReviewSourceBadge.tsx` |
| Footer | `components/Footer.tsx` |
| Section placeholders (9, in Graham's order) | `components/PlaceholderSection.tsx` |

Content is in `content/homepage.ts` (each item notes its source) and tokens are in `styles/tokens.css`.

## Files this round

**Created:**
- `components/HeroGradient.tsx` and `.module.css`
- `components/ShaderHalo.tsx`
- `components/StatsRail.tsx` and `.module.css`
- `components/ReviewSourceBadge.tsx` and `.module.css`
- `types/shadergradient.d.ts` (the package ships no types)
- `scripts/serve.mjs`
- `qa/last-run.txt`
- new screenshots

**Modified:**
- `app/layout.tsx`: removed the stale gradient preload, added the laptop image preload
- `app/globals.css`: full width, 2080 containers, pills, shared `.open-mark`
- `styles/tokens.css`: `--content-max: 2080px`, `--r-pill`
- `components/Header.module.css`
- `components/Hero.tsx` and `Hero.module.css`
- `components/HeroMotion.tsx`
- `components/Footer.*` and `PlaceholderSection.*`: shared status mark
- `content/homepage.ts`
- `scripts/prepare-images.py`
- `qa/qa.py`
- `package.json` and `package-lock.json`

**Deleted:**
- `components/SplitArc.tsx`: the arc underline and spark marker, no longer used
- the old `public/images/` derivatives

**New dependencies:**
- `@shadergradient/react` 2.4.20
- `@react-three/fiber` 9.8.2
- `three` 0.169.0, pinned
- `three-stdlib`
- `camera-controls`
- `@react-spring/three` 10
- dev: `@types/three` 0.169

All are MIT-licensed.

**Not touched:** earlier experiments, original images, `Brand-Discovery/Final`, the live site, hosting and DNS. No fal requests were made.

## Build and QA results (actual, final run)

- `npm run build`: passes. Next.js 16.4.6, TypeScript clean, static export.
- `npm run lint`: 0 errors and 0 warnings. `tsc --noEmit` is clean.
- **Browser QA (`qa/qa.py`, Playwright with Chromium 1248): 87/87 passed.** Output is in `qa/last-run.txt` and `qa/qa-results.json`.
- **At 390, 768, 1440, 2080 and 2560:**
  - no overflow
  - no console errors, including no WebGL errors
  - text at least 16px from the edges
  - header, hero, sections and footer exactly full width
  - containers at most 2080px and centred
  - headline on two lines
  - all buttons 9999px pills
  - all images load, including the SVG `<image>`s
  - brand fonts load
- **Mobile menu at 390 and 768:** opens, focus moves in, the page behind is inert, Escape closes, focus returns, and choosing a link closes the menu and scrolls.
- **Keyboard:** skip link first. Tab order runs logo, nav, "Book a call", "Pause background", hero buttons. Focus is visible.
- **Gradient:**
  - a live WebGL canvas is present
  - frames change over time (maximum channel difference 32)
  - pause freezes it (difference 0)
  - play resumes it
  - reduced motion shows a still frame and the button offers "Play"
- **Network:** no requests outside the local server.
- **Layout and performance:** CLS 0.0000, LCP 588 ms (local).
- **Headline:** the gradient applies to "faster" only, and the headline contains no SVG.
- **Header:** frosted when scrolled, with a 0px bottom border.
- **Trust and stats:** no stars or ratings appear, all three sources read "Not connected", and all three stats are marked as samples.
- **Reduced motion:** all content is visible at once. **No JavaScript:** the hero is visible.
- **QA note:** pixel comparisons allow a difference of up to 3 levels. The blurred labels over the canvas produce 1-level compositing noise even when nothing moves. Measured motion was 32.

**Screenshots** in `screenshots/`:
- `*-fold.png` and `*-full.png` at 390, 768, 1440, 2080 and 2560
- `*-menu-open.png`
- `desktop-1440-header-scrolled.png`
- `desktop-1440-reduced-motion.png`
- focus states

## Limitations and open decisions

1. **Brand sign-off:**
   - the Seafoam/Aqua gradient text on Deep Water (V1.6 says never as text)
   - Halo grain off
   - photos inside both halves of the Split Arc
2. **Real data from Graham:** stat figures and labels, review profiles (Google, Trustindex, others), social links, and whether "free demo / flexible / affordable" (his strip notes) are real offers.
3. **Gradient weight:** 262 KB gzipped of WebGL code loads after idle on every visit. If that's too heavy for mobile, the option is to skip the shader below a width or on `navigator.connection.saveData`, falling back to the CSS layer. That change hasn't been made.
4. **Not measured on real devices:** GPU load and battery on real phones. Headless figures don't represent them.
5. **Open from Phase 1:**
   - the mobile menu needs JavaScript
   - `basePath` would be needed for a GitHub Pages subpath
   - `noindex` is set for the preview
   - Cabinet Grotesk web licence terms are unconfirmed
6. **`npm audit`:** advisories in dev tooling only, not investigated.

## Next

Waiting for visual review of this refinement. After approval, the recommended next section is still **Services, then the CTA banner**, once Graham confirms the services list.
