import { reviews, type Review } from "@/content/homepage";
import Eyebrow from "./Eyebrow";
import Spark from "./Spark";
import styles from "./Reviews.module.css";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

function Byline({ r, className }: { r: Review; className?: string }) {
  return (
    <figcaption className={`${styles.byline} ${className ?? ""}`}>
      <span className={styles.avatar} aria-hidden="true">
        {initials(r.name)}
      </span>
      <span>
        <span className={styles.who}>{r.name}</span>
        <span className={styles.where}>
          {r.business}, {r.place}
        </span>
      </span>
    </figcaption>
  );
}

/**
 * Reviews (Graham: "text based atm - but reserve space for portrait vid").
 *   [ portrait 9:16 card: featured quote ][ heading + intro              ]
 *   [  (a video drops in here later)     ][ review ][ review ][ review   ]
 * The portrait card keeps the 9:16 shape, so a portrait video can replace its contents
 * without changing the layout.
 */
export default function Reviews() {
  const f = reviews.featured;
  return (
    <section id="reviews" className={styles.section} data-ground="light" data-reviews aria-labelledby="reviews-title">
      <div className={`container ${styles.layout}`}>
        <figure className={styles.portrait} data-review-portrait>
          <svg className={styles.ripples} viewBox="0 0 600 600" aria-hidden="true" focusable="false">
            {[90, 150, 210, 270, 330, 390].map((r) => (
              <circle key={r} cx="600" cy="0" r={r} />
            ))}
          </svg>
          <Spark className={styles.portraitSpark} />
          <blockquote className={styles.featured}>
            <p>{f.quote}</p>
          </blockquote>
          <Byline r={f} className={styles.portraitByline} />
        </figure>

        <div className={styles.side}>
          <div className={styles.head}>
            <Eyebrow>{reviews.eyebrow}</Eyebrow>
            <h2 id="reviews-title" className="sec-title">
              {reviews.title}
            </h2>
            <p className="sec-intro">{reviews.intro}</p>
          </div>
          <ul className={styles.list}>
            {reviews.items.map((r) => (
              <li key={r.name}>
                <figure className={styles.review}>
                  <blockquote>
                    <p>{r.quote}</p>
                  </blockquote>
                  <Byline r={r} />
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
