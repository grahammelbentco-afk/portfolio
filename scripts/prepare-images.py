"""Make web-sized WebP copies of the hero card images.

Reads originals from Webleta-AI-Generated-Images (never writes there) and writes
derivatives to public/images/. Run: python -I scripts/prepare-images.py

Hero cards (Graham's Design / Market / Conversion): fal flux-pro v1.1-ultra, raw,
16:9, generated 2026-11-13 for the hero. See Webleta-AI-Generated-Images/
manifest-2026-11-13-hero-cards.csv. Web-copy fixes for generated screen text are
listed per card; the originals are untouched.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[3] / "Webleta-AI-Generated-Images" / "01-originals-from-fal" / "2026-11-13"
OUT = Path(__file__).resolve().parents[1] / "public" / "images"
OUT.mkdir(parents=True, exist_ok=True)

RATIO = 16 / 9
WIDTHS = [720, 1280]


def soften_screen(im, box, radius=7, feather=24):
    """Defocus a monitor's generated (garbled) UI text, like a shallow depth of field."""
    blurred = im.filter(ImageFilter.GaussianBlur(radius))
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).rectangle(box, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(feather))
    return Image.composite(blurred, im, mask)


def paint_out(im, box, threshold=62, feather=8):
    """Replace light (text) pixels in `box` with the screen's own background colour
    (the average of its dark pixels there), then smooth the patch so it leaves no edge."""
    im = im.copy()
    px = im.load()
    x0, y0, x1, y1 = box
    dark = [px[x, y] for y in range(y0, y1) for x in range(x0, x1) if sum(px[x, y]) / 3 <= threshold]
    fill = tuple(sum(c[i] for c in dark) // len(dark) for i in range(3))
    for y in range(y0, y1):
        for x in range(x0, x1):
            if sum(px[x, y]) / 3 > threshold:
                px[x, y] = fill
    smooth = im.filter(ImageFilter.GaussianBlur(6))
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).rectangle(box, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(feather))
    return Image.composite(smooth, im, mask)


CARDS = {
    # Design: a designer at a navy-walled studio desk, swatches in navy, seafoam and orange.
    "card-design": ("1955_hero-design-a.jpg", lambda im: soften_screen(im, (950, 195, 1850, 860))),
    # Market: a florist photographing her flowers for social media while a customer browses.
    "card-market": ("1955_hero-market-a.jpg", None),
    # Conversion: a thumb about to tap the orange button on a navy booking screen.
    "card-conversion": ("1955_hero-conversion-a.jpg", lambda im: paint_out(im, (1740, 365, 1920, 500))),
}

for name, (file, fix) in CARDS.items():
    src = Image.open(ROOT / file).convert("RGB")
    if fix:
        src = fix(src)
    W, H = src.size
    h = round(W / RATIO)
    y0 = (H - h) // 2
    src = src.crop((0, y0, W, y0 + h))
    for width in WIDTHS:
        im = src.resize((width, round(width / RATIO)), Image.LANCZOS)
        dest = OUT / f"{name}-{width}.webp"
        im.save(dest, "WEBP", quality=82, method=6)
        print(f"{dest.name}: {im.size[0]}x{im.size[1]}, {dest.stat().st_size // 1024} KB")
