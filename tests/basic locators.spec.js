// import { test, expect } from "@playwright/test";
const { test, expect } = require("@playwright/test");

test("by role", async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole("link", { name: "Broken Images" }).click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/broken_images")

})

test("by xpath", async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.locator('//*[@id="content"]/ul/li[17]/a').click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/download")

})

test("by name", async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.click('#content>ul>li:nth-child(20)>a');
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/forgot_password")
})