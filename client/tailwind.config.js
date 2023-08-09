/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    letterSpacing: {
      1: '1px'
    },
    extend: {
      backgroundColor: {
        primary: '#36BFB6'
      },
      color: {
        primary: '#36BFB6'
      },
      borderColor: {
        primary: '#36BFB6',
        secondary: ' #DCE0E5'
      },
      colors: {
        brand: {
          50: '#EBF9FF',
          100: '#B3E7FF',
          200: '#66D0FF',
          500: '#00B0FF',
          DEFAULT: '#00B0FF',
          700: '#009EE6',
          800: '#008DCC'
        },
        black: '#000000',
        darkgrey: '#2D333A',
        mediumgrey: '#525B65',
        lightgrey: '#788494',
        offwhite: '#ECEEF1',
        white: '#FFFFFF'
      }
    }
  },
  plugins: []
};
