import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import helpers from 'yeoman-test';
import rimraf from 'rimraf';

const dirname = path.dirname(fileURLToPath(import/*:: ("") */.meta.url));
const tmpDir = path.resolve(dirname, 'tmp');
const generator = path.resolve(dirname, '..', 'index.js');
const cache = path.resolve(dirname, '..', '..', 'Problem', '__tests__', '1.two-sum.algorithms.json');

function createTempConfig(sessionDir, contents) {
  const storybookDir = path.resolve(sessionDir, '.storybook');
  const storybookConfig = path.resolve(storybookDir, 'main.cjs');
  fs.mkdirSync(storybookDir, { recursive: true });
  fs.writeFileSync(storybookConfig, contents);
}

describe(`Main Generator ${(generator)} runs correctly`, () => {
  afterAll(done => rimraf(
    tmpDir,
    { disableGlob: true },
    error => {
      expect(error).toEqual(null);
      done();
    },
  ));

  it('with prompts', async () => {
    const sessionDir = path.resolve(tmpDir, `${new Date().getTime()}`);
    await helpers.create(generator)
      .inDir(sessionDir, () => createTempConfig(
        sessionDir,
        'module.exports = { stories: [\'../stories/**/*.(problem|solution).mdx\'] };',
      ))
      .withPrompts({ id: 1, pathInput: 'Array' })
      .withOptions({ cache })
      .build()
      .run();
  });

  it('with ambigious stories directory', async () => {
    const sessionDir = path.resolve(tmpDir, `${new Date().getTime()}`);
    try {
      await helpers.create(generator)
        .inDir(sessionDir, () => createTempConfig(
          sessionDir,
          'module.exports = { stories: [\'../src/**/*.stories.js\', \'../stories/**/*.stories.mdx\'] };',
        ))
        .build()
        .run();
    } catch (e) {
      expect(e.message).toMatch('Primary stories directory is ambigious. Please specify the target directory in options');
    }
  });

  it('with missing storybook config', async () => {
    const sessionDir = path.resolve(tmpDir, `${new Date().getTime()}`);
    try {
      await helpers.create(generator)
        .inDir(sessionDir)
        .build()
        .run();
    } catch (e) {
      expect(e.message).toMatch('No storybook setup detected! Please run the generator at the project root.');
    }
  });

  it('with options', async () => {
    const sessionDir = path.resolve(tmpDir, `${new Date().getTime()}`);
    await helpers.create(generator)
      .inDir(sessionDir)
      .withOptions({ storiesDir: './stories', cache, problemId: 1 })
      .build()
      .run();
  });
});
