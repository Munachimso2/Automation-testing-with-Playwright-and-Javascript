// import { test, expect } from "@playwright/test";
import { log } from "node:console"
import {test, expect} from "./fixtures.spec"


test.describe("group test for login page", () => {

    const validUser = {
        username: "tomsmith",
        password: "SuperSecretPassword!"
    }

    const wrongPass = {
        username: "tomsmith",
        password: "thisismypassword!"
    }

    const wrongUser = {
        username: "david123",
        password: "SuperSecretPassword!"
    }

    test.beforeEach("universal test link", async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/login");
    });

    test("login successful", async ({ page }) => {
        const username = page.locator("#username");
        const password = page.locator("#password");
        const MsgPop = page.locator("#flash");

        await username.fill(validUser.username);
        await password.fill(validUser.password);

        await page.getByRole("button", { name: "Login" }).click();
        await expect(MsgPop).toContainText("You logged into a secure area!");
        await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure")
    });

    test("login failed by wrong username", async ({ page }) => {
        const username = page.locator("#username");
        const password = page.locator("#password");
        const MsgPop = page.locator("#flash");

        await username.fill(wrongUser.username);
        await password.fill(wrongUser.password);
        await page.getByRole("button", { name: "Login" }).click();
        await expect(MsgPop).toContainText("Your username is invalid!")
    })

    test("login failed by wrong password", async ({ page }) => {
        const username = page.locator("#username");
        const password = page.locator("#password");
        const MsgPop = page.locator("#flash");

        await username.fill(wrongPass.username);
        await password.fill(wrongPass.password);
        await page.getByRole("button", { name: "Login" }).click();
        await expect(MsgPop).toContainText("Your password is invalid!");
    })

    test("clear inputs using keyboard", async ({ page }) => {
        const username = page.locator("#username");
        const password = page.locator("#password");
        const modifier = process.platform == 'darwin' ? "Meta" : "Control"

        await username.fill(validUser.username);
        await password.fill(validUser.password);

        await username.click();
        await username.press(`${modifier}+A`);
        await username.press("Backspace");
        await expect(username).toHaveValue("");

        await password.click();
        await password.press(`${modifier}+A`);
        await password.press("Backspace");
        await expect(password).toHaveValue("")
    })
})



test("login Page", async({loginPage}) => {
    const userLogin = loginPage.locator("#username")
    const userPassword = loginPage.locator("#password")

    await userLogin.fill("tomsmith");
    await userPassword.fill("SuperSecretPassword!");
    await loginPage.getByRole("button", {name: "Login"}).click();
    await expect(loginPage).toHaveURL("https://the-internet.herokuapp.com/secure")
})

