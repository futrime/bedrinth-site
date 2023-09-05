/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["HarmonyOS Sans SC", "-apple-system", "BlinkMacSystemFont", "Helvetica Neue", "Helvetica", "Arial", "PingFang SC", "Roboto", "Microsoft YaHei", "sans-serif"],
        serif: ['Merriweather', 'serif'],
      },
    },

  },
  plugins: [require("tw-elements/dist/plugin.cjs"), require('flowbite/plugin'), require('@tailwindcss/forms'),],
  darkMode: "class"
}

