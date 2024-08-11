import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      colors: {
        mainColor: "#8E6EE8",
        mainHoverColor: "#7292cc",
        mainHoverLightColor: "#cbdcfa",
        editBtnColor: "#8CF2B7",
        delBtnColor: "#FFBCBC",
        bgGray500: "#918E88",
        subTitle1: "#61646B",
        subTitle2: "#AFB1B6",
      },
      boxShadow: {
        custom: "2px 2px 10px 0px rgba(0, 0, 0, 0.10)",
        plusBtn: "2px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      }
    }
  },
  plugins: [nextui(), require("tailwind-scrollbar-hide")]
};
export default config;
