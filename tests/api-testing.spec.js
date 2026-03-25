import { test, expect, request } from "@playwright/test"

const userLoginDetails = {
    userEmail: "dokafor77@gmail.com",
    userPassword: "Secure123"
}

let token;

test.describe("login to complete an order", () => {
    test.beforeEach(async ({ request, page }) => {
        const response = await request.post("https://www.rahulshettyacademy.com/api/ecom/auth/login", {
            data: userLoginDetails,
            headers: { "Content-Type": "application/json" }
        })

        expect(response.ok()).toBeTruthy()

        const body = await response.json()
        token = body.token

        console.log(token)

        await page.addInitScript(value => {
            window.localStorage.setItem("token", value)
        }, token)

    })


    test("complete order", async ({ page }) => {
        await page.goto("https://www.rahulshettyacademy.com/client/")
        const searchBox = page.getByRole('textbox', { name: 'search' })
        await searchBox.fill("iphone 13 pro")
        await searchBox.press("Enter")
        const iphone2cart = page.locator(".card", { hasText: "iphone 13 pro" }).getByRole("button", { name: "Add To Cart" })
        await iphone2cart.click()
        await page.pause()
        const cartBtn = page.getByText("Cart", {exact: true})
        await cartBtn.click()
    })
})