import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1B2A4A",
          dark: "#0F1A2E",
          light: "#2A3F6A",
        },
        gold: {
          DEFAULT: "#C8962E",
          light: "#F5E6C8",
          dark: "#A67B24",
        },
        cream: {
          DEFAULT: "#FAF7F2",
          dark: "#F0EBE1",
        },
        text: {
          dark: "#1A1A1A",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        heading: ["var(--font-merriweather)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
