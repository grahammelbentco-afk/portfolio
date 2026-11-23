import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Problems from "@/components/Problems";
import Benefits from "@/components/Benefits";
import Services from "@/components/Services";
import CtaBanner from "@/components/CtaBanner";
import Steps from "@/components/Steps";
import Work from "@/components/Work";
import Reviews from "@/components/Reviews";
import Clients from "@/components/Clients";
import Industries from "@/components/Industries";
import Pricing from "@/components/Pricing";
import Growth from "@/components/Growth";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import PlaceholderSection from "@/components/PlaceholderSection";
import Footer from "@/components/Footer";
import SiteMotion from "@/components/SiteMotion";
import { contact, hero, problems, sections, site, whatsapp } from "@/content/homepage";

/** Every section, in the order of `sections` in content/homepage.ts. Any id without a component renders as a placeholder. */
const built: Record<string, () => React.JSX.Element> = {
  problems: Problems,
  about: About,
  benefits: Benefits,
  services: Services,
  cta: CtaBanner,
  steps: Steps,
  work: Work,
  reviews: Reviews,
  clients: Clients,
  industries: Industries,
  pricing: Pricing,
  growth: Growth,
  faq: Faq,
  contact: Contact,
};

/**
 * Organisation and website structured data (SEO pass, 2026-11-23). The FAQ section adds its own
 * FAQPage block. No address: the business base isn't stated on the site (Jasper, 2026-11-22).
 */
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: `${site.url}/`,
      logo: `${site.url}/icon-512.png`,
      image: `${site.url}${site.shareImage.src}`,
      description: site.shareDescription,
      email: contact.email,
      telephone: whatsapp.number ? `+${whatsapp.number}` : undefined,
      // Worldwide, with Australia first as the priority market (Graham, 2026-11-23).
      areaServed: [{ "@type": "Country", name: "Australia" }, { "@type": "Place", name: "Worldwide" }],
      sameAs: hero.social.flatMap((s) => (s.href && s.href.startsWith("http") ? [s.href] : [])),
      knowsAbout: ["Website design", "Website redesign", "Web development", "WordPress", "SEO", "Local SEO", "Digital marketing", "Social media marketing", "Email marketing", "White-label web development"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web design and digital marketing services",
        itemListElement: problems.items.map((p) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: p.service, description: `${p.fix}. ${p.text}` },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      inLanguage: "en-AU",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <main id="main" tabIndex={-1} data-menu-inert>
        <Hero />
        {sections.map((section) => {
          const Built = built[section.id];
          return Built ? <Built key={section.id} /> : <PlaceholderSection key={section.id} section={section} />;
        })}
      </main>
      <Footer />
      <SiteMotion />
    </>
  );
}
