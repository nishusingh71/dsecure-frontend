module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    screens: {
      'xs': '475px',      // Extra small devices (large phones)
      'sm': '640px',      // Small devices (tablets)
      'md': '768px',      // Medium devices (small laptops)  
      'lg': '1024px',     // Large devices (laptops/desktops)
      'xl': '1280px',     // Extra large devices (large desktops)
      'xxl': '1536px',    // 2X Extra large devices (larger desktops)
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2563eb',
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
      },
      boxShadow: {
        card: '0 8px 30px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        xl: '1rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 300ms ease-out both',
        'slide-down': 'slide-down 200ms ease-out both',
        pop: 'pop 180ms ease-out both',
      },
    },
  },
  plugins: [],
}
