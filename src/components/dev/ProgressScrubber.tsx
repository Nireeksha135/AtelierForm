"use client";

import { useEffect, useState } from "react";
import { setProgress } from "@/lib/stores/journeyProgress";

/**
 * Dev-only manual progress scrubber. Replaces the old Leva panel —
 * Leva was a WebGL-era dependency with no remaining use once the 3D
 * scene was removed, so this is a plain <input type="range"> instead
 * of pulling in a UI library for one slider. Gated the same way the
 * Leva version was: dead-code-eliminated from production builds.
 */
export function ProgressScrubber() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setProgress(value);
  }, [value]);

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded bg-black/60 px-3 py-2 text-xs text-studio">
      <span>progress</span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.001}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      />
      <span>{value.toFixed(2)}</span>
    </div>
  );
}
