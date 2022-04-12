import clsx from 'clsx'
import { ComponentProps, ElementType } from 'react'
import { IconType } from 'react-icons'
import { MdCheck, MdClose } from 'react-icons/md'

import { classes } from '../classes'
import { WithAs } from '../types'

import { StateLayer } from './StateLayer'

type ChipOwnProps = {
  selected?: boolean
  elevated?: boolean
  Icon?: IconType
  onDelete?: () => void
}
type ChipProps<T> = WithAs<T> & ChipOwnProps
function Chip<T extends ElementType = 'button'>({
  as,
  children,
  selected = false,
  elevated = false,
  Icon,
  className,
  onDelete,
  ...props
}: ChipProps<T>) {
  const Renderer = as || 'button'
  const TrailingIcon = onDelete ? MdClose : null
  const { disabled } = props
  const outlined = !selected && !elevated
  return (
    <Renderer
      className={clsx(
        'typescale-label-large relative select-none rounded-lg px-4 py-1.5',
        (Icon || TrailingIcon) && 'inline-flex items-center',
        outlined && classes.outlined,
        disabled
          ? clsx('text-on-disabled', !outlined && 'bg-disabled')
          : {
              'text-on-surface-variant': !selected,
              'text-on-secondary-container bg-secondary-container': selected,
              'shadow-1': elevated,
            },
        className,
      )}
      {...props}
    >
      {props.disabled || <StateLayer />}
      {Icon && <Icon size={18} className="mr-2 -ml-1" />}
      <span>{children}</span>
      {TrailingIcon && (
        <>
          <TrailingIcon size={18} className="ml-2 -mr-1" />
          {/* Nested button is invalid, so use `span` instead. */}
          <span
            role="button"
            tabIndex={0}
            className="absolute right-1 h-[26px] w-[26px] rounded-full"
            onClick={onDelete}
          >
            <StateLayer />
          </span>
        </>
      )}
    </Renderer>
  )
}

export type InputChipProps = ComponentProps<'button'> &
  Pick<ChipOwnProps, 'selected' | 'onDelete' | 'Icon'>
export const InputChip: React.FC<InputChipProps> = ({ ...props }) => {
  return <Chip className="px-3" {...props} />
}

export type AssistChipProps = ComponentProps<'button'> &
  Pick<ChipOwnProps, 'elevated' | 'Icon'>
export const AssistChip: React.FC<AssistChipProps> = ({ ...props }) => {
  return <Chip {...props} />
}

export type FilterChipProps<T> = WithAs<T> &
  Pick<ChipOwnProps, 'selected' | 'elevated'>
export function FilterChip<T extends ElementType = 'button'>({
  ...props
}: FilterChipProps<T>) {
  const { selected } = props
  return <Chip Icon={selected ? MdCheck : undefined} {...props} />
}

export type SuggestionChipProps = ComponentProps<'button'> &
  Pick<ChipOwnProps, 'selected' | 'elevated' | 'Icon'>
export const SuggestionChip: React.FC<SuggestionChipProps> = ({ ...props }) => {
  return <Chip {...props} />
}
