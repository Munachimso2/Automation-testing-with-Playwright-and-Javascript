import { test, expect } from "@playwright/test";


test("clear input fields", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");

    const username = page.locator("#username");
    const password = page.locator("#password");
    await username.fill("tomsmith");
    await password.fill("SuperSecretPassword!");

    await password.fill("");
    await username.fill("");

    await expect(username).toHaveValue("");
    await expect(password).toHaveValue("");
})

test('clear text field', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    const username = page.locator("#username");
    const password = page.locator("#password");
    await username.fill("tomsmith");
    await password.fill("SuperSecretPassword!");

    await username.clear();
    await password.clear();
    await expect(username).toHaveValue("");
    await expect(password).toHaveValue("")

})

test("keyboard key press", async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    const username = page.locator("#username");
    const password = page.locator("#password");
    await username.fill("tomsmith");
    await password.fill("SuperSecretPassword!");

    const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';

    await username.click();
    await username.press(`${modifier}+A`);
    await username.press("Backspace");

    await password.click();
    await password.press(`${modifier}+A`);
    await password.press("Backspace");

    await expect(username).toHaveValue("")
    await expect(password).toHaveValue("")
})


test("hover reveals user info", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/hovers");

    const user1 = page.locator("#content>.example>.figure").nth(0);
    const nameVisibility = page.getByText("name: user1");
    const linkVisibility = page.getByRole("link", { name: "View Profile" });

    await user1.hover();
    await expect(nameVisibility).toBeVisible();
    await expect(linkVisibility).toBeVisible()
});

test("hover over element then click", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/hovers");

    const user1 = page.locator("#content>.example>.figure").nth(0);
    const nameVisibility = page.getByText("name: user1");
    const linkVisibility = page.getByRole("link", { name: "View Profile" });

    await user1.hover();
    await expect(nameVisibility).toBeVisible();
    await expect(linkVisibility).toBeVisible();

    await linkVisibility.click()
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/users/1");

    const heading = page.getByRole("heading", { name: 'Not Found' })
    await expect(heading).toContainText("Not Found")
})

test("drag and drop using loactor", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/drag_and_drop")

    const columnA = page.locator("#column-a");
    const columnB = page.locator("#column-b");

    await columnA.dragTo(columnB)

    await expect(columnA).toContainText("B")
})

test("drag and drop using page", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/drag_and_drop")

    const columnA = page.locator("#column-a");
    const columnB = page.locator("#column-b");

    await page.dragAndDrop(columnA, columnB);

    await expect(columnA).toContainText("B")
    await expect(columnB).toContainText("A")
})

