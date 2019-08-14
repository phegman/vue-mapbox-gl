module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
  rules: {
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
}
