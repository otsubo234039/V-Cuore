// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 👇 これを追加して 'bg-gradient-radial' を使えるようにする
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        oshi: {
          // 👇 君の推しカラーをここに定義。後で変えるのも楽だよ
          primary: '#be2152',
        }
      }
    },
  },
  plugins: [],
}