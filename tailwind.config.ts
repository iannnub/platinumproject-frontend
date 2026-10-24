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
          800: '#3A3A3C',
          850: '#242426',
          900: '#161618',
          950: '#0C0C0E',
        },
        gold: {
          light: '#EAE3D6', // Soft pearl champagne highlight
          DEFAULT: '#D4C5B0', // Elegant titanium champagne (no harsh yellow)
          dark: '#A39580', // Muted titanium bronze
        },
        champagne: '#EAE3D6',
        rosegold: '#C9A9A6',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        heading: ['var(--font-cormorant)', 'serif'],
      },
      boxShadow: {
        silver: '0 8px 30px -4px rgba(255, 255, 255, 0.08)',
        gold: '0 8px 32px 0 rgba(0, 0, 0, 0.45), inset 0 1px 1px 0 rgba(255, 255, 255, 0.16)',
        glass: '0 12px 36px 0 rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.18)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
