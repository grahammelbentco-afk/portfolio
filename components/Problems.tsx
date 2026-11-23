import { linkProps, problems } from "@/content/homepage";
import Eyebrow from "./Eyebrow";
import styles from "./Problems.module.css";

/**
 * Problems we solve (2026-11-23). Pain point on the left, Webleta's fix on the right, and the
 * service it belongs to as a small tag, so each service reads as the answer to a problem.
 * A real list (not a table) so it reflows to stacked cards on phones.
 */
export default function Problems() {
  return (
    <section id="problems" className={styles.section} data-ground="dark" data-problems aria-labelledby="problems-title">
      <div className={`container ${styles.head}`}>
        <div>
          <Eyebrow>{problems.eyebrow}</Eyebrow>
          <h2 id="problems-title" className="sec-title">
            {problems.title.solid} <span className="outline-type">{problems.title.outline}</span>
          </h2>
        </div>
        <p className="sec-intro">{problems.intro}</p>
      </div>

      <div className="container">
        <div className={styles.labels} aria-hidden="true">
          <span>{problems.painLabel}</span>
          <span>{problems.fixLabel}</span>
        </div>
        <ul className={styles.list}>
          {problems.items.map((p) => (
            <li key={p.id} className={styles.row}>
              <p className={styles.pain}>
                <span className="sr-only">{problems.painLabel}: </span>
                {p.pain}
              </p>
              <span className={styles.arrow} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className={styles.fix}>
                <h3 className={styles.fixTitle}>{p.fix}</h3>
                <p className={styles.fixText}>{p.text}</p>
              </div>
              <span className={styles.service}>{p.service}</span>
            </li>
          ))}
        </ul>

        <p className={styles.more}>
          {problems.cta.lead} <a href={problems.cta.href} {...linkProps(problems.cta.href)}>{problems.cta.label}</a>
        </p>
      </div>
    </section>
  );
}
