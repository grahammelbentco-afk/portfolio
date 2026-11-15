import { contact, footer, navigation, site, whatsapp, whatsappHref } from "@/content/homepage";
import styles from "./Footer.module.css";

const YEAR = 2026;

/**
 * Footer (Revision 80), after Studio PLATO's footer (Awwwards): no call to action, because
 * Contact has just asked. The giant wordmark comes first, in Shallows at full contrast, its
 * feet fading into the dark; then a calm row of four labelled columns; then the small print.
 *   [ W E B L E T A  (full width, rises in, fades at the base)        ]
 *   [ Studio  ][ Explore  ][ Services  ][ Contact  ]
 *   [ © 2026 Webleta                                   Back to top ↑ ]
 */
export default function Footer() {
  return (
    <footer className={styles.footer} data-ground="dark" data-menu-inert>
      <div className="container" aria-hidden="true">
        <div className={styles.markWrap}>
          <span className={styles.mark} />
        </div>
      </div>

      <nav aria-label="Footer" className={`container ${styles.info}`}>
        <div className={styles.col}>
          <h2 className={styles.label}>Studio</h2>
          <p className={styles.about}>{footer.tagline}</p>
          <p className={styles.muted}>{site.location}</p>
        </div>
        <div className={styles.col}>
          <h2 className={styles.label}>Explore</h2>
          <ul className={styles.links}>
            {navigation.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.col}>
          <h2 className={styles.label}>Services</h2>
          <ul className={styles.links}>
            {footer.services.map((s) => (
              <li key={s}>
                <a href="#services">{s}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.col}>
          <h2 className={styles.label}>Contact</h2>
          <ul className={styles.links}>
            <li>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <a href={whatsappHref()}>{whatsapp.display}</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {YEAR} {site.name}
        </p>
        <a href="#top" className={styles.toTop}>
          {footer.top}
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 13V3.5M4 7.5l4-4 4 4" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
