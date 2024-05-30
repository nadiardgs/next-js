import test, { expect } from "@playwright/test";

test('test page', async ({ page }) => {
    const response = await page.goto(`https://next-js-lilac-tau-38.vercel.app/api/add-user`);
    
    await expect(page).toBeTruthy();
  });