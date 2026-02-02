import {test, expect} from "@playwright/test"

test("wait for element state", async({page}) => {
    await page.goto("https://the-internet.herokuapp.com/checkboxes");
    
    const checkboxes = page.locator("#checkboxes input")
    const checkbox1 = checkboxes.nth(0)
    const checkbox2 = checkboxes.nth(1)

    await checkbox1.waitFor({state: "visible"})
    await checkbox1.setChecked(true, {force: true})
    await expect(checkbox1).toBeChecked()
})

test("wait for page to have url", async({page}) => {
    await page.goto("https://the-internet.herokuapp.com/checkboxes");
    await page.waitForURL("https://the-internet.herokuapp.com/checkboxes", {timeout: 3000})
    console.log()
})


test("wait for network idle", async({page}) => {
    await page.goto("https://the-internet.herokuapp.com/checkboxes");
    await page.waitForLoadState("networkidle")
})