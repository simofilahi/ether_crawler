module.exports = {
  purge: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        "1024-px": "1024px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
