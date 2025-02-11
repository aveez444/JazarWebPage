// postcss.config.cjs
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'), // Add the new TailwindCSS PostCSS plugin here
    require('autoprefixer'),          // Autoprefixer is also needed for Tailwind
  ]
}
