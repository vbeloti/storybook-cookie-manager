module.exports = {
  env: {
    browser: true,
    node: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'mdx/code-blocks': true,
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': 'off',
  },
}
