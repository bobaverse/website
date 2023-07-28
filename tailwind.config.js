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
        seafoam: "#26A69A",
        chocolate: "#402A08",
        "modal-bg": "rgba(0, 0, 0, 0.8)",
        boba: {
          grey: "#2D2D2D",
          green: "#AEDB01",
          "light-gray": "#545454",
        }
      },
      backgroundColor: {
        "teal-light": "#64FFDA",
        teal: "#89D1C3",
        seafoam: "#26A69A",
        taffy: "#CAA378",
        chocolate: "#372B1D",
        gold: "#F2B134",
        silver: "#C0C0C0",
        bronze: "#A67C52",
        "white-unhovered": "rgba(0, 0, 0, 0.05)",
        "white-hovered": "rgba(0, 0, 0, 0.1)",
      },
      height: {
        "full-w-footer": "calc(theme('height.full') - 96px)",
      },
      boxShadow: {
        "3xl": '0px 5px 26px 4px rgba(0, 0, 0, 0.12), 0px 14px 21px 2px rgba(0, 0, 0, 0.14), 0px 7px 9px -4px rgba(0, 0, 0, 0.2)'
      },
      width: {
        cupNumbers: 'calc(100% - (100% * 0.02))'
      },
      padding: {
        'cupNumbers': '2%',
      },
      spacing: {
        'cupNumbers': '3.5%',
        'cups': '9.2%',
      },
      fontSize: {
        cupsTall: 'calc(100vw * 0.03)',
        cupsWide: 'min(calc(100vw * 0.03), 29.7px)',
      },
      fontFamily: {
        gotham: ['var(--font-gotham)'],
      }
    },

  },
  plugins: [require('@tailwindcss/forms')],
};
