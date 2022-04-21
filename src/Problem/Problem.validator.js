import spawn from 'cross-spawn';

const stdout = process.env.NODE_ENV === 'test' ? 'inherit' : 'ignore';

const spawnOpts = {
  encoding: 'utf-8',
  stdio: ['ignore', stdout, stdout],
};

export function id(input) {
  const done = this.async();

  if (typeof input === 'number') {
    const result = spawn.sync('leetcode', ['show', input], spawnOpts);
    if (result.output.find(output => output && output.indexOf('Problem not found!') > -1)) {
      done('Invalid Problem ID');
    } else {
      done(null, true);
    }
    return;
  }

  done('Invalid input');
}
