const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './public/**/*.html',
    './public/**/*.css',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        primary: '#33404F',
        secondary: '#00E2A6',
        white: '#FFFFFF',
        black: '#001514',
      },
      fontFamily: {
        sans: [
          'Nunito',
          ...defaultTheme.fontFamily.sans,
        ]
      },
      screens: {
        ...defaultTheme.screens,
        '3xl': '1920px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
