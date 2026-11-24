/**
 * Homepage content. Edit the words here, not in the components.
 *
 * The visible page reads like a live site. Everything that is NOT yet confirmed is
 * flagged in this file with "UNCONFIRMED" (search for it before any launch):
 * the stat figures, social and review profile links, and the section intros.
 * Brand Guidelines V1.6 is the source for the headline, lede and location line.
 */

export type Link = { label: string; href: string };

export type HeroImage = { src: string; srcSet: string; width: number; height: number; alt: string };

/** `video`: optional looping clip shown instead of the image (poster = its first frame). */
export type HeroCard = { label: string; image: HeroImage; video?: { src: string; poster: string; grade?: { filter: string; tint: string } } };

export type Audience = {
  id: string;
  label: string;
  /** With a field: a URL input plus the action button. Without: the action alone. */
  field?: { label: string; placeholder: string };
  action: string;
  /** Where the action goes. The URL field's value is passed along as ?website=. */
  href: string;
  note: string;
};

/** `lead` marks the one hook that matters most: its spark marker is Ember (V1.6 p.16). */
export type Hook = { title: string; text: string; lead?: boolean };

export type SocialLink = { platform: "facebook" | "instagram" | "upwork" | "gmail"; label: string; href: string | null };

/** A review platform shown in the trust band, using the platform's own logo file. */
export type TrustPlatform = {
  name: string;
  icon: { src: string; width: number; height: number };
  /** Public profile URL. Null renders the logo without a link. */
  href: string | null;
};

export type PlaceholderSection = {
  id: string;
  title: string;
  /** One customer-facing line shown until the section is designed. UNCONFIRMED copy. */
  intro: string;
  /** Dev note, never rendered: what is needed before this section can be built. */
  needs: string[];
  ground: "shallows" | "white" | "mist" | "deep";
};

/**
 * SEO pass (2026-11-23). Audience: businesses with an outdated website or none, and digital
 * marketing agencies that need an extra hand. Title kept under 60 characters and the
 * description under 160 so Google shows them whole.
 */
export const site = {
  name: "Webleta",
  url: "https://webleta.com",
  // Old webleta.com title, description, social text and share image (served locally now).
  title: "Senior Developer for Digital Agencies | Webleta",
  description:
    "Senior developer Graham Orprecio from the Philippines, working as a reliable extension of digital agencies for web development, design, e-commerce, SEO and ongoing web production.",
  author: "Graham Orprecio",
  /** Open Graph description (Facebook, LinkedIn). */
  shareDescription:
    "Senior developer Graham Orprecio works as an extension of digital agencies, handling web development, design, e-commerce, SEO and ongoing web production.",
  twitterDescription:
    "Senior developer supporting digital agencies with web production, custom development, e-commerce and SEO.",
  shareImage: { src: "/og-portfolio.jpg", width: 1598, height: 2560, alt: "Webleta web development portfolio and agency support by Graham Orprecio" },
  /**
   * True on webleta.com: index/follow meta and a robots.txt with the sitemap. The *.pages.dev
   * URLs stay out of search through the host-scoped X-Robots-Tag in public/_headers.
   */
  indexable: true,
  // Jasper, 2026-11-22: don't state a base on the site. Graham, 2026-11-23: we serve clients
  // worldwide; Australia is the priority market (close timezone), shown as a strength, not a limit.
  location: "Working with businesses worldwide, on hours that suit Australia and Asia-Pacific",
};

// Old webleta.com navigation (Graham's portfolio), same labels and anchors.
export const navigation: Link[] = [
  { label: "Home", href: "/" }, // the Webleta homepage, not the top of /graham (Graham, 2026-11-24)
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#tools" },
  { label: "Projects", href: "#projects" },
];

/**
 * The only actions outside the hero (Graham, 2026-11-23): the WhatsApp call button, a booked
 * call (Graham's Google Calendar booking page) and the contact form. No mailto links.
 */
// Graham's booking page from the old webleta.com.
export const booking = "https://calendar.app.google/HLPbRiYHJnFQB6xv9";
export const bookCall: Link = { label: "Book a call", href: booking };
export const startProject: Link = { label: "Start your project", href: "#contact" };

/** Opens off-site links (the booking page) in a new tab. */
export function linkProps(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {};
}

export const headerCta: Link = bookCall;

/**
 * WhatsApp chat in the header (desktop and the mobile menu). `number` is international
 * format without "+" or spaces; the button opens a wa.me chat in a new tab with `message`
 * pre-filled. Set to null to send the button to the contact section instead.
 */
export const whatsapp = {
  // Webleta's WhatsApp (Graham, 2026-11-22), a Philippine mobile. Replaces the ACMA fiction
  // placeholder +61 491 570 156.
  display: "+63 955 622 9968",
  number: "639556229968" as string | null,
  message: "Hi Webleta, I'd like to talk about a website.",
};

export function whatsappHref() {
  return whatsapp.number
    ? `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`
    : "#contact";
}

export const hero = {
  // Old webleta.com hero, word for word, in an editorial layout (after Marcus Lorenzet's
  // portfolio hero): Graham's cut-out portrait behind a three-line uppercase headline with the
  // old hero's two result badges as inline tiles. The lede keeps its first sentence only.
  eyebrow: "Senior developer & agency web production partner",
  headline: {
    lines: ["I support", "digital", "Agencies,", "grow with me."],
    spoken: "I support digital. Agencies, grow with me.",
  },
  lede: "I’m a developer who works as an extension of digital agencies, handling fast, polished and reliable website production.",
  actions: [
    { label: "Send me an email", href: "mailto:graham.orprecio12@gmail.com" },
    { label: "Message me on WhatsApp", href: "https://wa.me/639556229968" },
  ] satisfies Link[],
  // The two floating badges on the old hero visual, now the headline's inline tiles.
  stats: [
    { value: "+214%", label: "traffic" },
    { value: "98", label: "speed score" },
  ],
  // review-media.jpg (Downloads, 2350x1792; also the Reviews photo), resized only.
  portrait: {
    base: "/images/portfolio/hero-graham-coffee",
    width: 2350,
    height: 1792,
    alt: "Graham Orprecio in glasses and a dark shirt, holding a takeaway coffee cup in late-afternoon sun.",
  },
  scroll: { label: "Scroll", href: "#about" },
  secondaryCta: { label: "See the work", href: "#work" },
  // Graham's outline: social icons under the buttons.
  // UNCONFIRMED: no profile URLs yet. href null renders the icon without a link.
  social: [
    // Revision 88: Facebook, Instagram, Upwork and email (Gmail icon), per the hero notes.
    // Links from Graham, 2026-11-22. UNCONFIRMED: no Instagram profile yet (href null shows the
    // icon without a link).
    // Graham's profiles, from the old webleta.com footer.
    { platform: "facebook", label: "Graham on Facebook", href: "https://web.facebook.com/graham.orprecio" },
    { platform: "instagram", label: "Graham on Instagram", href: "https://www.instagram.com/graahaaaam/" },
    { platform: "upwork", label: "Graham on Upwork", href: "https://upwork.com/freelancers/~01a9fa727d39310eaa" },
  ] satisfies SocialLink[],
  // Graham's outline: three staggered cards, Design / Market / Conversion.
  // Photos generated for these cards (fal flux-pro v1.1-ultra, 16:9, 2026-11-13); illustrations,
  // never client projects. Manifest: Webleta-AI-Generated-Images/manifest-2026-11-13-hero-cards.csv
  cards: [
    {
      label: "Design",
      // IMG_1441 / 1444 / 1446: seamless 6 s loops (last second crossfades into the first), real
      // speed, natural colour. `#t=` staggers where each starts, so the three never loop in step.
      // Colour grade (2026-11-22): the three clips shot under different light (Design warm,
      // Market dark and saturated, Conversion cool and contrasty). Each gets a CSS filter plus a
      // soft-light tint, solved by sampling frames so all three land on one neutral-cool look
      // (mean RGB about 114/115/117, contrast SD 74, saturation 0.35; a step down from 0.40, which read too saturated). Conversion is
      // mostly a white screen, so its saturation is held at 1.2x to avoid a cast. See .grade in HeroSlider.module.css.
      video: {
        src: "/videos/hero-design-vid.mp4",
        poster: "/images/hero-design-cine-poster.webp",
        grade: { filter: "brightness(1.04) contrast(1.15) saturate(0.92)", tint: "rgb(102 128 160)" },
      },
      image: {
        src: "/images/card-design-1280.webp",
        srcSet: "/images/card-design-720.webp 720w, /images/card-design-1280.webp 1280w",
        width: 1280,
        height: 720,
        // Alts describe the videos, which are what's on screen (2026-11-23).
        alt: "A Webleta developer at a widescreen monitor working on the Ground Control Systems website we designed and built.",
      },
    },
    {
      label: "Market",
      video: {
        src: "/videos/hero-market-cine.mp4#t=2",
        poster: "/images/hero-market-cine-poster.webp",
        grade: { filter: "brightness(1.11) contrast(1.19) saturate(0.82)", tint: "rgb(120 142 152)" },
      },
      image: {
        src: "/images/card-market-1280.webp",
        srcSet: "/images/card-market-720.webp 720w, /images/card-market-1280.webp 1280w",
        width: 1280,
        height: 720,
        alt: "A phone showing Melbourne Entertainment Company's Instagram profile in front of the website we built for them on a laptop.",
      },
    },
    {
      label: "Conversion",
      video: {
        src: "/videos/hero-conversion-cine.mp4#t=4",
        poster: "/images/hero-conversion-cine-poster.webp",
        grade: { filter: "brightness(0.92) contrast(1.02) saturate(1.2)", tint: "rgb(126 106 118)" },
      },
      image: {
        src: "/images/card-conversion-1280.webp",
        srcSet: "/images/card-conversion-720.webp 720w, /images/card-conversion-1280.webp 1280w",
        width: 1280,
        height: 720,
        alt: "A customer filling in the quote request form on a Melbourne entertainment company's website, turning a visit into an enquiry.",
      },
    },
  ] satisfies HeroCard[],
  /**
   * The two kinds of client Webleta serves (Notion: Agency Business Model & Positioning,
   * "Target client types"), as a toggle like Webtec's. Copy per tab from V1.6 p.4.
   * UNCONFIRMED: no preview workflow or brief form exists yet. Both actions go to #contact
   * and send nothing. The business tab passes the typed URL along as ?website=<url> so
   * the next step (a form or booking tool, once connected) can read it without asking again.
   */
  audiences: [
    {
      // Revision 88: tab and button wording from the hero notes.
      id: "business",
      label: "View my new site, for free",
      field: { label: "Your business website", placeholder: "yourbusiness.com.au" },
      action: "Get my free design",
      href: "#steps",
      note: "Your own design, never a theme with your logo on it.",
    },
    {
      // UNCONFIRMED: no booking tool yet, so the meeting button goes to the contact form.
      id: "team",
      label: "I need a digital marketing team",
      action: "Schedule me a meeting",
      href: "#contact",
      note: "For businesses and agencies: design, development, SEO and social from one team.",
    },
  ] satisfies Audience[],
};

