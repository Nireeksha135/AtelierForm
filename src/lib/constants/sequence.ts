/**
 * PLACEHOLDER frame count, for the parametric placeholder renderer only.
 * A real photographic/rendered sequence should use far more frames —
 * 90-150 for a journey this length is typical for smooth motion — but
 * that number should be chosen once real footage exists and payload
 * size can be measured against it, not guessed now.
 */
export const TOTAL_FRAMES = 24;

/** Cap on canvas backing-store resolution multiplier, same rationale as
 *  the WebGL DPR cap this replaces — sharp on capable displays, capped
 *  on high-DPI mobile so we're not pushing 3x-4x pixel counts for no
 *  visible benefit. */
export const MAX_CANVAS_DPR = 2;
