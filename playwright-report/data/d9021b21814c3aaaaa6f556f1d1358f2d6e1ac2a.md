# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> Portfolio Page >> hero section is visible
- Location: e2e\portfolio.spec.ts:11:3

# Error details

```
Error: page.goto: NS_ERROR_CONNECTION_REFUSED
Call log:
  - navigating to "http://localhost:5173/", waiting until "load"

```

# Page snapshot

```yaml
- article "Unable to connect" [ref=e3]:
  - img "Illustration of a fox looking at disconnected network cables." [ref=e5]
  - generic [ref=e7]:
    - heading "Unable to connect" [level=1] [ref=e8]
    - paragraph [ref=e9]:
      - text: Nightly can’t connect to the server at
      - strong [ref=e10]: localhost:5173
    - generic [ref=e11]:
      - heading "What can you do about it?" [level=3] [ref=e12]
      - list [ref=e13]:
        - listitem [ref=e14]: The site could be temporarily unavailable or too busy. Try again in a few moments.
        - listitem [ref=e15]: If you are unable to load any pages, check your computer’s network connection.
        - listitem [ref=e16]: If your computer or network is protected by a firewall or proxy, make sure that Nightly is permitted to access the web.
    - button "Try Again" [ref=e19]:
      - generic [ref=e21]:
        - generic: Try Again
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Portfolio Page', () => {
  4  |   test('has correct title', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     
  7  |     // Check if the title is set properly
  8  |     await expect(page).toHaveTitle(/Achira Pathiraja/);
  9  |   });
  10 | 
  11 |   test('hero section is visible', async ({ page }) => {
> 12 |     await page.goto('/');
     |                ^ Error: page.goto: NS_ERROR_CONNECTION_REFUSED
  13 |     
  14 |     // Wait for the terminal or tour overlay to appear
  15 |     const terminalTour = page.getByText('TERMINAL.APP');
  16 |     await expect(terminalTour.first()).toBeVisible();
  17 |     
  18 |     // Wait for the terminal to appear
  19 |     const terminal = page.getByTestId('terminal-window').or(page.locator('.matrix-bg'));
  20 |     await expect(terminal.first()).toBeVisible();
  21 |   });
  22 | 
  23 |   test('navigation works', async ({ page }) => {
  24 |     await page.goto('/');
  25 |     
  26 |     // Click on About link
  27 |     const aboutLink = page.getByRole('link', { name: /about/i });
  28 |     if (await aboutLink.isVisible()) {
  29 |       await aboutLink.click();
  30 |       
  31 |       // Verify URL hash updated or section is visible
  32 |       await expect(page).toHaveURL(/#about/);
  33 |     }
  34 |   });
  35 | });
  36 | 
```