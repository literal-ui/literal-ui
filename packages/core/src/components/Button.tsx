import clsx from 'clsx'
import { ElementType } from 'react'
import { IconType } from 'react-icons'

import { classes } from '../classes'
import { WithAs } from '../types'
import { keys } from '../utils'

import { StateLayer } from './StateLayer'

const variantMap = {
  filled: ['bg-primary text-on-primary', 'bg-disabled'],
  outlined: [`text-primary ${classes.outlined}`, classes.outlined],
  text: ['text-primary'],
  elevated: ['bg-surface1 text-primary shadow-1', 'bg-disabled'],
  tonal: ['bg-secondary-container text-on-secondary-container', 'bg-disabled'],
}

export type ButtonProps<T> = WithAs<T> & {
  variant: keyof typeof variantMap
  Icon?: IconType
}
export function Button<T extends ElementType = 'button'>({
  as,
  children,
  className,
  variant,
  Icon,
  ...props
}: ButtonProps<T>) {
  const Renderer = as || 'button'
  const [enabledStyle, disabledStyle] = variantMap[variant]
  const isText = variant === 'text'

  return (
    <Renderer
      className={clsx(
        'typescale-label-large relative select-none overflow-hidden rounded-full py-2.5',
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
Button.variants = keys(variantMap)

export type IconButtonProps<T> = WithAs<T> & {
  Icon?: IconType
}
export function IconButton<T extends ElementType = 'button'>({
  as,
  className,
  Icon,
  ...restProps
}: IconButtonProps<T>) {
  const Renderer = as || 'button'
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
