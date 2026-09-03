import { defineConfig } from 'tsup';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  entry: {
    index: `${packageRoot}src/index.ts`,
    'solid/index': `${packageRoot}src/solid/index.ts`,
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  splitting: false,
  clean: false,
  target: 'es2018',
  outDir: packageRoot,
  external: ['@tanstack/solid-router', '@tanstack/router-core', '@tanstack/router-core/isServer', '@tanstack/history', '@nativescript/core', '@nativescript/core/abortcontroller', '@nativescript/core/abortcontroller/index.js', '@nativescript-community/solid-js', 'dominative', 'solid-js', 'solid-js/web', 'solid-js/jsx-runtime'],
  esbuildOptions(options) {
    options.jsx = 'automatic';
    options.jsxImportSource = 'solid-js';
  },
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
});
