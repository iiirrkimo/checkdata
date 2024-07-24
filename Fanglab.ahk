#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
VERname:="Fang_LAB_V4"
;~ ExtractText(result, "BB2.pdf")
;~ IfExist, result.txt
;~ {
	;~ FileDelete, result.txt
;~ }
;~ FileAppend, %result%, result.txt


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
gui, main: show, xcenter ycenter w680 h720, %VERname%
xx=5
yy=5

gui, main: add,text, x%xx% y%yy% w80 h30 center gRE, 選擇模式
xx+=80
gui, main: font, s13 cBlack, 微軟正黑體
gui, main: add, dropdownlist, x%xx% y%yy% w500 h30 r10 vMode gselectmode, 
for key in jmethod
{
	if (key!="generaltitle"){
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
gui, main: add,text, x%xx% y%yy% w580 h30 gtest, 勾選項目為查核樣品
gui, main: font, s15 cBlack, 微軟正黑體
xx+=580
gui, main: add,button, x%xx% y%yy% w90 h30 gselectall, 全部選擇
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
gui, main: add, dropdownlist, x%xx% y%yy% w70 h30 r10 vGSam1 Disabled gGSam1, STD|ICV|CCV|BK|SPK|TEST
xx+=70
gui, main: add, dropdownlist, x%xx% y%yy% w70 h30 r10 vGSam2 Disabled gGSam2, 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20
xx+=70
gui, main: add, dropdownlist, x%xx% y%yy% w460 h30 r10 vGSam3 AltSubmit Disabled, 
xx+=460
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
gui, main: add,text, x%xx% y%yy% w70 h30 center, 內標
xx+=70
gui, main: add,Edit, x%xx% y%yy% w70 h30  center vGSam8 Disabled,
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
gui, main: add,ListView, x%xx% y%yy% w670 h180 vlist_sample AltSubmit glist_sample,  種類|編號|檢體|濃度|重量|體積|稀釋|內標|說明
gui, main: font, s15 cBlack, 微軟正黑體
yy+=180
xx=5
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
yy+=30
xx=5
gui, main: add,TEXT, x%xx% y%yy% w50 h30 center, BK:
xx+=50
gui, main: add,TEXT, x%xx% y%yy% w30 h30 center cblue vcountBK, 0
xx+=30
gui, main: add,TEXT, x%xx% y%yy% w50 h30 center, SPK:
xx+=50
gui, main: add,TEXT, x%xx% y%yy% w30 h30 center cblue vcountSPK, 0
xx+=30
gui, main: add,TEXT, x%xx% y%yy% w50 h30 center, TEST:
xx+=50
gui, main: add,TEXT, x%xx% y%yy% w30 h30 center cblue vcountTEST, 0
yy-=30
xx+=30
gui, main: add,button, x%xx% y%yy% w100 h60 Disabled vimpTXT gimpTXT, 匯入`nTXT
xx+=95
gui, main: add,button, x%xx% y%yy% w100 h60 Disabled vexpTXT gexpTXT, 匯出`nTXT
xx+=95
gui, main: add,button, x%xx% y%yy% w100 h60 Disabled  vtransexcel gtransexcel , 轉換`nEXCEL

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
	} else if (item="TEST"){
		listtest+=1
	}
}
guicontrol, main:, countSTD, % liststd
guicontrol, main:, countICV, % listicv
guicontrol, main:, countCCV, % listccv
guicontrol, main:, countBK, % listbk
guicontrol, main:, countSPK, % listspk
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
	if (A_index>=4 && A_index <=8){
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
	sam_TEST:={}
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
	rep:=generatefromobj(oupt,jres,jmethod)
	
	;~ jmethods:=JsonDump(oupt)
	;~ Clipboard:=jmethods
	Clipboard:=rep
	
	
	LAB0 := ComObjCreate("Excel.Application")
	LAB0.Visible := true
	xlspath = %A_ScriptDir%\Fanglab.xlsm
	SplitPath, xlspath, xlsFile
	LAB01:=LAB0.Workbooks.Open(xlspath)
	LAB01.sheets("檢量線").Range("A:I").clear
	LAB01.sheets("檢量線").Range("A1:A1").PasteSpecial
	msgbox 完成
}
return

generatefromobj(js,jres,jmethod){
	guicontrolget, mode, main:, mode
	rep:=""
	rep:=rep . "三、檢量線製作：`n"
	loop, % js.yabr.order.MaxIndex()
	{
		comp:=js.yabr.order[A_Index]
		yabrnum:=A_Index
		rep:=rep . A_Index . "." . comp . "`t"
		loop, % js.STD.MaxIndex()
		{
			rep:=rep . js["STD"][A_Index]["type"] . js["STD"][A_Index]["num"] . "`t"
		}
		rep:=rep . "`n"
		rep:=rep . "濃度(" . jmethod[mode]["unit"] . ")`t"
		loop, % js.STD.MaxIndex()
		{
			rep:=rep . js["STD"][A_Index]["conc"] . ".000`t"
		}
		rep:=rep . "`n"
		rep:=rep . "Ana Peak`t"
		loop, % js.STD.MaxIndex()
		{
			posi:=checknuminsmaple(js["STD"][A_Index]["sample"],jres)
			rep:=rep . jres.sample[posi][comp]["peakarea"] . "`t"
		}
		rep:=rep . "`n"
		rep:=rep . "y=ax+b`n"
		rep:=rep . "相關系數r=`t" . js["yabr"][comp]["r"] . "`t斜率(a)=`t" . js["yabr"][comp]["a"] . "`t截距(b)=`t" . js["yabr"][comp]["b"] . "`n"
		rep:=rep . "`ty = " . js["yabr"][comp]["a"] . " x+ " . js["yabr"][comp]["b"] . "`n"
		rep:=rep . "`n`n`n`n`n`n`n`n`n`n"
	}
	rep:=rep . "`n`n四、檢量線確認及查核：`n"
	mgt:=jmethod["generaltitle"]
	thisgt:=jmethod[mode]["titles"]["ICV"]
	loop, % thisgt.MaxIndex(){
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
	posi:=checknuminsmaple(js["ICV"][1]["sample"],jres)
	loop, % js.yabr.order.MaxIndex()
	{
		comp:=js.yabr.order[A_Index]
		ii1:=comp
		ii2:=js["ICV"][1]["conc"]
		ii3:=jres.sample[posi][comp]["peakarea"] 
		ii4:=countconc(ii3,js["yabr"][comp]["a"],js["yabr"][comp]["b"])
		ii5:=(ii4-ii2)/ii2*100
		ii6:=jres.sample[posi][comp]["analyteRT"] 
		ii7:=ii6*1.025
		ii8:=ii6*0.975
		loop, 8
		{
			if (A_index=2 || A_index=4){
				temptxt:= round(ii%A_index%,jmethod[mode]["digit"])
			} else if (A_Index=5){
				temptxt:= round(ii%A_index%,jmethod[mode]["percentdigit"]) . "%"
			} else if (A_Index=7 ||A_Index=8 ){
				temptxt:= round(ii%A_index%,jmethod[mode]["percentdigit"])
			} else {
				temptxt:=ii%A_index%
			}
			rep:=rep . temptxt . "`t"
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
			ii1:=comp
			ii2:=js["CCV"][currentsample]["conc"]
			ii3:=jres.sample[posi][comp]["peakarea"] 
			ii4:=countconc(ii3,js["yabr"][comp]["a"],js["yabr"][comp]["b"])
			ii5:=(ii4-ii2)/ii2*100
			ii6:=jres.sample[posi][comp]["analyteRT"] 
			ii7:=ii6*1.025
			ii8:=ii6*0.975
			loop, 8
			{
				if (A_index=2 || A_index=4){
					temptxt:= round(ii%A_index%,jmethod[mode]["digit"])
				} else if (A_Index=5){
					temptxt:= round(ii%A_index%,jmethod[mode]["percentdigit"]) . "%"
				} else if (A_Index=7 ||A_Index=8 ){
					temptxt:= round(ii%A_index%,jmethod[mode]["percentdigit"])
				} else {
					temptxt:=ii%A_index%
				}
				rep:=rep . temptxt . "`t"
			}
			rep:=rep . "`n"
		}
	}
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
		ii1:=comp
		ii2:=js["BK"][1]["remark"]
		ii3:=js["BK"][1]["weight"]
		ii4:=js["BK"][1]["volume"]
		ii5:=jres.sample[posi][comp]["peakarea"]
		ii6:=countconc(ii5,js["yabr"][comp]["a"],js["yabr"][comp]["b"])
		ii7:=ii6*ii4/ii3**jmethod[mode]["CR_PP"]

		loop, 7
		{
			if (A_index=6){
				LQ:=jmethod[mode]["STD_conc"][1]/5
				if (ii6<LQ){
					temptxt:= "<" . round(LQ,jmethod[mode]["digit"])
				} else {
					temptxt:= round(ii%A_index%,jmethod[mode]["digit"])
				}
			} else if (A_index=7){
				LQ:=jmethod[mode]["STD_conc"][1]/5
				if (ii6<LQ){
					temptxt:= "未檢出"
				} else {
					temptxt:= round(ii%A_index%,jmethod[mode]["digit"])
				}
			} else {
				temptxt:=ii%A_index%
			}
			rep:=rep . temptxt . "`t"
		}
		rep:=rep . "`n"
	}
	rep:=rep . "`n"
	rep:=rep . "六、查核樣品分析：`n"
	loop, % js.SPKcompound["order"].MaxIndex()
	{
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
		SPK_recy:=0
		SPK_S:=[]
		loop, % js.SPK.MaxIndex()
		{
			templine:=""
			ii1:="Spike" . A_index . "(" . js["SPK"][A_index]["remark"] . ")"
			ii2:=js["SPK"][A_index]["weight"]
			ii3:=js["SPK"][A_index]["volume"]
			posi:=checknuminsmaple(js["SPK"][A_index]["sample"],jres)
			ii4:=jres.sample[posi][currentcompound]["peakarea"] 
			ii5:=countconc(ii4,js["yabr"][currentcompound]["a"],js["yabr"][currentcompound]["b"])
			ii6:=ii5*ii3/ii2*jmethod[mode]["CR_PP"]
			ii7:=jmethod[mode]["SPK_conc"]
			ii8:=ii6/ii7*100
			loop, 8
			{
				if (A_index=5 || A_index=6){
					temptxt:= round(ii%A_index%,jmethod[mode]["digit"])
				} else if (A_Index=8){
					temptxt:= round(ii%A_index%,jmethod[mode]["percentdigit"]) . "%"
				} else {
					temptxt:=ii%A_index%
				}
				templine:=templine . temptxt . "`t"
			}
			SPK_S.push(templine)
			SPK_recy+=ii8
		}
		SPK_averecy:=round(SPK_recy/SPK_S.MaxIndex(),jmethod[mode]["percentdigit"]) . "%"
		loop, % SPK_S.MaxIndex(){
			if (A_index=1){
				rep:=rep . SPK_S[A_index] . SPK_averecy . "`n"
			} else {
				rep:=rep . SPK_S[A_index] . "`n"
			}
		}
	}
	rep:=rep . "`n"
	rep:=rep . "七.查核樣品重覆試驗:`n"
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
		SPKR_conc:=0
		SPKR_S:=[]
		loop, % js.SPK.MaxIndex()
		{
			templine:=""
			ii1:="Spike" . A_index . "(" . js["SPK"][A_index]["remark"] . ")"
			ii2:=js["SPK"][A_index]["weight"]
			ii3:=js["SPK"][A_index]["volume"]
			posi:=checknuminsmaple(js["SPK"][A_index]["sample"],jres)
			ii4:=jres.sample[posi][currentcompound]["peakarea"] 
			ii5:=countconc(ii4,js["yabr"][currentcompound]["a"],js["yabr"][currentcompound]["b"])
			ii6:=ii5*ii3/ii2*jmethod[mode]["CR_PP"]
			ii7:=jmethod[mode]["SPK_conc"]
			loop, 7
			{
				if (A_index=5 || A_index=6){
					temptxt:= round(ii%A_index%,jmethod[mode]["digit"])
				} else {
					temptxt:=ii%A_index%
				}
				templine:=templine . temptxt . "`t"
			}
			SPKR_S.push(templine)
			SPKR_conc+=ii6
			ii6%A_index%:=ii6
		}
		SPKR_aveconc:=round(SPKR_conc/SPKR_S.MaxIndex(),jmethod[mode]["digit"])
		SPKR_RRP:=round(abs(ii61-ii62)/(SPKR_conc/SPKR_S.MaxIndex())*100,jmethod[mode]["percentdigit"]) . "%"
		loop, % SPKR_S.MaxIndex(){
			if (A_index=1){
				rep:=rep . SPKR_S[A_index] . SPKR_aveconc . "`t" . SPKR_RRP . "`n"
			} else {
				rep:=rep . SPKR_S[A_index] . "`n"
			}
		}
	}
	rep:=rep . "`n"
	rep:=rep . "八、檢體檢驗結果：`n"
	loop, % js.yabr.order.MaxIndex()
	{
		currentcompound:=js.yabr.order[A_Index]
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

		loop, % js.TEST.MaxIndex()
		{
			ii1:=A_Index
			ii2:=js["TEST"][A_index]["remark"]
			ii3:=js["TEST"][A_index]["weight"]
			ii4:=js["TEST"][A_index]["volume"]
			posi:=checknuminsmaple(js["TEST"][A_index]["sample"],jres)
			ii5:=jres.sample[posi][currentcompound]["analyteRT"] 
			ii6:=jres.sample[posi][currentcompound]["peakarea"] 
			ii7:=countconc(ii6,js["yabr"][currentcompound]["a"],js["yabr"][currentcompound]["b"])
			ii8:=ii7*ii4/ii3*jmethod[mode]["CR_PP"]
			LQ:=jmethod[mode]["STD_conc"][1]/5
			loop, 8
			{
				if (A_index=7 ){
					if (ii7<LQ){
						temptxt:= "<" . round(LQ,jmethod[mode]["digit"])
					} else {
						temptxt:= round(ii%A_index%,jmethod[mode]["digit"])
					}
				} else if (A_index=8 ){
					
					if (ii7<LQ){
						temptxt:= "未檢出"
					} else {
						temptxt:= round(ii%A_index%,jmethod[mode]["digit"])
					}
				} else {
					temptxt:=ii%A_index%
				}
				rep:=rep . temptxt . "`t"
			}
			rep:=rep . "`n"
		}
		
	}
	

	

	return rep
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
	if (retnum!=""){
		return retnum
	} else {
		msgbox 出錯了
	}
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
	if (A_index>=4 && A_index <=8){
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
		GuiControl, main:, GSam5, % jmethod[mode]["BK_item"]["weight"]
		GuiControl, main:, GSam6, % jmethod[mode]["BK_item"]["volume"]
	} else {
		guicontrol, main:choose, GSam3, 1
	}
} else if (GSam1="SPK"){
	guicontrol, main:choose, GSam2, 1
	gosub, GSam2
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
		if (instr(jres.sample[A_index].samplename,"matrix")){
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
} else if (GSam1="SPK"){
	findcount:=0
	loop, % jres.sample.maxindex()
	{
		if (instr(jres.sample[A_index].samplename,"spk") || instr(jres.sample[A_index].samplename,"spike") ){
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
	if (GSam1="STD"){
		GuiControl, main:, GSam4, % jmethod[mode]["STD_conc"][GSam2]
	} else if (GSam1="CCV"){
		GuiControl, main:, GSam4, % jmethod[mode]["CCV_conc"]
	} else if (GSam1="SPK"){
		GuiControl, main:, GSam5, % jmethod[mode]["SPK_item"]["weight"]
		GuiControl, main:, GSam6, % jmethod[mode]["SPK_item"]["volume"]
	} else if (GSam1="TEST"){
		GuiControl, main:, GSam5, % jmethod[mode]["TEST_item"]["weight"]
		GuiControl, main:, GSam6, % jmethod[mode]["TEST_item"]["volume"]
	}
} else {
	guicontrol, main:choose, GSam3, 1
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



re:
Reload
return

trall:
GuiControlGet, input1mode, main:, file1
if (input1mode!="不使用"){
	GuiControlGet, filepath1, main:, filepath1
	ExtractText(result1, filepath1)
	if (input1mode="WORD"){
		jres:=jsonfromWORD(result1)
	} else if (input1mode="PDF"){
		jres:=jsonfromPDF(result1)
	} else if (input1mode="TXT"){
		jres:=jsonfromTXT(result1)
	}
} 
;~ if (input2mode!="不使用"){
	;~ GuiControlGet, filepath2, main:, filepath2
	;~ ExtractText(result2, filepath2)
	;~ if (input2mode="WORD"){
		;~ jres2:=jsonfromWORD(result2)
	;~ } else if (input2mode="PDF"){
		;~ jres2:=jsonfromPDF(result2)
	;~ } else if (input2mode="TXT"){
		;~ jres2:=jsonfromTXT(result2)
	;~ }
;~ } 
generateitem(jres)
gui, main:default
gui, main:listview, list_abr
guicontrolget, mode, main:, mode
for key, val in jmethod[mode]["SPK_compound"]
{
	LV_Modify(val, "+check")
}
return


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
			if (instr(thea,"e+")){
				thea:=eptonum(thea)
			}
			if (instr(theb,"e+")){
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
			
			currnet_row:=row+1
			loop, 5000
			{
				findrow:=currnet_row+A_Index
				if (instr(A_con[findrow]," 1")){
					if (match1(A_con[findrow],retobj["compound"])){
						t_compound:=StrSplit(A_con[findrow]," 1")[1]
						t_peakarea:=A_con[findrow+2]
						if (instr(t_peakarea,"e+")){
							t_peakarea:=eptonum(t_peakarea)
						}
						t_expectRT:=A_con[findrow+3]
						t_analyteRT:=A_con[findrow+4]
						
						retobj["sample"][samplecount][t_compound]:={}
						retobj["sample"][samplecount][t_compound]["peakarea"]:=t_peakarea
						retobj["sample"][samplecount][t_compound]["expectRT"]:=t_expectRT
						retobj["sample"][samplecount][t_compound]["analyteRT"]:=t_analyteRT
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
	return 
}

jsonfromTXT(content){
	return 
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
;~ if (jmethod[mode]["file2"]["enable"]=1){
	;~ guicontrol, main:enable, file2
	;~ guicontrol, main:, file2, % jmethod[mode]["file2"]["name"]
	;~ guicontrol, main:enable, filepath2
;~ } else {
	;~ guicontrol, main:Disable, file2
	;~ guicontrol, main:, file2, 不使用
	;~ guicontrol, main:Disable, filepath2
;~ }
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
	prenum:=StrSplit(inputvalue,"e+")[1]
	digitnum:=StrSplit(inputvalue,"e+")[2]*1
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
gui, sample: add,text, x%xx% y%yy% w70 h30 center, 內標
xx+=70
gui, sample: add,Edit, x%xx% y%yy% w70 h30  center vGSam8 Disabled,
yy+=30
xx=5
gui, sample: add,text, x%xx% y%yy% w70 h30 center , 說明
xx+=70
gui, sample: add,Edit, x%xx% y%yy% w490 h30 vGSam9 Disabled, 
xx+=490
yy-=30
gui, sample: add,button, x%xx% y%yy% w110 h60 vADDsample geditsample, 修改

}