from playwright.sync_api import sync_playwright, expect

def on_console_message(msg):
    """Callback function to handle console messages."""
    print(f"Browser Console ({msg.type}): {msg.text}")

def verify_menu():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Listen for all console events
        page.on("console", on_console_message)

        try:
            page.goto("http://localhost:8000/our-menu.html", wait_until="networkidle")

            # Click the 'Specials' filter button to ensure the item is visible
            specials_button = page.locator('button[data-category="specials"]')
            expect(specials_button).to_be_visible(timeout=10000)
            specials_button.click()

            # Check for a newly added item from the specials section
            new_item_name = "Rockford Alicante Bouchet"
            new_item_locator = page.get_by_text(new_item_name, exact=True)

            # Scroll to the item to make sure it's in view
            new_item_locator.scroll_into_view_if_needed(timeout=10000)

            expect(new_item_locator).to_be_visible(timeout=10000)

            print(f"Successfully found '{new_item_name}' on the menu page.")

            page.screenshot(path="jules-scratch/verification/menu_verification.png")
            print("Screenshot captured successfully.")

        except Exception as e:
            print(f"An error occurred during verification: {e}")
            page.screenshot(path="jules-scratch/verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_menu()