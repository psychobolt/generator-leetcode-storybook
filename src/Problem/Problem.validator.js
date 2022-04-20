import spawn from 'cross-spawn';

export function id(input) {
  const done = this.async();

  const invalid = () => ;

  if (typeof input === 'number') {
    const result = spawn.sync('leetcode', ['show', input], { encoding: 'utf-8' });
    if (result.output.find(output => output && output.indexOf('Problem not found!') > -1)) {
      done('Invalid Problem ID')
    } else {
      done(null, true);
    }
    return;
  }

  done('Invalid input')
}
