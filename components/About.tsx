import { Fragment } from "react";
import { about } from "@/content/homepage";
import styles from "./About.module.css";

/**
 * Split each phrase of the statement into words. Words fill from Cloud to Deep Water as
 * the section scrolls through (CSS scroll timeline, see About.module.css); `mark` phrases
 * also get the Seafoam marker.
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
          {parts.map((part, i) => (
            <Fragment key={i}>
              {part.lead && " "}
              <span className={part.marked ? styles.mark : undefined}>
                {part.words.map((word, j) => (
                  <Fragment key={j}>
                    {j > 0 && " "}
                    <span className={styles.word} data-about-word>
                      {word}
                    </span>
                  </Fragment>
                ))}
              </span>
              {part.trail && " "}
            </Fragment>
          ))}
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
              <image
                className={styles.photo}
                href={about.image.src}
                x="20"
                y="40"
                width="170"
                height="194"
                preserveAspectRatio="xMaxYMid slice"
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
        </div>
      </div>
    </section>
  );
}
