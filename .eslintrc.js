const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  extends: ['standard', 'plugin:prettier/recommended', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  globals: {},
  env: {
    mocha: true,
    node: true,
  },
  plugins: ['havven', 'no-only-tests'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'havven/no-assert-revert-without-await': 'error',
    'havven/no-assert-invalid-opcode-without-await': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'no-process-exit': 'off',
    'standard/computed-property-even-spacing': 'off',
    'no-only-tests/no-only-tests': 'error',
  },
};
