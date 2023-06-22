module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['cypress'],
  extends: ['airbnb-base', 'plugin:cypress/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "import/prefer-default-export": "off"
  },
};
