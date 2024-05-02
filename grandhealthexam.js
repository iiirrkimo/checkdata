explaintime="113-04-27";
expiretime="113-07-27";
totallist={};
excelall = document.getElementById('excelall');
excelall.addEventListener('change', function(event) {
	const file = event.target.files[0];
	if (file) {
		starttransferall();
	} else {
		alert("無選擇文件");
	}
});


papcodelist={
"1":"(1)正常",
"2":"(2)發炎",
"3":"(3)萎縮性變化",
"4":"(4)非典型扁平上皮細胞病變 (ASC-US)",
"5":"(5)非典型腺體細胞病變 (AGC)",
"6":"(6)細胞輕度病變併有空洞細胞 (CIN 1)",
"7":"(7)細胞輕度病變無空洞細胞 (CIN 1)",
"8":"(8)細胞中度病變 (CIN 2)",
"9":"(9)細胞重度病變 (CIN 3)",
"10":"(10)上皮原位癌 (CIN 3 / CIS)",
"11":"(11)子宮頸扁平上皮細胞癌 (SCC)",
"12":"(12)子宮頸腺體細胞癌 (Adenocarcinoma)",
"13":"(13)其他惡性腫瘤",
"14":"(14)其他",
"15":"(15)非典型腺體細胞疑惡性 (AGC-favor neoplasm, AGC-FN)",
"16":"(16)非典型扁平上皮細胞疑高階病變 (ASC favor HSIL, ASC-H)",
"17":"(17)細胞異常疑高階病變",
"18":"(18)原位子宮頸腺癌 (AIS)",
"21":"難以判讀"
};

