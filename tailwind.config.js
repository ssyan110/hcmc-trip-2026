/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 這行最重要，確保它能掃描到 src 裡的所有程式碼
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}