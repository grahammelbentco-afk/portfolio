import Eyebrow from "./Eyebrow";
import HeroGradient from "./HeroGradient";
import RequestForm from "./RequestForm";
import Spark from "./Spark";
import { contact } from "@/content/homepage";
import styles from "./Contact.module.css";

/**
 * Contact (Revision 76). The page closes on the ground it opened with: the hero's live Halo
 * gradient with its grain (HeroGradient; its shader only runs while this section is near the
 * screen). The request is the same three-step form as Steps, worded for a project.
 *   [ heading (solid, then outline), promises, email ][ three-step request (white card) ]
 *   [ the reused cta-shop photo, 24° cut              ][                                 ]
 */
export default function Contact() {
  return (
    <section id="contact" className={styles.section} data-ground="dark" data-contact aria-labelledby="contact-title">
      <HeroGradient />
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <h2 id="contact-title" className={styles.title}>
            <span className={styles.line}>{contact.title.solid}</span>{" "}
            <span className={`${styles.line} outline-type`}>{contact.title.outline}</span>
          </h2>
          <ul className={styles.promises}>
            {contact.promises.map((p) => (
              <li key={p}>
                <Spark className={styles.spark} />
                {p}
              </li>
            ))}
          </ul>
          <p className={styles.direct}>
            Prefer email? <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <figure className={styles.photo}>
            <img
              src={`${contact.image.base}-900.webp`}
              srcSet={`${contact.image.base}-900.webp 900w, ${contact.image.base}-1600.webp 1600w`}
              sizes="(min-width: 960px) 40vw, 92vw"
              width={contact.image.w}
              height={contact.image.h}
              alt={contact.image.alt}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>

        <RequestForm copy={contact.form} hook="contact" className={styles.form} />
      </div>
    </section>
  );
}
