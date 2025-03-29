/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6D0F0F',
        secondary: '#D4A762',  
        tertiary: '#2E1A13',   
        'soft-white': '#F8F5F2',
        'dark-text': '#1A1A1A',
      },
      fontFamily: {
        sans: ['Montserrat', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}