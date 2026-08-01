import type { FadeRange } from "@/lib/utils/fade";

export const HERO_COPY = {
  eyebrow: "Atelier Form",
  headline: "Form Out of Void",
} as const;

/** Hero holds briefly then fades out well before Act 2's structure
 *  keyframes (progress 0.25) take over the camera/lighting. */
export const HERO_FADE_RANGE: FadeRange = {
  in: [0, 0.05],
  out: [0.12, 0.2],
};
