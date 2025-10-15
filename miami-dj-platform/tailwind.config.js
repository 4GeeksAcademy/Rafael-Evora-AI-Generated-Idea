/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#14b8a6',
        },
        coral: {
          DEFAULT: '#ff7f50',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
