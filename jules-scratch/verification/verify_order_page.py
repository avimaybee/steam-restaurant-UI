from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:8000/landing-page.html", wait_until="load")

        # Wait for the store to be defined on the window object by polling.
        # This is more robust than waiting for a specific console message or load event.
        page.wait_for_function("() => window.store !== undefined")

        print("Polling successful: window.store is defined.")

        # Now that we've confirmed the store is exposed, we can safely interact with it.
        page.evaluate("""async () => {
            await window.store.getMenu();
            window.store.addToCart(13, 1); // Spicy Wagyu Dumplings
            window.store.addToCart(37, 2); // Korean Beef Bulgogi
        }""")

        # Navigate to the order page
        page.goto("http://localhost:8000/order-page.html")

        # Wait for the order items container to be visible
        order_items_container = page.locator("#order-items-container")
        expect(order_items_container).to_be_visible()

        # Verify that the cart items are displayed
        expect(page.get_by_text("Spicy Wagyu Dumplings")).to_be_visible()
        expect(page.get_by_text("Korean Beef Bulgogi")).to_be_visible()

        # Verify quantities
        dumpling_item = page.locator(".cart-item-card", has_text="Spicy Wagyu Dumplings")
        bulgogi_item = page.locator(".cart-item-card", has_text="Korean Beef Bulgogi")

        expect(dumpling_item.locator("span", has_text="1")).to_be_visible()
        expect(bulgogi_item.locator("span", has_text="2")).to_be_visible()

        # Take a screenshot for verification
        page.screenshot(path="jules-scratch/verification/order_page_verification.png")

        print("Verification script ran successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)