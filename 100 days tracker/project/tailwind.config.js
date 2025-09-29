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
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // GitHub-style dark mode colors - properly extended
        github: {
          dark: {
            bg: {
              primary: '#0d1117',
              secondary: '#161b22',
              tertiary: '#010409',
            },
            border: {
              primary: '#30363d',
              secondary: '#21262d',
            },
            text: {
              primary: '#f0f6fc',
              secondary: '#b1bac4',
              tertiary: '#8b949e',
            },
            accent: {
              primary: '#58a6ff',
              hover: '#79c0ff',
            }
          },
          light: {
            bg: {
              primary: '#ffffff',
              secondary: '#f6f8fa',
              tertiary: '#ffffff',
            },
            border: {
              primary: '#d0d7de',
              secondary: '#d0d7de',
            },
            text: {
              primary: '#24292f',
              secondary: '#57606a',
              tertiary: '#6e7781',
            },
            accent: {
              primary: '#0969da',
              hover: '#0550ae',
            }
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'progress': 'progress 1s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
      },
    },
  },
  plugins: [],
}