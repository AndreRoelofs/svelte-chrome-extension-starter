const TailwindConfig = require('../../tailwind.config.cjs');
const { join } = require('path');
/** @type {import('tailwindcss').Config} */
module.exports = {
    ...TailwindConfig,
    content: [
        ...TailwindConfig.content,
        join(__dirname, 'src/**/*.{html,js,svelte,ts}'),
    ],
};
