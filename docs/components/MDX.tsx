import clsx from 'clsx'
import { ComponentProps } from 'react'

interface HeadingProps extends ComponentProps<'h1'> {
  renderAs?: 'h1' | 'h2' | 'h3'
}
function Heading({ renderAs, ...props }: HeadingProps) {
  const Renderer = renderAs || 'h1'
  return <Renderer {...props} />
}

export function H1({ className, ...props }: HeadingProps) {
  return (
    <Heading
      renderAs="h1"
      className={clsx('typescale-headline-medium mt-6', className)}
      {...props}
    />
  )
}

export function H2({ className, ...props }: HeadingProps) {
  return (
    <Heading
      renderAs="h2"
      className={clsx('typescale-title-large mt-12', className)}
      {...props}
    />
  )
}
