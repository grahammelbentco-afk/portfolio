# Webleta Website MVP V0.1: report

Date: 2026-11-13. **Status: internal preview for Jasper and Graham.** It's not deployed and not the live site. Split Arc and Lagoon Ember are confirmed by Jasper; Cabinet Grotesk is the heading face.

- **Phase 1:** foundation, Header, Hero and Footer, with placeholders for every other section.
- **Refinement 1:** Header, Hero, stats rail, full-width layout and pill buttons.
- **Revision 2 (this round, desktop first, 1440px):** Header, Hero and the stats and trust band, made to read like a live site.

Work stops here for visual review. Services and the other sections haven't been started.

---

## Milestone: Work (Revisions 67–72), pushed to staging

- **Approval:** Jasper said "push it" (2026-11-16). This is a provisional approval for staging only; Graham's feedback is pending.
- **Commit SHA:** `498cc1d`. The Cloudflare Pages check succeeded. `source-assets/` (the 18 MB of fal originals) is gitignored as a local-only working folder.

## Revision 85: FAQ rebuilt for SEO, AEO and GEO (latest; approved by Jasper: "after that push")

- **Ask (Jasper):** the FAQ must work as a real FAQ for SEO, AEO and GEO, and look award-winning (Awwwards for inspiration).
- **Awwwards:** "questions" (clean tag) and the element search "accordion" returned nothing.
- **Why it changed:** the Revision 83 tab design rendered only the selected answer, so the other answers weren't in the HTML for crawlers or AI answer engines.
- **Structure:**
  - 11 questions in 4 topic groups (Cost, Process, Ownership and tech, Agencies), all as native `<details>`, so every answer is in the HTML and in-page search finds it.
  - Topic headings are `h3` and questions are `h4` inside `summary`.
  - FAQPage JSON-LD (`schema.org`) is built from the same content, so the text can't drift. Verified: 11 Question entities, and every answer is present in the rendered HTML.
- **Copy:**
  - Answer-first: each answer's first sentence is the direct answer, and it names Webleta where that helps a quote stand alone ("A new Webleta website starts from $2,400…").
  - New questions: "Can I pay monthly?", "What do you need from me to start?", "Do you do SEO?" and "Is agency work white-labelled?", all from facts already on the page.
  - **UNCONFIRMED:** prices, ownership, platforms.
