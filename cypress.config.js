const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents() {},
    specPattern: './cypress/e2e/**/*cy.js',
    downloadsFolder: './downloads',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 10000,
    taskTimeout: 20000,
    watchForFileChanges: false,
    hideXHRInCommandLog: true,
    chromeWebSecurity: false,
    videoUploadOnPasses: false,
    screenshotOnRunFailure: false,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json',
    },
    env: {
      apptension_url: 'https://www.apptension.com',
      teamdeck_url: 'https://stage.app.teamdeck.io',
      teamdeck_api: 'https://stage.api.teamdeck.io/v1',
      saas_url: 'https://app.qa.saas.apptoku.com',
      saas_api: 'https://app.qa.saas.apptoku.com/api/graphql/'
    },
  },
});
