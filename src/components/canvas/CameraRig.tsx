"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CAMERA_KEYFRAMES, CAMERA_LERP_LAMBDA } from "@/lib/constants/camera";
import { getProgress } from "@/lib/stores/journeyProgress";

// Module-level scratch vectors, reused every frame. Allocating a new
// THREE.Vector3 inside useFrame would create garbage 60 times a second —
// exactly the kind of per-frame allocation the perf budget can't afford.
const targetPosition = new THREE.Vector3();
const targetLookAt = new THREE.Vector3();

/** Finds the two keyframes surrounding `progress` and writes the
 *  interpolated position/lookAt into the scratch vectors above. */
function resolveKeyframe(progress: number): void {
  let start = CAMERA_KEYFRAMES[0];
  let end = CAMERA_KEYFRAMES[CAMERA_KEYFRAMES.length - 1];

  for (let i = 0; i < CAMERA_KEYFRAMES.length - 1; i++) {
    const a = CAMERA_KEYFRAMES[i];
    const b = CAMERA_KEYFRAMES[i + 1];
    if (progress >= a.progress && progress <= b.progress) {
      start = a;
      end = b;
      break;
    }
  }

  const span = end.progress - start.progress || 1;
  const localT = (progress - start.progress) / span;

  targetPosition.set(
    THREE.MathUtils.lerp(start.position[0], end.position[0], localT),
    THREE.MathUtils.lerp(start.position[1], end.position[1], localT),
    THREE.MathUtils.lerp(start.position[2], end.position[2], localT),
  );

  targetLookAt.set(
    THREE.MathUtils.lerp(start.lookAt[0], end.lookAt[0], localT),
    THREE.MathUtils.lerp(start.lookAt[1], end.lookAt[1], localT),
    THREE.MathUtils.lerp(start.lookAt[2], end.lookAt[2], localT),
  );
}

/**
 * Drives the default R3F camera along CAMERA_KEYFRAMES based on journey
 * progress (0-1). Progress is read imperatively via getProgress() every
 * frame — never as a prop or React state — so this can eventually be
 * driven by 60fps scroll updates without causing a single re-render.
 *
 * Damping uses exponential decay against `delta` rather than a flat
 * lerp fraction, so the camera's weight/feel is frame-rate independent
 * (identical at 30fps mobile and 60fps desktop).
 */
export function CameraRig() {
  const dampedLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ camera }, delta) => {
    resolveKeyframe(getProgress());

    const dampFactor = 1 - Math.exp(-CAMERA_LERP_LAMBDA * delta);
    camera.position.lerp(targetPosition, dampFactor);
    dampedLookAt.current.lerp(targetLookAt, dampFactor);
    camera.lookAt(dampedLookAt.current);
  });

  return null;
}
