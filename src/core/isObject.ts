export const isObject = <T>(value: T | Object): value is Object =>
  value && typeof value === "object"
