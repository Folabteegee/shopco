/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          1: "#000000",
          2: "#000eee",
        },
        secondary: {
          1: "#ffffff",
          2: "#F2F0F1",
        },
        tertiary: {
          1: "#ab639f",
          2: "#2abe11",
        },
      },
      fontFamily: {
        satoshi: ["satoshi", "serif"],
        integral: ["integral", "serif"],
      },
    },
  },
  plugins: [],
};
