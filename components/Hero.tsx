import { hero } from "@/content/homepage";
import HeroMotion from "./HeroMotion";
import HeroGradient from "./HeroGradient";
import SocialIcon from "./SocialIcon";
import Eyebrow from "./Eyebrow";
import StatsRail from "./StatsRail";
import { Track } from "./HeroSlider";
import { DESCENDING } from "./heroSliderLayouts";
import slider from "./HeroSlider.module.css";
import HeroRotator from "./HeroRotator";
import ServiceSwitch from "./ServiceSwitch";
import styles from "./Hero.module.css";

/**
 * The homepage hero. `visual` and `id` are for /hero-options (Revision 90), which shows the same
 * hero with a different right-hand visual; the homepage uses the defaults.
 */
export default function Hero({ visual, id = "top" }: { visual?: React.ReactNode; id?: string } = {}) {
  const { headline } = hero;
  const titleId = id === "top" ? "hero-title" : `${id}-title`;

  return (
    <HeroMotion className={styles.hero} labelledBy={titleId} id={id}>
      <HeroGradient />

      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <div data-intro="fade">
            <Eyebrow className={styles.eyebrow}>{hero.eyebrow}</Eyebrow>
          </div>
          <h1 id={titleId} className={styles.title}>
            <span className="sr-only">{headline.spoken}</span>
            <span aria-hidden="true">
              <span className={styles.line} data-intro="line">
                {headline.first}
              </span>
              <HeroRotator second={headline.second} phrases={headline.rotating} />
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

        {/* Revision 90: the chosen "Descending" slider (three hero cards in a smooth loop).
            The options page passes its own `visual`. The whole slider fades in with the intro. */}
        <div className={styles.visual}>
          <div data-intro="card">
            {visual ?? (
              <Track
                cards={hero.cards.map((c) => ({
                  src: c.image.src,
                  label: c.label,
                  alt: c.image.alt,
                  video: c.video,
                }))}
                slots={DESCENDING.slots}
                leave={DESCENDING.leave}
                enter={DESCENDING.enter}
                stage={slider.square}
                every={6000}
                name="Webleta at work: website design, marketing and conversion"
              />
            )}
          </div>
        </div>
      </div>

      <StatsRail />
    </HeroMotion>
  );
}
