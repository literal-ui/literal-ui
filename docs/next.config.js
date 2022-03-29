/**
 * @type {import('rehype-pretty-code').Options}
 **/
const opts = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
}

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [[require('rehype-pretty-code'), opts]],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: '@mdx-js/react',
  },
})
const withTM = require('next-transpile-modules')([
  '../packages/core',
  '../packages/hooks',
  '../packages/plugins',
])

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withMDX(
  withTM({
    reactStrictMode: true,
    pageExtensions: ['page.tsx', 'mdx'],
  }),
)
