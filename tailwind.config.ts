import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        wiggle: {
          '0%, 100%': { transform: 'rotate(0)' },
          '25%': { transform: 'rotate(-15deg)' },
          '75%': { transform: 'rotate(15deg)' },
        },
        wiggleS: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '5%': { transform: 'rotate(-1deg)' },
          '10%': { transform: 'rotate(-2deg)' },
          '15%': { transform: 'rotate(-3deg)' },
          '20%': { transform: 'rotate(-4deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '30%': { transform: 'rotate(-4deg)' },
          '35%': { transform: 'rotate(-3deg)' },
          '40%': { transform: 'rotate(-2deg)' },
          '45%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '55%': { transform: 'rotate(1deg)' },
          '60%': { transform: 'rotate(2deg)' },
          '65%': { transform: 'rotate(3deg)' },
          '70%': { transform: 'rotate(4deg)' },
          '75%': { transform: 'rotate(5deg)' },
          '80%': { transform: 'rotate(4deg)' },
          '85%': { transform: 'rotate(3deg)' },
          '90%': { transform: 'rotate(2deg)' },
          '95%': { transform: 'rotate(1deg)' },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        wiggle: 'wiggle 0.5s ease-in-out infinite',
        wiggleS: 'wiggleS 1s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config