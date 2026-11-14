import { services, type DeviceStage, type LiveService, type PlatformLogo } from "@/content/homepage";
import ServiceIcon from "./ServiceIcon";
import { CareDashboard, DesignToPage, Mark, Serp, WpEditor } from "./ServiceScreens";
import styles from "./Services.module.css";

/**
 * Services (Revision 39): a bento of Graham's eight services, each tile showing the service
 * in real use, with the real platform logos.
 *
 * Desktop, 12 columns:
 *   [ WordPress: laptop + editor (6×2) ][ SEO: phone + Google (3×2) ][ Design: tablet (3×2) ]
 *   [ Production: care dashboard (6)    ][ Web emails (3)            ][ Social media (3)     ]
 *   [ Web and mobile apps (3)           ][ Content marketing (3)     ][ Not sure? (6)        ]
 *
 * Live tiles: a visual on top and a caption band below in the tile's V1.6 supporting colour.
 * The device photo and its coded screen share one "stage" that covers the visual like
 * object-fit: cover, so the interface stays locked to the glass at every size.
 * Coming-soon tiles: dashed outline over 24° channel hairlines, with a status chip.
 */

const UI = { "wp-editor": WpEditor, serp: Serp, design: DesignToPage, care: CareDashboard };

function Logos({ logos, size = "md" }: { logos: PlatformLogo[]; size?: "md" | "sm" }) {
  return (
    <ul className={styles.logos} data-size={size} aria-label={`Works with ${logos.map((l) => l.name).join(", ")}`}>
      {logos.map((l) => (
        <li key={l.name} className={styles.logo} title={l.name}>
          <Mark src={l.file} colour={l.colour} />
        </li>
      ))}
    </ul>
  );
}

function Stage({ stage, children }: { stage: DeviceStage; children: React.ReactNode }) {
  const s = stage.screen;
  return (
    <div className={styles.stage} style={{ "--r": stage.width / stage.height } as React.CSSProperties}>
      <img
        src={`${stage.base}-${stage.width > 2500 ? 900 : 720}.webp`}
        srcSet={
          stage.width > 2500
            ? `${stage.base}-900.webp 900w, ${stage.base}-1600.webp 1600w`
            : `${stage.base}-720.webp 720w, ${stage.base}-1200.webp 1200w`
        }
        sizes="(min-width: 1024px) 60vw, 100vw"
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
  );
}

function LiveTile({ s }: { s: LiveService }) {
  const Screen = UI[s.ui];
  return (
    <li className={styles.tile} data-colour={s.colour} data-service={s.id} data-ui={s.ui}>
      <div className={styles.visual}>
        <div className={styles.box}>
        {s.stage ? (
          <Stage stage={s.stage}>
            <Screen />
          </Stage>
        ) : (
          <div className={styles.solo} aria-hidden="true">
            <div className={styles.soloInner}>
              <Screen />
            </div>
          </div>
        )}
        </div>
      </div>
      <div className={styles.caption}>
        <div className={styles.captionTop}>
          <span className={styles.icon} aria-hidden="true">
            <ServiceIcon kind={s.icon} />
          </span>
          <Logos logos={s.logos} />
        </div>
        <h3 className={styles.name}>
          {s.title}
          <span className="sr-only"> (available now)</span>
        </h3>
        <p className={styles.text}>{s.text}</p>
      </div>
    </li>
  );
}

export default function Services() {
  const [wp, seo, design, production] = services.live;
  const [email, apps, social, content] = services.soon;
  const soon = (s: (typeof services.soon)[number]) => (
    <li key={s.id} className={styles.soonTile} data-service={s.id}>
      <div className={styles.soonTop}>
        <span className={styles.chip}>
          <span className={styles.chipDot} aria-hidden="true" />
          {services.soonLabel}
        </span>
        <Logos logos={s.logos} size="sm" />
      </div>
      <h3 className={styles.soonName}>{s.title}</h3>
      <p className={styles.soonText}>{s.text}</p>
    </li>
  );

  return (
    <section id="services" className={styles.section} data-ground="dark" data-services aria-labelledby="services-title">
      <div className={`container ${styles.head}`}>
        <h2 id="services-title" className="sec-title">
          {services.title}
        </h2>
        <div className={styles.headSide}>
          <p className="sec-intro">{services.intro}</p>
          <p className={styles.legend}>
            <span>
              <span className={styles.legendLive} aria-hidden="true" />
              {services.liveLabel}
            </span>
            <span>
              <span className={styles.legendSoon} aria-hidden="true" />
              {services.soonLabel}
            </span>
          </p>
        </div>
      </div>

      <ul className={`container ${styles.bento}`} data-services-bento>
        <LiveTile s={wp} />
        <LiveTile s={seo} />
        <LiveTile s={design} />
        <LiveTile s={production} />
        {soon(email)}
        {soon(social)}
        {soon(apps)}
        {soon(content)}
        <li className={styles.moreTile}>
          <svg className={styles.ripples} viewBox="0 0 600 600" aria-hidden="true" focusable="false">
            {[90, 150, 210, 270, 330].map((r) => (
              <circle key={r} cx="600" cy="600" r={r} />
            ))}
          </svg>
          <h3 className={styles.moreTitle}>{services.more.title}</h3>
          <p className={styles.moreText}>{services.more.text}</p>
          <a href={services.more.action.href} className="btn btn-light">
            {services.more.action.label}
          </a>
        </li>
      </ul>
    </section>
  );
}
