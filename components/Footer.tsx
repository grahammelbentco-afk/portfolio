import Image from "next/image";
import { contact, footer, site } from "@/content/homepage";
import styles from "./Footer.module.css";

const YEAR = 2026;

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
            <ul role="list">
              {footer.links.map(({ href, label }) => (
                <li key={href}><a className={styles.infoLink} href={href}>{label}</a></li>
              ))}
            </ul>
          </nav>

          <div className={`${styles.column} ${styles.contact}`}>
            <h2 className={styles.label}>Contact</h2>
            <a className={styles.infoLink} href="#contact">{contact.form.title}</a>
          </div>
        </div>

        <section className={styles.tools} aria-labelledby="footer-tools-title">
          <h2 id="footer-tools-title" className={styles.toolsTitle}>Tools we use</h2>
          <div className={styles.viewport} role="group" aria-label="Tool logos" tabIndex={0} data-footer-tools-track>
            <ul className={styles.logoSet} role="list">
              {footer.tools.map(([name, slug]) => (
                <li key={slug}>
                  <Image src={`/brands/si/${slug}.svg`} alt="" width={26} height={26} />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className={styles.bottom}>
          <p>© {YEAR} {site.name}</p>
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
