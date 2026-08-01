"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { setProgress } from "@/lib/stores/journeyProgress";
import { LENIS_DURATION, lenisEasing } from "@/lib/constants/scroll";

/**
 * Initializes Lenis for smooth-scroll physics and drives journeyProgress
 * from its scroll/limit ratio. Lenis is ticked via GSAP's ticker rather
 * than its own requestAnimationFrame loop — the standard Lenis+GSAP
 * integration pattern, and it means the app has a single rAF-driven
 * clock that ScrollTrigger (added in the next commit, for the master
 * timeline) can sync against directly instead of fighting a second,
 * independent rAF loop.
 *
 * Replaces useNativeScrollProgress entirely — that hook has been deleted.
 */
export function useLenisScrollProgress(): void {
  useEffect(() => {
    const lenis = new Lenis({
      duration: LENIS_DURATION,
      easing: lenisEasing,
      smoothWheel: true,
    });

    lenis.on("scroll", ({ scroll, limit }: { scroll: number; limit: number }) => {
      setProgress(limit > 0 ? scroll / limit : 0);
    });

    function onTick(time: number) {
      // GSAP ticker time is in seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(onTick);
    // Recommended when GSAP drives an external library's raf: prevents
    // GSAP from "catching up" with large jumps after a tab goes idle,
    // which would otherwise cause Lenis to jump scroll position too.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);
}
