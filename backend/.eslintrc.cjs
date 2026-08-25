module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  root: true,
  ignorePatterns: ['frontend/**/*', 'dist/**/*', '.eslintrc.cjs'],
  env: {
    node: true,
    jest: true,
  },
};
