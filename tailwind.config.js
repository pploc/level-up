/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        flame: {
          50: '#fff3e0',
          100: '#ffe0b2',
          200: '#ffcc80',
          300: '#ffb74d',
          400: '#ffa726',
          500: '#ff7a00',
          600: '#ff5722',
          700: '#f4511e',
          800: '#e64a19',
          900: '#d84315',
        },
        obsidian: {
          950: '#000000',
          900: '#0a0a0a',
          850: '#0f0f0f',
          800: '#141414',
          700: '#1a1a1a',
          600: '#262626',
          500: '#404040',
        }
      },
      animation: {
        'idle-float': 'idleFloat 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'flame-flicker': 'flameFlicker 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        idleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        flameFlicker: {
          '0%': { transform: 'scale(1) rotate(-1deg)' },
          '100%': { transform: 'scale(1.05) rotate(1deg)' },
        }
      }
    },
  },
  plugins: [],
}
