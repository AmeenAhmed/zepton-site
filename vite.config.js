import { resolve } from 'path';

export default {
  server: {
    port: 3200
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        tutorial: resolve(__dirname, 'tutorial/index.html'),
        docs: resolve(__dirname, 'docs/index.html'),
        examples: resolve(__dirname, 'examples/index.html'),
        playground: resolve(__dirname, 'playground/index.html'),
      }
    }
  }
}
