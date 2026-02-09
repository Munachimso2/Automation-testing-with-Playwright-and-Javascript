import { test as base, expect } from "@playwright/test";

const test = base.extend({
    loginPage: async ({ page }, use) => {
        await page.goto("https://the-internet.herokuapp.com/login")
        await use(page)
    },

    loginPageForPractice: async ({ page }, use) => {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
        await use(page)
    }
})

export { test, expect }
