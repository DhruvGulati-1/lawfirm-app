import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',  // Sets current folder as the root
  build: {
    outDir: 'dist'  // Output will go into frontend/dist
  }
})  