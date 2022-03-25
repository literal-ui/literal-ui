import { useRef, useEffect } from 'react'

interface Listenable {
  addEventListener: (event: string, listener: (e: any) => void) => void
  removeEventListener: (event: string, listener: (e: any) => void) => void
}

export function useEventListener<
  EventMap extends {} = WindowEventMap,
  L extends Listenable = Listenable,
  K extends keyof EventMap & string = keyof EventMap & string,
>(
  listenable: L | undefined,
  type: K,
  listener: (this: any, e: EventMap[K]) => void,
) {
  const listenerRef = useRef(listener)
  listenerRef.current = listener

  useEffect(() => {
    const _listener = (e: EventMap[K]) => listenerRef.current(e)
    listenable?.addEventListener(type, _listener)
    return () => listenable?.removeEventListener(type, _listener)
  }, [listenable, type])
}
