/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */


module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};


const path = require('path');
const blacklist = require('metro-config/src/defaults/exclusionList');

const watchFolders = [
  // Add any additional watch folders if needed
];