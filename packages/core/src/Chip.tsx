import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementType } from 'react'
import { IconType } from 'react-icons'
import { MdCheck } from 'react-icons/md'

import { StateLayer } from './StateLayer'
import { WithRenderAs } from './types'

export type ChipProps<T> = WithRenderAs<T> & {
  selected?: boolean
  elevated?: boolean
  Icon?: IconType
}

export function Chip<T extends ElementType = 'button'>({
  renderAs,
  children,
  selected = false,
  elevated = false,
  Icon,
  ...restProps
}: ChipProps<T>) {
  const Renderer = renderAs || 'button'
  return (
    <Renderer
      className={clsx(
        'typescale-label-large relative flex items-center overflow-hidden rounded-lg py-1.5 pr-4',
        selected
          ? 'text-on-secondary-container bg-secondary-container'
          : clsx('text-on-surface-variant', elevated || 'outlined'),
        elevated && 'shadow-1',
        Icon ? 'pl-2' : 'pl-4',
      )}
      {...restProps}
    >
      <StateLayer />
      {Icon && <Icon size={18} className="mr-2" />}
      {children}
    </Renderer>
  )
}

type FilterChipProps<T> = ChipProps<T> & {
  indicator?: boolean
}
export function FilterChip<T extends ElementType = 'button'>({
  Icon,
  indicator = false,
  ...props
}: FilterChipProps<T>) {
  const { selected } = props
  return <Chip Icon={selected && indicator ? MdCheck : Icon} {...props} />
}

interface SuggestiveChipProps extends ComponentPropsWithoutRef<'button'> {
  selected?: boolean
  elevated?: boolean
  Icon?: IconType
}
export const SuggestiveChip: React.FC<SuggestiveChipProps> = ({ ...props }) => {
  return <Chip {...props} />
}
