#!/usr/bin/env python3
"""Inject shared theme.css and app.js into all HTML pages except index.html."""
import re
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS_LINK = '  <link rel="stylesheet" href="shared/theme.css">\n'
SCRIPT_HEAD = '  <script src="shared/app.js"></script>\n'
SCRIPT_TAG = SCRIPT_HEAD

def page_id(filename):
    return os.path.splitext(filename)[0]

def inject(content, pid):
    if "shared/theme.css" in content:
        return content, False

    # CSS after charset or viewport
    if '<meta charset' in content:
        content = re.sub(
            r'(<meta charset[^>]*>\s*)',
            r'\1' + CSS_LINK,
            content,
            count=1,
            flags=re.I,
        )
    elif "<head>" in content:
        content = content.replace("<head>", "<head>\n" + CSS_LINK, 1)

    # Script in head (sesler sayfa scriptlerinden önce yüklensin)
    if "shared/app.js" not in content:
        if "</head>" in content:
            content = content.replace("</head>", SCRIPT_TAG + "</head>", 1)
        elif "</body>" in content:
            content = content.replace("</body>", SCRIPT_TAG + "</body>", 1)
    else:
        content = content.replace(
            '<script src="shared/app.js" defer></script>',
            '<script src="shared/app.js"></script>',
        )
        content = re.sub(
            r'\s*<script src="shared/app\.js"></script>\s*</body>',
            '</body>',
            content,
        )
        if content.count('shared/app.js') == 0 or '</head>' in content:
            pass
        elif '</head>' in content and SCRIPT_TAG.strip() not in content.split('</head>')[0]:
            content = content.replace('</head>', SCRIPT_TAG + '</head>', 1)

    # Body class and data-page
    def body_repl(m):
        tag = m.group(0)
        if "app-page" in tag:
            if "data-page=" not in tag:
                return tag[:-1] + f' data-page="{pid}">'
            return tag
        if tag.endswith(">"):
            inner = tag[1:-1].strip()
            if inner == "body":
                return f'<body class="app-page" data-page="{pid}">'
            return f'<body class="app-page" data-page="{pid}" {inner[4:].strip()}>'
        return tag

    content = re.sub(r"<body[^>]*>", body_repl, content, count=1, flags=re.I)

    # html class
    if "<html" in content and "app-root" not in content:
        content = re.sub(
            r"<html([^>]*)>",
            lambda m: f'<html class="app-root"{m.group(1)}>',
            content,
            count=1,
            flags=re.I,
        )

    return content, True

def main():
    n = 0
    for name in sorted(os.listdir(ROOT)):
        if not name.endswith(".html") or name == "index.html":
            continue
        path = os.path.join(ROOT, name)
        with open(path, "r", encoding="utf-8") as f:
            original = f.read()
        updated, changed = inject(original, page_id(name))
        if changed:
            with open(path, "w", encoding="utf-8") as f:
                f.write(updated)
            n += 1
            print("updated:", name)
    print(f"Done. {n} files updated.")

if __name__ == "__main__":
    main()
