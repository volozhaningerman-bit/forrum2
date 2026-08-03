@echo off
setlocal
cd /d "%~dp0"
title FORRUM PC precheck

echo.
echo ==============================================
echo   FORRUM - PC readiness check
echo ==============================================
echo.
set "failed=0"
ver

echo.
echo [1/5] Checking free space on drive C:...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$d=Get-PSDrive C; $gb=[math]::Round($d.Free/1GB,1); Write-Host ('Free space: '+$gb+' GB'); if($d.Free -lt 12GB){exit 1}"
if errorlevel 1 (
  echo ERROR: Please free at least 12 GB on drive C:.
  set "failed=1"
)

echo.
echo [2/5] Checking WSL...
where wsl >nul 2>nul
if errorlevel 1 (
  echo ERROR: WSL was not found.
  echo Open PowerShell as Administrator and run: wsl --install
  set "failed=1"
) else (
  wsl --status
  if errorlevel 1 (
    echo ERROR: WSL is not fully ready.
    echo Open PowerShell as Administrator and run: wsl --update
    set "failed=1"
  )
)

echo.
echo [3/5] Checking Docker Desktop...
where docker >nul 2>nul
if errorlevel 1 (
  echo ERROR: Docker Desktop was not found.
  set "failed=1"
) else (
  docker version
  if errorlevel 1 (
    echo ERROR: Docker Desktop is installed, but Docker Engine is not running.
    echo Start Docker Desktop and wait until it reports that the engine is running.
    set "failed=1"
  )
)

echo.
echo [4/5] Checking Docker Compose...
docker compose version
if errorlevel 1 (
  echo ERROR: Docker Compose is unavailable.
  set "failed=1"
)

echo.
echo [5/5] Checking FORRUM configuration...
if not exist ".env" copy ".env.example" ".env" >nul
if not exist ".env" (
  echo ERROR: Could not create .env from .env.example.
  set "failed=1"
) else (
  docker compose config --quiet
  if errorlevel 1 (
    echo ERROR: docker-compose.yml or .env contains an error.
    set "failed=1"
  )
)

echo.
if "%failed%"=="0" (
  echo SUCCESS: This PC is ready to install FORRUM.
  echo Next file: INSTALL_AND_START_FORRUM.bat
  pause
  exit /b 0
)

echo FAILED: Fix the items shown above, then run PRECHECK_PC.bat again.
pause
exit /b 1
