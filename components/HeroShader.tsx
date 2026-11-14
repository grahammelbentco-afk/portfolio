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
 * Mounts the live Halo over the CSS gradient once the page is idle and WebGL exists.
 * The motion is slow and ambient; with reduced motion it renders as a still frame.
 */
export default function HeroShader() {
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
      {enabled && <ShaderHalo playing={!reduced} />}
    </div>
  );
}
