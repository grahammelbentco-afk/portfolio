import { Fragment } from "react";
import { about } from "@/content/homepage";
import styles from "./About.module.css";

/**
 * Split each phrase of the statement into words, and each word into letters. Revision 88:
 * the letters fill from Cloud to Deep Water one after another as the statement scrolls
 * through (one CSS view timeline on the h2, each letter offset by its place in the
 * sentence; see About.module.css). `mark` phrases also get the Seafoam marker. Words stay
 * unbreakable so a line never splits mid-word.
 */
function statementParts(text: string, marks: string[]) {
  const pattern = new RegExp(`(${marks.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`);
  return text
    .split(pattern)
    .filter(Boolean)
    .map((chunk) => ({ marked: marks.includes(chunk), words: chunk.trim().split(/\s+/), lead: chunk.startsWith(" "), trail: chunk.endsWith(" ") }));
}

/** The Split Arc symbol's two halves (Logo Kit V2), same geometry as the logo files. */
const ARC_BIG = "M183.13 54.35A92 92 0 1 0 110.15 218.25Z";
const ARC_SPARK = "M194.14 64.05L124.73 219.94A92 92 0 0 0 194.14 64.05Z";

export default function About() {
  const parts = statementParts(about.statement, about.mark);
  const total = about.statement.replace(/\s/g, "").length;
  let n = 0; // running letter index across the whole sentence

  return (
    <section id="about" className={styles.section} data-ground="light" data-about aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <p className={styles.eyebrow}>
          <svg className={styles.eyebrowSpark} viewBox="134 34 102 164" aria-hidden="true">
            <path d={ARC_SPARK} transform="translate(12 -26)" />
          </svg>
          {about.eyebrow}
        </p>

        <h2 id="about-title" className={styles.statement} data-about-statement>
          {/* Screen readers get the sentence once; the letter spans are visual only. */}
          <span className="sr-only">{about.statement}</span>
          <span aria-hidden="true">
          {parts.map((part, i) => (
            <Fragment key={i}>
              {part.lead && " "}
              <span className={part.marked ? styles.mark : undefined}>
                {part.words.map((word, j) => (
                  <Fragment key={j}>
                    {j > 0 && " "}
                    <span className={styles.word}>
                      {[...word].map((ch, k) => (
                        <span key={k} className={styles.letter} style={{ "--p": (n++ / total).toFixed(4) } as React.CSSProperties} data-about-letter>
                          {ch}
                        </span>
                      ))}
                    </span>
                  </Fragment>
                ))}
              </span>
              {part.trail && " "}
            </Fragment>
          ))}
          </span>
        </h2>

        {/* V1.6 p.16 "arc crop": the photo clipped to the symbol's larger half, spark beside it. */}
        <figure className={styles.figure} data-about-figure>
          <svg className={styles.arc} viewBox="25.24 35.74 209.02 193.02" role="img" aria-label={about.image.alt}>
            <defs>
              <clipPath id="about-arc-crop">
                <path d={ARC_BIG} transform="translate(-8 8)" />
              </clipPath>
            </defs>
            <g clipPath="url(#about-arc-crop)">
              {/* Revision 88: placed for the two-person photo (4:5) so both faces sit inside the
                  arc, left of the diagonal cut. Re-check these numbers if the photo changes. */}
              <image
                className={styles.photo}
                href={about.image.src}
                x="-14"
                y="6"
                width="194"
                height="241"
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
            <g transform="translate(12 -26)">
              <path className={styles.spark} d={ARC_SPARK} data-about-spark />
            </g>
          </svg>
          <figcaption className={styles.caption}>{about.caption}</figcaption>
        </figure>

        <div className={styles.story}>
          <p className={styles.storyTitle}>{about.story.title}</p>
          <p className={styles.storyText}>{about.story.text}</p>

          <ul className={styles.audiences}>
            {about.audiences.map((a) => (
              <li key={a.title} className={styles.audience} data-lead={a.lead ? "true" : undefined}>
                <svg className={styles.marker} viewBox="134 34 102 164" aria-hidden="true">
                  <path d={ARC_SPARK} transform="translate(12 -26)" />
                </svg>
                <p className={styles.audienceTitle}>{a.title}</p>
                <p className={styles.audienceText}>{a.text}</p>
              </li>
            ))}
          </ul>

          <dl className={styles.facts}>
            {about.facts.map((f) => (
              <div key={f.label} className={styles.fact}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          <a className={styles.link} href={about.link.href}>
            {about.link.label}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Revision 88: plain text links to our own sites, deliberately low-key. */}
          <ul className={styles.people}>
            {about.people
              .filter((p) => p.href)
              .map((p) => (
                <li key={p.label}>
                  <a href={p.href ?? undefined} target="_blank" rel="noopener">
                    {p.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
