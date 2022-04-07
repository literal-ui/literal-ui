import clsx from 'clsx'
import { ComponentProps, useEffect, useRef, useState } from 'react'
import { IconType } from 'react-icons'

const variants = ['filled', 'outlined'] as const

type TextFieldProps = ComponentProps<'input'> & {
  variant: typeof variants[number]
  name: string
  message?: string
  counter?: boolean
  Icon?: IconType
  error?: boolean
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
  error,
  ...props
}: TextFieldProps) {
  const [focused, setFocused] = useState(false)
  const [touched, setTouched] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (focused) setTouched(true)
  }, [focused])

  const { disabled, defaultValue, value } = props
  const _value = touched ? ref.current?.value : defaultValue || value
  // `defaultValue` and `value` maybe number (includes 0)
  const hasValue = !['', undefined].includes(_value as any)
  const shrink = focused || hasValue
  const filled = variant === 'filled'

  return (
    <div className={disabled ? 'text-on-disabled' : 'text-on-surface-variant'}>
      <div className="typescale-body-large group relative flex h-14 items-center">
        {Icon && <Icon size={20} className="absolute -z-10 ml-3" />}
        <label
          htmlFor={name}
          className={clsx(
            'pointer-events-none absolute select-none',
            'origin-top-left transition-all',
            {
              'left-12': Icon,
              'left-4': !Icon,
              'text-error': error,
              'text-primary': !error && focused,
              'top-4': !shrink,
              'scale-75': shrink,
              'top-2': shrink && filled,
              '-top-2 !left-4': shrink && !filled,
            },
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
            'h-full w-full rounded-t bg-transparent pr-4 focus:outline-none',
            {
              'pl-12': Icon,
              'pl-4': !Icon,
              'text-on-surface': !disabled,
              'pt-6 pb-2': filled,
              'hover:bg-on-surface/hover': filled && !disabled,
            },
            className,
          )}
          {...props}
        />
        {filled ? (
          <div
            className={clsx('absolute inset-0 -z-50', 'rounded-t', {
              'bg-disabled': disabled,
              'bg-surface-variant': !disabled,
              'border-b-2': focused,
              'border-b': !focused,
              'border-error': error,
              'border-primary': !error && focused,
              'border-on-disabled': !error && !focused && disabled,
              'border-on-surface': !error && !focused && !disabled,
            })}
          ></div>
        ) : (
          <fieldset
            className={clsx('absolute inset-0 -z-50', '-top-1 rounded px-2.5', {
              'border-2': focused,
              border: !focused,
              'border-error': error,
              'border-primary': !error && focused,
              'border-disabled': !error && !focused && disabled,
              'group-hover:border-on-surface border-outline':
                !error && !focused && !disabled,
            })}
          >
            <legend className="typescale-body-small h-2">
              <span className={clsx('px-1', shrink ? 'opacity-0' : 'hidden')}>
                {name}
              </span>
            </legend>
          </fieldset>
        )}
      </div>
      {(message || counter) && (
        <div className="typescale-body-small mt-1 flex justify-between px-4">
          <div className={clsx(error && 'text-error')}>{message}</div>
          <div>{counter}</div>
        </div>
      )}
    </div>
  )
}
TextField.variants = variants
