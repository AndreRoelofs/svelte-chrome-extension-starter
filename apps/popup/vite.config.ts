/// <reference types='vitest' />
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

// import { join, resolve } from 'path';

import path from 'path';

export default defineConfig({
    base: './',
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/popup',
    server: {
        port: 4200,
        host: 'localhost',
        fs: {
            strict: true,
            // allow: [searchForWorkspaceRoot(process.cwd())],
            allow: [searchForWorkspaceRoot(__dirname)],
        },
    },
    preview: {
        port: 4300,
        host: 'localhost',
    },
    plugins: [svelte(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    build: {
        // outDir: '../../dist/apps/popup',
        outDir: path.join(__dirname, '../../extension/pages/popup'),
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    test: {
        watch: false,
        globals: true,
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        reporters: ['default'],
        coverage: {
            reportsDirectory: '../../coverage/apps/popup',
            provider: 'v8',
        },
    },
    resolve: {
        alias: {
            $lib: path.resolve('libs/ui-styles/src/ui'),
            '@svelte-chrome-extension-starter/utils': path.resolve(
                'libs/utils/src/index.ts',
            ),
        },
    },
});
