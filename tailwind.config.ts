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
        // Colores basados en tu diseño Figma (ACTUALIZA estos valores con los de tu diseño)
        primary: {
          DEFAULT: '#3B82F6', // Azul principal
          dark: '#2563EB',
          light: '#60A5FA',
        },
        secondary: {
          DEFAULT: '#10B981', // Verde
          dark: '#059669',
          light: '#34D399',
        },
        accent: {
          DEFAULT: '#F59E0B', // Naranja/Amarillo
          dark: '#D97706',
          light: '#FBBF24',
        },
        dark: {
          DEFAULT: '#1F2937',
          800: '#111827',
          700: '#374151',
        },
        light: {
          DEFAULT: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
export default config