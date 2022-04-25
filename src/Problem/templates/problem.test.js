import solution from './<%= name %>.es3.cjs';
import runTestCase, { cases } from './testCases.js';

test.each(cases.map(c => [c.name, c]))(
  '[<%= path %>] - Case %#',
  (name, testCase) => expect(runTestCase(solution, testCase)).toEqual(testCase.expected),
);
