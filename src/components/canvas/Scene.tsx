"use client";

/**
 * The persistent 3D scene. This component's contents will grow across
 * Acts 1-5 (timber, joinery, upholstery, lighting transitions, pedestal)
 * but the component itself stays mounted for the entire experience —
 * only what it renders changes as the master timeline progresses.
 */
export function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={0.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Placeholder only — proves the persistent scene renders and
          receives light. Replaced by the timber/chair model when the
          GLB pipeline lands. */}
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4a3628" roughness={0.6} metalness={0.1} />
      </mesh>
    </>
  );
}
