/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },

  plugins: [require('daisyui')],

  daisyui: {
    themes: ['retro'], // Habilita el tema 'retro' de DaisyUI
  },
};
