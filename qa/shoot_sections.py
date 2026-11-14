"""Screenshots of each section built in Revision 37, at 1440 and 390. Run after `npm run preview`."""
import os
import sys
from playwright.sync_api import sync_playwright

URL = os.environ.get("QA_URL", "http://localhost:4173/")
CHROME = os.path.join(os.environ["LOCALAPPDATA"], "ms-playwright", "chromium-1248", "chrome-win64", "chrome.exe")
OUT = os.path.join(os.path.dirname(__file__), "..", "screenshots", "2026-11-14_remaining-sections")
IDS = ["services", "cta", "steps", "work", "reviews", "clients", "pricing", "contact"]
os.makedirs(OUT, exist_ok=True)
widths = [int(w) for w in sys.argv[1:]] or [1440, 390]

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME)
    for w in widths:
        page = browser.new_page(viewport={"width": w, "height": 900})
        page.goto(URL)
        page.wait_for_timeout(1500)
        for sid in IDS:
            el = page.locator(f"#{sid}")
            el.scroll_into_view_if_needed()
            page.wait_for_timeout(500)
            el.screenshot(path=os.path.join(OUT, f"{sid}-{w}.png"))
        over = page.evaluate("document.documentElement.scrollWidth > innerWidth")
        print(w, "overflow" if over else "no overflow")
        page.close()
    browser.close()
