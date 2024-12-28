/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

import path from 'path';

export default defineConfig({
    base: './',
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/devtools-panel',
    server: {
        port: 4200,
        host: 'localhost',
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
        // outDir: '../../dist/apps/devtools-panel',
        outDir: path.join(__dirname, '../../extension/pages/devtools-panel'),
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
            reportsDirectory: '../../coverage/apps/devtools-panel',
            provider: 'v8',
        },
    },
    resolve: {
        alias: {
            // $lib: join(__dirname, 'libs/ui-styles/src/ui'),
            $lib: path.resolve('libs/ui-styles/src/ui'),
        },
    },
});
