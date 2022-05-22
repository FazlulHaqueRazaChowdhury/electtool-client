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


          "primary": "#e8cd1e",

          "secondary": "#cf52dd",

          "accent": "#4a86bf",

          "neutral": "#151320",
          "base-100": "#ffffff",

          "info": "#AADDE9",

          "success": "#19714E",

          "warning": "#D58C15",

          "error": "#F37D68",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
