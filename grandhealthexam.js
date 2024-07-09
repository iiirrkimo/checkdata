document.getElementById('importtxt0').addEventListener('click', function(event) {
	document.getElementById('importtxt').click()
});

document.getElementById('exporttxt').addEventListener('click', function(event) {
	exportbasic()
});

document.getElementById('cleanbasicbutton').addEventListener('click', function(event) {
	cleanbasic()
});

document.getElementById('showopdlistbutton').addEventListener('click', function(event) {
	showopdlist()
});

document.getElementById('starttransferbutton').addEventListener('click', function(event) {
	starttransfer()
});

document.getElementById('excelall0').addEventListener('click', function(event) {
	document.getElementById('excelall').click()
});

document.getElementById('exportToExcelbutton').addEventListener('click', function(event) {
	exportToExcel()
});

document.getElementById('exportToPDFbutton').addEventListener('click', async function(event) {
	await exportToPDF()
});


totallist={};
excelall = document.getElementById('excelall');
excelall.addEventListener('change', function(event) {
	const file = event.target.files[0];
	if (file) {
		starttransferall();
		excelall.value="";
	} else {
		alert("無選擇文件");
	}
});

const importtxt = document.getElementById('importtxt');
importtxt.addEventListener('change', function(event) {
	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = function(e) {
			const content = e.target.result;
			jcontent=JSON.parse(content);
			document.getElementById('clinicname').value=jcontent["clinicname"];
			document.getElementById('cliniccode').value=jcontent["cliniccode"];
			document.getElementById('clinicphone').value=jcontent["clinicphone"];
			document.getElementById('clinicaddress').value=jcontent["clinicaddress"];
			document.getElementById('doctorname').value=jcontent["doctorname"];
			document.getElementById('doctorsp').value=jcontent["doctorsp"];
			document.getElementById('explaindate').value=jcontent["explaindate"];
			document.getElementById('expiredate').value=jcontent["expiredate"];
			document.getElementById('amtime').value=jcontent["amtime"];
			document.getElementById('pmtime').value=jcontent["pmtime"];
			document.getElementById('opdam1').value=jcontent["opdam1"];
			document.getElementById('opdpm1').value=jcontent["opdpm1"];
			document.getElementById('opdam2').value=jcontent["opdam2"];
			document.getElementById('opdpm2').value=jcontent["opdpm2"];
			document.getElementById('opdam3').value=jcontent["opdam3"];
			document.getElementById('opdpm3').value=jcontent["opdpm3"];
			document.getElementById('opdam4').value=jcontent["opdam4"];
			document.getElementById('opdpm4').value=jcontent["opdpm4"];
			document.getElementById('opdam5').value=jcontent["opdam5"];
			document.getElementById('opdpm5').value=jcontent["opdpm5"];
		};
		reader.readAsText(file);
		importtxt.value="";
	} else {
		alert("無選擇文件");
	}
});
startnum=document.getElementById('startnum');
endnum=document.getElementById('endnum');
startnum.addEventListener('change', function(event) {
	sv=startnum.value;
	if (isNaN(sv*1) || sv*1<1){
		startnum.value="001";
		alert('請輸入數值');
	} else {
		endnum.value=sv;
	}
});


endnum.addEventListener('change', function(event) {
	sv=startnum.value;
	ev=endnum.value;
	if (ev*1<sv*1){
		endnum.value=startnum.value;
		alert('結束編號不可小於起始編號')
	}
});
et1=document.getElementById('explaindate');
et2=document.getElementById('expiredate');
et1.value=new Date().toISOString().split('T')[0];
et1.addEventListener('change', function(event) {
	let nextdate = new Date(et1.value);
	nextdate.setDate(nextdate.getDate() + 90);
	et2.value=nextdate.toISOString().split('T')[0]; 
});
et1.dispatchEvent(new Event('change', {bubbles: true}));
cc="ex:門診\n抽血";
cc2="ex:門診\n小兒疫苗";
cc3="ex:休診";
cc4="ex:門診";
cc5="ex:門診\n卡介苗\n僅第一周";
document.getElementById('opdam1').placeholder=cc;
document.getElementById('opdpm1').placeholder=cc4;
document.getElementById('opdam2').placeholder=cc2;
document.getElementById('opdpm2').placeholder=cc5;
document.getElementById('opdam3').placeholder=cc;
document.getElementById('opdpm3').placeholder=cc3;
document.getElementById('opdam4').placeholder=cc4;
document.getElementById('opdpm4').placeholder=cc4;
document.getElementById('opdam5').placeholder=cc;
document.getElementById('opdpm5').placeholder=cc4;
document.getElementById('checkall').addEventListener('click', function(event) {
	document.getElementById('checkchecklist').checked=document.getElementById('checkall').checked;
	document.getElementById('checkreport').checked=document.getElementById('checkall').checked;
	document.getElementById('checksmoke').checked=document.getElementById('checkall').checked;
	document.getElementById('checktransfer').checked=document.getElementById('checkall').checked;
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
		result= await readexcel10();
		if (!result) {
			errmsg=errmsg+'HBV DNA檔案錯誤\n'
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
					
					thenum=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 2, r: R})]);
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					totallist[thenum]["0"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 2, r: R})]);
					totallist[thenum]["1"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 0, r: R})]);
					totallist[thenum]["2"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 1, r: R})]);
					by=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 7, r: R})]);
					bm=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 8, r: R})]);
					bd=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 9, r: R})]);
					totallist[thenum]["3"]=by+"/"+bm+"/"+bd;
					totallist[thenum]["4"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 14, r: R})]);
					totallist[thenum]["5"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 10, r: R})]);
					totallist[thenum]["6"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 3, r: R})]);
					totallist[thenum]["7"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 16, r: R})]);
					totallist[thenum]["8"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 4, r: R})]);
					totallist[thenum]["9"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 6, r: R})]);
					town=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 11, r: R})]);
					village=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 12, r: R})]);
					address=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 13, r: R})]);
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
					thenum=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 4, r: R})]);
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					totallist[thenum]["11"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 9, r: R})]);
					totallist[thenum]["12"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 10, r: R})]);
					totallist[thenum]["13"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 13, r: R})]);
					totallist[thenum]["14"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 14, r: R})]);
					totallist[thenum]["15"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 15, r: R})]);
					totallist[thenum]["16"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 16, r: R})]);
					totallist[thenum]["17"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 17, r: R})]);
					totallist[thenum]["18"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 18, r: R})]);
					totallist[thenum]["19"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 19, r: R})]);
					totallist[thenum]["20"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 20, r: R})]);
					totallist[thenum]["21"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 21, r: R})]);
					totallist[thenum]["22"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 22, r: R})]);
					totallist[thenum]["23"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 23, r: R})]);
					totallist[thenum]["24"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 24, r: R})]);
					totallist[thenum]["25"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 25, r: R})]);
					totallist[thenum]["26"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 26, r: R})]);
					totallist[thenum]["27"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 27, r: R})]);
					totallist[thenum]["28"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 28, r: R})]);
					totallist[thenum]["29"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 29, r: R})]);
					totallist[thenum]["30"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 30, r: R})]);
					totallist[thenum]["31"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 37, r: R})]);
					totallist[thenum]["32"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 38, r: R})]);
					totallist[thenum]["33"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 51, r: R})]);
					totallist[thenum]["34"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 50, r: R})]);
					totallist[thenum]["35"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 52, r: R})]);
					totallist[thenum]["36"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 53, r: R})]);
					totallist[thenum]["37"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 54, r: R})]);
					totallist[thenum]["38"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 55, r: R})]);
					totallist[thenum]["39"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 44, r: R})]);
					totallist[thenum]["40"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 45, r: R})]);
					totallist[thenum]["41"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 62, r: R})]);
					totallist[thenum]["42"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 58, r: R})]);
					totallist[thenum]["43"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 59, r: R})]);
					totallist[thenum]["44"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 60, r: R})]);
					totallist[thenum]["45"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 61, r: R})]);
					totallist[thenum]["46"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 40, r: R})]);
					totallist[thenum]["47"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 42, r: R})]);
					totallist[thenum]["48"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 82, r: R})]);
					totallist[thenum]["49"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 83, r: R})]);
					totallist[thenum]["50"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 84, r: R})]);
					totallist[thenum]["51"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 43, r: R})]);
					totallist[thenum]["52"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 41, r: R})]);
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
					thenum=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 4, r: R})]);
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					totallist[thenum]["53"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 12, r: R})]);
					totallist[thenum]["54"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 14, r: R})]);
					totallist[thenum]["55"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 15, r: R})]);
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
					thenum=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 2, r: R})]);
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					totallist[thenum]["56"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 8, r: R})]);
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
					thenum=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 2, r: R})]);
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					totallist[thenum]["57"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 16, r: R})]);
					totallist[thenum]["58"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 15, r: R})]);

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
					thenum=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 0, r: R})]);
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					totallist[thenum]["59"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 9, r: R})]);
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
					thenum=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 3, r: R})]);
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					totallist[thenum]["60"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 13, r: R})]);
					totallist[thenum]["61"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 7, r: R})]);
					totallist[thenum]["62"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 9, r: R})]);
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
					oralid=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 4, r: R})]);
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
					thenum=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 0, r: R})]);
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					totallist[thenum]["64"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 9, r: R})]);
					totallist[thenum]["65"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 10, r: R})]);
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
function readexcel10(){
	return new Promise((resolve, reject) => {
		excel10 = document.getElementById('excel10');
		if (!excel10.files.length) {
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
					thenum=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 2, r: R})]);
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					totallist[thenum]["66"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 9, r: R})]);
					totallist[thenum]["67"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 12, r: R})]);
					totallist[thenum]["68"]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 14, r: R})]);
				}
				resolve(true);
			};
			reader.onerror = function() {
                reject(new Error('讀取錯誤'));
            };
			 reader.readAsArrayBuffer(excel10.files[0]);
		}
	 });
}

