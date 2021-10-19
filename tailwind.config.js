module.exports = {
  purge: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      spacing: {
        "990-px": "990px",
        "720-px": "720px",
        "600-px": "600px",
      },
      textColor: {
        matisse: "#1D6FA5",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
