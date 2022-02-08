import LRUCache from "lru-cache"

type Cache<TArg1, TReturnType> = {
  get: (arg1: TArg1) => TReturnType | undefined
  set: (arg1: TArg1, returnValue: TReturnType) => void
}

type CreateCache = <TArg1, TReturnType>() => Cache<TArg1, TReturnType>

const createMemo = (createCache: CreateCache) => {
  return <TArg1, TReturnType>(fn: (arg1: TArg1) => TReturnType): typeof fn => {
    const cache = createCache<TArg1, TReturnType>()

    return (arg1: TArg1): TReturnType => {
      let cached = cache.get(arg1)

      if (!cached) {
        cached = fn(arg1)
        cache.set(arg1, cached)
      }

      return cached
    }
  }
}

export const memo = createMemo(
  <TArg1, TReturnType>() => new LRUCache<TArg1, TReturnType>(64),
)
