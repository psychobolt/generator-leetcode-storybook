import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import glob from 'glob';
import toAbsGlob from 'to-absolute-glob';
import slash from 'slash';
import Generator from 'yeoman-generator';
import requireFromString from 'require-from-string';

import Problem from '../Problem/index.js';

const require = createRequire(import/*:: ("") */.meta.url);
const readFile = filepath => fs.readFileSync(filepath, { encoding: 'utf-8' });

export default class Main extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('storiesDir', { type: String });
  }

  initializing() {
    const destinationPath = slash(this.destinationPath());
    const storybookConfigDir = slash(path.join(destinationPath, '.storybook'));
    this.storybookConfigDir = storybookConfigDir;

    if (!this.options.storiesDir) {
      const files = glob.sync(`${storybookConfigDir}/main.?(c)js`);
      if (files.length) {
        const filepath = files[0];
        const { stories } = requireFromString(readFile(filepath), filepath);
        const storiesDirs = Object.keys(stories.reduce((dir, storyPath) => ({
          ...dir,
          [[...toAbsGlob(`${storybookConfigDir}/${storyPath}`).replace(destinationPath, '.').match(/\/.+?\//)].join('')]: '',
        }), {}));
        if (!storiesDirs.length || storiesDirs.length > 1) {
          this.env.error('Primary stories directory is ambigious. Please specify the target directory in options');
        }
        const [storiesDir] = storiesDirs;
        this.options.storiesDir = `.${storiesDir}`;
      } else {
        this.env.error('No storybook setup detected! Please run the generator at the project root.');
      }
    }

    this.log(`Stories directory: ${this.options.storiesDir}`);

    this.composeWith({
      Generator: Problem,
      path: require.resolve('../Problem/index.js'),
    }, this.options);
  }

  writing() {
    const filename = 'leetcode-badges.js';
    this.fs.copy(
      this.templatePath(filename),
      fs.existsSync(this.storybookConfigDir)
        ? path.resolve(this.storybookConfigDir, filename)
        : this.destinationPath('.storybook', filename),
    );
  }

  async install() {
    const devDependencies = this.packageJson.get('devDependencies');
    const semver = devDependencies && devDependencies['@storybook/react'];
    if (semver) {
      this.addDevDependencies({
        '@storybook/addons': semver,
        '@storybook/addon-docs': semver,
        '@storybook/api': semver,
        '@storybook/components': semver,
        '@storybook/theming': semver,
        '@geometricpanda/storybook-addon-badges': '0.2.1',
        'markdown-to-jsx': '7.1.7',
      });
    } else {
      this.log('No React Storybook configured. Please install React and run "sb init" on your project.');
    }
  }
}
