import plugin from 'tailwindcss/plugin'

export default plugin(function ({ addBase }) {
  addBase({
    '.ripple': {
      position: 'absolute',
      borderRadius: '50%',
      transform: 'scale(0)',
      backgroundColor: 'currentColor',
      pointerEvents: 'none',
      opacity: '0.24',
      animation: 'ripple 500ms linear',
    },
    '@keyframes ripple': {
      to: {
        transform: 'scale(4)',
        opacity: '0',
      },
    },
  })
})
