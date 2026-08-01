export interface CameraKeyframe {
  /** Normalized journey progress, 0-1, in ascending order. */
  progress: number;
  position: [number, number, number];
  lookAt: [number, number, number];
}

/**
 * One keyframe per Act. Position/lookAt values are placeholders tuned
 * against the temporary placeholder mesh in <Scene> — these get
 * re-tuned once the real chair model and its per-Act staging (timber →
 * joinery → upholstery → pedestal) land, but the interpolation system
 * itself does not change.
 *
 * progress: 0 must match CAMERA_SETTINGS.initialPosition (renderer.ts)
 * exactly, so there's no visible jump on first paint before any scroll
 * has happened.
 */
export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { progress: 0, position: [0, 0, 6], lookAt: [0, 0, 0] }, // Act 1 — The Void
  { progress: 0.25, position: [1.6, 0.4, 3], lookAt: [0, 0.1, 0] }, // Act 2 — Structure
  { progress: 0.5, position: [-1.3, 0.7, 2.2], lookAt: [0, 0.3, 0] }, // Act 3 — Comfort
  { progress: 0.75, position: [0, 1.1, 3.6], lookAt: [0, 0.2, 0] }, // Act 4 — Atmosphere
  { progress: 1, position: [0, 0.6, 4.4], lookAt: [0, 0.2, 0] }, // Act 5 — Customization
];

/**
 * Exponential-decay rate for camera damping (see CameraRig). Higher =
 * the camera catches up to its target faster / feels snappier. Using
 * an exponential-decay lambda (rather than a flat per-frame lerp
 * fraction) keeps the damped motion visually identical regardless of
 * frame rate — important since we target 60fps desktop / 30fps mobile.
 */
export const CAMERA_LERP_LAMBDA = 4;
