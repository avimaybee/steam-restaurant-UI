
from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_menu_page(page: Page):
    # 1. Navigate to the menu page
    page.goto("http://localhost:8000/our-menu.html")

    # Wait for menu to load (it's dynamically loaded via JS)
    # We can wait for a specific element that indicates content is loaded
    # e.g., "The Experience Matters" header

    # Wait for the intro section
    page.wait_for_selector("text=The Experience Matters", timeout=10000)

    # 2. Verify Intro Section
    expect(page.get_by_text("The Experience Matters")).to_be_visible()
    expect(page.get_by_text("Let this be more than a meal. Let it be a memory.")).to_be_visible()

    # 3. Verify Banquet Section
    expect(page.get_by_text("Banquet Style Dining")).to_be_visible()

    # 4. Verify Description Formatting (Choose one lists)
    # Look for "Choose one:" and the bullet point we added (▪)
    # We can check if the bullet point character exists on the page
    expect(page.locator("body")).to_contain_text("▪")

    # 5. Verify a specific item
    expect(page.get_by_text("Everyone’s Favourite")).to_be_visible()

    # Scroll down to capture more content
    page.evaluate("window.scrollBy(0, 500)")
    time.sleep(0.5)

    # 6. Take screenshot
    page.screenshot(path="/home/jules/verification/menu_page.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_menu_page(page)
            print("Verification script passed successfully.")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
