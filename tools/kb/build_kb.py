#!/usr/bin/env python3
"""Prepare the help pages for the chatbot knowledge base (Amazon Bedrock).

Copies every markdown page from docs/ into an output folder and writes a
<page>.md.metadata.json sidecar next to it. The sidecar carries the public URL
of the page (so the chatbot can link to it), the edition (v3, ce, shared) and
the page title. The output folder is then synced 1:1 into the KB bucket.

Usage: python3 tools/kb/build_kb.py [--docs docs] [--out build/kb] [--base-url URL]
"""

import argparse
import json
import shutil
import sys
from pathlib import Path

DEFAULT_BASE_URL = "https://help.trustsource.io"
EDITIONS = {"v3", "ce", "shared"}


def page_url(base_url, rel):
    """URL of a page as the site builder publishes it (directory URLs)."""
    parts = list(rel.with_suffix("").parts)
    if parts[-1] == "index":
        parts = parts[:-1]
    path = "/".join(parts)
    return f"{base_url.rstrip('/')}/{path}/" if path else f"{base_url.rstrip('/')}/"


def page_title(text, fallback):
    for line in text.splitlines():
        if line.startswith("# "):
            return line[2:].strip().replace("*", "")
    return fallback


def build(docs, out, base_url):
    if out.exists():
        shutil.rmtree(out)
    count = 0
    for src in sorted(docs.rglob("*.md")):
        rel = src.relative_to(docs)
        if rel.parts[0] == "assets":
            continue
        text = src.read_text(encoding="utf-8")
        edition = rel.parts[0] if rel.parts[0] in EDITIONS else "shared"
        dest = out / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(text, encoding="utf-8")
        meta = {
            "metadataAttributes": {
                "url": page_url(base_url, rel),
                "edition": edition,
                "title": page_title(text, rel.stem),
                "source": "ts-docs",
            }
        }
        (out / f"{rel}.metadata.json").write_text(json.dumps(meta, ensure_ascii=False), encoding="utf-8")
        count += 1
    return count


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--docs", default="docs", type=Path)
    parser.add_argument("--out", default="build/kb", type=Path)
    parser.add_argument("--base-url", default=DEFAULT_BASE_URL)
    args = parser.parse_args()
    if not args.docs.is_dir():
        sys.exit(f"docs folder not found: {args.docs}")
    count = build(args.docs, args.out, args.base_url)
    if count == 0:
        sys.exit("no markdown pages found - refusing to produce an empty KB folder")
    print(f"{count} pages written to {args.out}")


if __name__ == "__main__":
    main()
