module.exports = {
  root: true,
  extends: ["@react-native", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-require-imports": "off",
  },
  overrides: [
    {
      files: ["*.config.js", ".eslintrc.js", "babel.config.js"],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
      },
    },
  ],
};
