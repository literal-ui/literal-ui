module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{tsx,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('m3-tokens/tailwind'), require('./plugin')],
}
