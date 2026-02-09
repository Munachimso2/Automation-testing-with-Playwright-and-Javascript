import { test, expect } from "@playwright/test"
import {Login} from './product-grid-assignments.spec'

test.describe("product grid assignments", () => {
    test("Add one specific product to cart", async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/client")

        const email = page.getByRole("textbox", { name: "email@example.com" })
        await email.fill("dokafor77@gmail.com")
        const password = page.locator("#userPassword")
        await password.fill("Secure123")
        await page.locator("#login").click()

        await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash")

        const searchBox =  page.getByRole("textbox", {name: "search"})
        await searchBox.click()
        await searchBox.fill("iphone 13 pro")
        await searchBox.press("Enter")

        const selectIphone = page.locator(".card-body").filter({hasText: "iphone 13 pro"}).getByRole("button", {name: "Add to cart"})
        await selectIphone.click()
        const cart = page.locator("button").filter({hasText: /Cart/}).first()
        await cart.click() 
        await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/cart")
        const added2cart = page.getByRole("heading", {name: "iphone 13 pro"})
        await expect(added2cart).toBeVisible()
        const deleteBtn = page.locator(".btn-danger")
        await deleteBtn.click()
        await expect(added2cart).not.toBeVisible()
    })
})