function showptable(){
	numlist=Object.keys(totallist);
	tablebody=document.getElementById('reporttable').children[1];
	ggg=0;
	for (tbr=0;tbr<numlist.length;tbr++){
		if (numlist[tbr].length==13){
			ggg+=1;
			row = tablebody.insertRow();
			row.onclick = function() {
				var selected = document.querySelector(".highlight");
				if (selected) selected.classList.remove("highlight");
				this.classList.add("highlight");
			};
			for (tbc=0;tbc<=68;tbc++){
				cell = row.insertCell();
				if (totallist[numlist[tbr]][tbc]==null){
					cell.textContent="";
				} else {
					cell.textContent=totallist[numlist[tbr]][tbc];
				}			
			}
		}
	}
	document.getElementById('endnum').value=ggg;
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
					thenum=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: 0, r: R})]);
					if (!totallist[thenum]) {
                        totallist[thenum] = {};
                    }
					for (C=0;C<=68;C++){
						totallist[thenum][C.toString()]=getxlsvalue(worksheet[XLSX.utils.encode_cell({c: C, r: R})]);
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
		for (j=0;j<=68;j++){
			grabobj[thenum][j.toString()]=tablebody.rows[i].cells[j].textContent;
		}
	}
	return grabobj
}
async function exportToPDF(){
	reportlist=granfromtable();
	reportlistkey=Object.keys(reportlist);
	startnum=document.getElementById('startnum');
	endnum=document.getElementById('endnum');
	sv=startnum.value;
	ev=endnum.value;
	errmsg=checkbasic();
	if (sv*1>reportlistkey.length){
		errmsg+="起始編號過大\n";
	} else if (sv*1>0){
		v0=sv*1-1;
		if (ev*1>reportlistkey.length){
			v1=reportlistkey.length;
		} else {
			v1=ev*1;
		}
	} else {
		errmsg+="起始編號異常\n";
	}
	if (document.getElementById('checkchecklist').checked || document.getElementById('checkreport').checked || document.getElementById('checksmoke').checked || document.getElementById('checktransfer').checked){
	} else {
		errmsg+="請至少選擇一種項目匯出\n";
	}
	if (errmsg==""){
		await convertToPDF(v0,v1,cn,cc,cp,ca,dn,ds,etv1,etv2);
	} else {
		alert(errmsg);
	}
}
async function convertToPDF(v0,v1,s1,s2,s3,s4,s5,s6,s7,s8){
	clinicname=s1;
	cliniccode=s2;
	clinicphone=s3;
	clinicaddress=s4;
	doctorname=s5;
	doctorsp=s6;
	explaintime=s7;
	expiretime=s8;
	//printwindow = window.open('', '_blank');
	reportcontent=addtitle("報告匯出");
	alltransferarray={};
	for (i=v0;i<v1;i++){
		dat=reportlist[reportlistkey[i]];
		//addchecklist
		if (document.getElementById('checkchecklist').checked){
			reportcontent+='<div class="checklist_title">'+clinicname+'整篩報告check list</div>';
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
				t1="";
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
			reportcontent+='<tr><td>慢性腎臟病(CKD)</td><td>'+t0+dat[51]+'，eGFR:<span class="checklist_table_value">'+t1+dat[47]+'</span><br>UPCR:<span class="checklist_table_value">'+temp+'</span></td><td>'+temp2+'</td><td>□已就醫，院所：</td></tr>';
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
			reportcontent+='<tr><td>胸部X光</td><td>'+dat[53].replaceAll("其他：","")+'</td><td>'+t1+'</td><td>□已就醫，院所：</td></tr><tr><td>驗痰</td><td>　'+dat[55]+'　</td><td>X</td><td></td></tr>';
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
		}
		if (document.getElementById('checkreport').checked){
			//addreport
			reportcontent+='<br><span class="checklist_uppertitle">編號:'+dat[0]+"　　姓名:"+dat[2]+'</span><br><br><br><br><br><br><div class="checklist_middletitle">113年萬人健康檢查<br><br>'+clinicname+'<br><br>衛教及轉診說明書<br><br></div>';
			reportcontent+='<div class="checklist_content">問卷編號:<span>'+dat[0]+'</span></div>';
			reportcontent+='<div class="checklist_content">姓　　名:<span>'+dat[2]+'</span></div>';
			reportcontent+='<div class="checklist_content">檢查日期:<span>'+dat[6]+'</span></div><br><div class="checklist_splitline">------------------若有疑問請洽------------------</div><div class="checklist_content">電　　話:<span> '+clinicphone+'</span></div><br><div class="checklist_content">護理人員:</div><br><br><br><br><div class="checklist_splitline">彰化縣衛生局關心您</div>';
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
			t0=addcomment(dat[17],100,60,true);
			reportcontent+='<tr><td class="report_table_subtitle">脈搏</td><td>Pulse rate</td><td>'+t0+'</td><td>60~100次/分</td></tr>';
			if (dat[18] !== ""){
				t0=addcomment(dat[18], 2.0, 0.6, true);
			} else {
				t0="未測量";
			}
			if (dat[19] !== ""){
				t1=addcomment(dat[19], 2.0, 0.6, true);
			} else {
				t1="未測量";
			}
			if (dat[20] !== ""){
				t2=addcomment(dat[20], 2.0, 0.6, true);
			} else {
				t2="未測量";
			}
			if (dat[21] !== ""){
				t3=addcomment(dat[21], 2.0, 0.6, true);
			} else {
				t3="未測量";
			}
			
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
				t0=dat[42]+"*";
			} else {
				t0=dat[42];
			}
			if (!isNaN(dat[43]*1)){
				t1=dat[43];
			} else {
				t1=""
			}
			reportcontent+='<tr><td class="report_table_subtitle">B肝表面抗原(定性)</td><td>HBsAg</td><td>'+t0+'</td><td>陰性</td></tr>';
			if (t1!=""){
				t1=addcomment(t1,1,0,true);
			}
			reportcontent+='<tr><td class="report_table_subtitle">B肝表面抗原(定量)</td><td>HBsAg</td><td>'+t1+'</td><td><1 S/CO</td></tr>';
			if (dat[66]!="" && dat[66]!="未操作"){
				if (dat[66].toLowerCase()!="Target not detected".toLowerCase()){
					t1=dat[66]+"*";
				} else {
					t1='未檢出';
				}
				reportcontent+='<tr><td class="report_table_subtitle">B肝病毒量</td><td>HBV viral load</td><td>'+t1+'</td><td>未檢出</td></tr>';
			}
			if (dat[67]!="" && dat[67]!="未操作"){
				if (dat[67]*1>=1){
					t1=dat[67]+"*";
				} else {
					t1=dat[67];
				}
				reportcontent+='<tr><td class="report_table_subtitle">B肝e抗原</td><td>HBeAg</td><td>'+t1+'</td><td><1 S/CO</td></tr>';
			}
			if (dat[68]!="" && dat[68]!="未操作"){
				if (dat[68]*1>=1){
					t1=dat[68]+"*";
				} else {
					t1=dat[68];
				}
				reportcontent+='<tr><td class="report_table_subtitle">D型肝炎抗體</td><td>Anti-HDV</td><td>'+t1+'</td><td><1 S/CO</td></tr>';
			}
			
			if (dat[44].includes('陽性')){
				t0=dat[44]+"*";
			} else {
				t0=dat[44];
			}
			if (!isNaN(dat[45]*1)){
				t1=dat[45];
			} else {
				t1=""
			}
			if (t1!=""){
				t1=addcomment(t1,1,0,true);
			}
			reportcontent+='<tr><td class="report_table_subtitle">C肝抗體(定性)</td><td>Anti-HCV</td><td>'+t0+'</td><td>陰性</td></tr>';
			reportcontent+='<tr><td class="report_table_subtitle">C肝抗體(定量)</td><td>Anti-HCV</td><td>'+t1+'</td><td><1.5 S/CO</td></tr>';
			t0=addcomment(dat[41],9,0,true);
			reportcontent+='<tr><td class="report_table_subtitle">甲型胎兒蛋白(肝癌)</td><td>α-fetoprotein</td><td>'+t0+'</td><td><9.00 ng/mL</td></tr>';
			reportcontent+='<tr><td colspan="4" class="report_table_title">腎功能、蛋白尿檢查</td></tr>';
			t0=addcomment(dat[46],1.3,0.4,true);
			reportcontent+='<tr><td class="report_table_subtitle">肌酸酐</td><td>Creatinine</td><td>'+t0+'</td><td>0.4~1.3 mg</td></tr>';
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
				t0=dat[51]+"*";
			} else {
				t0=dat[51];
			}
			reportcontent+='<tr><td class="report_table_subtitle">慢性腎臟病期數</td><td>CKD stage</td><td>'+t0+'</td><td>正常</td></tr>';
			t0=addcomment(dat[52],7,0,true);
			reportcontent+='<tr><td class="report_table_subtitle">尿酸</td><td>Uric acid</td><td>'+t0+'</td><td><7mg/dL</td></tr>';
			reportcontent+='<tr><td colspan="4" class="report_table_title">肺結核篩檢</td></tr>';
			reportcontent+='<tr><td class="report_table_subtitle">胸部X光檢查</td><td>Chest X-ray</td><td>'+dat[53].replaceAll("其他：","")+'</td><td>無活動性肺結核病灶</td></tr>';
			
			if (dat[5]=='男'){
				t0="男性不須抹片";
				t1="";
			} else {
				if (dat[57]==""){
					t0="未做";
					t1="*";
				} else {
					papcode=dat[58];
					t0="【"+dat[57]+"】"+papcodelist[papcode];
					if (["1","2","3"].includes(papcode)){
						t1="";
					} else {
						t1="*";
					}
				}
			}
			reportcontent+='<tr><td class="report_table_title" style="text-align: left;">子宮頸抹片</td><td>Pap smear</td><td>'+t0+'</td><td>正常或編號≤3</td></tr>';
			if (dat[56]==""){
				t0="未做";
			} else if (dat[56]=="陽性"){
				t0=dat[56]+"*";
			} else {
				t0=dat[56]
			}
			reportcontent+='<tr><td class="report_table_title" style="text-align: left;">糞便潛血</td><td>FOBT</td><td>'+t0+'</td><td>陰性</td></tr>';
			if (dat[59]==""){
				t0="未做";
			} else if (dat[59]=="陽性"){
				t0=dat[59]+"*";
			} else {
				t0=dat[59]
			}
			reportcontent+='<tr><td class="report_table_title" style="text-align: left;">幽門桿菌抗原</td><td>Helicobacter pylori antigen</td><td>'+t0+'</td><td>陰性</td></tr>';
			reportcontent+='<tr><td colspan="4" class="report_table_title">胃蛋白酶原檢驗</td></tr>';
			if (dat[60]==""){
				t0="未做";
			} else if (dat[60]=="陽性"){
				t0=dat[60]+"*";
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
			//addexplain
			reportcontent+='<div class="suggestion_title">彰化縣'+clinicname+'整合式篩檢衛教單(1/2)</div>';
			reportcontent+='<div><table class="suggestion_table1"><tr><td>整篩編號：'+dat[0]+'</td><td>姓名：'+dat[2]+'</td></tr></table></div>';
			reportcontent+='<div><table class="suggestion_table2"><tr><th></th><th>項目</th><th>說明</th></tr>';
			
			if ((dat[5]=="男" && dat[16]*1>=90) || (dat[5]=="女" && dat[16]*1>=80) || dat[15]*1>=24){
				t0="■";
			} else {
				t0="□";
			}
			reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">體重腰圍</td><td>1. 生活型態調整：減少高糖、高油脂、高熱量食物攝取，避免食用正餐時間外的零食，增加運動量，培養運動習慣。<br>2. 每周監測體重及腰圍：透過定時監測體重了解控制成果及增加警覺，可更增加減重效益。</td></tr>';
			if (dat[11]*1>130 || dat[12]*1>80){
				t0="■";
			} else {
				t0="□";
			}
			reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">血壓偏高</td><td>1. 生活型態調整：SABCDE策略，少鹽(S)、限酒(A)、減重(B)、戒菸(C)、飲食調整(D)和運動(E)。<br>2. 722量血壓：「7」連續七天量測、「2」起床、睡前各量一次、「2」每次量兩遍，若超過130/80mmHg則建議就醫。</td></tr>';
			
			if (dat[20]=="" && dat[21]==""){
				if (dat[18]=="" && dat[19]==""){
					t0="□";
				} else {
					if (dat[18]*1<0.6 || dat[19]*1<0.6 || isNaN(dat[18]*1) || isNaN(dat[19]*1)){
						t0="■";
					} else {
						t0="□";
					}
				}
			} else {
				if (dat[20]*1<0.6 || dat[21]*1<0.6){
					t0="■";
				} else {
					t0="□";
				}
			}
			reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">視力檢查</td><td>1. 眼睛看不清楚不是只有老花，許多疾病都可能導致視力模糊，結膜炎、角膜炎、白內障、青光眼、視神經炎、視網膜剝離及糖尿病網膜病變等等都可導致視力下降。<br>2. 若出現流淚、視力模糊、眼前出現雙影、黑影或飛蚊現象，怕光、有異物感、眼睛腫脹疼痛、視野缺損等等症狀請至眼科就醫。<br>3. 平時視力保健﹕閱讀時保持30公分以上距離、閱讀1小時休息10分鐘、望遠凝視、避免過度使用3C產品等，並定期視力檢查。</td></tr>';
			if (dat[25]*1<12){
				t0="■";
			} else {
				t0="□";
			}
			reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">貧血</td><td>1. 貧血原因十分多樣，需針對個別原因進行處理，一般缺鐵性貧血及地中海型貧血較常見，若有疑問可至血液腫瘤科諮詢。</td></tr>';

			
			if (dat[31]*1>100 || dat[32]*1>5.6){
				t0="■";
			} else {
				t0="□";
			}
			reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">血糖偏高</td><td>1. 生活型態調整：多運動，均衡飲食，定時定量，多選用富含纖維質的食物，少吃富含精緻糖類的食品(糖果、煉乳、中西式甜點心)。<br>2. 生活型態調整後3~6個月請再次抽血追蹤(需空腹)。</td></tr>';
			
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
			if (dat[52]*1>7){
				t0="■";
			} else {
				t0="□";
			}
			reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">尿酸過高</td><td>1. 生活型態調整：多攝取水份，避免吃高普林食物(如內臟類、帶殼海鮮、濃湯等)、高果糖食物(大量水果或含糖飲料)及避免喝酒；有發作頻繁痛風者可與醫師討論治療。<br>2. 生活型態調整後3~6個月請再次抽血驗尿追蹤(需空腹)。</td></tr>';
			
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
			reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">B型肝炎</td><td rowspan="2">1. 阻斷傳染途徑：避免共用針頭、牙刷、刮鬍刀等<br>2. B肝帶原者: 每半年肝膽腸胃科腹部超音波及抽血檢查。<br>3. C肝抗體陽性: 表示曾經C肝感染過，需加驗C肝病毒量，若有檢出，請接受C肝抗病毒藥物，治癒成功率達97%。</td></tr>';
			
			
			if (dat[44].includes('陽性')){
				t0="■";
			} else {
				t0="□";
			}
			reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">C型肝炎</td></tr>';
			
			
			
			reportcontent+='</table></div>';
			reportcontent+='<div class="page-break2"></div><div class="page-break"></div>';
			
			reportcontent+='<div class="suggestion_title">彰化縣'+clinicname+'整合式篩檢衛教單(2/2)</div>';
			reportcontent+='<div><table class="suggestion_table1"><tr><td>整篩編號：'+dat[0]+'</td><td>姓名：'+dat[2]+'</td></tr></table></div>';
			reportcontent+='<div><table class="suggestion_table2"><tr><th></th><th>項目</th><th>說明</th></tr>';
			if (dat[41]*1>=9){
				t0="■";
			} else {
				t0="□";
			}
			reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">甲型胎兒蛋白<br>偏高</td><td>甲型胎兒蛋白(α-Fetoprotein)是一種α-1球蛋白，由胎兒的卵黃囊、腸胃道及肝臟分泌，成人則多由肝臟分泌，許多肝病皆可能伴隨甲型胎兒蛋白升高，80-90%的肝細胞癌病人血清中甲型胎兒蛋白有升高現象，檢查結果偏高建議至肝膽腸胃科接受腹部超音波檢查。</td></tr>';
			
			
			reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">幽門桿菌抗原</td><td>若為陽性，表示疑似胃幽門螺旋桿菌感染，可能導致胃腸道出血、穿孔等併發症，嚴重者可能導致胃癌。建議胃鏡檢查，並接受除菌治療。</td></tr>';
			if (dat[60]=="陽性"){
				t0="■";
			} else {
				t0="□";
			}
			reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">胃蛋白酶</td><td>若為陽性，表示您可能有萎縮性胃炎，胃酸分泌下降，建議接受胃鏡檢查，日常生活應減少鹹及醃製的食物、避免過度飲酒、戒菸，多吃新鮮蔬果。</td></tr>';
			
			
			if (dat[53]=="未作"){
				t0="□";
				t1="無建議";
			} else {
				if (dat[54]==""){
					t0="■";
					t1="檢查結果為"+dat[53]+"。";
				} else {
					t0="■";
					t1="檢查結果為"+dat[53].replaceAll("其他：","")+"，建議至"+dat[54]+"門診追蹤諮詢。";
				}
			} 
			reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">胸部X光</td><td>'+t1+'</td></tr>';
			if (dat[56]=="陽性"){
				t0="■";
			} else {
				t0="□";
			}
			reportcontent+='<tr><td style="text-align: center;">'+t0+'</td><td style="text-align: center;">糞便潛血</td><td>若為陽性，屬癌前病變及大腸直腸癌高危險群，建議儘快進行大腸鏡檢查。</td></tr>';
			if (dat[5]=="女"){
				if (dat[57]==""){
					t0="□";
					t1="30歲以上婦女建議每年執行子宮頸抹片檢查。";
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
			reportcontent+='</table></div>';
			
			reportcontent+='<br>'
			
			reportcontent+='<div class="suggestion_title" style="text-align: left;">若有其他疑問歡迎諮詢，'+clinicname+'服務時間如下</div>';
			reportcontent+=addopdtable();
			reportcontent+='<div class="suggestion_title" style="text-align: left;">電話:'+clinicphone+'；地址:'+clinicaddress+'</div>';
			
			reportcontent+='<div class="page-break2"></div><div class="page-break"></div>';
			
			if (dat[66]!=''){
				reportcontent+=generateHBVconsult();
			}
		
		}
		
		if (document.getElementById("checksmoke").checked){
			//addquitsmoke
			if (dat[22]=='有'){
				reportcontent+=generatequitsmoke();
			}
		}
		
		if (document.getElementById("checktransfer").checked){
			//addtransfer
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
				if (dat[66]!="" && dat[66]!="未操作" ){
					if (dat[66].toLowerCase()!="Target not detected".toLowerCase()){
						transGI["S"]+="HBV viral load: "+dat[66]+" IU/mL，";
						transGI["P"]+="腹部超音波檢查進一步檢查及治療";
					} else {
						transGI["S"]+="HBV viral load: "+dat[66]+" ，";
						transGI["P"]+="腹部超音波檢查進一步檢查及治療";
					}
				}
				if (dat[67]!="" && dat[67]!="未操作" ){
					if (dat[67]*1>=1){
						transGI["S"]+="HBeAg: "+dat[67]+" S/CO(Reactive)，";
						transGI["P"]+="腹部超音波檢查進一步檢查及治療";
					} else {
						transGI["S"]+="HBeAg: "+dat[67]+" S/CO(Non-Reactive)，";
						transGI["P"]+="腹部超音波檢查進一步檢查及治療";
					}
				}
				if (dat[68]!="" && dat[68]!="未操作" ){
					if (dat[68]*1>=1){
						transGI["S"]+="Anti-HDV: "+dat[68]+" S/CO(Reactive)，";
						transGI["P"]+="腹部超音波檢查進一步檢查及治療";
					} else {
						transGI["S"]+="Anti-HDV: "+dat[68]+" S/CO(Non-Reactive)，";
						transGI["P"]+="腹部超音波檢查進一步檢查及治療";
					}
				}
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
				transGI["S"]+="胸部X光檢查報告: "+dat[53].replaceAll("其他：","")+"，";
				transGI["P"]+="進一步檢查及治療";
			}
			if (transGI["S"]!=""){
				transGI["S"]+="煩請醫師診治";
				transGI["S"]="個案於"+dat[6]+"參加彰化縣衛生局整合式篩檢，發現"+transGI["S"];
				reportcontent+=await generatetransfer(transGI,"1");
				if (transGI["S"].includes('胃幽門桿菌')){
					reportcontent+=generatetransferHP();
				}
			}
			if (dat[54].includes('心臟科')){
				transCV["S"]+="胸部X光檢查報告: "+dat[53].replaceAll("其他：","")+"，";
				transCV["P"]+="進一步檢查及治療";
			}
			if (transCV["S"]!=""){
				transCV["S"]+="煩請醫師診治";
				transCV["S"]="個案於"+dat[6]+"參加彰化縣衛生局整合式篩檢，發現"+transCV["S"];
				reportcontent+=await generatetransfer(transCV,"4");
			}
			if (dat[54].includes('胸腔內科')){
				transCM["S"]+="胸部X光檢查報告: "+dat[53].replaceAll("其他：","")+"，";
				transCM["P"]+="進一步檢查及治療";
			}
			if (transCM["S"]!=""){
				transCM["S"]+="煩請醫師診治";
				transCM["S"]="個案於"+dat[6]+"參加彰化縣衛生局整合式篩檢，發現"+transCM["S"];
				reportcontent+=await generatetransfer(transCM,"0");
			}
			if (dat[54].includes('骨科')){
				transORT["S"]+="胸部X光檢查報告: "+dat[53].replaceAll("其他：","")+"，";
				transORT["P"]+="進一步檢查及治療";
			}
			if (transORT["S"]!=""){
				transORT["S"]+="煩請醫師診治";
				transORT["S"]="個案於"+dat[6]+"參加彰化縣衛生局整合式篩檢，發現"+transORT["S"];
				reportcontent+=await generatetransfer(transORT,"5");
			}
			if (['第4期','第5期'].includes(dat[51])){
				transNEP["S"]+="腎功能異常，Creatinine:"+dat[46]+"mg/dL,eGFR:"+dat[47]+"ml/min/1.73m^2，UPCR:"+dat[50]+'mg/g，';
				transNEP["P"]+="進一步檢查及治療";
			}
			if (transNEP["S"]!=""){
				transNEP["S"]+="煩請醫師診治";
				transNEP["S"]="個案於"+dat[6]+"參加彰化縣衛生局整合式篩檢，發現"+transNEP["S"];
				reportcontent+=await generatetransfer(transNEP,"2");
			}
			if (dat[58]*1>3){
				papcode=dat[58];
				transGYN["S"]+=dat[57]+"醫師執行子宮頸抹片，結果為"+papcodelist[papcode]+"，";
				transGYN["P"]+="進一步檢查及治療";
			}
			if (transGYN["S"]!=""){
				transGYN["S"]+="煩請醫師診治";
				transGYN["S"]="個案於"+dat[6]+"參加彰化縣衛生局整合式篩檢，發現"+transGYN["S"];
				reportcontent+=await generatetransfer(transGYN,"3");
			}
			
			temptransfer={};
			temptransfer['transGI']=transGI;
			temptransfer['transCV']=transCV;
			temptransfer['transCM']=transCM;
			temptransfer['transNEP']=transNEP;
			temptransfer['transORT']=transORT;
			temptransfer['transGYN']=transGYN;
			alltransferarray[reportlistkey[i]]=temptransfer;
			
		}
	}
	reportcontent+="</body>";
	reportcontent+='<script>document.addEventListener("DOMContentLoaded", function() {var cells = document.querySelectorAll("table td");cells.forEach(function(cell) { if (cell.textContent.includes("*") || cell.textContent.includes("↑")) {cell.classList.add("highlightupper");} else if (cell.textContent.includes("↓")){cell.classList.add("highlightlower");}});});</script>';
	
	reportcontent+"</html>";
	
	downloadelement = document.createElement('a');
	downloadelement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportcontent));
	filename=clinicname+"整篩報告_"+document.getElementById("startnum").value+"_"+document.getElementById("endnum").value+".html"
	downloadelement.setAttribute('download', filename);
	downloadelement.text=filename;
	document.getElementById("downloadarea").appendChild(downloadelement);
	document.getElementById("downloadarea").appendChild(document.createElement('br'))
	


}
function addtitle(titlename){
	retv="<!DOCTYPE html><html><head><title>"+titlename;
	retv+=`</title><style>@media print{html, body{width: 210mm; min-height: 297mm; margin: 0; padding: 0;} .page-break{display: block; page-break-after: always;}.page-break2{display: none;}*{-webkit-print-color-adjust: exact;} } @media screen{body{background: white; width: 210mm; min-height: 297mm; margin: 20px auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);} }.page-break2{height: 10px;background-color: rgba(0, 0, 0, 0.5);}.checklist_title{font-size: 24px;font-family: '標楷體' ;font-weight: 400;text-align: center;} .checklist_table_1{border-collapse: collapse; width: 95%;margin-left: auto;margin-right: auto;} .checklist_table_1 th, .checklist_table_1 td{border: 1px solid transparent;font-family: '標楷體' ;font-size: 20px;}.checklist_table_2{border-collapse: collapse; width: 95%;table-layout: fixed;margin-left: auto;margin-right: auto;} .checklist_table_2 th, .checklist_table_2 td{border: 1px solid;font-family: '標楷體' ;font-size: 20px;}.checklist_table_2 th:nth-child(1){width: 20%;}.checklist_table_2 td:nth-child(1){text-align: center;}.checklist_table_2 th:nth-child(2){width: 30%;}.checklist_table_2 th:nth-child(3){width: 20%;}.checklist_table_2 td:nth-child(3){text-align: center;}.checklist_table_2 th:nth-child(4){width: 30%;}.checklist_table_value{text-decoration: underline;}.checklist_table_3{border-collapse: collapse; width: 95%;table-layout: fixed;margin-left: auto;margin-right: auto;}.checklist_table_3 th, .checklist_table_3 td{border: 1px solid;font-family: '標楷體' ;font-size: 20px;}.checklist_table_3 td:nth-child(1){width: 10%;}.checklist_table_3 tdnth-child(2){width: 30%;}.checklist_table_3 tdnth-child(3){width: 60%;}.checklist_sign{font-size: 20px;font-family: '標楷體' ;text-align: center;}.checklist_uppertitle{font-size: 32px;font-family: '標楷體' ;font-weight: 400;background-color: #d0e7ff;}.checklist_middletitle{font-size: 70px;font-family: '標楷體' ;font-weight: 400;text-align: center;}.checklist_content{font-size: 32px;font-family: '標楷體' ;font-weight: 400;}.checklist_splitline{font-size: 32px;font-family: '標楷體' ;font-weight: 400;text-align: center;}.report_title{font-size: 20px;font-family: '標楷體' ;font-weight: 400;text-align: center;}.report_table{border-collapse: collapse; width: 95%;table-layout: fixed;margin-left: auto;margin-right: auto;} .report_table th, .report_table td{border: 1px transparent;font-family: '標楷體' ;font-size: 20px;}.report_table th:nth-child(1){width: 25%;}.report_table th:nth-child(2){width: 25%;}.report_table th:nth-child(3){width: 25%;}.report_table th:nth-child(4){width: 25%;}.report_table td:nth-child(3){text-align: center;}.report_table_underline{text-decoration: underline;text-align: center;}.report_table_title{font-size: 20px;font-family: '標楷體' ;font-weight: 400;padding: 2px;background-color: #BEBEBE;background-clip: content-box;text-align: center;}.report_table_subtitle{font-size: 20px;font-family: '標楷體' ;font-weight: 600;}.suggestion_title{font-size: 24px;font-family: '標楷體' ;font-weight: 700;text-align: center;}.suggestion_table1{border-collapse: collapse; width: 95%;table-layout: fixed;margin-left: auto;margin-right: auto;} .suggestion_table1 th, .suggestion_table1 td{border: 1px transparent;font-family: '標楷體' ;font-size: 20px;}.suggestion_table1 th:nth-child(1){width: 50%;}.suggestion_table1 th:nth-child(2){width: 50%;}.suggestion_table2{border-collapse: collapse; width: 95%;table-layout: fixed;margin-left: auto;margin-right: auto;} .suggestion_table2 th{border: 1px solid;font-family: '標楷體' ;font-size: 20px;font-weight: 600;text-align: center;}.suggestion_table2 td{border: 1px solid;font-family: '標楷體' ;font-size: 20px;}.suggestion_table2 th:nth-child(1){width: 5%;}.suggestion_table2 th:nth-child(2){width: 20%;}.suggestion_table2 th:nth-child(3){width: 75%;}.transfer_title{font-size: 24px;font-family: '標楷體' ;font-weight: 700;text-align: center;}.transfer_table1{border-collapse: collapse; width: 95%;table-layout: fixed;margin-left: auto;margin-right: auto;} .transfer_table1 th, .transfer_table1 td{border: 1px transparent;font-family: '標楷體' ;font-size: 20px;}.transfer_table1 td:nth-child(1){width: 50%;text-align: left;}.transfer_table1 td:nth-child(2){width: 50%;text-align: right;}.transfer_table2{border-collapse: collapse; width: 95%;table-layout: fixed;margin-left: auto;margin-right: auto;}.transfer_table2 th, .transfer_table2 td{border: 2px solid;font-family: '標楷體' ;font-size: 16px;text-align: center;table-layout: fixed;}.transHP_title{font-size: 24px;font-family: '標楷體' ;font-weight: 700;text-align: center;}.transHP_table{border: 2px solid; border-collapse: collapse; width: 95%;table-layout: fixed;margin-left: auto;margin-right: auto;}.transHP_table th, .transHP_table td{border: 1px transparent;font-family: '標楷體' ;font-size: 16px;}.transHP_end{width: 95%;font-size: 16px;font-family: '標楷體' ;font-weight: 700;text-align: left;margin-left: auto;margin-right: auto;} .quitsmoke_title{width: 95%; font-size: 40px; font-family: '標楷體' ;font-weight: 700;display: flex;align-items: center;justify-content: center;margin-left: auto; margin-right: auto;} .quitsmoke_content{font-size: 32px; font-family: '標楷體' ;} .quitsmoke_table{border-collapse: collapse; font-size: 24px; font-family: '標楷體' ;width: 90%; margin-left: auto; margin-right: auto;} .quitsmoke_table td{border: 2px solid;font-family: '標楷體' ;font-size: 24px; text-align: center;} .highlightupper {color: red; font-weight: 600;} .highlightlower {color: blue; font-weight: 600;} .HBVconsule{font-family: '標楷體' ;} </style></head><body>
	`
	return retv
}
function generatequitsmoke(){
	retv='';
	retv+='<div class="quitsmoke_title"><img style="height:50px;" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAA0JCgsKCA0LCwsPDg0QFCEVFBISFCgdHhghMCoyMS8qLi00O0tANDhHOS0uQllCR05QVFVUMz9dY1xSYktTVFH/2wBDAQ4PDxQRFCcVFSdRNi42UVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVH/wAARCAGkAhwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD06iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoopDQAtIajmnjgiMkrhEHUk1ymqeM0Vmj0+Pf/ANNG6flUyko7m1HD1KztBHVTTxQIXlkVFHdjise68WaVbkhZTKw/uDNcDe311fSF7mZpD6E8D6Cq9YOv2PZo5QrXqM6+fxxJu/cWY2/7bVUfxpqTN8kUCj0IzXN0Vn7Wfc7o5dh19k6WPxrqC/6yCFvpxV228bqTi5tCvuhzXG0UKrJCll2Hl9mx6Xa+JtKucAXIjb0cYrWSRXG5WDKe4rx6r+n6zf6cR5E52f3G5FaRr9zgrZRpemz1WiuX0jxdb3REV4vkSf3s/Kf8K6ZWDAFTkHvW8ZKWx49WjOk+WasOooFFUZBRRRQAUUUUAFFFFABRRRQAUUUUAFFFJQAtFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRmkJxQAZqhquq22mW5lncZ/hQdWNZ+veJINNVoYcSXJHAHRfrXA3l3Pe3BnuZC8h7+n0rKdRR2PSweAlW96eiLmsa1datKfMJSEH5Yx/Ws2iiuNtyd2fTU6UaUeWC0CiiikaBRRRQIKKKKACiiigYVu6F4kuNNZYZyZrb06sv0rCoqoycXdGNahCtHlmj1uzvIL23We3kDo3cVYBzXlGm6ndaZP5lu/B6ofutXoWi67a6pF8h2TD70bda64VFI+YxeBnQd1qjWopM0ua1OAKKKKACiiigAooooAKKKKACkIpaKACijFJigBc0UgFKKACiiigAooooAKKKKACiiigAooooAKKKKACkpaKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACjNJVa+vrewtzPcyBEH60DScnZE7uqKWYgAdzXG694rLbrbTm45DS/wCFZWu+IrnVGMUZMVsDwoPLfWsWuWpW6RPeweW29+r9wElmySST1J70UUVge4lbYKKKKQBRRRQAUUUUAFFFFABRRRQAUUUUAFPilkhlWWJyjqchh1FMopiaTVmdzoHiqO52W18RHMeA/QN/9eupBBGQcivHa6PQfE8tiFt7zMlv0DfxL/iK6KdbpI8HGZZa86P3HoNFQW1zDcxLLDIHRhkEGpxXSeI007MKKKKBBRRRQAUUUUAFFFFABRRRQAUGiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiig0AFITSFsCuX8QeKUts21iVkmxhn7L/AImplJRV2a0qM60uWCNLW9dttKiIJDzkfLGDyfr6V59qWpXOp3BmuHJ/uoDwoqvLLJPIZZXZ3bqzHmmVyTqOWnQ+nwmBhQV3rIKKKKyPQCiiigAooooEFFFFABRRRQAUUUUDCiiigQUUUUAFFFFABRRRQM0NJ1e60qYPC2YyfmjPQ/4V6FpOsW2qQ74Ww4+8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"><span>戒菸建議書</span></div>';
	retv+='<br><br><br><br><br><div class="quitsmoke_content">';
	retv+='<span>親愛的'+dat[2]+'<br><br>　　　　為了您的健康強烈建議您<br><br></span>';
	retv+='<span style="font-size: 140px; font-weight: 700;">　　戒菸!<br></span><span><br>我們有提供以下服務供您參考<br></span><span style="font-weight: 700;">1. 戒菸門診: 衛生所門診表如下<br></span>';
	retv+=addopdtable();
	retv+='<span style="font-weight: 700;">2. 戒菸專線服務中心: 0800-63-63-63<br></span><span style="font-weight: 700;">3. 戒菸班: 請洽和美鎮衛生所 電話：04-7062455<br></span></div><div class="page-break2"></div><div class="page-break"></div>';
	
	return retv
	
}
function generateHBVconsult(){
	retv='<div>';
	retv+='<div class="suggestion_title" style="font-size: 32px;">B肝相關檢驗項目說明</div>';
	retv+='<div><table class="suggestion_table1"><tr><td style="font-size: 24px;">整篩編號：'+dat[0]+'</td><td style="font-size: 24px;">姓名：'+dat[2]+'</td></tr></table></div>';
	if (dat[66].toLowerCase()=='Target not detected'.toLowerCase()){
		dnaunit="　";
	} else {
		dnaunit='　IU/mL';
	}
	retv+='<span class="HBVconsule" style="font-size: 24px;">➤HBV DNA:　'+dat[66]+dnaunit+'</span>';
	retv+='<div style="border: 2px solid black; border-radius: 15px; padding: 10px; width: 95%;">'
	retv+='<span class="HBVconsule" style="font-size: 20px;">此為病毒量，亦即病毒活性。一般以2000 IU/mL，以及20,000 IU/mL當作分界：</span><br>';
	retv+='<span class="HBVconsule" style="font-size: 20px;">1.「<2,000 IU/mL」-為低病毒量，一般建議可以每半年抽血追蹤一次肝指數(GOT、GPT)。</span><br>';
	retv+='<span class="HBVconsule" style="font-size: 20px;">2.「2000-20,000 IU/mL」-建議可依病人狀況，3-6個月抽血追蹤一次肝指數。</span><br>';
	retv+='<span class="HBVconsule" style="font-size: 20px;">3.「>20,000 IU/mL」-建議每3個月抽血追蹤一次肝指數。</span><br>';
	retv+='<span class="HBVconsule" style="font-size: 20px;">4.「>2000 IU/mL」且「ALT大於2倍正常值」-建議轉診專科醫師給予抗病毒藥物治療。</span><br>';
	retv+='<span class="HBVconsule" style="font-size: 20px;">※	以上個案皆建議每6個月追蹤一次超音波。</span><br>';
	retv+='</div><br>';
	retv+='<span class="HBVconsule" style="font-size: 24px;">➤HBeAg:　'+dat[67]+'　S/CO</span>';
	retv+='<div style="border: 2px solid black; border-radius: 15px; padding: 10px; width: 95%;">'
	retv+='<span class="HBVconsule" style="font-size: 20px;">代表疾病早期，病毒量通常較高，也較容易肝指數異常，建議可以3個月抽血追蹤一次肝功能(GOT、GPT)及HBeAg，若ALT大於2倍正常值，建議轉診專科醫師給予抗病毒藥物治療。</span><br>';
	retv+='</div><br>';
	retv+='<span class="HBVconsule" style="font-size: 24px;">➤Anti-HDV:　'+dat[68]+'　S/CO</span>';
	retv+='<div class="HBVconsule" style="border: 2px solid black; border-radius: 15px; padding: 10px; width: 95%;">'
	retv+='<span class="HBVconsule" style="font-size: 20px;">D型肝炎病毒是一種只會感染B肝患者的病毒，而D型肝炎抗體 (anti-HDV) 可作為篩檢是否有慢性HDV感染的工具。anti-HDV陰性患者，沒有HDV感染，但anti-HDV 陽性患者，理論上應進一步使用HDV病毒量檢測是否有活動性HDV 存在，不過目前並沒有被認證的試劑，同時HDV目前也沒有可以有效治癒的藥物，所以若有anti-HDV 陽性患者，需要給予衛教，避免體液傳染給他人，以及更加注意是否有罹患肝硬化或肝癌的情況。</span><br>';
	retv+='</div><br><br><br><br>';
	retv+='<span style="font-size: 24px;">---------------------------------------------------------------------------------------------------</span>';
	retv+='<div class="suggestion_title" style="font-size: 32px;">彰化縣衛生局B肝檢驗統計問卷</div>';
	retv+='<div><table class="suggestion_table1"><tr><td style="font-size: 24px;">整篩編號：'+dat[0]+'</td><td style="font-size: 24px;">姓名：'+dat[2]+'</td></tr></table></div><br>';
	retv+='<span class="HBVconsule" style="font-size: 24px;">1. 現在或最近3年內，有沒有使用Ｂ肝抗病毒藥物, 如貝樂克或韋立得？</span><br><br><br>';
	retv+='<span class="HBVconsule" style="font-size: 24px;">2. 若已經停藥，大約停多久？</span><br><br><br>';
	retv+='<span class="HBVconsule" style="font-size: 24px;">3. 若有機會可以治療，但一次要吃5年的藥，是否有治療意願呢？</span><br>';
	retv+='<span class="HBVconsule" style="font-size: 24px;">　病毒量: '+dat[66]+dnaunit+'</span><br><br><br><br>';
	retv+='<span class="HBVconsule" style="font-size: 24px;">填表人:__________________________</span><br>';
	retv+='</div><div class="page-break2"></div><div class="page-break"></div>';
	return retv
}
async function generatetransfer(obj,spe){
	let theminnum=dat[0].substring(dat[0].length-3,dat[0].length);
	let newurl='https://iiirrkimo.github.io/checkdata/fasttrans.html?num='+theminnum+'&spe='+spe;
	imgrcode=await generateBase64QRCode(newurl);
	imgcode='<img style="height:70px;" src="'+imgrcode+'">';
	let ret = '<div style="display: flex;">'
	ret+='<div>';
	ret+='<div class="transfer_title">全民健康保險 ' + clinicname + ' 轉診單(轉診至________________)</div>';
	ret+='<table class="transfer_table1"><tr><td>保險醫事服務機構代號：'+cliniccode+'</td><td>整篩編號：'+dat[0]+'</td><tr></table>';
	ret+='</div>';
	ret+=imgcode;
	ret+='</div>';
	ret+='<div>';
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
	ret+='<tr><td>院所<br>住址</td><td colspan="5" style="text-align: left;">'+clinicaddress+'</td><td>傳真號碼:<br>電子信箱:</td><td colspan="2"></td></tr>';
	ret+='<tr><td>診治<br>醫師</td><td>姓名</td><td>'+doctorname+'</td><td>科別</td><td>'+doctorsp+'</td><td>電話</td><td>'+clinicphone+'</td><td>醫師簽章</td><td></td></tr>';
	ret+='<tr><td colspan="2">轉診<br>日期</td><td colspan="3"> '+explaintime.split('-')[0]+' 年 '+explaintime.split('-')[1]+' 月 '+explaintime.split('-')[2]+' 日</td><td>有效<br>期限</td><td colspan="3">'+expiretime.split('-')[0]+' 年 '+expiretime.split('-')[1]+' 月 '+expiretime.split('-')[2]+' 日</td></tr>';	
	ret+='<tr><td>建議轉診<br>院所科別</td><td colspan="5"  style="text-align: left;">'+obj["T"]+'<br></td><td>轉診院所地址及專線電話</td><td colspan="2"></td></tr>';
	ret+='<tr><td rowspan="4"><br>接<br>受<br>轉<br>診<br>醫<br>院<br>診<br>所<br><br></td><td>處<br>理<br>情<br>形</td><td colspan="8" style="text-align: left;">1.　已安排本院　　　　　　科門診治療中<br>2.　已予適當處理並轉回原院所，建議事項如下<br><br><br><br><br><br></td></tr><tr><td>治<br>療<br>摘<br>要</td>				<td colspan="8" style="text-align: left;">1.　主診斷ICD-10-CM/PCS：　　　　　　　　　　病名：<br><br><br>2.　治療藥物或手術名稱<br><br><br><br><br><br><br><br>3. 　輔助診斷之檢查結果<br><br><br><br><br><br><br><br></td></tr><tr><td>院所<br>名稱</td><td colspan="3" style="text-align: left;"></td><td colspan="2">電話或傳真：<br>電子信箱：</td><td colspan="3" style="text-align: left;"></td></tr><tr><td>診治<br>醫師</td><td>姓名</td><td></td><td>科別</td><td></td><td>醫師<br>簽章</td><td></td><td>回覆<br>日期</td><td></td></tr></table></div>';
	ret+='<div class="page-break2"></div><div class="page-break"></div>';
	return ret
}

