const preset = require('@react-native/jest-preset');

module.exports = {
  ...preset,
  setupFiles: [
    ...preset.setupFiles,
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native-vector-icons|react-native-gesture-handler|react-native-screens|react-native-toast-message|@react-navigation)/)',
  ],
};
