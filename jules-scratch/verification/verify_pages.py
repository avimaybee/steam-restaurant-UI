from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Create a list to store console messages
    console_messages = []

    # Listen for console events and store them
    page.on("console", lambda msg: console_messages.append(f"{msg.type}: {msg.text}"))

    try:
        # Navigate to the landing page and take a screenshot
        page.goto("http://localhost:8000/landing-page.html", wait_until="networkidle")
        page.screenshot(path="jules-scratch/verification/landing-page.png")

    finally:
        # Write all console messages to the log file
        with open("console-logs.txt", "w") as f:
            for msg in console_messages:
                f.write(msg + "\n")

        browser.close()

with sync_playwright() as playwright:
    run(playwright)