import Generator from 'yeoman-generator';

import * as validator from './Problem.validator.js';

export default class Problem extends Generator {
  async prompting() {
    this.answers = await this.prompt([{
      type: 'number',
      name: 'id',
      message: 'Enter the problem ID',
      validate: validator.id,
    }]);
  }
}
