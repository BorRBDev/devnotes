/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2E6DB5',
          dark: '#1F3C6E',
        },
      },
    },
  },
  plugins: [],
}
