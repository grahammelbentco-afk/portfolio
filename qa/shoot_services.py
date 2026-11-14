"""Services (Revision 39, bento) screenshots at 1440, 1024, 390, plus close-ups of each device screen."""
import os
from playwright.sync_api import sync_playwright

URL = os.environ.get("QA_URL", "http://localhost:4173/")
CHROME = os.path.join(os.environ["LOCALAPPDATA"], "ms-playwright", "chromium-1248", "chrome-win64", "chrome.exe")
OUT = os.path.join(os.path.dirname(__file__), "..", "screenshots", "2026-11-14_services-r41-own")
os.makedirs(OUT, exist_ok=True)


def settle(page):
    for t in page.locator("#services [data-service]").all():
        t.scroll_into_view_if_needed()
        page.wait_for_timeout(200)
    page.locator("#services").scroll_into_view_if_needed()
    page.wait_for_timeout(900)


with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME)
    for w, h in ((1440, 900), (1024, 800), (390, 844)):
        page = browser.new_page(viewport={"width": w, "height": h})
        page.goto(URL)
        page.wait_for_timeout(1000)
        settle(page)
        page.locator("#services").screenshot(path=os.path.join(OUT, f"services-{w}.png"))
        if w == 1440:
            for sid in ("websites", "apps", "seo"):
                page.locator(f"[data-service={sid}]").screenshot(path=os.path.join(OUT, f"tile-{sid}-1440.png"))
            page.hover("[data-service=seo]")
            page.wait_for_timeout(1300)
            page.locator("[data-service=seo]").screenshot(path=os.path.join(OUT, "tile-seo-1440-hover.png"))
        print(w, "overflow" if page.evaluate("document.documentElement.scrollWidth > innerWidth") else "no overflow")
        page.close()
    browser.close()
