import { services } from "@/content/homepage";
import ServiceIcon from "./ServiceIcon";
import styles from "./Services.module.css";

/**
 * Services (Graham's reference: the "Ten services. One goal." bento). Ours: the V1.6 p.5
 * list, with Website design as the large tile because everything else feeds it. The tiles
 * mix reused V1.6 photos with flat core-palette grounds. No supporting colours here, so the
 * section sits quietly after the colourful Benefits carousel.
 */
export default function Services() {
  return (
    <section id="services" className={styles.section} data-ground="light" data-services aria-labelledby="services-title">
      <div className={`container ${styles.head}`}>
        <h2 id="services-title" className="sec-title">
          {services.title}
        </h2>
        <p className="sec-intro">{services.intro}</p>
      </div>

      <ul className={`container ${styles.grid}`}>
        {services.items.map((s) => (
          <li key={s.id} className={styles.tile} data-look={s.look} data-service={s.id}>
            {s.image && (
              <img
                className={styles.photo}
                src={`${s.image.base}-720.webp`}
                srcSet={`${s.image.base}-720.webp 720w, ${s.image.base}-1280.webp 1280w`}
                sizes={s.id === "websites" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
                width={720}
                height={480}
                alt={s.image.alt}
                loading="lazy"
                decoding="async"
              />
            )}
            <span className={styles.icon}>
              <ServiceIcon kind={s.icon} />
            </span>
            <div className={styles.text}>
              <h3 className={styles.name}>{s.title}</h3>
              <p className={styles.body}>{s.text}</p>
            </div>
          </li>
        ))}
        <li className={`${styles.tile} ${styles.more}`} data-look="more">
          <div className={styles.text}>
            <h3 className={styles.name}>{services.more.title}</h3>
            <p className={styles.body}>{services.more.text}</p>
          </div>
          <a href={services.more.action.href} className={`btn btn-light ${styles.moreBtn}`}>
            {services.more.action.label}
          </a>
        </li>
      </ul>
    </section>
  );
}
