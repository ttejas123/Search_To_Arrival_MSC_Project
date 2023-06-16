/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        lightBg: "url('./assets/img/bg-light.png')",
        lightBg2: "url('./assets/img/bg-light-2.png')",
        darkBg: "url('./assets/img/bg-dark.png')",
      }),
    },
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      display: [
        "6rem",
        { fontWeight: "700", letterSpacing: "-0.04em", lineHeight: "120%" },
      ],
      h1: ["4.5rem", { fontWeight: "700" }],
      h2: ["4rem", { fontWeight: "700" }],
      h3: ["3.5rem", { fontWeight: "700" }],
      h4: ["3rem", { fontWeight: "700" }],
      "subtitle-big": ["2.5rem", { fontWeight: "700" }],
      subtitle: ["2rem", { fontWeight: "600" }],
      "base-big": ["1.5rem", { fontWeight: "400" }],
      "base-bold": ["1.25rem", { fontWeight: "700" }],
      base: ["1rem", { fontWeight: "400" }],
      overline: ["0.813rem", { fontWeight: "600", textTransform: "uppercase" }],
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          default: "#A1A2B3",
          "default-focus": "#858694",
          primary: "#FA4F00",
          "primary-focus": "#C83F00",
          secondary: "#311F42",
          "secondary-focus": "#271935",
          accent: "#121212",
          "accent-focus": "#0E0E0E",
          "accent-content": "#FEFEFE",
          "base-100": "#fff",     //backgroud light
          "base-200": "#FEFEFF",  //background off white
          "base-300": "#D9DAE1",  //border
          "neutral": "#fff",           //table bg light
          "neutral-focus": "#e0e0e0",  //table bg off light
          "neutral-content": "#D9DAE1",//Chart
          '.btn-token-increase': {
              'color': "#FA4F00",
              'background-color': '#FDE8DF'
          },
          '.btn-token-increase:hover': {
              'color': "#fff",
              'background-color': "#FA4F00"
          },
          '.switchModeCoinFlipButtons': {
             'color': '#fff',
             'background-color': '#000'
          },
          '.switchModeCoinFlipButtons:hover': {
            'color': '#fff',
            'background-color': '#FA4F00'
          },
          '.FAQ-highlighter': {
              color: 'rgb(234 ,88 ,12)'
          },
          '.MainthemeTextColor': {
             color: "#FA4F00"
          },
          '.MainthemeBackGroundColor': {
            'background-color': "#FA4F00"
         }
        }
      },
      {
        dark: {
          default: "#292929",
          "default-focus": "#000",
          primary: "#000",
          "primary-focus": "#000",
          secondary: "#000",
          "secondary-focus": "#000",
          accent: "#fff",
          "accent-focus": "#000",
          "accent-content": "#000",
          "base-100": "#000",     //backgroud dark
          "base-200": "#121212",  //backgroud light dark 
          "base-300": "#292929",  //border
          "neutral": "#000",           //table bg light
          "neutral-focus": "#121212",  //table bg off light
          "neutral-content": "#303030",//Chart
          '.btn-token-increase': {
            'color': "#FA4F00",
            'background-color': '#FDE8DF'
          },
          '.btn-token-increase:hover': {
              'color': "#fff",
              'background-color': "#FA4F00"
          },
          '.switchModeCoinFlipButtons': {
              'color': '#000',
              'background-color': '#fff'
          },
          '.switchModeCoinFlipButtons:hover': {
            'color': '#fff',
            'background-color': '#FA4F00'
          },
          '.FAQ-highlighter': {
            color: 'rgb(234 ,88 ,12)'
          },
          '.MainthemeTextColor': {
             color: "#FA4F00"
          },
          '.MainthemeBackGroundColor': {
            'background-color': "#FA4F00"
          }
        }
      }
    ],
  },
  plugins: [require("daisyui")],
};
