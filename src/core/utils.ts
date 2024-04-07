export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

export function toArray<T>(src: T | T[]) {
  return Array.isArray(src) ? src : [src]
}
