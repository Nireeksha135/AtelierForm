/**
 * Renderer + camera constants.
 *
 * Nothing in the canvas layer should hardcode a raw number — DPR bounds,
 * camera FOV/clipping planes, and the initial camera position all live
 * here so they can be tuned once and reasoned about in one place.
 */

/** [min, max] device pixel ratio. PerformanceMonitor drops to the min
 *  bound on low-end/mobile GPUs and climbs back to the max on capable ones. */
export const DPR_RANGE: [number, number] = [1, 2];

export const CAMERA_SETTINGS = {
  fov: 35,
  near: 0.1,
  far: 100,
  initialPosition: [0, 0, 6] as [number, number, number],
} as const;

/** Act 1 "The Void" background. Read by <color attach="background" />
 *  rather than CSS so the WebGL clear color and page chrome never
 *  mismatch during first paint. */
export const VOID_BACKGROUND_COLOR = "#0a0908";
