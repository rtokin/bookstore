/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,scss}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F27A2',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

