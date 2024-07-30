export function log(...o: any[]) {
  console.log(...o, '\n_____\n')
}

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export function isEmptyObject(obj: object | null | undefined): boolean {
  return (
    obj !== null &&
    obj !== undefined &&
    Object.keys(obj).length === 0 &&
    obj.constructor === Object
  )
}

export type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? K | `${K}.${NestedKeys<T[K]>}`
          : K
        : never
    }[keyof T]
  : never

export function get<T extends Record<string, any>>(
  obj: T,
  path: NestedKeys<T>,
): T {
  const keys = path.split('.')

  return keys.reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : undefined
  }, obj)
}

// export function flattenObjectKeys(
//   obj: Record<string, any>,
//   prefix = '',
// ): string[] {
//   return Object.keys(obj).reduce((acc: string[], key) => {
//     const prefixedKey = prefix ? `${prefix}.${key}` : key

//     // found nested object
//     if (obj[key] !== null && typeof obj[key] === 'object') {
//       acc.push(prefixedKey)
//       // recursion
//       return acc.concat(flattenObjectKeys(obj[key], prefixedKey))
//     }

//     // primitive
//     return acc.concat(prefixedKey)
//   }, [])
// }
