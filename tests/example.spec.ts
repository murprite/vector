import { test, expect } from '@playwright/test';

test('Checking title', async ({ page }) => {
  // TODO: http->https and auto resolve current url (maybe some .env file i dunno)
  await page.goto('http://localhost:3000');

  
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3000/');
});
