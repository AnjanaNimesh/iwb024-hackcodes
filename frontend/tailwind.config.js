/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBrown: '#AF8F6F',
        customCream:'#F8F4E1'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}