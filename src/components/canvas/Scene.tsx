"use client";

import { LightingManager } from "./LightingManager";

/**
 * The persistent 3D scene. This component's contents will grow across
 * Acts 1-5 (timber, joinery, upholstery, pedestal) but the component
 * itself stays mounted for the entire experience — only what it
 * renders changes as the master timeline progresses.
 *
 * Lighting lives here (via LightingManager) rather than in CameraRig
 * or CanvasRoot because it's part of the scene's content/atmosphere,
 * not the viewpoint — Act 4's "studio daylight to warm residential
 * evening" transition is a property of the scene, independent of
 * wherever the camera happens to be looking from.
 */
export function Scene() {
  return (
    <>
      <LightingManager />

      {/* Placeholder only — proves lighting transitions read correctly.
          Replaced by the timber/chair model when the GLB pipeline lands. */}
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4a3628" roughness={0.6} metalness={0.1} />
      </mesh>
    </>
  );
}
