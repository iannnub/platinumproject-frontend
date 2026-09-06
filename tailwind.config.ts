import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        silver: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#C0C0C0',
          500: '#A8A8A8',
          600: '#8B8B8B',
          700: '#6B6B6B',
          800: '#4A4A4A',
          900: '#2A2A2A',
        },
        gold: {
          light: '#FFD700',
          DEFAULT: '#D4AF37',
          dark: '#B8860B',
        },
        rosegold: '#B76E79',
        champagne: '#F7E7CE',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        heading: ['var(--font-cormorant)', 'serif'],
      },
      boxShadow: {
        silver: '0 4px 20px -2px rgba(192, 192, 192, 0.25)',
        gold: '0 4px 20px -2px rgba(212, 175, 55, 0.3)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
