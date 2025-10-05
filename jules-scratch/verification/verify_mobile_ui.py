from playwright.sync_api import sync_playwright, expect
import re

def run_verification(playwright):
    # Use the iPhone 11 viewport for mobile emulation
    iphone_11 = playwright.devices['iPhone 11']
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(**iphone_11)
    page = context.new_page()

    try:
        # 1. Verify Mobile Navigation
        page.goto("http://localhost:8000/landing-page.html")

        # Find and click the mobile menu button
        menu_button = page.locator("#mobile-menu-button")
        expect(menu_button).to_be_visible()
        menu_button.click()

        # Wait for the menu to be visible and take a screenshot
        mobile_menu = page.locator("#mobile-menu")
        # Wait for the 'open' class to be added, which signals the animation has started
        expect(mobile_menu).to_have_class(re.compile(r'open'))
        # Now that the class is present, it should be visible
        expect(mobile_menu).to_be_visible()
        page.screenshot(path="jules-scratch/verification/01_mobile_menu_open.png")

        # 2. Verify Gallery Page
        # Click the gallery link in the mobile menu
        gallery_link = mobile_menu.get_by_role("link", name="Gallery")
        gallery_link.click()

        # Wait for navigation and verify the URL
        expect(page).to_have_url("http://localhost:8000/gallery.html")
        # Take a screenshot of the responsive gallery
        page.screenshot(path="jules-scratch/verification/02_gallery_mobile.png")

        # 3. Verify Table Reservations Page
        page.goto("http://localhost:8000/table-reservations.html")

        # Wait for the page to load and take a screenshot
        expect(page.get_by_role("heading", name="Table Reservation")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/03_reservations_mobile.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)

print("Verification script finished and screenshots created.")