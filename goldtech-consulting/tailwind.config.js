/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    'bg-marketing-bg/60',
    'bg-white/70',
  ],
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
        lightGray: '#f8f9fa',        // Marketing variant colors - lighter, more creative palette
        marketing: {
          primary: '#3b82f6', // More blue - creative and modern
          primaryLight: '#60a5fa',
          accent: '#ec4899', // Pink - vibrant and engaging
          accentLight: '#f472b6',
          bg: '#fafafa', // Very light gray background
          bgAlt: '#ffffff',
        },
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(255, 195, 0)',
        'gold-lg': '0 10px 25px 0 rgba(255, 195, 0)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
      height: {
        'modal': '85vh',
        'image-viewer': '90vh',
      },
      maxHeight: {
        'modal': '85vh',
        'image-viewer': '90vh',
      },
      zIndex: {
        'modal': 50,
        'image-viewer': 60,
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-in-delay': 'fadeIn 1s ease-out 0.3s both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      aspectRatio: {
        '4/4': '4 / 4',
        'video': '16 / 9',
        'screenshot': '4 / 3',
      },
    },
  },
  plugins: [],
}

