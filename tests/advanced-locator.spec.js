import {test, expect} from "@playwright/test";

test("filter by text", async({page}) =>{
    await page.goto('https://the-internet.herokuapp.com/');
    await page.locator("a", {hasText: "A/B Testing"}).click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/abtest")
})

test("by text", async({page}) => {
    await page.goto('https://the-internet.herokuapp.com/');
    const getter = page.getByText("A/B Testing");
    await getter.click();
    const url = page.url();
    await expect(url).toBe("https://the-internet.herokuapp.com/abtest")
})