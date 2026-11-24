import { hooks, trust } from "@/content/graham/homepage";
import styles from "./StatsRail.module.css";

// The spark from Logo Kit V2, used alone as a list marker (V1.6 p.16, "spark marker").
const SPARK = "M194.14 64.05L124.73 219.94A92 92 0 0 0 194.14 64.05Z";

/** The band at the foot of the hero: three hooks, then where to find Webleta's reviews. */
export default function StatsRail() {
  return (
    <div className={styles.rail}>
      <div className={`container ${styles.inner}`}>
        <ul className={styles.stats} aria-label="Why Webleta">
          {hooks.map((hook) => (
            <li key={hook.title} className={styles.stat} data-intro="fade">
              <p className={styles.hookHead}>
                <svg
                  className={styles.spark}
                  data-lead={hook.lead ? "true" : undefined}
                  viewBox="124 63 97 158"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d={SPARK} />
                </svg>
                <span className={`${styles.value} text-gradient`} data-stat-value>
                  {hook.title}
                </span>
              </p>
              <span className={styles.label}>{hook.text}</span>
            </li>
          ))}
        </ul>

        {trust.platforms.length > 0 && (
        <div className={styles.trust} data-intro="fade">
          <h2 className={styles.trustTitle}>{trust.title}</h2>
          <ul className={styles.platforms}>
            {trust.platforms.map((platform) => {
              const body = (
                <>
                  <span className={styles.badge}>
                    <img
                      src={platform.icon.src}
                      alt=""
                      width={platform.icon.width}
                      height={platform.icon.height}
                      data-trust-logo
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className={styles.platformName}>{platform.name}</span>
                </>
              );
              return (
                <li key={platform.name}>
                  {platform.href ? (
                    <a className={styles.platform} href={platform.href} rel="noopener" target="_blank">
                      {body}
                    </a>
                  ) : (
                    <div className={styles.platform}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        )}
      </div>
    </div>
  );
}
