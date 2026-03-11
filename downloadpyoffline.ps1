Write-Output "一鍵下載PHPCIIS離線版，版本:1130629"
Write-Output "依照網路速度不同約需要5-10分鐘"

$extractPath = "C:\pyoffline\"
$tempPath = "C:\pyoffline\temp\"

do {
    $choice = Read-Host "是否開始下載離線版? (Y/N)"
} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")

if ($choice -eq "Y" -or $choice -eq "y") {
    $webClient = New-Object System.Net.WebClient

    $url1 = "https://nextcloud.fbbhome.com/s/2poQMi6ExwxWxBF/download"
    $url2 = "https://nextcloud.fbbhome.com/s/4etfj95KB9zHsr4/download"
    $url3 = "https://nextcloud.fbbhome.com/s/StA9tE69Z8zEmmt/download"

    $downloadPath1 = "C:\pyoffline\PHPCIIS離線版說明.pptx"
    $downloadPath2 = "C:\pyoffline\py_offline_autoupdate.zip"
    $downloadPath3 = "C:\pyoffline\PY_Offline.zip"

    Write-Output "檢查是否有 C:\pyoffline\"
    if (-not (Test-Path -Path $extractPath)) {
        Write-Output "無資料夾，新增 C:\pyoffline\"
        New-Item -Path $extractPath -ItemType Directory -Force | Out-Null
        Write-Output "新增完成"
    }

    if (-not (Test-Path -Path $tempPath)) {
        New-Item -Path $tempPath -ItemType Directory -Force | Out-Null
    }

    $arr1 = @($url1, $url2, $url3)
    $arr2 = @($downloadPath1, $downloadPath2, $downloadPath3)

    Write-Output "開始下載作業"

    for ($i = 0; $i -lt 3; $i++) {
        $targetPath = Split-Path $arr2[$i] -Parent

        if (-not (Test-Path -Path $targetPath)) {
            New-Item -Path $targetPath -ItemType Directory -Force | Out-Null
        }

        Write-Output "開始下載 $($arr2[$i])"
        $webClient.DownloadFile($arr1[$i], $arr2[$i])
        Write-Output "下載完成"

        if ($i -ne 0) {
            Write-Output "開始解壓縮"
            try {
                if (Test-Path "$tempPath*") {
                    Remove-Item -Path "$tempPath*" -Recurse -Force -ErrorAction SilentlyContinue
                }

                Add-Type -AssemblyName System.IO.Compression.FileSystem
                [System.IO.Compression.ZipFile]::ExtractToDirectory($arr2[$i], $tempPath)

                Write-Output "解壓縮完成"
                Copy-Item -Path "$tempPath*" -Destination $extractPath -Recurse -Force
                Remove-Item -Path "$tempPath*" -Recurse -Force -ErrorAction SilentlyContinue
                Remove-Item -Path $arr2[$i] -Force -ErrorAction SilentlyContinue
                Write-Output "移除壓縮檔"
            }
            catch {
                Write-Output "解壓縮失敗，請手動解壓縮"
            }
        }
    }

    Remove-Item -Path $tempPath -Recurse -Force -ErrorAction SilentlyContinue
    Write-Output "下載作業與解壓縮完成"
    Write-Output "需要與衛生局申請 reg.key 檔案以開啟離線版"
    Write-Output "請開啟 PY_Offline_starter 以進行更新程式碼作業"
    Write-Output "建議閱讀 PHPCIIS離線版說明"
}

do {
    $choice = Read-Host "是否增加到桌面成為捷徑? (Y/N)"
} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")

if ($choice -eq "Y" -or $choice -eq "y") {
    $fileToAdd = "C:\pyoffline\PY_Offline_starter.exe"

    if (Test-Path $fileToAdd) {
        $desktopPath = [Environment]::GetFolderPath("Desktop")
        $shell = New-Object -ComObject WScript.Shell
        $shortcut = $shell.CreateShortcut("$desktopPath\PHPCIIS離線版.lnk")
        $shortcut.TargetPath = $fileToAdd
        $shortcut.WorkingDirectory = "C:\pyoffline"
        $shortcut.Description = "PHPCIIS離線版"
        $shortcut.Save()
        Write-Output "桌面捷徑建立完成"
    }
    else {
        Write-Output "找不到 C:\pyoffline\PY_Offline_starter.exe，無法建立捷徑"
    }
}

do {
    $choice = Read-Host "是否設定自動更新? (Y/N)"
} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")

if ($choice -eq "Y" -or $choice -eq "y") {
    $valid = $false

    do {
        $updatetime = Read-Host "請輸入更新時間? (格式: hh:mm AM，例如 08:30 PM)"
        if ($updatetime -match '^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$') {
            Write-Host "時間格式正確。"
            $valid = $true
        }
        else {
            Write-Host "時間格式不正確，請輸入有效格式，例如 08:30 PM"
        }
    } until ($valid)

    $TaskName = "OfflineUpdate"
    Write-Host "檢查是否有工作排程"

    if (Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue) {
        Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
        Write-Host "刪除原工作排程"
    }

    $Action = New-ScheduledTaskAction -Execute "C:\pyoffline\py_offline_autoupdate.exe" -WorkingDirectory "C:\pyoffline"
    $Trigger = New-ScheduledTaskTrigger -Daily -At $updatetime
    Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger | Out-Null

    Write-Host "新增工作排程 OfflineUpdate 於 $updatetime"
}
else {
    Write-Host "不自動設定，若要自動更新請之後手動設定，請參考 PHPCIIS離線版說明。"
}

do {
    $choice = Read-Host "是否打開下載資料夾? (Y/N)"
} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")

if ($choice -eq "Y" -or $choice -eq "y") {
    if (Test-Path $extractPath) {
        Invoke-Item $extractPath
    }
}

do {
    $choice = Read-Host "是否打開PHPCIIS離線版說明? (Y/N)"
} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")

if ($choice -eq "Y" -or $choice -eq "y") {
    $pptPath = "C:\pyoffline\PHPCIIS離線版說明.pptx"
    if (Test-Path -Path $pptPath) {
        Invoke-Item $pptPath
    }
    else {
        Write-Output "檔案遺失，請重新下載"
    }
}

Write-Host "即將關閉"
Pause