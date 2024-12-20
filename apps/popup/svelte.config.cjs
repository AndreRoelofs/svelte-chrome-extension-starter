// const sveltePreprocess = require('svelte-preprocess');

// module.exports = {
//     // Consult https://github.com/sveltejs/svelte-preprocess
//     // for more information about preprocessors
//     preprocess: sveltePreprocess(),
// };

const sveltePreprocess = require('svelte-preprocess');

module.exports = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: sveltePreprocess({
        typescript: {
            // tsconfigFile: './apps/popup/tsconfig.app.json',
            compilerOptions: {
        verbatimModuleSyntax: true,
       
            }
        }
    }),
};

