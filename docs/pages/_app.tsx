import './styles.css'

import { MDXProvider } from '@mdx-js/react'
import type { MDXComponents } from 'mdx/types'
import type { AppProps } from 'next/app'

import { LiteralProvider } from '@literal-ui/core'

import { Demo, H1, H2, Layout } from '../components'

const components: MDXComponents = {
  h1: H1,
  h2: H2,
  Demo,
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LiteralProvider>
      <MDXProvider components={components}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </LiteralProvider>
  )
}
