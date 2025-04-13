import { defineConfig } from 'vite';
import { resolve } from 'path';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'velocityjs',
    },
    rollupOptions: {
      external: ['debug'],
      output: [
        {
          format: 'es',
          dir: 'dist/esm',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          globals: {
            debug: 'debug',
          },
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          entryFileNames: '[name].cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          globals: {
            debug: 'debug',
          },
        },
      ],
    },
    minify: false,
  },
  plugins: [
    commonjs({
      include: /src\/parse\/index\.js$/,
    }),
    nodeResolve(),
    dts({
      include: ['src'],
      exclude: ['src/parse/index.js'],
    }),
  ],
}); 