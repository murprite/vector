import { test, expect } from '@playwright/test';

test('Checking title', async ({ page }) => {
  // TODO: http->https and auto resolve current url (maybe some .env file i dunno)
  await page.goto('http://localhost:3000');

  
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Click the get started link.
  await page.getByRole('link', { name: '+7XXX-XXX-XX-XX' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
