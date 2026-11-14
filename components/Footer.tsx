import { footer, headerCta, site } from "@/content/homepage";
import styles from "./Footer.module.css";

const YEAR = 2026;

export default function Footer() {
  return (
    <footer className={styles.footer} data-ground="dark" data-menu-inert>
      {/* Ripples (V1.6 p.16): concentric arcs from the symbol's centre, corner only, low contrast. */}
      <svg className={styles.ripples} viewBox="0 0 600 600" aria-hidden="true" focusable="false">
        {[92, 156, 220, 284, 348].map((r) => (
          <circle key={r} cx="600" cy="600" r={r * 1.2} />
        ))}
      </svg>

      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <a href="#top" className={styles.logo} aria-label="Webleta, back to top">
            <img src="/logo/webleta-horizontal-teal-on-dark.svg" alt="" width={184} height={36} />
          </a>
          <p className={styles.tagline}>{footer.tagline}</p>
          <a href={headerCta.href} className="btn btn-light">
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
                <a href={footer.contact.href}>{footer.contact.label}</a>
              </li>
            </ul>
            <p className={styles.location}>{site.location}</p>
          </div>
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {YEAR} {site.name}
        </p>
      </div>
    </footer>
  );
}
