![main_logo](https://raw.githubusercontent.com/psychobolt/generator-leetcode-storybook/master/logo.png)

# Generator Leetcode Storybook

[![npm](https://img.shields.io/npm/v/generator-leetcode-storybook.svg)](https://www.npmjs.com/package/generator-leetcode-storybook)
[![Main workflow](https://github.com/psychobolt/generator-leetcode-storybook/actions/workflows/main.yml/badge.svg)](https://github.com/psychobolt/generator-leetcode-storybook/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/psychobolt/generator-leetcode-storybook/branch/main/graph/badge.svg)](https://codecov.io/gh/psychobolt/generator-leetcode-storybook/tree/main/src)

A [Yeoman](https://yeoman.io/) Generator that scaffolds [LeetCode](https://leetcode.com/) problems templates into your [Storybook](https://storybook.js.org/).

## Example Storybook

https://psychobolt.github.io/leetcode-storybook

## Requirements

[Yeoman](https://yeoman.io/learning/index.html) and a [React storybook](https://storybook.js.org/docs/react/get-started/install) (6.4+) project with [Webpack 5 builder](https://www.npmjs.com/package/@storybook/builder-webpack5) preconfigued


> Alternatively, you may fork [psychobolt/leetcode-storybook-starter](https://github.com/psychobolt/leetcode-storybook-starter) which includes the necessary requirements and configurations.

## Install

```sh
npm install -g generator-leetcode-storybook vsc-leetcode-cli
```

## Configuration

1. Login using [Leetcode CLI](https://www.npmjs.com/package/vsc-leetcode-cli)

```sh
leetcode user [-g]  # Log in with github account. See official docs for user login options.
```

> Note: Leetcode CLI only supports [github](https://github.com/) or [linkedin](https://www.linkedin.com) logins for US accounts.

2. Include story paths for problem and solution for Storybook. For example,

```js
// .storybook/main.js
module.exports = {
  /* ... */
  stories: [
    '../**/*.(problem|solution).mdx',
    /* ... */
  ],
  /* ... */
};
```

3. Include `asset/source` rule for Markdown (`.md`) files using a custom webpack config. For example,

```js
// .storybook/main.js
module.exports = {
  /* ... */
  webpackFinal: config => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules.map(rule => {
          if (test.test('.md')) {
            return { ...rule, resourceQuery: { not: [/raw/] } };
          }
          return rule;
        }),
        {
          resourceQuery: /raw/,
          type: 'asset/source',
        },
      ],
    },
    /* ... */
  }),
  /* ... */
};
```

4. (Optional) Configure Storybook Badges. For example,

```js
// .storybook/preview.js
import badgesConfig from './leetcode-badges.js';

export const parameters = {
  /* ... */
  badgesConfig, // include badgesConfig
};
```

Include the badges addon,

```js
// .storybook/main.js
module.exports = {
  /* ... */
  addons: [
    '@geometricpanda/storybook-addon-badges',
    /* ... */
  ],
  /* ... */
};
```

## Usage

Run the Generator with Yeoman in your Storybook project and answer the generator's prompts

```sh
yo leetcode-storybook
``` 

> It is recommended to run the generator at the project root in order to detect your .storybook/ configurations.

## Development Guide

Please see [DEVELOPMENT.md](DEVELOPMENT.md)
