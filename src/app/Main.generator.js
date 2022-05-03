import { createRequire } from 'module';
import Generator from 'yeoman-generator';

import Problem from '../Problem/index.js';

const require = createRequire(import/*:: ("") */.meta.url);

export default class Main extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('storiesDir', { type: String, default: './' });
  }

  initializing() {
    this.composeWith({
      Generator: Problem,
      path: require.resolve('../Problem/index.js'),
    }, this.options);
  }
}
