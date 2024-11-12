/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        soli: ["Soli Px W01 Regular", "regular"], // Add your custom handwriting font
      },
      colors: {
        ash: "rgba(63, 63, 70, 0.6)",
        grey2: "#3f3f4699",
        dark: "#1f1f1f",
        primary: "#1D2211",
        secondary: "#4B5320",
      },
    },
  },
  plugins: [],
};
