/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          deep: '#0F3D3E',
          mid: '#165B5C',
          soft: '#EBF3F2',
        },
        gold: {
          muted: '#C59B27',
          soft: '#FBF6E8',
        },
        alabaster: '#FAF8F5',
        sand: {
          border: '#E8E4DC',
        },
        slate: {
          primary: '#1E293B',
          secondary: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['Amiri', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 2px 12px -2px rgba(15, 61, 62, 0.06), 0 1px 3px rgba(15, 61, 62, 0.04)',
        elevated: '0 12px 32px -8px rgba(15, 61, 62, 0.12), 0 4px 12px -2px rgba(15, 61, 62, 0.05)',
      },
    },
  },
  plugins: [],
};
