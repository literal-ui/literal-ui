import { Html, Head, Main, NextScript } from 'next/document'

import { PreventFlash } from '@literal-ui/core'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <PreventFlash />
      </body>
    </Html>
  )
}
