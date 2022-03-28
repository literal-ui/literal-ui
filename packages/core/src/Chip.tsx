import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementType } from 'react'
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
  return (
    <Renderer
      className={clsx(
        'typescale-label-large relative overflow-hidden rounded-lg px-4 py-1.5',
        (Icon || TrailingIcon) && 'inline-flex items-center',
        selected
          ? 'text-on-secondary-container bg-secondary-container'
          : clsx(
              'text-on-surface-variant',
              elevated || clsx('bg-surface', classes.outlined),
            ),
        elevated && 'shadow-1',
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

export type InputChipOwnProps = Pick<
  ChipOwnProps,
  'selected' | 'onDelete' | 'Icon'
>
export type InputChipProps = ComponentPropsWithoutRef<'button'> &
  InputChipOwnProps
export const InputChip: React.FC<InputChipProps> = ({ ...props }) => {
  return <Chip className="px-3" {...props} />
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
