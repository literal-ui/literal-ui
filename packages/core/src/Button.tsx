import clsx from 'clsx'
import { ElementType } from 'react'
import { IconType } from 'react-icons'

import { StateLayer } from './StateLayer'
import { classes } from './classes'
import { WithRenderAs } from './types'

const variantMap = {
  filled: ['bg-primary text-on-primary', 'bg-disabled'],
  outlined: [`text-primary ${classes.outlined}`],
  text: ['text-primary'],
  elevated: [
    'bg-surface1 text-primary shadow-1',
    'shadow-none bg-none bg-disabled',
  ],
  tonal: ['bg-secondary-container text-on-secondary-container', 'bg-disabled'],
}

export type ButtonProps<T> = WithRenderAs<T> & {
  variant: keyof typeof variantMap
  Icon?: IconType
}
export function Button<T extends ElementType = 'button'>({
  renderAs,
  children,
  className,
  variant,
  Icon,
  ...props
}: ButtonProps<T>) {
  const Renderer = renderAs || 'button'
  const [enabledStyle, disabledStyle] = variantMap[variant]
  const isText = variant === 'text'

  return (
    <Renderer
      className={clsx(
        'typescale-label-large relative overflow-hidden rounded-full py-2.5',
        isText ? 'px-4' : 'px-6',
        Icon && 'inline-flex items-center',
        props.disabled ? clsx('text-on-disabled', disabledStyle) : enabledStyle,
        className,
      )}
      {...props}
    >
      {props.disabled || <StateLayer />}
      {Icon ? (
        <Icon size={18} className={clsx('mr-2', isText ? '-ml-1' : '-ml-2')} />
      ) : null}
      <span>{children}</span>
    </Renderer>
  )
}

export type IconButtonProps<T> = WithRenderAs<T> & {
  Icon?: IconType
}
export function IconButton<T extends ElementType = 'button'>({
  renderAs,
  className,
  Icon,
  ...restProps
}: IconButtonProps<T>) {
  const Renderer = renderAs || 'button'
  const { disabled } = restProps

  return (
    <Renderer
      className={clsx(
        'relative overflow-hidden rounded-full p-2',
        disabled ? 'text-on-disabled' : 'text-on-surface-variant',
        className,
      )}
      {...restProps}
    >
      {disabled || <StateLayer />}
      {Icon ? <Icon size={24} /> : null}
    </Renderer>
  )
}
