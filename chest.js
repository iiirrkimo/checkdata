javascript: (function(){
(function(history){
    var pushState = history.pushState;
    history.pushState = function(state) {
        setTimeout(function() {
			if (document.getElementById('input_fasttype')){
				temptype=document.getElementById('input_fasttype').value;
			}
			if (document.getElementById('create_niisdrag')!=null){
				document.getElementById('create_niisdrag').remove();
			}
            createchest();
        }, 0);
        return pushState.apply(history, arguments);
    };
})(window.history);
chestversion='1140226';
temptype='';
if (document.getElementById('create_niisdrag')!=null){
	document.getElementById('create_niisdrag').remove();
}
escape_populanceConsultation = confirm('百寶箱版本:'+chestversion+'\n看診前是否自動跳過民眾看診首頁');
if (confirm('是否縮減標題及移除頁尾?')){
	head=document.querySelector("#root > header");
	head.style.position = 'absolute';
	head.style.whiteSpace = "nowrap";
	head.style.width = '300px';
	head.style.left = '1600px';
	head.children[0].style.width='30px';
	head.children[0].title=head.children[0].textContent;
	head.children[0].textContent='';
	head.children[0].className='header__toolbar fas fa-home';
	head.children[0].style.fontSize='24px';
	if (document.querySelector('#root > footer')){
		document.querySelector('#root > footer').remove();
	}
	if (document.querySelector('#root > div.wrapper')){
		mainwrapper=document.querySelector('#root > div.wrapper');
		mainwrapper.style.height='910px';
		mainwrapper.style.alignItems = 'flex-start';
	}
}
if (confirm('是否隱藏預防接種作業?')){
	let niislink = document.querySelector('a[href="/niisVaccination"]');
	if (niislink!=null){
		niislink.hidden=true;
	}
}


createchest();
})();
function createchest(){
	ccc=document.URL;
	d0='https://phpcis.chshb.gov.tw/consultationMainPage/';
	d1='https://phpcis.chshb.gov.tw/populanceRegistration';
	d2='https://phpcis.chshb.gov.tw/registration';
	d3='https://phpcis.chshb.gov.tw/registration/';
	d4='https://phpcis.chshb.gov.tw/registration/create';
	d5='https://phpcis.chshb.gov.tw/familyMedicine';
	d6='https://phpcis.chshb.gov.tw/populanceConsultation/';
	d7='https://phpcis.chshb.gov.tw/medicalRefee';
	d8='https://phpcis.chshb.gov.tw/disease';
	d9='https://phpcis.chshb.gov.tw/preventionAdultDownload';
	if (document.getElementById('myDraggable')){
		document.getElementById('myDraggable').remove();
	} 
	if (ccc.includes(d0)){
		create_OPD_one();
	} else if (ccc==d1){
		create_OPD_list();
	} else if (ccc==d2){
		create_REG_list();
	} else if (ccc.includes(d3)||ccc==d4){
		create_REG_one()
	} else if (ccc==d5){
		create_FM();
	} else if (ccc.includes(d6)){
		if (escape_populanceConsultation){
			/*
			preconsbutton=document.getElementsByClassName('commonBtn btn btn-primary');
			indes="";
			if (preconsbutton.length>0){
				for (i=0;i<preconsbutton.length;i++){
					if (preconsbutton[i].textContent=='進入看診作業'){
						indes=i;
						break;
					}
				}
			}
			if (indes!=""){
				preconsbutton[indes].click();
			}
			*/
			let regid=ccc.split(d6)[1];
			window.history.pushState({}, '', '/consultationMainPage/'+regid);
			window.dispatchEvent(new PopStateEvent('popstate'));
			
		}
	} else if (ccc==d7){
		create_Countmonth();
	} else if (ccc==d8){
		create_changeicd();
	} else if (ccc==d9){
		create_newHEupload();
	}
	function create_OPD_one(){
		create_myDraggable();
		button_5line = document.createElement('button');
		button_5line.textContent='變5行';
		button_5line.style.width = '80px';
		button_5line.style.left = '2px';
		button_5line.style.top = '2px';
		button_5line.style.position = 'absolute';
		button_5line.addEventListener('click', button_5line_handle);
		myDraggable.appendChild(button_5line);
		button_HE = document.createElement('button');
		button_HE.textContent='成健問卷';
		button_HE.style.width = '80px';
		button_HE.style.left = '84px';
		button_HE.style.top = '2px';
		button_HE.style.position = 'absolute';
		button_HE.addEventListener('click', button_HE_handle);
		myDraggable.appendChild(button_HE);
		button_OR = document.createElement('button');
		button_OR.textContent='口篩問卷';
		button_OR.style.width = '80px';
		button_OR.style.left = '166px';
		button_OR.style.top = '2px';
		button_OR.style.position = 'absolute';
		button_OR.addEventListener('click', button_OR_handle);
		myDraggable.appendChild(button_OR);
		button_goup = document.createElement('button');
		button_goup.textContent='▲';
		button_goup.style.width = '40px';
		button_goup.style.left = '248px';
		button_goup.style.top = '2px';
		button_goup.style.position = 'absolute';
		button_goup.addEventListener('click', button_goup_handle);
		myDraggable.appendChild(button_goup);
		button_godown = document.createElement('button');
		button_godown.textContent='▼';
		button_godown.style.width = '40px';
		button_godown.style.left = '288px';
		button_godown.style.top = '2px';
		button_godown.style.position = 'absolute';
		button_godown.addEventListener('click', button_godown_handle);
		myDraggable.appendChild(button_godown);
		
		button_changetype = document.createElement('button');
		button_changetype.textContent='換身份';
		button_changetype.style.width = '80px';
		button_changetype.style.left = '2px';
		button_changetype.style.top = '34px';
		button_changetype.style.position = 'absolute';
		button_changetype.addEventListener('click', button_changetype_handle);
		myDraggable.appendChild(button_changetype);
		button_toHE = document.createElement('button');
		button_toHE.textContent='跳轉成健';
		button_toHE.style.width = '80px';
		button_toHE.style.left = '84px';
		button_toHE.style.top = '34px';
		button_toHE.style.position = 'absolute';
		button_toHE.addEventListener('click', button_toHE_handle);
		myDraggable.appendChild(button_toHE);
		button_toOR = document.createElement('button');
		button_toOR.textContent='跳轉口篩';
		button_toOR.style.width = '80px';
		button_toOR.style.left = '166px';
		button_toOR.style.top = '34px';
		button_toOR.style.position = 'absolute';
		button_toOR.addEventListener('click', button_toOR_handle);
		myDraggable.appendChild(button_toOR);
		button_NIIS = document.createElement('button');
		button_NIIS.textContent='NIIS';
		button_NIIS.style.width = '80px';
		button_NIIS.style.left = '248px';
		button_NIIS.style.top = '34px';
		button_NIIS.style.position = 'absolute';
		button_NIIS.addEventListener('click', button_NIIS_handle);
		myDraggable.appendChild(button_NIIS);
		button_toREG = document.createElement('button');
		button_toREG.textContent='切換掛號';
		button_toREG.style.width = '80px';
		button_toREG.style.left = '2px';
		button_toREG.style.top = '66px';
		button_toREG.style.position = 'absolute';
		button_toREG.addEventListener('click', button_toREG_handle);
		myDraggable.appendChild(button_toREG);
		button_showdrug = document.createElement('button');
		button_showdrug.textContent='藥品圖片';
		button_showdrug.style.width = '80px';
		button_showdrug.style.left = '84px';
		button_showdrug.style.top = '66px';
		button_showdrug.style.position = 'absolute';
		button_showdrug.addEventListener('click', button_showdrug_handle);
		myDraggable.appendChild(button_showdrug);
		button_showdata = document.createElement('button');
		button_showdata.textContent='檢驗彙總';
		button_showdata.style.width = '80px';
		button_showdata.style.left = '166px';
		button_showdata.style.top = '66px';
		button_showdata.style.position = 'absolute';
		button_showdata.addEventListener('click', button_showdata_handle);
		myDraggable.appendChild(button_showdata);
		button_trydebug = document.createElement('button');
		button_trydebug.textContent='簡易除錯';
		button_trydebug.style.width = '80px';
		button_trydebug.style.left = '248px';
		button_trydebug.style.top = '66px';
		button_trydebug.style.position = 'absolute';
		button_trydebug.addEventListener('click', button_trydebug_handle);
		myDraggable.appendChild(button_trydebug);
	}
	function create_OPD_list(){
		create_myDraggable();
		button_NIIS = document.createElement('button');
		button_NIIS.textContent='NIIS';
		button_NIIS.style.width = '80px';
		button_NIIS.style.left = '2px';
		button_NIIS.style.top = '2px';
		button_NIIS.style.position = 'absolute';
		button_NIIS.addEventListener('click', button_NIIS_handle);
		myDraggable.appendChild(button_NIIS);
		button_autocomplete = document.createElement('button');
		button_autocomplete.textContent='批次完成';
		button_autocomplete.style.width = '80px';
		button_autocomplete.style.left = '84px';
		button_autocomplete.style.top = '2px';
		button_autocomplete.style.position = 'absolute';
		button_autocomplete.addEventListener('click', button_autocomplete_handle);
		myDraggable.appendChild(button_autocomplete);
		button_reflash = document.createElement('button');
		button_reflash.textContent='更新列表';
		button_reflash.style.width = '80px';
		button_reflash.style.left = '166px';
		button_reflash.style.top = '2px';
		button_reflash.style.position = 'absolute';
		button_reflash.addEventListener('click', button_reflash_handle);
		myDraggable.appendChild(button_reflash);
		button_autocompletev2 = document.createElement('button');
		button_autocompletev2.textContent='帶入標準處方_身分';
		button_autocompletev2.style.width = '160px';
		button_autocompletev2.style.left = '248px';
		button_autocompletev2.style.top = '2px';
		button_autocompletev2.style.position = 'absolute';
		button_autocompletev2.addEventListener('click', button_autocompletev2_handle);
		myDraggable.appendChild(button_autocompletev2);
		
		button_autocompletesingle = document.createElement('button');
		button_autocompletesingle.textContent='帶入標準處方_個案';
		button_autocompletesingle.style.width = '160px';
		button_autocompletesingle.style.left = '410px';
		button_autocompletesingle.style.top = '2px';
		button_autocompletesingle.style.position = 'absolute';
		button_autocompletesingle.addEventListener('click', button_autocompletesingle_handle);
		myDraggable.appendChild(button_autocompletesingle);
		
		button_changenumber = document.createElement('button');
		button_changenumber.textContent='新舊切換';
		button_changenumber.style.width = '80px';
		button_changenumber.style.left = '572px';
		button_changenumber.style.top = '2px';
		button_changenumber.style.position = 'absolute';
		button_changenumber.addEventListener('click', button_changenumber_handle);
		myDraggable.appendChild(button_changenumber);
		button_listdelete = document.createElement('button');
		button_listdelete.textContent='快速刪除';
		button_listdelete.style.width = '80px';
		button_listdelete.style.left = '654px';
		button_listdelete.style.top = '2px';
		button_listdelete.style.position = 'absolute';
		button_listdelete.addEventListener('click', button_listdelete_handle);
		
		myDraggable.appendChild(button_listdelete);
		myDraggable.style.height='35px';
		myDraggable.style.width='739px';
		myDraggable.style.left=window.innerWidth-739 +'px';
	}
	function create_REG_list(){
		create_myDraggable();
		button_NIIS = document.createElement('button');
		button_NIIS.textContent='NIIS';
		button_NIIS.style.width = '80px';
		button_NIIS.style.left = '2px';
		button_NIIS.style.top = '2px';
		button_NIIS.style.position = 'absolute';
		button_NIIS.addEventListener('click', button_NIIS_handle);
		myDraggable.appendChild(button_NIIS);
		
		div_fasttype = document.createElement('div');
		div_fasttype.textContent='身分';
		div_fasttype.style.width = '40px';
		div_fasttype.style.left = '82px';
		div_fasttype.style.top = '2px';
		div_fasttype.style.position = 'absolute';
		div_fasttype.style.textAlign='center';
		myDraggable.appendChild(div_fasttype);
		input_fasttype = document.createElement('input');
		input_fasttype.id='input_fasttype';
		if (temptype){
			input_fasttype.value=temptype
		}
		input_fasttype.style.width = '40px';
		input_fasttype.style.left = '124px';
		input_fasttype.style.top = '2px';
		input_fasttype.style.position = 'absolute';
		input_fasttype.style.textAlign='center';
		myDraggable.appendChild(input_fasttype);
		button_fastreg = document.createElement('button');
		button_fastreg.textContent='快速掛號';
		button_fastreg.style.width = '80px';
		button_fastreg.style.left = '166px';
		button_fastreg.style.top = '2px';
		button_fastreg.style.position = 'absolute';
		button_fastreg.addEventListener('click', button_fastreg_handle);
		myDraggable.appendChild(button_fastreg);
		button_showvaccine = document.createElement('button');
		button_showvaccine.textContent='顯示疫苗';
		button_showvaccine.style.width = '80px';
		button_showvaccine.style.left = '2px';
		button_showvaccine.style.top = '34px';
		button_showvaccine.style.position = 'absolute';
		button_showvaccine.addEventListener('click', button_showvaccine_handle);
		myDraggable.appendChild(button_showvaccine);
		button_countvaccine = document.createElement('button');
		button_countvaccine.textContent='算疫苗';
		button_countvaccine.style.width = '80px';
		button_countvaccine.style.left = '84px';
		button_countvaccine.style.top = '34px';
		button_countvaccine.style.position = 'absolute';
		button_countvaccine.addEventListener('click', button_countvaccine_handle);
		myDraggable.appendChild(button_countvaccine);
		button_changenumber = document.createElement('button');
		button_changenumber.textContent='新舊切換';
		button_changenumber.style.width = '80px';
		button_changenumber.style.left = '166px';
		button_changenumber.style.top = '34px';
		button_changenumber.style.position = 'absolute';
		button_changenumber.addEventListener('click', button_changenumber_handle);
		myDraggable.appendChild(button_changenumber);
		button_reflash = document.createElement('button');
		button_reflash.textContent='重整畫面';
		button_reflash.style.width = '80px';
		button_reflash.style.left = '2px';
		button_reflash.style.top = '66px';
		button_reflash.style.position = 'absolute';
		button_reflash.addEventListener('click', button_reflash_handle);
		myDraggable.appendChild(button_reflash);
		button_detail = document.createElement('button');
		button_detail.textContent='基本資料';
		button_detail.style.width = '80px';
		button_detail.style.left = '84px';
		button_detail.style.top = '66px';
		button_detail.style.position = 'absolute';
		button_detail.addEventListener('click', button_detail_handle);
		myDraggable.appendChild(button_detail);
		button_OPDhistory = document.createElement('button');
		button_OPDhistory.textContent='就醫紀錄';
		button_OPDhistory.style.width = '80px';
		button_OPDhistory.style.left = '166px';
		button_OPDhistory.style.top = '66px';
		button_OPDhistory.style.position = 'absolute';
		button_OPDhistory.addEventListener('click', button_OPDhistory_handle);
		myDraggable.appendChild(button_OPDhistory);
		myDraggable.style.width='248px';
		myDraggable.style.left=window.innerWidth-248-borderx +'px';
	}
	function create_REG_one(){
		create_myDraggable();
		button_NIIS = document.createElement('button');
		button_NIIS.textContent='NIIS';
		button_NIIS.style.width = '80px';
		button_NIIS.style.left = '2px';
		button_NIIS.style.top = '2px';
		button_NIIS.style.position = 'absolute';
		button_NIIS.addEventListener('click', button_NIIS_handle);
		myDraggable.appendChild(button_NIIS);
		
		div_fasttype = document.createElement('div');
		div_fasttype.textContent='身分';
		div_fasttype.style.width = '40px';
		div_fasttype.style.left = '82px';
		div_fasttype.style.top = '2px';
		div_fasttype.style.position = 'absolute';
		div_fasttype.style.textAlign='center';
		myDraggable.appendChild(div_fasttype);
		input_fasttype = document.createElement('input');
		input_fasttype.id='input_fasttype';
		if (temptype){
			input_fasttype.value=temptype
		}
		input_fasttype.style.width = '40px';
		input_fasttype.style.left = '124px';
		input_fasttype.style.top = '2px';
		input_fasttype.style.position = 'absolute';
		input_fasttype.style.textAlign='center';
		myDraggable.appendChild(input_fasttype);
		button_fastreg = document.createElement('button');
		button_fastreg.textContent='快速掛號';
		button_fastreg.style.width = '80px';
		button_fastreg.style.left = '166px';
		button_fastreg.style.top = '2px';
		button_fastreg.style.position = 'absolute';
		button_fastreg.addEventListener('click', button_fastreg_handle);
		myDraggable.appendChild(button_fastreg);
		button_showvaccine = document.createElement('button');
		button_showvaccine.textContent='顯示疫苗';
		button_showvaccine.style.width = '80px';
		button_showvaccine.style.left = '2px';
		button_showvaccine.style.top = '34px';
		button_showvaccine.style.position = 'absolute';
		button_showvaccine.addEventListener('click', button_showvaccine_handle);
		myDraggable.appendChild(button_showvaccine);
		button_detail = document.createElement('button');
		button_detail.textContent='基本資料';
		button_detail.style.width = '80px';
		button_detail.style.left = '84px';
		button_detail.style.top = '34px';
		button_detail.style.position = 'absolute';
		button_detail.addEventListener('click', button_detail_handle);
		myDraggable.appendChild(button_detail);
		button_OPDhistory = document.createElement('button');
		button_OPDhistory.textContent='就醫紀錄';
		button_OPDhistory.style.width = '80px';
		button_OPDhistory.style.left = '166px';
		button_OPDhistory.style.top = '34px';
		button_OPDhistory.style.position = 'absolute';
		button_OPDhistory.addEventListener('click', button_OPDhistory_handle);
		myDraggable.appendChild(button_OPDhistory);
		myDraggable.style.width='248px';
		myDraggable.style.height = 70+'px';
		myDraggable.style.left=window.innerWidth-248-borderx +'px';
	}
	function create_FM(){
		create_myDraggable();
		button_FMdebug = document.createElement('button');
		button_FMdebug.textContent='醫療群除錯';
		button_FMdebug.style.width = '160px';
		button_FMdebug.style.height = '66px';
		button_FMdebug.style.left = '2px';
		button_FMdebug.style.top = '2px';
		button_FMdebug.style.position = 'absolute';
		button_FMdebug.addEventListener('click', button_FMdebug_handle);
		myDraggable.appendChild(button_FMdebug);
		myDraggable.style.width='164px';
		myDraggable.style.height = 70+'px';
		myDraggable.style.left=window.innerWidth-164-borderx +'px';
	}
	function create_Countmonth(){
		create_myDraggable();
		button_countmonth = document.createElement('button');
		button_countmonth.textContent='查天數';
		button_countmonth.style.width = '160px';
		button_countmonth.style.height = '66px';
		button_countmonth.style.left = '2px';
		button_countmonth.style.top = '2px';
		button_countmonth.style.position = 'absolute';
		button_countmonth.addEventListener('click', button_countmonth_handle);
		myDraggable.appendChild(button_countmonth);
		myDraggable.style.width='164px';
		myDraggable.style.height = 70+'px';
		myDraggable.style.left=window.innerWidth-1164-borderx +'px';
	}
	function create_changeicd(){
		create_myDraggable();
		button_changeicd = document.createElement('button');
		button_changeicd.textContent='改ICD';
		button_changeicd.style.width = '160px';
		button_changeicd.style.height = '66px';
		button_changeicd.style.left = '2px';
		button_changeicd.style.top = '2px';
		button_changeicd.style.position = 'absolute';
		button_changeicd.addEventListener('click', button_changeicd_handle);
		myDraggable.appendChild(button_changeicd);
		button_changeicdf = document.createElement('button');
		button_changeicdf.textContent='ICD比對';
		button_changeicdf.style.width = '160px';
		button_changeicdf.style.height = '66px';
		button_changeicdf.style.left = '164px';
		button_changeicdf.style.top = '2px';
		button_changeicdf.style.position = 'absolute';
		button_changeicdf.addEventListener('click', button_changeicdf_handle);
		myDraggable.appendChild(button_changeicdf);
		
		
		myDraggable.style.width='326px';
		myDraggable.style.height = 70+'px';
		myDraggable.style.left=window.innerWidth-1364-borderx +'px';
	}
	function create_newHEupload(){
		create_myDraggable();
		button_changenewHE = document.createElement('button');
		button_changenewHE.textContent='修改格式';
		button_changenewHE.style.width = '160px';
		button_changenewHE.style.height = '70px';
		button_changenewHE.style.left = '2px';
		button_changenewHE.style.top = '2px';
		button_changenewHE.style.position = 'absolute';
		button_changenewHE.addEventListener('click', button_changenewHE_handle);
		myDraggable.appendChild(button_changenewHE);
		button_changenewHEtxt = document.createElement('div');
		button_changenewHEtxt.innerHTML='1.請先產製原始成健媒體檔，並複製TXT內容<br>2.點修改格式後貼上<br>3.打開下載的output.txt，把內容複製到原媒體檔後儲存並上傳';
		button_changenewHEtxt.style.width = '460px';
		button_changenewHEtxt.style.height = '70px';
		button_changenewHEtxt.style.left = '164px';
		button_changenewHEtxt.style.top = '2px';
		button_changenewHEtxt.style.position = 'absolute';
		myDraggable.appendChild(button_changenewHEtxt);
		
		
		myDraggable.style.width='626px';
		myDraggable.style.height = 74+'px';
		myDraggable.style.left=window.innerWidth-700-borderx +'px';
	}
	function button_changenewHE_handle(){
		function getlistfromtxt(){
			let strtxt=prompt("請貼上成健上傳媒體檔內容");
			let atxt=strtxt.split("\r\n")
			let he2={};
			let hbcv=[];
			let j2datelist=[];
			for (let i=0;i<atxt.length;i++){
				let line=atxt[i];
				let personalId=line.substring(0,10);
				let phone=line.substring(18,28);
				let address=line.substring(28,32);
				let hosid=line.substring(32,42);
				let examid=line.substring(42,52);
				let j1date=line.substring(52,59);
				let j2date=line.substring(59,66);
				let dif=line.replace(/[^\x00-\x7F]/g, "aa").length-line.length;
				let name=line.substring(165,185-dif);
				let drid=line.substring(185-dif,195);
				let tempobj={};
				tempobj.personalId=personalId;
				tempobj.address=address;
				tempobj.phone=phone;
				tempobj.hosid=hosid;
				tempobj.examid=examid;
				tempobj.j1date=j1date;
				tempobj.j2date=j2date;
				tempobj.name=name;
				tempobj.drid=drid;
				if (j2date!="       "){
					he2[personalId]=tempobj;
					j2datelist.push(j2date*1);
				} else {
					hbcv.push(line);
				}
			}
			let replist=Object.keys(he2).sort();
			let rec=replist.length;
			let remin=Math.floor(rec/60);
			let resec=rec%60;
			let cont=confirm("2階共"+rec+"筆，是否修正為新版格式\n約需"+remin+"分"+resec+"秒");
			if (cont){
				let j2max=mkytocy(Math.max(...j2datelist));
				let j2min=mkytocy(Math.min(...j2datelist));
				let nowtime=cytomky(new Date().toISOString().split("T")[0]);
				const xhr = new XMLHttpRequest();
				let helisturl="https://phpcis.chshb.gov.tw/api/v1/prevention_datas/list?treatmentDateStart="+j2min+"&treatmentDateEnd="+j2max+"&itemId=02";
				xhr.open("GET", helisturl, false);
				xhr.send();
				let helist=JSON.parse(xhr.responseText).result;
				helistobj={};
				for (let i=0;i<helist.length;i++){
					let item=helist[i];
					let personalId=item.personalId;
					let preventionDataId=item.preventionDataId;
					if (item.serviceName=="第二階段"){
						helistobj[personalId]=preventionDataId;
					}
				}
				
				
				let retres="";
				for (let i=0;i<replist.length;i++){
					let personalId=replist[i];
					let itemobj=he2[personalId];
					let preventionDataId=helistobj[personalId];
					let patinf=genprea(xhr,itemobj,preventionDataId);
					let patline=genline(patinf);
					retres+=patline+"\r\n";
				}
				for (let i=0;i<hbcv.length;i++){
					retres+=hbcv[i]+"\r\n";
				}
				retres=retres.substring(0,retres.length-2);
				console.log(retres);
				downloadTxt("output.txt",retres)
				alert("轉換完成，請手動將output.txt內容覆蓋至原本的檔案儲存後上傳")
			}
		}
		getlistfromtxt()

		function downloadTxt(filename, text) {
			const blob = new Blob([text], { type: "text/plain" });
			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = filename;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}



		function genline(patinf){
			const lenlist=["l",10,1,7,10,4,10,10,7,7,7,
							   1,1,1,1,1,1,1,1,1,1,
							   1,1,1,3,3,3,3,4,5,4,
							   3,3,4,4,4,4,4,4,5,1,
							   1,1,1,1,1,1,1,1,1,1,
							   1,1,1,1,1,1,1,1,20,10,
							   10,4,2,1,1,2,2,2,2,2]
			let retline="";
			for (let i=1;i<lenlist.length;i++){
				let len=lenlist[i];
				let key="item_"+i;
				let item=patinf[key];
				if (i==59){
					let itemlen=item.replace(/[^\x00-\x7F]/g, "aa").length;
					let lendif=itemlen-item.length;
					item=item+"                    ";
					item=item.substring(0,len-lendif);
				} else if (i>65){
					item="000"+item;
					item=item.replaceAll(" ","0");
					item=item.substring(item.length-len,item.length);
					if (item=="aN"){
						item="NA";
					}
				} else if (i==63){
					item=item+"                    ";
					item=item.substring(0,len);
				} else {
					item="00000000000000"+item;
					item=item.replaceAll(" ","0");
					item=item.substring(item.length-len,item.length);
				}
				
				retline+=item;
			}
			return retline
		}
		function genprea(xhr,pat,preventionDataId){
			let preurl="https://phpcis.chshb.gov.tw/api/v1/prevention_datas/find?clinicId=4&preventionDataId="+preventionDataId;
			xhr.open("GET", preurl, false);
			xhr.send();
			let d=JSON.parse(xhr.responseText).result;
			let dr=d.adultScreenOrm;
			let item_1=d.personalId;
			let	item_2=d.gender;
			let	item_3=cytomky(d.birthday);
			let item_4=pat.phone;
			let item_5=pat.address;
			let	item_6=pat.hosid;
			let	item_7=pat.examid;
			let	item_8=pat.j1date;
			let item_9=pat.j2date;
			let item_10="1140206";
			let item_11=dr.HBHCCheck;
			let item_12="1";
			if (dr.HEHypertension){
				item_12="2";
			}
			let item_13="1";
			if (dr.HEDiabetes){
				item_13="2";
			}
			let item_14="1";
			if (dr.HEHyperlipidemia){
				item_14="2";
			}
			let item_15="1";
			if (dr.HEHeartDisease){
				item_15="2";
			}
			let item_16="1";
			if (dr.HEStroke){
				item_16="2";
			}
			let item_17="1";
			if (dr.HEKidneyDiseases){
				item_17="2";
			}
			let item_18=dr.isSmoke;
			let item_19=dr.isDrink;
			let item_20=dr.isBetel;
			let item_21=dr.isSport;
			let item_22="1";
			if (dr.MelancholyExam1){
				item_22="2";
			}
			let item_23="1";
			if (dr.MelancholyExam2){
				item_23="2";
			}
			let item_24=Math.round(dr.height);
			let item_25=Math.round(dr.weight);
			let item_26=Math.round(dr.SBP);
			let item_27=Math.round(dr.DBP);
			let item_28=Math.round(dr.waistline);
			let item_29=Math.round(dr.BMI*10)/10;
			let item_30=Math.round(dr.urineProteinReference);
			let item_31=Math.round(dr.GluecoreAC);
			let item_32=Math.round(dr.TChol);
			let item_33=Math.round(dr.TG);
			let LDL=dr.LDL;
			let item_34="";
			if (LDL=="" || LDL==null || LDL==0){
				item_34="999";
			} else 
			{
				item_34=Math.round(LDL);
			}
			let item_35=Math.round(dr.HDL);
			let item_36=Math.round(dr.SGOT);
			let item_37=Math.round(dr.SGPT);
			let item_38=Math.round(dr.CRE_S*10)/10;
			let item_39=Math.round(dr.eGFR*10)/10;
			let item_40=dr.HBsAG;
			let item_41=dr.HCV;
			let item_42="1";
			if (dr.healthQuitSmoke){
				item_42="2";
			}
			let item_43="1";
			if (dr.healthQuitDrink){
				item_43="2";
			}
			let item_44="1";
			if (dr.healthQuitBetel){
				item_44="2";
			}
			let item_45="1";
			if (dr.healthExercise){
				item_45="2";
			}
			let item_46="1";
			if (dr.healthWeight){
				item_46="2";
			}
			let item_47="1";
			if (dr.healthDiet){
				item_47="2";
			}
			let item_48="1";
			if (dr.healthProtection){
				item_48="2";
			}
			let item_49="1";
			if (dr.healthDental){
				item_49="2";
			}
			let item_50=dr.resultBP;
			let item_51=dr.resultGlucore;
			let item_52=dr.resultCholesterol;
			let item_53=dr.resultRenal;
			let item_54=dr.resultLiver;
			let item_55=dr.resultMS;
			let item_56=dr.resultHB;
			if (item_56=="3"){
				item_56="0";
			}
			let item_57=dr.resultHC;
			if (item_57=="3"){
				item_57="0";
			}
			let item_58=dr.melancholyExam;
			let item_59=pat.name;
			let item_60=pat.drid;
			let item_61=pat.drid;
			let item_62=Math.round(dr.uricAcid*10)/10;
			let item_63=dr.resultRenalStage;
			if (item_63==""){
				if (item_39<15){
					item_63="5";
				} else if (item_39<30){
					item_63="4";
				} else if (item_39<45){
					item_63="3B";
				} else if (item_39<60){
					item_63="3A";
				} else {
					if (item_30>15){
						if (item_39<90){
							item_63="2";
						} else {
							item_63="1";
						}
					} else {
						item_63="0";
					}
				}
			}
			let item_64="2";
			let item_65="2";
			let item_66=Math.round(dr.CHDRisk);
			let item_67=Math.round(dr.DiabetesRisk);
			let item_68=Math.round(dr.HypertensionRisk);
			let item_69=Math.round(dr.StrokeRisk);
			let item_70=Math.round(dr.MACERisk);
			let retobj={};
			for (let i=1;i<71;i++){
				let key="item_"+i;
				retobj[key]=eval(key)
			}
			return retobj
		}

		function cytomky(cy){
			let acy=cy.split('-');
			let mkyy="000"+(acy[0]-1911);
			mkyy=mkyy.substring(mkyy.length-3,mkyy.length);
			return mkyy+acy[1]+acy[2]
		}

		function mkytocy(mky){
			let mkyy=mky.toString().substring(0,3)*1+1911;
			let mkym=mky.toString().substring(3,5);
			let mkyd=mky.toString().substring(5,7);
			
			return mkyy+"-"+mkym+"-"+mkyd
		}
	}
	function button_changeicd_handle(){
		const cururl=document.URL;
		if (cururl=="https://phpcis.chshb.gov.tw/disease"){
			const td=document.getElementsByClassName('table table-striped table-bordered role-list__role-table commonTable')[0];
			find=false;
			let ccc="";
			for (i=1;i<td.rows.length;i++){
				if (td.rows[i].cells[0].children[0].checked){
					ccc=td.rows[i].cells[1].children[0].href;
					find=true;
					break;
				}
			}
			if (find){
				const xhr = new XMLHttpRequest();
				const setting_url="https://phpcis.chshb.gov.tw/api/v1/clinics/settings/find";
				xhr.open("GET", setting_url, false);
				xhr.send();
				const setting_res=xhr.responseText;
				const setting_json=JSON.parse(setting_res);
				const clinicId=setting_json.result.clinicId;
				const diseaseId=ccc.split("/")[ccc.split("/").length-1];
				const icd_get_url="https://phpcis.chshb.gov.tw/api/v1/diseases/find?diseaseId="+diseaseId;
				xhr.open("GET", icd_get_url, false);
				xhr.send();
				const get_res=xhr.responseText;
				let get_json=JSON.parse(get_res);
				let ICDtemp=get_json.result;
				let newicd9=prompt("新的ICD9名稱",ICDtemp.ICD9Name);
				if (newicd9!=null && newicd9!=""){
					ICDtemp.ICD9Name=newicd9;
				}
				let newicd10code=prompt("新的ICD10代碼",ICDtemp.ICD10Code);
				if (newicd10code!=null && newicd10code!=""){
					ICDtemp.ICD10Code=newicd10code;
				}
				let newicd10=prompt("新的ICD10名稱",ICDtemp.ICD10Name);
				if (newicd10!=null && newicd10!=""){
					ICDtemp.ICD10Name=newicd10;
				}
				ICDtemp.clinicId=clinicId;
				const ICD_url = "https://phpcis.chshb.gov.tw/api/v1/diseases/update";
				xhr.open("POST", ICD_url, false);
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.send(JSON.stringify(ICDtemp));
				let resicd=xhr.responseText;
				let jresicd=JSON.parse(resicd);
				if (jresicd.code==200){
					alert('修改完成');
					document.querySelector("#root > div.wrapper > main > div > div.mb-2.btn-toolbar > button.commonBtn.btn.btn-success").click();
				}
			} else {
				alert('無選擇');
			}
		} else {
			alert('需在疾病資料列表執行');
			window.location.href="https://phpcis.chshb.gov.tw/disease";
		}
	}
	function button_changeicdf_handle(){
		let xmlHttp = new XMLHttpRequest();
		let jurl="https://iiirrkimo.github.io/checkdata/icdc.json";
		xmlHttp.open("GET",jurl,false);
		xmlHttp.send();
		let icds=xmlHttp.responseText;
		let cjson=JSON.parse(icds)
		let durl="https://phpcis.chshb.gov.tw/api/v1/diseases/list";
		xmlHttp.open("GET",durl,false);
		xmlHttp.send();
		let res=[];
		let djson=JSON.parse(xmlHttp.responseText).result;
		for (let i=0;i<djson.length;i++){
			let d=djson[i];
			let oi14=d.ICD10Code.replaceAll(".","").toUpperCase();
			if (cjson[oi14]!=undefined){
				let temp={};
				temp["14"]=d;
				temp["23"]=cjson[oi14]
				res.push(temp);
			}
		}
		console.log(res)
		let retobjs=JSON.stringify(JSON.stringify(res));
		htmls=String.raw`
		<!-- protected/index.html -->
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>ICD整理</title>
		<style>
		html {
			font-family: '微軟正黑體';
			background-color: #cdeedc;
		}
		body {
			margin: 0px;
			padding: 0px;
		}
		.tablearea{
			margin: 3px;
			height: 600px; 
			overflow-y: auto; 
			overflow-x: auto; 
			width: fit-content;
		}
		.icdtable {
			border-collapse: collapse;
			font-size: 16px;
		}
		.icdtable td{
			overflow: hidden; 
			border: 1px solid #6c757d; 
			text-align: left;
			max-width: 200px;
		}
		
		.icdtable tr:nth-of-type(1) td {
			background-color: #99ccff; 
			border: 1px solid #6c757d; 
			text-align: center;    
			overflow: hidden; 
			position: sticky; top: 0;
		}
		.likebutton{
			margin: 3px;
			color: white;
			padding: 2px;
			background-color: #4CAF50;
			border-radius: 5px;
			text-decoration: none;
			cursor: pointer;
			text-align: center;   
		}
		.likebutton:hover {
			background-color: #45a049;
		}
		.likebutton2{
			margin: 3px;
			color: white;
			padding: 2px;
			background-color: #dc3545;
			border-radius: 5px;
			text-decoration: none;
			cursor: pointer;
			text-align: center;   
		}
		.likebutton2:hover {
			background-color: #c82333;
		}
		</style>
	</head>
	<body>
		<h1>ICD2014/ICD2023快速轉換</h1>
		<div class="tablearea">
			<table id="icdtable" class="icdtable"></table>
		</div>
	</body>
	<script>
		window.onload=function(){
			const data=${retobjs};
			cdata=JSON.parse(data);
			console.log(cdata);
			gentable(cdata);
		}
		function gentable(cdata){
			let table=document.getElementById("icdtable");
			table.innerHTML="<tr><td>序號</td><td>2014ICD10</td><td>2014英文</td><td>2014中文</td><td>還原</td><td>2023ICD</td><td>2023英文名稱</td><td>2023中文名稱</td><td>修改</td></tr>";
			if (cdata.length>0){
				for (let i=0;i<cdata.length;i++){
					let o=cdata[i]["14"];
					let n=cdata[i]["23"];
					let nr=table.insertRow();
					let nc=""
					let diseaseId=o.diseaseId;
					for (j=0;j<n.length;j++){
						if (j==0){
							nc=nr.insertCell();
							nc.textContent=i+1;
							nc.rowSpan=n.length;
							nc.style.textAlign ="center";
							nc=nr.insertCell();
							let div = document.createElement("div");
							nc.appendChild(div);
							div.className='likebutton'
							div.textContent=o.ICD10Code;
							
							div.addEventListener('click', function () {
								window.open("https://phpcis.chshb.gov.tw/disease/"+diseaseId, "_blank", "");
							});
							nc.rowSpan=n.length;
							nc=nr.insertCell();
							nc.textContent=o.ICD10Name;
							nc.title=o.ICD10Name;
							nc.rowSpan=n.length;
							nc=nr.insertCell();
							nc.textContent=o.ICD10NameCHT;
							nc.title=o.ICD10NameCHT;
							nc.rowSpan=n.length;
							nc=nr.insertCell();
							nc.rowSpan=n.length;
							let rec = document.createElement("div");
							nc.appendChild(rec);
							rec.className='likebutton2'
							rec.textContent="還原";
							let oicd=o.ICD10Code;
							let oeng=o.ICD10Name;
							let ocht=o.ICD10NameCHT;
							rec.addEventListener('click', function () {
								const xhr = new XMLHttpRequest();
								const setting_url="https://phpcis.chshb.gov.tw/api/v1/clinics/settings/find";
								xhr.open("GET", setting_url, false);
								xhr.send();
								const setting_res=xhr.responseText;
								const setting_json=JSON.parse(setting_res);
								const clinicId=setting_json.result.clinicId;
								const icd_get_url="https://phpcis.chshb.gov.tw/api/v1/diseases/find?diseaseId="+diseaseId;
								xhr.open("GET", icd_get_url, false);
								xhr.send();
								const get_res=xhr.responseText;
								let get_json=JSON.parse(get_res);
								let ICDtemp=get_json.result;
								ICDtemp.ICD10Code=oicd;
								ICDtemp.ICD10Name=oeng;
								ICDtemp.ICD10NameCHT=ocht;
								ICDtemp.clinicId=clinicId;
								const ICD_url = "https://phpcis.chshb.gov.tw/api/v1/diseases/update";
								xhr.open("POST", ICD_url, false);
								xhr.setRequestHeader("Content-Type", "application/json");
								xhr.send(JSON.stringify(ICDtemp));
								let resicd=xhr.responseText;
								let jresicd=JSON.parse(resicd);
								if (jresicd.code==200){
									alert('還原完成\n'+oicd+"\n"+oeng+"\n"+ocht);
								}
							});
						}
						if (j!=0){
							nr=table.insertRow();
						}
						nc=nr.insertCell();
						nc.textContent=n[j].I23;
						
						nc=nr.insertCell();
						nc.textContent=n[j].E23;
						nc.title=n[j].E23;
						nc=nr.insertCell();
						nc.textContent=n[j].C23;
						nc.title=n[j].C23;
						nc=nr.insertCell();
						let upd = document.createElement("div");
						nc.appendChild(upd);
						upd.className='likebutton2'
						upd.textContent="更新";
						let nicd=n[j].I23;
						let neng=n[j].E23;
						let ncht=n[j].C23;
						upd.addEventListener('click', function () {
							const xhr = new XMLHttpRequest();
							const setting_url="https://phpcis.chshb.gov.tw/api/v1/clinics/settings/find";
							xhr.open("GET", setting_url, false);
							xhr.send();
							const setting_res=xhr.responseText;
							const setting_json=JSON.parse(setting_res);
							const clinicId=setting_json.result.clinicId;
							const icd_get_url="https://phpcis.chshb.gov.tw/api/v1/diseases/find?diseaseId="+diseaseId;
							xhr.open("GET", icd_get_url, false);
							xhr.send();
							const get_res=xhr.responseText;
							let get_json=JSON.parse(get_res);
							let ICDtemp=get_json.result;
							ICDtemp.ICD10Code=nicd;
							ICDtemp.ICD10Name=neng;
							ICDtemp.ICD10NameCHT=ncht;
							ICDtemp.clinicId=clinicId;
							const ICD_url = "https://phpcis.chshb.gov.tw/api/v1/diseases/update";
							xhr.open("POST", ICD_url, false);
							xhr.setRequestHeader("Content-Type", "application/json");
							xhr.send(JSON.stringify(ICDtemp));
							let resicd=xhr.responseText;
							let jresicd=JSON.parse(resicd);
							if (jresicd.code==200){
								alert('修改完成\n'+nicd+"\n"+neng+"\n"+ncht);
							}
						});
					}
					
				}
			} else {
				let nr=table.insertRow();
				let nc=nr.insertCell();
				nc.colSpan=7;
				nc.textContent="無需轉換之ICD10"
			}
		}
		
	</script>
	</html>

		
		`
		const newWindow = window.open("", "_blank", "width=1600,height=900");
		newWindow.document.write(htmls);
		newWindow.document.close();
	}
	function create_myDraggable(){
		thewidth=330;
		theheight=100;
		borderx=20;
		bordery=50;
		var myDraggable = document.createElement('div');
		myDraggable.id='myDraggable';
		myDraggable.style.width = thewidth+'px';
		myDraggable.style.left=window.innerWidth-thewidth-borderx +'px';
		myDraggable.style.height = theheight+'px';
		myDraggable.style.top = bordery +'px';
		myDraggable.style.background = '#f9f9f9';
		myDraggable.style.border = '1px solid #ccc';
		myDraggable.style.position = 'absolute';
		myDraggable.style.cursor = 'move';
		myDraggable.style.zIndex = '9999';
		document.body.insertBefore(myDraggable,document.body.firstChild);
		myDraggable.addEventListener('mousedown', function(e) {
			mouseX = e.clientX;
			mouseY = e.clientY;
			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
		});
		function onMouseMove(e) {
			posX = mouseX - e.clientX;
			posY = mouseY - e.clientY;
			mouseX = e.clientX;
			mouseY = e.clientY;
			myDraggable.style.left = (myDraggable.offsetLeft - posX) + 'px';
			myDraggable.style.top = (myDraggable.offsetTop - posY) + 'px';
		}
		function onMouseUp() {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		}
		
	}
	async function button_5line_handle(){
		cc=document.URL;
		d1='https://phpcis.chshb.gov.tw/consultationMainPage/';
		d2='https://phpcis.chshb.gov.tw/populanceRegistration';
		d3='https://phpcis.chshb.gov.tw/registration';
		if(cc.includes(d1)){
			theform=document.querySelector('#root > div.wrapper > main > div > form');
			for (i=0;i<theform.children[1].childElementCount;i++){
				if (theform.children[1].children[i].textContent=='治療結束日:'){
					theform.children[1].children[i].children[0].textContent='結束日';
				} else if (theform.children[1].children[i].textContent=='療程起日:'){
					theform.children[1].children[i].children[0].textContent='起日';
				} else if (theform.children[1].children[i].textContent=='慢連處方'){
					theform.children[1].children[i].children[0].children[0].children[1].textContent='連處';
				}
			}
			ccc=document.getElementsByClassName('consultationMainPage__value');
			
			aaa=[];
			for (i=0;i<ccc.length;i++){
				if (ccc[i].innerText=='途徑:'){
					ri=i;
					break;
				}
			}
			ccc[ri].hidden=true;
			ccc[ri+1].hidden=true;
			uu=document.getElementsByClassName('col-xl-5 col-lg-5')[2];
			inputarea=uu.querySelectorAll('textarea');
			inputspace=uu.getElementsByClassName('line');
			inputspace[0].style.height='10rem';
			inputarea[0].rows=5;
			inputspace[1].style.height='12.5rem';
			inputarea[1].rows=5;
			ggg=document.getElementsByClassName('line prescription-diagnosis-area')[0];
			ggg.style.height='23.1rem';
			ggg.children[2].style.height='17vh';
			ggg.children[2].children[0].style.height='17vh';
			document.getElementsByClassName('line prescription-diagnosis-area')[1].style.height='23rem';
			prevention=document.getElementById('prevention');
			if (prevention==null){
				prevention = document.createElement('div');
				prevention.setAttribute('id', 'prevention');
				title = document.createTextNode('預防保健項目');
				prevention.style.border = '1px solid black';
				prevention.style.width = '500px';
				prevention.appendChild(title);
				prevention_L1 = document.createElement('div');
				prevention_L1.setAttribute('id', 'prevention_L1');
				prevention.appendChild(prevention_L1);
				prevention_L2 = document.createElement('div');
				prevention_L2.setAttribute('id', 'prevention_L2');
				prevention.appendChild(prevention_L2);
				prevention_L3 = document.createElement('div');
				prevention_L3.setAttribute('id', 'prevention_L3');
				prevention.appendChild(prevention_L3);
				prevention_L4 = document.createElement('div');
				prevention_L4.setAttribute('id', 'prevention_L4');
				prevention.appendChild(prevention_L4);
				prevention_L5 = document.createElement('div');
				prevention_L5.setAttribute('id', 'prevention_L5');
				prevention.appendChild(prevention_L5);
				ggg.appendChild(prevention);
				plan = document.createElement('div');
				plan.setAttribute('id', 'plan');
				plan.style.border = '1px solid black';
				plan.style.width = '375px';
				plantitle = document.createTextNode('試辦計畫');
				plan.appendChild(plantitle);
				plan_L1 = document.createElement('div');
				plan_L1.setAttribute('id', 'plan_L1');
				plan.appendChild(plan_L1);
				plan_L2 = document.createElement('div');
				plan_L2.setAttribute('id', 'plan_L2');
				plan.appendChild(plan_L2);
				plan_L3 = document.createElement('div');
				plan_L3.setAttribute('id', 'plan_L3');
				plan.appendChild(plan_L3);
				horizontalContainer = document.createElement('div');
				horizontalContainer.style.display = 'flex';
				horizontalContainer.appendChild(prevention);
				horizontalContainer.appendChild(plan);
				ggg.appendChild(horizontalContainer);
			} 
			registrationId=cc.split('/')[cc.split('/').length-1];
			furl='https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId='+registrationId+'&type=consultation';
			await fetch(furl, {
			  'headers': {
				'content-type': 'application/json'
			  },
			  'body': null,
			  'method': 'GET',
			}).then(response => response.text())
			  .then((response) => {
				res=JSON.parse(response);
				personalInfoId=res.result.personalInfoId;
				age=res.result.age;
				gender=res.result.gender;
				furl2='https://phpcis.chshb.gov.tw/api/v1/personal_infos/preventions_histories/list?personalInfoId='+personalInfoId;
				fetch(furl2, {
				  'headers': {
					'content-type': 'application/json'
				  },
				  'body': null,
				  'method': 'GET',
				}).then(response => response.text())
				  .then((response) => {
					res2=JSON.parse(response);
					HE=['HE'];
					FO=['FO'];
					OR=['OR'];
					PA=['PA'];
					MA=['MA'];
					for (i=1;i<=res2.result.length;i++){
						if (res2.result[res2.result.length-i].preventionTag=='02'){
							if (res2.result[res2.result.length-i].serviceCode.includes('Y')){
								HE.splice(HE.length-1,1);
							} else {
								HE.push(res2.result[res2.result.length-i]);
							}
						} else if (res2.result[res2.result.length-i].preventionTag=='03'){
							if (res2.result[res2.result.length-i].serviceCode.includes('Y')){
								PA.splice(PA.length-1,1);
							} else {
								PA.push(res2.result[res2.result.length-i]);
							}
						} else if (res2.result[res2.result.length-i].preventionTag=='06'){
							if (res2.result[res2.result.length-i].serviceCode.includes('Y')){
								MA.splice(MA.length-1,1);
							} else {
								MA.push(res2.result[res2.result.length-i]);
							}
						} else if (res2.result[res2.result.length-i].preventionTag=='07'){
							if (res2.result[res2.result.length-i].serviceCode.includes('Y')){
								FO.splice(FO.length-1,1);
							} else {
								FO.push(res2.result[res2.result.length-i]);
							}
						} else if (res2.result[res2.result.length-i].preventionTag=='08'){
							if (res2.result[res2.result.length-i].serviceCode.includes('Y')){
								OR.splice(OR.length-1,1);
							} else {
								OR.push(res2.result[res2.result.length-i]);
							}
						}
					}
					nowy=new Date().getFullYear();
					if (age>=65){
						if (HE.length>1){
							LHE=HE[HE.length-1].treatmentDate.split('-')[0];
							if (nowy-LHE>=1){
								HEC='O , >65歲每年1次';
							} else {
								HEC='X , >65歲未滿1年';
							}
							theclinic=HE[HE.length-1].clinicName;
							theclinic=theclinic.replace('彰化基督教醫療財團法人', '').replace('秀傳醫療社團法人', '')
							if (theclinic.length>12){
								theclinic=theclinic.substring(theclinic.length-12,theclinic.length)
							}
							HEC=HEC+','+theclinic+'('+HE[HE.length-1].treatmentDate+')';
						} else {
							HEC='O , >65歲每年1次';
						}
					} else if (age>=40 && age<65){
						if (HE.length>1){
							LHE=HE[HE.length-1].treatmentDate.split('-')[0];
							theclinic=HE[HE.length-1].clinicName;
							theclinic=theclinic.replace('彰化基督教醫療財團法人', '').replace('秀傳醫療社團法人', '')
							if (nowy-LHE>=3){
								HEC='O , 40-64歲3年1次'+theclinic+'('+HE[HE.length-1].treatmentDate+')';
							} else {
								HEC='X , 40-64歲未滿3年'+theclinic+'('+HE[HE.length-1].treatmentDate+')';
							}
						} else {
							HEC='O , 40-65歲3年1次';
						}
					} else if (age>=30 && age<40){
						if (HE.length>1){
							LHE=HE[HE.length-1].treatmentDate.split('-')[0];
							theclinic=HE[HE.length-1].clinicName;
							theclinic=theclinic.replace('彰化基督教醫療財團法人', '').replace('秀傳醫療社團法人', '')
							if (nowy-LHE>=5){
								HEC='O , 30-39歲5年1次'+theclinic+'('+HE[HE.length-1].treatmentDate+')';
							} else {
								HEC='X , 30-39歲未滿5年'+theclinic+'('+HE[HE.length-1].treatmentDate+')';
							}
						} else {
							HEC='O , 30-39歲5年1次';
						}
					} else {
						HEC='X , <30歲不可成健';
					}
					if (gender=='2'){
						if (age>=30){
							if (PA.length>1){
								LPA=PA[PA.length-1].treatmentDate.split('-')[0];
								if (nowy-LPA>=6){
									PAC='O , >30歲6年未抹';
								} else if (nowy-LPA>=3 && nowy-LPA<6){
									PAC='O , >30歲3年未抹';
								} else if (nowy-LPA>=1){
									PAC='O , >30歲每年1次';
								} else if (nowy-LPA<1){
									PAC='X , >30歲未滿1年';
								} 
								theclinic=PA[PA.length-1].clinicName;
								theclinic=theclinic.replace('彰化基督教醫療財團法人', '').replace('秀傳醫療社團法人', '')
								if (theclinic.length>12){
									theclinic=theclinic.substring(theclinic.length-12,theclinic.length)
								}
								PAC=PAC+','+theclinic+'('+PA[PA.length-1].treatmentDate+')';
							} else {
								PAC='O , 不曾抹(首篩)';
							}
						} else if (age>=25 && age<30){
							if (PA.length>1){
								LPA=PA[PA.length-1].treatmentDate.split('-')[0];
								if (nowy-LPA>=6){
									PAC='O , 25-30歲6年未抹';
								} else if (nowy-LPA>=3 && nowy-LPA<6){
									PAC='O , 25-30歲3年未抹';
								} else if (nowy-LPA<3){
									PAC='X , 25-30歲未滿3年';
								} 
								theclinic=PA[PA.length-1].clinicName;
								theclinic=theclinic.replace('彰化基督教醫療財團法人', '').replace('秀傳醫療社團法人', '')
								if (theclinic.length>12){
									theclinic=theclinic.substring(theclinic.length-12,theclinic.length)
								}
								PAC=PAC+','+theclinic+'('+PA[PA.length-1].treatmentDate+')';
							} else {
								PAC='O , 不曾抹(首篩)';
							}
						} else {
							PAC='X , <25歲';
						}
					} else {
						PAC='X , 需女性';
					}
					if (gender=='2'){
						if (age>=40 && age<70){
							if (MA.length>1){
								LMA=MA[MA.length-1].treatmentDate.split('-')[0];
								if (nowy-LMA>=2){
									MAC='O , 40-70歲2年1次';
								} else {
									MAC='X , 40-70歲未滿2年';
								}
								theclinic=MA[MA.length-1].clinicName;
								theclinic=theclinic.replace('彰化基督教醫療財團法人', '').replace('秀傳醫療社團法人', '')
								if (theclinic.length>12){
									theclinic=theclinic.substring(theclinic.length-12,theclinic.length)
								}
								MAC=MAC+','+theclinic+'('+MA[MA.length-1].treatmentDate+')';
							} else {
								MAC='O , 40-70歲，不曾乳攝(首篩)';
							}
						} else if (age>=70){
							MAC='X , >70歲';
						} else {
							MAC='X , <40歲';
						}
					} else {
						MAC='X , 需女性';
					}
					if (age>=45 && age<75){
						if (FO.length>1){
							LFO=FO[FO.length-1].treatmentDate.split('-')[0];
							if (nowy-LFO>=2){
								FOC='O , 45-75歲2年1次';
							} else {
								FOC='X , 45-75歲未滿2年';
							}
							theclinic=FO[FO.length-1].clinicName;
							theclinic=theclinic.replace('彰化基督教醫療財團法人', '').replace('秀傳醫療社團法人', '')
							if (theclinic.length>12){
								theclinic=theclinic.substring(theclinic.length-12,theclinic.length)
							}
							FOC=FOC+','+theclinic+'('+FO[FO.length-1].treatmentDate+')';
						} else {
							FOC='O , 45-75歲，不曾FOBT(首篩)';
						}
					} else if (age>=75){
						FOC='X , >75歲';
					} else {
						FOC='X , <45歲;40-44歲詢問家族史';
					}
					if (age>=30){
						if (OR.length>1){
							LOR=OR[OR.length-1].treatmentDate.split('-')[0];
							if (nowy-LOR>=2){
								ORC='O , 有菸檳史可';
							} else {
								ORC='X , 間隔未滿2年';
							}
							theclinic=OR[OR.length-1].clinicName;
							theclinic=theclinic.replace('彰化基督教醫療財團法人', '').replace('秀傳醫療社團法人', '')
							if (theclinic.length>12){
								theclinic=theclinic.substring(theclinic.length-12,theclinic.length)
							}
							ORC=ORC+','+theclinic+'('+OR[OR.length-1].treatmentDate+')';
						} else {
							ORC='O , 有菸檳史可(首篩)';
						}
					} else {
						ORC='X , 未滿30歲';
					}
					msg2='\n成健: '+HEC+'\n腸篩: '+FOC+'\n子抹: '+PAC+'\n乳攝: '+MAC+'\n口篩: '+ORC;
					prevention_L1=document.getElementById('prevention_L1');
					prevention_L1.textContent='成健: '+HEC;
					prevention_L2=document.getElementById('prevention_L2');
					prevention_L2.textContent='腸篩: '+FOC;
					prevention_L3=document.getElementById('prevention_L3');
					prevention_L3.textContent='子抹: '+PAC;
					prevention_L4=document.getElementById('prevention_L4');
					prevention_L4.textContent='乳攝: '+MAC;	
					prevention_L5=document.getElementById('prevention_L5');
					prevention_L5.textContent='口篩: '+ORC;
					furl3='https://phpcis.chshb.gov.tw/api/v1/personal_infos/chronic_cares_histories/list?personalInfoId='+personalInfoId;
					fetch(furl3, {
					  'headers': {
						'content-type': 'application/json'
					  },
					  'body': null,
					  'method': 'GET',
					}).then(response => response.text())
					  .then((response) => {
						res3=JSON.parse(response);
						DKD={"rec":[]};
						DM={"rec":[]};
						CKD={"rec":[]};
						yearDMC=0;
						yearDM1=0;
						DKDC='DKD: 無';
						DMC='DM: 無';
						CKDC='CKD: 無';
						cc=res3.result.chronicCares;
						strd=document.querySelector("#root > div.wrapper > main > div > form > div:nth-child(2) > div:nth-child(8) > div > div > input").value.split(' ')[1];
						now=new Date(strd);
						nowy=strd.split('-')[0];
						for (let i=0;i<cc.length;i++){
							let r=cc[cc.length-1-i];
							if (r.chronicCareType=='1'){
								DM.rec.push(r);
								let ty=r.treatmentDate.split('-')[0];
								if (!DM.hasOwnProperty(ty)){
									DM[ty]=[];
								}
								DM[ty].push(r);
							} else if (r.chronicCareType=='2'){
								CKD.rec.push(r);
								let ty=r.treatmentDate.split('-')[0];
								if (!CKD.hasOwnProperty(ty)){
									CKD[ty]=[];
								}
								CKD[ty].push(r);
							} else if (r.chronicCareType=='3'){
								if (DKD.rec.length==0){
									DKD=DM;
								}
								DKD.rec.push(r);
								ty=r.treatmentDate.split('-')[0];
								if (!DKD.hasOwnProperty(ty)){
									DKD[ty]=[];
								}
								DKD[ty].push(r);		
							}
						}
						if (DKD.rec.length>0){
							treatmentDate=DKD.rec[DKD.rec.length-1].treatmentDate
							date_1=new Date(treatmentDate);
							date_2=new Date(date_1.getTime()+77*1000*3600*24);
							date_e=new Date((treatmentDate.split('-')[0]*1+1)+"-"+treatmentDate.split('-')[1]+"-"+treatmentDate.split('-')[2]);
							if (now>date_e){
								DKDC='DKD: X, 超過一年未申報,';
								DMC='DM: X, 已轉DKD';
								CKDC='CKD: X, 已轉DKD';
							} else {
								mky=date_2.getUTCFullYear()-1911;
								mm0=date_2.getUTCMonth();
								mm0+=1;
								mkm=('00'+mm0).substring(('00'+mm0).length-2,('00'+mm0).length);
								dd0=date_2.getUTCDate();
								mkd=('00'+dd0).substring(('00'+dd0).length-2,('00'+dd0).length);
								mkdd=mky+mkm+mkd;
								if (!DKD.hasOwnProperty(nowy)){
									DKD[nowy]=[];
									if (now>=date_2){
										DKDC='DKD: O, 新年度,';
									} else {
										DKDC='DKD: X, 新年度,';
									}
									ly=nowy-1;
								} else {
									yearDMC=DKD[nowy].length;
									if (yearDMC<4){
										if (now>=date_2){
											DKDC='DKD: O, 已申報'+yearDMC+'次,';
										} else {
											DKDC='DKD: X, 已申報'+yearDMC+'次,';
										}
									} else {
										DKDC='DKD: X, 已申報4次，';
									}
									ly=nowy;
								}
								DKDL="";
								DKDYC=0;
								rdkd=DKD.rec.reverse();
								if (rdkd.length>4){
									rdkdl=4
								} else {
									rdkdl=rdkd.length;
								}
								for (let a=0;a<rdkdl;a++){
									let rec=rdkd[rdkdl-1-a];
									let co=rec.chronicCareCode;
									if (co=="P1407C"){
										DKDYC=0;
										DKDL=DKDL+"收,";
									} else if (["P1408C","P1410C","P7001C"].includes(co)){
										DKDYC+=1;
										DKDL=DKDL+"追,";
									} else if (["P1409C","P1411C","P7002C"].includes(co)){
										DKDYC=0;
										DKDL=DKDL+"年,";
									}
									
								}

								if (DKDYC<3){
									DKDC=DKDC+mkdd+"後可申報P7001C,"
								} else {
									DKDC=DKDC+mkdd+"後可申報P7002C,"
								}
								DKDL=DKDL.substring(0,DKDL.length-1);
								DKDC=DKDC+"("+DKDL+")";
								DMC='DM: X, 已轉DKD';
								CKDC='CKD: X, 已轉DKD';
							}
						} else {
							if (DM.rec.length>0){
								treatmentDate=DM.rec[DM.rec.length-1].treatmentDate;
								if (DM.rec[DM.rec.length-1].chronicCareCode=='P1410C' || DM.rec[DM.rec.length-1].chronicCareCode=='P1411C'){
									DT=2;
								} else {
									DT=1;
								}
								date_1=new Date(treatmentDate);
								date_2=new Date(date_1.getTime()+77*1000*3600*24);
								date_e=new Date((treatmentDate.split('-')[0]*1+1)+"-"+treatmentDate.split('-')[1]+"-"+treatmentDate.split('-')[2]);
								if (now>date_e){
									DMC='DM: X, 超過一年未申報';
								} else {
									mky=date_2.getUTCFullYear()-1911;
									mm0=date_2.getUTCMonth();
									mm0+=1;
									mkm=('00'+mm0).substring(('00'+mm0).length-2,('00'+mm0).length);
									dd0=date_2.getUTCDate();
									mkd=('00'+dd0).substring(('00'+dd0).length-2,('00'+dd0).length);
									mkdd=mky+mkm+mkd;
									if (!DM.hasOwnProperty(nowy)){
										DM[nowy]=[];
										if (now>=date_2){
											DMC='DM: O, 新年度,';
										} else {
											DMC='DM: X, 新年度,';
										}
										ly=nowy-1;
									} else {
										yearDMC=DM[nowy].length;
										if (yearDMC<4){
											if (now>=date_2){
												DMC='DM: O, 已申報'+yearDMC+'次,';
											} else {
												DMC='DM: X, 已申報'+yearDMC+'次,';
											}
										} else {
											DMC=DMC+': X, 今年已申報4次，';
										}
										ly=nowy;
									}
									DML="";
									DMYC=0;
									rdm=DM.rec.reverse();
									if (rdm.length>4){
										rdml=4
									} else {
										rdml=rdm.length;
									}
									for (let a=0;a<rdml;a++){
										let rec=rdm[rdml-1-a];
										let co=rec.chronicCareCode;
										if (co=="P1407C"){
											DMYC=0;
											DML=DML+"收,";
										} else if (["P1408C","P1410C"].includes(co)){
											DMYC+=1;
											DML=DML+"追,";
										} else if (["P1409C","P1411C"].includes(co)){
											DMYC=0;
											DML=DML+"年,";
										}
									}
									if (DMYC<3){
										if (DT==1){
											DMC=DMC+mkdd+"後可申報P1408C,"
										} else {
											DMC=DMC+mkdd+"後可申報P1410C,"
										}
									} else {
										if (DT==1){
											DMC=DMC+mkdd+"後可申報P1409C,"
										} else {
											DMC=DMC+mkdd+"後可申報P1411C,"
										}
									}
									
									
									DML=DML.substring(0,DML.length-1);
									DMC=DMC+"("+DML+")";
								}
								
							}
							if (CKD.rec.length>0){
								treatmentDate=CKD.rec[CKD.rec.length-1].treatmentDate;
								date_1=new Date(treatmentDate);
								date_2=new Date(date_1.getTime()+161*1000*3600*24);
								date_e=new Date((treatmentDate.split('-')[0]*1+1)+"-"+treatmentDate.split('-')[1]+"-"+treatmentDate.split('-')[2]);
								if (now>date_e){
									CKDC='CKD: X, 超過一年未申報';
								} else {
									mky=date_2.getUTCFullYear()-1911;
									mm0=date_2.getUTCMonth();
									mm0+=1;
									mkm=('00'+mm0).substring(('00'+mm0).length-2,('00'+mm0).length);
									dd0=date_2.getUTCDate();
									mkd=('00'+dd0).substring(('00'+dd0).length-2,('00'+dd0).length);
									mkdd=mky+mkm+mkd;
									if (now>=date_2){
										CKDC='CKD: O,'+mkdd+'後可申報';
									} else {
										CKDC='CKD: X,'+mkdd+'後可申報';
									}
								}
							}
						}	
						plan_L1=document.getElementById('plan_L1');
						plan_L1.textContent=DKDC;
						plan_L2=document.getElementById('plan_L2');
						plan_L2.textContent=DMC;
						plan_L3=document.getElementById('plan_L3');
						plan_L3.textContent=CKDC;
						if (document.getElementsByClassName('badge badge-secondary').length==0){
							alert('非2.0掛號');
						}
					}).catch(err => console.log(err));
				}).catch(err => console.log(err));
			}).catch(err => console.log(err));
		} else {
			alert('需在看診頁面使用');
		}
	}
	function button_HE_handle(){
		cc=document.URL;
		d1='https://phpcis.chshb.gov.tw/consultationMainPage';
		if (cc.includes(d1)){
			var ppp = document.querySelector('body > div.fade.modal.show > div > div');
			if (ppp!==null){
				if (ppp.children[0].textContent=='新增預防保健資料'){
					let m_gen=document.getElementsByClassName('consultationMainPage__value')[10];
					let m_bir=document.getElementsByClassName('consultationMainPage__value')[6];
					let m_vd=document.getElementsByClassName('consultationMainPage__value')[27];
					let m_id=document.getElementsByClassName('consultationMainPage__value')[2];
					let m_name=document.getElementsByClassName('consultationMainPage__value')[4];
					let m_P_S_1=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(9) > input[type=checkbox]:nth-child(1)");
					let m_P_S_2=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(9) > input[type=checkbox]:nth-child(2)");
					let m_P_S_3=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(9) > input[type=checkbox]:nth-child(3)");
					let m_P_S_4=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(9) > input[type=checkbox]:nth-child(4)");
					let m_P_B_1=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(13) > input[type=checkbox]:nth-child(1)");
					let m_P_B_2=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(13) > input[type=checkbox]:nth-child(2)");
					let m_P_B_3=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(13) > input[type=checkbox]:nth-child(3)");
					let m_P_HTN=document.querySelector("#HEHypertension");
					let m_P_DM=document.querySelector("#HEDiabetes");
					let m_P_LIP=document.querySelector("#HEHyperlipidemia");
					let m_P_CAD=document.querySelector("#HEHeartDisease");
					let m_P_CVA=document.querySelector("#HEStroke");
					let m_P_CKD=document.querySelector("#HEKidneyDiseases");
					let m_P_HBV=document.querySelector("#HEhepatitisB");
					let m_P_HCV=document.querySelector("#HEhepatitisC");
					let m_P_PSY=document.querySelector("#HEMentalIllness");
					let m_P_CA=document.querySelector("#HECancer");
					let m_P_COUGH=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(16) > input[type=checkbox]:nth-child(3)");
					let m_P_D1=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(17) > input[type=checkbox]:nth-child(3)");
					let m_P_D2=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(18) > input[type=checkbox]:nth-child(3)");		
					let m_H_smoke=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(9) > input[type=checkbox]:nth-child(1)");
					let m_H_drink=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(11) > input[type=checkbox]:nth-child(1)");
					let m_H_betel=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(13) > input[type=checkbox]:nth-child(1)");
					let m_H_exercise=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(15) > input[type=checkbox]:nth-child(3)");
					let m_PE_height=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(2) > input[type=number]:nth-child(1)");
					let m_PE_weight=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(2) > input[type=number]:nth-child(3)");
					let m_PE_SBP=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(1)");
					let m_PE_DBP=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(2)");
					let m_PE_WC=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(4)");
					let m_PE_BMI=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(4) > input[type=number]");
					let m_PE_VR1=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(6) > input[type=number]:nth-child(2)");
					let m_PE_VL1=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(6) > input[type=number]:nth-child(4)");
					let m_PE_VR2=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(7) > input[type=number]:nth-child(2)");
					let m_PE_VL2=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(7) > input[type=number]:nth-child(4)");
					let m_PE_OR1=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(10) > input[type=checkbox]:nth-child(3)");
					let m_PE_OR2=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(10) > input[type=checkbox]:nth-child(4)");
					let m_L_UP=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(3) > input[type=string]");
					let m_L_AC=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(5) > input[type=number]");
					let m_L_TC=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(6) > input[type=number]");
					let m_L_TG=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(7) > input[type=number]");
					let m_L_HDL=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(8) > input[type=number]");
					let m_L_LDL=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(9) > input[type=number]");
					let m_L_GOT=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(11) > input[type=number]");
					let m_L_GPT=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(12) > input[type=number]");
					let m_L_CRE=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(13) > input[type=number]");
					let m_L_GFR=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(14) > input[type=number]");
					let m_L_UA=document.querySelector("#uricAcid");
					let m_L_BN=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(16) > input[type=checkbox]:nth-child(2)");
					let m_L_BP=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(16) > input[type=checkbox]:nth-child(3)");
					let m_L_NB=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(16) > input[type=checkbox]:nth-child(4)");
					let m_L_CN=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(17) > input[type=checkbox]:nth-child(2)");
					let m_L_CP=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(17) > input[type=checkbox]:nth-child(3)");
					let m_L_NC=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(17) > input[type=checkbox]:nth-child(4)");
					let m_S_smoke=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child(1)");
					let m_S_dring=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child(2)");
					let m_S_betel=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child(3)");
					let m_S_exer=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child(4)");
					let m_S_ckd=document.querySelector("#healthRenalLiteracyEducation");
					let m_S_bw=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(3) > input[type=checkbox]:nth-child(2)");
					let m_S_diet=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(3) > input[type=checkbox]:nth-child(3)");
					let m_S_tra=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(3) > input[type=checkbox]:nth-child(4)");
					let m_S_oral=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(4) > input[type=checkbox]:nth-child(1)");
					let m_S_risk=document.querySelector("#healthRiskAssessment");
					let m_S_BN=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(15) > input[type=checkbox]:nth-child(1)");
					let m_S_BP=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(15) > input[type=checkbox]:nth-child(2)");
					let m_S_NB=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(15) > input[type=checkbox]:nth-child(3)");
					let m_S_CN=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(16) > input[type=checkbox]:nth-child(1)");
					let m_S_CP=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(16) > input[type=checkbox]:nth-child(2)");
					let m_S_NC=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(16) > input[type=checkbox]:nth-child(3)");
					let m_S_HTN_4=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(7) > input[type=checkbox]:nth-child(6)");
					let m_S_HTN_3=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(7) > input[type=checkbox]:nth-child(5)");
					let m_S_HTN_2=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(7) > input[type=checkbox]:nth-child(2)");
					let m_S_HTN_1=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(7) > input[type=checkbox]:nth-child(1)");
					let m_S_DM_4=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(8) > input[type=checkbox]:nth-child(6)");
					let m_S_DM_3=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(8) > input[type=checkbox]:nth-child(5)");
					let m_S_DM_2=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(8) > input[type=checkbox]:nth-child(2)");
					let m_S_DM_1=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(8) > input[type=checkbox]:nth-child(1)");
					let m_S_LIP_4=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(9) > input[type=checkbox]:nth-child(6)");
					let m_S_LIP_3=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(9) > input[type=checkbox]:nth-child(5)");
					let m_S_LIP_2=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(9) > input[type=checkbox]:nth-child(2)");
					let m_S_LIP_1=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(9) > input[type=checkbox]:nth-child(1)");
					let m_S_CKD_4=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(10) > input[type=checkbox]:nth-child(7)");
					let m_S_CKD_3=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(10) > input[type=checkbox]:nth-child(6)");
					let m_S_CKD_2=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(10) > input[type=checkbox]:nth-child(2)");
					let m_S_CKD_1=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(10) > input[type=checkbox]:nth-child(1)");
					let m_S_HEP_4=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(11) > input[type=checkbox]:nth-child(6)");
					let m_S_HEP_3=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(11) > input[type=checkbox]:nth-child(5)");
					let m_S_HEP_2=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(11) > input[type=checkbox]:nth-child(2)");
					let m_S_HEP_1=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(11) > input[type=checkbox]:nth-child(1)");
					let m_S_META_4=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(12) > input[type=checkbox]:nth-child(6)");
					let m_S_META_3=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(12) > input[type=checkbox]:nth-child(5)");
					let m_S_META_2=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(12) > input[type=checkbox]:nth-child(2)");
					let m_S_META_1=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(12) > input[type=checkbox]:nth-child(1)");
					let m_S_COUGH_N=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(17) > input[type=checkbox]:nth-child(1)");
					let m_S_COUGH_Y=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(17) > input[type=checkbox]:nth-child(2)");
					let m_S_DEP_N=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(18) > input[type=checkbox]:nth-child(1)");
					let m_S_DEP_Y=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(18) > input[type=checkbox]:nth-child(2)");
					let m_S_CKD_span=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(10) > div > span");
					let m_S_riskassay=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(14) > div > div.buttonContainer > button");
					GEN=m_gen.textContent;
					bb=m_bir.textContent;
					bby=bb.substring(0,4);
					yyyy=new Date().getFullYear();
					age=yyyy-bby;
					vd0=m_vd.value;
					vd=(vd0.split(' ')[1].split('-')[0]-1911)+"/"+vd0.split(' ')[1].split('-')[1]+"/"+vd0.split(' ')[1].split('-')[2];
					P_ID=m_id.textContent;
					P_NAME=m_name.textContent;
					yyy='000'+(bb.split('-')[0]-1911);
					P_BIR=yyy.substring(yyy.length-3,yyy.length)+"/"+bb.split('-')[1]+"/"+bb.split('-')[2];
					P_S=4
					if (m_P_S_1.checked){
						P_S=0;
					} else if (m_P_S_2.checked){
						P_S=1;
					} else if (m_P_S_3.checked){
						P_S=2;
					} else if (m_P_S_4.checked){
						P_S=3;
					}
					if (P_S==4){
						m_P_S_1.click();
						P_S=0;
					}
					if (m_P_B_1.checked){
						P_B=0;
					} else if (m_P_B_2.checked){
						P_B=1;
					} else if (m_P_B_3.checked){
						P_B=2;
					}
					P_HTN=m_P_HTN.checked;
					if (P_HTN){
						PP_HTN=1;
					} else {
						PP_HTN=0;
					}
					P_DM=m_P_DM.checked;
					if (P_DM){
						PP_DM=1;
					} else {
						PP_DM=0;
					}
					P_LIP=m_P_LIP.checked;
					if (P_LIP){
						PP_LIP=1;
					} else {
						PP_LIP=0;
					}
					P_CAD=m_P_CAD.checked;
					if (P_CAD){
						PP_CAD=1;
					} else {
						PP_CAD=0;
					}
					P_CVA=m_P_CVA.checked;
					if (P_CVA){
						PP_CVA=1;
					} else {
						PP_CVA=0;
					}
					P_CKD=m_P_CKD.checked;
					if (P_CKD){
						PP_CKD=1;
					} else {
						PP_CKD=0;
					}
					P_HBV=m_P_HBV.checked;
					P_HCV=m_P_HCV.checked;
					P_PSY=m_P_PSY.checked;
					P_CA=document.querySelector("#HECancer").checked;
					P_COUGH=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(16) > input[type=checkbox]:nth-child(3)").checked;
					P_D1=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(17) > input[type=checkbox]:nth-child(3)").checked;
					P_D2=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(18) > input[type=checkbox]:nth-child(3)").checked;		
					H_smoke=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(9) > input[type=checkbox]:nth-child(1)").checked;
					H_drink=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(11) > input[type=checkbox]:nth-child(1)").checked;
					H_betel=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(13) > input[type=checkbox]:nth-child(1)").checked;
					H_exercise=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(15) > input[type=checkbox]:nth-child(3)").checked;
					PE_height=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(2) > input[type=number]:nth-child(1)").value;
					PE_weight=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(2) > input[type=number]:nth-child(3)").value;
					PE_SBP=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(1)").value;
					PE_DBP=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(2)").value;
					PE_WC=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(4)").value;
					PE_BMI=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(4) > input[type=number]").value;
					PE_VR1=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(6) > input[type=number]:nth-child(2)").value;
					PE_VL1=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(6) > input[type=number]:nth-child(4)").value;
					PE_VR2=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(7) > input[type=number]:nth-child(2)").value;
					PE_VL2=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(7) > input[type=number]:nth-child(4)").value;
					PE_OR1=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(10) > input[type=checkbox]:nth-child(3)").checked;
					PE_OR2=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(10) > input[type=checkbox]:nth-child(4)").checked;
					L_UP=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(3) > input[type=string]").value;
					L_AC=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(5) > input[type=number]").value;
					L_TC=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(6) > input[type=number]").value;
					L_TG=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(7) > input[type=number]").value;
					L_HDL=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(8) > input[type=number]").value;
					L_LDL=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(9) > input[type=number]").value;
					L_GOT=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(11) > input[type=number]").value;
					L_GPT=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(12) > input[type=number]").value;
					L_CRE=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(13) > input[type=number]").value;
					L_GFR=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(14) > input[type=number]").value;
					L_UA=document.querySelector("#uricAcid").value;
					L_BN=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(16) > input[type=checkbox]:nth-child(2)").checked;
					L_BP=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(16) > input[type=checkbox]:nth-child(3)").checked;
					L_NB=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(16) > input[type=checkbox]:nth-child(4)").checked;
					L_CN=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(17) > input[type=checkbox]:nth-child(2)").checked;
					L_CP=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(17) > input[type=checkbox]:nth-child(3)").checked;
					L_NC=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(17) > input[type=checkbox]:nth-child(4)").checked;
					S_smoke=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child(1)").checked;
					S_dring=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child(2)").checked;
					S_betel=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child(3)").checked;
					S_exer=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child(4)").checked;
					S_ckd=document.querySelector("#healthRenalLiteracyEducation").checked;
					S_bw=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(3) > input[type=checkbox]:nth-child(1)").checked;
					S_diet=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(3) > input[type=checkbox]:nth-child(2)").checked;
					S_tra=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(3) > input[type=checkbox]:nth-child(3)").checked;
					S_oral=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(3) > input[type=checkbox]:nth-child(4)").checked;
					S_risk=document.querySelector("#healthRiskAssessment").checked;
					S_BN=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(15) > input[type=checkbox]:nth-child(1)").checked;
					S_BP=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(15) > input[type=checkbox]:nth-child(2)").checked;
					S_NB=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(15) > input[type=checkbox]:nth-child(3)").checked;
					S_CN=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(16) > input[type=checkbox]:nth-child(1)").checked;
					S_CP=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(16) > input[type=checkbox]:nth-child(2)").checked;
					S_NC=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(16) > input[type=checkbox]:nth-child(3)").checked;
					if (L_BN){
						HBV_status=0;
					} else if (L_BP){
						HBV_status=1;
					} else if (L_NB){
						HBV_status=2;
					}
					if (L_CN){
						HCV_status=0;
					} else if (L_CP){
						HCV_status=1;
					} else if (L_NC){
						HCV_status=2;
					}
					
					if (H_smoke==S_smoke){
						m_S_smoke.click();
					}
					if (H_drink==S_dring){
						m_S_dring.click();
					}
					if (H_betel==S_betel){
						m_S_betel.click();
					}
					if (H_exercise==S_exer){
						m_S_exer.click();
					}
					if (!S_ckd){
						m_S_ckd.click();
					}
					if (!S_risk){
						m_S_risk.click();
					}
					if ((PE_BMI>24 || (GEN.includes('女') && PE_WC>80) || (GEN.includes('男') && PE_WC>90)) !== S_bw ){
						m_S_bw.click();
					}
					if (S_diet==false){
						m_S_diet.click();
					}
					if ((P_PSY==true || P_CVA==true || (PE_VR1<0.5 && PE_VR2 <0.5 && PE_VL1<0.5 && PE_VL2<0.5)) !== S_tra){
						m_S_tra.click();
					}
					if ((PE_OR1==true || PE_OR2==true) !==S_oral){
						m_S_oral.click();
					}
					if (P_HTN==true || PE_SBP>179 || PE_DBP>119){
						m_S_HTN_4.click();
					} else if (PE_SBP>159 || PE_DBP>109){
						m_S_HTN_3.click();
					} else if (PE_SBP>134 || PE_DBP>84){
						m_S_HTN_2.click();
					} else {
						m_S_HTN_1.click();
					}
					if (P_DM==true || L_AC>199){
						m_S_DM_4.click();
					} else if (L_AC>125){
						m_S_DM_3.click();
					} else if (L_AC>100){
						m_S_DM_2.click();
					} else {
						m_S_DM_1.click();
					}
					if (P_LIP==true || ((P_DM==true || P_CAD==true || P_CVA==true)&& L_LDL>100) || L_TG>400){
						m_S_LIP_4.click();
					} else if (L_LDL>190 || (P_HTN==true && L_LDL>160)){
						m_S_LIP_3.click();
					} else if (L_LDL>130 || L_TG>150 || L_TC>200 ||(GEN.includes('女') && L_HDL<50) || (GEN.includes('男') && L_HDL<40)){
						m_S_LIP_2.click();
					} else {
						m_S_LIP_1.click();
					}
					if (P_CKD==true){
						m_S_CKD_4.click();
					} else if (L_GFR<60 && L_UP>15){
						m_S_CKD_3.click();
					} else if (L_GFR<60 || L_UP>15){
						m_S_CKD_2.click();
					} else {
						m_S_CKD_1.click();
					}
					if (L_GOT>200 || L_GPT>200){
						m_S_HEP_4.click();
					} else if ((P_HBV==true || P_HCV==true) && (L_GOT>40 || L_GPT>40)){
						m_S_HEP_3.click();
					} else if (P_HBV==true || P_HCV==true || L_GOT>40 || L_GPT>40){
						m_S_HEP_2.click();
					} else {
						m_S_HEP_1.click();
					}
					meta=0;
					if(L_AC>99 || P_DM==true){
						meta=meta+1;
					}
					if(L_TG>149 || P_LIP==true){
						meta=meta+1;
					}
					if(PE_SBP>129 || PE_DBP>84 || P_HTN==true){
						meta=meta+1;
					}
					if ((GEN.includes('女') && PE_WC>79) || (GEN.includes('男') && PE_WC>89)){
						meta=meta+1;
					}
					if ((GEN.includes('女') && L_HDL<50) || (GEN.includes('男') && L_HDL<40) || P_LIP==true){
						meta=meta+1;
					}
					if ((P_HTN==true || P_DM==true || P_LIP==true) && meta>2){
						m_S_META_4.click();
					} else if (meta >2){
						m_S_META_3.click();
					} else if (meta >0){
						m_S_META_2.click();
					} else {
						m_S_META_1.click();
					}
					if (L_BN!==S_BN){
						m_S_BN.click();
					}
					if (L_BP!==S_BP){
						m_S_BP.click();
					}
					if (L_NB!==S_NB){
						m_S_NB.click();
					}
					if (L_CN!==S_CN){
						m_S_CN.click();
					}
					if (L_CP!==S_CP){
						m_S_CP.click();
					}
					if (L_NC!==S_NC){
						m_S_NC.click();
					}
					if (P_COUGH==true){
						m_S_COUGH_Y.click();
					} else {
						m_S_COUGH_N.click();
					}
					if (P_D1==true || P_D2==true){
						m_S_DEP_Y.click();
					} else {
						m_S_DEP_N.click();
					}
					
					let gfr=L_GFR*1;
					let up=L_UP*1;
					let CKD_stage="";
					if (gfr>=60){
						if (up<15){
							CKD_stage="0";
						} else {
							if (gfr>=90){
								CKD_stage="1";
							} else {
								CKD_stage="2";
							}
						}
					} else if (gfr>=45){
						CKD_stage="3A";
					} else if (gfr>=30){
						CKD_stage="3B";
					} else if (gfr>=15){
						CKD_stage="4";
					} else {
						CKD_stage="5";
					}
					let ckdspan=m_S_CKD_span;
					ckdspan.className='blink';
					ckdspan.style.background='red';
					ckdspan.style.color='yellow';
					ckdspan.textContent='請填入期數 '+CKD_stage
					let ckdspant=document.getElementById('ckdspant');
					if (ckdspant==null){
						ckdspant=document.createElement('span');
						ckdspant.id='ckdspant';
						let ti=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(4)");
						ti.appendChild(ckdspant);
					}
					
					ckdspant.className='blink';
					ckdspant.style.background='red';
					ckdspant.style.color='yellow';
					ckdspant.textContent='　CKD期數請填入 '+CKD_stage+" 　";

					m_S_riskassay.click();
					document.querySelector("#uncontrolled-tab-example-tab-tab4").click();
					addprintbutton();
				} else {
					alert('預防保健非成健');
				}
			} else {
				document.getElementById('ConsultationMainPage_consultationDropDown').click();
				document.getElementsByClassName('alignRight')[0].click();
			}
		} else {
			alert('請在看診頁面使用');
		}
	}
	function button_OR_handle(){
		theurl=document.URL;
		if (theurl.includes('https://phpcis.chshb.gov.tw/consultationMainPage/')){
			if (document.getElementsByName('visitTypeId')[1].value==16){
				if (document.getElementById('education1')!=null){
					input=prompt('輸入口篩編號\n含4碼問卷跟1-4碼檢查結果');
					if (input !== null) {
						changeevent=new Event('change', {bubbles: true});
						document.querySelector('#paymentType').options[1].selected=true;
						document.querySelector('#paymentType').dispatchEvent(changeevent);
						document.querySelector('#OCSLocation').options[2].selected=true;
						document.querySelector('#OCSLocation').dispatchEvent(changeevent);
						document.querySelector('#OCSDivision').options[3].selected=true;
						document.querySelector('#OCSDivision').dispatchEvent(changeevent);
						input=input.toUpperCase();
						numbers = input.match(/\d+/g)[0];
						input1=numbers.substring(0,1);
						input2=numbers.substring(1,2);
						input3=numbers.substring(2,3);
						input4=numbers.substring(3,4);
						input5=numbers.substring(4,input.length);
						document.querySelector('#education' + input1).click();
						document.querySelector('#OCSBetel' + input2).click();
						document.querySelector('#OCSSmoke' + input3).click();
						if (input4=='0'){
						  document.querySelector('#isOCSSymptom').click();
						} else {
						  document.querySelector('#noOCSSymptom').click();
						}
						document.querySelector('#oCSResult' + input5).click();
						if (input5!='0'){
							words = input.match(/\D+/g)[0];
							input6=words.toUpperCase();
							portionlist=['AU','AD','BL','BR','CR','CL','DR','DL','ER','EL','FR','FL','GR','GL','HR','HL','IR','IL','JR','JL','KR','KL','MR','ML','L'];
							for (i=0;i<portionlist.length;i++){
								if (document.querySelector('#OCSResultPortion' + portionlist[i]).checked){
									document.querySelector('#OCSResultPortion' + portionlist[i]).click();
								}
							}
							document.querySelector('#OCSResultPortion' + input6).click();
						}
						document.getElementById('uncontrolled-tab-example-tab-tab2').click();
						document.querySelector('img').scrollIntoView();
					}
				} else {
					document.getElementById('ConsultationMainPage_consultationDropDown').click();
					document.getElementsByClassName('alignRight')[0].click();
				}
			} else {
				alert('非口篩個案');
			}
		} else {
			alert('非看診畫面');
		}
	}
	async function button_goup_handle(){
	url=document.URL;
	u2='https://phpcis.chshb.gov.tw/consultationMainPage/';
	if (url.includes(u2)){
		registrationId=url.split('/')[url.split('/').length-1];
		furl='https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId='+registrationId+'&type=consultation';
		await fetch(furl, {
		  'headers': {
			'content-type': 'application/json'
		  },
		  'body': null,
		  'method': 'GET',
		}).then(response => response.text())
		  .then((response) => {
			res=JSON.parse(response);
			visitTypeCode=res.result.visitTypeCode;
			shiftId=res.result.shiftId;
			console.log(res.result.shiftId);
			furl2='https://phpcis.chshb.gov.tw/api/v1/registrations/list?clinicId=4&shiftId='+shiftId;
			fetch(furl2, {
			  'headers': {
				'content-type': 'application/json'
			  },
			  'body': null,
			  'method': 'GET',
			}).then(response => response.text())
			  .then((response) => {
				res2=JSON.parse(response);
				console.log(res2.result.length);
				find=0;
				for (i=0;i<res2.result.length;i++){
					if (res2.result[i].visitTypeCode==visitTypeCode){
						if (res2.result[i].registrationId>registrationId){
							break;
						} else if (res2.result[i].registrationId<registrationId){
							find=1;
							NregistrationId=res2.result[i].registrationId;
						}
					}
				}
				if (find==1){
					//location.href='https://phpcis.chshb.gov.tw/consultationMainPage/'+NregistrationId;
					gotourl('consultationMainPage/'+NregistrationId);
				} else {
					alert('shiftId '+shiftId+' 的 '+visitTypeCode+' 身分已到最上一筆');
				}
			}).catch(err => console.log(err));
		}).catch(err => console.log(err));
	} else {
		alert('非看診頁面');
	}
	}
	async function button_godown_handle(){
		url=document.URL;
		u2='https://phpcis.chshb.gov.tw/consultationMainPage/';
		if (url.includes(u2)){
			registrationId=url.split('/')[url.split('/').length-1];
			furl='https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId='+registrationId+'&type=consultation';
			await fetch(furl, {
			  'headers': {
				'content-type': 'application/json'
			  },
			  'body': null,
			  'method': 'GET',
			}).then(response => response.text())
			  .then((response) => {
				res=JSON.parse(response);
				visitTypeCode=res.result.visitTypeCode;
				shiftId=res.result.shiftId;
				console.log(res.result.shiftId);
				furl2='https://phpcis.chshb.gov.tw/api/v1/registrations/list?clinicId=4&shiftId='+shiftId;
				fetch(furl2, {
				  'headers': {
					'content-type': 'application/json'
				  },
				  'body': null,
				  'method': 'GET',
				}).then(response => response.text())
				  .then((response) => {
					res2=JSON.parse(response);
					console.log(res2.result.length);
					find=0;
					for (i=0;i<res2.result.length;i++){
						if (res2.result[i].registrationId>registrationId && res2.result[i].visitTypeCode==visitTypeCode){
							find=1;
							NregistrationId=res2.result[i].registrationId;
							break;
						}
					}
					if (find==1){
						//location.href='https://phpcis.chshb.gov.tw/consultationMainPage/'+NregistrationId;
						gotourl('consultationMainPage/'+NregistrationId);
					} else {
						alert('shiftId '+shiftId+' 的 '+visitTypeCode+' 身分已到最後一筆');
					}
				}).catch(err => console.log(err));
			}).catch(err => console.log(err));
		} else {
			alert('非看診頁面');
		}
	}
	function button_changetype_handle(){
		cc=document.URL;
		d1='https://phpcis.chshb.gov.tw/registration/create';
		d2='https://phpcis.chshb.gov.tw/consultationMainPage/';
		changeevent=new Event('change', {bubbles: true});
		insite=false;
		alllist=[];
		if (cc==d1){
			alllist=document.getElementsByClassName('form-control ampInput');
			theage=age=new Date().getFullYear()-1911-document.getElementsByClassName('form-control ampInput')[2].value.split('-')[0];
			insite=true;
		} else if (cc.includes(d2)){
			alllist=document.getElementsByClassName('form-control consultationMainPage__value');
			insite=true;
		}
		if (insite){
			find=false;
			for (i=0;i<alllist.length;i++){
				if (alllist[i].id=='visitTypeId'){
					targetelement=alllist[i];
					find=true;
				} else if (alllist[i].name=='prevention'){
					targetelement2=alllist[i];
				} else if (alllist[i].name=='preventionId'){
					targetelement3=alllist[i];
				}
			}
			if (find){
				thecode=prompt('請輸入身分別代碼(區分大小寫)\n成健一階:1j或1J\n成健2階:2j或2J\n成健可能須執行2次');
				thecode=thecode.toString();
				if (thecode=='1j' || thecode=='1J'){
					if (cc==d1){
						for (i=0;i<targetelement.options.length;i++){
							if (targetelement.options[i].text.includes('69')){
								targetelement.options[i].selected=true;
								targetelement.dispatchEvent(changeevent);
								break;
							}
						}
						targetelement2.value='02';
						targetelement2.dispatchEvent(changeevent);
						if (age>64){
							targetelement3.value='10';
							targetelement3.dispatchEvent(changeevent);
						} else {
							targetelement3.value='8';
							targetelement3.dispatchEvent(changeevent);
						}
					} else {
						alert('請在新增掛號時使用');
					}
				} else if (thecode=='2j' || thecode=='2J'){
					if (cc==d1){
						for (i=0;i<targetelement.options.length;i++){
							if (targetelement.options[i].text.includes('69')){
								targetelement.options[i].selected=true;
								targetelement.dispatchEvent(changeevent);
								break;
							}
						}
						targetelement2.value='02';
						targetelement2.dispatchEvent(changeevent);
						if (age>64){
							targetelement3.value='11';
							targetelement3.dispatchEvent(changeevent);
						} else {
							targetelement3.value='9';
							targetelement3.dispatchEvent(changeevent);
						}
					} else {
						alert('請在新增掛號時使用');
					}
				} else {
					for (i=0;i<targetelement.options.length;i++){
						if (targetelement.options[i].text.includes(thecode)){
							targetelement.options[i].selected=true;
							targetelement.dispatchEvent(changeevent);
							break
						}
					}
				}
			} else {
				alert('不適用');
			}
		} else {
			alert('需在掛號頁面或看診頁面');
		}
	}
	function button_toHE_handle(){
		ccc=document.URL;
		if (ccc.includes('https://phpcis.chshb.gov.tw/consultationMainPage/')){
			sid=document.querySelector('#root > div.wrapper > main > div > form > div:nth-child(1) > div:nth-child(2) > div').textContent;
			xmlHttp=new XMLHttpRequest();
			URL='https://phpcis.chshb.gov.tw/api/v1/registrations/list?clinicId=4&personalId='+sid;
			xmlHttp.open( 'GET', URL, false ); 
			xmlHttp.send();
			uuu=JSON.parse(xmlHttp.responseText);
			UURL='';
			for (i=0;i<uuu.result.length;i++){
				if (uuu.result[i].personalId==sid && uuu.result[i].visitType=='預防保健'){
					UURL='https://phpcis.chshb.gov.tw/consultationMainPage/'+uuu.result[i].registrationId;
					break;
				}
			}
			if (UURL!=''){
				//window.open(UURL);
				gotourl(UURL);
			} else {
				alert('無成健掛號資料');
			}
		} else {
			alert('請在看診畫面中使用');
		}
	}
	async function button_toOR_handle(){
		ccc=document.URL;
		if (ccc.includes('https://phpcis.chshb.gov.tw/consultationMainPage/')){
			sid=document.querySelector('#root > div.wrapper > main > div > form > div:nth-child(1) > div:nth-child(2) > div').textContent;
			xmlHttp=new XMLHttpRequest();
			URL='https://phpcis.chshb.gov.tw/api/v1/registrations/list?clinicId=4&personalId='+sid;
			xmlHttp.open( 'GET', URL, false ); 
			xmlHttp.send();
			uuu=JSON.parse(xmlHttp.responseText);
			UURL='';
			for (i=0;i<uuu.result.length;i++){
				if (uuu.result[i].personalId==sid && uuu.result[i].visitTypeCode=='6G'){
					UURL='https://phpcis.chshb.gov.tw/consultationMainPage/'+uuu.result[i].registrationId;
					break;
				}
			}
			if (UURL!=''){
				//window.open(UURL);
				gotourl(UURL);
			} else {
				alert('無口篩掛號資料');
			}
		} else {
			alert('請在看診畫面中使用');
		}
		
	}
	function button_toREG_handle(){
		c=document.URL;
		na=c.split('/');
		n=na[na.length-1];
		d1='https://phpcis.chshb.gov.tw/registration/';
		d2='https://phpcis.chshb.gov.tw/populanceConsultation/';
		d3='https://phpcis.chshb.gov.tw/consultationMainPage/';
		d4='https://phpcis.chshb.gov.tw/registration';
		if (c.includes(d1)){
			//window.location.href= '/consultationMainPage/'+ n;
			gotourl('/consultationMainPage/'+ n);
		} else if (c.includes(d2) || c.includes(d3)){
			//window.location.href= '/registration/'+ n;
			gotourl('/registration/'+ n);
		} else if (c==d4){
			tb=document.getElementsByClassName('table table-striped table-bordered table-sm commonTable ampTableFontSize')[0];
			find=false;
			for (i=1;i<tb.rows.length;i++){
				if (tb.rows[i].cells[0].children[0].checked){
					aaa=tb.rows[i].cells[2].children[0].href.split('/');
					regid=aaa[aaa.length-1];
					find=true;
					break;
				}
			}
			if (find){
				//window.location.href=d3+regid;
				gotourl(d3+regid);
			} else {
				alert('未選擇個案');
			}
		} else {
			alert('no');
		}
	}
	function button_showdrug_handle(){
		tb=document.getElementsByClassName('table table-striped table-bordered table-condensed consultationMainPageTable commonTable')[0];
		tbl=tb.rows.length;
		thecode='';
		if (tbl>1){
			for (i=1;i<tbl;i++){
				if (tb.rows[i].cells[0].children[0].checked){
					thecode=tb.rows[i].cells[24].textContent;
					break;
				}
			}
		} 
		thecode=prompt("藥品代碼",thecode);
		if (thecode!=''){
			newurl='https://script.google.com/macros/s/AKfycbzVKuBa099524WRQWkMEiwJjJnr0-dGzI6TmRI2yyI4CtXcLraDXHdlVpxSDG6G37X5/exec?code='+thecode;
			window.open(newurl);
		} else {
			alert('無藥品代碼');
		}
	}
	function button_showdata_handle(){
		ccc=document.URL;
		if (ccc.includes(d0)){
			sitelist={
				'社頭':'X001',
				'秀水':'X002',
				'溪湖':'X003',
				'鹿港':'X004',
				'永靖':'X007',
				'埔心':'X008',
				'福興':'X009',
				'埔鹽':'X010',
				'二水':'X011',
				'田中':'X012',
				'北斗':'X013',
				'員林':'X014',
				'和美':'X015',
				'線西':'X016',
				'花壇':'X017',
				'芬園':'X018',
				'伸港':'X019',
				'大村':'X020',
				'二林':'X021',
				'田尾':'X022',
				'埤頭':'X023',
				'芳苑':'X024',
				'大城':'X025',
				'竹塘':'X026',
				'溪州':'X027',
				'東區':'X028',
				'南西北':'X029'
			};
			clinictitle=document.querySelector("#root > header > a").title;
			sid=document.querySelector('#root > div.wrapper > main > div > form > div:nth-child(1) > div:nth-child(2) > div').textContent;
			allsite=Object.keys(sitelist);
			sitecode='';
			for (i=0;i<allsite.length;i++){
				if (clinictitle.includes(allsite[i])){
					sitecode=sitelist[allsite[i]];
					break;
				}
			}
			if (sitecode!=''){
				newurl='https://iiirrkimo.github.io/checkdata/checkdata.html?thesite='+sitecode+'&theID='+sid;
				window.open(newurl);
			} else {
				alert('出錯了');
			}
		} else {
			alert('請在看診畫面中使用');
		}
	}
	function button_trydebug_handle(){
		cc=document.URL;
	d1='https://phpcis.chshb.gov.tw/consultationMainPage/';
	if (cc.includes(d1)){
		errmsg='出現以下錯誤';
		CKDICD=['A1811','A5275','C641','C642','C649','C7A093','Z5112','D3000','D3001','D3002','D3A093','D4100','D4101','D4102','D4110','D4111','D4112','D4120','D4121','D4122','E1121','E1122','E1129','E1321','E1322','E1329','E1021','E1022','E1029','E1121','E1122','E1129','E1165','E1021','E1065','E748','M1030','M10311','M10312','M10319','M10321','M10322','M10329','M10331','M10332','M10339','M10341','M10342','M10349','M10351','M10352','M10359','M10361','M10362','M10369','M10371','M10372','M10379','M1038','M1039','N200','M1030','D593','I120','I129','I1311','I132','I701','I7581','I722','I7773','I773','K767','N000','N001','N002','N003','N004','N005','N006','N007','N010','N011','N012','N013','N014','N015','N016','N017','N018','N019','N08','N008','N009','N044','N021','N022','N023','N041','N042','N024','N025','N026','N027','N043','N044','N045','N046','N020','N040','N028','N047','N048','N029','N049','N032','N031','N033','N034','N035','N036','N037','N038','','N030','N039','N059','N052','N062','N072','N053','N054','N055','N063','N064','N065','N073','N074','N075','N059','N171','N172','E1021','E1121','N16','N050','N051','N056','N057','N058','N060','N061','N066','N067','N068','N070','N071','N076','N077','N078','N140','N141','N142','N143','N144','N150','N158','N059','N069','N079','N159','N170','N171','N172','N178','N179','N181','N182','N183','N189','N19','N261','N269','N250','N251','N2581','N2589','N259','N131','N132','N1330','N1339','O10419','O10411','O10412','O10413','O1042','O1043','Q6101','Q613','Q612','Q6111','Q6119','Q614','Q615','Q615','Q6102','Q618','Q6239','Q6211','Q6212','Q6231','Q6232','Q620','Q6210','Q6211','Q622','R944'];
		DMICD=['E08','E09','E10','E11','E12','E13'];
		vaccinelist=['KC00452206','KC00452209','KC00452221','K000301206','K000301209','K000351206','K000351209','K000906206','X000153206','K000702206','X000154206','X000155229','K000440206','X000157206','J000085216','K000364206','K000510206','K000450206','K000480206','K000456206','K000456209','K000501206','K000501209','K000967206','K000981206','X000164206','X000165206'];
		translist=['01036C','01037C'];
		try {
			mainICD=document.getElementsByClassName('table table-striped table-bordered table-sm consultationMainPageTable commonTable')[7].children[1].rows[0].cells[1].textContent.replaceAll('.','');
		} catch (e) {
			mainICD='';
			errmsg=adderrmsg(errmsg,'無診斷碼');
		}
		ttt=document.getElementsByClassName('table table-striped table-bordered table-condensed consultationMainPageTable commonTable')[0];
		for (i=0;i<ttt.children[0].rows[0].cells.length;i++){
			if (ttt.children[0].rows[0].cells[i].textContent=='申報代碼'){
				codecolumn=i;
			}
			if (ttt.children[0].rows[0].cells[i].textContent=='主成分'){
				maincolumn=i;
			}
			if (ttt.children[0].rows[0].cells[i].textContent=='自費組序'){
				selfpaycolumn=i;
			}
			if (ttt.children[0].rows[0].cells[i].textContent=='醫囑名稱'){
				ordernamecolumn=i;
			}
			if (ttt.children[0].rows[0].cells[i].textContent=='轉診院所代碼'){
				transsitecolumn=i;
			}
			if (ttt.children[0].rows[0].cells[i].textContent=='慢箋'){
				ischroniccolumn=i;
			}
		}
		alllist=document.getElementsByClassName('form-control consultationMainPage__value');
		changeevent=new Event('change', {bubbles: true});
		for (i=0;i<alllist.length;i++){
			if (alllist[i].id=='visitTypeId'){
				visitTypeId=alllist[i].value;
			}
			if (alllist[i].id=='caseTypeId'){
				caseTypeId=alllist[i].value;
			}
			if (alllist[i].id=='shareId'){
				shareId=alllist[i].value;
			}
		}
		checklist=document.getElementsByClassName('form-check-input');
		for (i=0;i<checklist.length;i++){
			if (checklist[i].name=='isChronic'){
				isChronic=checklist[i].checked;
			}
		}
		codearray=[];
		P1found=false;
		P2found=false;
		P3found=false;
		P4found=false;
		P5found=false;
		SSfound=false;
		chronicchronic=false;
		for (i=1;i<ttt.rows.length;i++){
			thecode=ttt.rows[i].cells[codecolumn].textContent;
			themain=ttt.rows[i].cells[maincolumn].textContent;
			if (thecode=='P1407C'){
				if (!DMICD.includes(mainICD.substring(0,3))){
					errmsg=adderrmsg(errmsg,'DM收案診斷不符');
				}
				if (visitTypeId!='22'){
					errmsg=adderrmsg(errmsg,'DM收案身分別應為6a');
				}
			}
			if (thecode=='P1408C' || thecode=='P1410C'){
				if (visitTypeId!='23'){
					errmsg=adderrmsg(errmsg,'DM追蹤身分別應為6b');
				}
			} 
			if (thecode=='P1409C' || thecode=='P1411C'){
				if (visitTypeId!='24'){
					errmsg=adderrmsg(errmsg,'DM年度身分別應為6c');
				}
			} 
			if (thecode=='P4301C'){
				if (!CKDICD.includes(mainICD)){
					errmsg=adderrmsg(errmsg,'CKD收案診斷不符');
				}
				if (visitTypeId!='26'){
					errmsg=adderrmsg(errmsg,'CKD收案身分別應為6s');
				}
			}
			if (thecode=='P4302C'){
				if (visitTypeId!='27'){
					errmsg=adderrmsg(errmsg,'CKD追蹤身分別應為6t');
				}
			}
			if (thecode=='P7001C'){
				if (visitTypeId!='23'){
					errmsg=adderrmsg(errmsg,'DKD追蹤身分別應為6b');
				}
			}
			if (thecode=='P7002C'){
				if (visitTypeId!='24'){
					errmsg=adderrmsg(errmsg,'DKD年度身分別應為6c');
				}
			}
			if (thecode=='E4003C' || thecode=='E4004C'){
				if (visitTypeId!='69'){
					errmsg=adderrmsg(errmsg,'TT/IGRA身分別應為6T結核病接觸者');
				}
				if (caseTypeId!='37'){
					errmsg=adderrmsg(errmsg,'TT/IGRA案件別應為C4行政協助無健保結核病患就醫案件');
				}
			}
			if (themain.toUpperCase().includes('ISONIAZID') || themain.toUpperCase().includes('RIFAPENTINE')){
				if (visitTypeId!='4'){
					errmsg=adderrmsg(errmsg,'LTBI身分別應為65');
				}
				if (caseTypeId!='21'){
					errmsg=adderrmsg(errmsg,'LTBI案件別應為06結核病');
				}
			}
			if (visitTypeId=='28'){
				if (!(thecode=='申報代碼' || thecode=='A2051C' || vaccinelist.includes(thecode)||translist.includes(thecode))){
					errmsg=adderrmsg(errmsg,'6x兒童預注身分別不可開立接種、疫苗及轉診以外處方');
				}
				if (vaccinelist.includes(thecode)){
					if (ttt.rows[i].cells[selfpaycolumn].children[0].children[0].value==''){
						errmsg=adderrmsg(errmsg,ttt.rows[i].cells[ordernamecolumn].textContent+'須有自費組序');
					}
				}
				if (shareId!='9'){
					errmsg=adderrmsg(errmsg,'6x兒童預注身分別部分負擔為009');
				}
			}
			if (translist.includes(thecode)){
				if (ttt.rows[i].cells[transsitecolumn].children[0].children[0].value==''){
					errmsg=adderrmsg(errmsg,'轉診需填寫轉診院所代號');
				}
			}
			if (visitTypeId=='31' || visitTypeId=='1' || visitTypeId=='2' ||visitTypeId=='3'){
				if (caseTypeId!='19' && caseTypeId!='23' ){
					errmsg=adderrmsg(errmsg,'健保身分建議案件類別為04或09');
				}
			}
			if (thecode=='E1022C' ||thecode=='E1027C'){
				if (caseTypeId!='18'){
					errmsg=adderrmsg(errmsg,'戒菸處置身分別為6S');
				}
			}
			if (visitTypeId=='22'){
				if (thecode=='P1407C'){
					P1found=true;
				}
			}
			
			if (visitTypeId=='23'){
				if (thecode=='P1408C'||thecode=='P1410C'||thecode=='P7001C'){
					P2found=true;
				}
			}
			
			if (visitTypeId=='24'){
				if (thecode=='P1409C'||thecode=='P1411C'||thecode=='P7002C'){
					P3found=true;
				}
			}
			if (visitTypeId=='26'){
				if (thecode=='P4301C'){
					P4found=true;
				}
			}
			if (visitTypeId=='27'){
				if (thecode=='P4302C'){
					P5found=true;
				}
			}
			if (visitTypeId=='18'){
				if (thecode=='E1027C'){
					SSfound=true;
				}
			}
			theischronic=ttt.rows[i].cells[ischroniccolumn].children[0].checked;
			if (theischronic){
				chronicchronic=true;
			}
			if (!isChronic && theischronic){
				errmsg=adderrmsg(errmsg,'開立慢籤藥物請使用F12建立慢籤資訊');
			}
			codearray.push(thecode);
		}
		if (isChronic){
			if (!chronicchronic){
				errmsg=adderrmsg(errmsg,'F12建立慢籤但無勾選慢籤藥物');
			}
		} 
		if (!P1found && visitTypeId=='22'){
			errmsg=adderrmsg(errmsg,'6a身分別需開立P1407C');
		}
		if (!P2found && visitTypeId=='23'){
			errmsg=adderrmsg(errmsg,'6b身分別需開立P1408C或P14010C或P70010C');
		}
		if (!P3found && visitTypeId=='24'){
			errmsg=adderrmsg(errmsg,'6c身分別需開立P1409C或P14011C或P7002C');
		}
		if (!P4found && visitTypeId=='26'){
			errmsg=adderrmsg(errmsg,'6s身分別需開立P4301C');
		}
		if (!P5found && visitTypeId=='27'){
			errmsg=adderrmsg(errmsg,'6t身分別需開立P4302C');
		}
		if (!SSfound && visitTypeId=='18'){
			errmsg=adderrmsg(errmsg,'戒菸身分別需開立E1027C');
		}
		thedupli=0;
		for (i=0;i<ttt.rows.length;i++){
			thecode=ttt.rows[i].cells[codecolumn].textContent;
			thecodecount=countOccurrences(codearray,thecode);
			if (thecodecount>1){
				ttt.rows[i].style.backgroundColor='#FF5151';
				thedupli+=1;
			}
		}
		if (thedupli>0){
			errmsg=errmsg+'\n重複開立處方，請檢查下方紅色欄位';
		}
		if (errmsg!='出現以下錯誤'){
			errmsg=errmsg+"\n是否仍存檔?";
			result = confirm(errmsg);
			if (result) {
				document.getElementsByClassName('consultationMainPage__btn btn btn-primary')[0].click();
			}
		} else {
			document.getElementsByClassName('consultationMainPage__btn btn btn-primary')[0].click();
		}
	} else {
		alert('請在看診頁面使用');
	}

	function countOccurrences(arr, value) {
		var count = 0;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] === value) {
				count++;
			}
		}
		return count;
	}
	function adderrmsg(errmsg,errmsgn){
		if (!errmsg.includes(errmsgn)){
			errmsg=errmsg+'\n'+errmsgn;
		}
		return errmsg
	}
	}
	function button_autocomplete_handle(){
		c=document.URL;
		d1='https://phpcis.chshb.gov.tw/populanceRegistration';
		d2='https://phpcis.chshb.gov.tw/registration';
		if (c==d1 || c==d2){
			date0=document.getElementsByClassName('form-control ampInput')[0].value;
			date1=date0.split(' ')[1];
			period1=document.getElementsByClassName('form-control ampInput')[1].selectedOptions[0].value;
			room0=document.getElementsByClassName('form-control ampInput')[2].selectedOptions[0].innerText.split(' ')[0];
			xmlHttp=new XMLHttpRequest();
			URL='https://phpcis.chshb.gov.tw/api/v1/clinics/settings/find';
			xmlHttp.open('GET', URL, false ); 
			xmlHttp.send();
			res=xmlHttp.responseText;
			jres=JSON.parse(res);
			if (jres.code==200){
				ok=jres.result;
				upj={};
				upj.FOBTHospitalId=ok.CCSHospitalId;
				upj.FOBTLocation='';
				upj.adultTestType='Y';
				upj.clinicId=ok.clinicId;
				upj.healthExamHospitalId=ok.healthExamHospitalId;
				upj.isChargeReceipt=false;
				upj.isIncludeAdultLevelOne=true;
				upj.isIncludeAdultLevelTwo=true;
				upj.isIncludeChild=true;
				upj.isIncludeChildGuardian=true;
				upj.isIncludeChildScreening=true;
				upj.isIncludeCovid19=true;
				upj.isIncludeFOBT=true;
				upj.isIncludeFreeInfluenza=true;
				upj.isIncludeFreePneumonia=true;
				upj.isIncludeInfluenza=true;
				upj.isIncludeOral=true;
				upj.isIncludePneumonia=true;
				upj.isIncludePneumonia13PCV=true;
				upj.isIncludeUterus=true;
				upj.isReplace=false;
				upj.markFromIntegratedScreening=false;
				upj.oralDivision='3';
				upj.oralLocation='2';
				upj.period=period1;
				URL2='https://phpcis.chshb.gov.tw/api/v1/rooms/list?clinicId='+upj.clinicId;
				xmlHttp.open('GET', URL2, false );
				xmlHttp.send();
				res2=xmlHttp.responseText;
				jres2=JSON.parse(res2);
				for (i=0;i<jres2.result.length;i++){
					if (jres2.result[i].name.includes(room0)){
						room1=jres2.result[i].roomId;
						break;
					}
				}
				upj.roomId=room1;
				upj.treatmentDate=date1;
				upjs=JSON.stringify(upj);
				URL3='https://phpcis.chshb.gov.tw/api/v1/preventions/batch_complete/create';
				xmlHttp.open( 'POST', URL3, false );
				xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
				xmlHttp.send(upjs);
				res3=xmlHttp.responseText;
				jres3=JSON.parse(res3);
				if (jres3.code==200){
					alllist=document.getElementsByClassName('sidebar__nav')[0];
					for (i=0;i<alllist.childElementCount;i++){
						if (alllist.children[i].innerText=='掛號'){
							regc=i;
						} else if (alllist.children[i].innerText=='門診看診作業'){
							opdc=i;
							break;
						}
					}
					alert('批次完成');
					changeevent=new Event('change', {bubbles: true});
					document.getElementsByClassName('form-control ampInput')[2].dispatchEvent(changeevent);
				} else {
					alert(jres3.message);
				}
			}
		} else {
			alert('請在掛號資訊列表或候診患者查詢使用');
		}
	}
	function button_reflash_handle(){
		ccc=document.URL;
		d1='https://phpcis.chshb.gov.tw/registration';
		d2='https://phpcis.chshb.gov.tw/populanceRegistration';
		if (ccc.includes('https://phpcis.chshb.gov.tw')){
			if (ccc==d1 || ccc==d2){
				changeevent=new Event('change', {bubbles: true});
				document.getElementsByClassName('form-control ampInput')[2].dispatchEvent(changeevent);
			}
		} else {
			alert('請在PHPCIIS網域中使用')
		}
	}
	function button_autocompletev2_handle(){
		ccc=document.URL;
		if (ccc=='https://phpcis.chshb.gov.tw/populanceRegistration'){
			url_visittype='https://phpcis.chshb.gov.tw/api/v1/visit_types/list_visibility';
			xmlHttp = new XMLHttpRequest();
			xmlHttp.open('GET', url_visittype, false );
			xmlHttp.send();
			res_visittype=xmlHttp.responseText;
			json_visittype=JSON.parse(res_visittype);
			visittypelist={};
			url_freq_orders='https://phpcis.chshb.gov.tw/api/v1/freq_orders/list';
			xmlHttp = new XMLHttpRequest();
			xmlHttp.open('GET', url_freq_orders, false );
			xmlHttp.send();
			res_freq_orders=xmlHttp.responseText;
			json_freq_orders=JSON.parse(res_freq_orders);
			if (document.getElementById('myDraggable_2')){
				document.getElementById('myDraggable_2').remove();
				createmyDraggable_2();
			} else {
				createmyDraggable_2();
			}
		} else {
			alert('需在候診患者查詢使用');
		}


		function createmyDraggable_2(){
			var myDraggable_2 = document.createElement('div');
			myDraggable_2.id='myDraggable_2';
			myDraggable_2.style.width = '450px';
			myDraggable_2.style.background = '#f9f9f9';
			myDraggable_2.style.border = '1px solid #ccc';
			myDraggable_2.style.position = 'absolute';
			myDraggable_2.style.cursor = 'move';
			myDraggable_2.style.zIndex = '9999';
			myDraggable_2.style.left=Math.ceil(window.innerWidth/2-225) +'px';
			myDraggable_2.style.top = 300 +'px';
			document.body.insertBefore(myDraggable_2,document.body.firstChild);
			myDraggable_2.addEventListener('mousedown', function(e) {
				mouseX = e.clientX;
				mouseY = e.clientY;
				document.addEventListener('mousemove', onMouseMove);
				document.addEventListener('mouseup', onMouseUp);
			});
			var line1 = document.createElement('div');
			line1.textContent='身分代號';
			myDraggable_2.appendChild(line1);
			var visittypecombo = document.createElement('select');
			visittypecombo.id='visittypecombo';
			visittypecombo.style.width = '250px';
			for (i=0;i<json_visittype.result.length;i++){
				newOption = document.createElement('option');
				visitTypeCode=json_visittype.result[i].visitTypeCode;
				visitTypeName=json_visittype.result[i].visitTypeName;
				newOption.text =visitTypeCode+' '+visitTypeName;
				newOption.value=visitTypeName;
				visittypecombo.appendChild(newOption);
			}
			line1.appendChild(visittypecombo);
			var confirmbutton = document.createElement('button');
			confirmbutton.id='confirmbutton';
			confirmbutton.textContent='確定執行';
			confirmbutton.style.height = '50px';
			confirmbutton.style.left = '315px';
			confirmbutton.style.position = 'absolute';
			confirmbutton.addEventListener('click', confirmbutton_handle);
			line1.appendChild(confirmbutton);
			var exitbutton = document.createElement('button');
			exitbutton.id='exitbutton';
			exitbutton.textContent='關閉';
			exitbutton.style.height = '50px';
			exitbutton.style.left = '398px';
			exitbutton.style.position = 'absolute';
			exitbutton.addEventListener('click', exitbutton_handle);
			line1.appendChild(exitbutton);
			
			var line2 = document.createElement('div');
			line2.textContent='標準處方';
			myDraggable_2.appendChild(line2);
			var ordercombo = document.createElement('select');
			ordercombo.id='ordercombo';
			ordercombo.style.width = '250px';
			for (i2=0;i2<json_freq_orders.result.length;i2++){
				newOption = document.createElement('option');
				freqOrderCode=json_freq_orders.result[i2].freqOrderCode;
				freqOrderName=json_freq_orders.result[i2].freqOrderName;
				freqOrderId=json_freq_orders.result[i2].freqOrderId;
				newOption.text =freqOrderCode+' : '+freqOrderName;
				newOption.value=freqOrderId;
				ordercombo.appendChild(newOption);
			}
			line2.appendChild(ordercombo);
			ordercombo.addEventListener('change', ordercombo_change);
			var line3 = document.createElement('div');
			line3.id='line3';
			line3.textContent='主診斷:';
			myDraggable_2.appendChild(line3);
			var line4 = document.createElement('div');
			line4.id='line4';
			line4.textContent='處方:';
			myDraggable_2.appendChild(line4);
			ordercombo_change();
			
			
			function confirmbutton_handle(){
				tb=document.getElementsByClassName('table table-striped table-bordered table-sm role-list__role-table commonTable')[0];
				array_patient=[];
				if (tb.rows[1].cells.length>2){
					for (i9=1;i9<tb.rows.length;i9++){
						visittype=tb.rows[i9].cells[7].textContent;
						href=tb.rows[i9].cells[4].children[0].href.split('/');
						registrationId=href[href.length-1];
						if (visittype.includes(visittypecombo.value)){
							array_patient.push(registrationId);
						}
					}
				}
				if (array_patient.length>0){
					if (json_orderdetail.result.diseases.length>0){
						if (json_orderdetail.result.FreqOrderPrescription.length>0){
							if (confirm(visittypecombo.value+' 身份別共 '+array_patient.length+' 位，是否執行?')){
								autocomplete();
							}
						} else {
							alert('該標準處方無處置');
						}
					} else {
						alert('該標準處方無診斷');
					}
				} else {
					alert('該身分別無個案')
				}
			}
			function autocomplete(){
				errmsg='';
				for (i3=0;i3<array_patient.length;i3++){
					registrationId=array_patient[i3];
					url_registrationId='https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId='+registrationId;
					xmlHttp = new XMLHttpRequest();
					xmlHttp.open('GET', url_registrationId, false );
					xmlHttp.send();
					res_registrations=xmlHttp.responseText;
					jres_registrations=JSON.parse(res_registrations);
					url_health_records='https://phpcis.chshb.gov.tw/api/v1/health_records/find?registrationId='+registrationId;
					xmlHttp = new XMLHttpRequest();
					xmlHttp.open('GET', url_health_records, false );
					xmlHttp.send();
					res_health_records=xmlHttp.responseText;
					jres_health_records=JSON.parse(res_health_records);
					forinjectdate={};
					forinjectdate['CC']=json_orderdetail.result.CC;
					forinjectdate['PE']=json_orderdetail.result.PE;
					
					
					forinjectdate['abnormalTreatmentSeqNo']=null;
					forinjectdate['benefitTypeCode']=jres_registrations.result.benefitTypeCode;
					forinjectdate['benefitTypeId']=jres_registrations.result.benefitTypeId;
					forinjectdate['bmi']=jres_health_records.result.bmi*1;
					if (jres_registrations.result.caseTypeId==16){
						forinjectdate['caseTypeId']=23;
						forinjectdate['caseTypeCode']='09';
					} else {
						forinjectdate['caseTypeId']=jres_registrations.result.caseTypeId;
						forinjectdate['caseTypeCode']=jres_registrations.result.caseTypeCode;
					}
					forinjectdate['clinicId']=json_freq_orders.result[0].clinicId;
					forinjectdate['codContent']=jres_health_records.result.codContent;
					forinjectdate['courseHealthRecordId']=jres_health_records.result.courseHealthRecordId;
					forinjectdate['dbp']=jres_health_records.result.dbp*1;
					forinjectdate['diseases']=[];
					for (i4=0;i4<json_orderdetail.result.diseases.length;i4++){
						tempdisease={};
						tempdisease['ICD10Code']=json_orderdetail.result.diseases[i4].ICD10Code;
						tempdisease['diseaseId']=json_orderdetail.result.diseases[i4].diseaseId;
						tempdisease['isChronic']=json_orderdetail.result.diseases[i4].isChronic;
						if (i4==0){
							tempdisease['isMaster']=true;
						} else {
							tempdisease['isMaster']=false;
						}
						forinjectdate['diseases'].push(tempdisease);
					}
					forinjectdate['dispensingType']=null;
					forinjectdate['glucoseAC']=jres_health_records.result.glucoseAC*1;
					forinjectdate['glucosePC']=jres_health_records.result.glucosePC*1;
					forinjectdate['healthRecordId']=jres_health_records.result.healthRecordId;
					forinjectdate['height']=jres_health_records.result.height*1;
					forinjectdate['homeCareType']=jres_health_records.result.homeCareType;
					forinjectdate['isAutoCorrect']=jres_health_records.result.isAutoCorrect;
					forinjectdate['isChronicPrescription']=jres_health_records.result.isChronicPrescription;
					forinjectdate['isEmergencyVisit']=jres_health_records.result.isEmergencyVisit;
					forinjectdate['isIncludeFamilyCare']=jres_health_records.result.isIncludeFamilyCare;
					forinjectdate['isICCardWritten']=jres_registrations.result.isICCard;
					forinjectdate['personalInfoId']=jres_health_records.result.personalInfoId;
					forinjectdate['physicalExamHistoryId']=jres_health_records.result.physicalExamHistoryId;
					forinjectdate['prescriptionDeadline']=jres_health_records.result.prescriptionDeadline;
					forinjectdate['prescriptionNo']=jres_health_records.result.prescriptionNo;
					forinjectdate['prescriptionReuseTimes']=jres_health_records.result.prescriptionReuseTimes;
					forinjectdate['prescriptionType']=jres_health_records.result.prescriptionType;
					forinjectdate['prescriptions']=[];
					for (i5=0;i5<json_orderdetail.result.FreqOrderPrescription.length;i5++){
						tempprescription={};
						tempprescription['bureauTestCode']=json_orderdetail.result.FreqOrderPrescription[i5].bureauTestCode;
						tempprescription['day']=json_orderdetail.result.FreqOrderPrescription[i5].day;
						tempprescription['description']='';
						tempprescription['drugCode']=json_orderdetail.result.FreqOrderPrescription[i5].prescriptionCode;
						tempprescription['drugName']=json_orderdetail.result.FreqOrderPrescription[i5].prescriptionName;
						tempprescription['drugRouteId']=json_orderdetail.result.FreqOrderPrescription[i5].drugRouteId;
						tempprescription['drugUsageId']=json_orderdetail.result.FreqOrderPrescription[i5].drugUsageId;
						tempprescription['endTime']=null;
						tempprescription['isApplicable']=json_orderdetail.result.FreqOrderPrescription[i5].isApplicable;
						tempprescription['isChronicPrescription']=json_orderdetail.result.FreqOrderPrescription[i5].isChronicPrescription;
						tempprescription['isSchedule']=false;
						tempprescription['isScheduleCorrection']=false;
						tempprescription['modelType']=json_orderdetail.result.FreqOrderPrescription[i5].modelType;
						tempprescription['ownExpenseSeq']=json_orderdetail.result.FreqOrderPrescription[i5].ownExpenseSeq;
						tempprescription['prescriptionId']=json_orderdetail.result.FreqOrderPrescription[i5].prescriptionId;
						tempprescription['prescriptionModel']=json_orderdetail.result.FreqOrderPrescription[i5].prescriptionModel;
						tempprescription['qty']=json_orderdetail.result.FreqOrderPrescription[i5].qty;
						if (json_visittype.result[visittypecombo.selectedIndex].isApplicable){
							tempprescription['selfPayType']=json_orderdetail.result.FreqOrderPrescription[i5].selfPayType;
						} else {
							selfPayType=json_orderdetail.result.FreqOrderPrescription[i5].selfPayType;
							if (selfPayType=='*' || selfPayType=='#'){
								tempprescription['selfPayType']=json_orderdetail.result.FreqOrderPrescription[i5].selfPayType;
							} else { 
								tempprescription['selfPayType']='*';
							}
						}
						
						tempprescription['startTime']='';
						tempprescription['testPackageCode']=json_orderdetail.result.FreqOrderPrescription[i5].testPackageCode;
						tempprescription['testPackageId']=json_orderdetail.result.FreqOrderPrescription[i5].testPackageId;
						tempprescription['testPackageName']=json_orderdetail.result.FreqOrderPrescription[i5].testPackageName;
						if (json_orderdetail.result.FreqOrderPrescription[i5].totalQty<1){
							tempprescription['totalQty']=1;
						} else {
							tempprescription['totalQty']=json_orderdetail.result.FreqOrderPrescription[i5].totalQty;
						}
						forinjectdate['prescriptions'].push(tempprescription);
					}
					forinjectdate['pulse']=jres_health_records.result.pulse*1;
					forinjectdate['registrationDate']=jres_registrations.result.date;
					forinjectdate['registrationId']=jres_registrations.result.registrationId;
					forinjectdate['sbp']=jres_registrations.result.sbp;
					forinjectdate['scheduleTest']=null;
					forinjectdate['scheduleTestId']=null;
					forinjectdate['shareCode']=jres_registrations.result.shareCode;
					forinjectdate['shareId']=jres_registrations.result.shareId;
					forinjectdate['supplyReportType']=jres_health_records.result.supplyReportType;
					forinjectdate['transferClinicCode']=jres_health_records.result.transferClinicCode;
					forinjectdate['treatmentEndDate']=jres_registrations.result.date;
					forinjectdate['treatmentTypeId']=jres_registrations.result.treatmentTypeId;
					forinjectdate['visitTypeCode']=jres_registrations.result.visitTypeCode;
					forinjectdate['visitTypeId']=jres_registrations.result.visitTypeId;
					forinjectdate['waist']=null;
					forinjectdate['weight']=jres_health_records.result.weight*1;
					forinjectdate['writeICCard']=jres_registrations.result.isCardCheck;
					forinjectdates=JSON.stringify(forinjectdate);
					url_check_valid='https://phpcis.chshb.gov.tw/api/v1/health_records/check_valid';
					xmlHttp = new XMLHttpRequest();
					xmlHttp.open('POST', url_check_valid, false );
					xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
					xmlHttp.send(forinjectdates);
					res_check_valid=xmlHttp.responseText;
					jres_check_valid=JSON.parse(res_check_valid);
					if (jres_check_valid.code==200){
						url_update='https://phpcis.chshb.gov.tw/api/v1/health_records/update';
						xmlHttp = new XMLHttpRequest();
						xmlHttp.open('POST', url_update, false );
						xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlHttp.send(forinjectdates);
						res_update=xmlHttp.responseText;
						jres_update=JSON.parse(res_update);
						if (jres_update.code!=200){
							errmsg=errmsg+'update錯誤，ID:'+registrationId+':'+jres3.message+'\n';
						}
					} else {
						errmsg=errmsg+'valid錯誤，ID:'+registrationId+':'+jres_check_valid.message+'\n';
					}
				}
				if (errmsg==''){
						alert('完成'+array_patient.length+'筆');
						changeevent=new Event('change', {bubbles: true});
						document.getElementsByClassName('form-control ampInput')[2].dispatchEvent(changeevent);
					} else {
						alert(errmsg);
					}
			}
			function exitbutton_handle(){
				document.getElementById('myDraggable_2').remove();
			}
			function ordercombo_change(){
				url_orderdetail='https://phpcis.chshb.gov.tw/api/v1/freq_orders/find?clinicId=4&freqOrderId='+ordercombo.value;
				xmlHttp = new XMLHttpRequest();
				xmlHttp.open('GET', url_orderdetail, false );
				xmlHttp.send();
				res_orderdetail=xmlHttp.responseText;
				json_orderdetail=JSON.parse(res_orderdetail);
				if (json_orderdetail.result.diseases.length>0){
					diagnosis=json_orderdetail.result.diseases[0].ICD10Code +' : '+json_orderdetail.result.diseases[0].ICD10Name;
				} else {
					diagnosis='無';
				}
				orderall='';
				if (json_orderdetail.result.FreqOrderPrescription.length>0){
					for (i6=0;i6<json_orderdetail.result.FreqOrderPrescription.length;i6++){
						neworder=json_orderdetail.result.FreqOrderPrescription[i6].applicationId+'_'+json_orderdetail.result.FreqOrderPrescription[i6].prescriptionName;
						if (orderall==''){
							orderall=orderall+neworder;
						} else {
							orderall=orderall+';'+neworder;
						}
					}
				} else {
					orderall='無';
				}
				line3.textContent='主診斷:'+diagnosis;
				line4.textContent='處方:'+orderall;
			}
			function onMouseMove(e) {
				posX = mouseX - e.clientX;
				posY = mouseY - e.clientY;
				mouseX = e.clientX;
				mouseY = e.clientY;
				myDraggable_2.style.left = (myDraggable_2.offsetLeft - posX) + 'px';
				myDraggable_2.style.top = (myDraggable_2.offsetTop - posY) + 'px';
			}
			function onMouseUp() {
				document.removeEventListener('mousemove', onMouseMove);
				document.removeEventListener('mouseup', onMouseUp);
			}
		}
	}
	function button_fastreg_handle(){
		cc=document.URL;
		d1='https://phpcis.chshb.gov.tw/registration/create';
		d2='https://phpcis.chshb.gov.tw/registration';
		changeevent=new Event('change', {bubbles: true});
		alllist=[];
		if (cc.includes('https://phpcis.chshb.gov.tw')){
			thecode=document.getElementById('input_fasttype').value;
			if (thecode!=''){ 
				if (cc!=d2){
					if (cc==d1){
						alllist=document.getElementsByClassName('form-control ampInput');
						age=new Date().getFullYear()-1911-document.getElementsByClassName('form-control ampInput')[2].value.split('-')[0];
						popup=document.getElementsByClassName('modal-content');
						if (popup.length>0){
							if (popup[1]){
								popup[1].getElementsByClassName('btn btn-secondary')[0].click();
							}
							if (popup[0]){
								popup[0].getElementsByClassName('col-xl-1 col-lg-1')[0].children[0].click();
							}
						}
					} else {
						sidebarlist=document.getElementsByClassName('sidebar__nav')[0].children;
						for (i=0;i<sidebarlist.length;i++){
							if (sidebarlist[i].textContent=='掛號'){
								sidebarlist[i].click();
								break;
							}
						}
					}
					find=false;
					for (i=0;i<alllist.length;i++){
						if (alllist[i].id=='visitTypeId'){
							targetelement=alllist[i];
							find=true;
						} else if (alllist[i].name=='prevention'){
							targetelement2=alllist[i];
						} else if (alllist[i].name=='preventionId'){
							targetelement3=alllist[i];
						}
					}
					if (find){
						thecode=thecode.toString();
						if (thecode=='691'){
							if (cc==d1){
								for (i=0;i<targetelement.options.length;i++){
									if (targetelement.options[i].text.includes('69')){
										targetelement.options[i].selected=true;
										targetelement.dispatchEvent(changeevent);
										break;
									}
								}
								targetelement2.value='02';
								targetelement2.dispatchEvent(changeevent);
								if (age>64){
									targetelement3.value='10';
									targetelement3.dispatchEvent(changeevent);
								} else {
									targetelement3.value='8';
									targetelement3.dispatchEvent(changeevent);
								}
							} else {
								alert('請在新增掛號時使用');
							}
						} else if (thecode=='692'){
							if (cc==d1){
								for (i=0;i<targetelement.options.length;i++){
									if (targetelement.options[i].text.includes('69')){
										targetelement.options[i].selected=true;
										targetelement.dispatchEvent(changeevent);
										break;
									}
								}
								targetelement2.value='02';
								targetelement2.dispatchEvent(changeevent);
								if (age>64){
									targetelement3.value='11';
									targetelement3.dispatchEvent(changeevent);
								} else {
									targetelement3.value='9';
									targetelement3.dispatchEvent(changeevent);
								}
							} else {
								alert('請在新增掛號時使用');
							}
						} else {
							
							for (i=0;i<targetelement.options.length;i++){
								if (targetelement.options[i].text.includes(thecode)){
									targetelement.options[i].selected=true;
									targetelement.dispatchEvent(changeevent);
									break;
								}
							}
						}
						document.getElementsByClassName('ampRegistationBtn btn btn-danger')[0].click();
					} 
				} else {
					document.getElementsByClassName('commonBtn ampCommonBtn btn btn-info')[0].click();
				}
			} else {
				alert('未輸入身分別');
			}
		} else {
			alert('請在PHPCIIS網域中使用');
		}
	}
	function button_showvaccine_handle(){
		ccc=document.URL;
		if (ccc.includes('https://phpcis.chshb.gov.tw')){
			vaccinelist={
				'J000151206' : '高端',
				'J000138206' : '國光',
				'K001036206' : '賽諾菲',
				'K001126206' : '東洋',
				'K000906206' : 'PCV13',
				'K000492206' : 'PPV23'
			};
			Url='https://phpcis.chshb.gov.tw/api/v1/clinics/settings/find';
			xmlHttp = new XMLHttpRequest();
			xmlHttp.open('GET', Url, false );
			xmlHttp.send();
			res=xmlHttp.responseText;
			try {
				jres=JSON.parse(res);
				msg='流感疫苗廠牌';
				msg=msg+'\n\t一般:'+vaccinelist[jres.result.influenzaId];
				msg=msg+'\n\t3-'+jres.result.influenzaAgeN+'歲:'+vaccinelist[jres.result.influenzaCode3toN];
				msg=msg+'\n\t<3歲:'+vaccinelist[jres.result.influenzaCodeUnder3Id];
				msg=msg+'\n\t縣購:'+vaccinelist[jres.result.freeInfluenzaVaccineApplicationId];
				msg=msg+'\n肺炎鏈球菌疫苗廠牌:';
				msg=msg+'\n\t65歲PPV:'+vaccinelist[jres.result.pneumoniaCode];
				msg=msg+'\n\t65歲PCV:'+vaccinelist[jres.result.pneumonia13PCVCode];
				msg=msg+'\n\t縣購:'+vaccinelist[jres.result.freePneumoniaVaccineApplicationId];
				msg=msg+'\n是否需修改?';
				confirmact=confirm(msg);
				if (confirmact){
					window.open('https://phpcis.chshb.gov.tw/healthCenterSetting');
				}
			} catch (error) {
				alert('出錯了，可能未登入');
			}
		} else {
			alert('請在PHPCIIS內使用');
		}
	}
	function button_countvaccine_handle(){
		ccc=document.URL;
		d2='https://phpcis.chshb.gov.tw/registration';
		if (ccc==d2){
			t6z=0;
			t6f=0;
			t6v=0;
			t7w=0;
			t7z=0;
			t7y=0;
			t7z=0;
			t7t=0;
			sb=document.querySelector('table');
			if (sb.textContent.includes('無資料')){
				alert('無掛號');
			} else {
				for (i=0;i<sb.rows[0].cells.length;i++){
					if (sb.rows[0].cells[i].innerText=='身分證號'){
						theidc=i;
					} 
					if (sb.rows[0].cells[i].innerText=='姓名'){
						thenamec=i;
					} 
					if (sb.rows[0].cells[i].innerText=='身分'){
						thetypec=i;
					} 
				}
				for (i=1;i<sb.rows.length;i++){
					if (sb.rows[i].cells[thetypec].textContent.includes('6Z')){
						t6z+=1
					} else if (sb.rows[i].cells[thetypec].textContent.includes('6F')){
						t6f+=1
					} else if (sb.rows[i].cells[thetypec].textContent.includes('6V')){
						t6v+=1
					} else if (sb.rows[i].cells[thetypec].textContent.includes('6Z')){
						t6z+=1
					} else if (sb.rows[i].cells[thetypec].textContent.includes('7T')){
						t7t+=1
					} else if (sb.rows[i].cells[thetypec].textContent.includes('7W')){
						t7w+=1
					} else if (sb.rows[i].cells[thetypec].textContent.includes('7X')){
						t7y+=1
					} else if (sb.rows[i].cells[thetypec].textContent.includes('7Y')){
						t7y+=1
					} else if (sb.rows[i].cells[thetypec].textContent.includes('7Z')){
						t7z+=1
					}  
				}
				fall=t6z+t7w+t7z;
				jjjj='流感共'+fall+'支，含\n\t公費流感:'+t6z+'支\n\t流感學生:'+t7w+'支\n\t縣購流感:'+t7z+'支\n公費PCV13:'+t6f+'支\n公費PPV23:'+t6v+'支\n縣購肺鏈:'+t7y+'支\n新冠疫苗'+t7t+'支';
				alert(jjjj);
				
			}
		} else {
			alert('請在掛號列表中使用')
		}
	}
	function button_listdelete_handle(){
		(function (){
			ccc=document.URL;
			if (ccc=='https://phpcis.chshb.gov.tw/populanceRegistration'){
				xmlHttp = new XMLHttpRequest();
				if (document.getElementById('uncontrolled-tab-example-tab-consulted').getAttribute('aria-selected')=='true'){
					registrationId=getselectedpatient(1);
					if (registrationId){
						jres=getregdata(registrationId);
						ans=confirm('姓名:'+jres.result.name+'\n身分證:'+jres.result.personalId+'\n身分代碼:'+jres.result.visitTypeCode+'\n是否刪除看診紀錄?');
						if (ans){
							delopd(jres);
							reflash();
						}
					} else {
						alert('無選擇個案')
					}
				} else {
					registrationId=getselectedpatient(0);
					if (registrationId){
						jres=getregdata(registrationId);
						ans=confirm('姓名:'+jres.result.name+'\n身分證:'+jres.result.personalId+'\n身分代碼:'+jres.result.visitTypeCode+'\n是否刪除掛號紀錄?');
						if (ans){
							delreg(registrationId);
							reflash();
						}
					} else {
						alert('無選擇個案')
					}
				}
			} else {
				alert('需到候診患者查詢頁面');
			}
		})();




		function getselectedpatient(ord){
			tb=document.getElementsByClassName('table table-striped table-bordered table-sm role-list__role-table commonTable')[ord];
			array_patient=[];
			if (tb.rows[1].cells.length>2){
				for (let i=1;i<tb.rows.length;i++){
					if (tb.rows[i].cells[0].children[0].checked){
						href=tb.rows[i].cells[4].children[0].href.split('/');
						p_name=tb.rows[i].cells[4].textContent;
						p_visittype=tb.rows[i].cells[7].textContent
						registrationId=href[href.length-1];
						array_patient.push(registrationId);
					}
				}
			}
			if (array_patient.length!=1){
				return false;
			} else {
				return array_patient[0]
			}
		}

		function getregdata(registrationId){
			period=document.getElementById('period').value;
			shiftId=document.getElementById('shiftId').value;
			url="https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId="+registrationId;
			xmlHttp.open('GET', url, false );
			xmlHttp.send();
			res=xmlHttp.responseText;
			jres=JSON.parse(res);
			return jres
		}
		function delreg(registrationId){
			payload={};
			payload['registrationId']=registrationId*1;
			payloads=JSON.stringify(payload);
			delurl="https://phpcis.chshb.gov.tw/api/v1/registrations/delete";
			xmlHttp.open('POST', delurl, false );
			xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xmlHttp.send(payloads);
			delres=xmlHttp.responseText;
			jdelres=JSON.parse(delres);
			if (jdelres.code==200){
				alert('刪除成功');
			} else {
				alert(jdelres.message)
			}
		}
		function delopd(jres){
			payload={};
			payload['date']=jres.result.date;
			payload['healthRecordId']=jres.result.healthRecordId;
			payload['period']=jres.result.period;
			payload['shiftId']=jres.result.shiftId;
			payloads=JSON.stringify(payload);
			delurl="https://phpcis.chshb.gov.tw/api/v1/health_records/delete";
			xmlHttp.open('POST', delurl, false );
			xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xmlHttp.send(payloads);
			delres=xmlHttp.responseText;
			jdelres=JSON.parse(delres);
			if (jdelres.code==200){
				alert('刪除成功');
			} else {
				alert(jdelres.message)
			}
		}

		function reflash(){
			changeevent=new Event('change', {bubbles: true});
			document.getElementById('shiftId').dispatchEvent(changeevent);
		}

	}
	
	async function button_changenumber_handle(){
		uuu=document.URL;
		mode='';
		if (uuu=='https://phpcis.chshb.gov.tw/populanceRegistration'){
			shiftId=document.getElementById('shiftId').value;
			mode='OPD';
		} else if (uuu=='https://phpcis.chshb.gov.tw/registration'){
			shiftId=document.getElementsByName('period')[1].value;
			mode='REG';
		} else {
			alert('非掛號資訊列表或候診患者查詢')
		}
		if (mode!=''){
			await fetch('https://phpcis.chshb.gov.tw/api/v1/registrations/list?clinicId=4&shiftId=' + shiftId, {
			  'headers': {
				'content-type': 'application/json',
			  },
			  'body': null,
			  'method': 'GET',
			}).then(response => response.text())
			  .then((response) => {
				if (mode=='OPD'){
					ttt=document.getElementsByClassName('table table-striped table-bordered table-sm role-list__role-table commonTable');
				} else if (mode=='REG'){
					ttt=document.getElementsByClassName('table table-striped table-bordered table-sm commonTable ampTableFontSize');
				}
				ccc=JSON.parse(response);
				alllist={};
				if (ttt[0].rows[0].cells[2].textContent=='病歷號(新)'){
					for (i=0;i<ccc.result.length;i++){
						alllist[ccc.result[i].personalId]=ccc.result[i].recordNo;
					}
					ttt[0].rows[0].cells[2].innerHTML='病歷號(舊)<span class=\'order-4\'></span>';
					if (ttt[0].rows[1].textContent!='無資料'){
						for (i=1;i<ttt[0].rows.length;i++){
							ttt[0].rows[i].cells[2].textContent=alllist[ttt[0].rows[i].cells[3].textContent];
						}
					}
					if (mode=='OPD'){
						ttt[1].rows[0].cells[2].innerHTML='病歷號(舊)<span class=\'order-4\'></span>';
						if (ttt[1].rows[1].textContent!='無資料'){
							for (i=1;i<ttt[1].rows.length;i++){
								ttt[1].rows[i].cells[2].textContent=alllist[ttt[1].rows[i].cells[3].textContent];
							}
						}
					}
				} else {
					for (i=0;i<ccc.result.length;i++){
						alllist[ccc.result[i].personalId]=ccc.result[i].bureauRecordNo;
					}
					ttt[0].rows[0].cells[2].innerHTML='病歷號(新)<span class=\'order-4\'></span>';
					if (ttt[0].rows[1].textContent!='無資料'){
						for (i=1;i<ttt[0].rows.length;i++){
							ttt[0].rows[i].cells[2].textContent=alllist[ttt[0].rows[i].cells[3].textContent];
						}
					}
					if (mode=='OPD'){
						ttt[1].rows[0].cells[2].textContent='病歷號(新)';
						if (ttt[1].rows[1].textContent!='無資料'){
							for (i=1;i<ttt[1].rows.length;i++){
								ttt[1].rows[i].cells[2].textContent=alllist[ttt[1].rows[i].cells[3].textContent];
							}
						}
					}
				}
			})
		}
	}
	function button_detail_handle(){
		ccc=document.URL;
		d1='https://phpcis.chshb.gov.tw/registration';
		d2='https://phpcis.chshb.gov.tw/registration/create';
		d3='https://phpcis.chshb.gov.tw/registration/';
		if (ccc==d1){
			tb=document.getElementsByClassName('table table-striped table-bordered table-sm commonTable ampTableFontSize')[0];
			if (tb.textContent.includes('無資料')){
				alert('無個案');
			} else {
				theindex=false;
				for (i=1;i<tb.rows.length;i++){
					if (tb.rows[i].cells[0].children[0].checked){
						theindex=i;
						break;
					}
				}
				if (theindex){
					bureauRecordNo=tb.rows[theindex].cells[2].textContent;
					xmlHttp = new XMLHttpRequest();
					Url='https://phpcis.chshb.gov.tw/api/v1/personal_infos/list?bureauRecordNo='+bureauRecordNo;
					xmlHttp.open( 'GET', Url, false );
					xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
					xmlHttp.send();
					uuu = xmlHttp.responseText;
					uuujson=JSON.parse(uuu);
					personalInfoId=uuujson.result[0].personalInfoId;
					window.open('https://phpcis.chshb.gov.tw/case/'+personalInfoId, '_blank');
				} else {
					alert('無選擇個案');
				}
			}
		} else if (ccc==d2 || ccc.includes(d3)){
			bureauRecordNo=document.getElementsByName('bureauRecordNo')[0].value;
			if (bureauRecordNo!=null && bureauRecordNo!=''){
				xmlHttp = new XMLHttpRequest();
				Url='https://phpcis.chshb.gov.tw/api/v1/personal_infos/list?bureauRecordNo='+bureauRecordNo;
				xmlHttp.open( 'GET', Url, false );
				xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
				xmlHttp.send();
				uuu = xmlHttp.responseText;
				uuujson=JSON.parse(uuu);
				personalInfoId=uuujson.result[0].personalInfoId;
				window.open('https://phpcis.chshb.gov.tw/case/'+personalInfoId, '_blank');
			}
		} else {
			alert('請在掛號資訊列表使用');
		}
	}
	async function button_OPDhistory_handle(){
		countlimit=10;
		url=document.URL;
		d0='https://phpcis.chshb.gov.tw/registration/create';
		d1='https://phpcis.chshb.gov.tw/registration/';
		d2='https://phpcis.chshb.gov.tw/registration';
		if (url==d0 || url.includes(d1)){
			theID=document.getElementsByClassName('form-control ampInput')[1].value;
			thename=document.getElementsByClassName('form-control ampInput')[0].value;
			url='https://phpcis.chshb.gov.tw/api/v1/registrations/list?personalId='+theID;
			await fetch(url, {
			  'headers': {
				'content-type': 'application/json'
			  },
			  'body': null,
			  'method': 'GET'
			}).then(response => response.text())
			  .then((response) => {
				res=JSON.parse(response);
				count=0;
				msg='';
				for(i=0;i<res.result.length;i++){
					if (count<countlimit){
						if (res.result[i].treatmentStatus=='1'){
							msg=msg+'日期:'+cytomky(res.result[i].treatmentDate)+',類別:'+res.result[i].visitTypeCode+res.result[i].visitType+',就醫序號:'+res.result[i].treatmentSeqNo+'\n';
							count+=1;
						}
					}
				}
				if (count==0){
					alert('該個案無已完成就診紀錄');
				} else {
					msg='個案 '+thename+' 最近 '+count+' 次完成就診紀錄\n'+msg;
					alert(msg);
				}
			}).catch(err => console.log(err));
		} else if (url==d2){
			tb=document.querySelector('table');
			if (tb.textContent.includes('無資料')){
				alert('無掛號資料');
			} else {
				theID='';
				for (i=1;i<tb.rows.length;i++){
					if (tb.rows[i].cells[0].children[0].checked){
						theID=tb.rows[i].cells[3].textContent;
						thename=tb.rows[i].cells[4].textContent;
						break;
					}
				}
				if (theID==''){
					alert('未選擇個案');
				} else {
					url='https://phpcis.chshb.gov.tw/api/v1/registrations/list?personalId='+theID;
					await fetch(url, {
					  'headers': {
						'content-type': 'application/json'
					  },
					  'body': null,
					  'method': 'GET'
					}).then(response => response.text())
					  .then((response) => {
						res=JSON.parse(response);
						count=0;
						msg='';
						for(i=0;i<res.result.length;i++){
							if (count<countlimit){
								if (res.result[i].treatmentStatus=='1'){
									msg=msg+'日期:'+cytomky(res.result[i].treatmentDate)+',類別:'+res.result[i].visitTypeCode+res.result[i].visitType+',就醫序號:'+res.result[i].treatmentSeqNo+'\n';
									count+=1;
								}
							}
						}
						if (count==0){
							alert('該個案無已完成就診紀錄');
						} else {
							msg='個案 '+thename+' 最近 '+count+' 次完成就診紀錄\n'+msg;
							alert(msg);
						}
					}).catch(err => console.log(err));
				}
			}
		}else {
			alert('請在新增掛號資料或編輯掛號資料時使用');
		}
		function cytomky(date){
			yy=date.split('-')[0]-1911;
			mm=date.split('-')[1];
			dd=date.split('-')[2];
			mky=yy+mm+dd;
			return mky
		}
	}
	async function button_FMdebug_handle(){
		tu=document.URL;
		wu='https://phpcis.chshb.gov.tw/familyMedicine';
		if (tu==wu){
			tb=document.querySelector('#uncontrolled-tab-example-tabpane-02 > div > div.line > div > table');
			if (tb==null){
				alert('發生錯誤');
			} else {
				if (tb.textContent.includes('無資料')){
					changeevent=new Event('change', {bubbles: true});
					document.querySelector('#uncontrolled-tab-example-tab-02').click();
					pan=document.getElementById('uncontrolled-tab-example-tabpane-02');
					sel=pan.getElementsByClassName('form-control ampInput');
					sel[0].options[3].selected=true;
					sel[0].dispatchEvent(changeevent);
					sel[1].options[1].selected=true;
					sel[1].dispatchEvent(changeevent);
					sel[2].options[1].selected=true;
					sel[2].dispatchEvent(changeevent);
					tb.rows[0].cells[1].children[0].click();
					pan.getElementsByClassName('ampCommonBtn btn btn-primary')[0].click();
				} else {
					if( !('showOpenFilePicker' in self) ) {
						throw new Error( 'unsupported browser' );
					}
					try { 
						txtopt={
							types: [
							{
								description: '醫療群上傳檔案',
								accept: {
									'TXT/*': ['.txt']
								}
							},
							],
							excludeAcceptAllOption: true,
							multiple: false
						};
						handles=await showOpenFilePicker(txtopt);
						file=await handles[0].getFile();
						txtar=await file.arrayBuffer();
						txtcon = new TextDecoder('big5').decode(txtar);
						a_txtcon=txtcon.split('\r\n');
						csvopt={
							types: [
								{
									description: '健保局回饋錯誤檔',
									accept: {
									'CSV/*': ['.csv']
									}
								},
							],
							excludeAcceptAllOption: true,
							multiple: false
						};
						handles=await showOpenFilePicker(csvopt);
						file=await handles[0].getFile();
						csvar=await file.arrayBuffer();
						csvcon = new TextDecoder('big5').decode(csvar);
						csvcon=csvcon.replaceAll('\'','');
						csvcon=csvcon.replaceAll('\"','');
						a_csvcon=csvcon.split('\r\n');
						list=[];
						for (i=1;i<a_csvcon.length-1;i++){
							temp=a_csvcon[i].split(',')[0];
							temp=a_txtcon[temp-1].substring(14,24);
							list.push(temp);
						}
						for (i=0;i<list.length;i++){
							LID=list[i];
							find=0;
							for (j=1;j<tb.rows.length;j++){
								TID=tb.rows[j].cells[1].innerText;
								if (LID==TID){
									tb.rows[j].style.backgroundColor='#82D900';
									break;
								}
							}
						}
						tb.rows[0].cells[1].children[0].click();
						alert('完成，請對綠色欄位點選失效');
					} catch(e) {
						alert('錯誤，請選擇正確的檔案');
					}
				}
			}
		} else {
			if (confirm('非家醫計畫作業頁面,是否跳轉業面?')){
				//location.href='https://phpcis.chshb.gov.tw/familyMedicine';
				gotourl('/familyMedicine');
			} 
		}
	}
	function button_autocompletesingle_handle(){
		ccc=document.URL;
		if (ccc=='https://phpcis.chshb.gov.tw/populanceRegistration'){
			smokefuid="";
			smokefu=['E1023C','E1024C','E1025C','E1026C','E1028C','E1029C']
			url_visittype='https://phpcis.chshb.gov.tw/api/v1/visit_types/list_visibility';
			xmlHttp = new XMLHttpRequest();
			xmlHttp.open('GET', url_visittype, false );
			xmlHttp.send();
			res_visittype=xmlHttp.responseText;
			json_visittype=JSON.parse(res_visittype);
			transvisittype={};
			for (zz=0;zz<json_visittype.result.length;zz++){
				transvisittype[json_visittype.result[zz].visitTypeCode]=json_visittype.result[zz].isApplicable;
			}
			
			
			url_freq_orders='https://phpcis.chshb.gov.tw/api/v1/freq_orders/list';
			xmlHttp = new XMLHttpRequest();
			xmlHttp.open('GET', url_freq_orders, false );
			xmlHttp.send();
			res_freq_orders=xmlHttp.responseText;
			json_freq_orders=JSON.parse(res_freq_orders);
			if (document.getElementById('myDraggable_3')){
				document.getElementById('myDraggable_3').remove();
				createmyDraggable_3()
			} else {
				createmyDraggable_3();
			}
		} else {
			alert('需在候診患者查詢使用');
		}


		function createmyDraggable_3(){
			var myDraggable_3 = document.createElement('div');
			myDraggable_3.id='myDraggable_3';
			myDraggable_3.style.width = '450px';
			myDraggable_3.style.background = '#f9f9f9';
			myDraggable_3.style.border = '1px solid #ccc';
			myDraggable_3.style.position = 'absolute';
			myDraggable_3.style.cursor = 'move';
			myDraggable_3.style.zIndex = '9999';
			myDraggable_3.style.left=Math.ceil(window.innerWidth/2-225) +'px';
			myDraggable_3.style.top = 300 +'px';
			document.body.insertBefore(myDraggable_3,document.body.firstChild);
			myDraggable_3.addEventListener('mousedown', function(e) {
				mouseX = e.clientX;
				mouseY = e.clientY;
				document.addEventListener('mousemove', onMouseMove);
				document.addEventListener('mouseup', onMouseUp);
			});
			var line1 = document.createElement('div');
			line1.textContent='標準處方';
			line1.style.height = '30px';
			myDraggable_3.appendChild(line1);
			var ordercombo = document.createElement('select');
			ordercombo.style.height = '30px';
			ordercombo.id='ordercombo';
			ordercombo.style.width = '250px';
			for (i2=0;i2<json_freq_orders.result.length;i2++){
				newOption = document.createElement('option');
				freqOrderCode=json_freq_orders.result[i2].freqOrderCode;
				freqOrderName=json_freq_orders.result[i2].freqOrderName;
				freqOrderId=json_freq_orders.result[i2].freqOrderId;
				newOption.text =freqOrderCode+' : '+freqOrderName;
				newOption.value=freqOrderId;
				ordercombo.appendChild(newOption);
			}
			line1.appendChild(ordercombo);
			ordercombo.addEventListener('change', ordercombo_change);
			var confirmbutton = document.createElement('button');
			confirmbutton.id='confirmbutton';
			confirmbutton.textContent='帶入處方';
			confirmbutton.style.height = '30px';
			confirmbutton.style.left = '315px';
			confirmbutton.style.position = 'absolute';
			confirmbutton.addEventListener('click', confirmbutton_handle);
			line1.appendChild(confirmbutton);
			var exitbutton = document.createElement('button');
			exitbutton.id='exitbutton';
			exitbutton.textContent='關閉';
			exitbutton.style.height = '30px';
			exitbutton.style.left = '398px';
			exitbutton.style.position = 'absolute';
			exitbutton.addEventListener('click', exitbutton_handle);
			line1.appendChild(exitbutton);
			
			var line3 = document.createElement('div');
			line3.id='line3';
			line3.textContent='主診斷:';
			myDraggable_3.appendChild(line3);
			var line4 = document.createElement('div');
			line4.id='line4';
			line4.textContent='處方:';
			myDraggable_3.appendChild(line4);
			ordercombo_change();
			
			
			function confirmbutton_handle(){
				tb=document.getElementsByClassName('table table-striped table-bordered table-sm role-list__role-table commonTable')[0];
				array_patient=[];
				if (tb.rows[1].cells.length>2){
					for (i9=1;i9<tb.rows.length;i9++){
						if (tb.rows[i9].cells[0].children[0].checked){
							href=tb.rows[i9].cells[4].children[0].href.split('/');
							p_name=tb.rows[i9].cells[4].textContent;
							p_visittype=tb.rows[i9].cells[7].textContent
							registrationId=href[href.length-1];
							array_patient.push(registrationId);
						}
					}
				}
				if (array_patient.length==1){
					if (json_orderdetail.result.diseases.length>0){
						if (json_orderdetail.result.FreqOrderPrescription.length>0){
							hadsmokefu=false;
							for (let i=0;i<json_orderdetail.result.FreqOrderPrescription.length;i++){
								if (smokefu.includes(json_orderdetail.result.FreqOrderPrescription[i].applicationId)){
									hadsmokefu=true;
									break;
								}
							}
							if (confirm('是否將處方帶入個案'+p_name+'，身分別:'+p_visittype+'?')){
								if (hadsmokefu){
									smokefuid=prompt('請輸入戒菸追蹤人員ID',smokefuid)
								}
								autocomplete();
							}
						} else {
							alert('該標準處方無處置');
						}
					} else {
						alert('該標準處方無診斷');
					}
				} else {
					alert('無選擇個案')
				}
			}
			function autocomplete(){
				errmsg='';
				for (i3=0;i3<array_patient.length;i3++){
					registrationId=array_patient[i3];
					url_registrationId='https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId='+registrationId;
					xmlHttp = new XMLHttpRequest();
					xmlHttp.open('GET', url_registrationId, false );
					xmlHttp.send();
					res_registrations=xmlHttp.responseText;
					jres_registrations=JSON.parse(res_registrations);
					url_health_records='https://phpcis.chshb.gov.tw/api/v1/health_records/find?registrationId='+registrationId;
					xmlHttp = new XMLHttpRequest();
					xmlHttp.open('GET', url_health_records, false );
					xmlHttp.send();
					res_health_records=xmlHttp.responseText;
					jres_health_records=JSON.parse(res_health_records);
					forinjectdate={};
					forinjectdate['CC']=json_orderdetail.result.CC;
					forinjectdate['PE']=json_orderdetail.result.PE;
					
					
					forinjectdate['abnormalTreatmentSeqNo']=null;
					forinjectdate['benefitTypeCode']=jres_registrations.result.benefitTypeCode;
					forinjectdate['benefitTypeId']=jres_registrations.result.benefitTypeId;
					forinjectdate['bmi']=jres_health_records.result.bmi*1;
					if (jres_registrations.result.caseTypeId==16){
						forinjectdate['caseTypeId']=23;
						forinjectdate['caseTypeCode']='09';
					} else {
						forinjectdate['caseTypeId']=jres_registrations.result.caseTypeId;
						forinjectdate['caseTypeCode']=jres_registrations.result.caseTypeCode;
					}
					
					
					forinjectdate['caseTypeId']=jres_registrations.result.caseTypeId;
					forinjectdate['clinicId']=json_freq_orders.result[0].clinicId;
					forinjectdate['codContent']=jres_health_records.result.codContent;
					forinjectdate['courseHealthRecordId']=jres_health_records.result.courseHealthRecordId;
					forinjectdate['dbp']=jres_health_records.result.dbp*1;
					forinjectdate['diseases']=[];
					for (i4=0;i4<json_orderdetail.result.diseases.length;i4++){
						tempdisease={};
						tempdisease['ICD10Code']=json_orderdetail.result.diseases[i4].ICD10Code;
						tempdisease['diseaseId']=json_orderdetail.result.diseases[i4].diseaseId;
						tempdisease['isChronic']=json_orderdetail.result.diseases[i4].isChronic;
						if (i4==0){
							tempdisease['isMaster']=true;
						} else {
							tempdisease['isMaster']=false;
						}
						forinjectdate['diseases'].push(tempdisease);
					}
					forinjectdate['dispensingType']=null;
					forinjectdate['glucoseAC']=jres_health_records.result.glucoseAC*1;
					forinjectdate['glucosePC']=jres_health_records.result.glucosePC*1;
					forinjectdate['healthRecordId']=jres_health_records.result.healthRecordId;
					forinjectdate['height']=jres_health_records.result.height*1;
					forinjectdate['homeCareType']=jres_health_records.result.homeCareType;
					forinjectdate['isAutoCorrect']=jres_health_records.result.isAutoCorrect;
					forinjectdate['isChronicPrescription']=jres_health_records.result.isChronicPrescription;
					forinjectdate['isEmergencyVisit']=jres_health_records.result.isEmergencyVisit;
					forinjectdate['isIncludeFamilyCare']=jres_health_records.result.isIncludeFamilyCare;
					forinjectdate['isICCardWritten']=jres_registrations.result.isICCard;
					forinjectdate['personalInfoId']=jres_health_records.result.personalInfoId;
					forinjectdate['physicalExamHistoryId']=jres_health_records.result.physicalExamHistoryId;
					forinjectdate['prescriptionDeadline']=jres_health_records.result.prescriptionDeadline;
					forinjectdate['prescriptionNo']=jres_health_records.result.prescriptionNo;
					forinjectdate['prescriptionReuseTimes']=jres_health_records.result.prescriptionReuseTimes;
					forinjectdate['prescriptionType']=jres_health_records.result.prescriptionType;
					forinjectdate['prescriptions']=[];
					for (i5=0;i5<json_orderdetail.result.FreqOrderPrescription.length;i5++){
						tempprescription={};
						if (smokefu.includes(json_orderdetail.result.FreqOrderPrescription[i5].applicationId)){
							if (smokefuid!="" && smokefuid!=null){
								tempprescription['doctorVisitRemark']=smokefuid;
							}
						}
						tempprescription['bureauTestCode']=json_orderdetail.result.FreqOrderPrescription[i5].bureauTestCode;
						tempprescription['day']=json_orderdetail.result.FreqOrderPrescription[i5].day;
						tempprescription['description']='';
						tempprescription['drugCode']=json_orderdetail.result.FreqOrderPrescription[i5].prescriptionCode;
						tempprescription['drugName']=json_orderdetail.result.FreqOrderPrescription[i5].prescriptionName;
						tempprescription['drugRouteId']=json_orderdetail.result.FreqOrderPrescription[i5].drugRouteId;
						tempprescription['drugUsageId']=json_orderdetail.result.FreqOrderPrescription[i5].drugUsageId;
						tempprescription['endTime']=null;
						tempprescription['isApplicable']=json_orderdetail.result.FreqOrderPrescription[i5].isApplicable;
						tempprescription['isChronicPrescription']=json_orderdetail.result.FreqOrderPrescription[i5].isChronicPrescription;
						tempprescription['isSchedule']=false;
						tempprescription['isScheduleCorrection']=false;
						tempprescription['modelType']=json_orderdetail.result.FreqOrderPrescription[i5].modelType;
						tempprescription['ownExpenseSeq']=json_orderdetail.result.FreqOrderPrescription[i5].ownExpenseSeq;
						tempprescription['prescriptionId']=json_orderdetail.result.FreqOrderPrescription[i5].prescriptionId;
						tempprescription['prescriptionModel']=json_orderdetail.result.FreqOrderPrescription[i5].prescriptionModel;
						tempprescription['qty']=json_orderdetail.result.FreqOrderPrescription[i5].qty;
						if (transvisittype[jres_registrations.result.visitTypeCode]){
							tempprescription['selfPayType']=json_orderdetail.result.FreqOrderPrescription[i5].selfPayType;
						} else {
							selfPayType=json_orderdetail.result.FreqOrderPrescription[i5].selfPayType;
							if (selfPayType=='*' || selfPayType=='#'){
								tempprescription['selfPayType']=json_orderdetail.result.FreqOrderPrescription[i5].selfPayType;
							} else { 
								tempprescription['selfPayType']='*';
							}
						}
						
						tempprescription['startTime']='';
						tempprescription['testPackageCode']=json_orderdetail.result.FreqOrderPrescription[i5].testPackageCode;
						tempprescription['testPackageId']=json_orderdetail.result.FreqOrderPrescription[i5].testPackageId;
						tempprescription['testPackageName']=json_orderdetail.result.FreqOrderPrescription[i5].testPackageName;
						if (json_orderdetail.result.FreqOrderPrescription[i5].totalQty<1){
							tempprescription['totalQty']=1;
						} else {
							tempprescription['totalQty']=json_orderdetail.result.FreqOrderPrescription[i5].totalQty;
						}
						forinjectdate['prescriptions'].push(tempprescription);
					}
					forinjectdate['pulse']=jres_health_records.result.pulse*1;
					forinjectdate['registrationDate']=jres_registrations.result.date;
					forinjectdate['registrationId']=jres_registrations.result.registrationId;
					forinjectdate['sbp']=jres_registrations.result.sbp;
					forinjectdate['scheduleTest']=null;
					forinjectdate['scheduleTestId']=null;
					forinjectdate['shareCode']=jres_registrations.result.shareCode;
					forinjectdate['shareId']=jres_registrations.result.shareId;
					forinjectdate['supplyReportType']=jres_health_records.result.supplyReportType;
					forinjectdate['transferClinicCode']=jres_health_records.result.transferClinicCode;
					forinjectdate['treatmentEndDate']=jres_registrations.result.date;
					forinjectdate['treatmentTypeId']=jres_registrations.result.treatmentTypeId;
					forinjectdate['visitTypeCode']=jres_registrations.result.visitTypeCode;
					forinjectdate['visitTypeId']=jres_registrations.result.visitTypeId;
					forinjectdate['waist']=null;
					forinjectdate['weight']=jres_health_records.result.weight*1;
					forinjectdate['writeICCard']=jres_registrations.result.isCardCheck;
					forinjectdates=JSON.stringify(forinjectdate);
					url_check_valid='https://phpcis.chshb.gov.tw/api/v1/health_records/check_valid';
					xmlHttp = new XMLHttpRequest();
					xmlHttp.open('POST', url_check_valid, false );
					xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
					xmlHttp.send(forinjectdates);
					res_check_valid=xmlHttp.responseText;
					jres_check_valid=JSON.parse(res_check_valid);
					if (jres_check_valid.code==200){
						url_update='https://phpcis.chshb.gov.tw/api/v1/health_records/update';
						xmlHttp = new XMLHttpRequest();
						xmlHttp.open('POST', url_update, false );
						xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
						xmlHttp.send(forinjectdates);
						res_update=xmlHttp.responseText;
						jres_update=JSON.parse(res_update);
						if (jres_update.code!=200){
							errmsg=errmsg+'update錯誤，ID:'+registrationId+':'+jres3.message+'\n';
						}
					} else {
						errmsg=errmsg+'valid錯誤，ID:'+registrationId+':'+jres_check_valid.message+'\n';
					}
				}
				if (errmsg==''){
					alert('標準處方帶入完成');
					changeevent=new Event('change', {bubbles: true});
					document.getElementsByClassName('form-control ampInput')[2].dispatchEvent(changeevent);
				} else {
					alert(errmsg);
				}
			}
			function exitbutton_handle(){
				document.getElementById('myDraggable_3').remove();
			}
			function ordercombo_change(){
				url_orderdetail='https://phpcis.chshb.gov.tw/api/v1/freq_orders/find?clinicId=4&freqOrderId='+ordercombo.value;
				xmlHttp = new XMLHttpRequest();
				xmlHttp.open('GET', url_orderdetail, false );
				xmlHttp.send();
				res_orderdetail=xmlHttp.responseText;
				json_orderdetail=JSON.parse(res_orderdetail);
				if (json_orderdetail.result.diseases.length>0){
					diagnosis=json_orderdetail.result.diseases[0].ICD10Code +' : '+json_orderdetail.result.diseases[0].ICD10Name;
				} else {
					diagnosis='無';
				}
				orderall='';
				if (json_orderdetail.result.FreqOrderPrescription.length>0){
					for (i6=0;i6<json_orderdetail.result.FreqOrderPrescription.length;i6++){
						neworder=json_orderdetail.result.FreqOrderPrescription[i6].applicationId+'_'+json_orderdetail.result.FreqOrderPrescription[i6].prescriptionName;
						if (orderall==''){
							orderall=orderall+neworder;
						} else {
							orderall=orderall+';'+neworder;
						}
					}
				} else {
					orderall='無';
				}
				line3.textContent='主診斷:'+diagnosis;
				line4.textContent='處方:'+orderall;
			}
			function onMouseMove(e) {
				posX = mouseX - e.clientX;
				posY = mouseY - e.clientY;
				mouseX = e.clientX;
				mouseY = e.clientY;
				myDraggable_3.style.left = (myDraggable_3.offsetLeft - posX) + 'px';
				myDraggable_3.style.top = (myDraggable_3.offsetTop - posY) + 'px';
			}
			function onMouseUp() {
				document.removeEventListener('mousemove', onMouseMove);
				document.removeEventListener('mouseup', onMouseUp);
			}
		}
	}
	
	function button_countmonth_handle(){
		ccc=document.URL;
		if (ccc=='https://phpcis.chshb.gov.tw/medicalRefee'){
			document.querySelectorAll('input')[0].style.background='#F9F900';
			nowarr=document.querySelectorAll('input')[0].value.split(' ')[1].split('-');
			mky=(nowarr[0]-1911).toString();
			mkm=nowarr[1];
			monthdocurl='https://phpcis.chshb.gov.tw/api/v1/applications/monthly/statistics/doctors/list?targetYearMonth='+mky+mkm;
			xmlHttp = new XMLHttpRequest();
			xmlHttp.open( 'GET', monthdocurl, false );
			xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			xmlHttp.send();
			res_monthdoc=xmlHttp.responseText;
			jres_monthdoc=JSON.parse(res_monthdoc);
			msg='';
			data=jres_monthdoc.result.data;
			for (let i=0;i<data.length;i++){
				ord=(i+1).toString();
				msg+=ord+'. '+data[i].doctorName+' : '+data[i].dateCount+' 天\n'
			}
			if (msg!=''){
				msg='反黃月份('+mky+mkm+')進行查詢結果如下\n'+msg;
			} else {
				msg='無看診醫師';
			}
			alert(msg);
		}
	}
	function button_NIIS_handle(){
		ccc=document.URL;
		if (ccc.includes('https://phpcis.chshb.gov.tw/consultationMainPage/')){
			chn=document.querySelector("#root > div.wrapper > main > div > form > div:nth-child(1) > div:nth-child(12) > div").textContent;
			getvaccineviaid(chn);
		} else if (ccc=='https://phpcis.chshb.gov.tw/populanceRegistration' || ccc=='https://phpcis.chshb.gov.tw/registration'){
			radiolist=document.querySelectorAll('input[type="radio"]');
			targeturl="";
			for (let i=0; i < radiolist.length; i++){
				if (radiolist[i].checked){
					if (radiolist[i].getBoundingClientRect().height>0){
						targeturl=radiolist[i].parentElement.parentElement.children[2].textContent;
						break
					}
				}
			}
			if (targeturl!=""){
				getvaccineviaid(targeturl);
			} else {
				alert('請選擇個案');
			}
		} else if (ccc.includes('https://phpcis.chshb.gov.tw/registration/') || ccc=='https://phpcis.chshb.gov.tw/registration/create'){
			if (ccc=='https://phpcis.chshb.gov.tw/registration/create'){
				chn=document.querySelector("#root > div.wrapper > main > div > form > div:nth-child(4) > div:nth-child(4) > div > div > input").value
			} else {
				chn=document.querySelector("#root > div.wrapper > main > div > form > div:nth-child(4) > div:nth-child(2) > div > div > input").value;
			}
			getvaccineviaid(chn);
		} 
	}
	
	function getvaccineviaid(chn){
		testmode=false;
		personalinfoobj=chntoinfoid(chn)
		if (personalinfoobj){
			vhurl="https://phpcis.chshb.gov.tw/api/v1/niis/vaccination_history/list?personalInfoId="+personalinfoobj.personalInfoId;
			retjson=JSON.parse(httpGet(vhurl));
			ay=personalinfoobj.birthday.split('-');
			gy=("000"+(ay[0]-1911));
			patientidbirth=gy.substring(gy.length-3,gy.length)+ay[1]+ay[2];
			thename=personalinfoobj.name;
		} else {
			return
		}
		
		resultobj={
			"Record": [],
			"ApplyRecord": [],
			"VaccRecord": "",
			"Error": ""
		}
		tempobj={};
		for (let i=0;i<retjson.result.length;i++){
			injitem=retjson.result[i];
			if (!(injitem.immuDate in tempobj)){
				tempobj[injitem.immuDate]=[];
			}
			tempobj[injitem.immuDate].push(injitem)
		}
		tempdatelist=Object.keys(tempobj);
		tempdatelist=tempdatelist.sort(); 
		for (let i=0;i<tempdatelist.length;i++){
			idhis=tempobj[tempdatelist[i]];
			for (let j=0;j<idhis.length;j++){
				immuDate=idhis[j].immuDate;
				theY=immuDate.substring(0,3)*1+1911;
				theM=immuDate.substring(3,5);
				theD=immuDate.substring(5,7);
				tempid={
					"SRVC": idhis[j].vaccineID,
					"ID": theY+"-"+theM+"-"+theD+"T00:00:00",
					"ON": idhis[j].immuAgcyName,
					"VB": ""
				}
				resultobj.ApplyRecord.push(tempid);
			}
		}
		vaccinelist=['rHepB-1','rHepB-2','rHepB-3',
			'13PCV-1','13PCV-2','13PCV-3','13PCV-4',
			'5in1-1','5in1-2','5in1-3','5in1-4',
			'BCG',
			'MMR-1','MMR-2',
			'Var-1',
			'2HepA-1','2HepA-2',
			'JE-CV_LiveAtd-1','JE-CV_LiveAtd-2',
			'DTaP-IPV-5'
			]
		vacnameprolist={
	"BCG":["BCG"],
	"rHepB-1":["HBV"],
	"rHepB-2":["HBV"],
	"rHepB-3":["HBV"],
	"5in1-1":["Tetanus","Diphtheria","Pertusis","Polio","Hib"],
	"5in1-2":["Tetanus","Diphtheria","Pertusis","Polio","Hib"],
	"5in1-3":["Tetanus","Diphtheria","Pertusis","Polio","Hib"],
	"5in1-4":["Tetanus","Diphtheria","Pertusis","Polio","Hib"],
	"MMR-1":["Measles","Mumps","Rubella"],
	"MMR-2":["Measles","Mumps","Rubella"],
	"JE-1":["JE"],
	"JE-2":["JE"],
	"JE-3":["JE"],
	"JE-4":["JE"],
	"JE-CV_LiveAtd-1":["JE"],
	"JE-CV_LiveAtd-2":["JE"],
	"JE_LiveAtd-1":["JE"],
	"JE_LiveAtd-2":["JE"],
	"JE-VC_Inactd-1":["JE"],
	"JE-VC_Inactd-2":["JE"],
	"JE-VC_Inactd-3":["JE"],
	"JE-VC_Inactd-4":["JE"],
	"Tdap-IPV":["Tetanus","Diphtheria","Pertusis","Polio"],
	"Td":["Tetanus","Diphtheria"],
	"2HepA-1":["HAV"],
	"2HepA-2":["HAV"],
	"6in1-1":["Tetanus","Diphtheria","Pertusis","Polio","Hib","HBV"],
	"6in1-2":["Tetanus","Diphtheria","Pertusis","Polio","Hib","HBV"],
	"6in1-3":["Tetanus","Diphtheria","Pertusis","Polio","Hib","HBV"],
	"6in1-4":["Tetanus","Diphtheria","Pertusis","Polio","Hib","HBV"],
	"13PCV-1":["PCV"],
	"13PCV-2":["PCV"],
	"13PCV-3":["PCV"],
	"13PCV-4":["PCV"],
	"DTaP-IPV-1":["Tetanus","Diphtheria","Pertusis","Polio"],
	"DTaP-IPV-2":["Tetanus","Diphtheria","Pertusis","Polio"],
	"DTaP-IPV-3":["Tetanus","Diphtheria","Pertusis","Polio"],
	"DTaP-IPV-4":["Tetanus","Diphtheria","Pertusis","Polio"],
	"MV":["Measles"],
	"DTaP-1":["Tetanus","Diphtheria","Pertusis"],
	"DTaP-2":["Tetanus","Diphtheria","Pertusis"],
	"DTaP-3":["Tetanus","Diphtheria","Pertusis"],
	"DTaP-4":["Tetanus","Diphtheria","Pertusis"],
	"DTaP-5":["Tetanus","Diphtheria","Pertusis"],
	"IPV-1":["Polio"],
	"IPV-2":["Polio"],
	"IPV-3":["Polio"],
	"IPV-4":["Polio"],
	"IPV-5":["Polio"],
	"Hib-1":["Hib"],
	"Hib-2":["Hib"],
	"Hib-3":["Hib"],
	"Hib-4":["Hib"],
	"DTP-1":["Tetanus","Diphtheria","Pertusis"],
	"DTP-2":["Tetanus","Diphtheria","Pertusis"],
	"DTP-3":["Tetanus","Diphtheria","Pertusis"],
	"DTP-4":["Tetanus","Diphtheria","Pertusis"],
	"DT-1":["Tetanus","Diphtheria"],
	"DT-2":["Tetanus","Diphtheria"],
	"DT-3":["Tetanus","Diphtheria"],
	"DT-4":["Tetanus","Diphtheria"],
	"7PCV-1":["PCV"],
	"7PCV-2":["PCV"],
	"7PCV-3":["PCV"],
	"7PCV-4":["PCV"],
	"10PCV-1":["PCV"],
	"10PCV-2":["PCV"],
	"10PCV-3":["PCV"],
	"10PCV-4":["PCV"],
	"HepAB-1":["HAV","HBV"],
	"HepAB-2":["HAV","HBV"],
	"HepAB-3":["HAV","HBV"],
	"Tdap":["AP"],
	"+BCG":["BCG"],
	"HepB-LBW":["HBV"],
	"HepB-LBWe":["HBV"],
	"HepB-LBWs":["HBV"],
	"HepB-LBWu":["HBV"],
	"+JE-1":["JE"],
	"+JE-2":["JE"],
	"+Td-1":["Tetanus","Diphtheria"],
	"+Td-2":["Tetanus","Diphtheria"],
	"+Tdap-IPV-1":["AP"],
	"+Tdap-IPV-2":["AP"],
	"+MMR-1":["Measles","Mumps","Rubella"],
	"+MMR-2":["Measles","Mumps","Rubella"],
	"+rHepB-1":["HBV"],
	"+rHepB-2":["HBV"],
	"+rHepB-3":["HBV"],
	"pHepB-1":["HBV"],
	"pHepB-2":["HBV"],
	"pHepB-3":["HBV"],
	"pHepB-4":["HBV"],
	"Mumps":["Mumps"],
	"+MV":["Measles"],
	"OPV-1":["Polio"],
	"OPV-2":["Polio"],
	"OPV-3":["Polio"],
	"OPV-4":["Polio"],
	"OPV-5":["Polio"],
	"+OPV-1":["Polio"],
	"+OPV-2":["Polio"],
	"+OPV-3":["Polio"],
	"+IPV-1":["Polio"],
	"+IPV-2":["Polio"],
	"+IPV-3":["Polio"],
	"DTaP-IPV-5":["AP"],
	"+DTaP-IPV-1":["Tetanus","Diphtheria","Pertusis","Polio","AP"],
	"+DTaP-IPV-2":["Tetanus","Diphtheria","Pertusis","Polio","AP"],
	"MMRV-1":["Measles","Mumps","Rubella","Var"],
	"MMRV-2":["Measles","Mumps","Rubella","Var"],
	"+2HepA-1":["HAV"],
	"+2HepA-2":["HAV"],
	"3HepA-1":["HAV"],
	"3HepA-2":["HAV"],
	"3HepA-3":["HAV"],
	"MMR0":["Measles","Mumps","Rubella"],
	"MR-1":["Measles","Rubella"],
	"MR-2":["Measles","Rubella"],
	"RV":["Rubella"],
	"Var-1":["Var"],
	"Var-2":["Var"],
	"MMR":["Measles","Mumps","Rubella"],
	"15PCV-1":["PCV"],
	"15PCV-2":["PCV"],
	"15PCV-3":["PCV"],
	"15PCV-4":["PCV"],
	"DTaP-HepB-IPV-1":["Tetanus","Diphtheria","Pertusis","Polio","HBV"],
	"DTaP-HepB-IPV-2":["Tetanus","Diphtheria","Pertusis","Polio","HBV"],
	"DTaP-HepB-IPV-3":["Tetanus","Diphtheria","Pertusis","Polio","HBV"],
	"DTaP-HepB-IPV-4":["Tetanus","Diphtheria","Pertusis","Polio","HBV"],
	"DTaP-HepB-IPV-5":["Tetanus","Diphtheria","Pertusis","Polio","HBV","AP"],
	"TT":["Tetanus"],
	"DTwP-HepB-Hib-1":["Tetanus","Diphtheria","Pertusis","Polio","HBV"],
	"DTwP-HepB-Hib-2":["Tetanus","Diphtheria","Pertusis","Polio","HBV"],
	"DTwP-HepB-Hib-3":["Tetanus","Diphtheria","Pertusis","Polio","HBV"],
	"DTwP-HepB-Hib-4":["Tetanus","Diphtheria","Pertusis","Polio","HBV"],
	"DTwP-HepB-Hib-5":["Tetanus","Diphtheria","Pertusis","Polio","HBV","AP"],
	"rHepB":["HBV"],
	"20PCV-1":["PCV"],
	"20PCV-2":["PCV"],
	"20PCV-3":["PCV"],
	"20PCV-4":["PCV"],
	};
		vacprolist=["HBV","Tetanus","Diphtheria","Pertusis","Hib","Polio","PCV","BCG","Measles","Mumps","Rubella","Var","HAV","JE","AP"];
		returnvalue=getvaccinelist(patientidbirth,resultobj);
		showvacwindow(returnvalue,patientidbirth);
		function applyrecord_to_obj(NIISrecord){
			applylistbyvaccine={};
			for (a=0;a<NIISrecord.ApplyRecord.length;a++){
				SRVC=NIISrecord.ApplyRecord[a].SRVC;
				temprecord={};
				temprecord['ID']=NIISrecord.ApplyRecord[a]['ID'];
				temprecord['ON']=NIISrecord.ApplyRecord[a]['ON'];
				temprecord['VB']=NIISrecord.ApplyRecord[a]['VB'];
				temprecord['SRVC']=SRVC;
				applylistbyvaccine[SRVC]=temprecord;
			}
			return applylistbyvaccine
		}
		function countage(BD){
			TBY=BD.substring(0,3)*1;
			TBM=BD.substring(3,5)*1;
			TBD=BD.substring(5,7)*1;
			ND=new Date;
			NY=ND.getFullYear()-1911;
			NM=ND.getMonth()+1;
			ND=ND.getDate();
			DO=ND-TBD;
			MO=NM-TBM;
			YO=NY-TBY;
			if (DO<0){
				DO+=30;
				MO-=1;
			}
			if (MO<0){
				MO+=12;
				YO-=1
			}
			returnvalue=[YO,MO,DO]
			return returnvalue
		}
		function countageold(BD){
			TBY=BD.substring(0,3)*1;
			ND=new Date;
			NY=ND.getFullYear()-1911;
			return NY-TBY
		}
		function countVageold(BD,ID){
			TBY=BD.substring(0,3)*1+1911;
			IDY=new Date(ID).getFullYear();
			return IDY-TBY
		}
		function countVageold2(BD,ID){
			TBY=BD.substring(0,3)*1+1911;
			TBM=BD.substring(3,5)*1;
			TBD=BD.substring(3,5)*1;
			IDY=new Date(ID).getFullYear();
			IDM=new Date(ID).getMonth()+1;
			IDD=new Date(ID).getDate();
			DDY=IDY-TBY;
			DDM=IDM-TBM;
			DDD=IDD-TBD;
			if (DDD<0){
				DDD+=30;
				DDM-=1;
			}
			if (DDM<0){
				DDM+=12;
				DDY-=1;
			}
			VMO=DDY*12+DDM
			return VMO
		}
		function countdayslater(lastID,interval){
			date_1=new Date(lastID);
			date_2=new Date(date_1.getTime()+(interval)*1000*3600*24+8*1000*3600).toISOString();
			return date_2
		}
		function countneedvaccine(monthold){
			needtoapplylist=[];
			recvaccinelist={
				"0":['rHepB-1'],
				"1":['rHepB-2'],
				"2":['13PCV-1','5in1-1'],
				"4":['13PCV-2','5in1-2'],
				"5":['BCG'],
				"6":['rHepB-3','5in1-3'],
				"12":['MMR-1','Var-1','2HepA-1','13PCV-3'],
				"15":['JE-CV_LiveAtd-1'],
				"18":['2HepA-2','5in1-4'],
				"27":['JE-CV_LiveAtd-2'],
				"60":['DTaP-IPV-5','MMR-2']
			}
			monthlist=Object.keys(recvaccinelist)
			for (b=0;b<monthlist.length;b++){
				if (monthlist[b]<=monthold){
					for (c=0;c<recvaccinelist[monthlist[b]].length;c++){
						needtoapplylist.push(recvaccinelist[monthlist[b]][c])
					}
				}
			}
			return needtoapplylist
		}
		function countnextvaccine(monthold){
			recvaccinelist={
				"0":['rHepB-1'],
				"1":['rHepB-2'],
				"2":['13PCV-1','5in1-1'],
				"4":['13PCV-2','5in1-2'],
				"5":['BCG'],
				"6":['rHepB-3','5in1-3'],
				"12":['MMR-1','Var-1','2HepA-1','13PCV-3'],
				"15":['JE-CV_LiveAtd-1'],
				"18":['2HepA-2','5in1-4'],
				"27":['JE-CV_LiveAtd-2'],
				"60":['DTaP-IPV-5','MMR-2']
			}
			monthlist=Object.keys(recvaccinelist);
			nexttimevaccine=[];
			for (let b=0;b<monthlist.length;b++){
				if (monthlist[b]>monthold){
					nexttimevaccine=recvaccinelist[monthlist[b]];
					break;
				}
			}
			return nexttimevaccine
		}
		function comparevaccine(applyrecord,birth){
			old_array=countage(birth);
			monthold=(old_array[0]*12+old_array[1]+old_array[2]/30).toFixed(2)*1;
			ageold=countageold(birth);
			need_array=countneedvaccine(monthold);
			next_array=countnextvaccine(monthold);
			applylist=applyrecord_to_obj(applyrecord);
			returnobj={};
			returnobj['needtoapply']={};
			returnobj['nexttoapply']={};
			applylist_array=Object.keys(applylist);
			if (applylist_array.includes('13PCV-3')){
				PCV3ID=applylist['13PCV-3']['ID'];
				PCV3IDageold=countVageold2(birth,PCV3ID);
				if (PCV3IDageold<12){
					if (monthold>=12){
						need_array.push('13PCV-4')
					}
				}
			}
			applypro=countvacpro(applylist_array);
			needpro=countvacpro(need_array);
			if (monthold<216){
				for (d=0;d<need_array.length;d++){
					if (!applylist_array.includes(need_array[d])){
						returnobj['needtoapply'][need_array[d]]=countnextIDfunction(applylist,need_array[d],birth);
					} 
				}
				for (let ccc=0; ccc<next_array.length;ccc++){
					returnobj['nexttoapply'][next_array[ccc]]=countnextIDfunction(applylist,next_array[ccc],birth);
				}
			}
			return returnobj
		}
		function mkytocy(mky){
			mkyy=mky.substring(0,3);
			mkym=mky.substring(3,5);
			mkyd=mky.substring(5,7);
			cyy=mkyy*1+1911;
			cyd=cyy+'-'+mkym+'-'+mkyd;
			return new Date(cyd)
		}
		function cyaddttime(cy,year,month){
			cyd=new Date(cy);
			cyy=cyd.getFullYear();
			cym=cyd.getMonth()+1;
			cyd=cyd.getDate();
			cyy=cyy+year;
			cym=cym+month;
			if (cym>12){
				cym-=12
				cyy+=1
			}
			ncyd=cyy+'-'+cym+'-'+cyd;
			date_1=new Date(ncyd);
			date_2=new Date(date_1.getTime()+8*1000*3600);
			return date_2
		}
		function cytomky(cy){
			cyd=new Date(cy);
			cyy=cyd.getFullYear()-1911;
			cym=cyd.getMonth()+1;
			cyd=cyd.getDate();
			mky="000"+cyy;
			mky=mky.substring(mky.length-3,mky.length);
			mkm="00"+cym;
			mkm=mkm.substring(mkm.length-2,mkm.length);
			mkd="00"+cyd;
			mkd=mkd.substring(mkd.length-2,mkd.length);
			mkdate=mky+mkm+mkd;
			return mkdate
		}
		function countnextIDfunction(applylist,countnextID,birth){
			activevaccine=['MMR','MMR-1','MMR-2','Var-1','Var-2','JE-CV_LiveAtd-1','JE-CV_LiveAtd-2']
			birthcy=mkytocy(birth);
			ALD='';
			ALDNa='';
			applykeys=Object.keys(applylist);
			for (e=0;e<activevaccine.length;e++){
				if (applykeys.includes(activevaccine[e])){
					ALDN=new Date(applylist[activevaccine[e]]['ID']);
					if (ALD==''){
						ALD=ALDN;
						ALDNa=activevaccine[e];
					} else {
						if (ALDN>ALD){
							ALD=ALDN;
							ALDNa=activevaccine[e];
						}
					}
				}
			}
			if (vaccinelist.includes(countnextID)){
				if (countnextID=='rHepB-1'){
					LD='';
					recommandtime=birthcy;
					recommandtimeC='出生24小時內儘速';
					leastinterval=birthcy;
					leastintervalC='出生24小時內儘速';
				}
				if (countnextID=='rHepB-2'){
					if (applykeys.includes('rHepB-1')){
						LD=applylist['rHepB-1']['ID']
						recommandtime1=cyaddttime(LD,0,1);
						recommandtime2=cyaddttime(birthcy,0,1);
						if (recommandtime1>recommandtime2){
							recommandtime=recommandtime1;
						} else {
							recommandtime=recommandtime2;
						}
						recommandtimeC='1個月大(與第一劑間隔1個月)';
						leastinterval=countdayslater(LD,28);
						leastintervalC='間隔4週(28天)';
					} else {
						LD='';
						recommandtime='';
						recommandtimeC='未接種第一劑';
						leastinterval='';
						leastintervalC='未接種第一劑';
					}
				}
				if (countnextID=='rHepB-3'){
					if (applykeys.includes('rHepB-2')){
						LD=applylist['rHepB-2']['ID']
						recommandtime1=cyaddttime(LD,0,5);
						recommandtime2=cyaddttime(birthcy,0,6);
						if (recommandtime1>recommandtime2){
							recommandtime=recommandtime1;
						} else {
							recommandtime=recommandtime2;
						}
						recommandtimeC='6個月大(第二劑間隔5個月)';
						leastinterval1=countdayslater(LD,56);
						if (applykeys.includes('rHepB-1')){
							LD2=applylist['rHepB-1']['ID']
							leastinterval2=countdayslater(LD2,112);
						}
						if (leastinterval1>leastinterval2){
							leastinterval=leastinterval
						} else {
							leastinterval=leastinterval2
						}
						leastintervalC='與第二劑間隔56天且第1、第3劑應間隔至少16週';
					} else {
						LD='';
						recommandtime='';
						recommandtimeC='未接種第二劑';
						leastinterval='';
						leastintervalC='未接種第二劑';
					}
				}
				if (countnextID=='5in1-1'){
					LD='';
					recommandtime1=countdayslater(birthcy,60);
					recommandtime2=cyaddttime(birthcy,0,2);
					if (recommandtime1>recommandtime2){
						recommandtime=recommandtime1;
					} else {
						recommandtime=recommandtime2;
					}
					recommandtimeC='2個月';
					leastinterval=countdayslater(birthcy,42);
					leastintervalC='6週';
				}
				if (countnextID=='5in1-2'){
					if (applykeys.includes('5in1-1')){
						LD=applylist['5in1-1']['ID']
						recommandtime1=cyaddttime(LD,0,2);
						recommandtime2=cyaddttime(birthcy,0,4);
						if (recommandtime1>recommandtime2){
							recommandtime=recommandtime1;
						} else {
							recommandtime=recommandtime2;
						}
						recommandtimeC='4個月(與第一劑間隔2個月)';
						leastinterval=countdayslater(LD,28);
						leastintervalC='4週(與第一劑間隔28天)';
					} else {
						LD='';
						recommandtime='';
						recommandtimeC='未接種第一劑';
						leastinterval='';
						leastintervalC='未接種第一劑';
					}
				}
				if (countnextID=='5in1-3'){
					if (applykeys.includes('5in1-2')){
						LD=applylist['5in1-2']['ID']
						recommandtime1=cyaddttime(LD,0,2);
						recommandtime2=cyaddttime(birthcy,0,6);
						if (recommandtime1>recommandtime2){
							recommandtime=recommandtime1;
						} else {
							recommandtime=recommandtime2;
						}
						recommandtimeC='6個月(與第二劑間隔2個月)';
						leastinterval=countdayslater(LD,28);
						leastintervalC='4週(與第二劑間隔28天)';
					} else {
						LD='';
						recommandtime='';
						recommandtimeC='未接種第二劑';
						leastinterval='';
						leastintervalC='未接種第二劑';
					}
				}
				if (countnextID=='5in1-4'){
					if (applykeys.includes('5in1-3')){
						LD=applylist['5in1-3']['ID']
						recommandtime1=cyaddttime(LD,1,0);
						recommandtime2=cyaddttime(birthcy,1,6);
						if (recommandtime1>recommandtime2){
							recommandtime=recommandtime1;
						} else {
							recommandtime=recommandtime2;
						}
						recommandtimeC='18個月(與第三劑間隔1年)';
						leastinterval1=countdayslater(LD,180);
						leastinterval2=cyaddttime(birthcy,1,0);
						if (leastinterval1>leastinterval2){
							leastinterval=leastinterval1
						} else {
							leastinterval=leastinterval2
						}
						leastintervalC='間隔6個月(與第二劑間隔180天)且滿1歲後';
					} else {
						LD='';
						recommandtime='';
						recommandtimeC='未接種第三劑';
						leastinterval='';
						leastintervalC='未接種第三劑';
					}
				}
				if (countnextID=='13PCV-1'){
					LD='';
					recommandtime1=countdayslater(birthcy,60);
					recommandtime2=cyaddttime(birthcy,0,2);
						if (recommandtime1>recommandtime2){
							recommandtime=recommandtime1;
						} else {
							recommandtime=recommandtime2;
						}
					recommandtimeC='2個月大';
					leastinterval=countdayslater(birthcy,42);
					leastintervalC='6週大';
				}
				if (countnextID=='13PCV-2'){
					if (applykeys.includes('13PCV-1')){
						LD=applylist['13PCV-1']['ID']
						recommandtime1=cyaddttime(LD,0,2);
						recommandtime2=cyaddttime(birthcy,0,4);
						if (recommandtime1>recommandtime2){
							recommandtime=recommandtime1;
						} else {
							recommandtime=recommandtime2;
						}
						recommandtimeC='4個月大(第一劑間隔2個月)';
						leastinterval=countdayslater(LD,56);
						leastintervalC='間隔8週(56天)';
					} else {
						LD='';
						recommandtime='';
						recommandtimeC='未接種第一劑';
						leastinterval='';
						leastintervalC='未接種第一劑';
					}
				}
				if (countnextID=='13PCV-3'){
					if (applykeys.includes('13PCV-2')){
						LD=applylist['13PCV-2']['ID']
						recommandtime1=cyaddttime(LD,0,8);
						recommandtime2=cyaddttime(birthcy,1,0);
						if (recommandtime1>recommandtime2){
							recommandtime=recommandtime1;
						} else {
							recommandtime=recommandtime2;
						}
						recommandtimeC='12個月大(與第二劑間隔8個月)';
						leastinterval1=countdayslater(LD,56);
						leastinterval2=cyaddttime(birthcy,1,0);
						if (leastinterval1>leastinterval2){
							leastinterval=leastinterval1;
						} else {
							leastinterval=leastinterval2;
						}
						leastintervalC='間隔8週且滿1歲(與第二劑間隔56天)';
					} else {
						LD='';
						recommandtime='';
						recommandtimeC='未接種第二劑';
						leastinterval='';
						leastintervalC='未接種第二劑';
					}
				}
				if (countnextID=='13PCV-4'){
					if (applykeys.includes('13PCV-3')){
						LD=applylist['13PCV-3']['ID']
						recommandtime1=cyaddttime(LD,0,6);
						recommandtime2=cyaddttime(birthcy,1,0);
						if (recommandtime1>recommandtime2){
							recommandtime=recommandtime1;
						} else {
							recommandtime=recommandtime2;
						}
						recommandtimeC='12個月大(與第三劑間隔6個月)';
						leastinterval1=countdayslater(LD,56);
						leastinterval2=cyaddttime(birthcy,1,0);
						if (leastinterval1>leastinterval2){
							leastinterval=leastinterval1;
						} else {
							leastinterval=leastinterval2;
						}
						leastintervalC='間隔8週且滿1歲(與第三劑間隔56天)';
					} else {
						LD='';
						recommandtime='';
						recommandtimeC='未接種第二劑';
						leastinterval='';
						leastintervalC='未接種第二劑';
					}
				}
				if (countnextID=='BCG'){
					LD='';
					recommandtime=cyaddttime(birthcy,0,5);
					recommandtimeC='5個月';
					leastinterval=birthcy;
					leastintervalC='出生後';
				}
				if (countnextID=='MMR-1'){
					LD='';
					if (ALD==''){
						recommandtime=cyaddttime(birthcy,1,0);
						recommandtimeC='12個月';
						leastinterval=cyaddttime(birthcy,1,0);
						leastintervalC='12個月';
					} else {
						recommandtime1=cyaddttime(birthcy,1,0);
						recommandtime2=countdayslater(ALD,29);
						if (recommandtime1>recommandtime2){
							recommandtime=recommandtime1;
							leastinterval=recommandtime1;
							recommandtimeC='12個月';
							leastintervalC='12個月';
						} else {
							recommandtime=recommandtime2;
							leastinterval=recommandtime2;
							recommandtimeC='滿12個月且與'+ALDNa+'間隔28+1天';
							leastintervalC='滿12個月且與'+ALDNa+'間隔28+1天';
						}
					}
				}
				if (countnextID=='MMR-2'){
					if (applykeys.includes('MMR-1')){
						LD=applylist['MMR-1']['ID']
						if (ALD==''){
							recommandtime=cyaddttime(birthcy,5,0);
							recommandtimeC='滿5歲';
							leastinterval=countdayslater(LD,29);
							leastintervalC='隔4週(與第一劑間隔28+1天)';
						} else {
							recommandtime1=cyaddttime(birthcy,5,0);
							recommandtime2=countdayslater(ALD,29);
							if (recommandtime1>recommandtime2){
								recommandtime=recommandtime1;
								recommandtimeC='滿5歲';
							} else {
								recommandtime=recommandtime2;
								recommandtimeC='滿5歲且與'+ALDNa+'間隔28+1天';
							} 
							leastinterval1=countdayslater(ALD,29);
							leastinterval2=countdayslater(LD,29);
							if (leastinterval1>leastinterval2){
								leastinterval=leastinterval1;
								leastintervalC='隔4週(與第一劑間隔28+1天)';
							} else {
								leastinterval=leastinterval2;
								leastintervalC='與'+ALDNa+'間隔28天';
							} 
						}
					} else {
						LD='';
						recommandtime='';
						recommandtimeC='未接種第一劑';
						leastinterval='';
						leastintervalC='未接種第一劑';
					}
				}
				if (countnextID=='Var-1'){
					LD='';
					if (ALD==''){
						recommandtime=cyaddttime(birthcy,1,0);
						recommandtimeC='12個月';
						leastinterval=cyaddttime(birthcy,1,0);
						leastintervalC='12個月';
					} else {
						recommandtime1=cyaddttime(birthcy,1,0);
						recommandtime2=countdayslater(ALD,29);
						if (recommandtime1>recommandtime2){
							recommandtime=recommandtime1;
							leastinterval=recommandtime1;
							recommandtimeC='12個月';
							leastintervalC='12個月';
						} else {
							recommandtime=recommandtime2;
							leastinterval=recommandtime2;
							recommandtimeC='滿12個月且與'+ALDNa+'間隔28(+1)天';
							leastintervalC='滿12個月且與'+ALDNa+'間隔28(+1)天';
						}
					}
				}
				/*
				if (countnextID=='2HepA-1'){
					LD='';
					recommandtime=cyaddttime(birthcy,1,0);
					recommandtimeC='12個月';
					leastinterval=cyaddttime(birthcy,1,0);
					leastintervalC='12個月';
				}
				if (countnextID=='2HepA-2'){
					if (applykeys.includes('2HepA-1')){
						LD=applylist['2HepA-1']['ID']
						recommandtime1=cyaddttime(LD,0,6);
						recommandtime2=cyaddttime(birthcy,1,6);
						if (recommandtime1>recommandtime2){
							recommandtime=recommandtime1;
						} else {
							recommandtime=recommandtime2;
						}
						recommandtimeC='18個月(與第一劑間隔6個月)';
						leastinterval=cyaddttime(LD,0,6);
						leastintervalC='與第一劑間隔6個月';
					} else {
						LD='';
						recommandtime='';
						recommandtimeC='未接種第一劑';
						leastinterval='';
						leastintervalC='未接種第一劑';
					}
				}
				*/
				if (countnextID=='2HepA-1'){
					LD='';
					recommandtime=cyaddttime(birthcy,1,6);
					recommandtimeC='18個月';
					leastinterval=cyaddttime(birthcy,1,6);
					leastintervalC='18個月';
				}
				if (countnextID=='2HepA-2'){
					if (applykeys.includes('2HepA-1')){
						LD=applylist['2HepA-1']['ID']
						recommandtime1=cyaddttime(LD,0,6);
						recommandtime2=cyaddttime(birthcy,2,3);
						if (recommandtime1>recommandtime2){
							recommandtime=recommandtime1;
						} else {
							recommandtime=recommandtime2;
						}
						recommandtimeC='27個月(與第一劑間隔6個月)';
						leastinterval=cyaddttime(LD,0,6);
						leastintervalC='與第一劑間隔6個月';
					} else {
						LD='';
						recommandtime='';
						recommandtimeC='未接種第一劑';
						leastinterval='';
						leastintervalC='未接種第一劑';
					}
				}
				if (countnextID=='JE-CV_LiveAtd-1'){
					LD='';
					if (ALD==''){
						recommandtime=cyaddttime(birthcy,1,3);
						recommandtimeC='15個月';
						leastinterval=cyaddttime(birthcy,1,0);
						leastintervalC='12個月';
					} else {
						recommandtime1=cyaddttime(birthcy,1,3);
						recommandtime2=countdayslater(ALD,29);
						if (recommandtime1>recommandtime2){
							recommandtime=recommandtime1;
							recommandtimeC='15個月';
						} else {
							recommandtime=recommandtime2;
							recommandtimeC='滿15個月且與'+ALDNa+'間隔28+1天';
						}
						leastinterval1=cyaddttime(birthcy,1,0);
						leastinterval2=countdayslater(ALD,29);
						if (leastinterval1>leastinterval2){
							leastinterval=leastinterval1;
							leastintervalC='12個月';
						} else {
							leastinterval=leastinterval2;
							leastintervalC='滿12個月且與'+ALDNa+'間隔28+1天';;
						} 
					}
				}
				if (countnextID=='JE-CV_LiveAtd-2'){
					if (applykeys.includes('JE-CV_LiveAtd-1')){
						LD=applylist['JE-CV_LiveAtd-1']['ID']
						if (ALD==''){
							recommandtime1=cyaddttime(LD,1,0);
							recommandtime1=countdayslater(recommandtime1,1);
							recommandtime2=cyaddttime(birthcy,2,3);
							recommandtime2=countdayslater(recommandtime2,1);
							if (recommandtime1>recommandtime2){
								recommandtime=recommandtime1;
							} else {
								recommandtime=recommandtime2;
							}
							recommandtimeC='27個月+1天(與第一劑間隔12個月+1天)';
							leastinterval=cyaddttime(LD,1,0);
							leastinterval=countdayslater(leastinterval,1);
							leastintervalC='與第一劑間隔12個月+1天';
						} else {
							recommandtime1=cyaddttime(LD,1,0);
							recommandtime1=countdayslater(recommandtime1,1);
							recommandtime2=countdayslater(ALD,29);
							if (recommandtime1>recommandtime2){
								recommandtime=recommandtime1;
								recommandtimeC='27個月+1天(與第一劑間隔12個月+1天)';
							} else {
								recommandtime=recommandtime2;
								recommandtimeC='第一劑間隔12個月+1天且與'+ALDNa+'間隔28+1天';
							} 
							leastinterval1=cyaddttime(LD,1,0);
							leastinterval1=countdayslater(leastinterval1,1);
							leastinterval2=countdayslater(ALD,29);
							if (leastinterval1>leastinterval2){
								leastinterval=leastinterval1;
								leastintervalC='與第一劑間隔12個月+1天';
							} else {
								leastinterval=leastinterval2;
								leastintervalC='與第一劑間隔12個月+1天且與'+ALDNa+'間隔28天';
							} 
						}
					} else {
						LD='';
						recommandtime='';
						recommandtimeC='未接種第一劑';
						leastinterval='';
						leastintervalC='未接種第一劑';
					}
				}
				if (countnextID=='DTaP-IPV-5'){
					LD='';
					recommandtime=cyaddttime(birthcy,5,0);
					recommandtimeC='滿5歲';
					leastinterval=cyaddttime(birthcy,4,0);
					leastintervalC='滿4歲';
				}
				temparray={};
				temparray.name=countnextID;
				temparray.LD=LD;
				temparray.recommandtime=recommandtime;
				temparray.recommandtimeC=recommandtimeC;
				temparray.leastinterval=leastinterval;
				temparray.leastintervalC=leastintervalC;
				now0=new Date();
				nowy=now0.getFullYear();
				nowm=now0.getMonth()+1;
				nowd=now0.getDate();
				nowm= nowm.toString().padStart(2, '0');
				nowd= nowd.toString().padStart(2, '0');
				now=new Date(nowy.toString()+'-'+nowm.toString()+'-'+nowd.toString()+"T15:00:00.000Z");
				if (now>=new Date(leastinterval)){
					thevacpro=vacnameprolist[countnextID]
					pass=true
					for (zz=0;zz<thevacpro.length;zz++){
						apro=Math.ceil(applypro[thevacpro[zz]]);
						npro=Math.ceil(needpro[thevacpro[zz]]);
						if (apro<npro){
							pass=false
						}
					}
					if (pass){
						if (now>=new Date(recommandtime)){
							temparray.allsug='?_O';
							temparray.allsugC='請檢查是否有接種替代疫苗，若無建議接種';
						} else {
							temparray.allsug='?_▲';
							temparray.allsugC='請檢查是否有接種替代疫苗，若無可接種(符合最短間隔)';
						}
					} else {
						if (now>=new Date(recommandtime)){
							temparray.allsug='O';
							temparray.allsugC='建議接種';
						} else {
							temparray.allsug='▲';
							temparray.allsugC='僅符合最短接種時程';
						}
					}
				} else {
					temparray.allsug='X';
					temparray.allsugC='不符合接種時程';
				}
				return temparray
			} 
		}
		function countvacpro(array){
		vacpro={}
		for (aa=0;aa<vacprolist.length;aa++){
			vacpro[vacprolist[aa]]=0;
		}
		for (ab=0;ab<array.length;ab++){
			thevacname=array[ab];
			if (Object.keys(vacnameprolist).includes(thevacname)){
				thevacprolist=vacnameprolist[thevacname];
				if (["JE-1","JE-2","JE-3","JE-4","JE-VC_Inactd-1","JE-VC_Inactd-2","JE-VC_Inactd-3","JE-VC_Inactd-4"].includes(thevacname)){
					vproc=0.3;
				} else {
					vproc=1;
				}
				for (ac=0;ac<thevacprolist.length;ac++){
					vacpro[thevacprolist[ac]]+=vproc;
				}
			}
		}
		return vacpro
	}
	function countflu(result,birth){
		now=new Date();
		nowy=now.getFullYear();
		nowm=now.getMonth()+1;
		if (nowm>=10){
			sy=nowy;
		} else {
			sy=nowy-1;
		}
		flustarttime=new Date(sy+'-10-01 ');
		old_array=countage(birth);
		monthold=(old_array[0]*12+old_array[1]+old_array[2]/30).toFixed(2)*1;
		retobj={};
		errmsg='';
		flulist=[];
		if (monthold>=6){
			for (f=0;f<result['ApplyRecord'].length;f++){
				SRVC=result['ApplyRecord'][f]['SRVC'];
				if (SRVC.includes('Flu')){
					flulist.push(result['ApplyRecord'][f]);
				}
			}
			if (flulist.length==0){
				suggest="O";
				if (monthold<108){
					errmsg='未滿9歲,需接種第二劑';
				} else {
					errmsg='不曾接種';
				}
				LD="";
				LDsite="";
			} else {
				LD=flulist[flulist.length-1]['ID'];
				LDdate=new Date(LD);
				if (LDdate>=flustarttime){
					if (flulist.length==1){
						if (monthold<108){
							if (now>=new Date(countdayslater(LDdate,28))){
								suggest="2";
								LDsite=flulist[flulist.length-1]['ON'];
								errmsg='第二劑,間隔滿28天';
							} else {
								suggest="X";
								LDsite=flulist[flulist.length-1]['ON'];
								errmsg='第二劑間隔未滿28天';
							}
						} else {
							suggest="X";
							LDsite=flulist[flulist.length-1]['ON'];
							errmsg='當年度已接種';
						}
					} else {
						suggest="X";
						LDsite=flulist[flulist.length-1]['ON'];
						errmsg='當年度已接種';
					}
				} else {
					suggest="O";
					errmsg='當年度未接種';
					LDsite=flulist[flulist.length-1]['ON'];
				}
			}
				
		} else {
			suggest="X";
			LD="";
			LDsite="";
			errmsg='未滿6個月';
		}
		retobj['suggest']=suggest;
		retobj['LD']=LD;
		retobj['LDsite']=LDsite;
		retobj['errmsg']=errmsg;
		return retobj
	}
	function countPV(result,birth){
		ageold=countageold(birth);
		PPVlist=[];
		PCVlist=[];
		for (g=0;g<result['ApplyRecord'].length;g++){
			SRVC=result['ApplyRecord'][g]['SRVC'];
			if (SRVC.includes('PPV')){
				PPVlist.push(result['ApplyRecord'][g]);
			}
			if (SRVC.includes('PCV')){
				if (countVageold(birth,result['ApplyRecord'][g]['ID'])>18){
					PCVlist.push(result['ApplyRecord'][g]);
				}
			}
		}
		if (PPVlist.length>0){
			PPVsuggest='X';
			PPVcomment='已接種過PPV';
			PPVLD=PPVlist[PPVlist.length-1]['ID'];
			PPVLDS=PPVlist[PPVlist.length-1]['ON'];
		} else {
			if (ageold>=65){
				if (PCVlist.length>0){
					PCVLD=PCVlist[PCVlist.length-1]['ID'];
					now=new Date();
					if (now>=cyaddttime(PCVLD,1,0)){
						PPVsuggest='O';
						PPVcomment='已接種過PCV13,間隔滿1年';
						PPVLD="";
						PPVLDS="";
					} else {
						PPVsuggest='X';
						PPVcomment='已接種過PCV1,間隔未滿1年';
						PPVLD="";
						PPVLDS="";
					}
				} else {
					PPVsuggest='▲';
					PPVcomment='年滿65歲,優先接種PCV13';
					PPVLD="";
					PPVLDS="";
				}
			} else if (ageold>=50 && ageold<65){
				PPVsuggest='▲';
				PPVcomment='55-64專案';
				PPVLD="";
				PPVLDS="";
			} else {
				PPVsuggest='X';
				PPVcomment='未滿50歲,無法施打PPV';
				PPVLD="";
				PPVLDS="";
			}
		}
		if (PCVlist.length>0){
			PCVsuggest='X';
			PCVcomment='已接種過PCV';
			PCVLD=PCVlist[PCVlist.length-1]['ID'];
			PCVLDS=PCVlist[PCVlist.length-1]['ON'];
		} else {
			if (ageold>=65){
				if (PPVlist.length>0){
					PPVLD=PPVlist[PPVlist.length-1]['ID'];
					now=new Date();
					if (now>=cyaddttime(PPVLD,1,0)){
						PCVsuggest='O';
						PCVcomment='已接種過PPV,間隔滿1年';
						PCVLD="";
						PCVLDS="";
					} else {
						PCVsuggest='X';
						PCVcomment='已接種過PPV,間隔未滿1年';
						PCVLD="";
						PCVLDS="";
					}
				} else {
					PCVsuggest='O';
					PCVcomment='可接種PCV';
					PCVLD="";
					PCVLDS="";
				}
			} else {
				PCVsuggest='X';
				PCVcomment='未滿65歲,無法施打PCV';
				PCVLD="";
				PCVLDS="";
			}
		}
		retobj={};
		retobj['PCV']={}
		retobj['PCV']['PCVsuggest']=PCVsuggest;
		retobj['PCV']['PCVcomment']=PCVcomment;
		retobj['PCV']['PCVLD']=PCVLD;
		retobj['PCV']['PCVLDS']=PCVLDS;
		retobj['PPV']={}
		retobj['PPV']['PPVsuggest']=PPVsuggest;
		retobj['PPV']['PPVcomment']=PPVcomment;
		retobj['PPV']['PPVLD']=PPVLD;
		retobj['PPV']['PPVLDS']=PPVLDS;
		return retobj
	}
	function countCOV(result,birth){
		old_array=countage(birth);
		monthold=(old_array[0]*12+old_array[1]+old_array[2]/30).toFixed(2)*1;
		retobj={};
		if (monthold>6){
			CoVlist=[];
			for (h=0;h<result['ApplyRecord'].length;h++){
				SRVC=result['ApplyRecord'][h]['SRVC'];
				if (SRVC.includes('CoV_')){
					CoVlist.push(result['ApplyRecord'][h]);
				}
			}
			if (CoVlist.length>0){
				theSRVC=CoVlist[CoVlist.length-1]['SRVC'];
				retobj['count']=CoVlist.length;
				COVLD=CoVlist[CoVlist.length-1]['ID'];
				retobj['LD']=COVLD;
				retobj['LDsite']=CoVlist[CoVlist.length-1]['ON'];
				retobj['LDtype']=theSRVC;
				now=new Date();
				if (now>=cyaddttime(COVLD,0,3)){
					retobj['suggest']='O';
				} else {
					retobj['suggest']='X';
				}
			
			} else {
				retobj['count']=CoVlist.length;
				retobj['LD']="";
				retobj['LDsite']="";
				retobj['LDtype']="";
				retobj['suggest']='O';
			}
		} else {
			retobj['count']=0;
			retobj['LD']="";
			retobj['LDsite']="";
			retobj['LDtype']="<6個月不接種新冠疫苗";
			retobj['suggest']='X';
		}
		
		return retobj
	}
	function getallneedvaccine(result,birth){
		returnobj={};
		returnobj['routine']=comparevaccine(result,birth);
		returnobj['flu']=countflu(result,birth);
		returnobj['PV']=countPV(result,birth);
		returnobj['CoV']=countCOV(result,birth);
		return returnobj
	}
	function getvaccinelist(pbirth,ijson){

		result=ijson;
		vaccinesug=getallneedvaccine(ijson,pbirth);
		theretobj={};
		theretobj['patientName']=thename;
		theretobj['vaccinesuggestion']=vaccinesug;
		theretobj['niisapplylist']=result;
		
		//changetoutc
		
		if (testmode){
			return theretobj
		} else {
			theretobj_string=JSON.stringify(theretobj);
			return theretobj_string
		}
	}
	
}
	function chntoinfoid(chn){
		let url = 'https://phpcis.chshb.gov.tw/api/v1/personal_infos/list?bureauRecordNo='+chn;
		let res = httpGet(url);
		let jres = JSON.parse(res);
		if (jres.result.length==1){
			return jres.result[0]
		} else {
			return false
		}
	}
	function httpGet(Url) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", Url, false );
		xmlHttp.send( null );
		return xmlHttp.responseText;
	}
	
	function showvacwindow(res,patientidbirth){
		let jres=JSON.parse(res)
		if (document.getElementById('create_niisdrag')!=null){
			document.getElementById('create_niisdrag').remove();
		}
		thewidth=610;
		theheight=500;
		borderx=20;
		bordery=150;
		var myDraggable = document.createElement('div');
		myDraggable.id='create_niisdrag';
		myDraggable.style.width = thewidth+'px';
		myDraggable.style.left=(window.innerWidth-thewidth)/2 +'px';
		
		myDraggable.style.top = bordery +'px';
		myDraggable.style.background = '#f9f9f9';
		myDraggable.style.border = '1px solid #ccc';
		myDraggable.style.position = 'absolute';
		myDraggable.style.zIndex = '9999';
		
		let my=patientidbirth.substring(0,3);
		let mm=patientidbirth.substring(3,5);
		let md=patientidbirth.substring(5,7);
		let agey=new Date().getFullYear()-1911-my;
		let agem=new Date().getMonth()+1-mm;
		let aged=new Date().getDate()-md;
		if (aged<0){
			agem-=1;
			aged+=30;
		}
		if (agem<0){
			agey-=1;
			agem+=12;
		}
		let agec="";
		if (agey==0){
			agec=agem+'月'+aged+'天';
		} else {
			agec=agey+'歲'+agem+'月'+aged+'天';
		}
		let xx=2;
		let yy=2;
		let bb=2;
		div_name = addtext(xx,yy,40,25);
		div_name.textContent='姓名:';
		xx=xx+40+bb;
		div_name = addtext(xx,yy,500,25);
		div_name.textContent=jres.patientName+"("+agec+")";
		div_name.style.textAlign='left';
		
		div_exit = addbutton(585,yy,25,25);
		div_exit.textContent='X';
		div_exit.addEventListener('click',function() {
			if (document.getElementById('create_niisdrag')!=null){
				document.getElementById('create_niisdrag').remove();
			}
		});
		xx=xx+40+bb;
		xx=2
		yy+=25
		div_flu = addtext(xx,yy,40,25);
		div_flu.textContent='flu:';
		div_flu.style.textAlign='right';
		xx=xx+40+bb;
		div_fluc = addtext(xx,yy,110,25);
		div_fluc.textContent=cytomky(jres.vaccinesuggestion.flu.LD)+"("+jres.vaccinesuggestion.flu.suggest+")";
		div_fluc.style.textAlign='left';
		if (jres.vaccinesuggestion.flu.suggest=="O" || jres.vaccinesuggestion.flu.suggest=="2"){
			div_fluc.style.color="blue";
		}
		div_fluc.title=jres.vaccinesuggestion.flu.errmsg+"\n上次接種時間:"+cytomky(jres.vaccinesuggestion.flu.LD)+"\n上次接種地點:"+jres.vaccinesuggestion.flu.LDsite;
		xx=xx+110+bb;
		div_PPV = addtext(xx,yy,40,25);
		div_PPV.textContent='PPV:';
		div_PPV.style.textAlign='right';
		xx=xx+40+bb;
		div_PPVc = addtext(xx,yy,110,25);
		div_PPVc.textContent=cytomky(jres.vaccinesuggestion.PV.PPV.PPVLD)+"("+jres.vaccinesuggestion.PV.PPV.PPVsuggest+")";
		div_PPVc.style.textAlign='left';
		if (jres.vaccinesuggestion.PV.PPV.PPVsuggest=="O"){
			div_PPVc.style.color="blue";
		}
		div_PPVc.title=jres.vaccinesuggestion.PV.PPV.PPVcomment+"\n上次接種時間:"+cytomky(jres.vaccinesuggestion.PV.PPV.PPVLD)+"\n上次接種地點:"+jres.vaccinesuggestion.PV.PPV.PPVLDS;
		xx=xx+110+bb;
		div_PCV = addtext(xx,yy,40,25);
		div_PCV.textContent='PCV:';
		div_PCV.style.textAlign='right';
		xx=xx+40+bb;
		div_PCVc = addtext(xx,yy,110,25);
		div_PCVc.textContent=cytomky(jres.vaccinesuggestion.PV.PCV.PCVLD)+"("+jres.vaccinesuggestion.PV.PCV.PCVsuggest+")";
		div_PCVc.style.textAlign='left';
		if (jres.vaccinesuggestion.PV.PCV.PCVsuggest=="O"){
			div_PCVc.style.color="blue";
		}
		div_PCVc.title=jres.vaccinesuggestion.PV.PCV.PCVcomment+"\n上次接種時間:"+cytomky(jres.vaccinesuggestion.PV.PCV.PCVLD)+"\n上次接種地點:"+jres.vaccinesuggestion.PV.PCV.PCVLDS;
		xx=xx+110+bb;
		div_COV = addtext(xx,yy,40,25);
		div_COV.textContent='COV:';
		div_COV.style.textAlign='right';
		xx=xx+40+bb;
		div_COVc = addtext(xx,yy,110,25);
		div_COVc.textContent=cytomky(jres.vaccinesuggestion.CoV.LD)+"("+jres.vaccinesuggestion.CoV.suggest+")";
		div_COVc.style.textAlign='left';
		if (jres.vaccinesuggestion.CoV.suggest=="O"){
			div_COVc.style.color="blue";
		}
		div_COVc.title="共接種"+jres.vaccinesuggestion.CoV.count+"劑\n上次接種時間:"+cytomky(jres.vaccinesuggestion.CoV.LD)+"\n上次接種地點:"+jres.vaccinesuggestion.CoV.LDsite;
		xx=2
		yy+=25
		div_ti = addtext(xx,yy,500,25);
		div_ti.textContent='1. 疫苗接種紀錄'
		div_ti.style.textAlign='left';
		yy+=25
		tab_his = addtable(xx,yy,600,150,["劑次","日期","地點"]);
		for (let i=0;i<jres.niisapplylist.ApplyRecord.length;i++){
			let newrow = tab_his.insertRow(1);
			let rec=jres.niisapplylist.ApplyRecord[i];
			let rowdata=[rec.SRVC,cytomky(rec.ID),rec.ON];
			for (let j=0;j<rowdata.length;j++){
				let newcell = document.createElement('td');
				newcell.style.border = "1px solid #ddd";
				newcell.style.minWidth = "100px";
				newcell.style.whiteSpace = "nowrap";
				newcell.textContent = rowdata[j];
				newrow.appendChild(newcell);
			}
		}
		yy+=150
		div_ti = addtext(xx,yy,500,25);
		div_ti.textContent='2. 應接種疫苗'
		div_ti.style.textAlign='left';
		yy+=25
		tab_rou = addtable(xx,yy,600,150,['常規疫苗','上次接種','檢核','建議接種時間','最小接種時間']);
		needkeys=Object.keys(jres.vaccinesuggestion.needtoapply);
		for (let i=0;i<needkeys.length;i++){
			let needv=jres.vaccinesuggestion.needtoapply[needkeys[i]];
			let newrow = document.createElement('tr');
			let rowdata=[needv.name,cytomky(needv.LD),needv.allsug,cytomky(needv.recommandtime),cytomky(needv.leastinterval)];
			for (let j=0;j<rowdata.length;j++){
				let newcell = document.createElement('td');
				newcell.style.border = "1px solid #ddd";
				newcell.style.minWidth = "100px";
				newcell.style.whiteSpace = "nowrap";
				newcell.textContent = rowdata[j];
				if (j==2){
					newcell.title=needv.allsugC;
				} else if (j==3){
					newcell.title=needv.recommandtimeC;
				} else if (j==4){
					newcell.title=needv.leastintervalC;
				}
				newrow.appendChild(newcell);
			}
			tab_rou.appendChild(newrow);
		}
		yy+=155
		nextkeys=Object.keys(jres.vaccinesuggestion.nexttoapply);
		nexttxt=addtext(xx,yy,600,25);
		nexttxt.style.textAlign='left';
		if (nextkeys.length==0){
			nexttxt.textContent="已完成常規疫苗"
			nexttxt.style.color="blue";
		} else {
			nexttxt.textContent="未完成常規疫苗"
			nexttxt.style.color="red";
			for (let i=0;i<nextkeys.length;i++){
				yy+=25
				let newnv=jres.vaccinesuggestion.nexttoapply[nextkeys[i]];
				let newtxt=addtext(xx,yy,600,25);
				newtxt.style.textAlign='left';
				newtxt.textContent=newnv.name+"，建議:"+cytomky(newnv.recommandtime)+"，最短:"+cytomky(newnv.leastinterval);
				let tisug='上次接種日期: '+cytomky(newnv.LD);
				tisug=tisug+'\n建議接種時程: ' + cytomky(newnv.recommandtime);
				tisug=tisug+'\n建議時程說明: ' + newnv.recommandtimeC;
				tisug=tisug+'\n最短接種時程: ' + cytomky(newnv.leastinterval);
				tisug=tisug+'\n最短時程說明: ' + newnv.leastintervalC;
				newtxt.title=tisug;
			}
		}
		yy+=30;
		myDraggable.style.height = yy+'px';
		document.body.insertBefore(myDraggable,document.body.firstChild);
	
		
		function addtext(xx,yy,ww,hh){
			let div=document.createElement('div');
			div.style.width = ww+'px';
			div.style.height = hh+'px';
			div.style.left = xx+'px';
			div.style.top = yy+'px';
			div.style.position = 'absolute';
			div.style.textAlign='center';
			myDraggable.appendChild(div);
			return div
		}
		function addbutton(xx,yy,ww,hh){
			let div=document.createElement('button');
			div.style.width = ww+'px';
			div.style.height = hh+'px';
			div.style.left = xx+'px';
			div.style.top = yy+'px';
			div.style.position = 'absolute';
			div.style.textAlign='center';
			myDraggable.appendChild(div);
			return div
		}
		
		function addtable(xx,yy,ww,hh,title){
			let div=document.createElement("div");
			div.style.borderCollapse = "collapse";
			div.style.width = ww+'px';
			div.style.height = hh+'px';
			div.style.left = xx+'px';
			div.style.top = yy+'px';
			div.style.position = 'absolute';
			div.style.textAlign='center';
			div.style.overflowY = "auto";
			div.style.overflowX = "scroll";
			div.style.border = "1px solid";

			let table = document.createElement('table');
			let thead = document.createElement('thead');
			let headerRow = document.createElement('tr');
			for (let i=0;i<title.length;i++){
				let headerCell1 = document.createElement('th');
				headerCell1.textContent = title[i];
				headerCell1.style.border = "1px solid #ddd";
				headerCell1.style.backgroundColor = "#f2f2f2";
				headerCell1.style.minWidth = "100px";
				headerCell1.style.textAlign = "center";
				headerCell1.style.whiteSpace = "nowrap";
				headerCell1.style.position = "sticky";
				headerCell1.style.top = "0";
				headerRow.appendChild(headerCell1);
			}
			
			thead.appendChild(headerRow);
			table.appendChild(thead);
			div.appendChild(table);
			myDraggable.appendChild(div);
			return table
		}
		function cytomky(cy){
			if (cy==""){
				return "不曾"
			}
			try {
				cyd=new Date(cy);
				cyy=cyd.getFullYear()-1911;
				cym=cyd.getMonth()+1;
				cyd=cyd.getDate();
				mky="000"+cyy;
				mky=mky.substring(mky.length-3,mky.length);
				mkm="00"+cym;
				mkm=mkm.substring(mkm.length-2,mkm.length);
				mkd="00"+cyd;
				mkd=mkd.substring(mkd.length-2,mkd.length);
				mkdate=mky+mkm+mkd;
				return mkdate
			} catch (e) {
				return cy
			}
		}
	}

}

