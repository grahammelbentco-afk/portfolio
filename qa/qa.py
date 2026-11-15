"""Browser QA for Website MVP V0.1, Phase 1.

Serve the static export first:  npm run preview
Then:  $env:CHROME = "$env:LOCALAPPDATA\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe"
       python -I qa/qa.py
Writes qa/qa-results.json and screenshots/.
"""
import io
import json
import os
import sys
from pathlib import Path

from PIL import Image, ImageChops
from playwright.sync_api import sync_playwright

URL = os.environ.get("QA_URL", "http://127.0.0.1:4173/")
ORIGIN = "/".join(URL.split("/")[:3])  # scheme://host[:port]; every request must stay on it
ROOT = Path(__file__).resolve().parents[1]
SHOTS = ROOT / "screenshots"
SHOTS.mkdir(exist_ok=True)
WIDTHS = {"mobile-390": (390, 844), "tablet-768": (768, 1024), "desktop-1440": (1440, 900), "wide-2080": (2080, 1200), "ultra-2560": (2560, 1300)}

results = []


def check(name, ok, detail=""):
    results.append({"check": name, "pass": bool(ok), "detail": detail})
    print(("PASS " if ok else "FAIL ") + name + (f"  ({detail})" if detail else ""))


def settle(page):
    page.wait_for_load_state("networkidle")
    page.evaluate("document.fonts.ready")
    page.wait_for_timeout(2600)  # intro timeline


