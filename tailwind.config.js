/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        white: '#FFFFFF',
        green: '#5CB264',
        red: '#B5121B',
        red100: '#BE555B',
        black: '#090818',
        orange: '#FB8430',
        gray: '#6B6666',
      },
    },
  },
  plugins: [],
};
