import { test, expect } from "./fixtures.spec"




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
        await dob.type("01032002")
        await expect(dob).toHaveValue("2002-03-01")
        await page.getByRole("button", { name: "Submit" }).click()

        const msgPop = page.locator(".alert-success")
        await expect(msgPop).toContainText("Success! The Form has been submitted successfully!")
    })
})


test('test with no assertions', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    const enterName = page.locator(".form-group input[name = 'name']")
    await enterName.fill("Affia David")
    await expect(enterName).toHaveValue("Affia David")

    const enterEmail = page.locator(".form-group input[name = 'email']")
    await enterEmail.fill("dokafor77@gmail.com")
    await expect(enterEmail).toHaveValue("dokafor77@gmail.com")

    const enterPassword = page.locator("#exampleInputPassword1")
    await enterPassword.fill("myPassword")
    await expect(enterPassword).toHaveValue("myPassword")

    const checkbox = page.locator("#exampleCheck1")
    await checkbox.check()
    await expect(checkbox).toBeChecked()

    const selectGender = page.locator("#exampleFormControlSelect1")
    await selectGender.selectOption("Male")
    await expect(selectGender).toHaveValue("Male")

    const employment = page.locator("input[value ='option2']")
    await employment.check()
    await expect(employment).toBeChecked()

    const dob = page.locator("input[type ='date'][name = 'bday']")
    await dob.type("01032002")
    await expect(dob).toHaveValue("2002-03-01")

    const submitBtn = page.getByRole("button", { name: "Submit" })
    await submitBtn.click()

    const alertSuccess = page.locator(".alert-success")
    await expect(alertSuccess).toBeVisible()
    await expect(alertSuccess).toContainText("Success")

});

test("shop section", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/shop")

    const addIphone2cart = page.locator(".card-footer button").first()
    await addIphone2cart.click() 

    const checkout  = page.locator("a.nav-link.btn.btn-primary")
    await checkout.click()

    const iPhoneX = page.getByText("iPhone X")
    await expect(iPhoneX).toBeVisible()

    await page.getByRole("button", {name: "Remove"}).click()
    await expect(iPhoneX).not.toBeVisible()
})


test.describe("assertions practice", () => {

    const names = {
        myName: "Affia Okafor",
        myCountryName: "Nigeria"
    }



    test.only("assertions", async ({ loginPageForPractice }) => {
        const name = loginPageForPractice.locator('#name')
        const checkbox2 = loginPageForPractice.locator('#checkBoxOption2');
        const dropdownselect2 = loginPageForPractice.locator('#dropdown-class-example');
        const searchCountry = loginPageForPractice.getByRole('textbox', { name: 'Type to Select Countries' });
        const hideBtn = loginPageForPractice.locator('#hide-textbox');
        const showBtn = loginPageForPractice.locator('#show-textbox');
        const radio = loginPageForPractice.locator("input[value='radio2']")
        const hideOrShowExample = loginPageForPractice.getByRole('textbox', { name: 'Hide/Show Example' })




        await name.fill(names.myName);
        await expect(name).toHaveValue("Affia Okafor")

        await dropdownselect2.selectOption('option2');
        await expect(dropdownselect2).toHaveValue("option2");

        await checkbox2.check();
        await expect(checkbox2).toBeChecked();

        await searchCountry.click();
        await searchCountry.fill(names.myCountryName);
        await searchCountry.press("Enter");
        await expect(searchCountry).toHaveValue("Nigeria");

        await radio.check();
        await expect(radio).toBeChecked();

        await expect(hideOrShowExample).not.toBeHidden();
        await expect(hideOrShowExample).toBeVisible();

        await hideBtn.click();
        await expect(hideOrShowExample).toBeHidden();
        await expect(hideOrShowExample).not.toBeVisible();

        // await loginPageForPractice.pause();


        await loginPageForPractice.getByRole('button', { name: 'Confirm' }).click();
        await loginPageForPractice.getByRole('button', { name: 'Mouse Hover' }).click();


        const frameLocator = loginPageForPractice.frameLocator("#courses-iframe")

        await loginPageForPractice.locator('iframe[name="iframe-name"]').contentFrame().getByRole('link', { name: 'NEW All Access plan' }).click();
        const noOfSubscribers = await frameLocator.locator(".text h2 span").textContent()
        await expect(noOfSubscribers).toContain("13,522")

        console.log(noOfSubscribers)


        // const viewCourses = frameLocator.getByRole('link', { name: 'VIEW ALL COURSES' });
        // await viewCourses.click();

    })

})