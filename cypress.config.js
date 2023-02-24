const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'https://stage.app.teamdeck.io/',
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
