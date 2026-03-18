/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        karada: {
          blue: '#00B2CA',
          green: '#7DC83E',
          'blue-dark': '#0090A6',
          'blue-light': '#E6F8FB',
          'green-light': '#F0F9E6',
        },
      },
      fontFamily: {
        sans: [
          '"Hiragino Kaku Gothic ProN"',
          '"Hiragino Sans"',
          'Meiryo',
          '"Yu Gothic"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
