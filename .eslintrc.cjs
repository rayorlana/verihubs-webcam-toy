module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  plugins: ['react-refresh', 'tailwindcss'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'prettier'],
  ignorePatterns: ['dist', '.eslintrc.cjs', '.prettierrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
