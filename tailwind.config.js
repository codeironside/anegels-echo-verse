/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'midnight': '#1A1A2E',
        'parchment': '#EAD7C1',
        'antique-gold': '#C6A969',
        'blood-crimson': '#8A0303',
        'cream': '#FAF3E0',
        'inkwell': '#3E3E3E',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};