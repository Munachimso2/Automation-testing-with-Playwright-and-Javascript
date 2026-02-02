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

        const iphone = page.getByRole("link", { name: "iPhone X" });
        await iphone.click();
        await expect(page).toHaveURL("https://rahulshettyacademy.com/angularpractice/")
    })

    test("login failed", async ({ page }) => {
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

    
    test("protocommerce page", async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/angularpractice/")

        const name = page.locator("input[name = 'name']").nth(0)
        const email = page.locator("input[name = 'email']")
        const password = page.locator("#exampleInputPassword1")
        const checkbox = page.locator("#exampleCheck1")
        const selectOption = page.locator("select").nth(0)
        const employStatusRadio = page.locator("#inlineRadio2")
        const dob = page.locator("input[name = 'bday']")

        await name.focus()
        await name.fill("Affia")
        await expect(name).toHaveValue("Affia")
        await email.focus()
        await email.fill("dokafor@gmail.com")
        await expect(email).toHaveValue("dokafor@gmail.com")
        await password.focus()
        await password.fill("1234567890")
        await expect(password).toHaveValue("1234567890")
        await checkbox.check()
        await expect(checkbox).toBeChecked()
        await employStatusRadio.check()
        await expect(employStatusRadio).toBeChecked()
        await selectOption.selectOption("Male")
        await expect(selectOption).toHaveValue("Male")
        await dob.focus()
        await dob.type("03012002")
        await expect(dob).toHaveValue("2002-01-03")
        await page.getByRole("button", { name: "Submit" }).click()

        const msgPop = page.locator(".alert-success")
        await expect(msgPop).toContainText("Success! The Form has been submitted successfully!")
    })
})


