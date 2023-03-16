/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        default: "#3ea9ad",
        primary: "#292929",
        cream: "#fef2c5",
        salmon: "#e37686",
        teal: "#3da9ad",
        taffy: "#f8c463",
        caramel: "#d7942f",
        mint: "#adf4b1"

      },
    },
  },
  plugins: [],
};