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
      message: 'Enter a path you want to create this problem in (e.g. DataStructure/Array)',
    }]);
  }

  writing() {
    const { id, pathInput = '' } = this.answers;
    const pathParts = getPathParts(pathInput);
    const problem = resolver.problem(id);
    const { alias, source } = resolver.code(id);
    const name = alias.charAt(0).toUpperCase() + alias.slice(1);
    const titlePath = [...pathParts.map(pathPart => pathPart.replace(/([A-Z]+)*([A-Z][a-z])/g, '$1 $2').trim()), `[${id}] ${problem.title}`].join('/');
    const relativePath = `./${path.join(...pathParts, name)}`;
    const destinationPath = path.join(this.destinationRoot(), relativePath);
    const problemPath = `./${name}.md`;
    const solutionPath = `./${alias}.es3.cjs`;

    // See https://github.com/LeetCode-OpenSource/vscode-leetcode/blob/de1dc4161b497b4f76faad2363abab0104a75373/src/webview/leetCodePreviewProvider.ts#L48
    this.fs.copyTpl(
      this.templatePath('Problem.md'),
      this.destinationPath(path.join(destinationPath, `${name}.md`)),
      {
        ...problem,
        ...resolver.metadata(id, problem.title),
      },
    );

    this.fs.copyTpl(
      this.templatePath('Problem.mdx'),
      this.destinationPath(path.join(destinationPath, `${name}.problem.mdx`)),
      {
        titlePath,
        problemPath,
      },
    );

    this.fs.copyTpl(
      this.templatePath('Solution.mdx'),
      this.destinationPath(path.join(destinationPath, `${name}.solution.mdx`)),
      {
        titlePath,
        solutionPath,
      },
    );

    this.fs.copyTpl(
      this.templatePath('solution.js.ejs'),
      this.destinationPath(path.join(this.destinationRoot(), relativePath, solutionPath)),
      { source },
    );

    this.fs.copy(
      this.templatePath('testCases.js'),
      this.destinationPath(path.join(destinationPath, 'testCases.js')),
    );
    this.fs.copyTpl(
      this.templatePath('problem.test.js'),
      this.destinationPath(path.join(destinationPath, `${alias}.test.js`)),
      {
        solutionPath,
        titlePath,
      },
    );
  }
}
