import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0f'
      },
      boxShadow: {
        soft: '0 16px 48px rgba(0,0,0,0.24)'
      }
    }
  },
  plugins: []
};

export default config;
