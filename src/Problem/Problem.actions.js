import { execaSync } from 'execa';

import state from './Problem.state.js';

let spawnSync = execaSync;

export function setSpawnSync(spawn) {
  spawnSync = spawn;
}

export const runCommand = args => spawnSync('leetcode', args);

export function setCache(cache) {
  state.cache = cache;
}

// See https://github.com/LeetCode-OpenSource/vscode-leetcode/blob/de1dc4161b497b4f76faad2363abab0104
export const getProblem = id => {
  const cache = state.cache.find(problem => problem.id === id);
  if (cache) {
    const {
      name,
      link,
      category,
      level,
      likes,
      dislikes,
      desc,
    } = cache;
    return {
      title: name,
      url: link,
      category,
      difficulty: level,
      likes,
      dislikes,
      body: desc,
    };
  }
  const { stdout } = runCommand(['show', '-x', id]);
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
    body: body.join('\n'),
  };
};

function getLanguageAlias(language) {
  if (language === 'python') return 'python3';
  return language;
}

export function getCode(id, languages) {
  const cache = state.cache.find(problem => problem.id === id);
  if (cache) {
    return languages.map(language => {
      const template = cache.templates.find(({ value }) => value === getLanguageAlias(language));
      return template.defaultCode;
    });
  }
  return languages.map(language => runCommand(['show', '-c', id, '-l', getLanguageAlias(language)]).stdout);
}

export const getTags = id => state.tags[id] || [];

export const getCompanies = id => state.companies[id] || [];
