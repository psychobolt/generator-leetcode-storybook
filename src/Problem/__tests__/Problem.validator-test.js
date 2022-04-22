import spawn from 'cross-spawn';

import * as validator from '../Problem.validator.js';

describe('Validate Problem ID', () => {
  it('Valid', () => {
    const spy = jest.spyOn(spawn, 'sync').mockReturnValue({ output: [''] });
    const validateId = validator.id.bind({
      async: () => (message, value) => expect(value).toBeTruthy(),
    });
    validateId(1);
    spy.mockRestore();
  });

  it('Invalid Input', () => {
    const validateId = validator.id.bind({
      async: () => message => expect(message).toBe('Invalid input'),
    });
    validateId('');
  });

  it('Invalid ID', () => {
    const spy = jest.spyOn(spawn, 'sync').mockReturnValue({ output: ['Problem not found!'] });
    const validateId = validator.id.bind({
      async: () => message => expect(message).toBe('Invalid Problem ID'),
    });
    validateId(9999);
    spy.mockRestore();
  });
});
