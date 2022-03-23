import clsx from 'clsx'
import { useRef } from 'react'

export const StateLayer: React.FC = () => {
  const ref = useRef<HTMLSpanElement>(null)

  return (
    <span ref={ref}>
      <span
        className={clsx(
          'hover:opacity-hover active:opacity-pressed absolute inset-0 bg-current opacity-0',
        )}
        // https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/
        onMouseDown={(e) => {
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
        }}
      ></span>
    </span>
  )
}
