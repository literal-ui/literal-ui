import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'
import { IconType } from 'react-icons'
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md'

import { useColorScheme } from '@literal-ui/hooks'

import { StateLayer } from './StateLayer'

type Variant = keyof typeof variantMap

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant: Variant
  Icon?: IconType
}

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
  icon: ['p-2', 'text-on-surface-variant'],
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant,
  Icon,
  ...restProps
}) => {
  const isIcon = variant === 'icon'
  const { disabled } = restProps
  const [commonStyle, enabledStyle, disabledStyle] = variantMap[variant]

  return (
    <button
      className={clsx(
        'relative flex items-center justify-center overflow-hidden rounded-full',
        commonStyle,
        disabled ? clsx('text-on-disabled', disabledStyle) : enabledStyle,
        isIcon || 'typescale-label-large',
        className,
      )}
      {...restProps}
    >
      {disabled || <StateLayer />}
      {Icon ? (
        <Icon
          size={isIcon ? 24 : 18}
          className={clsx(isIcon || 'mr-2')}
          key={Icon.name}
        />
      ) : null}
      {children}
    </button>
  )
}

export interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  Icon?: IconType
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
  return <Button variant="icon" {...props} />
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