import gsap from "gsap";
import { ACT_BREAKPOINTS, ACT_NAMES } from "@/lib/constants/acts";

/**
 * Abstract duration used purely so GSAP has a concrete timescale to
 * compute label positions against. Actual pacing is controlled
 * entirely by ScrollTrigger's scrub (see useMasterTimeline), never by
 * this number directly.
 */
const TIMELINE_DURATION = 100;

let timelineInstance: gsap.core.Timeline | null = null;

/**
 * The single master timeline every scroll-linked animation attaches
 * to — per the brief, "everything should share one animation state."
 * Lazily created and cached: every call returns the same instance, so
 * ScrollTrigger and every future Act's tweens are all scrubbing/
 * animating the exact same timeline object rather than independent
 * ones that happen to be driven by the same progress number.
 */
export function getMasterTimeline(): gsap.core.Timeline {
  if (timelineInstance) return timelineInstance;

  timelineInstance = gsap.timeline({ paused: true });

  ACT_NAMES.forEach((name, index) => {
    timelineInstance!.addLabel(name, ACT_BREAKPOINTS[index] * TIMELINE_DURATION);
  });

  // A no-op tween spanning the full duration keeps the timeline's
  // internal length equal to TIMELINE_DURATION even before any Act
  // has added its own tweens — without this, the final label would sit
  // past the timeline's actual end and .progress() could never reach 1.
  timelineInstance.to({}, { duration: TIMELINE_DURATION });

  return timelineInstance;
}
