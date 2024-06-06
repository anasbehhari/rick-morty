/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        Fira: ["Fira Sans", "sans-serif"],

      },
      screens: {
        "w-phone": { max: "768px" },
      },
      colors: {
        rickBlue: '#00BFFF',
        mortyYellow: '#FFD700',
        portalGreen: '#39FF14',
        meeseeksBlue: '#1E90FF',
        plumbusPink: '#FF69B4',
        spaceshipGray: '#B0C4DE',
      }
    },
  },
  plugins: [],
};
