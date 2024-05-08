const {ESLint} = require('@eslint/eslintrc');
const typescriptEslint = require('typescript-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = {
  ...typescriptEslint.configs.recommended,
  ...ESLint.configs.recommended,
  ...eslintPluginPrettierRecommended,
};
