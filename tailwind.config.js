/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "2xs": "11px",
        "3xs": "10px"
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
          500: "#91b0f2",
          600: "#8FABE5",
          700: "#7f9dde",
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
      },
    },
  },
  plugins: [],
};
