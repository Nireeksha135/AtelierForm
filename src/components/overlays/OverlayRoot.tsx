"use client";

import { useRef } from "react";
import { useLenisScroll } from "@/lib/hooks/useLenisScroll";
import { useMasterTimeline } from "@/lib/hooks/useMasterTimeline";
import { JOURNEY_LENGTH_VH } from "@/lib/constants/journey";
import { HeroSection } from "./HeroSection";

/**
 * The scrollable HTML layer. Sits above the persistent canvas (z-10,
 * see RootLayout) and owns the page's real scrollable height — the
 * canvas itself never scrolls, it only ever reads progress. As Acts
 * 2-5 land, their overlay sections mount here alongside HeroSection.
 *
 * useLenisScroll provides smooth-scroll physics; useMasterTimeline
 * (pinned to this component's own wrapper element) turns that scroll
 * into the single shared journeyProgress value. Sections only ever
 * consume journeyProgress, never either mechanism directly.
 */
export function OverlayRoot() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLenisScroll();
  useMasterTimeline(wrapperRef);

  return (
    <div ref={wrapperRef} style={{ height: `${JOURNEY_LENGTH_VH}vh` }} className="relative">
      <HeroSection />
    </div>
  );
}
