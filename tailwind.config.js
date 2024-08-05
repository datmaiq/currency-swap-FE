module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "pink-bg": "#efeaf4",
      },
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
      },
      backgroundImage: {
        "99-bg": "url('assets/background/bg.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
