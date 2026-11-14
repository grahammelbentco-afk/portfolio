import { ctaBanner } from "@/content/homepage";
import styles from "./CtaBanner.module.css";

/**
 * CTA banner (Graham: "cta banner"; reference "Be the name they say"). Ours: a Deep Water
 * panel lit by the Preview V2 caustics photo (light through water, the Lagoon in Lagoon
 * Ember), with the hero's outline device on one word. The panel is inset from the page edge
 * so it reads as a break between sections, not another section.
 */
export default function CtaBanner() {
  const { title, image } = ctaBanner;
  return (
    <section id="cta" className={styles.section} data-ground="dark" data-cta aria-labelledby="cta-title">
      <div className={`container ${styles.wrap}`}>
        <div className={styles.panel}>
          <img
            className={styles.photo}
            src={`${image.base}-1280.webp`}
            srcSet={`${image.base}-720.webp 720w, ${image.base}-1280.webp 1280w`}
            sizes="100vw"
            width={1280}
            height={714}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <svg className={styles.ripples} viewBox="0 0 600 600" aria-hidden="true" focusable="false">
            {[110, 180, 250, 320, 390].map((r) => (
              <circle key={r} cx="0" cy="600" r={r} />
            ))}
          </svg>
          <div className={styles.content}>
            <h2 id="cta-title" className={styles.title}>
              {title.before} <span className="outline-type">{title.outline}</span>
              {title.after}
            </h2>
            <p className={styles.text}>{ctaBanner.text}</p>
            <div className={styles.actions}>
              <a href={ctaBanner.primary.href} className="btn btn-lg btn-primary">
                {ctaBanner.primary.label}
              </a>
              <a href={ctaBanner.secondary.href} className="btn btn-lg btn-ghost-dark">
                {ctaBanner.secondary.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
