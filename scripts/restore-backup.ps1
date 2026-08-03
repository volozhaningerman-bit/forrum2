$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$backupDir = Join-Path $root 'backups\automatic'

function Invoke-DockerWithInput([string]$inputFile, [string[]]$arguments) {
  $psi = New-Object System.Diagnostics.ProcessStartInfo
  $psi.FileName = 'docker'
  $psi.UseShellExecute = $false
  $psi.RedirectStandardInput = $true
  $psi.RedirectStandardOutput = $false
  $psi.RedirectStandardError = $false
  $psi.Arguments = (($arguments | ForEach-Object { if ($_ -match '[\s"]') { '"' + ($_ -replace '"','\"') + '"' } else { $_ } }) -join ' ')
  $process = New-Object System.Diagnostics.Process
  $process.StartInfo = $psi
  if (-not $process.Start()) { throw 'Не удалось запустить Docker.' }
  $stream = [IO.File]::OpenRead($inputFile)
  try { $stream.CopyTo($process.StandardInput.BaseStream) } finally { $stream.Dispose(); $process.StandardInput.Close() }
  $process.WaitForExit()
  if ($process.ExitCode -ne 0) { throw "Docker завершился с кодом $($process.ExitCode)." }
}

if (-not (Test-Path $backupDir)) { Write-Host 'Автоматических копий пока нет.'; exit 1 }
$items = @(Get-ChildItem $backupDir -Filter 'forrum_*.dump' | Sort-Object Name -Descending)
if (-not $items.Count) { Write-Host 'Автоматических копий пока нет.'; exit 1 }
Write-Host 'Доступные резервные копии:'
for ($i=0; $i -lt $items.Count; $i++) { Write-Host "[$($i+1)] $($items[$i].Name)" }
$choice = Read-Host 'Введите номер копии для восстановления'
$index = 0
if (-not [int]::TryParse($choice, [ref]$index) -or $index -lt 1 -or $index -gt $items.Count) { Write-Host 'Неверный номер.'; exit 1 }
$db = $items[$index-1]
$stem = [IO.Path]::Combine($db.DirectoryName, [IO.Path]::GetFileNameWithoutExtension($db.Name))
$media = "$stem`_uploads.tar.gz"
$checksum = "$stem.sha256"
if (-not (Test-Path $media)) { Write-Host 'Не найден архив изображений.'; exit 1 }

if (Test-Path $checksum) {
  $expected = @{}
  Get-Content $checksum | ForEach-Object {
    if ($_ -match '^([a-fA-F0-9]{64})\s+(.+)$') { $expected[$matches[2].Trim()] = $matches[1].ToLower() }
  }
  foreach ($file in @($db.FullName, $media)) {
    $name = [IO.Path]::GetFileName($file)
    $actual = (Get-FileHash $file -Algorithm SHA256).Hash.ToLower()
    if (-not $expected.ContainsKey($name) -or $expected[$name] -ne $actual) { throw "Контрольная сумма не совпала: $name" }
  }
}

Write-Host 'ВНИМАНИЕ: текущие данные будут заменены выбранной копией.'
$confirm = Read-Host 'Введите ВОССТАНОВИТЬ для продолжения'
if ($confirm -ne 'ВОССТАНОВИТЬ') { Write-Host 'Отменено.'; exit 0 }
Set-Location $root
& docker compose stop web api backup
if ($LASTEXITCODE -ne 0) { throw 'Не удалось остановить сервисы.' }
Invoke-DockerWithInput $db.FullName @('compose','exec','-T','postgres','pg_restore','-U','forrum','-d','forrum','--clean','--if-exists','--no-owner','--no-privileges')
Invoke-DockerWithInput $media @('compose','run','--rm','-T','--no-deps','api','sh','-c','rm -rf /app/uploads/* && tar -xzf - -C /app/uploads')
& docker compose up -d api web backup
if ($LASTEXITCODE -ne 0) { throw 'Не удалось запустить FORRUM после восстановления.' }
Write-Host 'FORRUM восстановлен из копии:' $db.Name
