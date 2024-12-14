type Context = { [key: string]: unknown }
type RT<T extends unknown[], R> = (ctx: Context) => (...args: T) => R

const curry =
  <T extends unknown[], R>(fn: (ctx: Context, ...args: T) => R): RT<T, R> =>
  (ctx: Context) =>
  (...args: T) =>
    fn(ctx, ...args)

// Usage
const greet = (context: Context, name: string): string =>
  `Hello, ${name}! My name is ${context.name}.`

const context = { name: 'Alice' }
const greetWithContext = curry(greet)(context)

console.log(greetWithContext('Bob'))
