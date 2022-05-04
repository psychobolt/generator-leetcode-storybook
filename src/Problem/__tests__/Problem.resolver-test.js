import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import { setCache, setSpawnSync } from '../Problem.actions.js';
import resolver from '../Problem.resolver.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const readFile = filepath => fs.readFileSync(path.resolve(dirname, filepath), { encoding: 'utf-8' });

describe('Resolve Problem', () => {
  beforeAll(() => {
    setCache([]);
    setSpawnSync((_, args) => {
      let stdout = '';
      if (args[0] === 'show') {
        if (args[1] === '-x') {
          stdout = readFile('./TwoSum.md');
        }
        if (args[1] === '-c') {
          stdout = readFile('./twoSum.es3.cjs');
        }
      }
      return { stdout };
    });
  });

  it('Get metadata', () => {
    resolver.metadata(null);
  });

  it('Get Description', () => {
    resolver.problem(1);
  });

  it('Get Code', () => {
    resolver.code(1);
  });
});
