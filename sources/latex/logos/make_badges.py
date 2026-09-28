"""
Generate consistent, print-friendly monogram badges for the resume.

Why monograms instead of scraped brand art:
  * consistent geometry/size across every entry (looks intentional on a 1-page CV)
  * no trademark-art quality/version drift
  * trivially reproducible on any machine with Pillow

Output (512x512 PNG, transparent background):
  <slug>-color.png   brand colour
  <slug>-gray.png    neutral grey (for the black & white PDF)

Run:  python logos/make_badges.py
"""
from __future__ import annotations

import os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
SIZE = 512
RADIUS = 118

# slug -> (initial, brand colour)
BADGES = {
    "njupt":        ("N", "#0B4F9E"),   # 南京邮电大学
    "didi":         ("D", "#FF7F41"),   # 滴滴
    "casdoor":      ("C", "#D22128"),   # Apache Casdoor
    "xiaohongshu":  ("R", "#FF2442"),   # 小红书 FireRed
    "goldmind":     ("G", "#A67C00"),   # GoldMind
}

FONT_CANDIDATES = [
    r"C:\Windows\Fonts\segoeuib.ttf",
    r"C:\Windows\Fonts\arialbd.ttf",
]


def load_font(px: int) -> ImageFont.FreeTypeFont:
    for path in FONT_CANDIDATES:
        if os.path.exists(path):
            return ImageFont.truetype(path, px)
    return ImageFont.load_default()


def hex_to_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def to_gray(hex_color: str) -> str:
    r, g, b = hex_to_rgb(hex_color)
    y = round(0.2126 * r + 0.7152 * g + 0.0722 * b)
    # keep enough contrast on white paper
    y = max(60, min(y, 120))
    return f"#{y:02X}{y:02X}{y:02X}"


def draw_badge(letter: str, color: str) -> Image.Image:
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, SIZE - 1, SIZE - 1], radius=RADIUS, fill=color)

    font = load_font(384)
    # anchor "mm" centres on the glyph box; nudge down for optical centring
    d.text((SIZE / 2, SIZE / 2 + 10), letter, font=font, fill="white", anchor="mm")
    return img


def main() -> None:
    for slug, (letter, color) in BADGES.items():
        for variant, fill in (("color", color), ("gray", to_gray(color))):
            out = os.path.join(HERE, f"{slug}-{variant}.png")
            draw_badge(letter, fill).save(out)
            print(f"wrote {out}")


if __name__ == "__main__":
    main()
