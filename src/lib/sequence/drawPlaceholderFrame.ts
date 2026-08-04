import { easeOutCubic } from "@/lib/utils/easing";

const VOID_RGB: [number, number, number] = [10, 9, 8];
const WARM_RGB: [number, number, number] = [58, 36, 22];
const WOOD_COLOR = "#6b4a30";

function lerpChannel(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

/**
 * PLACEHOLDER ONLY. Draws one frame of an abstract chair-assembly
 * silhouette, purely with Canvas 2D primitives — no image assets
 * involved. This exists to prove the frame-resolution and blending
 * math in SequenceCanvas is correct before real photography exists.
 *
 * To swap in a real sequence: replace this function's body with
 * `ctx.drawImage(preloadedFrames[frameIndex], 0, 0, width, height)`.
 * SequenceCanvas's call signature (ctx, width, height, frameIndex,
 * totalFrames) does not need to change.
 */
export function drawPlaceholderFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  frameIndex: number,
  totalFrames: number,
): void {
  const t = totalFrames > 1 ? frameIndex / (totalFrames - 1) : 0;
  const eased = easeOutCubic(t);

  // Background: void -> warm, echoing the lighting arc from the
  // original brief (dark void through to warm residential evening).
  const [r, g, b] = [
    lerpChannel(VOID_RGB[0], WARM_RGB[0], t),
    lerpChannel(VOID_RGB[1], WARM_RGB[1], t),
    lerpChannel(VOID_RGB[2], WARM_RGB[2], t),
  ];
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fillRect(0, 0, width, height);

  // Abstract chair silhouette: scales/fades in as the sequence
  // progresses, standing in for the real assembly footage.
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = Math.min(width, height) * 0.00035 * eased;
  ctx.globalAlpha = eased;
  ctx.fillStyle = WOOD_COLOR;

  // Seat
  ctx.fillRect(centerX - 90 * scale, centerY - 10 * scale, 180 * scale, 20 * scale);
  // Backrest
  ctx.fillRect(centerX - 90 * scale, centerY - 140 * scale, 180 * scale, 130 * scale);
  // Legs
  ctx.fillRect(centerX - 85 * scale, centerY + 10 * scale, 12 * scale, 140 * scale);
  ctx.fillRect(centerX + 73 * scale, centerY + 10 * scale, 12 * scale, 140 * scale);

  ctx.globalAlpha = 1;
}
