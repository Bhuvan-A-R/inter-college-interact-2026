import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";
import animatePlugin from "tailwindcss-animate";

export default withUt({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gat: {
          gold: "#f3c317",
          blue: "#2362ec",
          charcoal: "#353636",
          "dark-gold": "#9a8531",
          steel: "#8b97b6",
          navy: "#1a3a8b",
          midnight: "#0e2045",
          cobalt: "#0a3096",
          "off-white": "#f8f9fc",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        heading: ["var(--font-rajdhani)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        gold: "0 4px 24px rgba(243,195,23,0.18)",
        blue: "0 4px 24px rgba(35,98,236,0.18)",
        navy: "0 8px 32px rgba(14,32,69,0.12)",
        card: "0 2px 12px rgba(27,58,139,0.08)",
        "card-hover": "0 8px 32px rgba(35,98,236,0.15)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0e2045 0%, #0a3096 50%, #1a3a8b 100%)",
        "gold-gradient": "linear-gradient(135deg, #f3c317 0%, #9a8531 100%)",
        "blue-gradient": "linear-gradient(135deg, #2362ec 0%, #0a3096 100%)",
        "section-subtle": "linear-gradient(180deg, #ffffff 0%, #f8f9fc 100%)",
        "dots-pattern": "radial-gradient(circle, #8b97b6 1px, transparent 1px)",
      },
      backgroundSize: {
        dots: "24px 24px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-right": "slideRight 0.5s ease forwards",
        "count-up": "countUp 1.5s ease forwards",
        shimmer: "shimmer 2s linear infinite",
        "gold-pulse": "goldPulse 3s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "border-flow": "borderFlow 4s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        goldPulse: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(243,195,23,0.3)" },
          "50%": { boxShadow: "0 0 0 12px rgba(243,195,23,0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animatePlugin],
});
