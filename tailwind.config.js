/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.html',
      './src/**/*.vue',
      './src/**/*.jsx',
      // Add more file paths if necessary
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
