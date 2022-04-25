import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import JSON5 from 'json5';
import { execaSync } from 'execa';
import * as espree from 'espree';

let spawnSync = execaSync;

const dirname = path.dirname(fileURLToPath(import/*:: ("") */.meta.url));
const readJSON = filepath => JSON5.parse(fs.readFileSync(path.resolve(dirname, filepath), { encoding: 'utf-8' }));

const COMPANIES = readJSON('./companies.json5');
const TAGS = readJSON('./tags.json5');

export default {
  // TODO remove when es6 module mocking is supported
  setSpawnSync(spawn) {
    spawnSync = spawn;
  },

  // metadata(id, title) {
  metadata(id) {
    // See https://github.com/LeetCode-OpenSource/vscode-leetcode/blob/de1dc4161b497b4f76faad2363abab0104a75373/src/commands/list.ts#L11
    const defaults = {
      tags: TAGS[id] || [],
      companies: COMPANIES[id] || [],
    };
    // const { stdout } = spawnSync('leetcode', ['list', '-x', title]);
    // const lines = stdout.split('\n');
    // const data = lines.find(line => {
    // eslint-disable-next-line max-len
    //   const match = line.match(/^(.)\s(.{1,2})\s(.)\s\[\s*(\d*)\s*\]\s*(.*)\s*(Easy|Medium|Hard)\s*\((\s*\d+\.\d+ %)\)/);
    //   return match && match.length === 8 && `${id}` === match[4].trim();
    // });
    // if (data) {
    //   return {
    //     ...defaults,
    //   };
    // }
    return defaults;
  },

  problem(id) {
    const { stdout } = spawnSync('leetcode', ['show', '-x', id]);
    // See https://github.com/LeetCode-OpenSource/vscode-leetcode/blob/de1dc4161b497b4f76faad2363abab0104a75373/src/webview/leetCodePreviewProvider.ts#L150
    const [
      title, ,
      url, ,
      /* tags */, ,
      /* langs */, ,
      category,
      difficulty,
      likes,
      dislikes,
      /* accepted */,
      /* submissions */,
      /* testcase */, ,
      ...body
    ] = stdout.split('\n');
    return {
      title: [.../^\[\d+\]\s(.+)/g.exec(title.trim())][1],
      url,
      category: category.slice(2),
      difficulty: difficulty.slice(2),
      likes: likes.split(': ')[1].trim(),
      dislikes: dislikes.split(': ')[1].trim(),
      body: body.join('\n').replace(/<pre>[\r\n]*([^]+?)[\r\n]*<\/pre>/g, '<pre><code>$1</code></pre>'),
    };
  },

  code(id) {
    let { stdout } = spawnSync('leetcode', ['show', '-c', id, '-l', 'javascript']);
    const ast = espree.parse(stdout);
    const alias = ast.body[0].declarations[0].id.name;
    stdout = stdout.split('\n').map(line => line
      .replace(/\r/, '')
      .replace(/^\s+$/, ''));
    return {
      alias,
      source: `${stdout.join('\n')}\nmodule.exports = ${alias};`,
    };
  },
};
