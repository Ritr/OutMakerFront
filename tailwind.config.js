/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#002B5B",
          secondary: "#FFF8F5",
          success: "#e2fcf2",
          accent: "#F0FBFF",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
  theme: {
    extend: {
      textColor: {
        primary: "#002B5B",
      },
      backgroundColor: {
        primary: "#002B5B",
        '15': 'rgba(0, 0, 0, 0.15)'
      },
      fontSize: {
        '2xs': '0.725rem',
        '3xs': '0.7rem',
      },
    },
  },
  plugins: [require("daisyui"), function ({ addUtilities }) {
    const newUtilities = {
      '.bg-opacity-100': {
        '--tw-bg-opacity': '1',
      },
    };

    addUtilities(newUtilities, ['responsive', 'hover']);
  },],
};
