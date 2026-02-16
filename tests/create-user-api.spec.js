import { test, expect, request } from "@playwright/test"

let userData = {
    "id": 0,
    "username": "Gambino2",
    "firstName": "David",
    "lastName": "Okafor",
    "email": "affiaokafor@gmail.com",
    "password": "1234567890",
    "phone": "08110115256",
    "userStatus": 2
}

test.describe(() => {


    test("create a new user", async ({ request }) => {
        const response = await request.post("https://petstore.swagger.io/v2/user", {
            data: userData,
            headers: { 'Content-Type': 'application/json' }
        })
        expect(response.ok()).toBeTruthy()
        const body = await response.json()

        console.log(body)
    })


    test("get user", async ({ request }) => {
        const response = await request.get("https://petstore.swagger.io/v2/user/" + userData.username, {
            headers: { "Content-Type": "application/json" }
        })
        expect(response.ok()).toBeTruthy()
        const body = await response.json()
        console.log(body)
    })

    test("update user", async ({ request }) => {

        userData.username = "Affia123"

        const response = await request.put("https://petstore.swagger.io/v2/user/Gambino2", {
            data: userData,
            headers: { "Content-Type": "application/json" }
        })
        expect(response.ok()).toBeTruthy()
        const body = await response.json()

        console.log(body)
    })

    test("delete user", async ({ request }) => {
        const response = await request.delete("https://petstore.swagger.io/v2/user/" + userData.username, {
            headers: { "Content-Type": "application/json" }
        })

        expect(response.ok()).toBeTruthy()
        const body = await response.json()
        console.log(body)
    })
})