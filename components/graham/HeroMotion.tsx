"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);


/**
 * One orchestrated load sequence for the hero, plus a gentle scrubbed parallax on
 * the three cards. Nothing runs when the visitor prefers reduced motion.
 */
export default function HeroMotion({
  children,
  className,
  labelledBy,
  id = "top",
}: {
  children: React.ReactNode;
  className?: string;
  labelledBy: string;
  id?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 960px)",
        },
        (context) => {
          const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };
          if (!motion) return;

          // The header sits outside this component, so it is selected by element, not by string.
          const headerItems = document.querySelectorAll<HTMLElement>('[data-intro="header"]');
          const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.1 } });

          // Only tween what this hero has: the /graham portrait hero has no cards, and GSAP
          // warns in the console about every selector that matches nothing.
          const step = (els: string | NodeListOf<HTMLElement>, from: gsap.TweenVars, to: gsap.TweenVars, at: number) => {
            const list = typeof els === "string" ? root.current?.querySelectorAll<HTMLElement>(els) : els;
            if (list && list.length) tl.fromTo(list, from, to, at);
          };

          step(headerItems, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06 }, 0);
          step('[data-intro="line"]', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, stagger: 0.12 }, 0.1);
          // The cards arrive one by one, in reading order, from the right.
          step('[data-intro="card"]', { autoAlpha: 0, x: 48 }, { autoAlpha: 1, x: 0, stagger: 0.14, duration: 1.2 }, 0.3);
          step('[data-intro="decor"]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4, ease: "power2.out" }, 1.0);
          step('[data-intro="fade"]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.9 }, 0.45);

          // On wide screens the cards drift at slightly different speeds as the hero scrolls away.
          if (desktop) {
            gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card, i) => {
              gsap.to(card, {
                y: -(24 + i * 24),
                ease: "none",
                scrollTrigger: {
                  trigger: root.current,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.6,
                },
              });
            });
          }
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id={id} className={className} aria-labelledby={labelledBy} data-ground="dark">
      {children}
    </section>
  );
}
