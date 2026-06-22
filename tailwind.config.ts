import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: "#15110E",
          50: "#1E1813",
          100: "#241D17",
        },
        oxblood: {
          DEFAULT: "#5C1A16",
          deep: "#431311",
          light: "#7A241D",
        },
        ember: {
          DEFAULT: "#B5402A",
          light: "#CF5A3F",
        },
        coriander: {
          DEFAULT: "#D6A24A",
          light: "#E4BC70",
        },
        bone: {
          DEFAULT: "#F2E9D8",
          dim: "#CFC6B5",
        },
        sage: {
          DEFAULT: "#8A9079",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        ultra: "0.32em",
      },
      keyframes: {
        "grain": {
          "0%,100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-5%,-5%)" },
          "30%": { transform: "translate(3%,-8%)" },
          "50%": { transform: "translate(-4%,6%)" },
          "70%": { transform: "translate(6%,4%)" },
          "90%": { transform: "translate(-2%,3%)" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "shimmer": {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
