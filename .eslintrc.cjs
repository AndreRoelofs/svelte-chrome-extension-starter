/** @type { import("eslint").Linter.Config } */
module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:svelte/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        extraFileExtensions: ['.svelte'],
    },
    env: {
        browser: true,
        es2017: true,
        node: true,
        webextensions: true,
    },
    overrides: [
        {
            files: ['*.svelte'],
            parser: 'svelte-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
            },
        },
    ],
    ignorePatterns: [
        'node_modules',
        '.DS_Store',
        '/build',
        '/.svelte-kit',
        '/package',
        '.env',
        '!.env.example',

        // Ignore files for PNPM, NPM and YARN
        'pnpm-lock.yaml',
        'package-lock.json',
        'yarn.lock',

        '.nx',
        'dist',
        'extension/pages/*',
        'extension/scripts/*',
    ],
};
