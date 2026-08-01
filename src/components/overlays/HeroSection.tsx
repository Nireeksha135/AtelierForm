"use client";

import { useJourneyProgress } from "@/lib/hooks/useJourneyProgress";
import { resolveFade } from "@/lib/utils/fade";
import { HERO_COPY, HERO_FADE_RANGE } from "@/lib/constants/copy";

/**
 * Act 1 overlay. Fixed full-viewport, not translated with scroll —
 * sections in this experience are pinned "scenes" that fade in/out as
 * progress moves through their window, rather than sliding off-screen
 * like a conventional page. `pointer-events-none` on the root because
 * this is pure narrative text with nothing clickable yet (Act 5's
 * customization controls will need pointer-events-auto locally).
 */
export function HeroSection() {
  const progress = useJourneyProgress();
  const opacity = resolveFade(progress, HERO_FADE_RANGE);

  return (
    <section
      className="pointer-events-none fixed inset-0 flex items-center justify-center"
      style={{ opacity }}
    >
      <div className="px-6 text-center">
        <p className="mb-4 font-sans text-xs uppercase tracking-widest text-ash">
          {HERO_COPY.eyebrow}
        </p>
        <h1 className="font-editorial text-5xl tracking-tightest text-studio md:text-7xl">
          {HERO_COPY.headline}
        </h1>
      </div>
    </section>
  );
}
