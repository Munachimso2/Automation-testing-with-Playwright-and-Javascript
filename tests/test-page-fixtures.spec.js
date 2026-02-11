import {test, expect} from "./fixture-page-object.spec"


test("logging in", async({page}) => {
    await loginNow.goto()
    await loginNow.Login()
})