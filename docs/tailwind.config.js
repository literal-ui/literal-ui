module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{tsx,ts,mdx}', '../packages/core/src/**/*.{tsx,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('m3-tokens/tailwind')({ source: '#00ff00' }),
    require('../packages/plugins'),
  ],
}
