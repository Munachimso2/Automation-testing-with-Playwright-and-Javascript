import { test, expect } from "@playwright/test";

test("form test", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    const name = page.locator("input[name = 'name'][type = 'text']").nth(0)
    const email = page.locator("input[name = 'email']")
    const password = page.locator("#exampleInputPassword1")
    const gender = page.locator("#exampleFormControlSelect1")
    const employStatus = page.locator("#inlineRadio2")
    const dob = page.locator("input[name = 'bday']")
    const submitBtn = page.getByRole("button", { name: "Submit" })
    const successMsgPop = page.locator(".alert-success")

    await name.fill("Affia Okafor");
    await expect(name).toHaveValue("Affia Okafor");
    await email.fill("dokafor77@gmail.com");
    await expect(email).toHaveValue("dokafor77@gmail.com");
    await password.fill("1234567890");
    await expect(password).toHaveValue("1234567890");
    await gender.selectOption("Female");
    await expect(gender).toHaveValue("Female");
    await employStatus.check();
    await expect(employStatus).toBeChecked();
    await dob.type("01032002");
    await expect(dob).toHaveValue("2002-03-01");
    await submitBtn.click();
    await expect(successMsgPop).toBeVisible();
    await expect(successMsgPop).toContainText("Success!");
    await page.reload();
    await expect(name).toHaveValue("");
    await expect(email).toHaveValue("");
    await expect(password).toHaveValue("");
    await expect(gender).toHaveValue("");
    await expect(employStatus).not.toBeChecked();
    await expect(dob).toHaveValue("");


})

test("dropdown and dynamic list", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    const dropdown = page.locator("#dropdown-class-example")
    const pickCountry = page.locator("#autocomplete")
    const picked = page.getByText("India", { exact: true });


    await dropdown.selectOption("option1");
    await expect(dropdown).toHaveValue("option1");
    await dropdown.selectOption("option2");
    await expect(dropdown).toHaveValue("option2");
    await dropdown.selectOption("option3");
    await expect(dropdown).toHaveValue("option3");
    await pickCountry.fill("Indi")
    await picked.click()
    await expect(pickCountry).toHaveValue("India");
})

test("Mouse and Hover", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/hovers")

    const user1 = page.locator("#content>.example>.figure").nth(0)
    const user1name = page.getByText("name: user1")
    const user2 = page.locator("#content>.example>.figure").nth(1)
    const user2name = page.getByText("name: user2")
    const user3 = page.locator("#content>.example>.figure").nth(2)
    const user3name = page.getByText("name: user3")
    const user3Link = page.getByRole("link", { name: "View Profile" })
    const heading = page.getByRole("heading", { name: "Not Found" })


    await user1.hover();
    await expect(user1name).toBeVisible();
    await user2.hover();
    await expect(user2name).toBeVisible();
    await user3.hover();
    await expect(user3name).toBeVisible();
    await user3Link.click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/users/3");
    await expect(heading).toContainText("Not Found");
})

test("Checkboxes, Radio, Hide Show", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    const check1 = page.locator('#checkBoxOption1')
    const check2 = page.locator('#checkBoxOption2')
    const hideBtn = page.locator('#hide-textbox')
    const showBtn = page.locator('#show-textbox')
    const radio2 = page.locator("input[value='radio2']")
    const textBox = page.locator('#displayed-text')

    await check1.check();
    await expect(check1).toBeChecked();
    await check2.uncheck();
    await expect(check2).toBeChecked({ checked: false });
    await hideBtn.click();
    await expect(textBox).toBeHidden();
    await showBtn.click();
    await expect(textBox).toBeVisible();
    await radio2.check();
    await expect(radio2).toBeChecked();
})

test("Alerts", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")

    const result = page.locator("#result")
    const jsAlert = page.getByRole('button', { name: 'Click for JS Alert' })
    const jsConfirm = page.getByRole("button", { name: "Click for JS Confirm" })
    const jsPrompt = page.getByRole("button", { name: "Click for JS Prompt" })

    page.once("dialog", dialog => dialog.accept());
    await jsAlert.click();
    await expect(result).toContainText("You successfully clicked an alert")

    page.once("dialog", dialog => dialog.dismiss());
    await jsConfirm.click();
    await expect(result).toContainText("You clicked: Cancel")

    page.once("dialog", dialog => dialog.accept("Affia David"))
    await jsPrompt.click();
    await expect(result).toContainText("You entered: Affia David")
})

test("Dynamic Loading", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_loading/1")

    const startBtn = page.getByRole("button", { name: "Start" })
    const loading = page.locator("#loading")
    const helloWorld = page.locator("#finish h4")


    await startBtn.click();
    await expect(loading).toBeVisible();
    await loading.waitFor({ state: "hidden" })
    await expect(helloWorld).toBeVisible();
    await expect(helloWorld).toContainText("Hello World!");
    await expect(loading).toBeHidden();
    await page.screenshot({ path: "screens/dynamic-Loading.jpeg", fullPage: true })
})

