#!/bin/bash
# Sube PORTAFOLIO/web -> bucket "portfolio" de Supabase Storage (rutas idénticas)
set -u
source /tmp/kev-supabase.env
SRC="/Users/thmeza/Developer/Kev/PORTAFOLIO/web"
LOG="/Users/thmeza/Developer/Kev/scripts/upload-supabase.log"
: > "$LOG"

ok=0; fail=0
while IFS= read -r -d '' f; do
  rel="${f#$SRC/}"
  case "$f" in
    *.mp4) ctype="video/mp4" ;;
    *.jpg|*.jpeg) ctype="image/jpeg" ;;
    *.png) ctype="image/png" ;;
    *) ctype="application/octet-stream" ;;
  esac
  code=$(curl -s -o /dev/null -w "%{http_code}" -X POST \
    "$SUPABASE_URL/storage/v1/object/portfolio/$rel" \
    -H "Authorization: Bearer $SUPABASE_KEY" \
    -H "apikey: $SUPABASE_KEY" \
    -H "Content-Type: $ctype" \
    -H "x-upsert: true" \
    --data-binary "@$f")
  if [ "$code" = "200" ]; then
    ok=$((ok+1)); echo "OK   [$ok] $rel" >> "$LOG"
  else
    fail=$((fail+1)); echo "FAIL ($code) $rel" >> "$LOG"
  fi
done < <(find "$SRC" -type f \( -name "*.jpg" -o -name "*.mp4" \) -print0)

echo "=== RESUMEN: $ok subidos, $fail fallos ===" >> "$LOG"

# Verificación: muestrear 5 URLs públicas
echo "=== VERIFICACIÓN PÚBLICA ===" >> "$LOG"
for sample in "artistas/balvin/j-balvin-2.jpg" "video-clips/reel-kev.mp4" "video-clips/en-otra-vida-final-pro-res.mp4" "marcas/kev-x-new-era/dis1.jpg" "video-clips/la-esencia-mp4-poster.jpg"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$SUPABASE_URL/storage/v1/object/public/portfolio/$sample")
  echo "PUBLIC $code $sample" >> "$LOG"
done
echo "DONE" >> "$LOG"
