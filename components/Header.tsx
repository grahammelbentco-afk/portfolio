"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { headerCta, linkProps, navigation, whatsapp, whatsappHref } from "@/content/homepage";
import WhatsAppIcon from "./WhatsAppIcon";
import HeaderLogo from "./HeaderLogo";
import styles from "./Header.module.css";

const DESKTOP_QUERY = "(min-width: 960px)";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overLight, setOverLight] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Glass background once the page moves. Over a light section (data-ground="light") the
  // glass mixes into a muddy slate, so the bar goes near-solid Deep Water there instead.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      const probe = (headerRef.current?.offsetHeight ?? 72) / 2;
      const under = [...document.querySelectorAll<HTMLElement>("main [data-ground], footer[data-ground]")].find((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= probe && r.bottom > probe;
      });
      setOverLight(under?.dataset.ground === "light");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // While the menu is open: the rest of the page is inert, scroll is locked,
  // Escape closes, and the menu closes if the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;
    const outside = document.querySelectorAll<HTMLElement>("[data-menu-inert]");
    outside.forEach((el) => (el.inert = true));
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => mq.matches && close(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);

    return () => {
      outside.forEach((el) => (el.inert = false));
      document.documentElement.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open, close]);

  return (
    <header ref={headerRef} className={styles.header} data-scrolled={scrolled || open} data-over={overLight ? "light" : "dark"} data-open={open} data-ground="dark">
      <div className={`container ${styles.bar}`}>
        <a href="#top" className={styles.logo} aria-label="Webleta, back to top" data-intro="header">
          {/* Exact Logo Kit V2 lockup paths, inlined for the hover motion: never retype the wordmark. */}
          <HeaderLogo className={styles.logoSvg} bigClass={styles.logoBig} sparkClass={styles.logoSpark} />
        </a>

        <nav aria-label="Main" className={styles.nav} data-intro="header">
          <ul className={styles.navList}>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.navLink} aria-label={item.label} data-nav-link>
                  {/* Letter roll on hover: each letter lifts away and a brighter copy rolls up
                      from below (text-shadow), staggered per letter. Visual only. */}
                  <span className={styles.roll} aria-hidden="true">
                    {[...item.label].map((ch, i) => (
                      <span key={i} className={styles.char} style={{ "--i": i } as React.CSSProperties}>
                        {ch}
                      </span>
                    ))}
                  </span>
                  <svg className={styles.navSpark} viewBox="134 34 102 164" aria-hidden="true">
                    <path d="M194.14 64.05L124.73 219.94A92 92 0 0 0 194.14 64.05Z" transform="translate(12 -26)" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <a
              href={whatsappHref()}
              className={styles.whatsapp}
              aria-label={`Chat with us on WhatsApp, ${whatsapp.display}`}
              {...(whatsapp.number ? { target: "_blank", rel: "noopener" } : {})}
            >
              <span className={styles.waIcon}>
                <WhatsAppIcon size={20} />
              </span>
              <span className={styles.waNumber}>{whatsapp.display}</span>
            </a>
            <a href={headerCta.href} {...linkProps(headerCta.href)} className={`btn btn-light ${styles.cta}`}>
              {headerCta.label}
            </a>
          </div>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => (open ? close() : setOpen(true))}
          data-intro="header"
        >
          <span className={styles.toggleLabel}>{open ? "Close" : "Menu"}</span>
          <span className={styles.toggleIcon} aria-hidden="true" />
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={styles.panel}
        hidden={!open}
      >
        <nav aria-label="Main, mobile" className="container">
          <ul className={styles.panelList}>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.panelLink} onClick={() => close(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={whatsappHref()}
            className={`${styles.whatsapp} ${styles.panelWhatsapp}`}
            onClick={() => close(false)}
            aria-label={`Chat with us on WhatsApp, ${whatsapp.display}`}
            {...(whatsapp.number ? { target: "_blank", rel: "noopener" } : {})}
          >
            <span className={styles.waIcon}>
              <WhatsAppIcon size={20} />
            </span>
            <span className={styles.waNumber}>{whatsapp.display}</span>
          </a>
          <a href={headerCta.href} {...linkProps(headerCta.href)} className={`btn btn-light ${styles.panelCta}`} onClick={() => close(false)}>
            {headerCta.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