/**
 * Three hooks in the band under the hero: Graham's "free demo / flexible / affordable",
 * rewritten as hooks (humanizer skill, 2026-11-13).
 * UNCONFIRMED: Graham marked these as placeholders. The free demo is not a confirmed
 * offer; "Flexible" follows the proposed engagement models in Notion (project,
 * subscription, ad hoc); "Affordable" follows the Notion value proposition.
 */
// The old webleta.com hero's three credential points, word for word.
export const hooks: Hook[] = [
  { lead: true, title: "Agency-ready web production", text: "Reliable builds delivered around your brand, clients and deadlines" },
  { title: "Web production expert", text: "Custom front-end, CMS & e-commerce development" },
  { title: "SEO & performance support", text: "Built for search visibility, speed and a better client experience" },
];

/**
 * Profiles in the trust band (Graham, 2026-11-23): Upwork and Facebook, the two real public
 * profiles we have. Google Reviews and Trustindex were removed because no profiles exist yet;
 * add Google back (icon /brands/google-g.svg) once the Google Business Profile has reviews.
 * Marks are Simple Icons paths in each brand's colour.
 */
// The old site's hero strip had no profiles band, so it's empty (StatsRail hides it).
export const trust = {
  title: "Find us on",
  platforms: [] as TrustPlatform[],
};

/**
 * About section (Graham's outline: "freedom for creativity"). Copy from V1.6 p.3-4
 * ("Who we are", "What we're for"), shortened with the humanizer skill, 2026-11-14.
 * Jasper: no mention of tools or AI on the site, so V1.6's AI-assisted paragraph is left out.
 * UNCONFIRMED: all of it is proposed copy until Graham approves V1.6 p.3-5.
 */
// Old webleta.com "Excellence" section, word for word. Empty lists/strings hide those parts.
export const about = {
  eyebrow: "About me",
  // The small label beside the story paragraph (it used to share the eyebrow field).
  label: "Agency web development",
  statement: "Senior development, built for agency teams.",
  // Gets the Seafoam highlighter, drawn in as the statement scrolls (as on the agency site).
  mark: "agency teams",
  story: {
    text: "I combine polished design, reliable web development, strong SEO, and performance-focused thinking to help agencies deliver websites that look sharp, work smoothly, and meet their clients’ goals without adding another full-time developer.",
  },
  // The old section's two image badges (client results) and its four counters (track record),
  // as one ledger in two groups. Figures count up once on scroll, as they did on the old site.
  ledger: [
    { title: "Client results", stats: [
      { value: "+180%", label: "Organic traffic growth" },
      { value: "0.9s", label: "Average load time" },
    ] },
    { title: "Track record", stats: [
      { value: "40+", label: "Projects delivered" },
      { value: "15", label: "Clients supported" },
      { value: "7+", label: "Years in web development" },
      { value: "2k+", label: "Tasks completed" },
    ] },
  ],
  link: { label: "Get started", href: booking },
  // Three homepages in angled browser windows, after the V5.2.1 Facebook cover (same
  // screenshots, perspective and window chrome). Left, front, right.
  windows: [
    { src: "/images/benefits/screen-legal.webp", w: 878, h: 3015, alt: "The 411 Legal Services homepage: Find a Lawyer Near You." },
    { src: "/images/benefits/screen-groundcontrol.webp", w: 874, h: 1581, alt: "The Ground Control Systems homepage: Design. Build. Install." },
    { src: "/images/benefits/screen-racknroad.webp", w: 452, h: 736, alt: "The Rack n Road online store homepage: We fit for adventure." },
  ],
};

/**
 * Benefits (Graham's outline: "Pros of having digital presence, more sales / more booking,
 * create dummy for now"; reference: a scrollable row of outcome cards with prev/next).
 * Humanizer pass 2026-11-14.
 * UNCONFIRMED: placeholder copy, no statistics. Items, places and prices in the cards are
 * illustrative examples, not real orders or results.
 * Revision 95 (Jasper, 2026-11-18): three cards show a real Webleta build, each framed a
 * as a device mockup (browser windows, and a phone in front of a laptop view for 411 Legal,
 * from the client's own screenshots in source-assets/411legal-screenshots-2026-11-18). Front pages are cropped from Graham's published
 * portfolio boards at full size (originals in source-assets/portfolio-originals-2026-11-18,
 * from the GitHub URLs in manifest-2026-11-16-work.csv) into public/images/benefits/.
 * The other three are coded illustrations ("premium vectors", Graham) in our own style.
 * Check with Graham that these three projects can appear here.
 * The Revision 32 fal photos (benefit-*.webp) are no longer used but are kept.
 * Stage colours follow each project's own palette (MEC charcoal and blush, Ground Control
 * amber, 411 Legal navy and gold); the illustrated cards take V1.6 supporting colours.
 */
export type BenefitVisual = "order" | "booking" | "quote" | "search" | "call" | "trust";
export type SupportColour = "coral" | "dusk" | "harbour" | "kelp" | "ochre" | "shell" | "noir" | "navy";
export type Benefit = {
  id: string;
  tag: string;
  title: string;
  /** The word(s) in the title that get the colour marker. */
  mark: string;
  text: string;
  visual: BenefitVisual;
  colour: SupportColour;
  /** Where the note sits on the stage: top/middle/bottom, left/right. */
  note: "tl" | "tr" | "ml" | "mr" | "bl" | "br";
  /** A real project (a full-length front page) and how it's framed; without it, the card
   *  shows a coded illustration for its visual. `back` is a second page for the fan. */
  project?: { name: string; frame: "browser" | "browser-bleed" | "phone"; screen: string; w: number; h: number; alt: string; back?: { screen: string; w: number; h: number } };
};

export const benefits = {
  eyebrow: "Why it pays off",
  title: "How a better website brings in more work.",
  titleMark: "more work", // Seafoam highlighter, as in About
  intro: "A shop counts orders. A builder counts the right jobs. We find out what a win is for you, then build the site to bring it in.",
  items: [
    {
      id: "bookings", tag: "Events and entertainment", title: "More bookings", mark: "bookings",
      text: "Couples check a date at 10pm on a Sunday. Your calendar fills while you work.",
      visual: "booking", colour: "noir", note: "bl",
      project: { name: "Melbourne Entertainment Company", frame: "browser", screen: "/images/benefits/screen-mec.webp", w: 902, h: 2108,
        alt: "The Melbourne Entertainment Company homepage, a site we built: black and white photos of performers at weddings." },
    },
    {
      id: "quotes", tag: "Builders and suppliers", title: "More quote requests", mark: "quote requests",
      text: "The job details arrive up front, so you quote the work worth doing.",
      visual: "quote", colour: "ochre", note: "br",
      // Revision 104 (Graham: "yung 1st and 2nd magkamukha", same mockup and angle as card 1): the
      // full-length page in perspective, running off the bottom, instead of a flat window.
      project: { name: "Ground Control Systems", frame: "browser-bleed", screen: "/images/benefits/screen-groundcontrol.webp", w: 874, h: 1581,
        alt: "The Ground Control Systems homepage, a site we built: Design. Build. Install. over a night photo of bike racks." },
    },
    {
      id: "sales", tag: "Online stores", title: "More sales", mark: "sales",
      text: "More of the people who visit end up buying.",
      visual: "order", colour: "dusk", note: "bl",
    },
    {
      id: "trust", tag: "Law and advice", title: "Taken seriously", mark: "seriously",
      text: "Clear services and real photos of your team help people trust you before they call.",
      visual: "trust", colour: "navy", note: "br",
      project: { name: "411 Legal Services", frame: "phone", screen: "/images/benefits/legal-phone.webp", w: 393, h: 1239,
        alt: "The 411 Legal Services homepage on a phone and a laptop, a site we built: Find a Lawyer Near You.",
        back: { screen: "/images/benefits/legal-desktop.webp", w: 1040, h: 650 } },
    },
    {
      id: "calls", tag: "Home services", title: "More calls", mark: "calls",
      text: "People tap Call on your site and your phone rings. Nobody hunts for the number.",
      visual: "call", colour: "kelp", note: "br",
    },
    {
      id: "found", tag: "Local shops and cafés", title: "Found first", mark: "first",
      text: "Show up when someone nearby searches for what you make.",
      visual: "search", colour: "coral", note: "br",
    },
  ] satisfies Benefit[],
};

/**
 * Problems we solve (2026-11-23, Graham's "sell solutions, not just services" table). Each row
 * is a pain point in the owner's own words, then what Webleta does about it and which service
 * that is, so visitors see the purpose of each service before they reach the Services grid.
 * UNCONFIRMED: copy for Graham and Jasper to approve.
 */
