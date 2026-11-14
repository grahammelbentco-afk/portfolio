"use client";

import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { HalftonePass } from "three/examples/jsm/postprocessing/HalftonePass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

/**
 * Grain strength, 0 to 1. ShaderGradient's own grain is three's HalftonePass at full
 * strength (blending 1), with no setting for it. This is the same pass with the same
 * parameters, blended in at a lower strength so the texture stays but stays quiet.
 */
const GRAIN_STRENGTH = 0.32;

/**
 * ShaderGradient (shadergradient.co, ruucm, MIT) "Halo" preset, as on the V1.6 cover, with
 * Webleta's dark blue ramp and a pale icy light, plus a soft grain pass (SubtleGrain).
 */
const HALO = {
  // ShaderGradient "Halo" preset, values exactly as in Jasper's shadergradient.co link
  // (2026-11-13), except speed (0.4 -> 0.25, he asked for calm motion earlier) and grain
  // (the preset's full grain is replaced by SubtleGrain below). Export-only props left out.
  type: "plane",
  uAmplitude: 1,
  uDensity: 1.3,
  uSpeed: 0.25,
  uStrength: 4,
  // Start the loop at its brightest phase (measured ~16.8s in), so the hero opens on the
  // icy light and then drifts toward dark.
  uTime: 16.8,
  uFrequency: 5.5,
  axesHelper: "off",
  brightness: 1.2,
  cAzimuthAngle: 180,
  cDistance: 3.6,
  cPolarAngle: 90,
  // Preset 1. Slightly closer so the tilted plane fills the corners on wide screens.
  cameraZoom: 1.25,
  envPreset: "city",
  gizmoHelper: "hide",
  grain: "off",
  lightType: "3d",
  pixelDensity: 1,
  fov: 45,
  positionX: -1.4,
  positionY: 0,
  positionZ: 0,
  reflection: 0.1,
  rotationX: 0,
  rotationY: 10,
  rotationZ: 50,
  shader: "defaults",
  wireframe: false,
  // Colours: Jasper's blue ramp (#030F1C base, #10304A middle) with a pale icy light,
  // #9FD8E4, between his #76B5CE and V1.6 Seafoam. Still no grey, no Ember.
  color1: "#9FD8E4",
  color2: "#030F1C",
  color3: "#10304A",
} as const;

/** ShaderGradient's grain pass (HalftonePass, preset parameters), at GRAIN_STRENGTH. */
function SubtleGrain() {
  const { gl, scene, camera, size } = useThree();

  const composer = useMemo(() => {
    const c = new EffectComposer(gl);
    c.addPass(new RenderPass(scene, camera));
    c.addPass(
      new HalftonePass(size.width, size.height, {
        shape: 1,
        radius: 2,
        rotateR: Math.PI / 12,
        rotateB: (Math.PI / 12) * 2,
        rotateG: (Math.PI / 12) * 3,
        scatter: 1,
        blending: GRAIN_STRENGTH,
        blendingMode: 1,
        greyscale: false,
        disable: false,
      }),
    );
    return c;
    // Size changes are handled below without rebuilding the passes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, scene, camera]);

  useEffect(() => composer.setSize(size.width, size.height), [composer, size.width, size.height]);
  useEffect(() => () => composer.dispose(), [composer]);

  // Priority 1 takes over rendering from the default loop, as ShaderGradient's grain does.
  useFrame((state, delta) => {
    state.gl.autoClear = true;
    composer.render(delta);
  }, 1);

  return null;
}

export default function ShaderHalo({ playing }: { playing: boolean }) {
  return (
    <ShaderGradientCanvas
      style={{ position: "absolute", inset: 0 }}
      pointerEvents="none"
      pixelDensity={1}
      fov={HALO.fov}
      lazyLoad
      rootMargin="200px"
      powerPreference="low-power"
    >
      <ShaderGradient {...HALO} control="props" animate={playing ? "on" : "off"} />
      <SubtleGrain />
    </ShaderGradientCanvas>
  );
}
