import type { CSSProperties } from "react";
import { contact, footer, hero, site } from "@/content/homepage";
import SocialIcon from "./SocialIcon";
import styles from "./Footer.module.css";

const YEAR = 2026;

function ToolRow({ tools, copy }: { tools: (typeof footer.tools)[number]; copy?: boolean }) {
  return (
    <ul className={styles.logoSet} role="list" aria-hidden={copy || undefined}>
      {tools.map(([name, slug, color]) => (
        <li key={slug} className={styles.chip}>
          <span className={styles.glyph} style={{ "--logo": `url(/brands/si/${slug}.svg)`, "--c": color } as CSSProperties} />
          {name}
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer} data-ground="dark" data-menu-inert data-reveal-skip>
      <div className="container">
        <div className={styles.wordmark} role="img" aria-label={site.name} />

        <div className={styles.info}>
          <div className={`${styles.column} ${styles.studio}`}>
            <h2 className={styles.label}>Studio</h2>
            <p className={styles.about}>{footer.tagline}</p>
          </div>

          <div className={styles.column}>
            <h2 className={styles.label}>Services</h2>
            <ul className={styles.serviceList} role="list">
              {footer.services.map((name) => <li key={name}>{name}</li>)}
            </ul>
          </div>

          <nav className={styles.column} aria-labelledby="footer-nav-title">
            <h2 className={styles.label} id="footer-nav-title">Explore</h2>
            <ul className={styles.navList} role="list">
              {footer.links.map(({ href, label }) => (
                <li key={href}><a className={styles.infoLink} href={href}>{label}</a></li>
              ))}
            </ul>
          </nav>

          <div className={`${styles.column} ${styles.contact}`}>
            <h2 className={styles.label}>Contact</h2>
            <a className={`btn btn-primary ${styles.cta}`} href="#contact">{contact.form.title}</a>
            <span className={styles.infoLink}>{contact.email}</span>
            {/* Facebook and Instagram only: no Upwork (Jasper, 2026-11-22). Unlinked until URLs exist. */}
            <ul className={styles.social} role="list" aria-label="Follow Webleta">
              {hero.social.filter((s) => s.platform === "facebook" || s.platform === "instagram").map((s) => (
                <li key={s.platform}>
                  {s.href ? (
                    <a className={styles.socialItem} href={s.href} rel="noopener" target="_blank" aria-label={s.label}>
                      <SocialIcon platform={s.platform} />
                    </a>
                  ) : (
                    <span className={styles.socialItem} role="img" aria-label={s.label}>
                      <SocialIcon platform={s.platform} />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className={styles.tools} aria-labelledby="footer-tools-title">
          <h2 id="footer-tools-title" className={styles.toolsTitle}>Tools we use</h2>
          <div className={styles.marquee} data-footer-tools-track>
            {footer.tools.map((row, i) => (
              <div key={i} className={styles.track} data-reverse={i % 2 || undefined}>
                {/* Four copies: each half of the -50% loop is two rows (~2800px), wider than the
                    1920px container, so neither direction ever shows a gap. */}
                {[0, 1, 2, 3].map((n) => <ToolRow key={n} tools={row} copy={n > 0} />)}
              </div>
            ))}
          </div>
        </section>

        <div className={styles.bottom}>
          <p>© {YEAR} {site.name}</p>
          <ul className={styles.legal} role="list" aria-label="Legal">
            {footer.legal.map(({ href, label }) => (
              <li key={href}><a className={styles.infoLink} href={href}>{label}</a></li>
            ))}
          </ul>
          <a href="#top" className={styles.toTop}>
            {footer.top}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 13V3.5M4 7.5l4-4 4 4" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
