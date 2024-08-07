Write-Output "一鍵下載PHPCIIS離線版，版本:1130629"
Write-Output "依照網路速度不同約需要5-10分鐘"
do {
	$choice = Read-Host "是否開始下載離線版? (Y/N)"
	if ($choice -eq "Y" -or $choice -eq "y") {
		$webClient = New-Object System.Net.WebClient
		$onedriveUrl1 = "https://onedrive.live.com/download?cid=8614C09CCA60D67B&resid=8614C09CCA60D67B%211474&authkey=%21AEDqpOImUyw7qcA"
		$onedriveUrl2 = "https://onedrive.live.com/download?cid=8614C09CCA60D67B&resid=8614C09CCA60D67B%211468&authkey=%21AEDqpOImUyw7qcA"
		$onedriveUrl3 = "https://onedrive.live.com/download?cid=8614C09CCA60D67B&resid=8614C09CCA60D67B%211473&authkey=%21AEDqpOImUyw7qcA"
		$downloadPath1 = "C:\pyoffline\PHPCIIS離線版說明.pptx"
		$downloadPath2 = "C:\pyoffline\py_offline_autoupdate.zip"
		$downloadPath3 = "C:\pyoffline\PY_Offline.zip"
		$extractPath = "C:\pyoffline\" 
		$tempPath = "C:\pyoffline\temp\" 
		Write-Output "檢查是否有C:\pyoffline\"
		if (-Not (Test-Path -Path $extractPath)) {
			Write-Output "無資料夾，新增C:\pyoffline\"
			New-Item -Path $extractPath -ItemType Directory
			Write-Output "新增完成"
		}
		if (-Not (Test-Path -Path $tempPath)) {
			New-Item -Path $tempPath -ItemType Directory
		}
		$arr1 = @($onedriveUrl1, $onedriveUrl2 , $onedriveUrl3)
		$arr2 = @($downloadPath1, $downloadPath2 , $downloadPath3)
		Write-Output "開始下載作業"
		for ($i = 0; $i -lt 3; $i++) {
			$targetPath = Split-Path $arr2[$i]
			if (-Not (Test-Path -Path $targetPath)) {
				New-Item -Path $targetPath -ItemType Directory
			}
			Write-Output "開始下載" $arr2[$i]
			$webClient.DownloadFile($arr1[$i],$arr2[$i])
			Write-Output "下載完成"
			if ($i -ne 0) {
				Write-Output "開始解壓縮"
				try {
					Add-Type -AssemblyName System.IO.Compression.FileSystem
					[System.IO.Compression.ZipFile]::ExtractToDirectory($arr2[$i], $tempPath)
					Write-Output "解壓縮完成"
					Copy-Item -Path "C:\pyoffline\temp\*" -Destination "C:\pyoffline\" -Recurse -Force
					Remove-Item -Path "C:\pyoffline\temp\*" -Recurse -Force
					Remove-Item $arr2[$i] -Force
					Write-Output "移除壓縮檔"
				} catch {
					Write-Output "解壓縮失敗，請手動解壓縮"
				} 
			}
		}
		Remove-Item -Path $tempPath
		Write-Output "下載作業與解壓縮完成"
		Write-Output "需要與衛生局申請reg.key檔案以開啟離線版"
		Write-Output "請開啟PY_Offline_starter以進行更新程式碼作業"
		Write-Output "建議閱讀PHPCIIS離線版說明"
	} 
} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")
$choice = Read-Host "是否增加到桌面成為捷徑? (Y/N)"
do {
	if ($choice -eq "Y" -or $choice -eq "y") {
		$fileToAdd = "C:\pyoffline\PY_Offline_starter.exe"
		$desktopPath = [Environment]::GetFolderPath('Desktop')
		$shell = New-Object -ComObject WScript.Shell
		$shortcut = $shell.CreateShortcut("$desktopPath\PHPCIIS離線版.lnk")
		$shortcut.TargetPath = $fileToAdd
		$shortcut.WorkingDirectory = "C:\pyoffline"
		$shortcut.Description = "PHPCIIS離線版"
		$shortcut.Save()
	}
} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")
		
do {
	$choice = Read-Host "是否設定自動更新? (Y/N)"
	if ($choice -eq "Y" -or $choice -eq "y") {
		$valid = $false
		do {
			$updatetime = Read-Host "請輸入更新時間? (格式: HH:mm PM)"
			if ($updatetime -match '^([01]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$') {
				Write-Host "時間格式正確。"
				$valid = $true 
			} else {
				Write-Host "時間格式不正確，請輸入有效的時間格式 (HH:mm PM)。"
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
		Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger
		Write-Host "新增工作排程OfflineUpdate於" $updatetime
	} elseif ($choice -eq "N" -or $choice -eq "n") {
		Write-Host "不自動設定，若要自動更新請之後手動設定，請參考PHPCIIS離線版說明。"
	} 
} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")
		
do {
	$choice = Read-Host "是否打開下載資料夾? (Y/N)"
	if ($choice -eq "Y" -or $choice -eq "y") {
		Invoke-Item $extractPath
	}
} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")
do {
	$choice = Read-Host "是否打開PHPCIIS離線版說明? (Y/N)"
	if ($choice -eq "Y" -or $choice -eq "y") {
		if (Test-Path -Path "C:\pyoffline\PHPCIIS離線版說明.pptx") {
			Invoke-Item "C:\pyoffline\PHPCIIS離線版說明.pptx"
		} else {
			Write-Output "檔案遺失，請重新下載"
		}
		
	}
} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")
Write-Host "即將關閉"
Pause