with sync_playwright() as p:
    launch = {"executable_path": os.environ["CHROME"]} if os.environ.get("CHROME") else {}
    browser = p.chromium.launch(**launch)

    for name, (w, h) in WIDTHS.items():
        ctx = browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=1)
        page = ctx.new_page()
        errors = []
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(URL)
        settle(page)
        page.screenshot(path=str(SHOTS / f"{name}-fold.png"))
        page.screenshot(path=str(SHOTS / f"{name}-full.png"), full_page=True)

        overflow = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
        check(f"{name}: no horizontal overflow", overflow <= 0, f"overflow {overflow}px")
        check(f"{name}: no console errors", not errors, "; ".join(errors)[:300])

        # Content never touches the screen edges.
        edge = page.evaluate(
            """() => {
              const vw = document.documentElement.clientWidth;
              const bad = [];
              document.querySelectorAll('h1,h2,h3,p,li,a.btn').forEach(el => {
                // Cards in a horizontal carousel run past the edge by design.
                if (el.closest('[data-benefits-track]')) return;
                const r = el.getBoundingClientRect();
                if (r.width && (r.left < 15.5 || vw - r.right < 15.5)) bad.push(el.tagName + ':' + el.textContent.trim().slice(0,30));
              });
              return bad;
            }"""
        )
        check(f"{name}: text keeps >=16px side padding", not edge, ", ".join(edge[:5]))

        # Backgrounds span the full browser width; inner containers max 1920px and centred.
        widths = page.evaluate(
            """() => {
              const vw = document.documentElement.clientWidth;
              const full = ['header', '#top', '#about', '#cta', 'footer'].map(q => {
                const r = document.querySelector(q).getBoundingClientRect();
                return [q, Math.round(r.left), Math.round(r.width)];
              }).filter(([q, l, w]) => l !== 0 || w !== vw);
              const boxes = [...document.querySelectorAll('.container')].filter(c => c.offsetWidth > 0).map(c => {
                const r = c.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.width)];
              });
              const bad = boxes.filter(([l, w]) => w > 1920 || Math.abs(l - (vw - w) / 2) > 1);
              return { full, bad, max: Math.max(...boxes.map(b => b[1])) };
            }"""
        )
        check(f"{name}: section backgrounds span full width", not widths["full"], str(widths["full"]))
        check(f"{name}: containers max 1920px, centred", not widths["bad"], f"widest {widths['max']}px")

        hero_h1 = page.evaluate("(() => { const r = document.querySelector('h1').getBoundingClientRect(); return [r.height, parseFloat(getComputedStyle(document.querySelector('h1')).fontSize)]; })()")
        check(f"{name}: hero h1 on two lines", 0 < hero_h1[0] < hero_h1[1] * 2.2, f"font-size {round(hero_h1[1], 1)}px, height {round(hero_h1[0])}px")

        pills = page.evaluate("[...document.querySelectorAll('.btn')].filter(b => b.offsetParent).map(b => getComputedStyle(b).borderTopLeftRadius)")
        check(f"{name}: buttons are pills", bool(pills) and all(r == "9999px" for r in pills), ", ".join(sorted(set(pills))))

        imgs = page.evaluate(
            """async () => {
              // Lazy images below the fold haven't been requested yet: fetch those directly.
              const bad = [...document.images].filter(i => i.loading !== 'lazy' && (!i.complete || i.naturalWidth === 0)).map(i => i.src);
              const direct = [...document.querySelectorAll('svg image')].map(el => el.getAttribute('href'))
                .concat([...document.images].filter(i => i.loading === 'lazy').map(i => i.currentSrc || i.src));
              for (const src of direct) {
                const ok = await new Promise(res => { const im = new Image(); im.onload = () => res(im.naturalWidth > 0); im.onerror = () => res(false); im.src = src; });
                if (!ok) bad.push(src);
              }
              return bad;
            }"""
        )
        check(f"{name}: all images load", not imgs, ", ".join(imgs))

        fonts = page.evaluate("[...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight)")
        check(f"{name}: brand fonts loaded", any("Cabinet" in f or "cabinet" in f for f in fonts) and len(fonts) >= 2, ", ".join(sorted(set(fonts))))

        if w < 960:
            toggle = page.locator("button[aria-controls='mobile-menu']")
            check(f"{name}: menu toggle visible", toggle.is_visible())
            toggle.click()
            page.wait_for_timeout(400)
            check(f"{name}: menu opens (aria-expanded)", toggle.get_attribute("aria-expanded") == "true")
            focused = page.evaluate("document.activeElement.textContent")
            check(f"{name}: focus moves into menu", focused.strip() == "Services", focused)
            inert = page.evaluate("document.querySelector('main').inert")
            check(f"{name}: page behind menu is inert", inert)
            page.screenshot(path=str(SHOTS / f"{name}-menu-open.png"))
            page.keyboard.press("Escape")
            page.wait_for_timeout(200)
            check(f"{name}: Escape closes menu", toggle.get_attribute("aria-expanded") == "false")
            back = page.evaluate("document.activeElement.getAttribute('aria-controls')")
            check(f"{name}: focus returns to toggle", back == "mobile-menu")
            check(f"{name}: page not inert after close", not page.evaluate("document.querySelector('main').inert"))
            # Link click closes the menu and navigates.
            toggle.click()
            page.wait_for_timeout(300)
            page.locator("#mobile-menu a", has_text="Pricing").click()
            page.wait_for_timeout(1200)
            check(f"{name}: menu link closes menu and scrolls", toggle.get_attribute("aria-expanded") == "false" and page.evaluate("window.scrollY") > 500)
        else:
            check(f"{name}: desktop nav visible", page.locator("nav[aria-label='Main']").is_visible())

        ctx.close()

    # Keyboard: skip link, then tab order through header and hero.
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.goto(URL)
    settle(page)
    page.keyboard.press("Tab")
    first = page.evaluate("document.activeElement.textContent.trim()")
    check("keyboard: first Tab reaches skip link", first == "Skip to content", first)
    page.screenshot(path=str(SHOTS / "desktop-1440-focus-skip-link.png"), clip={"x": 0, "y": 0, "width": 720, "height": 200})
    order = []
    for _ in range(13):
        page.keyboard.press("Tab")
        order.append(page.evaluate("(() => { const e = document.activeElement; return (e.getAttribute('aria-label') || (e.labels && e.labels[0] && e.labels[0].textContent) || e.textContent).trim().slice(0, 30); })()"))
    check("keyboard: tab order header -> hero CTAs", order[:12] == ["Webleta, back to top", "Services", "Work", "Reviews", "Pricing", "Contact", "Chat with us on WhatsApp, +61 ", "Book a call", "For local businesses", "Your business website", "Get my free preview", "see the work"], " | ".join(order))
    outline = page.evaluate("getComputedStyle(document.activeElement).outlineStyle")
    page.screenshot(path=str(SHOTS / "desktop-1440-focus-hero.png"))
    check("keyboard: focus outline visible", outline != "none", outline)
    # Skip link moves focus to main.
    page.goto(URL)
    settle(page)
    page.keyboard.press("Tab")
    page.keyboard.press("Enter")
    page.wait_for_timeout(300)
    check("keyboard: skip link targets main", page.evaluate("location.hash") == "#main")
    ctx.close()

    # Hero background, header, headline, stats and trust at 1440.
    def bg_clip(page):
        # A patch of open background between the copy and the cards.
        return page.screenshot(clip={"x": 600, "y": 660, "width": 220, "height": 50})

    def max_diff(a, b):
        # Largest per-channel difference; 1-3 levels is compositing noise, not motion.
        d = ImageChops.difference(Image.open(io.BytesIO(a)).convert("RGB"), Image.open(io.BytesIO(b)).convert("RGB"))
        return max(e[1] for e in d.getextrema())

    ANIMATIONS = "[...document.querySelectorAll('[data-bg-layer]')].map(e => getComputedStyle(e).animationName).join('|')"

    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    external = []
    page.on("request", lambda r: external.append(r.url) if not r.url.startswith((ORIGIN, "data:", "blob:")) else None)
    page.add_init_script(
        """window.__cls = 0; window.__lcp = 0;
        new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({type: 'layout-shift', buffered: true});
        new PerformanceObserver(l => { const e = l.getEntries(); window.__lcp = e[e.length - 1].startTime; }).observe({type: 'largest-contentful-paint', buffered: true});"""
    )
    page.goto(URL)
    settle(page)
    page.wait_for_selector("#gradientCanvas", timeout=15000)
    page.wait_for_timeout(1500)
    check("background: live ShaderGradient canvas over CSS fallback", page.locator("#gradientCanvas").count() == 1 and page.locator("[data-bg-layer]").count() == 2 and page.get_attribute("[data-bg]", "data-sg-ready") == "true")
    # The loop is slow and dark by design, so compare a large area over 5 seconds.
    a = page.screenshot(clip={"x": 0, "y": 80, "width": 1440, "height": 720})
    page.wait_for_timeout(5000)
    b = page.screenshot(clip={"x": 0, "y": 80, "width": 1440, "height": 720})
    check("background: shader animates (slow, frames differ over 5s)", max_diff(a, b) > 2, f"max channel diff {max_diff(a, b)}")
    check("background: no pause control", page.locator("[data-bg-toggle]").count() == 0)
    # Service toggle: click and keyboard.
    tabs = page.locator("#top [role=tab]")
    tabs.nth(1).click()
    page.wait_for_timeout(200)
    agency = [tabs.nth(1).get_attribute("aria-selected"), page.locator("#top [role=tabpanel]:not([hidden]) a.btn-primary").inner_text(), page.locator("#top [role=tabpanel]:not([hidden]) input").count()]
    check("toggle: agencies tab shows a standalone brief button, no URL field", agency == ["true", "Send a project brief", 0], str(agency))
    page.screenshot(path=str(SHOTS / "desktop-1440-toggle-agencies.png"), clip={"x": 0, "y": 360, "width": 760, "height": 300})
    page.keyboard.press("ArrowLeft")
    page.wait_for_timeout(200)
    back = [tabs.nth(0).get_attribute("aria-selected"), page.evaluate("document.activeElement.textContent.trim()"), page.locator("#top [role=tabpanel]:not([hidden]) button[type=submit]").inner_text()]
    check("toggle: arrow keys move between tabs", back == ["true", "For local businesses", "Get my free preview"], str(back))
    page.fill("#top [role=tabpanel]:not([hidden]) input", "smithsplumbing.com.au")
    page.click("#top [role=tabpanel]:not([hidden]) button[type=submit]")
    page.wait_for_timeout(600)
    carried = page.evaluate("[new URL(location.href).searchParams.get('website'), location.hash]")
    check("toggle: business URL carried to next step (?website=)", carried == ["smithsplumbing.com.au", "#steps"], str(carried))
    pre = page.input_value("[data-steps-website]")
    check("toggle: preview form picks up the hero website", pre == "smithsplumbing.com.au", pre)
    page.goto(URL)
    settle(page)
    cards = page.evaluate("[...document.querySelectorAll('[data-card]')].map(c => { const r = c.getBoundingClientRect(); return [c.textContent.trim(), Math.round(r.left), Math.round(r.top)]; })")
    staggered = len(cards) == 3 and [c[0] for c in cards] == ["Design", "Market", "Conversion"] and cards[1][1] > cards[2][1] > cards[0][1] and cards[0][2] < cards[1][2] < cards[2][2]
    check("hero: three cards staggered like Graham's outline", staggered, str(cards))
    check("network: no requests to other domains", not external, ", ".join(external[:5]))
    cls = page.evaluate("window.__cls")
    lcp = page.evaluate("window.__lcp")
    check("layout: cumulative layout shift < 0.1", cls < 0.1, f"CLS {cls:.4f}, LCP {lcp:.0f} ms (local server)")
    hl = page.evaluate("(() => { const h = document.querySelector('h1 [class*=highlight]'); const cs = getComputedStyle(h); return [h.textContent, cs.backgroundImage.slice(0, 30), cs.webkitBackgroundClip || cs.backgroundClip]; })()")
    check("headline: gradient on 'stand out' only", hl[0] == "stand out" and "gradient" in hl[1] and hl[2] == "text", str(hl))
    check("headline: no underline arc", page.locator("h1 svg").count() == 0)
    text = page.evaluate("document.body.innerText")
    banned = ["Open", "Sample", "Not connected", "Placeholder", "placeholder", "to be confirmed", "Generated image", "for illustration", "Not the live site", "Needed before", "Graham"]
    found = [w for w in banned if w in text.split() or w in text]
    check("ui: no helper, dev-note or approval text visible", not found, ", ".join(found))
    figures = page.evaluate("[...document.querySelectorAll('[data-stat-value]')].map(e => e.textContent)")
    check("band: three hooks shown", figures == ["See it first", "Pay your way", "Priced up front"], str(figures))
    logos = page.evaluate("[...document.querySelectorAll('[data-trust-logo]')].map(i => [i.closest('li').textContent.trim(), i.complete && i.naturalWidth > 0, getComputedStyle(i.parentElement).backgroundColor])")
    check("trust: Google and Trustindex icons on white circles", [l[0] for l in logos] == ["Google Reviews", "Trustindex"] and all(l[1] and l[2] == "rgb(255, 255, 255)" for l in logos), str(logos))
    check("trust: no star ratings or review counts", "★" not in text and "reviews)" not in text)
    social = page.evaluate("[...document.querySelectorAll('[aria-label=\"Webleta on social media\"] svg path')].length")
    check("hero: four social icons", social == 4, str(social))
    page.mouse.wheel(0, 400)
    page.wait_for_timeout(800)
    hdr = page.evaluate("(() => { const cs = getComputedStyle(document.querySelector('header')); return [cs.borderBottomWidth, cs.borderBottomStyle, cs.backdropFilter, document.querySelector('header').dataset.scrolled]; })()")
    check("header: no bottom border when scrolled", hdr[3] == "true" and (hdr[0] == "0px" or hdr[1] == "none"), str(hdr))
    check("header: frosted blur kept", "blur" in (hdr[2] or ""), hdr[2])
    page.screenshot(path=str(SHOTS / "desktop-1440-header-scrolled.png"), clip={"x": 0, "y": 0, "width": 1440, "height": 200})
    page.evaluate("window.scrollTo(0, 0)")
    page.hover(".btn-primary >> nth=0")
    page.wait_for_timeout(300)
    page.screenshot(path=str(SHOTS / "desktop-1440-button-hover.png"), clip={"x": 0, "y": 420, "width": 720, "height": 220})
    ctx.close()

    # Reduced motion: everything visible immediately, no transforms applied.
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
    page = ctx.new_page()
    page.goto(URL)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(300)
    hidden = page.evaluate("[...document.querySelectorAll('[data-intro]')].filter(e => getComputedStyle(e).visibility === 'hidden' || getComputedStyle(e).opacity === '0').length")
    check("reduced motion: intro content visible at once", hidden == 0, f"{hidden} hidden")
    check("reduced motion: no motion class", not page.evaluate("document.documentElement.classList.contains('motion')"))
    anims = page.evaluate(ANIMATIONS)
    check("reduced motion: CSS layers still", all(n == "none" for n in anims.split("|")), anims)
    page.wait_for_selector("#gradientCanvas", timeout=15000)
    page.wait_for_timeout(1500)
    a = bg_clip(page)
    page.wait_for_timeout(1200)
    b = bg_clip(page)
    check("reduced motion: shader shown as a still frame", max_diff(a, b) <= 3, f"max diff {max_diff(a, b)}")
    page.screenshot(path=str(SHOTS / "desktop-1440-reduced-motion.png"))
    ctx.close()

    # Motion: intro elements end fully visible.
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.goto(URL)
    settle(page)
    hidden = page.evaluate("[...document.querySelectorAll('[data-intro]')].filter(e => getComputedStyle(e).visibility === 'hidden' || parseFloat(getComputedStyle(e).opacity) < 0.99).length")
    check("motion: all intro content visible after sequence", hidden == 0, f"{hidden} hidden")
    page.mouse.wheel(0, 500)
    page.wait_for_timeout(1200)
    page.screenshot(path=str(SHOTS / "desktop-1440-scrolled-500.png"))
    glass = page.evaluate("document.querySelector('header').dataset.scrolled")
    check("header: glass state after scrolling", glass == "true")
    ctx.close()

    # About section (Revision 31).
    for w, h in [(1440, 900), (390, 844)]:
        ctx = browser.new_context(viewport={"width": w, "height": h})
        page = ctx.new_page()
        page.goto(URL)
        settle(page)
        check(f"about {w}: one section with h2 statement", page.locator("#about[data-about] h2#about-title").count() == 1)
        page.evaluate("document.querySelector('#about').scrollIntoView()")
        page.wait_for_timeout(600)
        loaded = page.evaluate("""new Promise(r => { const i = new Image(); i.onload = () => r(i.naturalWidth > 0); i.onerror = () => r(false); i.src = document.querySelector('[data-about-figure] image').getAttribute('href'); })""")
        check(f"about {w}: arc-crop photo loads", loaded)
        page.evaluate("window.scrollBy(0, document.querySelector('#about').offsetHeight * 0.6)")
        page.wait_for_timeout(600)
        light = page.evaluate("[...document.querySelectorAll('[data-about-word]')].filter(e => getComputedStyle(e).color !== 'rgb(7, 34, 59)').length")
        check(f"about {w}: statement fully filled once scrolled past", light == 0, f"{light} words not Deep Water")
        check(f"about {w}: no horizontal overflow", not page.evaluate("document.documentElement.scrollWidth > innerWidth"))
        ctx.close()
    # Header logo hover (Revision 34): halves close into a circle, spark turns Aqua.
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.goto(URL)
    settle(page)
    LOGO = "[...document.querySelectorAll('header a[href=\"#top\"] svg g path')].map(e => getComputedStyle(e).transform + '|' + getComputedStyle(e).fill)"
    rest = page.evaluate(LOGO)
    check("logo at rest: Logo Kit offsets, all white", rest == ["matrix(1, 0, 0, 1, -8, 8)|rgb(255, 255, 255)", "matrix(1, 0, 0, 1, 12, -26)|rgb(255, 255, 255)"], str(rest))
    page.hover("header a[href='#top']")
    page.wait_for_timeout(900)
    hov = page.evaluate(LOGO)
    check("logo on hover: closed circle, Aqua spark", hov == ["matrix(1, 0, 0, 1, 0, 0)|rgb(255, 255, 255)", "matrix(1, 0, 0, 1, 0, 0)|rgb(60, 207, 195)"], str(hov))
    ctx.close()

    # Nav link hover (Revision 35): letter roll + spark, accessible name intact.
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.goto(URL)
    settle(page)
    names = page.evaluate("[...document.querySelectorAll('[data-nav-link]')].map(a => a.getAttribute('aria-label'))")
    check("nav: links keep their names", names == ["Services", "Work", "Reviews", "Pricing", "Contact"], str(names))
    page.hover("[data-nav-link][href='#work']")
    page.wait_for_timeout(1000)
    st = page.evaluate("(() => { const a = document.querySelector('[data-nav-link][href=\"#work\"]'); const last = [...a.querySelectorAll('[aria-hidden] > span')].pop(); return [getComputedStyle(last).transform !== 'none', getComputedStyle(a.querySelector('svg')).opacity]; })()")
    check("nav hover: letters rolled, spark shown", st[0] and st[1] == "1", str(st))
    ctx.close()

    # Header over light sections (Revision 33): near-solid Deep Water, not slate glass.
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.goto(URL)
    settle(page)
    page.evaluate("window.scrollTo(0, 400)")
    page.wait_for_timeout(500)
    check("header over hero: glass", page.get_attribute("header", "data-over") == "dark")
    for sid in ["about", "benefits"]:
        page.evaluate(f"window.scrollTo(0, document.querySelector('#{sid}').offsetTop + 200)")
        page.wait_for_timeout(600)
        bg = page.evaluate("getComputedStyle(document.querySelector('header')).backgroundColor")
        check(f"header over {sid}: dark solid bar", page.get_attribute("header", "data-over") == "light" and bg == "rgba(7, 34, 59, 0.96)", bg)
    page.evaluate("window.scrollTo(0, document.querySelector('#cta').offsetTop + 20)")
    page.wait_for_timeout(500)
    check("header over a dark section: back to glass", page.get_attribute("header", "data-over") == "dark")
    ctx.close()

    # Benefits section (Revision 32).
    for w, h in [(1440, 900), (390, 844)]:
        ctx = browser.new_context(viewport={"width": w, "height": h})
        page = ctx.new_page()
        page.goto(URL)
        settle(page)
        check(f"benefits {w}: six cards with h3 titles", page.locator("#benefits[data-benefits] [data-benefit] h3").count() == 6)
        page.evaluate("document.querySelector('#benefits').scrollIntoView()")
        page.wait_for_timeout(500)
        faded = page.evaluate("[...document.querySelectorAll('#benefits [data-pop]')].filter(e => parseFloat(getComputedStyle(e).opacity) < 0.99).length")
        check(f"benefits {w}: UI cards visible", faded == 0, f"{faded} faded")
        TRACK = "(() => { const t = document.querySelector('[data-benefits-track]'); return [Math.round(t.scrollLeft), document.querySelector('[data-benefits-prev]').disabled, document.querySelector('[data-benefits-next]').disabled]; })()"
        start = page.evaluate(TRACK)
        check(f"benefits {w}: carousel starts at the first card, Previous disabled", start[0] == 0 and start[1] and not start[2], str(start))
        page.click("[data-benefits-next]")
        page.wait_for_timeout(900)
        one = page.evaluate(TRACK)
        step = page.evaluate("(() => { const t = document.querySelector('[data-benefits-track]'); return t.querySelector('li').offsetWidth + parseFloat(getComputedStyle(t).columnGap); })()")
        check(f"benefits {w}: Next moves exactly one card", abs(one[0] - step) <= 2 and not one[1], f"{one} step {step}")
        for _ in range(6):
            page.click("[data-benefits-next]", force=True)
            page.wait_for_timeout(500)
        end = page.evaluate(TRACK)
        check(f"benefits {w}: Next disabled at the last card", end[2], str(end))
        ok = page.evaluate("(() => { const i = document.querySelector('[data-benefit=sales] img'); return i.complete && i.naturalWidth > 0; })()")
        check(f"benefits {w}: potter photo loads", ok)
        check(f"benefits {w}: no horizontal overflow", not page.evaluate("document.documentElement.scrollWidth > innerWidth"))
        ctx.close()

    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
    page = ctx.new_page()
    page.goto(URL)
    page.evaluate("document.querySelector('#about').scrollIntoView()")
    page.wait_for_timeout(400)
    anim = page.evaluate("[...document.querySelectorAll('[data-about-word], [data-about-spark]')].filter(e => getComputedStyle(e).animationName !== 'none').length")
    check("about reduced motion: no scroll animation, text in final colour", anim == 0, f"{anim} animated")
    ctx.close()

    # Revision 37: the sections after Benefits.
    NEW = ["services", "cta", "steps", "work", "reviews", "clients", "pricing", "contact"]
    for w in (1440, 390):
        ctx = browser.new_context(viewport={"width": w, "height": 900})
        page = ctx.new_page()
        page.goto(URL + "?website=smithsplumbing.com.au#contact")
        page.wait_for_timeout(1200)
        info = page.evaluate("""ids => ids.map(id => { const s = document.getElementById(id); return [id, !!s && !!s.dataset.ground && !!s.querySelector('h2')]; })""", NEW)
        check(f"sections {w}: all eight built with a heading and data-ground", all(ok for _, ok in info), str([i for i, ok in info if not ok]))
        check(f"sections {w}: no placeholder sections left", page.locator("[data-tone]").count() == 0)
        broken = page.evaluate("""Promise.all([...document.querySelectorAll('#services img, #cta img, #steps img, #work img')].map(i => new Promise(r => {
            const t = new Image(); t.onload = () => r(null); t.onerror = () => r(i.getAttribute('src')); t.src = i.currentSrc || i.src; })))""")
        broken = [b for b in broken if b]
        check(f"sections {w}: all new images load", not broken, ", ".join(broken))
        check(f"contact {w}: website field picks up ?website= from the hero", page.input_value("[data-contact-website]") == "smithsplumbing.com.au")
        check(f"sections {w}: no horizontal overflow", not page.evaluate("document.documentElement.scrollWidth > innerWidth"))
        ctx.close()

    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.goto(URL)
    page.wait_for_timeout(800)
    page.click("[data-pricing-tab=agency]")
    page.wait_for_timeout(200)
    plans = page.evaluate("[...document.querySelectorAll('#pricing [role=tabpanel]:not([hidden]) [data-plan]')].map(e => e.dataset.plan)")
    check("pricing: agencies tab shows the three agency plans", plans == ["overflow", "projects", "dedicated"], str(plans))
    page.focus("[data-pricing-tab=agency]")
    page.keyboard.press("ArrowLeft")
    sel = page.get_attribute("[data-pricing-tab=business]", "aria-selected")
    check("pricing: arrow keys switch audience", sel == "true")
    featured = page.locator("#pricing [role=tabpanel]:not([hidden]) a.btn-primary").count()
    check("pricing: one Ember button per audience (featured plan)", featured == 1, str(featured))
    rng = page.locator("[data-steps-range]")
    rng.focus()
    for _ in range(5):
        page.keyboard.press("ArrowRight")
    val = rng.input_value()
    check("steps: compare slider moves with the keyboard", val == "25", val)
    pays = page.locator("[data-steps-list] > li").count()
    check("steps: three steps, each saying what you pay", pays == 3, str(pays))
    form = page.locator("[data-steps-form]")
    form.locator("[data-steps-website]").fill("")
    form.locator("[data-steps-next]").click()
    blocked = [form.get_attribute("data-step"), form.locator("[role=alert]").inner_text().strip() != ""]
    form.locator("[data-steps-website]").fill("tidewellphysio.com.au")
    form.locator("[data-steps-next]").click()
    page.wait_for_timeout(150)
    s2 = [form.get_attribute("data-step"), form.locator("input[type=radio]").count()]
    form.locator("input[value=bookings]").check(force=True)
    form.locator("[data-steps-next]").click()
    page.wait_for_timeout(150)
    s3 = [form.get_attribute("data-step"), form.locator("input[name=name]").count(), form.locator("input[name=email]").count()]
    check("steps: request is three steps with validation (website, goal, name and email)",
          blocked == ["0", True] and s2 == ["1", 4] and s3 == ["2", 1, 1], f"{blocked} {s2} {s3}")
    page.evaluate("document.querySelector('[data-contact-form] button[type=submit]').click()")
    invalid = page.evaluate("document.querySelectorAll('[data-contact-form] :invalid').length")
    check("contact: empty form is blocked by validation", invalid >= 2, str(invalid))
    # Services (Revision 40): colour bento after Graham's reference, Notion's seven services.
    ids = page.evaluate("[...document.querySelectorAll('#services [data-service]')].map(e => e.dataset.service)")
    check("services: Notion's seven services, in bento order", ids == ["websites", "apps", "seo", "email", "social", "content", "mobile"], str(ids))
    page.locator("#services").scroll_into_view_if_needed()
    page.wait_for_timeout(700)
    fit = page.evaluate("""[...document.querySelectorAll('#services [class*=stage]')].map(st => {
        const v = st.closest('[class*=box]').getBoundingClientRect(), r = st.getBoundingClientRect();
        return r.left <= v.left + 1 && r.top <= v.top + 1 && r.right >= v.right - 1 && r.bottom >= v.bottom - 1; })""")
    check("services: device photos cover their tiles (no letterboxing)", len(fit) == 2 and all(fit), str(fit))
    duo = page.evaluate("[...document.querySelectorAll('#services img')].filter(i => !i.closest('[class*=screen]') && !/true/.test(i.className)).map(i => getComputedStyle(i).mixBlendMode)")
    check("services: every tile photo is duotone (luminosity blend)", len(duo) == 6 and set(duo) == {"luminosity"}, str(duo))
    corners = page.evaluate("[...document.querySelectorAll('#services [data-service] > svg[class*=corner]')].length")
    check("services: every tile carries the 24° Split Arc corner cut", corners == 7, str(corners))
    page.hover("[data-service=seo]")
    page.wait_for_timeout(900)
    reveal = page.evaluate("getComputedStyle(document.querySelector('[data-service=seo] img[class*=true]')).opacity")
    check("services: hover brings back the photo's real colour", reveal == "1", reveal)
    hero = page.evaluate("[...document.querySelectorAll('[data-service=websites] [aria-label^=\"Works with\"] li')].map(l => l.title)")
    check("services: hero shows the flexible stack (WordPress, Next.js, Astro, React)", hero == ["WordPress", "Next.js", "Astro", "React"], str(hero))
    concept = page.locator("#work [data-project]").count()
    labels = page.evaluate("[...document.querySelectorAll('#work [data-project]')].every(e => e.textContent.includes('Concept'))")
    check("work: four projects, each labelled as a concept", concept == 4 and labels)
    ctx.close()

    # No JavaScript: content still visible (failsafe).
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, java_script_enabled=False)
    page = ctx.new_page()
    page.goto(URL)
    page.wait_for_timeout(500)
    h1 = page.locator("h1").is_visible()
    check("no-JS: hero visible", h1)
    ctx.close()

    browser.close()

(ROOT / "qa" / "qa-results.json").write_text(json.dumps(results, indent=2))
passed = sum(r["pass"] for r in results)
print(f"\n{passed}/{len(results)} passed")
sys.exit(0 if passed == len(results) else 1)
