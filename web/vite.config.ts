import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        react(),
        svelte({
            onwarn: function(warning, handler) {
                return warning.code.startsWith('a11y-') ? undefined : handler?.call(this, warning);
            }
        }),
    ],
    publicDir: 'static',
    build: {
        sourcemap: true,
        outDir: 'build',
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/[hash].js'
            }
        }
    },
    optimizeDeps: {
        // TODO: once carbon-componenets-svelte v1 is released, check if svelte optimize has been improved
        // carbon-components-svelte is large, prebundle
        include: ['carbon-components-svelte'],
        // carbon-icons-svelte is huge and takes 12s to prebundle, better use deep imports for the icons you need
        exclude: ['carbon-icons-svelte']
    }
});