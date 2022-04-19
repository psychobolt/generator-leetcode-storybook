import { createRequire } from 'module';
import Generator from 'yeoman-generator';

import Problem from '../Problem/index.js';

const require = createRequire(import.meta.url);
export default class Main extends Generator {
  initializing() {
    this.composeWith({
      Generator: Problem,
      path: require.resolve('../Problem/index.js'),
    });
  }
}
