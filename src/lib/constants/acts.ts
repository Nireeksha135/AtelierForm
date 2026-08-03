/**
 * Canonical per-Act progress breakpoints (0-1) and names.
 *
 * NOTE (known duplication, flagged for the architecture review):
 * CameraRig's and LightingManager's keyframe arrays currently hardcode
 * these same five fractions independently (0, 0.25, 0.5, 0.75, 1)
 * rather than importing ACT_BREAKPOINTS. This file is the intended
 * single source of truth going forward — the master timeline (this
 * commit) is the first consumer — but camera.ts/lighting.ts have not
 * been refactored to use it yet.
 */
export const ACT_BREAKPOINTS = [0, 0.25, 0.5, 0.75, 1] as const;

export const ACT_NAMES = [
  "act-1-void",
  "act-2-structure",
  "act-3-comfort",
  "act-4-atmosphere",
  "act-5-customization",
] as const;

export type ActName = (typeof ACT_NAMES)[number];
