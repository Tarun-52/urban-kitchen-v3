import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FDF6F0",
          100: "#F9E8D8",
          200: "#F0CDA8",
          300: "#E8A87C",
          400: "#D4894F",
          500: "#C87941",   // Primary copper
          600: "#A8612F",
          700: "#8A4D26",
          800: "#6D3B1E",
          900: "#4A2814",
        },
        surface: {
          950: "#0A0A0A",
          900: "#0F0F0F",   // Main background
          800: "#161616",   // Slightly lighter bg
          700: "#1C1C1C",   // Card background
          600: "#242424",   // Elevated card
          500: "#2E2E2E",   // Borders
          400: "#3A3A3A",   // Lighter borders
          300: "#555555",   // Muted icons
          200: "#888888",   // Placeholder text
          100: "#A09890",   // Secondary text (warm gray)
          50: "#F5F0EB",    // Primary text (warm white)
        },
      },
      fontFamily: {
        heading: ['"DM Serif Display"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      fontSize: {
        // Responsive display sizes
        "display-sm": ["clamp(2rem, 5vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(3rem, 8vw, 5.5rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],

        // Responsive heading sizes
        "heading-xs": ["clamp(0.875rem, 1.2vw, 1rem)", { lineHeight: "1.4", fontWeight: "600" }],
        "heading-sm": ["clamp(1rem, 1.8vw, 1.25rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "heading-md": ["clamp(1.25rem, 2.5vw, 1.75rem)", { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        "heading-lg": ["clamp(1.5rem, 3.5vw, 2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "heading-xl": ["clamp(2rem, 5vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],

        // Responsive body sizes
        "body-xs": ["clamp(0.6875rem, 0.9vw, 0.75rem)", { lineHeight: "1.6" }],
        "body-sm": ["clamp(0.8125rem, 1.1vw, 0.875rem)", { lineHeight: "1.6" }],
        "body-md": ["clamp(0.9375rem, 1.3vw, 1.0625rem)", { lineHeight: "1.65" }],
        "body-lg": ["clamp(1.0625rem, 1.5vw, 1.25rem)", { lineHeight: "1.6" }],
        "body-xl": ["clamp(1.125rem, 1.8vw, 1.375rem)", { lineHeight: "1.55" }],

        // Caption / label
        "caption": ["clamp(0.625rem, 0.8vw, 0.6875rem)", { lineHeight: "1.5", letterSpacing: "0.05em" }],
        "label": ["clamp(0.6875rem, 0.9vw, 0.75rem)", { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "600" }],
      },
    },
  },
  plugins: [],
};

export default config;