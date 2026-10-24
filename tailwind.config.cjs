/**
 * Tailwind CSS configuration for KaamSetu prototype.
 * Uses the brand color palette defined in the spec.
 */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2ECC71",
        "primary-dark": "#17623A",
        "light-yellow": "#FDF4C8",
        "off-white": "#FFFDF5",
        "main-text": "#17251F",
        "muted-text": "#66776D",
        border: "#E0E8E1",
        danger: "#C9473F",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem"
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.05)"
      }
    }
  },
  plugins: []
};
