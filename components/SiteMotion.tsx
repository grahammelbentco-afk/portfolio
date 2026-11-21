"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/smooth";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide motion (Revision 87), disabled under reduced motion:
 *  1. Momentum scroll (Lenis): the page keeps gliding briefly after the wheel stops.
 *     Driven by GSAP's ticker so ScrollTrigger (hero parallax, Work's pin) stays in step.
 *     Touch keeps the phone's own native momentum.
 *  2. Scroll reveals: every heading, paragraph and box after the hero rises into view
 *     once, in reading order with a short stagger. Elements that already run their own
 *     animation (About's scroll fill, the logo marquee, Work's camera) are left alone.
 *     The reveal uses the `translate` property, never `transform`, so it can't fight a
 *     component's own hover transforms; the attribute is removed once the reveal ends.
 */

const TEXT = "h2, h3, p, blockquote, .eyebrow";
const BOX = "li, figure, form, details, dl, table, img, .btn, [data-reveal-box]";
const SKIP = "#top, #work, [data-intro], [data-reveal-skip]";
const STAGGER = 70; // ms between items that enter together
const MAX_STEPS = 8;

/** A horizontal scroller (carousel) or a running animation (marquee) above `el`, if any. */
function carrier(el: HTMLElement, scope: Element) {
  let found: HTMLElement | null = null;
  for (let p = el.parentElement; p && p !== scope; p = p.parentElement) {
    const ox = getComputedStyle(p).overflowX;
    if (ox === "auto" || ox === "scroll" || p.getAnimations().length > 0) found = p;
  }
  return found;
}

function revealTargets(scope: Element) {
  const picked = new Set<Element>();
  const all = scope.querySelectorAll<HTMLElement>(`${TEXT}, ${BOX}`);
  all.forEach((found) => {
    if (found.closest(SKIP)) return;
    // Items inside a carousel or marquee would wait off-screen; the row rises as one instead.
    const c = carrier(found, scope);
    const el = c ? (c.parentElement as HTMLElement) : found;
    if (el === scope || picked.has(el)) return;
    // Only the outermost match: a card rises as one, not its text separately.
    for (let p = el.parentElement; p && p !== scope; p = p.parentElement) {
      if (picked.has(p)) return;
    }
    const cs = getComputedStyle(el);
    if (cs.position === "absolute" || cs.position === "fixed" || cs.position === "sticky") return;
    if (cs.display === "none" || cs.display === "contents") return;
    // Not rendered now (an inactive tab panel): leave it, or it would stay hidden when shown.
    if (el.closest("[hidden]") || el.getClientRects().length === 0) return;
    if (el.getAnimations().length > 0) return;
    if (el.closest("[aria-hidden='true']") && el.tagName === "IMG") return;
    picked.add(el);
  });
  // A carrier's parent can be picked after some of its children: keep only the outermost.
  return ([...picked] as HTMLElement[]).filter((el) => {
    for (let p = el.parentElement; p && p !== scope; p = p.parentElement) if (picked.has(p)) return false;
    return true;
  });
}

function initReveals() {
  const scopes = document.querySelectorAll("main > section, body footer");
  const targets: HTMLElement[] = [];
  scopes.forEach((s) => targets.push(...revealTargets(s)));

  const timers: number[] = [];
  const onEnter = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
      const entering = entries
        .filter((e) => e.isIntersecting)
        .map((e) => e.target as HTMLElement)
        .sort((a, b) => {
          const ra = a.getBoundingClientRect();
          const rb = b.getBoundingClientRect();
          return Math.abs(ra.top - rb.top) > 8 ? ra.top - rb.top : ra.left - rb.left;
        });
      entering.forEach((el, i) => {
        io.unobserve(el);
        const delay = Math.min(i, MAX_STEPS) * STAGGER;
        el.style.setProperty("--rd", `${delay}ms`);
        el.dataset.reveal = "in";
        timers.push(
          window.setTimeout(() => {
            delete el.dataset.reveal;
            el.style.removeProperty("--rd");
          }, delay + 1100),
        );
      });
  };
  const io = new IntersectionObserver(onEnter, { rootMargin: "0px 0px -8% 0px" });
  // The footer's last lines can't scroll past an 8% margin at the foot of the page.
  const ioFoot = new IntersectionObserver(onEnter);

  targets.forEach((el) => {
    el.dataset.reveal = el.matches(TEXT) ? "text" : "box";
    (el.closest("footer") ? ioFoot : io).observe(el);
  });

  return () => {
    io.disconnect();
    ioFoot.disconnect();
    timers.forEach(clearTimeout);
    targets.forEach((el) => {
      delete el.dataset.reveal;
      el.style.removeProperty("--rd");
    });
  };
}

function initLenis() {
  const lenis = new Lenis({
    lerp: 0.085, // lower = longer glide after the wheel stops
    wheelMultiplier: 1,
    autoRaf: false,
    anchors: { offset: -88 }, // header (72) + 16, same as scroll-padding-top
    stopInertiaOnNavigate: true,
  });
  setLenis(lenis);
  lenis.on("scroll", ScrollTrigger.update);
  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(raf);
    gsap.ticker.lagSmoothing(500, 33);
    lenis.destroy();
    setLenis(null);
  };
}

export default function SiteMotion() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("motion")) return;
    const offLenis = initLenis();
    const offReveal = initReveals();
    return () => {
      offReveal();
      offLenis();
    };
  }, []);

  return null;
}
