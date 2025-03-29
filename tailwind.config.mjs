/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        'primary': "rgb(109, 15, 15)", // #6D0F0F in RGB
        'secondary': "rgb(231, 197, 131)", // #e7c583 in RGB (updated)
        'tertiary': "rgb(46, 26, 19)", // #2E1A13 in RGB
        "soft-white": "rgb(248, 245, 242)",
        "dark-text": "rgb(26, 26, 26)",
        "light-text": "rgb(248, 245, 242)",
      },
    },
  },
  plugins: [],
};

export default config;