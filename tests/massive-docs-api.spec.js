import { test, expect, request } from "@playwright/test"

test.describe(() => {
    test("dividends endpoint", async ({ request }) => {
        const response = await request.get("https://api.massive.com/v3/reference/dividends?apiKey=Cv2LszttTmasVJ0mA0WNKG_U2N1bRilC", {
           headers: {"Content-Type" : "application/json"}
        })

        expect(response.ok()).toBeTruthy()
        const body = await response.json()
        console.log(body)
    })
})