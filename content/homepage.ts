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
/** `holdEnd`: while the slider is held, stay on the clip's last frame instead of replaying it. */
export type HeroCard = { label: string; image: HeroImage; video?: { src: string; poster: string; holdEnd?: boolean } };

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
  // Revision 88 (Jasper/Graham's hero notes, 2026-11-17): new headline and lede. The second
  // line swaps between three phrases; `outline` is drawn outline-only, `rest` solid. Screen
  // readers get `spoken` once instead of the swapping line.
  // Revision 89 (Jasper): three lines, "Your business / deserves a / digital presence."
  // The small word after "deserves" (`lead`) and the last line (`rest`) swap together.
  headline: {
    first: "Your business",
    second: "deserves",
    rotating: [
      { lead: "a", rest: "digital presence." },
      { lead: "to", rest: "stand out." },
      { lead: "to", rest: "get more leads." },
    ],
    spoken: "Your business deserves a digital presence, to stand out, and to get more leads.",
  },
  // Graham's note as written; only "tailored to" is replaced (Jasper, 2026-11-17).
  lede: "We help businesses build a strong online presence with websites designed around their goals, their needs, and the way they want to grow.",
  secondaryCta: { label: "See the work", href: "#work" },
  // Graham's outline: social icons under the buttons.
  // UNCONFIRMED: no profile URLs yet. href null renders the icon without a link.
  social: [
    // Revision 88: Facebook, Instagram, Upwork and email (Gmail icon), per the hero notes.
    // UNCONFIRMED: hello@webleta.com is not a confirmed inbox yet.
    { platform: "facebook", label: "Webleta on Facebook", href: null },
    { platform: "instagram", label: "Webleta on Instagram", href: null },
    { platform: "upwork", label: "Webleta on Upwork", href: null },
    { platform: "gmail", label: "Email Webleta", href: "mailto:hello@webleta.com" },
  ] satisfies SocialLink[],
  // Graham's outline: three staggered cards, Design / Market / Conversion.
  // Photos generated for these cards (fal flux-pro v1.1-ultra, 16:9, 2026-11-13); illustrations,
  // never client projects. Manifest: Webleta-AI-Generated-Images/manifest-2026-11-13-hero-cards.csv
  cards: [
    {
      label: "Design",
      // Design V4 (2026-11-18): Seedance 2.5 Flash video edit, fal request 01a1ea67-f4ae-74d3-a443-de15e8833601.
      // Approved by Jasper for staging (2026-11-18). Note: the Ground Control logo and small text on screen are
      // AI-rendered (garbled up close); the headline "Design. Build. Install." is correct.
      video: { src: "/videos/hero-design-v4.mp4", poster: "/images/hero-design-v4-poster.webp" },
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
      // Market "heart tap" (2026-11-18, supplied by Jasper: Downloads/heart-tap-video.mp4; master copy in
      // Hero-Video-Production/Market/output/market-heart-tap.mp4). Same Willow & Petal story as V3: scroll, like,
      // ends on the 1.8K / 236 badges (fictional demo values), so it holds that frame instead of replaying.
      // Rollback: V3 at /videos/hero-market-v3.mp4 (+ poster), V2 at /videos/hero-market-v2.mp4 (+ poster).
      video: { src: "/videos/hero-market-heart-tap.mp4", poster: "/images/hero-market-heart-tap-poster.webp", holdEnd: true },
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
      // Conversion V1 (2026-11-18): Seedance 2.5 Flash reference-to-video from four storyboard keyframes
      // (Serene Spa booking on a tablet; dates fixed to Wed 14 Apr 2027 with nano-banana-pro edit). Run by
      // Jasper in the fal web UI; master copy Hero-Video-Production/Conversion/output/conversion-v1-seedance25flash-r2v.mp4.
      // Ends on "Booking confirmed", so it holds that frame. The still below stays as the fallback.
      video: { src: "/videos/hero-conversion-v1.mp4", poster: "/images/hero-conversion-v1-poster.webp", holdEnd: true },
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
      note: "Design, SEO, social and email from one small team.",
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
  { title: "Flexible terms", text: "One project, a monthly plan, or help when you need it." },
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
  // V1.6 p.5, Where and Care updated in Revision 88 (Jasper). UNCONFIRMED.
  facts: [
    { label: "Where", value: "Anywhere" },
    { label: "How", value: "Project, monthly or on call" },
    { label: "Care", value: "Daily support" },
  ],
  link: { label: "See the work", href: "#work" },
  // Revision 88 (Jasper): quiet text links to our own sites, here instead of the footer.
  // Both always show (Jasper, Revision 89). UNCONFIRMED: Jasper has no personal site yet, so
  // his link goes to the contact section; set `href` to his site when it exists (`external`
  // true). Graham's portfolio is webleta.com today; once this site replaces it there, this
  // link needs a new target.
  people: [
    { label: "Meet our technical head", href: "#contact", external: false },
    { label: "Meet our manager", href: "https://webleta.com/", external: true },
  ],
  // Revision 88 (Jasper): an AI image of Jasper and Graham working together, made at his
  // request from their own photos, in an office from Jasper's photo with its signage removed
  // (fal nano-banana-pro edit, 2026-11-17; manifest:
  // Webleta-AI-Generated-Images/manifest-2026-11-17-jasper.csv). The nursery photo it
  // replaces is kept at /images/about-nursery-*.webp.
  // Revision 89: back to the AI team image (Jasper preferred it over the poster photo, which
  // stays at /images/about-office-733.webp), with both faces re-matched to the real photos and
  // neutral, closed-mouth expressions (manifest: about-team-real-b).
  image: {
    src: "/images/about-team-1200.webp",
    width: 1200,
    height: 1490,
    alt: "Graham Orprecio at a laptop while Jasper Diaz leans in and points at the screen, in a bright office.",
  },
  caption: "Graham and Jasper, working through a client site.",
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
  title: "A good website brings work in.",
  titleMark: "work in", // Seafoam highlighter, as in About
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
  // Revision 98 (Graham's note via Jasper): "Website first then everything follows". Photo tiles use
  // new full-colour fal photos (flux-pro v1.1-ultra, 2026-11-18, manifest-2026-11-16-work.csv).
  title: { mark: "Website first.", rest: "Then everything follows." },
  intro: "We design and build your site first. Search, email, social and content then bring people to it. Pick one service or several.",
  tiles: [
    {
      id: "websites", slot: "hero", lightCorner: true, colour: "aqua", icon: "web",
      title: "Website design and", outline: "development",
      text: "Your own design, built on the platform that suits the job: WordPress, Next.js or Astro.",
      // Revision 98: one fal image, nano-banana-pro (request 01a1eece-6844-7172-95eb-49381c579e42), isometric, matching the other tiles.
      photo: { base: "/images/svc3-websites", alt: "An illustration of a plumbing business homepage on desktop and phone, with an enquiries chart rising.", position: "80% 30%" },
      logos: [logo.wordpress, logo.next, logo.astro, logo.react],
    },
    {
      id: "apps", slot: "wide", colour: "harbour", icon: "app",
      title: "Web applications", text: "Booking systems and client portals, built around how your business runs.",
      // Revision 98: one fal image, nano-banana-pro (request 01a1eec5-a219-76e3-b549-dc6e8da02c55).
      photo: { base: "/images/svc3-apps", alt: "An illustration of a booking dashboard showing this week's quotes, bookings and invoices, with a calendar.", position: "80% 50%" },
      logos: [],
    },
    {
      id: "seo", slot: "a", lightCorner: true, colour: "ochre", icon: "search",
      title: "SEO", text: "Get found when people nearby search for what you do.",
      // Revision 98: one fal image with the search results drawn in (nano-banana-pro, request
      // 01a1eead-4fa5-7250-a432-33e227873abf): "plumber near me", Harlow Plumbing ranked #1.
      photo: { base: "/images/svc3-seo", alt: "An illustration of search results for plumber near me, with Harlow Plumbing marked number one.", position: "50% 50%" },
      logos: [logo.google],
    },
    {
      id: "email", slot: "b", colour: "dusk", icon: "mail",
      title: "Email marketing", text: "Newsletters that bring past customers back for another job.",
      // Revision 98: one fal image, nano-banana-pro (request 01a1eec9-a2f6-77e1-9a83-239d773430af).
      photo: { base: "/images/svc3-email", alt: "An illustration of an inbox with an opened email from Harlow Plumbing: Time for your yearly check-up?", position: "70% 30%" },
      logos: [logo.gmail],
    },
    {
      id: "social", slot: "d", lightCorner: true, colour: "kelp", icon: "social",
      title: "Social media marketing", text: "Posts and ads that send people from social media to your site.",
      // Revision 98: one fal image, nano-banana-pro (request 01a1eeb5-4115-7132-9bd6-c1600a1ee55d).
      photo: { base: "/images/svc3-social", alt: "An illustration of a florist's social post with 1.8K likes and a Visit website button.", position: "70% 50%" },
      logos: [logo.instagram, logo.facebook, logo.tiktok, logo.linkedin],
    },
    {
      id: "content", slot: "e", lightCorner: true, colour: "shell", icon: "pen",
      title: "Content marketing", text: "Articles and pages that answer what customers ask before they call.",
      // Revision 98: one fal image, nano-banana-pro (request 01a1eebc-2777-7ea3-852a-c815605ecfc4).
      photo: { base: "/images/svc3-content", alt: "An illustration of a guide titled How much does a blocked drain cost to fix?, with the answer highlighted.", position: "75% 30%" },
      logos: [],
    },
    {
      id: "mobile", slot: "c", colour: "coral", icon: "phone",
      title: "Mobile apps", text: "An app on your regulars' phones, for bookings and orders.",
      // Revision 98: one fal image, nano-banana-pro (request 01a1eeca-147a-7102-bd5e-5d1ed3475be7).
      photo: { base: "/images/svc3-mobile", alt: "An illustration of a booking app with a time slot picked and a Booked confirmation.", position: "75% 50%" },
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
  eyebrow: "Client reviews",
  title: { solid: "In their", outline: "own words." },
  intro: "Two minds. One big vision. This is what clients and teammates have said about working with us.",
  video: { src: "/videos/reviews-desk.mp4?v=5", poster: "/images/reviews-desk-poster.webp?v=5" },
  proof: { value: "100%", label: "Job Success on Upwork" },
  items: [
    { id: "greg", org: "Ground Control Systems", initials: "GB", name: "Greg Bauer", role: "CEO, Ground Control Systems", source: "Client of Graham", via: { kind: "client", src: "/brands/clients/colour/groundcontrol.webp", fill: true },
      quote: "Graham was an exceptional partner on our WordPress project. He quickly identified and resolved performance issues, and his communication skills were outstanding.", mark: "exceptional partner" },
    { id: "giuliano", org: "Webtec", initials: "GB", name: "Giuliano Barducci", role: "Head of Production, Design and QA, Webtec", source: "on Jasper", via: { kind: "client", src: "/brands/clients/colour/webtec.webp", fill: true },
      quote: "I've seen his redesigns transform those situations, restoring client confidence and giving projects a much stronger direction.", mark: "restoring client confidence" },
    { id: "upwork-renovation", org: "Upwork", name: "Hired Jasper on Upwork", role: "WordPress landing page", source: "on Jasper", via: { kind: "upwork" },
      quote: "Great experience with Jasper (Ted)! Quick turnaround, good communication and willing to go the extra mile to complete the project successfully.", mark: "go the extra mile" },
    { id: "olaf", org: "Rack n Road", initials: "OG", name: "Olaf Guerrero", role: "Marketing Director, Rack n Road", source: "Client of Graham", via: { kind: "client", src: "/brands/clients/colour/racknroad.webp" },
      quote: "With strong SEO knowledge and site optimization skills, he's reliable and ideal for long-term or short contracts.", mark: "strong SEO knowledge" },
    { id: "pontus", org: "Webtec", initials: "PL", name: "Pontus Lenell", role: "Founder & CEO, Webtec", source: "on Jasper", via: { kind: "client", src: "/brands/clients/colour/webtec.webp", fill: true },
      quote: "Throughout his time with us, Jasper demonstrated strong web design skills, attention to detail, and a commitment to delivering high-quality work.", mark: "high-quality work" },
    { id: "upwork-agency", org: "Weblify", name: "Weblify", role: "Digital marketing agency, hired Jasper on Upwork", source: "on Jasper", via: { kind: "client", src: "/brands/clients/colour/weblify.webp", fill: true },
      quote: "Jasper combines two important attributes; talent and adaptability. He's a creative designer that explores different ways to generate beautiful design.", mark: "talent and adaptability" },
    { id: "daniel", org: "Endtimes Official", initials: "DC", name: "Daniel Clarke", role: "Owner, Endtimes Official", source: "Client of Graham", via: { kind: "client", src: "/brands/clients/colour/endtimes.webp", fill: true },
      quote: "Graham's expertise was appreciated, especially in how you guys followed exactly how I envisioned the final product, while offering and implementing some very helpful suggestions.", mark: "followed exactly how I envisioned" },
    { id: "ellaine", org: "Webtec", initials: "EG", name: "Ellaine Gabotero", role: "Senior Web Designer, Webtec", source: "on Jasper", via: { kind: "client", src: "/brands/clients/colour/webtec.webp", fill: true },
      quote: "His designs are consistently excellent, but he brings so much more to the table than just visuals.", mark: "consistently excellent" },
    { id: "upwork-website", org: "Upwork", name: "Hired Jasper on Upwork", role: "WordPress website", source: "on Jasper", via: { kind: "upwork" },
      quote: "Jasper is responsive, reliable, and a hard worker. He jumped right in and took great care of the task. Will definitely use Jasper in the future!", mark: "responsive, reliable, and a hard worker" },
    { id: "eureka", org: "Adrenaline Solutions", initials: "EQ", name: "Eureka Quinto", role: "COO, Adrenaline Solutions", source: "Client of Graham", via: { kind: "client", src: "/brands/clients/marks/adrenaline.png" },
      quote: "Graham is a reliable WordPress Developer. We are pleased with his performance. We wholeheartedly recommend him.", mark: "wholeheartedly recommend him" },
    { id: "sam", org: "Webtec", initials: "SM", name: "Sam Medriano", role: "Director of Operations, Webtec", source: "on Jasper", via: { kind: "client", src: "/brands/clients/colour/webtec.webp", fill: true },
      quote: "He has a keen eye for innovative and modern designs, and his proficiency in using Figma sets him apart in the field.", mark: "keen eye for innovative and modern designs" },
    { id: "upwork-help", org: "Upwork", name: "Hired Jasper on Upwork", role: "Web design in WordPress", source: "on Jasper", via: { kind: "upwork" },
      quote: "Expectations of the deliverables were even exceeded and the quality of the project was superb.", mark: "even exceeded" },
    { id: "upwork-theme", org: "Upwork", name: "Hired Jasper on Upwork", role: "WordPress theme build", source: "on Jasper", via: { kind: "upwork" },
      quote: "Jasper did great! He is very knowledgeable in web development and meeting all our PSD to Wordpress requirements.", mark: "very knowledgeable in web development" },
    { id: "upwork-divi", org: "Upwork", name: "Hired Jasper on Upwork", role: "Divi shop pages", source: "on Jasper", via: { kind: "upwork" },
      quote: "He did a really great job in completing the work, helped me through the process step by step. I will hire him again if any more work is required.", mark: "really great job" },
    { id: "upwork-images", org: "Upwork", name: "Hired Jasper on Upwork", role: "Website images", source: "on Jasper", via: { kind: "upwork" },
      quote: "Great worker. Fast correspondence, fast action. Very happy, thank u Jasper", mark: "Very happy" },
    { id: "upwork-translation", org: "Upwork", name: "Hired Jasper on Upwork", role: "WordPress translation", source: "on Jasper", via: { kind: "upwork" },
      quote: "Very happy with the results, good communication, always available I recommend, thanks", mark: "Very happy with the results" },
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
  title: { solid: "Companies we've", outline: "worked with." },
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
 * Contact (Graham's reference: "Tell us your win"). Revision 76: the same three-step request
 * as Steps (shared RequestForm), worded for a project, on the hero's live gradient, with the
 * reused cta-shop photo. No form service yet: sending opens the visitor's email app,
 * addressed to `email` (UNCONFIRMED: hello@webleta.com appears only in older notes).
 */
export const contact = {
  eyebrow: "Contact",
  title: { solid: "Tell us what a win looks like.", outline: "We'll bring the plan." },
  promises: [
    "A site that's yours, never a theme with your logo on it",
    "A clear scope and price, agreed before we start",
    "A reply from a person, usually within one working day",
  ],
  email: "hello@webleta.com",
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
  colour: "aqua" | "ochre" | "harbour" | "dusk" | "coral" | "kelp" | "shell" | "seafoam";
  icon: IndustryIcon;
  name: string;
  need: string;
  photo: { src: string; srcSet: string; position?: string };
  lightCorner?: boolean;
};
export const industries = {
  eyebrow: "Industries",
  title: { solid: "Sites that know", outline: "your industry." },
  intro: "Every industry wins customers differently. These are the ones we know best. If yours isn't here, ask us. We'll say honestly whether we're a fit before you spend anything.",
  more: { lead: "Not on the list?", label: "Ask us about your industry", href: "#contact" },
  items: [
    { id: "trades", slot: "hero", colour: "aqua", icon: "trades", name: "Trades and home services",
      need: "Quote requests that arrive with the job details.",
      photo: { src: "/images/industry-trades-800.webp", srcSet: "/images/industry-trades-480.webp 480w, /images/industry-trades-800.webp 800w, /images/industry-trades-1280.webp 1280w", position: "62% 40%" } },
    { id: "medspa", slot: "wide", colour: "coral", icon: "spa", name: "Med spas and aesthetics",
      need: "Clients see your prices and book a consult online.",
      photo: { src: "/images/industry-medspa-800.webp", srcSet: "/images/industry-medspa-480.webp 480w, /images/industry-medspa-800.webp 800w, /images/industry-medspa-1280.webp 1280w", position: "85% 45%" } },
    { id: "entertainment", slot: "a", colour: "dusk", icon: "music", name: "Events and entertainment",
      need: "Show your next dates and take bookings on one page.",
      photo: { src: "/images/industry-entertainment-800.webp", srcSet: "/images/industry-entertainment-480.webp 480w, /images/industry-entertainment-800.webp 800w", position: "60% 50%" } },
    { id: "dental", slot: "b", colour: "shell", icon: "dental", name: "Dental clinics",
      need: "New patients see the fees and book a first visit.",
      photo: { src: "/images/industry-dental-800.webp", srcSet: "/images/industry-dental-480.webp 480w, /images/industry-dental-800.webp 800w, /images/industry-dental-1280.webp 1280w", position: "85% 50%" } },
    { id: "food", slot: "d", colour: "ochre", icon: "food", name: "Food and hospitality",
      need: "A menu that reads well on a phone, and online orders.",
      photo: { src: "/images/industry-food-800.webp", srcSet: "/images/industry-food-480.webp 480w, /images/industry-food-800.webp 800w, /images/industry-food-1280.webp 1280w", position: "90% 35%" } },
    { id: "stores", slot: "e", colour: "kelp", icon: "store", name: "Online stores",
      need: "Product pages that lead straight to the checkout.",
      photo: { src: "/images/industry-ecommerce-800.webp", srcSet: "/images/industry-ecommerce-480.webp 480w, /images/industry-ecommerce-800.webp 800w, /images/industry-ecommerce-1280.webp 1280w", position: "90% 55%" } },
    { id: "auto", slot: "f", colour: "harbour", icon: "auto", name: "Automotive",
      need: "One tap from your website to a ringing phone.",
      photo: { src: "/images/benefit-calls-800.webp", srcSet: "/images/benefit-calls-480.webp 480w, /images/benefit-calls-800.webp 800w", position: "70% 40%" } },
    { id: "professional", slot: "c", colour: "seafoam", icon: "law", name: "Professional services",
      need: "As careful online as you are with your clients.",
      photo: { src: "/images/industry-professional-800.webp", srcSet: "/images/industry-professional-480.webp 480w, /images/industry-professional-800.webp 800w, /images/industry-professional-1280.webp 1280w", position: "88% 55%" } },
  ] satisfies Industry[],
};

/**
 * FAQ (Graham's "Additional sections"; Revision 85, built for SEO, AEO and GEO). Every
 * question and full answer is in the HTML, and the same text feeds FAQPage JSON-LD, so
 * search engines and AI answer engines can quote it. Each answer opens with the direct
 * answer in its first sentence and names Webleta where it helps a quote stand alone.
 * Answers repeat what the page already says. UNCONFIRMED: prices (Pricing's placeholders),
 * ownership, platforms and the Australia-wide service area need Graham's sign-off.
 */
export type FaqItem = { id: string; q: string; a: string };
export const faq = {
  eyebrow: "FAQ",
  title: { solid: "Questions,", outline: "answered." },
  intro: "Straight answers about price, process and what you own. If yours isn't here, ask us.",
  more: { lead: "Something else on your mind?", label: "Ask us directly" },
  // Personal names appear only in Reviews (Jasper, 2026-11-16).
  signature: { name: "The Webleta team", role: "Webleta" },
  groups: [
    {
      id: "cost", title: "Cost",
      items: [
        { id: "cost", q: "How much does a website cost?", a: "A new Webleta website starts from $2,400, paid once. You can also pay $190 a month on a subscription that includes updates and hosting. Either way, you see the full price before any work starts." },
        { id: "monthly", q: "Can I pay monthly?", a: "Yes. The subscription is $190 a month for a new custom site, monthly updates, hosting, backups and a named person to email, with a minimum term of 12 months." },
        { id: "preview", q: "What is the free preview?", a: "The free preview is a real design of your new homepage, made before you pay anything. Send us your website, and if you like the preview we build the rest. If not, you owe us nothing." },
      ],
    },
    {
      id: "process", title: "Process",
      items: [
        { id: "time", q: "How long does a new website take?", a: "It depends on how many pages you need. You get a launch date with your quote, and the free preview usually comes first." },
        { id: "start", q: "What do you need from me to start?", a: "Three things: your current website or business name, what you want the new site to win you, and an email to reply to. We plan the rest with you." },
        { id: "edit", q: "Can I edit the website myself?", a: "Yes. Every project includes training so you can change text, photos and prices yourself. If you'd rather not, we can make changes for you." },
      ],
    },
    {
      id: "ownership", title: "Ownership and tech",
      items: [
        { id: "own", q: "Will I own my website?", a: "Yes. Your domain, your accounts and your files stay in your name." },
        { id: "platform", q: "What platform do you build websites on?", a: "Webleta builds on WordPress when you want to edit the site yourself, and on Next.js or Astro when speed matters most. We recommend one when we quote." },
        { id: "seo", q: "Do you do SEO?", a: "Yes. Every site is built with search basics: fast pages, clear structure and metadata. SEO is also a separate service, if you want ongoing work to rank higher." },
      ],
    },
    {
      id: "agencies", title: "Agencies",
      items: [
        { id: "agencies", q: "Do you work with agencies?", a: "Yes. Webleta designs and builds websites for agencies, from overflow tasks to full projects, inside your own process and tools." },
        { id: "whitelabel", q: "Is agency work white-labelled?", a: "Yes. Your clients see your agency's name on the work, never ours." },
      ],
    },
  ] satisfies { id: string; title: string; items: FaqItem[] }[],
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
    id: "industries",
    title: "Industries",
    intro: "Sites for the industries we've built for.",
    needs: [],
    ground: "deep",
  },
  {
    id: "pricing",
    title: "Pricing and packages",
    intro: "Pick a package or ask for a quote. Either way, you see the price first.",
    needs: ["Packages, prices and terms from Graham (none confirmed)"],
    ground: "shallows",
  },
  {
    id: "faq",
    title: "FAQ",
    intro: "Questions, answered.",
    needs: [],
    ground: "white",
  },
  {
    id: "contact",
    title: "Contact",
    intro: "Book a call and get a straight answer and a clear next step.",
    needs: ["Email, phone and booking link", "A form service before any form is added (no fake form)"],
    ground: "white",
  },
];

/** Footer (Revision 80): no call to action (Contact just asked); after Studio PLATO's footer. */
export const footer = {
  tagline: site.description,
  services: ["Website design and development", "Web applications", "SEO", "Email marketing", "Social media marketing", "Content marketing", "Mobile apps"],
  top: "Back to top",
};
