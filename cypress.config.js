import { defineConfig } from 'cypress'

// Cypress's own configuration file. `baseUrl` means every cy.visit('/')
// in the test files actually visits http://localhost:5173/ — it must
// match the port Vite serves on (see vite.config.js). `supportFile`
// points at a file that runs before every single spec.
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'cypress/support/e2e.js',
  },
})
