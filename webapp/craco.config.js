const CracoEnvPlugin = require("craco-plugin-env");

module.exports = {
  plugins: [
    {
      plugin: CracoEnvPlugin,
      options: {
        variables: {},
      },
    },
  ],
  webpack: {
    configure: {
      experiments: {
        topLevelAwait: true,
      },
    },
  },
};
