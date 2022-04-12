import clsx from 'clsx'
import { ComponentProps } from 'react'
import { IconType } from 'react-icons'

import { withClassName } from '../utils'

import { Divider } from './Divider'
import { StateLayer } from './StateLayer'

interface MenuProps extends ComponentProps<'menu'> {}
export function Menu({ className, ...props }: MenuProps) {
  return (
    <menu
      className={clsx(
        'bg-surface shadow-2 typescale-label-large select-none rounded py-2',
        className,
      )}
      {...props}
    />
  )
}

interface ItemProps extends ComponentProps<'li'> {
  Icon?: IconType
  trailing?: string
}
const Item: React.FC<ItemProps> = ({
  className,
  Icon,
  trailing,
  children,
  ...props
}) => {
  return (
    <li className={clsx('relative', className)} {...props}>
      <StateLayer />
      <div
        className={clsx(
          'text-on-surface flex h-8 w-full items-center justify-between gap-4 px-3',
          className,
        )}
      >
        <div className="flex items-center">
          {Icon && <Icon size={24} className="text-on-surface-variant mr-3" />}
          {children}
        </div>
        {trailing && <div className="text-on-surface-variant">{trailing}</div>}
      </div>
    </li>
  )
}

Menu.Item = Item
Menu.Divider = withClassName(Divider, 'my-1')
