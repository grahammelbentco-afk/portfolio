"use client";

import { useEffect, useRef } from "react";
import type { ReactGrabAPI } from "react-grab";

export default function ReactGrabDev() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const apiRef = useRef<ReactGrabAPI | null>(null);

  useEffect(() => {
    let cancelled = false;
    const pluginName = "webleta-floating-toggle";
    const sync = (active: boolean) => {
      const button = buttonRef.current;
      if (!button) return;
      button.textContent = active ? "Grab: ON" : "Grab: OFF";
      button.setAttribute("aria-pressed", String(active));
      button.style.background = active ? "#9d174d" : "#111111";
    };

    void import("react-grab").then(({ getGlobalApi }) => {
      if (cancelled) return;
      const api = getGlobalApi();
      if (!api) return;
      apiRef.current = api;
      api.registerPlugin({
        name: pluginName,
        hooks: {
          onActivate: () => sync(true),
          onDeactivate: () => sync(false),
        },
      });
      sync(api.isActive());
      if (buttonRef.current) buttonRef.current.disabled = false;
    }).catch((error: unknown) => {
      console.error("React Grab failed to initialize", error);
    });

    return () => {
      cancelled = true;
      apiRef.current?.unregisterPlugin(pluginName);
      apiRef.current = null;
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      disabled
      onClick={() => apiRef.current?.toggle()}
      aria-pressed="false"
      data-react-grab-ignore-events
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 2147483000,
        padding: "8px 12px",
        font: "600 12px/1 system-ui, sans-serif",
        color: "#fff",
        background: "#111111",
        border: "1px solid #fff",
        borderRadius: 8,
        cursor: "pointer",
        outlineOffset: 3,
      }}
    >
      Grab: OFF
    </button>
  );
}
