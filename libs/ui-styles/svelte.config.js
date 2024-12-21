// const sveltePreprocess = require('svelte-preprocess');

// module.exports = {
//   // Consult https://github.com/sveltejs/svelte-preprocess
//   // for more information about preprocessors
//   preprocess: sveltePreprocess()
// };
// };


import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
    preprocess: vitePreprocess()
}