- **Design:**
  - A sticky side column with the heading, an intro, topic chips with counts (anchor links to each group) and "Graham and Jasper: Something else on your mind? Ask us directly".
  - Closed questions are flat Shallows rows. An open one becomes a Deep Water card with the Split Arc 24° cut: the question keeps its size (Jasper: no size change when open) and the answer sits under it as smaller body text in Cloud, for clear hierarchy, with a Seafoam minus. One question opens at a time (`name="faq"`, Jasper's call); the first starts open.
  - Personal names only appear in Reviews (Jasper's rule). The FAQ is signed "The Webleta team".
  - The answer's height animates where `::details-content` is supported.
- **QA:** taste lint 0 FAIL. tsc and eslint are clean. `qa/qa.py` 150/150.

- **Follow-ups (Jasper):**
  - Questions keep their size when open.
  - The topic chips moved to a sticky bar at the top of the questions column (`FaqTopics.tsx`). The chip for the group in view is marked current (Deep Water, Seafoam count; IntersectionObserver), with hover and focus states. The bar sits flush under the header, with a subtle drop under it only once stuck.
  - Answers widened to `min(76ch, 82%)` of the card.

## Revision 84: Industries contrast, matching duotone, Entertainment, two-line cards (pushed with 85)

- **Ask (Jasper):** text contrast issues; the colour gradients didn't match the images; add an entertainment industry (one fal image allowed); two lines of text at most on the cards.
- **Cause of the mismatch:** each tile's photo box isolates blending (`container-type`), so the luminosity blend had no colour to tint with. The photos stayed natural while the scrim used the tile colour. The box now carries the tile colour, so each photo takes its tile's duotone and matches its gradient.
  - **Same bug in Services ("What we do"):** it uses the same tile CSS, so its photos have this problem too. Not changed here.
- **Contrast:**
  - White text on every tile, over a deeper scrim in the tile's own colour.
  - Aqua is mixed to 62% with Deep Water, Shell to 44%, and the Entertainment Seafoam to 42%, so white text holds on all three.
- **Entertainment and events:** new tile, slot `f`. The bottom row is now four tiles: Stores, Automotive, Entertainment, Professional. The image is fal Flux Pro Ultra (1:1 raw, seed 843803988, $0.06, approved): a band on a small stage, from the crowd, with no text in frame. Saved as `industry-entertainment-{480,800}.webp`, with the manifest updated.
- **Copy:** every card line was shortened to fit two lines (`line-clamp: 2` as a guard). Examples: "Quote requests that arrive with the job details.", "As careful online as you are in person."
- **QA:** taste lint 0 FAIL. tsc and eslint are clean. `qa/qa.py` 149/150 (the known flaky shader check).

## Revision 83: Industries as a bento, FAQ as a conversation (pushed with 85)

- **Ask (Jasper):** Industries must be a bento in the "What we do" (Services) style, with reused images for now, showing industries, not projects (Work already shows those); his reference is a colour-blocked "Who we build for" grid. The FAQ looked basic and needs a premium, on-brand design (Awwwards, frontend-design, humanizer).
- **Awwwards:** "faq" returned nothing again.
- **Industries:**
  - The section imports `Services.module.css`, so the tiles are the same component language: colour blocks, duotone photos (true colour on hover), the Split Arc 24° notch (cut in Deep Water here) and glass icons.
  - The grid mirrors Services', with the hero on the right.
  - Seven industries: Trades and construction (hero, Aqua), Food and hospitality (wide, Harbour), Salons and studios (Ochre), Health clinics (Dusk), Online stores (Coral), Automotive (Kelp) and Professional services (Shell).
  - Photos are reused from Benefits and Services. New line icons were drawn for each industry.
  - No project names.
  - Intro: "Every industry wins customers differently. These are the ones we know best. If yours isn't here, ask us. We'll say honestly whether we're a fit before you spend anything." It closes with "Not on the list? Ask us about your industry".
  - The page-top crops from Revision 82 are deleted.
- **FAQ:**
  - A large question index (a vertical tablist) beside a Deep Water answer card with the 24° cut. The answer is set large in the display face and signed "Graham and Jasper, Webleta" with a Seafoam spark avatar, with "Something else on your mind? Ask us directly" below.
  - On phones the card opens under the chosen question. Only one card is ever rendered: a media hook places it, so ids stay unique.
- **Humanizer:** intro reworded (above). The other lines were left as they were.
- **QA:** taste lint 0 FAIL. tsc and eslint are clean. `qa/qa.py` 150/150.

## Revision 82: Industries and FAQ sections (superseded by 83)

- **Ask (Jasper):** add business industries and FAQ (Graham's "Additional sections"), premium, using Awwwards, frontend-design and humanizer.
- **Awwwards:** element searches ("faq accordion", "hover list image reveal index") and the SOTD search ("services index list") returned nothing. Both sections follow the site's own patterns instead.
- **Order:** Reviews (white) → Clients (white) → **Industries (Deep Water)** → Pricing (Shallows) → **FAQ (white)** → Contact.
- **Industries** (`components/Industries.tsx`):
  - Heading: "Sites that know" solid, then "your industry." outlined.
  - A type-led index of six industries Webleta has actually built for: trades, home services, food, professional services, events and online stores. Hovering, focusing or pressing a row brings up the top of a real client homepage (Wazzas Pool, The Fort, Belly, 411 Legal Services, Melbourne Entertainment Company, Rack n Road) in a sticky frame with the 24° cut, plus what that industry needs from a site and "Built by us: …".
  - The rows are a vertical tablist (arrow keys, Home, End). Images crossfade (opacity only).
  - On phones the frame sits above the list.
  - New images: 4:3 page-top crops in `public/images/industries/` (30–53 KB each). No fal.
- **FAQ** (`components/Faq.tsx`):
  - Heading: "Questions," solid, then "answered." outlined, sticky beside the list, with "Something else on your mind? Ask us directly" (mailto).
  - Eight native `<details>` (`name="faq"`, so one opens at a time; the first starts open) as flat Shallows tiles. The open one turns Deep Water, and its plus turns into a minus on a Seafoam disc.
  - The answer's height animates where `::details-content` is supported; otherwise it just appears.
  - Answers repeat what the page already says. **UNCONFIRMED:** prices (Pricing's placeholders), ownership and platforms.
- **Humanizer:** "you've paid nothing and owe us nothing" became "you owe us nothing". The events line now says what the site does ("Photos and video that show the night before anyone books it.").
- **Skills and tools actually used:** frontend-design, humanizer, Awwwards MCP (3 searches, all empty), design-taste-frontend lint, Playwright.
- **QA:** taste lint 0 FAIL. tsc and eslint are clean. `qa/qa.py` 150/150.

## Revision 81: shorter Pricing cards, Contact photo removed ( approved by Jasper: "push it"; pushed `0d2500d`, Cloudflare check succeeded)

- **Ask (Jasper):** the Pricing cards are still too tall, and the footer part looks off ("maybe remove the image").
- **Pricing:**
  - Card padding is 20–28px (was 24–36px), with tighter gaps.
  - The price is set smaller (side plans up to 3.25rem; featured up to 4.25rem).
  - The featured photo band is 16:4 (was 16:8), and the featured plan's features run in two columns on desktop.
  - About 100px shorter at 1440.
- **Contact:** the `cta-shop` photo is removed. It sat right above the footer and crowded the join. The copy column is now vertically centred against the form.
- **Footer:** top padding reduced (24–56px), so the wordmark follows Contact's fade closely.
- **QA:** `qa/qa.py` 150/150.

## Revisions 78–80: logo carousel, rotating reviews, footer without a CTA (pushed: `9ec597d`)

- **78, Clients (Jasper: "full width carousel of logos, light themed"):**
  - The logo wall is now a full-browser-width loop on white: one row drawn twice, with the copy hidden from screen readers, moving 50% every 48s and fading at both edges.
  - Logos are Deep Water masks at 62%, full on hover. Hover pauses the loop; reduced motion shows a still, centred, wrapping row.
  - Background: white, not Shallows, because Pricing below is Shallows. It reads as one proof block with Reviews, so its top padding is halved.
  - "Yours could be next? Get my free preview" sits beside the heading.
  - The QA side-padding check skips the track, like the other carousels.
- **79, Reviews (Jasper: use all of his testimonials, clip the long ones, make it rotate, with arrows):**
  - 16 reviews: Graham's four, Jasper's four LinkedIn recommendations (Pontus Lenell and Sam Medriano added) and eight Upwork reviews (six added, transcribed from his screenshots). Each is clipped to one unbroken passage, never stitched.
  - The picker tiles are replaced by a carousel: it moves on every 8s by itself and pauses while hovered, focused or off screen. With reduced motion it doesn't advance on its own.
  - Previous and next arrows, ←/→ on the region, "4 / 16", and Work's Split Arc gauge filling as each review's time runs. Live-region politeness switches off while it rotates on its own.
  - **To check:** confirm the Upwork quotes against the live profile, since they were transcribed from small screenshots.
- **79, Contact to footer (Jasper: "contrast or color combination seems off"):**
  - Contact's bright Halo corner met flat Abyss with a hard cut.
  - Contact now fades to the Halo's base `#030f1c` at its foot, and the footer uses that base.
- **80, Footer (Jasper: no second CTA after Contact, fix contrast, Awwwards for inspiration):**
  - Awwwards: the element search returned nothing. The site search for design agencies found Studio PLATO, whose footer is a giant full-contrast wordmark fading at its base above a calm, labelled info row. That's the model used here.
  - The CTA is removed.
  - The wordmark is now first: Shallows at full contrast on `#030f1c`, its base fading into the ground, rising in on a scroll timeline.
  - Then four labelled columns: Studio (tagline, Based in Australia), Explore (navigation), Services (the seven services, linking to #services) and Contact (email, WhatsApp). Then © and Back to top.
  - Contrast on `#030f1c`: white 18.6:1, Cloud 12.4:1, Haze 7.0:1.
- **For later (Jasper):** the Pricing cards are a bit too tall.
- **QA:** taste lint 0 FAIL. tsc is clean. `qa/qa.py` 150/150. Reviews rotation was verified in the browser (it advanced after 8s, then on the arrow).

## Revision 77: Footer with a full-width wordmark (pushed: `da6877f`, Cloudflare check succeeded, live QA 149/150 with the flaky shader check)

- **Ask (Jasper):** an award-level footer ("be creative here"), then push.
- **Design:**
  - Abyss ground after Contact's gradient.
  - The top row is a closing line, "Have a site in mind?", with the tagline and a Seafoam "Book a call" (the same closing button as Work's frame), beside two link columns: Explore (the site navigation) and Contact (email, WhatsApp display number, Book a call).
  - The bottom bar has "© 2026 Webleta. Based in Australia." and "Back to top".
  - **Signature:** the brand wordmark file used as a CSS mask at the full container width, one tone step above the ground (`#0d2c49` on Abyss), cut by the bottom edge so only its top 74% shows. As the footer scrolls in, it rises into place (a CSS scroll timeline, `view()`, where supported). Reduced motion shows it still.
  - The old corner ripples are removed. There are no rules or outlines; sections are separated by space and tone.
- **Still UNCONFIRMED:** the email and the WhatsApp number (the ACMA fiction number) are the same placeholders as the header and Contact.
- **QA:** taste lint 0 FAIL. tsc is clean. `qa/qa.py` 150/150.

## Revision 76: Contact on the hero's gradient, with the shared three-step form (pushed: `0b325c1`, Cloudflare check succeeded)

- **Ask (Jasper):** revise Contact using the form design from "How it works" and an existing image matched to the brand, on the same background as the hero ("that moving grainy gradient"), then push.
- **Shared form:** the Steps request is now `components/RequestForm.tsx`, taking its copy as a prop (`RequestFormCopy` in `content/homepage.ts`) and a `hook` for the QA data attributes. Steps uses it unchanged (same copy, ids and hooks). Contact uses it worded for a project: "Start your project", "Which site is this about?", "Where should we reply?", "Send my request", with the subject "Website request". The CSS stays in `Steps.module.css`, so the design lives in one place. The old one-page Contact form (name, email, website, chips, message) is gone.
- **Background:** Contact renders `HeroGradient`, the live ShaderGradient Halo with its grain pass over the CSS fallback, scrim and dither, so the page ends on the ground it opened with.
- **One WebGL scene at a time:** `HeroShader` now mounts its scene only while its section is within 200px of the screen (IntersectionObserver), and unmounts it when it leaves, which frees the context.
- **Image:** the reused `cta-shop` (a corner shop at dusk; its navy sky already sits in the Halo palette, so it keeps its own colour), with the Split Arc 24° cut, under the promises.
- **Heading:** "Tell us what a win looks like." solid, then "We'll bring the plan." outlined (Jasper's rule).
- **Layout:** the form card is sticky beside the copy on desktop and stacks on phones.
- **QA:**
  - The contact validation check now runs the multistep flow: an empty website is blocked on step 1.
  - The background check is scoped to the hero and asserts exactly one live canvas.
  - taste lint 0 FAIL. tsc is clean. `qa/qa.py` 150/150.
  - Known, pre-existing: eslint's `react-hooks/set-state-in-effect` flags the `?website=` pickup, as it did in Steps before the move.
- **Skills and tools actually used:** frontend-design (the brief carried over), design-taste-frontend lint, Playwright. No fal and no new images.

## Revision 75: Pricing rebuilt (pushed: `896ab45`, Cloudflare check succeeded)

- **Ask (Jasper):** an award-level Pricing section using the Awwwards MCP, frontend-design and humanizer, with a reused image matched to the brand.
- **Diagnosis (frontend-design):** the old section was the stock "SaaS card kit": three outlined cards, with a featured card carrying an Aqua gradient and a drop shadow.
- **Design:**
  - Heading: "Pick a package," solid, then "or ask for a quote." outlined (Jasper's rule), on two set lines.
  - A shared "Every plan includes" row sits beside the audience tabs, so the cards don't repeat it.
  - The featured plan is the one bold element: a large Deep Water panel spanning two rows on the left, with a reused photo in brand duotone that sinks into the panel, the Split Arc 24° cut, a Seafoam display price and the section's one Ember button. Photos: `card-design` for businesses, `service-design` for agencies.
  - The other two plans stack on the right as flat white tiles: name, line and price on the left, features on the right. No borders, glows or shadows.
  - A closing link, "Not sure yet? See a free preview first", goes to Steps.
  - DOM order is unchanged, so the QA hooks, tab order and screen readers still work. Phones stack.
- **Humanizer:** "Custom design, never a theme" (a clipped contrast) became "Your own design, built from scratch". "kept fresh" became "updated and looked after every month". Prices and terms are still UNCONFIRMED placeholders.
- **Awwwards:** not re-run for pricing; every element search this session has returned nothing.
- **Skills and tools actually used:** frontend-design (plan and critique), humanizer, design-taste-frontend lint, Playwright.
- **QA:** taste lint 0 FAIL (one `taste-skill-ignore` for the 10px tone band, and one for the photo's scrim). tsc is clean. `qa/qa.py` 150/150.

## Revision 74: Clients as a wall of real logos (pushed: `d2da148`, Cloudflare check succeeded)

- **Ask (Jasper):** revise the logo section with the logos from webleta.com, then push.
- **Logos:** seven from Graham's site (`media/Companies`): Ground Control Systems, Rack n Road, Melbourne Entertainment Co, Adrenaline Solutions, Nicole Steffen Design, Creative Marketing Concepts and Entertainment Co. Each is cropped to its ink and saved in `public/brands/clients/`. Portside Marketing (comp1) is left out: its only file is a blurred raster inside a grey box, which can't be recoloured cleanly. The fictional typed names are removed.
- **Design:**
  - Deep Water ground, with the heading "Brands we've" solid, then "built for." outlined.
  - A 4 × 2 wall (2 columns on phones) of flat Abyss tiles: one tone step down, no borders or glows.
  - Each logo is a CSS mask painted in Cloud at 78% opacity, so all seven share one quiet tone. On hover the tile steps lighter and the logo turns Seafoam (colour swaps only).
  - Adrenaline's thin, wide-spaced mark gets a 1.45 optical boost.
  - The eighth tile is the open slot: Seafoam, "Yours could be next" and "Get my free preview", linking to Steps.
- **No sector labels:** only three of the seven businesses are confirmed, so no labels were invented.
- **QA:** taste lint 0 FAIL. tsc is clean. `qa/qa.py` 149/150 (the flaky shader check).

## Revision 73: Reviews rebuilt with real reviews (pushed: `691c68d`, Cloudflare check succeeded)

- **Ask (Jasper):** an award-level Reviews section using the Awwwards MCP, with an image (reused, matched to the brand). Use real testimonials from webleta.com and his own from LinkedIn and Upwork (screenshots), picking the best ones.
- **Reviews (quoted word for word, shortened only to one unbroken passage):**
  - Graham's site: Greg Bauer (CEO, Ground Control Systems), Olaf Guerrero (Marketing Director, Rack n Road), Daniel Clarke (Owner, Endtimes Official) and Eureka Quinto (COO, Adrenaline Solutions).
  - Jasper's LinkedIn: Giuliano Barducci (Head of Production, Design and QA, Webtec) and Ellaine Gabotero (Web Designer, UI/UX Specialist).
  - Jasper's Upwork: two client reviews, shown without names because Upwork shows none.
  - The fictional placeholder reviews are removed.
  - Pontus Lenell and Sam Medriano were left out: strong, but they repeat what Giuliano says.
- **Design:**
  - Heading "In their" solid, then "own words." outlined (Jasper's rule).
  - A one-line intro names Graham and Jasper, so the quotes make sense.
  - The reused `card-market` photo is shown as a brand duotone (luminosity over Deep Water, Seafoam soft light), with the Split Arc 24° cut.
  - A flat Seafoam proof chip carries the real figure: "100% Job Success on Upwork, across 15 jobs".
  - The large quote is set in the display face, with an Aqua opening mark hung in the margin on desktop.
  - Each byline has a source tag ("Client of Graham", "LinkedIn, on Jasper", "Upwork, on Jasper").
  - Eight flat picker tiles form a tablist (arrow keys, Home, End); the active tile is Deep Water.
  - The quote swaps with a 360ms rise, off under reduced motion.
- **Awwwards:** element search ("testimonials quotes") and SOTD site search ("testimonials") returned nothing, again.
- **QA:** the banned-words check had "Graham" (from earlier internal notes). He's now named on purpose, so the check now looks for note phrases instead ("Graham to", "Graham's approval", "awaiting Graham").
- **Skills and tools actually used:** Awwwards MCP (2 searches, empty), design-taste-frontend lint, Playwright. No fal.
- **Checks:** taste lint 0 FAIL. tsc is clean. `qa/qa.py` 150/150.
- **Open:** confirm that each reviewer is happy to be quoted on the new site (Graham's four are already public on webleta.com).

## Revision 72: solid-then-outline headings, warp image, subtle details, CTA in the frame

- **Headings (Jasper's rule):** solid text first, outline text second. Work is now "Built by us, / for businesses" solid, then "like yours." outlined. Steps is now "See it before" solid, then "you pay for it." outlined.
- **Background image:** Jasper rejected the cluster image. The new fal image (`work-warp-d`, seed 3859539325) is a subtle hyperspace warp made only of hairline streaks and pinpoints, with no large objects, so it stays sharp at 1920x1080 (231 KB; 1280x720 for phones, 106 KB). It's desaturated, at 32% opacity, screen-blended and masked radially from the boards' vanishing point.
- **fal spend today:** $0.24, four generations. Only `work-warp-d` is used. All originals are in `source-assets/fal-2026-11-16-work/`.
- **Subtle details (Jasper: "up to you"):**
  - **Gauge:** a small Split Arc beside the button fills as you travel, with a count ("4 / 9") that follows the sharp board.
  - **Pointer depth:** the vanishing point leans a few percent toward the pointer, eased, so boards and stars shift in depth like a slow camera.
- **CTA in the frame:** the outro was a separate band under the pin, which looked disconnected. "Yours could be the next one." now sits along the bottom of the pinned frame for the whole flight. The gauge is on its left and the button is Seafoam with Deep Water text (Jasper's call). The section's bottom padding is removed when pinned, so the section ends with the frame. Phones and reduced motion keep the CTA in normal flow, with no gauge.
- **Fix:** after a resize, the gauge could show the wrong count. It now recomputes on every ScrollTrigger refresh.
- **QA:** taste lint 0 FAIL, 0 WARN. tsc and eslint are clean. `qa/qa.py` 150/150 or 149/150; the only failure is the known flaky shader check.

## Revision 71: seamless sky, smooth scroll, outline title, deep-field background (local)

- **Ask (Jasper), in several notes:**
  - The background was cut at the top and bottom of the section.
  - Scrolling in this section felt rough.
  - The highlight didn't match the earlier sections; remove it and use outline text.
  - The title needs to stay readable when boards pass behind it.
  - The radial-gradient galaxy looked cheap; use fal for a background image.
  - Back to the solid dark navy, with the image desaturated and showing only subtly in the centre.
  - Make the title three compact lines on the left.
  - The veil showed a gradient cut.
  - Make the galaxy busier: a cluster of galaxies, 1920x1080.
- **Seamless sky:** the stars and image moved out of the pinned stage into one viewport-sized `position: sticky` layer that sits behind the whole section, from its top padding through the outro. Negative margins keep it out of the layout. No more edges.
- **Smooth scroll (this section only):** ScrollTrigger scrub went from 0.6 to 1.6 seconds of catch-up, so the camera glides after each wheel step. The pin is longer (about 610% of the viewport) and the warp speed is eased more gently.
- **Title:** the highlight is gone. The title now uses the site's `.outline-type`, as the hero and Steps do, with the lead outlined: "Built by us," then "for businesses" then "like yours." as three compact lines on the left. A Seafoam band (low or full) was tried first; Jasper rejected both.
- **Readability:** a veil in Abyss sits above the boards and below the title. It's a radial gradient anchored at the top-left that fades to nothing well inside its box. An earlier angled linear version left a visible line across passing boards.
- **Background:** solid Abyss again. The CSS nebulae and band are removed. The galaxy is a fal image (Flux Pro Ultra, 16:9, seed 2523990429): a dense galaxy cluster, centre-cropped to exact 16:9 and exported at 1920x1080 (356 KB) and 1280x720 for phones. In CSS it's fully desaturated, at 55% opacity, screen-blended and faded radially from the centre. The canvas warp stars are fewer and fainter at rest (420 on desktop), so the photo carries the stillness and the canvas the motion.
- **fal spend:** $0.18 for three generations, all approved by Jasper.
  - Milky Way panorama (`galaxy-a`): replaced at his request.
  - First cluster prompt (`deepfield-b`): the model returned a single galaxy, so it wasn't used.
  - Second cluster prompt (`deepfield-c`): used.
  - Originals are in `source-assets/fal-2026-11-16-work/`; the manifest is updated.
- **Skills and tools actually used:** humanizer (Revision 70), fal (Flux Pro Ultra ×3), GSAP + ScrollTrigger, Canvas 2D, Playwright, design-taste-frontend lint.
- **QA:** taste lint 0 FAIL, 0 WARN. tsc and eslint are clean. `qa/qa.py` 150/150.

## Revision 70: Work heading rewritten with the humanizer skill (local)

- **Ask (Jasper):** he didn't like the heading. Rewrite it with the humanizer skill.
- **Diagnosis:** "Nine sites. / Not one template." is a clipped "not X" contrast (humanizer §1): it rejects a claim nobody made. It's also a pair of dramatic fragments (§2).
- **Change:** the eyebrow is now **Our work** (was "Selected work"). The title is now **Built by us, / for businesses like yours.**, with the Seafoam marker on the second line. "Built" is safe for all nine WordPress builds. "Designed and built" isn't confirmed for every project, so it was avoided.
- **Skills actually used:** humanizer. Playwright screenshots at 1440 and 390.

## Revision 69: warp through space, peripheral blur, title in the frame (local)

- **Ask (Jasper):**
  1. Remove the intro text on the right so the boards take that space, as in Concept F.
  2. When a board gets big on screen, blur it like peripheral vision.
  3. Add a scrolling effect of design elements warping through a galaxy, with a galaxy background.
- **Title:** the intro paragraph is gone (removed from `content/homepage.ts` too). The eyebrow and "Nine sites. / Not one template." now sit inside the pinned stage, top-left, as in Concept F, so the boards fly through the whole frame.
- **Peripheral blur:** boards now keep growing past the viewer, using Concept F's distances again (solid to t = 350, gone by t = 650). From t = 60 they blur in step with their size, up to 22px, so a board is sharp at its true size and soft as it fills the view.
- **Galaxy:**
  - The section ground is Abyss with faint Aqua and Dusk Violet nebulae, plus a soft galaxy band across the frame at the brand's 24° channel angle.
  - A canvas starfield (820 stars on desktop, 380 on phones, in white, Seafoam, Aqua and a Harbour tint) streams out from the same vanishing point the boards fly from. Each star is drawn as a streak from its last position to its new one, so it's a drifting dot at rest and a long warp streak when scrolling. The speed follows ScrollTrigger velocity, eased.
  - About one in eighteen is a turning Split Arc half-circle: the brand's design element in the stream.
  - The animation loop only runs while the section is on screen. Phones and reduced motion get one still frame of stars, redrawn on resize.
- **Skills and tools actually used:** frontend-design, GSAP + ScrollTrigger (velocity, ticker), Canvas 2D, Playwright (frame sheets, a mid-scroll warp capture, reduced motion, mobile), design-taste-frontend lint. The nebula and band gradients carry `taste-skill-ignore` notes, since the galaxy is Jasper's explicit brief.
- **QA:** taste lint 0 FAIL, 0 WARN. tsc and eslint are clean. `qa/qa.py` 150/150.
- **To watch:** CSS blur on a large, close board plus an 820-star canvas is the heaviest moment on the page. Headless checks can't measure real frame rate, so check smoothness on a mid-range laptop and a real phone before launch.

## Revision 68: Work as a fly-through of whole boards (local)

- **Ask (Jasper):** the page-wall concept was good, but "the images are cut off". Don't move the images. Use Concept F's "What we design for" section (M5 Round 2 concepts artifact) as the main reference.
- **Why Revision 67 felt wrong:** the crops ended where each presentation board ended, so every page stopped mid-way, and the pages also scrolled inside their frames.
- **Reference, read from the artifact's built files:** five studies sit in 3D depth (perspective 900px, 700px apart, alternating ±16vw). The pinned stage moves a camera forward on scroll, and each study fades in from the distance and out as it nears, with its caption underneath.
- **Change:** each project is now **Graham's whole presentation board**, resized only (no crop), exported at 640 and 1000 wide (52–179 KB each, `public/images/work/`). The manifest is rewritten. Nothing moves inside a board. On desktop with motion allowed, the stage pins (about 520% of the viewport) and the camera flies through the nine boards in depth, alternating left and right. Each board's width fits its own aspect (`min(40vw, 60svh × aspect)`), so tall and wide boards both show whole. Boards stay solid up to their true size and fade out by about 1.17× size, so none is ever cropped by the frame or shown soft. The heading sits above the pinned stage in normal flow, so no board passes under text. Phones get a swipe row of whole boards at a fixed height, and reduced motion gets a three-column masonry grid.
- **Copy:** the outro is now "Yours could be the next one." The heading and intro are unchanged.
- **Fixes during the build:**
  - `clearProps: "all"` in the GSAP cleanup wiped the React inline `--i` and `--ar` variables. React's dev mode mounts twice, so every board went flat. It now clears only opacity and visibility.
  - `quickSetter(…, "autoAlpha")` didn't apply, so boards never faded and blew up across the screen. Opacity and visibility are now written directly (hidden boards also leave the tab order).
  - `will-change: transform` on the camera made Chrome stretch a raster, which made close boards blurry. Removed.
- **Skills and tools actually used:** the Artifact read (reference HTML, CSS and JS), frontend-design, GSAP + ScrollTrigger via `@gsap/react`, Playwright (eight-frame scroll sheets, head, outro, mobile, reduced motion), design-taste-frontend lint. No fal, and no new Awwwards calls.
- **QA:** taste lint 0 FAIL, 0 WARN. tsc and eslint are clean. `qa/qa.py` 149/150. The one failure is the known flaky shader still-frame check (diff 5). The work checks pass: nine described projects, and the fly-through runs on desktop.
- **Open:** confirm with Graham that all nine projects can appear on the new site.

## Revision 67: Work rebuilt as the page wall (superseded by Revision 68, never shipped)

- **Ask (Jasper):** an award-level Work section built from the real projects on webleta.com (we only have screenshots in presentation-board form), using Awwwards, frontend-design, GSAP and scroll animation. fal was allowed.
- **Content:** the four fictional concept sites are replaced by nine real WordPress builds from Graham's live portfolio: Pay the Pyper, Wazzas Pool, Melbourne Entertainment Company, Belly, 411 Legal Services, Bonsai, Ground Control Systems, The Fort and Rack n Road. Webleta's own site and Portside Marketing were left out (Portside's board is too fragmented to read as one page).
- **Images:** each board's front page was detected by its edges and cropped out as a full-length homepage, then exported at 480 and 720 wide (57–164 KB each, `public/images/work/`). Sources and crop boxes are in `manifest-2026-11-16-work.csv`. **No fal spend:** the real pages beat any generated mockup.
- **Concept, the page wall:** on wide screens with motion allowed, the stage pins on Deep Water and the nine homepages stand on a gently curved wall (CSS 3D, perspective 1500px). Scrolling walks along it: each page turns to face you near the centre and runs through its own full length, top to bottom, while a large caption and a "4 / 9" position follow the centred page. GSAP ScrollTrigger scrubs one progress value that drives track position, card angle and depth, fade and page scroll (quickSetters, no React re-render per frame). The cards keep the CTA card's square top-right corner. There's no browser chrome, because Steps directly above already uses a browser frame.
- **Phones, reduced motion, no JS:** a swipe row with scroll-snap, each page's top in view, with per-card captions.
- **Head:** "Nine sites." / "Not one template." The second line carries the Seafoam marker, full height with Deep Water text so no white letter sits on the pale band on a dark ground. The outro is "Yours could be next on the wall." with **Get my free preview**, which goes to Steps.
- **References:** Awwwards. Jesper Landberg (Developer Award, SOTD) presents work as curved panels in space, which became the wall. Element search (project showcase) and motion search (GSAP pins with scrub) returned nothing, again.
- **Skills and tools actually used:** frontend-design (plan and critique), Awwwards MCP (search_sites ×4), GSAP + ScrollTrigger via `@gsap/react`, Playwright (scroll-frame screenshots at four wall positions, outro, mobile, reduced motion), design-taste-frontend lint.
- **Fixes during the build:** the stage grid column grew to the track's full width and pushed the caption off-centre (locked to one viewport column). The cards first used `data-card`, which the hero's parallax also selects page-wide, so they're now `data-work-card`. The curve was eased (12° per step) so neighbours stop overlapping. The counter dropped its zero-padding.
- **QA:** taste lint 0 FAIL (two `taste-skill-ignore` notes: the visually hidden caption and the 100vh fallback). tsc and eslint are clean. `qa/qa.py` 150/150. The work check now asserts nine described projects, plus a new check that the wall runs on desktop. The side-padding check skips the wall track like the Benefits carousel.
- **Open:** the client names and screenshots come from Graham's public portfolio. Check with him that all nine can appear on the new site. Sector lines are read from the pages themselves.

## Milestone: Steps section (Revisions 65–66), pushed to staging

- **Approval:** Jasper asked for the push after the Revision 66 fix (2026-11-16). This is a provisional approval for staging only. Graham's feedback is still pending, and it doesn't authorise a production launch.
- **Changes:** Revision 65 (CTA to Steps transition) and Revision 66 (balanced steps row), below.
- **References:** none new. Both fixes came from Jasper's screenshots.
- **Skills and tools actually used:** design-taste-frontend lint; Playwright (Python) screenshots and bounding-box measurement of the steps row. No fal spend, no Awwwards.
- **QA:** taste lint 0 FAIL, 0 WARN. `npm run build` clean. `qa/qa.py` 149/149 (the usually flaky shader check passed this run).
- **What worked:** measuring the rendered boxes instead of eyeballing. The columns were already geometrically equal; the problem was the content inside them.
- **What didn't:** right-aligning the numbers in a fixed slot (first try in Revision 66) pushed the narrow "1" 47px off the left edge.
- **Lesson:** when a row looks unbalanced, check whether the content fills its column before changing the grid. Display digits differ in width even with tabular figures, so size number slots to the digit.
- **Commit SHA:** `5e2694487b23146ca3281197a9a684b6a06c3d98` (pushed to `main` 2026-11-16). The Cloudflare Pages check succeeded. The live CSS contains the Revision 66 rule, and `qa/qa.py` against https://webleta-preview.pages.dev/ passed 149/149.

## Revision 66: steps row balanced

- **Ask (Jasper):** the steps row (1 Free preview → 2 Plan the pages → 3 Build and launch) "looks off, it is not balanced on columns".
- **Cause:** the three columns were equal (413px each), but each step's text stopped at 32ch, leaving about 55px empty before every arrow. The arrows sat against the next number, and the last step stopped short of the right edge. The fixed number slot also left the narrow "1" floating.
- **Change:** the text fills its column, so each step ends where its arrow starts, and the arrows sit centred in the gaps. The number slot is now `auto` (it fits the digit), so every step starts on its column edge, and step 1 lines up with the heading above.

## Revision 65: CTA to Steps transition

- **Ask (Jasper):** the transition from the CTA banner into Steps felt "meh".
- **Cause:** three surfaces stacked between the two sections: the white CTA ground, a pale Shallows band, then the inset Seafoam panel with its own padding. That made a dead gap and two near-identical tints.
- **Change:** Steps is now one full-bleed Seafoam band (no inset panel), so the page steps white > Seafoam > Deep Water (Work). The Split Arc 24° cut moved from the panel to the band's top-right corner (120 × 270px desktop, 48 × 108px mobile), with white behind it so the CTA ground runs into the angle. The channel lines now sit on the band.

## Revision 64: Tidewell CTAs in the sans, with a split main button

- **Ask (Jasper):** no serif on CTAs or buttons, and make Tidewell's CTA more distinctive.
- **Change:** all Tidewell buttons are back in the sans, bold, keeping the square corners. The main CTA is now a split button: a eucalyptus "Book an assessment" block joined to a butter cap with a calendar icon. "Find your clinic" gets a map-pin icon and an underline. "Book online" is a butter block. The knee wireframe is a little smaller and further right, so it clears the wider link.

## Revision 63: Tidewell gets its own button shape

- **Ask (Jasper):** change the Tidewell mock's button shapes so they don't match Webleta's own site.
- **Change:** Webleta uses pills, so Tidewell's buttons are now crisp rectangles (0.3cqw radius) with Instrument Serif labels: "Book online" in butter, "Book an assessment" in eucalyptus, and "Find your clinic" as a serif underlined link. The clinic arrows and the time slots use the same sharp corners, so the mock has one consistent shape language.

## Revision 62: Tidewell copy matches the photo

- **Ask (Jasper):** match the Tidewell copy to the image and services, using the humanizer skill.
- **Copy:** the headline is now "Find out why / your knee hurts." (was "Back to your Saturday run."); the intro is "Physio, pilates and massage at three Brisbane clinics. We find the cause first."; the main button is "Book an assessment". All three match the photo (a knee assessment) and the knee wireframe. A longer intro wrapped to four lines and pushed the review row into the clinics band, so it was cut to two lines.
- **QA:** `qa/qa.py` passes, apart from the flaky shader check if it fires.

## Revision 61: a physio wireframe and a new Tidewell photo

- **Ask (Jasper):** instead of the alcove and menu, a subtle icon or silhouette of physiotherapy in the style of a low-poly wireframe (his spine reference), with the structure of a hands-on knee assessment (his two photo references). Also one fal image (approved: one only) to replace the arch photo so it fits Tidewell and its services.
- **Wireframe:** `public/images/steps-physio-mesh.svg`, generated by `scripts/art/physio-mesh.py` (with `mesh_lib.py`): a traced silhouette of a leg bent on a table, one hand cupping the knee and one under the calf, built along bone axes, filled with jittered points and Delaunay-triangulated (Bowyer-Watson, no dependencies). Eucalyptus edges and nodes; the knee joint gets a soft butter halo and butter nodes, like the sore spot in the spine reference. Placed right of the copy just above the review line, 24cqw wide at 60% opacity.
- **Photo (fal flux-pro v1.1-ultra, 3:4 raw, 1 generated, $0.06):** a physio in a eucalyptus-green polo assessing a patient's bent knee on a cream table, against a blush wall with a eucalyptus branch. The model printed garbled lettering on the polo; it was healed locally (no second generation) and replaced with a small embroidered Tidewell wave mark, in the web copy only (`05-web-cleaned/tidewell-knee-clean.jpg`, used as `public/images/steps-tidewell-{600,1000}.webp`). Manifest: `manifest-2026-11-15-steps.csv`. The Revision 52 `steps-clinic` crop is no longer used.
- **Removed:** the tonal alcove and its treatment menu (Revision 59).

## Revision 60: a spark eyebrow on every section after the hero

- **Ask (Jasper):** every section except the hero opens with an eyebrow that has the spark icon, as Benefits does.
- **Shared component:** `components/Eyebrow.tsx` (the Split Arc spark in Aqua, then the label), styled once as `.eyebrow` in `globals.css`. Cloud on dark grounds. In a grid head it spans the full row.
- **Added:** Services "What we do", How it works (Steps), "Selected work", "Client reviews", "Who we work with" (Clients), "Pricing", "Contact" (`eyebrow` on each content object). About and Benefits already had it. The CTA's bordered pill label is now the same spark eyebrow, centred over its heading.
- **Layout fix:** Services, Work and Pricing placed their heading with `.head > :first-child`, which became the eyebrow; the rule now targets `.head > h2`.
- **Note:** the taste and impeccable skills ban eyebrows by default; this is Jasper's explicit direction.
- **QA:** `qa/qa.py` 149/149.

## Revision 59: Tidewell's alcove holds the treatment menu

- **Ask (Jasper):** instead of a shape, a design element related to the services the client offers.
- **Change:** the tonal arch now holds Tidewell's treatment menu in its serif: Physiotherapy (45 min), Clinical pilates (55 min), Remedial massage (60 min), set at the arch's foot (`preview.treatments`, illustrative). Still tone-on-tone, so it fills the space with real content without competing with the headline.

## Revision 58: a tonal alcove in Tidewell's empty right side

- **Ask (Jasper):** the right of the Tidewell hero has too much space; add something with bookofshapes.com as inspiration. It should be subtle, not distracting, and not a common pattern.
- **Tried and dropped:** a generative halftone dot field (too common, read as cheap), then three solid rising arches in sage, blush and eucalyptus (read as a bar chart and pulled the eye).
- **Kept:** one tone-on-tone arch (#E4D0C4 on the #ECDCD2 blush), 17 x 30cqw, standing on the review row's line at the right. It echoes the photo's arch and reads as an alcove in the clinic wall, filling the space without competing with the copy.
- **Checks:** taste lint 0 FAIL; `qa/qa.py` 148/149 (the flaky shader check).

## Revision 57: Benefits heading highlight

- **Ask (Jasper):** highlight words in the Benefits heading the way About does.
- **Change:** "work in" in "A good website brings work in." gets About's Seafoam highlighter band, set low on the line (`benefits.titleMark` in `content/homepage.ts`, `.titleMark` in `Benefits.module.css`, `box-decoration-break: clone` so it holds if the phrase wraps).

## Revision 56: Tidewell gets a sun and an accent, real time slots, a light form

- **Ask (Jasper):** the wave lines look cheap; the "Next available" card looks AI; Tidewell is bland with one dark green; make the form light mode but still eye-catching.
- **Research:** the taste library's health sites. Odyssée (AU clinic, 7.5) carries the page with one polished object, and Neuropelvic Surgery uses one warm accent on a calm ground. The waves were a thin-line texture, the beginner pattern.
- **Wave lines replaced by a "Saturday morning sun":** one flat butter disc (#F0C766) rising behind the arch's shoulder, tied to the headline, plus a fine paper grain over the blush so the ground reads as printed stock.
- **Accent:** butter #F0C766 on the sun, the nav's "Book online", the first time slot and the clinic arrows (now butter circles). Eucalyptus stays the main ink and the main CTA.
- **"Next available" replaced by real time slots:** a compact eucalyptus strip on the arch's foot reading "Free today, New Farm", with 3:40, 4:20 and 5:50 pm as slots, the first filled butter. It's the pattern real booking tools use, readable at small size.
- **Light form:** a white card on Seafoam with Shallows-tone fields; the title is larger (30 to 40px); progress is Deep Water for the current step and Aqua for done ones; the chosen goal fills Deep Water with an Aqua tick; secondary text #3D566A (7:1 on white); the error text is dark Ember #B3401A; Ember stays only on the button.
- **Checks:** taste lint 0 FAIL; `qa/qa.py` 148/149 (the flaky shader check).

## Revision 55: quieter, more even, more premium

- **Ask (Jasper):** the booking chip is too big and overlaps, remove the Split Arc outline, even out the steps row (columns, arrows), and make the form premium and elegant instead of AI-looking: fewer borders, more tonal shading. Built with the taste skill (tasteskill v2, already installed globally at `~/.claude/skills/design-taste-frontend`), section rules: match the surrounding design and apply its house rules.
- **Booking chip:** about 30% smaller (13.5cqw wide) and moved onto the arch's lower edge, clear of the headline, buttons and proof row.
- **Split Arc outline:** removed. The panel is now flat Seafoam (the two radial glows are gone); the faint V1.6 channel lines stay.
- **Steps row:** three equal columns; each step is a fixed number slot plus its copy, so every title starts on the same line. A drawn arrow sits centred in each gap at number height. The hairline above the row is gone; spacing separates it.
- **Form:** a flat Deep Water card with no outlines, glow or shadow. Surfaces step up in tone: field and tile #0D2C48, hover #123756, chosen #0E4A55. Focus is the only ring (2px Aqua). "Step 1 of 3" became three named segments (Website, Goal, Details), with done ones in teal and the current one bright; screen readers still hear "Step 1 of 3: Website". The goal tiles fill teal with an Aqua tick when chosen. Back is a tonal pill. Invalid fields get an Ember ring. The card keeps its natural height, so step 1 has no empty gap.
- **Frame:** the compare's drop shadow and the address bar's dividing line are gone.
- **Checks:** taste lint 0 FAIL (deliberate exceptions inside the mock sites carry `taste-skill-ignore`: the dated template's banner and logo, the floating chip and the slider handle). `qa/qa.py` 148/149 (the flaky shader check); the steps check now uses a `data-steps-list` hook.

## Revision 54: multistep request, prominent steps, a richer Tidewell, contrast

- **Ask (Jasper):** a multistep form, subtle design elements in the empty area under it, a more premium and elegant Tidewell mock with more colours and real logos (Google, Trustindex or industry sites), more prominent steps, and contrast fixes. Built with the impeccable skill (scoped refinement on the existing system).
- **Request form (three steps, Deep Water card):** a progress bar ("Step 1 of 3"), then one question per step: "Which site should we redesign?" (filled in from the hero), "What should the new site win you?" (four large options with drawn icons, real radio inputs) and "Where should we send your preview?" (name and email). There's Back, validation at each step with a plain message ("Add your website or business name to continue."), and focus moves to each new question. A short slide-in plays on step change and is off under reduced motion. Sending still opens the visitor's email app.
- **Layout:** the steps now run full width under both columns, so there's no empty block under the form. Each step has a large solid numeral (tabular figures), a 22 to 28px title, 17px text, its pay tag (Agreed price in Deep Water) and a small arrow to the next step. A large outline of the Split Arc sits faintly in the panel's lower right.
- **Tidewell preview:** a eucalyptus announcement bar ("Now open in Bulimba..."), faint wave lines from its logo behind the headline, a proof row with the real Google G (four-colour) with 4.9, gold stars and 380 reviews, the Trustindex verified mark and "HICAPS claims on the spot", and a eucalyptus band for the three clinics with sage hours and arrow links. The palette is blush, eucalyptus, sage, mist and Google gold. Logos come from `public/brands/` (already in the project).
- **Contrast:** the caption and step text use #2C4A5E on Seafoam (about 7:1; Wet Slate was 4.4:1), the mock's secondary text is darker (#45574F on blush), the form placeholder is #9FB0BD on Deep Water (about 7:1), and the Today mock's greys are darker.
- **Detector:** impeccable's detector flags Arial, which is deliberate on the Today template.
- **QA:** the form check now walks through all three steps, including the empty-website block. `qa/qa.py` 149/149.

## Revision 53: a structured Today site, a sentence form, larger text

- **Ask (Jasper):** the preview is fine, but the Today side is too blank. The form looks AI-generated, and some text in the section is too small.
- **Today side:** now a believable dated template for the same clinic: a dark utility bar (phone, hours), a blue logo and a cramped "Home | About Us | Services | Our Team | Contact Us" nav with a boxy Book Now, a grey carousel with arrows and dots under "Welcome to Tidewell Physiotherapy", an "Our Services" row of three bordered boxes with icon squares and Read More links, and a copyright 2014 footer. All sized in `cqw`.
- **Form:** rebuilt as a sentence on a Deep Water card: "Hi, I'm [name] from [website]. We'd like more [bookings] from our website. Send my preview to [email]." Fields are underlined blanks in Aqua that grow with what's typed (`field-sizing: content`, with the `size` attribute as a fallback). The goal is a native select. Each field has a screen-reader label. The title is "Get your free preview", with "A person replies within one working day." (the Contact promise) under it, then the Ember button and the trust line. The goal chips and the notes field are gone; Contact still has notes.
- **Text sizes:** step titles 18 to 21px, step text 15 to 17px, pay tags, Today/Your preview tags and the caption 13 to 15px, step numbers 36 to 40px. In the Tidewell mock, the nav, intro, buttons, rating, booking chip and clinic hours are about 20 to 30% larger.
- **Copy:** the caption is now "Drag to compare. An example: yours is designed for your business." so it fits on one line.
- **QA:** `qa/qa.py` 149/149.

## Revision 52: the "Your preview" mock is now a real homepage

- **Ask (Jasper):** the preview side of the compare looked generic. Build it as a real, premium homepage for an industry Webleta targets, using Awwwards, frontend-design and humanizer. Reusing images is fine.
- **Industry (Notion):** Australian local service businesses, often multi-location, where weak mobile sites and missing booking flows are the problem. The example is now **Tidewell Physio**, a fictional physio group with three Brisbane clinics. Bloom & Fern is retired from this section.
- **Awwwards:** health and clinic searches found nominees only. MOOI Cosmetic Clinic (Brisbane) gave the cue of one solid brand ground with large display type set against the photo.
- **The preview (the client's own brand, deliberately not Webleta's):**
  - blush ground #EAD8CD from the photo's wall, eucalyptus ink #1F3A33, a muted green for availability
  - **Instrument Serif** display (OFL, self-hosted at `app/fonts/InstrumentSerif-400-latin.woff2`, 21 KB, not preloaded) with Instrument Sans for UI
  - nav with wave mark, links, phone and "Book online"; an arch-cropped clinic photo on the left; the headline "Back to your Saturday run." overlapping the arch
  - a "Next available: Today, 3:40 pm, New Farm clinic" booking chip breaking out of the arch, plus the book button, "Find your clinic" and a Google rating
  - a strip of the three clinics with today's hours
- **Today side:** the same business as a template site (grey banner, "Welcome to Tidewell Physiotherapy", Read More).
- **Mechanics:** both mock sites are sized in container units (`cqw`), so they scale like a screenshot at any width. Each is its own stacking context, so preview layers never rise above Today. The slider starts at 20% (`compare.start`) so most of the preview shows first. The Today and Your preview tags moved into the caption row under the frame.
- **Copy:** checked with the humanizer skill. The clinic name, hours, times and rating are illustrative, noted in `content/homepage.ts`.
- **Image:** no new spend. `steps-clinic-{600,1000}.webp` is a portrait crop of the Revision 36 original `benefit-trust-a.jpg` (fal, already paid).
- **QA:** the slider keyboard check now expects 25 (20 + 5). `qa/qa.py` 149/149.

## Revision 51: Steps as a conversion panel, from Jasper's reference

- **Ask (Jasper):** Revision 50 still wasn't it. Use his reference (a big coloured panel: heading and intro, three step tiles, a lead form beside a before/after compare), reshuffle it and make it ours. Impactful and CRO-oriented.
- **Layout:** one Seafoam panel on Shallows, with an Aqua glow and faint channel lines in the lower right, and the top-right corner cut at 24 degrees (V1.6).
  - Head: big heading (outline "See it") on the left, intro on the right.
  - Left column (7/12), the proof: the Bloom & Fern before/after compare (drag or arrow keys, "Today" and "Your preview" tags), then the three steps as a connected sequence with a pay tag each: **Free / Free / Agreed price**.
  - Right column (5/12), the action: a white form card, "Request your free preview". Website, name, email (required), goal chips and "Anything we should know?" (optional), the Ember "Get my free preview" button and "Free. No card, no contract. You decide after you've seen it."
  - Reshuffled from the reference: the steps moved under the proof (they explain what happens after you submit), compare left and form right. The caps eyebrow and button arrows were left out.
- **CRO:** the hero's "Get my free preview" (local businesses tab) now lands on `#steps` instead of `#contact`, and the typed website fills in this form straight away (a `webleta:website` event from `ServiceSwitch`, plus `?website=` on load).
- **Sending:** no form service yet, so it opens the visitor's email app with the request filled in, as Contact does. **UNCONFIRMED:** connect a real form service; the offer itself still needs Graham's confirmation.
- **Images:** no new spend. Reuses `steps-florist` (Revision 48). The Revision 50 `steps-owner` photo is no longer used; the files stay in `public/images`.
- **QA:** steps checks are slider keyboard, three steps with pay tags, and three required fields; the hero hand-off check now expects `#steps` and the form pre-fill. `qa/qa.py` 148/149 (the flaky shader check).

## Revision 50: Steps rebuilt around what you receive and what you pay

- **Ask (Jasper):** he doesn't like the Revision 49 section. Revise it with the Awwwards MCP and frontend-design; one or two new images allowed.
- **Why it changed:** Work, the next section, is four browser-frame mockups, so a big browser frame here repeated it. The before/after slider and the tabbed stage are gone.
- **Awwwards:** the process, steps and storytelling searches returned no usable references (again). From Marfala Studio (SOTD): a ruled index row with large type as structure. That shaped the steps row.
- **Layout (Shallows ground, 1440):**
  - Left (5/12): heading, intro, Ember "Get my free preview".
  - Right (7/12): a photo of the Bloom & Fern owner smiling at her phone, with the V1.6 24° channel cut on its top-right corner. A coded email card breaks out of the frame on the left: "Your homepage preview is ready", with a thumbnail of her new homepage (the Revision 48 `steps-florist` photo) and a "View preview" button. The card is decorative (`aria-hidden`); the photo has alt text.
  - Below: the three steps as a ruled three-column index with large outline numerals (the last one solid). Each column ends with **You pay: Nothing / Nothing / The price you agreed**, the section's promise as information. On mobile the columns stack and the card overlaps the photo's lower edge.
- **Motion:** one moment. The email card fades and rises in once when the photo is 45% in view; off under reduced motion.
- **Photo (fal flux-pro v1.1-ultra, 4:3 raw, 2 generated, $0.12):** `steps-owner-b` is used (`public/images/steps-owner-{1000,1600}.webp`): no text in frame, phone screen faces away. `-a` was rejected for an Apple logo on the laptop and a text card. Manifest: `Webleta-AI-Generated-Images/manifest-2026-11-15-steps.csv`.
- **Copy:** `steps.items[].pay`, `steps.photo` and `steps.mail` in `content/homepage.ts`; "Sam" and the email are illustrative. The free-preview offer is still **UNCONFIRMED**.
- **QA:** the two slider/tab checks are replaced by "email card arrives in view" and "three steps, each saying what you pay". `qa/qa.py` 146/147; the one failure is the known flaky shader still-frame check.

## Revision 49: Steps as one interactive stage, lighter ground

- **Ask (Jasper):** Revision 48 still looked basic. He wants a lighter background and a premium, award-level section.
- **Idea:** one large browser stage driven by the three steps, so the process plays out on one example site.
  - **1 Free preview:** the before/after slider.
  - **2 Plan the pages:** the preview dims and a plan card slides in (five pages, scope, "Fixed price, agreed in writing").
  - **3 Build and launch:** the full preview, a padlock and **Live** tag in the address bar, and a "Your site is live" notice.
- **Steps:** a tablist under the stage (click or arrow keys) with large outline numerals that fill when chosen, and a progress line that fills up to the chosen step. Motion only answers the visitor's choice and is off under reduced motion.
- **Ground:** Shallows with a soft Seafoam glow and faint 24° channel lines (V1.6), lighter than Revision 48's solid Seafoam. The heading row has the intro and the Ember button on the right.
- **Images:** reuses `steps-florist` (Revision 48). No new spend. The Awwwards searches (process, bento, before/after) returned nothing usable.
- **Copy:** the plan and live content are in `steps.plan` and `steps.live` in `content/homepage.ts`, all **UNCONFIRMED** and illustrative.
- **QA:** 1 new check (arrow keys move to step 2, the stage follows, the slider hides).

## Revision 48: Steps rebuilt, two columns, new preview photo

- **Ask (Jasper):** the next section, using Awwwards, fal and frontend-design, then push. (The Awwwards element search for before/after sliders returned nothing.)
- **Problems fixed:** the preview headline was cut in half by the slider ("sure."), the joinery photo overpowered the section, and the three step cards looked generic.
- **Layout (Seafoam):**
  - Left column (5/12): heading, intro, the three steps as a **numbered vertical timeline** (a real sequence) with a connector between numbers, and the Ember "Get my free preview" button.
  - Right column (7/12): the before/after comparison in a browser frame.
  - On mobile the columns stack.
- **Preview:** a new fictional example, **Bloom & Fern** (a florist, bloomandfern.com.au). Its text sits on the right over the photo's plain sage wall, so the handle never cuts it. On mobile the text moves to the lower right over a sage fade. The slider starts at 42%.
- **Photo (fal flux-pro v1.1-ultra, 16:9 raw, 2 generated, $0.12):** `steps-florist-a` is used (`public/images/steps-florist-*.webp`): a florist at a timber counter on the left, with a clean sage wall on the right. `-b` was rejected because the subject fills the frame.
- **QA:** the slider keyboard check now expects 47 (42 + 5). `qa/qa.py` 146/146 (the shader check is flaky as before).

## Revision 47: CTA photo regenerated at full quality, no person

- **Ask (Jasper):** higher quality, remove the person. The edited laptop and phone screens didn't make sense.
- **Photo (fal flux-pro v1.1-ultra, 21:9 raw, 3136×1344, 2 generated, $0.12):** `cta-hq-b` is used (`public/images/cta-studio-hq-{1200,2000}.webp`):
  - a navy desk from above with no people
  - the laptop and phone with **screens off**, so there's no fake UI
  - wireframe sketches on the left, and swatches in navy, teal, seafoam and coral with a pencil, coffee and plants on the right
  - an empty centre

  The garbled lettering on the wireframe sheets was inpainted (fal flux-pro/v1/fill with a hand-drawn mask, $0.05) and composited back at full resolution, in the web copy only. `cta-hq-a` was rejected for garbled swatch labels.
- **CTA photo spend, Revisions 42–47:** about $0.57.

## Revision 46: CTA desk dressed as our studio, stronger text gradient

- **Ask (Jasper):** the clean centre works, but the edge objects (microscope, mixer, lamps) don't say what we do. He also suggested a gradient behind the text, as in earlier sections.
- **Edit (fal flux-pro/kontext, $0.04 each, 2 edits, $0.08):** the source is the Revision 45 cleared desk. Edit A is used (`public/images/cta-workdesk-*.webp`): a laptop and phone showing site layouts, website wireframe sketches, a colour-swatch fan in Aqua, Seafoam and Ember tones, a tablet with stylus and coffee mugs. The centre is still empty and the person is still at the bottom edge. Edit B was rejected for garbled printout text.
- **Gradient:** a Deep Water radial that deepens toward the text (88% at the centre, falling to 18% at the edges) plus a darker floor, the same device the Services tiles use under their titles.
- **CTA photo spend, Revisions 42–46:** $0.40.

## Revision 45: CTA back to the studio desk, centre cleared

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
