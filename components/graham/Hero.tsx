import { hero } from "@/content/graham/homepage";
import HeroMotion from "./HeroMotion";
import StatsRail from "./StatsRail";
import Spark from "./Spark";
import styles from "./Hero.module.css";

/** A stat hung off a headline word like a margin note: the brand spark, the figure in the
 *  display face, the label under it. No box. */
function Note({ i }: { i: number }) {
  const s = hero.stats[i];
  return (
    <span className={styles.note} data-intro="fade">
      <Spark className={styles.noteSpark} />
      <b>{s.value}</b>
      <span>{s.label}</span>
    </span>
  );
}

/**
 * The homepage hero, editorial (after Marcus Lorenzet's portfolio): Graham's cut-out portrait
 * behind a three-line uppercase headline whose lines step left, right and centre, the old
 * hero's two results as notes, and a short lede. The three credential points follow in the
 * StatsRail band.
 * `visual` and `id` are for /hero-options, which swaps the portrait for another visual.
 */
export default function Hero({ visual, id = "top" }: { visual?: React.ReactNode; id?: string } = {}) {
  const [first, second, third, fourth] = hero.headline.lines;
  const titleId = id === "top" ? "hero-title" : `${id}-title`;

  return (
    <HeroMotion className={styles.hero} labelledBy={titleId} id={id}>
      <div className={styles.stage}>
        <div className={styles.portrait} data-intro="decor">
          {visual ?? (
            <img
              data-card
              src={`${hero.portrait.base}-1920.webp`}
              srcSet={`${hero.portrait.base}-1280.webp 1280w, ${hero.portrait.base}-1920.webp 1920w, ${hero.portrait.base}-2350.webp 2350w`}
              sizes="(max-width: 959px) 260vw, 100vw"
              width={hero.portrait.width}
              height={hero.portrait.height}
              alt={hero.portrait.alt}
              fetchPriority="high"
              decoding="async"
            />
          )}
        </div>

        <div className={`container ${styles.layout}`}>
          <div className={styles.titleWrap}>
          <h1 id={titleId} className={styles.title}>
            <span className="sr-only">{hero.headline.spoken}</span>
            <span aria-hidden="true" className={styles.lines}>
              <span className={`${styles.line} ${styles.lineA}`} data-intro="line">
                {first}
                <Note i={0} />
              </span>
              <span className={`${styles.line} ${styles.lineB}`} data-intro="line">
                {second}
              </span>
              <span className={`${styles.line} ${styles.lineC}`} data-intro="line">
                {third}
              </span>
              <span className={`${styles.line} ${styles.lineD}`} data-intro="line">
                {fourth}
                <Note i={1} />
                <a className={styles.arrow} href={hero.scroll.href} tabIndex={-1}>
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3v17M5 13l7 7 7-7" />
                  </svg>
                </a>
              </span>
            </span>
          </h1>

          {/* Under "DIGITAL", in the open wall left of Graham. */}
          <p className={styles.lede} data-intro="fade">
            {hero.lede}
          </p>
          </div>
        </div>
      </div>

      <StatsRail />
    </HeroMotion>
  );
}
