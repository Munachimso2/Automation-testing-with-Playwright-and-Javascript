import { test, expect, request } from '@playwright/test';

const loginData = {
    username: "dokafor77",
    password: "Secure123"
};

let token;

test.describe(() => {
    // test.beforeAll(async () => {
    //     const apiContext = await request.newContext()
    //     const loginResponse = await apiContext.post("https://www.rahulshettyacademy.com/client/#/dashboard/dash", {
    //         data: loginData
    //     })
    //     expect(loginResponse.ok()).toBeTruthy()

    //     const body = await loginResponse.json(); 
    //     token = body.token;
    //     console.log(token)
    // })




    test("first API Test", async ({ page }) => {
        await page.goto("https://www.rahulshettyacademy.com/client")
        const searchBox = page.getByPlaceholder("search")
        await searchBox.fill("iphone 13 pro")
        await searchBox.press("Enter")
        const selectIphone13 = page.getByText("iphone 13 pro").getByRole("button", { name: "Add To Cart" })
        await selectIphone13.click()
    })

})
