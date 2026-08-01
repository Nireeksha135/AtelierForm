"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LIGHTING_KEYFRAMES, LIGHTING_LERP_LAMBDA } from "@/lib/constants/lighting";
import { getProgress } from "@/lib/stores/journeyProgress";

// Keyframe colors/positions are parsed into THREE.Color/Vector3 once at
// module load, not every frame — resolveLightingKeyframe only ever reads
// from these, never re-parses a hex string in the render loop.
const RESOLVED_KEYFRAMES = LIGHTING_KEYFRAMES.map((keyframe) => ({
  progress: keyframe.progress,
  ambientIntensity: keyframe.ambientIntensity,
  ambientColor: new THREE.Color(keyframe.ambientColor),
  keyIntensity: keyframe.keyIntensity,
  keyColor: new THREE.Color(keyframe.keyColor),
  keyPosition: new THREE.Vector3(...keyframe.keyPosition),
  backgroundColor: new THREE.Color(keyframe.backgroundColor),
}));

// Scratch objects, reused every frame — no per-frame allocations.
const targetAmbientColor = new THREE.Color();
const targetKeyColor = new THREE.Color();
const targetKeyPosition = new THREE.Vector3();
const targetBackground = new THREE.Color();
let targetAmbientIntensity = 0;
let targetKeyIntensity = 0;

/** Finds the two resolved keyframes surrounding `progress` and writes
 *  the interpolated values into the scratch objects/variables above. */
function resolveLightingKeyframe(progress: number): void {
  let start = RESOLVED_KEYFRAMES[0];
  let end = RESOLVED_KEYFRAMES[RESOLVED_KEYFRAMES.length - 1];

  for (let i = 0; i < RESOLVED_KEYFRAMES.length - 1; i++) {
    const a = RESOLVED_KEYFRAMES[i];
    const b = RESOLVED_KEYFRAMES[i + 1];
    if (progress >= a.progress && progress <= b.progress) {
      start = a;
      end = b;
      break;
    }
  }

  const span = end.progress - start.progress || 1;
  const t = (progress - start.progress) / span;

  targetAmbientColor.lerpColors(start.ambientColor, end.ambientColor, t);
  targetKeyColor.lerpColors(start.keyColor, end.keyColor, t);
  targetBackground.lerpColors(start.backgroundColor, end.backgroundColor, t);
  targetKeyPosition.lerpVectors(start.keyPosition, end.keyPosition, t);
  targetAmbientIntensity = THREE.MathUtils.lerp(start.ambientIntensity, end.ambientIntensity, t);
  targetKeyIntensity = THREE.MathUtils.lerp(start.keyIntensity, end.keyIntensity, t);
}

/**
 * Drives ambient light, key (directional) light, and scene background
 * through LIGHTING_KEYFRAMES based on journey progress — the WebGL
 * equivalent of CameraRig. Same rules apply: progress is read
 * imperatively every frame (never as props/state), and damping is
 * frame-rate independent so the transition speed matches at 30fps
 * mobile and 60fps desktop.
 */
export function LightingManager() {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const keyRef = useRef<THREE.DirectionalLight>(null);

  useFrame(({ scene }, delta) => {
    resolveLightingKeyframe(getProgress());
    const dampFactor = 1 - Math.exp(-LIGHTING_LERP_LAMBDA * delta);

    if (ambientRef.current) {
      ambientRef.current.color.lerp(targetAmbientColor, dampFactor);
      ambientRef.current.intensity = THREE.MathUtils.lerp(
        ambientRef.current.intensity,
        targetAmbientIntensity,
        dampFactor,
      );
    }

    if (keyRef.current) {
      keyRef.current.color.lerp(targetKeyColor, dampFactor);
      keyRef.current.intensity = THREE.MathUtils.lerp(
        keyRef.current.intensity,
        targetKeyIntensity,
        dampFactor,
      );
      keyRef.current.position.lerp(targetKeyPosition, dampFactor);
    }

    if (scene.background instanceof THREE.Color) {
      scene.background.lerp(targetBackground, dampFactor);
    }
  });

  const initial = RESOLVED_KEYFRAMES[0];

  return (
    <>
      <ambientLight
        ref={ambientRef}
        intensity={initial.ambientIntensity}
        color={initial.ambientColor}
      />
      <directionalLight
        ref={keyRef}
        intensity={initial.keyIntensity}
        color={initial.keyColor}
        position={initial.keyPosition}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
    </>
  );
}
