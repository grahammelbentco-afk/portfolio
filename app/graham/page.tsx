import Header from "@/components/graham/Header";
import Hero from "@/components/graham/Hero";
import About from "@/components/graham/About";
import Services from "@/components/graham/Services";
import Skills from "@/components/graham/Skills";
import Team from "@/components/graham/Team";
import Socials from "@/components/graham/Socials";
import CtaBanner from "@/components/graham/CtaBanner";
import Work from "@/components/graham/Work";
import Clients from "@/components/graham/Clients";
import Reviews from "@/components/graham/Reviews";
import Contact from "@/components/graham/Contact";
import PlaceholderSection from "@/components/graham/PlaceholderSection";
import Footer from "@/components/graham/Footer";
import SiteMotion from "@/components/graham/SiteMotion";
import type { Metadata } from "next";
import { sections, site } from "@/content/graham/homepage";

/**
 * Graham's portfolio (from github.com/jasperdiaz/webleta-graham), served as the /graham/
 * sub page. Its own title, description and share card replace the agency homepage's.
 */
export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
  authors: [{ name: site.author }],
  alternates: { canonical: "/graham/" },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "/graham/",
    siteName: site.name,
    title: site.title,
    description: site.shareDescription,
    images: [{ url: site.shareImage.src, width: site.shareImage.width, height: site.shareImage.height, alt: site.shareImage.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.twitterDescription,
    images: [site.shareImage.src],
  },
};

/**
 * Every section, in the order of `sections` in content/homepage.ts. The ids are the old
 * webleta.com anchors, so links to #services, #tools, #projects etc. keep working.
 * The old Rate section (#rate) is left out (Jasper, 2026-11-24).
 */
const built: Record<string, () => React.JSX.Element> = {
  about: About,
  services: Services,
  tools: Skills,
  team: Team,
  socials: Socials,
  "cta-banner": CtaBanner,
  projects: Work,
  companies: Clients,
  reviews: Reviews,
  contact: Contact,
};

/** The old webleta.com structured data (WebSite, WebPage, Person), with images served locally. */
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      description: "Portfolio of senior developer Graham Orprecio, providing web development and ongoing web production as an extension of digital agencies.",
      inLanguage: "en-PH",
      publisher: { "@id": `${site.url}/graham/#person` },
    },
    {
      "@type": "WebPage",
      "@id": `${site.url}/graham/#webpage`,
      url: `${site.url}/graham/`,
      name: site.title,
      description: "Senior developer Graham Orprecio from the Philippines, supporting digital agencies with web development, design, e-commerce, SEO and ongoing web production.",
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/graham/#person` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${site.url}${site.shareImage.src}` },
      inLanguage: "en-PH",
    },
    {
      "@type": "Person",
      "@id": `${site.url}/graham/#person`,
      name: "Graham Orprecio",
      url: `${site.url}/graham/`,
      image: `${site.url}/icon-512.png`,
      jobTitle: "Senior Developer & Agency Web Production Partner",
      worksFor: { "@type": "Organization", name: site.name, url: `${site.url}/` },
      knowsAbout: ["WordPress", "Divi", "Elementor", "WooCommerce", "Advanced Custom Fields", "HTML", "CSS", "JavaScript", "Web Development", "Digital Agency Support", "Web Production", "White Label Web Development", "Web Design", "Search Engine Optimization", "Website Performance"],
      sameAs: ["https://upwork.com/freelancers/~01a9fa727d39310eaa", "https://www.instagram.com/graahaaaam/"],
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
