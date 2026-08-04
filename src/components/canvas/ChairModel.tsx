"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CHAIR_PARTS } from "@/lib/constants/chairParts";
import { getProgress } from "@/lib/stores/journeyProgress";
import { easeOutCubic } from "@/lib/utils/easing";

const WOOD_COLOR = "#6b4a30";

/**
 * Renders the placeholder chair as discrete, independently-animated
 * parts (see CHAIR_PARTS). Each part's position/rotation is driven
 * directly by an eased local progress window — no additional damping
 * layered on top, since scroll input is already smoothed upstream by
 * Lenis. Stacking a second smoothing system here would just make
 * assembly feel mushy instead of weighted.
 *
 * Unlike CameraRig/LightingManager (which lerp toward a moving target
 * forever), parts must fully *reach* their assembled transform and
 * stay there — so this uses direct eased interpolation against a
 * clamped local t, not exponential decay.
 */
export function ChairModel() {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(() => {
    const progress = getProgress();

    CHAIR_PARTS.forEach((part, index) => {
      const mesh = meshRefs.current[index];
      if (!mesh) return;

      const [start, end] = part.assembleRange;
      const localT = (progress - start) / (end - start || 1);
      const eased = easeOutCubic(localT);

      mesh.position.set(
        THREE.MathUtils.lerp(part.scatterPosition[0], part.assembledPosition[0], eased),
        THREE.MathUtils.lerp(part.scatterPosition[1], part.assembledPosition[1], eased),
        THREE.MathUtils.lerp(part.scatterPosition[2], part.assembledPosition[2], eased),
      );

      mesh.rotation.set(
        THREE.MathUtils.lerp(part.scatterRotation[0], part.assembledRotation[0], eased),
        THREE.MathUtils.lerp(part.scatterRotation[1], part.assembledRotation[1], eased),
        THREE.MathUtils.lerp(part.scatterRotation[2], part.assembledRotation[2], eased),
      );
    });
  });

  return (
    <group>
      {CHAIR_PARTS.map((part, index) => (
        <mesh
          key={part.id}
          ref={(node) => {
            meshRefs.current[index] = node;
          }}
          position={part.scatterPosition}
          rotation={part.scatterRotation}
          castShadow
          receiveShadow
        >
          {part.geometry.type === "box" ? (
            <boxGeometry args={part.geometry.args} />
          ) : (
            <cylinderGeometry args={part.geometry.args} />
          )}
          <meshStandardMaterial color={WOOD_COLOR} roughness={0.7} metalness={0.05} />
        </mesh>
      ))}
    </group>
  );
}
