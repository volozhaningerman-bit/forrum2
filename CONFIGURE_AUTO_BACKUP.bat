@echo off
setlocal
cd /d "%~dp0"
title Configure FORRUM automatic backups

if not exist ".env" copy ".env.example" ".env" >nul

echo.
echo Configure automatic FORRUM backups.
echo Recommended: every 12 hours, keep 28 backup sets.
echo.
set /p "interval=Interval in hours [12]: "
if "%interval%"=="" set "interval=12"
set /p "retention=Number of backup sets to keep [28]: "
if "%retention%"=="" set "retention=28"

powershell -NoProfile -ExecutionPolicy Bypass -Command "$p='.env'; $c=Get-Content $p -Raw; function Set-Key([string]$k,[string]$v){ if($script:c -match '(?m)^'+[regex]::Escape($k)+'='){ $script:c=[regex]::Replace($script:c,'(?m)^'+[regex]::Escape($k)+'=.*$',$k+'='+$v) } else { $script:c += [Environment]::NewLine+$k+'='+$v } }; Set-Key 'AUTO_BACKUP_INTERVAL_HOURS' '%interval%'; Set-Key 'AUTO_BACKUP_RETENTION_COUNT' '%retention%'; Set-Key 'AUTO_BACKUP_ON_START' 'true'; Set-Content $p $c -Encoding UTF8"
if errorlevel 1 (
  echo ERROR: Backup settings could not be saved.
  pause
  exit /b 1
)

echo Restarting the automatic backup service...
docker compose up -d --build backup
if errorlevel 1 (
  echo ERROR: Backup service could not start. Make sure Docker Desktop is running.
  pause
  exit /b 1
)

echo.
echo SUCCESS: Backups will run every %interval% hour(s).
echo Backup folder: backups\automatic
pause
exit /b 0
