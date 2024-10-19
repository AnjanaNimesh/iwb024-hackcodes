/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#fff5f0",
        "secondary": "#ffcc81",
        "orange":" #ff6b00",
        "grey": "#979797",
        "dark": "#3c424c",
        "blue": "#1f3e72",
        "shadow": "0px 23px 21px -8px rgba(136, 160, 255, 0.25)"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}