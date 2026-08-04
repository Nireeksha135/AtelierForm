/**
 * Cubic ease-out: fast start, gentle settle. Used wherever motion needs
 * to read as physically weighted rather than mechanically linear (per
 * the brief: "animations should feel physically weighted") without
 * pulling in a full easing library for one curve.
 */
export function easeOutCubic(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - clamped, 3);
}
