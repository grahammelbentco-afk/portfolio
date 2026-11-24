"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./HeroGradient.module.css";

// three.js and the shader load only in the browser, after the page is idle.
const ShaderHalo = dynamic(() => import("./ShaderHalo"), { ssr: false });

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Mounts the live Halo over the CSS gradient once the page is idle, WebGL exists and its
 * section has first come near the screen. After that it stays mounted and only renders while
 * the section is near, so scrolling back resumes the motion instead of restarting it.
 * The motion is slow and ambient; with reduced motion it renders as a still frame.
 */
export default function HeroShader() {
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  const [enabled, setEnabled] = useState(false);
  const [near, setNear] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Render only while the section is on or near the screen. The hero and Contact both use this
  // ground, so at most one of their scenes draws at a time.
  useEffect(() => {
    const el = ref.current?.closest<HTMLElement>("[data-bg]") ?? ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setNear(true);
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setNear(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const start = () => {
      if (!supportsWebGL()) return;
      setEnabled(true);
      // The CSS layers underneath can stop drifting once the shader covers them.
      ref.current?.closest<HTMLElement>("[data-bg]")?.setAttribute("data-sg-ready", "true");
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 300);
    return () => clearTimeout(id);
  }, []);

  return (
    <div ref={ref} className={styles.shader}>
      {enabled && seen && <ShaderHalo playing={!reduced} running={near} />}
    </div>
  );
}
