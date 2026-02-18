import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gta-green': {
          DEFAULT: '#00FF41',
          500: '#00FF41',
          400: '#33ff66',
          300: '#66ff99',
          dark: '#00cc34',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '(--container)': '1216px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

export default config