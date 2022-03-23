const withTM = require('next-transpile-modules')([
  '@literal-ui/core',
  '@literal-ui/hooks',
])

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withTM({
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
})
