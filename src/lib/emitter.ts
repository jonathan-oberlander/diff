type Handler = (...args: any[]) => void
type EventRecord = Record<string, Handler>
type EventName<T extends EventRecord> = keyof T & string

export class Emitter<T extends EventRecord> {
  map: Record<string, Handler[]> = {}

  on<E extends EventName<T>>(event: E, handler: T[E]) {
    if (!this.map[event]) {
      this.map[event] = [handler]
    } else {
      this.map[event].push(handler)
    }
  }

  once<E extends EventName<T>>(event: E, handler: T[E]) {
    const wrapper = (...args: Parameters<T[E]>) => {
      handler(...args)
      this.off(event, wrapper as T[E])
    }

    this.on(event, wrapper as T[E])
  }

  off<E extends EventName<T>>(event: E, handler: T[E]) {
    if (this.map[event]) {
      this.map[event] = this.map[event].filter(fn => fn !== handler)
    }
  }

  emit<E extends EventName<T>>(event: E, ...args: Parameters<T[E]>) {
    if (this.map[event]) {
      for (const fn of this.map[event]) {
        fn(...args)
      }
    }
  }
}

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

emitter.emit('error', new Error('Boom 💣💣💣 !!!'))
emitter.emit('error', new Error('Boom 💣💣💣 !!!'))
