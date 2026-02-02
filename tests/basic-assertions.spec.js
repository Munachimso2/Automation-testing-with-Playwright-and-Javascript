import { test, expect } from "@playwright/test";

test("expect assertions", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    const abTesting = page.getByRole("link", { name: "A/B Testing" });
    await expect(abTesting).toContainText("A/B Testing")
})

test("expect assertions has attribute value", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    const disappearingEl = page.getByRole("link", { name: "Disappearing Elements" });
    await expect(disappearingEl).toHaveAttribute("href", "/disappearing_elements");
    await disappearingEl.click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/disappearing_elements")
})

test("element is checked", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/checkboxes");

    const checkboxes = page.locator("#checkboxes input[type='checkbox']")
    const check1 = checkboxes.nth(0)
    const check2 = checkboxes.nth(1)

    await expect(check1).toBeChecked({ checked: false });
    await expect(check2).toBeChecked();
    await page.screenshot({ path: 'full.png', fullPage: true }); //this is to take screenshot of the page
})

