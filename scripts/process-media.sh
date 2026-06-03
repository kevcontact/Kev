#!/bin/bash
# Procesa PORTAFOLIO/ -> PORTAFOLIO/web/ (videos 720p web + posters + imagenes optimizadas)
set -u
SRC="/Users/thmeza/Developer/Kev/PORTAFOLIO"
OUT="$SRC/web"
LOG="/Users/thmeza/Developer/Kev/scripts/process-media.log"
mkdir -p "$OUT"
: > "$LOG"

slugify() {
  echo "$1" | iconv -f utf-8 -t ascii//TRANSLIT 2>/dev/null \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/\.(mp4|mov|m4v|jpg|jpeg|png)$//I; s/[^a-z0-9]+/-/g; s/^-+//; s/-+$//'
}

echo "=== VIDEOS ===" >> "$LOG"
find "$SRC" -type f \( -iname "*.mp4" -o -iname "*.mov" -o -iname "*.m4v" \) ! -path "$OUT/*" -print0 |
while IFS= read -r -d '' f; do
  rel="${f#$SRC/}"
  dir=$(dirname "$rel")
  [ "$dir" = "." ] && dir=""
  # slug de cada segmento del directorio
  outdir="$OUT"
  if [ -n "$dir" ]; then
    IFS='/' read -ra parts <<< "$dir"
    for p in "${parts[@]}"; do outdir="$outdir/$(slugify "$p")"; done
  fi
  mkdir -p "$outdir"
  name=$(slugify "$(basename "$f")")
  dst="$outdir/$name.mp4"
  poster="$outdir/$name-poster.jpg"
  if [ -f "$dst" ]; then echo "SKIP $rel" >> "$LOG"; continue; fi
  echo "START $rel -> ${dst#$OUT/}" >> "$LOG"
  ffmpeg -nostdin -y -v error -i "$f" \
    -vf "scale=1280:1280:force_original_aspect_ratio=decrease:force_divisible_by=2" \
    -c:v h264_videotoolbox -b:v 1800k -maxrate 2400k -bufsize 4M -pix_fmt yuv420p \
    -c:a aac -b:a 128k -movflags +faststart \
    "$dst" >> "$LOG" 2>&1
  if [ $? -eq 0 ]; then
    ffmpeg -nostdin -y -v error -ss 1 -i "$dst" -frames:v 1 -q:v 4 "$poster" >> "$LOG" 2>&1
    echo "OK   $rel ($(du -h "$dst" | cut -f1 | tr -d ' '))" >> "$LOG"
  else
    echo "FAIL $rel" >> "$LOG"
  fi
done

echo "=== IMAGENES ===" >> "$LOG"
find "$SRC" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) ! -path "$OUT/*" ! -name "*-poster.jpg" -print0 |
while IFS= read -r -d '' f; do
  rel="${f#$SRC/}"
  dir=$(dirname "$rel")
  [ "$dir" = "." ] && dir=""
  outdir="$OUT"
  if [ -n "$dir" ]; then
    IFS='/' read -ra parts <<< "$dir"
    for p in "${parts[@]}"; do outdir="$outdir/$(slugify "$p")"; done
  fi
  mkdir -p "$outdir"
  name=$(slugify "$(basename "$f")")
  dst="$outdir/$name.jpg"
  if [ -f "$dst" ]; then continue; fi
  ffmpeg -nostdin -y -v error -i "$f" -vf "scale=1600:1600:force_original_aspect_ratio=decrease" -q:v 4 "$dst" >> "$LOG" 2>&1 \
    && echo "OK   img $rel" >> "$LOG" || echo "FAIL img $rel" >> "$LOG"
done

echo "=== RESUMEN ===" >> "$LOG"
echo "Total web/: $(du -sh "$OUT" | cut -f1)" >> "$LOG"
find "$OUT" -name "*.mp4" -exec du -h {} \; | sort -rh >> "$LOG"
echo "DONE" >> "$LOG"
