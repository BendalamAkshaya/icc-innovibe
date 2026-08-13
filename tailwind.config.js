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
      fontFamily: {
        sans: ['"SF Pro Text"', '"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        gotham: ['Gotham', '"Gotham Bold"', '"SF Pro Display"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        apfel: ['"Apfel Grotezk"', '"Apfel Grotesk"', 'sans-serif'],
        heading: ['"Geist"', '"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Geist"', '"SF Pro Display"', 'sans-serif'],
      },
      colors: {
        background: '#FFFFFF',
        secondaryBg: '#F8FAFC',
        cardBg: '#FFFFFF',
        subtleBorder: '#E8EDF4',
        primaryText: '#1F2937',
        secondaryText: '#6B7280',
        mutedText: '#9CA3AF',
        primaryAccent: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#06B6D4',
        purpleAccent: '#8B5CF6',
        pinkAccent: '#EC4899',
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
          900: '#1e3a8a',
        },
        evgreen: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(15, 23, 42, 0.04)',
        'elevated': '0 8px 24px rgba(15, 23, 42, 0.06)',
        'xs': '0 1px 2px 0 rgba(15, 23, 42, 0.03)',
      },
      borderRadius: {
        '2xl': '18px',
        'xl': '12px',
        'lg': '10px',
      },
      transitionTimingFunction: {
        'ease-out-custom': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
