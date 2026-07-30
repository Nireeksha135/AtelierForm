import type { Config } from "tailwindcss";

// Design tokens for the "Atelier Form" editorial/luxury visual language.
// Centralised here so components never hardcode raw hex values or magic
// spacing numbers — see `DESIGN.md` (added in a later commit) for rationale.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0a0908",
        studio: "#f5f2ec",
        walnut: "#4a3628",
        oak: "#c9a876",
        ash: "#a8a29a",
        ember: "#d97a3f",
      },
      fontFamily: {
        editorial: ["var(--font-editorial)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
