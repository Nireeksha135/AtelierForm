"use client";

import { useSyncExternalStore } from "react";
import { getProgress, subscribeToProgress } from "@/lib/stores/journeyProgress";

/**
 * Reactive read of journey progress, for HTML/DOM consumers (overlay
 * sections, UI chrome). WebGL consumers (CameraRig, LightingManager)
 * must keep reading getProgress() imperatively inside useFrame instead —
 * this hook re-renders React on every change, which is acceptable for a
 * handful of overlay sections but would be far too costly inside the
 * 60fps render loop.
 */
export function useJourneyProgress(): number {
  return useSyncExternalStore(subscribeToProgress, getProgress, getProgress);
}
