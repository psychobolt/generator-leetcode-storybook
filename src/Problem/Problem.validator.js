import { runCommand } from './Problem.actions.js';
import resolver from './Problem.resolver.js';

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

  languages(input) {
    const done = this.async();

    const invalid = input.split(/\s*,\s*/).find(language => !resolver.LANGUAGE_MAP[language]);
    if (invalid) {
      done(`${invalid.trim()} is not a supported language`);
      return;
    }

    done(null, true);
  },
};
