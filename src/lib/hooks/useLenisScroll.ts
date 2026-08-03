"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LENIS_DURATION, lenisEasing } from "@/lib/constants/scroll";

/**
 * Initializes Lenis for smooth-scroll physics only. Journey progress is
 * NOT computed here — that responsibility moved to useMasterTimeline
 * once ScrollTrigger + the master timeline landed. This hook's only job
 * is smoothing native scroll input and keeping ScrollTrigger's cached
 * scroll position in sync with it.
 *
 * Ticked via GSAP's ticker (not its own rAF loop) so Lenis and
 * ScrollTrigger share a single clock. `lenis.on('scroll', ScrollTrigger.update)`
 * refreshes ScrollTrigger every tick against Lenis's eased scroll
 * value, avoiding the one-frame lag you'd get from ScrollTrigger's own
 * native scroll listener running independently.
 */
export function useLenisScroll(): void {
  useEffect(() => {
    const lenis = new Lenis({
      duration: LENIS_DURATION,
      easing: lenisEasing,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function onTick(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);
}