export type Problem = { id: string; pain: string; fix: string; text: string; service: string };
export const problems = {
  eyebrow: "Problems we solve",
  title: { solid: "Website problems that", outline: "cost you sales." },
  intro: "A website is only the tool. What you want is more calls, bookings and sales. Here's what usually gets in the way, and how we fix it.",
  painLabel: "The problem",
  fixLabel: "How we fix it",
  items: [
    { id: "outdated", pain: "Your website looks outdated", fix: "A modern redesign that matches your brand",
      text: "We redesign your site so it looks as good as the work you do, on every screen.", service: "Website redesign" },
    { id: "none", pain: "You don't have a website yet", fix: "A professional website, built from scratch",
      text: "We plan the pages, shape the words with you and launch a site customers can find and trust.", service: "Website design and development" },
    { id: "enquiries", pain: "Visitors look, but don't get in touch", fix: "Clear messaging and calls to action",
      text: "We rewrite your pages around what customers need, and put calling, booking or quoting one tap away.", service: "Conversion-focused design" },
    { id: "slow", pain: "Your site is slow on mobile", fix: "Fast, mobile-first performance",
      text: "We optimise images, code and hosting so pages load quickly on the phones most customers use.", service: "Speed optimisation" },
    { id: "google", pain: "Customers can't find you on Google", fix: "Technical SEO and content structure",
      text: "We fix the technical basics, structure every page around real searches and add local SEO so nearby customers find you first.", service: "SEO and local SEO" },
    { id: "credible", pain: "Competitors look more credible", fix: "A stronger identity and trust signals",
      text: "Real photos, reviews, clear services and a consistent brand help people choose you before they call.", service: "Branding and web design" },
    { id: "update", pain: "Your site is hard to update", fix: "Content you can edit yourself",
      text: "We build on a platform that suits you and show you how to change text, photos and prices without a developer.", service: "CMS builds" },
    { id: "cost", pain: "Maintenance keeps costing you", fix: "An efficient site that's easy to look after",
      text: "Clean, maintainable builds, with hosting, backups and updates in one predictable monthly plan.", service: "Website care plans" },
    { id: "agency", pain: "Your agency team is at capacity", fix: "White-label design and development",
      text: "We take on builds, fixes and overflow work under your agency's name, inside the process you already run.", service: "Agency support" },
  ] satisfies Problem[],
  cta: { lead: "Recognise your business here?", ...bookCall },
};

/* ------------------------------------------------------------------------------------------
 * Sections built 2026-11-14 (Revision 37). Graham's outline order: Services, CTA banner,
 * Steps (optional in the outline), Portfolio, Reviews, Logos, Pricing, Contact.
 * Everything below is UNCONFIRMED placeholder copy unless a source is named.
 * ---------------------------------------------------------------------------------------- */

export type ServiceIcon = "code" | "web" | "app" | "search" | "mail" | "phone" | "social" | "pen" | "care";

/** A platform logo (Simple Icons, CC0 SVG data; marks belong to their owners) in its brand colour. */
export type PlatformLogo = { name: string; file: string; colour: string };

/**
 * A device photo with a blank screen. `screen` is the screen's box in % of the photo,
 * measured from the image, so the coded interface sits exactly on the glass.
 */
export type DeviceStage = {
  base: string;
  width: number;
  height: number;
  alt: string;
  screen: { left: number; top: number; width: number; height: number; radius: string };
};

/** Tile colour: Aqua (core) for the hero, V1.6 supporting colours (p.14) for the rest. */
export type TileColour = "aqua" | "ochre" | "harbour" | "dusk" | "coral" | "kelp" | "shell" | "ember" | "navy" | "seafoam";

export type ServiceTile = {
  id: string;
  title: string;
  /** The hero tile sets its second line in outline type. */
  outline?: string;
  text: string;
  icon: ServiceIcon;
  colour: TileColour;
  /** Grid slot, following Graham's reference bento. */
  slot: "hero" | "a" | "b" | "wide" | "c" | "d" | "e" | "f";
  /** Availability pill, as on the old webleta.com ("Available now" / "Coming soon"). */
  status?: string;
  /** A photo shown in duotone over the tile colour. */
  photo?: { base: string; alt: string; position?: string };
  /** Or a device photo with a coded screen on its glass. */
  stage?: DeviceStage;
  ui?: "dashboard" | "app";
  logos: PlatformLogo[];
  /** The photo is light where the icon sits, so the icon is drawn dark. */
  /** Or a coded scene instead of a photo: a real build in a browser with a photo print (R105). */
  art?: "build";
  lightCorner?: boolean;
};

const logo = {
  wordpress: { name: "WordPress", file: "/brands/si/wordpress.svg", colour: "#21759B" },
  next: { name: "Next.js", file: "/brands/si/nextdotjs.svg", colour: "#000000" },
  astro: { name: "Astro", file: "/brands/si/astro.svg", colour: "#BC52EE" },
  react: { name: "React", file: "/brands/si/react.svg", colour: "#087EA4" },
  google: { name: "Google", file: "/brands/si/google.svg", colour: "#4285F4" },
  gmail: { name: "Gmail", file: "/brands/si/gmail.svg", colour: "#EA4335" },
  apple: { name: "Apple", file: "/brands/si/apple.svg", colour: "#000000" },
  android: { name: "Android", file: "/brands/si/android.svg", colour: "#34A853" },
  instagram: { name: "Instagram", file: "/brands/si/instagram.svg", colour: "#E4405F" },
  facebook: { name: "Facebook", file: "/brands/si/facebook.svg", colour: "#0866FF" },
  tiktok: { name: "TikTok", file: "/brands/si/tiktok.svg", colour: "#000000" },
  linkedin: { name: "LinkedIn", file: "/brands/si/linkedin.svg", colour: "#0A66C2" },
} satisfies Record<string, PlatformLogo>;

/**
 * Services: the old webleta.com "WordPress Production & Agency Support" list, word for word,
 * with its availability labels. Eight services, so the bento gains an eighth slot (f).
 * Photos are the agency site's existing duotone photos, matched to each service.
 */
export const services = {
  eyebrow: "Services",
  title: { mark: "Web Production", rest: "& Agency Support" },
  intro: "I focus on web development, design, maintenance and SEO, helping digital agencies deliver client websites, updates and ongoing web production reliably.",
  tiles: [
    {
      id: "wordpress", slot: "hero", colour: "seafoam", icon: "code", status: "Available now",
      title: "Web development",
      text: "Custom websites and web apps developed for speed, stability, usability and long-term client support.",
      art: "build",
      logos: [logo.wordpress, logo.react, logo.next],
    },
    {
      id: "design", slot: "wide", colour: "dusk", icon: "pen", status: "Available now",
      title: "Design implementation", text: "Designs translated into polished, responsive pages around your agency’s standards, client goals and conversion paths.",
      photo: { base: "/images/services/svc-apps", alt: "Close-up of code in a code editor while a website is being built.", position: "50% 50%" },
      logos: [],
    },
    {
      id: "seo", slot: "a", lightCorner: true, colour: "ochre", icon: "search", status: "Available now",
      title: "SEO support", text: "On-page and technical SEO support focused on stronger search visibility, performance and helping clients get found.",
      photo: { base: "/images/services/svc-seo", alt: "A phone open on the Google search page, with the Google logo on a screen behind it.", position: "50% 50%" },
      logos: [logo.google],
    },
    {
      id: "production", slot: "b", colour: "navy", icon: "care", status: "Available now",
      title: "Website production", text: "Ongoing updates, maintenance and support to keep client websites current, secure and running smoothly.",
      logos: [],
    },
    {
      id: "email", slot: "d", colour: "harbour", icon: "mail", status: "Coming soon",
      title: "Web emails", text: "Professional email addresses and inboxes set up on client domains for a more credible online presence.",
      photo: { base: "/images/services/svc-email", alt: "Close-up of a phone screen showing the Google and Calendar app icons.", position: "50% 50%" },
      logos: [logo.gmail],
    },
    {
      id: "apps", slot: "e", colour: "coral", icon: "app", status: "Coming soon",
      title: "Web/Mobile apps", text: "Custom tools and dashboards that extend what a standard agency website can do.",
      photo: { base: "/images/services/svc-mobile", alt: "A hand holding a phone with app icons in front of a website on a monitor.", position: "50% 50%" },
      logos: [],
    },
    {
      id: "social", slot: "c", colour: "kelp", icon: "social", status: "Coming soon",
      title: "Social media", text: "Consistent posting and management across your clients' social channels.",
      photo: { base: "/images/services/svc-social", alt: "A phone with a Social folder of Facebook, Instagram, WhatsApp and YouTube apps.", position: "50% 50%" },
      logos: [logo.instagram, logo.facebook],
    },
    {
      id: "content", slot: "f", colour: "shell", icon: "pen", status: "Coming soon",
      title: "Content marketing", text: "Blog posts and on-site content prepared to improve visibility, attract the right audience and support conversions.",
      photo: { base: "/images/services/svc-content", alt: "Hands on a laptop designing content for a blog and social posts in Canva.", position: "50% 50%" },
      logos: [],
    },
  ] satisfies ServiceTile[],
  // The old section had no closing strip.
  more: null as null | { title: string; text: string; action: Link },
};

/** CTA banner (Graham: "cta banner"). The outlined word reuses the hero's outline device. UNCONFIRMED copy. */
export const ctaBanner = {
  // Old webleta.com CTA banner, word for word.
  eyebrow: "Let’s work together",
  title: { first: "Need a web production partner?", highlight: "web production partner", outline: "", rest: "" },
  text: "Book a meeting and let's discuss your agency workload, client projects, and how I can support your team.",
  primary: { label: "Book a 30-minute call", href: booking } as Link,
  secondary: null as Link | null,
  stack: [] as string[],
  // Revision 47: a full-resolution overhead studio desk (fal flux-pro ultra, 21:9), no people,
  // screens off; wireframe lettering inpainted. Decorative, so alt is empty.
  image: { base: "/images/cta-studio-hq", width: 3136, height: 1344, alt: "" },
};

/**
 * Steps (Graham's outline: "Steps / OPTIONAL"; reference "See it before we build it").
 * Ties to the band's "See it first" hook. UNCONFIRMED: the free preview offer is not
 * confirmed by Graham. The compare slider is an illustration, not a client site.
 */
