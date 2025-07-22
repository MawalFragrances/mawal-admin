/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        searchBar: "searchBar 0.5s ease-out forwards",
        themeAnimation: "fadeIn 0.3s ease-out forwards",
        themeAnimationLg: "fadeIn2 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        fadeIn2: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        searchBar: {
          "0%": {
            opacity: "0",
            transform: "translate(-50%, 20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%, 0px)"
          },
        },
      }
    },
  },
  plugins: [],
}