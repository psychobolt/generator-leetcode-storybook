const webpackConfig = require('./webpack.config.cjs');

module.exports = {
  stories: [
    '../tmp/**/*.(problem|solution).mdx',
  ],
  addons: [
    '@geometricpanda/storybook-addon-badges',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  features: {
    babelModeV7: true,
  },
  webpackFinal: config => ({
    ...config,
    ...webpackConfig,
    module: {
      ...config.module,
      ...webpackConfig.module,
      rules: [
        ...config.module.rules.map(rule => {
          const { test, exclude } = rule;
          if (test.test('.md')) {
            return {};
          }
          if (exclude && exclude.test('.stories.mdx')) {
            return { ...rule, test: /\.md$/, resourceQuery: { not: [/raw/] } };
          }
          if (test.test('.stories.mdx')) {
            return { ...rule, test: /\.mdx$/ };
          }
          if (test.test('.js')) {
            return {
              ...rule,
              resourceQuery: { not: [/raw/] },
            };
          }
          return rule;
        }),
        ...webpackConfig.module.rules,
      ],
    },
  }),
};