/** Copy for the shared three-step request form (components/RequestForm.tsx). */
export type RequestFormCopy = {
  title: string;
  reply: string;
  progress: string;
  steps: { label: string; title: string; hint: string }[];
  goals: { id: string; label: string; note: string }[];
  next: string;
  back: string;
  submit: string;
  trust: string;
  sent: string;
  /** The email subject, before ": <website>". */
  subject: string;
  errors: { website: string; email: string };
};

export const steps = {
  eyebrow: "How it works",
  title: { solid: "Free preview", outline: "before you pay." },
  intro: "Send us your website. We design a real preview of your new homepage, before you pay anything. If you like it, we build the rest. If not, you've lost nothing.",
  // Revision 51: each step says what it costs. UNCONFIRMED: Graham to confirm the free preview offer.
  items: [
    { title: "Free preview", text: "We redesign your homepage as a working preview, in your brand.", pay: "Free" },
    { title: "Plan the pages", text: "Like it? We agree the pages, the scope and the price, in writing.", pay: "Free" },
    { title: "Build and launch", text: "We build it, move your content across and put it live.", pay: "Agreed price" },
  ],
  // Revision 52: the example preview is Tidewell Physio, a fictional physio group with three
  // Brisbane clinics (Notion: Australian local service businesses, often multi-location,
  // where booking is the conversion). Names, hours, times and the rating are illustrative.
  // Photo: fal flux-pro ultra (tidewell-knee, Revision 61), polo lettering healed locally.
  compare: {
    label: "Compare the site today with the preview",
    before: "Today",
    after: "Your preview",
    hint: "Drag to compare. An example: yours is designed for your business.",
    url: "tidewellphysio.com.au",
    start: 20,
    today: {
      name: "Tidewell Physiotherapy",
      phone: "Call us: 07 3123 4567",
      hours: "Mon to Fri 8am - 6pm",
      nav: ["Home", "About Us", "Services", "Our Team", "Contact Us"],
      book: "Book Now",
      title: "Welcome to Tidewell Physiotherapy",
      servicesTitle: "Our Services",
      services: ["Physiotherapy", "Remedial Massage", "Clinical Pilates"],
      button: "Read More",
      footer: "Copyright 2014 Tidewell Physiotherapy. All rights reserved.",
    },
    preview: {
      name: "Tidewell",
      nav: ["Treatments", "Clinics", "Team", "Prices"],
      phone: "07 3123 4567",
      book: "Book online",
      headline: ["Find out why", "your knee hurts."],
      sub: "Physio, pilates and massage at three Brisbane clinics. We find the cause first.",
      cta: "Book an assessment",
      link: "Find your clinic",
      announce: "Now open in Bulimba, with Saturday appointments from 8 am.",
      reviews: {
        google: { score: "4.9", count: "380 reviews" },
        trustindex: "Verified reviews",
        claims: "HICAPS claims on the spot",
      },
      slot: { label: "Free today, New Farm", times: ["3:40", "4:20", "5:50"], unit: "pm" },
      clinics: [
        { name: "New Farm", hours: "Today, 7 am to 7 pm" },
        { name: "Paddington", hours: "Today, 7 am to 6 pm" },
        { name: "Bulimba", hours: "Saturdays, 8 am to 1 pm" },
      ],
      image: { base: "/images/steps-tidewell", width: 1792, height: 2368 },
    },
  },
  // Revision 51: the preview request. No form service yet, so it opens the visitor's email app,
  // the same as Contact. UNCONFIRMED: replace with the real form service.
  // Revision 54: a three-step request. No form service yet, so it opens the visitor's email
  // app, the same as Contact. UNCONFIRMED: replace with the real form service.
  form: {
    title: "Get your free preview",
    reply: "A person replies within one working day.",
    progress: "Step",
    steps: [
      { label: "Website", title: "Which site should we redesign?", hint: "No website yet? Type your business name instead." },
      { label: "Goal", title: "What should the new site win you?", hint: "Pick the one that matters most. We design around it." },
      { label: "Details", title: "Where should we send your preview?", hint: "We'll email it to you. No calls unless you ask." },
    ],
    goals: [
      { id: "calls", label: "More calls", note: "People ring you from the site" },
      { id: "bookings", label: "More bookings", note: "Appointments booked online" },
      { id: "sales", label: "More sales", note: "Orders through the site" },
      { id: "quotes", label: "More quote requests", note: "Enquiries for bigger jobs" },
    ],
    next: "Continue",
    back: "Back",
    submit: "Get my free preview",
    trust: "Free. No card, no contract. You decide after you've seen it.",
    sent: "Your email app has your request ready. Press send there and we'll start on your preview.",
    subject: "Free preview request",
    errors: { website: "Add your website or business name to continue.", email: "Add an email address we can send the preview to." },
  } satisfies RequestFormCopy,

};


/**
 * Work (Graham: "Portfolio - freedom of display"). Real WordPress builds from Graham's live
 * portfolio at webleta.com, where they're already published. Each image is Graham's whole
 * presentation board, resized only (see manifest-2026-11-16-work.csv). Sectors are read from
 * the pages themselves.
 */
export type Project = {
  id: string;
  name: string;
  sector: string;
  /** Graham's whole presentation board, exported at 640 and 1000 wide. Width and height are the 1000 file's. */
  image: { base: string; w: number; h: number; alt: string };
};

export const work = {
  // Old webleta.com "Selected WordPress work": its order, names and categories. The category
  // filter isn't carried over (the flythrough shows one board at a time).
  eyebrow: "Portfolio",
  title: { solid: ["Some of"], outline: "my work" },
  // The old intro sits in the frame's bottom row: under the title, the boards fly through it.
  cta: { lead: "A selection of web work covering development, design, e-commerce and digital services for agency and direct clients.", label: "Discuss agency work", href: booking },
  items: [
    { id: "pyper", name: "Pay the Pyper", sector: "Digital Services",
      image: { base: "/images/work/pyper", w: 1000, h: 1602, alt: "Pay the Pyper: two dark homepage layouts with green headlines and phone screens, on a green presentation board." } },
    { id: "groundcontrol", name: "Ground Control Systems", sector: "E-commerce",
      image: { base: "/images/work/groundcontrol", w: 1000, h: 993, alt: "Ground Control Systems: night photos of bike racks with orange highlights, on an orange board." } },
    { id: "wazzas", name: "Wazzas Pool", sector: "Services",
      image: { base: "/images/work/wazzas", w: 1000, h: 2090, alt: "Wazzas Pool: two long homepage layouts with photos of finished concrete pools, on a blue presentation board." } },
    { id: "portside", name: "Portside Marketing", sector: "Digital Services",
      image: { base: "/images/work/portside", w: 1000, h: 2040, alt: "Portside Marketing: blue pages for website design, branding, SEO and conversion marketing, on a blue board." } },
    { id: "webleta", name: "Webleta", sector: "Digital Services",
      image: { base: "/images/work/webleta", w: 1000, h: 1280, alt: "Webleta: an earlier Webleta site with the headline We build websites that make money, project grid, pricing and team, on a teal and violet board." } },
    { id: "belly", name: "Belly", sector: "Food & Beverage",
      image: { base: "/images/work/belly", w: 1000, h: 993, alt: "Belly: burgers, fries and a product grid with red order buttons, on a red and yellow board." } },
    { id: "racknroad", name: "Rack n Road", sector: "E-commerce",
      image: { base: "/images/work/racknroad", w: 1000, h: 809, alt: "Rack n Road: a car with bikes on the roof under the headline We fit for adventure, on a red board." } },
    { id: "johntraveller", name: "John Traveller", sector: "Lifestyle",
      image: { base: "/images/work/johntraveller", w: 1000, h: 1280, alt: "John the Traveller: a travel blog with a world map, latest trips and a photo gallery, on a dark teal board." } },
    { id: "fort", name: "The Fort", sector: "Services",
      image: { base: "/images/work/fort", w: 1000, h: 1069, alt: "The Fort: air conditioning repair, cleaning and installation pages in light blue, on a pale blue board." } },
    { id: "mec", name: "Melbourne Entertainment Company", sector: "Services",
      image: { base: "/images/work/mec", w: 1000, h: 1280, alt: "Melbourne Entertainment Company: black and white performer photos across two page layouts, on a blush board." } },
    { id: "legal", name: "411 Legal Services", sector: "Services",
      image: { base: "/images/work/legal", w: 1000, h: 1793, alt: "411 Legal Services: navy and white pages with lawyer portraits and practice areas, on a dark navy board." } },
    { id: "bonsai", name: "Bonsai", sector: "E-commerce",
      image: { base: "/images/work/bonsai", w: 1000, h: 809, alt: "Bonsai: two clean white store pages of potted bonsai trees, on a soft green board." } },
  ] satisfies Project[],
};

/**
 * Reviews (Graham: "text based atm - but reserve space for portrait vid"). Real reviews,
 * quoted word for word (2026-11-16): four client testimonials from Graham's live site
 * (webleta.com), two LinkedIn recommendations for Jasper and two Upwork client reviews for
 * Jasper, then (Revision 79, his ask) all of them: four LinkedIn recommendations and eight
 * Upwork reviews, transcribed from his screenshots (Upwork shows no reviewer names; the role
 * is the job title). Long quotes are clipped to one unbroken passage, never stitched.
 * Revision 80 (Graham's notes): new intro line, real desk footage from the team's Drive folder
 * (IMG_1441) in place of the reused photo, and each review shows where it came from as a logo
 * (Upwork, LinkedIn, or the company's symbol), shown in the avatar circle. Upwork hides reviewer
 * names, so those bylines say "Hired Jasper on Upwork" with the job underneath.
 */
