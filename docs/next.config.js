const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
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
