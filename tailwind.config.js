/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060D1A',
          900: '#0B1A2E',
          800: '#0D2240',
          700: '#0F2A52',
          600: '#163366',
        },
        ivory: {
          50:  '#FDFAF4',
          100: '#F8F1E3',
          200: '#F2E6CC',
          300: '#EBD9B4',
        },
        gold: {
          300: '#E8C97A',
          400: '#D4AA50',
          500: '#C9A84C',
          600: '#B8922A',
          700: '#9A7820',
        },
        emerald: {
          800: '#1A4731',
          700: '#2D6A4F',
          600: '#40916C',
          500: '#52B788',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
