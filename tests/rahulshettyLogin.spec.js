import { test, expect } from "@playwright/test"

test.describe("login page", () => {

    const validUser = {
        username: "rahulshettyacademy",
        password: "Learning@830$3mK2"
    }

    const wrongUser = {
        username: "hddfjdj",
        password: "Learning@830$3mK2"
    }

    test.beforeEach("login path", async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    })

    test("login success", async ({ page }) => {
        await page.locator("#username").fill(validUser.username);
        await page.locator("#password").fill(validUser.password);

        const radioSelectForUser = page.locator("#usertype").nth(1)

        await expect(radioSelectForUser).toHaveAttribute("value", "user");
        await radioSelectForUser.check();
        await expect(radioSelectForUser).toBeChecked();

        const modal = page.locator("#myModal")

        await expect(modal).toBeVisible()
        await page.locator("#okayBtn").click()


        const selectOption = page.locator("select")

        await selectOption.selectOption("stud")
        await expect(selectOption).toHaveValue("stud")

        const agreeTerms = page.locator("#terms")

        await agreeTerms.check();
        await expect(agreeTerms).toBeChecked();
        await page.getByRole("button", { name: "Sign In" }).click();

        await expect(page).toHaveURL("https://rahulshettyacademy.com/angularpractice/shop")
    })

    test("login failed", async ({page}) => {
        await page.locator("#username").fill(wrongUser.username);
        await page.locator("#password").fill(wrongUser.password);

        const radioSelectForUser = page.locator("#usertype").nth(1)

        await expect(radioSelectForUser).toHaveAttribute("value", "user");
        await radioSelectForUser.check();
        await expect(radioSelectForUser).toBeChecked();

        const modal = page.locator("#myModal")

        await expect(modal).toBeVisible()
        await page.locator("#okayBtn").click()


        const selectOption = page.locator("select")

        await selectOption.selectOption("stud")
        await expect(selectOption).toHaveValue("stud")

        const agreeTerms = page.locator("#terms")

        await agreeTerms.check();
        await expect(agreeTerms).toBeChecked();
        await page.getByRole("button", { name: "Sign In" }).click();

        const alertMsgFailed = page.locator("#login-form>div>strong")

        await expect(alertMsgFailed).toContainText("Incorrect")


    })
})


