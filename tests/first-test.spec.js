import { test, expect } from "@playwright/test";


test("by role", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.getByRole("link", { name: "checkboxes" }).click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/checkboxes")
})

test("by js-code", async ({page}) => {
    await page.goto("https://www.amugoldgroup.com/");
    await page.locator(("#about > div > div > div > div.col-xl-6.col-lg-6.col-md-6 > div > div > a")).click();
    await expect(page).toHaveURL("https://www.amugoldgroup.com/about.html");
    const mailFill = page.getByPlaceholder("Enter your mail");
    await mailFill.fill('dokafor77@gmail.com');
    await expect(mailFill).toHaveValue("dokafor77@gmail.com");
    await page.locator(("body > footer > div.footer_top > div > div > div.col-xl-4.col-md-6.col-lg-4 > div > form > button")).click()
})


test("by css", async({page}) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.locator(`a[href="/drag_and_drop"]`).click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/drag_and_drop")
})

test("by title", async({page}) => {
    await page.goto("https://www.title.com/")
    await page.getByRole("link" , {name: "Find a Title Co."}).click();
    await expect(page).toHaveURL("https://www.title.com/#locations")
})


test("by label", async({page}) => {
    await page.goto("http://www.mortgagecalculator.org/");
    const homeValueLabel = page.getByLabel("Home Value");
    await homeValueLabel.fill("30");
    const value = await homeValueLabel.inputValue();
    expect(value).toBe("30")
})


test("by text", async({page}) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.getByText("A/B Testing").click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/abtest");
})

