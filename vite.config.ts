import { resolve } from 'path';
import { defineConfig, BuildOptions } from 'vite';

export default defineConfig(() => {
  const buildConfig = {
    lib: {
      entry: resolve(__dirname, './lib/main.ts'),
      name: 'pathSplit',
      formats: ['umd'],
      fileName: () => `main.js`,
    },
  };

  return {
    build: {
      ...(buildConfig as BuildOptions),
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        '@lib': resolve(__dirname, './lib'),
      },
    },
  };
});
