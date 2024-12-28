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
          light: "#E8F8EB",
          dark: "#36633e",
        },
        tag: {
          spearmint: "#6cbe98",
          strawberry: "#e6938f",
          castaway: "#6cbeba",
          caramel: "#deaa7f",
          green: "#84be6c",
          khaki: "#beb36c",
        },
      },
    },
  },
  safelist: [
    "bg-tag-spearmint",
    "bg-tag-strawberry",
    "bg-tag-castaway",
    "bg-tag-caramel",
    "bg-tag-green",
    "bg-tag-khaki",
    "bg-secondary-600",
  ],
  plugins: [],
};
