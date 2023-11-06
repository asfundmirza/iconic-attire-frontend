/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "custom-width": "830px",
        "custom-homeTextWidth-lg": "1120px",
        "custom-homeTextWidth-md": "960px",
        "custom-homeTextWidth-sm": "460px",
      },

      fontFamily: {
        "custom-font": "Roboto",
      },

      colors: {
        "primary-color": "#011B43",
        "secondary-color": "#FBE5B9",
        "btn-color" : "#2A72B5",
        "btnhover-color": "#3782C7",
        "footer-color" : "#C2DEFF",
        "field-color" : "#E9F4FF",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
