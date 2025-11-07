import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display the homepage correctly', async ({ page }) => {
    await page.goto('/');

    // Check if the main heading is visible
    await expect(page.getByRole('heading', { name: /India's Premier/i })).toBeVisible();

    // Check if navigation is present
    await expect(page.getByRole('navigation')).toBeVisible();

    // Check if categories section exists
    await expect(page.getByText('Explore Categories')).toBeVisible();

    // Check if features section exists
    await expect(page.getByText('Why Choose Airavat?')).toBeVisible();
  });

  test('should navigate to products page', async ({ page }) => {
    await page.goto('/');

    // Click on "Start Sourcing" button
    await page.getByRole('link', { name: /Start Sourcing/i }).click();

    // Should navigate to products page
    await expect(page).toHaveURL('/products');
  });

  test('should search for products', async ({ page }) => {
    await page.goto('/');

    // Find and fill search input
    const searchInput = page.getByPlaceholder(/Search products/i);
    await searchInput.fill('electronics');

    // Submit search (this would depend on your implementation)
    await searchInput.press('Enter');

    // Should navigate to products with search query
    await expect(page).toHaveURL(/.*products.*q=electronics.*/);
  });
});
