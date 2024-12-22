import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

import dts from 'vite-plugin-dts';

import path from 'path';

export default defineConfig({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/libs/ui-styles',
    server: {
        port: 4200,
        host: 'localhost',
    },
    preview: {
        port: 4300,
        host: 'localhost',
    },
    plugins: [
        svelte(),
        nxViteTsPaths(),
        nxCopyAssetsPlugin(['*.md']),
        dts({
            entryRoot: 'src',
            tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
        }),
    ],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    build: {
        outDir: '../../dist/libs/ui-styles',
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
            reportsDirectory: '../../coverage/libs/ui-styles',
            provider: 'v8',
        },
    },
});