async function starttransfer(){
	try {
		tablebody=document.getElementById('reporttable').children[1];
		tablebody.innerHTML='';
		errmsg='';
        result= await readexcel1();
        if (!result) {
            errmsg=errmsg+'新陳掛號檔錯誤\n'
        } 
		result= await readexcel2();
		if (!result) {
			errmsg=errmsg+'部彰報告檔錯誤\n'
		}
        result= await readexcel3();
		if (!result) {
			errmsg=errmsg+'X光報告錯誤\n'
		}
		result= await readexcel4();
		if (!result) {
			errmsg=errmsg+'FOBT檔錯誤\n'
		}
		result= await readexcel5();
		if (!result) {
			errmsg=errmsg+'子抹檔錯誤\n'
		}
		result= await readexcel6();
		if (!result) {
			errmsg=errmsg+'HP錯誤\n'
		}
		result= await readexcel7();
		if (!result) {
			errmsg=errmsg+'PG錯誤\n'
		}
		result= await readexcel8();
		if (!result) {
			errmsg=errmsg+'口篩錯誤\n'
		}
		result= await readexcel9();
		if (!result) {
			errmsg=errmsg+'乳攝名冊錯誤\n'
		}
		showptable();
    } catch (error) {
        alert(`${error.message}`); 
    }
}
function readexcel1(){
	return new Promise((resolve, reject) => {
		excel1 = document.getElementById('excel1');
		if (!excel1.files.length) {
			reject(new Error('沒有新陳掛號檔'));
		} else {
			const reader = new FileReader();
			reader.onload = function(e) {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, {type: 'array'});
				const firstSheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[firstSheetName];
				const range = XLSX.utils.decode_range(worksheet['!ref']);
				
				totallist={};
				for (let R = 1; R <= range.e.r; R++) {
					thenum=worksheet[XLSX.utils.encode_cell({c: 2, r: R})]?.v ?? '';
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					totallist[thenum]["0"]=worksheet[XLSX.utils.encode_cell({c: 2, r: R})]?.v ?? '';
					totallist[thenum]["1"]=worksheet[XLSX.utils.encode_cell({c: 0, r: R})]?.v ?? '';
					totallist[thenum]["2"]=worksheet[XLSX.utils.encode_cell({c: 1, r: R})]?.v ?? '';
					by=worksheet[XLSX.utils.encode_cell({c: 7, r: R})]?.v ?? '';
					bm=worksheet[XLSX.utils.encode_cell({c: 8, r: R})]?.v ?? '';
					bd=worksheet[XLSX.utils.encode_cell({c: 9, r: R})]?.v ?? '';
					totallist[thenum]["3"]=by+"/"+bm+"/"+bd;
					totallist[thenum]["4"]=worksheet[XLSX.utils.encode_cell({c: 14, r: R})]?.v ?? '';
					totallist[thenum]["5"]=worksheet[XLSX.utils.encode_cell({c: 10, r: R})]?.v ?? '';
					totallist[thenum]["6"]=worksheet[XLSX.utils.encode_cell({c: 3, r: R})]?.v ?? '';
					totallist[thenum]["7"]=worksheet[XLSX.utils.encode_cell({c: 16, r: R})]?.v ?? '';
					totallist[thenum]["8"]=worksheet[XLSX.utils.encode_cell({c: 4, r: R})]?.v ?? '';
					totallist[thenum]["9"]=worksheet[XLSX.utils.encode_cell({c: 6, r: R})]?.v ?? '';
					town=worksheet[XLSX.utils.encode_cell({c: 11, r: R})]?.v ?? '';
					village=worksheet[XLSX.utils.encode_cell({c: 12, r: R})]?.v ?? '';
					address=worksheet[XLSX.utils.encode_cell({c: 13, r: R})]?.v ?? '';
					totallist[thenum]["10"]=town+village+address;
				}
				resolve(true);
			};
			reader.onerror = function() {
                reject(new Error('讀取錯誤'));
            };
			 reader.readAsArrayBuffer(excel1.files[0]);
		}
	 });
}
function readexcel2(){
	return new Promise((resolve, reject) => {
		excel2 = document.getElementById('excel2');
		if (!excel2.files.length) {
			resolve(false);
		} else {
			const reader = new FileReader();
			reader.onload = function(e) {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, {type: 'array'});
				const firstSheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[firstSheetName];
				const range = XLSX.utils.decode_range(worksheet['!ref']);
				for (let R = 2; R <= range.e.r; R++) {
					thenum=worksheet[XLSX.utils.encode_cell({c: 4, r: R})]?.v ?? '';
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					totallist[thenum]["11"]=worksheet[XLSX.utils.encode_cell({c: 9, r: R})]?.v ?? '';
					totallist[thenum]["12"]=worksheet[XLSX.utils.encode_cell({c: 10, r: R})]?.v ?? '';
					totallist[thenum]["13"]=worksheet[XLSX.utils.encode_cell({c: 13, r: R})]?.v ?? '';
					totallist[thenum]["14"]=worksheet[XLSX.utils.encode_cell({c: 14, r: R})]?.v ?? '';
					totallist[thenum]["15"]=worksheet[XLSX.utils.encode_cell({c: 15, r: R})]?.v ?? '';
					totallist[thenum]["16"]=worksheet[XLSX.utils.encode_cell({c: 16, r: R})]?.v ?? '';
					totallist[thenum]["17"]=worksheet[XLSX.utils.encode_cell({c: 17, r: R})]?.v ?? '';
					totallist[thenum]["18"]=worksheet[XLSX.utils.encode_cell({c: 18, r: R})]?.v ?? '';
					totallist[thenum]["19"]=worksheet[XLSX.utils.encode_cell({c: 19, r: R})]?.v ?? '';
					totallist[thenum]["20"]=worksheet[XLSX.utils.encode_cell({c: 20, r: R})]?.v ?? '';
					totallist[thenum]["21"]=worksheet[XLSX.utils.encode_cell({c: 21, r: R})]?.v ?? '';
					totallist[thenum]["22"]=worksheet[XLSX.utils.encode_cell({c: 22, r: R})]?.v ?? '';
					totallist[thenum]["23"]=worksheet[XLSX.utils.encode_cell({c: 23, r: R})]?.v ?? '';
					totallist[thenum]["24"]=worksheet[XLSX.utils.encode_cell({c: 24, r: R})]?.v ?? '';
					totallist[thenum]["25"]=worksheet[XLSX.utils.encode_cell({c: 25, r: R})]?.v ?? '';
					totallist[thenum]["26"]=worksheet[XLSX.utils.encode_cell({c: 26, r: R})]?.v ?? '';
					totallist[thenum]["27"]=worksheet[XLSX.utils.encode_cell({c: 27, r: R})]?.v ?? '';
					totallist[thenum]["28"]=worksheet[XLSX.utils.encode_cell({c: 28, r: R})]?.v ?? '';
					totallist[thenum]["29"]=worksheet[XLSX.utils.encode_cell({c: 29, r: R})]?.v ?? '';
					totallist[thenum]["30"]=worksheet[XLSX.utils.encode_cell({c: 30, r: R})]?.v ?? '';
					totallist[thenum]["31"]=worksheet[XLSX.utils.encode_cell({c: 37, r: R})]?.v ?? '';
					totallist[thenum]["32"]=worksheet[XLSX.utils.encode_cell({c: 38, r: R})]?.v ?? '';
					totallist[thenum]["33"]=worksheet[XLSX.utils.encode_cell({c: 51, r: R})]?.v ?? '';
					totallist[thenum]["34"]=worksheet[XLSX.utils.encode_cell({c: 50, r: R})]?.v ?? '';
					totallist[thenum]["35"]=worksheet[XLSX.utils.encode_cell({c: 52, r: R})]?.v ?? '';
					totallist[thenum]["36"]=worksheet[XLSX.utils.encode_cell({c: 53, r: R})]?.v ?? '';
					totallist[thenum]["37"]=worksheet[XLSX.utils.encode_cell({c: 54, r: R})]?.v ?? '';
					totallist[thenum]["38"]=worksheet[XLSX.utils.encode_cell({c: 55, r: R})]?.v ?? '';
					totallist[thenum]["39"]=worksheet[XLSX.utils.encode_cell({c: 44, r: R})]?.v ?? '';
					totallist[thenum]["40"]=worksheet[XLSX.utils.encode_cell({c: 45, r: R})]?.v ?? '';
					totallist[thenum]["41"]=worksheet[XLSX.utils.encode_cell({c: 62, r: R})]?.v ?? '';
					totallist[thenum]["42"]=worksheet[XLSX.utils.encode_cell({c: 58, r: R})]?.v ?? '';
					totallist[thenum]["43"]=worksheet[XLSX.utils.encode_cell({c: 59, r: R})]?.v ?? '';
					totallist[thenum]["44"]=worksheet[XLSX.utils.encode_cell({c: 60, r: R})]?.v ?? '';
					totallist[thenum]["45"]=worksheet[XLSX.utils.encode_cell({c: 61, r: R})]?.v ?? '';
					totallist[thenum]["46"]=worksheet[XLSX.utils.encode_cell({c: 40, r: R})]?.v ?? '';
					totallist[thenum]["47"]=worksheet[XLSX.utils.encode_cell({c: 42, r: R})]?.v ?? '';
					totallist[thenum]["48"]=worksheet[XLSX.utils.encode_cell({c: 82, r: R})]?.v ?? '';
					totallist[thenum]["49"]=worksheet[XLSX.utils.encode_cell({c: 83, r: R})]?.v ?? '';
					totallist[thenum]["50"]=worksheet[XLSX.utils.encode_cell({c: 84, r: R})]?.v ?? '';
					totallist[thenum]["51"]=worksheet[XLSX.utils.encode_cell({c: 43, r: R})]?.v ?? '';
					totallist[thenum]["52"]=worksheet[XLSX.utils.encode_cell({c: 41, r: R})]?.v ?? '';
				}
				resolve(true);
			};
			reader.onerror = function() {
                reject(new Error('讀取錯誤'));
            };
			 reader.readAsArrayBuffer(excel2.files[0]);
		}
	 });
}
function readexcel3(){
	return new Promise((resolve, reject) => {
		excel3 = document.getElementById('excel3');
		if (!excel3.files.length) {
			resolve(false);
		} else {
			const reader = new FileReader();
			reader.onload = function(e) {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, {type: 'array'});
				const firstSheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[firstSheetName];
				const range = XLSX.utils.decode_range(worksheet['!ref']);
				for (let R = 2; R <= range.e.r; R++) {
					thenum=worksheet[XLSX.utils.encode_cell({c: 4, r: R})]?.v ?? '';
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					totallist[thenum]["53"]=worksheet[XLSX.utils.encode_cell({c: 12, r: R})]?.v ?? '';
					totallist[thenum]["54"]=worksheet[XLSX.utils.encode_cell({c: 14, r: R})]?.v ?? '';
					totallist[thenum]["55"]=worksheet[XLSX.utils.encode_cell({c: 15, r: R})]?.v ?? '';
				}
				resolve(true);
			};
			reader.onerror = function() {
                reject(new Error('讀取錯誤'));
            };
			 reader.readAsArrayBuffer(excel3.files[0]);
		}
	 });
}
function readexcel4(){
	return new Promise((resolve, reject) => {
		excel4 = document.getElementById('excel4');
		if (!excel4.files.length) {
			resolve(false);
		} else {
			const reader = new FileReader();
			reader.onload = function(e) {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, {type: 'array'});
				const firstSheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[firstSheetName];
				const range = XLSX.utils.decode_range(worksheet['!ref']);
				for (let R = 2; R <= range.e.r; R++) {
					thenum=worksheet[XLSX.utils.encode_cell({c: 2, r: R})]?.v ?? '';
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					totallist[thenum]["56"]=worksheet[XLSX.utils.encode_cell({c: 8, r: R})]?.v ?? '';
				}
				resolve(true);
			};
			reader.onerror = function() {
                reject(new Error('讀取錯誤'));
            };
			 reader.readAsArrayBuffer(excel4.files[0]);
		}
	 });
}
function readexcel5(){
	return new Promise((resolve, reject) => {
		excel5 = document.getElementById('excel5');
		if (!excel5.files.length) {
			resolve(false);
		} else {
			const reader = new FileReader();
			reader.onload = function(e) {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, {type: 'array'});
				const firstSheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[firstSheetName];
				const range = XLSX.utils.decode_range(worksheet['!ref']);
				for (let R = 1; R <= range.e.r; R++) {
					thenum=worksheet[XLSX.utils.encode_cell({c: 2, r: R})]?.v ?? '';
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					totallist[thenum]["57"]=worksheet[XLSX.utils.encode_cell({c: 16, r: R})]?.v ?? '';
					totallist[thenum]["58"]=worksheet[XLSX.utils.encode_cell({c: 15, r: R})]?.v ?? '';

				}
				resolve(true);
			};
			reader.onerror = function() {
                reject(new Error('讀取錯誤'));
            };
			 reader.readAsArrayBuffer(excel5.files[0]);
		}
	 });
}
function readexcel6(){
	return new Promise((resolve, reject) => {
		excel6 = document.getElementById('excel6');
		if (!excel6.files.length) {
			resolve(false);
		} else {
			const reader = new FileReader();
			reader.onload = function(e) {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, {type: 'array'});
				const firstSheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[firstSheetName];
				const range = XLSX.utils.decode_range(worksheet['!ref']);
				for (let R = 1; R <= range.e.r; R++) {
					thenum=worksheet[XLSX.utils.encode_cell({c: 0, r: R})]?.v ?? '';
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					totallist[thenum]["59"]=worksheet[XLSX.utils.encode_cell({c: 9, r: R})]?.v ?? '';
				}
				resolve(true);
			};
			reader.onerror = function() {
                reject(new Error('讀取錯誤'));
            };
			 reader.readAsArrayBuffer(excel6.files[0]);
		}
	 });
}
function readexcel7(){
	return new Promise((resolve, reject) => {
		excel7 = document.getElementById('excel7');
		if (!excel7.files.length) {
			resolve(false);
		} else {
			const reader = new FileReader();
			reader.onload = function(e) {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, {type: 'array'});
				const firstSheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[firstSheetName];
				const range = XLSX.utils.decode_range(worksheet['!ref']);
				for (let R = 1; R <= range.e.r; R++) {
					thenum=worksheet[XLSX.utils.encode_cell({c: 3, r: R})]?.v ?? '';
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					totallist[thenum]["60"]=worksheet[XLSX.utils.encode_cell({c: 13, r: R})]?.v ?? '';
					totallist[thenum]["61"]=worksheet[XLSX.utils.encode_cell({c: 7, r: R})]?.v ?? '';
					totallist[thenum]["62"]=worksheet[XLSX.utils.encode_cell({c: 9, r: R})]?.v ?? '';
				}
				resolve(true);
			};
			reader.onerror = function() {
                reject(new Error('讀取錯誤'));
            };
			 reader.readAsArrayBuffer(excel7.files[0]);
		}
	 });
}
function readexcel8(){
	return new Promise((resolve, reject) => {
		excel8 = document.getElementById('excel8');
		if (!excel8.files.length) {
			resolve(false);
		} else {
			const reader = new FileReader();
			reader.onload = function(e) {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, {type: 'array'});
				const firstSheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[firstSheetName];
				const range = XLSX.utils.decode_range(worksheet['!ref']);
				oralids=[];
				for (let R = 3; R <= range.e.r; R++) {
					oralid=worksheet[XLSX.utils.encode_cell({c: 4, r: R})]?.v ?? '';
					if (oralid!=''){
						oralids.push(oralid);
					}
				}
				numlist=Object.keys(totallist);
				for (ni=0;ni<numlist.length;ni++){
					numlistid=totallist[numlist[ni]][1];
					thenum=totallist[numlist[ni]][0];
					if (oralids.includes(numlistid)){
						if (!totallist[thenum]) {
							totallist[thenum] = {};
						}
						totallist[thenum]["63"]="已做";
					} else {
						if (!totallist[thenum]) {
							totallist[thenum] = {};
						}
						totallist[thenum]["63"]="";
					}
				}
				resolve(true);
			};
			reader.onerror = function() {
                reject(new Error('讀取錯誤'));
            };
			 reader.readAsArrayBuffer(excel8.files[0]);
		}
	 });
}
function readexcel9(){
	return new Promise((resolve, reject) => {
		excel9 = document.getElementById('excel9');
		if (!excel9.files.length) {
			resolve(false);
		} else {
			const reader = new FileReader();
			reader.onload = function(e) {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, {type: 'array'});
				const firstSheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[firstSheetName];
				const range = XLSX.utils.decode_range(worksheet['!ref']);
				for (let R = 1; R <= range.e.r; R++) {
					thenum=worksheet[XLSX.utils.encode_cell({c: 0, r: R})]?.v ?? '';
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					totallist[thenum]["64"]=worksheet[XLSX.utils.encode_cell({c: 9, r: R})]?.v ?? '';
					totallist[thenum]["65"]=worksheet[XLSX.utils.encode_cell({c: 10, r: R})]?.v ?? '';
				}
				resolve(true);
			};
			reader.onerror = function() {
                reject(new Error('讀取錯誤'));
            };
			 reader.readAsArrayBuffer(excel9.files[0]);
		}
	 });
}
function showptable(){
	numlist=Object.keys(totallist);
	tablebody=document.getElementById('reporttable').children[1];
	for (tbr=0;tbr<numlist.length;tbr++){
		if (numlist[tbr].length==13){
			row = tablebody.insertRow();
			row.onclick = function() {
				var selected = document.querySelector(".highlight");
				if (selected) selected.classList.remove("highlight");
				this.classList.add("highlight");
			};
			for (tbc=0;tbc<=65;tbc++){
				cell = row.insertCell();
				if (totallist[numlist[tbr]][tbc]==null){
					cell.textContent="";
				} else {
					cell.textContent=totallist[numlist[tbr]][tbc];
				}			
			}
		}
	}
}

