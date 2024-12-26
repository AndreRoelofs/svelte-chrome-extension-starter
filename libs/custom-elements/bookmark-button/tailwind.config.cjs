import { merge } from 'lodash';

import parentConfig from '../../tailwind.config.js';

/** @type {import('tailwindcss').Config} */
const config = merge({}, parentConfig, {
    content: [
        './libs/custom-elements/bookmark-button/**/*.{html,js,svelte,ts}',
    ],
});

module.exports = config;
