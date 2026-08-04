"use client";

import { useEffect, useRef } from "react";
import { useJourneyProgress } from "@/lib/hooks/useJourneyProgress";
import { resolveSequenceFrame } from "@/lib/sequence/resolveSequenceFrame";
import { drawPlaceholderFrame } from "@/lib/sequence/drawPlaceholderFrame";
import { MAX_CANVAS_DPR, TOTAL_FRAMES } from "@/lib/constants/sequence";

/**
 * Mounted once, for the life of the app (see RootLayout) — same
 * persistent-surface principle the old CanvasRoot followed, just with
 * a 2D canvas instead of a WebGL one. Redraws only when journeyProgress
 * actually changes (via useJourneyProgress + a plain useEffect), since
 * a static frame sequence has no need for a continuous render loop the
 * way an animated 3D scene did.
 *
 * Real photography swaps in at exactly one call site — see
 * drawPlaceholderFrame's doc comment.
 */
export function SequenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useJourneyProgress();

  // Resize handling: keep the canvas's backing store matched to the
  // viewport and a capped device pixel ratio, redrawing the current
  // frame afterward so a resize never leaves a stale/stretched frame.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_CANVAS_DPR);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = "100%";
      canvas!.style.height = "100%";
      const ctx = canvas!.getContext("2d");
      // setTransform (not scale) so repeated resize events don't
      // compound the DPR scale factor on top of itself.
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      render();
    }

    function render() {
      const ctx = canvas!.getContext("2d");
      if (!ctx) return;
      const width = canvas!.clientWidth;
      const height = canvas!.clientHeight;

      const { frameIndex, nextFrameIndex, blend } = resolveSequenceFrame(progress, TOTAL_FRAMES);

      drawPlaceholderFrame(ctx, width, height, frameIndex, TOTAL_FRAMES);
      if (blend > 0) {
        ctx.globalAlpha = blend;
        drawPlaceholderFrame(ctx, width, height, nextFrameIndex, TOTAL_FRAMES);
        ctx.globalAlpha = 1;
      }
    }

    resize();
    render();

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 h-full w-full"
    />
  );
}
