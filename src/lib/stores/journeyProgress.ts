/**
 * Journey progress store — a plain pub/sub, deliberately NOT React state.
 *
 * Once Lenis/ScrollTrigger land (later commit), this value updates on
 * every scroll tick, which can be 60+ times a second. If that lived in
 * React state, every tick would re-render whatever reads it. Instead:
 * frame-loop consumers (CameraRig, lighting, etc.) call `getProgress()`
 * imperatively inside `useFrame`, which runs outside React's render
 * cycle entirely. `subscribeToProgress` exists for the rare case where
 * a DOM/HTML element genuinely needs to react to progress changes.
 */

type ProgressListener = (progress: number) => void;

let progress = 0;
const listeners = new Set<ProgressListener>();

export function getProgress(): number {
  return progress;
}

export function setProgress(next: number): void {
  progress = Math.min(1, Math.max(0, next));
  listeners.forEach((listener) => listener(progress));
}

export function subscribeToProgress(listener: ProgressListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
