/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5f0',
          100: '#f4e8dc',
          200: '#e8d0b8',
          300: '#dab28f',
          400: '#ca8f64',
          500: '#bf7548',
          600: '#b1603d',
          700: '#934c34',
          800: '#773f31',
          900: '#61362a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
