import Generator from 'yeoman-generator';

export default class Problem extends Generator {
  async prompting() {
    this.answers = await this.prompt([{
      type: 'input',
      name: 'id',
      message: 'Enter the problem ID',
    }]);
  }
}
