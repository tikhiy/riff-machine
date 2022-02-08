import { INode } from "./types"

export class Node<T> implements INode<T> {
  children: INode<unknown>[] = []
  parent?: INode<unknown> | undefined

  constructor(public value: T) {}

  append<U = T>(child: INode<U>): this {
    if (!child.parent) {
      child.parent = this
      this.children.push(child)
    }

    return this
  }

  deepest(): Generator<INode<unknown>> {
    return this.filter((value) => value.children.length === 0)
  }

  emplace<U = T>(value: U): INode<U> {
    const child = new Node(value)

    this.append(child)

    return child
  }

  filter(
    predicate: (
      value: INode<unknown>,
      index: number,
      object: INode<T>,
    ) => boolean,
  ): Generator<INode<unknown>>

  *filter<S>(
    predicate: (
      value: INode<unknown>,
      index: number,
      object: INode<T>,
    ) => value is INode<S>,
  ): Generator<INode<S>> {
    const children: INode<unknown>[] = [this]

    while (children.length) {
      const child = children.shift()!

      if (predicate(child, 0, this)) {
        yield child
      }

      children.unshift(...child.children)
    }
  }

  reduce<U>(
    callback: (
      previousValue: U,
      currentValue: INode<unknown>,
      currentIndex: number,
      object: INode<T>,
    ) => U,
    initialValue: U,
  ): U {
    const ancestors: INode<unknown>[] = [this]
    let returnValue = initialValue

    for (let i = 0; i < ancestors.length; ++i) {
      const ancestor = ancestors[i]!
      const { parent } = ancestor

      returnValue = callback(returnValue, ancestor, i, this)

      if (parent) {
        ancestors.push(parent)
      }
    }

    return returnValue
  }

  remove(): this {
    if (this.parent) {
      this.parent.children = this.parent.children.filter(
        (value) => value !== this,
      )

      delete this.parent
    }

    return this
  }
}
