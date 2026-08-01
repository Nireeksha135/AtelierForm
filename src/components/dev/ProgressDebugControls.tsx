"use client";

import { useControls } from "leva";
import { useEffect } from "react";
import { setProgress } from "@/lib/stores/journeyProgress";

/**
 * Development-only scrubber for journey progress (0-1). Lets us verify
 * CameraRig's keyframe interpolation visually before Lenis/ScrollTrigger
 * wiring lands in a later commit. Only ever rendered when
 * NODE_ENV === 'development' (see CanvasRoot) — Next.js dead-code-
 * eliminates that branch in production builds, so Leva never ships.
 */
export function ProgressDebugControls() {
  const { progress } = useControls("Journey", {
    progress: { value: 0, min: 0, max: 1, step: 0.001 },
  });

  useEffect(() => {
    setProgress(progress);
  }, [progress]);

  return null;
}
