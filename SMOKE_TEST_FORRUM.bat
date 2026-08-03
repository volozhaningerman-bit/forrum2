@echo off
setlocal
cd /d "%~dp0"
title FORRUM user-flow test

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\smoke-test.ps1"
if errorlevel 1 (
  echo.
  echo ERROR: The user-flow test failed.
  echo Run CHECK_FORRUM.bat and send FORRUM_DIAGNOSTICS.txt.
  pause
  exit /b 1
)

pause
exit /b 0
