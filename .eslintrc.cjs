module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['@react-native-community', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    sourceType: "module",
    createDefaultProgram: true,       
    // project: ["./tsconfig.json"], // could be tsconfig.json too
    ignores: ["./*"]
}
}
