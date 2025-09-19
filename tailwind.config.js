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
        // MySertifico Colors Palette
        'primary': '#0d9488', // Teal-600
        'primary-dark': '#0f766e', // Teal-700
        'primary-light': '#14b8a6', // Teal-500
        'primary-50': '#f0fdfa',
        'accent': '#F97316', // Orange-500 like in html examples
        

        // Back Office Colors
        'bo-bg-light': '#f8fafc',
        'bo-bg-dark': '#020617',
        'bo-surface-light': '#ffffff',
        'bo-surface-dark': '#1e293b',

        // MyWall Colors
        // Palet Aqua Lautan & Oren Senja
        'primary-mywall': {
            'DEFAULT': '#14B8A6',       // Aqua Lautan (Teal-500)
            '50': '#f0fdfa',
            '100': '#ccfbf1',
            '200': '#99f6e4',
            '300': '#5eead4',
            '400': '#2dd4bf',
            '500': '#14b8a6',
            '600': '#0d9488',
            '700': '#0f766e',
            '800': '#115e59',
            '900': '#134E4A',    // Aqua Gelap (Teal-900)
        },
        'accent-mywall': {
            'DEFAULT': '#F97316',        // Oren Senja (Orange-500)
            'hover': '#EA580C',  // Oren Hangat untuk hover (Orange-600)
        },
        'dark-bg': '#134E4A',       // Aqua Sangat Gelap untuk footer (Teal-900)

        // Invoice Colors Palette
        'invoice': {
          'primary': '#0f766e', // Teal-700
          'dark': '#1f2937',    // Gray-800
          'medium': '#4b5563',  // Gray-600
          'light': '#f3f4f6',   // Gray-100
          'accent': '#F97316',
          'accent-hover': '#EA580C',
        }
      }
    },
  },
  plugins: [
    typography
  ],
}