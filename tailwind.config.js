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
          "primary": "#ea6d64",
          "secondary": "#9fd0ea",
          "accent": "#d68fe0",
          "neutral": "#342734",
          "base-100": "#F4EFF6",
          "info": "#88BDD8",
          "success": "#46D8B1",
          "warning": "#F9B83E",
          "error": "#F3494C",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
