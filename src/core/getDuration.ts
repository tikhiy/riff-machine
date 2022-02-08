import { Fraction } from "./Fraction"
import { IFraction, INode } from "./types"

export const getDuration = <T>(node: INode<T>): IFraction =>
  node.reduce<IFraction>((previousValue, { value }) => {
    // FIXME: something weird is going on here
    const fraction = typeof value === "number" ? Fraction.from(value, 1) : value

    return Fraction.isFraction(fraction)
      ? Fraction.multiply(previousValue, previousValue, fraction)
      : previousValue
  }, Fraction.identity())
