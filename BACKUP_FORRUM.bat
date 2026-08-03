@echo off
setlocal
cd /d "%~dp0"
title Create FORRUM backup

if not exist "backups\manual" mkdir "backups\manual"
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd_HHmmss"') do set "stamp=%%i"
set "stem=backups\manual\forrum_%stamp%"
set "dbfile=%stem%.dump"
set "mediafile=%stem%_uploads.tar.gz"
set "checksum=%stem%.sha256"

echo Creating database backup...
docker compose exec -T postgres pg_dump -Fc -U forrum -d forrum > "%dbfile%"
if errorlevel 1 (
  echo ERROR: Database backup failed. Make sure FORRUM is running.
  if exist "%dbfile%" del "%dbfile%"
  pause
  exit /b 1
)

echo Creating uploaded-file backup...
docker compose exec -T api tar -czf - -C /app/uploads . > "%mediafile%"
if errorlevel 1 (
  echo ERROR: Uploaded-file backup failed.
  if exist "%mediafile%" del "%mediafile%"
  pause
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command "$a=(Get-FileHash '%dbfile%' -Algorithm SHA256).Hash.ToLower(); $b=(Get-FileHash '%mediafile%' -Algorithm SHA256).Hash.ToLower(); Set-Content '%checksum%' ($a+'  '+[IO.Path]::GetFileName('%dbfile%')+[Environment]::NewLine+$b+'  '+[IO.Path]::GetFileName('%mediafile%')) -Encoding ascii"
if errorlevel 1 (
  echo ERROR: Could not create backup checksums.
  pause
  exit /b 1
)

echo.
echo SUCCESS: Backup created.
echo %dbfile%
echo %mediafile%
echo %checksum%
pause
exit /b 0
