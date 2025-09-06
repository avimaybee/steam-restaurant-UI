import asyncio
from playwright.sync_api import sync_playwright, expect
import pathlib

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        base_url = "http://localhost:8000"

        # 1. Verify Landing Page
        page.goto(f"{base_url}/landing-page.html")
        page.wait_for_selector("#main-header nav") # Wait for header to load
        expect(page).to_have_title("Steam - Modern Asian Fusion")
        page.screenshot(path="jules-scratch/verification/01-landing-page.png")

        # 2. Verify Navigation to Menu Page
        menu_link = page.locator("nav").get_by_role("link", name="Menu")
        menu_link.click()
        page.wait_for_selector("#main-header nav") # Wait for header to load
        expect(page).to_have_title("Our Menu | Steam - Modern Asian Fusion")
        page.screenshot(path="jules-scratch/verification/02-menu-page.png")

        # 3. Verify Navigation to Gallery Page
        gallery_link = page.locator("nav").get_by_role("link", name="Gallery")
        gallery_link.click()
        page.wait_for_selector("#main-header nav") # Wait for header to load
        expect(page).to_have_title("Gallery | Steam - Modern Asian Fusion")
        page.screenshot(path="jules-scratch/verification/03-gallery-page.png")

        # 4. Verify Mobile Menu
        page.set_viewport_size({"width": 375, "height": 667})
        menu_button = page.locator("#mobile-menu-button")
        expect(menu_button).to_be_visible()
        menu_button.click()

        mobile_menu = page.locator("#mobile-menu")
        expect(mobile_menu).to_be_visible()

        page.screenshot(path="jules-scratch/verification/04-mobile-menu-open.png")

        browser.close()

if __name__ == "__main__":
    run_verification()
