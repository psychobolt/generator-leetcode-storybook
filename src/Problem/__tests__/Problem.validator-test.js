import * as validator from '../Problem.validator.js';

describe('Validate Problem ID', () => {
  it('Valid', () => {
    const validateId = validator.id.bind({
      async: (message, value) => expect(value).toBeTruthy(),
    });
    validateId(0);
  });

  it('Invalid Input', () => {
    const validateId = validator.id.bind({
      async: message => expect(message).toBe('Invalid input'),
    });
    validateId('');
  });

  it('Invalid ID', () => {
    const validateId = validator.id.bind({
      async: message => expect(message).toBe('Invalid Problem ID'),
    });
    validateId(1010101010101);
  });
});
