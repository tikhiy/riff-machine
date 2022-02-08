export const clamp = (value: number, lower: number, upper: number): number =>
  Math.max(Math.min(value, upper), lower)
