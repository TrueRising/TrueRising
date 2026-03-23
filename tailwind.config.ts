import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        backgroundPrimary: '#0A0B0D',
        backgroundSecondary: '#101218',
        surface: '#171A21',
        surfaceElevated: '#1D212A',
        textPrimary: '#F5F7FA',
        textSecondary: '#AAB2BF',
        accentPrimary: '#2F6BFF',
        accentHover: '#1F57E7',
        borderSubtle: 'rgba(255,255,255,0.08)'
      },
      borderRadius: {
        button: '14px',
        input: '14px',
        card: '20px',
        section: '24px'
      },
      maxWidth: {
        container: '1280px'
      },
      boxShadow: {
        premium: '0 16px 48px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: []
};

export default config;
