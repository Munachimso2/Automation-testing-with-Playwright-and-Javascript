import { test, expect } from "@playwright/test";


test("Basic test", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.getByRole("link", { name: "checkboxes" }).click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/checkboxes")
})

test("by label", async ({page}) => {
    await page.goto("https://www.amugoldgroup.com/");
    await page.locator(("#about > div > div > div > div.col-xl-6.col-lg-6.col-md-6 > div > div > a")).click();
    await expect(page).toHaveURL("https://www.amugoldgroup.com/about.html");
    await page.getByPlaceholder("Enter your mail").fill('dokafor77@gmail.com');
    await page.getByRole("button", {name: "Subscribe"}).click()
})


test("by css", async({page}) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.locator(`a[href="/drag_and_drop"]`).click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/drag_and_drop")
})