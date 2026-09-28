"""
Build the Apache feather badge used by the resume.

The official Apache feather (simple-icons SVG) is rasterised to a transparent
PNG with Edge headless (see _apache_feather.html), then composited onto the
same rounded-square plate as every other badge so the resume stays visually
consistent.

Output:
  apache-color.png   #D22128 plate, white feather
  apache-gray.png    neutral grey plate, white feather (black & white PDF)

Run:
  python logos/make_apache_badge.py
"""
from __future__ import annotations

import os

from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
SIZE = 512
RADIUS = 118

COLOR = "#D22128"
GRAY = "#474747"

FEATHER = os.path.join(HERE, "_apache_feather_hi.png")


def to_gray(hex_color: str) -> str:
    value = hex_color.lstrip("#")
    r, g, b = (int(value[i:i + 2], 16) for i in (0, 2, 4))
    y = round(0.2126 * r + 0.7152 * g + 0.0722 * b)
    y = max(60, min(y, 120))
    return f"#{y:02X}{y:02X}{y:02X}"


def build(fill: str) -> Image.Image:
    plate = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    ImageDraw.Draw(plate).rounded_rectangle(
        [0, 0, SIZE - 1, SIZE - 1], radius=RADIUS, fill=fill
    )

    feather = Image.open(FEATHER).convert("RGBA")
    # trim transparent padding, then scale to ~84% of the plate and centre it
    bbox = feather.getbbox()
    if bbox:
        feather = feather.crop(bbox)
    target = int(SIZE * 0.84)
    ratio = min(target / feather.width, target / feather.height)
    feather = feather.resize(
        (max(1, round(feather.width * ratio)), max(1, round(feather.height * ratio))),
        Image.LANCZOS,
    )
    plate.alpha_composite(
        feather,
        ((SIZE - feather.width) // 2, (SIZE - feather.height) // 2),
    )
    return plate


def main() -> None:
    if not os.path.exists(FEATHER):
        raise SystemExit(
            f"missing {FEATHER}; render _apache_feather.html with Edge headless first"
        )
    build(COLOR).save(os.path.join(HERE, "apache-color.png"))
    build(to_gray(COLOR)).save(os.path.join(HERE, "apache-gray.png"))
    print("wrote apache-color.png / apache-gray.png")


if __name__ == "__main__":
    main()
