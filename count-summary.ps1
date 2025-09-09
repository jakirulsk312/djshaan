$files = Get-ChildItem -Recurse -File | Where-Object {
    $_.Extension -notmatch '\.(png|jpg|jpeg|gif|svg|mp3|mp4|exe|dll|ico|lock)$'
}

$totalLines = 0
foreach ($file in $files) {
    try {
        $lines = (Get-Content $file.FullName | Measure-Object -Line).Lines
        $totalLines += $lines
    } catch {}
}

Write-Host "==============================="
Write-Host " TOTAL FILES : $($files.Count)"
Write-Host " TOTAL LINES : $totalLines"
Write-Host "==============================="
