module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#bf3157",

          "secondary": "#6321c6",

          "accent": "#52d3c0",

          "neutral": "#21282C",

          "base-100": "#FAFAFA",

          "info": "#7596EB",

          "success": "#239068",

          "warning": "#D98908",

          "error": "#E92F3C",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
