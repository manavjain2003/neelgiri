/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2183c7",
          50: "#f5faff",
          100: "#e8f4fe",
          200: "#cfe8fb",
          300: "#a9d6f7",
          400: "#72bdee",
          500: "#3ea1e0",
          600: "#2183c7",
          700: "#1a68a0",
          800: "#154f7b",
          900: "#0e3a5d",
        },
        ice: "#f4faff",
        ink: "#10243b",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 10px 40px -12px rgba(33, 131, 199, 0.25)",
        soft: "0 6px 24px -8px rgba(33, 131, 199, 0.18)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
