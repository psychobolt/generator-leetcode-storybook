![main_logo](https://raw.githubusercontent.com/psychobolt/generator-leetcode-storybook/master/logo.png)

# Generator Leetcode Storybook

[![Main workflow](https://github.com/psychobolt/generator-leetcode-storybook/actions/workflows/main.yml/badge.svg)](https://github.com/psychobolt/generator-leetcode-storybook/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/psychobolt/generator-leetcode-storybook/branch/main/graph/badge.svg)](https://codecov.io/gh/psychobolt/generator-leetcode-storybook/tree/main/src)

A [Yeoman](https://yeoman.io/) Generator that scaffolds [LeetCode](https://leetcode.com/) problems templates into your [Storybook](https://storybook.js.org/). 
> [pyscript](https://www.anaconda.com/blog/pyscript-python-in-the-browser) support coming soon!

## Example Storybook

https://psychobolt.github.io/leetcode-storybook

## Requirements

Yeoman and a [storybook](https://storybook.js.org/) project (semver ^6.4.x) with the following packages:

 - `@storybook/addon-docs`@(same semver as storybook)
 - `@storybook/components`@(same semver as storybook)
 - `@storybook/theming`@(same semver as storybook)
 - `@geometricpanda/storybook-addon-badges@^0.2.1`
 - `@markdown-to-jsx@^7.1.7`

## Install (Coming Soon)

1. Install the library and essential Storybook plugins, 

```sh
npm install -g generator-leetcode-storybook
# or 
yarn global add generator-leetcode-storybook
# or yarn/berry
yarn dlx add generator-leetcode-storybook
```

2. Login using [Leetcode CLI](https://www.npmjs.com/package/vsc-leetcode-cli)

```sh
npm leetcode
#or 
yarn leetcode user [-lgi] # See official docs for user login options.
```

> Note: Leetcode CLI only supports [github](https://github.com/) or [linkedin](https://www.linkedin.com) logins for US


3. Run the Generator with Yeoman in your Storybook project and answer the generator's prompts

```sh
yo leetcode-storybook
``` 

## Development Guide

Please see [DEVELOPMENT.md](DEVELOPMENT.md)
