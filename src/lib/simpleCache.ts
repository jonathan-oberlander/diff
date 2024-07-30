import { log } from './helpers'

export class SimpleCache<Key, Value> {
  private cache: Map<Key, Value>
  private maxSize: number

  constructor(maxSize = 100) {
    this.cache = new Map<Key, Value>()
    this.maxSize = maxSize
  }

  set(key: Key, value: Value): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }

    this.cache.set(key, value)
  }

  get(key: Key): Value | undefined {
    return this.cache.get(key)
  }

  has(key: Key): boolean {
    return this.cache.has(key)
  }

  delete(key: Key): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }

  getAllEntries(): [Key, Value][] {
    return Array.from(this.cache.entries())
  }

  debug() {
    log('Cache:', JSON.stringify(this.getAllEntries(), null, 3))
  }
}
