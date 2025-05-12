import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        stone: "#EEEEEE",
        beige: {
          light: "#F3F0E7",
        },
        gray: {
          standard: "#DDDDDD",
          dark: "#CCCCCC",
          light: "#EEF1F4",
        },
        navy: {
          gray: "#545F71",
        },
        white: {
          DEFAULT: "#FFFFFF",
          shell: "#F9F9F9",
        },
      },
    },
  },
  plugins: [],
};

export default config;
