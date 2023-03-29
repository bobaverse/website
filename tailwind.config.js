/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./interfaces/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backdropBlur: {
      xl: '20px'
    },
    extend: {
      colors: {
        default: "#3ea9ad",
        primary: "#292929",
        cream: "#fff",
        salmon: "#e37686",
        teal: "#3da9ad",
        taffy: "#f8c463",
        caramel: "#d7942f",
        mint: "#adf4b1",
        chocolate: "#402A08",
        "modal-bg": "rgba(0, 0, 0, 0.8)",
      },
      backgroundColor: {
        button: "#78FD00"
      }
    },
  },
  plugins: [],
};