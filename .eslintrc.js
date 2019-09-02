module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: '@typescript-eslint/parser',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  rules: {
    'quotes': ['warn', 'single'],
    'no-multiple-empty-lines': 'off',
    'semi': 'off',
    'indent': ['error', 2],
    'no-unused-vars': 'off',
    'no-var-requires': 'off',
    'no-empty-interface': 'off',
    'no-explicit-any': 'off',
    'explicit-function-return-type': 'off',
    'no-use-before-define': 'off',
    'explicit-member-accessibility': 'off',
    'no-parameter-properties': 'off',
    'no-inferrable-types': 'off',
    'camelcase': 'off',
    'no-non-null-assertion': 'off',
    'no-param-reassign': 'off',
    'max-len': 'off',
    'class-methods-use-this': 'off',
    'no-empty-function': 'off',
  }
};
