import clsx from 'clsx'
import { ComponentProps } from 'react'

export interface DividerProps extends ComponentProps<'hr'> {}
export const Divider: React.FC<DividerProps> = ({ className, ...props }) => {
  return <hr className={clsx('border-surface-variant', className)} {...props} />
}
