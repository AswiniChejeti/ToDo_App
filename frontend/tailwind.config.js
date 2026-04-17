/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        premium: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c1d3ff',
          300: '#92b2ff',
          400: '#5c8aff',
          500: '#335fff',
          600: '#1b3df5',
          700: '#142dc3',
          800: '#16279f',
          900: '#17277e',
          950: '#0e164a',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
