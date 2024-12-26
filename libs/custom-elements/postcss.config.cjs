// eslint-disable-next-line @typescript-eslint/no-var-requires
const rootConfig = require('../../postcss.config.cjs');

const convertRemToEm = {
    postcssPlugin: 'convertRemToEm',
    // When debugging this, https://astexplorer.net/#/2uBU1BLuJ1 is very helpful
    Declaration(declaration) {
        declaration.value = declaration.value.replaceAll(remRegex, 'em');
    },
};

// Regex to find all occurrences of "rem" units
const remRegex = /(?<=\d)rem/g;

module.exports = {
    ...rootConfig, // Inherit everything from root
    plugins: [
        ...rootConfig.plugins, // Inherit all root plugins
        convertRemToEm,
    ],
};
