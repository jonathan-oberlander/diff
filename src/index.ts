import { Emitter } from './lib/emitter'
import { type NestedKeys, get, log } from './lib/helpers'
import * as F from './lib/recursions'
import { SimpleCache } from './lib/simpleCache'
import { personEvents, transactionEvents } from './mocks'

log('\ndiff________________________________________')

type Diff<T> = {
  [K in keyof T]: {
    previous: unknown
    current: unknown
  }
}

const NotFound = 'not_found'

function diff<T extends Record<string, unknown>>(
  [head, ...tail]: T[],
  fields: NestedKeys<T>[],
) {
  return fields.reduce(
    (acc, key) => {
      const found = tail.find(o => !!get(o, key))

      acc[key] = {
        current: get(head, key),
        previous: found ? get(found, key) : NotFound,
      }

      return acc
    },
    {} as Diff<T>,
  )
}

const cache = new SimpleCache<string, Record<string, string>>()

async function mockRequest(key: string) {
  const url = `service.io/diff?key=${key}`
  const data = cache.get(url)

  if (data) {
    return data
  }

  const response = await Promise.resolve({
    [key]: `service found the previous ${key} value`,
  })

  cache.set(url, response)

  return response
}

async function replaceNotFound<T extends Diff<T>>(_diff: T) {
  const diff = structuredClone(_diff)

  const promises = Object.entries(diff).map(async ([key, obj]) => {
    if ((obj as { previous: unknown }).previous === NotFound) {
      return await mockRequest(key)
    }
  })

  const responses = await Promise.all(promises)

  const acc = {} as Record<keyof typeof diff, string>

  for (const obj of responses) {
    obj && Object.assign(acc, obj)
  }

  for (const k in acc) {
    const key = k as keyof typeof diff

    diff[key] = {
      ...diff[key],
      previous: acc[key],
    }
  }

  return diff
}

const personDiff = diff(personEvents, [
  'description',
  'person.name',
  'person.age',
  'person.belongings',
])

cache.debug()
await replaceNotFound(personDiff)
cache.debug()
const finalPersonDiff = await replaceNotFound(personDiff)
cache.debug()

log(finalPersonDiff)

const transactionDiff = diff(transactionEvents, [
  'description',
  'transaction.balance',
  'transaction.details.reason',
])

cache.debug()
const finalTransactionDiff = await replaceNotFound(transactionDiff)
cache.debug()

log(finalTransactionDiff)

log('\nrecurse________________________________________')

const recurse = F.reduce(
  (acc, val) => acc + val,
  0,
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
)
const mapper = F.map(n => n * n, [1, 2, 3, 4, 5, 6, 7, 8, 9])
const filterer = F.filter(n => n <= 3, [1, 2, 3, 4, 5, 6, 7, 8, 9])

log(recurse)
log(mapper)
log(filterer)

log('\nemitter________________________________________')

type Events = {
  file_read: (file: string) => void
  found: (file: string, match: RegExp) => void
  error: (e: Error) => void
}

export const emitter = new Emitter<Events>()

const onFound: Events['found'] = (file, regex) =>
  console.log(`_found_ \nstring: ${file}\nregex: ${regex}\n`)

emitter.on('found', onFound)

emitter.emit('found', 'text coming from file A', /file/g)
emitter.emit('found', 'text coming from file B', /file/g)

emitter.off('found', onFound)

emitter.emit('found', 'text coming from file C', /file/g)

emitter.once('error', e => {
  console.error(e.message)
  process.exit()
})