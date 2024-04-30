module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['@react-native-community', 'plugin:@typescript-eslint/recommended'],
  rules: {
    // Enforce the use of "type" for type definitions instead of "interface"
    '@typescript-eslint/consistent-type-definitions': ['error', 'type']
  }
}
