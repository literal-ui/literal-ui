import { useState } from 'react'

import { Maybe, MayCallable } from './types'
import { useEventListener } from './useEventListener'

export function useHover<T extends EventTarget>(target: MayCallable<Maybe<T>>) {
  const [hovered, setHovered] = useState(false)

  useEventListener(target, 'mouseenter', () => {
    setHovered(true)
  })

  useEventListener(target, 'mouseleave', () => {
    setHovered(false)
  })

  return hovered
}
