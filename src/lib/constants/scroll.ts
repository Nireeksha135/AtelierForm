/** Lenis smoothing duration, in seconds — how long it takes scroll
 *  input to "catch up" to its target. Matches the brief's "physically
 *  weighted" feel without being so long it feels laggy/unresponsive. */
export const LENIS_DURATION = 1.2;

/**
 * Standard ease-out-expo curve (per Lenis's own docs) for smoothing
 * wheel/touch input. Kept as a named function rather than an inline
 * arrow so it's documented once and reusable if other scroll-adjacent
 * systems need the same curve later.
 */
export function lenisEasing(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
