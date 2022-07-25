import cloneDeep from 'lodash/fp/cloneDeep.js';

import json from '../testCases.json';

export const cases = json;

export default (runSolution, { input }) => runSolution(cloneDeep(input));
