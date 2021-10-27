module.exports = {
  webpack: (config) => {
    config.experiments = config.experiments || {};
    config.experiments.buildHttp = true;

    return config;
  },
  images: {
    domains: [
      'cdn.sanity.io',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
    ],
  },
};
