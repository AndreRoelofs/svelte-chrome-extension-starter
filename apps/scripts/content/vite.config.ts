/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    root: __dirname,
    cacheDir: '../../../node_modules/.vite/apps/scripts/content',
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
    // Configuration for building your library.
    // See: https://vitejs.dev/guide/build.html#library-mode
    build: {
        outDir: '../../../dist/apps/scripts/content',
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        lib: {
            // Could also be a dictionary or array of multiple entry points.
            entry: 'src/index.ts',
            name: 'content',
            fileName: 'index',
            // Change this to the formats you want to support.
            // Don't forget to update your package.json as well.
            formats: ['es'],
        },
        rollupOptions: {
            // External packages that should not be bundled into your library.
            external: [],
            output: {
                entryFileNames: 'main.js',
                chunkFileNames: 'main-[name].js',
                assetFileNames: 'assets/[name].[ext]',
            },
        },
    },
    test: {
        watch: false,
        globals: true,
        environment: 'node',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        reporters: ['default'],
        coverage: {
            reportsDirectory: '../../../coverage/apps/scripts/content',
            provider: 'v8',
        },
    },
    resolve: {
        alias: {
            '$custom-elements': path.resolve('dist/libs/custom-elements'),
        },
    },
});
