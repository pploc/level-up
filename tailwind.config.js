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
          50: '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#29b6f6',
          500: '#00add8',
          600: '#0097a7',
          700: '#00838f',
          800: '#006064',
          900: '#004d40',
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
        'push-up': 'pushUp 0.8s ease-in-out infinite alternate',
        'dumbbell-lift': 'dumbbellLift 1s ease-in-out infinite alternate',
        'barbell-bob': 'barbellBob 0.6s ease-in-out infinite alternate',
        'meditate-float': 'meditateFloat 2.5s ease-in-out infinite alternate',
        'typing-paw-left': 'typingPaw 0.2s ease-in-out infinite alternate',
        'typing-paw-right': 'typingPaw 0.2s ease-in-out infinite alternate 0.1s',
        'chug-tilt': 'chugTilt 0.8s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pushUp: {
          '0%': { transform: 'scale(1) translateY(0px)' },
          '100%': { transform: 'scale(0.92, 0.85) translateY(12px)' },
        },
        dumbbellLift: {
          '0%': { transform: 'translateY(6px) scale(0.98)' },
          '100%': { transform: 'translateY(-6px) scale(1.02)' },
        },
        barbellBob: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-4px)' },
        },
        meditateFloat: {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1deg)' },
          '100%': { transform: 'translateY(0px) rotate(-1deg)' },
        },
        typingPaw: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-3px)' },
        },
        chugTilt: {
          '0%': { transform: 'rotate(-4deg)' },
          '100%': { transform: 'rotate(6deg)' },
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
