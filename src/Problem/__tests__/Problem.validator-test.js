import validator from '../Problem.validator.js';

describe('Validate Problem ID', () => {
  it('Valid', () => {
    validator.setSpawnSync(jest.fn().mockReturnValue({ stdout: '' }));
    const validateId = validator.id.bind({
      async: () => (message, value) => expect(value).toBeTruthy(),
    });
    validateId(1);
  });

  it('Invalid Input', () => {
    const validateId = validator.id.bind({
      async: () => message => expect(message).toBe('Invalid input'),
    });
    validateId('');
  });

  it('Invalid ID', () => {
    validator.setSpawnSync(jest.fn().mockReturnValue({ stdout: 'Problem not found!' }));
    const validateId = validator.id.bind({
      async: () => message => expect(message).toBe('Invalid Problem ID'),
    });
    validateId(9999);
  });
});
