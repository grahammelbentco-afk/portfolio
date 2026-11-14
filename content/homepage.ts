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
      href: "#contact",
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

export type LiveService = {
  id: string;
  title: string;
  text: string;
  icon: ServiceIcon;
  colour: SupportColour;
  /** Which coded interface the tile shows: on a device photo, or on its own. */
  ui: "wp-editor" | "serp" | "design" | "care";
  stage?: DeviceStage;
  logos: PlatformLogo[];
};

export type SoonService = { id: string; title: string; text: string; icon: ServiceIcon; logos: PlatformLogo[] };

const logo = {
  wordpress: { name: "WordPress", file: "/brands/si/wordpress.svg", colour: "#21759B" },
  google: { name: "Google", file: "/brands/si/google.svg", colour: "#4285F4" },
  figma: { name: "Figma", file: "/brands/si/figma.svg", colour: "#F24E1E" },
  gmail: { name: "Gmail", file: "/brands/si/gmail.svg", colour: "#EA4335" },
  apple: { name: "Apple", file: "/brands/si/apple.svg", colour: "#0B0B0B" },
  android: { name: "Android", file: "/brands/si/android.svg", colour: "#34A853" },
  instagram: { name: "Instagram", file: "/brands/si/instagram.svg", colour: "#E4405F" },
  facebook: { name: "Facebook", file: "/brands/si/facebook.svg", colour: "#0866FF" },
  tiktok: { name: "TikTok", file: "/brands/si/tiktok.svg", colour: "#0B0B0B" },
  linkedin: { name: "LinkedIn", file: "/brands/si/linkedin.svg", colour: "#0A66C2" },
} satisfies Record<string, PlatformLogo>;

/**
 * Services (Revision 39, bento). The list and the Available now / Coming soon split are
 * from Graham's reference (his dark eight-card grid). UNCONFIRMED: Graham to confirm the
 * list, the split and the copy. Each live tile shows the service in use: a coded interface
 * (WordPress editor, Google result, design-to-page, care dashboard) on a fal device photo.
 * Business names on screen (Harlow Joinery) are the fictional concept project.
 * Photos: fal flux-pro v1.1-ultra, 2026-11-14. Manifest:
 * Webleta-AI-Generated-Images/manifest-2026-11-14-services.csv
 */
export const services = {
  title: "Ready now, and what comes next.",
  intro: "Websites are what we do best, so they come first. The rest is on its way.",
  liveLabel: "Available now",
  soonLabel: "Coming soon",
  live: [
    {
      id: "wordpress", title: "WordPress development", icon: "code", colour: "harbour", ui: "wp-editor",
      text: "Custom WordPress builds made for speed, stability and easy updates.",
      logos: [logo.wordpress],
      stage: {
        base: "/images/bento-wordpress", width: 2752, height: 1536,
        alt: "A laptop on an oak desk against a blue wall, open on a WordPress page editor.",
        screen: { left: 35.61, top: 35.68, width: 31.83, height: 36.2, radius: "0.6% / 1%" },
      },
    },
    {
      id: "seo", title: "SEO support", icon: "search", colour: "ochre", ui: "serp",
      text: "On-page and technical SEO, so the right people find you first.",
      logos: [logo.google],
      stage: {
        base: "/images/bento-seo", width: 2368, height: 1792,
        alt: "A hand holding a phone against a sunlit wall, showing a business at the top of Google results.",
        screen: { left: 44.09, top: 19.87, width: 23.99, height: 66.96, radius: "14% / 6.5%" },
      },
    },
    {
      id: "design", title: "Design implementation", icon: "web", colour: "dusk", ui: "design",
      text: "Designs turned into polished pages that follow the brand and lead to a sale.",
      logos: [logo.figma],
      stage: {
        base: "/images/bento-design", width: 2368, height: 1792,
        alt: "A tablet on a desk beside violet colour swatches, showing a design next to the finished page.",
        screen: { left: 34.8, top: 22.1, width: 32.09, height: 58.26, radius: "4% / 2.6%" },
      },
    },
    {
      id: "production", title: "Website production", icon: "care", colour: "kelp", ui: "care",
      text: "Updates, maintenance and support that keep a site current, secure and running smoothly.",
      logos: [logo.wordpress],
    },
  ] satisfies LiveService[],
  soon: [
    { id: "email", title: "Web emails", icon: "mail", text: "Professional email addresses on your own domain.", logos: [logo.gmail] },
    { id: "apps", title: "Web and mobile apps", icon: "phone", text: "Custom tools and dashboards that go beyond a standard website.", logos: [logo.apple, logo.android] },
    { id: "social", title: "Social media", icon: "social", text: "Consistent posting and management across your channels.", logos: [logo.instagram, logo.facebook, logo.tiktok, logo.linkedin] },
    { id: "content", title: "Content marketing", icon: "pen", text: "Blog posts and on-site content that bring the right people in.", logos: [logo.google] },
  ] satisfies SoonService[],
  more: { title: "Not sure which you need?", text: "Tell us what you want more of. We'll tell you what's worth doing first.", action: { label: "Book a call", href: "#contact" } },
};

