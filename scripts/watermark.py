"""Add a subtle 'Plaas Gedrag' watermark to product photos (and downscale
oversized ones for the web). Output format follows the destination extension."""
import sys
from PIL import Image, ImageDraw, ImageFont

TEXT = "Plaas Gedrag"
FONT_PATH = r"C:\Windows\Fonts\georgiai.ttf"  # Georgia italic, elegant
MAX_W = 1400


def watermark(src, dst):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    if w > MAX_W:
        h = round(h * MAX_W / w)
        w = MAX_W
        im = im.resize((w, h), Image.LANCZOS)

    overlay = Image.new("RGBA", im.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    size = max(20, round(w * 0.045))
    font = ImageFont.truetype(FONT_PATH, size)

    bbox = draw.textbbox((0, 0), TEXT, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    pad = round(w * 0.035)
    x = w - tw - pad - bbox[0]
    y = h - th - pad - bbox[1]

    # soft shadow for legibility on any background, then the bone wordmark
    draw.text((x + 2, y + 2), TEXT, font=font, fill=(0, 0, 0, 120))
    draw.text((x, y), TEXT, font=font, fill=(242, 233, 216, 150))

    out = Image.alpha_composite(im.convert("RGBA"), overlay).convert("RGB")

    ext = dst.lower().rsplit(".", 1)[-1]
    if ext in ("jpg", "jpeg"):
        out.save(dst, quality=88)
    elif ext == "webp":
        out.save(dst, quality=88, method=6)
    else:
        out.save(dst)
    print(f"{dst}: {w}x{h}")


if __name__ == "__main__":
    watermark(sys.argv[1], sys.argv[2])
