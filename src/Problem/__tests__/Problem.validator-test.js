import { setSpawnSync } from '../Problem.actions.js';
import validator from '../Problem.validator.js';

describe('Validate', () => {
  it('Problem ID', () => {
    setSpawnSync(jest.fn().mockReturnValue({ stdout: '[code=-1]' }));
    let validateId = validator.id.bind({
      async: () => message => expect(message).toMatch('Please login using leetcode-cli'),
    });
    validateId(1);

    setSpawnSync(jest.fn().mockReturnValue({ stdout: '' }));
    validateId = validator.id.bind({
      async: () => (message, value) => expect(value).toBeTruthy(),
    });
    validateId(1);

    validateId = validator.id.bind({
      async: () => message => expect(message).toMatch('Invalid input'),
    });
    validateId('');

    setSpawnSync(jest.fn().mockReturnValue({ stdout: 'Problem not found!' }));
    validateId = validator.id.bind({
      async: () => message => expect(message).toMatch('Invalid Problem ID'),
    });
    validateId(9999);
  });

  describe('Languages', () => {
    it('Valid', () => {
      const validateLanguages = validator.languages.bind({
        async: () => (message, value) => expect(value).toBeTruthy(),
      });
      validateLanguages('javascript');
    });

    it('Invalid', () => {
      const validateLanguages = validator.languages.bind({
        async: () => message => expect(message).toMatch('foo is not a supported language'),
      });
      validateLanguages('javascript , foo , bar');
    });
  });
});
