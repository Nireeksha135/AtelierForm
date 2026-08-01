/**
 * Total scrollable length of the experience, in viewport-heights.
 * 100vh per Act x 5 Acts, as a starting baseline — every Act gets equal
 * scroll real-estate for now. Will likely need re-tuning once real
 * content density is authored (Act 2's assembly sequence in particular
 * probably needs more room than Act 1's hold-on-headline moment), but
 * this is the one place that number lives.
 */
export const JOURNEY_LENGTH_VH = 500;
