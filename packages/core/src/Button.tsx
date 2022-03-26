import clsx from 'clsx'
import { ElementType } from 'react'
import { IconType } from 'react-icons'
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md'

import { useColorScheme } from '@literal-ui/hooks'

import { StateLayer } from './StateLayer'
import { WithRenderAs } from './types'

const variantMap = {
  filled: ['px-6 py-2.5', 'bg-primary text-on-primary', 'bg-disabled'],
  outlined: ['px-6 py-2.5', 'text-primary outlined'],
  text: ['px-3 py-2.5', 'text-primary'],
  elevated: [
    'px-6 py-2.5',
    'bg-surface1 text-primary shadow-1',
    'shadow-none bg-none bg-disabled',
  ],
  tonal: [
    'px-6 py-2.5',
    'bg-secondary-container text-on-secondary-container',
    'bg-disabled',
  ],
}

export type ButtonProps<T> = WithRenderAs<T> & {
  variant: keyof typeof variantMap
  Icon?: IconType
}
export function Button<T extends ElementType = 'button'>({
  renderAs,
  children,
  className,
  variant,
  Icon,
  ...restProps
}: ButtonProps<T>) {
  const Renderer = renderAs || 'button'
  const { disabled } = restProps
  const [commonStyle, enabledStyle, disabledStyle] = variantMap[variant]

  return (
    <Renderer
      className={clsx(
        'typescale-label-large relative flex items-center justify-center overflow-hidden rounded-full',
        commonStyle,
        disabled ? clsx('text-on-disabled', disabledStyle) : enabledStyle,
        className,
      )}
      {...restProps}
    >
      {disabled || <StateLayer />}
      {Icon ? <Icon size={18} className="mr-2" /> : null}
      {children}
    </Renderer>
  )
}

export type IconButtonProps<T> = WithRenderAs<T> & {
  Icon?: IconType
}
export function IconButton<T extends ElementType = 'button'>({
  renderAs,
  className,
  Icon,
  ...restProps
}: IconButtonProps<T>) {
  const Renderer = renderAs || 'button'
  const { disabled } = restProps

  return (
    <Renderer
      className={clsx(
        'relative overflow-hidden rounded-full p-2',
        disabled ? 'text-on-disabled' : 'text-on-surface-variant',
        className,
      )}
      {...restProps}
    >
      {disabled || <StateLayer />}
      {Icon ? <Icon size={24} /> : null}
    </Renderer>
  )
}

export const ColorScheme: React.FC = () => {
  const { toggle } = useColorScheme()

  return (
    <>
      <IconButton
        Icon={MdOutlineDarkMode}
        onClick={toggle}
        className="hidden dark:flex"
      />
      <IconButton
        Icon={MdOutlineLightMode}
        onClick={toggle}
        className="dark:hidden"
      />
    </>
  )
}
