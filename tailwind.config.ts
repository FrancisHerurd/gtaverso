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
        // 🔥 GTA VERDE NEÓN (tu Figma)
        'gta-green': {
          DEFAULT: '#00FF41',
          500: '#00FF41',
          400: '#33ff66',
          300: '#66ff99',
          dark: '#00cc34',
        },
        // Tus colores originales (mantengo)
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
          light: '#60A5FA',
        },
        dark: {
          DEFAULT: '#1F2937',
          800: '#111827',
          700: '#374151',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class', // ← Dark mode por class="dark"
}

export default config