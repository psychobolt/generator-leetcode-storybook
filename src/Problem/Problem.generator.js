import fs from 'fs';
import path from 'path';
import glob from 'glob';
import slash from 'slash';
import Generator from 'yeoman-generator';

import { setCache } from './Problem.actions.js';
import resolver from './Problem.resolver.js';
import validator from './Problem.validator.js';

const readFile = filepath => fs.readFileSync(filepath, { encoding: 'utf-8' });

const getPathParts = pathInput => (pathInput ? slash(pathInput.trim()).split('/') : []);

function getLanguageAlias(language) {
  if (language === 'python3') return 'python';
  return language;
}

export default class Problem extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('cache', { type: String, default: opts.cache });
    this.option('problemId', { type: Number, default: opts.problemId });
    this.option('path', { type: String, default: opts.path });
    this.option('languages', { type: String, default: opts.languages });
  }

  initializing() {
    const { cache } = this.options;
    if (cache) {
      setCache([JSON.parse(readFile(cache))]);
    }
  }

  async prompting() {
    const { id = this.options.problemId } = await this.prompt([
      {
        type: 'number',
        name: 'id',
        message: 'Enter the problem ID',
        validate: validator.id,
        when: !this.options.cache || !this.options.problemId,
      },
    ]);
    const { languages = this.options.languages } = await this.prompt([
      {
        type: 'input',
        name: 'languages',
        message: 'Enter comma seperated languages you wish to generate code for',
        validate: validator.languages,
        default: (this.config.getPath(`problem.$${id}.languages`) || []).join(',') || 'javascript',
        when: !this.options.languages,
      },
    ]);
    const savedPath = this.config.getPath(`problem.$${id}.path`);
    const { pathInput = this.options.path || '' } = await this.prompt([{
      type: 'input',
      name: 'pathInput',
      message: `Enter a path you want to create this problem in, e.g.${savedPath ? '' : ' (DataStructure/Array)'}`,
      default: this.config.getPath(`problem.$${id}.path`) || undefined,
      when: !this.options.path,
    }]);
    this.problemId = id;
    this.pathInput = pathInput;
    this.languages = [...new Set(['javascript', ...languages.split(/\s*,\s*/).map(getLanguageAlias)])];
  }

  configuring() {
    this.config.merge({
      problem: {
        [`$${this.problemId}`]: {
          path: this.pathInput,
          languages: this.languages,
        },
      },
    });
    this.config.save();
  }

  writing() {
    const { problemId: id, pathInput, languages } = this;
    const pathParts = getPathParts(pathInput);
    const problem = resolver.problem(id);
    const metadata = resolver.metadata(id, problem.title);
    const [jsCode, ...codeList] = resolver.code(id, languages);
    const { alias, source } = jsCode;
    const name = alias.charAt(0).toUpperCase() + alias.slice(1);
    const titlePath = [...pathParts.map(pathPart => pathPart.replace(/([A-Z]+)*([A-Z][a-z])/g, '$1 $2').trim()), `[${id}] ${problem.title}`].join('/');
    const relativePath = path.join(this.options.storiesDir, ...pathParts, name);
    const destinationPath = path.join(this.destinationRoot(), relativePath);
    const problemPath = `./${name}.md`;
    const solutionPath = (ext = 'es3.cjs') => `./${alias}.${ext}`;

    // See https://github.com/LeetCode-OpenSource/vscode-leetcode/blob/de1dc4161b497b4f76faad2363abab0104a75373/src/webview/leetCodePreviewProvider.ts#L48
    this.fs.copyTpl(
      this.templatePath('Problem.md'),
      this.destinationPath(path.join(destinationPath, `${name}.md`)),
      {
        ...problem,
        ...metadata,
      },
    );

    this.fs.copyTpl(
      this.templatePath('Problem.mdx'),
      this.destinationPath(path.join(destinationPath, `${name}.problem.mdx`)),
      {
        titlePath,
        problemPath,
        badges: `['${metadata.tags.concat(metadata.companies).join('\', \'')}']`,
      },
    );

    this.fs.copyTpl(
      this.templatePath('javascript', 'Solution.mdx'),
      this.destinationPath(path.join(destinationPath, 'javascript', `${name}.solution.mdx`)),
      {
        titlePath: titlePath.concat('/Solution/Javascript'),
        solutionPath: solutionPath(),
      },
    );

    codeList.forEach(code => {
      const suffix = resolver.LANGUAGE_MAP[code.language];
      const templatePath = this.templatePath(code.language, 'Solution.mdx');
      this.fs.copyTpl(
        fs.existsSync(templatePath) ? templatePath : this.templatePath('Solution.mdx'),
        this.destinationPath(path.join(destinationPath, code.language, `${name}.solution.mdx`)),
        {
          titlePath: titlePath.concat('/Solution', `/${code.language.charAt(0).toUpperCase() + code.language.slice(1)}`),
          problemName: alias,
          solutionPath: solutionPath(suffix),
        },
      );
    });

    this.fs.copyTpl(
      this.templatePath('solution.ejs'),
      this.destinationPath(path.join(this.destinationRoot(), relativePath, 'javascript', solutionPath())),
      { source },
    );

    codeList.forEach(code => {
      this.fs.copyTpl(
        this.templatePath('solution.ejs'),
        this.destinationPath(
          path.join(
            this.destinationRoot(),
            relativePath,
            code.language,
            solutionPath(resolver.LANGUAGE_MAP[code.language]),
          ),
        ),
        { source: code.source },
      );
    });

    this.fs.copy(
      this.templatePath('testCases.json'),
      this.destinationPath(path.join(destinationPath, 'testCases.json')),
    );

    this.fs.copy(
      this.templatePath('javascript', 'testCases.js'),
      this.destinationPath(path.join(destinationPath, 'javascript', 'testCases.js')),
    );

    codeList.forEach(code => {
      const suffix = resolver.LANGUAGE_MAP[code.language];
      const templatePath = this.templatePath(code.language, 'testCases.ejs');
      if (fs.existsSync(templatePath)) {
        this.fs.copyTpl(
          templatePath,
          this.destinationPath(path.join(destinationPath, code.language, `testCases.${suffix}`)),
        );
      }
    });

    this.fs.copyTpl(
      this.templatePath('javascript', 'problem.test.js'),
      this.destinationPath(path.join(destinationPath, 'javascript', `${alias}.test.js`)),
      {
        solutionPath: solutionPath(),
        titlePath,
      },
    );

    codeList.forEach(code => {
      const suffix = resolver.LANGUAGE_MAP[code.language];
      const files = glob.sync(`${this.templatePath(code.language)}/*test.*`);
      if (files.length) {
        const templatePath = files[0];
        const filename = /.+\/(.+)\..+$/.exec(templatePath)[1];
        this.fs.copyTpl(
          templatePath,
          this.destinationPath(path.join(destinationPath, code.language, `${filename}.${suffix}`)),
          { problemName: alias },
        );
      }
    });
  }
}
