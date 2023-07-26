/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      animation: {
        meteor: 'meteor 5s linear infinite',
        'text-gradient': 'text-gradient 1.5s linear infinite',
      },
      keyframes: {
        'text-gradient': {
          to: {
            backgroundPosition: '200% center',
          },
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: 1 },
          '70%': { opacity: 1 },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: 0,
          },
        },
      },
      colors: {
        midu: {
          primary: '#0099FF',
          secondary: '#DEF2FF',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('flowbite/plugin'), require('tailwindcss-textshadow')],
}
