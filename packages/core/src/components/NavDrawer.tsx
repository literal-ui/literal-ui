import clsx from 'clsx'
import React, {
  cloneElement,
  ComponentPropsWithoutRef,
  isValidElement,
  useEffect,
} from 'react'
import { MdMenuOpen, MdMenu } from 'react-icons/md'

import { useMediaQuery } from '@literal-ui/hooks'

import { IconButton } from './Button'
import { Divider } from './Divider'
import { Overlay } from './Overlay'
import { useLiteralConfig } from './Provider'
import { StateLayer } from './StateLayer'
import { WithDivider } from './WithDivider'

interface NavDrawerProps extends ComponentPropsWithoutRef<'nav'> {}
export const NavDrawer: React.FC<NavDrawerProps> & {
  Toggler: typeof Toggler
  Block: typeof Block
  Item: typeof Item
} = ({ className, children, ...props }) => {
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
          'bg-surface fixed top-16 z-20 w-60 px-7 sm:sticky',
          className,
        )}
        style={{ height: `calc(100vh - 64px)` }}
        {...props}
      >
        <WithDivider divider={<Divider className="my-4" />}>
          {children}
        </WithDivider>
      </nav>

      {open && sm === false && <Overlay onClick={toggle} />}
    </>
  )
}

interface BlockProps extends ComponentPropsWithoutRef<'div'> {
  headline?: string
}
export const Block: React.FC<BlockProps> = ({
  className,
  headline,
  children,
  ...props
}) => {
  return (
    <div className={clsx('text-on-surface-variant', className)} {...props}>
      {headline && <h1 className="typescale-title-small my-4">{headline}</h1>}
      <menu className="typescale-label-large -mx-4 space-y-1">{children}</menu>
    </div>
  )
}

interface ItemProps extends ComponentPropsWithoutRef<'li'> {
  active?: boolean
}
const Item: React.FC<ItemProps> = ({ children, active = false, ...props }) => {
  if (isValidElement(children)) {
    children = cloneElement(children, {
      ...children.props,
      className: clsx(
        children.props.className,
        'flex items-center h-10 px-6 relative overflow-hidden rounded-full',
        active && 'text-on-secondary-container bg-secondary-container',
      ),
      children: (
        <>
          <StateLayer /> {children.props.children}
        </>
      ),
    })
  }

  return <li {...props}>{children}</li>
}

const Toggler: React.FC = () => {
  const { nav } = useLiteralConfig()
  const { open, toggle } = nav ?? {}
  return <IconButton Icon={open ? MdMenuOpen : MdMenu} onClick={toggle} />
}

NavDrawer.Block = Block
NavDrawer.Item = Item
NavDrawer.Toggler = Toggler
