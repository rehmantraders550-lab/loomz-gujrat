"""Validate the built LOOMZ static catalogue before and after Git integration."""

from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote
import json
import re
import sys

from PIL import Image


ROOT = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("dist")
ROOT = ROOT.resolve()


class Page(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: list[str] = []
        self.refs: list[str] = []
        self.titles = 0
        self.mains = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if values.get("id"):
            self.ids.append(values["id"] or "")
        self.titles += tag == "title"
        self.mains += tag == "main"
        for key in ("href", "src"):
            ref = values.get(key) or ""
            if ref and not ref.startswith(("#", "http:", "https:", "mailto:", "tel:", "data:")):
                self.refs.append(unquote(ref.split("?")[0].split("#")[0]))


pages = sorted(ROOT.rglob("*.html"))
assert len(pages) == 27, f"Expected 27 pages, found {len(pages)}"
assert (ROOT / "index.html") in pages

local_refs = 0
for path in pages:
    text = path.read_text(encoding="utf-8")
    page = Page()
    page.feed(text)
    assert page.titles == 1 and page.mains == 1, f"Missing document structure: {path}"
    assert len(page.ids) == len(set(page.ids)), f"Duplicate IDs: {path}"
    assert "Powered by ORVIA" in text, f"Missing footer attribution: {path}"
    for ref in page.refs:
        target = ROOT / ref.lstrip("/") if ref.startswith("/") else path.parent / ref
        assert target.is_file(), f"Broken reference in {path}: {ref}"
        local_refs += 1

records = json.loads((ROOT / "catalogue.json").read_text(encoding="utf-8"))
assert len(records) == 20 and len({item["id"] for item in records}) == 20
assert all(isinstance(item["price_pkr"], int) and item["price_pkr"] > 0 for item in records)

for collection in ("daily", "occasion"):
    text = (ROOT / f"{collection}.html").read_text(encoding="utf-8")
    assert text.count('class="product-card"') == 10, f"Card count: {collection}"
    assert sum(item["catalogue"] == collection for item in records) == 10

home = (ROOT / "index.html").read_text(encoding="utf-8")
chapters = re.findall(
    r"(?:The idea|The edits|Selected cloth|Cloth &amp; tailoring|The route|Cloth guide|Inquiry) / (\d\d)",
    home,
)
assert chapters == [f"{n:02d}" for n in range(1, 8)], chapters

total_image_bytes = 0
for item in records:
    image_path = ROOT / item["image"]
    assert image_path.suffix == ".webp" and image_path.is_file(), item["id"]
    with Image.open(image_path) as image:
        image.verify()
    with Image.open(image_path) as image:
        assert image.size == (1254, 1254), (item["id"], image.size)
    total_image_bytes += image_path.stat().st_size

assert total_image_bytes < 15_000_000, f"Images too heavy: {total_image_bytes} bytes"
print(f"PASS: {len(pages)} pages, {len(records)} products, {local_refs} references, "
      f"20 decodable images ({total_image_bytes:,} bytes)")
