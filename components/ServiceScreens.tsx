import styles from "./ServiceScreens.module.css";

/**
 * The coded interfaces laid on the device photos in the Services bento. Decorative
 * (aria-hidden at the call site): the tile caption carries the meaning. Sized in container
 * query units of the screen, so they scale with the photo and stay aligned with the glass.
 * Harlow Joinery is the fictional concept business used across the site.
 */

function Mark({ src, colour, className }: { src: string; colour: string; className?: string }) {
  return <span className={`${styles.mark} ${className ?? ""}`} style={{ "--src": `url(${src})`, "--brand": colour } as React.CSSProperties} />;
}

/** WordPress block editor: top bar, a selected hero block, paragraph lines. */
export function WpEditor() {
  return (
    <div className={styles.wp}>
      <div className={styles.wpBar}>
        <span className={styles.wpLogo}>
          <Mark src="/brands/si/wordpress.svg" colour="#ffffff" />
        </span>
        <span className={styles.wpCrumb}>Home</span>
        <span className={styles.wpSpacer} />
        <span className={styles.wpGhost}>Preview</span>
        <span className={styles.wpUpdate}>Update</span>
      </div>
      <div className={styles.wpCanvas}>
        <div className={styles.wpBlock}>
          <span className={styles.wpToolbar}>
            <i />
            <i />
            <i />
          </span>
          <img src="/images/work-joinery-720.webp" alt="" width={720} height={894} />
          <div className={styles.wpHero}>
            <span className={styles.wpH1}>Made to measure.</span>
            <span className={styles.wpLine} />
            <span className={styles.wpLine} data-short />
            <span className={styles.wpBtn}>Request a quote</span>
          </div>
        </div>
        <div className={styles.wpCols}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

/** Google results on a phone, with the business in first place. */
export function Serp() {
  return (
    <div className={styles.serp}>
      <div className={styles.serpTop}>
        <img src="/brands/google-g.svg" alt="" width={24} height={24} className={styles.serpG} />
        <span className={styles.serpQuery}>joiner fremantle</span>
      </div>
      <div className={styles.serpTabs}>
        <b>All</b>
        <span>Maps</span>
        <span>Images</span>
      </div>
      <div className={styles.serpFirst}>
        <span className={styles.serpSite}>
          <span className={styles.serpFav}>H</span>
          <span>
            <b>Harlow Joinery</b>
            <small>harlowjoinery.com.au</small>
          </span>
        </span>
        <span className={styles.serpTitle}>Custom kitchens and furniture in Fremantle</span>
        <span className={styles.serpSnippet}>Made to measure by hand. Free quotes, local install.</span>
        <span className={styles.serpChips}>
          <span>Call</span>
          <span>Directions</span>
        </span>
      </div>
      <div className={styles.serpRest}>
        <span />
        <span data-w="70" />
        <span data-w="85" />
      </div>
      <div className={styles.serpRest}>
        <span />
        <span data-w="60" />
      </div>
    </div>
  );
}

/** A design frame (with selection handles) above the finished page it became. */
export function DesignToPage() {
  return (
    <div className={styles.dz}>
      <div className={styles.dzCanvas}>
        <span className={styles.dzLabel}>Home · Desktop</span>
        <div className={styles.dzFrame}>
          <span className={styles.dzHandle} data-c="tl" />
          <span className={styles.dzHandle} data-c="tr" />
          <span className={styles.dzHandle} data-c="bl" />
          <span className={styles.dzHandle} data-c="br" />
          <span className={styles.dzBox} data-k="img" />
          <span className={styles.dzBox} data-k="h" />
          <span className={styles.dzBox} data-k="p" />
          <span className={styles.dzBox} data-k="btn" />
        </div>
      </div>
      <span className={styles.dzArrow}>
        <svg viewBox="0 0 24 24">
          <path d="M12 4v15M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div className={styles.dzLive}>
        <img src="/images/work-joinery-720.webp" alt="" width={720} height={894} />
        <span className={styles.dzLiveText}>
          <b>Made to measure.</b>
          <i>Request a quote</i>
        </span>
      </div>
    </div>
  );
}

/** Site care dashboard: everything up to date, backed up and online. */
export function CareDashboard() {
  const rows = [
    ["WordPress core", "Up to date"],
    ["Plugins", "12 updated"],
    ["Backup", "Today, 3:00am"],
    ["Security scan", "No issues"],
  ];
  return (
    <div className={styles.care}>
      <div className={styles.careHead}>
        <span className={styles.careSite}>
          <Mark src="/brands/si/wordpress.svg" colour="#21759B" className={styles.careWp} />
          harlowjoinery.com.au
        </span>
        <span className={styles.careOnline}>
          <i />
          Online
        </span>
      </div>
      <ul className={styles.careRows}>
        {rows.map(([k, v]) => (
          <li key={k}>
            <span>{k}</span>
            <span className={styles.careOk}>
              <svg viewBox="0 0 16 16">
                <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {v}
            </span>
          </li>
        ))}
      </ul>
      <div className={styles.careUptime}>
        <span>Last 30 days</span>
        <span className={styles.careBars}>
          {Array.from({ length: 30 }, (_, i) => (
            <i key={i} />
          ))}
        </span>
      </div>
    </div>
  );
}

export { Mark };
