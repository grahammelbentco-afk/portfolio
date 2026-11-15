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

export type HeroCard = { label: string; image: HeroImage };

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

export type SocialLink = { platform: "facebook" | "instagram" | "linkedin" | "x"; label: string; href: string | null };

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

export const site = {
  name: "Webleta",
  description:
    "Websites for local businesses and agencies, made to stand out and built to get booked.",
  location: "Based in Australia",
};

export const navigation: Link[] = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export const headerCta: Link = { label: "Book a call", href: "#contact" };

/**
 * WhatsApp chat in the header. UNCONFIRMED: no business number yet. Set `number` in
 * international format without "+" or spaces (for example "61400000000") and the
 * button opens a wa.me chat; while null it goes to the contact section.
 */
export const whatsapp = {
  // Shown on the button. DUMMY: 0491 570 156 is reserved by ACMA for fiction, so it can
  // never reach a real person. Replace with Webleta's real number before launch.
  display: "+61 491 570 156",
  number: null as string | null,
  message: "Hi Webleta, I'd like to talk about a website.",
};

export function whatsappHref() {
  return whatsapp.number
    ? `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`
    : "#contact";
}

export const hero = {
  // Strategist pass (humanizer skill, 2026-11-13). Replaces V1.6's working line "Build faster.
  // Look nothing alike." `highlight` is the phrase in the first line that gets the gradient.
  // UNCONFIRMED: "get booked" is the benefit we aim for, not a guarantee; Graham to approve.
  // `outline` is the phrase at the start of the second line drawn as outline-only text.
  headline: { first: "Made to stand out.", highlight: "stand out", second: "Built to get booked.", outline: "Built to" },
  // V1.6 p.4: templates make local sites look alike. No mention of tools or AI (Jasper).
  lede: "Most local sites share the same few templates. We design yours around what makes you different, and build it to win enquiries.",
  secondaryCta: { label: "See the work", href: "#work" },
  // Graham's outline: social icons under the buttons.
  // UNCONFIRMED: no profile URLs yet. href null renders the icon without a link.
  social: [
    { platform: "facebook", label: "Webleta on Facebook", href: null },
    { platform: "instagram", label: "Webleta on Instagram", href: null },
    { platform: "linkedin", label: "Webleta on LinkedIn", href: null },
    { platform: "x", label: "Webleta on X", href: null },
  ] satisfies SocialLink[],
  // Graham's outline: three staggered cards, Design / Market / Conversion.
  // Photos generated for these cards (fal flux-pro v1.1-ultra, 16:9, 2026-11-13); illustrations,
  // never client projects. Manifest: Webleta-AI-Generated-Images/manifest-2026-11-13-hero-cards.csv
  cards: [
    {
      label: "Design",
      image: {
        src: "/images/card-design-1280.webp",
        srcSet: "/images/card-design-720.webp 720w, /images/card-design-1280.webp 1280w",
        width: 1280,
        height: 720,
        alt: "A designer sketching at a studio desk in front of a navy wall, with colour swatches beside the keyboard.",
      },
    },
    {
      label: "Market",
      image: {
        src: "/images/card-market-1280.webp",
        srcSet: "/images/card-market-720.webp 720w, /images/card-market-1280.webp 1280w",
        width: 1280,
        height: 720,
        alt: "A florist photographing her flowers with a phone while a customer browses the shop.",
      },
    },
    {
      label: "Conversion",
      image: {
        src: "/images/card-conversion-1280.webp",
        srcSet: "/images/card-conversion-720.webp 720w, /images/card-conversion-1280.webp 1280w",
        width: 1280,
        height: 720,
        alt: "A customer at a café table about to tap the orange booking button on a phone.",
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
      id: "business",
      label: "For local businesses",
      field: { label: "Your business website", placeholder: "yourbusiness.com.au" },
      action: "Get my free preview",
      href: "#steps",
      note: "Your own design, never a theme with your logo on it.",
    },
    {
      id: "agency",
      label: "For agencies",
      action: "Send a project brief",
      href: "#contact",
      note: "Say yes to more clients. We design and build under your name.",
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
export const hooks: Hook[] = [
  { lead: true, title: "See it first", text: "Get a free demo of your homepage before you pay a cent." },
  { title: "Pay your way", text: "One project, a monthly plan, or help when you need it." },
  { title: "Priced up front", text: "The quote you agree to is the price you pay." },
];

/**
 * Review platforms in the trust band, shown with their official logos
 * (files from Trustindex's platform CDN; see REPORT.md).
 * UNCONFIRMED: no Webleta profiles exist yet, so no links, ratings or review counts
 * are shown. Add `href` when a real public profile exists.
 */
export const trust = {
  title: "Find us on",
  platforms: [
    {
      name: "Google Reviews",
      // Google's "G" mark, standard four-colour paths.
      icon: { src: "/brands/google-g.svg", width: 48, height: 48 },
      href: null,
    },
    {
      name: "Trustindex",
      // Trustindex's own icon, from its platform CDN.
      icon: { src: "/brands/trustindex-icon.svg", width: 48, height: 48 },
      href: null,
    },
  ] satisfies TrustPlatform[],
};

/**
 * About section (Graham's outline: "freedom for creativity"). Copy from V1.6 p.3-4
 * ("Who we are", "What we're for"), shortened with the humanizer skill, 2026-11-14.
 * Jasper: no mention of tools or AI on the site, so V1.6's AI-assisted paragraph is left out.
 * UNCONFIRMED: all of it is proposed copy until Graham approves V1.6 p.3-5.
 */
export const about = {
  eyebrow: "About Webleta",
  // `mark` phrases get the Seafoam marker. They must appear in `statement` exactly once.
  statement: "Webleta designs and builds websites for local businesses, and for the agencies that serve them.",
  mark: ["local businesses", "agencies"],
  story: {
    title: "Templates made websites easy to launch. They also made a lot of them look the same.",
    text: "We're a design-led studio. We start from the business itself: who it serves, how it talks, what its customers notice first. Then we build the site around that, so it looks like you and works for you.",
  },
  // V1.6 p.4. `lead` takes the one Ember spark.
  audiences: [
    { lead: true, title: "For local businesses", text: "A site that looks like your business, that you can update yourself, and that's built to be found." },
    { title: "For agencies", text: "Extra design and build capacity that fits your process and works under your name." },
  ] satisfies Hook[],
  // V1.6 p.5: markets and ways to work. UNCONFIRMED.
  facts: [
    { label: "Where", value: "Australia first" },
    { label: "How", value: "Project, monthly or on call" },
    { label: "Care", value: "A named person for your site" },
  ],
  link: { label: "See the work", href: "#work" },
  // V1.6 g26 (generated image, V1.6 p.4 "the kind of business we build for"). Not a client.
  image: {
    src: "/images/about-nursery-1280.webp",
    width: 1280,
    height: 853,
    alt: "A nursery owner in a cap reading through printed pages among potted trees in his greenhouse.",
  },
  caption: "The kind of business we build for.",
};

/**
 * Benefits (Graham's outline: "Pros of having digital presence, more sales / more booking,
 * create dummy for now"; reference: a scrollable row of outcome cards with prev/next).
 * Humanizer pass 2026-11-14.
 * UNCONFIRMED: placeholder copy, no statistics. Business names, items and prices in the
 * card overlays are fictional examples, not clients.
 * Photos: fal flux-pro v1.1-ultra, 2026-11-14, illustrations only. Manifest:
 * Webleta-AI-Generated-Images/manifest-2026-11-14-benefits.csv
 * Each card takes one V1.6 supporting colour (p.14), matched to V1.6's "Use for" notes.
 */
export type BenefitVisual = "order" | "booking" | "quote" | "search" | "call" | "trust";
export type SupportColour = "coral" | "dusk" | "harbour" | "kelp" | "ochre" | "shell";
export type Benefit = {
  id: string;
  tag: string;
  title: string;
  /** The word(s) in the title that get the colour marker. */
  mark: string;
  text: string;
  visual: BenefitVisual;
  colour: SupportColour;
  image: { base: string; alt: string };
};

export const benefits = {
  eyebrow: "Why it pays off",
  title: "A good website brings work in.",
  titleMark: "work in", // Seafoam highlighter, as in About
  intro: "A shop wants orders. A salon wants bookings. A plumber wants the right jobs. We find out what a win looks like for you, then build the site to bring it in.",
  items: [
    {
      id: "sales", tag: "Retail", title: "More sales", mark: "sales",
      text: "Visitors become orders, not just people browsing.",
      visual: "order", colour: "coral",
      image: { base: "/images/benefit-sales", alt: "A potter wrapping a finished bowl in tissue paper to post an order." },
    },
    {
      id: "bookings", tag: "Salons and studios", title: "More bookings", mark: "bookings",
      text: "People pick a time at 10pm on a Sunday. Your diary fills while you work.",
      visual: "booking", colour: "dusk",
      image: { base: "/images/benefit-bookings", alt: "A stylist finishing a smiling client's hair in a small salon." },
    },
    {
      id: "quotes", tag: "Trades", title: "More quote requests", mark: "quote requests",
      text: "The job details arrive up front, so you quote the work worth doing.",
      visual: "quote", colour: "harbour",
      image: { base: "/images/benefit-quotes", alt: "A plumber at the back of his ute reading a new job request on his phone." },
    },
    {
      id: "found", tag: "Food and cafés", title: "Found first", mark: "first",
      text: "Show up when someone nearby searches for what you make.",
      visual: "search", colour: "kelp",
      image: { base: "/images/benefit-found", alt: "A customer walking into a bakery as the baker hands over a bag of bread." },
    },
    {
      id: "calls", tag: "Automotive", title: "More calls", mark: "calls",
      text: "One tap from your site to a ringing phone, with no hunting for the number.",
      visual: "call", colour: "ochre",
      image: { base: "/images/benefit-calls", alt: "A mechanic taking a phone call at the open roller door of his workshop." },
    },
    {
      id: "trust", tag: "Health clinics", title: "Taken seriously", mark: "seriously",
      text: "Clear prices and real faces. People trust what they can see before they visit.",
      visual: "trust", colour: "shell",
      image: { base: "/images/benefit-trust", alt: "A physiotherapist chatting with a smiling client in a calm treatment room." },
    },
  ] satisfies Benefit[],
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
export type TileColour = "aqua" | "ochre" | "harbour" | "dusk" | "coral" | "kelp" | "shell";

export type ServiceTile = {
  id: string;
  title: string;
  /** The hero tile sets its second line in outline type. */
  outline?: string;
  text: string;
  icon: ServiceIcon;
  colour: TileColour;
  /** Grid slot, following Graham's reference bento. */
  slot: "hero" | "a" | "b" | "wide" | "c" | "d" | "e";
  /** A photo shown in duotone over the tile colour. */
  photo?: { base: string; alt: string; position?: string };
  /** Or a device photo with a coded screen on its glass. */
  stage?: DeviceStage;
  ui?: "dashboard" | "app";
  logos: PlatformLogo[];
  /** The photo is light where the icon sits, so the icon is drawn dark. */
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
 * Services (Revision 40). The list is Notion's "Agency Business Model & Positioning Notes"
 * (Nov 12, 2026), the same seven services as V1.6 p.5. Which launch first is an open
 * decision there, so no availability is shown. The tech logos on the hero follow Notion's
 * "flexible technology stack" principle (Nov 14). Colour blocking follows Graham's bento
 * reference; the grid is reshuffled (Jasper) and the copy is our own (humanizer pass). UNCONFIRMED: all copy. Images are existing
 * fal illustrations (see the 2026-11-14 manifests); Harlow Joinery is the fictional concept.
 */
export const services = {
  eyebrow: "What we do",
  title: { mark: "Websites first.", rest: "The rest brings people to them." },
  intro: "We design and build the site, then help people find it through search, email, social and content. Pick one service or several.",
  tiles: [
    {
      id: "websites", slot: "hero", lightCorner: true, colour: "aqua", icon: "web",
      title: "Website design and", outline: "development",
      text: "Your own design, built on the platform that suits the job: WordPress, Next.js or Astro.",
      logos: [logo.wordpress, logo.next, logo.astro, logo.react],
    },
    {
      id: "apps", slot: "wide", colour: "harbour", icon: "app", ui: "dashboard",
      title: "Web applications", text: "Booking systems and client portals, built around how your business runs.",
      stage: {
        base: "/images/bento-wordpress", width: 2752, height: 1536,
        alt: "A laptop on an oak desk showing a joinery's job-booking dashboard.",
        screen: { left: 35.61, top: 35.68, width: 31.83, height: 36.2, radius: "0.6% / 1%" },
      },
      logos: [],
    },
    {
      id: "seo", slot: "a", lightCorner: true, colour: "ochre", icon: "search",
      title: "SEO", text: "Get found when people nearby search for what you do.",
      photo: { base: "/images/svc-seo", alt: "A man checking his phone against a sunlit wall.", position: "50% 60%" },
      logos: [logo.google],
    },
    {
      id: "email", slot: "b", colour: "dusk", icon: "mail",
      title: "Email marketing", text: "Newsletters that bring past customers back for another job.",
      photo: { base: "/images/svc-wordpress", alt: "A woman reading on her laptop in a lamp-lit studio.", position: "45% 40%" },
      logos: [logo.gmail],
    },
    {
      id: "social", slot: "d", lightCorner: true, colour: "kelp", icon: "social",
      title: "Social media marketing", text: "Posts and ads that send people from social media to your site.",
      photo: { base: "/images/svc-production", alt: "A nursery owner smiling at her tablet among potted plants.", position: "60% 40%" },
      logos: [logo.instagram, logo.facebook, logo.tiktok, logo.linkedin],
    },
    {
      id: "content", slot: "e", lightCorner: true, colour: "shell", icon: "pen",
      title: "Content marketing", text: "Articles and pages that answer what customers ask before they call.",
      photo: { base: "/images/svc-design", alt: "Hands arranging printed page layouts beside violet colour swatches.", position: "50% 40%" },
      logos: [],
    },
    {
      id: "mobile", slot: "c", colour: "coral", icon: "phone", ui: "app",
      title: "Mobile apps", text: "An app on your regulars' phones, for bookings and orders.",
      stage: {
        base: "/images/bento-seo", width: 2368, height: 1792,
        alt: "A hand holding a phone showing a booking app.",
        screen: { left: 44.09, top: 19.87, width: 23.99, height: 66.96, radius: "14% / 6.5%" },
      },
      logos: [logo.apple, logo.android],
    },
  ] satisfies ServiceTile[],
  more: { title: "Not sure where to start?", text: "Tell us what you'd like more of, and we'll suggest where to begin.", action: { label: "Book a call", href: "#contact" } },
};

/** CTA banner (Graham: "cta banner"). The outlined word reuses the hero's outline device. UNCONFIRMED copy. */
export const ctaBanner = {
  // Revision 43, humanizer pass. Follows Graham's centred CTA references with our devices:
  // the hero's gradient phrase on line one and outline word on line two. UNCONFIRMED copy;
  // "30-minute call" assumes the booking length Graham uses.
  eyebrow: "For local businesses and agencies",
  title: { first: "Need a web partner", highlight: "web partner", outline: "who", rest: "actually ships?" },
  text: "Book a 30-minute call. Tell us about your business or your agency's workload, and we'll come back with a plan and a price.",
  primary: { label: "Book a 30-minute call", href: "#contact" },
  secondary: { label: "See pricing", href: "#pricing" },
  stack: ["wordpress", "nextdotjs", "astro", "react", "google"],
  // Revision 47: a full-resolution overhead studio desk (fal flux-pro ultra, 21:9), no people,
  // screens off; wireframe lettering inpainted. Decorative, so alt is empty.
  image: { base: "/images/cta-studio-hq", width: 3136, height: 1344, alt: "" },
};

/**
 * Steps (Graham's outline: "Steps / OPTIONAL"; reference "See it before we build it").
 * Ties to the band's "See it first" hook. UNCONFIRMED: the free preview offer is not
 * confirmed by Graham. The compare slider is an illustration, not a client site.
 */
export const steps = {
  eyebrow: "How it works",
  title: { solid: "See it before", outline: "you pay for it." },
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
  },

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
  eyebrow: "Our work",
  title: { solid: ["Built by us,", "for businesses"], outline: "like yours." },
  cta: { lead: "Yours could be the next one.", label: "Get my free preview", href: "#steps" },
  items: [
    { id: "pyper", name: "Pay the Pyper", sector: "Team payments app",
      image: { base: "/images/work/pyper", w: 1000, h: 1602, alt: "Pay the Pyper: two dark homepage layouts with green headlines and phone screens, on a green presentation board." } },
    { id: "wazzas", name: "Wazzas Pool", sector: "Pool builder, Gold Coast",
      image: { base: "/images/work/wazzas", w: 1000, h: 2090, alt: "Wazzas Pool: two long homepage layouts with photos of finished concrete pools, on a blue presentation board." } },
    { id: "mec", name: "Melbourne Entertainment Company", sector: "Wedding and event entertainment",
      image: { base: "/images/work/mec", w: 1000, h: 1280, alt: "Melbourne Entertainment Company: black and white performer photos across two page layouts, on a blush board." } },
    { id: "belly", name: "Belly", sector: "Restaurant and online ordering",
      image: { base: "/images/work/belly", w: 1000, h: 993, alt: "Belly: burgers, fries and a product grid with red order buttons, on a red and yellow board." } },
    { id: "legal", name: "411 Legal Services", sector: "Law firm",
      image: { base: "/images/work/legal", w: 1000, h: 1793, alt: "411 Legal Services: navy and white pages with lawyer portraits and practice areas, on a dark navy board." } },
    { id: "bonsai", name: "Bonsai", sector: "Plant store",
      image: { base: "/images/work/bonsai", w: 1000, h: 809, alt: "Bonsai: two clean white store pages of potted bonsai trees, on a soft green board." } },
    { id: "groundcontrol", name: "Ground Control Systems", sector: "Bike parking, online store",
      image: { base: "/images/work/groundcontrol", w: 1000, h: 993, alt: "Ground Control Systems: night photos of bike racks with orange highlights, on an orange board." } },
    { id: "fort", name: "The Fort", sector: "Air conditioning services",
      image: { base: "/images/work/fort", w: 1000, h: 1069, alt: "The Fort: air conditioning repair, cleaning and installation pages in light blue, on a pale blue board." } },
    { id: "racknroad", name: "Rack n Road", sector: "Vehicle racks, online store",
      image: { base: "/images/work/racknroad", w: 1000, h: 809, alt: "Rack n Road: a car with bikes on the roof under the headline We fit for adventure, on a red board." } },
  ] satisfies Project[],
};

/**
 * Reviews (Graham: "text based atm - but reserve space for portrait vid"). Real reviews,
 * quoted word for word (2026-11-16): four client testimonials from Graham's live site
 * (webleta.com), two LinkedIn recommendations for Jasper and two Upwork client reviews for
 * Jasper (from his screenshots; Upwork shows no reviewer names). Long quotes are shortened
 * to one unbroken passage, never stitched. Photo: the reused card-market image, in duotone.
 */
export type Review = {
  id: string;
  quote: string;
  name: string;
  role: string;
  /** Where the review lives, and who it's about. */
  source: string;
  /** Short label for the picker tile. Webtec is named in Giuliano's recommendation. */
  org: string;
  initials?: string;
};
export const reviews = {
  eyebrow: "Client reviews",
  title: { solid: "In their", outline: "own words." },
  intro: "Webleta is Graham and Jasper. This is what clients and teammates have said about working with us.",
  image: { base: "/images/card-market", alt: "" },
  proof: { value: "100%", label: "Job Success on Upwork, across 15 jobs" },
  items: [
    { id: "greg", org: "Ground Control Systems", initials: "GB", name: "Greg Bauer", role: "CEO, Ground Control Systems", source: "Client of Graham",
      quote: "Graham was an exceptional partner on our WordPress project. He quickly identified and resolved performance issues, and his communication skills were outstanding." },
    { id: "giuliano", org: "Webtec", initials: "GB", name: "Giuliano Barducci", role: "Head of Production, Design and QA", source: "LinkedIn, on Jasper",
      quote: "One thing that particularly impressed me was his ability to turn around projects where clients weren't happy with the existing design direction. I've seen his redesigns transform those situations, restoring client confidence and giving projects a much stronger direction." },
    { id: "olaf", org: "Rack n Road", initials: "OG", name: "Olaf Guerrero", role: "Marketing Director, Rack n Road", source: "Client of Graham",
      quote: "With strong SEO knowledge and site optimization skills, he's reliable and ideal for long-term or short contracts. Professional, punctual, and quick to learn, Graham is recommended for your projects." },
    { id: "upwork-agency", org: "Upwork", name: "Agency client", role: "Elementor build, Upwork", source: "Upwork, on Jasper",
      quote: "Jasper combines two important attributes, talent and adaptability. He's a creative designer that explores different ways to generate beautiful design." },
    { id: "daniel", org: "Endtimes Official", initials: "DC", name: "Daniel Clarke", role: "Owner, Endtimes Official", source: "Client of Graham",
      quote: "Graham's expertise was appreciated, especially in how you guys followed exactly how I envisioned the final product, while offering and implementing some very helpful suggestions. Recommending him!" },
    { id: "ellaine", org: "LinkedIn", initials: "EG", name: "Ellaine Gabotero", role: "Web Designer, UI/UX Specialist", source: "LinkedIn, on Jasper",
      quote: "His designs are consistently excellent, but he brings so much more to the table than just visuals. He has a great way of working with websites, ensuring everything functions exactly as requested while going above and beyond to suggest layouts that actually improve the user experience." },
    { id: "eureka", org: "Adrenaline Solutions", initials: "EQ", name: "Eureka Quinto", role: "COO, Adrenaline Solutions", source: "Client of Graham",
      quote: "Graham is a reliable WordPress Developer. We are pleased with his performance. We hired him as a Senior Developer, and we are satisfied with his work. We wholeheartedly recommend him." },
    { id: "upwork-theme", org: "Upwork", name: "Theme client", role: "WordPress theme build, Upwork", source: "Upwork, on Jasper",
      quote: "Jasper did great! He is very knowledgeable in web development and meeting all our PSD to Wordpress requirements." },
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
  eyebrow: "Who we've worked with",
  title: { solid: "Brands we've", outline: "built for." },
  logos: [
    { id: "groundcontrol", name: "Ground Control Systems", ar: 4.966 },
    { id: "racknroad", name: "Rack n Road", ar: 5.943 },
    { id: "mec", name: "Melbourne Entertainment Co", ar: 8.125 },
    { id: "adrenaline", name: "Adrenaline Solutions", ar: 3.488, scale: 1.45 },
    { id: "nicolesteffen", name: "Nicole Steffen Design", ar: 6.025 },
    { id: "cmc", name: "Creative Marketing Concepts", ar: 6.851 },
    { id: "entertainmentco", name: "Entertainment Co", ar: 6.727 },
  ] satisfies ClientLogo[],
  next: { lead: "Yours could be next", label: "Get my free preview", href: "#steps" },
};

/**
 * Pricing (Graham: "Pricing/ setup"). The ways to work are from V1.6 p.5; V1.6 says
 * "Pricing is not part of this book". UNCONFIRMED: every price and term below is a
 * placeholder until Graham sets them.
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
};
export const pricing = {
  eyebrow: "Pricing",
  title: { solid: "Pick a package,", outline: "or ask for a quote." },
  intro: "Either way, you see the price before we start.",
  // Promises every plan shares, said once instead of on each card (same as Contact's).
  always: ["Your own design, built from scratch", "Scope and price agreed before we start", "A real person on email"],
  preview: { lead: "Not sure yet?", label: "See a free preview first", href: "#steps" },
  audiences: [
    {
      id: "business", label: "For local businesses",
      plans: [
        { id: "project", name: "Project", fit: "A new site with a clear start and finish.", price: "$2,400", unit: "from, one-off", action: "Start a project",
          features: ["Up to six pages", "Mobile, speed and SEO basics", "Training so you can edit it", "30 days of fixes after launch"] },
        { id: "subscription", name: "Subscription", fit: "Your site, updated and looked after every month.", price: "$190", unit: "per month", action: "Choose subscription", featured: true,
          image: { base: "/images/card-design", w: 1280, h: 720 },
          features: ["A new custom site, paid monthly", "Monthly updates and changes", "Hosting, backups and security", "A named person to email", "Minimum term of 12 months"] },
        { id: "adhoc", name: "Ad hoc", fit: "Help when it's needed.", price: "$95", unit: "per hour", action: "Book some time",
          features: ["Edits, fixes and new pages", "Booked as it comes up", "Quoted before we start", "No contract"] },
      ],
    },
    {
      id: "agency", label: "For agencies",
      plans: [
        { id: "overflow", name: "Overflow support", fit: "Quick fixes and updates for your clients.", price: "$85", unit: "per hour", action: "Send a task",
          features: ["Content updates and edits", "Bug fixes and maintenance", "Small development tasks", "Your name on the work"] },
        { id: "projects", name: "Agency projects", fit: "Full builds and redesigns, white-labelled.", price: "$1,800", unit: "from, per site", action: "Send a brief",
          features: ["Designed to your agency's standards", "Development and launch", "Speed and SEO basics", "Handover in your process"] },
        { id: "dedicated", name: "Dedicated designer or developer", fit: "Someone from Webleta on your team.", price: "$3,200", unit: "per month", action: "Talk to us", featured: true,
          image: { base: "/images/service-design", w: 1280, h: 853 },
          features: ["A named designer or developer", "Works in your tools and meetings", "Design, build and care", "Scale up or down each month"] },
      ],
    },
  ] satisfies { id: string; label: string; plans: Plan[] }[],
};

/**
 * Contact (Graham's reference: "Tell us your win"). UNCONFIRMED: no form service yet.
 * Sending opens the visitor's email app with the request filled in, addressed to `email`.
 * `email` is UNCONFIRMED (hello@webleta.com appears only in older notes).
 */
export const contact = {
  eyebrow: "Contact",
  title: "Tell us what a win looks like. We'll bring the plan.",
  promises: [
    "A site that's yours, never a theme with your logo on it",
    "A clear scope and price, agreed before we start",
    "A reply from a person, usually within one working day",
  ],
  email: "hello@webleta.com",
  goals: ["More calls", "More bookings", "More sales", "More quote requests"],
  submit: "Send my request",
  sent: "Your email app has your request ready. Press send there and we'll reply.",
};

/** Sections after the hero, in the order of Graham's outline. Placeholders for Phase 2+. */
export const sections: PlaceholderSection[] = [
  {
    id: "about",
    title: "About Webleta",
    intro: "A small design studio that builds every site around the business it's for.",
    needs: ["Approved about copy (V1.6 p.3 has a draft)", "Real team photos, if people are shown"],
    ground: "white",
  },
  {
    id: "benefits",
    title: "Why a website pays off",
    intro: "Customers look you up before they call. Give them a reason to pick up the phone.",
    needs: ["Confirmed benefit points", "Any statistic must have a named source"],
    ground: "shallows",
  },
  {
    id: "services",
    title: "Services",
    intro: "Websites first, with SEO, email and social to bring people to them.",
    needs: ["Final services list from Graham (V1.6 p.5 marks the draft list as open)"],
    ground: "white",
  },
  {
    id: "cta",
    title: "Let's make yours.",
    intro: "Tell us about your business. We'll come back with a scope and a price.",
    needs: ["Confirmed offer wording (for example, whether a free demo is offered)"],
    ground: "deep",
  },
  {
    id: "steps",
    title: "See it before you pay for it",
    intro: "A free preview of your new homepage, then the plan, then the build.",
    needs: ["Graham to confirm the free preview offer"],
    ground: "shallows",
  },
  {
    id: "work",
    title: "Selected work",
    intro: "Sites for businesses that didn't want to look like everyone else.",
    needs: ["Verified client projects with permission to publish", "Real screenshots or photos"],
    ground: "shallows",
  },
  {
    id: "reviews",
    title: "What clients say",
    intro: "Straight from the people we've built for.",
    needs: ["Real reviews with the reviewer's permission and name", "Portrait video, when available"],
    ground: "white",
  },
  {
    id: "clients",
    title: "Clients we've worked with",
    intro: "Local businesses and agencies across Australia.",
    needs: ["Verified client list", "Permission to show each logo", "Logo files"],
    ground: "mist",
  },
  {
    id: "pricing",
    title: "Pricing and packages",
    intro: "Pick a package or ask for a quote. Either way, you see the price first.",
    needs: ["Packages, prices and terms from Graham (none confirmed)"],
    ground: "shallows",
  },
  {
    id: "contact",
    title: "Contact",
    intro: "Book a call and get a straight answer and a clear next step.",
    needs: ["Email, phone and booking link", "A form service before any form is added (no fake form)"],
    ground: "white",
  },
];

export const footer = {
  tagline: site.description,
  columns: [{ title: "Explore", links: navigation }],
  contact: { label: "Book a call", href: "#contact" },
};
