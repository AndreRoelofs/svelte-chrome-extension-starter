// eslint-disable-next-line @typescript-eslint/no-var-requires
const parentConfig = require('../postcss.config.cjs');

module.exports = {
    ...parentConfig,
    plugins: [
        ...parentConfig.plugins,
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('tailwindcss')('./tailwind.config.cjs'),
    ],
};
