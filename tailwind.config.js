/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "2xs": "11px",
        "3xs": "10px",
      },
      fontFamily: {
        openSans: ["OpenSans"],
        "openSans-light": ["OpenSansLight"],
        "openSans-medium": ["OpenSansMedium"],
        "openSans-semibold": ["OpenSansSemiBold"],
        "openSans-bold": ["OpenSansBold"],
        "openSans-extrabold": ["OpenSansExtraBold"],
        "openSans-italic": ["OpenSansItalic"],
      },
      colors: {
        primary: {
          base: "#93b5ff",
          50: "#f4f8ff",
          100: "#e9f0ff",
          200: "#dee9ff",
          500: "#91b0f2",
          600: "#8FABE5",
          700: "#7f9dde",
          800: "#6c86be",
          900: "#596f9e",
        },
        secondary: {
          base: "#c3de7f",
          50: "#f6f9f0",
          200: "#e3ecd3",
          500: "#a2b86f",
          600: "#a6be6c",
          700: "#90a55d",
        },
        dark: {
          light: "#364463",
          lighter: "#253048",
          base: "#161d2e",
        },
        green: {
          light: "#edf9ef",
          dark: "#36633e",
        },
        tag: {
          atomic: "#6cbeba",
          bonding: "#6cbe98",
          acidBase: "#deaa7f",
          organic: "#e6938f",
          h1: "#6cbeba",
          h2: "#deaa7f",
        },
      },
    },
  },
  safelist: [
    "bg-tag-atomic",
    "bg-tag-bonding",
    "bg-tag-acidBase",
    "bg-tag-organic",
    "bg-tag-h1",
    "bg-tag-h2",
    "bg-secondary-600",
  ],
  plugins: [],
};
