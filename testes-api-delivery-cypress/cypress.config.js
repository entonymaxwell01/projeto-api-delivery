const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
    baseUrl: "http://localhost:3003",
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/report",
      reportFilename: "[name]/report",
      overwrite: false,
      html: true,
      json: false,
    },
  },
});
