/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F2937",
      },

      fontFamily: {
        kufi: ["Noto Kufi Arabic", "sans-serif"],
        ibm: ['IBM Plex Sans Arabic', 'sans-serif']
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
