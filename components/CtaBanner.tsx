import { ctaBanner } from "@/content/homepage";
import Eyebrow from "./Eyebrow";
import styles from "./CtaBanner.module.css";

const NAMES: Record<string, string> = {
  wordpress: "WordPress",
  nextdotjs: "Next.js",
  astro: "Astro",
  react: "React",
  google: "Google",
};

/**
 * CTA banner (Revision 43): Graham's centred CTA references in our brand. A Deep Water panel
 * over the corner-shop photo (dimmed, full bleed), everything centred: an eyebrow pill, the
 * hero's headline device (gradient phrase, outline word), one line of text, Ember primary
 * and glass secondary, then a row of the platforms we build on. The panel keeps the
 * Services tiles' 24° corner cut.
 */
export default function CtaBanner() {
  const { title, image } = ctaBanner;
  const [before] = title.first.split(title.highlight);
  return (
    <section id="cta" className={styles.section} data-ground="dark" data-cta aria-labelledby="cta-title">
      <div className="container">
        <div className={styles.panel}>
          <img
            className={styles.photo}
            src={`${image.base}-1200.webp`}
            srcSet={`${image.base}-1200.webp 1200w, ${image.base}-2000.webp 2000w`}
            sizes="100vw"
            width={image.width}
            height={image.height}
            alt={image.alt}
            loading="lazy"
            decoding="async"
          />
          <svg className={styles.corner} viewBox="0 0 100 224.6" aria-hidden="true" focusable="false">
            <polygon points="0,0 100,0 100,224.6" />
          </svg>
          <div className={styles.content}>
            <Eyebrow className={styles.eyebrow}>{ctaBanner.eyebrow}</Eyebrow>
            <h2 id="cta-title" className={styles.title}>
              <span className={styles.line}>
                {before}
                <span className="text-gradient">{title.highlight}</span>
              </span>{" "}
              <span className={styles.line}>
                <span className="outline-type">{title.outline}</span> {title.rest}
              </span>
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
            <ul className={styles.stack} aria-label="Platforms we build on">
              {ctaBanner.stack.map((id) => (
                <li key={id}>
                  <span className={styles.stackMark} style={{ "--src": `url(/brands/si/${id}.svg)` } as React.CSSProperties} aria-hidden="true" />
                  {NAMES[id]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
