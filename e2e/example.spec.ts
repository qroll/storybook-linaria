import { test, expect } from "@chromatic-com/playwright";

test("buttons", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/iframe.html?globals=&args=&id=example-button-v1--primary&viewMode=story",
  );

  await expect(await page.getByRole("button").nth(0)).toBeVisible();
  await expect(await page.getByRole("button").count()).toEqual(5);
});
