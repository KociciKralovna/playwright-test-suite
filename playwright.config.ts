import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    headless: true,       
    trace: 'off',
    video: 'off',
    screenshot: 'off',
  },
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',   
      },
    },
    {
      name: 'msedge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',   
      },
    },
  ],
});
