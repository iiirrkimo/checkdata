#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
VER:="1130829_2"
;~ ExtractText(result, "20240807-2_T1_K113F00947_總檔.pdf")
;~ IfExist, result_農.txt
;~ {
	;~ FileDelete, result_農.txt
;~ }
;~ FileAppend, %result%, result_農.txt


;~ aaa:={}
;~ aaa["abc"]:="ABC"
;~ aaa["bbb"]:="BBB"
;~ aaas:=JsonDump(aaa)
;~ FileAppend, %aaas%, aaas.txt
FileRead, method, method.json
jmethod:=JsonParse(method)
;~ jmethods:=JsonDump(jmethod)
;~ IfExist,  dump.txt
	;~ FileDelete,  dump.txt
;~ FileAppend, %jmethods%, dump.txt

gui, main: font, s15 cBlack, 微軟正黑體
gui, main: show, xcenter ycenter w680 h640, % "Fang_LAB_" . ver
xx=5
yy=5

gui, main: add,text, x%xx% y%yy% w80 h30 center gre , 選擇模式
xx+=80
gui, main: font, s13 cBlack, 微軟正黑體
gui, main: add, dropdownlist, x%xx% y%yy% w500 h30 r10 vMode gselectmode, 
for key in jmethod
{
	if (key!="generaltitle" && key!="pesticide_LOQ"){
		guicontrol, main:, mode, % key
	}
}

guicontrol, main:choose, mode, 1
gui, main: font, s15 cBlack, 微軟正黑體
yy+=30
xx=5
gui, main: add,button, x%xx% y%yy% w80 h30 Disabled vfile1 gfile1, 文件一
xx+=80
gui, main: add,edit, x%xx% y%yy% w500 h30 Disabled vfilepath1, 
;~ yy+=30
;~ xx=5
;~ gui, main: add,button, x%xx% y%yy% w80 h30 Disabled vfile2 gfile2, 文件二
;~ xx+=80
;~ gui, main: add,edit, x%xx% y%yy% w500 h30 Disabled vfilepath2, 
xx+=500
yy-=30
gui, main: add,button, x%xx% y%yy% w90 h60 gtrall, 開始`n轉換
yy+=60
xx=5
gui, main: font, s15 cBlue, 微軟正黑體
gui, main: add,text, x%xx% y%yy% w480 h30, 勾選項目為查核樣品
gui, main: font, s15 cBlack, 微軟正黑體
xx+=490
gui, main: add,button, x%xx% y%yy% w90 h30 gselectall, 全部選擇
xx+=90
gui, main: add,button, x%xx% y%yy% w90 h30 gselectpreload, 選擇預設
yy+=30
xx=5
gui, main: font, s13 cBlack, 微軟正黑體
gui, main: add,ListView, x%xx% y%yy% w670 h180 vlist_abr Checked, 編號|康胖|A|B|R
gui, main: font, s15 cBlack, 微軟正黑體
yy+=180
xx=5
gui, main: add,text, x%xx% y%yy% w70 h30 center, 種類
xx+=70
gui, main: add,text, x%xx% y%yy% w70 h30 center , 編號
xx+=70
gui, main: add,text, x%xx% y%yy% w460 h30  center, 樣品
xx+=460
gui, main: add,text, x%xx% y%yy% w70 h30  center, 濃度
yy+=30
xx=5
gui, main: font, s13 cBlack, 微軟正黑體
gui, main: add, dropdownlist, x%xx% y%yy% w100 h30 r10 vGSam1 Disabled gGSam1, STD|ICV|CCV|BK|SPK|DUP|TEST|D_CCV|D_BK|D_SPK|D_DUP|D_TEST
xx+=100
gui, main: add, dropdownlist, x%xx% y%yy% w70 h30 r10 vGSam2 Disabled gGSam2, 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20
xx+=70
gui, main: add, dropdownlist, x%xx% y%yy% w430 h30 r10 vGSam3 AltSubmit Disabled, 
xx+=430
gui, main: font, s15 cBlack, 微軟正黑體
gui, main: add, Edit, x%xx% y%yy% w70 h30 vGSam4 center Disabled, 

yy+=30
xx=5
gui, main: add,text, x%xx% y%yy% w70 h30 center, 重量
xx+=70
gui, main: add,Edit, x%xx% y%yy% w70 h30 center vGSam5 Disabled, 
xx+=70
gui, main: add,text, x%xx% y%yy% w70 h30 center, 體積
xx+=70
gui, main: add,Edit, x%xx% y%yy% w70 h30 center vGSam6 Disabled, 
xx+=70
gui, main: add,text, x%xx% y%yy% w70 h30 center , 稀釋
xx+=70
gui, main: add,Edit, x%xx% y%yy% w70 h30  center vGSam7 Disabled,
xx+=70
gui, main: add,text, x%xx% y%yy% w70 h30  center, 分類
xx+=70
gui, main: add,dropdownlist, x%xx% y%yy% w70 h30  center vGSam8 Disabled r10 choose1, I|II|III
yy+=30
xx=5
gui, main: add,text, x%xx% y%yy% w70 h30 center , 說明
xx+=70
gui, main: add,Edit, x%xx% y%yy% w490 h30 vGSam9 Disabled, 
xx+=490
yy-=30
gui, main: add,button, x%xx% y%yy% w110 h60 Disabled vADDsample gAddsample, 新增
yy+=60
xx=5
gui, main: font, s13 cBlack, 微軟正黑體
gui, main: add,ListView, x%xx% y%yy% w670 h180 vlist_sample AltSubmit glist_sample,  種類|編號|檢體|濃度|重量|體積|稀釋|分類|說明
gui, main: font, s15 cBlack, 微軟正黑體
yy+=180
yyy:=yy+3
xx=5
gui, main: add,TEXT, x%xx% y%yyy% w40 h60 center cred, 合`n計
xx=40
gui, main: add,TEXT, x%xx% y%yy% w50 h30 center, STD:
xx+=50
gui, main: add,TEXT, x%xx% y%yy% w30 h30 center cblue vcountSTD, 0
xx+=30
gui, main: add,TEXT, x%xx% y%yy% w50 h30 center, ICV:
xx+=50
gui, main: add,TEXT, x%xx% y%yy% w30 h30 center cblue vcountICV, 0
xx+=30
gui, main: add,TEXT, x%xx% y%yy% w50 h30 center, CCV:
xx+=50
gui, main: add,TEXT, x%xx% y%yy% w30 h30 center cblue vcountCCV, 0
xx+=30
gui, main: add,TEXT, x%xx% y%yy% w50 h30 center, BK:
xx+=50
gui, main: add,TEXT, x%xx% y%yy% w30 h30 center cblue vcountBK, 0
xx+=30
yy+=30
xx=40
gui, main: add,TEXT, x%xx% y%yy% w50 h30 center, SPK:
xx+=50
gui, main: add,TEXT, x%xx% y%yy% w30 h30 center cblue vcountSPK, 0
xx+=30
gui, main: add,TEXT, x%xx% y%yy% w50 h30 center, DUP:
xx+=50
gui, main: add,TEXT, x%xx% y%yy% w30 h30 center cblue vcountDUP, 0
xx+=30
gui, main: add,TEXT, x%xx% y%yy% w50 h30 center, TEST:
xx+=50
gui, main: add,TEXT, x%xx% y%yy% w30 h30 center cblue vcountTEST, 0
yy-=30
xx+=30
xx+=85
gui, main: add,button, x%xx% y%yy% w100 h60 Disabled vimpTXT gimpTXT, 匯入`nTXT
xx+=105
gui, main: add,button, x%xx% y%yy% w100 h60 Disabled vexpTXT gexpTXT, 匯出`nTXT
xx+=105
gui, main: add,button, x%xx% y%yy% w100 h60 Disabled  vtransexcel gtransexcel , 轉換`nEXCEL
;~ yy+=65
;~ xx=5
;~ gui, main: add,edit, x%xx% y%yy% w330 h155 verrmsg1, 
;~ xx+=340
;~ gui, main: add,edit, x%xx% y%yy% w330 h155 verrmsg2, 


menu, samplemenu, add, 修改檢體
menu, samplemenu, add, 刪除檢體

addsamplewindow()


gosub, selectmode
return

test:
posi:=checknuminsmaple("blank",jres)
MsgBox % posi
return

impTXT:
FileSelectFile, inputtxt, 1 , %A_ScriptDir% , ,*.TXT
if (ErrorLevel=0){
	fileread, inputtxts, %inputtxt%
	jimptxt:=JsonParse(inputtxts)
	gui,main:default
	gui,main:listview, list_sample
	LV_Delete()
	loop, % jimptxt.MaxIndex()
	{
		LV_add("",jimptxt[A_index][1],jimptxt[A_index][2],jimptxt[A_index][3],jimptxt[A_index][4],jimptxt[A_index][5],jimptxt[A_index][6],jimptxt[A_index][7],jimptxt[A_index][8],jimptxt[A_index][9])
	}
	loop, 9
	{
		LV_ModifyCol(A_index, "AutoHdr")
	}
	gosub, countsample
} else {
	msgbox, 4096, 錯誤, 無選擇檔案
}
return

expTXT:
gui,main:default
gui,main:listview, list_sample
totalrow:=LV_GetCount()
txtobj:=[]
loop, % totalrow
{
	currentrow:=A_index
	tempobj:=[]
	loop, 9
	{
		LV_GetText(ctext, currentrow, A_Index)
		tempobj.push(ctext)
	}
	txtobj.push(tempobj)
}
txtobjs:=JsonDump(txtobj)
guicontrolget, mode, main:, mode
filepath:=A_now . "_" . mode . ".txt"
FileAppend, %txtobjs%, %filepath%
run, %filepath%
return

countsample:
gui,main:default
gui,main:listview, list_sample
totalrow:=LV_GetCount()
liststd:=0
listicv:=0
listccv:=0
listbk:=0
listspk:=0
listdup:=0
listtest:=0
loop, % totalrow
{
	LV_GetText(item,A_index,1)
	if (item="STD"){
		liststd+=1
	} else if (item="ICV"){
		listicv+=1
	} else if (item="CCV"){
		listccv+=1
	} else if (item="BK"){
		listbk+=1
	} else if (item="SPK"){
		listspk+=1
	} else if (item="DUP"){
		listdup+=1
	} else if (item="TEST"){
		listtest+=1
	}
}
guicontrol, main:, countSTD, % liststd
guicontrol, main:, countICV, % listicv
guicontrol, main:, countCCV, % listccv
guicontrol, main:, countBK, % listbk
guicontrol, main:, countSPK, % listspk
guicontrol, main:, countDUP, % listdup
guicontrol, main:, countTEST, % listtest
return

list_sample:
gui,main:default
gui,main:listview, list_sample
currentrow:=A_EventInfo
if (A_GuiEvent = "DoubleClick"){
	LV_GetText(aaa, currentrow,1)
	if (aaa!="種類"){
		gosub, 修改檢體
		
	}
} else if (A_GuiEvent = "rightClick"){
	LV_GetText(aaa, currentrow,1)
	if (aaa!="種類"){
		menu, samplemenu, show
	}
}

return

修改檢體:
;~ 帶入
gui,main:default
gui,main:listview, list_sample
loop, 9
{
	if (A_index>=1 && A_index<=3){
		GuiControl,sample:Choose,gsam%A_Index%,0
	} else if (A_index=8){
		GuiControl,sample:Choose,gsam%A_Index%,0
	} else {
		GuiControl,sample:,gsam%A_Index%,
	}
	guicontrol,sample:Disable,gsam%A_Index%
	LV_GetText(csample%A_index%,currentrow,A_index)
	if (csample%A_index%!="N/A"){
		if (A_index>=3){
			guicontrol,sample:enable,gsam%A_Index%
		}
		if (A_index>=1 && A_index<=3){
			GuiControl,sample:ChooseString,gsam%A_Index%,% csample%A_index%
		} else if (A_index=8){
			GuiControl,sample:ChooseString,gsam%A_Index%,% csample%A_index%
		} else {
			GuiControl,sample:,gsam%A_Index%,% csample%A_index%
		}
		
	}
	
}
gui,sample:show
return
editsample:
errmsg:=""
gonext:=True
loop,9
{
	GuiControlGet,GSam%A_Index%,sample:,gsam%A_Index%
	GuiControlget, GSam%A_index%_enable, sample:Enabled, gsam%A_index%
	if (GSam%A_index%="N/A"){
		gonext:=false
		errmsg:= errmsg . "不可手動輸入N/A`n"
	}
	if (A_index>=4 && A_index <=7){
		if (GSam%A_index%_enable=1){
			if (GSam%A_index%*1 > 0 || GSam%A_index%_enable=0){
			} else {
				gonext:=false
				erritem:={}
				erritem[4]:="濃度"
				erritem[5]:="重量"
				erritem[6]:="體積"
				erritem[7]:="稀釋"
				erritem[8]:="內標"
				errmsg:= errmsg . erritem[A_index] . "須為>0的數值`n"
			}
		} else {
			GSam%A_index%:="N/A"
		}
	} else if (A_index =9){
		if (GSam%A_index%_enable=0){
			GSam%A_index%:="N/A"
		}
	}
	
	
}

if (gonext){
	gui, main:default
	gui, main:listview, list_sample
	loop,9
	{
		if (A_index=2){
			if (GSam%A_index%=0){
				LV_Modify(currentrow,"Col" . A_Index, "N/A")
			}
		} else if (A_index=3){
			LV_Modify(currentrow,"Col" . A_Index, jres.sample[GSam3].samplename)
			
		} else {
			LV_Modify(currentrow,"Col" . A_Index,GSam%A_index%)
		}
	}
	
	gui,sample:hide
	loop, 9
	{
		LV_ModifyCol(A_index, "AutoHdr")
	}
	gosub, countsample
} else {
	MsgBox, 4096, 錯誤,% errmsg
}
return

刪除檢體:
gui,main:default
gui,main:listview, list_sample
LV_delete(currentrow)
return

mainguiclose:
msgbox, 4100, 確認, 是否關閉
IfMsgBox, yes
{
	ExitApp
}
return

