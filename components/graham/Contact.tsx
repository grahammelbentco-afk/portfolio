import Eyebrow from "./Eyebrow";
import HeroGradient from "./HeroGradient";
import ContactForm from "./ContactForm";
import { contact, linkProps } from "@/content/graham/homepage";
import styles from "./Contact.module.css";

/**
 * Contact: the old webleta.com contact section (heading, intro, email / WhatsApp / response
 * time, and its four-field form) on the agency design's closing ground: the hero's live Halo
 * gradient (HeroGradient; its shader only runs while this section is near the screen).
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
          <p className={`sec-intro ${styles.intro}`}>{contact.intro}</p>
          <dl className={styles.details}>
            {contact.details.map((d) => (
              <div key={d.label}>
                <dt>{d.label}</dt>
                <dd>{d.href ? <a href={d.href} {...linkProps(d.href)}>{d.value}</a> : d.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ContactForm className={styles.form} />
      </div>
    </section>
  );
}
