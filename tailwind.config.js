/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs divines de Torm
        'divine-gold': {
          DEFAULT: '#D4AF37',
          light: '#F4D03F',
          dark: '#B8860B',
        },
        'steel-blue': {
          DEFAULT: '#1E3A5F',
          light: '#4A6FA5',
        },
        // Parchemin
        'parchment': {
          DEFAULT: '#F5E6C8',
          dark: '#E6D2A0',
          light: '#FFF8E7',
        },
        // Encre
        'ink': {
          DEFAULT: '#2C2416',
          light: '#5C4D3C',
          muted: '#8B7D6B',
        },
        // Fonctionnelles
        'blood-red': '#8B0000',
        'forest': '#228B22',
        'royal-purple': '#663399',
        'bronze': '#CD7F32',
        // Jungle (pour le Chult)
        'jungle-green': {
          DEFAULT: '#2D5016',
          light: '#4A7C2A',
          dark: '#1A3009',
        },
      },
      fontFamily: {
        'display': ['Cinzel Decorative', 'serif'],
        'body': ['Cormorant Garamond', 'serif'],
        'ui': ['Roboto Condensed', 'sans-serif'],
      },
      backgroundImage: {
        'parchment-texture': "url('/textures/parchment-bg.png')",
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-gold': 'pulseGold 2s infinite',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(212, 175, 55, 0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
    },
  },
  plugins: [],
}
