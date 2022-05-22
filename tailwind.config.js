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
        mythme: {


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
      {
        mytheme2: {

          "primary": "#e256d9",

          "secondary": "#2d71e5",

          "accent": "#fc8abc",

          "neutral": "#28203C",

          "base-100": "#223049",

          "info": "#A0B7F3",

          "success": "#4EDAB4",

          "warning": "#B87005",

          "error": "#F64441",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
