#!/usr/bin/env python3
"""Builds demo/index.html (the Demo Day artifact page) from index.template.html:
injects the idea bank (ideas/idea-bank.json) and the jury verdict (demo/jury.html, if present)."""
import json
from pathlib import Path

here = Path(__file__).parent
bank = json.loads((here.parent / "ideas" / "idea-bank.json").read_text())
keep = ("id", "rank", "title", "track", "track_ru", "pitch", "pain_evidence", "gap", "authority", "data", "status", "total", "scores", "penalty")
ideas = [{k: i[k] for k in keep} for i in bank["ideas"]]
html = (here / "index.template.html").read_text()
html = html.replace("/*IDEAS_JSON*/[]", json.dumps(ideas, ensure_ascii=False, separators=(",", ":")))
html = html.replace("/*TRACKS_JSON*/{}", json.dumps(bank["tracks"], ensure_ascii=False))
jury = here / "jury.html"
html = html.replace("<!--JURY-->", jury.read_text() if jury.exists() else '<p class="muted">Вердикт появится после разбора критика.</p>')
(here / "index.html").write_text(html)
print(f"index.html: {len(html)//1024} KB, {len(ideas)} ideas, jury={'yes' if jury.exists() else 'no'}")
