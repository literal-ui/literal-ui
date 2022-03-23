const withTM = require('next-transpile-modules')(['@literal-ui/core'])

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withTM({
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
})
