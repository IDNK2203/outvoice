import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "26": "6.5rem",
      },
      colors: {
        paid_bg: "#33d6a049",
        pending_bg: "#ff990066",
        draft_bg: "#8d8d8db3",
        paid_fg: "#33d69f",
        pending_fg: "#ff8f00",
        draft_fg: "#ffffff",
      },
      fontFamily: {
        lSpartan: ["var(--font-leagueSpartan)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          accent: "#7c5dfa",
          error: "#ef4444",
          secondary: "#373a4fff",
          // background
          "--primary_bg": "#141625",
          "--secondary_bg_700": "#1e2139",
          "--secondary_bg_500": "#252945",
          "--misc_bg": "#0c0e16",
          // foreground
          "--primary_fg": "#ffffff",
          "--secondary_fg": "#ffffff",
          "--misc_fg": "#ffffff",
          "--accent": "#7c5dfa",
        },
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          accent: "#7c5dfa",
          error: "#ef4444",
          secondary: "#d1d5db",
          // background
          "--primary_bg": "#f8f8fb",
          "--secondary_bg_700": "#ffffff",
          "--secondary_bg_500": "#efefef",
          "--misc_bg": "#252945",

          // foreground
          "--primary_fg": "#000000",
          "--secondary_fg": "#424b77",
          "--misc_fg": "#ffffff",
        },
      },
    ],
  },
};
export default config;
