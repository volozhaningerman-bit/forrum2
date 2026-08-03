@echo off
setlocal
cd /d "%~dp0"
title Install and start FORRUM

echo.
echo ==============================================
echo   FORRUM - installation and first start
echo ==============================================
echo.
call PRECHECK_PC.bat
if errorlevel 1 exit /b 1

where docker >nul 2>nul
if errorlevel 1 (
  echo ERROR: Docker Desktop was not found.
  echo Install Docker Desktop, restart Windows, and run this file again.
  pause
  exit /b 1
)

docker info >nul 2>nul
if errorlevel 1 (
  echo ERROR: Docker Desktop is installed, but Docker Engine is not running.
  echo Start Docker Desktop and wait until the engine is ready.
  pause
  exit /b 1
)

if not exist ".env" copy ".env.example" ".env" >nul
if not exist "backups\automatic" mkdir "backups\automatic"
if not exist "backups\manual" mkdir "backups\manual"

echo Checking docker-compose.yml and settings...
docker compose config --quiet
if errorlevel 1 (
  echo ERROR: FORRUM configuration is invalid.
  echo Run CHECK_FORRUM.bat and send FORRUM_DIAGNOSTICS.txt.
  pause
  exit /b 1
)

echo Building and starting FORRUM...
echo The first start can take a long time because Docker must download components.
docker compose up -d --build
if errorlevel 1 (
  echo ERROR: Docker build or startup failed.
  echo Run CHECK_FORRUM.bat and send FORRUM_DIAGNOSTICS.txt.
  pause
  exit /b 1
)

echo Waiting for the API and website...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ok=$false; foreach($i in 1..90){ try { $api=Invoke-WebRequest -UseBasicParsing http://localhost:4000/v1/health -TimeoutSec 2; $web=Invoke-WebRequest -UseBasicParsing http://localhost:3000 -TimeoutSec 2; if($api.StatusCode -eq 200 -and $web.StatusCode -eq 200){$ok=$true; break} } catch {}; Start-Sleep -Seconds 2 }; if(-not $ok){exit 1}"
if errorlevel 1 (
  echo ERROR: The website or API did not become ready in time.
  echo Run CHECK_FORRUM.bat and send FORRUM_DIAGNOSTICS.txt.
  pause
  exit /b 1
)

echo.
echo SUCCESS: FORRUM is running.
echo Website: http://localhost:3000
echo Test email: http://localhost:8025
echo API documentation: http://localhost:4000/docs
start "" http://localhost:3000
start "" http://localhost:8025
pause
exit /b 0
