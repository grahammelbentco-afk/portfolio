"use client";

import { useState } from "react";
import { steps } from "@/content/homepage";
import styles from "./Steps.module.css";

/**
 * Steps (Revision 48). Two columns on desktop:
 *   [ heading, intro          ][ browser frame: compare slider          ]
 *   [ 1 ─ Free preview        ][   template site  |  the preview         ]
 *   [ │                       ][                                         ]
 *   [ 2 ─ Plan the pages      ][  Today        note        Your preview  ]
 *   [ 3 ─ Build and launch    ]
 *   [ Get my free preview     ]
 * The steps are a real sequence, so they are numbered on a connecting line. The preview's
 * text sits on its right, so the handle never cuts through it. The slider is a native range
 * input (keyboard, touch, screen readers). Bloom & Fern is a fictional example.
 */
export default function Steps() {
  const [split, setSplit] = useState(42);
  const c = steps.compare;

  return (
    <section id="steps" className={styles.section} data-ground="light" data-steps aria-labelledby="steps-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <h2 id="steps-title" className="sec-title">
            <span className="outline-type">{steps.title.outline}</span> {steps.title.rest}
          </h2>
          <p className="sec-intro">{steps.intro}</p>
          <ol className={styles.list}>
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
          <a href={steps.action.href} className={`btn btn-lg btn-primary ${styles.action}`}>
            {steps.action.label}
          </a>
        </div>

        <figure className={styles.compare} style={{ "--split": `${split}%` } as React.CSSProperties}>
          <div className={styles.chrome} aria-hidden="true">
            <span className={styles.dots}>
              <i />
              <i />
              <i />
            </span>
            <span className={styles.url}>{c.url}</span>
          </div>

          <div className={styles.stage} aria-hidden="true">
            {/* Before: the template look most local sites share. */}
            <div className={`${styles.site} ${styles.before}`}>
              <div className={styles.bNav}>
                <span className={styles.bLogo}>{c.business.toUpperCase()} FLORIST</span>
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

            {/* After: the preview, revealed to the right of the handle. */}
            <div className={`${styles.site} ${styles.after}`}>
              <img
                src={`${c.image.base}-1000.webp`}
                srcSet={`${c.image.base}-1000.webp 1000w, ${c.image.base}-1600.webp 1600w`}
                sizes="(min-width: 1024px) 56vw, 100vw"
                alt=""
                width={c.image.width}
                height={c.image.height}
                loading="lazy"
                decoding="async"
              />
              <div className={styles.aNav}>
                <span className={styles.aLogo}>{c.business}</span>
                <span className={styles.aLinks}>
                  {c.nav.map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </span>
              </div>
              <div className={styles.aHero}>
                <span className={styles.aTitle}>{c.headline}</span>
                <span className={styles.aSub}>{c.sub}</span>
                <span className={styles.aBtn}>{c.cta}</span>
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
            aria-label={c.label}
            aria-valuetext={`${split}% today, ${100 - split}% preview`}
            data-steps-range
          />

          <figcaption className={styles.caption}>
            <span className={styles.tagBefore}>{c.before}</span>
            <span className={styles.note}>{c.note}</span>
            <span className={styles.tagAfter}>{c.after}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
