import fs from 'fs';
import JSON5 from 'json5';

import defaultState from './src/Problem/Problem.state.js';

const { tags, companies } = defaultState;
const keys = new Set();

Object.values(tags).forEach(problemTags => problemTags.forEach(tag => keys.add(tag)));
Object.values(companies)
  .forEach(problemCompanies => problemCompanies.forEach(company => keys.add(company)));

// https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
function stringToColour(str) {
  const hash = [...str].reduce(
    (acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), // eslint-disable-line no-bitwise
    0,
  );
  let colour = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xFF; // eslint-disable-line no-bitwise
    colour += (`00${value.toString(16)}`).substr(-2);
  }
  return colour;
}

const badges = [...keys].reduce((map, badge) => {
  const hexColor = stringToColour(badge);
  return {
    ...map,
    [badge]: {
      styles: {
        backgroundColor: 'transparent',
        borderColor: hexColor,
        color: hexColor,
      },
      title: badge,
    },
  };
}, {});

fs.writeFileSync('./.storybook/leetcode-badges.js', `export default ${JSON5.stringify(badges)}; // eslint-disable-line`);
