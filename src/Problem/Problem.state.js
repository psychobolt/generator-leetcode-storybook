import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import JSON5 from 'json5';

const dirname = path.dirname(fileURLToPath(import/*:: ("") */.meta.url));
const readJSON = filepath => JSON5.parse(fs.readFileSync(path.resolve(dirname, filepath), { encoding: 'utf-8' }));

export default {
  cache: [],
  companies: readJSON('./companies.json5'),
  tags: readJSON('./tags.json5'),
};
