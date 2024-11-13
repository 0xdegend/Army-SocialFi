/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        soli: ["Soli Px W01 Regular", "regular"],
        press: ["'Press Start 2P'", "system-ui"],
        orbitron: ["Orbitron", "sans-sarif"],
        inconsolata: ["Inconsolata", "sans-sarif"],
      },
      colors: {
        ash: "rgba(63, 63, 70, 0.6)",
        grey2: "#3f3f4699",
        dark: "#1f1f1f",
        primary: "#1D2211",
        secondary: "#4B5320",
        customYellow: "#DFC865",
      },
    },
  },
  plugins: [],
};
