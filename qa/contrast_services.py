"""Measured contrast for the Services bento: text and icons against the real rendered pixels.

For each tile, the text is made transparent, the area behind each text block is captured,
and the WCAG contrast of the text colour is computed against every background pixel. The
reported figure is the 5th percentile (the darkest 5% of contrast), not an average.
Pass marks: 4.5:1 for body text, 3:1 for large titles (>= 24px) and icons.
"""
import io
import os
import sys

import numpy as np
from PIL import Image
from playwright.sync_api import sync_playwright

URL = os.environ.get("QA_URL", "http://localhost:4173/")
CHROME = os.path.join(os.environ["LOCALAPPDATA"], "ms-playwright", "chromium-1248", "chrome-win64", "chrome.exe")
WIDTH = int(sys.argv[1]) if len(sys.argv) > 1 else 1440


def lum(rgb):
    c = rgb / 255.0
    c = np.where(c <= 0.03928, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    return 0.2126 * c[..., 0] + 0.7152 * c[..., 1] + 0.0722 * c[..., 2]


def contrast(fg, bg_pixels):
    lf = lum(np.array(fg, dtype=float))
    lb = lum(bg_pixels.astype(float))
    hi, lo = np.maximum(lf, lb), np.minimum(lf, lb)
    return (hi + 0.05) / (lo + 0.05)


def parse_rgb(s):
    nums = [float(x) for x in s[s.index("(") + 1 : s.index(")")].replace(",", " ").replace("/", " ").split()[:3]]
    return nums


with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME)
    page = browser.new_page(viewport={"width": WIDTH, "height": 900})
    page.goto(URL)
    page.wait_for_timeout(800)
    tiles = page.locator("#services [data-service]").all()
    for t in tiles:
        t.scroll_into_view_if_needed()
    page.wait_for_timeout(1200)
    page.add_style_tag(content="header{display:none!important} .skip-link{display:none!important}")
    fails = 0
    for t in tiles:
        sid = t.get_attribute("data-service")
        t.scroll_into_view_if_needed()
        page.wait_for_timeout(300)
        targets = []
        for kind, sel, need in (("title", "h3", 3.0), ("body", "p", 4.5)):
            el = t.locator(sel).first
            colour = parse_rgb(el.evaluate("e => getComputedStyle(e).color"))
            targets.append((kind, el, colour, need))
        icon = t.locator("[class*=icon]").first
        # Hide all text and the icon glyph, keep backgrounds.
        page.evaluate("""el => { el.querySelectorAll('h3, p, h3 *').forEach(n => n.style.setProperty('color', 'transparent', 'important'));
                                  el.querySelectorAll('h3 *').forEach(n => n.style.setProperty('-webkit-text-stroke-color', 'transparent', 'important'));
                                  el.querySelectorAll('[class*=icon] svg').forEach(n => n.style.visibility = 'hidden'); }""", t.element_handle())
        page.wait_for_timeout(100)
        row = [sid]
        for kind, el, colour, need in targets:
            box = el.bounding_box()
            png = page.screenshot(clip=box)
            px = np.asarray(Image.open(io.BytesIO(png)).convert("RGB")).reshape(-1, 3)
            c = np.percentile(contrast(colour, px), 5)
            ok = c >= need
            fails += 0 if ok else 1
            row.append(f"{kind} {c:4.1f}:1 {'ok' if ok else 'LOW'}")
        box = icon.bounding_box()
        # The glyph sits in the middle; skip the chip's rounded corners.
        inset = box["width"] * 0.22
        box = {"x": box["x"] + inset, "y": box["y"] + inset, "width": box["width"] - 2 * inset, "height": box["height"] - 2 * inset}
        png = page.screenshot(clip=box)
        px = np.asarray(Image.open(io.BytesIO(png)).convert("RGB")).reshape(-1, 3)
        ink = parse_rgb(icon.evaluate("e => getComputedStyle(e).color"))
        c = np.percentile(contrast(ink, px), 5)
        fails += 0 if c >= 3 else 1
        row.append(f"icon {c:4.1f}:1 {'ok' if c >= 3 else 'LOW'}")
        print(" | ".join(row))
    print("FAILS:", fails)
    browser.close()
