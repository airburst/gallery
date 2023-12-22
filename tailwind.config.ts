import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

// eslint-disable-next-line @typescript-eslint/no-var-requires
import baseTheme from "./src/themes/base.cjs";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: [{ baseTheme }, "dark"],
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
} satisfies Config;
