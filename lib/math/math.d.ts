export interface Bounds {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const areOverlapping: (a: Bounds, b: Bounds) => boolean;
