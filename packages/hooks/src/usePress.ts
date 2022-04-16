import { useState } from 'react'

import { Maybe, MayCallable } from './types'
import { useEventListener } from './useEventListener'

export function usePress<T extends EventTarget>(target: MayCallable<Maybe<T>>) {
  const [pressed, setPressed] = useState(false)

  useEventListener(target, 'mousedown', () => {
    setPressed(true)
  })

  useEventListener('mouseup', () => {
    setPressed(false)
  })

  return pressed
}
