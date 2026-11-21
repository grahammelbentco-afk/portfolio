"use client";

import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
import { FrameCap, SubtleGrain } from "./ShaderHalo";

/**
 * Industries ground, Revision 102 (test, Jasper): ShaderGradient (shadergradient.co, ruucm,
 * MIT) as a slow rolling "waterPlane", so it moves differently from the hero's tilted Halo
 * plane. Colours soften the old flat Signal Red: deep wine in the shadows, crimson through
 * the middle and a warm coral light, so the tiles' palette (built against red) still fits
 * and white text stays readable. Same quiet grain and 30fps cap as the hero.
 */
const WAVE = {
  type: "waterPlane",
  uAmplitude: 0,
  uDensity: 1.2,
  uFrequency: 0,
  uSpeed: 0.12,
  uStrength: 3.2,
  uTime: 4,
  axesHelper: "off",
  brightness: 0.7, // the 3d light brightens the colours a lot; this keeps the ground navy-dark
  cAzimuthAngle: 180,
  cDistance: 2.6,
  cPolarAngle: 80,
  cameraZoom: 1,
  envPreset: "city",
  gizmoHelper: "hide",
  grain: "off",
  lightType: "3d",
  pixelDensity: 1,
  fov: 45,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  reflection: 0.1,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  shader: "defaults",
  wireframe: false,
  // Dark red as deep as the hero's navy (#5c0d1c matches #10304a in luminance); the glow is a
  // muted crimson instead of light coral, so the tiles stand out from the ground.
  color1: "#a3202f",
  color2: "#5c0d1c",
  color3: "#1c0409",
} as const;

export default function ShaderWave({ playing, running }: { playing: boolean; running: boolean }) {
  return (
    <ShaderGradientCanvas
      style={{ position: "absolute", inset: 0 }}
      pointerEvents="none"
      pixelDensity={1}
      fov={WAVE.fov}
      lazyLoad={false} // defaults to true, which unmounts off screen and restarts the motion
      powerPreference="low-power"
    >
      <ShaderGradient {...WAVE} control="props" animate={playing ? "on" : "off"} />
      <SubtleGrain />
      <FrameCap running={running} />
    </ShaderGradientCanvas>
  );
}
