const withTM = require('next-transpile-modules')([
  '../packages/core',
  '../packages/hooks',
  '../packages/plugins',
])

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withTM({
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
})