transexcel:
errmsg:=""
guicontrolget,countSTD, main:, countSTD
guicontrolget,countICV, main:, countICV
guicontrolget,countCCV, main:, countCCV
guicontrolget,countBK, main:, countBK
guicontrolget,countSPK, main:, countSPK
guicontrolget,countDUP, main:, countDUP
guicontrolget,countTEST, main:, countTEST
if (countSTD<5){
	errmsg:=errmsg . "STD數量需>=5`n"
} 
if (countICV!=1){
	errmsg:=errmsg . "ICV數量需=1`n"
} 
if (countCCV!=2){
	errmsg:=errmsg . "CCV數量需=2`n"
} 
if (countBK!=1){
	errmsg:=errmsg . "Blank數量需=1`n"
} 
if (countSPK!=1){
	errmsg:=errmsg . "Spike數量需=1`n"
} 
if (countDUP!=1){
	errmsg:=errmsg . "Duplicate數量需=1`n"
} 
if (countTEST<1){
	errmsg:=errmsg . "TEST數量需>=1`n"
}
if (errmsg=""){

	guicontrolget, mode, main:, mode
	gui, main:default
	gui, main:listview, list_abr
	listcompoundcount:=LV_GetCount()

	gui, main:default
	gui, main:listview, list_sample
	listsamplecount:=LV_GetCount()
	if (samcount=0 || listcompoundcount=0){
		msgbox,4096,錯誤, 無檢體
	} else {
		oupt:={}
		oupt["yabr"]:={}
		oupt["yabr"]["order"]:={}
		oupt["SPKcompound"]:={}
		oupt["SPKcompound"]["order"]:={}
		oupt["SPKcompound"]["list"]:=[]
		sam_STD:={}
		sam_ICV:={}
		sam_CCV:={}
		sam_BK:={}
		sam_SPK:={}
		sam_DUP:={}
		sam_TEST:={}
		sam_D_CCV:={}
		sam_D_BK:={}
		sam_D_SPK:={}
		sam_D_DUP:={}
		sam_D_TEST:={}
		gui, main:default
		gui, main:listview, list_abr
		
		loop, % listcompoundcount
		{
			LV_GetText(Y1,A_Index,1)
			LV_GetText(Y2,A_Index,2)
			LV_GetText(Y3,A_Index,3)
			LV_GetText(Y4,A_Index,4)
			LV_GetText(Y5,A_Index,5)
			oupt["yabr"]["order"][Y1]:=Y2
			oupt["yabr"][Y2]:={}
			oupt["yabr"][Y2]["a"]:=Y3
			oupt["yabr"][Y2]["b"]:=Y4
			oupt["yabr"][Y2]["r"]:=Y5
		}
		SS=0
		compoundcheckcount:=0
		loop, % listcompoundcount
		{
			SS:=LV_GetNext(ss, "c")
			if (SS!=0){
				compoundcheckcount+=1
				LV_GetText(CC2,SS,2)
				oupt["SPKcompound"]["order"][compoundcheckcount]:=CC2
				oupt["SPKcompound"]["list"].push(CC2)
			} else {
				break
			}
		}
		gui, main:default
		gui, main:listview, list_sample
		loop, % listsamplecount
		{
			samplerow:=A_Index
			tempsample:={}
			loop, 9
			{
				LV_GetText(C%A_index%,samplerow,A_index)
				
			}
			if (C2="N/A"){
				C2=1
			}
			tempsample["type"]:=c1
			tempsample["num"]:=c2
			tempsample["sample"]:=C3
			tempsample["conc"]:=C4
			tempsample["weight"]:=C5
			tempsample["volume"]:=C6
			tempsample["dilute"]:=C7
			tempsample["is"]:=C8
			tempsample["remark"]:=C9
			sam_%C1%[C2]:=tempsample
			oupt[C1]:=sam_%C1%
		}
		;~ jmethods:=JsonDump(oupt)
		;~ Clipboard:=jmethods
		;~ MsgBox oupt
		if (jmethod[mode]["mode"]="pesticide"){
			;~ oupts:=JsonDump(oupt)
			;~ Clipboard:=oupts
			;~ msgbox pesticide
			rep:=generatefromobj_pesticide(oupt,jres,jmethod)
			Clipboard:=rep
		} else {
			rep:=generatefromobj(oupt,jres,jmethod)
			Clipboard:=rep
		}
		
		LAB0 := ComObjCreate("Excel.Application")
		LAB0.Visible := true
		xlspath = %A_ScriptDir%\Fanglab.xlsm
		SplitPath, xlspath, xlsFile
		LAB01:=LAB0.Workbooks.Open(xlspath)
		LAB01.sheets("檢量線").Range("A:I").clear
		LAB01.sheets("檢量線").Range("A1:A1").PasteSpecial
		msgbox,4096, 完成,  完成
	}
} else {
	msgbox,4096,錯誤, % errmsg
}
return
generatefromobj_pesticide(js,jres,jmethod){
	abnormalmsg:=""
	guicontrolget, mode, main:, mode
	mgt:=jmethod["generaltitle"]
	rep:=""
	rep:=rep . "一、品管檢量線製作：`n"
	thisgt:=jmethod[mode]["titles"]["STD"]
	defaultlist:=jmethod[mode]["defaultlist"]
	for com, item in js["yabr"]
	{
		if (com!="TPP" && com!="order"){
			if (item["r"]<0.99){
				abnormalmsg:=abnormalmsg . "品管檢量線`tr<0.99`t" . com . "`tr=" . item["r"] . "`n"
			}
		}
	}
	loop, % defaultlist.MaxIndex()
	{
		compound:=A_Index
		comp:=defaultlist[A_Index]
		
		loop, % thisgt.MaxIndex()
		{
			row:=A_index
			rowtype:=jmethod[mode]["titles"]["STD"][row]
			loop, % js.STD.MaxIndex()
			{
				column:=A_index
				
				if (rowtype="STD_comp"){
					if (column=1){
						rep:=rep . compound . "." . comp . "`t"
					} 
					rep:=rep . "STD" . column . "`t"
				} else if (rowtype="STD_conc"){
					if (column=1){
						rep:=rep . "濃度(" . jmethod[mode]["unit"] . ")`t"
					} 
					rep:=rep . round(js["STD"][column]["conc"],3) . "`t"
				} else if (rowtype="STD_ana"){
					if (column=1){
						rep:=rep . "Ana Peak`t"
					} 
					posi:=checknuminsmaple(js["STD"][column]["sample"],jres)
					rep:=rep . jres.sample[posi][comp]["peakarea"] . "`t"
				} else if (rowtype="STD_yaxb"){
					if (column=1){
						rep:=rep . "y=ax+b"
					} 
				} else if (rowtype="STD_r"){
					if (column=1){
						rep:=rep . "相關系數r=`t" . js["yabr"][comp]["r"] . "`t斜率(a)=`t" . js["yabr"][comp]["a"] . "`t截距(b)=`t" . js["yabr"][comp]["b"] . "`n"
						rep:=rep . "`ty = " . js["yabr"][comp]["a"] . " x+ " . js["yabr"][comp]["b"]
					} 
				} else {
					if (column=1){
						rep:=rep . "未定義標題" . ")`t"
					} 
					rep:=rep . "未定義公式" . "`t"
				}
			}
			rep:=rep . "`n"
		}
		rep:=rep . "`n`n`n`n`n`n`n`n`n`n"
	}
	rep:=rep . "`n`n二、品管檢量線確認及查核：`n"
	thisgt:=jmethod[mode]["titles"]["ICV"]
	posi:=checknuminsmaple(js["ICV"][1]["sample"],jres)
	ICV_POS:=posi
	loop, % thisgt.MaxIndex()
	{
		mgtkey:=thisgt[A_index]
		thisit:= mgt[mgtkey]
		if (thisit="檢量線確認標準品"){
			rep:=rep . thisit . js["ICV"][1]["type"] . "`t"
		} else if (thisit="標準品濃度" || thisit="分析濃度"){
			rep:=rep . thisit . "(" . jmethod[mode]["unit"] . ")`t"
		} else {
			rep:=rep . thisit . "`t"
		}
	}
	rep:=rep . "`n"
	loop, % defaultlist.MaxIndex()
	{
		comp:=defaultlist[A_Index]
		sample_conc:=js["ICV"][1]["conc"]
		area:=jres.sample[posi][comp]["peakarea"]
		calc_conc:=jres.sample[posi][comp]["conc"]
		RR:=(calc_conc-sample_conc)/sample_conc*100
		RT:=jres.sample[posi][comp]["analyteRT"] 
		RT25_1:=RT*1.025
		RT25_2:=RT*0.975
		row:=A_Index
		if (RR>20 || RR<-20){
			abnormalmsg:=abnormalmsg . "品管ICV`tRR>+-20%`t" . comp . "`tRR=" . RR . "%`n"
		}
		loop, % thisgt.MaxIndex()
		{
			column:=A_index
			columntype:=jmethod[mode]["titles"]["ICV"][column]
			
			if (columntype="comp_ICV"){
				rep:=rep . comp . "`t"
			} else if (columntype="sample_conc"){
				rep:=rep . stavalue(sample_conc) . "`t"
			} else if (columntype="area"){
				rep:=rep . area . "`t"
			} else if (columntype="calc_conc"){
				rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="RR"){
				rep:=rep . stavalue(round(RR,jmethod[mode]["percentdigit"]) . "%" ) . "`t"
			} else if (columntype="RT"){
				rep:=rep . RT . "`t"
			} else if (columntype="RT25"){
				rep:=rep . stavalue(round(RT25_1,jmethod[mode]["percentdigit"])) . "`t" . stavalue(round(RT25_2,jmethod[mode]["percentdigit"])) . "`t"
			} else {
				rep:=rep . "未定義公式" . "`t"
			}
			
		}
		rep:=rep . "`n"
	}
	loop, % js.CCV.MaxIndex()
	{
		currentsample:=A_Index
		thisgt:=jmethod[mode]["titles"]["CCV"]
		loop, % thisgt.MaxIndex(){
			mgtkey:=thisgt[A_index]
			thisit:= mgt[mgtkey]
			if (thisit="檢量線查核標準品"){
				rep:=rep . thisit . js["CCV"][currentsample]["type"] . currentsample . "`t"
			} else if (thisit="標準品濃度" || thisit="分析濃度"){
				rep:=rep . thisit . "(" . jmethod[mode]["unit"] . ")`t"
			} else {
				rep:=rep . thisit . "`t"
			}
		}
		rep:=rep . "`n"
		posi:=checknuminsmaple(js["CCV"][currentsample]["sample"],jres)
		loop, % defaultlist.MaxIndex()
		{
			comp:=defaultlist[A_Index]
			sample_conc:=js["CCV"][currentsample]["conc"]
			area:=jres.sample[posi][comp]["peakarea"]
			calc_conc:=jres.sample[posi][comp]["conc"]
			RR:=(calc_conc-sample_conc)/sample_conc*100
			RT:=jres.sample[posi][comp]["analyteRT"] 
			RT25_1:=RT*1.025
			RT25_2:=RT*0.975
			
			if (RR>20 || RR<-20){
				abnormalmsg:=abnormalmsg . "品管CCV" . currentsample . "`tRR>+-20%`t" . comp . "`tRR=" . RR . "%`n"
			}
			
			loop, % thisgt.MaxIndex()
			{
				column:=A_index
				columntype:=jmethod[mode]["titles"]["CCV"][column]
				
				if (columntype="comp_CCV"){
					rep:=rep . comp . "`t"
				} else if (columntype="sample_conc"){
					rep:=rep . round(sample_conc,jmethod[mode]["digit"]) . "`t"
				} else if (columntype="area"){
					rep:=rep . area . "`t"
				} else if (columntype="calc_conc"){
					rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="RR"){
					rep:=rep . stavalue(round(RR,jmethod[mode]["percentdigit"]) . "%") . "`t"
				} else if (columntype="RT"){
					rep:=rep . stavalue(round(RT,jmethod[mode]["percentdigit"])) . "`t"
				} else if (columntype="RT25"){
					rep:=rep . stavalue(round(RT25_1,jmethod[mode]["percentdigit"])) . "`t" . stavalue(round(RT25_2,jmethod[mode]["percentdigit"])) . "`t"
				} else {
					rep:=rep . "未定義公式" . "`t"
				}
				
			}
			rep:=rep . "`n"
		}
	}
	rep:=rep . "`n"
	rep:=rep . "三、品管空白樣品分析：`n"
	thisgt:=jmethod[mode]["titles"]["BK"]
	loop, % thisgt.MaxIndex(){
		mgtkey:=thisgt[A_index]
		thisit:= mgt[mgtkey]
		if (thisit="標準品濃度" || thisit="分析濃度"){
			rep:=rep . thisit . jmethod[mode]["unit"] . "`t"
		} else if (thisit="檢體濃度"){
			rep:=rep . thisit . jmethod[mode]["unitPP"] . "`t"
		} else if (thisit="LOQ"){
			rep:=rep . thisit . jmethod[mode]["unitPP"] . "`t"
		} else {
			rep:=rep . thisit . "`t"
		}
	}
	rep:=rep . "`n"
	posi:=checknuminsmaple(js["BK"][1]["sample"],jres)
	loop, % defaultlist.MaxIndex()
	{
		comp:=defaultlist[A_Index]
		sample_name:=js["BK"][1]["remark"]
		weight:=js["BK"][1]["weight"]
		volume:=js["BK"][1]["volume"]
		area:=jres.sample[posi][comp]["peakarea"]
		calc_conc:=jres.sample[posi][comp]["conc"]
		calc_PP:=calc_conc*volume/weight*jmethod[mode]["CR_PP"]
		LQ_mode:=js["BK"][1]["is"]
		LQ:=jmethod["pesticide_LOQ"][comp][LQ_mode]

		loop, % thisgt.MaxIndex()
		{
			column:=A_index
			columntype:=jmethod[mode]["titles"]["BK"][column]
			
			if (columntype="comp_BK"){
				rep:=rep . comp . "`t"
			} else if (columntype="sample_name"){
				rep:=rep . sample_name . "`t"
			} else if (columntype="weight"){
				rep:=rep . weight . "`t"
			} else if (columntype="volume"){
				rep:=rep . volume . "`t"
			} else if (columntype="area"){
				if (area=""){
					rep:=rep . "N.D." . "`t"
				} else {
					if (calc_pp<LQ){
						rep:=rep . "N.D." . "`t"
					} else {
						rep:=rep . area . "`t"
					}
				}
			} else if (columntype="calc_conc"){
				if (area=""){
					rep:=rep . "N.D." . "`t"
				} else {
					if (calc_pp<LQ){
						rep:=rep . "N.D." . "`t"
					} else {
						rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
					}	
				}
			} else if (columntype="calc_PP"){
				if (area=""){
					rep:=rep . "N.D." . "`t"
				} else {
					if (calc_pp<LQ){
						rep:=rep . "N.D." . "`t"
					} else {
						rep:=rep . stavalue(round(calc_PP,jmethod[mode]["digit"])) . "`t"
					}	
				}
			} else if (columntype="LOQ"){
				rep:=rep . stavalue(round(LQ,jmethod[mode]["digit"])) . "`t"
			} else {
				rep:=rep . "未定義公式" . "`t"
			}
			
		}
		rep:=rep . "`n"
	}
	rep:=rep . "備註：檢驗結果為「未檢出」時，以N.D.表示。`n`n"
	rep:=rep . "四、品管查核樣品分析：`n"
	posi:=checknuminsmaple(js["SPK"][1]["sample"],jres)
	thisgt:=jmethod[mode]["titles"]["SPK"]
	loop, % thisgt.MaxIndex(){
		mgtkey:=thisgt[A_index]
		thisit:= mgt[mgtkey]
		if (thisit="var_compound"){
			rep:=rep . "分析物 SPK1" . "`t"
		} else if (thisit="取樣重量"){
			rep:=rep . thisit . jmethod[mode]["unitsam"] . "`t"
		} else if (thisit="定容量"){
			rep:=rep . thisit . jmethod[mode]["unitvol"] . "`t"
		} else if (thisit="分析濃度"){
			rep:=rep . thisit . "(" . jmethod[mode]["unit"] . ")`t"
		} else if (thisit="檢體濃度" || thisit="添加濃度" ){
			rep:=rep . thisit . "(" . jmethod[mode]["unitPP"] . ")`t"
		} else {
			rep:=rep . thisit . "`t"
		}
	}
	rep:=rep . "`n"
	loop, % defaultlist.MaxIndex()
	{
		comp:=defaultlist[A_Index]
		sample_name:=js["SPK"][1]["remark"]
		weight:=js["SPK"][1]["weight"]
		volume:=js["SPK"][1]["volume"]
		area:=jres.sample[posi][comp]["peakarea"]
		calc_conc:=jres.sample[posi][comp]["conc"]
		calc_pp:=calc_conc*volume/weight*jmethod[mode]["CR_PP"]
		add_pp:=jmethod[mode]["SPK_conc"]
		recy:=calc_pp/add_pp*100
		if (recy>120 || recy<60){
			abnormalmsg:=abnormalmsg . "品管SPK`t回收>120或<60%`t" . comp . "`t回收率=" . recy . "%`n"
		}
		loop, % thisgt.MaxIndex()
		{
			column:=A_index
			columntype:=jmethod[mode]["titles"]["SPK"][column]
			if (columntype="var_compound"){
				rep:=rep . comp . "`t"
			} else if (columntype="weight"){
				rep:=rep . weight . "`t"
			} else if (columntype="volume"){
				rep:=rep . volume . "`t"
			} else if (columntype="area"){
				rep:=rep . area . "`t"
			} else if (columntype="calc_conc"){
				rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="calc_pp"){
				rep:=rep . stavalue(round(calc_pp,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="add_pp"){
				rep:=rep . add_pp . "`t"
			} else if (columntype="recy"){
				rep:=rep . stavalue(round(recy,jmethod[mode]["percentdigit"]) . "%") . "`t"
			} else if (columntype="Isarea"){
				rep:=rep . Isarea . "`t"
			} else if (columntype="AI_ratio"){
				rep:=rep . stavalue(round(IAratio,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="calc_conc_IS"){
				rep:=rep . stavalue(round(calc_conc_IS,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="calc_pp_IS"){
				rep:=rep . stavalue(round(calc_pp_IS,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="recy_IS"){
				rep:=rep . stavalue(round(recy_IS,jmethod[mode]["percentdigit"]) . "%") . "`t"
			} else {
				rep:=rep . "未定義公式" . "`t"
			}
		}
		rep:=rep . "`n"
	}
	rep:=rep . "`n"
	rep:=rep . "五、品管查核樣品重覆試驗：`n"
	posi_1:=checknuminsmaple(js["SPK"][1]["sample"],jres)
	posi_2:=checknuminsmaple(js["DUP"][1]["sample"],jres)
	thisgt:=jmethod[mode]["titles"]["SPKR"]
	L1:=""
	L2:=""
	loop, % thisgt.MaxIndex(){
		mgtkey:=thisgt[A_index]
		thisit:= mgt[mgtkey]
		if (mgtkey="var_compound"){
			L1:=L1 . "標準品品項" . "`t"
			L2:=L2 . "" . "`t"
		} else if (mgtkey="weight"){
			L1:=L1 . "查核樣品 SPIKE 1" . "`t"
			L2:=L2 . thisit . jmethod[mode]["unitsam"] . "`t"
		} else if (mgtkey="weight_D"){
			L1:=L1 . "查核樣品重複 Duplicate 1" . "`t"
			L2:=L2 . thisit . jmethod[mode]["unitsam"] . "`t"
		} else if (mgtkey="volume" || mgtkey="volume_D" ){
			L1:=L1 . "" . "`t"
			L2:=L2 . thisit . jmethod[mode]["unitvol"] . "`t"
		} else if (mgtkey="area" || mgtkey="area_D" ){
			L1:=L1 . "" . "`t"
			L2:=L2 . thisit . "`t"
		} else if (mgtkey="calc_conc" || mgtkey="calc_conc_D" ){
			L1:=L1 . "" . "`t"
			L2:=L2 . thisit . "(" . jmethod[mode]["unit"] . ")`t"
		} else if (mgtkey="calc_pp" || mgtkey="calc_pp_D" ){
			L1:=L1 . "" . "`t"
			L2:=L2 . thisit . "(" . jmethod[mode]["unitPP"] . ")`t"
		} else if (mgtkey="RRP"){
			L1:=L1 . "相對差異百分比(R)" . "`t"
			L2:=L2 . "" . "`t"
		}else {
			L1:=L1 . "未定義" . "`t"
			L2:=L2 . "未定義" . "`t"
		}
	}
	rep:=rep . L1 . "`n" . L2 . "`n"
	loop, % defaultlist.MaxIndex()
	{
		currentcompound:=defaultlist[A_Index]
		comp:=currentcompound
		weight_1:=js["SPK"][1]["weight"]
		volume_1:=js["SPK"][1]["volume"]
		area_1:=jres.sample[posi_1][comp]["peakarea"]
		calc_conc_1:=jres.sample[posi_1][comp]["conc"]
		calc_pp_1:=calc_conc_1*volume_1/weight_1*jmethod[mode]["CR_PP"]
		add_pp_1:=jmethod[mode]["SPK_conc"]
		

		sample_name_2:=js["DUP"][1]["remark"]
		weight_2:=js["DUP"][1]["weight"]
		volume_2:=js["DUP"][1]["volume"]
		area_2:=jres.sample[posi_2][comp]["peakarea"]
		calc_conc_2:=jres.sample[posi_2][comp]["conc"]
		calc_pp_2:=calc_conc_2*volume_2/weight_2*jmethod[mode]["CR_PP"]
		add_pp_2:=jmethod[mode]["DUP_conc"]
		
		
		ave_pp:=(calc_pp_1+calc_pp_2)/2
		RRP:=abs(calc_pp_1-calc_pp_2)/ave_pp*100
		
		if (RRP>20 || RRP<-20){
			abnormalmsg:=abnormalmsg . "品管SPKDUP`t相對差異百分比>+=20%`t" . comp . "`t相對差異百分比=" . RRP . "%`n"
		}
		
		loop, % thisgt.MaxIndex()
		{
			column:=A_index
			columntype:=jmethod[mode]["titles"]["SPKR"][column]
			if (columntype="var_compound"){
				rep:=rep . currentcompound . "`t"
			} else if (columntype="weight"){
				rep:=rep . weight_1 . "`t"
			} else if (columntype="volume"){
				rep:=rep . volume_1 . "`t"
			} else if (columntype="area"){
				rep:=rep . area_1 . "`t"
			} else if (columntype="calc_conc"){
				rep:=rep . stavalue(round(calc_conc_1,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="calc_pp"){
				rep:=rep . stavalue(round(calc_pp_1,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="add_pp"){
				rep:=rep . add_pp_1 . "`t"
			} else if (columntype="weight_D"){
				rep:=rep . weight_2 . "`t"
			} else if (columntype="volume_D"){
				rep:=rep . volume_2 . "`t"
			} else if (columntype="area_D"){
				rep:=rep . area_2 . "`t"
			} else if (columntype="calc_conc_D"){
				rep:=rep . stavalue(round(calc_conc_2,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="calc_pp_D"){
				rep:=rep . stavalue(round(calc_pp_2,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="add_pp_D"){
				rep:=rep . add_pp_2 . "`t"
			} else if (columntype="ave_pp"){
				rep:=rep . stavalue(round(ave_pp,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="RRP"){
				rep:=rep . stavalue(round(RRP,jmethod[mode]["percentdigit"]) . "%") . "`t"
			} else {
				rep:=rep . "未定義公式" . "`t"
			}
		}
		rep:=rep . "`n"
	}
	rep:=rep . "`n"
	;~ 檢查是否檢出
	poslist:={}
	poslist["poscompoumd"]:={}
	poslist["possample"]:={}
	poslist["dilcompoumd"]:={}
	poslist["dilsample"]:={}
	posmsg:=""
	posmsg2:={}
	loop, % js.TEST.MaxIndex()
	{
		samplenum:=A_index
		samplename:=js["TEST"][A_index]["sample"]
		posi:=checknuminsmaple(samplename,jres)
		LQ_mode:=js["TEST"][A_index]["is"]
		weight:=js["TEST"][A_index]["weight"]
		volume:=js["TEST"][A_index]["volume"]
		remark:=js["TEST"][A_index]["remark"]
		for key, item in jres.sample[posi]
		{
			if (key!="TPP"){
				if (IsObject(item)){
					comp:=key
					LQ:=jmethod["pesticide_LOQ"][comp][LQ_mode]
					if (LQ=""){
						msg:=comp 
						posmsg2[msg]:=msg
					}
					r:=item["r"]
					calc_conc:=item["conc"]
					calc_PP:=item["conc"]*volume/weight*jmethod[mode]["CR_PP"]
					analyteRT:=item["analyteRT"]
					ratioflag:=item["ratioflag"]
					ICVRT:=jres.sample[ICV_POS][comp]["analyteRT"]
					ICVRT1:=ICVRT*1.025
					ICVRT2:=ICVRT*0.975
					gotopos:=true
					if (calc_PP>LQ){
						if (r<0.99){
							posmsg:=posmsg . samplename . "的" .  comp . "的R= " . r . "`n"
							;~ gotopos:=false
						}
						if (ratioflag!="NO"){
							posmsg:=posmsg . samplename . "的" .  comp . "的ratioflag= " . ratioflag . "`n"
							;~ gotopos:=false
						}
						if (analyteRT<ICVRT2 || analyteRT>ICVRT1){
							posmsg:=posmsg . samplename . "的" .  comp . "的analyteRT= " . analyteRT . "，ICV RT為" . ICVRT . " ( " . ICVRT2 . " ~ " . ICVRT1 . " ) `n"
							;~ gotopos:=false
						}
					} else {
						gotopos:=false
					}
					if (gotopos){
						poslist["poscompoumd"][comp]:=comp
						if (comp="3-OH Carbofuran"){
							poslist["poscompoumd"]["3-keto Carbofuran"]:="3-keto Carbofuran"
							poslist["poscompoumd"]["Carbofuran"]:="Carbofuran"
						} else if (comp="3-keto Carbofuran"){
							poslist["poscompoumd"]["3-OH Carbofuran"]:="3-OH Carbofuran"
							poslist["poscompoumd"]["Carbofuran"]:="Carbofuran"
						} else if (comp="Carbofuran"){
							poslist["poscompoumd"]["3-OH Carbofuran"]:="3-OH Carbofuran"
							poslist["poscompoumd"]["3-keto Carbofuran"]:="3-keto Carbofuran"
						}
						if (!IsObject(poslist["possample"][samplename])){
							poslist["possample"][samplename]:={}
						}
						poslist["possample"][samplename][comp]:=comp
						if (comp="3-OH Carbofuran"){
							poslist["possample"][samplename]["3-keto Carbofuran"]:="3-keto Carbofuran"
							poslist["possample"][samplename]["Carbofuran"]:="Carbofuran"
						} else if (comp="3-keto Carbofuran"){
							poslist["possample"][samplename]["3-OH Carbofuran"]:="3-OH Carbofuran"
							poslist["possample"][samplename]["Carbofuran"]:="Carbofuran"
						} else if (comp="Carbofuran"){
							poslist["possample"][samplename]["3-OH Carbofuran"]:="3-OH Carbofuran"
							poslist["possample"][samplename]["3-keto Carbofuran"]:="3-keto Carbofuran"
						}
						if (calc_conc>=80){
							poslist["dilcompoumd"][comp]:=comp
							if (!IsObject(poslist["dilsample"][samplename])){
								poslist["dilsample"][samplename]:={}
							}
							poslist["dilsample"][samplename][comp]:=comp
						}
					}
					
				}
			}
		}
	}
	;~ jmethods:=JsonDump(poslist)
	;~ Clipboard:=jmethods
	;~ msgbox % posmsg
	
	;~ GuiControl, main:, errmsg1, % posmsg
	
	
	if (posmsg!=""){
		abnormalmsg:=abnormalmsg . "檢出檢體異常`n" . posmsg . "n"
	}
	errmsg2:=""
	for msg in posmsg2
	{
		errmsg2:=errmsg2 . msg . "`n"
	}
	if (errmsg2!=""){
		abnormalmsg:=abnormalmsg . "無LOQ`n" . errmsg2 . "n"
	}
	rep:=rep . "`n"
	rep:=rep . "一、檢出檢量線製作：`n"
	thisgt:=jmethod[mode]["titles"]["STD"]
	poscount:=0
	for key, compound in poslist["poscompoumd"]
	{
		poscount+=1
		compound:=poscount
		comp:=key
		loop, % thisgt.MaxIndex()
		{
			row:=A_index
			rowtype:=jmethod[mode]["titles"]["STD"][row]
			loop, % js.STD.MaxIndex()
			{
				column:=A_index
				if (rowtype="STD_comp"){
					if (column=1){
						rep:=rep . compound . "." . comp . "`t"
					} 
					rep:=rep . "STD" . column . "`t"
				} else if (rowtype="STD_conc"){
					if (column=1){
						rep:=rep . "濃度(" . jmethod[mode]["unit"] . ")`t"
					} 
					rep:=rep . round(js["STD"][column]["conc"],3) . "`t"
				} else if (rowtype="STD_ana"){
					if (column=1){
						rep:=rep . "Ana Peak`t"
					} 
					posi:=checknuminsmaple(js["STD"][column]["sample"],jres)
					rep:=rep . jres.sample[posi][comp]["peakarea"] . "`t"
				} else if (rowtype="STD_yaxb"){
					if (column=1){
						rep:=rep . "y=ax+b"
					} 
				} else if (rowtype="STD_r"){
					if (column=1){
						rep:=rep . "相關系數r=`t" . js["yabr"][comp]["r"] . "`t斜率(a)=`t" . js["yabr"][comp]["a"] . "`t截距(b)=`t" . js["yabr"][comp]["b"] . "`n"
						rep:=rep . "`ty = " . js["yabr"][comp]["a"] . " x+ " . js["yabr"][comp]["b"]
					} 
				} else {
					if (column=1){
						rep:=rep . "未定義標題" . ")`t"
					} 
					rep:=rep . "未定義公式" . "`t"
				}
			}
			rep:=rep . "`n"
		}
		rep:=rep . "`n`n`n`n`n`n`n`n`n`n"
	}
	rep:=rep . "`n`n二、檢出檢量線確認及查核：`n"
	thisgt:=jmethod[mode]["titles"]["ICV"]
	posi:=checknuminsmaple(js["ICV"][1]["sample"],jres)
	loop, % thisgt.MaxIndex()
	{
		mgtkey:=thisgt[A_index]
		thisit:= mgt[mgtkey]
		if (thisit="檢量線確認標準品"){
			rep:=rep . thisit . js["ICV"][1]["type"] . "`t"
		} else if (thisit="標準品濃度" || thisit="分析濃度"){
			rep:=rep . thisit . "(" . jmethod[mode]["unit"] . ")`t"
		} else {
			rep:=rep . thisit . "`t"
		}
	}
	rep:=rep . "`n"
	for key, compound in poslist["poscompoumd"]
	{
		comp:=key
		sample_conc:=js["ICV"][1]["conc"]
		area:=jres.sample[posi][comp]["peakarea"]
		calc_conc:=jres.sample[posi][comp]["conc"]
		RR:=(calc_conc-sample_conc)/sample_conc*100
		RT:=jres.sample[posi][comp]["analyteRT"] 
		RT25_1:=RT*1.025
		RT25_2:=RT*0.975
		row:=A_Index
		if (RR>20 || RR<-20){
			abnormalmsg:=abnormalmsg . "檢出ICV`tRR>+-20%`t" . comp . "`tRR=" . RR . "%`n"
		}
		loop, % thisgt.MaxIndex()
		{
			column:=A_index
			columntype:=jmethod[mode]["titles"]["ICV"][column]
			
			if (columntype="comp_ICV"){
				rep:=rep . comp . "`t"
			} else if (columntype="sample_conc"){
				rep:=rep . stavalue(round(sample_conc,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="area"){
				rep:=rep . area . "`t"
			} else if (columntype="calc_conc"){
				rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="RR"){
				rep:=rep . stavalue(round(RR,jmethod[mode]["percentdigit"]) . "%") . "`t"
			} else if (columntype="RT"){
				rep:=rep . RT . "`t"
			} else if (columntype="RT25"){
				rep:=rep . stavalue(round(RT25_1,jmethod[mode]["percentdigit"])) . "`t" . stavalue(round(RT25_2,jmethod[mode]["percentdigit"])) . "`t"
			} else {
				rep:=rep . "未定義公式" . "`t"
			}
			
		}
		rep:=rep . "`n"
	}
	loop, % js.CCV.MaxIndex()
	{
		currentsample:=A_Index
		thisgt:=jmethod[mode]["titles"]["CCV"]
		loop, % thisgt.MaxIndex(){
			mgtkey:=thisgt[A_index]
			thisit:= mgt[mgtkey]
			if (thisit="檢量線查核標準品"){
				rep:=rep . thisit . js["CCV"][currentsample]["type"] . currentsample . "`t"
			} else if (thisit="標準品濃度" || thisit="分析濃度"){
				rep:=rep . thisit . "(" . jmethod[mode]["unit"] . ")`t"
			} else {
				rep:=rep . thisit . "`t"
			}
		}
		rep:=rep . "`n"
		posi:=checknuminsmaple(js["CCV"][currentsample]["sample"],jres)
		for key, compound in poslist["poscompoumd"]
		{
			comp:=key
			sample_conc:=js["CCV"][currentsample]["conc"]
			area:=jres.sample[posi][comp]["peakarea"]
			calc_conc:=jres.sample[posi][comp]["conc"]
			RR:=(calc_conc-sample_conc)/sample_conc*100
			RT:=jres.sample[posi][comp]["analyteRT"] 
			RT25_1:=RT*1.025
			RT25_2:=RT*0.975
			
			if (RR>20 || RR<-20){
				abnormalmsg:=abnormalmsg . "檢出CCV" . currentsample . "`tRR>+-20%`t" . comp . "`tRR=" . RR . "%`n"
			}
			loop, % thisgt.MaxIndex()
			{
				column:=A_index
				columntype:=jmethod[mode]["titles"]["ICV"][column]
				
				if (columntype="comp_ICV"){
					rep:=rep . comp . "`t"
				} else if (columntype="sample_conc"){
					rep:=rep . stavalue(round(sample_conc,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="area"){
					rep:=rep . area . "`t"
				} else if (columntype="calc_conc"){
					rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="RR"){
					rep:=rep . stavalue(round(RR,jmethod[mode]["percentdigit"]) . "%") . "`t"
				} else if (columntype="RT"){
					rep:=rep . stavalue(round(RT,jmethod[mode]["percentdigit"])) . "`t"
				} else if (columntype="RT25"){
					rep:=rep . stavalue(round(RT25_1,jmethod[mode]["percentdigit"])) . "`t" . stavalue(round(RT25_2,jmethod[mode]["percentdigit"])) . "`t"
				} else {
					rep:=rep . "未定義公式" . "`t"
				}
				
			}
			rep:=rep . "`n"
		}
	}
	rep:=rep . "`n"
	rep:=rep . "三、檢出空白樣品分析：`n"
	thisgt:=jmethod[mode]["titles"]["BK"]
	loop, % thisgt.MaxIndex(){
		mgtkey:=thisgt[A_index]
		thisit:= mgt[mgtkey]
		if (thisit="標準品濃度" || thisit="分析濃度"){
			rep:=rep . thisit . jmethod[mode]["unit"] . "`t"
		} else if (thisit="檢體濃度"){
			rep:=rep . thisit . jmethod[mode]["unitPP"] . "`t"
		} else if (thisit="LOQ"){
			rep:=rep . thisit . jmethod[mode]["unitPP"] . "`t"
		} else {
			rep:=rep . thisit . "`t"
		}
	}
	rep:=rep . "`n"
	posi:=checknuminsmaple(js["BK"][1]["sample"],jres)
	for key, compound in poslist["poscompoumd"]
	{
		comp:=key
		sample_name:=js["BK"][1]["remark"]
		weight:=js["BK"][1]["weight"]
		volume:=js["BK"][1]["volume"]
		area:=jres.sample[posi][comp]["peakarea"]
		calc_conc:=jres.sample[posi][comp]["conc"]
		calc_PP:=calc_conc*volume/weight*jmethod[mode]["CR_PP"]
		LQ_mode:=js["BK"][1]["is"]
		LQ:=jmethod["pesticide_LOQ"][comp][LQ_mode]

		loop, % thisgt.MaxIndex()
		{
			column:=A_index
			columntype:=jmethod[mode]["titles"]["BK"][column]
			
			if (columntype="comp_BK"){
				rep:=rep . comp . "`t"
			} else if (columntype="sample_name"){
				rep:=rep . sample_name . "`t"
			} else if (columntype="weight"){
				rep:=rep . weight . "`t"
			} else if (columntype="volume"){
				rep:=rep . volume . "`t"
			} else if (columntype="area"){
				if (area=""){
					rep:=rep . "N.D." . "`t"
				} else {
					if (calc_pp<LQ){
						rep:=rep . "N.D." . "`t"
					} else {
						rep:=rep . area . "`t"
					}
				}
			} else if (columntype="calc_conc"){
				if (area=""){
					rep:=rep . "N.D." . "`t"
				} else {
					if (calc_pp<LQ){
						rep:=rep . "N.D." . "`t"
					} else {
						rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
					}	
				}
			} else if (columntype="calc_PP"){
				if (area=""){
					rep:=rep . "N.D." . "`t"
				} else {
					if (calc_pp<LQ){
						rep:=rep . "N.D." . "`t"
					} else {
						rep:=rep . stavalue(round(calc_PP,jmethod[mode]["digit"])) . "`t"
					}	
				}
			}else if (columntype="LOQ"){
				rep:=rep . stavalue(round(LQ,jmethod[mode]["digit"])) . "`t"
			} else {
				rep:=rep . "未定義公式" . "`t"
			}
			
		}
		rep:=rep . "`n"
	}
	rep:=rep . "備註：檢驗結果為「未檢出」時，以N.D.表示。`n`n"
	rep:=rep . "四、檢出查核樣品分析：`n"
	posi:=checknuminsmaple(js["SPK"][1]["sample"],jres)
	thisgt:=jmethod[mode]["titles"]["SPK"]
	loop, % thisgt.MaxIndex(){
		mgtkey:=thisgt[A_index]
		thisit:= mgt[mgtkey]
		if (thisit="var_compound"){
			rep:=rep . "分析物 SPK1" . "`t"
		} else if (thisit="取樣重量"){
			rep:=rep . thisit . jmethod[mode]["unitsam"] . "`t"
		} else if (thisit="定容量"){
			rep:=rep . thisit . jmethod[mode]["unitvol"] . "`t"
		} else if (thisit="分析濃度"){
			rep:=rep . thisit . "(" . jmethod[mode]["unit"] . ")`t"
		} else if (thisit="檢體濃度" || thisit="添加濃度" ){
			rep:=rep . thisit . "(" . jmethod[mode]["unitPP"] . ")`t"
		} else {
			rep:=rep . thisit . "`t"
		}
	}
	rep:=rep . "`n"
	for key, compound in poslist["poscompoumd"]
	{
		comp:=key
		sample_name:=js["SPK"][1]["remark"]
		weight:=js["SPK"][1]["weight"]
		volume:=js["SPK"][1]["volume"]
		area:=jres.sample[posi][comp]["peakarea"]
		calc_conc:=jres.sample[posi][comp]["conc"]
		calc_pp:=calc_conc*volume/weight*jmethod[mode]["CR_PP"]
		add_pp:=jmethod[mode]["SPK_conc"]
		recy:=calc_pp/add_pp*100
		if (recy>120 || recy<60){
			abnormalmsg:=abnormalmsg . "檢出SPK1`t回收>120或<60%`t" . comp . "`t回收=" . recy . "%`n"
		}
		loop, % thisgt.MaxIndex()
		{
			column:=A_index
			columntype:=jmethod[mode]["titles"]["SPK"][column]
			if (columntype="var_compound"){
				rep:=rep . comp . "`t"
			} else if (columntype="weight"){
				rep:=rep . weight . "`t"
			} else if (columntype="volume"){
				rep:=rep . volume . "`t"
			} else if (columntype="area"){
				rep:=rep . area . "`t"
			} else if (columntype="calc_conc"){
				rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="calc_pp"){
				rep:=rep . stavalue(round(calc_pp,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="add_pp"){
				rep:=rep . add_pp . "`t"
			} else if (columntype="recy"){
				rep:=rep . stavalue(round(recy,jmethod[mode]["percentdigit"]) . "%") . "`t"
			} else {
				rep:=rep . "未定義公式" . "`t"
			}
		}
		rep:=rep . "`n"
	}
	rep:=rep . "`n"
	rep:=rep . "五、檢出查核樣品重覆試驗：`n"
	posi_1:=checknuminsmaple(js["SPK"][1]["sample"],jres)
	posi_2:=checknuminsmaple(js["DUP"][1]["sample"],jres)
	thisgt:=jmethod[mode]["titles"]["SPKR"]
	L1:=""
	L2:=""
	loop, % thisgt.MaxIndex(){
		mgtkey:=thisgt[A_index]
		thisit:= mgt[mgtkey]
		if (mgtkey="var_compound"){
			L1:=L1 . "標準品品項" . "`t"
			L2:=L2 . "" . "`t"
		} else if (mgtkey="weight"){
			L1:=L1 . "查核樣品 SPIKE 1" . "`t"
			L2:=L2 . thisit . jmethod[mode]["unitsam"] . "`t"
		} else if (mgtkey="weight_D"){
			L1:=L1 . "查核樣品重複 Duplicate 1" . "`t"
			L2:=L2 . thisit . jmethod[mode]["unitsam"] . "`t"
		} else if (mgtkey="volume" || mgtkey="volume_D" ){
			L1:=L1 . "" . "`t"
			L2:=L2 . thisit . jmethod[mode]["unitvol"] . "`t"
		} else if (mgtkey="area" || mgtkey="area_D" ){
			L1:=L1 . "" . "`t"
			L2:=L2 . thisit . "`t"
		} else if (mgtkey="calc_conc" || mgtkey="calc_conc_D" ){
			L1:=L1 . "" . "`t"
			L2:=L2 . thisit . "(" . jmethod[mode]["unit"] . ")`t"
		} else if (mgtkey="calc_pp" || mgtkey="calc_pp_D" ){
			L1:=L1 . "" . "`t"
			L2:=L2 . thisit . "(" . jmethod[mode]["unitPP"] . ")`t"
		} else if (mgtkey="RRP"){
			L1:=L1 . "相對差異百分比(R)" . "`t"
			L2:=L2 . "" . "`t"
		}else {
			L1:=L1 . "未定義" . "`t"
			L2:=L2 . "未定義" . "`t"
		}
	}
	rep:=rep . L1 . "`n" . L2 . "`n"
	for key, compound in poslist["poscompoumd"]
	{
		currentcompound:=key
		comp:=currentcompound
		weight_1:=js["SPK"][1]["weight"]
		volume_1:=js["SPK"][1]["volume"]
		area_1:=jres.sample[posi_1][comp]["peakarea"]
		calc_conc_1:=jres.sample[posi_1][comp]["conc"]
		calc_pp_1:=calc_conc_1*volume_1/weight_1*jmethod[mode]["CR_PP"]
		add_pp_1:=jmethod[mode]["SPK_conc"]
		

		sample_name_2:=js["DUP"][1]["remark"]
		weight_2:=js["DUP"][1]["weight"]
		volume_2:=js["DUP"][1]["volume"]
		area_2:=jres.sample[posi_2][comp]["peakarea"]
		calc_conc_2:=jres.sample[posi_2][comp]["conc"]
		calc_pp_2:=calc_conc_2*volume_2/weight_2*jmethod[mode]["CR_PP"]
		add_pp_2:=jmethod[mode]["DUP_conc"]
		
		
		ave_pp:=(calc_pp_1+calc_pp_2)/2
		RRP:=abs(calc_pp_1-calc_pp_2)/ave_pp*100
		if (RRP>20 || RRP<-20){
			abnormalmsg:=abnormalmsg . "檢出SPKDUP`t相對差異>+-20%`t" . comp . "`t相對差異=" . RRP . "%`n"
		}
		loop, % thisgt.MaxIndex()
		{
			column:=A_index
			columntype:=jmethod[mode]["titles"]["SPKR"][column]
			if (columntype="var_compound"){
				rep:=rep . currentcompound . "`t"
			} else if (columntype="weight"){
				rep:=rep . weight_1 . "`t"
			} else if (columntype="volume"){
				rep:=rep . volume_1 . "`t"
			} else if (columntype="area"){
				rep:=rep . area_1 . "`t"
			} else if (columntype="calc_conc"){
				rep:=rep . stavalue(round(calc_conc_1,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="calc_pp"){
				rep:=rep . stavalue(round(calc_pp_1,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="add_pp"){
				rep:=rep . add_pp_1 . "`t"
			} else if (columntype="weight_D"){
				rep:=rep . weight_2 . "`t"
			} else if (columntype="volume_D"){
				rep:=rep . volume_2 . "`t"
			} else if (columntype="area_D"){
				rep:=rep . area_2 . "`t"
			} else if (columntype="calc_conc_D"){
				rep:=rep . stavalue(round(calc_conc_2,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="calc_pp_D"){
				rep:=rep . stavalue(round(calc_pp_2,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="add_pp_D"){
				rep:=rep . add_pp_2 . "`t"
			} else if (columntype="ave_pp"){
				rep:=rep . stavalue(round(ave_pp,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="RRP"){
				rep:=rep . stavalue(round(RRP,jmethod[mode]["percentdigit"]) . "%") . "`t"
			} else {
				rep:=rep . "未定義公式" . "`t"
			}
		}
		rep:=rep . "`n"
	}
	rep:=rep . "`n"
	rep:=rep . "六、檢出檢體檢驗結果：`n"
	loop, % js.TEST.MaxIndex()
	{
		posi:=checknuminsmaple(js["TEST"][A_index]["sample"],jres)
		sample_name:=js["TEST"][A_index]["remark"]
		sample_code:=js["TEST"][A_index]["sample"]
		weight:=js["TEST"][A_index]["weight"]
		volume:=js["TEST"][A_index]["volume"]
		
		thisgt:=jmethod[mode]["titles"]["TEST"]
		loop, % thisgt.MaxIndex(){
			mgtkey:=thisgt[A_index]
			thisit:= mgt[mgtkey]
			if (mgtkey="sample_code"){
				rep:=rep . sample_code . "`t"
			} else if (mgtkey="sample_name"){
				rep:=rep . sample_name . "`t`n"
			} else if (mgtkey="weight"){
				rep:=rep . thisit . "`t" . weight . "`t" . jmethod[mode]["unitsam"] . "`t"
			} else if (mgtkey="volume"){
				rep:=rep . thisit . "`t" . volume . "`t" . jmethod[mode]["unitvol"] . "`t`n"
			} else if (mgtkey="var_compound"){
				rep:=rep . "檢出細項" . "`t"
			} else if (mgtkey="area"){
				rep:=rep . thisit . "`t"
			} else if (mgtkey="calc_conc"){
				rep:=rep . thisit . "(" . jmethod[mode]["unit"] . ")`t"
			} else if (mgtkey="calc_pp"){
				rep:=rep . thisit . "(" . jmethod[mode]["unitPP"] . ")`t"
			} else if (mgtkey="LOQ"){
				rep:=rep . "LOQ" . "(" . jmethod[mode]["unitPP"] . ")`t"
			} else if (mgtkey="Accept_conc"){
				rep:=rep . "容許量" . "(" . jmethod[mode]["unitPP"] . ")`t"
			} else {
				rep:=rep . "未定義" . "`t"
			}
		}
		rep:=rep . "`n"
		if (IsObject(poslist.possample[sample_code])){
			for key, item in poslist.possample[sample_code]
			{
				currentcompound:=key
				comp:=currentcompound
				area:=jres.sample[posi][currentcompound]["peakarea"]
				calc_conc:=jres.sample[posi][comp]["conc"]
				calc_pp:=calc_conc*volume/weight*jmethod[mode]["CR_PP"]
				LQ:=jmethod["pesticide_LOQ"][comp][LQ_mode]
				rep:=rep . comp . "`t"   
				rep:=rep . area . "`t" 
				rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
				rep:=rep . stavalue(round(calc_pp,jmethod[mode]["digit"])) . "`t"
				rep:=rep . stavalue(round(LQ,jmethod[mode]["digit"])) . "`t"
				rep:=rep . "" . "`t`n" 
				
			}
		} else {
			rep:=rep . "未檢出`n"
		}
		rep:=rep . "`n"
	}
	rep:=rep . "`n"
	rep:=rep . "`t`t`t`t編號：`n"
	rep:=rep . "檢驗員：`t驗算員：`t`t實驗室負責人：`t`n"
	
	diluinfo:=""
	for key, sample in poslist["dilsample"]
	{
		diluinfo:=diluinfo . "檢體" . key . "須稀釋以下項目`n"
		for dilcomp in sample
			diluinfo:=diluinfo . "`t" . dilcomp . "`n"
	}
	if (diluinfo!=""){
		abnormalmsg:=abnormalmsg . "須稀釋檢體`n" . diluinfo . "`n"
	}
		
	if (js.D_CCV.MaxIndex()>0){
		rep:=rep . "`n"
		rep:=rep . "七、稀釋檢量線確認及查核：`n"
		loop, % js.D_CCV.MaxIndex()
		{
			currentsample:=A_Index
			currentsamplecode:=js["D_CCV"][currentsample]["sample"]
			thisgt:=jmethod[mode]["titles"]["CCV"]
			loop, % thisgt.MaxIndex(){
				mgtkey:=thisgt[A_index]
				thisit:= mgt[mgtkey]
				if (thisit="檢量線查核標準品"){
					rep:=rep . thisit . " " . currentsamplecode . "`t"
				} else if (thisit="標準品濃度" || thisit="分析濃度"){
					rep:=rep . thisit . "(" . jmethod[mode]["unit"] . ")`t"
				} else {
					rep:=rep . thisit . "`t"
				}
			}
			rep:=rep . "`n"
			posi:=checknuminsmaple(currentsamplecode,jres)
			for key, compound in poslist["dilcompoumd"]
			{
				comp:=key
				sample_conc:=js["D_CCV"][currentsample]["conc"]
				area:=jres.sample[posi][comp]["peakarea"]
				calc_conc:=jres.sample[posi][comp]["conc"]
				RR:=(calc_conc-sample_conc)/sample_conc*100
				RT:=jres.sample[posi][comp]["analyteRT"] 
				RT25_1:=RT*1.025
				RT25_2:=RT*0.975
				if (RR>20 || RR<-20){
					abnormalmsg:=abnormalmsg . "稀釋" . currentsamplecode . "`tRR>+-20%`t" . comp . "`tRR=" . RR . "`n"
				}
				loop, % thisgt.MaxIndex()
				{
					column:=A_index
					columntype:=jmethod[mode]["titles"]["CCV"][column]
					
					if (columntype="comp_CCV"){
						rep:=rep . comp . "`t"
					} else if (columntype="sample_conc"){
						rep:=rep . stavalue(round(sample_conc,jmethod[mode]["digit"])) . "`t"
					} else if (columntype="area"){
						rep:=rep . area . "`t"
					} else if (columntype="calc_conc"){
						rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
					} else if (columntype="RR"){
						rep:=rep . stavalue(round(RR,jmethod[mode]["percentdigit"]) . "%") . "`t"
					} else if (columntype="RT"){
						rep:=rep . RT . "`t"
					} else if (columntype="RT25"){
						rep:=rep . stavalue(round(RT25_1,jmethod[mode]["percentdigit"])) . "`t" . stavalue(round(RT25_2,jmethod[mode]["percentdigit"])) . "`t"
					} else {
						rep:=rep . "未定義公式" . "`t"
					}
					
				}
				rep:=rep . "`n"
			}
		}
		
	}
	
	;~ 稀釋
	posi:=checknuminsmaple(js["D_BK"][1]["sample"],jres)
	if (posi!=""){
		rep:=rep . "`n"
		rep:=rep . "八、稀釋空白樣品分析：`n"
		thisgt:=jmethod[mode]["titles"]["BK"]
		loop, % thisgt.MaxIndex(){
			mgtkey:=thisgt[A_index]
			thisit:= mgt[mgtkey]
			if (thisit="標準品濃度" || thisit="分析濃度"){
				rep:=rep . thisit . jmethod[mode]["unit"] . "`t"
			} else if (thisit="檢體濃度"){
				rep:=rep . thisit . jmethod[mode]["unitPP"] . "`t"
			} else if (thisit="LOQ"){
				rep:=rep . thisit . jmethod[mode]["unitPP"] . "`t"
			} else {
				rep:=rep . thisit . "`t"
			}
		}
		rep:=rep . "`n"
		posi:=checknuminsmaple(js["D_BK"][1]["sample"],jres)

		for key, compound in poslist["dilcompoumd"]
		{
			comp:=key
			sample_name:=js["D_BK"][1]["remark"]
			weight:=js["D_BK"][1]["weight"]
			volume:=js["D_BK"][1]["volume"]
			area:=jres.sample[posi][comp]["peakarea"]
			calc_conc:=jres.sample[posi][comp]["conc"]
			calc_PP:=calc_conc*volume/weight*jmethod[mode]["CR_PP"]
			LQ_mode:=js["D_BK"][1]["is"]
			LQ:=jmethod["pesticide_LOQ"][comp][LQ_mode]

			loop, % thisgt.MaxIndex()
			{
				column:=A_index
				columntype:=jmethod[mode]["titles"]["BK"][column]
				
				if (columntype="comp_BK"){
					rep:=rep . comp . "`t"
				} else if (columntype="sample_name"){
					rep:=rep . sample_name . "`t"
				} else if (columntype="weight"){
					rep:=rep . weight . "`t"
				} else if (columntype="volume"){
					rep:=rep . volume . "`t"
				} else if (columntype="area"){
					if (area=""){
						rep:=rep . "N.D." . "`t"
					} else {
						if (calc_pp<LQ){
							rep:=rep . "N.D." . "`t"
						} else {
							rep:=rep . area . "`t"
						}
					}
				} else if (columntype="calc_conc"){
					if (area=""){
						rep:=rep . "N.D." . "`t"
					} else {
						if (calc_pp<LQ){
							rep:=rep . "N.D." . "`t"
						} else {
							rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
						}	
					}
				} else if (columntype="calc_PP"){
					if (area=""){
						rep:=rep . "N.D." . "`t"
					} else {
						if (calc_pp<LQ){
							rep:=rep . "N.D." . "`t"
						} else {
							rep:=rep . stavalue(round(calc_PP,jmethod[mode]["digit"])) . "`t"
						}	
					}
				}else if (columntype="LOQ"){
					rep:=rep . LQ . "`t"
				} else {
					rep:=rep . "未定義公式" . "`t"
				}
				
			}
			rep:=rep . "`n"
		}
		rep:=rep . "備註：檢驗結果為「未檢出」時，以N.D.表示。`n`n"
	}
	
	posi_1:=checknuminsmaple(js["D_SPK"][1]["sample"],jres)
	posi_2:=checknuminsmaple(js["D_DUP"][1]["sample"],jres)
	if (posi_1!="" && posi_2!=""){
		rep:=rep . "九、稀釋查核樣品分析：`n"
		posi:=checknuminsmaple(js["D_SPK"][1]["sample"],jres)

		thisgt:=jmethod[mode]["titles"]["SPK"]
		loop, % thisgt.MaxIndex(){
			mgtkey:=thisgt[A_index]
			thisit:= mgt[mgtkey]
			if (thisit="var_compound"){
				rep:=rep . "分析物 SPK1" . "`t"
			} else if (thisit="取樣重量"){
				rep:=rep . thisit . jmethod[mode]["unitsam"] . "`t"
			} else if (thisit="定容量"){
				rep:=rep . thisit . jmethod[mode]["unitvol"] . "`t"
			} else if (thisit="分析濃度"){
				rep:=rep . thisit . "(" . jmethod[mode]["unit"] . ")`t"
			} else if (thisit="檢體濃度" || thisit="添加濃度" ){
				rep:=rep . thisit . "(" . jmethod[mode]["unitPP"] . ")`t"
			} else {
				rep:=rep . thisit . "`t"
			}
		}
		rep:=rep . "`n"
		for key, compound in poslist["dilcompoumd"]
		{
			comp:=key
			sample_name:=js["D_SPK"][1]["remark"]
			weight:=js["D_SPK"][1]["weight"]
			volume:=js["D_SPK"][1]["volume"]
			area:=jres.sample[posi][comp]["peakarea"]
			calc_conc:=jres.sample[posi][comp]["conc"]
			calc_pp:=calc_conc*volume/weight*jmethod[mode]["CR_PP"]
			add_pp:=jmethod[mode]["SPK_conc"]
			recy:=calc_pp/add_pp*100
			if (recy>120 || recy<60){
				abnormalmsg:=abnormalmsg . "稀釋SPK`t回收>120或<60%`t" . comp . "`t回收=" . recy . "%`n"
			}
			loop, % thisgt.MaxIndex()
			{
				column:=A_index
				columntype:=jmethod[mode]["titles"]["SPK"][column]
				if (columntype="var_compound"){
					rep:=rep . comp . "`t"
				} else if (columntype="weight"){
					rep:=rep . weight . "`t"
				} else if (columntype="volume"){
					rep:=rep . volume . "`t"
				} else if (columntype="area"){
					rep:=rep . area . "`t"
				} else if (columntype="calc_conc"){
					rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="calc_pp"){
					rep:=rep . stavalue(round(calc_pp,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="add_pp"){
					rep:=rep . add_pp . "`t"
				} else if (columntype="recy"){
					rep:=rep . stavalue(round(recy,jmethod[mode]["percentdigit"]) . "%") . "`t"
				} else {
					rep:=rep . "未定義公式" . "`t"
				}
			}
			rep:=rep . "`n"
		}
		rep:=rep . "`n"
		rep:=rep . "十、稀釋查核樣品重複分析：`n"
		posi_1:=checknuminsmaple(js["D_SPK"][1]["sample"],jres)
		posi_2:=checknuminsmaple(js["D_DUP"][1]["sample"],jres)
		thisgt:=jmethod[mode]["titles"]["SPKR"]
		L1:=""
		L2:=""
		loop, % thisgt.MaxIndex(){
			mgtkey:=thisgt[A_index]
			thisit:= mgt[mgtkey]
			if (mgtkey="var_compound"){
				L1:=L1 . "標準品品項" . "`t"
				L2:=L2 . "" . "`t"
			} else if (mgtkey="weight"){
				L1:=L1 . "查核樣品 SPIKE 1" . "`t"
				L2:=L2 . thisit . jmethod[mode]["unitsam"] . "`t"
			} else if (mgtkey="weight_D"){
				L1:=L1 . "查核樣品重複 Duplicate 1" . "`t"
				L2:=L2 . thisit . jmethod[mode]["unitsam"] . "`t"
			} else if (mgtkey="volume" || mgtkey="volume_D" ){
				L1:=L1 . "" . "`t"
				L2:=L2 . thisit . jmethod[mode]["unitvol"] . "`t"
			} else if (mgtkey="area" || mgtkey="area_D" ){
				L1:=L1 . "" . "`t"
				L2:=L2 . thisit . "`t"
			} else if (mgtkey="calc_conc" || mgtkey="calc_conc_D" ){
				L1:=L1 . "" . "`t"
				L2:=L2 . thisit . "(" . jmethod[mode]["unit"] . ")`t"
			} else if (mgtkey="calc_pp" || mgtkey="calc_pp_D" ){
				L1:=L1 . "" . "`t"
				L2:=L2 . thisit . "(" . jmethod[mode]["unitPP"] . ")`t"
			} else if (mgtkey="RRP"){
				L1:=L1 . "相對差異百分比(R)" . "`t"
				L2:=L2 . "" . "`t"
			}else {
				L1:=L1 . "未定義" . "`t"
				L2:=L2 . "未定義" . "`t"
			}
		}
		rep:=rep . L1 . "`n" . L2 . "`n"
		for key, compound in poslist["dilcompoumd"]
		{
			currentcompound:=key
			comp:=currentcompound
			weight_1:=js["D_SPK"][1]["weight"]
			volume_1:=js["D_SPK"][1]["volume"]
			area_1:=jres.sample[posi_1][comp]["peakarea"]
			calc_conc_1:=jres.sample[posi_1][comp]["conc"]
			calc_pp_1:=calc_conc_1*volume_1/weight_1*jmethod[mode]["CR_PP"]
			add_pp_1:=jmethod[mode]["SPK_conc"]
			

			sample_name_2:=js["D_DUP"][1]["remark"]
			weight_2:=js["D_DUP"][1]["weight"]
			volume_2:=js["D_DUP"][1]["volume"]
			area_2:=jres.sample[posi_2][comp]["peakarea"]
			calc_conc_2:=jres.sample[posi_2][comp]["conc"]
			calc_pp_2:=calc_conc_2*volume_2/weight_2*jmethod[mode]["CR_PP"]
			add_pp_2:=jmethod[mode]["DUP_conc"]
			
			
			ave_pp:=(calc_pp_1+calc_pp_2)/2
			RRP:=abs(calc_pp_1-calc_pp_2)/ave_pp*100
			if (RRP>20 || RRP<-20){
				abnormalmsg:=abnormalmsg . "稀釋SPKDUP`t相對差異>+=20%`t" . comp . "`相對差異=" . RRP . "%`n"
			}
			loop, % thisgt.MaxIndex()
			{
				column:=A_index
				columntype:=jmethod[mode]["titles"]["SPKR"][column]
				if (columntype="var_compound"){
					rep:=rep . currentcompound . "`t"
				} else if (columntype="weight"){
					rep:=rep . weight_1 . "`t"
				} else if (columntype="volume"){
					rep:=rep . volume_1 . "`t"
				} else if (columntype="area"){
					rep:=rep . area_1 . "`t"
				} else if (columntype="calc_conc"){
					rep:=rep . stavalue(round(calc_conc_1,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="calc_pp"){
					rep:=rep . stavalue(round(calc_pp_1,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="add_pp"){
					rep:=rep . add_pp_1 . "`t"
				} else if (columntype="weight_D"){
					rep:=rep . weight_2 . "`t"
				} else if (columntype="volume_D"){
					rep:=rep . volume_2 . "`t"
				} else if (columntype="area_D"){
					rep:=rep . area_2 . "`t"
				} else if (columntype="calc_conc_D"){
					rep:=rep . stavalue(round(calc_conc_2,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="calc_pp_D"){
					rep:=rep . stavalue(round(calc_pp_2,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="add_pp_D"){
					rep:=rep . add_pp_2 . "`t"
				} else if (columntype="ave_pp"){
					rep:=rep . stavalue(round(ave_pp,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="RRP"){
					rep:=rep . stavalue(round(RRP,jmethod[mode]["percentdigit"]) . "%") . "`t"
				} else {
					rep:=rep . "未定義公式" . "`t"
				}
			}
			rep:=rep . "`n"
		}
	}
	
	if (js.D_TEST.MaxIndex()>0){
		rep:=rep . "`n"
		rep:=rep . "十一、稀釋檢體檢驗結果：`n"
		loop, % js.D_TEST.MaxIndex()
		{
			posi:=checknuminsmaple(js["D_TEST"][A_index]["sample"],jres)
			sample_name:=js["D_TEST"][A_index]["remark"]
			sample_code:=js["D_TEST"][A_index]["sample"]
			weight:=js["D_TEST"][A_index]["weight"]
			volume:=js["D_TEST"][A_index]["volume"]
			dilute:=js["D_TEST"][A_index]["dilute"]
			thisgt:=jmethod[mode]["titles"]["TEST"]
			loop, % thisgt.MaxIndex(){
				mgtkey:=thisgt[A_index]
				thisit:= mgt[mgtkey]
				if (mgtkey="sample_code"){
					rep:=rep . sample_code . "`t"
				} else if (mgtkey="sample_name"){
					rep:=rep . sample_name . "`t`n"
				} else if (mgtkey="weight"){
					rep:=rep . thisit . "`t" . weight . "`t" . jmethod[mode]["unitsam"] . "`t"
				} else if (mgtkey="volume"){
					rep:=rep . thisit . "`t`t" . volume . "`t" . jmethod[mode]["unitvol"] . "`t`n"
				} else if (mgtkey="var_compound"){
					rep:=rep . "檢出細項" . "`t" . "稀釋倍數" . "`t"
				} else if (mgtkey="area"){
					rep:=rep . thisit . "`t"
				} else if (mgtkey="calc_conc"){
					rep:=rep . thisit . "(" . jmethod[mode]["unit"] . ")`t"
				} else if (mgtkey="calc_pp"){
					rep:=rep . thisit . "(" . jmethod[mode]["unitPP"] . ")`t"
				} else if (mgtkey="LOQ"){
					rep:=rep . "LOQ" . "(" . jmethod[mode]["unitPP"] . ")`t"
				} else if (mgtkey="Accept_conc"){
					rep:=rep . "容許量" . "(" . jmethod[mode]["unitPP"] . ")`t"
				} else {
					rep:=rep . "未定義" . "`t"
				}
			}
			rep:=rep . "`n"
			for key, item in poslist.dilsample
			{
				if (instr(sample_code,key)){
					for dilcomp in item
					{
						currentcompound:=dilcomp
						comp:=currentcompound
						area:=jres.sample[posi][currentcompound]["peakarea"]
						calc_conc:=jres.sample[posi][comp]["conc"]*dilute
						calc_pp:=calc_conc*volume/weight*jmethod[mode]["CR_PP"]
						LQ:=jmethod["pesticide_LOQ"][comp][LQ_mode]
						rep:=rep . comp . "`t" .  dilute . "`t"
						rep:=rep . area . "`t" 
						rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
						rep:=rep . stavalue(round(calc_pp,jmethod[mode]["digit"])) . "`t"
						rep:=rep . stavalue(round(LQ,jmethod[mode]["digit"])) . "`t"
						rep:=rep . "" . "`t`n" 
					}
					
				}
			}
			rep:=rep . "`n"
		}
		rep:=rep . "`n"
		rep:=rep . "`t`t`t`t編號：`n"
		rep:=rep . "檢驗員：`t驗算員：`t`t實驗室負責人：`t`n"
	}
	
	if (abnormalmsg!=""){
		IfExist, errmsg.txt
		{
			FileDelete, errmsg.txt
		}
		FileAppend, %abnormalmsg%, errmsg.txt
		run, errmsg.txt
	}
	return rep
	
}
generatefromobj(js,jres,jmethod){
	abnormalmsg:=""
	guicontrolget, mode, main:, mode
	mgt:=jmethod["generaltitle"]
	rep:=""
	;~ STD
	
	for com, item in js["yabr"][comp]["r"]
	{
		if (item["r"]<0.99){
			abnormalmsg:=abnormalmsg . "品管檢量線`tr<0.99" . com . "`tr=" . item["r"] . "`n"
		}
	}
	
	rep:=rep . "三、檢量線製作：`n"
	thisgt:=jmethod[mode]["titles"]["STD"]
	loop, % js.yabr.order.MaxIndex()
	{
		compound:=A_Index
		comp:=js.yabr.order[compound]
		
		loop, % thisgt.MaxIndex()
		{
			row:=A_index
			rowtype:=jmethod[mode]["titles"]["STD"][row]
			loop, % js.STD.MaxIndex()
			{
				column:=A_index
				if (rowtype="STD_comp"){
					if (column=1){
						rep:=rep . compound . "." . comp . "`t"
					} 
					rep:=rep . "STD" . column . "`t"
				} else if (rowtype="STD_conc"){
					if (column=1){
						rep:=rep . "濃度(" . jmethod[mode]["unit"] . ")`t"
					} 
					rep:=rep . round(js["STD"][column]["conc"],3) . "`t"
				} else if (rowtype="STD_ana"){
					if (column=1){
						rep:=rep . "Ana Peak`t"
					} 
					posi:=checknuminsmaple(js["STD"][column]["sample"],jres)
					rep:=rep . jres.sample[posi][comp]["peakarea"] . "`t"
				} else if (rowtype="STD_yaxb"){
					if (column=1){
						rep:=rep . "y=ax+b"
					} 
				} else if (rowtype="STD_r"){
					if (column=1){
						rep:=rep . "相關系數r=`t" . js["yabr"][comp]["r"] . "`t斜率(a)=`t" . js["yabr"][comp]["a"] . "`t截距(b)=`t" . js["yabr"][comp]["b"] . "`n"
						rep:=rep . "`ty = " . js["yabr"][comp]["a"] . " x+ " . js["yabr"][comp]["b"]
					} 
				} else if (rowtype="STD_ANAIS"){
					posi:=checknuminsmaple(js["STD"][column]["sample"],jres)
					ANAIS:=round(jres.sample[posi][comp]["peakarea"]/jres.sample[posi][comp]["ISArea"],4)
					if (column=1){
						rep:=rep . "Ana Peak/IS Peak`t"
					} 
					rep:=rep . ANAIS . "`t"
				} else if (rowtype="STD_ISpeak"){
					posi:=checknuminsmaple(js["STD"][column]["sample"],jres)
					if (column=1){
						rep:=rep . "Ana Peak/IS Peak`t"
					} 
					rep:=rep . jres.sample[posi][comp]["ISArea"] . "`t"
				} else {
					if (column=1){
						rep:=rep . "未定義標題" . ")`t"
					} 
					rep:=rep . "未定義公式" . "`t"
				}
			}
			rep:=rep . "`n"
		}
		rep:=rep . "`n`n`n`n`n`n`n`n`n`n"
	}
	;~ ICV
	rep:=rep . "`n`n四、檢量線確認及查核：`n"
	thisgt:=jmethod[mode]["titles"]["ICV"]
	posi:=checknuminsmaple(js["ICV"][1]["sample"],jres)
	loop, % thisgt.MaxIndex()
	{
		mgtkey:=thisgt[A_index]
		thisit:= mgt[mgtkey]
		if (thisit="檢量線確認標準品"){
			rep:=rep . thisit . js["ICV"][1]["type"] . "`t"
		} else if (thisit="標準品濃度" || thisit="分析濃度"){
			rep:=rep . thisit . "(" . jmethod[mode]["unit"] . ")`t"
		} else {
			rep:=rep . thisit . "`t"
		}
	}
	rep:=rep . "`n"
	loop, % js.yabr.order.MaxIndex()
	{
		comp:=js.yabr.order[A_Index]
		sample_conc:=js["ICV"][1]["conc"]
		area:=jres.sample[posi][comp]["peakarea"]
		ISArea:=jres.sample[posi][comp]["ISArea"]
		IAratio:=area/ISArea
		calc_conc:=countconc(area,js["yabr"][comp]["a"],js["yabr"][comp]["b"])
		calc_conc_IS:=countconc(IAratio,js["yabr"][comp]["a"],js["yabr"][comp]["b"])
		RR:=(calc_conc-sample_conc)/sample_conc*100
		RR_IS:=(calc_conc_IS-sample_conc)/sample_conc*100
		RT:=jres.sample[posi][comp]["analyteRT"] 
		RT25_1:=RT*1.025
		RT25_2:=RT*0.975
		row:=A_Index
		if (RR>20 || RR<-20){
			abnormalmsg:=abnormalmsg . "品管ICV`tRR>+-20%" . comp . "`tRR=" . RR . "%`n"
		}
		loop, % thisgt.MaxIndex()
		{
			column:=A_index
			columntype:=jmethod[mode]["titles"]["ICV"][column]
			
			if (columntype="comp_ICV"){
				rep:=rep . comp . "`t"
			} else if (columntype="sample_conc"){
				rep:=rep . stavalue(round(sample_conc,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="area"){
				rep:=rep . area . "`t"
			} else if (columntype="calc_conc"){
				rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="RR"){
				rep:=rep . stavalue(round(RR,jmethod[mode]["percentdigit"]) . "%") . "`t"
			} else if (columntype="RT"){
				rep:=rep . stavalue(round(RT,jmethod[mode]["percentdigit"])) . "`t"
			} else if (columntype="RT25"){
				rep:=rep . stavalue(round(RT25_1,jmethod[mode]["percentdigit"])) . "`t" . stavalue(round(RT25_2,jmethod[mode]["percentdigit"])) . "`t"
			} else if (columntype="Isarea"){
				rep:=rep . Isarea . "`t"
			} else if (columntype="AI_ratio"){
				rep:=rep . stavalue(round(IAratio,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="calc_conc_IS"){
				rep:=rep . stavalue(round(calc_conc_IS,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="RR_IS"){
				rep:=rep . stavalue(round(RR_IS,jmethod[mode]["percentdigit"]) . "%") . "`t"
			} else {
				rep:=rep . "未定義公式" . "`t"
			}
			
		}
		rep:=rep . "`n"
	}
	;~ CCV
	loop, % js.CCV.MaxIndex()
	{
		currentsample:=A_Index
		thisgt:=jmethod[mode]["titles"]["CCV"]
		loop, % thisgt.MaxIndex(){
			mgtkey:=thisgt[A_index]
			thisit:= mgt[mgtkey]
			if (thisit="檢量線查核標準品"){
				rep:=rep . thisit . js["CCV"][currentsample]["type"] . currentsample . "`t"
			} else if (thisit="標準品濃度" || thisit="分析濃度"){
				rep:=rep . thisit . "(" . jmethod[mode]["unit"] . ")`t"
			} else {
				rep:=rep . thisit . "`t"
			}
		}
		rep:=rep . "`n"
		posi:=checknuminsmaple(js["CCV"][currentsample]["sample"],jres)
		loop, % js.yabr.order.MaxIndex()
		{
			comp:=js.yabr.order[A_Index]
			sample_conc:=js["CCV"][currentsample]["conc"]
			area:=jres.sample[posi][comp]["peakarea"]
			calc_conc:=countconc(area,js["yabr"][comp]["a"],js["yabr"][comp]["b"])
			RR:=(calc_conc-sample_conc)/sample_conc*100
			RT:=jres.sample[posi][comp]["analyteRT"] 
			RT25_1:=RT*1.025
			RT25_2:=RT*0.975
			
			ISArea:=jres.sample[posi][comp]["ISArea"]
			IAratio:=area/ISArea
			calc_conc_IS:=countconc(IAratio,js["yabr"][comp]["a"],js["yabr"][comp]["b"])
			RR_IS:=(calc_conc_IS-sample_conc)/sample_conc*100
			if (RR>20 || RR<-20){
				abnormalmsg:=abnormalmsg . "品管CCV" . currentsample . "`tRR>+-20%" . comp . "`tRR=" . RR . "%`n"
			}
			loop, % thisgt.MaxIndex()
			{
				column:=A_index
				columntype:=jmethod[mode]["titles"]["ICV"][column]
				
				if (columntype="comp_ICV"){
					rep:=rep . comp . "`t"
				} else if (columntype="sample_conc"){
					rep:=rep . stavalue(round(sample_conc,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="area"){
					rep:=rep . area . "`t"
				} else if (columntype="calc_conc"){
					rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="RR"){
					rep:=rep . stavalue(round(RR,jmethod[mode]["percentdigit"]) . "%") . "`t"
				} else if (columntype="RT"){
					rep:=rep . stavalue(round(RT,jmethod[mode]["percentdigit"])) . "`t"
				} else if (columntype="RT25"){
					rep:=rep . stavalue(round(RT25_1,jmethod[mode]["percentdigit"])) . "`t" . stavalue(round(RT25_2,jmethod[mode]["percentdigit"])) . "`t"
				} else if (columntype="Isarea"){
					rep:=rep . Isarea . "`t"
				} else if (columntype="AI_ratio"){
					rep:=rep . stavalue(round(IAratio,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="calc_conc_IS"){
					rep:=rep . stavalue(round(calc_conc_IS,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="RR_IS"){
					rep:=rep . stavalue(round(RR_IS,jmethod[mode]["percentdigit"]) . "%") . "`t"
				} else {
					rep:=rep . "未定義公式" . "`t"
				}
				
			}
			rep:=rep . "`n"
		}
	}
	;~ BK
	rep:=rep . "`n"
	rep:=rep . "五、空白樣品分析：`n"
	thisgt:=jmethod[mode]["titles"]["BK"]
	loop, % thisgt.MaxIndex(){
		mgtkey:=thisgt[A_index]
		thisit:= mgt[mgtkey]
		if (thisit="標準品濃度" || thisit="分析濃度"){
			rep:=rep . thisit . jmethod[mode]["unit"] . "`t"
		} else if (thisit="檢體濃度"){
			rep:=rep . thisit . jmethod[mode]["unitPP"] . "`t"
		} else {
			rep:=rep . thisit . "`t"
		}
	}
	rep:=rep . "`n"
	posi:=checknuminsmaple(js["BK"][1]["sample"],jres)
	loop, % js.yabr.order.MaxIndex()
	{
		comp:=js.yabr.order[A_Index]
		sample_name:=js["BK"][1]["remark"]
		weight:=js["BK"][1]["weight"]
		volume:=js["BK"][1]["volume"]
		area:=jres.sample[posi][comp]["peakarea"]
		calc_conc:=countconc(area,js["yabr"][comp]["a"],js["yabr"][comp]["b"])
		calc_pp:=calc_conc*volume/weight*jmethod[mode]["CR_PP"]
		
		ISArea:=jres.sample[posi][comp]["ISArea"]
		IAratio:=area/ISArea
		calc_conc_IS:=countconc(IAratio,js["yabr"][comp]["a"],js["yabr"][comp]["b"])
		calc_pp_IS:=calc_conc_IS*volume/weight*jmethod[mode]["CR_PP"]
		
		
		LQ:=jmethod[mode]["STD_conc"][1]/5
		loop, % thisgt.MaxIndex()
		{
			column:=A_index
			columntype:=jmethod[mode]["titles"]["BK"][column]
			
			if (columntype="comp_BK"){
				rep:=rep . comp . "`t"
			} else if (columntype="sample_name"){
				rep:=rep . sample_name . "`t"
			} else if (columntype="weight"){
				rep:=rep . weight . "`t"
			} else if (columntype="volume"){
				rep:=rep . volume . "`t"
			} else if (columntype="area"){
				rep:=rep . area . "`t"
			} else if (columntype="calc_conc"){
				if (calc_pp<LQ){
					rep:=rep .  "<" . round(LQ,jmethod[mode]["digit"]) . "`t"
				} else {
					rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
				}	
			} else if (columntype="calc_pp"){
				if (calc_pp<LQ){
					rep:=rep . "未檢出" . "`t"
				} else {
					rep:=rep . stavalue(round(calc_pp,jmethod[mode]["digit"])) . "`t"
				}	
			} else if (columntype="Isarea"){
				rep:=rep . Isarea . "`t"
			} else if (columntype="AI_ratio"){
				rep:=rep . stavalue(round(IAratio,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="calc_conc_IS"){
				if (calc_pp_IS<LQ){
					rep:=rep .  "<" . round(LQ,jmethod[mode]["digit"]) . "`t"
				} else {
					rep:=rep . stavalue(round(calc_conc_IS,jmethod[mode]["digit"])) . "`t"
				}
			} else if (columntype="calc_pp_IS"){
				if (calc_pp_IS<LQ){
					rep:=rep . "未檢出" . "`t"
				} else {
					rep:=rep . stavalue(round(calc_pp_IS,jmethod[mode]["digit"])) . "`t"
				}
			} else {
				rep:=rep . "未定義公式" . "`t"
			}
			
		}
		rep:=rep . "`n"
	}
	rep:=rep . "`n"
	;~ SPK
	rep:=rep . "六、查核樣品分析：`n"
	posi:=checknuminsmaple(js["SPK"][1]["sample"],jres)
	loop, % js.SPKcompound["order"].MaxIndex()
	{
		comp:=js.SPKcompound["order"][A_Index]
		sample_name:=js["SPK"][1]["remark"]
		weight:=js["SPK"][1]["weight"]
		volume:=js["SPK"][1]["volume"]
		area:=jres.sample[posi][comp]["peakarea"]
		calc_conc:=countconc(area,js["yabr"][comp]["a"],js["yabr"][comp]["b"])
		calc_pp:=calc_conc*volume/weight*jmethod[mode]["CR_PP"]
		add_pp:=jmethod[mode]["SPK_conc"]
		recy:=calc_pp/add_pp*100
		
		ISArea:=jres.sample[posi][comp]["ISArea"]
		IAratio:=area/ISArea
		calc_conc_IS:=countconc(IAratio,js["yabr"][comp]["a"],js["yabr"][comp]["b"])
		calc_pp_IS:=calc_conc_IS*volume/weight*jmethod[mode]["CR_PP"]
		recy_IS:=calc_pp_IS/add_pp*100
		
		if (recy>120 || recy<60){
			abnormalmsg:=abnormalmsg . "品管SPK`t回收>120或<60%" . comp . "`t回收=" . recy . "%`n"
		}
		
		currentcompound:=js.SPKcompound["order"][A_Index]
		thisgt:=jmethod[mode]["titles"]["SPK"]
		loop, % thisgt.MaxIndex(){
			mgtkey:=thisgt[A_index]
			thisit:= mgt[mgtkey]
			if (thisit="var_compound"){
				rep:=rep . currentcompound . "`t"
			} else if (thisit="取樣重量"){
				rep:=rep . thisit . jmethod[mode]["unitsam"] . "`t"
			} else if (thisit="定容量"){
				rep:=rep . thisit . jmethod[mode]["unitvol"] . "`t"
			} else if (thisit="分析濃度"){
				rep:=rep . thisit . "(" . jmethod[mode]["unit"] . ")`t"
			} else if (thisit="檢體濃度" || thisit="添加濃度" ){
				rep:=rep . thisit . "(" . jmethod[mode]["unitPP"] . ")`t"
			} else {
				rep:=rep . thisit . "`t"
			}
		}
		rep:=rep . "`n"
		loop, % thisgt.MaxIndex()
		{
			column:=A_index
			columntype:=jmethod[mode]["titles"]["SPK"][column]
			if (columntype="var_compound"){
				rep:=rep . "Spike" . "1" . "(" . sample_name . ")" . "`t"
			} else if (columntype="weight"){
				rep:=rep . weight . "`t"
			} else if (columntype="volume"){
				rep:=rep . volume . "`t"
			} else if (columntype="area"){
				rep:=rep . area . "`t"
			} else if (columntype="calc_conc"){
				rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="calc_pp"){
				rep:=rep . stavalue(round(calc_pp,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="add_pp"){
				rep:=rep . add_pp . "`t"
			} else if (columntype="recy"){
				rep:=rep . stavalue(round(recy,jmethod[mode]["percentdigit"]) . "%") . "`t"
			} else if (columntype="Isarea"){
				rep:=rep . Isarea . "`t"
			} else if (columntype="AI_ratio"){
				rep:=rep . stavalue(round(IAratio,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="calc_conc_IS"){
				rep:=rep . stavalue(round(calc_conc_IS,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="calc_pp_IS"){
				rep:=rep . stavalue(round(calc_pp_IS,jmethod[mode]["digit"])) . "`t"
			} else if (columntype="recy_IS"){
				rep:=rep . stavalue(round(recy_IS,jmethod[mode]["percentdigit"]) . "%") . "`t"
			} else {
				rep:=rep . "未定義公式" . "`t"
			}
		}
		rep:=rep . "`n"
	}
	rep:=rep . "`n"
	;~ DUP
	rep:=rep . "七.查核樣品重覆試驗：`n"
	posi_1:=checknuminsmaple(js["SPK"][1]["sample"],jres)
	posi_2:=checknuminsmaple(js["DUP"][1]["sample"],jres)
	loop, % js.SPKcompound["order"].MaxIndex()
	{
		currentcompound:=js.SPKcompound["order"][A_Index]
		thisgt:=jmethod[mode]["titles"]["SPKR"]
		loop, % thisgt.MaxIndex(){
			mgtkey:=thisgt[A_index]
			thisit:= mgt[mgtkey]
			if (thisit="var_compound"){
				rep:=rep . currentcompound . "`t"
			} else if (thisit="取樣重量"){
				rep:=rep . thisit . jmethod[mode]["unitsam"] . "`t"
			} else if (thisit="定容量"){
				rep:=rep . thisit . jmethod[mode]["unitvol"] . "`t"
			} else if (thisit="分析濃度"){
				rep:=rep . thisit . "(" . jmethod[mode]["unit"] . ")`t"
			} else if (thisit="檢體濃度" || thisit="添加濃度" || thisit="平均濃度"){
				rep:=rep . thisit . "(" . jmethod[mode]["unitPP"] . ")`t"
			} else {
				rep:=rep . thisit . "`t"
			}
		}
		rep:=rep . "`n"
		
		comp:=js.SPKcompound["order"][A_Index]
		sample_name_1:=js["SPK"][1]["remark"]
		weight_1:=js["SPK"][1]["weight"]
		volume_1:=js["SPK"][1]["volume"]
		area_1:=jres.sample[posi_1][comp]["peakarea"]
		calc_conc_1:=countconc(area_1,js["yabr"][comp]["a"],js["yabr"][comp]["b"])
		calc_pp_1:=calc_conc_1*volume_1/weight_1*jmethod[mode]["CR_PP"]
		add_pp_1:=jmethod[mode]["SPK_conc"]
		
		ISArea_1:=jres.sample[posi_1][comp]["ISArea"]
		IAratio_1:=area_1/ISArea_1
		calc_conc_IS_1:=countconc(IAratio_1,js["yabr"][comp]["a"],js["yabr"][comp]["b"])
		calc_pp_IS_1:=calc_conc_IS_1*volume_1/weight_1*jmethod[mode]["CR_PP"]

		

		
		sample_name_2:=js["DUP"][1]["remark"]
		weight_2:=js["DUP"][1]["weight"]
		volume_2:=js["DUP"][1]["volume"]
		area_2:=jres.sample[posi_2][comp]["peakarea"]
		calc_conc_2:=countconc(area_2,js["yabr"][comp]["a"],js["yabr"][comp]["b"])
		calc_pp_2:=calc_conc_2*volume_2/weight_2*jmethod[mode]["CR_PP"]
		add_pp_2:=jmethod[mode]["DUP_conc"]
		
		ISArea_2:=jres.sample[posi_2][comp]["ISArea"]
		IAratio_2:=area_2/ISArea_2
		calc_conc_IS_2:=countconc(IAratio_2,js["yabr"][comp]["a"],js["yabr"][comp]["b"])
		calc_pp_IS_2:=calc_conc_IS_2*volume_2/weight_2*jmethod[mode]["CR_PP"]

		ave_pp:=(calc_pp_1+calc_pp_2)/2
		RRP:=abs(calc_pp_1-calc_pp_2)/ave_pp*100
		
		ave_pp_IS:=(calc_pp_IS_1+calc_pp_IS_2)/2
		RRP_IS:=abs(calc_pp_IS_1-calc_pp_IS_2)/ave_pp_IS*100
		
		if (RRP>20 || RRP<-20){
			abnormalmsg:=abnormalmsg . "品管SPKDUP`t相對差異>+-20%" . comp . "`t相對差異=" . RRP . "%`n"
		}
		loop,2
		{
			cursam:=A_index
			loop, % thisgt.MaxIndex()
			{
				column:=A_index
				columntype:=jmethod[mode]["titles"]["SPKR"][column]
				if (columntype="var_compound"){
					if (cursam=1){
						rep:=rep . "Spike" . "1" . "(" . sample_name_%cursam% . ")" . "`t"
					} else {
						rep:=rep . "Duplicate" . "1" . "(" . sample_name_%cursam% . ")" . "`t"
					}
				} else if (columntype="weight"){
					rep:=rep . weight_%cursam% . "`t"
				} else if (columntype="volume"){
					rep:=rep . volume_%cursam% . "`t"
				} else if (columntype="area"){
					rep:=rep . area_%cursam% . "`t"
				} else if (columntype="calc_conc"){
					rep:=rep . stavalue(round(calc_conc_%cursam%,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="calc_pp"){
					rep:=rep . stavalue(round(calc_pp_%cursam%,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="add_pp"){
					rep:=rep . add_pp_%cursam% . "`t"
				} else if (columntype="ave_pp"){
					if (cursam=1){
						rep:=rep . stavalue(round(ave_pp,jmethod[mode]["digit"])) . "`t"
					} else {
						rep:=rep . "`t"
					}
				} else if (columntype="RRP"){
					if (cursam=1){
						rep:=rep . stavalue(round(RRP,jmethod[mode]["percentdigit"]) . "%") . "`t"
					} else {
						rep:=rep . "`t"
					}
				} else if (columntype="Isarea"){
					rep:=rep . Isarea_%cursam% . "`t"
				} else if (columntype="AI_ratio"){
					rep:=rep . stavalue(round(IAratio_%cursam%,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="calc_conc_IS"){
					rep:=rep . stavalue(round(calc_conc_IS_%cursam%,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="calc_pp_IS"){
					rep:=rep . stavalue(round(calc_pp_IS_%cursam%,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="ave_pp_IS"){
					if (cursam=1){
						rep:=rep . stavalue(round(ave_pp_IS,jmethod[mode]["digit"])) . "`t"
					} else {
						rep:=rep . "`t"
					}
				} else if (columntype="RRP_IS"){
					if (cursam=1){
						rep:=rep . stavalue(round(RRP_IS,jmethod[mode]["percentdigit"]) . "%") . "`t"
					} else {
						rep:=rep . "`t"
					}
				}else {
					rep:=rep . "未定義公式" . "`t"
				}
			}
			rep:=rep . "`n"
		}
		
	}
	rep:=rep . "`n"
	;~ TEST
	rep:=rep . "八、檢體檢驗結果：`n"
	loop, % js.yabr.order.MaxIndex()
	{
		currentcompound:=js.yabr.order[A_Index]
		comp:=js.yabr.order[A_Index]
		rep:=rep . "(" . A_index . ")" . currentcompound . "`n"
		thisgt:=jmethod[mode]["titles"]["TEST"]
		loop, % thisgt.MaxIndex(){
			mgtkey:=thisgt[A_index]
			thisit:= mgt[mgtkey]
			if (thisit="取樣重量"){
				rep:=rep . thisit . jmethod[mode]["unitsam"] . "`t"
			} else if (thisit="定容量"){
				rep:=rep . thisit . jmethod[mode]["unitvol"] . "`t"
			} else if (thisit="分析濃度"){
				rep:=rep . thisit . "(" . jmethod[mode]["unit"] . ")`t"
			} else if (thisit="檢體濃度"){
				rep:=rep . thisit . "(" . jmethod[mode]["unitPP"] . ")`t"
			} else {
				rep:=rep . thisit . "`t"
			}
		}
		rep:=rep . "`n"
		if (js.TEST.MaxIndex()=2){
			posi_1:=checknuminsmaple(js["TEST"][1]["sample"],jres)
			weight_1:=js["TEST"][1]["weight"]
			volume_1:=js["TEST"][1]["volume"]
			ISArea_1:=jres.sample[posi_1][currentcompound]["ISArea"]
			area_1:=jres.sample[posi_1][currentcompound]["peakarea"]
			IAratio_1:=area_1/ISArea_1
			calc_conc_IS_1:=countconc(IAratio_1,js["yabr"][currentcompound]["a"],js["yabr"][currentcompound]["b"])
			calc_pp_IS_1:=calc_conc_IS_1*volume_1/weight_1*jmethod[mode]["CR_PP"]
			;~ msgbox % calc_pp_IS_1
			posi_2:=checknuminsmaple(js["TEST"][2]["sample"],jres)
			weight_2:=js["TEST"][2]["weight"]
			volume_2:=js["TEST"][2]["volume"]
			ISArea_2:=jres.sample[posi_2][currentcompound]["ISArea"]
			area_2:=jres.sample[posi_2][currentcompound]["peakarea"]
			IAratio_2:=area_2/ISArea_2
			calc_conc_IS_2:=countconc(IAratio_2,js["yabr"][currentcompound]["a"],js["yabr"][currentcompound]["b"])
			calc_pp_IS_2:=calc_conc_IS_2*volume_2/weight_2*jmethod[mode]["CR_PP"]
			;~ msgbox % calc_pp_IS_2
			ave_pp_IS:=(calc_pp_IS_1+calc_pp_IS_2)/2
			RRP_IS:=abs(calc_pp_IS_1-calc_pp_IS_2)/ave_pp_IS*100
		} else {
			RRP_IS:="請手動計算"
		}
		loop, % js.TEST.MaxIndex()
		{
			sample_num:=A_Index
			sample_name:=js["TEST"][A_index]["remark"]
			sample_code:=js["TEST"][A_index]["sample"]
			weight:=js["TEST"][A_index]["weight"]
			volume:=js["TEST"][A_index]["volume"]
			posi:=checknuminsmaple(js["TEST"][A_index]["sample"],jres)
			RT:=jres.sample[posi][currentcompound]["analyteRT"] 
			area:=jres.sample[posi][currentcompound]["peakarea"]
			calc_conc:=countconc(area,js["yabr"][currentcompound]["a"],js["yabr"][currentcompound]["b"])
			calc_pp:=calc_conc*volume/weight*jmethod[mode]["CR_PP"]
			LQ:=jmethod[mode]["STD_conc"][1]/5
			
			
			ISArea:=jres.sample[posi][comp]["ISArea"]
			IAratio:=area/ISArea
			calc_conc_IS:=countconc(IAratio,js["yabr"][comp]["a"],js["yabr"][comp]["b"])
			calc_pp_IS:=calc_conc_IS*volume/weight*jmethod[mode]["CR_PP"]
			
			
			
			loop, % thisgt.MaxIndex()
			{
				column:=A_index
				columntype:=jmethod[mode]["titles"]["TEST"][column]
				if (columntype="sample_num"){
					rep:=rep . sample_num . "`t"
				} else if (columntype="sample_code"){
					rep:=rep . sample_code . "`t"
				}else if (columntype="sample_name"){
					rep:=rep . sample_name . "`t"
				} else if (columntype="weight"){
					rep:=rep . weight . "`t"
				} else if (columntype="volume"){
					rep:=rep . volume . "`t"
				} else if (columntype="RT"){
					rep:=rep . stavalue(round(RT,jmethod[mode]["percentdigit"])) . "`t"
				} else if (columntype="area"){
					rep:=rep . area . "`t"
				} else if (columntype="calc_conc"){
					if (calc_conc<LQ){
						rep:=rep . "<" . round(LQ,jmethod[mode]["digit"]) . "`t"
					} else {
						rep:=rep . stavalue(round(calc_conc,jmethod[mode]["digit"])) . "`t"
					}
				} else if (columntype="calc_pp"){
					if (calc_conc<LQ){
						rep:=rep . "未檢出" . "`t"
					} else {
						rep:=rep . stavalue(round(calc_pp,jmethod[mode]["digit"])) . "`t"
					}
				} else if (columntype="Remark"){
					rep:=rep . "" . "`t"
				} else if (columntype="Isarea"){
					rep:=rep . Isarea . "`t"
				} else if (columntype="AI_ratio"){
					rep:=rep . stavalue(round(IAratio,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="calc_conc_IS"){
					rep:=rep . stavalue(round(calc_conc_IS,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="calc_pp_IS"){
					rep:=rep . stavalue(round(calc_pp_IS,jmethod[mode]["digit"])) . "`t"
				} else if (columntype="RRP_IS"){
					if (sample_num=1){
						if (js.TEST.MaxIndex()=2){
							rep:=rep . stavalue(round(RRP_IS,jmethod[mode]["percentdigit"]) . "%") . "`t"
						} else {
							rep:=rep . RRP_IS . "`t"
						}
					}
				} else {
					rep:=rep . "未定義公式" . "`t"
				}
			}
			rep:=rep . "`n"
		}
	}
	return rep
}



ADDsample:
gui, main:default
gui, main:listview, list_sample
gonext:=true
errmsg:=""

gui,main:default
gui,main:listview, list_sample
totalrow:=LV_GetCount()
samtxt:=""
loop, % totalrow
{
	currentrow:=A_index
	LV_GetText(ctext1, currentrow, 1)
	LV_GetText(ctext2, currentrow, 2)
	samtxt:=samtxt . ctext1 . ctext2
}

loop,9
{
	guicontrolget, GSam%A_index%, main:, GSam%A_index%
	GuiControlget, GSam%A_index%_enable, main:Enabled, gsam%A_index%
	if (GSam%A_index%="N/A"){
		gonext:=false
		errmsg:= errmsg . "不可手動輸入N/A`n"
	}
	if (A_index>=4 && A_index <=7){
		if (GSam%A_index%*1 > 0 || GSam%A_index%_enable=0){
		} else {
			gonext:=false
			erritem:={}
			erritem[4]:="濃度"
			erritem[5]:="重量"
			erritem[6]:="體積"
			erritem[7]:="稀釋"
			erritem[8]:="分類"
			errmsg:= errmsg . erritem[A_index] . "須為>0的數值`n"
		}
	}
	
	if (GSam%A_index%_enable=0){
		GSam%A_index%:="N/A"
	}
}
if (instr(samtxt,GSam1 . GSam2)){
	gonext:=false
	errmsg:= errmsg . GSam1 . "-" . GSam2 . "重複`n"
}
if (gonext){
	LV_add("",GSam1,GSam2,jres.sample[GSam3].samplename,GSam4,GSam5,GSam6,GSam7,GSam8,GSam9)
	loop, 9
	{
		LV_ModifyCol(A_index, "AutoHdr")
	}
	gosub, countsample
} else {
	MsgBox, 4096, 錯誤,% errmsg
}
return

GSam1:
guicontrolget, mode, main:, mode
GuiControlGet, GSam1, main:, GSam1
loop,9
{
	if (A_index!=1 && A_index!=3){
		guicontrol, main:disable, GSam%A_Index%
		if (A_index!=2){
			guicontrol, main:, GSam%A_Index%,
		}
	}
}
for key,item in jmethod[mode][GSam1]
{
	guicontrol, main:Enable, % item
}
gosub, autoGSam1
return


autoGsam1:
guicontrolget, GSam1,main:, GSam1
find=0
if (GSam1="STD"){
	guicontrol, main:choose, GSam2, 1
	gosub, GSam2
} else if (GSam1="ICV"){
	guicontrol, main:choose, GSam2, 0
	loop, % jres.sample.maxindex()
	{
		if (instr(jres.sample[A_index].samplename,"ICV")){
			find:=A_index
			break
		}
	}
	if (find!=0){
		guicontrol, main:choose, GSam3, % find
		GuiControl, main:, GSam4, % jmethod[mode]["ICV_conc"]
	} else {
		guicontrol, main:choose, GSam3, 1
	}
} else if (GSam1="CCV"){
	guicontrol, main:choose, GSam2, 1
	gosub, GSam2
} else if (GSam1="BK"){
	guicontrol, main:choose, GSam2, 0
	loop, % jres.sample.maxindex()
	{
		if (instr(jres.sample[A_index].samplename,"BK") || instr(jres.sample[A_index].samplename,"blank")){
			find:=A_index
			break
		}
	}
	if (find!=0){
		guicontrol, main:choose, GSam3, % find
		
	} else {
		guicontrol, main:choose, GSam3, 1
	}
	GuiControl, main:, GSam5, % jmethod[mode]["BK_item"]["weight"]
	GuiControl, main:, GSam6, % jmethod[mode]["BK_item"]["volume"]
} else if (GSam1="SPK"){
	guicontrol, main:choose, GSam2, 0
	loop, % jres.sample.maxindex()
	{
		if (instr(jres.sample[A_index].samplename,"SPK") || instr(jres.sample[A_index].samplename,"spkie")){
			find:=A_index
			break
		}
	}
	if (find!=0){
		guicontrol, main:choose, GSam3, % find

	} else {
		guicontrol, main:choose, GSam3, 1
	}
	GuiControl, main:, GSam5, % jmethod[mode]["SPK_item"]["weight"]
	GuiControl, main:, GSam6, % jmethod[mode]["SPK_item"]["volume"]
} else if (GSam1="DUP"){
	guicontrol, main:choose, GSam2, 0
	loop, % jres.sample.maxindex()
	{
		if (instr(jres.sample[A_index].samplename,"DUP")){
			find:=A_index
			break
		}
	}
	if (find!=0){
		guicontrol, main:choose, GSam3, % find
		
	} else {
		guicontrol, main:choose, GSam3, 1
	}
	GuiControl, main:, GSam5, % jmethod[mode]["DUP_item"]["weight"]
	GuiControl, main:, GSam6, % jmethod[mode]["DUP_item"]["volume"]
} else if (GSam1="TEST"){
	guicontrol, main:choose, GSam2, 1
	gosub, GSam2
} 
return
GSam2:
GuiControlGet,GSam2,main:,GSam2
find:=0
loop,9
{
	if (A_index!=1 && A_index!=3){
		if (A_index!=2){
			guicontrol, main:, GSam%A_Index%,
		}
	}
}
if (GSam1="STD"){
	findcount:=0
	loop, % jres.sample.maxindex()
	{
		if (instr(jres.sample[A_index].samplename,"matrix") || instr(jres.sample[A_index].samplename,"STD_")){
			findcount+=1
			if (findcount=GSam2){
				find:=A_index
				break
			}
		}
	}

} else if (GSam1="CCV"){
	findcount:=0
	loop, % jres.sample.maxindex()
	{
		if (instr(jres.sample[A_index].samplename,"CCV")){
			findcount+=1

			if (findcount=GSam2){
				find:=A_index
				break
			}
		}
	}
} else if (GSam1="TEST"){
	findcount:=0
	loop, % jres.sample.maxindex()
	{
		if (instr(jres.sample[A_index].samplename,"TEST") ){
			findcount+=1
			if (findcount=GSam2){
				find:=A_index
				break
			}
		}
	}
} 
if (find!=0){
	guicontrol, main:choose, GSam3, % find
	guicontrolget, mode, main:, mode
	
} else {
	guicontrol, main:choose, GSam3, 1
}
if (GSam1="STD"){
	GuiControl, main:, GSam4, % jmethod[mode]["STD_conc"][GSam2]
} else if (GSam1="CCV"){
	GuiControl, main:, GSam4, % jmethod[mode]["CCV_conc"]
} else if (GSam1="TEST"){
	GuiControl, main:, GSam5, % jmethod[mode]["TEST_item"]["weight"]
	GuiControl, main:, GSam6, % jmethod[mode]["TEST_item"]["volume"]
}
return

selectall:
if (jres.compound.MaxIndex()>0){
	gui, main:default
	gui, main:listview, list_abr
	if (!SPKALL){
		loop, % jres.compound.MaxIndex()
		{
			LV_Modify(A_index, "+check")
		}
		SPKALL:=true
	} else {
		loop, % jres.compound.MaxIndex()
		{
			LV_Modify(A_index, "-check")
		}
		SPKALL:=false
	}
} else {
	msgbox 請先轉換
}
return

selectpreload:
if (jres.compound.MaxIndex()>0){
	for key, val in jmethod[mode]["SPK_compound"]
	{
		LV_Modify(val, "+check")
	}
} else {
	msgbox 請先轉換
}
return


re:
Reload
return

trall:
GuiControlGet, input1mode, main:, file1
if (input1mode!="不使用"){
	GuiControlGet, filepath1, main:, filepath1
	ExtractText(result1, filepath1)
	;~ Clipboard:=result1
	if (input1mode="WORD"){
		jres:=jsonfromWORD(result1)
	} else if (input1mode="PDF"){
		jres:=jsonfromPDF(result1)
	} else if (input1mode="TXT"){
		jres:=jsonfromTXT(result1)
		checkyabr(jres)
	}
}

generateitem(jres)
gui, main:default
gui, main:listview, list_abr
guicontrolget, mode, main:, mode
for key, val in jmethod[mode]["SPK_compound"]
{
	LV_Modify(val, "+check")
}
return

checkyabr(jres){
	errmsg:=""
	errmsg1:=""
	errmsg2:=""
	for key, item in jres["yabr"]
		if (key!="TPP"){
			if (item["r"]<0.99){
				errmsg1:=errmsg1 . key . "`tr=" . item["r"] . "`n"
		}
	}
	;~ for key, sample in jres["sample"]
	;~ {
		;~ for compound, item in sample
		;~ {
			;~ if (compound="samplename"){
			;~ } else {
				;~ if (compound!="TPP"){
					;~ if (item["ratioflag"]!="NO"){
						;~ errmsg2:=errmsg2 . sample["samplename"] . "`t" . compound . "`tratioflag=" . item["ratioflag"] . "`n"
					;~ }
				;~ }
			;~ }
		;~ }
	;~ }
	if (errmsg1!="" || errmsg2!=""){
		if (errmsg1!=""){
			errmsg:=errmsg . "R<0.99`n" . errmsg1 . "`n"
		}
		;~ if (errmsg2!=""){
			;~ errmsg:=errmsg . "tratioflag!=NO`n" . errmsg2 . "`n"
		;~ }
		IfExist, errmsg.txt
		{
			FileDelete, errmsg.txt
		}
		FileAppend, %errmsg%, errmsg.txt
		run, errmsg.txt
	}
}

generateitem(jres){
	gui, main:default
	gui, main:listview, list_abr
	LV_delete()
	gui, main:listview, list_sample
	LV_delete()
	gui, main:listview, list_abr
	itemcount:=0
	for key,item in jres["yabr"]
	{
		itemcount+=1
		LV_add("",itemcount,item["name"],item["a"],item["b"],item["r"])
	}
	loop, 5
	{
		LV_ModifyCol(A_index, "AutoHdr")
	}
	guicontrol, main:enable, GSam1
	
	guicontrol, main:enable, GSam3
	
	guicontrol, main:enable, ADDsample
	guicontrol, main:enable, transexcel
	guicontrol, main:enable, imptxt
	guicontrol, main:enable, exptxt
	GuiControl, main:, GSam3, |
	for key, item in jres["sample"]
	{
		GuiControl, main:, GSam3, % item["samplename"]
		GuiControl, sample:, GSam3, % item["samplename"]
	}
	guicontrol, main:Choose, GSam1, 1
	gosub, GSam1
}


jsonfromWORD(content){
	retobj:={}
	retobj["compound"]:={}
	retobj["yabr"]:={}
	retobj["sample"]:={}
	A_con:=StrSplit(content,"`r`n")
	compoundcount:=0
	yabrcount:=0
	samplecount:=0
	for row, line in A_con
	{
		if (instr(line,"Analyte Name:") && instr(line," 1")){
			compound:=StrSplit(StrSplit(line,"Analyte Name:")[2]," 1")[1]
			retobj["compound"].Push(compound)
			Regression:=A_con[row+20]
			thea:=trim(StrSplit(StrSplit(Regression,"y =")[2],"x +")[1])
			theb:=trim(StrSplit(StrSplit(Regression,"x +")[2],"(r =")[1])
			if (instr(Regression, ", ")){
				ther:=trim(StrSplit(StrSplit(Regression,", ")[1],"(r =")[2])
				ther2:=trim(StrSplit(StrSplit(StrSplit(Regression,", ")[2]," = ")[2],")")[1])
			} else {
				ther:=trim(StrSplit(StrSplit(Regression,"(r =")[2],")")[1])
				ther2:=""
			}
			if (instr(thea,"e")){
				thea:=eptonum(thea)
			}
			if (instr(theb,"e")){
				theb:=eptonum(theb)
			}
			yabrcount+=1
			retobj["yabr"][yabrcount]:={}
			retobj["yabr"][yabrcount]["name"]:=compound
			retobj["yabr"][yabrcount]["a"]:=thea
			retobj["yabr"][yabrcount]["b"]:=theb
			retobj["yabr"][yabrcount]["r"]:=ther
			retobj["yabr"][yabrcount]["r2"]:=ther2
		}
		if (line="Sample Name"){
			s_name:=trim(A_con[row+1])
			samplecount+=1
			retobj["sample"][samplecount]:={}
			retobj["sample"][samplecount]["samplename"]:=s_name
			con_name:=false
			con_RT:=false
			con_Area:=false
			con_ISArea:=false
			currnet_row:=row+1
			loop, 5000
			{
				findrow:=currnet_row+A_Index
				
				if (con_name=false){
					if (instr(A_con[findrow],"Analyte Peak Name") || instr(A_con[findrow],"AnalytePeak Name")){
						con_name_row:=findrow
						con_name:=true
					}
				}
				if (con_RT=false){
					if (instr(A_con[findrow],"Analyte RT (min)")){
						con_RT_row:=findrow
						del_RT:=con_RT_row-con_name_row
						con_RT:=true
					}
				}
				if (con_Area=false){
					if (instr(A_con[findrow],"Peak Area (counts)") || instr(A_con[findrow],"PeakArea (counts)")){
						con_Area_row:=findrow
						del_Area:=con_Area_row-con_name_row
						con_Area:=true
					}
				}
				if (con_ISArea=false){
					if (instr(A_con[findrow],"IS PeakArea (counts)")){
						con_ISArea_row:=findrow
						del_ISArea:=con_ISArea_row-con_name_row
						con_ISArea:=true
					}
				}
				if (instr(A_con[findrow]," 1")){
					if (match1(A_con[findrow],retobj["compound"])){
						t_compound:=StrSplit(A_con[findrow]," 1")[1]
						t_peakarea:=A_con[findrow+del_Area]
						if (instr(t_peakarea,"e")){
							t_peakarea:=eptonum(t_peakarea)
						}
						t_analyteRT:=A_con[findrow+del_RT]
						
						
						retobj["sample"][samplecount][t_compound]:={}
						retobj["sample"][samplecount][t_compound]["peakarea"]:=t_peakarea
						retobj["sample"][samplecount][t_compound]["analyteRT"]:=t_analyteRT
						if (con_ISArea){
							t_ISarea:=A_con[findrow+del_ISArea]
							if (instr(t_ISarea,"e")){
								t_ISarea:=eptonum(t_ISarea)
							}
							retobj["sample"][samplecount][t_compound]["ISArea"]:=t_ISarea
						}
					}
				} 
				if (A_con[findrow]="Sample Name"){
					break
				}
			}
		}
	}
	jmethods:=JsonDump(retobj)
	Clipboard:=jmethods
	return retobj
}

jsonfromPDF(content){
	retobj:={}
	retobj["compound"]:={}
	retobj["yabr"]:={}
	retobj["sample"]:={}
	A_con:=StrSplit(content,"`r`n")
	compoundcount:=0
	yabrcount:=0
	samplecount:=0
	currentmode:="yabr"
	for row, line in A_con
	{
		if (currentmode="yabr"){
			if (trim(line)="Name"){
				currentmode="sample"
			}
		}
		if (currentmode="yabr"){
			if (instr(line,"Compound name: ")){
				StringRight, rt3, line,3
				if (rt3!="-D5"){
					compound:=trim(StrSplit(line,"Compound name: ")[2])
					if (instr(compound,"(")){
						compound:=trim(StrSplit(compound,"(")[1])
					}
					retobj["compound"].Push(compound)
					Regression1:=A_con[row+1]
					Regression2:=A_con[row+2]
					thea:=trim(strsplit(StrSplit(Regression2,"Calibration curve:")[2],"* x +")[1])
					theb:=trim(strsplit(StrSplit(Regression2,"Calibration curve:")[2],"* x +")[2])
					ther:=trim(strsplit(StrSplit(Regression1,"r =")[2],", r^2 =")[1])
					ther2:=trim(strsplit(StrSplit(Regression1,"r =")[2],", r^2 =")[2])
					yabrcount+=1
					retobj["yabr"][yabrcount]:={}
					retobj["yabr"][yabrcount]["name"]:=compound
					retobj["yabr"][yabrcount]["a"]:=thea
					retobj["yabr"][yabrcount]["b"]:=theb
					retobj["yabr"][yabrcount]["r"]:=ther
					retobj["yabr"][yabrcount]["r2"]:=ther2
				}
			}
		} else {
			if (trim(line)="Name"){
				loop, 50000
				{
					checkrow:=row-A_Index
					if (instr(A_con[checkrow],"Name: ")){
						s_name:=trim(StrSplit(strsplit(A_con[checkrow],"Name: ")[2],", Date:")[1])
						samplecount+=1
						break
					}
				}
				retobj["sample"][samplecount]:={}
				retobj["sample"][samplecount]["samplename"]:=s_name
				currentcompound:=0
				findRT:=false
				findarea:=false
				findisarea:=false
				hadisarea:=false
				loop, 8000
				{
					checkrow:=row+A_Index
					if (findRT=false){
						if (trim(A_con[checkrow])="RT"){
							;~ msgbox % "RT`n" . A_con[checkrow]
							RTROW:=checkrow
							findRT:=true
						}
					}
					if (findarea=false){
						if (trim(A_con[checkrow])="Area"){
							s_name:=trim(StrSplit(strsplit(A_con[checkrow],"Name: ")[2],", Date:")[1])
							AREAROW:=checkrow
							;~ msgbox % "Area`n" . A_con[checkrow]
							findarea:=true
						}
					}
					if (findisarea=false){
						if (instr(A_con[checkrow]," IS Area  ")){
							s_name:=trim(StrSplit(strsplit(A_con[checkrow],"Name: ")[2],", Date:")[1])
							ISAREAROW:=checkrow
							findisarea:=true
							hadisarea:=false
						} else if (instr(A_con[checkrow],"IS Area")){
							s_name:=trim(StrSplit(strsplit(A_con[checkrow],"Name: ")[2],", Date:")[1])
							ISAREAROW:=checkrow
							findisarea:=true
							hadisarea:=true
						}
					}
					if (findRT && findarea && findisarea){
						break
					}
				}
				RTcounnt:=AREAROW-RTROW-1
				;~ msgbox % RTcounnt
				areacount:=ISAREAROW-AREAROW-1
				if (RTcounnt>=yabrcount && areacount>=yabrcount){
					loop, % yabrcount
					{
						t_compound:=retobj["compound"][A_index]
						retobj["sample"][samplecount][t_compound]:={}
						retobj["sample"][samplecount][t_compound]["peakarea"]:=A_con[AREAROW+A_Index]
						if (hadisarea){
							retobj["sample"][samplecount][t_compound]["ISArea"]:=A_con[ISAREAROW+A_Index]
						} 
						retobj["sample"][samplecount][t_compound]["analyteRT"]:=A_con[RTROW+A_Index]
					}
				} else {
					loop, % yabrcount
					{
						t_compound:=retobj["compound"][A_index]
						retobj["sample"][samplecount][t_compound]:={}
						retobj["sample"][samplecount][t_compound]["peakarea"]:=0
						retobj["sample"][samplecount][t_compound]["analyteRT"]:=0
					}
				}
			}
		}
	}
	jmethods:=JsonDump(retobj)
	Clipboard:=jmethods
	return retobj
}

jsonfromTXT(content){
	retobj:={}
	retobj["compound"]:={}
	retobj["yabr"]:={}
	retobj["sample"]:={}
	A_con:=StrSplit(content,"`r`n")
	compoundcount:=0
	yabrcount:=0
	for row, line in A_con
	{
		if (SubStr(line, 1, 8) = "Compound"){
			currentrow:=row
			compoundcount+=1
			comp:=StrSplit(line,":  ")[2]
			retobj["compound"][compoundcount]:=comp
			samplecount:=0
			yabr:={}
			conc_a:=[]
			area_a:=[]
			loop, 500
			{
				searhrow:=currentrow+A_index
				if (instr(A_con[searhrow],"`t")){
					if (instr(A_con[searhrow],"Name`tType")){
						A_line:=StrSplit(A_con[searhrow],"`t")
						loop, % A_line.MaxIndex()
						{
							if (A_line[A_index]="Name"){
								name_C:=A_Index
							} else if (A_line[A_index]="Type"){
								type_C:=A_Index
							} else if (A_line[A_index]="Std. Conc"){
								conc_C:=A_Index
							} else if (A_line[A_index]="RT"){
								RT_C:=A_Index
							} else if (A_line[A_index]="Area"){
								area_C:=A_Index
							} else if (A_line[A_index]="IS Area"){
								ISarea_C:=A_Index
							} else if (instr(A_line[A_index],"Ratio Flag")){
								ratioflag_C:=A_Index
							}
						}
					} else {
						samplecount+=1
						if (retobj["sample"].HasKey(samplecount)){
						} else {
							retobj["sample"][samplecount]:={}
						}
						retobj["sample"][samplecount][comp]:={}
						A_line:=StrSplit(A_con[searhrow],"`t")
						retobj["sample"][samplecount]["samplename"]:=A_line[name_C]
						retobj["sample"][samplecount][comp]["peakarea"]:=A_line[area_C]
						retobj["sample"][samplecount][comp]["analyteRT"]:=A_line[RT_C]
						retobj["sample"][samplecount][comp]["ISArea"]:=A_line[ISarea_C]
						retobj["sample"][samplecount][comp]["ratioflag"]:=A_line[ratioflag_C]
						
						if (A_line[type_C]="Standard"){
							conc_a.push(A_line[conc_C])
							area_a.push(A_line[area_C])
						}
					}
				}
				if (SubStr(A_con[searhrow], 1, 8) = "Compound"){
					break
				}
			}
			retobj["yabr"][comp]:=countyabr(conc_a,area_a)
			retobj["yabr"][comp]["name"]:=comp
		}
	}
	
	loop, % retobj["sample"].MaxIndex(){
		cs:=retobj["sample"][A_index]
		compoundcount:=0
		for key, item in cs
		{
			if (IsObject(item)){
				area:=item["peakarea"]
				a:=retobj["yabr"][key]["a"]
				b:=retobj["yabr"][key]["b"]
				r:=retobj["yabr"][key]["r"]
				N:=retobj["yabr"][key]["name"]
				conc:=(area-b)/a
				item["conc"]:=conc
				item["a"]:=a
				item["b"]:=b
				item["r"]:=r
				item["N"]:=N
			}
		}
	}
	jmethods:=JsonDump(retobj)
	Clipboard:=jmethods
	return retobj 
}

file1:
GuiControlGet, input1mode, main:, file1
if (input1mode="WORD"){
	selectmode1:="*.doc;*.docx"
} else if (input1mode="PDF"){
	selectmode1:="*.PDF"
} else if (input1mode="TXT"){
	selectmode1:="*.TXT"
} else {
	selectmode1:="*.*"
}
FileSelectFile, inputfile1 , 1 , %A_ScriptDir% , ,%selectmode1%
if (ErrorLevel=0){
	guicontrol,main:,filepath1, % inputfile1
} else {
	msgbox, 4096, 無選擇檔案, 無選擇檔案
}
return

file2:
GuiControlGet, input2mode, main:, file2
if (input2mode="WORD"){
	selectmode2:="*.doc;*.docx"
} else if (input2mode="PDF"){
	selectmode2:="*.PDF"
} else if (input2mode="TXT"){
	selectmode2:="*.TXT"
} else {
	selectmode2:="*.*"
}
FileSelectFile, inputfile2 , 1 , %A_ScriptDir% , ,%selectmode2%
if (ErrorLevel=0){
	guicontrol,main:,filepath2, % inputfile2
} else {
	msgbox, 4096, 無選擇檔案, 無選擇檔案
}
return



selectmode:
guicontrolget, mode, main:, mode
;~ msgbox % jmethod[mode]["file1"]["enable"]
if (jmethod[mode]["file1"]["enable"]=1){
	guicontrol, main:enable, file1
	guicontrol, main:, file1, % jmethod[mode]["file1"]["name"]
	guicontrol, main:enable, filepath1
} else {
	guicontrol, main:Disable, file1
	guicontrol, main:, file1, 不使用
	guicontrol, main:Disable, filepath1
}
GuiControl, main:, filepath1,
gui, main:default
gui, main:listview, list_abr
LV_Delete()
gui, main:listview, list_sample
LV_Delete()
loop, 9
{
	guicontrol, main:Disable, GSam%A_index%
	if (A_Index=1){
		guicontrol, main:Choose,  GSam%A_index%,0
	} else if (A_Index=2){
		guicontrol, main:Choose,  GSam%A_index%,0
	} if (A_Index=3){
		guicontrol, main:,  GSam%A_index%,|
	} else {
		guicontrol, main:,  GSam%A_index%,
	}
}
guicontrol, main:, countSTD, 0
guicontrol, main:, countICV,0
guicontrol, main:, countCCV, 0
guicontrol, main:, countBK,0
guicontrol, main:, countSPK, 0
guicontrol, main:, countDUP, 0
guicontrol, main:, countTEST,0
guicontrol, main:, GSam1,|
for key , item in jmethod[mode]["samplelist"]
{
	guicontrol, main:, GSam1, % item
}
return


JsonParse(json, rec := false) { 
   static doc := ComObjCreate("htmlfile") 
         , __ := doc.write("<meta http-equiv=""X-UA-Compatible"" content=""IE=9"">") 
         , JS := doc.parentWindow 
   if !rec 
      obj := %A_ThisFunc%(JS.eval("(" . json . ")"), true) 
   else if !IsObject(json) 
      obj := json 
   else if JS.Object.prototype.toString.call(json) == "[object Array]" { 
      obj := [] 
      Loop % json.length 
         obj.Push( %A_ThisFunc%(json[A_Index - 1], true) ) 
   } 
   else { 
      obj := {} 
      keys := JS.Object.keys(json) 
      Loop % keys.length { 
         k := keys[A_Index - 1] 
         obj[k] := %A_ThisFunc%(json[k], true) 
      } 
   } 
   Return obj 
} 

JsonDump(json){
	retobj:=""
	if IsObject(json){
		if (IsSimpleArray(json)){
			retobj:=retobj . "[ "
			for key, value in json
			{
				retobj:=retobj . JsonDump(value) . ","
			}
			retobj:=substr(retobj,1,strlen(retobj)-1)
			retobj:=retobj . "]"
		} else {
			retobj:=retobj . "{ "
			for key, value in json
			{
				retobj:=retobj . """" . key . """:" . JsonDump(value) . ","
			}
			retobj:=substr(retobj,1,strlen(retobj)-1)
			retobj:=retobj . "}"
		}
	} else {
		retobj:="""" . json . """"	
	}
	return retobj
}


IsSimpleArray(array) {
    for key, value in array
        if key is not Integer
            return false
    return true
}

ExtractText(ByRef result, fileName) {
	static hModule := DllCall("LoadLibrary", "Str", "xd2txlib.dll", "Ptr")
	fileLength := DllCall("xd2txlib\ExtractText", "Str", fileName, "Int", False, "Int*", fileText)
	result := StrGet( fileText, fileLength / 2 )
}
eptonum(inputvalue){
	if (instr(inputvalue,"e+")){
		prenum:=StrSplit(inputvalue,"e+")[1]
		digitnum:=StrSplit(inputvalue,"e+")[2]*1
	} else {
		prenum:=StrSplit(inputvalue,"e")[1]
		digitnum:=StrSplit(inputvalue,"e")[2]*1
	}
	finalnum:=round(prenum*(10**digitnum),0)
	return finalnum
}
match1(citem,iarray){
	finditem:=false
	for index, item in iarray
	{
		match1item:=item . " 1"
		if (citem=match1item){
			finditem:=true
			break
		}
	}
	return finditem
}
addsamplewindow(){
	gui, sample: font, s15 cBlack, 微軟正黑體
gui, sample: Show, xcenter ycenter w680 h130, 修改檢體
gui, sample: hide
yy=5
xx=5
gui, sample: add,text, x%xx% y%yy% w70 h30 center, 種類
xx+=70
gui, sample: add,text, x%xx% y%yy% w70 h30 center , 編號
xx+=70
gui, sample: add,text, x%xx% y%yy% w460 h30  center, 樣品
xx+=460
gui, sample: add,text, x%xx% y%yy% w70 h30  center, 濃度
yy+=30
xx=5
gui, sample: font, s13 cBlack, 微軟正黑體
gui, sample: add, dropdownlist, x%xx% y%yy% w70 h30 r10 vGSam1 Disabled , STD|ICV|CCV|BK|SPK|TEST
xx+=70
gui, sample: add, dropdownlist, x%xx% y%yy% w70 h30 r10 vGSam2 Disabled , 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20
xx+=70
gui, sample: add, dropdownlist, x%xx% y%yy% w460 h30 r10 vGSam3 AltSubmit Disabled, 
xx+=460
gui, sample: font, s15 cBlack, 微軟正黑體
gui, sample: add, Edit, x%xx% y%yy% w70 h30 vGSam4 center Disabled, 

yy+=30
xx=5
gui, sample: add,text, x%xx% y%yy% w70 h30 center, 重量
xx+=70
gui, sample: add,Edit, x%xx% y%yy% w70 h30 center vGSam5 Disabled, 
xx+=70
gui, sample: add,text, x%xx% y%yy% w70 h30 center, 體積
xx+=70
gui, sample: add,Edit, x%xx% y%yy% w70 h30 center vGSam6 Disabled, 
xx+=70
gui, sample: add,text, x%xx% y%yy% w70 h30 center , 稀釋
xx+=70
gui, sample: add,Edit, x%xx% y%yy% w70 h30  center vGSam7 Disabled,
xx+=70
gui, sample: add,text, x%xx% y%yy% w70 h30  center, 分類
xx+=70
gui, sample: add, dropdownlist, x%xx% y%yy% w70 h30  center vGSam8 Disabled r10 choose1, I|II|III
yy+=30
xx=5
gui, sample: add,text, x%xx% y%yy% w70 h30 center , 說明
xx+=70
gui, sample: add,Edit, x%xx% y%yy% w490 h30 vGSam9 Disabled, 
xx+=490
yy-=30
gui, sample: add,button, x%xx% y%yy% w110 h60 vADDsample geditsample, 修改

}

countyabr(x,y){
	n := x.MaxIndex() 
	sum_x := 0
	sum_y := 0
	sum_xy := 0
	sum_x2 := 0
	sum_y2 := 0
	Loop, % n
	{
		sum_x += x[A_Index]
		sum_y += y[A_Index]
		sum_xy += x[A_Index] * y[A_Index]
		sum_x2 += x[A_Index] * x[A_Index]
		sum_y2 += y[A_Index] * y[A_Index]
	}
	a := (n * sum_xy - sum_x * sum_y) / (n * sum_x2 - sum_x * sum_x)
	b := (sum_y - a * sum_x) / n
	r := (n * sum_xy - sum_x * sum_y) / Sqrt((n * sum_x2 - sum_x * sum_x) * (n * sum_y2 - sum_y * sum_y))
	r_squared := r * r
	result:={}
	result["a"]:=a
	result["b"]:=b
	result["r"]:=r
	result["r2"]:=r_squared
	return result
}
stavalue(value){
	retv:="=""" . value . """"
	return retv
}

countconc(peakarea,a,b){
	countconc:=(peakarea-b)/a
	return countconc
}

checknuminsmaple(samplename,jres){
	retnum:=""
	loop, % jres.sample.maxindex(){
		if (jres.sample[A_index].samplename=samplename){
			retnum:=A_index
			break
		}
	}
	return retnum
}