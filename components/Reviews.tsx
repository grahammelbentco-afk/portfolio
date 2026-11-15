"use client";

import { useRef, useState } from "react";
import { reviews } from "@/content/homepage";
import Eyebrow from "./Eyebrow";
import Spark from "./Spark";
import styles from "./Reviews.module.css";

/**
 * Reviews (Revision 73). Real reviews for Graham and Jasper, one at a time:
 *   [ duotone photo, 24° cut corner, Upwork proof chip ][ the quote, large, with its byline ]
 *                                                      [ reviewer picker, two columns       ]
 * The picker is a tablist (arrow keys, Home, End). The quote swaps with a short rise; the
 * motion is a CSS keyframe on a keyed element, off under reduced motion.
 */
export default function Reviews() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const items = reviews.items;
  const r = items[active];

  const go = (i: number) => {
    const n = (i + items.length) % items.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: items.length - 1 };
    if (e.key in keys) {
      e.preventDefault();
      go(keys[e.key]);
    }
  };

  return (
    <section id="reviews" className={styles.section} data-ground="light" data-reviews aria-labelledby="reviews-title">
      <div className={`container ${styles.head}`}>
        <Eyebrow>{reviews.eyebrow}</Eyebrow>
        <h2 id="reviews-title" className="sec-title">
          {reviews.title.solid} <span className="outline-type">{reviews.title.outline}</span>
        </h2>
        <p className="sec-intro">{reviews.intro}</p>
      </div>

      <div className={`container ${styles.layout}`}>
        <figure className={styles.photo}>
          <img
            src={`${reviews.image.base}-720.webp`}
            srcSet={`${reviews.image.base}-720.webp 720w, ${reviews.image.base}-1280.webp 1280w`}
            sizes="(min-width: 960px) 38vw, 92vw"
            width={720}
            height={405}
            alt={reviews.image.alt}
            loading="lazy"
            decoding="async"
          />
          <figcaption className={styles.proof}>
            <strong>{reviews.proof.value}</strong>
            <span>{reviews.proof.label}</span>
          </figcaption>
        </figure>

        <div className={styles.stage}>
          <div
            className={styles.panel}
            role="tabpanel"
            id="review-panel"
            aria-labelledby={`review-tab-${r.id}`}
            tabIndex={0}
          >
            <figure className={styles.current} key={r.id} data-review-current>
              <blockquote className={styles.quote}>
                <p>{r.quote}</p>
              </blockquote>
              <figcaption className={styles.byline}>
                <span className={styles.avatar} aria-hidden="true">
                  {r.initials ?? <Spark className={styles.avatarSpark} />}
                </span>
                <span>
                  <span className={styles.who}>{r.name}</span>
                  <span className={styles.role}>
                    {r.role} <span className={styles.source}>{r.source}</span>
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>

          <div className={styles.picker} role="tablist" aria-label="Choose a review" onKeyDown={onKey}>
            {items.map((it, i) => (
              <button
                key={it.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`review-tab-${it.id}`}
                aria-selected={i === active}
                aria-controls="review-panel"
                tabIndex={i === active ? 0 : -1}
                className={styles.tab}
                onClick={() => setActive(i)}
                data-review-tab
              >
                <span className={styles.tabName}>{it.name}</span>
                <span className={styles.tabRole}>{it.org}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
