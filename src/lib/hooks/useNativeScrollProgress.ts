"use client";

import { useEffect } from "react";
import { setProgress } from "@/lib/stores/journeyProgress";

/**
 * TEMPORARY scroll driver. Maps native window scroll position to
 * journey progress (0-1) so the overlay/camera/lighting systems can be
 * verified against real scrolling before Lenis + ScrollTrigger replace
 * this wholesale in the next commit. Has none of Lenis's smoothing —
 * delete this hook entirely once that lands.
 */
export function useNativeScrollProgress(): void {
  useEffect(() => {
    function handleScroll() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const next = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      setProgress(next);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
