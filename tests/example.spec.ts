import { test, expect } from '@playwright/test';


test('Checking title', async ({ page }: any) => {
  // TODO: http->https and auto resolve current url (maybe some .env file i dunno)
  await page.goto('http://localhost:3000');
  await expect(page.title);

  
});

test('get started link', async ({ page }: any) => {
  await page.goto('http://localhost:3000/');
});
