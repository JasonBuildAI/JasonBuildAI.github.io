"""
Build the Xiaohongshu (FireRedTeam) badge used by the resume.

The official Xiaohongshu wordmark (simple-icons SVG) is rasterised to a
transparent PNG with Edge headless (see _xhs_mark.html), then composited onto
the same rounded-square plate as every other badge so the resume stays
visually consistent.

Output:
  xiaohongshu-color.png   #FF2442 plate, white wordmark
  xiaohongshu-gray.png    neutral grey plate, white wordmark (black & white PDF)

Run:
  python logos/make_xhs_badge.py
"""
from __future__ import annotations

import os

from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
SIZE = 512
RADIUS = 118

COLOR = "#FF2442"
MARK = os.path.join(HERE, "_xhs_mark.png")


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

    mark = Image.open(MARK).convert("RGBA")
    bbox = mark.getbbox()
    if bbox:
        mark = mark.crop(bbox)
    target_w = int(SIZE * 0.76)
    ratio = target_w / mark.width
    mark = mark.resize(
        (target_w, max(1, round(mark.height * ratio))), Image.LANCZOS
    )
    plate.alpha_composite(
        mark,
        ((SIZE - mark.width) // 2, (SIZE - mark.height) // 2),
    )
    return plate


def main() -> None:
    if not os.path.exists(MARK):
        raise SystemExit(
            f"missing {MARK}; render _xhs_mark.html with Edge headless first"
        )
    build(COLOR).save(os.path.join(HERE, "xiaohongshu-color.png"))
    build(to_gray(COLOR)).save(os.path.join(HERE, "xiaohongshu-gray.png"))
    print("wrote xiaohongshu-color.png / xiaohongshu-gray.png")


if __name__ == "__main__":
    main()