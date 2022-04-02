import clsx from 'clsx'
import { ComponentProps, useRef, useState } from 'react'
import { IconType } from 'react-icons'

const variants = ['filled', 'outlined'] as const

type TextFieldProps = ComponentProps<'input'> & {
  variant: typeof variants[number]
  name: string
  message?: string
  counter?: boolean
  Icon?: IconType
}
export function TextField({
  variant,
  Icon,
  className,
  name,
  message,
  counter,
  onFocus,
  onBlur,
  ...props
}: TextFieldProps) {
  const [focused, setFocused] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  const hoist = focused || ref.current?.value || props.defaultValue
  const filled = variant === 'filled'

  return (
    <div className="text-on-surface-variant">
      <div className="typescale-body-large group relative flex h-14 items-center">
        {Icon && <Icon size={20} className="absolute -z-10 ml-3" />}
        <label
          htmlFor={name}
          className={clsx(
            'pointer-events-none absolute origin-top-left select-none transition-all',
            Icon ? 'left-12' : 'left-4',
            focused && 'text-primary',
            hoist
              ? clsx('scale-75', filled ? 'top-2' : '-top-2 !left-4')
              : 'top-4',
          )}
        >
          {name}
        </label>
        <input
          type="text"
          id={name}
          name={name}
          ref={ref}
          onFocus={(e) => {
            setFocused(true)
            onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            onBlur?.(e)
          }}
          className={clsx(
            'text-on-surface h-full w-full rounded-t bg-transparent pr-4 focus:outline-none',
            Icon ? 'pl-12' : 'pl-4',
            filled && 'hover:bg-on-surface/hover pt-6 pb-2',
            className,
          )}
          {...props}
        />
        {filled ? (
          <div
            className={clsx(
              'absolute inset-0 -z-50',
              'bg-surface-variant rounded-t',
              focused
                ? 'border-primary border-b-2'
                : 'border-on-surface border-b',
            )}
          ></div>
        ) : (
          <fieldset
            className={clsx(
              'absolute inset-0 -z-50',
              '-top-1 rounded px-2.5',
              focused
                ? 'border-primary border-2'
                : 'group-hover:border-on-surface border-outline border',
            )}
          >
            <legend className="typescale-body-small h-2">
              <span className={clsx('px-1', hoist ? 'opacity-0' : 'hidden')}>
                {name}
              </span>
            </legend>
          </fieldset>
        )}
      </div>
      {(message || counter) && (
        <div className="typescale-body-small mt-1 flex justify-between px-4">
          <div>{message}</div>
          <div>{counter}</div>
        </div>
      )}
    </div>
  )
}
TextField.variants = variants
