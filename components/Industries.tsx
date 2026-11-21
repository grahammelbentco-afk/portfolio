import { industries, type Industry, type IndustryIcon } from "@/content/homepage";
import Eyebrow from "./Eyebrow";
import IndustriesShader from "./IndustriesShader";
import tile from "./Services.module.css";
import styles from "./Industries.module.css";

/**
 * Industries (Revision 83): a bento in the Services ("What we do") style, sharing its tile
 * CSS: colour tiles, photos in duotone (the photo's luminosity over the tile colour, true
 * colour on hover), the Split Arc 24° notch and the glass icon. On Deep Water, so the
 * notch is cut in Deep Water. The grid mirrors Services' (hero on the right).
 *   [ Food (wide)                ][ Trades (hero)        ]
 *   [ Salons ][ Health           ][                      ]
 *   [ Stores ][ Automotive ][ Entertainment ][ Professional ]
 * Revision 84: the duotone now blends inside the photo box (it has the tile colour), every
 * tile sets white text on a deeper scrim, Entertainment has its own fal photo, and card
 * text is two lines at most.
 */

const ICONS: Record<IndustryIcon, React.ReactNode> = {
  trades: (
    <>
      <path d="M14.5 5.5a4 4 0 00-5 5L4 16v4h4l5.5-5.5a4 4 0 005-5L16 12l-4-4z" />
    </>
  ),
  food: (
    <>
      <path d="M5 11h14a7 7 0 01-14 0zM12 4v3M8.5 5l1 2M15.5 5l-1 2" />
    </>
  ),
  salon: (
    <>
      <circle cx="6.5" cy="17.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
      <path d="M8.5 16L18 4M15.5 16L6 4" />
    </>
  ),
  health: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10zM9.5 11h5M12 8.5v5" />,
  store: (
    <>
      <path d="M5 8h14l-1.2 11.2a2 2 0 01-2 1.8H8.2a2 2 0 01-2-1.8z" />
      <path d="M9 8V6.5a3 3 0 016 0V8" />
    </>
  ),
  auto: (
    <>
      <path d="M4 15v-3l2-5h12l2 5v3a1 1 0 01-1 1H5a1 1 0 01-1-1zM4.5 12h15" />
      <circle cx="8" cy="16" r="1.6" />
      <circle cx="16" cy="16" r="1.6" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </>
  ),
  law: (
    <>
      <path d="M12 4v16M7 20h10M5 8h14M7.5 8L5 14a2.5 2.5 0 005 0zM16.5 8L14 14a2.5 2.5 0 005 0z" />
    </>
  ),
  spa: (
    <>
      <path d="M11 3l1.6 4.4L17 9l-4.4 1.6L11 15l-1.6-4.4L5 9l4.4-1.6zM18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z" />
    </>
  ),
  dental: (
    <>
      <path d="M8 4c-2.5 0-4 2-4 4.5 0 2 1 3.5 1.5 5.5L7 20c.3 1 1.7 1 2-.1l1-4.4c.3-1.3 1.7-1.3 2 0l1 4.4c.3 1.1 1.7 1.1 2 .1l1.5-6c.5-2 1.5-3.5 1.5-5.5C20 6 18.5 4 16 4c-1.6 0-2.6 1-4 1S9.6 4 8 4z" />
    </>
  ),
};

function Tile({ t }: { t: Industry }) {
  return (
    <li
      className={tile.tile}
      data-colour={t.colour}
      data-slot={t.slot}
      data-industry={t.id}
      data-light-corner={t.lightCorner ? "true" : undefined}
    >
      {(
        <div className={tile.box}>
          <img
            className={tile.photo}
            src={t.photo.src}
            srcSet={t.photo.srcSet}
            sizes="(min-width: 1024px) 40vw, 100vw"
            width={800}
            height={800}
            alt=""
            loading="lazy"
            decoding="async"
            style={t.photo.position ? { objectPosition: t.photo.position } : undefined}
          />
        </div>
      )}


      <div className={tile.content}>
        <div className={tile.top}>
          <span className={tile.icon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {ICONS[t.icon]}
            </svg>
          </span>
        </div>
        <div className={tile.bottom}>
          <h3 className={tile.name}>{t.name}</h3>
          <p className={tile.text}>{t.need}</p>
        </div>
      </div>
    </li>
  );
}

/**
 * Section ground (Revision 102). "shader" = ShaderGradient waterPlane test over the red CSS
 * ground; "red" = the Revision 87 Signal Red ground only (to revert, set this to "red"; the
 * red CSS in Industries.module.css .section is unchanged either way).
 */
const GROUND: "shader" | "red" = "shader";

export default function Industries() {
  return (
    <section id="industries" className={styles.section} data-ground="dark" data-industries aria-labelledby="industries-title" data-ground-style={GROUND}>
      {GROUND === "shader" && <IndustriesShader />}
      <div className={`container ${styles.head}`}>
        <div>
          <span className={styles.eyebrowWrap}>
            <Eyebrow>{industries.eyebrow}</Eyebrow>
          </span>
          <h2 id="industries-title" className="sec-title">
            <span className={styles.line}>{industries.title.solid}</span>{" "}
            <span className={`${styles.line} outline-type`}>{industries.title.outline}</span>
          </h2>
        </div>
        <p className="sec-intro">{industries.intro}</p>
      </div>

      <ul className={`container ${tile.bento} ${styles.bento}`} data-industries-bento>
        {industries.items.map((t) => (
          <Tile key={t.id} t={t} />
        ))}
      </ul>

      <div className="container">
        <p className={styles.more}>
          {industries.more.lead}{" "}
          <a href={industries.more.href}>{industries.more.label}</a>
        </p>
      </div>
    </section>
  );
}
