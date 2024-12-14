type AnyFunction = (...args: any[]) => any

interface MemoizedFunction<T extends AnyFunction> extends CallableFunction {
  (...args: Parameters<T>): Promise<ReturnType<T>>
  clear: () => void
}

export function swr<T extends AnyFunction>(
  fn: T,
  maxAge = Number.POSITIVE_INFINITY,
): MemoizedFunction<T> {
  const cache = new Map<string, { value: ReturnType<T>; timestamp: number }>()

  const memoizedFunction: MemoizedFunction<T> = async (
    ...args: Parameters<T>
  ): Promise<ReturnType<T>> => {
    const key = JSON.stringify(args)
    const now = Date.now()

    if (cache.has(key)) {
      const cached = cache.get(key)!

      // if the cache value is still fresh, return it immediately
      if (now - cached.timestamp < maxAge) {
        return cached.value
      }

      //   // if the cache value is stale, return it but refresh in the background
      //   setTimeout(() => {
      //     fn(...args).then((newValue: any) => {
      //       cache.set(key, { value: newValue, timestamp: Date.now() })
      //     })
      //   }, 0)

      //   return cached.value
    }

    // if not in cache, compute the value
    const result = await fn(...args)
    cache.set(key, { value: result, timestamp: now })
    return result
  }

  memoizedFunction.clear = () => {
    cache.clear()
  }

  return memoizedFunction
}
