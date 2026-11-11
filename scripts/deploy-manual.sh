#!/bin/sh
# Açelya — elle yayın (GitHub Actions kullanılamadığında)
#
# CI'daki denetimleri yerelde çalıştırır, siteyi Actions workflow'u ile aynı
# dışlamalarla paketler ve istenirse `gh-pages` dalına gönderir.
#
#   sh scripts/deploy-manual.sh            # yalnız denetim + paket (_site), gönderim yok
#   sh scripts/deploy-manual.sh --publish  # ayrıca gh-pages dalına zorla gönder
#
# Tek seferlik ayar: GitHub → Settings → Pages → Build and deployment →
# Source: "Deploy from a branch", Branch: gh-pages / (root).
# `.nojekyll` eklendiği için GitHub tarafında Jekyll derlemesi yapılmaz.
set -eu

cd "$(dirname "$0")/.."
ROOT=$(pwd)
PUBLISH=0
[ "${1:-}" = "--publish" ] && PUBLISH=1

if [ "$PUBLISH" = 1 ] && [ -n "$(git status --porcelain)" ]; then
  echo "Çalışma ağacında commit'lenmemiş değişiklik var; yayından önce commit'le." >&2
  exit 1
fi

echo "1/4 Site denetimi (bağlantılar, meta, defter şeması)"
node scripts/check-site.mjs --require-digests

echo "2/4 Katalog ve service worker listesi güncel mi"
node scripts/build-catalog.mjs --check
node scripts/build-sw.mjs --check

echo "3/4 Tarayıcı duman testi (her sayfa, JS hatası)"
node scripts/smoke.mjs --digest

echo "4/4 Paket: _site (yalnız commit'lenmiş dosyalar)"
SITE="$ROOT/_site"
rm -rf "$SITE"
mkdir -p "$SITE"
# Çalışma klasörü değil git ağacı paketlenir: .gitignore'daki dosyalar
# (acelya.png, .shots/, node_modules/ …) herkese açık siteye gitmez.
git archive --format=tar HEAD | tar -x -C "$SITE"
rm -rf "$SITE/.github" "$SITE/scripts" "$SITE/docs" "$SITE/.gitignore" \
       "$SITE/package.json" "$SITE/package-lock.json"
touch "$SITE/.nojekyll"
echo "Paket hazır: $SITE ($(find "$SITE" -type f | wc -l | tr -d ' ') dosya)"

if [ "$PUBLISH" = 0 ]; then
  echo "Gönderim yapılmadı. Yayınlamak için: sh scripts/deploy-manual.sh --publish"
  exit 0
fi

SHA=$(git rev-parse --short HEAD)
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
cp -R "$SITE/." "$WORK/"
cd "$WORK"
git init -q
git checkout -q -b gh-pages
git add -A
git -c user.name="$(git -C "$ROOT" config user.name)" \
    -c user.email="$(git -C "$ROOT" config user.email)" \
    commit -q -m "Yayın: $SHA"
git push -f "$(git -C "$ROOT" remote get-url origin)" gh-pages:gh-pages
echo "gh-pages dalına gönderildi ($SHA). Pages birkaç dakika içinde güncellenir."
