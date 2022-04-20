import spawn from 'cross-spawn';

export const id = input => {
  if (typeof input === 'number') {
    const result = spawn.sync('leetcode', ['show', input]);
    return result.status === 0;
  }
  return false;
};
