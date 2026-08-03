@echo off
setlocal
cd /d "%~dp0"
title Start FORRUM

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

docker compose up -d
if errorlevel 1 (
  echo ERROR: FORRUM could not start. Run CHECK_FORRUM.bat.
  pause
  exit /b 1
)

echo Waiting for the API and website...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ok=$false; foreach($i in 1..60){ try { $api=Invoke-WebRequest -UseBasicParsing http://localhost:4000/v1/health -TimeoutSec 2; $web=Invoke-WebRequest -UseBasicParsing http://localhost:3000 -TimeoutSec 2; if($api.StatusCode -eq 200 -and $web.StatusCode -eq 200){$ok=$true; break} } catch {}; Start-Sleep -Seconds 2 }; if(-not $ok){exit 1}"
if errorlevel 1 (
  echo ERROR: The website or API did not become ready. Run CHECK_FORRUM.bat.
  pause
  exit /b 1
)

start "" http://localhost:3000
echo SUCCESS: FORRUM is open at http://localhost:3000
pause
exit /b 0
