import styles from "./ServiceScreens.module.css";

/**
 * Coded screens laid on the device photos in the Services bento. Decorative (aria-hidden at
 * the call site): the tile title carries the meaning. Sized in container query units of the
 * screen, so they scale with the photo and stay on the glass. Harlow Joinery is the
 * fictional concept business used across the site.
 */

/** A Simple Icons SVG used as a mask, painted in the brand colour. */
export function Mark({ src, colour, className }: { src: string; colour: string; className?: string }) {
  return <span className={`${styles.mark} ${className ?? ""}`} style={{ "--src": `url(${src})`, "--brand": colour } as React.CSSProperties} />;
}

/** A job-booking dashboard (laptop): the kind of web application we build. */
export function Dashboard() {
  const jobs = [
    ["Mon 17", "Kitchen measure-up", "Fremantle", "Booked"],
    ["Tue 18", "Oak benchtop install", "Cottesloe", "Booked"],
    ["Wed 19", "Wardrobe quote", "Palmyra", "New"],
  ];
  return (
    <div className={styles.dash}>
      <aside className={styles.dashNav}>
        <span className={styles.dashLogo}>H</span>
        <i data-on="true" />
        <i />
        <i />
        <i />
      </aside>
      <div className={styles.dashMain}>
        <div className={styles.dashTop}>
          <b>This week</b>
          <span className={styles.dashBtn}>New job</span>
        </div>
        <div className={styles.dashStats}>
          <span>
            <small>Quote requests</small>
            <b>14</b>
          </span>
          <span>
            <small>Jobs booked</small>
            <b>6</b>
          </span>
          <span>
            <small>Invoices due</small>
            <b>2</b>
          </span>
        </div>
        <ul className={styles.dashJobs}>
          {jobs.map(([d, j, w, st]) => (
            <li key={j}>
              <span>{d}</span>
              <b>{j}</b>
              <span>{w}</span>
              <em data-new={st === "New" ? "true" : undefined}>{st}</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** A booking app (phone). */
export function BookingApp() {
  const slots = ["8:00", "9:30", "11:00", "1:30", "3:00", "4:30"];
  return (
    <div className={styles.app}>
      <div className={styles.appHead}>
        <span className={styles.appLogo}>H</span>
        <span>
          <small>Harlow Joinery</small>
          <b>Book a measure-up</b>
        </span>
      </div>
      <div className={styles.appDays}>
        {["Mon 17", "Tue 18", "Wed 19"].map((d, i) => (
          <span key={d} data-on={i === 1 ? "true" : undefined}>
            {d}
          </span>
        ))}
      </div>
      <div className={styles.appSlots}>
        {slots.map((t) => (
          <span key={t} data-on={t === "11:00" ? "true" : undefined}>
            {t}
          </span>
        ))}
      </div>
      <span className={styles.appCta}>Confirm Tue 18, 11:00</span>
    </div>
  );
}
