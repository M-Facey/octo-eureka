/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'gloock': ["Gloock", "serif"],
        'os': ["Open Sans", "san-serif"],
      }
    },
  },
  plugins: [],
};