function gotourl(url){
	window.history.pushState({}, '', '/peSetting');
	window.dispatchEvent(new PopStateEvent('popstate'));
	window.history.pushState({}, '', url);
	window.dispatchEvent(new PopStateEvent('popstate'));
}


function addprintbutton(){
	let ccc=document.URL;
	if (ccc.includes('https://phpcis.chshb.gov.tw/consultationMainPage/')){
		let heprintbutton=document.getElementById('heprint');
		if (heprintbutton==null){
			const buttons = document.querySelectorAll('button');
			const targetButton = Array.from(buttons).find(button => button.textContent.trim() === "帶入問卷預設值");
			if (targetButton) {
				const toolbaritem=targetButton.parentElement;
				heprintbutton=document.createElement('button')
				heprintbutton.id='heprint';
				heprintbutton.textContent="列印成健報告";
				heprintbutton.className='btn btn-success';
				heprintbutton.addEventListener('click', heprintbutton_handle);
				toolbaritem.appendChild(heprintbutton)
				genbbb();
			} else {
				alert('請打開預防保健視窗')
			}
		} 
	} 
}
function heprintbutton_handle(){
	let aaa=grabdata();
	let cont=true;
	if (aaa.errmsg!=""){
		cont=false;
		cont=confirm("錯誤訊息\n"+aaa.errmsg+"是否繼續?");
	}
	if (cont){
		let bbb=JSON.stringify(aaa);
		showbbb(bbb);
	}
}
function showbbb(str){
	let printHEwindow=document.getElementById("printHEwindow");
	printHEwindow.contentWindow.genhe(str);
	printHEwindow.contentWindow.print();
}
function genbbb(){
	let htmls=String.raw`
	<!DOCTYPE html>
<html lang="zh-Hant">
	<head>
        <title>和美鎮衛生所成人預防保健服務檢查單</title>
        <style>
            html {font-family:"微軟正黑體";}
			@media print{html, body{width: 210mm; min-height: 297mm; margin: 0; padding: 0;.nopirnt {display: none;}} 
			.page-break{display: block; page-break-after: always;}
			.page-break2{display: none;}*{-webkit-print-color-adjust: exact;} } 
			@media screen{body{background: white; width: 210mm; min-height: 297mm; margin: 20px auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);} }
			.nopirnt {font-size: 20px;}
			.noshow {display: none !important;}
			.page-break2{height: 10px;background-color: rgba(0, 0, 0, 0.5);}
            .he_information{margin-left:5%; width: 90%; border: 2px solid black; }
            .he_title{font-size: 28px; text-align: center;}
            .he_basic {width: 100%; border-collapse: collapse; font-family:"微軟正黑體";font-size:14px;}
			.he_basic th, .he_basic td { border: 1px solid black; padding: 2px; text-align: center;}
        </style>
    </head>
    <body>
        <div class="he_title">
            <span id="sitetitle"></span>
        </div>
        <div class="he_information">
            <table class="he_basic">
                <tr>
                    <td rowspan="2" style="width: 10%;font-weight: bold; font-size:16px;">基本<br>資料</td>
                    <td style="width: 10%;">姓名</td>
                    <td style="width: 20%;" id="name"></td>
                    <td style="width: 10%;">性別</td>
                    <td style="width: 20%;" id="gender"></td>
                    <td rowspan="2" style="width: 10%;">服務日</td>
                    <td rowspan="2" style="width: 20%;" id="visitdate"></td>
                </tr>
                <tr>
                    <td>生日</td>
                    <td id="birth"></td>
                    <td>學歷</td>
                    <td id="education"></td>
                </tr>
            </table>
            <table class="he_basic">
                <tr>
                    <td style="width: 10%;font-weight: bold; font-size:16px;">疾病史</td>
                    <td style="text-align:left; width: 90%;" id="disease"></td>
                </tr>
            </table>
            <table class="he_basic">
                <tr>
                    <td style="width: 10%;font-weight: bold; font-size:16px;">家族史</td>
                    <td style="text-align:left; width: 90%;" id="fd"></td>
                </tr>
            </table>
            <table class="he_basic">
                <tr>
                    <td rowspan="5" style="width: 10%;font-weight: bold; font-size:16px;">健<br>康<br>行<br>為</td>
                    <td style="width: 30%;">近半年吸菸情況</td>
                    <td style="width: 60%;" id="smoke"></td>
                </tr>
                <tr>
                    <td style="width: 30%;">近半年喝酒情況</td>
                    <td style="width: 60%;" id="alcohol"></td>
                </tr>
                <tr>
                    <td style="width: 30%;">近半年嚼檳榔情況</td>
                    <td style="width: 60%;" id="betel"></td>
                </tr>
                <tr>
                    <td style="width: 30%;">近二週運動情況</td>
                    <td style="width: 60%;" id="exercise"></td>
                </tr>
                <tr>
                    <td style="width: 30%;">是否咳嗽超過二週</td>
                    <td style="width: 60%;" id="cough"></td>
                </tr>
            </table>
            <table class="he_basic">
                <tr>
                    <td rowspan="2" style="width: 10%;font-weight: bold; font-size:16px;">憂鬱<br>檢測</td>
                    <td style="width: 60%;">近兩周是否感覺情緒低落、沮喪或沒有希望?</td>
                    <td style="width: 30%;" id="depression1"></td>
                </tr>
                <tr>
                    <td style="width: 60%;">近兩周是否感覺做事情失去興趣或樂趣?</td>
                    <td style="width: 30%;" id="depression2"></td>
                </tr>
            </table>
            <table class="he_basic">
                <tr>
                    <td rowspan="4" style="width: 10%;font-weight: bold; font-size:16px;">身<br>體<br>檢<br>查</td>
                    <td style="width: 10%;">身高</td>
                    <td colspan="2" style="width: 20%;" id="height"></td>
                    <td style="width: 10%;">體重</td>
                    <td colspan="2" style="width: 20%;" id="weight"></td>
                    <td style="width: 10%;">腰圍</td>
                    <td colspan="2" style="width: 20%;" id="waist"></td>
                </tr>
                <tr>
                    <td style="width: 10%;">血壓</td>
                    <td colspan="2" style="width: 20%;" id="BP"></td>
                    <td style="width: 10%;">脈搏</td>
                    <td colspan="2" style="width: 20%;" id="pulse"></td>
                    <td style="width: 10%;">BMI</td>
                    <td colspan="2" style="width: 20%;" id="bmi"></td>
                </tr>
                <tr>
                    <td style="width: 10%;">視力</td>
                    <td colspan="2" style="width: 20%;">左眼</td>
                    <td colspan="2" style="width: 20%;" id="lefteye"></td>
                    <td colspan="2" style="width: 20%;">右眼</td>
                    <td colspan="2" style="width: 20%;" id="righteye"></td>
                </tr>
                <tr>
                    <td colspan="2" style="width: 20%;">理學檢查</td>
                    <td colspan="7" style="text-align:left; width: 70%;" id="PE"></td>
                </tr>
            </table>
            <table class="he_basic">
                <tr>
                    <td rowspan="13" style="width: 10%;font-weight: bold; font-size:16px;">實<br>驗<br>室<br>檢<br>查</td>
                    <td style="width: 20%;">飯前血糖</td>
                    <td style="width: 20%;" id="AC"></td>
                    <td style="width: 20%;" >mg/dl</td>
                    <td style="text-align:left; width: 30%;">(參考值: &lt;100)</td>
                </tr>
                <tr>
                    <td style="width: 20%;">總膽固醇</td>
                    <td style="width: 20%;" id="TC"></td>
                    <td style="width: 20%;" >mg/dl</td>
                    <td style="text-align:left; width: 30%;">(參考值: &lt;200)</td>
                </tr>
                <tr>
                    <td style="width: 20%;">三酸甘油脂</td>
                    <td style="width: 20%;" id="TG"></td>
                    <td style="width: 20%;" >mg/dl</td>
                    <td style="text-align:left; width: 30%;">(參考值: &lt;150)</td>
                </tr>
                <tr>
                    <td style="width: 20%;">高密度膽固醇(好)</td>
                    <td style="width: 20%;" id="HDL"></td>
                    <td style="width: 20%;" >mg/dl</td>
                    <td style="text-align:left; width: 30%;">(參考值: 男性≧40；女性≧50)</td>
                </tr>
                <tr>
                    <td style="width: 20%;">低密度膽固醇(壞)</td>
                    <td style="width: 20%;" id="LDL"></td>
                    <td style="width: 20%;" >mg/dl</td>
                    <td style="text-align:left; width: 30%;">(參考值: &lt;130)</td>
                </tr>
                <tr>
                    <td style="width: 20%;">AST(GOT)(肝)</td>
                    <td style="width: 20%;" id="GOT"></td>
                    <td style="width: 20%;" >mg/dl</td>
                    <td style="text-align:left; width: 30%;">(參考值: &lt;40)</td>
                </tr>
                <tr>
                    <td style="width: 20%;">ALT(GPT)(肝)</td>
                    <td style="width: 20%;" id="GPT"></td>
                    <td style="width: 20%;" >mg/dl</td>
                    <td style="text-align:left; width: 30%;">(參考值: &lt;40)</td>
                </tr>
                <tr>
                    <td style="width: 20%;">肌酐酸(腎)</td>
                    <td style="width: 20%;" id="CRE"></td>
                    <td style="width: 20%;" >mg/dl</td>
                    <td style="text-align:left; width: 30%;">(參考值: &lt;1.3)</td>
                </tr>
                <tr>
                    <td style="width: 20%;">腎絲球過濾率</td>
                    <td style="width: 20%;" id="GFR"></td>
                    <td style="width: 20%;" >ml/min/1.73m2</td>
                    <td style="text-align:left; width: 30%;">(參考值: ≧60)</td>
                </tr>
                <tr>
                    <td style="width: 20%;">尿蛋白</td>
                    <td style="width: 20%;" id="UP"></td>
                    <td style="width: 20%;" >mg/dl</td>
                    <td style="text-align:left; width: 30%;">(參考值: &lt;15)</td>
                </tr>
                <tr>
                    <td style="width: 20%;">尿酸</td>
                    <td style="width: 20%;" id="UA"></td>
                    <td style="width: 20%;" >mg/dl</td>
                    <td style="text-align:left; width: 30%;">(參考值: &lt;7)</td>
                </tr>
                <tr>
                    <td style="width: 20%;">B型肝炎表面抗原</td>
                    <td style="width: 20%;" id="HBV"></td>
                    <td style="width: 20%;" ></td>
                    <td style="text-align:left; width: 30%;">(參考值: 陰性)</td>
                </tr>
                <tr>
                    <td style="width: 20%;">C型肝炎抗體</td>
                    <td style="width: 20%;" id="HCV"></td>
                    <td style="width: 20%;" ></td>
                    <td style="text-align:left; width: 30%;">(參考值: 陰性)</td>
                </tr>
            </table>
            <table class="he_basic">
                <tr>
                    <td rowspan="2" style="width: 10%;font-weight: bold; font-size:16px;">健康<br>諮詢</td>
                    <td style="text-align:left; width: 18%;" id="HE_0">☐ 戒菸</td>
                    <td style="text-align:left; width: 18%;" id="HE_1">☐ 節酒</td>
                    <td style="text-align:left; width: 18%;" id="HE_2">☐ 戒檳榔</td>
                    <td style="text-align:left; width: 18%;" id="HE_3">☐ 規律運動</td>
                    <td style="text-align:left; width: 18%;" id="HE_4">☐ 維持正常體重</td>
                </tr>
                <tr>
                    <td style="text-align:left; width: 18%;" id="HE_5">☑ 健康飲食</td>
                    <td style="text-align:left; width: 18%;" id="HE_6">☐ 事故傷害預防</td>
                    <td style="text-align:left; width: 18%;" id="HE_7">☐ 口腔保健</td>
                    <td style="text-align:left; width: 18%;" id="HE_8">☐ 慢性病風險評估</td>
                    <td style="text-align:left; width: 18%;" id="HE_9">☐ 腎病識能衛教</td>
                </tr>
            </table>
            <table class="he_basic">
                <tr>
                    <td rowspan="2" style="width: 10%;font-weight: bold; font-size:16px;">慢性病<br>風險評估</td>
                    <td style="width: 20%;">冠心病</td>
                    <td style="width: 10%;" id="R_CAD"></td>
                    <td style="width: 20%;">糖尿病</td>
                    <td style="width: 10%;" id="R_DM"></td>
                    <td style="width: 20%;">高血壓</td>
                    <td style="width: 10%;" id="R_HTN"></td>
                </tr>
                <tr>
                    <td style="width: 20%;">腦中風</td>
                    <td style="width: 10%;" id="R_CVA"></td>
                    <td style="width: 20%;">心血管不良事件</td>
                    <td style="width: 10%;" id="R_MACE"></td>
                    <td colspan="2" style="background:gray; width: 30%;"></td>
                </tr>
            </table>
            <table class="he_basic">
                <tr>
                    <td rowspan="11" style="width: 10%;font-weight: bold; font-size:16px;">檢<br>查<br>結<br>果<br>與<br>建<br>議</td>
                    <td style="width: 20%;">血壓</td>
                    <td style="text-align:left; width: 70%;" id="HE_BP"></td>
                </tr>
                <tr>
                    <td style="width: 20%;">飯前血糖</td>
                    <td style="text-align:left; width: 70%;" id="HE_AC"></td>
                </tr>
                <tr>
                    <td style="width: 20%;">血脂肪</td>
                    <td style="text-align:left; width: 70%;" id="HE_LIP"></td>
                </tr>
                <tr>
                    <td style="width: 20%;">腎功能</td>
                    <td style="text-align:left; width: 70%;" id="HE_CKD"></td>
                </tr>
                <tr>
                    <td style="width: 20%;">肝功能</td>
                    <td style="text-align:left; width: 70%;" id="HE_HEP"></td>
                </tr>
                <tr>
                    <td style="width: 20%;">代謝症候群</td>
                    <td style="text-align:left; width: 70%;" id="HE_META"></td>
                </tr>
                <tr>
                    <td style="width: 20%;">B型肝炎表面抗原</td>
                    <td style="text-align:left; width: 70%;" id="HE_HBV"></td>
                </tr>
                <tr>
                    <td style="width: 20%;">C型肝炎抗體</td>
                    <td style="text-align:left; width: 70%;" id="HE_HCV"></td>
                </tr>
                <tr>
                    <td style="width: 20%;">咳嗽症狀</td>
                    <td style="text-align:left; width: 70%;" id="HE_cough"></td>
                </tr>
                <tr>
                    <td style="width: 20%;">憂鬱檢測</td>
                    <td style="text-align:left; width: 70%;" id="HE_dep"></td>
                </tr>
            </table>
            <table class="he_basic">
                <tr>
                    <td colspan="2" style="width: 20%;font-weight: bold; font-size:16px;">若需追蹤請於3~6個月後上午空腹至門診掛號抽血追蹤</td>
                </tr>
                <tr>
                    <td style="width: 20%;font-weight: bold; font-size:16px;" id="clinicinfo"></td>
                    <td style="width: 20%;font-weight: bold; font-size:16px;" id="docinfo"></td>
                </tr>
            </table>
        </div>
        <script>
            function genhe(st){
                let o=JSON.parse(st);
                let keylist=Object.keys(o);
                for (let i=0;i<keylist.length;i++){
                    let key=keylist[i];
                    if (document.getElementById(key)){
                        document.getElementById(key).innerHTML=o[key]
                    }
                }
                document.getElementById("BP").textContent=o.sbp+" / "+o.dbp;
                let helist=["戒菸","節酒","戒檳","規律運動","維持正常體重","健康飲食","事故傷害預防","口腔保健","慢性疾病風險評估","腎病識能衛教指導"]
                for (let i=0;i<helist.length;i++){
                    let item=helist[i];
                    let it=document.getElementById("HE_"+i);
                    if (o.HE.includes(item)){
                        it.textContent="☑ "+item.replace("疾","").replace("指導","")
                    } else {
                        it.textContent="☐ "+item.replace("疾","").replace("指導","")
                    }
                }
                document.getElementById('lefteye').textContent=o.vision.left.type+":"+o.vision.left.value;
                document.getElementById('righteye').textContent=o.vision.right.type+":"+o.vision.right.value;
            }

        </script>
    </body>
</html>
	`
	printHEwindow=document.createElement("iframe");
	printHEwindow.srcdoc=htmls;
	printHEwindow.id="printHEwindow";
	printHEwindow.style.display='none';
	document.body.appendChild(printHEwindow);
}
function phpciisdatetomky(phpciisdate,spiliter){
	let date=phpciisdate.split(' ')[1];
	let yy=date.split('-')[0]*1-1911;
	let resu=yy+spiliter+date.split('-')[1]+spiliter+date.split('-')[2];
	return resu
}
function grabdata(){
	let retobj={};
	retobj.name=document.querySelector("body > div.fade.modal.show > div > div > div.modal-body > form > div:nth-child(2) > div:nth-child(2) > div > label.text-left.commonFormlabel.form-label.col-form-label.col-lg-6").textContent;
	retobj.gender=document.querySelector("body > div.fade.modal.show > div > div > div.modal-body > form > div:nth-child(2) > div:nth-child(3) > div > label.text-left.commonFormlabel.form-label.col-form-label.col-lg-4").textContent;
	let visitdate=document.querySelector("body > div.fade.modal.show > div > div > div.modal-body > form > div:nth-child(4) > div:nth-child(2) > div > div > div > div > input").value;
	retobj.visitdate=phpciisdatetomky(visitdate,"-");
	let birth=document.querySelector("body > div.fade.modal.show > div > div > div.modal-body > form > div:nth-child(1) > div:nth-child(4) > div > div > div > div > input").value;
	retobj.birth=phpciisdatetomky(birth,"-");
	const eduarray=['education',"無","小學","國(初)中","高中(職)","專科大學","研究所以上","拒答"];
	for (let i=1;i<eduarray.length;i++){
		if (document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(2) > input[type=checkbox]:nth-child("+i+")").checked){
			retobj.education=eduarray[i];
		}
	}
	let disease="";
	const diseaselist1=["disease1","高血壓","糖尿病","高血脂","心臟病","腦中風","小兒麻痺"]
	for (let i=1;i<diseaselist1.length;i++){
		if (document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(3) > input[type=checkbox]:nth-child("+(2*i-1)+")").checked){
			disease=disease+diseaselist1[i]+",";
		}
	}
	const diseaselist2=["disease2","腎臟病","B型肝炎","C型肝炎","精神疾病","癌症"];
	for (let i=1;i<diseaselist2.length;i++){
		if (document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(4) > input[type=checkbox]:nth-child("+(2*i-1)+")").checked){
			disease=disease+diseaselist2[i]+",";
		}
	}
	if (disease!=""){
		disease=disease.substring(0,disease.length-1);
	} else {
		disease="無";
	}
	retobj.disease=disease;
	let fd="";
	const fd1=["fd1","高血壓","糖尿病","高血脂症","心臟病"];
	for (let i=1;i<fd1.length;i++){
		if (document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(6) > input[type=checkbox]:nth-child("+(2*i-1)+")").checked){
			fd=fd+fd1[i]+",";
		}
	}
	const fd2=["fd2","腦中風","精神疾病","癌症"];
	for (let i=1;i<fd2.length;i++){
		if (document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(6) > input[type=checkbox]:nth-child("+(2*i-1)+")").checked){
			fd=fd+fd2[i]+",";
		}
	}
	if (fd!=""){
		fd=fd.substring(0,fd.length-1);
	} else {
		fd="無";
	}
	retobj.fd=fd;
	const smokelist=["smoke","不吸菸","朋友敬菸或應酬才吸菸","平均一天約吸一包","平均一天約吸一包以上"];
	for (let i=1;i<smokelist.length;i++){
		if (document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(9) > input[type=checkbox]:nth-child("+i+")").checked){
			retobj.smoke=smokelist[i];
		}
	}
	const alcohollist=["alcohol","不喝酒","偶爾喝酒或應酬才喝","經常喝酒"];
	for (let i=1;i<alcohollist.length;i++){
		if (document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(11) > input[type=checkbox]:nth-child("+i+")").checked){
			retobj.alcohol=alcohollist[i];
		}
	}
	const betellist=["betel","不嚼檳榔","偶爾會嚼或應酬才嚼","經常嚼"];
	for (let i=1;i<betellist.length;i++){
		if (document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(13) > input[type=checkbox]:nth-child("+i+")").checked){
			retobj.betel=betellist[i];
		}
	}
	const exerciselist=["exercise","沒有","有，但未達每週150分鐘以上(2.5小時)","有，且每週達150分鐘以上(2.5小時)"];
	for (let i=1;i<exerciselist.length;i++){
		if (document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(15) > input[type=checkbox]:nth-child("+i+")").checked){
			retobj.exercise=exerciselist[i];
		}
	}
	if (document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(16) > input[type=checkbox]:nth-child(2)").checked){
		retobj.cough="沒有";
	} else {
		retobj.cough="有";
	}
	if (document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(17) > input[type=checkbox]:nth-child(2)").checked){
		retobj.depression1="沒有";
	} else {
		retobj.depression1="有";
	}
	if (document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(18) > input[type=checkbox]:nth-child(2)").checked){
		retobj.depression2="沒有";
	} else {
		retobj.depression2="有";
	}
	retobj.height=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(2) > input[type=number]:nth-child(1)").value;
	retobj.weight=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(2) > input[type=number]:nth-child(3)").value;
	retobj.bmi=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(4) > input[type=number]").value;
	retobj.pulse=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(2) > input[type=number]:nth-child(5)").value;
	retobj.sbp=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(1)").value;
	retobj.dbp=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(2)").value;
	retobj.waist=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(4)").value;
	let RN=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(6) > input[type=number]:nth-child(2)").value;
	let RC=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(7) > input[type=number]:nth-child(2)").value;
	let LN=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(6) > input[type=number]:nth-child(4)").value;
	let LC=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(7) > input[type=number]:nth-child(4)").value;
	retobj.vision={};
	if (RN!=0){
		retobj.vision.right={type:"裸視",value:RN}
	} else {
		retobj.vision.right={type:"矯正",value:RC}
	}
	if (LN!=0){
		retobj.vision.left={type:"裸視",value:LN}
	} else {
		retobj.vision.left={type:"矯正",value:LC}
	}
	let PE="";
	const ENTlist=["ENT","戴助聽器","齲齒","牙結石或牙周病","耳鼻喉及口腔異常"];
	for (let i=1;i<ENTlist.length;i++){
		if (document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(10) > input[type=checkbox]:nth-child("+(i+1)+")").checked){
			PE=PE+ENTlist[i]+",";
		}
	}
	if (document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(12) > input[type=checkbox]:nth-child(2)").checked){
		PE=PE+"淋巴腫大,";
	}
	if (document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(12) > input[type=checkbox]:nth-child(5)").checked){
		PE=PE+"甲狀線腫大,";
	}
	if (document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(13) > input[type=checkbox]:nth-child(2)").checked){
		PE=PE+"胸部異常,";
	}
	if (document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(13) > input[type=checkbox]:nth-child(6)").checked){
		PE=PE+"心臟聽診異常,";
	}
	if (document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(14) > input[type=checkbox]:nth-child(2)").checked){
		PE=PE+"呼吸聽診異常,";
	}
	if (document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(14) > input[type=checkbox]:nth-child(6)").checked){
		PE=PE+"腹部異常,";
	}
	if (document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(15) > input[type=checkbox]:nth-child(2)").checked){
		PE=PE+"四肢異常,";
	}
	if (PE!=""){
		PE=PE.substring(0,PE.length-1);
	} else {
		PE="無明顯異常";
	}
	retobj.PE=PE;
	retobj.UP=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(3) > input[type=string]").value;
	if (retobj.UP>15){
		retobj.UP+=" ↑";
	}
	retobj.AC=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(5) > input[type=number]").value;
	if (retobj.AC>100){
		retobj.AC+=" ↑";
	}
	retobj.TC=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(6) > input[type=number]").value;
	if (retobj.TC>200){
		retobj.TC+=" ↑";
	}
	retobj.TG=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(7) > input[type=number]").value;
	if (retobj.TG>150){
		retobj.TG+=" ↑";
	}
	retobj.HDL=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(8) > input[type=number]").value;
	if (retobj.gender.includes("男")){
		if (retobj.HDL<40){
			retobj.HDL+=" ⭣";
		}
	} else {
		if (retobj.HDL<50){
			retobj.HDL+=" ⭣";
		}
	}
	retobj.LDL=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(9) > input[type=number]").value;
	if (retobj.LDL>130){
		retobj.LDL+=" ↑";
	}
	retobj.GOT=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(11) > input[type=number]").value;
	if (retobj.GOT>40){
		retobj.GOT+=" ↑";
	}
	retobj.GPT=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(12) > input[type=number]").value;
	if (retobj.GPT>40){
		retobj.GPT+=" ↑";
	}
	retobj.CRE=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(13) > input[type=number]").value;
	if (retobj.CRE>1.3){
		retobj.CRE+=" ↑";
	} 
	retobj.GFR=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(14) > input[type=number]").value;
	if (retobj.GFR<60){
		retobj.GFR+=" ⭣";
	}
	retobj.UA=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(15) > input[type=number]").value;
	if (retobj.UA>7){
		retobj.UA+=" ↑";
	}
	const heplist=["hep","陰性","陽性","未執行"];
	for (let i=1;i<heplist.length;i++){
		if (document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(16) > input[type=checkbox]:nth-child("+(1+i)+")").checked){
			retobj.HBV=heplist[i];
		}
		if (document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(17) > input[type=checkbox]:nth-child("+(1+i)+")").checked){
			retobj.HCV=heplist[i];
		}
	}
	let HE="";
	const HElist1=["HElist1","戒菸","節酒","戒檳榔","規律運動"];
	for (let i=1;i<HElist1.length;i++){
		if (document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child("+i+")").checked){
			HE=HE+HElist1[i]+",";
		}
		
	}
	const HElist2=["HElist2","慢性疾病風險評估","維持正常體重","健康飲食","事故傷害預"];
	for (let i=1;i<HElist2.length;i++){
		if (document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(3) > input[type=checkbox]:nth-child("+i+")").checked){
			HE=HE+HElist2[i]+",";
		}
	}
	const HElist21=["HElist3","防口腔保健","腎病識能衛教指導"]
	for (let i=1;i<HElist21.length;i++){
		if (document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(4) > input[type=checkbox]:nth-child("+i+")").checked){
			HE=HE+HElist21[i]+",";
		}
	}
	
	if (HE!=""){
		HE=HE.substring(0,HE.length-1);
	} else {
		HE="無";
	}
	retobj.HE=HE;
	const HElist3=["HE_BP","HE_AC","HE_LIP","HE_CKD","HE_HEP","HE_META"]
	for (let i=0;i<HElist3.length;i++){
		if (i==3){
			if (document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child("+(7+i)+") > input[type=checkbox]:nth-child(1)").checked){
				retobj[HElist3[i]]="正常";
			} else if (document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child("+(7+i)+") > input[type=checkbox]:nth-child(6)").checked){
				retobj[HElist3[i]]="異常：建議進一步檢查";
			} else if (document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child("+(7+i)+") > input[type=checkbox]:nth-child(7)").checked){
				retobj[HElist3[i]]="異常：建議接受治療";
			} else {
				retobj[HElist3[i]]="異常：建議生活型態改善，並定期3-6個月追蹤";
			}
		} else {
			if (document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child("+(7+i)+") > input[type=checkbox]:nth-child(1)").checked){
				retobj[HElist3[i]]="正常";
			} else if (document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child("+(7+i)+") > input[type=checkbox]:nth-child(5)").checked){
				retobj[HElist3[i]]="異常：建議進一步檢查";
			} else if (document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child("+(7+i)+") > input[type=checkbox]:nth-child(6)").checked){
				retobj[HElist3[i]]="異常：建議接受治療";
			} else {
				retobj[HElist3[i]]="異常：建議生活型態改善，並定期3-6個月追蹤";
			}
		}
	}
	let META_detail=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(13)").textContent
	let META_detail_c=0;
	let META_detail_d=META_detail.split("：【")[1].split("】")[0].split("；");
	let HE_META_detail="";
	for (let i=0;i<META_detail_d.length;i++){
		let des=META_detail_d[i].replaceAll("脂蛋白","");
		if (des.includes("異常")){
			META_detail_c+=1;
			HE_META_detail=HE_META_detail+des.replaceAll("(異常)","")+"；"
		}
	}
	if (META_detail_c>0){
		HE_META_detail="【"+HE_META_detail.substring(0,HE_META_detail.length-1)+"】";
	} else {
		HE_META_detail="";
	}
	retobj.HE_META=retobj.HE_META+" "+HE_META_detail;
	const risklist=["risk","R_CAD","R_DM","R_HTN","R_CVA","R_MACE"]
	for (let i=1;i<risklist.length;i++){
		try {
			retobj[risklist[i]]=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(14) > div > div.react-bootstrap-table > table > tbody > tr:nth-child("+i+") > td.cell-risk > div > input[type=number]").value+" %";
		} catch (e){
			retobj[risklist[i]]=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(14) > div > div.react-bootstrap-table > table > tbody > tr:nth-child(3) > td.cell-risk").textContent;
		}
	}
	if (retobj.HBV=="陽性"){
		retobj.HE_HBV="陽性，建議進一步檢查";
	} else {
		retobj.HE_HBV=retobj.HBV;
	}
	if (retobj.HCV=="陽性"){
		retobj.HE_HCV="陽性，建議進一步檢查";
	} else {
		retobj.HE_HCV=retobj.HCV;
	}
	if (document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(17) > input[type=checkbox]:nth-child(2)").checked){
		retobj.HE_cough="有：建議轉診進一步評估是否可能為結核病";
	} else {
		retobj.HE_cough="沒有"
	}
	
	if (document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(18) > input[type=checkbox]:nth-child(2)").checked){
		retobj.HE_dep="兩題任一題答「是」，建議轉介至相關單位進一步服務"
	} else {
		retobj.HE_dep="兩題皆答否"
	}
	let errmsg="";
	let retobjkeys=Object.keys(retobj);
	for (let i=0;i<retobjkeys.length;i++){
		let key=retobjkeys[i];
		if (key!="vision"){
			if (retobj[key]==""||retobj[key]=="0"){
				errmsg=errmsg+key+"空白或0\n";
			} 
		} else {
			if (retobj[key]["left"]["value"]==""||retobj[key]["left"]["value"]=="0"){
				errmsg=errmsg+"左眼視力空白或0\n";
			}
			if (retobj[key]["right"]["value"]==""||retobj[key]["right"]["value"]=="0"){
				errmsg=errmsg+"右眼視力空白或0\n";
			}
		}
	}
	
	let xhr = new XMLHttpRequest();
	let regid=document.URL.split("https://phpcis.chshb.gov.tw/consultationMainPage/")[1];
	let regurl="https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId="+regid;
	xhr.open("GET", regurl, false);
	xhr.send();
	let reg_jres=JSON.parse(xhr.responseText);
	let healthRecordId=reg_jres.result.healthRecordId;
	let recurl="https://phpcis.chshb.gov.tw/api/v1/health_records/prescriptions/find?healthRecordId="+healthRecordId+"&diseaseLocale=1&isCertificate=false&isExportExcel=false"
	xhr.open("GET", recurl, false);
	xhr.send();
	let rec_jres=JSON.parse(xhr.responseText).result;
	retobj.sitetitle=rec_jres.clinicShortName+"成人預防保健服務檢查單";
	retobj.clinicinfo=rec_jres.clinicName+"("+rec_jres.clinicCode+")<br>連絡電話:"+rec_jres.clinicPhone;
	let doctorId=rec_jres.doctorId;
	let docurl="https://phpcis.chshb.gov.tw/api/v1/doctors/find?doctorId="+doctorId;
	xhr.open("GET", docurl, false);
	xhr.send();
	let doc_jres=JSON.parse(xhr.responseText).result;
	retobj.docinfo=doc_jres.specialists[0].specialistName+" "+doc_jres.name+"醫師<br>醫師證書字號:"+doc_jres.certificationNo;
	
	retobj.errmsg=errmsg;
	return retobj
}


