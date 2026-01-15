/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  reporter: [
    ['html', { open: 'never' }], 
    ['list'],
    ['json', { outputFile: 'playwright-report/report.json' }]
  ],
  use: {
    headless: true,
    trace: 'on-first-retry',
  },
};

module.exports = config;
