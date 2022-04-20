import path from 'path';
import helpers from 'yeoman-test';

const tmpDir = path.resolve('tmp');
const generator = path.resolve('src', 'app', 'index.js');

test(`Main Generator ${(generator)} runs correctly in ${tmpDir}`, async () => {
  await helpers.create(generator)
    .inDir(tmpDir)
    .withPrompts({ name: 'id', id: 0 })
    .build()
    .run();
});
