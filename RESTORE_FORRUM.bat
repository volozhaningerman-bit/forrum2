@echo off
setlocal
cd /d "%~dp0"
title Restore FORRUM backup

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\restore-backup.ps1"
if errorlevel 1 (
  echo ERROR: Restore did not complete successfully.
  pause
  exit /b 1
)

pause
exit /b 0
