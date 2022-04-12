import { useRef, useEffect } from 'react'

import { Listenable, MayCallable } from './types'

export function useEventListener<
  EventMap extends {} = WindowEventMap,
  L extends Listenable = Listenable,
  K extends keyof EventMap & string = keyof EventMap & string,
>(
  listenable: MayCallable<L | undefined | null>,
  type: K,
  listener: (this: any, e: EventMap[K]) => void,
) {
  const listenerRef = useRef(listener)
  listenerRef.current = listener

  useEffect(() => {
    const _listener = (e: EventMap[K]) => listenerRef.current(e)
    const _listenable =
      typeof listenable === 'function' ? listenable() : listenable
    _listenable?.addEventListener(type, _listener)
    return () => _listenable?.removeEventListener(type, _listener)
  }, [listenable, type])
}
