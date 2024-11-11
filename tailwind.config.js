/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        soli: ["Soli Px W01 Regular", "regular"],
        press: ["'Press Start 2P'", "system-ui"],
      },
    },
  },
  plugins: [],
};
