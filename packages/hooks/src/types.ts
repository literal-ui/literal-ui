export interface Listenable {
  addEventListener: (event: string, listener: (e: any) => void) => void
  removeEventListener: (event: string, listener: (e: any) => void) => void
}

export type MayCallable<T> = T | (() => T)
