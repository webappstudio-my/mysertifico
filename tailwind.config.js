// tailwind.config.js
import typography from '@tailwindcss/typography';
/** @type {import('tailwindcss').Config} */
export default { // Ensure 'export default' for Vite
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // <-- THIS MUST BE CORRECT AND COVER ALL YOUR .jsx FILES
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary': '#0d9488', // Teal-600
        'primary-dark': '#0f766e', // Teal-700
        'accent': '#f59e0b', // Amber-500
      }
    },
  },
  plugins: [
    typography
  ],
}