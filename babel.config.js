module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel', // Ensure this is correctly added as a separate entry
      [
        'module-resolver',
        {
          // Start of the module-resolver configuration
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@screens': './src/app/screens',
            '@images': './src/images'
          }
        }
      ]
    ]
  }
}
