module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-console": "warn", //NOTE: Marcar como warn los clg
    "no-warning-comments": [
      "warn",
      { terms: ["todo", "fixme", "note"], location: "anywhere" }, // NOTE: Marcar como warn los coments con los prefijos anteriores
    ],
  },
};
