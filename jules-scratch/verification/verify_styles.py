from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # landing-page.html
    page.goto("http://localhost:8000/landing-page.html")
    page.screenshot(path="jules-scratch/verification/landing-page.png")

    # our-menu.html
    page.goto("http://localhost:8000/our-menu.html")
    page.screenshot(path="jules-scratch/verification/our-menu.png")

    # order-page.html
    page.goto("http://localhost:8000/order-page.html")
    page.screenshot(path="jules-scratch/verification/order-page.png")

    # table-reservations.html
    page.goto("http://localhost:8000/table-reservations.html")
    page.screenshot(path="jules-scratch/verification/table-reservations.png")

    # 404.html
    page.goto("http://localhost:8000/404.html")
    page.screenshot(path="jules-scratch/verification/404.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)