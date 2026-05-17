#!/usr/bin/env python3
"""Add chart-safe.js and use createSafeChart for Chart.js pages."""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAFE_TAG = '  <script src="shared/chart-safe.js"></script>\n'
CHART_PIN = "chart.js@3.9.1/dist/chart.min.js"

for name in os.listdir(ROOT):
    if not name.endswith(".html") or name == "index.html":
        continue
    path = os.path.join(ROOT, name)
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    if CHART_PIN not in text and "chart.js" not in text:
        continue
    if "new Chart(" not in text:
        continue
    orig = text
    if "chart-safe.js" not in text:
        text = text.replace(
            f'<script src="https://cdn.jsdelivr.net/npm/{CHART_PIN}"></script>',
            f'<script src="https://cdn.jsdelivr.net/npm/{CHART_PIN}"></script>\n{SAFE_TAG}',
        )
    text = text.replace("new Chart(", "createSafeChart(")
    # Guard common chart.update() when variable might be null
    for var in re.findall(r"(?:let|var)\s+(\w+)\s*=\s*createSafeChart", text):
        text = re.sub(
            rf"(\s+){var}\.update\(",
            rf"\1if ({var}) {var}.update(",
            text,
        )
    if text != orig:
        with open(path, "w", encoding="utf-8") as f:
            f.write(text)
        print("fixed:", name)

print("done")
