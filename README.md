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

Yeoman and a [React storybook](https://github.com/psychobolt/leetcode-storybook-starter) project (semver ^6.4.x) setup with the following packages (`sb init` may already added some packages for you):

 - `@storybook/addon-docs`@(same semver as `@storybook/react`)
 - `@storybook/components`@(same semver as` @storybook/react`)
 - `@storybook/theming`@(same semver as `@storybook/react`)
 - `@geometricpanda/storybook-addon-badges@^0.2.1` (optional, see [Configure Storybook Badges](#-optional-configuring-storybook-badges))
 - `markdown-to-jsx@^7.1.7`


> Alternatively, you may fork the preconfigured repo, [leetcode-storybook-starter](https://github.com/psychobolt/leetcode-storybook-starter) which includes all configurations and requirements.

## Install (Coming Soon)

1. Install any [essential packages](#requirements).
2. Run the following

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
