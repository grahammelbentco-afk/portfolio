// @shadergradient/react 2.4.20 ships without type declarations. Only what this site uses.
declare module "@shadergradient/react" {
  import type { CSSProperties, ReactElement, ReactNode } from "react";

  export function ShaderGradientCanvas(props: {
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
    pixelDensity?: number;
    fov?: number;
    pointerEvents?: "none" | "auto";
    lazyLoad?: boolean;
    threshold?: number;
    rootMargin?: string;
    preserveDrawingBuffer?: boolean;
    powerPreference?: "default" | "high-performance" | "low-power";
  }): ReactElement;

  export function ShaderGradient(props: Record<string, unknown>): ReactElement;
}
