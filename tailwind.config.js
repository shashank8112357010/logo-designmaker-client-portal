/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlack: "#0B1926",
        secondaryBlack: "#182736",
        darkBlack: "#12202E",
        lightBlack: "#1F3143",
        buttonBlack: "#2F2F2F",
        primaryGreen: "#5CFF85",
        primaryGray: "#BDBDBD",
        primaryGrey: "#8D8D8D",
      },
    },
  },
  plugins: [],
}

