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
    await check1.check()
    await check2.uncheck()
})

// test("radio buttons", async({page}) => {
//     await page.goto("https://www.mortgagecalculator.org/");
//     const trackRadio = page.locator('//*[@id="calc"]/form/section/section[2]/div/div/div[1]/div/div/div[4]/div[1]/div[1]/div[2]/span/label[2]/input')
//     await trackRadio.click()
//     await expect(trackRadio).toBeChecked()
// })

test("radio buttons", async ({ page }) => {
    await page.goto("https://www.mortgagecalculator.org/");
    const trackRadio = page.locator(`input[value = "percent"][name = "param[downpayment_type]"][type = "radio"]`);
    await trackRadio.check();
    await expect(trackRadio).toBeChecked();
})

test("dropdown by value", async({page}) => {
    await page.goto("https://the-internet.herokuapp.com/dropdown");
    await page.locator("#dropdown").selectOption("1");
    const selectedOption = page.locator(`option[value = "1"]`);
    await expect(selectedOption).toHaveValue("1");
    await page.reload();
    await expect(selectedOption).toHaveValue("")
})
