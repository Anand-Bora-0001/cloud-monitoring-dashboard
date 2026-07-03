import { test, expect } from '@playwright/test';

test('has title and login form', async ({ page }) => {
  // Replace with the actual deployed or local URL
  await page.goto('http://localhost:5173/login');
  
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Vite \+ React/);
  
  // Expect the page to have the brand name CloudMon
  await expect(page.getByText('CloudMon')).toBeVisible();
  
  // Check that the login form fields exist
  await expect(page.getByPlaceholder('admin@company.com')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
});
