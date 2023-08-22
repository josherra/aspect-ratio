/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#1E1E20",
        secondary: "#212126",
        accentOrange: "#B2634A",
        accentBlue: "#4D9ED8",
      },
    },
  },
  plugins: [],
};
