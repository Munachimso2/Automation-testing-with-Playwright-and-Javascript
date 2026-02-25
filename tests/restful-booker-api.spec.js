import { test, expect } from "@playwright/test"

let token;
const headers = { "Content-Type": "application/json" };
let userData = {
    "firstname": "Affia",
    "lastname": "Okafor",
    "totalprice": 2366,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2026-03-01",
        "checkout": "2026-05-02"
    },
    "additionalneeds": "Lunch"
}

test.beforeEach(() => {

})

test.describe(() => {

    test("create token", async ({ request }) => {
        const response = await request.post("https://restful-booker.herokuapp.com/auth", {
            data: {
                "username": "admin",
                "password": "password123"
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
        expect(response.ok()).toBeTruthy()
        const body = await response.json()

        token = body.token

        console.log(token)

    })

    test("create booking", async ({ request }) => {
        const response = await request.post("https://restful-booker.herokuapp.com/booking", {
            headers: headers,
            data: userData
        })
        expect(response.ok()).toBeTruthy()

        const body = await response.json()
        console.log(body)
        expect(body.booking.firstname).toBe(userData.firstname)
        expect(body.booking.lastname).toBe(userData.lastname)

    })


    test("get by booking ID", async ({ request }) => {

        let bookingId = "1409";

        const response = await request.get("https://restful-booker.herokuapp.com/booking/" + bookingId, {
            headers: headers
        })
        expect(response.ok()).toBeTruthy()

        const body = await response.json()
        console.log(body)
    })


    test("update booking", async ({ request }) => {

        let bookingId = "1409";

        const response = await request.put("https://restful-booker.herokuapp.com/booking/" + bookingId, {
            headers: {
                headers,
                "Accept": "application/json",
                "Cookie": "token=" + token
            },
            data:
            {
                "firstname": "David",
                "lastname": "Okafor",
                "totalprice": 2366,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2026-03-01",
                    "checkout": "2026-05-02"
                },
                "additionalneeds": "Lunch"
            }
        })
        expect(response.ok()).toBeTruthy()

        const body = await response.json()
        console.log(body)
    })

    test("delete booking", async ({ request }) => {
        let bookingId = "1409";

        const response = await request.delete("https://restful-booker.herokuapp.com/booking/" + bookingId, {
            headers: {
                headers,
                "Cookie": "token=" + token
            },
        })

        expect(response.ok()).toBeTruthy()

        console.log(response)
    })
})


test.describe("create user", async ({ page }) => {
    page.addInitScript(value => {

        window.localStorage.setItem("token", token)
    })

    test("login user", async ({ page }) => {
        const firstname = page.locator("#name")
        await firstname.fill("Affia")

        const upload = await page.getByLabel("Upload Files").setInputFiles(__dirname, "file.txt")

    })
})