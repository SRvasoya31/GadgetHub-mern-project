/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f5d831ba",
        darkBg: "#111111",
        cardBg: "#1c1c1c",
      },
    },
  },
  plugins: [],
};