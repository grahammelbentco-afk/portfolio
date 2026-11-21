"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./Industries.module.css";

// three.js and the shader load only in the browser, after the page is idle.
const ShaderWave = dynamic(() => import("./ShaderWave"), { ssr: false });

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
 * The Industries shader ground (Revision 102 test). Same lifecycle as HeroShader: mounts after
 * idle when WebGL exists and the section first comes near, then stays mounted and only renders
 * while near (so it never draws at the same time as the hero's, and resumes instead of
 * restarting). Holds a still frame with reduced motion. The section's red CSS ground stays
 * underneath as first paint and fallback.
 */
export default function IndustriesShader() {
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  const [enabled, setEnabled] = useState(false);
  const [near, setNear] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current?.parentElement;
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
      if (supportsWebGL()) setEnabled(true);
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 400 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 400);
    return () => clearTimeout(id);
  }, []);

  return (
    <div ref={ref} className={styles.shader} aria-hidden="true">
      {enabled && seen && <ShaderWave playing={!reduced} running={near} />}
    </div>
  );
}
