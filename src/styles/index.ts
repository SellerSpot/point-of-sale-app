/**
 * Used to push the scss common modules into every scss file
 * so as to not need to import it anywhere
 */

import path from 'path';
const resources = ['colors.scss'];
module.exports = resources.map((file) => path.resolve(__dirname, file));
