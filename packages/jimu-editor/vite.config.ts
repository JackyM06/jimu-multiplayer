import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join as pathJoin } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  esbuild: {
    loader: "tsx",
  },
  server: {
    port: 8080,
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
        '@editor': resolve('./src'),
    },
},
})

function resolve(...dirs: string[]) {
  return pathJoin(__dirname, ...dirs);
}

