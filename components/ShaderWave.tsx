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
  brightness: 1.15,
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
  color1: "#ff9a74",
  color2: "#7d1030",
  color3: "#24050f",
} as const;

export default function ShaderWave({ playing }: { playing: boolean }) {
  return (
    <ShaderGradientCanvas
      style={{ position: "absolute", inset: 0 }}
      pointerEvents="none"
      pixelDensity={1}
      fov={WAVE.fov}
      lazyLoad
      rootMargin="200px"
      powerPreference="low-power"
    >
      <ShaderGradient {...WAVE} control="props" animate={playing ? "on" : "off"} />
      <SubtleGrain />
      <FrameCap />
    </ShaderGradientCanvas>
  );
}
