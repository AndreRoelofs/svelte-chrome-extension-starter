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
    plugins: [
        require('postcss-import'),
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('tailwindcss')('./tailwind.config.cjs'),
        require('autoprefixer'),
        convertRemToEm,
    ],
};
