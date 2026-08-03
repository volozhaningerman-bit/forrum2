#!/bin/sh
set -eu

BACKUP_DIR="${BACKUP_DIR:-/backups/automatic}"
UPLOAD_DIR="${UPLOAD_SOURCE_DIR:-/source/uploads}"
INTERVAL_HOURS="${AUTO_BACKUP_INTERVAL_HOURS:-12}"
RETENTION_COUNT="${AUTO_BACKUP_RETENTION_COUNT:-28}"
BACKUP_ON_START="${AUTO_BACKUP_ON_START:-true}"
RUN_ONCE="${AUTO_BACKUP_RUN_ONCE:-false}"
STATUS_FILE="${BACKUP_STATUS_FILE:-/backups/backup-status.json}"

case "$INTERVAL_HOURS" in ''|*[!0-9]*) INTERVAL_HOURS=12;; esac
case "$RETENTION_COUNT" in ''|*[!0-9]*) RETENTION_COUNT=28;; esac
[ "$INTERVAL_HOURS" -ge 1 ] 2>/dev/null || INTERVAL_HOURS=12
[ "$RETENTION_COUNT" -ge 1 ] 2>/dev/null || RETENTION_COUNT=28

mkdir -p "$BACKUP_DIR" "$(dirname "$STATUS_FILE")"

json_status() {
  state="$1"
  message="$2"
  last_file="${3:-}"
  now="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  safe_message=$(printf '%s' "$message" | sed 's/\\/\\\\/g; s/"/\\"/g')
  safe_file=$(printf '%s' "$last_file" | sed 's/\\/\\\\/g; s/"/\\"/g')
  cat > "${STATUS_FILE}.tmp" <<JSON
{"state":"$state","message":"$safe_message","updatedAt":"$now","lastBackup":"$safe_file","intervalHours":$INTERVAL_HOURS,"retentionCount":$RETENTION_COUNT}
JSON
  mv "${STATUS_FILE}.tmp" "$STATUS_FILE"
}

wait_for_postgres() {
  json_status "waiting" "Ожидание PostgreSQL"
  until pg_isready -h "${PGHOST:-postgres}" -U "${PGUSER:-forrum}" -d "${PGDATABASE:-forrum}" >/dev/null 2>&1; do
    sleep 3
  done
}

rotate_backups() {
  count=0
  for db in $(find "$BACKUP_DIR" -maxdepth 1 -type f -name 'forrum_*.dump' | sort -r); do
    count=$((count + 1))
    if [ "$count" -gt "$RETENTION_COUNT" ]; then
      stem="${db%.dump}"
      rm -f "$db" "${stem}_uploads.tar.gz" "${stem}.sha256"
    fi
  done
}

make_backup() {
  stamp="$(date -u +%Y%m%d_%H%M%S)"
  stem="$BACKUP_DIR/forrum_$stamp"
  db_tmp="${stem}.dump.tmp"
  media_tmp="${stem}_uploads.tar.gz.tmp"
  db_file="${stem}.dump"
  media_file="${stem}_uploads.tar.gz"
  checksum_file="${stem}.sha256"

  json_status "running" "Создание автоматической резервной копии"
  rm -f "$db_tmp" "$media_tmp"

  if ! pg_dump -Fc -h "${PGHOST:-postgres}" -U "${PGUSER:-forrum}" -d "${PGDATABASE:-forrum}" -f "$db_tmp"; then
    rm -f "$db_tmp" "$media_tmp"
    json_status "error" "Не удалось сохранить базу данных"
    return 1
  fi

  if [ -d "$UPLOAD_DIR" ]; then
    if ! tar -czf "$media_tmp" -C "$UPLOAD_DIR" .; then
      rm -f "$db_tmp" "$media_tmp"
      json_status "error" "Не удалось сохранить загруженные файлы"
      return 1
    fi
  else
    mkdir -p /tmp/empty-uploads
    tar -czf "$media_tmp" -C /tmp/empty-uploads .
  fi

  mv "$db_tmp" "$db_file"
  mv "$media_tmp" "$media_file"
  (cd "$BACKUP_DIR" && sha256sum "$(basename "$db_file")" "$(basename "$media_file")" > "$(basename "$checksum_file")")
  rotate_backups
  json_status "ok" "Автоматическая резервная копия создана" "$(basename "$db_file")"
  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] backup created: $db_file"
}

wait_for_postgres

if [ "$RUN_ONCE" = "true" ]; then
  make_backup
  exit 0
fi

if [ "$BACKUP_ON_START" = "true" ]; then
  recent=$(find "$BACKUP_DIR" -maxdepth 1 -type f -name 'forrum_*.dump' -mmin -30 -print -quit || true)
  if [ -z "$recent" ]; then
    make_backup || true
  else
    json_status "ok" "Недавняя резервная копия уже существует" "$(basename "$recent")"
  fi
fi

while true; do
  sleep_seconds=$((INTERVAL_HOURS * 3600))
  sleep "$sleep_seconds"
  wait_for_postgres
  make_backup || true
done
