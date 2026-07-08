import { test, expect } from '@playwright/test';

test.describe('Portfolio Page', () => {
  test('has correct title', async ({ page }) => {
    await page.goto('/');
    
    // Check if the title is set properly
    await expect(page).toHaveTitle(/Achira Pathiraja/);
  });

  test('hero section is visible', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the terminal or tour overlay to appear
    const terminalTour = page.getByText('TERMINAL.APP');
    await expect(terminalTour.first()).toBeVisible();
    
    // Wait for the terminal to appear
    const terminal = page.getByTestId('terminal-window').or(page.locator('.matrix-bg'));
    await expect(terminal.first()).toBeVisible();
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Click on About link
    const aboutLink = page.getByRole('link', { name: /about/i });
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      
      // Verify URL hash updated or section is visible
      await expect(page).toHaveURL(/#about/);
    }
  });
});
