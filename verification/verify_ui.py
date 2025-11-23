
from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_ui_improvements(page: Page):
    # 1. Landing Page
    print("Verifying Landing Page...")
    page.goto("http://localhost:8000/landing-page.html")
    expect(page.get_by_text("Asian Fusion Redefined")).to_be_visible()
    page.screenshot(path="/home/jules/verification/landing_page.png", full_page=True)

    # 2. Reservations Page
    print("Verifying Reservations Page...")
    page.goto("http://localhost:8000/table-reservations.html")
    expect(page.locator("#fullName")).to_be_visible()
    page.screenshot(path="/home/jules/verification/reservations_page.png", full_page=True)

    # 3. Order Page
    print("Verifying Order Page...")
    page.goto("http://localhost:8000/order-page.html")
    expect(page.get_by_text("Order Online", exact=False)).to_be_visible()
    page.screenshot(path="/home/jules/verification/order_page.png", full_page=True)

    # 4. About Page
    print("Verifying About Page...")
    page.goto("http://localhost:8000/about-us.html")
    # Use a more specific locator to avoid strict mode violation
    expect(page.locator("span").filter(has_text="Our Philosophy")).to_be_visible()
    page.screenshot(path="/home/jules/verification/about_page.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_ui_improvements(page)
            print("UI Verification script passed successfully.")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
