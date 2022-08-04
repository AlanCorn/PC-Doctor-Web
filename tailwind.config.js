/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#3b82f6",
          "secondary": "#818cf8",
          "accent": "#1d4ed8",
          "neutral": "#d1d5db",
          "base-100": "#f3f4f6",
          "info": "#bae6fd",
          "success": "#4ade80",
          "warning": "#fde047",
          "error": "#ef4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
