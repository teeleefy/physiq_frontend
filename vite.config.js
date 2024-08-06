import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensures the output directory is dist
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './__tests__/setup.js', // assuming the test folder is in the root of our project
  }
})
