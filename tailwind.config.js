/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        govBlue: {
          900: '#002147',
          800: '#003366',
          700: '#004080',
          600: '#0059b3',
          500: '#0073e6',
        },
        govGreen: {
          900: '#004d00',
          800: '#006600',
          600: '#009900',
          500: '#00b300',
        },
        govSaffron: {
          500: '#ff9933',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
