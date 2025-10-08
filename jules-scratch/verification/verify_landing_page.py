from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Listen for all console events and print them
    page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))

    # Navigate to the landing page and take a screenshot
    print("Navigating to landing-page.html")
    page.goto("http://localhost:8000/landing-page.html")
    page.wait_for_selector("main.bg-secondary-color") # Wait for the main content to be visible
    page.wait_for_load_state('networkidle')
    page.screenshot(path="jules-scratch/verification/landing-page.png")
    print("Screenshot of landing-page.html taken.")

    # Save the page's HTML content for inspection
    with open("jules-scratch/verification/landing-page-dom.html", "w") as f:
        f.write(page.content())
    print("Landing page DOM saved to jules-scratch/verification/landing-page-dom.html")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)