/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        soli: ["Soli Px W01 Regular", "regular"],
        quantico: ["Quantico", "regular"],
      },
    },
  },
  plugins: [],
};
