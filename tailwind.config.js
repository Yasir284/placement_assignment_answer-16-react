/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-green-100": "#d3f1ed",
        "my-green-300": "#d4f2ef",
        "my-green-800": "#29857f",
      },
    },
  },
  plugins: [],
};