test("Waits and Multiple Elements", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/add_remove_elements/")

    const addBtn = page.getByRole("button", { name: "Add Element" })
    const deleteBtn = page.locator("#elements>button")


    await addBtn.click();
    await addBtn.click();
    await addBtn.click();
    await addBtn.click();
    await addBtn.click();
    await expect(deleteBtn).toHaveCount(5);
    await deleteBtn.nth(0).click();
    await deleteBtn.nth(1).click();
    await expect(deleteBtn).toHaveCount(3)
    const deleteBtnLast = deleteBtn.last()
    await expect(deleteBtnLast).toBeVisible()
})

test.describe.skip("Navigation + Assertions", () => {
    test.beforeEach("login Main", async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/")
    })

    const generalLinks = [
        { name: "A/B Testing", url: "https://the-internet.herokuapp.com/abtest" },
        { name: "Add/Remove Elements", url: "https://the-internet.herokuapp.com/add_remove_elements/" },
        { name: "Basic Auth", url: "https://the-internet.herokuapp.com/basic_auth" },
        { name: "Broken Images", url: "https://the-internet.herokuapp.com/broken_images" },
        { name: "Challenging DOM", url: "https://the-internet.herokuapp.com/challenging_dom" },
        { name: "Checkboxes", url: "https://the-internet.herokuapp.com/checkboxes" },
        { name: "Context Menu", url: "https://the-internet.herokuapp.com/context_menu" },
        { name: "Digest Authentication", url: "https://the-internet.herokuapp.com/digest_auth" },
        { name: "Dropdown", url: "https://the-internet.herokuapp.com/dropdown" },
        { name: "Dynamic Controls", url: "https://the-internet.herokuapp.com/dynamic_controls" },
    ]

    for (let index = 0; index < generalLinks.length; index++) {

        test(`Navigation to ${generalLinks[index].name}`, async ({ page }) => {
            await page.getByRole("link", { name: generalLinks[index].name }).click();
            await expect(page).toHaveURL(generalLinks[index].url);
        })
    }

    //Did not really code this myself from a-z, had most help from gemini on here. I was confused a bit. wanted to use something like this 
    // "await page.getByRole("link", { name: generalLinks[0].name }).click();
    //await expect(page).toHaveURL(generalLinks[0].url);
    //const heading = page.getByRole("heading", { name: "A/B Test Control" })
    //await expect(heading).toBeVisible();""

})


test.describe.only("E commerce Practice Register and Login", () => {

    const userLogin = {
        userEmail: "dokafor77@gmail.com",
        userPassword: "Secure123"
    }

    test("Register User", async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/client/#/auth/register")

        const firstName = page.locator("#firstName")
        const lastName = page.locator("#lastName")
        const email = page.locator("#userEmail")
        const phoneNo = page.locator("#userMobile")
        const occupation = page.locator("select[formcontrolname = 'occupation']")
        const maleRadio = page.locator("input[value = 'Male']")
        const password = page.locator("#userPassword")
        const confirmPass = page.locator("#confirmPassword")
        const ageConsent = page.locator("input[type = 'checkbox']")
        const registerBtn = page.getByRole("button", { name: "Register" })

        await firstName.fill("Affia");
        await expect(firstName).toHaveValue("Affia");

        await lastName.fill("Okafor");
        await expect(lastName).toHaveValue("Okafor");

        await email.fill(userLogin.userEmail);
        await expect(email).toHaveValue(userLogin.userEmail);

        await phoneNo.fill("8110115256");
        await expect(phoneNo).toHaveValue("8110115256");

        await occupation.selectOption("Engineer");
        await expect(occupation).toHaveValue(/Engineer/);

        await maleRadio.click();
        await expect(maleRadio).toBeChecked();

        await password.fill(userLogin.userPassword);
        await expect(password).toHaveValue(userLogin.userPassword);

        await confirmPass.fill(userLogin.userPassword);
        await expect(confirmPass).toHaveValue(userLogin.userPassword);

        await ageConsent.check();
        await expect(ageConsent).toBeChecked();

        await registerBtn.click()
    })

    test("Login User", async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/client")

        const email = page.locator("#userEmail")
        const password = page.locator("#userPassword")
        const loginBtn = page.getByRole("button", { name: "Login" })
        const add2cart = page.getByRole("button", { name: " Add To Cart" }).last()
        const searchBox = page.getByRole('textbox', { name: 'search' })
        const cart = page.getByText('Cart', { exact: true })
        const removeFromCart = page.locator(".btn-danger")

        await email.fill(userLogin.userEmail);
        await password.fill(userLogin.userPassword);
        await loginBtn.click()

        await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash")
        await searchBox.click();
        await searchBox.fill('iphone 13 pro');
        await searchBox.press('Enter');
        await expect(searchBox).toHaveValue("iphone 13 pro")
        const selectedProduct = await searchBox.inputValue()
        await add2cart.click() 
        await cart.click()
        await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/cart")
        await expect(page.getByText(selectedProduct)).toBeVisible();
        await removeFromCart.click()
        await expect(page.getByText(selectedProduct)).not.toBeVisible()
        await page.pause()
    })
})


