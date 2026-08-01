import { VOID_BACKGROUND_COLOR } from "./renderer";

export interface LightingKeyframe {
  /** Normalized journey progress, 0-1, in ascending order. */
  progress: number;
  ambientIntensity: number;
  ambientColor: string;
  keyIntensity: number;
  keyColor: string;
  keyPosition: [number, number, number];
  backgroundColor: string;
}

/**
 * One lighting state per Act. Mirrors the brief's Act 4 direction
 * ("lighting transitions from studio daylight to warm residential
 * evening") by sweeping key-light color/intensity and background
 * warmth across the whole journey, not just Act 4 — Acts 1-3 ramp
 * from a near-dark void up to a neutral studio state, then Acts 4-5
 * cool the intensity back down while warming the color temperature.
 *
 * progress: 0's backgroundColor reuses VOID_BACKGROUND_COLOR (the same
 * constant CanvasRoot uses for the pre-first-frame background) rather
 * than a second hardcoded hex — one source of truth for "the void".
 */
export const LIGHTING_KEYFRAMES: LightingKeyframe[] = [
  {
    progress: 0,
    ambientIntensity: 0.08,
    ambientColor: "#1a1714",
    keyIntensity: 0.5,
    keyColor: "#8fa6c9",
    keyPosition: [4, 6, 3],
    backgroundColor: VOID_BACKGROUND_COLOR,
  }, // Act 1 — The Void: cool, near-dark
  {
    progress: 0.25,
    ambientIntensity: 0.2,
    ambientColor: "#2a231c",
    keyIntensity: 0.9,
    keyColor: "#d8cbb0",
    keyPosition: [3, 5, 4],
    backgroundColor: "#100e0c",
  }, // Act 2 — Structure: workshop light picking up
  {
    progress: 0.5,
    ambientIntensity: 0.35,
    ambientColor: "#3a2e22",
    keyIntensity: 1.1,
    keyColor: "#f2e6cf",
    keyPosition: [2, 4, 4],
    backgroundColor: "#171310",
  }, // Act 3 — Comfort: soft neutral studio light
  {
    progress: 0.75,
    ambientIntensity: 0.3,
    ambientColor: "#4a2e1c",
    keyIntensity: 0.85,
    keyColor: "#f0a860",
    keyPosition: [-3, 2, 3],
    backgroundColor: "#1f130c",
  }, // Act 4 — Atmosphere: studio daylight → warm evening
  {
    progress: 1,
    ambientIntensity: 0.22,
    ambientColor: "#3a2416",
    keyIntensity: 0.7,
    keyColor: "#e8935a",
    keyPosition: [-2, 3, 4],
    backgroundColor: "#160e08",
  }, // Act 5 — Customization: warm residential
];

/**
 * Exponential-decay rate for lighting damping — same technique as
 * CAMERA_LERP_LAMBDA (frame-rate independent), but kept as its own
 * constant rather than shared: camera and lighting are independent
 * systems that may need different responsiveness once real content
 * replaces the placeholder mesh, and coupling them now would just
 * mean splitting this later anyway.
 */
export const LIGHTING_LERP_LAMBDA = 4;
