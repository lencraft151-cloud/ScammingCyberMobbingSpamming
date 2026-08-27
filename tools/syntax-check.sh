#!/usr/bin/env bash
# Prüft alle JS-Dateien auf Syntaxfehler. node --check behandelt .js als
# CommonJS, deshalb wird für die Prüfung nach .mjs kopiert.
set -u
fail=0
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
while IFS= read -r f; do
  cp "$f" "$tmp/check.mjs"
  if ! out="$(node --check "$tmp/check.mjs" 2>&1)"; then
    echo "FAIL $f"
    echo "$out" | sed -n '1,6p'
    fail=1
  fi
done < <(find assets/js tools -name '*.js' -o -name '*.mjs' | sort)
if [ "$fail" -eq 0 ]; then echo "Alle JS-Dateien syntaktisch in Ordnung."; fi
exit "$fail"
