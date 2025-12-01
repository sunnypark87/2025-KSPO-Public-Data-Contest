/**
 * Basic Tailwind config: content discovery is handled by @tailwindcss/vite,
 * so extend the theme here when you need custom tokens.
 * @type {import('tailwindcss').Config}
 */
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#22d3ee',
          dark: '#0e7490',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
    },
  },
}

