@echo off
setlocal
cd /d "%~dp0"
title FORRUM diagnostics

(
  echo FORRUM DIAGNOSTICS
  echo Date: %date% %time%
  echo.
  echo ===== Docker version =====
  docker version
  echo.
  echo ===== Docker Compose =====
  docker compose version
  echo.
  echo ===== Container status =====
  docker compose ps
  echo.
  echo ===== API health =====
  powershell -NoProfile -ExecutionPolicy Bypass -Command "try { (Invoke-WebRequest -UseBasicParsing http://localhost:4000/v1/health -TimeoutSec 5).Content } catch { $_ }"
  echo.
  echo ===== Website health =====
  powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $r=Invoke-WebRequest -UseBasicParsing http://localhost:3000 -TimeoutSec 5; Write-Host ('HTTP '+$r.StatusCode) } catch { $_ }"
  echo.
  echo ===== Prisma schema =====
  docker compose exec -T api npm run db:validate -w @forrum/api
  echo.
  echo ===== Static validation =====
  docker compose exec -T api npm run validate:static
  echo.
  echo ===== Uploaded files =====
  docker compose exec -T api sh -c "find /app/uploads -type f 2>/dev/null | wc -l"
  echo.
  echo ===== Automatic backup status =====
  if exist "backups\backup-status.json" type "backups\backup-status.json"
  echo.
  echo ===== BACKUP logs =====
  docker compose logs --tail=120 backup
  echo.
  echo ===== API logs =====
  docker compose logs --tail=160 api
  echo.
  echo ===== WEB logs =====
  docker compose logs --tail=160 web
  echo.
  echo ===== PostgreSQL logs =====
  docker compose logs --tail=80 postgres
) > "FORRUM_DIAGNOSTICS.txt" 2>&1

type "FORRUM_DIAGNOSTICS.txt"
echo.
echo Diagnostics saved to FORRUM_DIAGNOSTICS.txt
pause
exit /b 0
