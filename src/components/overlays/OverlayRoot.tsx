"use client";

import { useLenisScrollProgress } from "@/lib/hooks/useLenisScrollProgress";
import { JOURNEY_LENGTH_VH } from "@/lib/constants/journey";
import { HeroSection } from "./HeroSection";

/**
 * The scrollable HTML layer. Sits above the persistent canvas (z-10,
 * see RootLayout) and owns the page's real scrollable height — the
 * canvas itself never scrolls, it only ever reads progress. As Acts
 * 2-5 land, their overlay sections mount here alongside HeroSection.
 *
 * Scroll physics are provided by Lenis (see useLenisScrollProgress);
 * sections only ever consume `journeyProgress`, never the scroll
 * mechanism itself, so this is the only place that ever needed to
 * change when Lenis replaced the temporary native-scroll driver.
 */
export function OverlayRoot() {
  useLenisScrollProgress();

  return (
    <div style={{ height: `${JOURNEY_LENGTH_VH}vh` }} className="relative">
      <HeroSection />
    </div>
  );
}
