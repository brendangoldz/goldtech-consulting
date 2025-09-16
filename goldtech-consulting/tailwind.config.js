/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Gotham', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        'gotham': ['Gotham', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: '#ffc300',
        goldLight: '#ffde59',
        navy: '#1a1a2e',
        lightGray: '#f8f9fa',
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(255, 195, 0)',
        'gold-lg': '0 10px 25px 0 rgba(255, 195, 0)',
      },
    },
  },
  plugins: [],
}

