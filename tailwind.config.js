/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'App.tsx'],
  theme: {
    extend: {
      colors: {
        'dacka-black': '#101010',
        'dacka-dark-gray': '#242424',
        'dacka-gray': '#919191',
        'dacka-green': '#3FA454'
      }
    }
  },
  plugins: []
}
