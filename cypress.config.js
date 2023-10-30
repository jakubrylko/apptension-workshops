const { defineConfig } = require('cypress');

module.exports = defineConfig({
  env: {
    domain: 'app.qa.saas.apptoku.com',
    apiPath: '/api/graphql/',
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  videoUploadOnPasses: false,
  screenshotOnRunFailure: false,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 10000,
  taskTimeout: 20000,
  e2e: {
    baseUrl: 'https://app.qa.saas.apptoku.com',
    specPattern: './cypress/e2e/**/*cy.js',
    downloadsFolder: './downloads',
    watchForFileChanges: true,
    hideXHRInCommandLog: true,
    chromeWebSecurity: false,
  },
});
