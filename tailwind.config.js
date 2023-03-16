/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backdropBlur: {
      xl: '20px'
    },
    extend: {
      colors: {
        default: "#3ea9ad",
        primary: "#292929",
        cream: "#fef2c5",
        salmon: "#e37686",
        teal: "#3da9ad",
        taffy: "#f8c463",
        caramel: "#d7942f",
        mint: "#adf4b1",
        chocolate: "#402A08",
        "modal-bg": "rgba(64, 42, 8, 0.8)",
      },
      backgroundColor: {
        button: "rgba(255, 255, 255, 0.04)"
      }
    },
  },
  plugins: [],
};