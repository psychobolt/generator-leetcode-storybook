![main_logo](https://raw.githubusercontent.com/psychobolt/generator-leetcode-storybook/master/logo.png)

# Generator Leetcode Storybook

[![npm](https://img.shields.io/npm/v/generator-leetcode-storybook.svg)](https://www.npmjs.com/package/generator-leetcode-storybook)
[![Main workflow](https://github.com/psychobolt/generator-leetcode-storybook/actions/workflows/main.yml/badge.svg)](https://github.com/psychobolt/generator-leetcode-storybook/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/psychobolt/generator-leetcode-storybook/branch/main/graph/badge.svg)](https://codecov.io/gh/psychobolt/generator-leetcode-storybook/tree/main/src)

A [Yeoman](https://yeoman.io/) Generator that scaffolds [LeetCode](https://leetcode.com/) problems templates into your [Storybook](https://storybook.js.org/). 
> [pyscript](https://www.anaconda.com/blog/pyscript-python-in-the-browser) support coming soon!

## Example Storybook

https://psychobolt.github.io/leetcode-storybook

## Requirements

[Yeoman](https://yeoman.io/learning/index.html) and a [React storybook](https://storybook.js.org/docs/react/get-started/install) (+6.4) project


> Alternatively, you may fork [psychobolt/leetcode-storybook-starter](https://github.com/psychobolt/leetcode-storybook-starter) which includes the necesary requirements and configurations.

## Install (Coming Soon)

```sh
npm install -D generator-leetcode-storybook vsc-leetcode-cli
# or 
yarn add -D generator-leetcode-storybook vsc-leetcode-cli
```

## Configuration

1. Login using [Leetcode CLI](https://www.npmjs.com/package/vsc-leetcode-cli)

```sh
leetcode user [-g]  # Log in with github account. See official docs for user login options.
# or 
yarn leetcode user [-g]
```

> Note: Leetcode CLI only supports [github](https://github.com/) or [linkedin](https://www.linkedin.com) logins for US accounts.


2. Run the Generator with Yeoman in your Storybook project and answer the generator's prompts

```sh
yo leetcode-storybook
# or 
yarn yo leetcode-storybook
``` 

> It is recommended to run the generator at the project root in order to detect your .storybook/ configurations.

###  (Optional) Configure Storybook Badges

```js
// ./storybook/preview.js
import badgesConfig from './leetcode-badges.js';

export const parameters = {
  /* ... */
  badgesConfig, // include badgesConfig
};
```

## Development Guide

Please see [DEVELOPMENT.md](DEVELOPMENT.md)