export type Review = {
  id: string;
  quote: string;
  name: string;
  role: string;
  /** Where the review lives, and who it's about. */
  source: string;
  /** The logo in the avatar circle: the platform the review is on, or the company's own logo in full
   *  colour (fill: a square icon that fills the circle). Without one the circle shows the initials. */
  via?: { kind: "upwork" | "linkedin" } | { kind: "client"; src: string; fill?: boolean };
  /** Short label for the picker tile. Webtec is named in Giuliano's recommendation. */
  org: string;
  initials?: string;
  /** A phrase from the quote, word for word, shown with the Seafoam marker band. */
  mark?: string;
};
export const reviews = {
  // Old webleta.com testimonials: its heading, intro, button and its one review, word for word.
  eyebrow: "Testimonials",
  title: { solid: "What people", outline: "are saying" },
  intro: "Feedback from clients and teams who trusted me with their websites, development work and digital production.",
  // Graham (2026-11-24): no booking button in the testimonials.
  cta: null as Link | null,
  // 2026-11-22 (Graham): a still photo replaces the desk video (review-media.jpg, WebP 900/1440),
  // with a coded review overlay on top (quote mark, 5-star bubble, arrow, sparks). See Reviews.tsx.
  image: {
    src: "/images/reviews-team-coffee-1440.webp",
    srcSet: "/images/reviews-team-coffee-900.webp 900w, /images/reviews-team-coffee-1440.webp 1440w",
    width: 1440,
    height: 1098,
    alt: "A Webleta team member in glasses smiles at the camera, holding a floral takeaway coffee cup in late-afternoon sun.",
  },
  // Same figure as the homepage testimonials (Graham, 2026-11-24).
  proof: { value: "100%", label: "Job Success on Upwork" } as null | { value: string; label: string },
  items: [
    { id: "daniel", org: "Endtimes Official", initials: "DC", name: "Daniel Clarke", role: "Owner, Endtimes Official", source: "Client of Graham", via: { kind: "client", src: "/brands/clients/colour/endtimes.webp", fill: true },
      quote: "Thank you, Graham, for the professional help in updating my website. Graham's expertise was appreciated, especially in how you guys followed exactly how I envisioned the final product, while offering and implementing some very helpful suggestions. Recommending him!", mark: "followed exactly how I envisioned" },
    // The other three from webleta.com's testimonial slider (2026-11-24), word for word.
    { id: "greg", org: "Ground Control Systems", initials: "GB", name: "Greg Bauer", role: "Chief Executive Officer, Ground Control Systems", source: "Client of Graham", via: { kind: "client", src: "/brands/clients/colour/groundcontrol.webp", fill: true },
      quote: "Graham was an exceptional partner on our WordPress project. He quickly identified and resolved performance issues, and his communication skills were outstanding. Graham’s attention to detail and commitment to delivering exceptional results make him a highly recommended WordPress expert and Web Developer.", mark: "exceptional partner" },
    { id: "olaf", org: "Rack n Road", initials: "OG", name: "Olaf Guerrero", role: "Marketing Director, Rack n Road", source: "Client of Graham", via: { kind: "client", src: "/brands/clients/colour/racknroad.webp" },
      quote: "Graham is proficient in CMS platforms like Divi & WordPress, handling tasks beyond project scopes like email marketing and Google Analytics. With strong SEO knowledge and site optimization skills, he’s reliable and ideal for long-term or short contracts. Professional, punctual, and quick to learn, Graham is recommended for your projects.", mark: "Professional, punctual, and quick to learn" },
    // Adrenaline Solutions has no full-colour logo in public/brands/clients/colour, so its initials show.
    { id: "eureka", org: "Adrenaline Solutions", initials: "EQ", name: "Eureka Quinto", role: "Chief Operating Officer, Adrenaline Solutions", source: "Client of Graham",
      quote: "Graham is a reliable WordPress Developer. We are pleased with his performance. We hired him as a Senior Developer, and we are satisfied with his work. We wholeheartedly recommend him.", mark: "wholeheartedly recommend him" },
  ] satisfies Review[],
};

/**
 * Clients (Graham: "Logos of company we previously worked with"). The real logos from Graham's
 * live site (webleta.com, media/Companies), cropped and saved as single-colour masks in
 * public/brands/clients/, so they can take any brand tone. Portside Marketing's logo is left
 * out: the only file is a blurred raster in a box that can't be recoloured cleanly.
 */
/** ar: the logo file's width / height, so each mark sizes without distortion. */
export type ClientLogo = { id: string; name: string; ar: number; scale?: number };
export const clients = {
  // The old section was only the logo strip, so the heading is off (null hides it).
  eyebrow: "Who I’ve worked with",
  title: null as null | { solid: string; outline: string },
  logos: [
    { id: "groundcontrol", name: "Ground Control Systems", ar: 4.966 },
    { id: "racknroad", name: "Rack n Road", ar: 5.943 },
    { id: "mec", name: "Melbourne Entertainment Co", ar: 8.125 },
    { id: "adrenaline", name: "Adrenaline Solutions", ar: 3.488, scale: 1.45 },
    { id: "nicolesteffen", name: "Nicole Steffen Design", ar: 6.025 },
    { id: "cmc", name: "Creative Marketing Concepts", ar: 6.851 },
    { id: "entertainmentco", name: "Entertainment Co", ar: 6.727 },
  ] satisfies ClientLogo[],
  next: { lead: "Yours could be next", ...startProject },
};

/**
 * Pricing (Graham: "Pricing/ setup"). The ways to work are from V1.6 p.5; V1.6 says
 * "Pricing is not part of this book". UNCONFIRMED: plan terms still need Graham's sign-off.
 */
export type Plan = {
  id: string;
  name: string;
  fit: string;
  price: string;
  unit: string;
  features: string[];
  featured?: boolean;
  /** Featured plans carry a reused photo, shown in brand duotone. */
  image?: { base: string; w: number; h: number };
  action: string;
  /** Where the plan's button goes; defaults to #contact. */
  href?: string;
};
const localProjectPrice = "$1,600";
const localSubscriptionPrice = "$700";

export const pricing = {
  // Old webleta.com "Rate" section, word for word. One group, so no tabs; the middle plan was
  // the highlighted one there too.
  eyebrow: "",
  title: { solid: "Choose how your agency", outline: "can work with me" },
  intro: "Three straightforward ways to work together — from overflow tasks to ongoing dedicated web production.",
  always: [] as string[],
  includes: "This plan includes:",
  preview: null as null | { lead: string; label: string; href: string },
  audiences: [
    {
      id: "agency", label: "For agencies",
      plans: [
        { id: "support", name: "Agency support", fit: "Best for overflow tasks, quick fixes, ongoing updates and flexible support.", price: "$800", unit: "starting rate", action: "Get started", href: booking,
          features: ["Content updates & website edits", "Page updates & improvements", "Small to medium development tasks", "Bug fixes & website maintenance", "Ongoing technical support & any supporting tasks"] },
        { id: "projects", name: "Agency projects", fit: "Best for larger builds, redesigns and complete client website projects.", price: "$1000", unit: "starting price", action: "Get started", href: booking, featured: true,
          image: { base: "/images/service-design", w: 1280, h: 853 },
          features: ["Website development", "Website redesign & development", "Search engine optimization", "Speed optimization", "Custom feature implementation"] },
        { id: "dedicated", name: "Dedicated agency developer", fit: "Work with me long-term as an embedded developer and production partner.", price: "$1760", unit: "starting rate", action: "Get started", href: booking,
          features: ["Web development", "Web design", "Front-end coding", "Maintenance, SEO & performance support", "Reliable agency web production"] },
      ],
    },
  ] satisfies { id: string; label: string; plans: Plan[] }[],
};

/**
 * Contact (Graham's reference: "Tell us your win"). Revision 76: the same three-step request
 * as Steps (shared RequestForm), worded for a project, on the hero's live gradient, with the
 * reused cta-shop photo. No form service yet: sending opens the visitor's email app,
 * addressed to `email` (Graham's Gmail, 2026-11-22; replaced the unconfirmed hello@webleta.com).
 */
export const contact = {
  // Old webleta.com contact section, word for word.
  eyebrow: "Add a web production partner",
  title: { solid: "Let's talk", outline: "about your agency" },
  intro: "Tell me what your agency is building, what needs fixing, or where your team needs web production support.",
  details: [
    { label: "Email me", value: "graham.orprecio12@gmail.com", href: "mailto:graham.orprecio12@gmail.com" },
    { label: "WhatsApp", value: "Chat with me directly", href: "https://wa.me/639556229968" },
    { label: "Response time", value: "Usually within one business day" },
  ] as { label: string; value: string; href?: string }[],
  // The old site's form, posted to the same Web3Forms inbox. Web3Forms access keys are public
  // by design (the old page served this one); messages go to the inbox set up for it.
  message: {
    endpoint: "https://api.web3forms.com/submit",
    hidden: { access_key: "c68d0b77-e6e3-4617-a053-289398837408", subject: "New enquiry from webleta.com", from_name: "Webleta Website" },
    firstName: "First name",
    lastName: "Last name",
    email: "Email address",
    message: "Tell me about your agency or project",
    submit: "Send message",
    sending: "Sending…",
    sent: "Thanks, your message was sent. I usually reply within one business day.",
    failed: "Your message didn't send. Please email graham.orprecio12@gmail.com or message me on WhatsApp.",
  },
  promises: [
    "A site that's yours, never a theme with your logo on it",
    "A clear scope and price, agreed before we start",
    "A reply from a person, usually within one working day",
  ],
  email: "graham.orprecio12@gmail.com",
  // Revision 87 (Jasper): "we should have our face anywhere on the site, even just once."
  // Real photos only, never AI faces. Jasper's from his IMG_0452.HEIC (shirt changed to a
  // plain black tee with fal Nano Banana Pro edit, face untouched, at his request); Graham's from
  // socials_1_1.webp on webleta.com (Jasper to confirm it's him). Both are cut out, matched in
  // exposure and warmth, and set on one Seafoam backdrop with the same framing. Masters:
  // source-assets/team/ (512px PNG).
  // Titles (Jasper, 2026-11-17, updated Revision 92): Project Manager and Technical Head. Both design and develop (the line
  // says so); Graham also leads clients and strategy. The line claims no hand-off: true while the team is these two.
  people: {
    line: "We design and develop every project ourselves.",
    members: [
      { name: "Graham Orprecio", role: "Project Manager", photo: "/images/team-graham-256.webp" },
      { name: "Jasper Diaz", role: "Technical Head", photo: "/images/team-jasper-256.webp" },
    ],
  },
  image: { base: "/images/cta-shop", w: 1600, h: 900, alt: "A corner shop at dusk, its windows lit warm against a navy sky." },
  form: {
    title: "Start your project",
    reply: "A person replies within one working day.",
    progress: "Step",
    steps: [
      { label: "Website", title: "Which site is this about?", hint: "No website yet? Type your business name instead." },
      { label: "Goal", title: "What should the new site win you?", hint: "Pick the one that matters most. We plan around it." },
      { label: "Details", title: "Where should we reply?", hint: "We'll email you a plan and a price. No calls unless you ask." },
    ],
    goals: [
      { id: "calls", label: "More calls", note: "People ring you from the site" },
      { id: "bookings", label: "More bookings", note: "Appointments booked online" },
      { id: "sales", label: "More sales", note: "Orders through the site" },
      { id: "quotes", label: "More quote requests", note: "Enquiries for bigger jobs" },
    ],
    next: "Continue",
    back: "Back",
    submit: "Send my request",
    trust: "No obligation. You get a plan and a price before anything starts.",
    sent: "Your email app has your request ready. Press send there and we'll reply.",
    subject: "Website request",
    errors: { website: "Add your website or business name to continue.", email: "Add an email address we can reply to." },
  } satisfies RequestFormCopy,
};

