import { setSpawnSync } from '../Problem.actions.js';
import validator from '../Problem.validator.js';

test('Validate Problem ID', () => {
  setSpawnSync(jest.fn().mockReturnValue({ stdout: '[code=-1]' }));
  let validateId = validator.id.bind({
    async: () => message => expect(message).toBe('Please login using leetcode-cli'),
  });
  validateId(1);

  setSpawnSync(jest.fn().mockReturnValue({ stdout: '' }));
  validateId = validator.id.bind({
    async: () => (message, value) => expect(value).toBeTruthy(),
  });
  validateId(1);

  validateId = validator.id.bind({
    async: () => message => expect(message).toBe('Invalid input'),
  });
  validateId('');

  setSpawnSync(jest.fn().mockReturnValue({ stdout: 'Problem not found!' }));
  validateId = validator.id.bind({
    async: () => message => expect(message).toBe('Invalid Problem ID'),
  });
  validateId(9999);
});
