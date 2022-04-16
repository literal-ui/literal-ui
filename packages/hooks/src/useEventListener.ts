import { useRef, useEffect } from 'react'

import { Maybe, MayCallable } from './types'

type Options = boolean | EventListenerOptions

export function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: any, e: WindowEventMap[K]) => void,
  options?: Options,
): void

export function useEventListener<
  EventMap extends {} = WindowEventMap,
  T extends EventTarget = EventTarget,
  K extends keyof EventMap = keyof EventMap,
>(
  target: MayCallable<Maybe<T>>,
  type: K,
  listener: (this: any, e: EventMap[K]) => void,
  options?: Options,
): void

export function useEventListener(...args: any[]) {
  let target: any
  let type: string
  let listener: any
  let options: any

  if (typeof args[0] === 'string') {
    ;[type, listener, options] = args
    target = globalThis
  } else {
    ;[target, type, listener, options] = args
  }

  const listenerRef = useRef(listener)
  listenerRef.current = listener

  useEffect(() => {
    const _listener = (e: any) => listenerRef.current(e)
    const _target = typeof target === 'function' ? target() : target
    _target?.addEventListener(type, _listener, options)
    return () => _target?.removeEventListener(type, _listener, options)
  }, [options, target, type])
}
