/** @type {import("prettier").Options} */
const config = {
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  printWidth: 150,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
};

module.exports = config;
