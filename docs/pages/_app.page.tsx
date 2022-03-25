import './styles.css'

import { AppProps } from 'next/app'

import { LiteralProvider } from '@literal-ui/core'

import { Layout } from './Layout'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LiteralProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LiteralProvider>
  )
}
