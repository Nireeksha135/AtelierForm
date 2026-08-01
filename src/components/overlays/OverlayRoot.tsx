"use client";

import { useNativeScrollProgress } from "@/lib/hooks/useNativeScrollProgress";
import { JOURNEY_LENGTH_VH } from "@/lib/constants/journey";
import { HeroSection } from "./HeroSection";

/**
 * The scrollable HTML layer. Sits above the persistent canvas (z-10,
 * see RootLayout) and owns the page's real scrollable height — the
 * canvas itself never scrolls, it only ever reads progress. As Acts
 * 2-5 land, their overlay sections mount here alongside HeroSection.
 *
 * Uses the temporary native-scroll driver for now (see
 * useNativeScrollProgress); swapped for Lenis in the next commit
 * without any section needing to change, since sections only ever
 * consume progress, never the scroll mechanism itself.
 */
export function OverlayRoot() {
  useNativeScrollProgress();

  return (
    <div style={{ height: `${JOURNEY_LENGTH_VH}vh` }} className="relative">
      <HeroSection />
    </div>
  );
}
