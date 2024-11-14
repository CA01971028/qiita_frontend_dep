import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography'; // 追加

const {
  iconsPlugin,
  getIconCollections,
} = require("@egoist/tailwindcss-icons");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    typography, // ここに追加
    iconsPlugin({
      // 利用したい icon collection を利用する
      // https://icones.js.org/
      collections: getIconCollections(["heroicons-solid"]),
    }),
  ],
};

export default config;
