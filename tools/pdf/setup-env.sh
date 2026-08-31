#!/usr/bin/env bash
# ==========================================================================
# Empire English coursebook — PDF render environment setup (idempotent).
#
# Prepares a headless-Chromium environment capable of rendering the bilingual
# (RTL Arabic + LTR English) coursebook:
#   1. Chromium shared-library dependencies
#   2. NSS libraries (extracted manually — the distro rpm scriptlet fails)
#   3. Arabic + Latin fonts (Noto) so Arabic never renders as tofu boxes
#   4. Chromium itself (via puppeteer), cached inside the repo
#
# Safe to re-run. Chromium is cached in tools/pdf/.chromium (gitignored).
# ==========================================================================
set -u
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export PUPPETEER_CACHE_DIR="$HERE/.chromium"

echo "== [1/4] Chromium system libraries =="
dnf install -y \
  nspr atk at-spi2-atk at-spi2-core cups-libs libdrm libXcomposite libXdamage \
  libXext libXfixes libXrandr mesa-libgbm libxkbcommon libXScrnSaver alsa-lib \
  pango cairo >/dev/null 2>&1 && echo "  ok" || echo "  (dnf libs step reported issues; continuing)"

echo "== [2/4] NSS libraries (manual extract) =="
if [ ! -f /usr/lib64/libnss3.so ]; then
  W="$(mktemp -d)"
  ( cd "$W"
    dnf install -y --downloadonly --downloaddir="$W" nss nss-util nss-softokn nss-softokn-freebl >/dev/null 2>&1
    for f in *.rpm; do rpm2archive "$f" >/dev/null 2>&1; done
    for t in *.tgz; do tar xzf "$t"; done
    cp -a "$W"/usr/lib64/*.so* /usr/lib64/ 2>/dev/null || true )
  rm -rf "$W"
fi
[ -f /usr/lib64/libnss3.so ] && echo "  ok (libnss3.so present)" || echo "  WARN: libnss3.so missing"

echo "== [3/4] Fonts (Arabic + Latin + emoji) =="
dnf install -y google-noto-naskh-arabic-fonts google-noto-sans-arabic-fonts \
  google-noto-sans-fonts google-noto-serif-fonts \
  dejavu-sans-fonts \
  dejavu-sans-mono-fonts >/dev/null 2>&1   # Sans covers arrows/symbols (→); Mono is the
                                           # code-span face every lesson's blueprint
                                           # citation uses (book.css pins it by name).
# Color-emoji font so the Empire section markers (🎯 🔁 👂 👑 …) render, not tofu.
dnf install -y google-noto-emoji-color-fonts >/dev/null 2>&1 \
  || dnf install -y google-noto-color-emoji-fonts >/dev/null 2>&1 \
  || dnf install -y google-noto-emoji-fonts >/dev/null 2>&1
fc-cache -f >/dev/null 2>&1
echo "  arabic faces: $(fc-list | grep -ic arabic) | emoji faces: $(fc-list | grep -ic emoji) | mono faces: $(fc-list | grep -ic mono)"

echo "== [4/4] Chromium (puppeteer) =="
if ! ls "$PUPPETEER_CACHE_DIR"/chrome/*/chrome-linux64/chrome >/dev/null 2>&1; then
  ( cd "$HERE" && npx --yes puppeteer browsers install chrome >/dev/null 2>&1 )
fi
ls "$PUPPETEER_CACHE_DIR"/chrome/*/chrome-linux64/chrome >/dev/null 2>&1 \
  && echo "  ok (chromium installed)" || echo "  WARN: chromium missing"

echo "== setup complete =="
