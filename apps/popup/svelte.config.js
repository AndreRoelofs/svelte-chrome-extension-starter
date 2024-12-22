// const sveltePreprocess = require('svelte-preprocess');

// module.exports = {
//     preprocess: sveltePreprocess({
//         typescript: {
//             compilerOptions: {
//                 verbatimModuleSyntax: true,
//             },
//         },
//     }),
// };

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
    preprocess: vitePreprocess(),
};
