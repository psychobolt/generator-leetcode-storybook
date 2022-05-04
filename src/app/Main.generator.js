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
    if (!this.options.storiesDir) {
      const destinationPath = slash(this.destinationPath());
      const storybookConfigDir = slash(path.join(destinationPath, '.storybook'));
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
}
