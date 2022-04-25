import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import helpers from 'yeoman-test';

import resolver from '../../Problem/Problem.resolver.js';

const tmpDir = path.resolve('tmp');
const generator = path.resolve('src', 'app', 'index.js');

const dirname = path.dirname(fileURLToPath(import/*:: ("") */.meta.url));
const readFile = filepath => fs.readFileSync(path.resolve(dirname, filepath), { encoding: 'utf-8' });

describe(`Main Generator ${(generator)} runs correctly in ${tmpDir}`, () => {
  beforeAll(() => {
    resolver.setSpawnSync((_, args) => {
      let stdout = '';
      if (args[0] === 'show') {
        if (args[1] === '-x') {
          stdout = readFile('../../Problem/__tests__/TwoSum.md');
        }
        if (args[1] === '-c') {
          stdout = readFile('../../Problem/__tests__/twoSum.es3.cjs');
        }
      }
      return { stdout };
    });
  });

  it('with defaults', async () => {
    await helpers.create(generator)
      .inDir(tmpDir)
      .withPrompts({ id: 1 })
      .build()
      .run();
  });

  it('with prompts', async () => {
    await helpers.create(generator)
      .inDir(tmpDir)
      .withPrompts({ id: 1, pathInput: 'Array' })
      .build()
      .run();
  });
});
