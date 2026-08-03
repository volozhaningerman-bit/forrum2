@echo off
setlocal
cd /d "%~dp0"
title Reset FORRUM local data

echo WARNING: This will delete all local users, topics, messages, and Docker volumes.
set /p "answer=Type DELETE to confirm: "
if /I not "%answer%"=="DELETE" (
  echo Reset cancelled.
  pause
  exit /b 0
)

docker compose down -v
if errorlevel 1 (
  echo ERROR: Local data could not be removed.
  pause
  exit /b 1
)

echo SUCCESS: Local data was removed.
echo Run INSTALL_AND_START_FORRUM.bat to create a clean installation.
pause
exit /b 0
