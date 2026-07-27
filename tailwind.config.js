/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#0280d2',
          600: '#015b97',
          700: '#01426c',
          900: '#00253e',
        },
        evgreen: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        }
      },
    },
  },
  plugins: [],
};
