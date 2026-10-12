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
        blush: {
          50: "#FAF4F2",
          100: "#F7ECE8",
          200: "#F2E1DD", // background warm dusty blush pink
          300: "#E8C8C2",
          400: "#DCADA5",
        },
        ivory: {
          50: "#FFFFF9",
          100: "#FFFDF6",
          DEFAULT: "#FFF9F2", // main surfaces warm ivory
          200: "#FBF3E8",
        },
        caramel: {
          DEFAULT: "#D8AE87", // envelope caramel beige
          light: "#E4C3A3",
          dark: "#BD8E65",
        },
        roseAccent: {
          DEFAULT: "#D88C88", // primary accent muted rose
          light: "#E5A7A3",
          dark: "#B86F6B",
        },
        dustyPink: {
          DEFAULT: "#F3CED0", // buttons dusty pink
          hover: "#EBBEC1",
          active: "#E2ADB1",
        },
        warmBrown: {
          DEFAULT: "#795C53", // text warm brown
          light: "#9A7A70",
          dark: "#573F37",
        },
      },
      fontFamily: {
        script: ["var(--font-script)", "cursive"],
        arabic: ["var(--font-arabic)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 25px -5px rgba(121, 92, 83, 0.08), 0 8px 10px -6px rgba(121, 92, 83, 0.05)",
        card: "0 15px 35px -5px rgba(121, 92, 83, 0.12), 0 5px 15px -3px rgba(121, 92, 83, 0.06)",
        envelope: "0 20px 40px -10px rgba(121, 92, 83, 0.18)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSlow: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.04)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "pulse-slow": "pulseSlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
