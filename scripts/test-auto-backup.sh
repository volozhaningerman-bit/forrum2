#!/bin/sh
set -eu
ROOT="$(mktemp -d)"
trap 'rm -rf "$ROOT"' EXIT
mkdir -p "$ROOT/bin" "$ROOT/uploads" "$ROOT/backups"
printf 'image' > "$ROOT/uploads/sample.png"
cat > "$ROOT/bin/pg_isready" <<'MOCK'
#!/bin/sh
exit 0
MOCK
cat > "$ROOT/bin/pg_dump" <<'MOCK'
#!/bin/sh
out=''
while [ "$#" -gt 0 ]; do
  if [ "$1" = '-f' ]; then shift; out="$1"; fi
  shift || true
done
printf 'database-dump' > "$out"
MOCK
chmod +x "$ROOT/bin/pg_isready" "$ROOT/bin/pg_dump"
PATH="$ROOT/bin:$PATH" BACKUP_DIR="$ROOT/backups" UPLOAD_SOURCE_DIR="$ROOT/uploads" BACKUP_STATUS_FILE="$ROOT/status.json" AUTO_BACKUP_RUN_ONCE=true AUTO_BACKUP_ON_START=true AUTO_BACKUP_RETENTION_COUNT=2 sh "$(dirname "$0")/auto-backup.sh"
test "$(find "$ROOT/backups" -name '*.dump' | wc -l)" -eq 1
test "$(find "$ROOT/backups" -name '*_uploads.tar.gz' | wc -l)" -eq 1
grep -q '"state":"ok"' "$ROOT/status.json"
(cd "$ROOT/backups" && sha256sum -c ./*.sha256 >/dev/null)
echo 'Auto-backup test passed.'
