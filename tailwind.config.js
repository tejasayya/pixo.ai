/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rajdhani': 'Rajdhani, sans-serif', 
        'audiowide': 'Audiowide, sans-serif', 
      }
    },
  },
  plugins: [],
}