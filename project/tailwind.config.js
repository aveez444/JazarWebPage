// tailwind.config.js
module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}',  // This ensures all your React components are picked up by Tailwind
    ],
    theme: {
      extend: {},
    },
    plugins: [require("tailwind-scrollbar-hide")],
  }
  