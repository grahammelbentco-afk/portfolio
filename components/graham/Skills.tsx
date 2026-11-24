import type { CSSProperties } from "react";
import { skills, type Skill } from "@/content/graham/homepage";
import Eyebrow from "./Eyebrow";
import styles from "./Skills.module.css";

/** One tool as an app-icon tile with its real logo, the name under it. */
function Tool({ s }: { s: Skill }) {
  const tile = (
    <span
      className={styles.tile}
      data-kind={s.image ? "image" : s.si ? "glyph" : "more"}
      style={{ "--bg": s.bg, "--fg": s.fg ?? "#fff", "--logo": s.si ? `url(/brands/si/${s.si}.svg)` : undefined, "--size": s.size ?? 0.52 } as CSSProperties}
      aria-hidden="true"
    >
      {s.image ? <img src={s.image} alt="" width={128} height={128} loading="lazy" decoding="async" /> : s.si ? (
        <i />
      ) : (
        <svg viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" />
        </svg>
      )}
    </span>
  );
  const body = (
    <>
      {tile}
      <span className={styles.name}>{s.name}</span>
    </>
  );
  return s.href ? (
    <a className={styles.tool} href={s.href} target="_blank" rel="noopener">
      {body}
      <span className="sr-only"> profile (opens in a new tab)</span>
    </a>
  ) : (
    <span className={styles.tool}>{body}</span>
  );
}

/**
 * Skills & Tools: Graham's toolbox as app icons, the way the tools sit in his dock. An index
 * of rows, one per category (label left, tiles right); brand colour lives only in the tiles.
 */
export default function Skills() {
  return (
    <section id="tools" className={styles.section} data-ground="dark" aria-labelledby="tools-title">
      <div className={`container ${styles.head}`}>
        <Eyebrow>{skills.eyebrow}</Eyebrow>
        <h2 id="tools-title" className="sec-title">
          {skills.title}
        </h2>
        <p className="sec-intro">{skills.intro}</p>
      </div>

      <div className="container">
        <ul className={styles.rows}>
          {skills.groups.map((g) => (
            <li key={g.title} className={styles.row}>
              <h3 className={styles.rowTitle}>{g.title}</h3>
              <ul className={styles.tools}>
                {g.items.map((s) => (
                  <li key={s.name}>
                    <Tool s={s} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
