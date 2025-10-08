/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#1e40af',
        'card-background': '#ffffff',
        'border-color': '#e5e7eb',
        // Icon color palette
        'icon-blue': '#3b82f6',
        'icon-green': '#10b981',
        'icon-purple': '#8b5cf6',
        'icon-orange': '#f97316',
        'icon-red': '#ef4444',
        'icon-teal': '#14b8a6',
        'icon-pink': '#ec4899',
        'icon-indigo': '#6366f1',
        'icon-yellow': '#eab308',
        'icon-cyan': '#06b6d4',
      }
    },
  },
  plugins: [],
}
