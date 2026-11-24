import { socials } from "@/content/graham/homepage";
import Eyebrow from "./Eyebrow";
import styles from "./Portfolio.module.css";

/** Old webleta.com socials band: six Instagram posts and a link to the profile. */
export default function Socials() {
  return (
    <section id="socials" className={`${styles.section} ${styles.mist}`} data-ground="light" aria-labelledby="socials-title">
      <div className={`container ${styles.socials}`}>
        <ul className={styles.posts}>
          {socials.images.map((img) => (
            <li key={img.base}>
              <img
                src={`${img.base}-480.webp`}
                srcSet={`${img.base}-480.webp 480w, ${img.base}-700.webp 700w`}
                sizes="(min-width: 960px) 18vw, 33vw"
                width={480}
                height={480}
                alt={img.alt}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
        <div className={styles.socialsCopy}>
          <Eyebrow>
            {socials.eyebrow} · <b>{socials.handle}</b>
          </Eyebrow>
          <h2 id="socials-title" className="sec-title">{socials.title}</h2>
          <p className="sec-intro">{socials.text}</p>
          <a className="btn btn-primary" href={socials.action.href} target="_blank" rel="noopener">
            {socials.action.label}
            <span className="sr-only"> on Instagram (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
