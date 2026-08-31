# Empire Coursebook — PDF pipeline

Turns the single markdown source in `materials/stage<N>/` into **branded, send-ready
PDF coursebooks** — two editions from one source:

| Edition | Contents | Output |
|---|---|---|
| **Student's Edition** | lessons with the `> [!TEACHER]` overlay **stripped** | `web/public/coursebook/eec-stage<N>-student.pdf` |
| **Teacher's Edition** | same lessons + overlay rendered as gold callout boxes | `web/public/coursebook/eec-stage<N>-teacher.pdf` |

Output lives under `web/public/`, so the books are served by the live site and are
downloadable / send-ready at:

```
https://empireenglish.online/coursebook/eec-stage0-student.pdf
https://empireenglish.online/coursebook/eec-stage0-teacher.pdf
```

The Student's Edition is also linked from the learner portal dashboard.

## Why this engine

The content is **bilingual** (RTL Egyptian Arabic + LTR English, often mixed in one
line). A headless browser (`puppeteer` → Chromium → Skia PDF) lays out bidirectional
text natively — far more reliable than LaTeX/pandoc for mixed scripts. Markdown is
parsed with `marked`; branding lives in `book.css` (royal + gold, Cinzel display type,
per-paragraph `unicode-bidi: plaintext`).

## Prerequisites (one-time per environment)

```bash
npm install          # marked + puppeteer
bash setup-env.sh    # Chromium libs, NSS, fonts (Arabic + Latin + color emoji + DejaVu), Chromium
```

`setup-env.sh` is idempotent and self-healing. Fonts matter:
- **Noto Naskh/Sans Arabic** — Arabic script
- **Noto Color Emoji** — the section markers (🎯 🔁 👂 👑 …)
- **DejaVu Sans** — symbols such as the arrow `→` that no other installed font carries

## Generate

```bash
npm run build        # both editions, Stage 0
npm run student      # student only
npm run teacher      # teacher only

# advanced
node build-book.mjs --stage 0 --edition both     # all Stage-0 units
node build-book.mjs --stage 0 --edition student --unit 3   # a single unit
```

## Regenerate after editing a lesson

```bash
./setup-env.sh                                  # REQUIRED on a fresh machine — see below
npm run build                                   # rebuild both editions
node ../audit/generate-portal-embed.mjs         # re-embed the portal copy
cd ../audit && npm run all                      # drift + anatomy + bidi
```

The portal reads a generated embed, not these markdown files, so a lesson edit must be
re-embedded or the site and the book will ship **different lessons with nothing
failing**. `npm run drift` catches exactly that.

## ⚠️ Never build without `setup-env.sh` — a successful build can still be wrong

`setup-env.sh` installs `dejavu-sans-fonts` (arrows and symbols: `→ ↗ ↘`) and a
colour-emoji font (the Empire section markers `🎯 🔁 👂 👑`). Without them Chromium
still renders, the script still prints `✓`, and the PDF is still produced — just with
missing glyphs on every page.

This happened during the 2026-08-31 audit: a rebuild on a machine with no emoji or
DejaVu faces dropped the student edition from 4.4M to 4.1M and lost every `DejaVuSans`
face. It was caught only by diffing the embedded font list, and the files were
reverted. **Check the fonts, not the exit code:**

```bash
strings ../../web/public/coursebook/eec-stage0-student.pdf \
  | grep -oE '(Cinzel|SourceSans3|NotoNaskhArabic|NotoSans|DejaVuSans)[A-Za-z-]*' | sort -u
```

All five families must appear. If `DejaVuSans` is absent, run `setup-env.sh` and
rebuild — do not commit the result.

## Notes

- `node_modules/`, `.chromium/` and `_fonttest.*` are gitignored; the generated PDFs
  in `web/public/coursebook/` are committed so they ship with the site.
- Verified output (Stage 0): Student ≈ 190 pp, Teacher ≈ 208 pp, A4.
- Anything in `web/public/` is served publicly and ungated, including the **Teacher's
  Edition**. That is a deliberate decision to make or revisit, not an accident of the
  build — see `audits/2026-08-31-repo-audit.md` §3.
