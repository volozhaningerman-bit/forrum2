@echo off
setlocal
cd /d "%~dp0"
title Stop FORRUM

docker compose stop
if errorlevel 1 (
  echo ERROR: FORRUM could not be stopped normally.
  pause
  exit /b 1
)

echo SUCCESS: FORRUM is stopped. Local data is preserved.
pause
exit /b 0
