// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: '#6D0F0F',
        secondary: '#D4A762',
        tertiary: '#2E1A13',
        'soft-white': '#F8F5F2',
        'dark-text': '#1A1A1A',
        'light-text': '#F8F5F2',
      },
    },
  },
  plugins: [],
};

export default config;