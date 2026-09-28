# ============================================================
#  resume · 黄江南  —— 一键编译（彩色 + 黑白）
#  用法：  powershell -ExecutionPolicy Bypass -File .\build.ps1
#  产物：  resume-color.pdf（彩色） / resume-bw.pdf（黑白）
#  原理：  同一份 resume.tex 编译两次，只切换 \bwfalse / \bwtrue 开关
#
#  依赖：  便携版 Tectonic，按顺序查找：
#          1) 环境变量 TECTONIC_EXE
#          2) .\tectonic\tectonic.exe
#          3) C:\Users\Jason\OneDrive\Desktop\resume\x\.tools\tectonic\tectonic.exe
#          4) PATH 中的 tectonic
#  缓存：  优先 TECTONIC_CACHE_DIR，其次 .\tectonic-cache，
#          其次原仓库 x\.tools\tectonic-cache；都没有则首次运行联网下载。
# ============================================================
$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path

# ---------------- 定位 tectonic ----------------
$exeCandidates = @()
if ($env:TECTONIC_EXE) { $exeCandidates += $env:TECTONIC_EXE }
$exeCandidates += (Join-Path $here "tectonic\tectonic.exe")
$exeCandidates += "C:\Users\Jason\OneDrive\Desktop\resume\x\.tools\tectonic\tectonic.exe"
$tectonic = $exeCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $tectonic) {
    $cmd = Get-Command tectonic -ErrorAction SilentlyContinue
    if ($cmd) { $tectonic = $cmd.Source }
}
if (-not $tectonic) { throw "找不到 tectonic.exe，请设置环境变量 TECTONIC_EXE 指向它。" }

# ---------------- 定位缓存 ----------------
$cacheCandidates = @()
if ($env:TECTONIC_CACHE_DIR) { $cacheCandidates += $env:TECTONIC_CACHE_DIR }
$cacheCandidates += (Join-Path $here "tectonic-cache")
$cacheCandidates += "C:\Users\Jason\OneDrive\Desktop\resume\x\.tools\tectonic-cache"
$cache = $cacheCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if ($cache) { $env:TECTONIC_CACHE_DIR = $cache }

# ---------------- 统一临时目录（关键） ----------------
# Tectonic 落盘 format 文件时需要同盘重命名；若 TEMP 与缓存不在同一磁盘，
# 会报 “无法将文件移到不同的磁盘驱动器 (os error 17)”。这里把 TEMP/TMP
# 指向缓存所在盘的目录。
if ($cache) { $tmp = Join-Path (Split-Path -Parent $cache) "_tectonic_tmp" }
else        { $tmp = Join-Path $here "_tectonic_tmp" }
New-Item -ItemType Directory -Force -Path $tmp | Out-Null
$env:TEMP = $tmp; $env:TMP = $tmp

$src = Join-Path $here "resume.tex"
$raw = Get-Content -LiteralPath $src -Raw -Encoding UTF8

function Build-Version([string]$text, [string]$suffix) {
    $tmpTex = Join-Path $here "_build_$suffix.tex"
    [System.IO.File]::WriteAllText($tmpTex, $text, (New-Object System.Text.UTF8Encoding($false)))
    & $tectonic -X compile $tmpTex --outdir $here
    if ($LASTEXITCODE -ne 0) { throw "编译 $suffix 失败（exit $LASTEXITCODE）" }
    Move-Item -LiteralPath (Join-Path $here "_build_$suffix.pdf") -Destination (Join-Path $here "resume-$suffix.pdf") -Force
    Remove-Item -LiteralPath $tmpTex -Force
}

Write-Host "==> 编译彩色版 ..." -ForegroundColor Cyan
Build-Version $raw.Replace('\bwtrue', '\bwfalse') "color"

Write-Host "==> 编译黑白版 ..." -ForegroundColor Cyan
Build-Version $raw.Replace('\bwfalse', '\bwtrue') "bw"

Write-Host ""
Write-Host "OK -> resume-color.pdf / resume-bw.pdf" -ForegroundColor Green