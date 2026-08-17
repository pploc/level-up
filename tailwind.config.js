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
        'mascot-happy': 'mascotHappy 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite alternate',
        'mascot-celebrate': 'mascotCelebrate 0.8s ease-in-out infinite',
        'mascot-wiggle': 'mascotWiggle 0.4s ease-in-out infinite',
        'center-hero': 'centerHero 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.25s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        centerHero: {
          '0%': { opacity: '0', transform: 'scale(0.3) translateY(60px) rotate(-15deg)' },
          '25%': { opacity: '1', transform: 'scale(1.25) translateY(-10px) rotate(5deg)' },
          '50%': { opacity: '1', transform: 'scale(1.15) translateY(0px) rotate(-3deg)' },
          '75%': { opacity: '1', transform: 'scale(1.18) translateY(-4px) rotate(2deg)' },
          '100%': { opacity: '1', transform: 'scale(1.1) translateY(0px) rotate(0deg)' },
        },
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
        },
        mascotHappy: {
          '0%': { transform: 'translateY(0) scale(1) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) scale(1.15) rotate(6deg)' },
          '100%': { transform: 'translateY(-4px) scale(1.1) rotate(-6deg)' },
        },
        mascotCelebrate: {
          '0%, 100%': { transform: 'translateY(0) scale(1) rotate(0deg)' },
          '25%': { transform: 'translateY(-18px) scale(1.25) rotate(-10deg)' },
          '50%': { transform: 'translateY(-8px) scale(1.2) rotate(10deg)' },
          '75%': { transform: 'translateY(-14px) scale(1.22) rotate(-5deg)' },
        },
        mascotWiggle: {
          '0%, 100%': { transform: 'rotate(-8deg)' },
          '50%': { transform: 'rotate(8deg)' },
        }
      }
    },
  },
  plugins: [],
}
