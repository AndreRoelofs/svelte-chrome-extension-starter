import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import path from 'path';

export default defineConfig({
    base: './',
    root: __dirname,
    cacheDir:
        '../../../node_modules/.vite/libs/custom-elements/bookmark-button',
    server: {
        port: 4200,
        host: 'localhost',
    },
    preview: {
        port: 4300,
        host: 'localhost',
    },
    plugins: [
        svelte({
            configFile: 'svelte.config.js',
        }),
        nxViteTsPaths(),
        nxCopyAssetsPlugin(['*.md']),
    ],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'src/index.ts'),
                // shadowStyles: path.resolve(__dirname, 'src/Button.pcss'),
                shadowStyles: 'libs/ui-styles/src/styles/global.pcss',
            },
            output: {
                chunkFileNames: '[name].js',
                entryFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
            },
        },
        // outDir: '../../../dist/libs/custom-elements/bookmark-button',
        outDir: './dist',
        emptyOutDir: false,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        lib: {
            // entry: 'src/Button.svelte',
            entry: 'src/index.ts',
            formats: ['es'],
            name: 'BookmarkButton',
            fileName: 'main',
        },
        // cssCodeSplit: true,
    },
    test: {
        watch: false,
        globals: true,
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        reporters: ['default'],
        coverage: {
            reportsDirectory:
                '../../../coverage/libs/custom-elements/bookmark-button',
            provider: 'v8',
        },
    },
    resolve: {
        alias: {
            $lib: path.resolve('libs/ui-styles/src/ui'),
        },
    },
});
