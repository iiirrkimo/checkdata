function showdata(){
    let jjj=document.URL;
    let targeturl="";
    let registrationId="";
    let d1='https://phpcis.chshb.gov.tw/populanceRegistration';
    let d2='https://phpcis.chshb.gov.tw/consultationMainPage/';
    if (jjj==d1){
        let radiolist=document.querySelectorAll('input[type="radio"]');
        for (let i=0; i < radiolist.length; i++){
            if (radiolist[i].checked){
                if (radiolist[i].getBoundingClientRect().height>0){
                    targeturl=radiolist[i].parentElement.parentElement.children[4].children[0].href;
                    break
                }
            }
        }
    } else if (jjj.includes(d2)){
        targeturl=jjj;
    }
    if (targeturl!=""){
        registrationId=targeturl.split('/')[targeturl.split('/').length-1]
    } else {
        alert('請在選擇候診患者查詢個案或在看診作業中執行');
        return
    }
	let scripts = document.querySelectorAll('script');
	let targetScript = null;
	scripts.forEach(script => {
	  if (script.textContent.includes('window.__PRELOADED_STATE__')) {
		targetScript = script;
	  }
	});
	let pretext=targetScript.textContent.split("window.__PRELOADED_STATE__ = ")[1].split("\n")[0];
	let prejson=JSON.parse(pretext);
	let clinicId=prejson.user.clinicId;
	
	let xhr = new XMLHttpRequest();
	let basurl="https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId="+registrationId;
	xhr.open("GET", basurl, false);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	xhr.send();
	let basres=JSON.parse(xhr.responseText).result;
	let personalInfoId=basres.personalInfoId;
	let bureauRecordNo=basres.bureauRecordNo;
	let personalId=basres.personalId;
	let birthday=basres.birthday;
	let name=basres.name;
	let gender=basres.gender;
	let date=basres.date
	let basicobj={};
	basicobj["personalInfoId"]=personalInfoId;
	basicobj["bureauRecordNo"]=bureauRecordNo;
	basicobj["personalId"]=personalId;
	basicobj["birthday"]=birthday;
	basicobj["name"]=name;
	basicobj["gender"]=gender;
	basicobj["visitdate"]=date;
	let examallobj={};
	let heurl="https://phpcis.chshb.gov.tw/api/v1/prevention_datas/adult_screen_personal_list?personalInfoId="+personalInfoId;
	xhr.open("GET", heurl, false);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	xhr.send();
	let heres=JSON.parse(xhr.responseText).result;
	let he1j=["21","22","25","27","3D"]
	let he1js={
		"GluecoreAC":"012",
		"A1C":"09006C",
		"TChol":"016",
		"TG":"017",
		"HDL":"019",
		"LDL":"018",
		"CRE_S":"013",
		"eGFR":"034",
		"urineProteinReference":"024",
		"SGOT":"014",
		"SGPT":"015",
	}
	let he1jskey=Object.keys(he1js);
	for (let i=0;i<heres.length;i++){
		let heitem=heres[i];
		let hecode=heitem.serviceId;
		if (he1j.includes(hecode)){
			let preventionDataId=heitem.preventionDataId;
			let adulturl="https://phpcis.chshb.gov.tw/api/v1/prevention_datas/adult_screens/find_one?clinicId="+clinicId+"&preventionDataId="+preventionDataId;
			xhr.open("GET", adulturl, false);
			xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
			xhr.send();
			let adultres=JSON.parse(xhr.responseText).result;
			let examdate=adultres.treatmentDate;
			if (typeof examdate !== 'undefined') {
				if (!(examdate in examallobj)){
					examallobj[examdate]=[];
				}
				let temp=[];
				for (let j=0;j<he1jskey.length;j++){
					let co=he1jskey[j];
					let hetestcode=hecode+he1js[co];
					if (adultres[co]!=null){
						let tempobj={};
						tempobj["testResult"]=adultres[co];
						tempobj["testCode"]=hetestcode;
						temp.push(tempobj);
						
					}
				}
				examallobj[examdate].push(temp);
			}
			
		}
	}

	let examallurl="https://phpcis.chshb.gov.tw/api/v1/tests/results/personal/health_record_list?personalInfoId="+personalInfoId;
	xhr.open("GET", examallurl, false);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	xhr.send();
	let examallres=JSON.parse(xhr.responseText).result;
	let examalllength=12;
	if (examalllength>examallres.length){
		examalllength=examallres.length;
	}
	
	for (let i=0;i<examalllength;i++){
		let examdate=examallres[i].treatmentDate;
		let healthRecordId=examallres[i].healthRecordId;
		if (!(examdate in examallobj)){
			examallobj[examdate]=[];
		}
		let examdetailurl="https://phpcis.chshb.gov.tw/api/v1/tests/results/personal/list?healthRecordId="+healthRecordId;
		xhr.open("GET", examdetailurl, false);
		xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		xhr.send();
		let examdetailres=JSON.parse(xhr.responseText).result;
		examallobj[examdate].push(examdetailres);
	}
	let retobj={};
	retobj["basic"]=basicobj;
	retobj["exam"]=examallobj;
	let preload=document.querySelector("head > script:nth-child(6)");
	let preload_json=JSON.parse(preload.textContent.split('window.__PRELOADED_STATE__ = ')[1]);
	retobj["clinicCode"]=preload_json.user.clinicCode;
	retobjs=JSON.stringify(retobj);
	let htmls=String.raw`
<!DOCTYPE html>
<html lang="zh-Hant">
	<head>
        <title>檢驗彙總</title>
        <style>
            html {font-family:"微軟正黑體"}
            .title {font-size: 40px; text-align: center; width: 1000px;}
            .basicinfotable { border-collapse: collapse; font-family:"微軟正黑體";font-size:18px;  }
            .basicinfotable td:nth-of-type(1), .basicinfotable td:nth-of-type(3), .basicinfotable td:nth-of-type(5) {text-align: center; width: 80px;}
            .basicinfotable td:nth-of-type(2), .basicinfotable td:nth-of-type(4), .basicinfotable td:nth-of-type(6) {text-align: left; width: 250px;}
            .examtable { border-collapse: collapse; font-family:"微軟正黑體";font-size:16px;  }
            .examtable th {
                position: sticky;
                text-align: center; 
                top: 0;
                background-color: #e3f2fd;
                z-index: 1;
              }
            .examtable td{ border: 1px solid black; text-align: center; }
            .examtable td:nth-of-type(1){text-align: center; width: 90px;}
            .examtable td:not(:nth-child(1)) {text-align: center; width: 65px;}
            .highlight { background-color: #fffa90; }
            .v-container1 {
                width: 1100px;
                height: 212px;
                overflow-y: auto;
            }
            .v-container2 {
                width: 1100px;
                height: 500px;
                overflow-y: auto;
            }
            .detailtable { border-collapse: collapse; font-family:"微軟正黑體";font-size:18px;  }
            .detailtable td{ border: 1px solid black; text-align: center; }
            .detailtable td:nth-of-type(1){text-align: center; width: 250px;}
            .detailtable td:nth-of-type(2){text-align: center; width: 250px;}
            .detailtable td:nth-of-type(3){text-align: center; width: 150px;}
            .detailtable td:nth-of-type(4){text-align: center; width: 150px;}
            .detailtable td:nth-of-type(5){text-align: center; width: 100px;}
        </style>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@1.4.0/dist/chartjs-plugin-annotation.min.js"></script>
        <script>
            window.onload=function(){
                aaa=please_change_me;
                window.chartPopup = null;
                let clist={
                    "AC":["21012","22012","25012","27012","09005C001","09140C","21+L1001C005","3D012"],
                    "A1C":["09006C"],
                    "TC":["21016","22016","25016","27016","09001C","21+L1001C006","3D016"],
                    "TG":["21017","22017","25017","27017","09004C","21+L1001C007","3D017"],
                    "HDL":["21019","22019","25019","27019","09043C","21+L1001C008","3D019"],
                    "LDL":["21018","22018","25018","27018","09044C","3D018"],
                    "Cre":["21013","22013","25013","27013","09015C","21+L1001C011","3D013","06chs001"],
                    "eGFR":["21034","22034","25034","27034","Y00001","21+L1001C013","3D034","Y00001002"],
                    "UP":["21024","22024","25024","27024","06003C","06012C004","06013C002","09040C002","21+L1001C012","3D024"],
                    "UPCR":["21035","22035","25035","27035","06012C008","06013C006","Y00002001","3D035"],
                    "MA":["06012C005","06013C003","12111C","27065B"],
                    "UACR":["06012C007","06013C005","Y00002002"],
                    "Ucre":["21033","22033","25033","27033","06012C006","06013C004","09016C","3D033"],
                    "GOT":["21014","22014","25014","27014","09025C","21+L1001C009","3D014"],
                    "GPT":["21015","22015","25015","27015","09026C","21+L1001C010","3D015"],
                    "UA":["21038","22038","25038","27038","09013C","3D038"]
                }
                genexam(aaa,clist)
            }
            function genexam(inputobj,clist){
                let gend="女"
                if (inputobj.basic.gender=="1"){
                    gend="男"
                }
                let age=inputobj.basic.visitdate.split("-")[0]-inputobj.basic.birthday.split("-")[0]
                document.getElementById('basicname').textContent=inputobj.basic.name+"("+gend+")";
                document.getElementById('basicbirth').textContent=inputobj.basic.birthday+"("+age+"歲)";;
                document.getElementById('basicid').textContent=inputobj.basic.personalId;
                let allist=[];
                for (let i=0;i<Object.keys(allist).length;i++){
                    let item=allist[Object.keys(allist)[i]];
                    for (j=0;j<item.length;j++){
                        allist.push(item[j]);
                    }
                }
                let examtable=document.getElementById('examtable');
				
                let examobj0=inputobj.exam;
				let sorted = Object.entries(examobj0).sort((a, b) => new Date(a[0]) - new Date(b[0])).reverse();;
				let examobj = Object.fromEntries(sorted);
                let examdays=Object.keys(examobj);
                examtable.innerHTML="";
                let newrow=document.createElement('tr');
                examtable.appendChild(newrow);
                let th=document.createElement('th');
                th.textContent="日期";
                newrow.appendChild(th);
                let titlelist=["AC","A1C","TC","TG","HDL","LDL","Cre","eGFR","UPCR","UACR","GOT","GPT","UA"]
                let ullist={
                    "AC":[null,100],
                    "A1C":[null,5.6],
                    "TC":[null,200],
                    "TG":[null,150],
                    "HDL":[gend=="男"?40:50,null],
                    "LDL":[null,130],
                    "Cre":[0.8,1.3],
                    "eGFR":[60,null],
                    "UPCR":[null,150],
                    "UACR":[null,30],
                    "GOT":[null,40],
                    "GPT":[null,40],
                    "UA":[null,7]
                }
                for (let i=0;i<titlelist.length;i++){
                    let th=document.createElement('th');
                    th.addEventListener("click", function () {
                        let table=document.getElementById('examtable');
                        let colres={};
                        for (let m=0;m<table.rows.length;m++){
                            let row=table.rows[m]
                            let exd=row.cells[0].textContent;
                            let exr=row.cells[i+1].textContent;
                            if (exr==titlelist[i]){
                                colres["item"]=exr;
                            } else if (exr!=""){
                                colres[exd]=exr;
                            }
                            
                        }
                        console.log(colres);
                        //renderLineChart(colres,ullist[titlelist[i]][0],ullist[titlelist[i]][1])
  

                        renderLineChartInPopup(colres,ullist[titlelist[i]][0],ullist[titlelist[i]][1])
                    });
                    th.textContent=titlelist[i];
                    newrow.appendChild(th);
                }
                th=document.createElement('th');
                th.textContent="其他";
                newrow.appendChild(th);
                for (let i=0;i<examdays.length;i++){
                    let checkvalue=false;
                    

                    let examdate=examdays[i];
                    let examarray=examobj[examdate];
                    let newrow=document.createElement('tr');
                    newrow.addEventListener("click", function () {
                        const allRows = document.querySelectorAll("tr");
                        allRows.forEach(row => row.classList.remove("highlight"));
                        this.classList.add("highlight");
                        todetail(examdate,examarray,gend,inputobj.basic.birthday)
                    });
                    newrow.addEventListener("dblclick", function () {
                        let row=i+1;
                        let table=document.getElementById('examtable');
                        let resa=[]
                        for (let m=0;m<14;m++){
                            let it=table.rows[row].cells[m].textContent;
                            if (it==""){
                                it="-";
                            }
                            resa.push(it);
                        }
                        let mkyd=(resa[0].split("-")[0]-1911)+resa[0].split("-")[1]+resa[0].split("-")[2]
                        text=mkyd+" ";
                        text=text+"AC/A1C:"+resa[1]+"/"+resa[2]+"\n";
                        text=text+"TC/TG/HDL/LDL:"+resa[3]+"/"+resa[4]+"/"+resa[5]+"/"+resa[6]+"\n";
                        text=text+"Cre/eGFR/UPCR/UACR:"+resa[7]+"/"+resa[8]+"/"+resa[9]+"/"+resa[10]+"\n";
                        text=text+"GOT/GPT:"+resa[11]+"/"+resa[12]+"\n";
                        text=text+"UA:"+resa[13];
                        navigator.clipboard.writeText(text).then(() => {
                            alert("已複製\n"+text);
                          })
                    });
                    examtable.appendChild(newrow);
                    let td1=document.createElement('td');
                    td1.textContent=examdate;
                    newrow.appendChild(td1);
                    let showrow={};
                    let includeother="N";
                    for (let j=0;j<examarray.length;j++){
                        let examitem=examarray[j];
                        for (let k=0;k<examitem.length;k++){
                            let test=examitem[k];
                            let testcode=test.testCode;
                            let testResult=test.testResult;
                            if (clist.AC.includes(testcode)){
                                showrow.AC=Math.round(testResult);
                            }
                            if (clist.A1C.includes(testcode)){
                                showrow.A1C=Math.round(testResult*10)/10;
                            }
                            if (clist.TC.includes(testcode)){
                                showrow.TC=Math.round(testResult);
                            }
                            if (clist.TG.includes(testcode)){
                                showrow.TG=Math.round(testResult);
                            }
                            if (clist.HDL.includes(testcode)){
                                showrow.HDL=Math.round(testResult);
                            }
                            if (clist.LDL.includes(testcode)){
                                showrow.LDL=Math.round(testResult);
                            }
                            if (clist.Cre.includes(testcode)){
                                showrow.Cre=Math.round(testResult*100)/100;
                            }
                            if (clist.eGFR.includes(testcode)){
                                showrow.eGFR=Math.round(testResult*100)/100;
                            }
                            if (clist.UPCR.includes(testcode)){
                                showrow.UPCR=Math.round(testResult*10)/10;
                            }
                            if (clist.UACR.includes(testcode)){
                                showrow.UACR=Math.round(testResult*10)/10;
                            }
                            if (clist.GOT.includes(testcode)){
                                showrow.GOT=Math.round(testResult);
                            }
                            if (clist.GPT.includes(testcode)){
                                showrow.GPT=Math.round(testResult);
                            }
                            if (clist.UA.includes(testcode)){
                                showrow.UA=Math.round(testResult*10)/10;
                            }
                            if (clist.UP.includes(testcode)){
                                showrow.UP=testResult;
                            }
                            if (clist.MA.includes(testcode)){
                                showrow.MA=testResult;
                            }
                            if (clist.Ucre.includes(testcode)){
                                showrow.Ucre=testResult;
                            }
                            if (!allist.includes(testcode)){
                                includeother="Y";
                            }
                        }
                    }
                    let temp=document.createElement('td');
                    if (Number.isNaN(showrow.AC)){
                        showrow.AC="";
                    }
                    temp.textContent=showrow.AC;
                    newrow.appendChild(temp);
                    temp=document.createElement('td');
                    if (Number.isNaN(showrow.A1C)){
                        showrow.A1C="";
                    }
                    temp.textContent=showrow.A1C;
                    newrow.appendChild(temp);
                    temp=document.createElement('td');
                    if (Number.isNaN(showrow.TC)){
                        showrow.TC="";
                    }
                    temp.textContent=showrow.TC;
                    newrow.appendChild(temp);
                    temp=document.createElement('td');
                    if (Number.isNaN(showrow.TG)){
                        showrow.TG="";
                    }
                    temp.textContent=showrow.TG;
                    newrow.appendChild(temp);
                    temp=document.createElement('td');
                    if (Number.isNaN(showrow.HDL)){
                        showrow.HDL="";
                    }
                    temp.textContent=showrow.HDL;
                    newrow.appendChild(temp);
                    temp=document.createElement('td');
                    if (Number.isNaN(showrow.LDL)){
                        showrow.LDL="";
                    }
                    temp.textContent=showrow.LDL;
                    newrow.appendChild(temp);
                    temp=document.createElement('td');
                    if (Number.isNaN(showrow.Cre)){
                        showrow.Cre="";
                    }
                    temp.textContent=showrow.Cre;
                    newrow.appendChild(temp);
                    temp=document.createElement('td');
                    if (!("eGFR" in showrow)) {
						if ("Cre" in showrow) {

							const scr = Number(showrow.Cre);  // Scr = serum creatinine
							if (!showrow.Cre || Number.isNaN(scr) || scr <= 0) {
							showrow.eGFR = "";
							} else {

							const isFemale = (gend === "女");

							const K = isFemale ? 0.7 : 0.9;
							const alpha = isFemale ? -0.241 : -0.302;

							const ratio = scr / K;

							const minPart = Math.pow(Math.min(ratio, 1), alpha);
							const maxPart = Math.pow(Math.max(ratio, 1), -1.200);

							let egfr = 142 * minPart * maxPart * Math.pow(0.9938, age);

							if (isFemale) {
								egfr = egfr * 1.012;
							}

							showrow.eGFR = Math.round(egfr * 100) / 100;
							}
						}
					}
                    if (Number.isNaN(showrow.eGFR)){
                        showrow.eGFR="";
                    }
                    temp.textContent=showrow.eGFR;
                    newrow.appendChild(temp);
                    temp=document.createElement('td');
                    if (!("UPCR" in showrow)){
                        if ("UP" in showrow && "Ucre" in showrow){
                            let upcr=showrow.UP/showrow.Ucre*1000;
                            showrow.UPCR=Math.round(upcr*10)/10;
                        }
                    }
                    if (Number.isNaN(showrow.UPCR)){
                        showrow.UPCR="";
                    }
                    temp.textContent=showrow.UPCR;
                    newrow.appendChild(temp);
                    temp=document.createElement('td');
                    if (!("UACR" in showrow)){
                        if ("MA" in showrow && "Ucre" in showrow){
                            let uacr=showrow.MA/showrow.Ucre*1000;
                            showrow.UACR=Math.round(uacr*10)/10;
                        }
                    }
                    if (Number.isNaN(showrow.UACR)){
                        showrow.UACR="";
                    }
                    temp.textContent=showrow.UACR;
                    newrow.appendChild(temp);
                    temp=document.createElement('td');
                    if (Number.isNaN(showrow.GOT)){
                        showrow.GOT="";
                    }
                    temp.textContent=showrow.GOT;
                    newrow.appendChild(temp);
                    temp=document.createElement('td');
                    if (Number.isNaN(showrow.GPT)){
                        showrow.GPT="";
                    }
                    temp.textContent=showrow.GPT;
                    newrow.appendChild(temp);
                    temp=document.createElement('td');
                    if (Number.isNaN(showrow.UA)){
                        showrow.UA="";
                    }
                    temp.textContent=showrow.UA;
                    newrow.appendChild(temp);
                    temp=document.createElement('td');
                    temp.textContent=includeother;
                    newrow.appendChild(temp);
                    
                }
            }
            function todetail(examdate,inputexamarray,gend,birthday){
                let examlist={
                    "66": {
                        "code": "66",
                        "name_cht": "孕婦乙型鏈球菌篩檢",
                        "name_eng": "Group B Streptococcus；Streptococcus agalatiae(GBS)",
                        "unit": "-/+",
                        "ref": "No growth",
                        "refmode": false,
                        "index": 999900021
                    },
                    "21001": {
                        "code": "21001",
                        "name_cht": "身高",
                        "name_eng": "height",
                        "unit": "cm",
                        "ref": "",
                        "refmode": false,
                        "index": 99990001
                    },
                    "21002": {
                        "code": "21002",
                        "name_cht": "體重",
                        "name_eng": "body weight",
                        "unit": "kg",
                        "ref": "",
                        "refmode": false,
                        "index": 99990002
                    },
                    "21003": {
                        "code": "21003",
                        "name_cht": "脈搏",
                        "name_eng": "pulse",
                        "unit": "次/分鐘",
                        "ref": "60-100",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": 60,
                        "index": 99990003
                    },
                    "21004": {
                        "code": "21004",
                        "name_cht": "收縮壓",
                        "name_eng": "Systolic pressure",
                        "unit": "mmHg",
                        "ref": "<130",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 99990004
                    },
                    "21005": {
                        "code": "21005",
                        "name_cht": "舒張壓",
                        "name_eng": "Diastolic pressure",
                        "unit": "mmHg",
                        "ref": "<80",
                        "refmode": "mid",
                        "upper": 80,
                        "lower": null,
                        "index": 99990005
                    },
                    "21006": {
                        "code": "21006",
                        "name_cht": "腰圍",
                        "name_eng": "Waistline",
                        "unit": "cm",
                        "ref": "男<90；女<80",
                        "refmode": "mid",
                        "upper":gend=="男"?90:80,
                        "lower": null,
                        "index": 99990006
                    },
                    "21007": {
                        "code": "21007",
                        "name_cht": "身體質量指數",
                        "name_eng": "Body Mass Index",
                        "unit": "kg/m2",
                        "ref": "18.5-24",
                        "refmode": "mid",
                        "upper": 24,
                        "lower": 18.5,
                        "index": 99990007
                    },
                    "21008": {
                        "code": "21008",
                        "name_cht": "裸視[右眼]",
                        "name_eng": "bare eyesight(right)",
                        "unit": "",
                        "ref": "",
                        "index": 99990008
                    },
                    "21009": {
                        "code": "21009",
                        "name_cht": "裸視[左眼]",
                        "name_eng": "bare eyesight(left)",
                        "unit": "",
                        "ref": "",
                        "index": 99990009
                    },
                    "21010": {
                        "code": "21010",
                        "name_cht": "矯正[右眼]",
                        "name_eng": "corrected vision(right)",
                        "unit": "",
                        "ref": "",
                        "index": 999900010
                    },
                    "21011": {
                        "code": "21011",
                        "name_cht": "矯正[左眼]",
                        "name_eng": "corrected vision(left)",
                        "unit": "",
                        "ref": "",
                        "index": 999900011
                    },
                    "21012": {
                        "code": "21012",
                        "name_cht": "血液及體液葡萄糖",
                        "name_eng": "Glucose",
                        "unit": "mg/dL",
                        "ref": "<100",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": null,
                        "index": 10001
                    },
                    "21013": {
                        "code": "21013",
                        "name_cht": "肌酸酐、血",
                        "name_eng": "Creatinine (B) CRTN",
                        "unit": "mg/dL",
                        "ref": "0.5-1.3",
                        "refmode": "mid",
                        "upper": 1.3,
                        "lower": 0.5,
                        "index": 30002
                    },
                    "21014": {
                        "code": "21014",
                        "name_cht": "血清麩胺酸苯醋酸轉氨基酶",
                        "name_eng": "S-GOT/AST",
                        "unit": "IU/L",
                        "ref": "<40",
                        "refmode": "mid",
                        "upper": 40,
                        "lower": null,
                        "index": 50001
                    },
                    "21015": {
                        "code": "21015",
                        "name_cht": "血清麩胺酸丙酮酸轉氨基酶",
                        "name_eng": "S-GPT/ALT",
                        "unit": "IU/L",
                        "ref": "<40",
                        "refmode": "mid",
                        "upper": 40,
                        "lower": null,
                        "index": 50002
                    },
                    "21016": {
                        "code": "21016",
                        "name_cht": "總膽固醇",
                        "name_eng": "Cholestero1,total",
                        "unit": "mg/dL",
                        "ref": "<200",
                        "refmode": "mid",
                        "upper": 200,
                        "lower": null,
                        "index": 20001
                    },
                    "21017": {
                        "code": "21017",
                        "name_cht": "三酸甘油脂",
                        "name_eng": "Triglyceride (TG)",
                        "unit": "mg/dL",
                        "ref": "<150",
                        "refmode": "mid",
                        "upper": 150,
                        "lower": null,
                        "index": 20002
                    },
                    "21018": {
                        "code": "21018",
                        "name_cht": "低密度脂蛋白－膽固醇",
                        "name_eng": "LDL-C(Lowdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "一般:<130；糖尿病<100",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 20004
                    },
                    "21019": {
                        "code": "21019",
                        "name_cht": "高密度脂蛋白－膽固醇",
                        "name_eng": "HDL-C(highdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "男:≥40；女:≥50",
                        "refmode": "mid",
                        "upper": null,
                        "lower": gend=="男"?40:50,
                        "index": 20003
                    },
                    "21020": {
                        "code": "21020",
                        "name_cht": "總膽固醇/高密度脂蛋白膽固醇比",
                        "name_eng": "Cholestero1,total/HDL-C ratio",
                        "unit": "*",
                        "ref": "<5",
                        "refmode": false,
                        "index": 20006
                    },
                    "21021": {
                        "code": "21021",
                        "name_cht": "低密度/高密度脂蛋白膽固醇比",
                        "name_eng": "LDL-C/HDL-C ratio",
                        "unit": "*",
                        "ref": "",
                        "refmode": false,
                        "index": 20007
                    },
                    "21022": {
                        "code": "21022",
                        "name_cht": "顏色",
                        "name_eng": "color",
                        "unit": "Yellow",
                        "ref": "Yellow",
                        "refmode": false,
                        "index": 40009
                    },
                    "21023": {
                        "code": "21023",
                        "name_cht": "混濁度",
                        "name_eng": "turbidity",
                        "unit": "Clear",
                        "ref": "Clear",
                        "refmode": false,
                        "index": 400011
                    },
                    "21024": {
                        "code": "21024",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400020
                    },
                    "21025": {
                        "code": "21025",
                        "name_cht": "尿糖",
                        "name_eng": "Urine sugar",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400021
                    },
                    "21026": {
                        "code": "21026",
                        "name_cht": "酸鹼度反應",
                        "name_eng": "pH",
                        "unit": "-",
                        "ref": "5.5 ~ 7.5",
                        "refmode": "mid",
                        "upper": 7.5,
                        "lower": 5.5,
                        "index": 400022
                    },
                    "21027": {
                        "code": "21027",
                        "name_cht": "尿潛血",
                        "name_eng": "Urine occult blood",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400023
                    },
                    "21028": {
                        "code": "21028",
                        "name_cht": "尿紅血球",
                        "name_eng": "Urine R.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF",
                        "refmode": "label",
                        "label": "0-5",
                        "index": 400024
                    },
                    "21029": {
                        "code": "21029",
                        "name_cht": "尿白血球",
                        "name_eng": "Urine W.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF",
                        "refmode": "label",
                        "label": "0-5",
                        "index": 400025
                    },
                    "21030": {
                        "code": "21030",
                        "name_cht": "尿上皮細胞",
                        "name_eng": "Urine Epithelium",
                        "unit": "cells/HPF",
                        "ref": "< 8 /HPF",
                        "refmode": "label",
                        "label": "0-8",
                        "index": 400026
                    },
                    "21031": {
                        "code": "21031",
                        "name_cht": "尿圓柱體",
                        "name_eng": "Urine Cast",
                        "unit": "(-)/LPF",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400027
                    },
                    "21032": {
                        "code": "21032",
                        "name_cht": "尿細菌",
                        "name_eng": "Urine Bacteria",
                        "unit": "HPF",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400028
                    },
                    "21033": {
                        "code": "21033",
                        "name_cht": "肌酐、尿",
                        "name_eng": "Creatinine (U) CRTN",
                        "unit": "mg/dL",
                        "ref": "60-250",
                        "refmode": "mid",
                        "upper": 250,
                        "lower": 60,
                        "index": 40005
                    },
                    "21034": {
                        "code": "21034",
                        "name_cht": "腎絲球過濾率計算",
                        "name_eng": "eGFR",
                        "unit": "ml/min/1.73m^2",
                        "ref": ">60",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 60,
                        "index": 30004
                    },
                    "21035": {
                        "code": "21035",
                        "name_cht": "尿液總蛋白／肌酐、尿比值",
                        "name_eng": "U PCR",
                        "unit": "mg/gm",
                        "ref": "<150",
                        "refmode": "mid",
                        "upper": 150,
                        "lower": null,
                        "index": 40007
                    },
                    "21036": {
                        "code": "21036",
                        "name_cht": "慢性腎臟病期數",
                        "name_eng": "CKD Stage",
                        "unit": "",
                        "ref": "第一~三期：輕度到中度腎功能衰竭；第四期：重度腎功能衰竭；第五期：末期腎臟病變",
                        "refmode": "label",
                        "label": "0",
                        "index": 30006
                    },
                    "21037": {
                        "code": "21037",
                        "name_cht": "骨質密度",
                        "name_eng": "BMD",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 999900031
                    },
                    "21038": {
                        "code": "21038",
                        "name_cht": "尿酸、血",
                        "name_eng": "Uric acid",
                        "unit": "mg/dL",
                        "ref": "<7",
                        "refmode": "mid",
                        "upper": 7,
                        "lower": null,
                        "index": 30008
                    },
                    "22001": {
                        "code": "22001",
                        "name_cht": "身高",
                        "name_eng": "height",
                        "unit": "cm",
                        "ref": "",
                        "refmode": false,
                        "index": 99990001
                    },
                    "22002": {
                        "code": "22002",
                        "name_cht": "體重",
                        "name_eng": "body weight",
                        "unit": "kg",
                        "ref": "",
                        "refmode": false,
                        "index": 99990002
                    },
                    "22003": {
                        "code": "22003",
                        "name_cht": "脈搏",
                        "name_eng": "pulse",
                        "unit": "次/分鐘",
                        "ref": "",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": 60,
                        "index": 99990003
                    },
                    "22004": {
                        "code": "22004",
                        "name_cht": "收縮壓",
                        "name_eng": "Systolic pressure",
                        "unit": "mmHg",
                        "ref": "<130",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 99990004
                    },
                    "22005": {
                        "code": "22005",
                        "name_cht": "舒張壓",
                        "name_eng": "Diastolic pressure",
                        "unit": "mmHg",
                        "ref": "<80",
                        "refmode": "mid",
                        "upper": 80,
                        "lower": null,
                        "index": 99990005
                    },
                    "22006": {
                        "code": "22006",
                        "name_cht": "腰圍",
                        "name_eng": "Waistline",
                        "unit": "cm",
                        "ref": "男<90；女<80",
                        "refmode": "mid",
                        "upper":gend=="男"?90:80,
                        "lower": null,
                        "index": 99990006
                    },
                    "22007": {
                        "code": "22007",
                        "name_cht": "身體質量指數",
                        "name_eng": "Body Mass Index",
                        "unit": "kg/m2",
                        "ref": "18.5-24",
                        "refmode": "mid",
                        "upper": 24,
                        "lower": 18.5,
                        "index": 99990007
                    },
                    "22008": {
                        "code": "22008",
                        "name_cht": "裸視[右眼]",
                        "name_eng": "bare eyesight(right)",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 99990008
                    },
                    "22009": {
                        "code": "22009",
                        "name_cht": "裸視[左眼]",
                        "name_eng": "bare eyesight(left)",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 99990009
                    },
                    "22010": {
                        "code": "22010",
                        "name_cht": "矯正[右眼]",
                        "name_eng": "corrected vision(right)",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 999900010
                    },
                    "22011": {
                        "code": "22011",
                        "name_cht": "矯正[左眼]",
                        "name_eng": "corrected vision(left)",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 999900011
                    },
                    "22012": {
                        "code": "22012",
                        "name_cht": "血液及體液葡萄糖",
                        "name_eng": "Glucose",
                        "unit": "mg/dL",
                        "ref": "<100",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": null,
                        "index": 10001
                    },
                    "22013": {
                        "code": "22013",
                        "name_cht": "肌酸酐、血",
                        "name_eng": "Creatinine (B) CRTN",
                        "unit": "mg/dL",
                        "ref": "0.5-1.3",
                        "refmode": "mid",
                        "upper": 1.3,
                        "lower": 0.5,
                        "index": 30002
                    },
                    "22014": {
                        "code": "22014",
                        "name_cht": "血清麩胺酸苯醋酸轉氨基酶",
                        "name_eng": "S-GOT/AST",
                        "unit": "IU/L",
                        "ref": "<40",
                        "refmode": "mid",
                        "upper": 40,
                        "lower": null,
                        "index": 50001
                    },
                    "22015": {
                        "code": "22015",
                        "name_cht": "血清麩胺酸丙酮酸轉氨基酶",
                        "name_eng": "S-GPT/ALT",
                        "unit": "IU/L",
                        "ref": "<40",
                        "refmode": "mid",
                        "upper": 40,
                        "lower": null,
                        "index": 50002
                    },
                    "22016": {
                        "code": "22016",
                        "name_cht": "總膽固醇",
                        "name_eng": "Cholestero1,total",
                        "unit": "mg/dL",
                        "ref": "<200",
                        "refmode": "mid",
                        "upper": 200,
                        "lower": null,
                        "index": 20001
                    },
                    "22017": {
                        "code": "22017",
                        "name_cht": "三酸甘油脂",
                        "name_eng": "Triglyceride (TG)",
                        "unit": "mg/dL",
                        "ref": "<150",
                        "refmode": "mid",
                        "upper": 150,
                        "lower": null,
                        "index": 20002
                    },
                    "22018": {
                        "code": "22018",
                        "name_cht": "低密度脂蛋白－膽固醇",
                        "name_eng": "LDL-C(Lowdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "<130",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 20004
                    },
                    "22019": {
                        "code": "22019",
                        "name_cht": "高密度脂蛋白－膽固醇",
                        "name_eng": "HDL-C(highdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "男:≥40；女:≥50",
                        "refmode": "mid",
                        "upper": null,
                        "lower": gend=="男"?40:50,
                        "index": 20003
                    },
                    "22020": {
                        "code": "22020",
                        "name_cht": "總膽固醇/高密度脂蛋白膽固醇比",
                        "name_eng": "Cholestero1,total/HDL-C ratio",
                        "unit": "*",
                        "ref": "<5",
                        "refmode": false,
                        "index": 20006
                    },
                    "22021": {
                        "code": "22021",
                        "name_cht": "低密度/高密度脂蛋白膽固醇比",
                        "name_eng": "LDL-C/HDL-C ratio",
                        "unit": "*",
                        "ref": "",
                        "refmode": false,
                        "index": 20007
                    },
                    "22022": {
                        "code": "22022",
                        "name_cht": "顏色",
                        "name_eng": "color",
                        "unit": "Yellow",
                        "ref": "Yellow",
                        "refmode": false,
                        "index": 40009
                    },
                    "22023": {
                        "code": "22023",
                        "name_cht": "混濁度",
                        "name_eng": "turbidity",
                        "unit": "Clear",
                        "ref": "Clear",
                        "refmode": false,
                        "index": 400011
                    },
                    "22024": {
                        "code": "22024",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400020
                    },
                    "22025": {
                        "code": "22025",
                        "name_cht": "尿糖",
                        "name_eng": "Urine sugar",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400021
                    },
                    "22026": {
                        "code": "22026",
                        "name_cht": "酸鹼度反應",
                        "name_eng": "pH",
                        "unit": "-",
                        "ref": "5.5 ~ 7.5",
                        "refmode": "mid",
                        "upper": 7.5,
                        "lower": 5.5,
                        "index": 400022
                    },
                    "22027": {
                        "code": "22027",
                        "name_cht": "尿潛血",
                        "name_eng": "Urine occult blood",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400023
                    },
                    "22028": {
                        "code": "22028",
                        "name_cht": "尿紅血球",
                        "name_eng": "Urine R.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF",
                        "refmode": "label",
                        "label": "0-5",
                        "index": 400024
                    },
                    "22029": {
                        "code": "22029",
                        "name_cht": "尿白血球",
                        "name_eng": "Urine W.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF",
                        "refmode": "label",
                        "label": "0-5",
                        "index": 400025
                    },
                    "22030": {
                        "code": "22030",
                        "name_cht": "尿上皮細胞",
                        "name_eng": "Urine Epithelium",
                        "unit": "cells/HPF",
                        "ref": "< 8 /HPF",
                        "refmode": "label",
                        "label": "0-8",
                        "index": 400026
                    },
                    "22031": {
                        "code": "22031",
                        "name_cht": "尿圓柱體",
                        "name_eng": "Urine Cast",
                        "unit": "(-)/LPF",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400027
                    },
                    "22032": {
                        "code": "22032",
                        "name_cht": "尿細菌",
                        "name_eng": "Urine Bacteria",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400028
                    },
                    "22033": {
                        "code": "22033",
                        "name_cht": "肌酐、尿",
                        "name_eng": "Creatinine (U) CRTN",
                        "unit": "mg/dL",
                        "ref": "60-250",
                        "refmode": "mid",
                        "upper": 250,
                        "lower": 60,
                        "index": 40005
                    },
                    "22034": {
                        "code": "22034",
                        "name_cht": "腎絲球過濾率計算",
                        "name_eng": "eGFR",
                        "unit": "ml/min/1.73m^2",
                        "ref": ">60",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 60,
                        "index": 30004
                    },
                    "22035": {
                        "code": "22035",
                        "name_cht": "尿液總蛋白／肌酐、尿比值",
                        "name_eng": "U PCR",
                        "unit": "mg/gm",
                        "ref": "<150",
                        "refmode": "mid",
                        "upper": 150,
                        "lower": null,
                        "index": 40007
                    },
                    "22036": {
                        "code": "22036",
                        "name_cht": "慢性腎臟病期數",
                        "name_eng": "CKD Stage",
                        "unit": "",
                        "ref": "第0期：正常",
                        "refmode": "label",
                        "label": "0",
                        "index": 30006
                    },
                    "22037": {
                        "code": "22037",
                        "name_cht": "骨質密度",
                        "name_eng": "BMD",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 999900031
                    },
                    "22038": {
                        "code": "22038",
                        "name_cht": "尿酸、血",
                        "name_eng": "Uric acid",
                        "unit": "mg/dL",
                        "ref": "<7",
                        "refmode": "mid",
                        "upper": 7,
                        "lower": null,
                        "index": 30008
                    },
                    "25001": {
                        "code": "25001",
                        "name_cht": "身高",
                        "name_eng": "height",
                        "unit": "cm",
                        "ref": "",
                        "refmode": false,
                        "index": 99990001
                    },
                    "25002": {
                        "code": "25002",
                        "name_cht": "體重",
                        "name_eng": "body weight",
                        "unit": "kg",
                        "ref": "",
                        "refmode": false,
                        "index": 99990002
                    },
                    "25003": {
                        "code": "25003",
                        "name_cht": "脈搏",
                        "name_eng": "pulse",
                        "unit": "次/分鐘",
                        "ref": "60-100",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": 60,
                        "index": 99990003
                    },
                    "25004": {
                        "code": "25004",
                        "name_cht": "收縮壓",
                        "name_eng": "Systolic pressure",
                        "unit": "mmHg",
                        "ref": "<130",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 99990004
                    },
                    "25005": {
                        "code": "25005",
                        "name_cht": "舒張壓",
                        "name_eng": "Diastolic pressure",
                        "unit": "mmHg",
                        "ref": "<80",
                        "refmode": "mid",
                        "upper": 80,
                        "lower": null,
                        "index": 99990005
                    },
                    "25006": {
                        "code": "25006",
                        "name_cht": "腰圍",
                        "name_eng": "Waistline",
                        "unit": "cm",
                        "ref": "男<90；女<80",
                        "refmode": "mid",
                        "upper":gend=="男"?90:80,
                        "lower": null,
                        "index": 99990006
                    },
                    "25007": {
                        "code": "25007",
                        "name_cht": "身體質量指數",
                        "name_eng": "Body Mass Index",
                        "unit": "kg/m2",
                        "ref": "18.5-24",
                        "refmode": "mid",
                        "upper": 24,
                        "lower": 18.5,
                        "index": 99990007
                    },
                    "25008": {
                        "code": "25008",
                        "name_cht": "裸視[右眼]",
                        "name_eng": "bare eyesight(right)",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 99990008
                    },
                    "25009": {
                        "code": "25009",
                        "name_cht": "裸視[左眼]",
                        "name_eng": "bare eyesight(left)",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 99990009
                    },
                    "25010": {
                        "code": "25010",
                        "name_cht": "矯正[右眼]",
                        "name_eng": "corrected vision(right)",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 999900010
                    },
                    "25011": {
                        "code": "25011",
                        "name_cht": "矯正[左眼]",
                        "name_eng": "corrected vision(left)",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 999900011
                    },
                    "25012": {
                        "code": "25012",
                        "name_cht": "血液及體液葡萄糖",
                        "name_eng": "Glucose",
                        "unit": "mg/dL",
                        "ref": "<100",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": null,
                        "index": 10001
                    },
                    "25013": {
                        "code": "25013",
                        "name_cht": "肌酸酐、血",
                        "name_eng": "Creatinine (B) CRTN",
                        "unit": "mg/dL",
                        "ref": "0.5-1.3",
                        "refmode": "mid",
                        "upper": 1.3,
                        "lower": 0.5,
                        "index": 30002
                    },
                    "25014": {
                        "code": "25014",
                        "name_cht": "血清麩胺酸苯醋酸轉氨基酶",
                        "name_eng": "S-GOT/AST",
                        "unit": "IU/L",
                        "ref": "<40",
                        "refmode": "mid",
                        "upper": 40,
                        "lower": null,
                        "index": 50001
                    },
                    "25015": {
                        "code": "25015",
                        "name_cht": "血清麩胺酸丙酮酸轉氨基酶",
                        "name_eng": "S-GPT/ALT",
                        "unit": "IU/L",
                        "ref": "<40",
                        "refmode": "mid",
                        "upper": 40,
                        "lower": null,
                        "index": 50002
                    },
                    "25016": {
                        "code": "25016",
                        "name_cht": "總膽固醇",
                        "name_eng": "Cholestero1,total",
                        "unit": "mg/dL",
                        "ref": "<200",
                        "refmode": "mid",
                        "upper": 200,
                        "lower": null,
                        "index": 20001
                    },
                    "25017": {
                        "code": "25017",
                        "name_cht": "三酸甘油脂",
                        "name_eng": "Triglyceride (TG)",
                        "unit": "mg/dL",
                        "ref": "<150",
                        "refmode": "mid",
                        "upper": 150,
                        "lower": null,
                        "index": 20002
                    },
                    "25018": {
                        "code": "25018",
                        "name_cht": "低密度脂蛋白－膽固醇",
                        "name_eng": "LDL-C(Lowdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "<130",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 20004
                    },
                    "25019": {
                        "code": "25019",
                        "name_cht": "高密度脂蛋白－膽固醇",
                        "name_eng": "HDL-C(highdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "男:≥40；女:≥50",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 50,
                        "index": 20003
                    },
                    "25020": {
                        "code": "25020",
                        "name_cht": "總膽固醇/高密度脂蛋白膽固醇比",
                        "name_eng": "Cholestero1,total/HDL-C ratio",
                        "unit": "*",
                        "ref": "<5",
                        "refmode": false,
                        "index": 20006
                    },
                    "25021": {
                        "code": "25021",
                        "name_cht": "低密度/高密度脂蛋白膽固醇比",
                        "name_eng": "LDL-C/HDL-C ratio",
                        "unit": "*",
                        "ref": "",
                        "refmode": false,
                        "index": 20007
                    },
                    "25022": {
                        "code": "25022",
                        "name_cht": "顏色",
                        "name_eng": "color",
                        "unit": "Yellow",
                        "ref": "Yellow",
                        "refmode": false,
                        "index": 40009
                    },
                    "25023": {
                        "code": "25023",
                        "name_cht": "混濁度",
                        "name_eng": "turbidity",
                        "unit": "Clear",
                        "ref": "Clear",
                        "refmode": false,
                        "index": 400011
                    },
                    "25024": {
                        "code": "25024",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400020
                    },
                    "25025": {
                        "code": "25025",
                        "name_cht": "尿糖",
                        "name_eng": "Urine sugar",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400021
                    },
                    "25026": {
                        "code": "25026",
                        "name_cht": "酸鹼度反應",
                        "name_eng": "pH",
                        "unit": "-",
                        "ref": "5.5 ~ 7.5",
                        "refmode": "mid",
                        "upper": 7.5,
                        "lower": 5.5,
                        "index": 400022
                    },
                    "25027": {
                        "code": "25027",
                        "name_cht": "尿潛血",
                        "name_eng": "Urine occult blood",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400023
                    },
                    "25028": {
                        "code": "25028",
                        "name_cht": "尿紅血球",
                        "name_eng": "Urine R.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF",
                        "refmode": "label",
                        "label": "0-5",
                        "index": 400024
                    },
                    "25029": {
                        "code": "25029",
                        "name_cht": "尿白血球",
                        "name_eng": "Urine W.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF",
                        "refmode": "label",
                        "label": "0-5",
                        "index": 400025
                    },
                    "25030": {
                        "code": "25030",
                        "name_cht": "尿上皮細胞",
                        "name_eng": "Urine Epithelium",
                        "unit": "cells/HPF",
                        "ref": "< 8 /HPF",
                        "refmode": "label",
                        "label": "0-8",
                        "index": 400026
                    },
                    "25031": {
                        "code": "25031",
                        "name_cht": "尿圓柱體",
                        "name_eng": "Urine Cast",
                        "unit": "(-)/LPF",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400027
                    },
                    "25032": {
                        "code": "25032",
                        "name_cht": "尿細菌",
                        "name_eng": "Urine Bacteria",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400028
                    },
                    "25033": {
                        "code": "25033",
                        "name_cht": "肌酐、尿",
                        "name_eng": "Creatinine (U) CRTN",
                        "unit": "mg/dL",
                        "ref": "60-250",
                        "refmode": "mid",
                        "upper": 250,
                        "lower": 60,
                        "index": 40005
                    },
                    "25034": {
                        "code": "25034",
                        "name_cht": "腎絲球過濾率計算",
                        "name_eng": "eGFR",
                        "unit": "ml/min/1.73m^2",
                        "ref": ">60",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 60,
                        "index": 30004
                    },
                    "25035": {
                        "code": "25035",
                        "name_cht": "尿液總蛋白／肌酐、尿比值",
                        "name_eng": "U PCR",
                        "unit": "mg/gm",
                        "ref": "<150",
                        "refmode": "mid",
                        "upper": 150,
                        "lower": null,
                        "index": 40007
                    },
                    "25036": {
                        "code": "25036",
                        "name_cht": "慢性腎臟病期數",
                        "name_eng": "CKD Stage",
                        "unit": "",
                        "ref": "第0期：正常",
                        "refmode": "label",
                        "label": "0",
                        "index": 30006
                    },
                    "25037": {
                        "code": "25037",
                        "name_cht": "骨質密度",
                        "name_eng": "BMD",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 999900031
                    },
                    "25038": {
                        "code": "25038",
                        "name_cht": "尿酸、血",
                        "name_eng": "Uric acid",
                        "unit": "mg/dL",
                        "ref": "<7",
                        "refmode": "mid",
                        "upper": 7,
                        "lower": null,
                        "index": 30008
                    },
                    "27001": {
                        "code": "27001",
                        "name_cht": "身高",
                        "name_eng": "height",
                        "unit": "cm",
                        "ref": "",
                        "refmode": false,
                        "index": 99990001
                    },
                    "27002": {
                        "code": "27002",
                        "name_cht": "體重",
                        "name_eng": "body weight",
                        "unit": "kg",
                        "ref": "",
                        "refmode": false,
                        "index": 99990002
                    },
                    "27003": {
                        "code": "27003",
                        "name_cht": "脈搏",
                        "name_eng": "pulse",
                        "unit": "次/分鐘",
                        "ref": "60-100",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": 60,
                        "index": 99990003
                    },
                    "27004": {
                        "code": "27004",
                        "name_cht": "收縮壓",
                        "name_eng": "Systolic pressure",
                        "unit": "mmHg",
                        "ref": "<130",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 99990004
                    },
                    "27005": {
                        "code": "27005",
                        "name_cht": "舒張壓",
                        "name_eng": "Diastolic pressure",
                        "unit": "mmHg",
                        "ref": "<80",
                        "refmode": "mid",
                        "upper": 80,
                        "lower": null,
                        "index": 99990005
                    },
                    "27006": {
                        "code": "27006",
                        "name_cht": "腰圍",
                        "name_eng": "Waistline",
                        "unit": "cm",
                        "ref": "男<90；女<80",
                        "refmode": "mid",
                        "upper":gend=="男"?90:80,
                        "lower": null,
                        "index": 99990006
                    },
                    "27007": {
                        "code": "27007",
                        "name_cht": "身體質量指數",
                        "name_eng": "Body Mass Index",
                        "unit": "kg/m2",
                        "ref": "18.5-24",
                        "refmode": "mid",
                        "upper": 24,
                        "lower": 18.5,
                        "index": 99990007
                    },
                    "27008": {
                        "code": "27008",
                        "name_cht": "裸視[右眼]",
                        "name_eng": "bare eyesight(right)",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 99990008
                    },
                    "27009": {
                        "code": "27009",
                        "name_cht": "裸視[左眼]",
                        "name_eng": "bare eyesight(left)",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 99990009
                    },
                    "27010": {
                        "code": "27010",
                        "name_cht": "矯正[右眼]",
                        "name_eng": "corrected vision(right)",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 999900010
                    },
                    "27011": {
                        "code": "27011",
                        "name_cht": "矯正[左眼]",
                        "name_eng": "corrected vision(left)",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 999900011
                    },
                    "27012": {
                        "code": "27012",
                        "name_cht": "血液及體液葡萄糖",
                        "name_eng": "Glucose",
                        "unit": "mg/dL",
                        "ref": "<100",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": null,
                        "index": 10001
                    },
                    "27013": {
                        "code": "27013",
                        "name_cht": "肌酸酐、血",
                        "name_eng": "Creatinine (B) CRTN",
                        "unit": "mg/dL",
                        "ref": "0.5-1.3",
                        "refmode": "mid",
                        "upper": 1.3,
                        "lower": 0.5,
                        "index": 30002
                    },
                    "27014": {
                        "code": "27014",
                        "name_cht": "血清麩胺酸苯醋酸轉氨基酶",
                        "name_eng": "S-GOT/AST",
                        "unit": "IU/L",
                        "ref": "<40",
                        "refmode": "mid",
                        "upper": 40,
                        "lower": null,
                        "index": 50001
                    },
                    "27015": {
                        "code": "27015",
                        "name_cht": "血清麩胺酸丙酮酸轉氨基酶",
                        "name_eng": "S-GPT/ALT",
                        "unit": "IU/L",
                        "ref": "<40",
                        "refmode": "mid",
                        "upper": 40,
                        "lower": null,
                        "index": 50002
                    },
                    "27016": {
                        "code": "27016",
                        "name_cht": "總膽固醇",
                        "name_eng": "Cholestero1,total",
                        "unit": "mg/dL",
                        "ref": "<200",
                        "refmode": "mid",
                        "upper": 200,
                        "lower": null,
                        "index": 20001
                    },
                    "27017": {
                        "code": "27017",
                        "name_cht": "三酸甘油脂",
                        "name_eng": "Triglyceride (TG)",
                        "unit": "mg/dL",
                        "ref": "<150",
                        "refmode": "mid",
                        "upper": 150,
                        "lower": null,
                        "index": 20002
                    },
                    "27018": {
                        "code": "27018",
                        "name_cht": "低密度脂蛋白－膽固醇",
                        "name_eng": "LDL-C(Lowdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "<130",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 20004
                    },
                    "27019": {
                        "code": "27019",
                        "name_cht": "高密度脂蛋白－膽固醇",
                        "name_eng": "HDL-C(highdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "男:≥40；女:≥50",
                        "refmode": "mid",
                        "upper": null,
                        "lower": gend=="男"?40:50,
                        "index": 20003
                    },
                    "27020": {
                        "code": "27020",
                        "name_cht": "總膽固醇/高密度脂蛋白膽固醇比",
                        "name_eng": "Cholestero1,total/HDL-C ratio",
                        "unit": "*",
                        "ref": "<5",
                        "refmode": false,
                        "index": 20006
                    },
                    "27021": {
                        "code": "27021",
                        "name_cht": "低密度/高密度脂蛋白膽固醇比",
                        "name_eng": "LDL-C/HDL-C ratio",
                        "unit": "*",
                        "ref": "",
                        "refmode": false,
                        "index": 20007
                    },
                    "27022": {
                        "code": "27022",
                        "name_cht": "顏色",
                        "name_eng": "color",
                        "unit": "Yellow",
                        "ref": "Yellow",
                        "refmode": false,
                        "index": 40009
                    },
                    "27023": {
                        "code": "27023",
                        "name_cht": "混濁度",
                        "name_eng": "turbidity",
                        "unit": "Clear",
                        "ref": "Clear",
                        "refmode": false,
                        "index": 400011
                    },
                    "27024": {
                        "code": "27024",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400020
                    },
                    "27025": {
                        "code": "27025",
                        "name_cht": "尿糖",
                        "name_eng": "Urine sugar",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400021
                    },
                    "27026": {
                        "code": "27026",
                        "name_cht": "酸鹼度反應",
                        "name_eng": "pH",
                        "unit": "*",
                        "ref": "5.5 ~ 7.5",
                        "refmode": "mid",
                        "upper": 7.5,
                        "lower": 5.5,
                        "index": 400022
                    },
                    "27027": {
                        "code": "27027",
                        "name_cht": "尿潛血",
                        "name_eng": "Urine occult blood",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400023
                    },
                    "27028": {
                        "code": "27028",
                        "name_cht": "尿紅血球",
                        "name_eng": "Urine R.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF",
                        "refmode": "label",
                        "label": "0-5",
                        "index": 400024
                    },
                    "27029": {
                        "code": "27029",
                        "name_cht": "尿白血球",
                        "name_eng": "Urine W.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF",
                        "refmode": "label",
                        "label": "0-5",
                        "index": 400025
                    },
                    "27030": {
                        "code": "27030",
                        "name_cht": "尿上皮細胞",
                        "name_eng": "Urine Epithelium",
                        "unit": "cells/HPF",
                        "ref": "< 8 /HPF",
                        "refmode": "label",
                        "label": "0-8",
                        "index": 400026
                    },
                    "27031": {
                        "code": "27031",
                        "name_cht": "尿圓柱體",
                        "name_eng": "Urine Cast",
                        "unit": "(-)/LPF",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400027
                    },
                    "27032": {
                        "code": "27032",
                        "name_cht": "尿細菌",
                        "name_eng": "Urine Bacteria",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400028
                    },
                    "27033": {
                        "code": "27033",
                        "name_cht": "肌酐、尿",
                        "name_eng": "Creatinine (U) CRTN",
                        "unit": "mg/dL",
                        "ref": "60-250",
                        "refmode": "mid",
                        "upper": 250,
                        "lower": 60,
                        "index": 40005
                    },
                    "27034": {
                        "code": "27034",
                        "name_cht": "腎絲球過濾率計算",
                        "name_eng": "eGFR",
                        "unit": "ml/min/1.73m^2",
                        "ref": ">60",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 60,
                        "index": 30004
                    },
                    "27035": {
                        "code": "27035",
                        "name_cht": "尿液總蛋白／肌酐、尿比值",
                        "name_eng": "U PCR",
                        "unit": "mg/gm",
                        "ref": "<150",
                        "refmode": "mid",
                        "upper": 150,
                        "lower": null,
                        "index": 40007
                    },
                    "27036": {
                        "code": "27036",
                        "name_cht": "慢性腎臟病期數",
                        "name_eng": "CKD Stage",
                        "unit": "",
                        "ref": "第0期：正常",
                        "refmode": "label",
                        "label": "0",
                        "index": 30006
                    },
                    "27037": {
                        "code": "27037",
                        "name_cht": "骨質密度",
                        "name_eng": "BMD",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 999900031
                    },
                    "27038": {
                        "code": "27038",
                        "name_cht": "尿酸、血",
                        "name_eng": "Uric acid",
                        "unit": "mg/dL",
                        "ref": "<7",
                        "refmode": "mid",
                        "upper": 7,
                        "lower": null,
                        "index": 30008
                    },
                    "06001C": {
                        "code": "06001C",
                        "name_cht": "酸鹼度反應",
                        "name_eng": "pH",
                        "unit": "*",
                        "ref": "5.5 ~ 7.5",
                        "refmode": "mid",
                        "upper": 7.5,
                        "lower": 5.5,
                        "index": 400022
                    },
                    "06002C": {
                        "code": "06002C",
                        "name_cht": "比重檢驗",
                        "name_eng": "Sp.gr (specific gravity)",
                        "unit": "-",
                        "ref": "1.010 ~ 1.025",
                        "refmode": "mid",
                        "upper": 1.025,
                        "lower": 1.01,
                        "index": 400013
                    },
                    "06003C": {
                        "code": "06003C",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400020
                    },
                    "09040C001": {
                        "code": "09040C001",
                        "name_cht": "尿液總蛋白質定量檢查",
                        "name_eng": "Urine Total protein",
                        "unit": "mg/dL",
                        "ref": "<15",
                        "refmode": "mid",
                        "upper": 15,
                        "lower": null,
                        "index": 40004
                    },
                    "06004C": {
                        "code": "06004C",
                        "name_cht": "尿糖",
                        "name_eng": "Urine sugar",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400021
                    },
                    "06005C": {
                        "code": "06005C",
                        "name_cht": "尿膽素原",
                        "name_eng": "Urine urobilinogen",
                        "unit": "EU/dL",
                        "ref": "<1.0",
                        "refmode": "mid",
                        "upper": 1,
                        "lower": null,
                        "index": 400014
                    },
                    "06006C": {
                        "code": "06006C",
                        "name_cht": "尿膽紅素",
                        "name_eng": "Urine bilirubin",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "0.2",
                        "index": 400015
                    },
                    "06007C": {
                        "code": "06007C",
                        "name_cht": "尿酮體",
                        "name_eng": "Ketone body",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400016
                    },
                    "06008C": {
                        "code": "06008C",
                        "name_cht": "班尼迪克特反應",
                        "name_eng": "Benedict reaction",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400017
                    },
                    "06009C001": {
                        "code": "06009C001",
                        "name_cht": "尿紅血球",
                        "name_eng": "Urine R.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF",
                        "refmode": "label",
                        "label": "0-5",
                        "index": 400024
                    },
                    "06009C002": {
                        "code": "06009C002",
                        "name_cht": "尿白血球",
                        "name_eng": "Urine W.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF",
                        "refmode": "label",
                        "label": "0-5",
                        "index": 400025
                    },
                    "06009C003": {
                        "code": "06009C003",
                        "name_cht": "尿上皮細胞",
                        "name_eng": "Urine Epithelium",
                        "unit": "cells/HPF",
                        "ref": "< 8 /HPF",
                        "refmode": "label",
                        "label": "0-8",
                        "index": 400026
                    },
                    "06009C004": {
                        "code": "06009C004",
                        "name_cht": "尿圓柱體",
                        "name_eng": "Urine Cast",
                        "unit": "(-)/LPF",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400027
                    },
                    "06009C005": {
                        "code": "06009C005",
                        "name_cht": "尿結晶體",
                        "name_eng": "Urine Crystal",
                        "unit": "HPF",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400029
                    },
                    "06009C006": {
                        "code": "06009C006",
                        "name_cht": "尿細菌",
                        "name_eng": "Urine Bacteria",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400028
                    },
                    "06009C007": {
                        "code": "06009C007",
                        "name_cht": "尿寄生蟲",
                        "name_eng": "Urine Parasite",
                        "unit": "HPF",
                        "ref": "N.F",
                        "refmode": "label",
                        "label": "-",
                        "index": 400030
                    },
                    "06009C008": {
                        "code": "06009C008",
                        "name_cht": "尿黏液絲狀",
                        "name_eng": "Urine Mucous",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400031
                    },
                    "06009C009": {
                        "code": "06009C009",
                        "name_cht": "其它",
                        "name_eng": "Others",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 400034
                    },
                    "06009C010": {
                        "code": "06009C010",
                        "name_cht": "鹽類",
                        "name_eng": "Salts",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 400035
                    },
                    "06012C001": {
                        "code": "06012C001",
                        "name_cht": "尿顏色",
                        "name_eng": "color",
                        "unit": "Yellow",
                        "ref": "Yellow",
                        "refmode": false,
                        "index": 400010
                    },
                    "06012C002": {
                        "code": "06012C002",
                        "name_cht": "尿混濁度",
                        "name_eng": "turbidity",
                        "unit": "Clear",
                        "ref": "Clear",
                        "refmode": false,
                        "index": 400012
                    },
                    "06012C003": {
                        "code": "06012C003",
                        "name_cht": "酸鹼度反應",
                        "name_eng": "pH",
                        "unit": "*",
                        "ref": "5.5 ~ 7.5",
                        "refmode": "mid",
                        "upper": 7.5,
                        "lower": 5.5,
                        "index": 400022
                    },
                    "06012C004": {
                        "code": "06012C004",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400020
                    },
                    "06012C005": {
                        "code": "06012C005",
                        "name_cht": "微白蛋白（免疫比濁法）",
                        "name_eng": "Microalbumin (Nephelometry)",
                        "unit": "mg/dL",
                        "ref": "< 2",
                        "refmode": "mid",
                        "upper": 2,
                        "lower": null,
                        "index": 40001
                    },
                    "06012C006": {
                        "code": "06012C006",
                        "name_cht": "肌酐、尿",
                        "name_eng": "Creatinine (U) CRTN",
                        "unit": "mg/dL",
                        "ref": "60-250",
                        "refmode": "mid",
                        "upper": 250,
                        "lower": 60,
                        "index": 40005
                    },
                    "06012C007": {
                        "code": "06012C007",
                        "name_cht": "尿液微量白蛋白/肌酐、尿比值",
                        "name_eng": "U ACR",
                        "unit": "mg/gm",
                        "ref": "<30",
                        "refmode": "mid",
                        "upper": 30,
                        "lower": null,
                        "index": 40006
                    },
                    "06012C008": {
                        "code": "06012C008",
                        "name_cht": "尿蛋白(數值)／肌酐、尿比值",
                        "name_eng": "U PCR",
                        "unit": "mg/gm",
                        "ref": "<150",
                        "refmode": "mid",
                        "upper": 150,
                        "lower": null,
                        "index": 40008
                    },
                    "06012C009": {
                        "code": "06012C009",
                        "name_cht": "白血球酯酶",
                        "name_eng": "Leukocyte rsterase",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400018
                    },
                    "06012C010": {
                        "code": "06012C010",
                        "name_cht": "尿糖",
                        "name_eng": "Urine sugar",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400021
                    },
                    "06012C011": {
                        "code": "06012C011",
                        "name_cht": "尿潛血",
                        "name_eng": "Urine occult blood",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400023
                    },
                    "06012C012": {
                        "code": "06012C012",
                        "name_cht": "比重檢驗",
                        "name_eng": "Specific gravity",
                        "unit": "-",
                        "ref": "1.010 ~ 1.025",
                        "refmode": "mid",
                        "upper": 1.025,
                        "lower": 1.01,
                        "index": 400013
                    },
                    "06012C013": {
                        "code": "06012C013",
                        "name_cht": "尿膽素原",
                        "name_eng": "Urine urobilinogen",
                        "unit": "EU/dL",
                        "ref": "<1.0",
                        "refmode": "mid",
                        "upper": 1,
                        "lower": null,
                        "index": 400014
                    },
                    "06012C014": {
                        "code": "06012C014",
                        "name_cht": "尿膽紅素",
                        "name_eng": "Urine bilirubin",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "0.2",
                        "index": 400015
                    },
                    "06012C015": {
                        "code": "06012C015",
                        "name_cht": "尿酮體",
                        "name_eng": "Ketone body",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400016
                    },
                    "06012C016": {
                        "code": "06012C016",
                        "name_cht": "亞硝酸鹽檢驗",
                        "name_eng": "Nitrite",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400019
                    },
                    "06012C017": {
                        "code": "06012C017",
                        "name_cht": "尿紅血球",
                        "name_eng": "Urine R.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF",
                        "refmode": "label",
                        "label": "0-5",
                        "index": 400024
                    },
                    "06012C018": {
                        "code": "06012C018",
                        "name_cht": "尿白血球",
                        "name_eng": "Urine W.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF",
                        "refmode": "label",
                        "label": "0-5",
                        "index": 400025
                    },
                    "06012C019": {
                        "code": "06012C019",
                        "name_cht": "尿上皮細胞",
                        "name_eng": "Urine Epithelium",
                        "unit": "cells/HPF",
                        "ref": "< 8 /HPF",
                        "refmode": "label",
                        "label": "0-8",
                        "index": 400026
                    },
                    "06012C020": {
                        "code": "06012C020",
                        "name_cht": "尿圓柱體",
                        "name_eng": "Urine Cast",
                        "unit": "(-)/LPF",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400027
                    },
                    "06012C021": {
                        "code": "06012C021",
                        "name_cht": "尿結晶體",
                        "name_eng": "Urine Crystal",
                        "unit": "HPF",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400029
                    },
                    "06012C022": {
                        "code": "06012C022",
                        "name_cht": "尿細菌",
                        "name_eng": "Urine Bacteria",
                        "unit": "HPF",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400028
                    },
                    "06012C023": {
                        "code": "06012C023",
                        "name_cht": "尿寄生蟲",
                        "name_eng": "Urine Parasite",
                        "unit": "HPF",
                        "ref": "N.F",
                        "refmode": false,
                        "index": 400030
                    },
                    "06012C024": {
                        "code": "06012C024",
                        "name_cht": "黏液絲狀",
                        "name_eng": "Urine Mucous",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400032
                    },
                    "06012C025": {
                        "code": "06012C025",
                        "name_cht": "尿酵母菌",
                        "name_eng": "Urine Yeast",
                        "unit": "",
                        "ref": "Negative",
                        "refmode": false,
                        "index": 400033
                    },
                    "06013C001": {
                        "code": "06013C001",
                        "name_cht": "酸鹼度反應",
                        "name_eng": "pH",
                        "unit": "*",
                        "ref": "5.5 ~ 7.5",
                        "refmode": "mid",
                        "upper": 7.5,
                        "lower": 5.5,
                        "index": 400022
                    },
                    "06013C002": {
                        "code": "06013C002",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400020
                    },
                    "06013C003": {
                        "code": "06013C003",
                        "name_cht": "微白蛋白（免疫比濁法）",
                        "name_eng": "Microalbumin (Nephelometry)",
                        "unit": "mg/dL",
                        "ref": "< 2",
                        "refmode": "mid",
                        "upper": 2,
                        "lower": null,
                        "index": 40001
                    },
                    "06013C004": {
                        "code": "06013C004",
                        "name_cht": "肌酐、尿",
                        "name_eng": "Creatinine (U) CRTN",
                        "unit": "mg/dL",
                        "ref": "60-250",
                        "refmode": "mid",
                        "upper": 250,
                        "lower": 60,
                        "index": 40005
                    },
                    "06013C005": {
                        "code": "06013C005",
                        "name_cht": "尿液微量白蛋白/肌酐、尿比值",
                        "name_eng": "U ACR",
                        "unit": "mg/gm",
                        "ref": "<30",
                        "refmode": "mid",
                        "upper": 30,
                        "lower": null,
                        "index": 40006
                    },
                    "06013C006": {
                        "code": "06013C006",
                        "name_cht": "尿液總蛋白／肌酐、尿比值",
                        "name_eng": "U PCR",
                        "unit": "mg/gm",
                        "ref": "<150",
                        "refmode": "mid",
                        "upper": 150,
                        "lower": null,
                        "index": 40007
                    },
                    "06013C007": {
                        "code": "06013C007",
                        "name_cht": "白血球酯酶",
                        "name_eng": "Leukocyte rsterase",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400018
                    },
                    "06013C008": {
                        "code": "06013C008",
                        "name_cht": "尿糖",
                        "name_eng": "Urine sugar",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400021
                    },
                    "06013C009": {
                        "code": "06013C009",
                        "name_cht": "尿潛血",
                        "name_eng": "Urine occult blood",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400023
                    },
                    "06013C010": {
                        "code": "06013C010",
                        "name_cht": "比重檢驗",
                        "name_eng": "Specific gravity",
                        "unit": "-",
                        "ref": "1.010 ~ 1.025",
                        "refmode": "mid",
                        "upper": 1.025,
                        "lower": 1.01,
                        "index": 400013
                    },
                    "06013C011": {
                        "code": "06013C011",
                        "name_cht": "尿膽素原",
                        "name_eng": "Urine urobilinogen",
                        "unit": "EU/dL",
                        "ref": "<1.0",
                        "refmode": "mid",
                        "upper": 1,
                        "lower": null,
                        "index": 400014
                    },
                    "06013C012": {
                        "code": "06013C012",
                        "name_cht": "尿膽紅素",
                        "name_eng": "Urine bilirubin",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "0.2",
                        "index": 400015
                    },
                    "06013C013": {
                        "code": "06013C013",
                        "name_cht": "尿酮體",
                        "name_eng": "Ketone body",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400016
                    },
                    "06013C014": {
                        "code": "06013C014",
                        "name_cht": "尿顏色",
                        "name_eng": "color",
                        "unit": "Yellow",
                        "ref": "Yellow",
                        "refmode": false,
                        "index": 400010
                    },
                    "06013C015": {
                        "code": "06013C015",
                        "name_cht": "尿混濁度",
                        "name_eng": "turbidity",
                        "unit": "Clear",
                        "ref": "Clear",
                        "refmode": false,
                        "index": 400012
                    },
                    "06015C": {
                        "code": "06015C",
                        "name_cht": "亞硝酸鹽檢驗",
                        "name_eng": "Nitrite",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400019
                    },
                    "06017B": {
                        "code": "06017B",
                        "name_cht": "白血球酯酶",
                        "name_eng": "Leukocyte rsterase",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400018
                    },
                    "06505C": {
                        "code": "06505C",
                        "name_cht": "懷孕試驗－酵素免疫法",
                        "name_eng": "Pregnancy test-EIA",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400036
                    },
                    "07001C": {
                        "code": "07001C",
                        "name_cht": "糞便潛血化學法",
                        "name_eng": "Occult blood (chemical method)",
                        "unit": "-/+＋＋＋",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 190002
                    },
                    "07009C001": {
                        "code": "07009C001",
                        "name_cht": "糞顏色",
                        "name_eng": "Color",
                        "unit": "*",
                        "ref": "Yellow-Brown",
                        "refmode": false,
                        "index": 1900011
                    },
                    "07009C002": {
                        "code": "07009C002",
                        "name_cht": "外觀",
                        "name_eng": "Appearance",
                        "unit": "*",
                        "ref": "Formed",
                        "refmode": false,
                        "index": 1900012
                    },
                    "07009C003": {
                        "code": "07009C003",
                        "name_cht": "硬度",
                        "name_eng": "consistency",
                        "unit": "*",
                        "ref": "Soft",
                        "refmode": false,
                        "index": 1900013
                    },
                    "07009C004": {
                        "code": "07009C004",
                        "name_cht": "消化度",
                        "name_eng": "Digestion",
                        "unit": "*",
                        "ref": "Moderate",
                        "refmode": false,
                        "index": 1900014
                    },
                    "07009C005": {
                        "code": "07009C005",
                        "name_cht": "紅血球",
                        "name_eng": "Stool R.B.C",
                        "unit": "HPF",
                        "ref": "0 ~ 1",
                        "refmode": "label",
                        "label": "0-1",
                        "index": 1900015
                    },
                    "07009C006": {
                        "code": "07009C006",
                        "name_cht": "白血球",
                        "name_eng": "Stool W.B.C",
                        "unit": "HPF",
                        "ref": "0 ~ 3",
                        "refmode": "label",
                        "label": "0-3",
                        "index": 1900016
                    },
                    "07009C007": {
                        "code": "07009C007",
                        "name_cht": "寄生蟲",
                        "name_eng": "Stool Parasite",
                        "unit": "-/+",
                        "ref": "not found",
                        "refmode": "label",
                        "label": "-",
                        "index": 1900017
                    },
                    "07009C008": {
                        "code": "07009C008",
                        "name_cht": "蟲卵",
                        "name_eng": "OVA",
                        "unit": "-/+",
                        "ref": "not found",
                        "refmode": "label",
                        "label": "-",
                        "index": 1900018
                    },
                    "07009C009": {
                        "code": "07009C009",
                        "name_cht": "中性脂肪",
                        "name_eng": "Stool Neutral fat",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 1900019
                    },
                    "07009C010": {
                        "code": "07009C010",
                        "name_cht": "脂肪酸",
                        "name_eng": "Stool Fatty acid",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 1900020
                    },
                    "07009C011": {
                        "code": "07009C011",
                        "name_cht": "澱粉",
                        "name_eng": "Stool Starch",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 1900021
                    },
                    "07009C012": {
                        "code": "07009C012",
                        "name_cht": "黏液",
                        "name_eng": "Stool Mucus",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 1900022
                    },
                    "07009C013": {
                        "code": "07009C013",
                        "name_cht": "膿細胞",
                        "name_eng": "Stool pus",
                        "unit": "-/+",
                        "ref": "<0",
                        "refmode": "label",
                        "label": "-",
                        "index": 1900023
                    },
                    "07009C014": {
                        "code": "07009C014",
                        "name_cht": "潛血",
                        "name_eng": "Stool occult blood",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 1900024
                    },
                    "07011C": {
                        "code": "07011C",
                        "name_cht": "寄生蟲卵－直接抹片檢查",
                        "name_eng": "Parasite ova-direct smear",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 1900025
                    },
                    "07012C": {
                        "code": "07012C",
                        "name_cht": "寄生蟲卵－濃縮法",
                        "name_eng": "Parasite ova-conc.method of ova",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 1900026
                    },
                    "08001C": {
                        "code": "08001C",
                        "name_cht": "紅血球計數",
                        "name_eng": "R.B.C",
                        "unit": "10^6/uL",
                        "ref": "3.8 ~ 6.0",
                        "refmode": "mid",
                        "upper": 6,
                        "lower": 3.8,
                        "index": 60001
                    },
                    "08002C": {
                        "code": "08002C",
                        "name_cht": "白血球計數",
                        "name_eng": "W.B.C",
                        "unit": "10^3/uL",
                        "ref": "3.5-10.0",
                        "refmode": "mid",
                        "upper": 10,
                        "lower": 3.5,
                        "index": 60002
                    },
                    "08003C": {
                        "code": "08003C",
                        "name_cht": "血色素檢查",
                        "name_eng": "Hemoglobin (Hb)",
                        "unit": "g/dL",
                        "ref": "12 ~ 16",
                        "refmode": "mid",
                        "upper": 16,
                        "lower": 12,
                        "index": 60003
                    },
                    "08004C": {
                        "code": "08004C",
                        "name_cht": "血球比容值測定",
                        "name_eng": "Hematocrite (Hct)",
                        "unit": "%",
                        "ref": "33-47",
                        "refmode": "mid",
                        "upper": 47,
                        "lower": 33,
                        "index": 60004
                    },
                    "08005C": {
                        "code": "08005C",
                        "name_cht": "紅血球沈降速度測定",
                        "name_eng": "E.S.R. (Erythrocyte sedimentation rate)",
                        "unit": "mm/hr",
                        "ref": "0-30",
                        "refmode": "mid",
                        "upper": 30,
                        "lower": null,
                        "index": 60005
                    },
                    "08006C": {
                        "code": "08006C",
                        "name_cht": "血小板計數",
                        "name_eng": "Platelet count",
                        "unit": "10^3/uL",
                        "ref": "150-400",
                        "refmode": "mid",
                        "upper": 400,
                        "lower": 150,
                        "index": 60006
                    },
                    "08008C": {
                        "code": "08008C",
                        "name_cht": "網狀紅血球計數",
                        "name_eng": "Reticulocyte count",
                        "unit": "%",
                        "ref": "0.5-1.5",
                        "refmode": "mid",
                        "upper": 1.5,
                        "lower": 0.5,
                        "index": 60007
                    },
                    "08010C": {
                        "code": "08010C",
                        "name_cht": "嗜酸性白血球計算",
                        "name_eng": "Eosinophil count",
                        "unit": "%",
                        "ref": "<7",
                        "refmode": "mid",
                        "upper": 7,
                        "lower": null,
                        "index": 60008
                    },
                    "08011C001": {
                        "code": "08011C001",
                        "name_cht": "白血球計數",
                        "name_eng": "W.B.C",
                        "unit": "10^3/uL",
                        "ref": "3.5-10.0",
                        "refmode": "mid",
                        "upper": 10,
                        "lower": 3.5,
                        "index": 60002
                    },
                    "08011C002": {
                        "code": "08011C002",
                        "name_cht": "紅血球計數",
                        "name_eng": "R.B.C",
                        "unit": "10^6/uL",
                        "ref": "3.8-6.0",
                        "refmode": "mid",
                        "upper": 6,
                        "lower": 3.8,
                        "index": 60001
                    },
                    "08011C003": {
                        "code": "08011C003",
                        "name_cht": "血色素檢查",
                        "name_eng": "Hemoglobin (Hb)",
                        "unit": "g/dL",
                        "ref": "12 ~ 16",
                        "refmode": "mid",
                        "upper": 16,
                        "lower": 12,
                        "index": 60003
                    },
                    "08011C004": {
                        "code": "08011C004",
                        "name_cht": "血球比容值測定",
                        "name_eng": "Hematocrite (Hct)",
                        "unit": "%",
                        "ref": "33-47",
                        "refmode": "mid",
                        "upper": 47,
                        "lower": 33,
                        "index": 60004
                    },
                    "08011C005": {
                        "code": "08011C005",
                        "name_cht": "平均紅血球容積",
                        "name_eng": "MCV",
                        "unit": "fL",
                        "ref": "80-100",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": 80,
                        "index": 60009
                    },
                    "08011C006": {
                        "code": "08011C006",
                        "name_cht": "平均紅血球血紅素量",
                        "name_eng": "MCH",
                        "unit": "pg",
                        "ref": "26-34",
                        "refmode": "mid",
                        "upper": 34,
                        "lower": 26,
                        "index": 600010
                    },
                    "08011C007": {
                        "code": "08011C007",
                        "name_cht": "平均紅血球血紅素濃度",
                        "name_eng": "MCHC",
                        "unit": "g/dL",
                        "ref": "30-36",
                        "refmode": "mid",
                        "upper": 36,
                        "lower": 30,
                        "index": 600011
                    },
                    "08011C008": {
                        "code": "08011C008",
                        "name_cht": "血小板計數",
                        "name_eng": "Platelet count",
                        "unit": "10^3/uL",
                        "ref": "150-400",
                        "refmode": "mid",
                        "upper": 400,
                        "lower": 150,
                        "index": 60006
                    },
                    "08012C001": {
                        "code": "08012C001",
                        "name_cht": "白血球計數",
                        "name_eng": "W.B.C",
                        "unit": "10^3/uL",
                        "ref": "3.5-10.0",
                        "refmode": "mid",
                        "upper": 10,
                        "lower": 3.5,
                        "index": 60002
                    },
                    "08012C002": {
                        "code": "08012C002",
                        "name_cht": "紅血球計數",
                        "name_eng": "R.B.C",
                        "unit": "106/uL",
                        "ref": "3.8-6.0",
                        "refmode": "mid",
                        "upper": 6,
                        "lower": 3.8,
                        "index": 60001
                    },
                    "08012C003": {
                        "code": "08012C003",
                        "name_cht": "血色素檢查",
                        "name_eng": "Hemoglobin (Hb)",
                        "unit": "g/dL",
                        "ref": "12 ~ 16",
                        "refmode": "mid",
                        "upper": 16,
                        "lower": 20,
                        "index": 60003
                    },
                    "08012C004": {
                        "code": "08012C004",
                        "name_cht": "血球比容值測定",
                        "name_eng": "Hematocrite (Hct)",
                        "unit": "%",
                        "ref": "33-47",
                        "refmode": "mid",
                        "upper": 47,
                        "lower": 33,
                        "index": 60004
                    },
                    "08012C005": {
                        "code": "08012C005",
                        "name_cht": "平均紅血球容積",
                        "name_eng": "MCV",
                        "unit": "fL",
                        "ref": "80-100",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": 80,
                        "index": 60009
                    },
                    "08012C006": {
                        "code": "08012C006",
                        "name_cht": "平均紅血球血紅素量",
                        "name_eng": "MCH",
                        "unit": "pg",
                        "ref": "26-34",
                        "refmode": "mid",
                        "upper": 34,
                        "lower": 26,
                        "index": 600010
                    },
                    "08012C007": {
                        "code": "08012C007",
                        "name_cht": "平均紅血球血紅素濃度",
                        "name_eng": "MCHC",
                        "unit": "g/dL",
                        "ref": "30-36",
                        "refmode": "mid",
                        "upper": 36,
                        "lower": 30,
                        "index": 600011
                    },
                    "08013C001": {
                        "code": "08013C001",
                        "name_cht": "嗜中性細胞白血球",
                        "name_eng": "NEUT",
                        "unit": "%",
                        "ref": "50-70",
                        "refmode": "mid",
                        "upper": 70,
                        "lower": 50,
                        "index": 600012
                    },
                    "08013C002": {
                        "code": "08013C002",
                        "name_cht": "淋巴球白血球",
                        "name_eng": "LYMPH",
                        "unit": "%",
                        "ref": "19-48",
                        "refmode": "mid",
                        "upper": 48,
                        "lower": 19,
                        "index": 600013
                    },
                    "08013C003": {
                        "code": "08013C003",
                        "name_cht": "單核球白血球",
                        "name_eng": "MONO",
                        "unit": "%",
                        "ref": "2.0-10.0",
                        "refmode": "mid",
                        "upper": 10,
                        "lower": 2,
                        "index": 600014
                    },
                    "08013C004": {
                        "code": "08013C004",
                        "name_cht": "嗜酸性白血球計算",
                        "name_eng": "Eosinophil count",
                        "unit": "%",
                        "ref": "<7",
                        "refmode": "mid",
                        "upper": 7,
                        "lower": null,
                        "index": 60008
                    },
                    "08013C005": {
                        "code": "08013C005",
                        "name_cht": "嗜鹼細胞白血球",
                        "name_eng": "BASO",
                        "unit": "%",
                        "ref": "0.0-1.5",
                        "refmode": "mid",
                        "upper": 1.5,
                        "lower": null,
                        "index": 600015
                    },
                    "08013C006": {
                        "code": "08013C006",
                        "name_cht": "帶狀嗜中性細胞白血球",
                        "name_eng": "Band",
                        "unit": "%",
                        "ref": "0.0-5",
                        "refmode": "mid",
                        "upper": 5,
                        "lower": null,
                        "index": 600016
                    },
                    "08014C001": {
                        "code": "08014C001",
                        "name_cht": "紅血球計數",
                        "name_eng": "R.B.C",
                        "unit": "10^6/uL",
                        "ref": "3.8-6.0",
                        "refmode": "mid",
                        "upper": 6,
                        "lower": 3.8,
                        "index": 60001
                    },
                    "08014C002": {
                        "code": "08014C002",
                        "name_cht": "白血球計數",
                        "name_eng": "W.B.C",
                        "unit": "10^3/uL",
                        "ref": "3.5-10.0",
                        "refmode": "mid",
                        "upper": 10,
                        "lower": 3.5,
                        "index": 60002
                    },
                    "08014C003": {
                        "code": "08014C003",
                        "name_cht": "血色素檢查",
                        "name_eng": "Hemoglobin (Hb)",
                        "unit": "g/dL",
                        "ref": "12 ~ 16",
                        "refmode": "mid",
                        "upper": 16,
                        "lower": 12,
                        "index": 60003
                    },
                    "08026C": {
                        "code": "08026C",
                        "name_cht": "凝血酶原時間(一段式)",
                        "name_eng": "Prothrombin time",
                        "unit": "秒",
                        "ref": "9.5-11.7",
                        "refmode": "mid",
                        "upper": 11.7,
                        "lower": 9.5,
                        "index": 600017
                    },
                    "08030C": {
                        "code": "08030C",
                        "name_cht": "血紅素電泳",
                        "name_eng": "Hb electrophoresis",
                        "unit": "%",
                        "ref": "Hb A1：>95；Hb A2：1.5~3.5；Hb F：<2",
                        "refmode": false,
                        "index": 600022
                    },
                    "08036B": {
                        "code": "08036B",
                        "name_cht": "部份凝血活酶時間",
                        "name_eng": "APTT (activated partial thromboplastin time)",
                        "unit": "秒",
                        "ref": "23.9-34.9",
                        "refmode": "mid",
                        "upper": 34.9,
                        "lower": 23.9,
                        "index": 600020
                    },
                    "08077B": {
                        "code": "08077B",
                        "name_cht": "蛋白C",
                        "name_eng": "Protein C",
                        "unit": "%",
                        "ref": "80 ~ 132",
                        "refmode": "mid",
                        "upper": 132,
                        "lower": 80,
                        "index": 800027
                    },
                    "08082C001": {
                        "code": "08082C001",
                        "name_cht": "白血球計數",
                        "name_eng": "W.B.C",
                        "unit": "10^3/uL",
                        "ref": "3.5-10.0",
                        "refmode": "mid",
                        "upper": 10,
                        "lower": 3.5,
                        "index": 60002
                    },
                    "08082C002": {
                        "code": "08082C002",
                        "name_cht": "紅血球計數",
                        "name_eng": "R.B.C",
                        "unit": "106/uL",
                        "ref": "3.8-6.0",
                        "refmode": "mid",
                        "upper": 6,
                        "lower": 3.8,
                        "index": 60001
                    },
                    "08082C003": {
                        "code": "08082C003",
                        "name_cht": "血色素檢查",
                        "name_eng": "Hemoglobin (Hb)",
                        "unit": "g/dL",
                        "ref": "12 ~ 16",
                        "refmode": "mid",
                        "upper": 16,
                        "lower": 12,
                        "index": 60003
                    },
                    "08082C004": {
                        "code": "08082C004",
                        "name_cht": "血球比容值測定",
                        "name_eng": "Hematocrite (Hct)",
                        "unit": "%",
                        "ref": "33-47",
                        "refmode": "mid",
                        "upper": 47,
                        "lower": 33,
                        "index": 60004
                    },
                    "08082C005": {
                        "code": "08082C005",
                        "name_cht": "平均紅血球容積",
                        "name_eng": "MCV",
                        "unit": "fL",
                        "ref": "80-100",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": 80,
                        "index": 60009
                    },
                    "08083C": {
                        "code": "08083C",
                        "name_cht": "平均紅血球血紅素量",
                        "name_eng": "MCH",
                        "unit": "pg",
                        "ref": "26-34",
                        "refmode": "mid",
                        "upper": 34,
                        "lower": 26,
                        "index": 600010
                    },
                    "08084C": {
                        "code": "08084C",
                        "name_cht": "平均紅血球血紅素濃度",
                        "name_eng": "MCHC",
                        "unit": "g/dL",
                        "ref": "30-36",
                        "refmode": "mid",
                        "upper": 36,
                        "lower": 30,
                        "index": 600011
                    },
                    "08127C": {
                        "code": "08127C",
                        "name_cht": "平均紅血球容積",
                        "name_eng": "MCV",
                        "unit": "fL",
                        "ref": "80-100",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": 80,
                        "index": 60009
                    },
                    "08129C": {
                        "code": "08129C",
                        "name_cht": "胰島素血清檢驗",
                        "name_eng": "Ins",
                        "unit": "μU/mL",
                        "ref": "<28.8",
                        "refmode": "mid",
                        "upper": 28.8,
                        "lower": null,
                        "index": 10008
                    },
                    "09001C": {
                        "code": "09001C",
                        "name_cht": "總膽固醇",
                        "name_eng": "Cholestero1, total",
                        "unit": "mg/dL",
                        "ref": "<200",
                        "refmode": "mid",
                        "upper": 200,
                        "lower": null,
                        "index": 20001
                    },
                    "09002C": {
                        "code": "09002C",
                        "name_cht": "血中尿素氮",
                        "name_eng": "BUN, blood urea nitrogen",
                        "unit": "mg/dL",
                        "ref": "7 ~ 20",
                        "refmode": "mid",
                        "upper": 20,
                        "lower": 7,
                        "index": 30001
                    },
                    "09004C": {
                        "code": "09004C",
                        "name_cht": "三酸甘油脂",
                        "name_eng": "Triglyceride (TG)",
                        "unit": "mg/dL",
                        "ref": "<150",
                        "refmode": "mid",
                        "upper": 150,
                        "lower": null,
                        "index": 20002
                    },
                    "09005C001": {
                        "code": "09005C001",
                        "name_cht": "飯前血糖",
                        "name_eng": "Glucose-AC",
                        "unit": "mg/dL",
                        "ref": "<100",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": null,
                        "index": 10003
                    },
                    "09140C": {
                        "code": "09140C",
                        "name_cht": "飯後血糖",
                        "name_eng": "Glucose-PC",
                        "unit": "mg/dL",
                        "ref": "<130",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 10004
                    },
                    "09006C": {
                        "code": "09006C",
                        "name_cht": "醣化血紅素",
                        "name_eng": "HbA1c (Hemoglobin A1c)",
                        "unit": "%",
                        "ref": "<5.7",
                        "refmode": "mid",
                        "upper": 5.7,
                        "lower": null,
                        "index": 10005
                    },
                    "09009C": {
                        "code": "09009C",
                        "name_cht": "三碘甲狀腺原氨酸攝取率",
                        "name_eng": "T3 Uptake Ratio",
                        "unit": "%",
                        "ref": "23.2-32.6",
                        "refmode": "mid",
                        "upper": 32.6,
                        "lower": 23.2,
                        "index": 70008
                    },
                    "09010C": {
                        "code": "09010C",
                        "name_cht": "四碘甲狀腺素生化法",
                        "name_eng": "T4",
                        "unit": "ug/dL",
                        "ref": "4 ~ 12",
                        "refmode": "mid",
                        "upper": 12,
                        "lower": 4,
                        "index": 70007
                    },
                    "09011C": {
                        "code": "09011C",
                        "name_cht": "鈣",
                        "name_eng": "Ca (Calcium)",
                        "unit": "mg/dL",
                        "ref": "8.8 ~ 10.3",
                        "refmode": "mid",
                        "upper": 10.3,
                        "lower": 8.8,
                        "index": 300012
                    },
                    "09012C": {
                        "code": "09012C",
                        "name_cht": "磷",
                        "name_eng": "P (Phosphoras)",
                        "unit": "mg/dL",
                        "ref": "2.6 ~ 4.4",
                        "refmode": "mid",
                        "upper": 4.4,
                        "lower": 2.6,
                        "index": 300013
                    },
                    "09013C": {
                        "code": "09013C",
                        "name_cht": "尿酸",
                        "name_eng": "Uric acid",
                        "unit": "mg/dL",
                        "ref": "<7",
                        "refmode": "mid",
                        "upper": 7,
                        "lower": null,
                        "index": 30009
                    },
                    "09015C": {
                        "code": "09015C",
                        "name_cht": "肌酸酐、血",
                        "name_eng": "Creatinine (B) CRTN",
                        "unit": "mg/dL",
                        "ref": "0.5-1.3",
                        "refmode": "mid",
                        "upper": 1.3,
                        "lower": 0.5,
                        "index": 30002
                    },
                    "09016C": {
                        "code": "09016C",
                        "name_cht": "肌酐、尿",
                        "name_eng": "Creatinine (U) CRTN",
                        "unit": "mg/dL",
                        "ref": "60-250",
                        "refmode": "mid",
                        "upper": 250,
                        "lower": 60,
                        "index": 40005
                    },
                    "09017C": {
                        "code": "09017C",
                        "name_cht": "澱粉酶、血",
                        "name_eng": "Amylase (B)",
                        "unit": "U/L",
                        "ref": "33 ~ 96",
                        "refmode": "mid",
                        "upper": 96,
                        "lower": 33,
                        "index": 50006
                    },
                    "09021C": {
                        "code": "09021C",
                        "name_cht": "鈉",
                        "name_eng": "Na (Sodium)",
                        "unit": "mmol/L",
                        "ref": "137 ~ 149",
                        "refmode": "mid",
                        "upper": 149,
                        "lower": 137,
                        "index": 300010
                    },
                    "09022C": {
                        "code": "09022C",
                        "name_cht": "鉀",
                        "name_eng": "K (Potassium)",
                        "unit": "mmol/L",
                        "ref": "3.5 ~ 5.0",
                        "refmode": "mid",
                        "upper": 5,
                        "lower": 3.5,
                        "index": 300011
                    },
                    "09023C": {
                        "code": "09023C",
                        "name_cht": "氯",
                        "name_eng": "Cl (Chloride)",
                        "unit": "mmol/L",
                        "ref": "98 ~ 108",
                        "refmode": "mid",
                        "upper": 109,
                        "lower": 98,
                        "index": 300014
                    },
                    "09025C": {
                        "code": "09025C",
                        "name_cht": "血清麩胺酸苯醋酸轉氨基酶",
                        "name_eng": "S-GOT/AST",
                        "unit": "IU/L",
                        "ref": "<40",
                        "refmode": "mid",
                        "upper": 40,
                        "lower": null,
                        "index": 50001
                    },
                    "09026C": {
                        "code": "09026C",
                        "name_cht": "血清麩胺酸丙酮酸轉氨基酶",
                        "name_eng": "S-GPT/ALT",
                        "unit": "IU/L",
                        "ref": "<40",
                        "refmode": "mid",
                        "upper": 40,
                        "lower": null,
                        "index": 50002
                    },
                    "09027C": {
                        "code": "09027C",
                        "name_cht": "鹼性磷酯酶",
                        "name_eng": "Alkaline phosphatase",
                        "unit": "U/L",
                        "ref": "30 ~ 95",
                        "refmode": "mid",
                        "upper": 95,
                        "lower": 30,
                        "index": 50008
                    },
                    "09029C": {
                        "code": "09029C",
                        "name_cht": "膽紅素總量",
                        "name_eng": "Bilirubin total",
                        "unit": "mg/dL",
                        "ref": "0.3 ~ 1.0",
                        "refmode": "mid",
                        "upper": 1,
                        "lower": 0.3,
                        "index": 50003
                    },
                    "09030C": {
                        "code": "09030C",
                        "name_cht": "直接膽紅素",
                        "name_eng": "Bilirubin direct",
                        "unit": "mg/dL",
                        "ref": "0.0 ~ 0.4",
                        "refmode": "mid",
                        "upper": 0.4,
                        "lower": null,
                        "index": 50004
                    },
                    "09031C": {
                        "code": "09031C",
                        "name_cht": "麩胺轉酸酶",
                        "name_eng": "r-GT(r-glutamyl transferase)",
                        "unit": "IU/L",
                        "ref": "4 ~ 50",
                        "refmode": "mid",
                        "upper": 50,
                        "lower": 4,
                        "index": 50009
                    },
                    "09032C": {
                        "code": "09032C",
                        "name_cht": "肌酸磷化酶",
                        "name_eng": "CPK (Creatine-phospho-kinase)",
                        "unit": "IU/mL",
                        "ref": "<200",
                        "refmode": "mid",
                        "upper": 200,
                        "lower": null,
                        "index": 800012
                    },
                    "09033C": {
                        "code": "09033C",
                        "name_cht": "乳酸脫氫酶",
                        "name_eng": "LDH (Lactic dehydrogenase)",
                        "unit": "IU/mL",
                        "ref": "140 ~ 271",
                        "refmode": "mid",
                        "upper": 271,
                        "lower": 140,
                        "index": 800028
                    },
                    "09035C": {
                        "code": "09035C",
                        "name_cht": "總鐵結合能力",
                        "name_eng": "TIBC (TotalIron Binding Capacity)",
                        "unit": "μg/dL",
                        "ref": "48.3 ~ 68.0",
                        "refmode": "mid",
                        "upper": 68,
                        "lower": 48.3,
                        "index": 80003
                    },
                    "09038C": {
                        "code": "09038C",
                        "name_cht": "白蛋白",
                        "name_eng": "Albumin",
                        "unit": "g/dL",
                        "ref": "3.7 ~ 5.3",
                        "refmode": "mid",
                        "upper": 5.3,
                        "lower": 3.7,
                        "index": 800021
                    },
                    "09039C": {
                        "code": "09039C",
                        "name_cht": "球蛋白",
                        "name_eng": "Globubin",
                        "unit": "g/dL",
                        "ref": "3.1 ~ 3.7",
                        "refmode": "mid",
                        "upper": 3.7,
                        "lower": 3.1,
                        "index": 800022
                    },
                    "09chs003": {
                        "code": "09chs003",
                        "name_cht": "蛋白比值",
                        "name_eng": "A/G",
                        "unit": "*",
                        "ref": "",
                        "refmode": false,
                        "index": 800023
                    },
                    "09040C002": {
                        "code": "09040C002",
                        "name_cht": "全蛋白",
                        "name_eng": "Total protein",
                        "unit": "mg/dL",
                        "ref": "6.0-8.3",
                        "refmode": "mid",
                        "upper": 8.3,
                        "lower": 6,
                        "index": 40003
                    },
                    "09043C": {
                        "code": "09043C",
                        "name_cht": "高密度脂蛋白－膽固醇",
                        "name_eng": "HDL-C(highdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "男:≥40；女:≥50",
                        "refmode": "mid",
                        "upper": null,
                        "lower": gend=="男"?40:50,
                        "index": 20003
                    },
                    "09044C": {
                        "code": "09044C",
                        "name_cht": "低密度脂蛋白－膽固醇",
                        "name_eng": "LDL-C(Lowdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "<130",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 20004
                    },
                    "09064C": {
                        "code": "09064C",
                        "name_cht": "解脂酶",
                        "name_eng": "Lipase",
                        "unit": "U/L",
                        "ref": "13 ~ 60",
                        "refmode": "mid",
                        "upper": 60,
                        "lower": 13,
                        "index": 50007
                    },
                    "09071C": {
                        "code": "09071C",
                        "name_cht": "肌酸磷酸酶(MB同功酶)",
                        "name_eng": "CK-MB(Creatine phosphokinase-MB)",
                        "unit": "ng/mL",
                        "ref": "<5.0",
                        "refmode": "mid",
                        "upper": 5,
                        "lower": null,
                        "index": 800013
                    },
                    "09106C": {
                        "code": "09106C",
                        "name_cht": "游離甲狀腺素免疫分析",
                        "name_eng": "FreeT4 (EIA/LIA)",
                        "unit": "ng/dL",
                        "ref": "12 ~ 22",
                        "refmode": "mid",
                        "upper": 22,
                        "lower": 12,
                        "index": 70004
                    },
                    "09111B": {
                        "code": "09111B",
                        "name_cht": "甲狀腺球蛋白",
                        "name_eng": "Thyroglobulin (EIA/LIA)",
                        "unit": "ng/mL",
                        "ref": "<55",
                        "refmode": "mid",
                        "upper": 55,
                        "lower": null,
                        "index": 70005
                    },
                    "09112C": {
                        "code": "09112C",
                        "name_cht": "甲狀腺刺激素免疫分析",
                        "name_eng": "TSH (EIA/LIA)",
                        "unit": "μU/mL",
                        "ref": "0.35 ~ 4.94",
                        "refmode": "mid",
                        "upper": 4.94,
                        "lower": 0.35,
                        "index": 70001
                    },
                    "09117C": {
                        "code": "09117C",
                        "name_cht": "甲狀腺原氨酸免疫分析",
                        "name_eng": "T3 (EIA/LIA)",
                        "unit": "ng/mL",
                        "ref": "78 ~ 182",
                        "refmode": "mid",
                        "upper": 182,
                        "lower": 78,
                        "index": 70006
                    },
                    "09120C": {
                        "code": "09120C",
                        "name_cht": "催乳激素免疫分析",
                        "name_eng": "Prolactin (PRL),EIA/LIA",
                        "unit": "ng/mL",
                        "ref": "M：2.64~13.13，F：Premenopausal：3.34 ~ 26.72，Postmenopausal：2.74 ~ 19.64",
                        "refmode": false,
                        "index": 1200011
                    },
                    "09125C": {
                        "code": "09125C",
                        "name_cht": "濾泡刺激素免疫分析",
                        "name_eng": "FSH (EIA/LIA)",
                        "unit": "mIU/mL",
                        "ref": "Ms: 1.27-19.26 mIU/mL，FeMs: Postmenopausal: 16.74-113.59 mIU/mL，FeMs: Mid-Follicular Phase: 3.85-8.78 mIU/mL，FeMs: Mid-Cycle Peak: 4.54-22.51 mIU/mL，FeMs: Mid-Luteal Phase: 1.79-5.12 mIU/mL",
                        "refmode": false,
                        "index": 1200012
                    },
                    "09126C": {
                        "code": "09126C",
                        "name_cht": "黃體化激素免疫分析",
                        "name_eng": "LH (EIA/LIA)",
                        "unit": "mIU/mL",
                        "ref": "M：1.24-8.62，F：Postmenopausal：10.87-58.64 ，F:Mid-Follicular Phase：2.12-10.89 ，F：Mid-Cycle Peak：19.18-103.03，F：Mid-Luteal Phase：1.20-12.86",
                        "refmode": false,
                        "index": 1200013
                    },
                    "09127C": {
                        "code": "09127C",
                        "name_cht": "二氫基春情素免疫分析",
                        "name_eng": "Estradiol (E2),EIA/LIA",
                        "unit": "pg/ml",
                        "ref": "Ms ：< 20-47，Post-menopausal FeMs： < 20-40，Non-Pregnant FeMs-Mid folliculat phase：27-122，Mid luteal phase：49-291，Peri-ovulatory phase：95-433",
                        "refmode": false,
                        "index": 1200014
                    },
                    "IC85": {
                        "code": "IC85",
                        "name_cht": "糞便潛血免疫分析",
                        "name_eng": "Stool occult blood (iFOB)",
                        "unit": "ng/mL",
                        "ref": "<30",
                        "refmode": "mid",
                        "upper": 30,
                        "lower": null,
                        "index": 190001
                    },
                    "IC94": {
                        "code": "IC94",
                        "name_cht": "糞便潛血免疫分析",
                        "name_eng": "Stool occult blood (iFOB)",
                        "unit": "ng/mL",
                        "ref": "<30",
                        "refmode": "mid",
                        "upper": 30,
                        "lower": null,
                        "index": 190001
                    },
                    "09134C": {
                        "code": "09134C",
                        "name_cht": "糞便潛血免疫分析",
                        "name_eng": "Stool occult blood (iFOB)",
                        "unit": "ng/mL",
                        "ref": "<30",
                        "refmode": "mid",
                        "upper": 30,
                        "lower": null,
                        "index": 190001
                    },
                    "09chs001": {
                        "code": "09chs001",
                        "name_cht": "總膽固醇/高密度脂蛋白膽固醇比",
                        "name_eng": "T-Cho/HDL-C",
                        "unit": "*",
                        "ref": "<5",
                        "refmode": false,
                        "index": 20006
                    },
                    "09chs002": {
                        "code": "09chs002",
                        "name_cht": "低密度/高密度脂蛋白膽固醇比",
                        "name_eng": "LDL-C/HDL-C",
                        "unit": "*",
                        "ref": "0-4.8",
                        "refmode": false,
                        "index": 20007
                    },
                    "10810B": {
                        "code": "10810B",
                        "name_cht": "安非他命檢測(免疫分析)",
                        "name_eng": "Amphetamine (EIA)",
                        "unit": "ng/mL",
                        "ref": "＜500",
                        "refmode": "mid",
                        "upper": 500,
                        "lower": null,
                        "index": 800051
                    },
                    "10811B": {
                        "code": "10811B",
                        "name_cht": "嗎啡檢測(免疫分析)",
                        "name_eng": "Morphine (EIA)",
                        "unit": "ng/mL",
                        "ref": "＜300",
                        "refmode": "mid",
                        "upper": 300,
                        "lower": null,
                        "index": 800052
                    },
                    "11001C": {
                        "code": "11001C",
                        "name_cht": "ABO血型測定檢驗",
                        "name_eng": "A.B.AB.O blood grouping",
                        "unit": "A.B.AB.O",
                        "ref": "Type A,B,O,AB",
                        "refmode": false,
                        "index": 600023
                    },
                    "11003C": {
                        "code": "11003C",
                        "name_cht": "RH（D）型檢驗",
                        "name_eng": "Rh type",
                        "unit": "N/P",
                        "ref": "RH(+)、RH(-)",
                        "refmode": false,
                        "index": 600024
                    },
                    "12001C": {
                        "code": "12001C",
                        "name_cht": "梅毒試驗",
                        "name_eng": "RPR/VDRL test",
                        "unit": "-/+",
                        "ref": "Non-reactive",
                        "refmode": "label",
                        "label": "-",
                        "index": 1100021
                    },
                    "12002B": {
                        "code": "12002B",
                        "name_cht": "傷寒凝集試驗",
                        "name_eng": "Widal & Weil-Felix test",
                        "unit": "-/+",
                        "ref": "80x",
                        "refmode": "label",
                        "label": "-",
                        "index": 110001
                    },
                    "12002B001": {
                        "code": "12002B001",
                        "name_cht": "Widal Typhoid O",
                        "name_eng": "Widal Typhoid O",
                        "unit": "-/+",
                        "ref": "80x",
                        "refmode": "label",
                        "label": "-",
                        "index": 110002
                    },
                    "12002B002": {
                        "code": "12002B002",
                        "name_cht": "Widal Typhoid H",
                        "name_eng": "Widal Typhoid H",
                        "unit": "-/+",
                        "ref": "80x",
                        "refmode": "label",
                        "label": "-",
                        "index": 110003
                    },
                    "12002B003": {
                        "code": "12002B003",
                        "name_cht": "Weil-Felix OX-19",
                        "name_eng": "Weil-Felix OX-19",
                        "unit": "-/+",
                        "ref": "80x",
                        "refmode": "label",
                        "label": "-",
                        "index": 110004
                    },
                    "12002B004": {
                        "code": "12002B004",
                        "name_cht": "Weil-Felix OX-2",
                        "name_eng": "Weil-Felix OX-2",
                        "unit": "-/+",
                        "ref": "80x",
                        "refmode": "label",
                        "label": "-",
                        "index": 110005
                    },
                    "12002B005": {
                        "code": "12002B005",
                        "name_cht": "Weil-Felix OX-K",
                        "name_eng": "Weil-Felix OX-K",
                        "unit": "-/+",
                        "ref": "80x",
                        "refmode": "label",
                        "label": "-",
                        "index": 110006
                    },
                    "12002B006": {
                        "code": "12002B006",
                        "name_cht": "Paratyphi A",
                        "name_eng": "Paratyphi A",
                        "unit": "-/+",
                        "ref": "80x",
                        "refmode": "label",
                        "label": "-",
                        "index": 110007
                    },
                    "12002B007": {
                        "code": "12002B007",
                        "name_cht": "Paratyphi B",
                        "name_eng": "Paratyphi B",
                        "unit": "-/+",
                        "ref": "80x",
                        "refmode": "label",
                        "label": "-",
                        "index": 110008
                    },
                    "12007C": {
                        "code": "12007C",
                        "name_cht": "α－胎兒蛋白檢驗",
                        "name_eng": "AFP α-fetoprotein（EIA/LIA）",
                        "unit": "ng/mL",
                        "ref": "0 ~ 7",
                        "refmode": "mid",
                        "upper": 7,
                        "lower": null,
                        "index": 500010
                    },
                    "12009C": {
                        "code": "12009C",
                        "name_cht": "類風濕性關節炎因子試驗-乳膠凝集法",
                        "name_eng": "Rheumatoid factor test- Latex agglutination",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 90005
                    },
                    "12011C": {
                        "code": "12011C",
                        "name_cht": "類風濕性關節炎因子試驗－免疫比濁法",
                        "name_eng": "Rheumatoid factor test- Nephelometry",
                        "unit": "IU/mL",
                        "ref": "<17.0",
                        "refmode": "mid",
                        "upper": 17,
                        "lower": null,
                        "index": 90006
                    },
                    "12013C": {
                        "code": "12013C",
                        "name_cht": "Ｃ反應性蛋白試驗—乳膠凝集法",
                        "name_eng": "C.R.P (C-reactive protein)- Latex agglutination",
                        "unit": "mg/dL",
                        "ref": "<0.5",
                        "refmode": "mid",
                        "upper": 0.5,
                        "lower": null,
                        "index": 800024
                    },
                    "12015C001": {
                        "code": "12015C001",
                        "name_cht": "Ｃ反應性蛋白試驗 － 免疫比濁法",
                        "name_eng": "C.R.P(C-reactive protein)- Nephelometry",
                        "unit": "mg/dL",
                        "ref": "<0.748",
                        "refmode": "mid",
                        "upper": 0.748,
                        "lower": null,
                        "index": 800025
                    },
                    "12015C002": {
                        "code": "12015C002",
                        "name_cht": "高敏感度C反應性蛋白試驗",
                        "name_eng": "hs-CRP",
                        "unit": "mg/dL",
                        "ref": "<0.5",
                        "refmode": "mid",
                        "upper": 0.5,
                        "lower": null,
                        "index": 800026
                    },
                    "12021C": {
                        "code": "12021C",
                        "name_cht": "癌胚胎抗原檢驗",
                        "name_eng": "CEA（EIA/LIA）",
                        "unit": "ng/ml",
                        "ref": "≦5.0",
                        "refmode": "mid",
                        "upper": 5,
                        "lower": null,
                        "index": 100001
                    },
                    "12031C": {
                        "code": "12031C",
                        "name_cht": "免疫球蛋白Ｅ",
                        "name_eng": "IgE",
                        "unit": "IU/mL",
                        "ref": "1.31 ~ 165.3",
                        "refmode": "mid",
                        "upper": 165.3,
                        "lower": 1.31,
                        "index": 90001
                    },
                    "12077B": {
                        "code": "12077B",
                        "name_cht": "ＣＡ–１２５腫瘤標記(EIA/LIA法)",
                        "name_eng": "CA-125 (EIA/LIA)",
                        "unit": "U/mL",
                        "ref": "<35",
                        "refmode": "mid",
                        "upper": 35,
                        "lower": null,
                        "index": 100002
                    },
                    "12079B": {
                        "code": "12079B",
                        "name_cht": "ＣＡ–１９９ 腫瘤標記(EIA/LIA法)",
                        "name_eng": "CA-199 (EIA/LIA)",
                        "unit": "U/mL",
                        "ref": "<37",
                        "refmode": "mid",
                        "upper": 37,
                        "lower": null,
                        "index": 100003
                    },
                    "12080B": {
                        "code": "12080B",
                        "name_cht": "SCC腫瘤標記(EIA/LIA法)",
                        "name_eng": "SCC (EIA/LIA)",
                        "unit": "ng/mL",
                        "ref": "< 2.5",
                        "refmode": "mid",
                        "upper": 2.5,
                        "lower": null,
                        "index": 100005
                    },
                    "12081C": {
                        "code": "12081C",
                        "name_cht": "攝護腺特異抗原(EIA/LIA法)",
                        "name_eng": "PSA (prostate specific antigen) (EIA/LIA)",
                        "unit": "ng/mL",
                        "ref": "0 ~ 4.0",
                        "refmode": "mid",
                        "upper": 4,
                        "lower": null,
                        "index": 100006
                    },
                    "12106C": {
                        "code": "12106C",
                        "name_cht": "結核菌素測驗",
                        "name_eng": "Tuberculin test",
                        "unit": "mm",
                        "ref": "(1)國小一年級學童：無接種卡介苗疫苗者反應>=10者為陽性，<10者為陰性 ，(2)指標個案之接觸者：>=10者為陽性，<10者為陰性， (3)接觸者如為人類免疫不全病毒感染，或惡性疾病(惡性腫瘤)，或器官移植，或其他免疫功能不全病患：>=5者為陽性，<5者為陰性",
                        "refmode": false,
                        "index": 1100031
                    },
                    "12111C": {
                        "code": "12111C",
                        "name_cht": "微白蛋白（免疫比濁法）",
                        "name_eng": "Microalbumin (Nephelometry)",
                        "unit": "mg/dL",
                        "ref": "< 2",
                        "refmode": "mid",
                        "upper": 2,
                        "lower": null,
                        "index": 40001
                    },
                    "12116C": {
                        "code": "12116C",
                        "name_cht": "鐵蛋白",
                        "name_eng": "Ferritin (EIA/LIA)",
                        "unit": "ng/mL",
                        "ref": "10-300",
                        "refmode": "mid",
                        "upper": 300,
                        "lower": 10,
                        "index": 80002
                    },
                    "13005B": {
                        "code": "13005B",
                        "name_cht": "披衣菌檢查（定性）",
                        "name_eng": "DNA test for chlamydia (qualitative)",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 1100023
                    },
                    "13006C": {
                        "code": "13006C",
                        "name_cht": "排泄物，滲出物及分泌物之細菌顯微鏡檢查",
                        "name_eng": "Microscopic examination",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 1100011
                    },
                    "13007C": {
                        "code": "13007C",
                        "name_cht": "細菌培養鑑定檢查（包括一般細菌、真菌、原蟲等為對象的培養鑑定，抗酸菌除外）",
                        "name_eng": "Bacterial culture and identify",
                        "unit": "-/+",
                        "ref": "No growth in 48 hours",
                        "refmode": "label",
                        "label": "-",
                        "index": 1100012
                    },
                    "13007C001": {
                        "code": "13007C001",
                        "name_cht": "沙門氏菌培養",
                        "name_eng": "Samonella Culture",
                        "unit": "-/+",
                        "ref": "No growth in 48 hours",
                        "refmode": "label",
                        "label": "-",
                        "index": 110009
                    },
                    "13007C002": {
                        "code": "13007C002",
                        "name_cht": "志賀氏菌培養",
                        "name_eng": "Shigella Culture",
                        "unit": "-/+",
                        "ref": "No growth in 48 hours",
                        "refmode": "label",
                        "label": "-",
                        "index": 1100010
                    },
                    "13012C": {
                        "code": "13012C",
                        "name_cht": "抗酸菌培養",
                        "name_eng": "Acid-fast culture",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 1100032
                    },
                    "13013C": {
                        "code": "13013C",
                        "name_cht": "抗酸菌鑑定檢查",
                        "name_eng": "Acid-Fast  Exam",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 1100033
                    },
                    "13015C": {
                        "code": "13015C",
                        "name_cht": "抗酸菌藥物敏感性試驗—四種藥物以上",
                        "name_eng": "Sensitivity test of acid-fast",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 1100034
                    },
                    "13025C": {
                        "code": "13025C",
                        "name_cht": "抗酸性濃縮抹片染色檢查",
                        "name_eng": "Acid-fast stain",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 1100035
                    },
                    "13026C": {
                        "code": "13026C",
                        "name_cht": "抗酸菌培養(限同時使用固態培養基及具自動化偵測功能之液態培養系統)",
                        "name_eng": "Mycobacteria culture",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 1100036
                    },
                    "14032C001": {
                        "code": "14032C001",
                        "name_cht": "Ｂ型肝炎表面抗原",
                        "name_eng": "HBsAg (EIA/LIA)",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜1.0 Reactive：≧1.0",
                        "refmode": "label",
                        "label": "-",
                        "index": 500021
                    },
                    "14032C002": {
                        "code": "14032C002",
                        "name_cht": "Ｂ型肝炎表面抗原(數值)",
                        "name_eng": "HBsAg (EIA/LIA)",
                        "unit": "S/CO",
                        "ref": "<1",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 500022
                    },
                    "14033C": {
                        "code": "14033C",
                        "name_cht": "Ｂ型肝炎表面抗體",
                        "name_eng": "Anti HBs",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜10 ，Reactive：≧10",
                        "refmode": "label",
                        "label": "-",
                        "index": 500030
                    },
                    "14035C": {
                        "code": "14035C",
                        "name_cht": "B型肝炎e抗原檢查HBeAg",
                        "name_eng": "HBeAg (EIA/LIA)",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜1.0 Reactive：≧1.0",
                        "refmode": "label",
                        "label": "-",
                        "index": 500024
                    },
                    "14036C": {
                        "code": "14036C",
                        "name_cht": "Ｂ型肝炎Ｅ抗體檢查",
                        "name_eng": "Anti-HBe（EIA/LIA）",
                        "unit": "-/+",
                        "ref": "Non-reactive：＞1.0 ，Reactive：≦1.0",
                        "refmode": "label",
                        "label": "-",
                        "index": 500025
                    },
                    "14037C": {
                        "code": "14037C",
                        "name_cht": "Ｂ型肝炎核心抗體檢查",
                        "name_eng": "Anti-HBc（EIA/LIA）",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜1.0 ，Reactive：>=1.0",
                        "refmode": "label",
                        "label": "-",
                        "index": 500026
                    },
                    "14038C": {
                        "code": "14038C",
                        "name_cht": "Ｂ型肝炎核心抗體免疫球蛋白Ｍ檢查(EIA/LIA法)",
                        "name_eng": "Anti-HBc IgM (EIA/LIA)",
                        "unit": "-/+",
                        "ref": "Negative：＜0.5，Grayzone：0.5-0.99 ，Positive：≧1.0",
                        "refmode": "label",
                        "label": "-",
                        "index": 500027
                    },
                    "14039C": {
                        "code": "14039C",
                        "name_cht": "Ａ型肝炎抗體免疫球蛋白Ｍ檢查（EIA/LIA法）",
                        "name_eng": "Anti-HAV IgM（EIA/LIA）",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜0.80 ，Grayzone：0.80～1.20 ，Reactive： ＞1.20",
                        "refmode": "label",
                        "label": "-",
                        "index": 500036
                    },
                    "14040C": {
                        "code": "14040C",
                        "name_cht": "Ａ型肝炎抗體",
                        "name_eng": "Anti HAV",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜1.0，Reactive    ：＞=1.0",
                        "refmode": "label",
                        "label": "-",
                        "index": 500037
                    },
                    "E3046C": {
                        "code": "E3046C",
                        "name_cht": "HIV 抗原/抗體複合型初步檢驗",
                        "name_eng": "HIV Ag/Ab Combo test",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜1.0，Reactive    ：＞=1.1",
                        "refmode": "label",
                        "label": "-",
                        "index": 1100024
                    },
                    "14051C001": {
                        "code": "14051C001",
                        "name_cht": "Ｃ型肝炎病毒抗體檢查",
                        "name_eng": "HCV Ab (EIA/LIA)",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 500031
                    },
                    "14051C002": {
                        "code": "14051C002",
                        "name_cht": "Ｃ型肝炎病毒抗體檢查(數值)",
                        "name_eng": "HCV Ab (EIA/LIA)",
                        "unit": "S/Co",
                        "ref": "Non-reactive：＜1.0，Reactive    ：＞=1.0",
                        "refmode": "mid",
                        "upper": 1,
                        "lower": null,
                        "index": 500032
                    },
                    "17019C": {
                        "code": "17019C",
                        "name_cht": "支氣管激發試驗",
                        "name_eng": "Bronchial provocation test",
                        "unit": "-/+",
                        "ref": "第一秒吐氣量或用力吐氣肺活量絕對值增加大於200ml，且前後第一秒吐氣量或用力吐氣肺活量增加比率大於12%時，則認為支氣管擴張測驗為陽性。",
                        "refmode": false,
                        "index": 999900041
                    },
                    "18001C": {
                        "code": "18001C",
                        "name_cht": "心電圖",
                        "name_eng": "E.K.G. (Electrocardiography)",
                        "unit": "*",
                        "ref": "",
                        "refmode": false,
                        "index": 999900051
                    },
                    "27004C": {
                        "code": "27004C",
                        "name_cht": "甲狀腺刺激素放射免疫分析",
                        "name_eng": "TSH(thyroid stimulating hormone)",
                        "unit": "uIU/mL",
                        "ref": "0.27 ~ 4.2",
                        "refmode": "mid",
                        "upper": 4.2,
                        "lower": 0.27,
                        "index": 70002
                    },
                    "27065B": {
                        "code": "27065B",
                        "name_cht": "微白蛋白",
                        "name_eng": "Microalbumin",
                        "unit": "mg/dL",
                        "ref": "< 2",
                        "refmode": "mid",
                        "upper": 2,
                        "lower": null,
                        "index": 40002
                    },
                    "30022C": {
                        "code": "30022C",
                        "name_cht": "特異過敏原免疫檢驗",
                        "name_eng": "Specific Allergen Test",
                        "unit": "-/+",
                        "ref": "<0.35",
                        "refmode": "mid",
                        "upper": 0.35,
                        "lower": null,
                        "index": 90003
                    },
                    "L1001C001": {
                        "code": "L1001C001",
                        "name_cht": "Ｂ型肝炎表面抗原",
                        "name_eng": "HBsAg (EIA/LIA)",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜1.0 Reactive：≧1.0",
                        "refmode": "label",
                        "label": "-",
                        "index": 500021
                    },
                    "L1001C002": {
                        "code": "L1001C002",
                        "name_cht": "Ｃ型肝炎病毒抗體檢查",
                        "name_eng": "HCV Ab(EIA/LIA)",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 500031
                    },
                    "L1001C003": {
                        "code": "L1001C003",
                        "name_cht": "Ｂ型肝炎表面抗原",
                        "name_eng": "HBsAg (EIA/LIA)",
                        "unit": "S/Co",
                        "ref": "Non-reactive：＜1.0，Reactive：＞=1.0",
                        "refmode": "mid",
                        "upper": 1,
                        "lower": null,
                        "index": 500021
                    },
                    "L1001C004": {
                        "code": "L1001C004",
                        "name_cht": "Ｃ型肝炎病毒抗體檢查",
                        "name_eng": "HCV Ab(EIA/LIA)",
                        "unit": "S/Co",
                        "ref": "Non-reactive：＜1.0，Reactive：＞=1.0",
                        "refmode": "mid",
                        "upper": 1,
                        "lower": null,
                        "index": 500031
                    },
                    "Y00001": {
                        "code": "Y00001",
                        "name_cht": "腎絲球過濾率計算",
                        "name_eng": "eGFR",
                        "unit": "ml/min/1.73m^2",
                        "ref": ">60",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 60,
                        "index": 30004
                    },
                    "Y00001002": {
                        "code": "Y00001002",
                        "name_cht": "腎絲球過濾率計算(EPI)",
                        "name_eng": "eGFR",
                        "unit": "ml/min/1.73m^2",
                        "ref": ">60",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 60,
                        "index": 30003
                    },
                    "Y00008": {
                        "code": "Y00008",
                        "name_cht": "慢性腎臟病期數",
                        "name_eng": "CKD Stage",
                        "unit": "",
                        "ref": "第0期：正常",
                        "refmode": "label",
                        "label": "0",
                        "index": 30006
                    },
                    "Y00008002": {
                        "code": "Y00008002",
                        "name_cht": "慢性腎臟病期數(EPI)",
                        "name_eng": "CKD Stage",
                        "unit": "",
                        "ref": "第0期：正常",
                        "refmode": "label",
                        "label": "0",
                        "index": 30005
                    },
                    "Y00002001": {
                        "code": "Y00002001",
                        "name_cht": "尿蛋白(數值)／肌酐、尿比值",
                        "name_eng": "U PCR",
                        "unit": "mg/gm",
                        "ref": "<150",
                        "refmode": "mid",
                        "upper": 150,
                        "lower": null,
                        "index": 40008
                    },
                    "Y00002002": {
                        "code": "Y00002002",
                        "name_cht": "尿液微量白蛋白/肌酐、尿比值",
                        "name_eng": "U ACR",
                        "unit": "mg/gm",
                        "ref": "<30",
                        "refmode": "mid",
                        "upper": 30,
                        "lower": null,
                        "index": 40006
                    },
                    "Y00006001": {
                        "code": "Y00006001",
                        "name_cht": "收縮壓",
                        "name_eng": "Systolic pressure",
                        "unit": "mmHg",
                        "ref": "<130",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 99990004
                    },
                    "Y00006002": {
                        "code": "Y00006002",
                        "name_cht": "舒張壓",
                        "name_eng": "Diastolic pressure",
                        "unit": "mmHg",
                        "ref": "<80",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 99990005
                    },
                    "Y00004": {
                        "code": "Y00004",
                        "name_cht": "身高",
                        "name_eng": "height",
                        "unit": "cm",
                        "ref": "",
                        "refmode": false,
                        "index": 99990001
                    },
                    "Y00005": {
                        "code": "Y00005",
                        "name_cht": "體重",
                        "name_eng": "body weight",
                        "unit": "kg",
                        "ref": "",
                        "refmode": false,
                        "index": 99990002
                    },
                    "Y00007": {
                        "code": "Y00007",
                        "name_cht": "抽菸習慣",
                        "name_eng": "Smoking habit",
                        "unit": "*",
                        "ref": "",
                        "refmode": false,
                        "index": 999900012
                    },
                    "14044B": {
                        "code": "14044B",
                        "name_cht": "德國麻疹免疫球蛋白Ｇ檢查（EIA/LIA法）",
                        "name_eng": "Anti-rubella IgG(EIA法)",
                        "unit": "IU/mL",
                        "ref": "Non-reactive：<10 Reactive：≧15",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 10,
                        "index": 1100026
                    },
                    "14045B": {
                        "code": "14045B",
                        "name_cht": "德國麻疹免疫球蛋白M檢查（EIA/LIA法）",
                        "name_eng": "Anti-rubella IgM(EIA法)",
                        "unit": "IU/mL",
                        "ref": "Negative：<1.20 Positive：≧1.6",
                        "refmode": "mid",
                        "upper": 1.6,
                        "lower": null,
                        "index": 1100027
                    },
                    "07016C": {
                        "code": "07016C",
                        "name_cht": "蟯蟲膠片",
                        "name_eng": "Perianal swab",
                        "unit": "-/+",
                        "ref": "not found",
                        "refmode": "label",
                        "label": "-",
                        "index": 999900061
                    },
                    "09131C": {
                        "code": "09131C",
                        "name_cht": "春情素醇酵素免疫分析",
                        "name_eng": "Estriol (E3), EIA/LIA",
                        "unit": "ng/ml",
                        "ref": "0.50-2.00 MoM",
                        "refmode": "mid",
                        "upper": 2,
                        "lower": 0.5,
                        "index": 1200015
                    },
                    "13018C": {
                        "code": "13018C",
                        "name_cht": "幽門桿菌檢驗",
                        "name_eng": "Helicobacter pylori test (Clo test)",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 190004
                    },
                    "10511C": {
                        "code": "10511C",
                        "name_cht": "長葉毛地黃",
                        "name_eng": "Digoxin",
                        "unit": "ng/ml",
                        "ref": "0.8-2.0",
                        "refmode": "mid",
                        "upper": 2,
                        "lower": 0.8,
                        "index": 800053
                    },
                    "09020C": {
                        "code": "09020C",
                        "name_cht": "鐵",
                        "name_eng": "Fe (Iron-bound)",
                        "unit": "ug/dL",
                        "ref": "30-170",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 80001
                    },
                    "12078B": {
                        "code": "12078B",
                        "name_cht": "ＣＡ–１５３腫瘤標記 (EIA/LIA法)",
                        "name_eng": "CA-153 (EIA/LIA)",
                        "unit": "U/mL",
                        "ref": "<31.3",
                        "refmode": "mid",
                        "upper": 31.3,
                        "lower": null,
                        "index": 100004
                    },
                    "12053C": {
                        "code": "12053C",
                        "name_cht": "抗核抗體(間接免疫螢光法)",
                        "name_eng": "ANA(Antinuclear Antibodies)",
                        "unit": "-/+",
                        "ref": "Negative：40X",
                        "refmode": "label",
                        "label": "-",
                        "index": 90008
                    },
                    "12053C001": {
                        "code": "12053C001",
                        "name_cht": "抗核抗體(間接免疫螢光法)",
                        "name_eng": "ANA titer",
                        "unit": "-/+",
                        "ref": "Negative：40X",
                        "refmode": "label",
                        "label": "-",
                        "index": 90008
                    },
                    "12053C002": {
                        "code": "12053C002",
                        "name_cht": "抗核抗體(間接免疫螢光法)",
                        "name_eng": "ANA result",
                        "unit": "",
                        "ref": "",
                        "refmode": "label",
                        "label": "-",
                        "index": 90008
                    },
                    "09113B": {
                        "code": "09113B",
                        "name_cht": "皮質素免疫分析",
                        "name_eng": "Cortisol",
                        "unit": "ug/dL",
                        "ref": "6.7-22.6",
                        "refmode": "mid",
                        "upper": 22.6,
                        "lower": 6.7,
                        "index": 120001
                    },
                    "09105C": {
                        "code": "09105C",
                        "name_cht": "黃體脂酮免疫分析",
                        "name_eng": "Progesteron (EIA/LIA)",
                        "unit": "ng/ml",
                        "ref": "0.1-0.84",
                        "refmode": "mid",
                        "upper": 0.84,
                        "lower": 0.1,
                        "index": 1200016
                    },
                    "12018C": {
                        "code": "12018C",
                        "name_cht": "梅毒螺旋體抗體試驗",
                        "name_eng": "TPPA/TPHA test",
                        "unit": "-/+",
                        "ref": "Non-reactive",
                        "refmode": "label",
                        "label": "-",
                        "index": 1100022
                    },
                    "07003C": {
                        "code": "07003C",
                        "name_cht": "阿米巴檢驗 (直接法)",
                        "name_eng": "Amoeba (direct smear)",
                        "unit": "-/+",
                        "ref": "not found",
                        "refmode": "label",
                        "label": "-",
                        "index": 1900027
                    },
                    "08009C": {
                        "code": "08009C",
                        "name_cht": "紅血球型態",
                        "name_eng": "RBC morphology",
                        "unit": "",
                        "ref": "Normocytic",
                        "refmode": false,
                        "index": 6000
                    },
                    "09107C": {
                        "code": "09107C",
                        "name_cht": "游離三碘甲狀腺素免疫分析",
                        "name_eng": "Free T3 (EIA/LIA)",
                        "unit": "pg/mL",
                        "ref": "2.5-3.9",
                        "refmode": "mid",
                        "upper": 3.9,
                        "lower": 2.5,
                        "index": 70003
                    },
                    "12198C": {
                        "code": "12198C",
                        "name_cht": "游離攝護腺特異抗原",
                        "name_eng": "Free PSA (EIA/LIA)",
                        "unit": "ng/ml",
                        "ref": "0.2-4.9",
                        "refmode": "mid",
                        "upper": 4.9,
                        "lower": 0.2,
                        "index": 100007
                    },
                    "06chs001": {
                        "code": "06chs001",
                        "name_cht": "肌酐酸廓清率",
                        "name_eng": "Creatinine clearance rate (CCR)",
                        "unit": "mL/min",
                        "ref": ">60",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 60,
                        "index": 30007
                    },
                    "12027B": {
                        "code": "12027B",
                        "name_cht": "免疫球蛋白A-免疫比濁法",
                        "name_eng": "IgA(Nephelometry)",
                        "unit": "mg/dL",
                        "ref": "40-230",
                        "refmode": "mid",
                        "upper": 230,
                        "lower": 40,
                        "index": 90002
                    },
                    "15017C": {
                        "code": "15017C",
                        "name_cht": "婦科細胞檢查(子宮頸細胞病理檢驗)",
                        "name_eng": "Cervical Cytology(Pap's smear；cytology)",
                        "unit": "-/+",
                        "ref": "Normal",
                        "refmode": false,
                        "index": 999900022
                    },
                    "30021C": {
                        "code": "30021C",
                        "name_cht": "過敏原試驗(定性)",
                        "name_eng": "Allergen test(qualitative)",
                        "unit": "PAU/L",
                        "ref": "<0.35",
                        "refmode": "mid",
                        "upper": 0.35,
                        "lower": null,
                        "index": 90004
                    },
                    "12022C": {
                        "code": "12022C",
                        "name_cht": "乙型人類絨毛膜促性腺激素",
                        "name_eng": "β-HCG (EIA)",
                        "unit": "mIU/mL",
                        "ref": "停經前菲懷孕婦女 ≦1 ；停經後婦女≦7；男性≦2",
                        "refmode": false,
                        "index": 1200017
                    },
                    "09138C": {
                        "code": "09138C",
                        "name_cht": "直接及總膽紅素比值",
                        "name_eng": "Direct Bilirubin/Total Bilirubin Ratio",
                        "unit": "mg/dL",
                        "ref": "0.2-1.2",
                        "refmode": "mid",
                        "upper": 1.2,
                        "lower": 0.2,
                        "index": 50005
                    },
                    "09121C": {
                        "code": "09121C",
                        "name_cht": "睪丸酯醇免疫分析",
                        "name_eng": "Testosterone (EIA/LIA)",
                        "unit": "ng/mL",
                        "ref": "男性：1.75-7.81；女性：0-0.75",
                        "refmode": false,
                        "index": 1200018
                    },
                    "09108C": {
                        "code": "09108C",
                        "name_cht": "生長激素免疫分析",
                        "name_eng": "GH (Growth hormon), EIA/LIA",
                        "unit": "ng/mL",
                        "ref": "男性：0.003-0.971；女性：0.010-3.607",
                        "refmode": false,
                        "index": 1200019
                    },
                    "09103C": {
                        "code": "09103C",
                        "name_cht": "胰島素免疫分析",
                        "name_eng": "Insulin(EIA/LIA)",
                        "unit": "mU/L",
                        "ref": "1.5-17",
                        "refmode": "mid",
                        "upper": 1.5,
                        "lower": 17,
                        "index": 10007
                    },
                    "16008C": {
                        "code": "16008C",
                        "name_cht": "關節囊液分析-常規檢查",
                        "name_eng": "Synovial fluid analysis-Routine",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 999900071
                    },
                    "14068B": {
                        "code": "14068B",
                        "name_cht": "帶狀皰疹病毒IgG抗體試驗",
                        "name_eng": "Varicella/zoster-1gG",
                        "unit": "mIU/mL",
                        "ref": "Negative：<150；Positive：≧150",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 150,
                        "index": 1100029
                    },
                    "14013B": {
                        "code": "14013B",
                        "name_cht": "帶狀皰疹病毒IgM抗體試驗",
                        "name_eng": "Varicella/zoster-1gM",
                        "unit": "mIU/mL",
                        "ref": "Negative：0.9-1.09 Index；Positive：≧1.1 Index",
                        "refmode": "mid",
                        "upper": 1.1,
                        "lower": null,
                        "index": 1100030
                    },
                    "14070B": {
                        "code": "14070B",
                        "name_cht": "麻疹病毒抗體IgG",
                        "name_eng": "Measlease IgG",
                        "unit": "AU/mL",
                        "ref": "Negative：<1.35；Equivocal：1.35-16.4；Positive：≧16.5",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 16.5,
                        "index": 1100025
                    },
                    "12182C": {
                        "code": "12182C",
                        "name_cht": "(B型肝炎病毒)去氧核醣核酸類定性擴增試驗",
                        "name_eng": "(HBV)DNA qualitative amplification test)",
                        "unit": "-/+",
                        "ref": "undetectable",
                        "refmode": "label",
                        "label": "undetectable",
                        "index": 500028
                    },
                    "12183C": {
                        "code": "12183C",
                        "name_cht": "(C型肝炎病毒)核醣核酸類定性擴增試驗",
                        "name_eng": "(HCV)RNA qualitative amplification test)",
                        "unit": "-/+",
                        "ref": "undetectable",
                        "refmode": "label",
                        "label": "undetectable",
                        "index": 500033
                    },
                    "12184C": {
                        "code": "12184C",
                        "name_cht": "(B型肝炎病毒)去氧核醣核酸類定量",
                        "name_eng": "(HBV)-DNA(定量)PCR",
                        "unit": "-/+",
                        "ref": "undetectable",
                        "index": 500029
                    },
                    "12185C": {
                        "code": "12185C",
                        "name_cht": "(C型肝炎病毒)核醣核酸類定量擴增試驗",
                        "name_eng": "(HCV)RNA qualitative amplification test)",
                        "unit": "-/+",
                        "ref": "undetectable",
                        "index": 500034
                    },
                    "09028C": {
                        "code": "09028C",
                        "name_cht": "酸性磷酯脢",
                        "name_eng": "Acid phosphatase",
                        "unit": "U/L",
                        "ref": "0.00-0.80",
                        "refmode": "mid",
                        "upper": 0.8,
                        "lower": null,
                        "index": 800051
                    },
                    "10501C": {
                        "code": "10501C",
                        "name_cht": "卡巴馬平",
                        "name_eng": "Carbamazepine",
                        "unit": "ug/mL",
                        "ref": "4.0-12.0",
                        "refmode": "mid",
                        "upper": 12,
                        "lower": 4,
                        "index": 800055
                    },
                    "10510C": {
                        "code": "10510C",
                        "name_cht": "發爾波克",
                        "name_eng": "Valproic acid",
                        "unit": "ug/mL",
                        "ref": "50-100",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": 50,
                        "index": 800056
                    },
                    "09chs004": {
                        "code": "09chs004",
                        "name_cht": "國際標準化比值",
                        "name_eng": "INR(International Normalize Ratio)",
                        "unit": "sec",
                        "ref": "10.6-12.4",
                        "refmode": "mid",
                        "upper": 12.4,
                        "lower": 10.6,
                        "index": 600018
                    },
                    "09chs005": {
                        "code": "09chs005",
                        "name_cht": "平均正常凝血酶原時間",
                        "name_eng": "MNPT(Mean Normal Prothrombin Time)",
                        "unit": "sec",
                        "ref": "11.27",
                        "refmode": false,
                        "index": 600019
                    },
                    "09chs006": {
                        "code": "09chs006",
                        "name_cht": "低密度脂蛋白-膽固醇(計算值)",
                        "name_eng": "LDL-C(Lowdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "<130",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 20005
                    },
                    "09128C": {
                        "code": "09128C",
                        "name_cht": "C-胜鏈胰島素免疫分析",
                        "name_eng": "C-peptide",
                        "unit": "ng/mL",
                        "ref": "0.81-3.85",
                        "refmode": "mid",
                        "upper": 3.85,
                        "lower": 0.81,
                        "index": 10009
                    },
                    "09122C": {
                        "code": "09122C",
                        "name_cht": "Intact副甲狀腺素免疫分析",
                        "name_eng": "PTH-i(Parathyroid Hormone Intact)",
                        "unit": "pg/mL",
                        "ref": "15-65",
                        "refmode": "mid",
                        "upper": 65,
                        "lower": 15,
                        "index": 70009
                    },
                    "12151C": {
                        "code": "12151C",
                        "name_cht": "高半胱胺酸",
                        "name_eng": "Hcy(Homocysteine)",
                        "unit": "umol/L",
                        "ref": "5.0-20.0",
                        "refmode": "mid",
                        "upper": 20,
                        "lower": 5,
                        "index": 800029
                    },
                    "27031B": {
                        "code": "27031B",
                        "name_cht": "醛類脂醇酵素",
                        "name_eng": "Aldosterone",
                        "unit": "Serum:pg/mL Urine:ug/day",
                        "ref": "Serum:立姿:48.3-270.0 臥姿:68.0-173.0；Urine:2.84-33.99",
                        "refmode": false,
                        "index": 120002
                    },
                    "09130B": {
                        "code": "09130B",
                        "name_cht": "葉酸免疫分析",
                        "name_eng": "Folic acid/Folate",
                        "unit": "ng/mL",
                        "ref": "Normal:>5.38  Indeterminate:3.38-5.38  Deficient:≦3.37",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 5.38,
                        "index": 80005
                    },
                    "25003C": {
                        "code": "25003C",
                        "name_cht": "外科病理(第三級外科病理)",
                        "name_eng": "Biopsy (Surgical pathology Level Ⅲ)",
                        "unit": "",
                        "ref": "Normal",
                        "refmode": false,
                        "index": 999900072
                    },
                    "25004C": {
                        "code": "25004C",
                        "name_cht": "外科病理(第四級外科病理)",
                        "name_eng": "Biopsy (Surgical pathology Level Ⅳ)",
                        "unit": "",
                        "ref": "Normal",
                        "refmode": false,
                        "index": 999900073
                    },
                    "12193B": {
                        "code": "12193B",
                        "name_cht": "原生B型利鈉利尿胜",
                        "name_eng": "Pro-BNP/(BNP)",
                        "unit": "pg/mL",
                        "ref": "<125",
                        "refmode": "mid",
                        "upper": 125,
                        "lower": null,
                        "index": 800011
                    },
                    "09037C": {
                        "code": "09037C",
                        "name_cht": "血氨",
                        "name_eng": "Blood ammonia",
                        "unit": "ug/dL",
                        "ref": "19-55",
                        "refmode": "mid",
                        "upper": 55,
                        "lower": 19,
                        "index": 500011
                    },
                    "10520C": {
                        "code": "10520C",
                        "name_cht": "鋰鹽",
                        "name_eng": "Li(Lithium)",
                        "unit": "mEq/L",
                        "ref": "0.6-1.2",
                        "refmode": "mid",
                        "upper": 1.2,
                        "lower": 0.6,
                        "index": 800057
                    },
                    "12010C": {
                        "code": "12010C",
                        "name_cht": "類風濕性關節炎因子試驗-被動血球凝集法",
                        "name_eng": "Rheumatoid factor test-PHA(Passive hemagglutination)",
                        "unit": "mEq/L",
                        "ref": "0.6-1.2",
                        "refmode": "mid",
                        "upper": 1.2,
                        "lower": 0.6,
                        "index": 90007
                    },
                    "09139C": {
                        "code": "09139C",
                        "name_cht": "醣化白蛋白",
                        "name_eng": "Glycated Albumin (GA)",
                        "unit": "%",
                        "ref": "11.0-16.0",
                        "refmode": "mid",
                        "upper": 16,
                        "lower": 11,
                        "index": 10006
                    },
                    "12202C": {
                        "code": "12202C",
                        "name_cht": "C型肝炎病毒核酸基因檢測－即時聚合酉每連鎖反應法",
                        "name_eng": "HCV Genotyping Test（RealTime PCR）",
                        "unit": "-/+",
                        "ref": "Undetectable",
                        "refmode": "label",
                        "label": "Undetectable",
                        "index": 500035
                    },
                    "09chs007": {
                        "code": "09chs007",
                        "name_cht": "維生素D",
                        "name_eng": "25-OH Vitamin D Total",
                        "unit": "ng/mL",
                        "ref": "30.0-100.0",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": 30,
                        "index": 800030
                    },
                    "21+L1001C001": {
                        "code": "21+L1001C001",
                        "name_cht": "B型肝炎表面抗原",
                        "name_eng": "HBsAg (EIA/LIA)",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜1.0 Reactive：≧1.0",
                        "refmode": "label",
                        "label": "-",
                        "index": 500023
                    },
                    "21+L1001C002": {
                        "code": "21+L1001C002",
                        "name_cht": "Ｂ型肝炎表面抗原(數值)",
                        "name_eng": "HBsAg (EIA/LIA)",
                        "unit": "S/Co",
                        "ref": "Non-reactive：＜1.0，Reactive：＞=1.0",
                        "refmode": "mid",
                        "upper": 1,
                        "lower": null,
                        "index": 500022
                    },
                    "21+L1001C003": {
                        "code": "21+L1001C003",
                        "name_cht": "Ｃ型肝炎病毒抗體檢查",
                        "name_eng": "HCV Ab (EIA/LIA)",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 500031
                    },
                    "21+L1001C004": {
                        "code": "21+L1001C004",
                        "name_cht": "Ｃ型肝炎病毒抗體檢查(數值)",
                        "name_eng": "HCV Ab (EIA/LIA)",
                        "unit": "S/Co",
                        "ref": "Non-reactive：＜1.0，Reactive：＞=1.0",
                        "refmode": "mid",
                        "upper": 1,
                        "lower": null,
                        "index": 500032
                    },
                    "21+L1001C005": {
                        "code": "21+L1001C005",
                        "name_cht": "血糖",
                        "name_eng": "Glucose-AC",
                        "unit": "mg/dL",
                        "ref": "<100",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": null,
                        "index": 10002
                    },
                    "21+L1001C006": {
                        "code": "21+L1001C006",
                        "name_cht": "總膽固醇",
                        "name_eng": "Cholestero1, total",
                        "unit": "mg/dL",
                        "ref": "<200",
                        "refmode": "mid",
                        "upper": 200,
                        "lower": null,
                        "index": 20001
                    },
                    "21+L1001C007": {
                        "code": "21+L1001C007",
                        "name_cht": "三酸甘油脂",
                        "name_eng": "Triglyceride (TG)",
                        "unit": "mg/dL",
                        "ref": "<150",
                        "refmode": "mid",
                        "upper": 150,
                        "lower": null,
                        "index": 20002
                    },
                    "21+L1001C008": {
                        "code": "21+L1001C008",
                        "name_cht": "高密度脂蛋白－膽固醇",
                        "name_eng": "HDL-C(highdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "男:≥40；女:≥50",
                        "refmode": "mid",
                        "upper": null,
                        "lower": gend=="男"?40:50,
                        "index": 20003
                    },
                    "21+L1001C009": {
                        "code": "21+L1001C009",
                        "name_cht": "血清麩胺酸苯醋酸轉氨基酶",
                        "name_eng": "S-GOT/AST",
                        "unit": "IU/L",
                        "ref": "<40",
                        "refmode": "mid",
                        "upper": 40,
                        "lower": null,
                        "index": 50001
                    },
                    "21+L1001C010": {
                        "code": "21+L1001C010",
                        "name_cht": "血清麩胺酸丙酮酸轉氨基酶",
                        "name_eng": "S-GPT/ALT",
                        "unit": "IU/L",
                        "ref": "<40",
                        "refmode": "mid",
                        "upper": 40,
                        "lower": null,
                        "index": 50002
                    },
                    "21+L1001C011": {
                        "code": "21+L1001C011",
                        "name_cht": "肌酸酐、血",
                        "name_eng": "Creatinine (B) CRTN",
                        "unit": "mg/dL",
                        "ref": "0.5-1.3",
                        "refmode": "mid",
                        "upper": 1.3,
                        "lower": 0.5,
                        "index": 30002
                    },
                    "21+L1001C012": {
                        "code": "21+L1001C012",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "",
                        "ref": "-/+",
                        "refmode": "label",
                        "label": "-",
                        "index": 400020
                    },
                    "21+L1001C013": {
                        "code": "21+L1001C013",
                        "name_cht": "腎絲球過濾率計算",
                        "name_eng": "eGFR",
                        "unit": "ml/min/1.73m^2",
                        "ref": ">60",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 60,
                        "index": 30004
                    },
                    "21+L1001C014": {
                        "code": "21+L1001C014",
                        "name_cht": "低密度脂蛋白-膽固醇(計算值)",
                        "name_eng": "LDL-C(Lowdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "<130",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 20005
                    },
                    "09129C": {
                        "code": "09129C",
                        "name_cht": "維生素B12免疫分析",
                        "name_eng": "VIT-B12 (EIA/LIA)",
                        "unit": "pg/mL",
                        "ref": "247-911 pg/mL",
                        "refmode": "mid",
                        "upper": 911,
                        "lower": 247,
                        "index": 80004
                    },
                    "14009C": {
                        "code": "14009C",
                        "name_cht": "腮腺炎病毒補體結合抗體",
                        "name_eng": "Mumps CF virus Ab",
                        "unit": "RU/ml",
                        "ref": "Negative: <16；Borderline:>=16 -< 22；Positive: >=22 RU/ml",
                        "refmode": "mid",
                        "upper": 22,
                        "lower": null,
                        "index": 1100028
                    },
                    "12121C": {
                        "code": "12121C",
                        "name_cht": "甲促素結合體抗體",
                        "name_eng": "TSH receptor Ab",
                        "unit": "IU/L",
                        "ref": "<0.10",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 0.1,
                        "index": 700010
                    },
                    "07chs001": {
                        "code": "07chs001",
                        "name_cht": "糞便幽門桿菌抗原",
                        "name_eng": "Stool H.Pylori Ag",
                        "unit": "-/+",
                        "ref": "(-)",
                        "refmode": "label",
                        "label": "-",
                        "index": 190003
                    },
                    "09049B001": {
                        "code": "09049B001",
                        "name_cht": "血中鉛",
                        "name_eng": "Lead(Pb)(Blood",
                        "unit": "μg/dL",
                        "ref": "<= 10",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 10,
                        "index": 800031
                    },
                    "09049B002": {
                        "code": "09049B002",
                        "name_cht": "尿鉛",
                        "name_eng": "Lead(Pb)(Urine)",
                        "unit": "μg/dL",
                        "ref": "< 23",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 23,
                        "index": 400037
                    },
                    "08079B": {
                        "code": "08079B",
                        "name_cht": "D-D雙合試驗",
                        "name_eng": "D-Dimer",
                        "unit": "mg/L(FEU)",
                        "ref": "<0.55",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 0.55,
                        "index": 600021
                    },
                    "3D001": {
                        "code": "3D001",
                        "name_cht": "身高",
                        "name_eng": "height",
                        "unit": "cm",
                        "ref": "",
                        "refmode": false,
                        "index": 99990001
                    },
                    "3D002": {
                        "code": "3D002",
                        "name_cht": "體重",
                        "name_eng": "body weight",
                        "unit": "kg",
                        "ref": "",
                        "refmode": false,
                        "index": 99990002
                    },
                    "3D003": {
                        "code": "3D003",
                        "name_cht": "脈搏",
                        "name_eng": "pulse",
                        "unit": "次/分鐘",
                        "ref": "60-100",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": 60,
                        "index": 99990003
                    },
                    "3D004": {
                        "code": "3D004",
                        "name_cht": "收縮壓",
                        "name_eng": "Systolic pressure",
                        "unit": "mmHg",
                        "ref": "<130mmHg",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 99990004
                    },
                    "3D005": {
                        "code": "3D005",
                        "name_cht": "舒張壓",
                        "name_eng": "Diastolic pressure",
                        "unit": "mmHg",
                        "ref": "<80mmHg",
                        "refmode": "mid",
                        "upper": 80,
                        "lower": null,
                        "index": 99990005
                    },
                    "3D006": {
                        "code": "3D006",
                        "name_cht": "腰圍",
                        "name_eng": "Waistline",
                        "unit": "cm",
                        "ref": "男<90；女<80",
                        "refmode": "mid",
                        "upper":gend=="男"?90:80,
                        "lower": null,
                        "index": 99990006
                    },
                    "3D007": {
                        "code": "3D007",
                        "name_cht": "身體質量指數",
                        "name_eng": "Body Mass Index",
                        "unit": "kg/m2",
                        "ref": "18.5-24",
                        "refmode": "mid",
                        "upper": 24,
                        "lower": 18.5,
                        "index": 99990007
                    },
                    "3D008": {
                        "code": "3D008",
                        "name_cht": "裸視[右眼]",
                        "name_eng": "bare eyesight(right)",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 99990008
                    },
                    "3D009": {
                        "code": "3D009",
                        "name_cht": "裸視[左眼]",
                        "name_eng": "bare eyesight(left)",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 99990009
                    },
                    "3D010": {
                        "code": "3D010",
                        "name_cht": "矯正[右眼]",
                        "name_eng": "corrected vision(right)",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 999900010
                    },
                    "3D011": {
                        "code": "3D011",
                        "name_cht": "矯正[左眼]",
                        "name_eng": "corrected vision(left)",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 999900011
                    },
                    "3D012": {
                        "code": "3D012",
                        "name_cht": "血液及體液葡萄糖",
                        "name_eng": "Glucose",
                        "unit": "mg/dL",
                        "ref": "<100",
                        "refmode": "mid",
                        "upper": 100,
                        "lower": null,
                        "index": 10001
                    },
                    "3D013": {
                        "code": "3D013",
                        "name_cht": "肌酸酐、血",
                        "name_eng": "Creatinine (B) CRTN",
                        "unit": "mg/dL",
                        "ref": "0.5-1.3",
                        "refmode": "mid",
                        "upper": 1.3,
                        "lower": 0.5,
                        "index": 30002
                    },
                    "3D014": {
                        "code": "3D014",
                        "name_cht": "血清麩胺酸苯醋酸轉氨基酶",
                        "name_eng": "S-GOT/AST",
                        "unit": "IU/L",
                        "ref": "<40",
                        "refmode": "mid",
                        "upper": 40,
                        "lower": null,
                        "index": 50001
                    },
                    "3D015": {
                        "code": "3D015",
                        "name_cht": "血清麩胺酸丙酮酸轉氨基酶",
                        "name_eng": "S-GPT/ALT",
                        "unit": "IU/L",
                        "ref": "<40",
                        "refmode": "mid",
                        "upper": 40,
                        "lower": null,
                        "index": 50002
                    },
                    "3D016": {
                        "code": "3D016",
                        "name_cht": "總膽固醇",
                        "name_eng": "Cholestero1,total",
                        "unit": "mg/dL",
                        "ref": "<200",
                        "refmode": "mid",
                        "upper": 200,
                        "lower": null,
                        "index": 20001
                    },
                    "3D017": {
                        "code": "3D017",
                        "name_cht": "三酸甘油脂",
                        "name_eng": "Triglyceride (TG)",
                        "unit": "mg/dL",
                        "ref": "<150",
                        "refmode": "mid",
                        "upper": 150,
                        "lower": null,
                        "index": 20002
                    },
                    "3D018": {
                        "code": "3D018",
                        "name_cht": "低密度脂蛋白－膽固醇",
                        "name_eng": "LDL-C(Lowdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "<130",
                        "refmode": "mid",
                        "upper": 130,
                        "lower": null,
                        "index": 20004
                    },
                    "3D019": {
                        "code": "3D019",
                        "name_cht": "高密度脂蛋白－膽固醇",
                        "name_eng": "HDL-C(highdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "男:≥40；女:≥50",
                        "refmode": "mid",
                        "upper": null,
                        "lower": gend=="男"?40:50,
                        "index": 20003
                    },
                    "3D020": {
                        "code": "3D020",
                        "name_cht": "總膽固醇/高密度脂蛋白膽固醇比",
                        "name_eng": "Cholestero1,total/HDL-C ratio",
                        "unit": "*",
                        "ref": "<5",
                        "refmode": false,
                        "index": 20006
                    },
                    "3D021": {
                        "code": "3D021",
                        "name_cht": "低密度/高密度脂蛋白膽固醇比",
                        "name_eng": "LDL-C/HDL-C ratio",
                        "unit": "*",
                        "ref": "",
                        "refmode": false,
                        "index": 20007
                    },
                    "3D022": {
                        "code": "3D022",
                        "name_cht": "顏色",
                        "name_eng": "color",
                        "unit": "Yellow",
                        "ref": "Yellow",
                        "refmode": false,
                        "index": 40009
                    },
                    "3D023": {
                        "code": "3D023",
                        "name_cht": "混濁度",
                        "name_eng": "turbidity",
                        "unit": "Clear",
                        "ref": "Clear",
                        "refmode": false,
                        "index": 400011
                    },
                    "3D024": {
                        "code": "3D024",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": false,
                        "index": 400020
                    },
                    "3D025": {
                        "code": "3D025",
                        "name_cht": "尿糖",
                        "name_eng": "Urine sugar",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": false,
                        "index": 400021
                    },
                    "3D026": {
                        "code": "3D026",
                        "name_cht": "酸鹼度反應",
                        "name_eng": "pH",
                        "unit": "-",
                        "ref": "5.5 ~ 7.5",
                        "refmode": "mid",
                        "upper": 7.5,
                        "lower": 5.5,
                        "index": 400022
                    },
                    "3D027": {
                        "code": "3D027",
                        "name_cht": "尿潛血",
                        "name_eng": "Urine occult blood",
                        "unit": "-/+",
                        "ref": "Negative",
                        "refmode": false,
                        "index": 400023
                    },
                    "3D028": {
                        "code": "3D028",
                        "name_cht": "尿紅血球",
                        "name_eng": "Urine R.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF",
                        "refmode": "label",
                        "label": "0-5",
                        "index": 400024
                    },
                    "3D029": {
                        "code": "3D029",
                        "name_cht": "尿白血球",
                        "name_eng": "Urine W.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF",
                        "refmode": "label",
                        "label": "0-5",
                        "index": 400025
                    },
                    "3D030": {
                        "code": "3D030",
                        "name_cht": "尿上皮細胞",
                        "name_eng": "Urine Epithelium",
                        "unit": "cells/HPF",
                        "ref": "< 8 /HPF",
                        "refmode": "label",
                        "label": "0-8",
                        "index": 400026
                    },
                    "3D031": {
                        "code": "3D031",
                        "name_cht": "尿圓柱體",
                        "name_eng": "Urine Cast",
                        "unit": "(-)/LPF",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400027
                    },
                    "3D032": {
                        "code": "3D032",
                        "name_cht": "尿細菌",
                        "name_eng": "Urine Bacteria",
                        "unit": "HPF",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 400028
                    },
                    "3D033": {
                        "code": "3D033",
                        "name_cht": "肌酐、尿",
                        "name_eng": "Creatinine (U) CRTN",
                        "unit": "mg/dL",
                        "ref": "60-250",
                        "refmode": "mid",
                        "upper": 250,
                        "lower": 60,
                        "index": 40005
                    },
                    "3D034": {
                        "code": "3D034",
                        "name_cht": "腎絲球過濾率計算",
                        "name_eng": "eGFR",
                        "unit": "ml/min/1.73m^2",
                        "ref": ">60",
                        "refmode": "mid",
                        "upper": null,
                        "lower": 60,
                        "index": 30004
                    },
                    "3D035": {
                        "code": "3D035",
                        "name_cht": "尿液總蛋白／肌酐、尿比值",
                        "name_eng": "U PCR",
                        "unit": "mg/gm",
                        "ref": "<150",
                        "refmode": "mid",
                        "upper": 150,
                        "lower": null,
                        "index": 40007
                    },
                    "3D036": {
                        "code": "3D036",
                        "name_cht": "慢性腎臟病期數",
                        "name_eng": "CKD Stage",
                        "unit": "",
                        "ref": "第0期：正常",
                        "refmode": "label",
                        "label": "0",
                        "index": 30006
                    },
                    "3D037": {
                        "code": "3D037",
                        "name_cht": "骨質密度",
                        "name_eng": "BMD",
                        "unit": "",
                        "ref": "",
                        "refmode": false,
                        "index": 999900031
                    },
                    "3D038": {
                        "code": "3D038",
                        "name_cht": "尿酸、血",
                        "name_eng": "Uric acid",
                        "unit": "mg/dL",
                        "ref": "<7.0",
                        "refmode": "mid",
                        "upper": 7,
                        "lower": null,
                        "index": 30008
                    },
                    "14065C": {
                        "code": "14065C",
                        "name_cht": "A型流行性感冒病毒抗原",
                        "name_eng": "Influenza A Viruses Antigen Rapid Test kit",
                        "unit": "",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 1100031
                    },
                    "14066C": {
                        "code": "14066C",
                        "name_cht": "B型流行性感冒病毒抗原",
                        "name_eng": "Influenza B Viruses Antigen Rapid Test kit",
                        "unit": "",
                        "ref": "Negative",
                        "refmode": "label",
                        "label": "-",
                        "index": 1100032
                    }
                }
                let examarray=[];
                for (let i=0;i<inputexamarray.length;i++){
                    let ipa=inputexamarray[i];
                    for (let j=0;j<ipa.length;j++){
                        let examitem=ipa[j];
                        if (examitem.testCode in examlist){
                            examitem.index=examlist[examitem.testCode].index;
                        }
                        examarray.push(examitem);
                    }
                }
                examarray.sort(function (a, b) {
                    return a.index - b.index;
                });
                document.getElementById('detailarea').style.display="block";
                document.getElementById('detailname').textContent=document.getElementById('basicname').textContent;
                document.getElementById('detailbirth').textContent=document.getElementById('basicbirth').textContent;
                document.getElementById('detailid').textContent=document.getElementById('basicid').textContent;
                document.getElementById('detailtitle').textContent="衛生所檢驗報告("+examdate+")";
                let detailtable=document.getElementById("detailtable");
                detailtable.innerHTML="<tr><td>中文</td><td>英文</td><td>結果</td><td>單位</td><td>參考值</td></tr>";
                let incarray={
                    "GOT":["21014","22014","25014","27014","09025C","21+L1001C009","3D014"],
                    "GPT":["21015","22015","25015","27015","09026C","21+L1001C010","3D015"],
                    "PLT":["08006C","08011C008"]
                }
                let age=examdate.split("-")[0]-birthday.split("-")[0];
                let hasgot=false;
                let hasgpt=false;
                let hasplt=false;

                for (let i=0;i<examarray.length;i++){
                    let examitem=examarray[i];
                    let testCode=examitem.testCode;
                    if (incarray["GOT"].includes(testCode)){
                        hasgot=examitem.testResult;
                    }
                    if (incarray["GPT"].includes(testCode)){
                        hasgpt=examitem.testResult;
                    }
                    if (incarray["PLT"].includes(testCode)){
                        hasplt=examitem.testResult;
                    }
                    let td1=examitem.testName;
                    let td2="N/A";
                    let td3=examitem.testResult;
                    let td3ex="";
                    let td4="N/A";
                    let td5="N/A";
                    if (testCode in examlist){
                        let e=examlist[testCode]
                        td1=e.name_cht;
                        td2=e.name_eng;
                        td4=e.unit;
                        td5=e.ref;
                        if (e.refmode){
                            if (e.refmode=="label"){
                                if (td3!=e.label){
                                    td3ex="　(＊)"
                                }
                            } else if (e.refmode=="mid"){
                                if (transnum(td3) && e.upper){
                                    if (transnum(td3)>=e.upper){
                                        td3ex="　(↑)"
                                    }
                                } else if (transnum(td3) && e.lower){
                                    if (transnum(td3)<=e.lower){
                                        td3ex="　(↓)"
                                    }
                                }
                            }
                        }
                    }
                    let newrow=document.createElement('tr');
                    detailtable.appendChild(newrow);
                    let td=document.createElement('td');
                    td.textContent=td1;
                    newrow.appendChild(td);
                    td=document.createElement('td');
                    td.textContent=td2;
                    newrow.appendChild(td);
                    td=document.createElement('td');
                    td.textContent=td3+td3ex;
                    if (td3ex=="　(↑)" || td3ex=="　(＊)"){
                        td.style.color="red"
                    } else if (td3ex=="　(↓)"){
                        td.style.color="blue"
                    }
                    newrow.appendChild(td);
                    td=document.createElement('td');
                    td.textContent=td4;
                    newrow.appendChild(td);
                    td=document.createElement('td');
                    td.textContent=td5;
                    newrow.appendChild(td);
                    if (testCode=="09139C"){
                        let cnr=document.createElement('tr');
                        detailtable.appendChild(cnr);
                        let ctd1="醣化血紅素(計算值)";
                        let ctd2="eHbA1c(calculated)";
                        let ctd3=Math.round((0.216*examitem.testResult+2.978)*10)/10;
                        let ctd3ex="";
                        if (ctd3>5.6){
                            ctd3ex="　(↑)"
                        }
                        let ctd4="%";
                        let ctd5="<5.7";
                        let car=[ctd1,ctd2,ctd3,ctd4,ctd5]
                        for (let k=0;k<car.length;k++){
                            let ct=car[k];
                            let ctd=document.createElement('td');
                            ctd.textContent=ct;
                            if (k==2){
                                ctd.textContent=ct+ctd3ex;
                                if (ctd3ex=="　(↑)" || ctd3ex=="　(＊)"){
                                    ctd.style.color="red"
                                } else if (td3ex=="　(↓)"){
                                    ctd.style.color="blue"
                                }
                            }

                            cnr.appendChild(ctd);

                        }
                    }
                    if (hasgot && hasgpt && hasplt){
                        let cnr=document.createElement('tr');
                        detailtable.appendChild(cnr);
                        let ctd1="肝纖維化指數(計算值)";
                        let ctd2="Fibrosis-4 Index ";
                        let ctd3=Math.round(((age*hasgot)/(hasplt*(hasgpt**0.5)))*100)/100;
                        let ctd3ex="";
                        if (ctd3>2.67){
                            ctd3ex="　(↑↑)"
                        } else if (ctd3>1.3){
                            ctd3ex="　(↑)"
                        }
                        let ctd4="N/A";
                        let ctd5="<1.3:低風險；1.3-2.67:中風險；>2.67:高風險";
                        let car=[ctd1,ctd2,ctd3,ctd4,ctd5]
                        for (let k=0;k<car.length;k++){
                            let ct=car[k];
                            let ctd=document.createElement('td');
                            ctd.textContent=ct;
                            if (k==2){
                                ctd.textContent=ct+ctd3ex;
                                if (ctd3ex=="　(↑)" || td3ex=="　(↑↑)"){
                                    ctd.style.color="red"
                                } else if (td3ex=="　(↓)"){
                                    ctd.style.color="blue"
                                }
                            }

                            cnr.appendChild(ctd);

                        }
                    }
                    
                }
				removeDuplicatesByColumn(0);
            }

            function transnum(value) {
                if (typeof value === "number") {
                  if (Number.isFinite(value)) {
                    return value;
                  }
              
                  return false;
                }
              
                if (typeof value === "string") {
                  value = value.trim();
              
                  if (value === "") {
                    return false;
                  }
              
                  if (/^-?\d+(\.\d+)?$/.test(value)) {
                    return Number(value);
                  }
              
                  return false;
                }
              
                return false;
              }

              function renderLineChartInPopup(obj, lowerLine = null, upperLine = null) {
  const chartTitle = obj.item || "未命名指標";

  const entries = Object.entries(obj)
    .filter(function ([key]) {
      return key !== "item";
    })
    .sort(function ([a], [b]) {
      return new Date(a) - new Date(b);
    });

  const labels = entries.map(function ([date]) {
    return date;
  });

  const rawData = entries.map(function ([_, value]) {
    return value;
  });

  const data = entries.map(function ([_, value]) {
    return Number(value);
  });

  if (!window.chartPopup || window.chartPopup.closed) {
    window.chartPopup = window.open("", "chartPopupWindow", "width=1000,height=700");
  }

  if (!window.chartPopup) {
    alert("無法開啟新視窗，請檢查瀏覽器是否阻擋彈出視窗");
    return;
  }

  const newWin = window.chartPopup;
  const chartJsUrl = "https://cdn.jsdelivr.net/npm/chart.js";
  const annotationJsUrl = "https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3.0.1/dist/chartjs-plugin-annotation.min.js";
  const dataLabelsJsUrl = "https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels";

  newWin.document.open();
  newWin.document.write([
    '<!DOCTYPE html>',
    '<html lang="zh-Hant">',
    '<head>',
      '<meta charset="UTF-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '<title>' + chartTitle + '</title>',
      '<style>',
        'body {',
          'font-family: Arial, "Microsoft JhengHei", sans-serif;',
          'margin: 20px;',
          'background: #fff;',
        '}',
        '.chart-wrap {',
          'width: 100%;',
          'max-width: 960px;',
          'margin: 0 auto;',
        '}',
        'h2 {',
          'text-align: center;',
          'margin-bottom: 20px;',
          'font-size: 24px;',
        '}',
        '.canvas-wrap {',
          'position: relative;',
          'height: 500px;',
        '}',
        'canvas {',
          'display: block;',
          'width: 100% !important;',
          'height: 500px !important;',
        '}',
      '</style>',
      '<script src="' + chartJsUrl + '"><\/script>',
      '<script src="' + annotationJsUrl + '"><\/script>',
      '<script src="' + dataLabelsJsUrl + '"><\/script>',
    '</head>',
    '<body>',
      '<div class="chart-wrap">',
        '<h2>' + chartTitle + ' 數值變化趨勢圖</h2>',
        '<div class="canvas-wrap">',
          '<canvas id="Chart"></canvas>',
        '</div>',
      '</div>',
      '<script>',
        '(function () {',
          'function drawChart() {',
            'if (typeof Chart === "undefined") {',
              'setTimeout(drawChart, 100);',
              'return;',
            '}',

            'if (Chart.register) {',
              'try {',
                'if (typeof window.chartjs_plugin_annotation !== "undefined") {',
                  'Chart.register(window.chartjs_plugin_annotation);',
                '}',
              '} catch (e) {}',

              'try {',
                'if (typeof window.ChartDataLabels !== "undefined") {',
                  'Chart.register(window.ChartDataLabels);',
                '}',
              '} catch (e) {}',
            '}',

            'const canvas = document.getElementById("Chart");',
            'if (!canvas) {',
              'return;',
            '}',

            'const ctx = canvas.getContext("2d");',
            'const annotations = {};',

            lowerLine !== null
              ? 'annotations.lowerLine = {' +
                  'type: "line",' +
                  'yMin: ' + Number(lowerLine) + ',' +
                  'yMax: ' + Number(lowerLine) + ',' +
                  'borderColor: "red",' +
                  'borderDash: [6, 6],' +
                  'borderWidth: 1.5,' +
                  'label: {' +
                    'display: true,' +
                    'content: "下限: ' + String(lowerLine) + '",' +
                    'position: "start",' +
                    'backgroundColor: "rgba(255,255,255,0.85)",' +
                    'color: "red"' +
                  '}' +
                '};'
              : '',

            upperLine !== null
              ? 'annotations.upperLine = {' +
                  'type: "line",' +
                  'yMin: ' + Number(upperLine) + ',' +
                  'yMax: ' + Number(upperLine) + ',' +
                  'borderColor: "orange",' +
                  'borderDash: [6, 6],' +
                  'borderWidth: 1.5,' +
                  'label: {' +
                    'display: true,' +
                    'content: "上限: ' + String(upperLine) + '",' +
                    'position: "start",' +
                    'backgroundColor: "rgba(255,255,255,0.85)",' +
                    'color: "orange"' +
                  '}' +
                '};'
              : '',

            'if (window.popupChartInstance) {',
              'try {',
                'window.popupChartInstance.destroy();',
              '} catch (e) {}',
            '}',

            'window.popupChartInstance = new Chart(ctx, {',
              'type: "line",',
              'data: {',
                'labels: ' + JSON.stringify(labels) + ',',
                'datasets: [{',
                  'label: ' + JSON.stringify(chartTitle) + ',',
                  'data: ' + JSON.stringify(data) + ',',
                  'borderColor: "rgba(75, 192, 192, 1)",',
                  'backgroundColor: "rgba(75, 192, 192, 0.2)",',
                  'fill: true,',
                  'tension: 0.3,',
                  'pointRadius: 5,',
                  'pointHoverRadius: 8,',
                  'pointHitRadius: 14,',
                  'pointBackgroundColor: "#fff",',
                  'pointBorderWidth: 2',
                '}]',
              '},',
              'options: {',
                'responsive: true,',
                'maintainAspectRatio: false,',
                'interaction: {',
                  'mode: "nearest",',
                  'axis: "xy",',
                  'intersect: true',
                '},',
                'plugins: {',
                  'legend: {',
                    'display: true',
                  '},',
                  'tooltip: {',
                    'enabled: true,',
                    'callbacks: {',
                      'label: function (context) {',
                        'var idx = context.dataIndex;',
                        'var raw = ' + JSON.stringify(rawData) + '[idx];',
                        'return context.dataset.label + ": " + raw;',
                      '}',
                    '}',
                  '},',
                  'datalabels: {',
                    'display: true,',
                    'align: "top",',
                    'anchor: "end",',
                    'offset: 6,',
                    'color: "#333",',
                    'font: {',
                      'size: 12,',
                      'weight: "bold"',
                    '},',
                    'formatter: function (value, context) {',
                      'var idx = context.dataIndex;',
                      'return ' + JSON.stringify(rawData) + '[idx];',
                    '}',
                  '},',
                  'annotation: {',
                    'annotations: annotations',
                  '}',
                '},',
                'scales: {',
                  'x: {',
                    'title: {',
                      'display: true,',
                      'text: "日期"',
                    '}',
                  '},',
                  'y: {',
                    'beginAtZero: false',
                  '}',
                '}',
              '}',
            '});',
          '}',
          'drawChart();',
        '})();',
      '<\/script>',
    '</body>',
    '</html>'
  ].join(""));

  newWin.document.close();
  newWin.focus();
}
            function renderLineChart(obj, lowerLine = null, upperLine = null) {
                const chartTitle = obj.item || "未命名指標";
            
                const entries = Object.entries(obj)
                  .filter(([key]) => key !== "item")
                  .sort(([a], [b]) => new Date(a) - new Date(b));
            
                const labels = entries.map(([date]) => date);
                const data = entries.map(([_, value]) => Number(value));
            
                const ctx = document.getElementById("Chart").getContext("2d");
            
                if (window.ldlChartInstance) {
                  window.ldlChartInstance.destroy();
                }
            
                // 👉 虛線的設定
                const annotations = {};
                if (lowerLine !== null) {
                  annotations.lowerLine = {
                    type: 'line',
                    yMin: lowerLine,
                    yMax: lowerLine,
                    borderColor: 'red',
                    borderDash: [6, 6],
                    borderWidth: 1.5,
                    label: {
                      //content: lowerLine,
                      enabled: true,
                      position: 'start'
                    }
                  };
                }
                if (upperLine !== null) {
                  annotations.upperLine = {
                    type: 'line',
                    yMin: upperLine,
                    yMax: upperLine,
                    borderColor: 'orange',
                    borderDash: [6, 6],
                    borderWidth: 1.5,
                    label: {
                      //content: upperLine,
                      enabled: true,
                      position: 'start'
                    }
                  };
                }
            
                window.ldlChartInstance = new Chart(ctx, {
                  type: "line",
                  data: {
                    labels: labels,
                    datasets: [{
                      label: chartTitle,
                      data: data,
                      borderColor: "rgba(75, 192, 192, 1)",
                      backgroundColor: "rgba(75, 192, 192, 0.2)",
                      fill: true,
                      tension: 0.3,
                      pointRadius: 4,
                      pointBackgroundColor: "#fff",
                    }]
                  },
                  options: {
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        //text: chartTitle + " 數值變化趨勢圖"
                      },
                      annotation: {
                        annotations: annotations
                      }
                    },
                    scales: {
                      x: {
                        title: { display: true, text: "日期" }
                      },
                      y: {
                        title: { display: true, text: "" },
                        beginAtZero: false
                      }
                    }
                  }
                });
              }    
			  function removeDuplicatesByColumn(colIndex) {
				  const table = document.getElementById("detailtable");
				  const rows = Array.from(table.querySelectorAll("tr")); // 抓所有 <tr>
				  const seen = new Set();

				  for (let i = rows.length - 1; i >= 0; i--) {
					const cells = rows[i].querySelectorAll("td");
					if (cells.length === 0) continue; // 跳過表頭或空行

					const key = cells[colIndex]?.textContent.trim();
					if (seen.has(key)) {
					  rows[i].remove(); // 直接從 DOM 移除這列
					} else {
					  seen.add(key);
					}
				  }
				}
				function printElementV2(){
					let opdate_=document.getElementById("detailtitle").textContent;
					let opdate_1=opdate_.split("(")[1].split(")")[0];
					let opy=opdate_1.split("-")[0]-1911;
					let opdate=opy+opdate_1.split("-")[1]+opdate_1.split("-")[2];
					let id=document.getElementById("detailid").textContent;
					let clinicCode=aaa.clinicCode;
					let newurl="https://ccis.chshb.gov.tw/CCLABQ025_RPT.aspx?HOSPID="+clinicCode+"&LABID=JY03240030&OPDDATE="+opdate+"&IDNO="+id;
					window.open(newurl, '_blank');
				}
              function printElement(elementId, orientation = "portrait") {
                const target = document.getElementById(elementId);
                if (!target) return alert("找不到目標元素");
              
                // 創建隱藏的 iframe 元素
                let iframe = document.getElementById("printarea");
                const iframeDoc = iframe.contentWindow.document;
              
                // 動態插入內容到 iframe
                iframeDoc.open();
                iframeDoc.write(
  "<html>" +
    "<head>" +
      "<style>" +
        "@media print {" +
          "body {" +
            "margin: 0;" +
            "padding: 0;" +
          "}" +
          "button {" +
            "display: none;" + /* 隱藏按鈕 */
          "}" +
          "@page {" +
            "size: A4 " + orientation + ";" +
            "margin: 1cm;" +
          "}" +
        "}" +
        "html {font-family:'標楷體'}" +
        ".title {font-size: 40px; text-align: center; width: 90%;}" +
        ".basicinfotable { border-collapse: collapse; font-family:'標楷體'; font-size:28px; width: 90%;}" +
        ".basicinfotable td:nth-of-type(1), .basicinfotable td:nth-of-type(3), .basicinfotable td:nth-of-type(5) {text-align: center; width: 100px;}" +
        ".basicinfotable td:nth-of-type(2), .basicinfotable td:nth-of-type(4), .basicinfotable td:nth-of-type(6) {text-align: left; width: 250px;}" +
        ".examtable { border-collapse: collapse; font-family:'標楷體'; font-size:16px; }" +
        ".examtable th {" +
          "position: sticky;" +
          "text-align: center;" +
          "top: 0;" +
          "background-color: #e3f2fd;" +
          "z-index: 1;" +
        "}" +
        ".examtable td { border: 1px solid black; text-align: center; }" +
        ".examtable td:nth-of-type(1) { text-align: center; width: 90px; }" +
        ".examtable td:not(:nth-child(1)) { text-align: center; width: 65px; }" +
        ".highlight { background-color: #fffa90; }" +
        ".v-container1 {" +
          "width: 1100px;" +
          "overflow-y: auto;" +
        "}" +
        ".v-container2 {" +
          "width: 1100px;" +
          "overflow-y: auto;" +
        "}" +
        ".detailtable { border-collapse: collapse; font-family:'標楷體'; font-size:28px; width: 90%;}" +
        ".detailtable td { border: 1px solid black; text-align: center; }" +
        ".detailtable td:nth-of-type(1) { text-align: center; width: 25%; }" +
        ".detailtable td:nth-of-type(2) { text-align: center; width: 25%; }" +
        ".detailtable td:nth-of-type(3) { text-align: center; width: 20%; }" +
        ".detailtable td:nth-of-type(4) { text-align: center; width: 15%; }" +
        ".detailtable td:nth-of-type(5) { text-align: center; width: 15%; }" +
      "</style>" +
    "</head>" +
    "<body>" +
      target.innerHTML +
    "</body>" +
  "</html>"
);

                iframeDoc.close();
              
                // 等待 iframe 加載完成後列印
                iframe.contentWindow.print();
              
                // 完成後移除 iframe
              }
        </script>
    </head>
    <body>
        <div id="commanarea">
            <div class="title">衛生所檢驗報告彙總</div>
            <div style="display: flex;">
                <div >
                    <div style="display: flex;">
                        <table class="basicinfotable">
                            <tr>
                                <td>姓名:</td>
                                <td id="basicname"></td>
                                <td>生日:</td>
                                <td id="basicbirth"></td>
                                <td>身分證:</td>
                                <td id="basicid"></td>
                            </tr>
                        </table>
                        <button onclick="printElement('commanarea', 'landscape')">列印</button>
                    </div>
                    
                    <div class="v-container1">
                        <table class="examtable" id="examtable"></table>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div id="detailarea" style="display: none;">
            <div class="title" id="detailtitle"></div>
            <div style="display: flex;">
                <table class="basicinfotable">
                    <tr>
                        <td>姓名:</td>
                        <td id="detailname"></td>
                        <td>生日:</td>
                        <td id="detailbirth"></td>
                        <td>證號:</td>
                        <td id="detailid"></td>
                    </tr>
                </table>
                <button onclick="printElement('detailarea', 'portrait')">列印</button>
				<button onclick="printElementV2()">列印V2</button>
            </div>
            
            <div class="v-container2">
                <table class="detailtable" id="detailtable"></table>
            </div>
        </div>
        <iframe id="printarea" style="width: 0px; height:0px;"></iframe>
        
    </body>
	
</html>`
	htmls=htmls.replace("please_change_me",retobjs);
	//console.log(retobj);
	let newWin = window.open('', '_blank');
	newWin.document.open();
    newWin.document.write(htmls);
    newWin.document.close();
}
showdata();
