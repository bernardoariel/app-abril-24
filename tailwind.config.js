/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        orangeCustom: '#EF7E00',
        orangeCustom2: '#EF7D00',
        orangeCustom3: '#FCB800',
        orangeCustom4: '#efae00',
        orangeCustom5: '#F27F00',
        orangeCustom3Translucent: 'rgba(252, 184, 0, 0.4)',
      },
    },
  },

  plugins: [require('daisyui')],

  daisyui: {
    themes: ['retro'],
  },
};
