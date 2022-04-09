import clsx from 'clsx'
import { cloneElement, ComponentPropsWithoutRef, isValidElement } from 'react'
import { IconType } from 'react-icons'

import { StateLayer } from './StateLayer'

interface NavBarProps extends ComponentPropsWithoutRef<'menu'> {}
export const NavBar: React.FC<NavBarProps> & {
  Item: typeof Item
} = ({ className, ...props }) => {
  return (
    <menu
      className={clsx('bg-surface sticky bottom-0 flex w-full', className)}
      {...props}
    />
  )
}

interface ItemProps extends ComponentPropsWithoutRef<'li'> {
  Icon: IconType
  active?: boolean
}
const Item: React.FC<ItemProps> = ({
  children,
  active = false,
  Icon,
  ...props
}) => {
  if (isValidElement(children)) {
    children = cloneElement(children, {
      ...children.props,
      className: clsx(
        children.props.className,
        'relative overflow-hidden flex flex-col items-center pt-3 pb-4 text-on-surface-variant',
      ),
      children: (
        <>
          <StateLayer />
          <div
            className={clsx(
              'flex h-8 w-16 items-center justify-center rounded-full',
              active && 'bg-secondary-container text-on-secondary-container',
            )}
          >
            <Icon size={24} />
          </div>

          {children.props.children && (
            <span
              className={clsx(
                'typescale-label-medium mt-1',
                active && 'text-on-surface',
              )}
            >
              {children.props.children}
            </span>
          )}
        </>
      ),
    })
  }

  return (
    <li className="flex-1" {...props}>
      {children}
    </li>
  )
}

NavBar.Item = Item
