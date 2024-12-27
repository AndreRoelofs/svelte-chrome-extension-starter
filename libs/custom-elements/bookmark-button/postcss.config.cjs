// eslint-disable-next-line @typescript-eslint/no-var-requires
const rootConfig = require('../../../postcss.config.cjs');

module.exports = {
    ...rootConfig,
    plugins: [
        ...rootConfig.plugins,
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('tailwindcss')('./tailwind.config.cjs'),
    ],
};