async function generateBase64QRCode(url) {
	try {
		let base64Image = await QRCode.toDataURL(url, { type: 'image/png', width: 128, margin: 1 });
		return base64Image;
	} catch (error) {
		return 'QR code generation failed';
	}
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
	ret+='<tr><td colspan="2">轉診衛生所： '+clinicname+'</td><td>電話：'+clinicphone+'</td><td>傳真：</td></tr>';
	ret+='<tr><td colspan="4">地址：'+clinicaddress+'</td></tr><tr><td colspan="4">保險醫事服務機構代號：'+cliniccode+'</td></tr><tr><td colspan="4">建議轉診科別：<span style="font-weight: 700;">肝膽腸胃科</span></td></tr>';
	ret+='<tr style="border-bottom: 2px solid"><td colspan="2">聯絡人：<br><br></td><td>醫師簽章：<br><br></td><td>轉診日期：<br><br></td></tr><tr><td colspan="3">三、轉診後處理(由確診及治療醫院填寫)</td><td style="border-left: 2px solid"></td></tr><tr><td style="text-align: right; ">1.<br><br></td><td colspan="2">請依專業以及健保規範判斷，協助諮詢說明胃幽門桿菌感染的臨床意義與對健康的可能影響</td><td style="border-left: 2px solid"></td></tr><tr><td style="text-align: right; ">2.</td><td colspan="2">處方</td><td style="border-left: 2px solid">就診院所：____________________</td></tr><tr><td></td><td colspan="2">（1）依病情或健保規範需進一步檢查做胃鏡檢查</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　結果：□是</td><td style="border-left: 2px solid">就診科別：____________________</td></tr><tr><td></td><td colspan="2">　　　　□否；請說明：____________________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□病人拒絕</td><td style="border-left: 2px solid">醫師姓名：____________________</td></tr><tr><td></td><td colspan="2">（2）上消化道內視鏡</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　結果：□正常</td><td style="border-left: 2px solid">病 歷 號：____________________</td></tr><tr><td></td><td colspan="2">　　　　□胃炎；位置範圍：____________________________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□胃潰瘍；位置範圍：__________________________</td><td style="border-left: 2px solid">診察日期：_____年_____月______日</td></tr><tr><td></td><td colspan="2">　　　　□十二指腸潰瘍；位置範圍：____________________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□胃食道逆流；程度：__________________________</td><td style="border-left: 2px solid">回覆日期：_____年_____月______日</td></tr><tr><td></td><td colspan="2">　　　　□胃腫瘤；位置範圍：__________________________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□切片</td><td style="border-left: 2px solid;font-weight: 700;">四、醫師建議</td></tr><tr><td></td><td colspan="2">　　　　　切片結果：__________________________________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□其他：______________________________________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">（3）上消化道攝影</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　結果：□正常</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□異常；請說明：______________________________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">（4）口服藥</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　結果：□無　□病人拒服　□其他用藥，藥名____________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□公費除菌藥(一線)</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　　　□PPI</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　　　□Amoxicillin 1000mgBID</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　　　□Metronidazole 250mgBID</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　　　□Clarithromycin 500mgBID</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□公費除菌藥(二線)</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　　　□PPI□Amoxicillin□Levofloxacin</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　　　□PPI□Bismuth□Tetracycline□Metronidazole</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□健保</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　□自費，藥名__________________________________</td><td style="border-left: 2px solid"></td></tr><tr><td></td><td colspan="2">　　　　服用週期□5天　□10天　□其他_________________</td><td style="border-left: 2px solid"></td></tr></table><div class="transHP_end"><span>備註：轉診單填妥後請於個案確診日隔天 中午前回傳至衛生所。<br>　　　轉診紀錄單正本及胃鏡紙本報告單，請於個案確診後1周內寄回衛生所，感謝您。</span></div></div>';
	ret+='<div class="page-break2"></div><div class="page-break"></div>';
	
	ret='<div class="transHP_title" style="font-size:28px;">彰化縣　幽門桿菌治療　電話追蹤關懷紀錄單</div><br>';
	ret+='<table style="margin-left:20px;width:95%;font-family:標楷體;font-size:24px;">';
	ret+='<tr style="height:50px;"><td style="width:45%">姓名：'+dat[2]+'('+dat[5]+')</td><td style="width:45%">整篩編號：'+dat[0]+'</td></tr>';
	ret+='<tr style="height:50px;"><td style="width:45%">身分證：'+dat[1]+'</td><td style="width:45%">生日：'+dat[3]+'</td></tr>';
	ret+='<tr style="height:50px;"><td style="width:45%">電話：'+dat[8]+'</td><td style="width:45%">手機：'+dat[9]+'</td></tr>';
	ret+='<tr style="height:50px;"><td colspan="2" style="width:90%">地址：'+dat[10]+'</td></tr>';
	ret+='<tr style="height:50px;"><td style="width:45%">服藥日：</td><td style="width:45%">醫院：</td></tr>';
	ret+='<tr style="height:50px;"><td colspan="2" style="width:90%">結果：</td></tr>';
	ret+='</table>';
	ret+='<table class="quitsmoke_table">';
	ret+='<tr style="height:50px;"><td>諮詢項目</td><td>電訪日期:</td><td>電訪日期:</td></tr>';
	ret+='<tr style="height:50px;"><td style="text-align:left">1.是否確實服藥</td><td>□ 是    □ 否</td><td>□ 是    □ 否</td></tr>';
	ret+='<tr style="height:50px;"><td style="text-align:left">2.皮膚過敏、紅疹、癢</td><td>□ 是    □ 否</td><td>□ 是    □ 否</td></tr>';
	ret+='<tr style="height:50px;"><td style="text-align:left">3.噁心嘔吐</td><td>□ 是    □ 否</td><td>□ 是    □ 否</td></tr>';
	ret+='<tr style="height:50px;"><td style="text-align:left">4.頭痛頭暈</td><td>□ 是    □ 否</td><td>□ 是    □ 否</td></tr>';
	ret+='<tr style="height:50px;"><td style="text-align:left">5.腹痛腹瀉</td><td>□ 是    □ 否</td><td>□ 是    □ 否</td></tr>';
	ret+='<tr style="height:50px;"><td style="text-align:left">6.胃痛胃口差</td><td>□ 是    □ 否</td><td>□ 是    □ 否</td></tr>';
	ret+='<tr style="height:50px;"><td style="text-align:left">7.其他副作用</td><td>□ 是    □ 否</td><td>□ 是    □ 否</td></tr>';
	ret+='<tr style="height:50px;"><td style="text-align:left">8.特殊狀況轉知地段</td><td>□ 是    □ 否</td><td>□ 是    □ 否</td></tr>';
	ret+='</table><br><br>';
	ret+='<span style="font-family:標楷體;font-size:24px;height:70px;display: inline-block;">　個案特殊事件:_______________________________________________</span><br>';
	ret+='<span style="font-family:標楷體;font-size:24px;height:70px;display: inline-block;">　____________________________________________________________</span><br>';
	ret+='<span style="font-family:標楷體;font-size:24px;height:70px;display: inline-block;">　____________________________________________________________</span><br>';
	ret+='<span style="font-family:標楷體;font-size:24px;height:70px;display: inline-block;">　地段：______________　　　　　　　關懷員：__________________</span><br>';
	
	
	
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
			retvalue=value+"*";
		}
	}
	return retvalue
}
function checkbasic(){
	errmsg='';
	cn=document.getElementById('clinicname').value;
	cc=document.getElementById('cliniccode').value;
	cp=document.getElementById('clinicphone').value;
	ca=document.getElementById('clinicaddress').value;
	dn=document.getElementById('doctorname').value;
	ds=document.getElementById('doctorsp').value;
	etv1=document.getElementById('explaindate').value;
	etv2=document.getElementById('expiredate').value;
	amtime=document.getElementById('amtime').value;
	pmtime=document.getElementById('pmtime').value;
	opdam1=document.getElementById('opdam1').value;
	opdpm1=document.getElementById('opdpm1').value;
	opdam2=document.getElementById('opdam2').value;
	opdpm2=document.getElementById('opdpm2').value;
	opdam3=document.getElementById('opdam3').value;
	opdpm3=document.getElementById('opdpm3').value;
	opdam4=document.getElementById('opdam4').value;
	opdpm4=document.getElementById('opdpm4').value;
	opdam5=document.getElementById('opdam5').value;
	opdpm5=document.getElementById('opdpm5').value;
	if (cn==""){
		errmsg+="未輸入衛生所名稱\n";
	}
	if (cc==""){
		errmsg+="未輸入衛生所代碼\n";
	}
	if (cp==""){
		errmsg+="未輸入衛生所代碼\n";
	}
	if (ca==""){
		errmsg+="未輸入衛生所地址\n";
	}
	if (dn==""){
		errmsg+="未輸入醫師姓名\n";
	}
	if (ds==""){
		errmsg+="未輸入醫師專科別\n";
	}
	if (etv1==""){
		errmsg+="未輸入二階時間\n";
	}
	if (etv2==""){
		errmsg+="未輸入轉診單過期時間\n";
	}
	if (amtime==""){
		errmsg+="未輸入上午門診時間\n";
	}
	if (pmtime==""){
		errmsg+="未輸入下午門診時間\n";
	}
	if (opdam1==""){
		errmsg+="未輸入星期一上午門診內容\n";
	}
	if (opdpm1==""){
		errmsg+="未輸入星期一下午門診內容\n";
	}
	if (opdam2==""){
		errmsg+="未輸入星期二上午門診內容\n";
	}
	if (opdpm2==""){
		errmsg+="未輸入星期二下午門診內容\n";
	}
	if (opdam3==""){
		errmsg+="未輸入星期三上午門診內容\n";
	}
	if (opdpm3==""){
		errmsg+="未輸入星期三下午門診內容\n";
	}
	if (opdam4==""){
		errmsg+="未輸入星期四上午門診內容\n";
	}
	if (opdpm4==""){
		errmsg+="未輸入星期四下午門診內容\n";
	}
	if (opdam5==""){
		errmsg+="未輸入星期五上午門診內容\n";
	}
	if (opdpm5==""){
		errmsg+="未輸入星期五下午門診內容\n";
	}
	return errmsg
}
function exportbasic(){
	errmsg=checkbasic();
	
	if (errmsg==""){
		tempobj={};
		tempobj["clinicname"]=cn;
		tempobj["cliniccode"]=cc;
		tempobj["clinicphone"]=cp;
		tempobj["clinicaddress"]=ca;
		tempobj["doctorname"]=dn;
		tempobj["doctorsp"]=ds;
		tempobj["explaindate"]=etv1;
		tempobj["expiredate"]=etv2;
		tempobj["amtime"]=amtime;
		tempobj["pmtime"]=pmtime;
		tempobj["opdam1"]=opdam1;
		tempobj["opdpm1"]=opdpm1;
		tempobj["opdam2"]=opdam2;
		tempobj["opdpm2"]=opdpm2;
		tempobj["opdam3"]=opdam3;
		tempobj["opdpm3"]=opdpm3;
		tempobj["opdam4"]=opdam4;
		tempobj["opdpm4"]=opdpm4;
		tempobj["opdam5"]=opdam5;
		tempobj["opdpm5"]=opdpm5;

		download(cn+"_"+etv1+'_基本設定.txt',JSON.stringify(tempobj));
	} else {
		alert(errmsg);
	}
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
function cleanbasic(){
	document.getElementById('clinicname').value="";
	document.getElementById('cliniccode').value="";
	document.getElementById('clinicphone').value="";
	document.getElementById('clinicaddress').value="";
	document.getElementById('doctorname').value="";
	document.getElementById('doctorsp').value="";
	document.getElementById('explaindate').value=new Date().toISOString().split('T')[0];
	document.getElementById('explaindate').dispatchEvent(new Event('change', {bubbles: true}));
	document.getElementById('amtime').value="";
	document.getElementById('pmtime').value="";
	document.getElementById('opdam1').value="";
	document.getElementById('opdpm1').value="";
	document.getElementById('opdam2').value="";
	document.getElementById('opdpm2').value="";
	document.getElementById('opdam3').value="";
	document.getElementById('opdpm3').value="";
	document.getElementById('opdam4').value="";
	document.getElementById('opdpm4').value="";
	document.getElementById('opdam5').value="";
	document.getElementById('opdpm5').value="";
	
	
}
function showopdlist(){
	opdlistcontent=addtitle("門診表");
	opdlistcontent+=addopdtable();
	opdlistcontent+="</body></html>";
	opdwindow = window.open('', '_blank');
	opdwindow.document.open();
    opdwindow.document.write(opdlistcontent);
    opdwindow.document.close();

}
function addopdtable(){
	amtime=document.getElementById('amtime').value;
	pmtime=document.getElementById('pmtime').value;
	opdam1=document.getElementById('opdam1').value;
	opdpm1=document.getElementById('opdpm1').value;
	opdam2=document.getElementById('opdam2').value;
	opdpm2=document.getElementById('opdpm2').value;
	opdam3=document.getElementById('opdam3').value;
	opdpm3=document.getElementById('opdpm3').value;
	opdam4=document.getElementById('opdam4').value;
	opdpm4=document.getElementById('opdpm4').value;
	opdam5=document.getElementById('opdam5').value;
	opdpm5=document.getElementById('opdpm5').value;
	amtime=amtime.replaceAll("~","<br>~<br>");
	amtime=amtime.replaceAll("-","<br>~<br>");
	pmtime=pmtime.replaceAll("~","<br>~<br>");
	pmtime=pmtime.replaceAll("-","<br>~<br>");
	opdam1=opdam1.replaceAll("\n","<br>");
	opdam2=opdam2.replaceAll("\n","<br>");
	opdam3=opdam3.replaceAll("\n","<br>");
	opdam4=opdam4.replaceAll("\n","<br>");
	opdam5=opdam5.replaceAll("\n","<br>");
	opdpm1=opdpm1.replaceAll("\n","<br>");
	opdpm2=opdpm2.replaceAll("\n","<br>");
	opdpm3=opdpm3.replaceAll("\n","<br>");
	opdpm4=opdpm4.replaceAll("\n","<br>");
	opdpm5=opdpm5.replaceAll("\n","<br>");
	retopdtable='';
	retopdtable+='<table class="quitsmoke_table"><tr><td style="width:15%">時段</td><td style="width:17%">星期一</td><td style="width:17%">星期二</td><td style="width:17%">星期三</td><td style="width:17%">星期四</td><td style="width:17%">星期五</td></tr>';
	retopdtable+='<tr><td>上午<br>'+amtime+'</td><td>'+opdam1+'</td><td>'+opdam2+'</td><td>'+opdam3+'</td><td>'+opdam4+'</td><td>'+opdam5+'</td></tr>';
	retopdtable+='<tr><td>下午<br>'+pmtime+'</td><td>'+opdpm1+'</td><td>'+opdpm2+'</td><td>'+opdpm3+'</td><td>'+opdpm4+'</td><td>'+opdpm5+'</td></tr>';
	retopdtable+='</table>';
	return retopdtable
}
function getxlsvalue(cell){
	var thexlsvalue = '';
	if (cell) {
		thexlsvalue = cell.v || '';
	}
	return thexlsvalue
}