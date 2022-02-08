import { Unit } from "tone"

export interface IFraction {
  d: number
  n: number
}

export interface INode<T> {
  children: INode<unknown>[]
  parent?: INode<unknown> | undefined
  value: T

  append(child: INode<T> | INode<unknown>): this
  deepest(): Generator<INode<unknown>>
  emplace<U = T>(value: U): INode<U>

  filter(
    predicate: (
      value: INode<unknown>,
      index: number,
      object: INode<T>,
    ) => boolean,
  ): Generator<INode<unknown>>

  filter<S>(
    predicate: (
      value: INode<unknown>,
      index: number,
      object: INode<T>,
    ) => value is INode<S>,
  ): Generator<INode<S>>

  reduce<U>(
    callback: (
      previousValue: U,
      currentValue: INode<unknown>,
      currentIndex: number,
      object: INode<T>,
    ) => U,
    initialValue: U,
  ): U

  remove(): this
}

export type Note = Unit.Note
