import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0f172a",
          deep: "#060d1a",
          dark: "#0b1528",
          card: "#0f1d36",
          light: "#1e293b",
        },
        royal: {
          DEFAULT: "#1d4ed8",
          hover: "#1e40af",
          light: "#eff6ff",
          dark: "#173b9e",
        },
        emerald: {
          DEFAULT: "#059669",
          fin: "#059669",
          light: "#d1fae5",
          dark: "#047857",
        },
        slate: {
          850: "#131f37",
          950: "#040914",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        heading: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        fin: "0 10px 40px -10px rgba(15, 23, 42, 0.08)",
        "fin-hover": "0 20px 50px -12px rgba(29, 78, 216, 0.2)",
        "fin-card": "0 4px 20px 0 rgba(15, 23, 42, 0.05)",
        glow: "0 0 30px rgba(29, 78, 216, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
