"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getMasterTimeline } from "@/lib/gsap/masterTimeline";
import { setProgress } from "@/lib/stores/journeyProgress";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pins the master timeline to scroll via ScrollTrigger, scrubbing
 * across the full height of `triggerRef`'s element. This is the one
 * place scroll position becomes animation progress: every Act's future
 * tweens attach to the same timeline returned by getMasterTimeline(),
 * and journeyProgress (read by non-GSAP consumers like CameraRig and
 * LightingManager) is derived from that identical ScrollTrigger
 * progress value — one animation state for the whole app, not two
 * systems that happen to agree.
 */
export function useMasterTimeline(triggerRef: RefObject<HTMLElement>): void {
  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const timeline = getMasterTimeline();

    const scrollTrigger = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      animation: timeline,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [triggerRef]);
}
