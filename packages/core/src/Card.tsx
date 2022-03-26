import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

const variantMap = {
  elevated: 'bg-surface shadow-1',
  filled: 'bg-surface-variant',
  outlined: 'bg-surface border border-outline',
}

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  variant: keyof typeof variantMap
}
export const Card: React.FC<CardProps> = ({ className, variant, ...props }) => {
  return (
    <div
      className={clsx(
        'bg-surface1 rounded-xl p-4',
        variantMap[variant],
        className,
      )}
      {...props}
    />
  )
}