/** CTA banner (Graham: "cta banner"). The outlined word reuses the hero's outline device. UNCONFIRMED copy. */
export const ctaBanner = {
  title: { before: "Let's make", outline: "yours", after: "." },
  text: "Tell us about your business. We'll come back with a scope and a price before anything starts.",
  primary: { label: "Book a call", href: "#contact" },
  secondary: { label: "See pricing", href: "#pricing" },
  image: { base: "/images/cta-caustics" },
};

/**
 * Steps (Graham's outline: "Steps / OPTIONAL"; reference "See it before we build it").
 * Ties to the band's "See it first" hook. UNCONFIRMED: the free preview offer is not
 * confirmed by Graham. The compare slider is an illustration, not a client site.
 */
export const steps = {
  title: { outline: "See it", rest: "before you pay for it." },
  intro: "Send us your website. We design a real preview of your new homepage first. If you like it, we build the rest. If not, you've lost nothing.",
  items: [
    { title: "Free preview", text: "We redesign your homepage as a working preview, in your brand." },
    { title: "Plan the pages", text: "Like it? We agree the pages, the scope and the price, in writing." },
    { title: "Build and launch", text: "We build it, move your content across and put it live." },
  ],
  compare: {
    label: "Compare the site today with the preview",
    before: "Today",
    after: "Your preview",
    url: "harlowjoinery.com.au",
    note: "An example. Your preview is designed for your business.",
  },
  action: { label: "Get my free preview", href: "#contact" },
};

/**
 * Work (Graham: "Portfolio - freedom of display"). UNCONFIRMED: no client work is cleared
 * to publish yet. These are the four fictional concept projects from Preview V2, with its
 * fal images (illustrations). The page labels them as concepts.
 */
export type Project = {
  id: string;
  name: string;
  sector: string;
  url: string;
  headline: string;
  cta: string;
  nav: string[];
  /** Concept palette: ground, text and accent of the mock site, plus the swatches shown. */
  palette: { ground: string; ink: string; accent: string; swatches: string[] };
  type: "serif" | "heavy" | "light" | "mono";
  image: { base: string; alt: string };
  layout: "wide" | "tall";
};

