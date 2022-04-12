import { useState } from 'react'

import { Listenable, MayCallable } from './types'
import { useEventListener } from './useEventListener'

export function useHover<L extends Listenable>(
  listenable: MayCallable<L | undefined | null>,
) {
  const [hovered, setHovered] = useState(false)

  useEventListener(listenable, 'mouseenter', () => {
    setHovered(true)
  })

  useEventListener(listenable, 'mouseleave', () => {
    setHovered(false)
  })

  return hovered
}
