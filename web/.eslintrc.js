module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        'no-trailing-spaces': 'off',
        indent: "off",
      },
      parser: 'vue-eslint-parser',
      parserOptions: {
        ecmaVersion: 2020,
      },
    },
  ],
};
