Write-Output "一鍵下載PHPCIIS離線版，依照網路速度不同約需要5-10分鐘"
do {
	$choice = Read-Host "是否開始下載? (Y/N)"
		if ($choice -eq "Y" -or $choice -eq "y") {
		$onedriveUrl1 = "https://onedrive.live.com/download?cid=8614C09CCA60D67B&resid=8614C09CCA60D67B%211474&authkey=%21AEDqpOImUyw7qcA"
		$onedriveUrl2 = "https://onedrive.live.com/download?cid=8614C09CCA60D67B&resid=8614C09CCA60D67B%211468&authkey=%21AEDqpOImUyw7qcA"
		$onedriveUrl3 = "https://onedrive.live.com/download?cid=8614C09CCA60D67B&resid=8614C09CCA60D67B%211473&authkey=%21AEDqpOImUyw7qcA"
		$downloadPath1 = "C:\pyoffline\PHPCIIS離線版說明.pptx"
		$downloadPath2 = "C:\pyoffline\py_offline_autoupdate.zip"
		$downloadPath3 = "C:\pyoffline\PY_Offline.zip"
		$extractPath = "C:\pyoffline\" 
		Write-Output "檢查是否有C:\pyoffline\"
		if (-Not (Test-Path -Path $extractPath)) {
			Write-Output "無資料夾，新增C:\pyoffline\"
			New-Item -Path $extractPath -ItemType Directory
			Write-Output "新增完成"
		}
		$arr1 = @($onedriveUrl1, $onedriveUrl3 , $onedriveUrl4)
		$arr2 = @($downloadPath1, $downloadPath3 , $downloadPath4)
		Write-Output "開始下載作業"
		for ($i = 0; $i -lt 3; $i++) {
			if (-Not (Test-Path -Path (Split-Path $arr2[$i]))) {
				New-Item -Path (Split-Path $arr2[$i]) -ItemType Directory
			}
			Write-Output $arr2[$i]
			$webClient.DownloadFile($arr1[$i],$arr2[$i])
			Write-Output "下載完成"
			if ($i -ne 0) {
				Write-Output "開始解壓縮"
				Add-Type -AssemblyName System.IO.Compression.FileSystem
				[System.IO.Compression.ZipFile]::ExtractToDirectory($arr2[$i], $extractPath)
				Write-Output "解壓縮完成"
				Remove-Item $arr2[$i] -Force
				Write-Output "移除壓縮檔"
			}
		}
		Write-Output "下載作業與解壓縮完成"
		Write-Output "需要與衛生局申請reg.key檔案以開啟離線版"
		Write-Output "請開啟PY_Offline_starter以進行更新程式碼作業"
		Write-Output "建議閱讀PHPCIIS離線版說明"
		$choice = Read-Host "是否增加到桌面成為捷徑? (Y/N)"
		do {
			if ($choice -eq "Y" -or $choice -eq "y") {
				$fileToAdd = "C:\pyoffline\PY_Offline_starter.exe"
				$desktopPath = [Environment]::GetFolderPath('Desktop')
				$shell = New-Object -ComObject WScript.Shell
				$shortcut = $shell.CreateShortcut("$desktopPath\Shortcut.lnk")
				$shortcut.TargetPath = $fileToAdd
				$shortcut.Description = "PHPCIIS離線版"
				$shortcut.Save()
			}
		} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")
		do {
			$choice = Read-Host "是否打開下載資料夾? (Y/N)"
			if ($choice -eq "Y" -or $choice -eq "y") {
				Invoke-Item $extractPath
			}
		} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")
	} 
} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")
Read-Host "輸入任意鍵以結束"
exit


