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
  const disabled = props.disabled

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
              'text-primary': focused,
              'top-4': !hoist,
              'scale-75': hoist,
              'top-2': hoist && filled,
              '-top-2 !left-4': hoist && !filled,
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
              'border-primary border-b-2': focused,
              'border-b': !focused,
              'border-on-disabled': !focused && disabled,
              'border-on-surface': !focused && !disabled,
            })}
          ></div>
        ) : (
          <fieldset
            className={clsx('absolute inset-0 -z-50', '-top-1 rounded px-2.5', {
              'border-primary border-2': focused,
              border: !focused,
              'border-disabled': !focused && disabled,
              'group-hover:border-on-surface border-outline':
                !focused && !disabled,
            })}
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
