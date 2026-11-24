import { Fragment } from "react";
import { about, linkProps } from "@/content/graham/homepage";
import CountUp from "./CountUp";
import Eyebrow from "./Eyebrow";
import styles from "./About.module.css";

/**
 * About, quiet and editorial (after LPAS): the statement on the left in the site's title type,
 * beside three homepages in angled browser windows (after the Facebook cover). Its letters
 * fill from Cloud to Deep Water as it scrolls through (one CSS view timeline on the h2, each
 * letter offset by its place in the sentence); then a two-column body, the small label left
 * and the paragraph with its action right; then the figures on the same label/content grid,
 * counting up once. Words stay unbreakable so a line never splits mid-word.
 */
export default function About() {
  const words = about.statement.split(/\s+/);
  const total = about.statement.replace(/\s/g, "").length;
  // Word range of the highlighted phrase, and where it starts and ends in the sentence (0 to 1).
  const markWords = about.mark.split(" ");
  const m0 = words.findIndex((_, i) => words.slice(i, i + markWords.length).join(" ").replace(/[.,]$/, "") === about.mark);
  const before = words.slice(0, m0).join("").length;
  const markLen = markWords.join("").length;
  const markStyle = { "--ps": (before / total).toFixed(4), "--pe": ((before + markLen - 1) / total).toFixed(4) } as React.CSSProperties;
  const letters = (word: string) =>
    [...word].map((ch, k) => (
      <span key={k} className={styles.letter} style={{ "--p": (n++ / total).toFixed(4) } as React.CSSProperties}>
        {ch}
      </span>
    ));
  let n = 0; // running letter index across the whole sentence

  return (
    <section id="about" className={styles.section} data-ground="light" data-about aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
        <Eyebrow>{about.eyebrow}</Eyebrow>
        <h2 id="about-title" className={styles.statement} data-about-statement>
          <span className="sr-only">{about.statement}</span>
          <span aria-hidden="true">
            {words.slice(0, m0).map((word, j) => (
              <Fragment key={j}>
                {j > 0 && " "}
                <span className={styles.word}>{letters(word)}</span>
              </Fragment>
            ))}{" "}
            <span className={styles.mark} style={markStyle}>
              {markWords.map((word, j) => (
                <Fragment key={j}>
                  {j > 0 && " "}
                  <span className={styles.word}>{letters(word)}</span>
                </Fragment>
              ))}
            </span>
            {letters(
              words
                .slice(m0 + markWords.length - 1)
                .map((w, j) => (j === 0 ? w.slice(markWords[markWords.length - 1].length) : " " + w))
                .join(""),
            )}
          </span>
        </h2>
        </div>

        <div className={styles.fan}>
          <div className={styles.fanPlane}>
            {about.windows.map((win, i) => (
              <figure key={win.src} className={styles.window} data-i={i}>
                <span className={styles.chrome} aria-hidden="true">
                  <i />
                </span>
                <img src={win.src} width={win.w} height={win.h} alt={win.alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </div>

        <p className={styles.label}>{about.label}</p>
        <div className={styles.story}>
          <p className={styles.storyText}>{about.story.text}</p>
          <a className={styles.link} href={about.link.href} {...linkProps(about.link.href)}>
            <span className={styles.linkText}>{about.link.label}</span>
            <span className={styles.linkIcon} aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M5 11l6-6M6 5h5v5" />
              </svg>
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <div className={styles.ledger}>
          {about.ledger.map((group) => (
            <section key={group.title} className={styles.group} aria-label={group.title}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <dl className={styles.figures}>
                {group.stats.map((s) => (
                  <div key={s.label} className={styles.figureItem}>
                    <dt>{s.label}</dt>
                    <dd>
                      <span className="sr-only">{s.value}</span>
                      <CountUp value={s.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
