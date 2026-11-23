import { linkProps, services, type DeviceStage, type PlatformLogo, type ServiceTile } from "@/content/homepage";
import Eyebrow from "./Eyebrow";
import ServiceIcon from "./ServiceIcon";
import { BookingApp, Dashboard, Mark } from "./ServiceScreens";
import styles from "./Services.module.css";

/**
 * Services (Revision 40): Graham's colour-blocked bento reference, made ours.
 *
 *   Core services lead (Notion: web design/development first, then web apps and SEO):
 *   [ SEO, Ochre (5)          ][ Website design and development (hero, Aqua, 7) ]
 *   [ Web applications (5)    ][   real build scene, tech logos                 ]
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

/** The hero's scene (R105-R106), a design file in progress: a faint dot canvas and guides
 *  (allowed to run to the edges), a selected headline frame with Graham's cursor, a Dev Mode
 *  code panel with Jasper's, and two real photos from our own shoot. The prominent pieces stay
 *  inside the tile's inner band, clear of the icon row and the copy. */
function BuildArt() {
  return (
    <div className={styles.build} aria-hidden="true">
      <svg className={styles.buildLines} viewBox="0 0 600 560" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="svc-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#07223b" fillOpacity="0.18" />
          </pattern>
        </defs>
        <rect width="600" height="560" fill="url(#svc-dots)" />
        <path className={styles.buildGuide} d="M0 128H600M36 0V560" />
      </svg>

      <div className={styles.select}>
        <span className={styles.selectLabel}>Headline · H1</span>
        <i className={styles.selectBar} />
        <i className={styles.selectBar} />
        <b className={styles.handle} data-at="tl" />
        <b className={styles.handle} data-at="tr" />
        <b className={styles.handle} data-at="bl" />
        <b className={styles.handle} data-at="br" />
        <span className={styles.cursor} data-who="graham">
          <svg viewBox="0 0 16 22">
            <path d="M1 1v18l4.6-4.4 3.2 7.2 3.1-1.3-3.1-7.1H15z" />
          </svg>
          Graham
        </span>
      </div>

      <div className={styles.code}>
        <span className={styles.codeHead}>
          <span className={styles.codeMark}>{"</>"}</span> Dev Mode
        </span>
        <code>
          <span>
            <i>.headline</i> {"{"}
          </span>
          <span>
            {"  "}
            <em>font-size</em>: 40px;
          </span>
          <span>
            {"  "}
            <em>color</em>: <b>#07223b</b>;
          </span>
          <span>{"}"}</span>
        </code>
        <span className={styles.cursor} data-who="jasper">
          <svg viewBox="0 0 16 22">
            <path d="M1 1v18l4.6-4.4 3.2 7.2 3.1-1.3-3.1-7.1H15z" />
          </svg>
          Jasper
        </span>
      </div>

      <figure className={styles.buildShot}>
        <img src="/images/services/photo-laptop.webp" width={1000} height={750} alt="" loading="lazy" decoding="async" />
      </figure>
      <figure className={styles.buildPrint}>
        <img src="/images/services/photo-review.webp" width={600} height={600} alt="" loading="lazy" decoding="async" />
        <figcaption>Homepage review</figcaption>
      </figure>
    </div>
  );
}

function Tile({ t }: { t: ServiceTile }) {
  const Screen = t.ui ? SCREENS[t.ui] : null;
  return (
    <li className={styles.tile} data-colour={t.colour} data-slot={t.slot} data-service={t.id} data-light-corner={t.lightCorner ? "true" : undefined}>
      {t.photo && (
        <div className={styles.box}>
          <img
            className={styles.photo}
            src={`${t.photo.base}-720.webp`}
            srcSet={`${t.photo.base}-720.webp 720w, ${t.photo.base}-1280.webp 1280w`}
            sizes={t.slot === "hero" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
            width={720}
            height={720}
            alt={t.photo.alt}
            loading="lazy"
            decoding="async"
            style={t.photo.position ? { objectPosition: t.photo.position } : undefined}
          />
        </div>
      )}
      {t.art === "build" && <BuildArt />}
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
          <a href={services.more.action.href} {...linkProps(services.more.action.href)} className={styles.moreLink}>
            {services.more.action.label}
          </a>
        </p>
      </div>
    </section>
  );
}
