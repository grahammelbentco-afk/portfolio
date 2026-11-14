import { hero } from "@/content/homepage";
import HeroMotion from "./HeroMotion";
import HeroGradient from "./HeroGradient";
import SocialIcon from "./SocialIcon";
import StatsRail from "./StatsRail";
import HeroDecor from "./HeroDecor";
import ServiceSwitch from "./ServiceSwitch";
import styles from "./Hero.module.css";

export default function Hero() {
  const { headline } = hero;
  const [before, after] = headline.first.split(headline.highlight);
  const rest = headline.second.slice(headline.outline.length);

  return (
    <HeroMotion className={styles.hero} labelledBy="hero-title">
      <HeroGradient />

      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.line} data-intro="line">
              {before}
              <span className={`${styles.highlight} text-gradient`}>{headline.highlight}</span>
              {after}
            </span>{" "}
            <span className={styles.line} data-intro="line">
              <span className={styles.outline}>{headline.outline}</span>
              {rest}
            </span>
          </h1>

          <p className={styles.lede} data-intro="fade">
            {hero.lede}
          </p>

          <div data-intro="fade">
            <ServiceSwitch audiences={hero.audiences} secondary={hero.secondaryCta} />
          </div>

          <div className={styles.meta} data-intro="fade">
            <ul className={styles.social} aria-label="Webleta on social media">
              {hero.social.map((s) => (
                <li key={s.platform}>
                  {s.href ? (
                    <a className={styles.socialItem} href={s.href} rel="noopener" target="_blank" aria-label={s.label}>
                      <SocialIcon platform={s.platform} />
                    </a>
                  ) : (
                    <span className={styles.socialItem} role="img" aria-label={s.label}>
                      <SocialIcon platform={s.platform} />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Graham's three cards, staggered: Design, Market (offset right), Conversion. */}
        <div className={styles.visual}>
          <HeroDecor />
          <ul className={styles.cards}>
            {hero.cards.map((card, i) => (
              <li key={card.label} className={styles.card} data-card={i}>
                <figure className={styles.cardInner} data-intro="card">
                  <img
                    src={card.image.src}
                    srcSet={card.image.srcSet}
                    sizes="(min-width: 960px) 28vw, 62vw"
                    width={card.image.width}
                    height={card.image.height}
                    alt={card.image.alt}
                    decoding="async"
                    fetchPriority={i === 0 ? "high" : undefined}
                  />
                  <figcaption className={styles.label}>{card.label}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <StatsRail />
    </HeroMotion>
  );
}
