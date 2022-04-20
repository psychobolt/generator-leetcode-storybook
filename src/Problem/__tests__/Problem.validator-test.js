import * as validator from '../Problem.validator.js';

describe('Validate Problem ID', () => {
  it('Valid', () => expect(validator.id(0)).toBeTruthy());

  it('Invalid', () => expect(validator.id('')).toBeFalsy());
});
