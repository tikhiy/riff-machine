import { IFraction } from "./types"
import { isObject } from "./isObject"

export class Fraction {
  static isFraction = <T>(value: T | IFraction): value is IFraction =>
    isObject(value) &&
    typeof (value as IFraction).d === "number" &&
    typeof (value as IFraction).n === "number"

  static identity = (): IFraction => Fraction.from(1, 1)

  static from = (n: number = 0, d: number = 0): IFraction => ({
    d,
    n,
  })

  static multiply = (
    returnValue: IFraction,
    a: IFraction,
    b: IFraction,
  ): IFraction => {
    returnValue.d = a.d * b.d
    returnValue.n = a.n * b.n

    return returnValue
  }

  static normalize = (fraction: IFraction): IFraction =>
    Fraction.from(1, fraction.d / fraction.n)

  static valueOf = (fraction: IFraction): number => fraction.n / fraction.d
}
