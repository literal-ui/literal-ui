const { join } = require('path')

/**
 * @type {import('rehype-pretty-code').Options}
 **/
const opts = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
}

const withTM = require('next-transpile-modules')([
  join(__dirname, '../packages/core'),
  join(__dirname, '../packages/hooks'),
  join(__dirname, '../packages/next'),
])

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withTM({
  reactStrictMode: true,
  pageExtensions: ['tsx', 'mdx'],
  webpack: (config, options) => {
    config.module.rules.push({
      test: /.mdx?$/, // load both .md and .mdx files
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [],
            rehypePlugins: [[require('rehype-pretty-code'), opts]],
            // If you use `MDXProvider`, uncomment the following line.
            providerImportSource: '@mdx-js/react',
          },
        },
        './plugins/mdx',
      ],
    })

    return config
  },
})
