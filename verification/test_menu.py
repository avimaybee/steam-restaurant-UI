from playwright.sync_api import sync_playwright

def verify_menu():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Set viewport to desktop size
        page.set_viewport_size({"width": 1280, "height": 800})

        print("Navigating to menu page...")
        page.goto("http://localhost:8000/our-menu.html")

        print("Waiting for menu content...")
        try:
            # Wait for the intro text which is dynamically inserted
            page.wait_for_selector("text=The Experience Matters", state="visible", timeout=10000)

            # Wait a bit for fonts or images
            page.wait_for_timeout(1000)

            print("Taking screenshot...")
            page.screenshot(path="verification/menu_full.png", full_page=True)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")

        browser.close()
        print("Done.")

if __name__ == "__main__":
    verify_menu()
