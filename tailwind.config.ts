import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  safelist: [
    // Safelist all status background colors
    "bg-status-checking-in",
    "bg-status-parked",
    "bg-status-requested",
    "bg-status-locating",
    "bg-status-retrieving",
    "bg-status-in-transit",
    "bg-status-ready",
    "bg-status-delivered",
    "bg-status-delayed",
    "bg-status-blocked",
    "bg-status-issue",
    // Safelist all status text colors
    "text-status-checking-in-text",
    "text-status-parked-text",
    "text-status-requested-text",
    "text-status-locating-text",
    "text-status-retrieving-text",
    "text-status-in-transit-text",
    "text-status-ready-text",
    "text-status-delivered-text",
    "text-status-delayed-text",
    "text-status-blocked-text",
    "text-status-issue-text",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        status: {
          "checking-in": {
            DEFAULT: "hsl(var(--status-checking-in))",
            text: "hsl(var(--status-checking-in-text))",
          },
          parked: {
            DEFAULT: "hsl(var(--status-parked))",
            text: "hsl(var(--status-parked-text))",
          },
          requested: {
            DEFAULT: "hsl(var(--status-requested))",
            text: "hsl(var(--status-requested-text))",
          },
          locating: {
            DEFAULT: "hsl(var(--status-locating))",
            text: "hsl(var(--status-locating-text))",
          },
          retrieving: {
            DEFAULT: "hsl(var(--status-retrieving))",
            text: "hsl(var(--status-retrieving-text))",
          },
          "in-transit": {
            DEFAULT: "hsl(var(--status-in-transit))",
            text: "hsl(var(--status-in-transit-text))",
          },
          ready: {
            DEFAULT: "hsl(var(--status-ready))",
            text: "hsl(var(--status-ready-text))",
          },
          delivered: {
            DEFAULT: "hsl(var(--status-delivered))",
            text: "hsl(var(--status-delivered-text))",
          },
          delayed: {
            DEFAULT: "hsl(var(--status-delayed))",
            text: "hsl(var(--status-delayed-text))",
          },
          blocked: {
            DEFAULT: "hsl(var(--status-blocked))",
            text: "hsl(var(--status-blocked-text))",
          },
          issue: {
            DEFAULT: "hsl(var(--status-issue))",
            text: "hsl(var(--status-issue-text))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
