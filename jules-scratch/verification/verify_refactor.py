import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # 1. Go to the landing page.
        await page.goto("http://localhost:8000/landing-page.html")

        # 2. Check the theme switcher.
        # Ensure the initial theme is light
        await expect(page.locator("html")).to_have_attribute("data-theme", "light")

        # Click the theme toggle button
        await page.locator("#theme-toggle").click()

        # Assert the theme has changed to dark
        await expect(page.locator("html")).to_have_attribute("data-theme", "dark")
        await page.screenshot(path="jules-scratch/verification/theme-switcher-verification.png")

        # 3. Check the mobile menu.
        # Note: Playwright's default viewport is large enough that the mobile menu might not be visible.
        # We need to set a smaller viewport to ensure the mobile menu button is present.
        await page.set_viewport_size({"width": 375, "height": 667})

        # Click the mobile menu button
        mobile_menu_button = page.locator("#mobile-menu-button")
        await mobile_menu_button.click()

        # Assert the mobile menu is visible
        mobile_menu = page.locator("#mobile-menu")
        await expect(mobile_menu).to_be_visible()
        await page.screenshot(path="jules-scratch/verification/mobile-menu-verification.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())