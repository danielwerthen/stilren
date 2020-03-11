module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    config.resolve = {
      ...config.resolve,
      alias: {
        react$: "@dwerthen/react-extension/react",
        ...config.resolve.alias
      }
    };
    return config;
  }
};
