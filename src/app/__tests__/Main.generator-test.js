import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import helpers from 'yeoman-test';

const dirname = path.dirname(fileURLToPath(import/*:: ("") */.meta.url));
const tmpDir = path.resolve(dirname, 'tmp');
const generator = path.resolve(dirname, '..', 'index.js');
const cache = path.resolve(dirname, '..', '..', 'Problem', '__tests__', '1.two-sum.algorithms.json');

function createPackageJSON(sessionDir, contents = '{ "devDependencies": { "@storybook/react": "6.4.22" } }') {
  fs.writeFileSync(path.resolve(sessionDir, 'package.json'), contents);
}

function createTempConfig(sessionDir, contents) {
  const storybookDir = path.resolve(sessionDir, '.storybook');
  const storybookConfig = path.resolve(storybookDir, 'main.cjs');
  fs.mkdirSync(storybookDir, { recursive: true });
  fs.writeFileSync(storybookConfig, contents);
}

describe(`Main Generator ${(generator)} runs correctly`, () => {
  describe('with prompts', () => {
    let runContext;

    beforeAll(() => {
      const sessionDir = path.resolve(tmpDir, `${new Date().getTime()}`);
      runContext = helpers.create(generator)
        .inDir(sessionDir, () => {
          createPackageJSON(sessionDir);
          createTempConfig(
            sessionDir,
            'module.exports = { stories: [\'../stories/**/*.(problem|solution).mdx\'] };',
          );
        })
        .withPrompts({ id: 1, pathInput: 'Array', languages: 'java' })
        .withOptions({ cache })
        .build();
    });

    test('and storybook config', async () => runContext.run());
  });

  describe('with no prompts', () => {
    let runContext;

    beforeAll(() => {
      const sessionDir = path.resolve(tmpDir, `${new Date().getTime()}`);
      runContext = helpers.create(generator)
        .inDir(sessionDir, () => {
          createPackageJSON(sessionDir);
          createTempConfig(
            sessionDir,
            'module.exports = { stories: [\'../src/**/*.stories.js\', \'../stories/**/*.stories.mdx\'] };',
          );
        })
        .build();
    });

    test('and ambigious stories directory', async () => {
      try {
        await runContext.run();
      } catch (e) {
        expect(e.message).toMatch('Primary stories directory is ambigious. Please specify the target directory in options');
      }
    });
  });

  it('with missing storybook config', async () => {
    try {
      await helpers.create(generator)
        .build()
        .run();
    } catch (e) {
      expect(e.message).toMatch('No storybook setup detected! Please run the generator at the project root.');
    }
  });

  describe('with options', () => {
    let runContext;

    beforeAll(() => {
      const sessionDir = path.resolve(tmpDir, `${new Date().getTime()}`);
      runContext = helpers.create(generator)
        .inDir(sessionDir)
        .withOptions({ storiesDir: './stories', cache, problemId: 1 })
        .build();
    });

    it('and storiesDir specified', async () => runContext.run());
  });

  describe('with saved config', () => {
    let runContext;

    beforeAll(() => {
      const sessionDir = path.resolve(tmpDir, `${new Date().getTime()}`);
      runContext = helpers.create(generator)
        .inDir(sessionDir)
        .withLocalConfig({
          problem: {
            $1: {
              path: 'Array',
            },
          },
        })
        .withOptions({ storiesDir: './stories', cache, problemId: 1 })
        .build();
    });

    it('and storiesDir specified', async () => runContext.run());
  });
});
