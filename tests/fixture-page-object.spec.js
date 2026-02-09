import { test as base } from "@playwright/test"
import LoginPage from "./page.objects.spec"


export const test = base.extend({
    login: async ({ page }, use) => {
        const loginNow = new LoginPage(page);
        await use(loginNow)
    }
})

