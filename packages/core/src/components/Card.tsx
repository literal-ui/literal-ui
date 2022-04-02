import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

import { classes } from '../classes'
import { keys } from '../utils'

import { StateLayer } from './StateLayer'

const variantMap = {
  elevated: 'bg-surface shadow-1',
  filled: 'bg-surface-variant',
  outlined: clsx('bg-surface', classes.outlined),
}

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  variant: keyof typeof variantMap
}
export function Card({ className, variant, children, ...props }: CardProps) {
  const interactive = !!props.onClick
  return (
    <div
      className={clsx(
        'rounded-xl p-4',
        variantMap[variant],
        interactive && 'relative cursor-pointer overflow-hidden',
        className,
      )}
      {...props}
    >
      {interactive && <StateLayer />}
      {children}
    </div>
  )
}
Card.variants = keys(variantMap)
