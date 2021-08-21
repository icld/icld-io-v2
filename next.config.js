const withPlugins = require('next-compose-plugins');

const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/,
});

module.exports = withPlugins([
  withMDX({
    pageExtensions: ['js', 'jsx', 'mdx', 'md'],
  }),
]);
