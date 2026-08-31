#!/usr/bin/env bash
# Empire English — fast mixed-script heading check, for use WHILE AUTHORING.
#
# `npm run anatomy` already fails on this (check-lesson-anatomy.mjs, rule 6a),
# but that runs over the whole corpus and is the wrong granularity when you are
# mid-lesson. This is the one-second version you run after each file.
#
# WHY IT EXISTS: an Arabic meem inside "Warm-up" — Warم-up — is invisible on
# screen and makes the section UNFINDABLE to the anatomy check, which locates
# sections with head.includes(label). A non-mandatory section then reports as
# absent rather than wrong, so the lesson passes. Four of these shipped past a
# run that printed "145/145 conforming". The author of this file has since
# produced the same typo four more times, which is the real argument for a
# check rather than for care.
#
# Usage:
#   tools/audit/check-mixed-script.sh                 # whole materials/ tree
#   tools/audit/check-mixed-script.sh materials/stage3  # one stage
# Exit 1 if any heading mixes scripts.

set -uo pipefail
cd "$(dirname "$0")/../.." || exit 1
TARGET="${1:-materials}"

hits=$(grep -rn '^#\{1,3\} ' "$TARGET" 2>/dev/null \
  | grep -P '[A-Za-z][\x{0600}-\x{06FF}]|[\x{0600}-\x{06FF}][A-Za-z]')

if [ -n "$hits" ]; then
  echo "✗ mixed-script heading(s) — a Latin and an Arabic character are adjacent:"
  echo "$hits" | sed 's/^/  /'
  echo
  echo "  One of the two characters is a typo. The section is currently INVISIBLE"
  echo "  to check-lesson-anatomy.mjs, which finds sections by label match."
  exit 1
fi

echo "✓ no mixed-script headings in $TARGET"
