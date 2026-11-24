import { team } from "@/content/graham/homepage";
import Eyebrow from "./Eyebrow";
import styles from "./Portfolio.module.css";

/** Old webleta.com "The WordPress developer behind your team": Graham's three roles. */
export default function Team() {
  return (
    <section id="team" className={styles.section} data-ground="light" aria-labelledby="team-title">
      <div className={`container ${styles.head}`}>
        <Eyebrow>{team.eyebrow}</Eyebrow>
        <h2 id="team-title" className="sec-title">{team.title}</h2>
        <p className="sec-intro">{team.intro}</p>
      </div>
      <ul className={`container ${styles.cards}`}>
        {team.members.map((m) => (
          <li key={m.role} className={styles.card}>
            <img
              className={styles.cardImage}
              src={`${m.image}-480.webp`}
              srcSet={`${m.image}-480.webp 480w, ${m.image}-800.webp 800w`}
              sizes="(min-width: 960px) 30vw, 100vw"
              width={480}
              height={480}
              alt={m.alt}
              loading="lazy"
              decoding="async"
            />
            <div className={styles.cardBody}>
              <h3 className={styles.cardName}>{m.name}</h3>
              <p className={styles.cardRole}>{m.role}</p>
              <p className={styles.cardText}>{m.text}</p>
              <a className={styles.link} href={team.action.href} target="_blank" rel="noopener">
                {team.action.label}
                <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
