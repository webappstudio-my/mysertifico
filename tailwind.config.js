// tailwind.config.js
import typography from '@tailwindcss/typography';
/** @type {import('tailwindcss').Config} */
export default { // Ensure 'export default' for Vite
  darkMode: "selector", // Enable dark mode via class
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
        'primary-light': '#14b8a6', // Teal-500
        'primary-50': '#f0fdfa',
        'accent': '#f59e0b', // Amber-500

        // Back Office Colors
        'bo-bg-light': '#f8fafc',
        'bo-bg-dark': '#020617',
        'bo-surface-light': '#ffffff',
        'bo-surface-dark': '#1e293b',
      }
    },
  },
  plugins: [
    typography
  ],
}