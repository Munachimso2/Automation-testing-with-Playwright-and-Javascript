import {test, expect} from "@playwright/test"

test("enter test", async({page}) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.getByLabel("Username").fill("tomsmith");
    await page.getByLabel("Password").fill("SuperSecretPassword!");
    await page.getByRole("button", {name: "Login"}).click();
    console.log("seen")
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");
    await page.locator('a[href= "/logout"]').click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/login")
})


test("type text", async({page}) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.locator("#username").type("tomsmith", {noWaitAfter: true});
    await page.locator("#password").type("SuperSecretPassword!", {noWaitAfter: true});
    await page.getByRole("button", {name: "Login"}).click(); 
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");
    const success = page.locator("#flash");
    await expect(success).toContainText("You logged into a secure area!")
    await page.getByRole("link", {name: "Logout"}).click()
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/login")
})
