import clsx from 'clsx'
import { useCallback, useRef } from 'react'

import { useEventListener, useHover, usePress } from '@literal-ui/hooks'

import { useLiteralContext } from './Provider'

export const StateLayer: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const parent = useCallback(() => ref.current?.parentElement, [])
  const { ripple: enabled } = useLiteralContext()

  const hovered = useHover(parent)
  const pressed = usePress(parent)

  useEventListener(
    parent,
    'mousedown',
    // https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/
    (e) => {
      if (!enabled) return

      e.stopPropagation()

      const parent = ref.current?.parentElement
      if (!parent) return

      const ripple = document.createElement('span')
      const diameter = Math.max(parent.clientWidth, parent.clientHeight)
      const radius = diameter / 2

      const { left, top } = parent.getBoundingClientRect()

      ripple.style.width = ripple.style.height = `${diameter}px`
      ripple.style.left = `${e.clientX - left - radius}px`
      ripple.style.top = `${e.clientY - top - radius}px`
      ripple.classList.add('ripple')

      ripple.addEventListener('animationend', () => {
        ripple.remove()
      })

      ref.current.appendChild(ripple)
    },
  )

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ borderRadius: 'inherit' }}
      ref={ref}
    >
      <div
        className={clsx(
          'absolute inset-0',
          'bg-current opacity-0',
          hovered && 'opacity-hover',
          pressed && 'opacity-pressed',
        )}
      />
    </div>
  )
}
