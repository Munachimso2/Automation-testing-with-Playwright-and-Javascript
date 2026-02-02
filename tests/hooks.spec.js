import {test, expect} from "@playwright/test";

test.skip("test one", async({page}) => {
    console.log("test1")
})

test.only("test two", async({page}) => {
    console.log("test2")
})

