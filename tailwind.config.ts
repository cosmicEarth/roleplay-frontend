import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        inherit: "inherit",
      },
      fontSize: {
        inherit: "inherit",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
        18: "4.5rem",
        30: "7.5rem",
      },
      spacing: {
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        12.5: "3.125rem",
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
        18: "4.5rem",
        25: "6.25rem",
        30: "7.5rem",
        62: "15.5rem",
        70: "17.5rem",
        72: "18rem",
        82: "20.5rem",
        95: "23.75rem",
        100: "25rem",
        112: "28rem",
        120: "30rem",
        128: "32rem",
        144: "36rem",
        160: "40rem",
        168: "42rem",
        176: "44rem",
        192: "48rem",
        208: "52rem",
        vw: "100vw",
        dvw: "100dvw",
        "screen-md": "768px",
      },
      transitionDuration: {
        3000: "3000ms",
      },
      colors: {
        "neon-carrot": {
          "50": "#fff8ed",
          "100": "#ffefd4",
          "200": "#ffdba8",
          "300": "#ffc171",
          "400": "#ff9933",
          "500": "#fe7e11",
          "600": "#ef6307",
          "700": "#c64808",
          "800": "#9d3a0f",
          "900": "#7e3110",
          "950": "#441606",
        },
        white: {
          0: "#FFFFFF",
          50: "#FDFDFD",
          100: "#F7F7F7",
          200: "#F4F4F4",
          300: "#EEEEEE",
          400: "#EBEBEB",
          500: "#E6E6E6",
          600: "#D1D1D1",
          700: "#A3A3A3",
          800: "#7F7F7F",
          900: "#616161",
        },
        black: {
          50: "#EBEBEB",
          100: "#C2C2C2",
          200: "#A4A4A4",
          300: "#7B7B7B",
          400: "#616161",
          500: "#3A3A3A",
          600: "#353535",
          700: "#292929",
          800: "#202020",
          900: "#181818",
        },
        green: {
          50: "#e6f9eb",
          100: "#ccf3d7",
          200: "#0dc93c",
          300: "#0bb536",
          400: "#099a30",
          500: "#087f2a",
          600: "#076423",
          700: "#05491d",
          800: "#043e16",
          900: "#032310",
        },

        yellow: {
          50: "#faf8e4",
          100: "#f5f0c8",
          200: "#C9B60D",
          300: "#b0a30c",
          400: "#978f0b",
          500: "#7e7b0a",
          600: "#656708",
          700: "#4c5306",
          800: "#333f05",
          900: "#1a2b03",
        },

        red: {
          50: "#FFE6E6",
          100: "#FFB0B0",
          200: "#FF8A8A",
          300: "#FF8A8A",
          400: "#FF8A8A",
          500: "#FE0000",
          600: "#E70000",
          700: "#B40000",
          800: "#8C0000",
          900: "#6B0000",
        },

        blue: {
          50: "#E6F4FF",
          100: "#B0DEFF",
          200: "#8ACEFF",
          300: "#54B7FF",
          400: "#33A9FF",
          500: "#0094FF",
          600: "#0087E8",
          700: "#0069B5",
          800: "#00518C",
          900: "#003E6B",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar-hide"),
    plugin(({ addBase, theme }) => {
      addBase({
        h1: {
          fontSize: theme("fontSize.10"),
          fontWeight: theme("fontWeight.bold"),
          lineHeight: theme("lineHeight.tight"),
          cursor: theme("cursor.default"),
        },
        h2: {
          fontSize: theme("fontSize.9"),
          fontWeight: theme("fontWeight.bold"),
          lineHeight: theme("lineHeight.normal"),
          cursor: theme("cursor.default"),
        },
        h3: {
          fontSize: theme("fontSize.8"),
          fontWeight: theme("fontWeight.semibold"),
          lineHeight: theme("lineHeight.normal"),
          cursor: theme("cursor.default"),
        },
        h4: {
          fontSize: theme("fontSize.7"),
          fontWeight: theme("fontWeight.semibold"),
          lineHeight: theme("lineHeight.normal"),
          cursor: theme("cursor.default"),
        },
        h5: {
          fontSize: theme("fontSize.6"),
          fontWeight: theme("fontWeight.medium"),
          lineHeight: theme("lineHeight.normal"),
          cursor: theme("cursor.default"),
        },
        h6: {
          fontSize: theme("fontSize.4"),
          fontWeight: theme("fontWeight.medium"),
          lineHeight: theme("lineHeight.normal"),
          cursor: theme("cursor.default"),
        },
        p: {
          fontSize: theme("fontSize.4"),
          lineHeight: theme("lineHeight.normal"),
        },
        span: {
          fontSize: theme("fontSize.4"),
          lineHeight: theme("lineHeight.normal"),
        },
        'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button':
          {
            "-webkit-appearance": "none",
            margin: "0",
          },
      });
    }),
  ],
};
export default config;
