import { test, expect } from "@playwright/test";

test("successful login", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.locator("#username").fill("tomsmith");
    await page.locator("#password").fill("SuperSecretPassword!");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");
    const successMessage = page.locator("#flash");
    await expect(successMessage).toContainText("You logged into a secure area!");
    await page.getByRole("link", { name: "Logout" }).click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/login")
})

test("failed login", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login")
    await page.locator("#username").fill("johndoe@gmail.com");
    await page.locator("#password").fill("hfehfehfeh");
    await page.getByRole("button", { name: "Login" }).click();
    const errorMessage = page.locator("#flash")
    await expect(errorMessage).toContainText("Your username is invalid!");
})

test("test checkbox", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/checkboxes");
    const check1 = page.locator("#checkboxes").getByRole("checkbox").nth(0)
    const check2 = page.locator("#checkboxes").getByRole("checkbox").nth(1)
    await check1.check({timeout: 6000})
    await expect(check1).toBeChecked()
    await check2.uncheck({timeout:6000})
    await expect(check2).toBeChecked({checked: false})
})

test("radio buttons", async ({ page }) => {
    await page.goto("https://www.mortgagecalculator.org/");
    const trackRadio = page.locator(`input[value = "percent"][name = "param[downpayment_type]"][type = "radio"]`);
    await trackRadio.check();
    await expect(trackRadio).toBeChecked();
})

test("dropdown", async({page}) => {
    await page.goto("https://the-internet.herokuapp.com/dropdown");
    const selectedOption = page.locator("#dropdown");
    await selectedOption.selectOption("1")
    await expect(selectedOption).toHaveValue("1");
    await page.reload();
    await expect(selectedOption).toHaveValue("")
})

test("dynamic loading", async({page}) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_loading/1");
    await page.getByRole("button", {name: "Start"}).click();
    const loader = page.locator("#loading");
    const message = page.locator("#finish h4");
    await expect(message).toContainText("Hello World!");
    await expect(loader).toBeHidden({timeout: 10000});
})

test("is element hidden", async({page}) => {
    await page.goto("https://mortgagecalculator.org/", { waitUntil: "domcontentloaded", timeout: 15000 });
    await expect(page).toHaveTitle("Mortgage Calculator");
    const hiddenObj = page.locator("#colorbox")
    await expect(hiddenObj).toBeHidden()
})

test("is element visible", async({page}) => {
    await page.goto("https://mortgagecalculator.org/", { waitUntil: "domcontentloaded", timeout: 15000 });
    await expect(page).toHaveTitle("Mortgage Calculator");
    const hiddenObj = page.locator('#toggle_pie');
    await expect(hiddenObj).toBeVisible();
    await expect(hiddenObj).toContainText("View Loan Breakdown")
})