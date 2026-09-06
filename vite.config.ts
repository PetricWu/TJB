import path from 'path'
import { defineConfig } from '@lark-apaas/coding-preset-vite-react'

export default defineConfig({
  resolve: {
    alias: {
        '@': path.resolve(import.meta.dirname, 'src'),
        '@shared': path.resolve(import.meta.dirname, 'shared'),
      },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router') || id.includes('/react/') || id.includes('/react-dom/')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui/react-slot')) {
              return undefined;
            }
            if (id.includes('@radix-ui/')) {
              return 'radix-lazy';
            }
          }
        },
      },
    },
  },
})