function readexcelall(){
	return new Promise((resolve, reject) => {
		excelall = document.getElementById('excelall');
		if (!excelall.files.length) {
			resolve(false);
		} else {
			const reader = new FileReader();
			reader.onload = function(e) {
				totallist={};
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, {type: 'array'});
				const firstSheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[firstSheetName];
				const range = XLSX.utils.decode_range(worksheet['!ref']);
				for (let R = 1; R <= range.e.r; R++) {
					thenum=worksheet[XLSX.utils.encode_cell({c: 0, r: R})]?.v ?? '';
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					for (C=0;C<=65;C++){
						totallist[thenum][C.toString()]=worksheet[XLSX.utils.encode_cell({c: C, r: R})]?.v ?? '';
					}
				}
				resolve(true);
			};
			reader.onerror = function() {
                reject(new Error('讀取錯誤'));
            };
			 reader.readAsArrayBuffer(excelall.files[0]);
		}
	 });
}
async function starttransferall(){
	try {
		tablebody=document.getElementById('reporttable').children[1];
		tablebody.innerHTML='';
		errmsg='';
        result= await readexcelall();
        if (!result) {
            errmsg=errmsg+'總表錯誤\n'
        } 
		showptable();
    } catch (error) {
        alert(`${error.message}`); 
    }
}

