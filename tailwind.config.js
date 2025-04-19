module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        0.25: "1px",
      },
      borderRadius: {
        md: "6px",
        DEFAULT: "4px",
      },
      colors: {
        warning: "#fa8c16",
        info: "#1677ff",
        success: "#52c41a",
        error: "#f5222d",
        input: "#bfbfbf",
      },
    },
  },
  plugins: [],
  important: ".antd-calendar",
};
