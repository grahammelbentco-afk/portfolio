import { work, type Project } from "@/content/homepage";
import styles from "./Work.module.css";

/**
 * Work (Graham: "Portfolio - freedom of display"). Four concept sites, each drawn as a live
 * homepage in its own palette and typeface inside a browser frame, so the section proves the
 * brand's promise ("look nothing alike") instead of describing it. Layout alternates
 * wide and tall frames:
 *   [ Red Gum (wide, 7) ][ Peel & Press (tall, 5) ]
 *   [ Saltwater (tall, 5) ][ Harlow (wide, 7)     ]
 * Concept projects, labelled as such (see content/homepage.ts).
 */
function MockSite({ p }: { p: Project }) {
  return (
    <div
      className={styles.site}
      data-type={p.type}
      style={{ "--g": p.palette.ground, "--i": p.palette.ink, "--a": p.palette.accent } as React.CSSProperties}
      aria-hidden="true"
    >
      <img
        className={styles.photo}
        src={`${p.image.base}-720.webp`}
        srcSet={`${p.image.base}-720.webp 720w, ${p.image.base}-1280.webp 1280w`}
        sizes="(min-width: 960px) 55vw, 100vw"
        width={720}
        height={480}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <div className={styles.siteNav}>
        <span className={styles.siteLogo}>{p.name}</span>
        <span className={styles.siteLinks}>
          {p.nav.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </span>
      </div>
      <div className={styles.siteHero}>
        <span className={styles.siteTitle}>{p.headline}</span>
        <span className={styles.siteBtn}>{p.cta}</span>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className={styles.section} data-ground="dark" data-work aria-labelledby="work-title">
      <div className={`container ${styles.head}`}>
        <h2 id="work-title" className="sec-title">
          {work.title}
        </h2>
        <p className="sec-intro">{work.intro}</p>
      </div>

      <ul className={`container ${styles.grid}`}>
        {work.items.map((p) => (
          <li key={p.id} className={styles.item} data-layout={p.layout} data-project={p.id}>
            <figure className={styles.frame}>
              <div className={styles.chrome} aria-hidden="true">
                <span className={styles.dots}>
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.url}>{p.url}</span>
              </div>
              <MockSite p={p} />
              <figcaption className="sr-only">{p.image.alt}</figcaption>
            </figure>
            <div className={styles.meta}>
              <div>
                <h3 className={styles.name}>{p.name}</h3>
                <p className={styles.sector}>
                  <span className={styles.concept}>Concept</span>
                  {p.sector}
                </p>
              </div>
              <ul className={styles.swatches} aria-label={`${p.name} palette`}>
                {p.palette.swatches.map((c) => (
                  <li key={c} style={{ background: c }} title={c} />
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
