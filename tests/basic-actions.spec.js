import {test, expect} from "@playwright/test"

test("enter test", async({page}) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.getByLabel("Username").fill("Munachimso2");
    await page.getByLabel("Password").fill("Munachimso2");
    await page.getByRole("button", {name: "Login"}).click();
    console.log("seen")
})