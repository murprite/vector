/** @type {import('tailwindcss').Config} */
export default {
  content: ['./pages/*.{html, js, vue}', './assets/**/*.{html,js,vue}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat"'],
        caveat: ['"Caveat"'],
      },
    },
  },
  plugins: [],
}

