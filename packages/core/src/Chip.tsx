import clsx from 'clsx'
import { ComponentProps, ElementType } from 'react'
import { IconType } from 'react-icons'
import { MdCheck, MdClose } from 'react-icons/md'

import { StateLayer } from './StateLayer'
import { classes } from './classes'
import { WithRenderAs } from './types'

type ChipOwnProps = {
  selected?: boolean
  elevated?: boolean
  Icon?: IconType
  onDelete?: () => void
}
type ChipProps<T> = WithRenderAs<T> & ChipOwnProps
function Chip<T extends ElementType = 'button'>({
  renderAs,
  children,
  selected = false,
  elevated = false,
  Icon,
  className,
  onDelete,
  ...props
}: ChipProps<T>) {
  const Renderer = renderAs || 'button'
  const TrailingIcon = onDelete ? MdClose : null
  const { disabled } = props
  const outlined = !selected && !elevated
  return (
    <Renderer
      className={clsx(
        'typescale-label-large relative select-none overflow-hidden rounded-lg px-4 py-1.5',
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
            className="absolute right-1 h-[26px] w-[26px] overflow-hidden rounded-full"
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

export type SuggestionChipProps = ComponentProps<'button'> &
  Pick<ChipOwnProps, 'selected' | 'elevated' | 'Icon'>
export const SuggestionChip: React.FC<SuggestionChipProps> = ({ ...props }) => {
  return <Chip {...props} />
}
