"use client";

import { LightingManager } from "./LightingManager";
import { ChairModel } from "./ChairModel";

/**
 * The persistent 3D scene. This component's contents will keep growing
 * across Acts 3-5 (upholstery, atmosphere, pedestal/customization) but
 * the component itself stays mounted for the entire experience — only
 * what it renders changes as the master timeline progresses.
 */
export function Scene() {
  return (
    <>
      <LightingManager />
      <ChairModel />
    </>
  );
}
