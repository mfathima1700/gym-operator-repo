import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Replace with your actual dev server port
    supportFile: false, // Disable if you're not using support files
    specPattern: 'cypress/e2e/**/*.spec.ts',
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
  },
});
