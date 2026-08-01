"use client";

import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Scene } from "./Scene";
import { CameraRig } from "./CameraRig";
import { ProgressDebugControls } from "@/components/dev/ProgressDebugControls";
import { CAMERA_SETTINGS, DPR_RANGE, VOID_BACKGROUND_COLOR } from "@/lib/constants/renderer";

/**
 * Mounts the WebGL canvas exactly once for the lifetime of the app (see
 * RootLayout). Sections must never render their own <Canvas> — they only
 * ever change what <Scene> renders, driven later by the master GSAP
 * timeline. This keeps a single WebGL context alive for the whole visit,
 * which is what makes the assembly → upholstery → lighting transitions
 * possible without a context loss / re-init flash between Acts.
 */
export function CanvasRoot() {
  // Adaptive pixel ratio: start at the high end, drop to the low end if
  // drei's PerformanceMonitor detects sustained frame drops (mobile/low-end
  // GPUs), and climb back up if performance recovers.
  const [dpr, setDpr] = useState<number>(DPR_RANGE[1]);

  return (
    <>
      {process.env.NODE_ENV === "development" && <ProgressDebugControls />}
      <div aria-hidden className="fixed inset-0 -z-10">
        <Canvas
          dpr={dpr}
          shadows
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          camera={{
            fov: CAMERA_SETTINGS.fov,
            near: CAMERA_SETTINGS.near,
            far: CAMERA_SETTINGS.far,
            position: CAMERA_SETTINGS.initialPosition,
          }}
        >
          <PerformanceMonitor
            onIncline={() => setDpr(DPR_RANGE[1])}
            onDecline={() => setDpr(DPR_RANGE[0])}
          />
          <color attach="background" args={[VOID_BACKGROUND_COLOR]} />
          <CameraRig />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
