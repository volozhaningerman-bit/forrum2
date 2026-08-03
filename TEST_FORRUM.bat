@echo off
setlocal
cd /d "%~dp0"
title Full FORRUM v0.20.2 RC4 validation

echo.
echo ==============================================
echo   FORRUM v0.20.2 RC4 - full validation
echo ==============================================
echo.

where docker >nul 2>nul
if errorlevel 1 (
  echo ERROR: Docker Desktop was not found.
  pause
  exit /b 1
)

docker info >nul 2>nul
if errorlevel 1 (
  echo ERROR: Start Docker Desktop and wait until Docker Engine is ready.
  pause
  exit /b 1
)

echo [1/13] Checking containers...
docker compose ps
if errorlevel 1 goto :failed

echo.
echo [2/13] Checking API health and version...
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $r=Invoke-RestMethod http://localhost:4000/v1/health -TimeoutSec 10; if(-not $r.ok){exit 1}; Write-Host ('Version: '+$r.version) } catch { Write-Host $_; exit 1 }"
if errorlevel 1 goto :failed

echo.
echo [3/13] Validating Prisma schema...
docker compose exec -T api npm run db:validate -w @forrum/api
if errorlevel 1 goto :failed

echo.
echo [4/13] Running extended static validation...
docker compose exec -T api npm run validate:static
if errorlevel 1 goto :failed

echo.
echo [5/13] Checking interface truthfulness...
docker compose exec -T api npm run validate:ux
if errorlevel 1 goto :failed

echo.
echo [6/13] Checking basic accessibility rules...
docker compose exec -T api npm run validate:a11y
if errorlevel 1 goto :failed

echo.
echo [7/13] Checking automatic backups...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ok=$false; foreach($i in 1..30){ if(Test-Path 'backups\backup-status.json'){ try { $s=Get-Content 'backups\backup-status.json' -Raw | ConvertFrom-Json; if($s.state -eq 'ok'){Write-Host ('Last backup: '+$s.lastBackup); $ok=$true; break} elseif($s.state -eq 'error'){Write-Host $s.message; exit 1} } catch {} }; Start-Sleep -Seconds 2 }; if(-not $ok){Write-Host 'Automatic backup was not confirmed'; exit 1}"
if errorlevel 1 goto :failed

echo.
echo [8/13] Running the full user and administrator flow...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\smoke-test.ps1"
if errorlevel 1 goto :failed

echo.
echo [9/13] Generating Prisma Client...
docker compose exec -T api npm run db:generate -w @forrum/api
if errorlevel 1 goto :failed

echo.
echo [10/13] Checking TypeScript types...
docker compose exec -T api npm run typecheck -w @forrum/contracts
if errorlevel 1 goto :failed
docker compose exec -T api npm run typecheck -w @forrum/api
if errorlevel 1 goto :failed
docker compose exec -T web npm run typecheck -w @forrum/web
if errorlevel 1 goto :failed

echo.
echo [11/13] Running unit tests...
docker compose exec -T api npm run test -w @forrum/api
if errorlevel 1 goto :failed

echo.
echo [12/13] Creating an additional verification backup...
docker compose exec -T backup sh -c "AUTO_BACKUP_RUN_ONCE=true AUTO_BACKUP_ON_START=false /usr/local/bin/auto-backup.sh"
if errorlevel 1 goto :failed

echo.
echo [13/13] Checking production builds...
docker compose exec -T api npm run build -w @forrum/contracts
if errorlevel 1 goto :failed
docker compose exec -T api npm run build -w @forrum/api
if errorlevel 1 goto :failed
docker compose exec -T web npm run build -w @forrum/web
if errorlevel 1 goto :failed

echo.
echo ==============================================
echo   ALL AUTOMATIC CHECKS PASSED
echo ==============================================
echo Next step: complete FULL_TEST_CHECKLIST.txt manually.
pause
exit /b 0

:failed
echo.
echo ==============================================
echo   VALIDATION FOUND AN ERROR
echo ==============================================
echo Run CHECK_FORRUM.bat and send FORRUM_DIAGNOSTICS.txt.
pause
exit /b 1
