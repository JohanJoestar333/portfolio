import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite is the build tool/dev server for this project. The React plugin
// below is what lets Vite understand .jsx files and enables fast refresh
// (component state survives most edits during development).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Also referenced in cypress.config.js's baseUrl — keep them in sync if you change this.
  },
})
