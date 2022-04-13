import clsx from 'clsx'
import { ElementType } from 'react'
import { IconType } from 'react-icons'

import { classes } from '../classes'
import { PolymorphicProps } from '../types'
import { keys } from '../utils'

import { StateLayer } from './StateLayer'

const variantMap = {
  filled: ['bg-primary text-on-primary', 'bg-disabled'],
  outlined: [`text-primary ${classes.outlined}`, classes.outlined],
  text: ['text-primary'],
  elevated: ['bg-surface1 text-primary shadow-1', 'bg-disabled'],
  tonal: ['bg-secondary-container text-on-secondary-container', 'bg-disabled'],
}

export type ButtonOwnProps = {
  variant: keyof typeof variantMap
  Icon?: IconType
}
export type ButtonProps<T extends ElementType> = PolymorphicProps<
  ButtonOwnProps,
  T
>
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
        'typescale-label-large relative select-none rounded-full py-2.5',
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

export type IconButtonOwnProps = {
  Icon?: IconType
}
export type IconButtonProps<T extends ElementType> = PolymorphicProps<
  IconButtonOwnProps,
  T
>

export function IconButton<T extends ElementType = 'button'>({
  as,
  className,
  Icon,
  ...props
}: IconButtonProps<T>) {
  const Renderer = as || 'button'

  return (
    <Renderer
      className={clsx(
        'relative rounded-full p-2',
        props.disabled ? 'text-on-disabled' : 'text-on-surface-variant',
        className,
      )}
      {...props}
    >
      {props.disabled || <StateLayer />}
      {Icon ? <Icon size={24} /> : null}
    </Renderer>
  )
}
