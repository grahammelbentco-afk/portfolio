import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Services from "@/components/Services";
import CtaBanner from "@/components/CtaBanner";
import Steps from "@/components/Steps";
import Work from "@/components/Work";
import Reviews from "@/components/Reviews";
import Clients from "@/components/Clients";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import PlaceholderSection from "@/components/PlaceholderSection";
import Footer from "@/components/Footer";
import { sections } from "@/content/homepage";

/** Every section in Graham's outline order. Any id without a component renders as a placeholder. */
const built: Record<string, () => React.JSX.Element> = {
  about: About,
  benefits: Benefits,
  services: Services,
  cta: CtaBanner,
  steps: Steps,
  work: Work,
  reviews: Reviews,
  clients: Clients,
  pricing: Pricing,
  contact: Contact,
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} data-menu-inert>
        <Hero />
        {sections.map((section) => {
          const Built = built[section.id];
          return Built ? <Built key={section.id} /> : <PlaceholderSection key={section.id} section={section} />;
        })}
      </main>
      <Footer />
    </>
  );
}
