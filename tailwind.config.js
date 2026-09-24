/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },

    screens: {
      xs: "450px",
      // => @media (min-width: 450px) { ... }

      sm: "575px",
      // => @media (min-width: 576px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1200px",
      // => @media (min-width: 1200px) { ... }

      "2xl": "1400px",
      // => @media (min-width: 1400px) { ... }
    },
    extend: {
      colors: {
        current: "currentColor",
        transparent: "transparent",
        white: "#FFFFFF",
        black: "#121723",
        dark: "#1D2430",
        primary: "#3A56E8",
        secondary: "#7C3AED",
        yellow: "#FBB040",
        navy: "#080B14",
        "navy-light": "#0E1326",
        "navy-border": "#1E2440",
        "body-color": "#788293",
        "body-color-dark": "#959CB1",
        "gray-dark": "#1E232E",
        "gray-light": "#F0F2F9",
        stroke: "#E3E8EF",
        "stroke-dark": "#353943",
        "bg-color-dark": "#171C28",

        // Scoped tokens for the standalone HeroSection (components/HeroSection) —
        // kept separate from the site-wide primary/secondary tokens above.
        "hero-bg": "#F5F8FE",
        "hero-primary": "#2563EB",
        "hero-primary-light": "#DBEAFE",
        "hero-ink": "#0A0F1C",
        "hero-body": "#475569",
        "hero-muted": "#94A3B8",
      },

      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #3A56E8 0%, #6247E5 55%, #7C3AED 100%)",
        "gradient-brand-soft": "linear-gradient(135deg, rgba(58,86,232,0.12) 0%, rgba(124,58,237,0.10) 100%)",
        "gradient-navy": "linear-gradient(180deg, #080B14 0%, #0E1326 100%)",
      },

      boxShadow: {
        signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
        one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
        two: "0px 5px 10px rgba(6, 8, 15, 0.1)",
        three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
        sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
        "sticky-dark": "inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)",
        "feature-2": "0px 10px 40px rgba(48, 86, 211, 0.12)",
        submit: "0px 5px 20px rgba(4, 10, 34, 0.1)",
        "submit-dark": "0px 5px 20px rgba(4, 10, 34, 0.1)",
        btn: "0px 1px 2px rgba(4, 10, 34, 0.15)",
        "btn-hover": "0px 1px 2px rgba(0, 0, 0, 0.15)",
        "btn-light": "0px 1px 2px rgba(0, 0, 0, 0.1)",
        glow: "0px 8px 30px rgba(58, 86, 232, 0.18)",
        "glow-purple": "0px 8px 30px rgba(124, 58, 237, 0.18)",
        card: "0px 1px 2px rgba(8, 11, 20, 0.04), 0px 8px 24px rgba(8, 11, 20, 0.06)",
        "card-dark": "0px 1px 2px rgba(0, 0, 0, 0.2), 0px 8px 24px rgba(0, 0, 0, 0.3)",
      },
      dropShadow: {
        three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
      },
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-20" },
        },
        "bar-fill": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        clouds: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3.5s ease-in-out infinite",
        "dash-flow": "dash-flow 1.4s linear infinite",
        "bar-fill": "bar-fill var(--dur, 3.4s) linear both",
        marquee: "marquee var(--marquee-dur, 60s) linear infinite",
        clouds: "clouds 260s linear infinite",
      },
    },
  },
  plugins: [],
};