/**
 * Industries (Graham's "Additional sections"; Revision 83). A bento in the Services style:
 * colour tiles, duotone photos, the 24° notch. Photos are reused from Benefits and Services
 * for now (Jasper's call). Industries only, no project names: Work already shows the
 * projects.
 * Revision 99: ordered by the target industries in Notion (Industry Priority Review, Nov 19):
 * home services and trades, med spas and aesthetics, events and entertainment, dental. Food,
 * online stores, automotive and professional services follow. Salons and health clinics are
 * covered by med spas and dental. Photos are fal (nano-banana-2.1, 2026-11-21; originals in research/fal-originals/) except Events and Automotive.
 */
export type IndustryIcon = "trades" | "food" | "salon" | "health" | "store" | "auto" | "law" | "music" | "spa" | "dental";
export type Industry = {
  id: string;
  slot: "hero" | "wide" | "a" | "b" | "c" | "d" | "e" | "f";
  colour: "aqua" | "periwinkle" | "ochre" | "harbour" | "dusk" | "coral" | "kelp" | "shell" | "seafoam";
  icon: IndustryIcon;
  name: string;
  need: string;
  photo: { src: string; srcSet: string; position?: string; alt: string };
  lightCorner?: boolean;
};
/**
 * After launch (Graham's note, 2026-11-22): a short two-column section so clients know we also
 * do social media branding and posting (not full social media management), alongside SEO with a
 * weekly blog post. Sits between Pricing and FAQ. No prices yet (UNCONFIRMED).
 * The examples belong to a made-up plumber, Harbour Plumbing.
 */
