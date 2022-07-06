module.exports = {
  module: {
    rules: [
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      },
      {
        resourceQuery: /file/,
        type: 'asset/resource',
        generator: {
          filename: '[file]',
        },
      },
    ],
  },
};
