import clsx from 'clsx'
import React, { useEffect } from 'react'
import { ComponentPropsWithoutRef } from 'react'
import { MdMenuOpen, MdMenu } from 'react-icons/md'

import { useMediaQuery } from '@literal-ui/hooks'

import { IconButton } from './Button'
import { Overlay } from './Overlay'
import { useLiteralConfig } from './Provider'
import { StateLayer } from './StateLayer'

export const NavigationDrawerToggler: React.FC = () => {
  const { nav } = useLiteralConfig()
  const { open, toggle } = nav ?? {}
  return <IconButton Icon={open ? MdMenuOpen : MdMenu} onClick={toggle} />
}

interface NavigationDrawerProps extends ComponentPropsWithoutRef<'nav'> {}
export const NavigationDrawer: React.FC<NavigationDrawerProps> & {
  Item: React.FC<ItemProps>
} = ({ children, className, ...props }) => {
  const { nav } = useLiteralConfig()
  const { open, toggle } = nav ?? {}
  const sm = useMediaQuery('(min-width: 640px)')

  useEffect(() => {
    if (sm !== undefined) toggle?.(sm)
  }, [sm, toggle])

  return (
    <>
      <nav
        className={clsx(
          open === undefined ? 'hidden sm:block' : open ? 'block' : 'hidden',
          'bg-surface fixed top-16 z-20 float-left w-60 px-3 sm:sticky',
          className,
        )}
        style={{ height: `calc(100vh - 64px)` }}
        {...props}
      >
        <menu className="typescale-label-large text-on-surface-variant space-y-1">
          {children}
        </menu>
      </nav>

      {open && sm === false && <Overlay onClick={toggle} />}
    </>
  )
}

interface ItemProps extends ComponentPropsWithoutRef<'li'> {
  active?: boolean
}
const Item: React.FC<ItemProps> = ({
  children,
  active = false,
  className,
  ...props
}) => {
  if (React.isValidElement(children)) {
    children = React.cloneElement(children, {
      ...children.props,
      className: clsx(children.props.className, 'flex items-center h-12 px-6'),
      children: (
        <>
          <StateLayer /> {children.props.children}
        </>
      ),
    })
  }

  return (
    <li
      className={clsx(
        'relative overflow-hidden rounded-full',
        active && 'text-on-secondary-container bg-secondary-container',
        className,
      )}
      {...props}
    >
      {children}
    </li>
  )
}

NavigationDrawer.Item = Item