export const work = {
  title: "Four businesses. Four different looks.",
  intro: "Concept sites made to show the range. Each one starts from the business, not from a theme.",
  items: [
    {
      id: "winery", name: "Red Gum Cellar Door", sector: "Winery, warm and earthy", url: "redgumcellar.com.au",
      headline: "Taste it where it's made.", cta: "Book a tasting", nav: ["Wines", "Visit", "Club"], type: "serif", layout: "wide",
      palette: { ground: "#2d2a26", ink: "#efe4d2", accent: "#c9a27a", swatches: ["#7a3b22", "#c9a27a", "#efe4d2", "#2d2a26"] },
      image: { base: "/images/work-winery", alt: "A barrel room opening onto a dry paddock, with wine glasses on a timber table." },
    },
    {
      id: "juice", name: "Peel & Press", sector: "Juice bar, loud and bright", url: "peelandpress.com.au",
      headline: "Squeezed this morning.", cta: "Order ahead", nav: ["Menu", "Find us"], type: "heavy", layout: "tall",
      palette: { ground: "#ff5b2e", ink: "#fff6e0", accent: "#ffc21a", swatches: ["#ff5b2e", "#ffc21a", "#e0115f", "#1d4ed8"] },
      image: { base: "/images/work-juice", alt: "A tiled counter covered in oranges, grapefruit and glasses of fresh juice." },
    },
    {
      id: "swim", name: "Saltwater Baths Club", sector: "Swim club, cool and fresh", url: "saltwaterbaths.org.au",
      headline: "Laps at sunrise, all year round.", cta: "Join the club", nav: ["Swim", "Members"], type: "light", layout: "tall",
      palette: { ground: "#1f4e6b", ink: "#e6eef0", accent: "#7fb7c9", swatches: ["#1f4e6b", "#7fb7c9", "#e6eef0", "#3a3f44"] },
      image: { base: "/images/work-swim", alt: "An ocean pool cut into the rocks, with one swimmer doing laps." },
    },
    {
      id: "joinery", name: "Harlow Joinery", sector: "Joinery workshop, calm and neutral", url: "harlowjoinery.com.au",
      headline: "Made to measure. Made to last.", cta: "Request a quote", nav: ["Kitchens", "Furniture", "About"], type: "mono", layout: "wide",
      palette: { ground: "#f4f1ec", ink: "#333333", accent: "#8b7355", swatches: ["#8b7355", "#d8cfc2", "#f4f1ec", "#333333"] },
      image: { base: "/images/work-joinery", alt: "A joiner in his workshop checking his phone beside a wall of hand tools." },
    },
  ] satisfies Project[],
};

/**
 * Reviews (Graham: "text based atm - but reserve space for portrait vid").
 * UNCONFIRMED: fictional placeholder reviews. Replace them with real reviews, each with the
 * reviewer's permission, before launch. The portrait card takes a 9:16 video later.
 */
export type Review = { quote: string; name: string; business: string; place: string };
export const reviews = {
  title: "What clients say",
  intro: "Straight from the people we've built for.",
  featured: {
    quote: "We'd had three websites before this one. It's the first that looks like our shop, and the first that brings people through the door.",
    name: "Dana Whitlock", business: "Crumb & Co Bakery", place: "Fremantle, WA",
  } satisfies Review,
  items: [
    { quote: "They asked what a good week looks like for us, then built the site around it. Bookings came through the first weekend.", name: "Priya Raman", business: "Studio Nine Hair", place: "Newtown, NSW" },
    { quote: "Clear price, clear dates, and a real person answering my emails. That's rarer than it should be.", name: "Tom Haddad", business: "Kingsway Auto", place: "Geelong, VIC" },
    { quote: "We hand them our overflow builds. They come back on time, in our style and under our name.", name: "Lena Ford", business: "Ford & Field Agency", place: "Brisbane, QLD" },
  ] satisfies Review[],
};

/** Clients (Graham: "Logos of company we previously worked with"). UNCONFIRMED: fictional names set in type, no logo files. */
export type ClientMark = { name: string; style: "serif" | "wide" | "lower" | "italic" | "plain" | "heavy" };
export const clients = {
  title: "Local businesses we've worked with",
  names: [
    { name: "Crumb & Co", style: "serif" },
    { name: "Kingsway Auto", style: "wide" },
    { name: "studio nine", style: "lower" },
    { name: "Ford & Field", style: "italic" },
    { name: "Harbourside Physio", style: "plain" },
    { name: "Clayworks", style: "heavy" },
  ] satisfies ClientMark[],
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
  action: string;
};
export const pricing = {
  title: "Pick a package, or ask for a quote.",
  intro: "Either way, you see the price before we start.",
  audiences: [
    {
      id: "business", label: "For local businesses",
      plans: [
        { id: "project", name: "Project", fit: "A new site with a clear start and finish.", price: "$2,400", unit: "from, one-off", action: "Start a project",
          features: ["Custom design, never a theme", "Up to six pages", "Mobile, speed and SEO basics", "Training so you can edit it", "30 days of fixes after launch"] },
        { id: "subscription", name: "Subscription", fit: "Your site, kept fresh and looked after.", price: "$190", unit: "per month", action: "Choose subscription", featured: true,
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
