import { services, type DeviceStage, type PlatformLogo, type ServiceTile } from "@/content/homepage";
import Eyebrow from "./Eyebrow";
import ServiceIcon from "./ServiceIcon";
import { BookingApp, Dashboard, Mark } from "./ServiceScreens";
import styles from "./Services.module.css";

/**
 * Services (Revision 40): Graham's colour-blocked bento reference, made ours.
 *
 *   Core services lead (Notion: web design/development first, then web apps and SEO):
 *   [ SEO, Ochre (5)          ][ Website design and development (hero, Aqua, 7) ]
 *   [ Web applications (5)    ][   rising enquiries chart, tech logos           ]
 *   [ Email ][ Social ][ Content ][ Mobile ]   supporting services, shorter row
 *   [ Not sure where to start? (full-width Deep Water strip)                   ]
 *
 * Photo tiles show existing photos in duotone (luminosity over the tile colour). Email and
 * Mobile put coded screens on the blank-screen laptop and phone photos.
 */

const SCREENS = { dashboard: Dashboard, app: BookingApp };

function Logos({ logos }: { logos: PlatformLogo[] }) {
  if (!logos.length) return null;
  return (
    <ul className={styles.logos} aria-label={`Works with ${logos.map((l) => l.name).join(", ")}`}>
      {logos.map((l) => (
        <li key={l.name} title={l.name}>
          <Mark src={l.file} colour={l.colour} />
        </li>
      ))}
    </ul>
  );
}

function Stage({ stage, children }: { stage: DeviceStage; children: React.ReactNode }) {
  const s = stage.screen;
  const wide = stage.width > 2500;
  return (
    <div className={styles.box}>
      <div className={styles.stage} style={{ "--r": stage.width / stage.height } as React.CSSProperties}>
        <img
          src={`${stage.base}-${wide ? 900 : 720}.webp`}
          srcSet={wide ? `${stage.base}-900.webp 900w, ${stage.base}-1600.webp 1600w` : `${stage.base}-720.webp 720w, ${stage.base}-1200.webp 1200w`}
          sizes="(min-width: 1024px) 50vw, 100vw"
          width={stage.width}
          height={stage.height}
          alt={stage.alt}
          loading="lazy"
          decoding="async"
        />
        <img className={styles.true} src={`${stage.base}-${wide ? 900 : 720}.webp`} alt="" width={stage.width} height={stage.height} loading="lazy" decoding="async" />
        <div
          className={styles.screen}
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: `${s.width}%`, height: `${s.height}%`, borderRadius: s.radius }}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Revision 98: the hero tile shows what the service makes, a real Webleta site in a browser
 * window (411 Legal Services, also in Benefits), with the enquiries chart on a card in front.
 */
function HeroSite() {
  return (
    <div className={styles.heroSite} aria-hidden="true">
      <div className={styles.win}>
        <span className={styles.winBar}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.winScreen}>
          <img src="/images/benefits/screen-legal.webp" width={878} height={3015} alt="" loading="lazy" decoding="async" />
        </span>
      </div>
      <div className={styles.chartCard}>
        <span className={styles.chartLabel}>Enquiries from the site</span>
        <EnquiryChart />
      </div>
    </div>
  );
}

/** The hero's graphic: enquiries climbing, with an Ember spark at the peak. */
function EnquiryChart() {
  return (
    <svg className={styles.chart} viewBox="0 0 600 420" aria-hidden="true" focusable="false">
      {[80, 160, 240, 320].map((y) => (
        <line key={y} x1="70" x2="580" y1={y} y2={y} className={styles.gridLine} />
      ))}
      <line x1="70" x2="70" y1="20" y2="380" className={styles.axis} />
      <line x1="70" x2="580" y1="380" y2="380" className={styles.axis} />
      <text x="0" y="0" transform="translate(52 380) rotate(-90)" className={styles.axisWord}>
        enquiries
      </text>
      <polyline points="70,350 170,330 250,300 320,260 380,250 450,170 520,110 560,70" className={styles.trend} />
      <circle cx="560" cy="70" r="22" className={styles.peakGlow} />
      <circle cx="560" cy="70" r="9" className={styles.peak} />
    </svg>
  );
}

function Tile({ t }: { t: ServiceTile }) {
  const Screen = t.ui ? SCREENS[t.ui] : null;
  return (
    <li className={styles.tile} data-tilt data-colour={t.colour} data-slot={t.slot} data-service={t.id} data-light-corner={t.lightCorner ? "true" : undefined}>
      {t.slot === "hero" && <HeroSite />}
      {t.photo && (
        <div className={styles.box}>
          <img
            className={styles.photo}
            src={`${t.photo.base}-720.webp`}
            srcSet={`${t.photo.base}-720.webp 720w, ${t.photo.base}-1280.webp 1280w`}
            sizes="(min-width: 1024px) 25vw, 100vw"
            width={720}
            height={720}
            alt={t.photo.alt}
            loading="lazy"
            decoding="async"
            style={t.photo.position ? { objectPosition: t.photo.position } : undefined}
          />
          <img
            className={styles.true}
            src={`${t.photo.base}-720.webp`}
            alt=""
            width={720}
            height={720}
            loading="lazy"
            decoding="async"
            style={t.photo.position ? { objectPosition: t.photo.position } : undefined}
          />
        </div>
      )}
      {t.stage && Screen && (
        <Stage stage={t.stage}>
          <Screen />
        </Stage>
      )}


      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.icon} aria-hidden="true">
            <ServiceIcon kind={t.icon} />
          </span>
          <Logos logos={t.logos} />
        </div>
        <div className={styles.bottom}>
          <h3 className={styles.name}>
            {t.title}
            {t.outline && (
              <>
                {" "}
                <span className="outline-type">{t.outline}</span>
              </>
            )}
          </h3>
          <p className={styles.text}>{t.text}</p>
        </div>
      </div>
    </li>
  );
}

export default function Services() {
  return (
    <section id="services" className={styles.section} data-ground="light" data-services aria-labelledby="services-title">
      <div className={`container ${styles.head}`}>
        <Eyebrow>{services.eyebrow}</Eyebrow>
        <h2 id="services-title" className={`sec-title ${styles.title}`}>
          <span className={styles.mark}>{services.title.mark}</span> {services.title.rest}
        </h2>
        <p className="sec-intro">{services.intro}</p>
      </div>

      <ul className={`container ${styles.bento}`} data-services-bento>
        {services.tiles.map((t) => (
          <Tile key={t.id} t={t} />
        ))}
      </ul>

      <div className="container">
        <p className={styles.more}>
          <span className={styles.moreTitle}>{services.more.title}</span> {services.more.text}{" "}
          <a href={services.more.action.href} className={styles.moreLink}>
            {services.more.action.label}
          </a>
        </p>
      </div>
    </section>
  );
}