function exportToExcel() {
    const table = document.getElementById("reporttable");
    let worksheet = XLSX.utils.table_to_sheet(table, {raw: true}); 
    for (let cell in worksheet) {
        if (cell.startsWith('!')) continue; 
        worksheet[cell].t = 's'; 
    }
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const wbout = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const blob = new Blob([wbout], {type: 'application/octet-stream'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "總表匯出.xlsx";
    a.click();
    URL.revokeObjectURL(url);
}

function granfromtable(){
	tablebody=document.getElementById('reporttable').children[1];
	grabobj={};
	for (i=0;i<tablebody.rows.length;i++){
		thenum=tablebody.rows[i].cells[0].textContent;
		grabobj[thenum]={};
		for (j=0;j<=65;j++){
			grabobj[thenum][j.toString()]=tablebody.rows[i].cells[j].textContent;
		}
	}
	return grabobj
}


function exportToPDF(){
	printwindow = window.open('', '_blank');
	reportlist=granfromtable();
	reportlistkey=Object.keys(reportlist);
	reportcontent=`
<!DOCTYPE html><html><head><title>報告總檔匯出</title><style>html{font-family: '標楷體' ;}@media print{html, body{width: 210mm; min-height: 297mm; margin: 0; padding: 0;} .page-break{display: block; page-break-after: always;}.page-break2{display: none;}*{-webkit-print-color-adjust: exact;} } @media screen{body{background: white; width: 210mm; min-height: 297mm; margin: 20px auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);} }.page-break2{height: 10px;background-color: rgba(0, 0, 0, 0.5);}.checklist_title{font-size: 24px;font-weight: 400;text-align: center;} .checklist_table_1{border-collapse: collapse; width: 95%;margin-left: auto;margin-right: auto;} .checklist_table_1 th, .checklist_table_1 td{border: 1px solid transparent;font-size: 20px;}.checklist_table_2{border-collapse: collapse; width: 95%;table-layout: fixed;margin-left: auto;margin-right: auto;} .checklist_table_2 th, .checklist_table_2 td{border: 1px solid;font-size: 20px;}.checklist_table_2 th:nth-child(1){width: 20%;}.checklist_table_2 td:nth-child(1){text-align: center;}.checklist_table_2 th:nth-child(2){width: 30%;}.checklist_table_2 th:nth-child(3){width: 20%;}.checklist_table_2 td:nth-child(3){text-align: center;}.checklist_table_2 th:nth-child(4){width: 30%;}.checklist_table_value{text-decoration: underline;}.checklist_table_3{border-collapse: collapse; width: 95%;table-layout: fixed;margin-left: auto;margin-right: auto;}.checklist_table_3 th, .checklist_table_3 td{border: 1px solid;font-size: 20px;}.checklist_table_3 td:nth-child(1){width: 10%;}.checklist_table_3 tdnth-child(2){width: 30%;}.checklist_table_3 tdnth-child(3){width: 60%;}.checklist_sign{font-size: 20px;text-align: center;}.checklist_uppertitle{font-size: 32px;font-weight: 400;background-color: #d0e7ff;}.checklist_middletitle{font-size: 70px;font-weight: 400;text-align: center;}.checklist_content{font-size: 32px;font-weight: 400;}.checklist_splitline{font-size: 32px;font-weight: 400;text-align: center;}.report_title{font-size: 20px;font-weight: 400;text-align: center;}.report_table{border-collapse: collapse; width: 95%;table-layout: fixed;margin-left: auto;margin-right: auto;} .report_table th, .report_table td{border: 1px transparent;font-size: 20px;}.report_table th:nth-child(1){width: 25%;}.report_table th:nth-child(2){width: 25%;}.report_table th:nth-child(3){width: 25%;}.report_table th:nth-child(4){width: 25%;}.report_table td:nth-child(3){text-align: center;}.report_table_underline{text-decoration: underline;text-align: center;}.report_table_title{font-size: 20px;font-weight: 400;padding: 2px;background-color: #BEBEBE;background-clip: content-box;text-align: center;}.report_table_subtitle{font-size: 20px;font-weight: 600;}.suggestion_title{font-size: 24px;font-weight: 700;text-align: center;}.suggestion_table1{border-collapse: collapse; width: 95%;table-layout: fixed;margin-left: auto;margin-right: auto;} .suggestion_table1 th, .suggestion_table1 td{border: 1px transparent;font-size: 20px;}.suggestion_table1 th:nth-child(1){width: 50%;}.suggestion_table1 th:nth-child(2){width: 50%;}.suggestion_table2{border-collapse: collapse; width: 95%;table-layout: fixed;margin-left: auto;margin-right: auto;} .suggestion_table2 th{border: 1px solid;font-size: 20px;font-weight: 600;text-align: center;}.suggestion_table2 td{border: 1px solid;font-size: 20px;}.suggestion_table2 th:nth-child(1){width: 5%;}.suggestion_table2 th:nth-child(2){width: 20%;}.suggestion_table2 th:nth-child(3){width: 75%;}.transfer_title{font-size: 24px;font-weight: 700;text-align: center;}.transfer_table1{border-collapse: collapse; width: 95%;table-layout: fixed;margin-left: auto;margin-right: auto;} .transfer_table1 th, .transfer_table1 td{border: 1px transparent;font-size: 20px;}.transfer_table1 td:nth-child(1){width: 50%;text-align: left;}.transfer_table1 td:nth-child(2){width: 50%;text-align: right;}.transfer_table2{border-collapse: collapse; width: 95%;table-layout: fixed;margin-left: auto;margin-right: auto;}.transfer_table2 th, .transfer_table2 td{border: 2px solid;font-size: 16px;text-align: center;table-layout: fixed;}.transHP_title{font-size: 24px;font-weight: 700;text-align: center;}.transHP_table{border: 2px solid; border-collapse: collapse; width: 95%;table-layout: fixed;margin-left: auto;margin-right: auto;}.transHP_table th, .transHP_table td{border: 1px transparent;font-size: 16px;}.transHP_end{width: 95%;font-size: 16px;font-weight: 700;text-align: left;margin-left: auto;margin-right: auto;}</style></head><body>
`
	for (i=0;i<reportlistkey.length;i++){
		dat=reportlist[reportlistkey[i]];
		reportcontent+='<div class="checklist_title">和美鎮衛生所整篩報告check list</div>';
		reportcontent+='<table class="checklist_table_1"><tr><td colspan="2">整篩編號 :'+dat[0]+"</td>";
		if (dat[7]=="21"){
			temp="23";
		} else if (dat[7]=="22"){
			temp="24";
		} else if (dat[7]=="25"){
			temp="26";
		} else if (dat[7]=="27"){
			temp="28";
		} else {
			temp="60";
		} 
		reportcontent+='<td>【掛號碼：'+temp+'】</td></tr>';
		reportcontent+='<tr><td>姓　　名 : '+dat[2]+'</td><td>身 分 證 : '+dat[1]+'</td><td>生　　日 : '+dat[3]+'</td></tr>';
		reportcontent+='<tr><td>電　　話 : '+dat[8]+'</td><td>手　　機 : '+dat[9]+'</td><td></td></tr></table>';
		reportcontent+='<table class="checklist_table_2"><tr><th>項目</th><th>結果</th><th>處置</th><th>備註</th></tr>';
		if (dat[11]*1>130 || dat[12]*1>80){
			temp="✱";
			temp2="衛教單";
		} else {
			temp="　";
			temp2="X";
		}
		reportcontent+='<tr><td>血壓</td><td>　<span class="checklist_table_value">'+temp+dat[11]+'/'+dat[12]+'　</span>mmHg</td><td>'+temp2+'</td><td>□已就醫，院所：</td></tr>';
		if (dat[22]=='有'){
			temp="■是 □否 □已戒菸";
			temp2="■戒菸建議書";
		} else if (dat[22]=='已戒菸'){
			temp="□是 □否 ■已戒菸";
			temp2="□戒菸建議書";
		} else {
			temp="□是 ■否 □已戒菸";
			temp2="□戒菸建議書";
		}
		reportcontent+='<tr><td>抽菸</td><td>'+temp+'</td><td>X</td><td>'+temp2+'</td></tr>';
		if (dat[31]*1>100){
			temp="✱";
		} else {
			temp="　";
		}
		if (dat[32]*1>=6.5){
			temp2="✱";
		} else {
			temp2="　";
		}
		if (temp=="✱" || temp2=="✱"){
			temp3="衛教單";
		} else {
			temp3="X";
		}
		reportcontent+='<tr><td>血糖</td><td>空 腹 血 糖:<span class="checklist_table_value">'+temp+dat[31]+'　</span><br> 糖化血色素 :<span class="checklist_table_value">'+temp2+dat[32]+'　</span></td><td>'+temp3+'</td><td>□已就醫，院所：</td></tr>';
		if (['第4期','第5期'].includes(dat[51])){
			t0="✱";
			temp2="轉診單";
		} else if (['第1期','第2期','第3a期','第3b期'].includes(dat[51])){
			t0="✱";
			temp2="衛教單";
		} else {
			t0="";
			temp2="X";
		}
		if(dat[47]*1<60){
			t1="✱";
		} else {
			t2="";
		}
		if (dat[50]=='因數值超出線性，無法計算比值。'){
			temp="尿蛋白<6";
		} else {
			if (dat[50]*1>150){
				temp="✱"+dat[50];
			} else {
				temp=dat[50];
			}
			
		}
		reportcontent+='<tr><td>慢性腎臟病(CKD)</td><td>'+t0+dat[51]+'，eGFR:<span class="checklist_table_value">'+t2+dat[47]+'</span><br>UPCR:<span class="checklist_table_value">'+temp+'</span></td><td>'+temp2+'</td><td>□已就醫，院所：</td></tr>';
        if (dat[33]*1>200){
			t0="✱"+dat[33];
		} else {
			t0="　"+dat[33];
		}
		if (dat[34]*1>150){
			t1="✱"+dat[34];
		} else {
			t1="　"+dat[34];
		}
		if (dat[5]=="男"){
			if (dat[35]*1<40){
				t2="✱"+dat[35];
			} else {
				t2="　"+dat[35];
			}
		} else {
			if (dat[35]*1<50){
				t2="✱"+dat[35];
			} else {
				t2="　"+dat[35];
			}
		}
		if (dat[36]*1>130){
			t3="✱"+dat[36];
		} else {
			t3="　"+dat[36];
		}
		tall=t0+t1+t2+t3;
		if (tall.includes("✱")){
			t4="衛教單";
		} else {
			t4="X";
		}
		reportcontent+='<tr><td>血脂肪</td><td>T C:<span class="checklist_table_value">'+t0+'　</span><br>T G:<span class="checklist_table_value">'+t1+'　</span><br>HDL:<span class="checklist_table_value">'+t2+'　</span><br>LDL:<span class="checklist_table_value">'+t3+'　</span></td><td>'+t4+'</td><td>□已就醫，院所：</td></tr>';
		if (dat[42]=="陽性"){
			t0="■陽性 □陰性 □舊陽性";
			t1="轉診單";
		} else if (dat[42]=="陰性"){
			t0="□陽性 ■陰性 □舊陽性";
			t1="X";
		} else if (dat[42]=="先前驗過為陽性，此次未再檢驗"){
			t0="□陽性 □陰性 ■舊陽性";
			t1="轉診單";
		} else {
			t0="□陽性 □陰性 □舊陽性";
			t1="X";
		}
		reportcontent+='<tr><td>B肝</td><td>'+t0+'</td><td>'+t1+'</td><td rowspan="3">□衛生所肝超，時間:<br>　___月___日___點___分<br>□自行就醫　:________<br>□原就醫診所:________</td></tr>';
		if (dat[44]=="陽性"){
			t0="■陽性 □陰性 □舊陽性";
			t1="轉診單";
		} else if (dat[44]=="陰性"){
			t0="□陽性 ■陰性 □舊陽性";
			t1="X";
		} else if (dat[44]=="先前驗過為陽性，此次未再檢驗"){
			t0="□陽性 □陰性 ■舊陽性";
			t1="轉診單";
		} else {
			t0="□陽性 □陰性 □舊陽性";
			t1="X";
		}
		reportcontent+='<tr><td>C肝</td><td>'+t0+'</td><td>'+t1+'</td></tr>';
		if (dat[41]*1>9){
			t0="✱"+dat[41];
			t1="轉診單";
		} else {
			t0="　"+dat[41];
			t1="X";
		}
		reportcontent+='<tr><td>AFP</td><td><span class="checklist_table_value">'+t0+'　</span>ng/dL</td><td>'+t1+'</td></tr>';
		if (dat[54]!=""){
			t1="轉診單";
		} else {
			t1="X";
		}
		reportcontent+='<tr><td>胸部X光</td><td>'+dat[53]+'</td><td>'+t1+'</td><td>□已就醫，院所：</td></tr><tr><td>驗痰</td><td>　'+dat[55]+'　</td><td>X</td><td></td></tr>';
		if (dat[56]=="陽性"){
			t0="■陽性 □陰性 □未做";
			t1="轉診單";
		} else if (dat[56]=="陰性"){
			t0="□陽性 ■陰性 □未做";
			t1="X";
		} else {
			t0="□陽性 □陰性 ■未做";
			t1="X";
		}
		reportcontent+='<tr><td>糞便潛血(FOBT)</td><td>'+t0+'</td><td>'+t1+'</td><td>□已就醫，院所：</td></tr>';
		if (dat[59]=="陽性"){
			t0="■陽性 □陰性 □未做";
			t1="轉診單";
		} else if (dat[59]=="陰性"){
			t0="□陽性 ■陰性 □未做";
			t1="X";
		} else {
			t0="□陽性 □陰性 ■未做";
			t1="X";
		}
		reportcontent+='<tr><td>幽門桿菌(HP)</td><td>'+t0+'</td><td>'+t1+'</td><td>□已就醫，院所：</td></tr>';
		if (dat[60]=="陽性"){
			t0="■陽性 □陰性 □未做";
			t1="轉診單";
		} else if (dat[60]=="陰性"){
			t0="□陽性 ■陰性 □未做";
			t1="X";
		} else {
			t0="□陽性 □陰性 ■未做";
			t1="X";
		}
		reportcontent+='<tr><td>胃蛋白酶(PG)</td><td>'+t0+'</td><td>'+t1+'</td><td>□已就醫，院所：</td></tr>';
		if (dat[5]=='男'){
			t0="N/A";
			t1="X";
		} else {
			if (dat[57]==""){
				t0="未做";
				t1="X";
			} else {
				papcode=dat[58];
				t0="【"+dat[57]+"】"+papcodelist[papcode];
				if (["1","2","3"].includes(papcode)){
					t1="衛教單";
				} else if (papcode=="21"){
					t1="重抹";
				} else{
					t1="轉診單";
				}
			}
		}
		reportcontent+='<tr><td>子宮頸抹片</td><td>'+t0+'</td><td>'+t1+'</td><td>□已就醫，院所：</td></tr></table>';
		reportcontent+='</table><table class="checklist_table_3"><tr><td style="text-align: center;">乳攝</td>';
		if (dat[5]=='男'){
			t0="N/A";
			t1="□可做篩檢　■資格不符";
		} else {
			if (dat[64]==""){
				t0=dat[65];
				t1="□可做篩檢　■資格不符";
			} else if (dat[64]=="首篩"){
				t0="首篩";
				t1="■可做篩檢　□資格不符";
			} else {
				t0=dat[65];
				t1="■可做篩檢　□資格不符";
			}
		}
		reportcontent+='<td>最近一次篩檢<br>日期:<span>　'+t0+'　</span></td><td>二階日期: <span>'+explaintime+'</span>預約時間: <br><span>'+t1+'</span></td></tr>';
		tcount=0;
		if (dat[56]!=""){
			t0="■FOBT";
			tcount+=1;
		} else {
			t0="□FOBT";
		}
		if (dat[63]!=""){
			t1="■口篩";
			tcount+=1;
		} else {
			t1="□口篩";
		}
		reportcontent+='<tr><td colspan="3">備註:<br>1. 禮卷:<span>□乳 '+t0+' '+t1+' □子抹，共 '+tcount+' 張</span><br>2. <span>□問卷補資料</span><br>3. 其他:<br><br><br></td></tr></table>';
		reportcontent+='<br><div class="checklist_sign">解說醫師簽章:__________________　　　　領取報告及禮券簽章:__________________</div>	<div class="page-break2"></div><div class="page-break"></div>';
		reportcontent+='<br><span class="checklist_uppertitle">編號:'+dat[0]+"　　姓名:"+dat[2]+'</span><br><br><br><br><br><br><div class="checklist_middletitle">113年萬人健康檢查<br><br>和美鎮衛生所<br><br>衛教及轉診說明書<br><br></div>';
		reportcontent+='<div class="checklist_content">問卷編號:<span>'+dat[0]+'</span></div>';
		reportcontent+='<div class="checklist_content">姓　　名:<span>'+dat[2]+'</span></div>';
		reportcontent+='<div class="checklist_content">檢查日期:<span>'+dat[6]+'</span></div><br><div class="checklist_splitline">------------------若有疑問請洽------------------</div><div class="checklist_content">電　　話:<span> 04-7062455</span></div><br><div class="checklist_content">護理人員:</div><br><br><br><br><div class="checklist_splitline">彰化縣衛生局關心您</div>';
		reportcontent+='<div class="page-break2"></div><div class="page-break"></div>';
		reportcontent+='<div class="report_title">健康檢查報告(第一頁)</div><table class="report_table">';
		reportcontent+='<tr><td colspan="3">整篩編號:<span>'+dat[0]+'</span></td><td>姓名:<span>'+dat[2]+'</span></td></tr>';
		reportcontent+='<tr><td class="report_table_underline">中文名稱</td><td class="report_table_underline">英文名稱</td><td class="report_table_underline">檢驗值</td><td class="report_table_underline">參考值</td></tr>';
		reportcontent+='<tr><td colspan="4" class="report_table_title">體格檢查</td></tr>';
		
		t0=addcomment(dat[11],130,90,true);
		reportcontent+='<tr><td class="report_table_subtitle">收縮壓</td><td>Systolic pressure</td><td>'+t0+'</td><td>90~130 mmHg</td></tr>';
		t0=addcomment(dat[12],80,60,true);
		reportcontent+='<tr><td class="report_table_subtitle">舒張壓</td><td>Diastolic pressure</td><td>'+t0+'</td><td>60~80 mmHg</td></tr>';
		reportcontent+='<tr><td class="report_table_subtitle">身高</td><td>Height</td><td>'+dat[13]+'</td><td></td></tr>';
		reportcontent+='<tr><td class="report_table_subtitle">體重</td><td>Weight</td><td>'+dat[14]+'</td><td></td></tr>';		
		t0=addcomment(dat[15],24,18.5,true);
		if (!t0.includes("✱")){
			idealweight=Math.round(22*dat[13]*dat[13]/10000);
			if (dat[15]*1>=27){
				t0=t0+"，肥胖<br>理想體重"+idealweight+'公斤';
			} else if (dat[15]*1>=24 && dat[15]*1<27){
				t0=t0+"，過重<br>理想體重"+idealweight+'公斤';
			} else if (dat[15]*1>=18.5 && dat[15]*1<24){
				t0=t0+"，正常<br>理想體重"+idealweight+'公斤';
			} else if (dat[15]*1<18.5){
				t0=t0+"，過輕<br>理想體重"+idealweight+'公斤';
			}  
		}
		reportcontent+='<tr><td class="report_table_subtitle">身體質量指數</td><td>Body mass index</td><td><span>'+t0+'</span></td><td>18.5~24 kg/m2</td></tr>';
		if (dat[5]=='男'){
			t0=addcomment(dat[16],90,0,true);
		} else {
			t0=addcomment(dat[16],80,0,true);
		}
		reportcontent+='<tr><td class="report_table_subtitle">腰圍</td><td>Wiastline</td><td>'+t0+'</td><td>男性:≦90公分<br>女性:≦80公分</td></tr>';
		t0=addcomment(dat[17],60,100,true);
		reportcontent+='<tr><td class="report_table_subtitle">脈搏</td><td>Pulse rate</td><td>'+t0+'</td><td>60~100次/分</td></tr>';
		t0=(dat[18] !== "" ? addcomment(dat[18], 2.0, 0.6, true) : null) ?? "未測量";
		t1=(dat[19] !== "" ? addcomment(dat[19], 2.0, 0.6, true) : null) ?? "未測量";
		t2=(dat[20] !== "" ? addcomment(dat[20], 2.0, 0.6, true) : null) ?? "未測量";
		t3=(dat[21] !== "" ? addcomment(dat[21], 2.0, 0.6, true) : null) ?? "未測量";
		reportcontent+='<tr><td colspan="4" class="report_table_title">眼科檢查</td></tr>';
		reportcontent+='<tr><td class="report_table_subtitle">裸視(右眼)</td><td>Naked eye [R'+"'"+'t]</td><td>'+t0+'</td><td>0.6~2.0</td></tr>';		
		reportcontent+='<tr><td class="report_table_subtitle">裸視(左眼)</td><td>Naked eye [L'+"'"+'t]</td><td>'+t1+'</td><td>0.6~2.0</td></tr>';		
		reportcontent+='<tr><td class="report_table_subtitle">校正(右眼)</td><td>Naked eye [R'+"'"+'t]</td><td>'+t2+'</td><td>0.6~2.0</td></tr>';		
		reportcontent+='<tr><td class="report_table_subtitle">校正(左眼)</td><td>Naked eye [L'+"'"+'t]</td><td>'+t3+'</td><td>0.6~2.0</td></tr>';
		reportcontent+='<tr><td class="report_table_title" style="text-align: center;">抽菸習慣</td><td></td><td>'+dat[22]+'</td><td></td></tr>';
		reportcontent+='<tr><td colspan="4" class="report_table_title">血液常規檢查</td></tr>';
		t0=addcomment(dat[23],10,3,true);
		reportcontent+='<tr><td class="report_table_subtitle">白血球計數</td><td>WBC count</td><td>'+t0+'</td><td>3~10 x 10^3/uL</td></tr>';
		t0=addcomment(dat[24],10,3.8,true);
		reportcontent+='<tr><td class="report_table_subtitle">紅血球計數</td><td>RBC count</td><td>'+t0+'</td><td>3.8~6 x 10^6/uL</td></tr>';
		t0=addcomment(dat[25],16,12,true);
		reportcontent+='<tr><td class="report_table_subtitle">血色素</td><td>Hemoglobin</td><td>'+t0+'</td><td>12~16 g/dL</td></tr>';
		t0=addcomment(dat[26],46.9,33.5,true);
		reportcontent+='<tr><td class="report_table_subtitle">血球容積比</td><td>Hematocrite</td><td>'+t0+'</td><td>33.5~46.9 %</td></tr>';
		t0=addcomment(dat[27],33,25.8,true);
		reportcontent+='<tr><td class="report_table_subtitle">平均血紅素量</td><td>MCH</td><td>'+t0+'</td><td>25.8~33.0 pg</td></tr>';
		t0=addcomment(dat[28],100,80,true);
		reportcontent+='<tr><td class="report_table_subtitle">紅血球平均體積</td><td>MCV</td><td>'+t0+'</td><td>80~100 fL</td></tr>';
		t0=addcomment(dat[29],34.2,31.8,true);
		reportcontent+='<tr><td class="report_table_subtitle">平均血色素濃度</td><td>MCHC</td><td>'+t0+'</td><td>31.8~34.2 g/dL</td></tr>';
		t0=addcomment(dat[30],413,169,true);
		reportcontent+='<tr><td class="report_table_subtitle">血小板計數</td><td>Platelet count</td><td>'+t0+'</td><td>169~413 10^3/µL</td></tr>';
		reportcontent+='<tr><td colspan="4" class="report_table_title">血糖檢查</td></tr>';
		t0=addcomment(dat[31],100,70,true);
		reportcontent+='<tr><td class="report_table_subtitle">飯前血糖檢查</td><td>Glucose(AC)</td><td>'+t0+'</td><td>70~100 mg/dL<br>≥126 則懷疑糖尿病</td></tr>';
		t0=addcomment(dat[32],5.6,4.7,true);
		reportcontent+='<tr><td class="report_table_subtitle">醣化血色素</td><td>HbA1C</td><td>'+t0+'</td><td>4.7~5.6 %<br>≥6.5 則懷疑糖尿病</td></tr>';
		reportcontent+='<tr><td colspan="4" class="report_table_title">血脂肪檢查</td></tr>';
		t0=addcomment(dat[33],200,0,true);
		reportcontent+='<tr><td class="report_table_subtitle">血清總膽固醇</td><td>Total cholesterol</td><td>'+t0+'</td><td><200 mg/dL</td></tr>';
		t0=addcomment(dat[34],150,0,true);
		reportcontent+='<tr><td class="report_table_subtitle">三酸甘油脂</td><td>Triglyceride</td><td>'+t0+'</td><td><150 mg/dL</td></tr>';
		if (dat[5]=='男'){
			t0=addcomment(dat[35],0,40,true);
		} else {
			t0=addcomment(dat[35],0,50,true);
		}
		reportcontent+='<tr><td class="report_table_subtitle">高密度膽固醇(好)</td><td>HDL-cholesterol</td><td>'+t0+'</td><td>男性:≥40 mg/dL<br>女性:≥50 mg/dL</td></tr>';
		t0=addcomment(dat[36],130,0,true);
		reportcontent+='<tr><td class="report_table_subtitle">低密度膽固醇(壞)</td><td>LDL-cholesterol</td><td>'+t0+'</td><td><130 mg/dL<br>若糖尿病則<100</td></tr>';
		reportcontent+='</table>';
		reportcontent+='<div class="page-break2"></div><div class="page-break"></div>';
		reportcontent+='<div class="report_title">健康檢查報告(第二頁)</div><table class="report_table">';
		reportcontent+='<tr><td colspan="3">整篩編號:<span>'+dat[0]+'</span></td><td>姓名:<span>'+dat[2]+'</span></td></tr>';
		reportcontent+='<tr><td class="report_table_underline">中文名稱</td><td class="report_table_underline">英文名稱</td><td class="report_table_underline">檢驗值</td><td class="report_table_underline">參考值</td></tr>';
		reportcontent+='<tr><td colspan="4" class="report_table_title">肝功能、病毒性肝炎、肝臟腫瘤標記檢查</td></tr>';
		t0=addcomment(dat[39],40,0,true);
		reportcontent+='<tr><td class="report_table_subtitle">草酸轉胺基酶(肝)</td><td>AST(GOT)</td><td>'+t0+'</td><td>≤40 mg/dL</td></tr>';
		t0=addcomment(dat[40],40,0,true);
		reportcontent+='<tr><td class="report_table_subtitle">丙酮轉胺基酶(肝)</td><td>ALT(GPT)</td><td>'+t0+'</td><td>≤40 mg/dL</td></tr>';
		if (dat[42].includes('陽性')){
			t0="✱"+dat[42];
		} else {
			t0=dat[42];
		}
		t1=(!isNaN(dat[43]*1) ? dat[43] : null) ?? "";
		reportcontent+='<tr><td class="report_table_subtitle">B肝表面抗原(定性)</td><td>HBsAg</td><td>'+t0+'</td><td>陰性</td></tr>';
		reportcontent+='<tr><td class="report_table_subtitle">B肝表面抗原(定量)</td><td>HBsAg</td><td>'+t1+'</td><td><1 S/CO</td></tr>';
		if (dat[44].includes('陽性')){
			t0="✱"+dat[44];
		} else {
			t0=dat[44];
		}
		t1=(!isNaN(dat[45]*1) ? dat[45] : null) ?? "";
		reportcontent+='<tr><td class="report_table_subtitle">C肝抗體(定性)</td><td>Anti-HCV</td><td>'+t0+'</td><td>陰性</td></tr>';
		reportcontent+='<tr><td class="report_table_subtitle">C肝抗體(定量)</td><td>Anti-HCV</td><td>'+t1+'</td><td><1.5 S/CO</td></tr>';
		t0=addcomment(dat[41],9,0,true);
		reportcontent+='<tr><td class="report_table_subtitle">甲型胎兒蛋白(肝癌)</td><td>α-fetoprotein</td><td>'+t0+'</td><td><9.00 ng/mL</td></tr>';
		reportcontent+='<tr><td colspan="4" class="report_table_title">腎功能、蛋白尿檢查</td></tr>';
		t0=addcomment(dat[46],1.2,0.4,true);
		reportcontent+='<tr><td class="report_table_subtitle">肌酸酐</td><td>Creatinine</td><td>'+t0+'</td><td>0.4~1.2 mg</td></tr>';
		t0=addcomment(dat[47],0,60,true);
		reportcontent+='<tr><td class="report_table_subtitle">腎絲球過濾率</td><td>eGFR</td><td>'+t0+'</td><td>>60 ml/min/1.73m^2</td></tr>';
		if (dat[48]=="<6.00"){
			t0=dat[48];
		} else {
			t0=addcomment(dat[48],10,0,true);
		}
		reportcontent+='<tr><td class="report_table_subtitle">尿液總蛋白質</td><td>Urine protein</td><td>'+t0+'</td><td><10 mg/dL</td></tr>';
		t0=addcomment(dat[49],250,60,true);
		reportcontent+='<tr><td class="report_table_subtitle">尿液肌酸酐</td><td>Urine creatinine</td><td>'+t0+'</td><td>60~250 mg/dL</td></tr>';
		if (dat[50].includes('超出線性')){
			t0='尿蛋白<6，不需計算';
		} else {
			t0=addcomment(dat[50],150,0,true);
		}
		reportcontent+='<tr><td class="report_table_subtitle">尿液蛋白質/肌酸酐</td><td>UPCR</td><td>'+t0+'</td><td><150 mg/g</td></tr>';
		if (dat[51]!="正常"){
			t0=dat[51]+"✱";
		} else {
			t0=dat[51];
		}
		reportcontent+='<tr><td class="report_table_subtitle">慢性腎臟病期數</td><td>CKD stage</td><td>'+t0+'</td><td>正常</td></tr>';
		t0=addcomment(dat[52],7,0,true);
		reportcontent+='<tr><td class="report_table_subtitle">尿酸</td><td>Uric acid</td><td>'+t0+'</td><td><7mg/dL</td></tr>';
		reportcontent+='<tr><td colspan="4" class="report_table_title">肺結核篩檢</td></tr>';
		reportcontent+='<tr><td class="report_table_subtitle">胸部X光檢查</td><td>Chest X-ray</td><td>'+dat[53]+'</td><td>無活動性肺結核病灶</td></tr>';
		
		if (dat[5]=='男'){
			t0="男性不須抹片";
			t1="";
		} else {
			if (dat[57]==""){
				t0="未做";
				t1="✱";
			} else {
				papcode=dat[58];
				t0="【"+dat[57]+"】"+papcodelist[papcode];
				if (["1","2","3"].includes(papcode)){
					t1="";
				} else {
					t1="✱";
				}
			}
		}
		reportcontent+='<tr><td class="report_table_title" style="text-align: left;">子宮頸抹片</td><td>Pap smear</td><td>'+t0+'</td><td>正常或編號≤3</td></tr>';
		if (dat[56]==""){
			t0="未做";
		} else if (dat[56]=="陽性"){
			t0=dat[56]+"✱";
		} else {
			t0=dat[56]
		}
		reportcontent+='<tr><td class="report_table_title" style="text-align: left;">糞便潛血</td><td>FOBT</td><td>'+t0+'</td><td>陰性</td></tr>';
		if (dat[59]==""){
			t0="未做";
		} else if (dat[59]=="陽性"){
			t0=dat[59]+"✱";
		} else {
			t0=dat[59]
		}
		reportcontent+='<tr><td class="report_table_title" style="text-align: left;">幽門桿菌抗原</td><td>Helicobacter pylori antigen</td><td>'+t0+'</td><td>陰性</td></tr>';
		reportcontent+='<tr><td colspan="4" class="report_table_title">胃蛋白酶原檢驗</td></tr>';
		if (dat[60]==""){
			t0="未做";
		} else if (dat[60]=="陽性"){
			t0=dat[60]+"✱";
		} else {
			t0=dat[60]
		}
		reportcontent+='<tr><td class="report_table_subtitle">胃蛋白酶原檢驗結果</td><td>Pepsinogen Test</td><td>'+t0+'</td><td>PG I ≥70 或<br>PG I/II 比值≥3</td></tr>';
		if (dat[61]==""){
			t0="未做";
		} else {
			t0=addcomment(dat[61],0,70,true);
		}
		reportcontent+='<tr><td class="report_table_subtitle">胃蛋白酶I</td><td>Pepsinogen(PG) I</td><td>'+t0+'</td><td>≥70ng/mL</td></tr>';
		if (dat[62]==""){
			t0="未做";
		} else {
			t0=addcomment(dat[62],0,3,true);
		}
		reportcontent+='<tr><td class="report_table_subtitle">胃蛋白酶I/II比值</td><td>PG I/II ratio</td><td>'+t0+'</td><td>≥3</td></tr>';
		reportcontent+='</table>';
		reportcontent+='<div class="page-break2"></div><div class="page-break"></div>';
		
		reportcontent+='<div class="suggestion_title">彰化縣和美鎮衛生所整合式篩檢衛教單</div>';
		reportcontent+='<div><table class="suggestion_table1"><tr><td>整篩編號：'+dat[0]+'</td><td>姓名：'+dat[2]+'</td></tr></table></div>';
		reportcontent+='<div><table class="suggestion_table2"><tr><th></th><th>項目</th><th>說明</th></tr>';
		if (dat[11]*1>130 || dat[12]*1>80){
			t0="■";
		} else {
			t0="□";
		}
		reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">血壓偏高</td><td>1. 生活型態調整：SABCDE策略，少鹽(S)、限酒(A)、減重(B)、戒菸(C)、飲食調整(D)和運動(E)。<br>2. 722量血壓：「7」連續七天量測、「2」起床、睡前各量一次、「2」每次量兩遍，若超過130/80mmHg則建議就醫。</td></tr>';
		if (dat[31]*1>100 || dat[32]*1>5.6){
			t0="■";
		} else {
			t0="□";
		}
		reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">血糖偏高</td><td>1. 生活型態調整：多運動，均衡飲食，定時定量，多選用富含纖維質的食物，少吃富含精緻糖類的食品(糖果、煉乳、中西式甜點心)並。<br>2. 生活型態調整後3~6個月請再次抽血追蹤(需空腹)。</td></tr>';
		if (dat[33]*1>200 || dat[34]*1>150 || dat[36]*1>130 || (dat[5]=="男" && dat[35]*1<40) || (dat[5]=="女" && dat[35]*1<50)){
			t0="■";
		} else {
			t0="□";
		}
		reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">血脂肪偏高</td><td>1. 生活型態調整：多運動，避免吃富含膽固醇或油脂食物(內臟、帶殼海鮮、肥肉)，多攝取富含纖維質的食物(各種蔬菜、全榖雜糧)，選用少油的烹調方式，避免煎炸並戒酒。<br>2. 生活型態調整後3~6個月請再次抽血追蹤(需空腹)。</td></tr>';
		if (dat[51].includes('期')){
			t0="■";
		} else {
			t0="□";
		}
		reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">腎功能異常</td><td>1. 生活型態調整：多攝取水份，避免吃高鈉或過度加工食物(醃漬品、各式罐頭)，避免使用來不明的成藥、中草藥、電台藥物或保健食品，避免使用傷腎藥物(消炎止痛藥)。<br>2. 生活型態調整後3~6個月請再次抽血驗尿追蹤(不需空腹)。</td></tr>';
		if (dat[39]*1>40 || dat[40]*1>40){
			t0="■";
		} else {
			t0="□";
		}
		reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">肝功能異常</td><td>1. 生活型態調整：避免菸酒，維持理想體重，少吃發酵、煙漬食物，作息正常，避免使用來不明的成藥、中草藥、電台藥物或保健食品。<br>2. 生活型態調整後3~6個月請再次抽血驗尿追蹤(不需空腹)。</td></tr>';
		if (dat[42].includes('陽性')){
			t0="■";
		} else {
			t0="□";
		}
		reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">B型肝炎</td><td>1. 阻斷傳染途徑：避免共用針頭、牙刷、刮鬍刀等<br>2.健康飲食及多運動，保持良好的生活習慣，勿飲酒。<br>3. 每半年定期肝膽腸胃科腹部超音波及抽血檢查。</td></tr>';
		if (dat[44].includes('陽性')){
			t0="■";
		} else {
			t0="□";
		}
		reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">C型肝炎</td><td>1. 阻斷傳染途徑：避免共用針頭、牙刷、刮鬍刀等<br>2. 健康飲食及多運動，保持良好的生活習慣，勿飲酒。<br>3. 加驗病毒量，若仍有C肝病毒，接受C肝抗病毒藥物，治癒成功率達97%。</td></tr>';
		if (dat[53]=="未作"){
			t0="□";
			t1="無建議";
		} else {
			if (dat[54]==""){
				t0="■";
				t1="檢查結果為"+dat[53]+"。";
			} else {
				t0="■";
				t1="檢查結果為"+dat[53]+"，建議至"+dat[54]+"門診追蹤諮詢。";
			}
		} 
		reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">胸部X光</td><td>'+t1+'</td></tr>';
		if (dat[56]=="陽性"){
			t0="■";
		} else {
			t0="□";
		}
		reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">糞便潛血</td><td>若為陽性，屬癌前病變及大腸直腸癌高危險群，建議儘快進行大腸鏡檢查。</td></tr>';
		if (dat[59]=="陽性"){
			t0="■";
		} else {
			t0="□";
		}
		reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">幽門桿菌抗原</td><td>若為陽性，表示疑似胃幽門螺旋桿菌感染，可能導致胃腸道出血、穿孔等併發症，嚴重者可能導致胃癌。建議胃鏡檢查，並接受除菌治療。</td></tr>';
		if (dat[60]=="陽性"){
			t0="■";
		} else {
			t0="□";
		}
		reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">胃蛋白酶</td><td>若為陽性，表示您可能有萎縮性胃炎，胃酸分泌下降，建議接受胃鏡檢查，日常生活應減少鹹及醃製的食物、避免過度飲酒、戒菸，多吃新鮮蔬果。</td></tr>';
		if (dat[5]=="女"){
			if (dat[57]==""){
				t0="□";
				t1="30歲以上婦女建議美田執行子宮頸抹片檢查。";
			} else {
				t0="■";
				papcode=dat[58];
				if (["1","2","3"].includes(dat[58])){
					t1=dat[57]+"檢查結果為"+papcodelist[papcode]+'，為正常發現。';
				} else if (dat[58]=='21'){
					t1=dat[57]+"檢查結果為"+papcodelist[papcode]+'，請回診'+dat[57]+'再次抹片。'
				} else {
					t1=dat[57]+"檢查結果為"+papcodelist[papcode]+'，為異常發現，請至婦產科門診追蹤。';
				}
			}
		} else {
			t0="□";;
			t1="男性不須做抹片";
		}
		reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">子宮頸抹片</td><td>'+t1+'<br>子宮頸抹片篩檢結果準確率非100%，如發現任何異常情形或不適之狀況，建議請至婦產科就醫。</td></tr>';
		reportcontent+='<tr><td style="text-align: center;">□</td><td style="text-align: center;">其他</td><td><br><br></td></tr></table></div>';
		reportcontent+='<div class="page-break2"></div><div class="page-break"></div>';
		transGI={"S":"","P":"","T":"■肝膽腸胃科　　□婦產科　　　□心臟科<br>□大腸直腸外科　□乳房外科　　□骨科<br>□腎臟科　　　　□胸腔科　　　□其他:________"};
		transCV={"S":"","P":"","T":"□肝膽腸胃科　　□婦產科　　　■心臟科<br>□大腸直腸外科　□乳房外科　　□骨科<br>□腎臟科　　　　□胸腔科　　　□其他:________"};
		transCM={"S":"","P":"","T":"□肝膽腸胃科　　□婦產科　　　□心臟科<br>□大腸直腸外科　□乳房外科　　□骨科<br>□腎臟科　　　　■胸腔科　　　□其他:________"};
		transNEP={"S":"","P":"","T":"□肝膽腸胃科　　□婦產科　　　□心臟科<br>□大腸直腸外科　□乳房外科　　□骨科<br>■腎臟科　　　　□胸腔科　　　□其他:________"};
		transORT={"S":"","P":"","T":"□肝膽腸胃科　　□婦產科　　　□心臟科<br>□大腸直腸外科　□乳房外科　　■骨科<br>□腎臟科　　　　□胸腔科　　　□其他:________"};
		transGYN={"S":"","P":"","T":"□肝膽腸胃科　　■婦產科　　　□心臟科<br>□大腸直腸外科　□乳房外科　　□骨科<br>□腎臟科　　　　□胸腔科　　　□其他:________"};
		if (dat[39]*1>80 || dat[40]*1>80){
			transGI["S"]+="肝功能異常，GOT:"+dat[39]+"IU/L,GPT:"+dat[40]+"IU/L，";
			transGI["P"]+="進一步檢查及治療";
		}
		if (dat[42].includes('陽性')){
			transGI["S"]+="B型肝炎表面抗原"+dat[42]+"，";
			transGI["P"]+="腹部超音波檢查";
		}
		if (dat[44].includes('陽性')){
			transGI["S"]+="C型肝炎表面抗原"+dat[44]+"，";
			transGI["P"]+="腹部超音波檢查";
		}
		if (dat[41]*1>9){
			transGI["S"]+="甲型胎兒蛋白偏高，"+dat[41]+"ng/mL，";
			transGI["P"]+="進一步檢查及治療";
		}
		if (dat[56].includes('陽性')){
			transGI["S"]+="FOBT"+dat[56]+"，";
			transGI["P"]+="大腸鏡檢查";
		}
		if (dat[59].includes('陽性')){
			transGI["S"]+="胃幽門桿菌"+dat[59]+"，";
			transGI["P"]+="胃鏡檢查除菌治療";
		}
		if (dat[60].includes('陽性')){
			transGI["S"]+="胃蛋白酶原檢驗結果"+dat[60]+"，PG I:"+dat[61]+'ng/mL，PG I/II:'+dat[62]+"，";
			transGI["P"]+="胃鏡檢查";
		}
		if (dat[54].includes('腸胃科')){
			transGI["S"]+="胸部X光檢查報告"+dat[53]+"，";
			transGI["P"]+="進一步檢查及治療";
		}
		if (transGI["S"]!=""){
			transGI["S"]+="煩請醫師診治";
			transGI["S"]="個案於"+dat[6]+"參加彰化縣衛生局整合式篩檢，發現"+transGI["S"];
			reportcontent+=generatetransfer(transGI);
			if (transGI["S"].includes('胃幽門桿菌')){
				reportcontent+=generatetransferHP();
			}
		}
		if (dat[54].includes('心臟科')){
			transCV["S"]+="胸部X光檢查報告"+dat[53]+"，";
			transCV["P"]+="進一步檢查及治療";
		}
		if (transCV["S"]!=""){
			transCV["S"]+="煩請醫師診治";
			transCV["S"]="個案於"+dat[6]+"參加彰化縣衛生局整合式篩檢，發現"+transCV["S"];
			reportcontent+=generatetransfer(transCV);
		}
		if (dat[54].includes('胸腔內科')){
			transCM["S"]+="胸部X光檢查報告"+dat[53]+"，";
			transCM["P"]+="進一步檢查及治療";
		}
		if (transCM["S"]!=""){
			transCM["S"]+="煩請醫師診治";
			transCM["S"]="個案於"+dat[6]+"參加彰化縣衛生局整合式篩檢，發現"+transCM["S"];
			reportcontent+=generatetransfer(transCM);
		}
		if (dat[54].includes('骨科')){
			transORT["S"]+="胸部X光檢查報告"+dat[53]+"，";
			transORT["P"]+="進一步檢查及治療";
		}
		if (transORT["S"]!=""){
			transORT["S"]+="煩請醫師診治";
			transORT["S"]="個案於"+dat[6]+"參加彰化縣衛生局整合式篩檢，發現"+transORT["S"];
			reportcontent+=generatetransfer(transORT);
		}
		if (['第4期','第5期'].includes(dat[51])){
			transNEP["S"]+="腎功能異常，Creatinine:"+dat[46]+"mg/dL,eGFR:"+dat[47]+"ml/min/1.73m^2，UPCR:"+dat[50]+'mg/g，';
			transNEP["P"]+="進一步檢查及治療";
		}
		if (transNEP["S"]!=""){
			transNEP["S"]+="煩請醫師診治";
			transNEP["S"]="個案於"+dat[6]+"參加彰化縣衛生局整合式篩檢，發現"+transNEP["S"];
			reportcontent+=generatetransfer(transNEP);
		}
		if (dat[58]*1>3){
			papcode=dat[58];
			transGYN["S"]+=dat[57]+"醫師執行子宮頸抹片，結果為"+papcodelist[papcode]+"，";
			transGYN["P"]+="進一步檢查及治療";
		}
		if (transGYN["S"]!=""){
			transGYN["S"]+="煩請醫師診治";
			transGYN["S"]="個案於"+dat[6]+"參加彰化縣衛生局整合式篩檢，發現"+transGYN["S"];
			reportcontent+=generatetransfer(transGYN);
		}
		
	}
	reportcontent+="</body></html>";
	printwindow.document.open();
    printwindow.document.write(reportcontent);
    printwindow.document.close();

}
function generatetransfer(obj){
	ret='<br><div class="transfer_title">全民健康保險和美鎮衛生所轉診單(轉診至________________)</div>';
	ret+='<div><table class="transfer_table1"><tr><td>保險醫事服務機構代號：2337030012</td><td>整篩編號：'+dat[0]+'</td><tr></table>';
	ret+='<table class="transfer_table2"><tr><td rowspan="10" style="width: 3%">原<br>診<br>治<br>醫<br>院<br>診<br>所</td><td rowspan="4" style="width: 5%">保險<br>對象<br>基本<br>資料</td><td colspan="2" style="width: 25%">姓名</td><td colspan="2" style="width: 17%">性別</td><td colspan="2" style="width: 25%">生日</td><td colspan="2" style="width: 25%">身分證號</td></tr>';
	ret+='<tr><td colspan="2">'+dat[2]+'</td><td colspan="2">'+dat[5]+'</td><td colspan="2">'+dat[3]+'</td><td colspan="2">'+dat[1]+'</td></tr>';
	ret+='<tr><td colspan="3">聯絡人</td><td colspan="3">連絡電話</td><td colspan="2">聯絡地址</td></tr>';
	if (dat[9]!=""){
		t0=dat[9];
	} else {
		t0=dat[8];
	}
	ret+='<tr><td colspan="3">'+dat[2]+'</td><td colspan="3">'+t0+'</td><td colspan="2" style="text-align: left;">'+dat[10]+'</td></tr>';
	ret+='<tr><td><br>病<br>歷<br>摘<br>要<br><br></td><td colspan="8" style="text-align: left; vertical-align: top;">'+obj["S"]+'</td></tr>';
	
	if (obj["P"].includes("胃鏡檢查")){
		t1="■"
	} else {
		t1="□"
	}
	if (obj["P"].includes("大腸鏡檢查")){
		t2="■"
	} else {
		t2="□"
	}
	if (obj["P"].includes("腹部超音波檢查")){
		t3="■"
	} else {
		t3="□"
	}
	if (obj["P"].includes("除菌治療")){
		t4="■"
	} else {
		t4="□"
	}
	ret+='<tr><td>轉診<br>目的</td><td colspan="8" style="text-align: left;">■進一步檢查及治療<br>　　'+t1+'胃鏡檢查　'+t2+'大腸鏡檢查　'+t3+'腹部超音波檢查　'+t4+'除菌治療</td></tr>';
	ret+='<tr><td>院所<br>住址</td><td colspan="5" style="text-align: left;">彰化縣和美鎮和東里彰美路五段319號</td><td>傳真號碼:<br>電子信箱:</td><td colspan="2"></td></tr>';
	ret+='<tr><td>診治<br>醫師</td><td>姓名</td><td>朱振銓</td><td>科別</td><td>家醫科</td><td>電話</td><td>04-7062455</td><td>醫師簽章</td><td></td></tr>';
	ret+='<tr><td colspan="2">轉診<br>日期</td><td colspan="3"> '+explaintime.split('-')[0]+' 年 '+explaintime.split('-')[1]+' 月 '+explaintime.split('-')[2]+' 日</td><td>有效<br>期限</td><td colspan="3">'+expiretime.split('-')[0]+' 年 '+expiretime.split('-')[1]+' 月 '+expiretime.split('-')[2]+' 日</td></tr>';	
	ret+='<tr><td>建議轉診<br>院所科別</td><td colspan="5"  style="text-align: left;">'+obj["T"]+'<br></td><td>轉診院所地址及專線電話</td><td colspan="2"></td></tr>';
	ret+='<tr><td rowspan="4"><br>接<br>受<br>轉<br>診<br>醫<br>院<br>診<br>所<br><br></td><td>處<br>理<br>情<br>形</td><td colspan="8" style="text-align: left;">1.　已安排本院　　　　　　科門診治療中<br>2.　已予適當處理並轉回原院所，建議事項如下<br><br><br><br><br><br></td></tr><tr><td>治<br>療<br>摘<br>要</td>				<td colspan="8" style="text-align: left;">1.　主診斷ICD-10-CM/PCS：　　　　　　　　　　病名：<br><br><br>2.　治療藥物或手術名稱<br><br><br><br><br><br><br><br>3. 　輔助診斷之檢查結果<br><br><br><br><br><br><br><br></td></tr><tr><td>院所<br>名稱</td><td colspan="3" style="text-align: left;"></td><td colspan="2">電話或傳真：<br>電子信箱：</td><td colspan="3" style="text-align: left;"></td></tr><tr><td>診治<br>醫師</td><td>姓名</td><td></td><td>科別</td><td></td><td>醫師<br>簽章</td><td></td><td>回覆<br>日期</td><td></td></tr></table></div>';
	ret+='<div class="page-break2"></div><div class="page-break"></div>';
	return ret
}
function generatetransferHP(){
	ret='<div class="transHP_title">彰化縣　健康篩檢服務　糞便幽門桿菌檢查　轉診紀錄單</div><div><table class="transHP_table">';
	ret+='<tr><td style="width:5%">一、</td><td style="width:30%">個案基本資料:</td><td style="width:30%"></td><td style="width:35%"></td></tr>';
	ret+='<tr><td></td><td>姓名:'+dat[2]+'('+dat[5]+')</td><td>生日:'+dat[3]+'</td><td>整篩編號:'+dat[0]+'</td></tr>';
	ret+='<tr><td></td><td>身份證字號:'+dat[1]+'</td><td>電話:'+dat[8]+'</td><td>手機:'+dat[9]+'</td></tr>';
	ret+='<tr><td></td><td colspan="3">地址:'+dat[10]+'</td></tr>';
	ret+='<tr><td>二、</td><td>病歷摘要</td><td></td><td></td></tr>';
	ret+='<tr><td></td><td colspan="3">糞便幽門桿菌檢查日期： '+dat[6].substring(0,3)+' 年 '+dat[6].substring(3,5)+' 月 '+dat[6].substring(5,7)+' 日</td></tr>';
	ret+='<tr><td></td><td colspan="3">糞便幽門桿菌檢查結果：■陽性, 於治療後願意接受第2次篩檢　□是　□否</td></tr>';
	ret+='<tr style="border-bottom: 2px solid"><td></td><td colspan="3">照會重點：請依臨床專業給予　■衛教諮詢　■進一步檢查治療　□繼續觀察</td></tr>';
	ret+='<tr><td colspan="2">轉診衛生所： 和美鎮衛生所</td><td>電話：04-7062455</td><td>傳真：</td></tr>';
	ret+='<tr><td colspan="4">地址：彰化縣和美鎮彰美路五段319號</td></tr><tr><td colspan="4">保險醫事服務機構代號：2337030012</td></tr><tr><td colspan="4">建議轉診科別：<span style="font-weight: 700;">肝膽腸胃科</span></td></tr>';
	ret+='<tr style="border-bottom: 2px solid"><td colspan="2">聯絡人：<br><br></td><td>醫師簽章：<br><br></td><td>轉診日期：<br><br></td></tr><tr><td colspan="3">三、轉診後處理(由確診及治療醫院填寫)</td><td style="border-left: 2px solid"></td></tr><tr><td style="text-align: right; ">1.<br><br></td><td colspan="2">請依專業以及健保規範判斷，協助諮詢說明胃幽門桿菌感染的臨床意義與對健康的可能影響</td><td style="border-left: 2px solid"></td></tr><tr><td style="text-align: right; ">2.</td><td colspan="2">處方</td><td style="border-left: 2px solid">就診院所：____________________</td></tr><tr><td></td><td colspan="2">（1）依病情或健保規範需進一步檢查做胃鏡檢查</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　結果：□是</td><td style="border-left: 2px solid">就診科別：____________________</td></tr><tr><td></td><td colspan="2">　　　　□否；請說明：____________________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□病人拒絕</td><td style="border-left: 2px solid">醫師姓名：____________________</td></tr><tr><td></td><td colspan="2">（2）上消化道內視鏡</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　結果：□正常</td><td style="border-left: 2px solid">病 歷 號：____________________</td></tr><tr><td></td><td colspan="2">　　　　□胃炎；位置範圍：____________________________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□胃潰瘍；位置範圍：__________________________</td><td style="border-left: 2px solid">診察日期：_____年_____月______日</td></tr><tr><td></td><td colspan="2">　　　　□十二指腸潰瘍；位置範圍：____________________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□胃食道逆流；程度：__________________________</td><td style="border-left: 2px solid">回覆日期：_____年_____月______日</td></tr><tr><td></td><td colspan="2">　　　　□胃腫瘤；位置範圍：__________________________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□切片</td><td style="border-left: 2px solid;font-weight: 700;">四、醫師建議</td></tr><tr><td></td><td colspan="2">　　　　　切片結果：__________________________________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□其他：______________________________________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">（3）上消化道攝影</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　結果：□正常</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□異常；請說明：______________________________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">（4）口服藥</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　結果：□無　□病人拒服　□其他用藥，藥名____________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□公費除菌藥(一線)</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　　　□PPI</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　　　□Amoxicillin 1000mgBID</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　　　□Metronidazole 250mgBID</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　　　□Clarithromycin 500mgBID</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□公費除菌藥(二線)</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　　　□PPI□Amoxicillin□Levofloxacin</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　　　□PPI□Bismuth□Tetracycline□Metronidazole</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□健保</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□自費，藥名__________________________________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　服用週期□5天　□10天　□其他_________________</td><td style="border-left: 2px solid"></td></tr></table><div class="transHP_end"><span>備註：轉診單填妥後請於個案確診日隔天 中午前回傳至衛生所。<br>　　　轉診紀錄單正本及胃鏡紙本報告單，請於個案確診後1周內寄回衛生所，感謝您。</span></div></div>';
	ret+='<div class="page-break2"></div><div class="page-break"></div>';
	return ret
}



function addcomment(value,upper,lower,checkNAN){
	retvalue=value;
	if (upper!=0){
		if (value*1>upper){
			retvalue=value+"↑";
		}
	}
	if (lower!=0){
		if (value*1<lower){
			retvalue=value+"↓";
		}
	}
	if (checkNAN){
		if (isNaN(value*1)){
			retvalue=value+"✱";
		}
	}
	return retvalue
}

