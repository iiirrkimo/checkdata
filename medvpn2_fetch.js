(function (){
async function queryalldata(){
	const currentTime = getFormattedDate();
	const querykey=currentTime+'&insert_log=true';
	const url_list={
		"drug" : 'https://medcloud2.nhi.gov.tw/imu/api/imue0008/imue0008s02/get-data?cli_datetime=',
		"exam" : 'https://medcloud2.nhi.gov.tw/imu/api/imue0060/imue0060s02/get-data?cli_datetime=',
		"HBCV" : 'https://medcloud2.nhi.gov.tw/imu/api/imue0180/imue0180s01/hbcv-data?cli_datetime=',
		"he":'https://medcloud2.nhi.gov.tw/imu/api/imue0140/imue0140s01/hpa-data?cli_datetime=',
		"cancer": "https://medcloud2.nhi.gov.tw/imu/api/imue0150/imue0150s01/hpa-data?cli_datetime=",
		"residue": "https://medcloud2.nhi.gov.tw/imu/api/imue0120/imue0120s01/pres-med-day?cli_datetime=",
		"image": "https://medcloud2.nhi.gov.tw/imu/api/imue0130/imue0130s02/get-data?cli_datetime=",
	}
	const headers = {
        'Content-Type': 'application/json, text/plain, */*',
        'Authorization': `Bearer ${sessionStorage.token}`
    };
	try {
        const keys = Object.keys(url_list);
        const promises = keys.map(key => fetch(url_list[key]+querykey, { headers })); 
        const responses = await Promise.all(promises);
        const results = {};
        for (let i = 0; i < keys.length; i++) {
            const response = responses[i];
            if (!response.ok) {
                throw new Error(`API ${keys[i]} error: ${response.status}`);
            }
            results[keys[i]] = await response.json();
        }
        nextStep(results);
    } catch (error) {
        alert('發生錯誤:\n'+error);
    }
}


function nextStep(apiResults) {
	let name=document.getElementsByClassName('name')[0].textContent;
	let birth=document.getElementsByClassName('birth')[0].textContent;
	let sex=document.getElementsByClassName('sex')[0].textContent;
	let idno=document.getElementsByClassName('idno')[0].textContent.split("：")[1].trim();
	let retobj=apiResults;
	retobj['basic']={};
	retobj['basic']['name']=name;
	retobj['basic']['birth']=birth;
	retobj['basic']['sex']=sex;
	retobj['basic']['idno']=idno;
	let retobjs=JSON.stringify(JSON.stringify(retobj));
	htmls=String.raw`
		<!-- protected/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VPN2整理</title>
    <style>
	html {
		font-family: '微軟正黑體';
		background-color: #cdeedc;
	}
	body {
		margin: 0px;
		padding: 0px;
	}
	.titlearea {
		box-sizing: border-box; 
		font-size: 24px;
		background-color: #80d5a6;
		width: 100%;
		display: flex;
		position: relative;
	}
	.basicinformation {
		box-sizing: border-box; 
		font-size: 24px;
		background-color: #80d5a6;
		width: 100%;
		display: flex;
		position: relative;
	}
	.basicinf {
		margin-left: 5px;
		margin-top: 5px;
		border: 2px solid black;
		width: 20%;
	}
	.HEinf {
		margin-top: 5px;
		border: 2px solid black;
		width: 20%;
	}
	.cancerinf {
		margin-top: 5px;
		border: 2px solid black;
		width: 20%;
	}
	.mainmenuitem {
		margin-left: 3px;
		margin-right: 12px;
		margin-top: 3px;
		margin-bottom: 3px;
		padding: 2px;
		background-color: #4CAF50;
		color: white;
		border-radius: 5px;
		text-align: center;
		text-decoration: none;
	}
	.mainmenuitem:hover {
		background-color: #45a049;
	}
	.div_data {
		background-color: #45a049;
	}
	.table_drug_date {
		margin-left: 3px;
		border-collapse: collapse;
	}
	.table_drug_date th{
		background-color: #99ccff;
		border: 1px solid #6c757d; 
		text-align: center;
	}
	.table_drug_date td:nth-child(-n+3){
		background-color: #f8f9fa;
		border: 1px solid #6c757d; 
		text-align: center;
	}
	.table_drug_date td:nth-child(n+4){
		white-space: nowrap;
		overflow: hidden; 
		border: 1px solid #6c757d; 
		text-align: left;
		max-width: 200px;
	}
	.table_drug_code {
		margin-left: 3px;
		border-collapse: collapse;
	}
	.table_drug_code th{
		background-color: #99ccff;
		border: 1px solid #6c757d; 
		text-align: center;
	}
	.table_drug_code td:nth-child(1){
		background-color: #f8f9fa;
		white-space: nowrap;
		overflow: hidden; 
		border: 1px solid #6c757d; 
		text-align: left;
		max-width: 300px;
	}
	.table_drug_code td:nth-child(2){
		background-color: #f8f9fa;
		border: 1px solid #6c757d; 
	}
	.table_drug_code td:nth-child(3){
		background-color: #f8f9fa;
		white-space: nowrap;
		overflow: hidden; 
		border: 1px solid #6c757d; 
		text-align: left;
		max-width: 150px;
	}
	.table_drug_code td:nth-child(n+4){
		white-space: nowrap;
		overflow: hidden; 
		border: 1px solid #6c757d; 
		text-align: left;
	}
	.table_exam {
		margin-left: 3px;
		border-collapse: collapse;
	}
	.table_exam td{
		white-space: nowrap;
		overflow: hidden; 
		border: 1px solid #6c757d; 
		text-align: center;
	}
	.table_exam tr:nth-of-type(-n+2) td {
		background-color: #99ccff; 
		border: 1px solid #6c757d; 
		text-align: center;    
		overflow: hidden; 
		max-width: 100px;
	}
	.table_exam tr:nth-of-type(n+3) td:nth-child(1) {
		background-color: #ffc107; 
		border: 1px solid #6c757d; 
		text-align: center;    
	}
	.table_image {
		margin-left: 3px;
		border-collapse: collapse;
		width: 80%;
	}
	.table_image th{
		background-color: #99ccff;
		border: 1px solid #6c757d; 
		text-align: center;
	}
	.table_image td:nth-child(1){
		border: 1px solid #6c757d; 
		text-align: center;
		overflow: hidden; 
		white-space: nowrap;
		width: 15%;
	}
	.table_image td:nth-child(2){
		border: 1px solid #6c757d; 
		text-align: center;
		overflow: hidden; 
		white-space: nowrap;
		width: 30%;
	}
	.table_image td:nth-child(3){
		border: 1px solid #6c757d; 
		text-align: left;
		width: 50%;

	}
	.table_image td:nth-child(4){
		border: 1px solid #6c757d; 
		text-align: center;
		width: 5%;
	}
	.imagebtn{
		height: 50px;
	}
	</style>
</head>
<body>
	<div class="titlearea">
		<div class="basicinf">
			<div>
				基本資料:<span id="basic_name"></span><br>
				個案性別:<span id="basic_genter"></span><br>
				身分證號:<span id="basic_id"></span><br>
				出生日期:<span id="basic_birth"></span>
			</div>
		</div>
		<div class="HEinf">
			<div>
				成 健:<span id="basic_adult"></span><br>
				BC肝:<span id="basic_HBCV"></span>
			</div>
		</div>
		<div class="cancerinf">
			<div>
				腸篩:<span id="basic_FOBT"></span><br>
				口篩:<span id="basic_oral"></span><br>
				子抹:<span id="basic_PAP"></span><br>
				乳攝:<span id="basic_Mamo"></span>
			</div>
		</div>
	</div>
	<div class="titlearea">
		<a href="javascript:showtable(0)" class="mainmenuitem">雲端藥歷_依日期</a>
		<a href="javascript:showtable(1)" class="mainmenuitem">雲端藥歷_依藥品</a>
		<a href="javascript:showtable(2)" class="mainmenuitem">檢驗結果</a>
		<a href="javascript:showtable(3)" class="mainmenuitem">影像報告</a>
	</div>
	<div id="div_drug_date" style="display: block;"></div>
	<div id="div_drug_code" style="display: none;"></div>
	<div id="div_exam" style="display: none;"></div>
	<div id="div_image" style="display: none;"></div>
</body>
<script>
	
	window.onload=function(){
		const data=${retobjs};
		vpndata=JSON.parse(data);
		console.log(vpndata);
		document.getElementById('basic_name').textContent=vpndata.basic.name;
		document.getElementById('basic_genter').textContent=vpndata.basic.sex;
		document.getElementById('basic_id').textContent=vpndata.basic.idno;
		document.getElementById('basic_birth').textContent=vpndata.basic.birth;
		let her=vpndata.HBCV.robject.screening_data;
		document.getElementById('basic_adult').innerHTML=her[0].result+","+her[0].memo;
		if (her[0].result=="符合"){
			document.getElementById('basic_adult').style.color="blue";
		} else {
			document.getElementById('basic_adult').style.color="red";
		}
		document.getElementById('basic_HBCV').innerHTML=her[1].result+","+her[1].memo;
		if (her[1].result=="符合"){
			document.getElementById('basic_HBCV').style.color="blue";
		} else {
			document.getElementById('basic_HBCV').style.color="red";
		}
		let car=vpndata.cancer.robject;
		if (car.colorectal.subData.length>0){
			let fobtr=car.colorectal.subData[0];
			document.getElementById('basic_FOBT').textContent=fobtr.func_date+" : "+fobtr.result;
			document.getElementById('basic_FOBT').title=fobtr.hosp_abbr
		} else {
			document.getElementById('basic_FOBT').textContent="無紀錄";
		}
		if (car.oralMucosa.subData.length>0){
			let fobtr=car.oralMucosa.subData[0];
			document.getElementById('basic_oral').textContent=fobtr.func_date+" : "+fobtr.result;
			document.getElementById('basic_oral').title=fobtr.hosp_abbr;
		} else {
			document.getElementById('basic_oral').textContent="無紀錄";
		}
		if (car.papSmears.subData.length>0){
			let fobtr=car.papSmears.subData[0];
			document.getElementById('basic_PAP').textContent=fobtr.func_date+" : "+fobtr.result;
			document.getElementById('basic_PAP').title=fobtr.hosp_abbr
		} else {
			document.getElementById('basic_PAP').textContent="無紀錄";
		}
		if (car.mammography.subData.length>0){
			let fobtr=car.mammography.subData[0];
			document.getElementById('basic_Mamo').textContent=fobtr.func_date+" : "+fobtr.result;
			document.getElementById('basic_Mamo').title=fobtr.hosp_abbr;
		} else {
			document.getElementById('basic_Mamo').textContent="無紀錄";
		}

		drugobj=moddrug(vpndata);
		examobj=modexam(vpndata);
		table_drug_date=additem('table','table_drug_date','table_drug_date',document.getElementById('div_drug_date'));
		gen_drug_date(table_drug_date,drugobj);
		table_drug_code=additem('table','table_drug_code','table_drug_code',document.getElementById('div_drug_code'));
		gen_drug_code(table_drug_code,drugobj);
		table_exam=additem('table','table_exam','table_exam',document.getElementById('div_exam'));
		gen_exam(table_exam,examobj);
		table_image=additem('table','table_image','table_image',document.getElementById('div_image'));
		gen_image(table_image,vpndata);
	}
	function showtable(num){
		let a=document.getElementById('div_drug_date');
		let b=document.getElementById('div_drug_code');
		let c=document.getElementById('div_exam');
		let d=document.getElementById('div_image');
		let arr=[a,b,c,d];
		for (let i=0;i<arr.length;i++){
			if (i==num){
				arr[i].style.display="block";
			} else {
				arr[i].style.display="none";
			}
		}
	}
	function gen_image(table,vpndata){
		table.innerHTML="";
		let titlerow=table.insertRow();
		const titles=["日期","醫令","報告","影像"];
		for (let i=0;i<titles.length;i++){
			let newHeader = document.createElement('th');
			newHeader.textContent = titles[i];
			titlerow.appendChild(newHeader);
		}
		let data=vpndata.image.robject;
		for (let i=0;i<data.length;i++){
			r=data[i];
			crow=table.insertRow();
			crow.insertCell().innerHTML=r.real_inspect_date+"<br>"+r.hosp.replaceAll(";","<br>");
			crow.insertCell().innerHTML=r.order_code+"<br>"+r.order_name.replaceAll(";","<br>");
			let rere="";
			if (r.inspect_result!=null){
				rere=r.inspect_result;
			}
			crow.insertCell().innerHTML=rere;
			let btnc=crow.insertCell();
			if (r.ipl_case_seq_no!=null){
				let querykey=r.ipl_case_seq_no+"@"+r.read_pos+"@@"+r.file_type+"@"+r.file_qty;
				let imagebtn=additem("button","imagebtn","",btnc);
				imagebtn.textContent="看影像";
				imagebtn.addEventListener('click', function () {
					showimage(querykey);
				});
			}
		}
		
	}
	function showimage(querykey){
		ClientDatastr=querykey;
		postjson={
			ClientData:ClientDatastr,
			ProcID:"IMUE0130",
		}
		theurl="https://medcloud2.nhi.gov.tw/imu/api/imuecommon/imuecommon/get-ctmri2";
		xmlHttp = new XMLHttpRequest();
		xmlHttp.open('POST', theurl, false );
		xmlHttp.setRequestHeader('Content-Type', 'application/json, text/plain, */*');
		authorization="Bearer "+sessionStorage.token;
		xmlHttp.setRequestHeader('authorization', authorization);
		xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
		xmlHttp.send(JSON.stringify(postjson));
		res=xmlHttp.responseText;
		jres=JSON.parse(res);
		thewebsite=jres['ctmri_url'];
		windowFeatures = "width=800,height=600,scrollbars=yes";
		window.open(thewebsite, "_blank",windowFeatures);
	}
	function gen_exam(table,data){
		table.innerHTML="";
		let titlerow1=table.insertRow();
		let titlerow2=table.insertRow();
		titlerow1.insertCell().textContent="日期"
		titlerow2.insertCell().textContent="項目\\醫療院所"
		let titlecol=[];
		let datelist=Object.keys(data.bydate);
		for (let i=0;i<datelist.length;i++){
			let date=datelist[i];
			let dateitem=data.bydate[date];
			let fc=i+1;
			let ti1=table.rows[0].insertCell();
			ti1.textContent=date;
			ti1.addEventListener('dblclick', function () {
				grabcol(table,fc);
			});
			let ti2=table.rows[1].insertCell();
			ti2.addEventListener('dblclick', function () {
				grabcol(table,fc);
			});
			for (let j=0;j<dateitem.length;j++){
				let r=dateitem[j];
				let iname="";
				if (r.assay_item_name==null){
					iname=r.order_code;
				} else {
					iname=r.assay_item_name;
				}
				if (!titlecol.includes(iname)){
					titlecol.push(iname);
					let newrow=table.insertRow();
					for (let k=0;k<datelist.length+1;k++){
						newrow.insertCell();
					}
					newrow.cells[0].textContent=iname;
					let cr=table.rows.length-1;
					newrow.cells[0].addEventListener('dblclick', function () {
						grabrow(table,cr);
					});
				}
				let fr=titlecol.indexOf(iname)+2;
				let hos=r.hosp;
				ti2.innerHTML=hos.replaceAll(';','<br>');
				let rv=r.assay_value;
				if (r.unit_data!=null){
					rv=rv+" ("+r.unit_data+")";
				}
				table.rows[fr].cells[fc].textContent=rv;
				let hint=""
				if (r.order_code!=null){
					hint=hint+"健保碼: "+r.order_code+"\n";
				}
				if (r.order_name!=null){
					hint=hint+"名稱: "+r.order_name+"\n";
				}
				if (r.assay_item_name!=null){
					hint=hint+"細分類: "+r.assay_item_name+"\n";
				}
				if (r.assay_value!=null){
					hint=hint+"檢驗值: "+r.assay_value+"\n";
				}
				if (r.consult_value!=null){
					hint=hint+"參考值: "+r.consult_value+"\n";
				}
				if (r.unit_data!=null){
					hint=hint+"單位: "+r.unit_data+"\n";
				}
				table.rows[fr].cells[fc].title=hint;
			}
		}
	}
	function grabrow(table,row){
		let res="";
		let item="";
		for (let a=0;a<table.rows[row].cells.length;a++){
			if (a==0){
				item=table.rows[row].cells[0].textContent;
			} else {
				if (table.rows[row].cells[a].textContent!=""){
					res=res+table.rows[0].cells[a].textContent+" : "+table.rows[row].cells[a].textContent+"\n";
				}
			}
		}
		res=item+"\n"+res;
		navigator.clipboard.writeText(res).then(() => {
			alert("複製"+res);
		}).catch(err => {
			alert('複製失敗:', err);
		});
	}
	function grabcol(table,col){
		let res="";
		let hos="";
		let date="";
		for (let a=0;a<table.rows.length;a++){
			if (a==0){
				date=table.rows[a].cells[col].textContent;
			} else if (a==1){
				hos=table.rows[a].cells[col].textContent;
			} else {
				if (table.rows[a].cells[col].textContent!=""){
					res=res+table.rows[a].cells[0].textContent+" : "+table.rows[a].cells[col].textContent+"\n";
				}
			}
		}
		res=date+"\n"+hos+"\n"+res;
		navigator.clipboard.writeText(res).then(() => {
			alert("複製"+res);
		}).catch(err => {
			alert('複製失敗:', err);
		});
	}
	function modexam(data){
		let retobj={};
		let bydate={};
		let maxbydatelength=0;
		let s=data.exam.robject;
		for (let i=0;i<s.length;i++){
			r=s[i];
			if (!bydate.hasOwnProperty(r.real_inspect_date)){
				bydate[r.real_inspect_date]=[];
			}
			bydate[r.real_inspect_date].push(r);
		}
		retobj['bydate']=bydate;
		return retobj;
	}
	function moddrug(data){
		let retobj={};
		let bydate={};
		let bycode={};
		let maxbydatelength=0;
		let maxbycodelength=0;
		for (let i=0;i<data.drug.robject.length;i++){
			let r=data.drug.robject[i];
			if (!bydate.hasOwnProperty(r.drug_date)){
				bydate[r.drug_date]={};
			}
			if (!bydate[r.drug_date].hasOwnProperty(r.hosp)){
				bydate[r.drug_date][r.hosp]={};
			}
			if (!bydate[r.drug_date][r.hosp].hasOwnProperty(r.icd_code)){
				bydate[r.drug_date][r.hosp][r.icd_code]=[];
			}
			bydate[r.drug_date][r.hosp][r.icd_code].push(r);
			let newmaxbydatelength=bydate[r.drug_date][r.hosp][r.icd_code].length;
			if (newmaxbydatelength>maxbydatelength){
				maxbydatelength=newmaxbydatelength;
			}
			if (!bycode.hasOwnProperty(r.drug_code)){
				bycode[r.drug_code]=[];
			}
			bycode[r.drug_code].push(r);
			let newmaxbycodelength=bycode[r.drug_code].length;
			if (newmaxbycodelength>maxbycodelength){
				maxbycodelength=newmaxbycodelength;
			}
		}
		retobj['bydate']=bydate;
		retobj['maxbydatelength']=maxbydatelength;
		retobj['bycode']=bycode;
		retobj['maxbycodelength']=maxbycodelength;
		return retobj;
	}
	function gen_drug_code(table,data){
		table.innerHTML="";
		let titlerow=table.insertRow();
		const titles=["藥品","健保碼","分類"];
		for (let i=0;i<titles.length;i++){
			let newHeader = document.createElement('th');
			newHeader.textContent = titles[i];
			titlerow.appendChild(newHeader);
		}
		for (let i=0;i<data.maxbycodelength;i++){
			let ni=i+1;
			let newHeader = document.createElement('th');
			newHeader.textContent = "日期"+ni;
			titlerow.appendChild(newHeader);
		}
		let codelist=Object.keys(data.bycode)
		for (let i=0;i<codelist.length;i++){
			let code=codelist[i];
			let dateitem=data.bycode[code];
			let datelist=Object.keys(dateitem);
			let currentrow=table.insertRow();
			let c1=currentrow.insertCell();
			c1.textContent="";
			currentrow.insertCell().textContent=code;
			let c3=currentrow.insertCell();
			c3.textContent="";
			for (let j=0;j<data.maxbycodelength;j++){
				if (j<datelist.length){
					d=dateitem[j];
					if (c1.textContent==""){
						c1.innerHTML=d.drug_ename+"<br>"+d.drug_ing_name;
						c1.title=d.drug_ename+"\n"+d.drug_ing_name;
						c3.innerHTML=d.drug_atc3_code.replaceAll("（","<br>（").replaceAll("(","<br>(");
					}
					let temc=currentrow.insertCell();
					temc.innerHTML=d.drug_date+"<br>"+d.hosp+"<br>"+d.drug_fre+" * "+d.day+" 天，共 "+d.qty+"#<br>餘: "+d.drug_left+" 天";
					temc.title=d.drug_date+"\n"+d.hosp+"\n"+d.drug_fre+" * "+d.day+" 天，共 "+d.qty+"#\n餘: "+d.drug_left+" 天";
					if (d.drug_left>7){
						temc.style.background="#ffc107";
					}
				} else {
					currentrow.insertCell();
				}
			}
		}
	}
	function gen_drug_date(table,data){
		table.innerHTML="";
		let titlerow=table.insertRow();
		const titles=["日期","院所","診斷"];
		for (let i=0;i<titles.length;i++){
			
			let newHeader = document.createElement('th');
			newHeader.textContent = titles[i];
			titlerow.appendChild(newHeader);
		}
		for (let i=0;i<data.maxbydatelength;i++){
			let ni=i+1;
			let newHeader = document.createElement('th');
			newHeader.textContent = "藥品"+ni;
			titlerow.appendChild(newHeader);
		}
		let daylist=Object.keys(data.bydate)
		for (let i=0;i<daylist.length;i++){
			let dat=daylist[i];
			let datitem=data.bydate[dat];
			let sitelist=Object.keys(datitem);
			for (let j=0;j<sitelist.length;j++){
				let site=sitelist[j];
				let siteitem=datitem[site];
				let diaglist=Object.keys(siteitem);
				for (k=0;k<diaglist.length;k++){
					let diagnosis=diaglist[k];
					let drugarray=siteitem[diagnosis];
					let currentrow=table.insertRow();
					currentrow.insertCell().textContent=dat;
					currentrow.insertCell().innerHTML=site.replaceAll(";","<br>");
					currentrow.insertCell().textContent=diagnosis;
					for (let l=0;l<data.maxbydatelength;l++){
						if (l<drugarray.length){
							let d=drugarray[l];
							let temc=currentrow.insertCell();
							temc.innerHTML=d.drug_ename+"<br>"+d.drug_ing_name+"<br>"+d.drug_code+"<br>"+d.drug_fre+" * "+d.day+" 天，共 "+d.qty+"#<br>餘: "+d.drug_left+" 天";
							temc.title=d.drug_ename+"\n"+d.drug_ing_name+"\n"+d.drug_code+"\n"+d.drug_fre+" * "+d.day+" 天，共 "+d.qty+"#\n餘: "+d.drug_left+" 天";
							if (d.drug_left>7){
								temc.style.background="#ffc107";
							}
						} else {
							currentrow.insertCell();
						}
						
					}

				}

			}

		}
	}
	function additem(_type,_class,_id,_location){
		let tempitem=document.createElement(_type);
		if (_class!=""){
			tempitem.className=_class;
		}
		if (_id!=""){
			tempitem.id=_id;
		}
		_location.appendChild(tempitem);
		return tempitem;
	}
	function tableaddtitle(table,titles){
		table.insertRow(0);
		for (let i=0;i<titles.length;i++){
			let newHeader = document.createElement('th');
			newHeader.textContent = titles[i];
			table.rows[0].appendChild(newHeader);
		}
	}
	
</script>
</html>
	`
	console.log(htmls);
	const newWindow = window.open("", "_blank");
	newWindow.document.write(htmls);
	newWindow.document.close();
	}

function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
queryalldata();
})();