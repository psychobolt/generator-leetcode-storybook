import path from 'path';
import slash from 'slash';
import Generator from 'yeoman-generator';

import resolver from './Problem.resolver.js';
import validator from './Problem.validator.js';

const getPathParts = pathInput => (pathInput ? slash(pathInput.trim()).split('/') : []);

export default class Problem extends Generator {
  async prompting() {
    this.answers = await this.prompt([{
      type: 'number',
      name: 'id',
      message: 'Enter the problem ID',
      validate: validator.id,
    }, {
      type: 'input',
      name: 'pathInput',
      message: 'Enter a path you want to create this problem in (e.g. Array/1D)',
    }, {
      type: 'confirm',
      name: 'generateTestCases',
      message: 'Do you wish to generate a unit test stub?',
      default: true,
    }]);
  }

  writing() {
    const { id, pathInput = '', generateTestCases } = this.answers;
    const pathParts = getPathParts(pathInput);
    let problem = resolver.problem(id);
    problem = {
      ...problem,
      path: [...pathParts, problem.title].join('/'),
      ...resolver.metadata(id, problem.title),
    };
    const name = problem.title.replace(' ', '');
    const camelName = name.charAt(0).toLowerCase() + name.slice(1);
    const destinationPath = path.join(...[this.destinationRoot(), ...pathParts]);

    this.fs.copyTpl(
      this.templatePath('Problem.mdx'),
      this.destinationPath(path.join(destinationPath, `${name}.stories.mdx`)),
      problem,
    );

    const code = resolver.code(id);
    this.fs.copyTpl(
      this.templatePath('solution.js.ejs'),
      this.destinationPath(path.join(destinationPath, `${camelName}.es3.cjs`)),
      { code },
    );

    if (generateTestCases) {
      this.fs.copy(
        this.templatePath('testCases.js'),
        this.destinationPath(path.join(destinationPath, 'testCases.js')),
      );
      this.fs.copyTpl(
        this.templatePath('problem.test.js'),
        this.destinationPath(path.join(destinationPath, `${camelName}.test.js`)),
        {
          name: camelName,
          path: problem.path,
        },
      );
    }
  }
}
