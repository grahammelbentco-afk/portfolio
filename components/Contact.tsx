import Eyebrow from "./Eyebrow";
import HeroGradient from "./HeroGradient";
import RequestForm from "./RequestForm";
import Spark from "./Spark";
import { bookCall, contact, linkProps } from "@/content/homepage";
import styles from "./Contact.module.css";

/**
 * Contact (Revision 76). The page closes on the ground it opened with: the hero's live Halo
 * gradient with its grain (HeroGradient; its shader only runs while this section is near the
 * screen). The request is the same three-step form as Steps, worded for a project.
 *   [ heading (solid, then outline), promises, email ][ three-step request (white card) ]
 * (Revision 81: the cta-shop photo was removed; it crowded the join with the footer.)
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
          {/* Revision 87: the two real faces behind Webleta (see content/homepage.ts). */}
          <figure className={styles.people} data-reveal-box>
            <div className={styles.faces}>
              {contact.people.members.map((m) => (
                <img key={m.name} className={styles.face} src={m.photo} alt={`${m.name}, ${m.role} at Webleta`}width={128} height={128} loading="lazy" decoding="async" />
              ))}
            </div>
            <figcaption>
              <span className={styles.peopleLine}>{contact.people.line}</span>
              <span className={styles.names}>
                {contact.people.members.map((m) => (
                  <span key={m.name}>
                    {m.name} <span className={styles.role}>{m.role}</span>
                  </span>
                ))}
              </span>
            </figcaption>
          </figure>
          <p className={styles.direct}>
            Prefer to talk first? <a href={bookCall.href} {...linkProps(bookCall.href)}>{bookCall.label}</a>
          </p>
        </div>

        <RequestForm copy={contact.form} hook="contact" className={styles.form} />
      </div>
    </section>
  );
}
