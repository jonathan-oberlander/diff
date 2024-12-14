export function map<T, R>(fn: (arg: T) => R, [head, ...tail]: T[]): R[] {
  return head === undefined ? [] : [fn(head), ...map(fn, tail)]
}

export function filter<T>(
  pred: (arg: T) => boolean,
  [head, ...tail]: T[],
): T[] {
  return head === undefined
    ? []
    : pred(head)
      ? [head, ...filter(pred, tail)]
      : [...filter(pred, tail)]
}

export function reduce<T, A>(
  fn: (acc: A, arg: T) => A,
  acc: A,
  [head, ...tail]: T[],
): A {
  return head === undefined ? acc : reduce(fn, fn(acc, head), tail)
}
