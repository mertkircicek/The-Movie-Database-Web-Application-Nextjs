/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}", // Mevcut projenizdeki src klasörünü de taramasını sağlayın
  ],
  theme: {
    extend: {
      colors: {
        // Kendi özel renklerinizi buraya ekleyin
        tmdbDarkBlue: 'rgb(3,37,65)',
        tmdbLightGreen: 'rgb(30,213,169)',
        tmdbLightBlue: 'rgb(1,180,228)'
      },
    },
  },
  plugins: [],
};
