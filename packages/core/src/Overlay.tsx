import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'packages/hooks/node_modules/@types/react'

interface OverlayProps extends ComponentPropsWithoutRef<'div'> {}

export const Overlay: React.FC<OverlayProps> = ({ className, ...props }) => {
  return (
    <div
      className={clsx('fixed inset-0 z-10 bg-black/40', className)}
      {...props}
    />
  )
}
