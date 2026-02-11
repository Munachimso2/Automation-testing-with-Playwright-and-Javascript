import { test, expect } from "@playwright/test"


exports.LoginSuccess = class LoginPage {
    constructor(page) {
        this.page = page
        this.name = page.locator("#name")
        this.email = page.locator("#email")
        this.password = page.locator("#password")
        this.gender = page.locator("#gender")
        this.loginBtn = page.getByRole("button", {name: "Login"})
    }


    async goto() {
        await this.page.goto("https://rahulshettyacademy.com/client/")
    }

    async Login() {
        await this.email.fill("")
        await this.password.fill("")
        await this.loginBtn.click()
    }
}



export{test, expect}

