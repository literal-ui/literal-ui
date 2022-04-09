import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { Merge } from 'type-fest'

// Extending HTML elements in React and TypeScript while preserving props
// See: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase#wrappingmirroring
export interface LinkProps
  extends Merge<ComponentPropsWithoutRef<'a'>, Omit<NextLinkProps, 'as'>> {}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  props,
  ref,
) {
  const {
    href,
    replace,
    scroll,
    shallow,
    passHref,
    prefetch,
    locale,
    children,
    className,
    ...anchorProps
  } = props

  const linkProps = {
    href,
    replace,
    scroll,
    shallow,
    passHref,
    prefetch,
    locale,
  }

  const external = typeof href === 'string' && href.startsWith('http')

  const propsForExternalLink = {
    target: '_blank',
    // https://web.dev/external-anchors-use-rel-noopener
    rel: 'noopener',
  }

  return (
    <NextLink {...linkProps}>
      <a
        ref={ref}
        className={className}
        {...(external && propsForExternalLink)}
        {...anchorProps}
      >
        {children}
      </a>
    </NextLink>
  )
})
