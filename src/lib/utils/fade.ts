export interface FadeRange {
  in: [number, number];
  out: [number, number];
}

/**
 * Returns a 0-1 opacity for `progress` given a fade-in window and a
 * fade-out window. Centralized here so every overlay section fades
 * consistently instead of each component reinventing its own opacity
 * math (which is exactly the kind of duplication that creeps in once
 * there are 5+ Act sections).
 */
export function resolveFade(progress: number, range: FadeRange): number {
  const [inStart, inEnd] = range.in;
  const [outStart, outEnd] = range.out;

  if (progress <= inStart || progress >= outEnd) return 0;
  if (progress < inEnd) return (progress - inStart) / (inEnd - inStart || 1);
  if (progress > outStart) return 1 - (progress - outStart) / (outEnd - outStart || 1);
  return 1;
}
