export interface ResolvedFrame {
  frameIndex: number;
  nextFrameIndex: number;
  /** 0-1 blend weight of nextFrameIndex over frameIndex. */
  blend: number;
}

/**
 * Converts continuous journey progress (0-1) into a discrete frame pair
 * and a blend factor between them — the core of making a frame
 * sequence read as continuous motion rather than a slideshow. At
 * blend=0 only frameIndex is visible; at blend=1 only nextFrameIndex
 * is; SequenceCanvas crossfades between them for everything in between.
 */
export function resolveSequenceFrame(progress: number, totalFrames: number): ResolvedFrame {
  const lastIndex = totalFrames - 1;
  const exact = Math.min(1, Math.max(0, progress)) * lastIndex;
  const frameIndex = Math.floor(exact);
  const nextFrameIndex = Math.min(lastIndex, frameIndex + 1);
  const blend = exact - frameIndex;

  return { frameIndex, nextFrameIndex, blend };
}
