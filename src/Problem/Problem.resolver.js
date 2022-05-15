import * as espree from 'espree';

import { getProblem, getCode, getTags, getCompanies } from './Problem.actions.js';

const LANGUAGE_MAP = {
  bash: 'sh',
  c: 'c',
  cpp: 'cpp',
  csharp: 'cs',
  golang: 'go',
  java: 'java',
  javascript: 'js',
  kotlin: 'kt',
  mysql: 'sql',
  php: 'php',
  python: 'py',
  ruby: 'rb',
  scala: 'sc',
  swift: 'swift',
};

export default {
  LANGUAGE_MAP,

  // metadata(id, title) {
  metadata(id) {
    // See https://github.com/LeetCode-OpenSource/vscode-leetcode/blob/de1dc4161b497b4f76faad2363abab0104a75373/src/commands/list.ts#L11
    const defaults = {
      tags: getTags(id),
      companies: getCompanies(id),
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
    const { body, ...rest } = getProblem(id);
    // See https://github.com/LeetCode-OpenSource/vscode-leetcode/blob/de1dc4161b497b4f76faad2363abab0104a75373/src/webview/leetCodePreviewProvider.ts#L150
    return {
      ...rest,
      body: body
        .replace(/<pre>[\r\n]*([^]+?)[\r\n]*<\/pre>/g, '<pre><code>$1</code></pre>')
        .replace(/\t/g, '  ')
        .replace(/&#(\d+);/g, (_, number) => String.fromCharCode(number)),
    };
  },

  code(id, languages) {
    return getCode(id, languages).map((data, index) => {
      const language = languages[index];
      if (language === 'javascript') {
        const ast = espree.parse(data);
        const alias = ast.body[0].declarations[0].id.name;
        const code = data.split('\n').map(line => line
          .replace(/\r/, '')
          .replace(/^\s+$/, ''));
        return {
          language,
          alias,
          source: `${code.join('\n')}\nmodule.exports = ${alias};`,
        };
      }
      return { language, source: data };
    });
  },
};
