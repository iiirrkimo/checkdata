Write-Output "�@��U��PHPCIIS���u���A����:1130629"
Write-Output "�̷Ӻ����t�פ��P���ݭn5-10����"
do {
	$choice = Read-Host "�O�_�}�l�U�����u��? (Y/N)"
	if ($choice -eq "Y" -or $choice -eq "y") {
		$webClient = New-Object System.Net.WebClient
		$onedriveUrl1 = "https://onedrive.live.com/download?cid=8614C09CCA60D67B&resid=8614C09CCA60D67B%211474&authkey=%21AEDqpOImUyw7qcA"
		$onedriveUrl2 = "https://onedrive.live.com/download?cid=8614C09CCA60D67B&resid=8614C09CCA60D67B%211468&authkey=%21AEDqpOImUyw7qcA"
		$onedriveUrl3 = "https://onedrive.live.com/download?cid=8614C09CCA60D67B&resid=8614C09CCA60D67B%211473&authkey=%21AEDqpOImUyw7qcA"
		$downloadPath1 = "C:\pyoffline\PHPCIIS���u������.pptx"
		$downloadPath2 = "C:\pyoffline\py_offline_autoupdate.zip"
		$downloadPath3 = "C:\pyoffline\PY_Offline.zip"
		$extractPath = "C:\pyoffline\" 
		$tempPath = "C:\pyoffline\temp\" 
		Write-Output "�ˬd�O�_��C:\pyoffline\"
		if (-Not (Test-Path -Path $extractPath)) {
			Write-Output "�L��Ƨ��A�s�WC:\pyoffline\"
			New-Item -Path $extractPath -ItemType Directory
			Write-Output "�s�W����"
		}
		if (-Not (Test-Path -Path $tempPath)) {
			New-Item -Path $tempPath -ItemType Directory
		}
		$arr1 = @($onedriveUrl1, $onedriveUrl2 , $onedriveUrl3)
		$arr2 = @($downloadPath1, $downloadPath2 , $downloadPath3)
		Write-Output "�}�l�U���@�~"
		for ($i = 0; $i -lt 3; $i++) {
			$targetPath = Split-Path $arr2[$i]
			if (-Not (Test-Path -Path $targetPath)) {
				New-Item -Path $targetPath -ItemType Directory
			}
			Write-Output "�}�l�U��" $arr2[$i]
			$webClient.DownloadFile($arr1[$i],$arr2[$i])
			Write-Output "�U������"
			if ($i -ne 0) {
				Write-Output "�}�l�����Y"
				try {
					Add-Type -AssemblyName System.IO.Compression.FileSystem
					[System.IO.Compression.ZipFile]::ExtractToDirectory($arr2[$i], $tempPath)
					Write-Output "�����Y����"
					Copy-Item -Path "C:\pyoffline\temp\*" -Destination "C:\pyoffline\" -Recurse -Force
					Remove-Item -Path "C:\pyoffline\temp\*" -Recurse -Force
					Remove-Item $arr2[$i] -Force
					Write-Output "�������Y��"
				} catch {
					Write-Output "�����Y���ѡA�Ф�ʸ����Y"
				} 
			}
		}
		Remove-Item -Path $tempPath
		Write-Output "�U���@�~�P�����Y����"
		Write-Output "�ݭn�P�åͧ��ӽ�reg.key�ɮץH�}�����u��"
		Write-Output "�ж}��PY_Offline_starter�H�i���s�{���X�@�~"
		Write-Output "��ĳ�\ŪPHPCIIS���u������"
	} 
} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")
$choice = Read-Host "�O�_�W�[��ୱ�������|? (Y/N)"
do {
	if ($choice -eq "Y" -or $choice -eq "y") {
		$fileToAdd = "C:\pyoffline\PY_Offline_starter.exe"
		$desktopPath = [Environment]::GetFolderPath('Desktop')
		$shell = New-Object -ComObject WScript.Shell
		$shortcut = $shell.CreateShortcut("$desktopPath\PHPCIIS���u��.lnk")
		$shortcut.TargetPath = $fileToAdd
		$shortcut.WorkingDirectory = "C:\pyoffline"
		$shortcut.Description = "PHPCIIS���u��"
		$shortcut.Save()
	}
} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")
		
do {
	$choice = Read-Host "�O�_�]�w�۰ʧ�s? (Y/N)"
	if ($choice -eq "Y" -or $choice -eq "y") {
		$valid = $false
		do {
			$updatetime = Read-Host "�п�J��s�ɶ�? (�榡: HH:mm PM)"
			if ($updatetime -match '^([01]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$') {
				Write-Host "�ɶ��榡���T�C"
				$valid = $true 
			} else {
				Write-Host "�ɶ��榡�����T�A�п�J���Ī��ɶ��榡 (HH:mm PM)�C"
			}
		} until ($valid)
		$TaskName = "OfflineUpdate"
		Write-Host "�ˬd�O�_���u�@�Ƶ{"
		if (Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue) {
			Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
			Write-Host "�R����u�@�Ƶ{"
		}
		$Action = New-ScheduledTaskAction -Execute "C:\pyoffline\py_offline_autoupdate.exe" -WorkingDirectory "C:\pyoffline"
		$Trigger = New-ScheduledTaskTrigger -Daily -At $updatetime 
		Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger
		Write-Host "�s�W�u�@�Ƶ{OfflineUpdate��" $updatetime
	} elseif ($choice -eq "N" -or $choice -eq "n") {
		Write-Host "���۰ʳ]�w�A�Y�n�۰ʧ�s�Ф����ʳ]�w�A�аѦ�PHPCIIS���u�������C"
	} 
} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")
		
do {
	$choice = Read-Host "�O�_���}�U����Ƨ�? (Y/N)"
	if ($choice -eq "Y" -or $choice -eq "y") {
		Invoke-Item $extractPath
	}
} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")
do {
	$choice = Read-Host "�O�_���}PHPCIIS���u������? (Y/N)"
	if ($choice -eq "Y" -or $choice -eq "y") {
		if (Test-Path -Path "C:\pyoffline\PHPCIIS���u������.pptx") {
			Invoke-Item "C:\pyoffline\PHPCIIS���u������.pptx"
		} else {
			Write-Output "�ɮ׿򥢡A�Э��s�U��"
		}
		
	}
} while ($choice -ne "Y" -and $choice -ne "y" -and $choice -ne "N" -and $choice -ne "n")
Write-Host "�Y�N����"
Pause