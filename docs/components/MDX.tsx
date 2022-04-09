import clsx from 'clsx'
import { NextSeo } from 'next-seo'
import React, { ComponentProps } from 'react'

interface HeadingProps extends ComponentProps<'h1'> {
  as?: 'h1' | 'h2' | 'h3'
}
function Heading({ as, ...props }: HeadingProps) {
  const Renderer = as || 'h1'
  return <Renderer {...props} />
}

export function H1({ className, ...props }: HeadingProps) {
  return (
    <Heading
      as="h1"
      className={clsx('typescale-headline-medium mt-6', className)}
      {...props}
    />
  )
}

export function H2({ className, ...props }: HeadingProps) {
  return (
    <Heading
      as="h2"
      className={clsx('typescale-title-large mt-12', className)}
      {...props}
    />
  )
}

type Meta = { title?: string; desc?: string }
export function withLayout({ title, desc }: Meta) {
  return function Layout({ children }) {
    return (
      <>
        <NextSeo title={`${title} - Literal UI`} description={desc} />
        <article>{children}</article>
      </>
    )
  } as React.FC
}

export function Demo({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'relative my-4 flex flex-wrap justify-center gap-4',
        className,
      )}
      {...props}
    />
  )
}

export function Screen({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'shadow-1 relative z-0 mx-auto my-4 h-80 min-w-min max-w-xl resize overflow-y-scroll',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
