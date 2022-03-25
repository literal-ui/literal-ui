import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

interface TopAppBarProps extends ComponentPropsWithoutRef<'header'> {}
export const TopAppBar: React.FC<TopAppBarProps> & {
  Leading: React.FC<LeadingProps>
  Title: React.FC<TitleProps>
  Trailing: React.FC<TrailingProps>
} = ({ className, ...props }) => {
  return (
    <header
      className={clsx(
        'bg-surface sticky top-0 z-30 flex h-16 items-center justify-between gap-6 px-4',
        className,
      )}
      {...props}
    />
  )
}

interface LeadingProps extends ComponentPropsWithoutRef<'div'> {}
const Leading: React.FC<LeadingProps> = ({ className, ...props }) => {
  return <div className={clsx('text-on-surface', className)} {...props} />
}

interface TitleProps extends ComponentPropsWithoutRef<'h1'> {}
const Title: React.FC<TitleProps> = ({ className, ...props }) => {
  return (
    <h1
      className={clsx('text-on-surface typescale-title-large', className)}
      {...props}
    />
  )
}

interface TrailingProps extends ComponentPropsWithoutRef<'div'> {}
const Trailing: React.FC<TrailingProps> = ({ className, ...props }) => {
  return (
    <div
      className={clsx('text-on-surface-variant flex gap-2', className)}
      {...props}
    />
  )
}

TopAppBar.Leading = Leading
TopAppBar.Title = Title
TopAppBar.Trailing = Trailing
