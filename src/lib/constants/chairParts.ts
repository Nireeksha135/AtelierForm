export type PartGeometry =
  | { type: "box"; args: [number, number, number] }
  | { type: "cylinder"; args: [number, number, number, number] }; // [radiusTop, radiusBottom, height, segments]

export interface ChairPart {
  id: string;
  geometry: PartGeometry;
  /** Floating/dispersed transform during Act 1 — "floating timber" in the void. */
  scatterPosition: [number, number, number];
  scatterRotation: [number, number, number];
  /** Final joined transform once assembly completes. */
  assembledPosition: [number, number, number];
  assembledRotation: [number, number, number];
  /** [start, end] on the GLOBAL journey progress (0-1) over which this
   *  part animates scatter -> assembled. Staggered per part (legs
   *  first, then seat, then backrest) so joinery reads as a sequence,
   *  not everything snapping into place at once. Ends by 0.25 to land
   *  exactly as the camera/lighting reach their Act 2 "Structure"
   *  keyframe (see CAMERA_KEYFRAMES / LIGHTING_KEYFRAMES). */
  assembleRange: [number, number];
}

const LEG_HEIGHT = 0.85;
const LEG_RADIUS = 0.035;
const LEG_Y = LEG_HEIGHT / 2;
const LEG_INSET = 0.35;

const SEAT_Y = LEG_HEIGHT + 0.03;
const BACKREST_Y = LEG_HEIGHT + 0.36;

/**
 * A procedural placeholder chair — six discrete parts rather than a
 * single imported mesh, specifically so each piece can independently
 * fly into place for the Act 2 assembly sequence. Standing in for a
 * real modeled/textured GLB asset; swap via drei's useGLTF once one
 * exists, without changing the assembly animation logic in ChairModel.
 */
export const CHAIR_PARTS: ChairPart[] = [
  {
    id: "leg-front-left",
    geometry: { type: "cylinder", args: [LEG_RADIUS, LEG_RADIUS, LEG_HEIGHT, 12] },
    scatterPosition: [-1.8, 1.6, 1.2],
    scatterRotation: [0.6, 0.3, 0.9],
    assembledPosition: [-LEG_INSET, LEG_Y, LEG_INSET],
    assembledRotation: [0, 0, 0],
    assembleRange: [0.02, 0.12],
  },
  {
    id: "leg-front-right",
    geometry: { type: "cylinder", args: [LEG_RADIUS, LEG_RADIUS, LEG_HEIGHT, 12] },
    scatterPosition: [1.7, 1.3, 1.4],
    scatterRotation: [-0.4, 0.8, 0.2],
    assembledPosition: [LEG_INSET, LEG_Y, LEG_INSET],
    assembledRotation: [0, 0, 0],
    assembleRange: [0.03, 0.13],
  },
  {
    id: "leg-back-left",
    geometry: { type: "cylinder", args: [LEG_RADIUS, LEG_RADIUS, LEG_HEIGHT, 12] },
    scatterPosition: [-1.5, 1.9, -1.3],
    scatterRotation: [0.9, -0.5, 0.4],
    assembledPosition: [-LEG_INSET, LEG_Y, -LEG_INSET],
    assembledRotation: [0, 0, 0],
    assembleRange: [0.02, 0.12],
  },
  {
    id: "leg-back-right",
    geometry: { type: "cylinder", args: [LEG_RADIUS, LEG_RADIUS, LEG_HEIGHT, 12] },
    scatterPosition: [1.9, 1.1, -1.6],
    scatterRotation: [-0.7, 0.6, -0.3],
    assembledPosition: [LEG_INSET, LEG_Y, -LEG_INSET],
    assembledRotation: [0, 0, 0],
    assembleRange: [0.03, 0.13],
  },
  {
    id: "seat",
    geometry: { type: "box", args: [0.85, 0.06, 0.85] },
    scatterPosition: [0.3, 2.4, -0.2],
    scatterRotation: [0.5, 0.4, 0.2],
    assembledPosition: [0, SEAT_Y, 0],
    assembledRotation: [0, 0, 0],
    assembleRange: [0.11, 0.19],
  },
  {
    id: "backrest",
    geometry: { type: "box", args: [0.85, 0.6, 0.06] },
    scatterPosition: [-0.4, 2.8, 0.5],
    scatterRotation: [-0.3, 0.7, 0.5],
    assembledPosition: [0, BACKREST_Y, -0.38],
    // Slight backward lean for comfort, not a flat panel.
    assembledRotation: [-0.15, 0, 0],
    assembleRange: [0.17, 0.25],
  },
];
