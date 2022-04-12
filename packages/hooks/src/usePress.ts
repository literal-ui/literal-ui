import { useState } from 'react'

import { Listenable, MayCallable } from './types'
import { useEventListener } from './useEventListener'

export function usePress<L extends Listenable>(
  listenable: MayCallable<L | undefined | null>,
) {
  const [pressed, setPressed] = useState(false)

  useEventListener(listenable, 'mousedown', () => {
    setPressed(true)
  })

  useEventListener(listenable, 'mouseup', () => {
    setPressed(false)
  })

  return pressed
}