export const growth = {
  eyebrow: "After launch: SEO and social media",
  title: { solid: "Keep new customers finding you.", outline: "Every week." },
  cta: startProject,
  seo: {
    word: "SEO",
    line: "Rank first when they search nearby",
    // The search loops: a query types, results load, and the client's result climbs to the top.
    // Its sitelinks are the weekly blog posts that earn the ranking. Competitors are made up.
    queries: ["plumber near me", "blocked drain plumber", "emergency plumber tonight"],
    map: "/images/growth-map-light.webp",
    place: { kind: "Plumber", status: "Open 24 hours", area: "Balmain" },
    client: {
      name: "Harbour Plumbing",
      description: "Licensed local plumbers for blocked drains, burst pipes, leaking taps and hot water. Same-day callouts across the inner west, with fixed prices and 24/7 emergency help.",
      pages: [
        { title: "Blocked drains", note: "Fixed price, CCTV inspection included" },
        { title: "How much does a blocked drain cost to fix?", note: "Blog · posted this week" },
      ],
      url: "harbourplumbing.com.au",
      title: "Harbour Plumbing | Local plumbers, same-day callouts",
    },
    // Search Console-style report for the made-up client, labelled as an example (antislop R-17).
    // One row per query in the search loop: the row being typed lights, and when the client climbs
    // its position ticks down and its clicks count up.
    report: {
      // Jasper, 2026-11-22: no "Example report" label (overrides antislop R-17); Harbour Plumbing
      // is a made-up demo client throughout this section.
      // Plain words for business owners (Jasper): no "impressions", "CTR" or "position".
      title: "How people find you on Google",
      period: "Last 4 weeks",
      columns: ["What they searched", "Saw you", "Visited", "Your spot"],
      // 28-day figures for one suburb: clicks = impressions × CTR at that position. CTR from 2025
      // studies (about 7.8% at position 4, 19-28% at position 1); impressions sized for local intent.
      // Each search has its own 28-day story (day 1 is a Saturday, so every window ends on a weekday
      // at its high). Shapes from the research: a fast step when on-page fixes land (Portent), a
      // slower ramp while new blog posts get indexed (WebFX), and a non-linear jump from 2nd to 1st
      // (Inc.). Emergency searches come in bursts. Weekends dip throughout (SEJ).
      rows: [
        { impressions: 620, before: { clicks: 48, position: 4.3 }, after: { clicks: 136, position: 1.2 },
          scenario: "Jumped after page fixes",
          days: {
            before: [3, 3, 4, 5, 4, 5, 4, 3, 3, 5, 4, 5, 5, 4, 3, 3, 4, 6, 5, 6, 5, 3, 3, 5, 4, 5, 5, 6],
            after: [3, 3, 4, 5, 4, 5, 4, 3, 3, 5, 4, 6, 5, 5, 4, 4, 9, 10, 9, 11, 10, 6, 6, 10, 11, 10, 12, 14],
          } },
        { impressions: 260, before: { clicks: 13, position: 5.1 }, after: { clicks: 52, position: 1.4 },
          scenario: "Climbing as posts index",
          days: {
            before: [1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 3],
            after: [1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 3, 3, 3, 4, 2, 2, 4, 4, 5, 5, 7],
          } },
        { impressions: 90, before: { clicks: 3, position: 6.2 }, after: { clicks: 23, position: 1.1 },
          scenario: "Spikes on emergencies",
          days: {
            before: [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            after: [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 2, 0, 1, 1, 0, 2, 1, 0, 1, 4],
          } },
      ],
      previous: 58, // the 4 weeks before, for the growth chip
      totals: { clicks: "Visits from Google", position: "Your usual spot" },
    },
  },
  social: {
    word: "Social",
    line: "Branding + posting",
    logo: "/images/growth-logo-harbour.webp",
    // fal identity shots (nano-banana-pro/edit with the logo as reference), crossfaded as the pane's hero.
    brand: [
      { src: "/images/growth-brand-van.webp", alt: "A navy work van wrapped with the Harbour Plumbing logo, the plumber smiling from the driver's window." },
      { src: "/images/growth-brand-flatlay.webp", alt: "Harbour Plumbing business cards, a cap, a folder, a sticker and a phone showing its branded social feed." },
    ],
    scope: "Ads and inbox management aren't included.",
    // The posting week; platform = index into platforms. Lights with the platform pills.
    schedule: [
      { day: "Mon", platform: 2 },
      { day: "Tue", platform: 3 },
      { day: "Wed", platform: 1 },
      { day: "Fri", platform: 4 },
    ],
    platforms: [
      { name: "Meta", slug: "meta" },
      { name: "Facebook", slug: "facebook" },
      { name: "Instagram", slug: "instagram" },
      { name: "YouTube", slug: "youtube" },
      { name: "X", slug: "x" },
    ],
    // A week of posts in the client's brand, mixed formats. platform = index into platforms.
    // fal (nano-banana-pro/edit, logo as reference). The meme post is held back: its caption has
    // a typo ("the the"), awaiting a regenerate.
    posts: [
      { src: "/images/growth-post-instagram-logo.webp", platform: 2, shape: "portrait", alt: "Instagram post: a plumber at an open sink cabinet, 'Blocked drain? We can be there today.'" },
      { src: "/images/growth-post-youtube.webp", platform: 3, shape: "wide", alt: "YouTube thumbnail: the plumber holding a clogged pipe, 'Why your sink blocks'." },
      { src: "/images/growth-post-story-promo.webp", platform: 2, shape: "story", alt: "Instagram Story promo: 'Hot water service, $99 this month. Book online.'" },
      { src: "/images/growth-post-facebook-logo.webp", platform: 1, shape: "portrait", alt: "Facebook post: a shower drain before and after, 'Same drain, 40 minutes later.'" },
      { src: "/images/growth-post-x-logo.webp", platform: 4, shape: "portrait", alt: "Tip post for X: 'Keep fat and oil out of the kitchen sink.'" },
    ],
  },
};

// Card lines (Jasper, 2026-11-22): each speaks to what the owner wants most, 45-53 characters
// so it always wraps to two lines.
export const industries = {
  eyebrow: "Industries",
  title: { solid: "Websites for", outline: "your industry." },
  intro: "Every industry wins customers differently. These are the ones we know best. If yours isn't here, ask us. We'll say honestly whether we're a fit before you spend anything.",
  more: { lead: "Not on the list?", ...bookCall },
  items: [
    { id: "trades", slot: "hero", colour: "periwinkle", icon: "trades", name: "Trades and home services",
      need: "Win the next job while you're still up a ladder.",
      photo: { src: "/images/industries/industry-trades-800.webp", srcSet: "/images/industries/industry-trades-480.webp 480w, /images/industries/industry-trades-800.webp 800w, /images/industries/industry-trades-1280.webp 1280w", position: "55% 40%", alt: "A tradesman in a cap working on a house roof against a blue sky." } },
    { id: "medspa", slot: "wide", colour: "coral", icon: "spa", name: "Med spas and aesthetics",
      need: "Nervous first-timers feel safe enough to book.",
      photo: { src: "/images/industries/industry-medspa-800.webp", srcSet: "/images/industries/industry-medspa-480.webp 480w, /images/industries/industry-medspa-800.webp 800w, /images/industries/industry-medspa-1280.webp 1280w", position: "50% 50%", alt: "A bright, modern med spa treatment room with a treatment bed and equipment." } },
    { id: "entertainment", slot: "a", colour: "dusk", icon: "music", name: "Events and entertainment",
      need: "Sell out the night before the doors even open.",
      photo: { src: "/images/industries/industry-entertainment-800.webp", srcSet: "/images/industries/industry-entertainment-480.webp 480w, /images/industries/industry-entertainment-800.webp 800w, /images/industries/industry-entertainment-1280.webp 1280w", position: "50% 50%", alt: "A crowd at a night concert with flame jets and lasers over the stage." } },
    { id: "dental", slot: "b", colour: "shell", icon: "dental", name: "Dental clinics",
      need: "Empty chairs on Tuesday become booked check-ups.",
      photo: { src: "/images/industries/industry-dental-800.webp", srcSet: "/images/industries/industry-dental-480.webp 480w, /images/industries/industry-dental-800.webp 800w, /images/industries/industry-dental-1280.webp 1280w", position: "50% 50%", alt: "A patient relaxing in a dental chair under the clinic lamp and instruments." } },
    { id: "food", slot: "d", colour: "ochre", icon: "food", name: "Food and hospitality",
      need: "Hungry locals pick you from their phone tonight.",
      photo: { src: "/images/industries/industry-food-800.webp", srcSet: "/images/industries/industry-food-480.webp 480w, /images/industries/industry-food-800.webp 800w, /images/industries/industry-food-1280.webp 1280w", position: "60% 0%", alt: "A guest being served a plate of food at a hot buffet station." } },
    { id: "stores", slot: "e", colour: "kelp", icon: "store", name: "Online stores",
      need: "Wake up to orders that came in while you slept.",
      photo: { src: "/images/industry-ecommerce-800.webp", srcSet: "/images/industry-ecommerce-480.webp 480w, /images/industry-ecommerce-800.webp 800w, /images/industry-ecommerce-1280.webp 1280w", position: "90% 55%", alt: "An online clothing store on a desktop screen, next to a rack of clothes." } },
    { id: "auto", slot: "f", colour: "harbour", icon: "auto", name: "Automotive",
      need: "When the car won't start, they ring you first.",
      photo: { src: "/images/industries/industry-auto-800.webp", srcSet: "/images/industries/industry-auto-480.webp 480w, /images/industries/industry-auto-800.webp 800w, /images/industries/industry-auto-1280.webp 1280w", position: "50% 50%", alt: "A mechanic working under a car raised on a lift in an auto repair workshop." } },
    { id: "professional", slot: "c", colour: "seafoam", icon: "law", name: "Professional services",
      need: "Referrals check you out and like what they find.",
      photo: { src: "/images/industries/industry-professional-800.webp", srcSet: "/images/industries/industry-professional-480.webp 480w, /images/industries/industry-professional-800.webp 800w, /images/industries/industry-professional-1280.webp 1280w", position: "50% 50%", alt: "A professional signing a document at a desk beside a judge's gavel." } },
  ] satisfies Industry[],
};

/**
 * FAQ (Graham's "Additional sections"; Revision 85, built for SEO, AEO and GEO). Every
 * question and full answer is in the HTML, and the same text feeds FAQPage JSON-LD, so
 * search engines and AI answer engines can quote it. Each answer opens with the direct
 * answer in its first sentence and names Webleta where it helps a quote stand alone.
 * Answers repeat what the page already says. UNCONFIRMED: plan terms, ownership,
 * platforms and the worldwide service area need Graham's sign-off.
 */
export type FaqItem = { id: string; q: string; a: string };
export const faq = {
  eyebrow: "FAQ",
  title: { solid: "Your questions,", outline: "answered." },
  intro: "Straight answers about price, process and what you own. If yours isn't here, ask us.",
  more: { lead: "Something else on your mind?", ...bookCall },
  // Personal names appear only in Reviews (Jasper, 2026-11-16).
  signature: { name: "The Webleta team", role: "Webleta" },
  groups: [
    {
      id: "cost", title: "Cost",
      items: [
        { id: "cost", q: "How much does a website cost?", a: `A new Webleta website starts at ${localProjectPrice}, paid once. A subscription starts at ${localSubscriptionPrice} a month and includes updates and hosting. Either way, you see the full price before any work starts.` },
        { id: "monthly", q: "Can I pay in instalments?", a: `Ask us about instalments for a one-off website project. If you’d prefer to pay monthly, subscriptions start at ${localSubscriptionPrice} a month and include a custom website, updates, hosting and backups. The minimum term is 12 months.` },
        { id: "preview", q: "What is the free preview?", a: "The free preview is a real design of your new homepage, made before you pay anything. Send us your website, and if you like the preview we build the rest. If not, you owe us nothing." },
      ],
    },
    {
      id: "process", title: "Process",
      items: [
        { id: "time", q: "How long does a new website take?", a: "It depends on how many pages you need. You get a launch date with your quote, and the free preview usually comes first." },
        { id: "redesign", q: "Can you redesign my outdated website?", a: "Yes. Webleta redesigns outdated websites, keeping the content that works and fixing what holds you back: an old look, slow pages, weak calls to action or poor Google visibility. Start with a free preview of your new homepage." },
        { id: "nosite", q: "I don't have a website. Where do I start?", a: "Send us your business name and what you want more of, such as calls, bookings or sales. We design a free preview of your homepage, then plan the pages and the price with you." },
        { id: "start", q: "What do you need from me to start?", a: "Three things: your current website or business name, what you want the new site to win you, and an email to reply to. We plan the rest with you." },
        { id: "edit", q: "Can I edit the website myself?", a: "Yes. Every project includes training so you can change text, photos and prices yourself. If you'd rather not, we can make changes for you." },
      ],
    },
    {
      id: "ownership", title: "Ownership and services",
      items: [
        { id: "own", q: "Will I own my website?", a: "Yes. If you’re on a subscription, you’ll own your website once you complete the 12-month contract. Your domain and accounts stay in your name." },
        { id: "platform", q: "What platform do you build websites on?", a: "Webleta builds on WordPress when you want to edit the site yourself, and on Next.js or Astro when speed matters most. We recommend one when we quote." },
        { id: "seo", q: "Do you do SEO?", a: "Yes. Every Webleta site is built with search basics: fast pages, clear structure and metadata. Local SEO is also a separate service, with a weekly blog post, if you want ongoing work to rank higher in your area." },
        { id: "social-branding", q: "Do you offer social media branding?", a: "Yes. We can design profile graphics and post templates that match your brand." },
        { id: "social-management", q: "Do you also offer social media management?", a: "Yes. You can add social media support to your website project. We can help with branding, creating posts and publishing them." },
      ],
    },
    {
      id: "agencies", title: "Agencies",
      items: [
        { id: "agencies", q: "Do you work with digital marketing agencies?", a: "Yes. Webleta is the extra hand for digital marketing agencies, from overflow tasks and fixes to full website builds and a dedicated designer or developer, inside your own process and tools." },
        { id: "whitelabel", q: "Is agency work white-labelled?", a: "Yes. Your clients see your agency's name on the work, never ours." },
      ],
    },
  ] satisfies { id: string; title: string; items: FaqItem[] }[],
};

/* ------------------------------------------------------------------------------------------
 * Sections from the old webleta.com with no agency-site equivalent: Skills & Tools, Team and
 * Socials. Word for word from Graham's portfolio (_reference/webleta.com-current/index.html).
 * ---------------------------------------------------------------------------------------- */

/**
 * A tool as an app-icon tile, with its real logo: `si` is a Simple Icons glyph (/brands/si, CC0
 * data; marks belong to their owners) drawn in `fg` on the brand colour `bg`; `image` is the
 * brand's own app icon (/brands/tools, from each brand's site) where Simple Icons has none.
 * Neither: an outlined "+" tile ("& More").
 */
/** `size`: the glyph's share of the tile (default 0.52); wide wordmark-like marks go larger. */
export type Skill = { name: string; si?: string; image?: string; bg?: string; fg?: string; size?: number; href?: string };

export const skills = {
  eyebrow: "My toolbox",
  title: "Skills & Tools",
  intro: "The technologies, platforms, and tools I use to support agency teams, build and maintain websites and web apps.",
  groups: [
    { title: "Design & production", items: [
      { name: "WordPress", si: "wordpress", bg: "#21759B" },
      { name: "Divi", image: "/brands/tools/divi.webp", bg: "#812BEA" },
      { name: "Elementor", si: "elementor", bg: "#92003B" },
      { name: "Figma", si: "figma", bg: "#1E1E1E" },
      { name: "ACF", image: "/brands/tools/acf.webp", bg: "#0ECAD4" },
      { name: "& More" },
    ] },
    { title: "Languages", items: [
      { name: "HTML", si: "html5", bg: "#E34F26" },
      { name: "CSS", si: "css", bg: "#663399" },
      { name: "JS", si: "javascript", bg: "#1B1B1B", fg: "#F7DF1E", size: 0.56 },
      { name: "PHP", si: "php", bg: "#777BB4", size: 0.72 },
      { name: "TypeScript", si: "typescript", bg: "#3178C6" },
    ] },
    { title: "Frameworks & libraries", items: [
      { name: "React", si: "react", bg: "#20232A", fg: "#61DAFB" },
      { name: "Next.js", si: "nextdotjs", bg: "#000000" },
      { name: "Astro", si: "astro", bg: "#17191E", fg: "#FFFFFF" },
      { name: "Node.js", si: "nodedotjs", bg: "#3E7A35" },
      { name: "GSAP", si: "gsap", bg: "#0E100F", fg: "#0AE448", size: 0.62 },
      { name: "Three.js", si: "threedotjs", bg: "#000000" },
    ] },
    { title: "AI assistants", items: [
      { name: "Claude AI", si: "claude", bg: "#D97757" },
      { name: "ChatGPT", si: "openai", bg: "#10A37F" },
    ] },
    { title: "Hosting & commerce", items: [
      { name: "SiteGround", image: "/brands/tools/siteground.webp", bg: "#FFFFFF" },
      { name: "cPanel", si: "cpanel", bg: "#FF6C2C", size: 0.8 },
      { name: "Cloudflare", si: "cloudflare", bg: "#F38020", size: 0.62 },
      { name: "GitHub", si: "github", bg: "#181717" },
      { name: "WooCommerce", si: "woocommerce", bg: "#7F54B3", size: 0.8 },
    ] },
    { title: "SEO & search", items: [
      { name: "Yoast SEO", si: "yoast", bg: "#A61E69" },
      { name: "Google", si: "google", bg: "#4285F4" },
      { name: "Search Console", si: "googlesearchconsole", bg: "#458CF5" },
    ] },
    { title: "Agency & remote work", items: [
      { name: "Upwork", si: "upwork", bg: "#14A800", href: "https://www.upwork.com/freelancers/~01a9fa727d39310eaa" },
      { name: "Online Jobs PH", image: "/brands/tools/onlinejobs.webp", bg: "#FFFFFF", href: "https://v2.onlinejobs.ph/jobseekers/info/2390171" },
    ] },
  ] satisfies { title: string; items: Skill[] }[],
};

export const team = {
  eyebrow: "Who you’ll work with",
  title: "The developer behind your team",
  intro: "One developer covering web production, design, development and delivery — built to plug into agency teams and workflows.",
  action: { label: "Contact me", href: "https://wa.me/639556229968" },
  members: [
    { name: "Graham Orprecio", role: "Senior Developer", image: "/images/portfolio/team-developer",
      alt: "Black and white portrait of Graham Orprecio in a patterned shirt.",
      text: "With over seven years in web development, I build fast, reliable and scalable websites, turning agency designs and client requirements into polished digital experiences. I focus on clean code, practical solutions and dependable delivery." },
    { name: "Graham Orprecio", role: "Agency Web Designer", image: "/images/portfolio/team-designer",
      alt: "Black and white portrait of Graham Orprecio in glasses and a dark T-shirt.",
      text: "With over four years in web design, I translate agency concepts and Figma designs into clean, intuitive and polished digital experiences that look great and work seamlessly." },
    { name: "Graham Orprecio", role: "Web Production Lead", image: "/images/portfolio/team-lead",
      alt: "Black and white portrait of Graham Orprecio in glasses, a suit jacket and a white shirt.",
      text: "As a web development department head, I can coordinate production from start to finish, keeping people, timelines, client requirements and deliverables moving in the right direction." },
  ],
};

export const socials = {
  eyebrow: "Instagram",
  handle: "@graahaaaam",
  name: "Graham Orprecio",
  title: "See my work beyond the portfolio",
  text: "For a look behind the work — projects, ideas, agency builds and life outside development — you can find me on Instagram.",
  action: { label: "See my work", href: "https://www.instagram.com/graahaaaam/" },
  images: [
    { base: "/images/portfolio/social-1", alt: "Webleta digital agency web production portfolio showcase" },
    { base: "/images/portfolio/social-2", alt: "Webleta website design and web production showcase" },
    { base: "/images/portfolio/social-3", alt: "Webleta web development and agency support portfolio showcase" },
    { base: "/images/portfolio/social-5", alt: "Webleta website production showcase for digital agencies" },
    { base: "/images/portfolio/social-6", alt: "Webleta SEO and web performance support for digital agencies" },
    { base: "/images/portfolio/social-7", alt: "Webleta senior developer portfolio for digital agencies" },
  ],
};

/**
 * Sections after the hero, in page order. SEO pass (2026-11-23): who we are, the problem, the
 * solution (services), outcomes and real builds, how it works, reviews and client logos, fit
 * (industries), price, add-ons, then the ask (FAQ, contact). About and client logos stay in their
 * original places (Graham, 2026-11-23); the CTA banner goes back after Services.
 * Dark and light grounds still alternate. Any id without a component renders as a placeholder.
 */
// The old webleta.com section order (ids are its anchors). All are built, so none render as placeholders.
export const sections: PlaceholderSection[] = [
  { id: "about", title: "Agency web development", intro: "", needs: [], ground: "white" },
  { id: "services", title: "Web Production & Agency Support", intro: "", needs: [], ground: "white" },
  { id: "tools", title: "Skills & Tools", intro: "", needs: [], ground: "deep" },
  { id: "team", title: "The developer behind your team", intro: "", needs: [], ground: "white" },
  { id: "socials", title: "See my work beyond the portfolio", intro: "", needs: [], ground: "shallows" },
  { id: "cta-banner", title: "Need a web production partner?", intro: "", needs: [], ground: "deep" },
  { id: "projects", title: "Some of my work", intro: "", needs: [], ground: "deep" },
  { id: "companies", title: "Companies", intro: "", needs: [], ground: "white" },
  { id: "reviews", title: "Testimonials", intro: "", needs: [], ground: "white" },
  { id: "contact", title: "Contact", intro: "", needs: [], ground: "deep" },
];

export const footer = {
  // Old webleta.com footer and navigation, laid out in the agency footer's columns.
  tagline: "Webleta by Graham. Senior developer and agency web production partner.",
  copyright: "All rights reserved. · Senior developer · Agency web production partner",
  services: ["Web development", "Design implementation", "Website production", "SEO support"],
  links: navigation,
  // Graham: "add running logos of the tech we use". [name, Simple Icons slug, brand hex].
  // Icon colours are the brand hue, darkened where needed to reach 3:1 on the Shallows chip.
  // Two rows run in opposite directions. ChatGPT, JavaScript, Node.js, Three.js, PHP, Google and Search
  // Console were added in the footer redesign (from package.json, WordPress and SEO work): UNCONFIRMED, prune freely.
  tools: [
    [
      ["Figma", "figma", "#F24E1E"],
      ["ChatGPT", "openai", "#07223B"],
      ["Claude", "claude", "#B3542F"],
      ["WordPress", "wordpress", "#21759B"],
      ["HTML", "html5", "#E34F26"],
      ["CSS", "css", "#663399"],
      ["JavaScript", "javascript", "#8A6F00"],
      ["TypeScript", "typescript", "#3178C6"],
      ["PHP", "php", "#777BB4"],
      ["React", "react", "#087EA4"],
    ],
    [
      ["Next.js", "nextdotjs", "#07223B"],
      ["Astro", "astro", "#BC52EE"],
      ["GSAP", "gsap", "#08852F"],
      ["Three.js", "threedotjs", "#07223B"],
      ["Node.js", "nodedotjs", "#3E7A35"],
      ["GitHub", "github", "#07223B"],
      ["Cloudflare", "cloudflare", "#C2410C"],
      ["Google", "google", "#4285F4"],
      ["Search Console", "googlesearchconsole", "#2F6FD6"],
    ],
  ] as const,
  legal: [
    { label: "Privacy", href: "/privacy/" },
    { label: "Terms", href: "/terms/" },
  ],
  top: "Back to top",
};

/**
 * Privacy and terms pages. DRAFT (2026-11-22) for Jasper and Graham to approve before launch.
 * Facts checked against the build: the request forms open the visitor's own email app (nothing is
 * posted to a server), there are no cookies, analytics or third-party scripts, fonts are self-hosted,
 * and the site is served by Cloudflare Pages. Update these pages if any of that changes.
 * No business base or registration is stated (Jasper: internal).
 */
export const legal = {
  updated: "22 November 2026",
  privacy: {
    title: "Privacy policy",
    intro: "This page explains what we collect when you use webleta.com and what we do with it. The short version: very little, and only to reply to you.",
    sections: [
      { h: "What we collect", p: [
        "When you send the contact form, your name, email address and message are passed to Web3Forms, a form service, which emails them to us. Nothing is sent until you press Send message.",
        "If you email us, we get what you send: your email address, your name if you include it, and your message.",
      ] },
      { h: "How we use it", p: [
        "We use your details to reply to you and run the project if you hire us. We don't sell your details, share them for marketing, or add you to a mailing list.",
      ] },
      { h: "Cookies and tracking", p: [
        "This site doesn't set cookies or use analytics or advertising trackers. Fonts and images are served from our own domain.",
        "The site is hosted by Cloudflare. Like any host, Cloudflare may keep short-lived technical logs, such as IP addresses and browser types, to keep the site secure and running.",
      ] },
      { h: "How long we keep it", p: [
        "We keep emails for as long as we need them to work with you, and for project records after that. Ask us and we'll delete your details, unless we have to keep them for a finished project's records.",
      ] },
      { h: "Your choices", p: [
        "You can ask to see the details we hold about you, correct them or have them deleted. Email us at graham.orprecio12@gmail.com.",
      ] },
    ],
  },
  terms: {
    title: "Terms of use",
    intro: "These terms cover your use of webleta.com. Work we do for you is covered by the written agreement we sign together.",
    sections: [
      { h: "Using this site", p: [
        "You're welcome to browse, share links to this site and contact us through it. Please don't copy our designs, text or images for your own use without asking.",
        "Client names, logos and trademarks shown here belong to their owners.",
      ] },
      { h: "Prices and projects", p: [
        "Prices on this site are starting prices. Before any work begins, we agree the scope and the price with you in writing, and that agreement is what applies to your project.",
      ] },
      { h: "Accuracy and availability", p: [
        "We keep this site accurate and up to date, but we can't promise it will always be available or error-free. Links to other sites are there for convenience, and we aren't responsible for their content.",
      ] },
      { h: "Changes", p: [
        "We may update these terms. The date at the top shows when they last changed.",
      ] },
      { h: "Questions", p: [
        "Email us at graham.orprecio12@gmail.com.",
      ] },
    ],
  },
};
