import { contact, footer, headerCta, site, whatsapp, whatsappHref } from "@/content/homepage";
import styles from "./Footer.module.css";

const YEAR = 2026;

/**
 * Footer (Revision 77). Abyss ground after Contact's gradient.
 *   [ Have a site in mind?  Book a call ][ Explore ][ Contact ]
 *   [ © 2026 Webleta · Based in Australia                Back to top ]
 *   [ WEBLETA, full width, tone-on-tone, running off the bottom edge   ]
 * The wordmark is the brand file used as a mask, one tone step above the ground, so it reads
 * as texture rather than a second logo. As the footer scrolls in, it rises into place (CSS
 * scroll timeline, where supported); reduced motion shows it still.
 */
export default function Footer() {
  return (
    <footer className={styles.footer} data-ground="dark" data-menu-inert>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <a href="#top" className={styles.logo} aria-label="Webleta, back to top">
            <img src="/logo/webleta-horizontal-teal-on-dark.svg" alt="" width={184} height={36} />
          </a>
          <p className={styles.lead}>{footer.lead}</p>
          <p className={styles.tagline}>{footer.tagline}</p>
          <a href={headerCta.href} className={`btn btn-lg ${styles.cta}`}>
            {headerCta.label}
          </a>
        </div>

        <nav aria-label="Footer" className={styles.columns}>
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h2 className={styles.colTitle}>{col.title}</h2>
              <ul className={styles.links}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className={styles.colTitle}>Contact</h2>
            <ul className={styles.links}>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <a href={whatsappHref()}>{whatsapp.display}</a>
              </li>
              <li>
                <a href={footer.contact.href}>{footer.contact.label}</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {YEAR} {site.name}. {site.location}.
        </p>
        <a href="#top" className={styles.toTop}>
          {footer.top}
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 13V3.5M4 7.5l4-4 4 4" />
          </svg>
        </a>
      </div>

      <div className="container" aria-hidden="true">
        <div className={styles.markWrap}>
          <span className={styles.mark} />
        </div>
      </div>
    </footer>
  );
}
