"use client";

import { useState } from "react";
import { steps } from "@/content/homepage";
import styles from "./Steps.module.css";

/**
 * Steps (Graham's outline: "Steps / OPTIONAL"; reference "See it before we build it").
 * Three real steps in order (so they are numbered), and a compare slider: a generic template
 * site on the left, the preview on the right. The slider is a native range input, so it
 * works with keyboard, touch and screen readers. The sites are illustrations built in code.
 */
export default function Steps() {
  const [split, setSplit] = useState(32);
  const { compare } = steps;

  return (
    <section id="steps" className={styles.section} data-ground="light" data-steps aria-labelledby="steps-title">
      <div className={`container ${styles.head}`}>
        <h2 id="steps-title" className="sec-title">
          <span className="outline-type">{steps.title.outline}</span> {steps.title.rest}
        </h2>
        <p className="sec-intro">{steps.intro}</p>
      </div>

      <ol className={`container ${styles.list}`}>
        {steps.items.map((s, i) => (
          <li key={s.title} className={styles.step}>
            <span className={styles.num} aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepText}>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className={`container ${styles.compareWrap}`}>
        <figure className={styles.compare} style={{ "--split": `${split}%` } as React.CSSProperties}>
          <div className={styles.chrome} aria-hidden="true">
            <span className={styles.dots}>
              <i />
              <i />
              <i />
            </span>
            <span className={styles.url}>{compare.url}</span>
          </div>

          <div className={styles.stage} aria-hidden="true">
            {/* Before: the template look most local sites share. */}
            <div className={`${styles.site} ${styles.before}`}>
              <div className={styles.bNav}>
                <span className={styles.bLogo}>HARLOW JOINERY</span>
                <span className={styles.bLinks}>
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <div className={styles.bHero}>
                <span className={styles.bTitle}>Welcome to Our Website</span>
                <span className={styles.bLine} />
                <span className={styles.bLine} data-short />
                <span className={styles.bBtn}>Read More</span>
              </div>
              <div className={styles.bCols}>
                <span />
                <span />
                <span />
              </div>
            </div>

            {/* After: the preview, clipped to the right of the handle. */}
            <div className={`${styles.site} ${styles.after}`}>
              <img src="/images/work-joinery-720.webp" alt="" width={720} height={894} loading="lazy" decoding="async" />
              <div className={styles.aNav}>
                <span className={styles.aLogo}>Harlow</span>
                <span className={styles.aLinks}>Kitchens&nbsp;&nbsp;Furniture&nbsp;&nbsp;About</span>
                <span className={styles.aBtn}>Request a quote</span>
              </div>
              <div className={styles.aHero}>
                <span className={styles.aTitle}>
                  Made to measure.
                  <br />
                  Made to last.
                </span>
                <span className={styles.aSub}>Kitchens and furniture, built by hand in Fremantle.</span>
              </div>
            </div>

            <span className={styles.handle}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <input
            className={styles.range}
            type="range"
            min={0}
            max={100}
            value={split}
            onChange={(e) => setSplit(Number(e.target.value))}
            aria-label={compare.label}
            aria-valuetext={`${split}% ${compare.before.toLowerCase()}, ${100 - split}% preview`}
            data-steps-range
          />

          <figcaption className={styles.caption}>
            <span className={styles.tagBefore}>{compare.before}</span>
            <span className={styles.note}>{compare.note}</span>
            <span className={styles.tagAfter}>{compare.after}</span>
          </figcaption>
        </figure>

        <a href={steps.action.href} className={`btn btn-lg btn-primary ${styles.action}`}>
          {steps.action.label}
        </a>
      </div>
    </section>
  );
}
