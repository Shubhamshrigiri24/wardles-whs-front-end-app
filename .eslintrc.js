module.exports = {
  root: true,
  extends: ["react-app", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "react/jsx-fragments": 1,
    "react/jsx-max-props-per-line": [1, { maximum: 1, when: "multiline" }],
    "react/jsx-boolean-value": [1, "never"],
    "react/jsx-closing-bracket-location": 1,
    "react/jsx-closing-tag-location": 1,
    "react/jsx-curly-brace-presence": [
      1,
      { props: "always", children: "ignore" },
    ],
    "react/jsx-equals-spacing": [1, "never"],
    "react/jsx-first-prop-new-line": 1,
    "react/jsx-indent-props": [1, 2],
    "react/jsx-key": [2, { checkFragmentShorthand: true }],
    "react/jsx-no-bind": 1,
    "react/jsx-no-duplicate-props": 2,
    "react/jsx-no-useless-fragment": 1,
    "react/jsx-pascal-case": 2,
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: ["is", "should", "has", "can", "did", "will", "include"],
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
