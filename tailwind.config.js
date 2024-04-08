/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#172b4d",
        },
        secondary: {
          DEFAULT: "#7159c1",
        },
      },
    },
  },
  plugins: [],
};
