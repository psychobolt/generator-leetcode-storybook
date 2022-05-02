import path from 'path';
import { fileURLToPath } from 'url';
import helpers from 'yeoman-test';

const tmpDir = path.resolve('tmp');
const generator = path.resolve('src', 'app', 'index.js');

const dirname = path.dirname(fileURLToPath(import/*:: ("") */.meta.url));
const cache = path.resolve(dirname, '..', '..', 'Problem', '__tests__', '1.two-sum.algorithms.json');

describe(`Main Generator ${(generator)} runs correctly in ${tmpDir}`, () => {
  it('with prompts', async () => {
    await helpers.create(generator)
      .inDir(tmpDir)
      .withPrompts({ id: 1, pathInput: 'Array' })
      .withOptions({ cache })
      .build()
      .run();
  });

  it('with options', async () => {
    await helpers.create(generator)
      .inDir(tmpDir)
      .withOptions({ cache, problemId: 1 })
      .build()
      .run();
  });
});
