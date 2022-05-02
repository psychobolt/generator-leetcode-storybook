import { runCommand } from './Problem.actions.js';

export default {
  id(input) {
    const done = this.async();

    if (typeof input === 'number') {
      const { stdout } = runCommand(['show', input]);
      if (stdout.indexOf('Problem not found!') > -1) {
        done('Invalid Problem ID');
      } else if (stdout.indexOf('[code=-1]') > -1) {
        done('Please login using leetcode-cli');
      } else {
        done(null, true);
      }
      return;
    }

    done('Invalid input');
  },
};
