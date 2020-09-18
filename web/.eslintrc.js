module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
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
    "import/prefer-default-export": "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        'no-trailing-spaces': 'off',
        'vue/script-indent': ["error", 2, { "baseIndent": 1 }],
        indent: "off",
      },
      parser: 'vue-eslint-parser',
      parserOptions: {
        ecmaVersion: 2020,
      },
    },
  ],
};
