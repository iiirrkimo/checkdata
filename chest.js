function createchest(){if(ccc=document.URL,d0="https://phpcis.chshb.gov.tw/consultationMainPage/",d1="https://phpcis.chshb.gov.tw/populanceRegistration",d2="https://phpcis.chshb.gov.tw/registration",d3="https://phpcis.chshb.gov.tw/registration/",d4="https://phpcis.chshb.gov.tw/registration/create",d5="https://phpcis.chshb.gov.tw/familyMedicine",d6="https://phpcis.chshb.gov.tw/populanceConsultation/",d7="https://phpcis.chshb.gov.tw/medicalRefee",d8="https://phpcis.chshb.gov.tw/disease",d9="https://phpcis.chshb.gov.tw/preventionAdultDownload",document.getElementById("myDraggable")&&document.getElementById("myDraggable").remove(),ccc.includes(d0))create_OPD_one();else if(ccc==d1)create_OPD_list();else if(ccc==d2)create_REG_list();else if(ccc.includes(d3)||ccc==d4)create_REG_one();else if(ccc==d5)create_FM();else if(ccc.includes(d6)){if(escape_populanceConsultation){let e=ccc.split(d6)[1];window.history.pushState({},"","/consultationMainPage/"+e),window.dispatchEvent(new PopStateEvent("popstate"))}}else ccc==d7?create_Countmonth():ccc==d8?create_changeicd():ccc==d9&&create_newHEupload();function create_OPD_one(){create_myDraggable(),button_5line=document.createElement("button"),button_5line.textContent="變5行",button_5line.style.width="80px",button_5line.style.left="2px",button_5line.style.top="2px",button_5line.style.position="absolute",button_5line.addEventListener("click",button_5line_handle),myDraggable.appendChild(button_5line),button_HE=document.createElement("button"),button_HE.textContent="成健問卷",button_HE.style.width="80px",button_HE.style.left="84px",button_HE.style.top="2px",button_HE.style.position="absolute",button_HE.addEventListener("click",button_HE_handle),myDraggable.appendChild(button_HE),button_OR=document.createElement("button"),button_OR.textContent="口篩問卷",button_OR.style.width="80px",button_OR.style.left="166px",button_OR.style.top="2px",button_OR.style.position="absolute",button_OR.addEventListener("click",button_OR_handle),myDraggable.appendChild(button_OR),button_goup=document.createElement("button"),button_goup.textContent="▲",button_goup.style.width="40px",button_goup.style.left="248px",button_goup.style.top="2px",button_goup.style.position="absolute",button_goup.addEventListener("click",button_goup_handle),myDraggable.appendChild(button_goup),button_godown=document.createElement("button"),button_godown.textContent="▼",button_godown.style.width="40px",button_godown.style.left="288px",button_godown.style.top="2px",button_godown.style.position="absolute",button_godown.addEventListener("click",button_godown_handle),myDraggable.appendChild(button_godown),button_changetype=document.createElement("button"),button_changetype.textContent="換身份",button_changetype.style.width="80px",button_changetype.style.left="2px",button_changetype.style.top="34px",button_changetype.style.position="absolute",button_changetype.addEventListener("click",button_changetype_handle),myDraggable.appendChild(button_changetype),button_toHE=document.createElement("button"),button_toHE.textContent="跳轉成健",button_toHE.style.width="80px",button_toHE.style.left="84px",button_toHE.style.top="34px",button_toHE.style.position="absolute",button_toHE.addEventListener("click",button_toHE_handle),myDraggable.appendChild(button_toHE),button_toOR=document.createElement("button"),button_toOR.textContent="跳轉口篩",button_toOR.style.width="80px",button_toOR.style.left="166px",button_toOR.style.top="34px",button_toOR.style.position="absolute",button_toOR.addEventListener("click",button_toOR_handle),myDraggable.appendChild(button_toOR),button_NIIS=document.createElement("button"),button_NIIS.textContent="NIIS",button_NIIS.style.width="80px",button_NIIS.style.left="248px",button_NIIS.style.top="34px",button_NIIS.style.position="absolute",button_NIIS.addEventListener("click",button_NIIS_handle),myDraggable.appendChild(button_NIIS),button_toREG=document.createElement("button"),button_toREG.textContent="切換掛號",button_toREG.style.width="80px",button_toREG.style.left="2px",button_toREG.style.top="66px",button_toREG.style.position="absolute",button_toREG.addEventListener("click",button_toREG_handle),myDraggable.appendChild(button_toREG),button_showdrug=document.createElement("button"),button_showdrug.textContent="藥品圖片",button_showdrug.style.width="80px",button_showdrug.style.left="84px",button_showdrug.style.top="66px",button_showdrug.style.position="absolute",button_showdrug.addEventListener("click",button_showdrug_handle),myDraggable.appendChild(button_showdrug),button_showdata=document.createElement("button"),button_showdata.textContent="檢驗彙總",button_showdata.style.width="80px",button_showdata.style.left="166px",button_showdata.style.top="66px",button_showdata.style.position="absolute",button_showdata.addEventListener("click",button_showdata_handle),myDraggable.appendChild(button_showdata),button_trydebug=document.createElement("button"),button_trydebug.textContent="簡易除錯",button_trydebug.style.width="80px",button_trydebug.style.left="248px",button_trydebug.style.top="66px",button_trydebug.style.position="absolute",button_trydebug.addEventListener("click",button_trydebug_handle),myDraggable.appendChild(button_trydebug)}function create_OPD_list(){create_myDraggable(),button_NIIS=document.createElement("button"),button_NIIS.textContent="NIIS",button_NIIS.style.width="80px",button_NIIS.style.left="2px",button_NIIS.style.top="2px",button_NIIS.style.position="absolute",button_NIIS.addEventListener("click",button_NIIS_handle),myDraggable.appendChild(button_NIIS),button_autocomplete=document.createElement("button"),button_autocomplete.textContent="批次完成",button_autocomplete.style.width="80px",button_autocomplete.style.left="84px",button_autocomplete.style.top="2px",button_autocomplete.style.position="absolute",button_autocomplete.addEventListener("click",button_autocomplete_handle),myDraggable.appendChild(button_autocomplete),button_reflash=document.createElement("button"),button_reflash.textContent="更新列表",button_reflash.style.width="80px",button_reflash.style.left="166px",button_reflash.style.top="2px",button_reflash.style.position="absolute",button_reflash.addEventListener("click",button_reflash_handle),myDraggable.appendChild(button_reflash),button_autocompletev2=document.createElement("button"),button_autocompletev2.textContent="帶入標準處方_身分",button_autocompletev2.style.width="160px",button_autocompletev2.style.left="248px",button_autocompletev2.style.top="2px",button_autocompletev2.style.position="absolute",button_autocompletev2.addEventListener("click",button_autocompletev2_handle),myDraggable.appendChild(button_autocompletev2),button_autocompletesingle=document.createElement("button"),button_autocompletesingle.textContent="帶入標準處方_個案",button_autocompletesingle.style.width="160px",button_autocompletesingle.style.left="410px",button_autocompletesingle.style.top="2px",button_autocompletesingle.style.position="absolute",button_autocompletesingle.addEventListener("click",button_autocompletesingle_handle),myDraggable.appendChild(button_autocompletesingle),button_changenumber=document.createElement("button"),button_changenumber.textContent="新舊切換",button_changenumber.style.width="80px",button_changenumber.style.left="572px",button_changenumber.style.top="2px",button_changenumber.style.position="absolute",button_changenumber.addEventListener("click",button_changenumber_handle),myDraggable.appendChild(button_changenumber),button_listdelete=document.createElement("button"),button_listdelete.textContent="快速刪除",button_listdelete.style.width="80px",button_listdelete.style.left="654px",button_listdelete.style.top="2px",button_listdelete.style.position="absolute",button_listdelete.addEventListener("click",button_listdelete_handle),myDraggable.appendChild(button_listdelete),myDraggable.style.height="35px",myDraggable.style.width="739px",myDraggable.style.left=window.innerWidth-739+"px"}function create_REG_list(){create_myDraggable(),button_NIIS=document.createElement("button"),button_NIIS.textContent="NIIS",button_NIIS.style.width="80px",button_NIIS.style.left="2px",button_NIIS.style.top="2px",button_NIIS.style.position="absolute",button_NIIS.addEventListener("click",button_NIIS_handle),myDraggable.appendChild(button_NIIS),div_fasttype=document.createElement("div"),div_fasttype.textContent="身分",div_fasttype.style.width="40px",div_fasttype.style.left="82px",div_fasttype.style.top="2px",div_fasttype.style.position="absolute",div_fasttype.style.textAlign="center",myDraggable.appendChild(div_fasttype),input_fasttype=document.createElement("input"),input_fasttype.id="input_fasttype",temptype&&(input_fasttype.value=temptype),input_fasttype.style.width="40px",input_fasttype.style.left="124px",input_fasttype.style.top="2px",input_fasttype.style.position="absolute",input_fasttype.style.textAlign="center",myDraggable.appendChild(input_fasttype),button_fastreg=document.createElement("button"),button_fastreg.textContent="快速掛號",button_fastreg.style.width="80px",button_fastreg.style.left="166px",button_fastreg.style.top="2px",button_fastreg.style.position="absolute",button_fastreg.addEventListener("click",button_fastreg_handle),myDraggable.appendChild(button_fastreg),button_showvaccine=document.createElement("button"),button_showvaccine.textContent="顯示疫苗",button_showvaccine.style.width="80px",button_showvaccine.style.left="2px",button_showvaccine.style.top="34px",button_showvaccine.style.position="absolute",button_showvaccine.addEventListener("click",button_showvaccine_handle),myDraggable.appendChild(button_showvaccine),button_countvaccine=document.createElement("button"),button_countvaccine.textContent="算疫苗",button_countvaccine.style.width="80px",button_countvaccine.style.left="84px",button_countvaccine.style.top="34px",button_countvaccine.style.position="absolute",button_countvaccine.addEventListener("click",button_countvaccine_handle),myDraggable.appendChild(button_countvaccine),button_changenumber=document.createElement("button"),button_changenumber.textContent="新舊切換",button_changenumber.style.width="80px",button_changenumber.style.left="166px",button_changenumber.style.top="34px",button_changenumber.style.position="absolute",button_changenumber.addEventListener("click",button_changenumber_handle),myDraggable.appendChild(button_changenumber),button_reflash=document.createElement("button"),button_reflash.textContent="重整畫面",button_reflash.style.width="80px",button_reflash.style.left="2px",button_reflash.style.top="66px",button_reflash.style.position="absolute",button_reflash.addEventListener("click",button_reflash_handle),myDraggable.appendChild(button_reflash),button_detail=document.createElement("button"),button_detail.textContent="基本資料",button_detail.style.width="80px",button_detail.style.left="84px",button_detail.style.top="66px",button_detail.style.position="absolute",button_detail.addEventListener("click",button_detail_handle),myDraggable.appendChild(button_detail),button_OPDhistory=document.createElement("button"),button_OPDhistory.textContent="就醫紀錄",button_OPDhistory.style.width="80px",button_OPDhistory.style.left="166px",button_OPDhistory.style.top="66px",button_OPDhistory.style.position="absolute",button_OPDhistory.addEventListener("click",button_OPDhistory_handle),myDraggable.appendChild(button_OPDhistory),myDraggable.style.width="248px",myDraggable.style.left=window.innerWidth-248-borderx+"px"}function create_REG_one(){create_myDraggable(),button_NIIS=document.createElement("button"),button_NIIS.textContent="NIIS",button_NIIS.style.width="80px",button_NIIS.style.left="2px",button_NIIS.style.top="2px",button_NIIS.style.position="absolute",button_NIIS.addEventListener("click",button_NIIS_handle),myDraggable.appendChild(button_NIIS),div_fasttype=document.createElement("div"),div_fasttype.textContent="身分",div_fasttype.style.width="40px",div_fasttype.style.left="82px",div_fasttype.style.top="2px",div_fasttype.style.position="absolute",div_fasttype.style.textAlign="center",myDraggable.appendChild(div_fasttype),input_fasttype=document.createElement("input"),input_fasttype.id="input_fasttype",temptype&&(input_fasttype.value=temptype),input_fasttype.style.width="40px",input_fasttype.style.left="124px",input_fasttype.style.top="2px",input_fasttype.style.position="absolute",input_fasttype.style.textAlign="center",myDraggable.appendChild(input_fasttype),button_fastreg=document.createElement("button"),button_fastreg.textContent="快速掛號",button_fastreg.style.width="80px",button_fastreg.style.left="166px",button_fastreg.style.top="2px",button_fastreg.style.position="absolute",button_fastreg.addEventListener("click",button_fastreg_handle),myDraggable.appendChild(button_fastreg),button_showvaccine=document.createElement("button"),button_showvaccine.textContent="顯示疫苗",button_showvaccine.style.width="80px",button_showvaccine.style.left="2px",button_showvaccine.style.top="34px",button_showvaccine.style.position="absolute",button_showvaccine.addEventListener("click",button_showvaccine_handle),myDraggable.appendChild(button_showvaccine),button_detail=document.createElement("button"),button_detail.textContent="基本資料",button_detail.style.width="80px",button_detail.style.left="84px",button_detail.style.top="34px",button_detail.style.position="absolute",button_detail.addEventListener("click",button_detail_handle),myDraggable.appendChild(button_detail),button_OPDhistory=document.createElement("button"),button_OPDhistory.textContent="就醫紀錄",button_OPDhistory.style.width="80px",button_OPDhistory.style.left="166px",button_OPDhistory.style.top="34px",button_OPDhistory.style.position="absolute",button_OPDhistory.addEventListener("click",button_OPDhistory_handle),myDraggable.appendChild(button_OPDhistory),myDraggable.style.width="248px",myDraggable.style.height="70px",myDraggable.style.left=window.innerWidth-248-borderx+"px"}function create_FM(){create_myDraggable(),button_FMdebug=document.createElement("button"),button_FMdebug.textContent="醫療群除錯",button_FMdebug.style.width="160px",button_FMdebug.style.height="66px",button_FMdebug.style.left="2px",button_FMdebug.style.top="2px",button_FMdebug.style.position="absolute",button_FMdebug.addEventListener("click",button_FMdebug_handle),myDraggable.appendChild(button_FMdebug),myDraggable.style.width="164px",myDraggable.style.height="70px",myDraggable.style.left=window.innerWidth-164-borderx+"px"}function create_Countmonth(){create_myDraggable(),button_countmonth=document.createElement("button"),button_countmonth.textContent="查天數",button_countmonth.style.width="160px",button_countmonth.style.height="66px",button_countmonth.style.left="2px",button_countmonth.style.top="2px",button_countmonth.style.position="absolute",button_countmonth.addEventListener("click",button_countmonth_handle),myDraggable.appendChild(button_countmonth),myDraggable.style.width="164px",myDraggable.style.height="70px",myDraggable.style.left=window.innerWidth-1164-borderx+"px"}function create_changeicd(){create_myDraggable(),button_changeicd=document.createElement("button"),button_changeicd.textContent="改ICD",button_changeicd.style.width="160px",button_changeicd.style.height="66px",button_changeicd.style.left="2px",button_changeicd.style.top="2px",button_changeicd.style.position="absolute",button_changeicd.addEventListener("click",button_changeicd_handle),myDraggable.appendChild(button_changeicd),button_changeicdf=document.createElement("button"),button_changeicdf.textContent="ICD比對",button_changeicdf.style.width="160px",button_changeicdf.style.height="66px",button_changeicdf.style.left="164px",button_changeicdf.style.top="2px",button_changeicdf.style.position="absolute",button_changeicdf.addEventListener("click",button_changeicdf_handle),myDraggable.appendChild(button_changeicdf),myDraggable.style.width="326px",myDraggable.style.height="70px",myDraggable.style.left=window.innerWidth-1364-borderx+"px"}function create_newHEupload(){create_myDraggable(),button_changenewHE=document.createElement("button"),button_changenewHE.textContent="修改格式",button_changenewHE.style.width="160px",button_changenewHE.style.height="70px",button_changenewHE.style.left="2px",button_changenewHE.style.top="2px",button_changenewHE.style.position="absolute",button_changenewHE.addEventListener("click",button_changenewHE_handle),myDraggable.appendChild(button_changenewHE),button_changenewHEtxt=document.createElement("div"),button_changenewHEtxt.innerHTML="1.請先產製原始成健媒體檔，並複製TXT內容<br>2.點修改格式後貼上<br>3.打開下載的output.txt，把內容複製到原媒體檔後儲存並上傳",button_changenewHEtxt.style.width="460px",button_changenewHEtxt.style.height="70px",button_changenewHEtxt.style.left="164px",button_changenewHEtxt.style.top="2px",button_changenewHEtxt.style.position="absolute",myDraggable.appendChild(button_changenewHEtxt),myDraggable.style.width="626px",myDraggable.style.height="74px",myDraggable.style.left=window.innerWidth-700-borderx+"px"}function button_changenewHE_handle(){function getlistfromtxt(){let e,t=prompt("請貼上成健上傳媒體檔內容").split("\r\n"),n={},i=[],a=[];for(let e=0;e<t.length;e++){let r=t[e],o=r.substring(0,10),l=r.substring(18,28),c=r.substring(28,32),d=r.substring(32,42),s=r.substring(42,52),m=r.substring(52,59),u=r.substring(59,66),h=r.replace(/[^\x00-\x7F]/g,"aa").length-r.length,p=r.substring(165,185-h),g=r.substring(185-h,195-h),b={};b.personalId=o,b.address=c,b.phone=l,b.hosid=d,b.examid=s,b.j1date=m,b.j2date=u,b.name=p,b.drid=g,"       "!=u?(n[o]=b,a.push(1*u)):i.push(r)}let r=Object.keys(n).sort(),o=r.length,l,c,d;if(confirm("2階共"+o+"筆，是否修正為新版格式\n約需"+Math.floor(3*o/60)+"分"+Math.floor(3*o%60)+"秒")){let e=mkytocy(Math.max(...a)),t=mkytocy(Math.min(...a)),o=cytomky((new Date).toISOString().split("T")[0]);const l=new XMLHttpRequest;let c="https://phpcis.chshb.gov.tw/api/v1/prevention_datas/list?treatmentDateStart="+t+"&treatmentDateEnd="+e+"&itemId=02";l.open("GET",c,!1),l.send();let d=JSON.parse(l.responseText).result;helistobj={};for(let e=0;e<d.length;e++){let t=d[e],n=t.personalId,i=t.preventionDataId;"第二階段"==t.serviceName&&(helistobj[n]=i)}let s="";for(let e=0;e<r.length;e++){let t=r[e],i,a,o,c;s+=genline(genprea(l,n[t],helistobj[t]))+"\r\n"}for(let e=0;e<i.length;e++){let t=i[e],n=t.replace(/[^\x00-\x7F]/g,"aa").length-t.length,a;s+=t.substring(0,195-n)+"\r\n"}s=s.substring(0,s.length-2),console.log(s),downloadTxt("output.txt",s),alert("轉換完成，請手動將output.txt內容覆蓋至原本的檔案儲存後上傳")}}function downloadTxt(e,t){const n=new Blob([t],{type:"text/plain"}),i=document.createElement("a");i.href=URL.createObjectURL(n),i.download=e,document.body.appendChild(i),i.click(),document.body.removeChild(i)}function genline(e){const t=["l",10,1,7,10,4,10,10,7,7,7,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,4,5,4,3,3,4,4,4,4,4,4,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,20,10,10,4,2,1,1,2,2,2,2,2];let n="";for(let i=1;i<t.length;i++){let a=t[i],r,o=e["item_"+i];if(59==i){let e,t=o.replace(/[^\x00-\x7F]/g,"aa").length-o.length;o=(o+="                    ").substring(0,a-t)}else i>65?"aN"==(o=(o=(o="000"+o).replaceAll(" ","0")).substring(o.length-a,o.length))&&(o="NA"):o=63==i?(o+="                    ").substring(0,a):(o=(o="00000000000000"+o).replaceAll(" ","0")).substring(o.length-a,o.length);n+=o}return n}function genprea(xhr,pat,preventionDataId){let preurl="https://phpcis.chshb.gov.tw/api/v1/prevention_datas/find?clinicId=4&preventionDataId="+preventionDataId;xhr.open("GET",preurl,!1),xhr.send();let d=JSON.parse(xhr.responseText).result,dr=d.adultScreenOrm,item_1=d.personalId,item_2=d.gender,item_3=cytomky(d.birthday),item_4=pat.phone,item_5=pat.address,item_6=pat.hosid,item_7=pat.examid,item_8=pat.j1date,item_9=pat.j2date,cynow=(new Date).toISOString().split("T")[0],item_10=cytomky(cynow),item_11=dr.HBHCCheck,item_12="1";dr.HEHypertension&&(item_12="2");let item_13="1";dr.HEDiabetes&&(item_13="2");let item_14="1";dr.HEHyperlipidemia&&(item_14="2");let item_15="1";dr.HEHeartDisease&&(item_15="2");let item_16="1";dr.HEStroke&&(item_16="2");let item_17="1";dr.HEKidneyDiseases&&(item_17="2");let item_18=dr.isSmoke,item_19=dr.isDrink,item_20=dr.isBetel,item_21=dr.isSport,item_22="1";dr.MelancholyExam1&&(item_22="2");let item_23="1";dr.MelancholyExam2&&(item_23="2");let item_24=Math.round(dr.height),item_25=Math.round(dr.weight),item_26=Math.round(dr.SBP),item_27=Math.round(dr.DBP),item_28=Math.round(dr.waistline),item_29=Math.round(10*dr.BMI)/10,item_30=Math.round(dr.urineProteinReference),item_31=Math.round(dr.GluecoreAC),item_32=Math.round(dr.TChol),item_33=Math.round(dr.TG),LDL=dr.LDL,item_34="";item_34=""==LDL||null==LDL||0==LDL?"999":Math.round(LDL);let item_35=Math.round(dr.HDL),item_36=Math.round(dr.SGOT),item_37=Math.round(dr.SGPT),item_38=Math.round(10*dr.CRE_S)/10,item_39=Math.round(10*dr.eGFR)/10,item_40=dr.HBsAG,item_41=dr.HCV,item_42="1";dr.healthQuitSmoke&&(item_42="2");let item_43="1";dr.healthQuitDrink&&(item_43="2");let item_44="1";dr.healthQuitBetel&&(item_44="2");let item_45="1";dr.healthExercise&&(item_45="2");let item_46="1";dr.healthWeight&&(item_46="2");let item_47="1";dr.healthDiet&&(item_47="2");let item_48="1";dr.healthProtection&&(item_48="2");let item_49="1";dr.healthDental&&(item_49="2");let item_50=dr.resultBP,item_51=dr.resultGlucore,item_52=dr.resultCholesterol,item_53=dr.resultRenal,item_54=dr.resultLiver,item_55=dr.resultMS,item_56=dr.resultHB;"3"==item_56&&(item_56="0");let item_57=dr.resultHC;"3"==item_57&&(item_57="0");let item_58=dr.melancholyExam,item_59=pat.name,item_60=pat.drid,item_61=pat.drid,item_62=Math.round(10*dr.uricAcid)/10,item_63=dr.resultRenalStage;""==item_63&&(item_63=item_39<15?"5":item_39<30?"4":item_39<45?"3B":item_39<60?"3A":item_30>15?item_39<90?"2":"1":"0");let item_64="2",item_65="2",item_66=Math.round(dr.CHDRisk),item_67=Math.round(dr.DiabetesRisk),item_68=Math.round(dr.HypertensionRisk),item_69=Math.round(dr.StrokeRisk),item_70=Math.round(dr.MACERisk),retobj={};for(let i=1;i<71;i++){let key="item_"+i;retobj[key]=eval(key)}return retobj}function cytomky(e){let t=e.split("-"),n="000"+(t[0]-1911);return(n=n.substring(n.length-3,n.length))+t[1]+t[2]}function mkytocy(e){let t,n,i;return 1*e.toString().substring(0,3)+1911+"-"+e.toString().substring(3,5)+"-"+e.toString().substring(5,7)}getlistfromtxt()}function button_changeicd_handle(){const e=document.URL;if("https://phpcis.chshb.gov.tw/disease"==e){const e=document.getElementsByClassName("table table-striped table-bordered role-list__role-table commonTable")[0];find=!1;let t="";for(i=1;i<e.rows.length;i++)if(e.rows[i].cells[0].children[0].checked){t=e.rows[i].cells[1].children[0].href,find=!0;break}if(find){const e=new XMLHttpRequest,n="https://phpcis.chshb.gov.tw/api/v1/clinics/settings/find";e.open("GET",n,!1),e.send();const i=e.responseText,a=JSON.parse(i),r=a.result.clinicId,o=t.split("/")[t.split("/").length-1],l="https://phpcis.chshb.gov.tw/api/v1/diseases/find?diseaseId="+o;e.open("GET",l,!1),e.send();const c=e.responseText;let d,s=JSON.parse(c).result,m=prompt("新的ICD9名稱",s.ICD9Name);null!=m&&""!=m&&(s.ICD9Name=m);let u=prompt("新的ICD10代碼",s.ICD10Code);null!=u&&""!=u&&(s.ICD10Code=u);let h=prompt("新的ICD10名稱",s.ICD10Name);null!=h&&""!=h&&(s.ICD10Name=h),s.clinicId=r;const p="https://phpcis.chshb.gov.tw/api/v1/diseases/update";e.open("POST",p,!1),e.setRequestHeader("Content-Type","application/json"),e.send(JSON.stringify(s));let g=e.responseText,b;200==JSON.parse(g).code&&(alert("修改完成"),document.querySelector("#root > div.wrapper > main > div > div.mb-2.btn-toolbar > button.commonBtn.btn.btn-success").click())}else alert("無選擇")}else alert("需在疾病資料列表執行"),window.location.href="https://phpcis.chshb.gov.tw/disease"}function button_changeicdf_handle(){let e=new XMLHttpRequest,t="https://iiirrkimo.github.io/checkdata/icdc.json";e.open("GET",t,!1),e.send();let n=e.responseText,i=JSON.parse(n),a="https://phpcis.chshb.gov.tw/api/v1/diseases/list";e.open("GET",a,!1),e.send();let r=[],o=JSON.parse(e.responseText).result;for(let e=0;e<o.length;e++){let t=o[e],n=t.ICD10Code.replaceAll(".","").toUpperCase();if(null!=i[n]){let e={};e[14]=t,e[23]=i[n],r.push(e)}}console.log(r);let l=JSON.stringify(JSON.stringify(r));htmls=String.raw`
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
			const data=${l};
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

		
		`;const c=window.open("","_blank","width=1600,height=900");c.document.write(htmls),c.document.close()}function create_myDraggable(){thewidth=330,theheight=100,borderx=20,bordery=50;var e=document.createElement("div");function t(t){posX=mouseX-t.clientX,posY=mouseY-t.clientY,mouseX=t.clientX,mouseY=t.clientY,e.style.left=e.offsetLeft-posX+"px",e.style.top=e.offsetTop-posY+"px"}function n(){document.removeEventListener("mousemove",t),document.removeEventListener("mouseup",n)}e.id="myDraggable",e.style.width=thewidth+"px",e.style.left=window.innerWidth-thewidth-borderx+"px",e.style.height=theheight+"px",e.style.top=bordery+"px",e.style.background="#f9f9f9",e.style.border="1px solid #ccc",e.style.position="absolute",e.style.cursor="move",e.style.zIndex="9999",document.body.insertBefore(e,document.body.firstChild),e.addEventListener("mousedown",function(e){mouseX=e.clientX,mouseY=e.clientY,document.addEventListener("mousemove",t),document.addEventListener("mouseup",n)})}async function button_5line_handle(){if(cc=document.URL,d1="https://phpcis.chshb.gov.tw/consultationMainPage/",d2="https://phpcis.chshb.gov.tw/populanceRegistration",d3="https://phpcis.chshb.gov.tw/registration",cc.includes(d1)){for(theform=document.querySelector("#root > div.wrapper > main > div > form"),i=0;i<theform.children[1].childElementCount;i++)"治療結束日:"==theform.children[1].children[i].textContent?theform.children[1].children[i].children[0].textContent="結束日":"療程起日:"==theform.children[1].children[i].textContent?theform.children[1].children[i].children[0].textContent="起日":"慢連處方"==theform.children[1].children[i].textContent&&(theform.children[1].children[i].children[0].children[0].children[1].textContent="連處");for(ccc=document.getElementsByClassName("consultationMainPage__value"),aaa=[],i=0;i<ccc.length;i++)if("途徑:"==ccc[i].innerText){ri=i;break}ccc[ri].hidden=!0,ccc[ri+1].hidden=!0,uu=document.getElementsByClassName("col-xl-5 col-lg-5")[2],inputarea=uu.querySelectorAll("textarea"),inputspace=uu.getElementsByClassName("line"),inputspace[0].style.height="10rem",inputarea[0].rows=5,inputspace[1].style.height="12.5rem",inputarea[1].rows=5,ggg=document.getElementsByClassName("line prescription-diagnosis-area")[0],ggg.style.height="23.1rem",ggg.children[2].style.height="17vh",ggg.children[2].children[0].style.height="17vh",document.getElementsByClassName("line prescription-diagnosis-area")[1].style.height="23rem",prevention=document.getElementById("prevention"),null==prevention&&(prevention=document.createElement("div"),prevention.setAttribute("id","prevention"),title=document.createTextNode("預防保健項目"),prevention.style.border="1px solid black",prevention.style.width="500px",prevention.appendChild(title),prevention_L1=document.createElement("div"),prevention_L1.setAttribute("id","prevention_L1"),prevention.appendChild(prevention_L1),prevention_L2=document.createElement("div"),prevention_L2.setAttribute("id","prevention_L2"),prevention.appendChild(prevention_L2),prevention_L3=document.createElement("div"),prevention_L3.setAttribute("id","prevention_L3"),prevention.appendChild(prevention_L3),prevention_L4=document.createElement("div"),prevention_L4.setAttribute("id","prevention_L4"),prevention.appendChild(prevention_L4),prevention_L5=document.createElement("div"),prevention_L5.setAttribute("id","prevention_L5"),prevention.appendChild(prevention_L5),ggg.appendChild(prevention),plan=document.createElement("div"),plan.setAttribute("id","plan"),plan.style.border="1px solid black",plan.style.width="375px",plantitle=document.createTextNode("試辦計畫"),plan.appendChild(plantitle),plan_L1=document.createElement("div"),plan_L1.setAttribute("id","plan_L1"),plan.appendChild(plan_L1),plan_L2=document.createElement("div"),plan_L2.setAttribute("id","plan_L2"),plan.appendChild(plan_L2),plan_L3=document.createElement("div"),plan_L3.setAttribute("id","plan_L3"),plan.appendChild(plan_L3),horizontalContainer=document.createElement("div"),horizontalContainer.style.display="flex",horizontalContainer.appendChild(prevention),horizontalContainer.appendChild(plan),ggg.appendChild(horizontalContainer)),registrationId=cc.split("/")[cc.split("/").length-1],furl="https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId="+registrationId+"&type=consultation",await fetch(furl,{headers:{"content-type":"application/json"},body:null,method:"GET"}).then(e=>e.text()).then(e=>{res=JSON.parse(e),personalInfoId=res.result.personalInfoId,age=res.result.age,gender=res.result.gender,furl2="https://phpcis.chshb.gov.tw/api/v1/personal_infos/preventions_histories/list?personalInfoId="+personalInfoId,fetch(furl2,{headers:{"content-type":"application/json"},body:null,method:"GET"}).then(e=>e.text()).then(e=>{for(res2=JSON.parse(e),HE=["HE"],FO=["FO"],OR=["OR"],PA=["PA"],MA=["MA"],i=1;i<=res2.result.length;i++)"02"==res2.result[res2.result.length-i].preventionTag?res2.result[res2.result.length-i].serviceCode.includes("Y")?HE.splice(HE.length-1,1):HE.push(res2.result[res2.result.length-i]):"03"==res2.result[res2.result.length-i].preventionTag?res2.result[res2.result.length-i].serviceCode.includes("Y")?PA.splice(PA.length-1,1):PA.push(res2.result[res2.result.length-i]):"06"==res2.result[res2.result.length-i].preventionTag?res2.result[res2.result.length-i].serviceCode.includes("Y")?MA.splice(MA.length-1,1):MA.push(res2.result[res2.result.length-i]):"07"==res2.result[res2.result.length-i].preventionTag?res2.result[res2.result.length-i].serviceCode.includes("Y")?FO.splice(FO.length-1,1):FO.push(res2.result[res2.result.length-i]):"08"==res2.result[res2.result.length-i].preventionTag&&(res2.result[res2.result.length-i].serviceCode.includes("Y")?OR.splice(OR.length-1,1):OR.push(res2.result[res2.result.length-i]));nowy=(new Date).getFullYear(),age>=65?HE.length>1?(LHE=HE[HE.length-1].treatmentDate.split("-")[0],nowy-LHE>=1?HEC="O , >65歲每年1次":HEC="X , >65歲未滿1年",theclinic=HE[HE.length-1].clinicName,theclinic=theclinic.replace("彰化基督教醫療財團法人","").replace("秀傳醫療社團法人",""),theclinic.length>12&&(theclinic=theclinic.substring(theclinic.length-12,theclinic.length)),HEC=HEC+","+theclinic+"("+HE[HE.length-1].treatmentDate+")"):HEC="O , >65歲每年1次":age>=40&&age<65?HE.length>1?(LHE=HE[HE.length-1].treatmentDate.split("-")[0],theclinic=HE[HE.length-1].clinicName,theclinic=theclinic.replace("彰化基督教醫療財團法人","").replace("秀傳醫療社團法人",""),nowy-LHE>=3?HEC="O , 40-64歲3年1次"+theclinic+"("+HE[HE.length-1].treatmentDate+")":HEC="X , 40-64歲未滿3年"+theclinic+"("+HE[HE.length-1].treatmentDate+")"):HEC="O , 40-65歲3年1次":age>=30&&age<40?HE.length>1?(LHE=HE[HE.length-1].treatmentDate.split("-")[0],theclinic=HE[HE.length-1].clinicName,theclinic=theclinic.replace("彰化基督教醫療財團法人","").replace("秀傳醫療社團法人",""),nowy-LHE>=5?HEC="O , 30-39歲5年1次"+theclinic+"("+HE[HE.length-1].treatmentDate+")":HEC="X , 30-39歲未滿5年"+theclinic+"("+HE[HE.length-1].treatmentDate+")"):HEC="O , 30-39歲5年1次":HEC="X , <30歲不可成健","2"==gender?age>=30?PA.length>1?(LPA=PA[PA.length-1].treatmentDate.split("-")[0],nowy-LPA>=6?PAC="O , >30歲6年未抹":nowy-LPA>=3&&nowy-LPA<6?PAC="O , >30歲3年未抹":nowy-LPA>=1?PAC="O , >30歲每年1次":nowy-LPA<1&&(PAC="X , >30歲未滿1年"),theclinic=PA[PA.length-1].clinicName,theclinic=theclinic.replace("彰化基督教醫療財團法人","").replace("秀傳醫療社團法人",""),theclinic.length>12&&(theclinic=theclinic.substring(theclinic.length-12,theclinic.length)),PAC=PAC+","+theclinic+"("+PA[PA.length-1].treatmentDate+")"):PAC="O , 不曾抹(首篩)":age>=25&&age<30?PA.length>1?(LPA=PA[PA.length-1].treatmentDate.split("-")[0],nowy-LPA>=6?PAC="O , 25-30歲6年未抹":nowy-LPA>=3&&nowy-LPA<6?PAC="O , 25-30歲3年未抹":nowy-LPA<3&&(PAC="X , 25-30歲未滿3年"),theclinic=PA[PA.length-1].clinicName,theclinic=theclinic.replace("彰化基督教醫療財團法人","").replace("秀傳醫療社團法人",""),theclinic.length>12&&(theclinic=theclinic.substring(theclinic.length-12,theclinic.length)),PAC=PAC+","+theclinic+"("+PA[PA.length-1].treatmentDate+")"):PAC="O , 不曾抹(首篩)":PAC="X , <25歲":PAC="X , 需女性","2"==gender?age>=40&&age<70?MA.length>1?(LMA=MA[MA.length-1].treatmentDate.split("-")[0],nowy-LMA>=2?MAC="O , 40-70歲2年1次":MAC="X , 40-70歲未滿2年",theclinic=MA[MA.length-1].clinicName,theclinic=theclinic.replace("彰化基督教醫療財團法人","").replace("秀傳醫療社團法人",""),theclinic.length>12&&(theclinic=theclinic.substring(theclinic.length-12,theclinic.length)),MAC=MAC+","+theclinic+"("+MA[MA.length-1].treatmentDate+")"):MAC="O , 40-70歲，不曾乳攝(首篩)":age>=70?MAC="X , >70歲":MAC="X , <40歲":MAC="X , 需女性",age>=45&&age<75?FO.length>1?(LFO=FO[FO.length-1].treatmentDate.split("-")[0],nowy-LFO>=2?FOC="O , 45-75歲2年1次":FOC="X , 45-75歲未滿2年",theclinic=FO[FO.length-1].clinicName,theclinic=theclinic.replace("彰化基督教醫療財團法人","").replace("秀傳醫療社團法人",""),theclinic.length>12&&(theclinic=theclinic.substring(theclinic.length-12,theclinic.length)),FOC=FOC+","+theclinic+"("+FO[FO.length-1].treatmentDate+")"):FOC="O , 45-75歲，不曾FOBT(首篩)":age>=75?FOC="X , >75歲":FOC="X , <45歲;40-44歲詢問家族史",age>=30?OR.length>1?(LOR=OR[OR.length-1].treatmentDate.split("-")[0],nowy-LOR>=2?ORC="O , 有菸檳史可":ORC="X , 間隔未滿2年",theclinic=OR[OR.length-1].clinicName,theclinic=theclinic.replace("彰化基督教醫療財團法人","").replace("秀傳醫療社團法人",""),theclinic.length>12&&(theclinic=theclinic.substring(theclinic.length-12,theclinic.length)),ORC=ORC+","+theclinic+"("+OR[OR.length-1].treatmentDate+")"):ORC="O , 有菸檳史可(首篩)":ORC="X , 未滿30歲",msg2="\n成健: "+HEC+"\n腸篩: "+FOC+"\n子抹: "+PAC+"\n乳攝: "+MAC+"\n口篩: "+ORC,prevention_L1=document.getElementById("prevention_L1"),prevention_L1.textContent="成健: "+HEC,prevention_L2=document.getElementById("prevention_L2"),prevention_L2.textContent="腸篩: "+FOC,prevention_L3=document.getElementById("prevention_L3"),prevention_L3.textContent="子抹: "+PAC,prevention_L4=document.getElementById("prevention_L4"),prevention_L4.textContent="乳攝: "+MAC,prevention_L5=document.getElementById("prevention_L5"),prevention_L5.textContent="口篩: "+ORC,furl3="https://phpcis.chshb.gov.tw/api/v1/personal_infos/chronic_cares_histories/list?personalInfoId="+personalInfoId,fetch(furl3,{headers:{"content-type":"application/json"},body:null,method:"GET"}).then(e=>e.text()).then(e=>{res3=JSON.parse(e),DKD={rec:[]},DM={rec:[]},CKD={rec:[]},yearDMC=0,yearDM1=0,DKDC="DKD: 無",DMC="DM: 無",CKDC="CKD: 無",cc=res3.result.chronicCares,strd=document.querySelector("#root > div.wrapper > main > div > form > div:nth-child(2) > div:nth-child(8) > div > div > input").value.split(" ")[1],now=new Date(strd),nowy=strd.split("-")[0];for(let e=0;e<cc.length;e++){let t=cc[cc.length-1-e];if("1"==t.chronicCareType){DM.rec.push(t);let e=t.treatmentDate.split("-")[0];DM.hasOwnProperty(e)||(DM[e]=[]),DM[e].push(t)}else if("2"==t.chronicCareType){CKD.rec.push(t);let e=t.treatmentDate.split("-")[0];CKD.hasOwnProperty(e)||(CKD[e]=[]),CKD[e].push(t)}else"3"==t.chronicCareType&&(0==DKD.rec.length&&(DKD=DM),DKD.rec.push(t),ty=t.treatmentDate.split("-")[0],DKD.hasOwnProperty(ty)||(DKD[ty]=[]),DKD[ty].push(t))}if(DKD.rec.length>0)if(treatmentDate=DKD.rec[DKD.rec.length-1].treatmentDate,date_1=new Date(treatmentDate),date_2=new Date(date_1.getTime()+66528e5),date_e=new Date(1*treatmentDate.split("-")[0]+1+"-"+treatmentDate.split("-")[1]+"-"+treatmentDate.split("-")[2]),now>date_e)DKDC="DKD: X, 超過一年未申報,",DMC="DM: X, 已轉DKD",CKDC="CKD: X, 已轉DKD";else{mky=date_2.getUTCFullYear()-1911,mm0=date_2.getUTCMonth(),mm0+=1,mkm=("00"+mm0).substring(("00"+mm0).length-2,("00"+mm0).length),dd0=date_2.getUTCDate(),mkd=("00"+dd0).substring(("00"+dd0).length-2,("00"+dd0).length),mkdd=mky+mkm+mkd,DKD.hasOwnProperty(nowy)?(yearDMC=DKD[nowy].length,yearDMC<4?now>=date_2?DKDC="DKD: O, 已申報"+yearDMC+"次,":DKDC="DKD: X, 已申報"+yearDMC+"次,":DKDC="DKD: X, 已申報4次，",ly=nowy):(DKD[nowy]=[],now>=date_2?DKDC="DKD: O, 新年度,":DKDC="DKD: X, 新年度,",ly=nowy-1),DKDL="",DKDYC=0,rdkd=DKD.rec.reverse(),rdkd.length>4?rdkdl=4:rdkdl=rdkd.length;for(let e=0;e<rdkdl;e++){let t,n=rdkd[rdkdl-1-e].chronicCareCode;"P1407C"==n?(DKDYC=0,DKDL+="收,"):["P1408C","P1410C","P7001C"].includes(n)?(DKDYC+=1,DKDL+="追,"):["P1409C","P1411C","P7002C"].includes(n)&&(DKDYC=0,DKDL+="年,")}DKDYC<3?DKDC=DKDC+mkdd+"後可申報P7001C,":DKDC=DKDC+mkdd+"後可申報P7002C,",DKDL=DKDL.substring(0,DKDL.length-1),DKDC=DKDC+"("+DKDL+")",DMC="DM: X, 已轉DKD",CKDC="CKD: X, 已轉DKD"}else{if(DM.rec.length>0)if(treatmentDate=DM.rec[DM.rec.length-1].treatmentDate,"P1410C"==DM.rec[DM.rec.length-1].chronicCareCode||"P1411C"==DM.rec[DM.rec.length-1].chronicCareCode?DT=2:DT=1,date_1=new Date(treatmentDate),date_2=new Date(date_1.getTime()+66528e5),date_e=new Date(1*treatmentDate.split("-")[0]+1+"-"+treatmentDate.split("-")[1]+"-"+treatmentDate.split("-")[2]),now>date_e)DMC="DM: X, 超過一年未申報";else{mky=date_2.getUTCFullYear()-1911,mm0=date_2.getUTCMonth(),mm0+=1,mkm=("00"+mm0).substring(("00"+mm0).length-2,("00"+mm0).length),dd0=date_2.getUTCDate(),mkd=("00"+dd0).substring(("00"+dd0).length-2,("00"+dd0).length),mkdd=mky+mkm+mkd,DM.hasOwnProperty(nowy)?(yearDMC=DM[nowy].length,yearDMC<4?now>=date_2?DMC="DM: O, 已申報"+yearDMC+"次,":DMC="DM: X, 已申報"+yearDMC+"次,":DMC+=": X, 今年已申報4次，",ly=nowy):(DM[nowy]=[],now>=date_2?DMC="DM: O, 新年度,":DMC="DM: X, 新年度,",ly=nowy-1),DML="",DMYC=0,rdm=DM.rec.reverse(),rdm.length>4?rdml=4:rdml=rdm.length;for(let e=0;e<rdml;e++){let t,n=rdm[rdml-1-e].chronicCareCode;"P1407C"==n?(DMYC=0,DML+="收,"):["P1408C","P1410C"].includes(n)?(DMYC+=1,DML+="追,"):["P1409C","P1411C"].includes(n)&&(DMYC=0,DML+="年,")}DMYC<3?1==DT?DMC=DMC+mkdd+"後可申報P1408C,":DMC=DMC+mkdd+"後可申報P1410C,":1==DT?DMC=DMC+mkdd+"後可申報P1409C,":DMC=DMC+mkdd+"後可申報P1411C,",DML=DML.substring(0,DML.length-1),DMC=DMC+"("+DML+")"}CKD.rec.length>0&&(treatmentDate=CKD.rec[CKD.rec.length-1].treatmentDate,date_1=new Date(treatmentDate),date_2=new Date(date_1.getTime()+139104e5),date_e=new Date(1*treatmentDate.split("-")[0]+1+"-"+treatmentDate.split("-")[1]+"-"+treatmentDate.split("-")[2]),now>date_e?CKDC="CKD: X, 超過一年未申報":(mky=date_2.getUTCFullYear()-1911,mm0=date_2.getUTCMonth(),mm0+=1,mkm=("00"+mm0).substring(("00"+mm0).length-2,("00"+mm0).length),dd0=date_2.getUTCDate(),mkd=("00"+dd0).substring(("00"+dd0).length-2,("00"+dd0).length),mkdd=mky+mkm+mkd,now>=date_2?CKDC="CKD: O,"+mkdd+"後可申報":CKDC="CKD: X,"+mkdd+"後可申報"))}plan_L1=document.getElementById("plan_L1"),plan_L1.textContent=DKDC,plan_L2=document.getElementById("plan_L2"),plan_L2.textContent=DMC,plan_L3=document.getElementById("plan_L3"),plan_L3.textContent=CKDC,0==document.getElementsByClassName("badge badge-secondary").length&&alert("非2.0掛號");let t=new XMLHttpRequest,n=document.querySelector("#root > div.wrapper > main > div > form > div:nth-child(1) > div:nth-child(2) > div").textContent,i="https://phpcis.chshb.gov.tw/api/v1/notifications/check";t.open("POST",i,!1);let a={action:n,eventType:2};t.setRequestHeader("Content-Type","application/json; charset=utf-8"),t.send(JSON.stringify(a));let r=JSON.parse(t.responseText).result,o="";for(let e=0;e<r.length;e++){let t=r[e],n,i,a;o=o+(e+1)+". "+t.promptWindowContent1+" "+t.notificationGroupName+" "+t.promptWindowContent2+"\n"}""!=o&&alert(o)}).catch(e=>console.log(e))}).catch(e=>console.log(e))}).catch(e=>console.log(e))}else alert("需在看診頁面使用")}function button_HE_handle(){if(cc=document.URL,d1="https://phpcis.chshb.gov.tw/consultationMainPage",cc.includes(d1)){var e=document.querySelector("body > div.fade.modal.show > div > div");if(null!==e)if("新增預防保健資料"==e.children[0].textContent){let e=document.getElementsByClassName("consultationMainPage__value")[10],t=document.getElementsByClassName("consultationMainPage__value")[6],n=document.getElementsByClassName("consultationMainPage__value")[27],i=document.getElementsByClassName("consultationMainPage__value")[2],a=document.getElementsByClassName("consultationMainPage__value")[4],r=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(9) > input[type=checkbox]:nth-child(1)"),o=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(9) > input[type=checkbox]:nth-child(2)"),l=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(9) > input[type=checkbox]:nth-child(3)"),c=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(9) > input[type=checkbox]:nth-child(4)"),d=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(13) > input[type=checkbox]:nth-child(1)"),s=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(13) > input[type=checkbox]:nth-child(2)"),m=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(13) > input[type=checkbox]:nth-child(3)"),u=document.querySelector("#HEHypertension"),h=document.querySelector("#HEDiabetes"),p=document.querySelector("#HEHyperlipidemia"),g=document.querySelector("#HEHeartDisease"),b=document.querySelector("#HEStroke"),_=document.querySelector("#HEKidneyDiseases"),y=document.querySelector("#HEhepatitisB"),C=document.querySelector("#HEhepatitisC"),f=document.querySelector("#HEMentalIllness"),v=document.querySelector("#HECancer"),x=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(16) > input[type=checkbox]:nth-child(3)"),w=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(17) > input[type=checkbox]:nth-child(3)"),D=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(18) > input[type=checkbox]:nth-child(3)"),P=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(9) > input[type=checkbox]:nth-child(1)"),L=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(11) > input[type=checkbox]:nth-child(1)"),I=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(13) > input[type=checkbox]:nth-child(1)"),E=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(15) > input[type=checkbox]:nth-child(3)"),H=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(2) > input[type=number]:nth-child(1)"),k=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(2) > input[type=number]:nth-child(3)"),T=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(1)"),N=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(2)"),S=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(4)"),j=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(4) > input[type=number]"),A=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(6) > input[type=number]:nth-child(2)"),R=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(6) > input[type=number]:nth-child(4)"),B=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(7) > input[type=number]:nth-child(2)"),M=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(7) > input[type=number]:nth-child(4)"),V=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(10) > input[type=checkbox]:nth-child(3)"),O=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(10) > input[type=checkbox]:nth-child(4)"),q=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(3) > input[type=string]"),U=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(5) > input[type=number]"),F=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(6) > input[type=number]"),G=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(7) > input[type=number]"),J=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(8) > input[type=number]"),K=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(9) > input[type=number]"),Y=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(11) > input[type=number]"),X=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(12) > input[type=number]"),z=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(13) > input[type=number]"),W=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(14) > input[type=number]"),Q=document.querySelector("#uricAcid"),Z=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(16) > input[type=checkbox]:nth-child(2)"),$=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(16) > input[type=checkbox]:nth-child(3)"),ee=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(16) > input[type=checkbox]:nth-child(4)"),te=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(17) > input[type=checkbox]:nth-child(2)"),ne=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(17) > input[type=checkbox]:nth-child(3)"),ie=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(17) > input[type=checkbox]:nth-child(4)"),ae=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child(1)"),re=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child(2)"),oe=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child(3)"),le=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child(4)"),ce=document.querySelector("#healthRenalLiteracyEducation"),de=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(3) > input[type=checkbox]:nth-child(2)"),se=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(3) > input[type=checkbox]:nth-child(3)"),me=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(3) > input[type=checkbox]:nth-child(4)"),ue=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(4) > input[type=checkbox]:nth-child(1)"),he=document.querySelector("#healthRiskAssessment"),pe=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(15) > input[type=checkbox]:nth-child(1)"),ge=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(15) > input[type=checkbox]:nth-child(2)"),be=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(15) > input[type=checkbox]:nth-child(3)"),_e=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(16) > input[type=checkbox]:nth-child(1)"),ye=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(16) > input[type=checkbox]:nth-child(2)"),Ce=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(16) > input[type=checkbox]:nth-child(3)"),fe=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(7) > input[type=checkbox]:nth-child(6)"),ve=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(7) > input[type=checkbox]:nth-child(5)"),xe=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(7) > input[type=checkbox]:nth-child(2)"),we=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(7) > input[type=checkbox]:nth-child(1)"),De=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(8) > input[type=checkbox]:nth-child(6)"),Pe=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(8) > input[type=checkbox]:nth-child(5)"),Le=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(8) > input[type=checkbox]:nth-child(2)"),Ie=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(8) > input[type=checkbox]:nth-child(1)"),Ee=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(9) > input[type=checkbox]:nth-child(6)"),He=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(9) > input[type=checkbox]:nth-child(5)"),ke=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(9) > input[type=checkbox]:nth-child(2)"),Te=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(9) > input[type=checkbox]:nth-child(1)"),Ne=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(10) > input[type=checkbox]:nth-child(7)"),Se=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(10) > input[type=checkbox]:nth-child(6)"),je=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(10) > input[type=checkbox]:nth-child(2)"),Ae=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(10) > input[type=checkbox]:nth-child(1)"),Re=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(11) > input[type=checkbox]:nth-child(6)"),Be=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(11) > input[type=checkbox]:nth-child(5)"),Me=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(11) > input[type=checkbox]:nth-child(2)"),Ve=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(11) > input[type=checkbox]:nth-child(1)"),Oe=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(12) > input[type=checkbox]:nth-child(6)"),qe=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(12) > input[type=checkbox]:nth-child(5)"),Ue=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(12) > input[type=checkbox]:nth-child(2)"),Fe=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(12) > input[type=checkbox]:nth-child(1)"),Ge=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(17) > input[type=checkbox]:nth-child(1)"),Je=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(17) > input[type=checkbox]:nth-child(2)"),Ke=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(18) > input[type=checkbox]:nth-child(1)"),Ye=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(18) > input[type=checkbox]:nth-child(2)"),Xe=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(10) > div > span"),ze=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(14) > div > div.buttonContainer > button");GEN=e.textContent,bb=t.textContent,bby=bb.substring(0,4),yyyy=(new Date).getFullYear(),age=yyyy-bby,vd0=n.value,vd=vd0.split(" ")[1].split("-")[0]-1911+"/"+vd0.split(" ")[1].split("-")[1]+"/"+vd0.split(" ")[1].split("-")[2],P_ID=i.textContent,P_NAME=a.textContent,yyy="000"+(bb.split("-")[0]-1911),P_BIR=yyy.substring(yyy.length-3,yyy.length)+"/"+bb.split("-")[1]+"/"+bb.split("-")[2],P_S=4,r.checked?P_S=0:o.checked?P_S=1:l.checked?P_S=2:c.checked&&(P_S=3),4==P_S&&(r.click(),P_S=0),d.checked?P_B=0:s.checked?P_B=1:m.checked&&(P_B=2),P_HTN=u.checked,P_HTN?PP_HTN=1:PP_HTN=0,P_DM=h.checked,P_DM?PP_DM=1:PP_DM=0,P_LIP=p.checked,P_LIP?PP_LIP=1:PP_LIP=0,P_CAD=g.checked,P_CAD?PP_CAD=1:PP_CAD=0,P_CVA=b.checked,P_CVA?PP_CVA=1:PP_CVA=0,P_CKD=_.checked,P_CKD?PP_CKD=1:PP_CKD=0,P_HBV=y.checked,P_HCV=C.checked,P_PSY=f.checked,P_CA=document.querySelector("#HECancer").checked,P_COUGH=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(16) > input[type=checkbox]:nth-child(3)").checked,P_D1=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(17) > input[type=checkbox]:nth-child(3)").checked,P_D2=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(18) > input[type=checkbox]:nth-child(3)").checked,H_smoke=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(9) > input[type=checkbox]:nth-child(1)").checked,H_drink=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(11) > input[type=checkbox]:nth-child(1)").checked,H_betel=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(13) > input[type=checkbox]:nth-child(1)").checked,H_exercise=document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(15) > input[type=checkbox]:nth-child(3)").checked,PE_height=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(2) > input[type=number]:nth-child(1)").value,PE_weight=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(2) > input[type=number]:nth-child(3)").value,PE_SBP=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(1)").value,PE_DBP=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(2)").value,PE_WC=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(4)").value,PE_BMI=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(4) > input[type=number]").value,PE_VR1=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(6) > input[type=number]:nth-child(2)").value,PE_VL1=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(6) > input[type=number]:nth-child(4)").value,PE_VR2=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(7) > input[type=number]:nth-child(2)").value,PE_VL2=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(7) > input[type=number]:nth-child(4)").value,PE_OR1=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(10) > input[type=checkbox]:nth-child(3)").checked,PE_OR2=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(10) > input[type=checkbox]:nth-child(4)").checked,L_UP=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(3) > input[type=string]").value,L_AC=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(5) > input[type=number]").value,L_TC=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(6) > input[type=number]").value,L_TG=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(7) > input[type=number]").value,L_HDL=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(8) > input[type=number]").value,L_LDL=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(9) > input[type=number]").value,L_GOT=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(11) > input[type=number]").value,L_GPT=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(12) > input[type=number]").value,L_CRE=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(13) > input[type=number]").value,L_GFR=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(14) > input[type=number]").value,L_UA=document.querySelector("#uricAcid").value,L_BN=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(16) > input[type=checkbox]:nth-child(2)").checked,L_BP=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(16) > input[type=checkbox]:nth-child(3)").checked,L_NB=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(16) > input[type=checkbox]:nth-child(4)").checked,L_CN=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(17) > input[type=checkbox]:nth-child(2)").checked,L_CP=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(17) > input[type=checkbox]:nth-child(3)").checked,L_NC=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(17) > input[type=checkbox]:nth-child(4)").checked,S_smoke=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child(1)").checked,S_dring=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child(2)").checked,S_betel=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child(3)").checked,S_exer=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child(4)").checked,S_ckd=document.querySelector("#healthRenalLiteracyEducation").checked,S_bw=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(3) > input[type=checkbox]:nth-child(1)").checked,S_diet=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(3) > input[type=checkbox]:nth-child(2)").checked,S_tra=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(3) > input[type=checkbox]:nth-child(3)").checked,S_oral=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(3) > input[type=checkbox]:nth-child(4)").checked,S_risk=document.querySelector("#healthRiskAssessment").checked,S_BN=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(15) > input[type=checkbox]:nth-child(1)").checked,S_BP=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(15) > input[type=checkbox]:nth-child(2)").checked,S_NB=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(15) > input[type=checkbox]:nth-child(3)").checked,S_CN=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(16) > input[type=checkbox]:nth-child(1)").checked,S_CP=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(16) > input[type=checkbox]:nth-child(2)").checked,S_NC=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(16) > input[type=checkbox]:nth-child(3)").checked,L_BN?HBV_status=0:L_BP?HBV_status=1:L_NB&&(HBV_status=2),L_CN?HCV_status=0:L_CP?HCV_status=1:L_NC&&(HCV_status=2),H_smoke==S_smoke&&ae.click(),H_drink==S_dring&&re.click(),H_betel==S_betel&&oe.click(),H_exercise==S_exer&&le.click(),S_ckd||ce.click(),S_risk||he.click(),(PE_BMI>24||GEN.includes("女")&&PE_WC>80||GEN.includes("男")&&PE_WC>90)!==S_bw&&de.click(),0==S_diet&&se.click(),(1==P_PSY||1==P_CVA||PE_VR1<.5&&PE_VR2<.5&&PE_VL1<.5&&PE_VL2<.5)!==S_tra&&me.click(),(1==PE_OR1||1==PE_OR2)!==S_oral&&ue.click(),1==P_HTN||PE_SBP>179||PE_DBP>119?fe.click():PE_SBP>159||PE_DBP>109?ve.click():PE_SBP>134||PE_DBP>84?xe.click():we.click(),1==P_DM||L_AC>199?De.click():L_AC>125?Pe.click():L_AC>100?Le.click():Ie.click(),1==P_LIP||(1==P_DM||1==P_CAD||1==P_CVA)&&L_LDL>100||L_TG>400?Ee.click():L_LDL>190||1==P_HTN&&L_LDL>160?He.click():L_LDL>130||L_TG>150||L_TC>200||GEN.includes("女")&&L_HDL<50||GEN.includes("男")&&L_HDL<40?ke.click():Te.click(),1==P_CKD?Ne.click():L_GFR<60&&L_UP>15?Se.click():L_GFR<60||L_UP>15?je.click():Ae.click(),L_GOT>200||L_GPT>200?Re.click():1!=P_HBV&&1!=P_HCV||!(L_GOT>40||L_GPT>40)?1==P_HBV||1==P_HCV||L_GOT>40||L_GPT>40?Me.click():Ve.click():Be.click(),meta=0,(L_AC>99||1==P_DM)&&(meta+=1),(L_TG>149||1==P_LIP)&&(meta+=1),(PE_SBP>129||PE_DBP>84||1==P_HTN)&&(meta+=1),(GEN.includes("女")&&PE_WC>79||GEN.includes("男")&&PE_WC>89)&&(meta+=1),(GEN.includes("女")&&L_HDL<50||GEN.includes("男")&&L_HDL<40||1==P_LIP)&&(meta+=1),(1==P_HTN||1==P_DM||1==P_LIP)&&meta>2?Oe.click():meta>2?qe.click():meta>0?Ue.click():Fe.click(),L_BN!==S_BN&&pe.click(),L_BP!==S_BP&&ge.click(),L_NB!==S_NB&&be.click(),L_CN!==S_CN&&_e.click(),L_CP!==S_CP&&ye.click(),L_NC!==S_NC&&Ce.click(),1==P_COUGH?Je.click():Ge.click(),1==P_D1||1==P_D2?Ye.click():Ke.click();let We=1*L_GFR,Qe=1*L_UP,Ze="";Ze=We>=60?Qe<15?"0":We>=90?"1":"2":We>=45?"3A":We>=30?"3B":We>=15?"4":"5";let $e=Xe;$e.className="blink",$e.style.background="red",$e.style.color="yellow",$e.textContent="請填入期數 "+Ze;let et=document.getElementById("ckdspant");if(null==et){let e;(et=document.createElement("span")).id="ckdspant",document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(4)").appendChild(et)}et.className="blink",et.style.background="red",et.style.color="yellow",et.textContent="　CKD期數請填入 "+Ze+" 　",ze.click(),document.querySelector("#uncontrolled-tab-example-tab-tab4").click(),addprintbutton()}else alert("預防保健非成健");else document.getElementById("ConsultationMainPage_consultationDropDown").click(),document.getElementsByClassName("alignRight")[0].click()}else alert("請在看診頁面使用")}function button_OR_handle(){if(theurl=document.URL,theurl.includes("https://phpcis.chshb.gov.tw/consultationMainPage/"))if(16==document.getElementsByName("visitTypeId")[1].value)if(null!=document.getElementById("education1")){if(input=prompt("輸入口篩編號\n含4碼問卷跟1-4碼檢查結果"),null!==input){if(changeevent=new Event("change",{bubbles:!0}),document.querySelector("#paymentType").options[1].selected=!0,document.querySelector("#paymentType").dispatchEvent(changeevent),document.querySelector("#OCSLocation").options[2].selected=!0,document.querySelector("#OCSLocation").dispatchEvent(changeevent),document.querySelector("#OCSDivision").options[3].selected=!0,document.querySelector("#OCSDivision").dispatchEvent(changeevent),input=input.toUpperCase(),numbers=input.match(/\d+/g)[0],input1=numbers.substring(0,1),input2=numbers.substring(1,2),input3=numbers.substring(2,3),input4=numbers.substring(3,4),input5=numbers.substring(4,input.length),document.querySelector("#education"+input1).click(),document.querySelector("#OCSBetel"+input2).click(),document.querySelector("#OCSSmoke"+input3).click(),"0"==input4?document.querySelector("#isOCSSymptom").click():document.querySelector("#noOCSSymptom").click(),document.querySelector("#oCSResult"+input5).click(),"0"!=input5){for(words=input.match(/\D+/g)[0],input6=words.toUpperCase(),portionlist=["AU","AD","BL","BR","CR","CL","DR","DL","ER","EL","FR","FL","GR","GL","HR","HL","IR","IL","JR","JL","KR","KL","MR","ML","L"],i=0;i<portionlist.length;i++)document.querySelector("#OCSResultPortion"+portionlist[i]).checked&&document.querySelector("#OCSResultPortion"+portionlist[i]).click();document.querySelector("#OCSResultPortion"+input6).click()}document.getElementById("uncontrolled-tab-example-tab-tab2").click(),document.querySelector("img").scrollIntoView()}}else document.getElementById("ConsultationMainPage_consultationDropDown").click(),document.getElementsByClassName("alignRight")[0].click();else alert("非口篩個案");else alert("非看診畫面")}async function button_goup_handle(){url=document.URL,u2="https://phpcis.chshb.gov.tw/consultationMainPage/",url.includes(u2)?(registrationId=url.split("/")[url.split("/").length-1],furl="https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId="+registrationId+"&type=consultation",await fetch(furl,{headers:{"content-type":"application/json"},body:null,method:"GET"}).then(e=>e.text()).then(e=>{res=JSON.parse(e),visitTypeCode=res.result.visitTypeCode,shiftId=res.result.shiftId,console.log(res.result.shiftId),furl2="https://phpcis.chshb.gov.tw/api/v1/registrations/list?clinicId=4&shiftId="+shiftId,fetch(furl2,{headers:{"content-type":"application/json"},body:null,method:"GET"}).then(e=>e.text()).then(e=>{for(res2=JSON.parse(e),console.log(res2.result.length),find=0,i=0;i<res2.result.length;i++)if(res2.result[i].visitTypeCode==visitTypeCode){if(res2.result[i].registrationId>registrationId)break;res2.result[i].registrationId<registrationId&&(find=1,NregistrationId=res2.result[i].registrationId)}1==find?gotourl("consultationMainPage/"+NregistrationId):alert("shiftId "+shiftId+" 的 "+visitTypeCode+" 身分已到最上一筆")}).catch(e=>console.log(e))}).catch(e=>console.log(e))):alert("非看診頁面")}async function button_godown_handle(){url=document.URL,u2="https://phpcis.chshb.gov.tw/consultationMainPage/",url.includes(u2)?(registrationId=url.split("/")[url.split("/").length-1],furl="https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId="+registrationId+"&type=consultation",await fetch(furl,{headers:{"content-type":"application/json"},body:null,method:"GET"}).then(e=>e.text()).then(e=>{res=JSON.parse(e),visitTypeCode=res.result.visitTypeCode,shiftId=res.result.shiftId,console.log(res.result.shiftId),furl2="https://phpcis.chshb.gov.tw/api/v1/registrations/list?clinicId=4&shiftId="+shiftId,fetch(furl2,{headers:{"content-type":"application/json"},body:null,method:"GET"}).then(e=>e.text()).then(e=>{for(res2=JSON.parse(e),console.log(res2.result.length),find=0,i=0;i<res2.result.length;i++)if(res2.result[i].registrationId>registrationId&&res2.result[i].visitTypeCode==visitTypeCode){find=1,NregistrationId=res2.result[i].registrationId;break}1==find?gotourl("consultationMainPage/"+NregistrationId):alert("shiftId "+shiftId+" 的 "+visitTypeCode+" 身分已到最後一筆")}).catch(e=>console.log(e))}).catch(e=>console.log(e))):alert("非看診頁面")}function button_changetype_handle(){if(cc=document.URL,d1="https://phpcis.chshb.gov.tw/registration/create",d2="https://phpcis.chshb.gov.tw/consultationMainPage/",changeevent=new Event("change",{bubbles:!0}),insite=!1,alllist=[],cc==d1?(alllist=document.getElementsByClassName("form-control ampInput"),theage=age=(new Date).getFullYear()-1911-document.getElementsByClassName("form-control ampInput")[2].value.split("-")[0],insite=!0):cc.includes(d2)&&(alllist=document.getElementsByClassName("form-control consultationMainPage__value"),insite=!0),insite){for(find=!1,i=0;i<alllist.length;i++)"visitTypeId"==alllist[i].id?(targetelement=alllist[i],find=!0):"prevention"==alllist[i].name?targetelement2=alllist[i]:"preventionId"==alllist[i].name&&(targetelement3=alllist[i]);if(find){if(thecode=prompt("請輸入身分別代碼(區分大小寫)\n成健一階:1j或1J\n成健2階:2j或2J\n成健可能須執行2次"),thecode=thecode.toString(),"1j"==thecode||"1J"==thecode)if(cc==d1){for(i=0;i<targetelement.options.length;i++)if(targetelement.options[i].text.includes("69")){targetelement.options[i].selected=!0,targetelement.dispatchEvent(changeevent);break}targetelement2.value="02",targetelement2.dispatchEvent(changeevent),age>64?(targetelement3.value="10",targetelement3.dispatchEvent(changeevent)):(targetelement3.value="8",targetelement3.dispatchEvent(changeevent))}else alert("請在新增掛號時使用");else if("2j"==thecode||"2J"==thecode)if(cc==d1){for(i=0;i<targetelement.options.length;i++)if(targetelement.options[i].text.includes("69")){targetelement.options[i].selected=!0,targetelement.dispatchEvent(changeevent);break}targetelement2.value="02",targetelement2.dispatchEvent(changeevent),age>64?(targetelement3.value="11",targetelement3.dispatchEvent(changeevent)):(targetelement3.value="9",targetelement3.dispatchEvent(changeevent))}else alert("請在新增掛號時使用");else for(i=0;i<targetelement.options.length;i++)if(targetelement.options[i].text.includes(thecode)){targetelement.options[i].selected=!0,targetelement.dispatchEvent(changeevent);break}}else alert("不適用")}else alert("需在掛號頁面或看診頁面")}function button_toHE_handle(){if(ccc=document.URL,ccc.includes("https://phpcis.chshb.gov.tw/consultationMainPage/")){for(sid=document.querySelector("#root > div.wrapper > main > div > form > div:nth-child(1) > div:nth-child(2) > div").textContent,xmlHttp=new XMLHttpRequest,URL="https://phpcis.chshb.gov.tw/api/v1/registrations/list?clinicId=4&personalId="+sid,xmlHttp.open("GET",URL,!1),xmlHttp.send(),uuu=JSON.parse(xmlHttp.responseText),UURL="",i=0;i<uuu.result.length;i++)if(uuu.result[i].personalId==sid&&"預防保健"==uuu.result[i].visitType){UURL="https://phpcis.chshb.gov.tw/consultationMainPage/"+uuu.result[i].registrationId;break}""!=UURL?gotourl(UURL):alert("無成健掛號資料")}else alert("請在看診畫面中使用")}async function button_toOR_handle(){if(ccc=document.URL,ccc.includes("https://phpcis.chshb.gov.tw/consultationMainPage/")){for(sid=document.querySelector("#root > div.wrapper > main > div > form > div:nth-child(1) > div:nth-child(2) > div").textContent,xmlHttp=new XMLHttpRequest,URL="https://phpcis.chshb.gov.tw/api/v1/registrations/list?clinicId=4&personalId="+sid,xmlHttp.open("GET",URL,!1),xmlHttp.send(),uuu=JSON.parse(xmlHttp.responseText),UURL="",i=0;i<uuu.result.length;i++)if(uuu.result[i].personalId==sid&&"6G"==uuu.result[i].visitTypeCode){UURL="https://phpcis.chshb.gov.tw/consultationMainPage/"+uuu.result[i].registrationId;break}""!=UURL?gotourl(UURL):alert("無口篩掛號資料")}else alert("請在看診畫面中使用")}function button_toREG_handle(){if(c=document.URL,na=c.split("/"),n=na[na.length-1],d1="https://phpcis.chshb.gov.tw/registration/",d2="https://phpcis.chshb.gov.tw/populanceConsultation/",d3="https://phpcis.chshb.gov.tw/consultationMainPage/",d4="https://phpcis.chshb.gov.tw/registration",c.includes(d1))gotourl("/consultationMainPage/"+n);else if(c.includes(d2)||c.includes(d3))gotourl("/registration/"+n);else if(c==d4){for(tb=document.getElementsByClassName("table table-striped table-bordered table-sm commonTable ampTableFontSize")[0],find=!1,i=1;i<tb.rows.length;i++)if(tb.rows[i].cells[0].children[0].checked){aaa=tb.rows[i].cells[2].children[0].href.split("/"),regid=aaa[aaa.length-1],find=!0;break}find?gotourl(d3+regid):alert("未選擇個案")}else alert("no")}function button_showdrug_handle(){if(tb=document.getElementsByClassName("table table-striped table-bordered table-condensed consultationMainPageTable commonTable")[0],tbl=tb.rows.length,thecode="",tbl>1)for(i=1;i<tbl;i++)if(tb.rows[i].cells[0].children[0].checked){thecode=tb.rows[i].cells[24].textContent;break}thecode=prompt("藥品代碼",thecode),""!=thecode?(newurl="https://script.google.com/macros/s/AKfycbzVKuBa099524WRQWkMEiwJjJnr0-dGzI6TmRI2yyI4CtXcLraDXHdlVpxSDG6G37X5/exec?code="+thecode,window.open(newurl)):alert("無藥品代碼")}function button_showdata_handle(){let e=document.URL,t=e.split("/")[e.split("/").length-1],n=new XMLHttpRequest,i="https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId="+t;n.open("GET",i,!1),n.setRequestHeader("Content-Type","application/json; charset=UTF-8"),n.send();let a=JSON.parse(n.responseText).result,r=a.personalInfoId,o=a.bureauRecordNo,l=a.personalId,c=a.birthday,d=a.name,s=a.gender,m=a.date,u={};u.personalInfoId=r,u.bureauRecordNo=o,u.personalId=l,u.birthday=c,u.name=d,u.gender=s,u.visitdate=m;let h="https://phpcis.chshb.gov.tw/api/v1/tests/results/personal/health_record_list?personalInfoId="+r;n.open("GET",h,!1),n.setRequestHeader("Content-Type","application/json; charset=UTF-8"),n.send();let p=JSON.parse(n.responseText).result,g=12;g>p.length&&(g=p.length);let b={};for(let e=0;e<g;e++){let t=p[e].treatmentDate,i=p[e].healthRecordId;t in b||(b[t]=[]);let a="https://phpcis.chshb.gov.tw/api/v1/tests/results/personal/list?healthRecordId="+i;n.open("GET",a,!1),n.setRequestHeader("Content-Type","application/json; charset=UTF-8"),n.send();let r=JSON.parse(n.responseText).result;b[t].push(r)}let _={};_.basic=u,_.exam=b,retobjs=JSON.stringify(_);let y=String.raw`
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
            .detailtable td:nth-of-type(3){text-align: center; width: 100px;}
            .detailtable td:nth-of-type(4){text-align: center; width: 100px;}
            .detailtable td:nth-of-type(5){text-align: center; width: 200px;}
            
        </style>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@1.4.0/dist/chartjs-plugin-annotation.min.js"></script>
        <script>
            window.onload=function(){
                let aaa=please_change_me
                let clist={
                    "AC":["21012","22012","25012","27012","09005C001","09140C","21+L1001C005","3D012"],
                    "A1C":["09006C"],
                    "TC":["21016","22016","25016","27016","09001C","21+L1001C006","3D016"],
                    "TG":["21017","22017","25017","27017","09004C","21+L1001C007","3D017"],
                    "HDL":["21019","22019","25019","27019","09043C","21+L1001C008","3D019"],
                    "LDL":["21018","22018","25018","27018","09044C","3D018"],
                    "Cre":["21013","22013","25013","27013","09015C","21+L1001C011","3D013","06chs001"],
                    "eGFR":["21034","22034","25034","27034","Y00001","21+L1001C013","3D034"],
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
                let examobj=inputobj.exam;
                let examdays=Object.keys(examobj);
                examtable.innerHTML="";
                let newrow=document.createElement('tr');
                examtable.appendChild(newrow);
                let th=document.createElement('th');
                th.textContent="日期";
                newrow.appendChild(th);
                let titlelist=["AC","A1C","TC","TG","HDL","LDL","Cre","eGFR","UPCR","UACR","GOT","GPT","UA"]
                let ullist={
                    "AC":[70,100],
                    "A1C":[null,5.6],
                    "TC":[null,200],
                    "TG":[null,150],
                    "HDL":[40,null],
                    "LDL":[null,130],
                    "Cre":[0.8,1.3],
                    "eGFR":[60,null],
                    "UPCR":[null,150],
                    "UACR":[null,30],
                    "GOT":[null,40],
                    "GPT":[null,40],
                    "UA":[null,7]
                }
                if (inputobj.basic.gender=="1"){
                    ullist["HDL"]=[50,null];
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
                        renderLineChart(colres,ullist[titlelist[i]][0],ullist[titlelist[i]][1])
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
                        todetail(examdate,examarray)
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
                        text=text+"UA:"+resa[13]+"\n";
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
                                showrow.Cre=Math.round(testResult*10)/10;
                            }
                            if (clist.eGFR.includes(testcode)){
                                showrow.eGFR=Math.round(testResult*10)/10;
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
                    if (!("eGFR" in showrow)){
                        if ("Cre" in showrow){
                            if (showrow.Cre==""){
                                showrow.eGFR=""
                            } else {
                                let egfr=186*showrow.Cre**(-1.154)*age**(-0.203);
                                if (gend=="女"){
                                    egfr=egfr*0.742;
                                }
                                showrow.eGFR=Math.round(egfr*10)/10;
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
            function todetail(examdate,examarray){
                let examlist={
                    "66": {
                        "code": "66",
                        "name_cht": "孕婦乙型鏈球菌篩檢",
                        "name_eng": "Group B Streptococcus；Streptococcus agalatiae(GBS)",
                        "unit": "-/+",
                        "ref": "No growth"
                    },
                    "21001": {
                        "code": "21001",
                        "name_cht": "身高",
                        "name_eng": "height",
                        "unit": "cm",
                        "ref": ""
                    },
                    "21002": {
                        "code": "21002",
                        "name_cht": "體重",
                        "name_eng": "body weight",
                        "unit": "kg",
                        "ref": ""
                    },
                    "21003": {
                        "code": "21003",
                        "name_cht": "脈搏",
                        "name_eng": "pulse",
                        "unit": "次/分鐘",
                        "ref": ""
                    },
                    "21004": {
                        "code": "21004",
                        "name_cht": "收縮壓",
                        "name_eng": "Systolic pressure",
                        "unit": "mmHg",
                        "ref": "<130"
                    },
                    "21005": {
                        "code": "21005",
                        "name_cht": "舒張壓",
                        "name_eng": "Diastolic pressure",
                        "unit": "mmHg",
                        "ref": "<80"
                    },
                    "21006": {
                        "code": "21006",
                        "name_cht": "腰圍",
                        "name_eng": "Waistline",
                        "unit": "cm",
                        "ref": ""
                    },
                    "21007": {
                        "code": "21007",
                        "name_cht": "身體質量指數",
                        "name_eng": "Body Mass Index",
                        "unit": "",
                        "ref": ""
                    },
                    "21008": {
                        "code": "21008",
                        "name_cht": "裸視[右眼]",
                        "name_eng": "bare eyesight(right)",
                        "unit": "",
                        "ref": ""
                    },
                    "21009": {
                        "code": "21009",
                        "name_cht": "裸視[左眼]",
                        "name_eng": "bare eyesight(left)",
                        "unit": "",
                        "ref": ""
                    },
                    "21010": {
                        "code": "21010",
                        "name_cht": "矯正[右眼]",
                        "name_eng": "corrected vision(right)",
                        "unit": "",
                        "ref": ""
                    },
                    "21011": {
                        "code": "21011",
                        "name_cht": "矯正[左眼]",
                        "name_eng": "corrected vision(left)",
                        "unit": "",
                        "ref": ""
                    },
                    "21012": {
                        "code": "21012",
                        "name_cht": "血液及體液葡萄糖",
                        "name_eng": "Glucose",
                        "unit": "mg/dL",
                        "ref": "70-100"
                    },
                    "21013": {
                        "code": "21013",
                        "name_cht": "肌酸酐、血",
                        "name_eng": "Creatinine (B) CRTN",
                        "unit": "mg/dL",
                        "ref": "0.5-1.3"
                    },
                    "21014": {
                        "code": "21014",
                        "name_cht": "血清麩胺酸苯醋酸轉氨基酶",
                        "name_eng": "S-GOT/AST",
                        "unit": "IU/L",
                        "ref": "<40"
                    },
                    "21015": {
                        "code": "21015",
                        "name_cht": "血清麩胺酸丙酮酸轉氨基酶",
                        "name_eng": "S-GPT/ALT",
                        "unit": "IU/L",
                        "ref": "<40"
                    },
                    "21016": {
                        "code": "21016",
                        "name_cht": "總膽固醇",
                        "name_eng": "Cholestero1,total",
                        "unit": "mg/dL",
                        "ref": "<200"
                    },
                    "21017": {
                        "code": "21017",
                        "name_cht": "三酸甘油脂",
                        "name_eng": "Triglyceride (TG)",
                        "unit": "mg/dL",
                        "ref": "<150"
                    },
                    "21018": {
                        "code": "21018",
                        "name_cht": "低密度脂蛋白－膽固醇",
                        "name_eng": "LDL-C(Lowdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "<130"
                    },
                    "21019": {
                        "code": "21019",
                        "name_cht": "高密度脂蛋白－膽固醇",
                        "name_eng": "HDL-C(highdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "男:≥40；女:≥50"
                    },
                    "21020": {
                        "code": "21020",
                        "name_cht": "總膽固醇/高密度脂蛋白膽固醇比",
                        "name_eng": "Cholestero1,total/HDL-C ratio",
                        "unit": "*",
                        "ref": "<5"
                    },
                    "21021": {
                        "code": "21021",
                        "name_cht": "低密度/高密度脂蛋白膽固醇比",
                        "name_eng": "LDL-C/HDL-C ratio",
                        "unit": "*",
                        "ref": ""
                    },
                    "21022": {
                        "code": "21022",
                        "name_cht": "顏色",
                        "name_eng": "color",
                        "unit": "Yellow",
                        "ref": "Yellow"
                    },
                    "21023": {
                        "code": "21023",
                        "name_cht": "混濁度",
                        "name_eng": "turbidity",
                        "unit": "Clear",
                        "ref": "Clear"
                    },
                    "21024": {
                        "code": "21024",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "21025": {
                        "code": "21025",
                        "name_cht": "尿糖",
                        "name_eng": "Urine sugar",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "21026": {
                        "code": "21026",
                        "name_cht": "酸鹼度反應",
                        "name_eng": "pH",
                        "unit": "-",
                        "ref": "5.5 ~ 7.5"
                    },
                    "21027": {
                        "code": "21027",
                        "name_cht": "尿潛血",
                        "name_eng": "Urine occult blood",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "21028": {
                        "code": "21028",
                        "name_cht": "尿紅血球",
                        "name_eng": "Urine R.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF"
                    },
                    "21029": {
                        "code": "21029",
                        "name_cht": "尿白血球",
                        "name_eng": "Urine W.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF"
                    },
                    "21030": {
                        "code": "21030",
                        "name_cht": "尿上皮細胞",
                        "name_eng": "Urine Epithelium",
                        "unit": "cells/HPF",
                        "ref": "< 3 /HPF"
                    },
                    "21031": {
                        "code": "21031",
                        "name_cht": "尿圓柱體",
                        "name_eng": "Urine Cast",
                        "unit": "(-)/LPF",
                        "ref": "Negative"
                    },
                    "21032": {
                        "code": "21032",
                        "name_cht": "尿細菌",
                        "name_eng": "Urine Bacteria",
                        "unit": "HPF",
                        "ref": "Negative"
                    },
                    "21033": {
                        "code": "21033",
                        "name_cht": "肌酐、尿",
                        "name_eng": "Creatinine (U) CRTN",
                        "unit": "mg/dL",
                        "ref": "60-250"
                    },
                    "21034": {
                        "code": "21034",
                        "name_cht": "腎絲球過濾率計算",
                        "name_eng": "eGFR",
                        "unit": "ml/min/1.73m^2",
                        "ref": ""
                    },
                    "21035": {
                        "code": "21035",
                        "name_cht": "尿液總蛋白／肌酐、尿比值",
                        "name_eng": "U PCR",
                        "unit": "mg/gm",
                        "ref": "<150"
                    },
                    "21036": {
                        "code": "21036",
                        "name_cht": "慢性腎臟病期數",
                        "name_eng": "CKD Stage",
                        "unit": "",
                        "ref": "第一~三期：輕度到中度腎功能衰竭；第四期：重度腎功能衰竭；第五期：末期腎臟病變"
                    },
                    "21037": {
                        "code": "21037",
                        "name_cht": "骨質密度",
                        "name_eng": "BMD",
                        "unit": "",
                        "ref": ""
                    },
                    "21038": {
                        "code": "21038",
                        "name_cht": "尿酸、血",
                        "name_eng": "Uric acid",
                        "unit": "mg/dL",
                        "ref": "<7"
                    },
                    "22001": {
                        "code": "22001",
                        "name_cht": "身高",
                        "name_eng": "height",
                        "unit": "cm",
                        "ref": ""
                    },
                    "22002": {
                        "code": "22002",
                        "name_cht": "體重",
                        "name_eng": "body weight",
                        "unit": "kg",
                        "ref": ""
                    },
                    "22003": {
                        "code": "22003",
                        "name_cht": "脈搏",
                        "name_eng": "pulse",
                        "unit": "次/分鐘",
                        "ref": ""
                    },
                    "22004": {
                        "code": "22004",
                        "name_cht": "收縮壓",
                        "name_eng": "Systolic pressure",
                        "unit": "mmHg",
                        "ref": "<130"
                    },
                    "22005": {
                        "code": "22005",
                        "name_cht": "舒張壓",
                        "name_eng": "Diastolic pressure",
                        "unit": "mmHg",
                        "ref": "<80"
                    },
                    "22006": {
                        "code": "22006",
                        "name_cht": "腰圍",
                        "name_eng": "Waistline",
                        "unit": "cm",
                        "ref": ""
                    },
                    "22007": {
                        "code": "22007",
                        "name_cht": "身體質量指數",
                        "name_eng": "Body Mass Index",
                        "unit": "",
                        "ref": ""
                    },
                    "22008": {
                        "code": "22008",
                        "name_cht": "裸視[右眼]",
                        "name_eng": "bare eyesight(right)",
                        "unit": "",
                        "ref": ""
                    },
                    "22009": {
                        "code": "22009",
                        "name_cht": "裸視[左眼]",
                        "name_eng": "bare eyesight(left)",
                        "unit": "",
                        "ref": ""
                    },
                    "22010": {
                        "code": "22010",
                        "name_cht": "矯正[右眼]",
                        "name_eng": "corrected vision(right)",
                        "unit": "",
                        "ref": ""
                    },
                    "22011": {
                        "code": "22011",
                        "name_cht": "矯正[左眼]",
                        "name_eng": "corrected vision(left)",
                        "unit": "",
                        "ref": ""
                    },
                    "22012": {
                        "code": "22012",
                        "name_cht": "血液及體液葡萄糖",
                        "name_eng": "Glucose",
                        "unit": "mg/dL",
                        "ref": "70-100"
                    },
                    "22013": {
                        "code": "22013",
                        "name_cht": "肌酸酐、血",
                        "name_eng": "Creatinine (B) CRTN",
                        "unit": "mg/dL",
                        "ref": "0.5-1.3"
                    },
                    "22014": {
                        "code": "22014",
                        "name_cht": "血清麩胺酸苯醋酸轉氨基酶",
                        "name_eng": "S-GOT/AST",
                        "unit": "IU/L",
                        "ref": "<40"
                    },
                    "22015": {
                        "code": "22015",
                        "name_cht": "血清麩胺酸丙酮酸轉氨基酶",
                        "name_eng": "S-GPT/ALT",
                        "unit": "IU/L",
                        "ref": "<40"
                    },
                    "22016": {
                        "code": "22016",
                        "name_cht": "總膽固醇",
                        "name_eng": "Cholestero1,total",
                        "unit": "mg/dL",
                        "ref": "<200"
                    },
                    "22017": {
                        "code": "22017",
                        "name_cht": "三酸甘油脂",
                        "name_eng": "Triglyceride (TG)",
                        "unit": "mg/dL",
                        "ref": "<150"
                    },
                    "22018": {
                        "code": "22018",
                        "name_cht": "低密度脂蛋白－膽固醇",
                        "name_eng": "LDL-C(Lowdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "<130"
                    },
                    "22019": {
                        "code": "22019",
                        "name_cht": "高密度脂蛋白－膽固醇",
                        "name_eng": "HDL-C(highdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "男:≥40；女:≥50"
                    },
                    "22020": {
                        "code": "22020",
                        "name_cht": "總膽固醇/高密度脂蛋白膽固醇比",
                        "name_eng": "Cholestero1,total/HDL-C ratio",
                        "unit": "*",
                        "ref": "<5"
                    },
                    "22021": {
                        "code": "22021",
                        "name_cht": "低密度/高密度脂蛋白膽固醇比",
                        "name_eng": "LDL-C/HDL-C ratio",
                        "unit": "*",
                        "ref": ""
                    },
                    "22022": {
                        "code": "22022",
                        "name_cht": "顏色",
                        "name_eng": "color",
                        "unit": "Yellow",
                        "ref": "Yellow"
                    },
                    "22023": {
                        "code": "22023",
                        "name_cht": "混濁度",
                        "name_eng": "turbidity",
                        "unit": "Clear",
                        "ref": "Clear"
                    },
                    "22024": {
                        "code": "22024",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "22025": {
                        "code": "22025",
                        "name_cht": "尿糖",
                        "name_eng": "Urine sugar",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "22026": {
                        "code": "22026",
                        "name_cht": "酸鹼度反應",
                        "name_eng": "pH",
                        "unit": "-",
                        "ref": "5.5 ~ 7.5"
                    },
                    "22027": {
                        "code": "22027",
                        "name_cht": "尿潛血",
                        "name_eng": "Urine occult blood",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "22028": {
                        "code": "22028",
                        "name_cht": "尿紅血球",
                        "name_eng": "Urine R.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF"
                    },
                    "22029": {
                        "code": "22029",
                        "name_cht": "尿白血球",
                        "name_eng": "Urine W.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF"
                    },
                    "22030": {
                        "code": "22030",
                        "name_cht": "尿上皮細胞",
                        "name_eng": "Urine Epithelium",
                        "unit": "cells/HPF",
                        "ref": "< 3 /HPF"
                    },
                    "22031": {
                        "code": "22031",
                        "name_cht": "尿圓柱體",
                        "name_eng": "Urine Cast",
                        "unit": "(-)/LPF",
                        "ref": "Negative"
                    },
                    "22032": {
                        "code": "22032",
                        "name_cht": "尿細菌",
                        "name_eng": "Urine Bacteria",
                        "unit": "HPF",
                        "ref": "Negative"
                    },
                    "22033": {
                        "code": "22033",
                        "name_cht": "肌酐、尿",
                        "name_eng": "Creatinine (U) CRTN",
                        "unit": "mg/dL",
                        "ref": "60-250"
                    },
                    "22034": {
                        "code": "22034",
                        "name_cht": "腎絲球過濾率計算",
                        "name_eng": "eGFR",
                        "unit": "ml/min/1.73m^2",
                        "ref": ""
                    },
                    "22035": {
                        "code": "22035",
                        "name_cht": "尿液總蛋白／肌酐、尿比值",
                        "name_eng": "U PCR",
                        "unit": "mg/gm",
                        "ref": "<150"
                    },
                    "22036": {
                        "code": "22036",
                        "name_cht": "慢性腎臟病期數",
                        "name_eng": "CKD Stage",
                        "unit": "",
                        "ref": "第0期：正常"
                    },
                    "22037": {
                        "code": "22037",
                        "name_cht": "骨質密度",
                        "name_eng": "BMD",
                        "unit": "",
                        "ref": ""
                    },
                    "22038": {
                        "code": "22038",
                        "name_cht": "尿酸、血",
                        "name_eng": "Uric acid",
                        "unit": "mg/dL",
                        "ref": "<7"
                    },
                    "25001": {
                        "code": "25001",
                        "name_cht": "身高",
                        "name_eng": "height",
                        "unit": "cm",
                        "ref": ""
                    },
                    "25002": {
                        "code": "25002",
                        "name_cht": "體重",
                        "name_eng": "body weight",
                        "unit": "kg",
                        "ref": ""
                    },
                    "25003": {
                        "code": "25003",
                        "name_cht": "脈搏",
                        "name_eng": "pulse",
                        "unit": "次/分鐘",
                        "ref": ""
                    },
                    "25004": {
                        "code": "25004",
                        "name_cht": "收縮壓",
                        "name_eng": "Systolic pressure",
                        "unit": "mmHg",
                        "ref": "<130"
                    },
                    "25005": {
                        "code": "25005",
                        "name_cht": "舒張壓",
                        "name_eng": "Diastolic pressure",
                        "unit": "mmHg",
                        "ref": "<80"
                    },
                    "25006": {
                        "code": "25006",
                        "name_cht": "腰圍",
                        "name_eng": "Waistline",
                        "unit": "cm",
                        "ref": ""
                    },
                    "25007": {
                        "code": "25007",
                        "name_cht": "身體質量指數",
                        "name_eng": "Body Mass Index",
                        "unit": "",
                        "ref": ""
                    },
                    "25008": {
                        "code": "25008",
                        "name_cht": "裸視[右眼]",
                        "name_eng": "bare eyesight(right)",
                        "unit": "",
                        "ref": ""
                    },
                    "25009": {
                        "code": "25009",
                        "name_cht": "裸視[左眼]",
                        "name_eng": "bare eyesight(left)",
                        "unit": "",
                        "ref": ""
                    },
                    "25010": {
                        "code": "25010",
                        "name_cht": "矯正[右眼]",
                        "name_eng": "corrected vision(right)",
                        "unit": "",
                        "ref": ""
                    },
                    "25011": {
                        "code": "25011",
                        "name_cht": "矯正[左眼]",
                        "name_eng": "corrected vision(left)",
                        "unit": "",
                        "ref": ""
                    },
                    "25012": {
                        "code": "25012",
                        "name_cht": "血液及體液葡萄糖",
                        "name_eng": "Glucose",
                        "unit": "mg/dL",
                        "ref": "70-100"
                    },
                    "25013": {
                        "code": "25013",
                        "name_cht": "肌酸酐、血",
                        "name_eng": "Creatinine (B) CRTN",
                        "unit": "mg/dL",
                        "ref": "0.5-1.3"
                    },
                    "25014": {
                        "code": "25014",
                        "name_cht": "血清麩胺酸苯醋酸轉氨基酶",
                        "name_eng": "S-GOT/AST",
                        "unit": "IU/L",
                        "ref": "<40"
                    },
                    "25015": {
                        "code": "25015",
                        "name_cht": "血清麩胺酸丙酮酸轉氨基酶",
                        "name_eng": "S-GPT/ALT",
                        "unit": "IU/L",
                        "ref": "<40"
                    },
                    "25016": {
                        "code": "25016",
                        "name_cht": "總膽固醇",
                        "name_eng": "Cholestero1,total",
                        "unit": "mg/dL",
                        "ref": "<200"
                    },
                    "25017": {
                        "code": "25017",
                        "name_cht": "三酸甘油脂",
                        "name_eng": "Triglyceride (TG)",
                        "unit": "mg/dL",
                        "ref": "<150"
                    },
                    "25018": {
                        "code": "25018",
                        "name_cht": "低密度脂蛋白－膽固醇",
                        "name_eng": "LDL-C(Lowdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "<130"
                    },
                    "25019": {
                        "code": "25019",
                        "name_cht": "高密度脂蛋白－膽固醇",
                        "name_eng": "HDL-C(highdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "男:≥40；女:≥50"
                    },
                    "25020": {
                        "code": "25020",
                        "name_cht": "總膽固醇/高密度脂蛋白膽固醇比",
                        "name_eng": "Cholestero1,total/HDL-C ratio",
                        "unit": "*",
                        "ref": "<5"
                    },
                    "25021": {
                        "code": "25021",
                        "name_cht": "低密度/高密度脂蛋白膽固醇比",
                        "name_eng": "LDL-C/HDL-C ratio",
                        "unit": "*",
                        "ref": ""
                    },
                    "25022": {
                        "code": "25022",
                        "name_cht": "顏色",
                        "name_eng": "color",
                        "unit": "Yellow",
                        "ref": "Yellow"
                    },
                    "25023": {
                        "code": "25023",
                        "name_cht": "混濁度",
                        "name_eng": "turbidity",
                        "unit": "Clear",
                        "ref": "Clear"
                    },
                    "25024": {
                        "code": "25024",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "25025": {
                        "code": "25025",
                        "name_cht": "尿糖",
                        "name_eng": "Urine sugar",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "25026": {
                        "code": "25026",
                        "name_cht": "酸鹼度反應",
                        "name_eng": "pH",
                        "unit": "-",
                        "ref": "5.5 ~ 7.5"
                    },
                    "25027": {
                        "code": "25027",
                        "name_cht": "尿潛血",
                        "name_eng": "Urine occult blood",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "25028": {
                        "code": "25028",
                        "name_cht": "尿紅血球",
                        "name_eng": "Urine R.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF"
                    },
                    "25029": {
                        "code": "25029",
                        "name_cht": "尿白血球",
                        "name_eng": "Urine W.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF"
                    },
                    "25030": {
                        "code": "25030",
                        "name_cht": "尿上皮細胞",
                        "name_eng": "Urine Epithelium",
                        "unit": "cells/HPF",
                        "ref": "< 3 /HPF"
                    },
                    "25031": {
                        "code": "25031",
                        "name_cht": "尿圓柱體",
                        "name_eng": "Urine Cast",
                        "unit": "(-)/LPF",
                        "ref": "Negative"
                    },
                    "25032": {
                        "code": "25032",
                        "name_cht": "尿細菌",
                        "name_eng": "Urine Bacteria",
                        "unit": "HPF",
                        "ref": "Negative"
                    },
                    "25033": {
                        "code": "25033",
                        "name_cht": "肌酐、尿",
                        "name_eng": "Creatinine (U) CRTN",
                        "unit": "mg/dL",
                        "ref": "60-250"
                    },
                    "25034": {
                        "code": "25034",
                        "name_cht": "腎絲球過濾率計算",
                        "name_eng": "eGFR",
                        "unit": "ml/min/1.73m^2",
                        "ref": ""
                    },
                    "25035": {
                        "code": "25035",
                        "name_cht": "尿液總蛋白／肌酐、尿比值",
                        "name_eng": "U PCR",
                        "unit": "mg/gm",
                        "ref": "<150"
                    },
                    "25036": {
                        "code": "25036",
                        "name_cht": "慢性腎臟病期數",
                        "name_eng": "CKD Stage",
                        "unit": "",
                        "ref": "第0期：正常"
                    },
                    "25037": {
                        "code": "25037",
                        "name_cht": "骨質密度",
                        "name_eng": "BMD",
                        "unit": "",
                        "ref": ""
                    },
                    "25038": {
                        "code": "25038",
                        "name_cht": "尿酸、血",
                        "name_eng": "Uric acid",
                        "unit": "mg/dL",
                        "ref": "<7"
                    },
                    "27001": {
                        "code": "27001",
                        "name_cht": "身高",
                        "name_eng": "height",
                        "unit": "cm",
                        "ref": ""
                    },
                    "27002": {
                        "code": "27002",
                        "name_cht": "體重",
                        "name_eng": "body weight",
                        "unit": "kg",
                        "ref": ""
                    },
                    "27003": {
                        "code": "27003",
                        "name_cht": "脈搏",
                        "name_eng": "pulse",
                        "unit": "次/分鐘",
                        "ref": ""
                    },
                    "27004": {
                        "code": "27004",
                        "name_cht": "收縮壓",
                        "name_eng": "Systolic pressure",
                        "unit": "mmHg",
                        "ref": "<130"
                    },
                    "27005": {
                        "code": "27005",
                        "name_cht": "舒張壓",
                        "name_eng": "Diastolic pressure",
                        "unit": "mmHg",
                        "ref": "<80"
                    },
                    "27006": {
                        "code": "27006",
                        "name_cht": "腰圍",
                        "name_eng": "Waistline",
                        "unit": "cm",
                        "ref": ""
                    },
                    "27007": {
                        "code": "27007",
                        "name_cht": "身體質量指數",
                        "name_eng": "Body Mass Index",
                        "unit": "",
                        "ref": ""
                    },
                    "27008": {
                        "code": "27008",
                        "name_cht": "裸視[右眼]",
                        "name_eng": "bare eyesight(right)",
                        "unit": "",
                        "ref": ""
                    },
                    "27009": {
                        "code": "27009",
                        "name_cht": "裸視[左眼]",
                        "name_eng": "bare eyesight(left)",
                        "unit": "",
                        "ref": ""
                    },
                    "27010": {
                        "code": "27010",
                        "name_cht": "矯正[右眼]",
                        "name_eng": "corrected vision(right)",
                        "unit": "",
                        "ref": ""
                    },
                    "27011": {
                        "code": "27011",
                        "name_cht": "矯正[左眼]",
                        "name_eng": "corrected vision(left)",
                        "unit": "",
                        "ref": ""
                    },
                    "27012": {
                        "code": "27012",
                        "name_cht": "血液及體液葡萄糖",
                        "name_eng": "Glucose",
                        "unit": "mg/dL",
                        "ref": "70-100"
                    },
                    "27013": {
                        "code": "27013",
                        "name_cht": "肌酸酐、血",
                        "name_eng": "Creatinine (B) CRTN",
                        "unit": "mg/dL",
                        "ref": "0.5-1.3"
                    },
                    "27014": {
                        "code": "27014",
                        "name_cht": "血清麩胺酸苯醋酸轉氨基酶",
                        "name_eng": "S-GOT/AST",
                        "unit": "IU/L",
                        "ref": "<40"
                    },
                    "27015": {
                        "code": "27015",
                        "name_cht": "血清麩胺酸丙酮酸轉氨基酶",
                        "name_eng": "S-GPT/ALT",
                        "unit": "IU/L",
                        "ref": "<40"
                    },
                    "27016": {
                        "code": "27016",
                        "name_cht": "總膽固醇",
                        "name_eng": "Cholestero1,total",
                        "unit": "mg/dL",
                        "ref": "<200"
                    },
                    "27017": {
                        "code": "27017",
                        "name_cht": "三酸甘油脂",
                        "name_eng": "Triglyceride (TG)",
                        "unit": "mg/dL",
                        "ref": "<150"
                    },
                    "27018": {
                        "code": "27018",
                        "name_cht": "低密度脂蛋白－膽固醇",
                        "name_eng": "LDL-C(Lowdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "<130"
                    },
                    "27019": {
                        "code": "27019",
                        "name_cht": "高密度脂蛋白－膽固醇",
                        "name_eng": "HDL-C(highdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "男:≥40；女:≥50"
                    },
                    "27020": {
                        "code": "27020",
                        "name_cht": "總膽固醇/高密度脂蛋白膽固醇比",
                        "name_eng": "Cholestero1,total/HDL-C ratio",
                        "unit": "*",
                        "ref": "<5"
                    },
                    "27021": {
                        "code": "27021",
                        "name_cht": "低密度/高密度脂蛋白膽固醇比",
                        "name_eng": "LDL-C/HDL-C ratio",
                        "unit": "*",
                        "ref": ""
                    },
                    "27022": {
                        "code": "27022",
                        "name_cht": "顏色",
                        "name_eng": "color",
                        "unit": "Yellow",
                        "ref": "Yellow"
                    },
                    "27023": {
                        "code": "27023",
                        "name_cht": "混濁度",
                        "name_eng": "turbidity",
                        "unit": "Clear",
                        "ref": "Clear"
                    },
                    "27024": {
                        "code": "27024",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "27025": {
                        "code": "27025",
                        "name_cht": "尿糖",
                        "name_eng": "Urine sugar",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "27026": {
                        "code": "27026",
                        "name_cht": "酸鹼度反應",
                        "name_eng": "pH",
                        "unit": "*",
                        "ref": "5.5 ~ 7.5"
                    },
                    "27027": {
                        "code": "27027",
                        "name_cht": "尿潛血",
                        "name_eng": "Urine occult blood",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "27028": {
                        "code": "27028",
                        "name_cht": "尿紅血球",
                        "name_eng": "Urine R.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF"
                    },
                    "27029": {
                        "code": "27029",
                        "name_cht": "尿白血球",
                        "name_eng": "Urine W.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF"
                    },
                    "27030": {
                        "code": "27030",
                        "name_cht": "尿上皮細胞",
                        "name_eng": "Urine Epithelium",
                        "unit": "cells/HPF",
                        "ref": "< 3 /HPF"
                    },
                    "27031": {
                        "code": "27031",
                        "name_cht": "尿圓柱體",
                        "name_eng": "Urine Cast",
                        "unit": "(-)/LPF",
                        "ref": "Negative"
                    },
                    "27032": {
                        "code": "27032",
                        "name_cht": "尿細菌",
                        "name_eng": "Urine Bacteria",
                        "unit": "HPF",
                        "ref": "Negative"
                    },
                    "27033": {
                        "code": "27033",
                        "name_cht": "肌酐、尿",
                        "name_eng": "Creatinine (U) CRTN",
                        "unit": "mg/dL",
                        "ref": "60-250"
                    },
                    "27034": {
                        "code": "27034",
                        "name_cht": "腎絲球過濾率計算",
                        "name_eng": "eGFR",
                        "unit": "ml/min/1.73m^2",
                        "ref": ""
                    },
                    "27035": {
                        "code": "27035",
                        "name_cht": "尿液總蛋白／肌酐、尿比值",
                        "name_eng": "U PCR",
                        "unit": "mg/gm",
                        "ref": "<150"
                    },
                    "27036": {
                        "code": "27036",
                        "name_cht": "慢性腎臟病期數",
                        "name_eng": "CKD Stage",
                        "unit": "",
                        "ref": "第0期：正常"
                    },
                    "27037": {
                        "code": "27037",
                        "name_cht": "骨質密度",
                        "name_eng": "BMD",
                        "unit": "",
                        "ref": ""
                    },
                    "27038": {
                        "code": "27038",
                        "name_cht": "尿酸、血",
                        "name_eng": "Uric acid",
                        "unit": "mg/dL",
                        "ref": "<7"
                    },
                    "檢驗代碼": {
                        "code": "檢驗代碼",
                        "name_cht": "診療細項",
                        "name_eng": "細項英文名稱",
                        "unit": "檢驗值單位",
                        "ref": "檢驗參考值"
                    },
                    "06001C": {
                        "code": "06001C",
                        "name_cht": "酸鹼度反應",
                        "name_eng": "pH",
                        "unit": "*",
                        "ref": "5.5 ~ 7.5"
                    },
                    "06002C": {
                        "code": "06002C",
                        "name_cht": "比重檢驗",
                        "name_eng": "Sp.gr (specific gravity)",
                        "unit": "-",
                        "ref": "1.010 ~ 1.025"
                    },
                    "06003C": {
                        "code": "06003C",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "09040C001": {
                        "code": "09040C001",
                        "name_cht": "尿液總蛋白質定量檢查",
                        "name_eng": "Urine Total protein",
                        "unit": "mg/dL",
                        "ref": "6.0-8.3"
                    },
                    "06004C": {
                        "code": "06004C",
                        "name_cht": "尿糖",
                        "name_eng": "Urine sugar",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06005C": {
                        "code": "06005C",
                        "name_cht": "尿膽素原",
                        "name_eng": "Urine urobilinogen",
                        "unit": "EU/dL",
                        "ref": "0.1-1.0"
                    },
                    "06006C": {
                        "code": "06006C",
                        "name_cht": "尿膽紅素",
                        "name_eng": "Urine bilirubin",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06007C": {
                        "code": "06007C",
                        "name_cht": "尿酮體",
                        "name_eng": "Ketone body",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06008C": {
                        "code": "06008C",
                        "name_cht": "班尼迪克特反應",
                        "name_eng": "Benedict reaction",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06009C001": {
                        "code": "06009C001",
                        "name_cht": "尿紅血球",
                        "name_eng": "Urine R.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF"
                    },
                    "06009C002": {
                        "code": "06009C002",
                        "name_cht": "尿白血球",
                        "name_eng": "Urine W.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF"
                    },
                    "06009C003": {
                        "code": "06009C003",
                        "name_cht": "尿上皮細胞",
                        "name_eng": "Urine Epithelium",
                        "unit": "cells/HPF",
                        "ref": "< 3 /HPF"
                    },
                    "06009C004": {
                        "code": "06009C004",
                        "name_cht": "尿圓柱體",
                        "name_eng": "Urine Cast",
                        "unit": "(-)/LPF",
                        "ref": "Negative"
                    },
                    "06009C005": {
                        "code": "06009C005",
                        "name_cht": "尿結晶體",
                        "name_eng": "Urine Crystal",
                        "unit": "HPF",
                        "ref": "Negative"
                    },
                    "06009C006": {
                        "code": "06009C006",
                        "name_cht": "尿細菌",
                        "name_eng": "Urine Bacteria",
                        "unit": "HPF",
                        "ref": "Negative"
                    },
                    "06009C007": {
                        "code": "06009C007",
                        "name_cht": "尿寄生蟲",
                        "name_eng": "Urine Parasite",
                        "unit": "HPF",
                        "ref": "N.F"
                    },
                    "06009C008": {
                        "code": "06009C008",
                        "name_cht": "尿黏液絲狀",
                        "name_eng": "Urine Mucous",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06009C009": {
                        "code": "06009C009",
                        "name_cht": "其它",
                        "name_eng": "Others",
                        "unit": "",
                        "ref": ""
                    },
                    "06009C010": {
                        "code": "06009C010",
                        "name_cht": "鹽類",
                        "name_eng": "Salts",
                        "unit": "",
                        "ref": ""
                    },
                    "06012C001": {
                        "code": "06012C001",
                        "name_cht": "尿顏色",
                        "name_eng": "color",
                        "unit": "Yellow",
                        "ref": "Yellow"
                    },
                    "06012C002": {
                        "code": "06012C002",
                        "name_cht": "尿混濁度",
                        "name_eng": "turbidity",
                        "unit": "Clear",
                        "ref": "Clear"
                    },
                    "06012C003": {
                        "code": "06012C003",
                        "name_cht": "酸鹼度反應",
                        "name_eng": "pH",
                        "unit": "*",
                        "ref": "5.5 ~ 7.5"
                    },
                    "06012C004": {
                        "code": "06012C004",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06012C005": {
                        "code": "06012C005",
                        "name_cht": "微白蛋白（免疫比濁法）",
                        "name_eng": "Microalbumin (Nephelometry)",
                        "unit": "mg/dL",
                        "ref": "< 20"
                    },
                    "06012C006": {
                        "code": "06012C006",
                        "name_cht": "肌酐、尿",
                        "name_eng": "Creatinine (U) CRTN",
                        "unit": "mg/dL",
                        "ref": "60-250"
                    },
                    "06012C007": {
                        "code": "06012C007",
                        "name_cht": "尿液微量白蛋白/肌酐、尿比值",
                        "name_eng": "U ACR",
                        "unit": "mg/gm",
                        "ref": "<30"
                    },
                    "06012C008": {
                        "code": "06012C008",
                        "name_cht": "尿蛋白(數值)／肌酐、尿比值",
                        "name_eng": "U PCR",
                        "unit": "mg/gm",
                        "ref": "<150"
                    },
                    "06012C009": {
                        "code": "06012C009",
                        "name_cht": "白血球酯酶",
                        "name_eng": "Leukocyte rsterase",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06012C010": {
                        "code": "06012C010",
                        "name_cht": "尿糖",
                        "name_eng": "Urine sugar",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06012C011": {
                        "code": "06012C011",
                        "name_cht": "尿潛血",
                        "name_eng": "Urine occult blood",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06012C012": {
                        "code": "06012C012",
                        "name_cht": "比重檢驗",
                        "name_eng": "Specific gravity",
                        "unit": "-",
                        "ref": "1.010 ~ 1.025"
                    },
                    "06012C013": {
                        "code": "06012C013",
                        "name_cht": "尿膽素原",
                        "name_eng": "Urine urobilinogen",
                        "unit": "EU/dL",
                        "ref": "0.1-1.0"
                    },
                    "06012C014": {
                        "code": "06012C014",
                        "name_cht": "尿膽紅素",
                        "name_eng": "Urine bilirubin",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06012C015": {
                        "code": "06012C015",
                        "name_cht": "尿酮體",
                        "name_eng": "Ketone body",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06012C016": {
                        "code": "06012C016",
                        "name_cht": "亞硝酸鹽檢驗",
                        "name_eng": "Nitrite",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06012C017": {
                        "code": "06012C017",
                        "name_cht": "尿紅血球",
                        "name_eng": "Urine R.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF"
                    },
                    "06012C018": {
                        "code": "06012C018",
                        "name_cht": "尿白血球",
                        "name_eng": "Urine W.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF"
                    },
                    "06012C019": {
                        "code": "06012C019",
                        "name_cht": "尿上皮細胞",
                        "name_eng": "Urine Epithelium",
                        "unit": "cells/HPF",
                        "ref": "< 3 /HPF"
                    },
                    "06012C020": {
                        "code": "06012C020",
                        "name_cht": "尿圓柱體",
                        "name_eng": "Urine Cast",
                        "unit": "(-)/LPF",
                        "ref": "Negative"
                    },
                    "06012C021": {
                        "code": "06012C021",
                        "name_cht": "尿結晶體",
                        "name_eng": "Urine Crystal",
                        "unit": "HPF",
                        "ref": "Negative"
                    },
                    "06012C022": {
                        "code": "06012C022",
                        "name_cht": "尿細菌",
                        "name_eng": "Urine Bacteria",
                        "unit": "HPF",
                        "ref": "Negative"
                    },
                    "06012C023": {
                        "code": "06012C023",
                        "name_cht": "尿寄生蟲",
                        "name_eng": "Urine Parasite",
                        "unit": "HPF",
                        "ref": "N.F"
                    },
                    "06012C024": {
                        "code": "06012C024",
                        "name_cht": "黏液絲狀",
                        "name_eng": "Urine Mucous",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06012C025": {
                        "code": "06012C025",
                        "name_cht": "尿酵母菌",
                        "name_eng": "Urine Yeast",
                        "unit": "",
                        "ref": "Negative"
                    },
                    "06013C001": {
                        "code": "06013C001",
                        "name_cht": "酸鹼度反應",
                        "name_eng": "pH",
                        "unit": "*",
                        "ref": "5.5 ~ 7.5"
                    },
                    "06013C002": {
                        "code": "06013C002",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06013C003": {
                        "code": "06013C003",
                        "name_cht": "微白蛋白（免疫比濁法）",
                        "name_eng": "Microalbumin (Nephelometry)",
                        "unit": "mg/dL",
                        "ref": "< 20"
                    },
                    "06013C004": {
                        "code": "06013C004",
                        "name_cht": "肌酐、尿",
                        "name_eng": "Creatinine (U) CRTN",
                        "unit": "mg/dL",
                        "ref": "60-250"
                    },
                    "06013C005": {
                        "code": "06013C005",
                        "name_cht": "尿液微量白蛋白/肌酐、尿比值",
                        "name_eng": "U ACR",
                        "unit": "mg/gm",
                        "ref": "<30"
                    },
                    "06013C006": {
                        "code": "06013C006",
                        "name_cht": "尿液總蛋白／肌酐、尿比值",
                        "name_eng": "U PCR",
                        "unit": "mg/gm",
                        "ref": "<150"
                    },
                    "06013C007": {
                        "code": "06013C007",
                        "name_cht": "白血球酯酶",
                        "name_eng": "Leukocyte rsterase",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06013C008": {
                        "code": "06013C008",
                        "name_cht": "尿糖",
                        "name_eng": "Urine sugar",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06013C009": {
                        "code": "06013C009",
                        "name_cht": "尿潛血",
                        "name_eng": "Urine occult blood",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06013C010": {
                        "code": "06013C010",
                        "name_cht": "比重檢驗",
                        "name_eng": "Specific gravity",
                        "unit": "-",
                        "ref": "1.010 ~ 1.025"
                    },
                    "06013C011": {
                        "code": "06013C011",
                        "name_cht": "尿膽素原",
                        "name_eng": "Urine urobilinogen",
                        "unit": "EU/dL",
                        "ref": "0.1-1.0"
                    },
                    "06013C012": {
                        "code": "06013C012",
                        "name_cht": "尿膽紅素",
                        "name_eng": "Urine bilirubin",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06013C013": {
                        "code": "06013C013",
                        "name_cht": "尿酮體",
                        "name_eng": "Ketone body",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06013C014": {
                        "code": "06013C014",
                        "name_cht": "尿顏色",
                        "name_eng": "color",
                        "unit": "Yellow",
                        "ref": "Yellow"
                    },
                    "06013C015": {
                        "code": "06013C015",
                        "name_cht": "尿混濁度",
                        "name_eng": "turbidity",
                        "unit": "Clear",
                        "ref": "Clear"
                    },
                    "06015C": {
                        "code": "06015C",
                        "name_cht": "亞硝酸鹽檢驗",
                        "name_eng": "Nitrite",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06017B": {
                        "code": "06017B",
                        "name_cht": "白血球酯酶",
                        "name_eng": "Leukocyte rsterase",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "06505C": {
                        "code": "06505C",
                        "name_cht": "懷孕試驗－酵素免疫法",
                        "name_eng": "Pregnancy test-EIA",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "07001C": {
                        "code": "07001C",
                        "name_cht": "糞便潛血化學法",
                        "name_eng": "Occult blood (chemical method)",
                        "unit": "-/+＋＋＋",
                        "ref": "Negative"
                    },
                    "07009C001": {
                        "code": "07009C001",
                        "name_cht": "糞顏色",
                        "name_eng": "Color",
                        "unit": "*",
                        "ref": "Yellow-Brown"
                    },
                    "07009C002": {
                        "code": "07009C002",
                        "name_cht": "外觀",
                        "name_eng": "Appearance",
                        "unit": "*",
                        "ref": "Formed"
                    },
                    "07009C003": {
                        "code": "07009C003",
                        "name_cht": "硬度",
                        "name_eng": "consistency",
                        "unit": "*",
                        "ref": "Soft"
                    },
                    "07009C004": {
                        "code": "07009C004",
                        "name_cht": "消化度",
                        "name_eng": "Digestion",
                        "unit": "*",
                        "ref": "Moderate"
                    },
                    "07009C005": {
                        "code": "07009C005",
                        "name_cht": "紅血球",
                        "name_eng": "Stool R.B.C",
                        "unit": "HPF",
                        "ref": "0 ~ 1"
                    },
                    "07009C006": {
                        "code": "07009C006",
                        "name_cht": "白血球",
                        "name_eng": "Stool W.B.C",
                        "unit": "HPF",
                        "ref": "0 ~ 3"
                    },
                    "07009C007": {
                        "code": "07009C007",
                        "name_cht": "寄生蟲",
                        "name_eng": "Stool Parasite",
                        "unit": "-/+",
                        "ref": "not found"
                    },
                    "07009C008": {
                        "code": "07009C008",
                        "name_cht": "蟲卵",
                        "name_eng": "OVA",
                        "unit": "-/+",
                        "ref": "not found"
                    },
                    "07009C009": {
                        "code": "07009C009",
                        "name_cht": "中性脂肪",
                        "name_eng": "Stool Neutral fat",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "07009C010": {
                        "code": "07009C010",
                        "name_cht": "脂肪酸",
                        "name_eng": "Stool Fatty acid",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "07009C011": {
                        "code": "07009C011",
                        "name_cht": "澱粉",
                        "name_eng": "Stool Starch",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "07009C012": {
                        "code": "07009C012",
                        "name_cht": "黏液",
                        "name_eng": "Stool Mucus",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "07009C013": {
                        "code": "07009C013",
                        "name_cht": "膿細胞",
                        "name_eng": "Stool pus",
                        "unit": "-/+",
                        "ref": "<0"
                    },
                    "07009C014": {
                        "code": "07009C014",
                        "name_cht": "潛血",
                        "name_eng": "Stool occult blood",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "07011C": {
                        "code": "07011C",
                        "name_cht": "寄生蟲卵－直接抹片檢查",
                        "name_eng": "Parasite ova-direct smear",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "07012C": {
                        "code": "07012C",
                        "name_cht": "寄生蟲卵－濃縮法",
                        "name_eng": "Parasite ova-conc.method of ova",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "08001C": {
                        "code": "08001C",
                        "name_cht": "紅血球計數",
                        "name_eng": "R.B.C",
                        "unit": "106/uL",
                        "ref": "M: 4.7 ~ 6.1；F: 4.2 ~ 5.4"
                    },
                    "08002C": {
                        "code": "08002C",
                        "name_cht": "白血球計數",
                        "name_eng": "W.B.C",
                        "unit": "103/uL",
                        "ref": "3.5-10.0"
                    },
                    "08003C": {
                        "code": "08003C",
                        "name_cht": "血色素檢查",
                        "name_eng": "Hemoglobin (Hb)",
                        "unit": "g/dL",
                        "ref": "M: 14 ~ 18；F: 12 ~ 16"
                    },
                    "08004C": {
                        "code": "08004C",
                        "name_cht": "血球比容值測定",
                        "name_eng": "Hematocrite (Hct)",
                        "unit": "%",
                        "ref": "M：39-53，F：33-47"
                    },
                    "08005C": {
                        "code": "08005C",
                        "name_cht": "紅血球沈降速度測定",
                        "name_eng": "E.S.R. (Erythrocyte sedimentation rate)",
                        "unit": "mm/hr",
                        "ref": "<50歲:0-15；>50歲M:0-20；>50歲F:0-30"
                    },
                    "08006C": {
                        "code": "08006C",
                        "name_cht": "血小板計數",
                        "name_eng": "Platelet count",
                        "unit": "103/uL",
                        "ref": "150-400"
                    },
                    "08008C": {
                        "code": "08008C",
                        "name_cht": "網狀紅血球計數",
                        "name_eng": "Reticulocyte count",
                        "unit": "%",
                        "ref": "0.5-1.5"
                    },
                    "08010C": {
                        "code": "08010C",
                        "name_cht": "嗜酸性白血球計算",
                        "name_eng": "Eosinophil count",
                        "unit": "%",
                        "ref": "<7"
                    },
                    "08011C001": {
                        "code": "08011C001",
                        "name_cht": "白血球計數",
                        "name_eng": "W.B.C",
                        "unit": "103/uL",
                        "ref": "3.5-10.0"
                    },
                    "08011C002": {
                        "code": "08011C002",
                        "name_cht": "紅血球計數",
                        "name_eng": "R.B.C",
                        "unit": "106/uL",
                        "ref": "M: 4.7 ~ 6.1；F: 4.2 ~ 5.4"
                    },
                    "08011C003": {
                        "code": "08011C003",
                        "name_cht": "血色素檢查",
                        "name_eng": "Hemoglobin (Hb)",
                        "unit": "g/dL",
                        "ref": "M: 14 ~ 18；F: 12 ~ 16"
                    },
                    "08011C004": {
                        "code": "08011C004",
                        "name_cht": "血球比容值測定",
                        "name_eng": "Hematocrite (Hct)",
                        "unit": "%",
                        "ref": "M：39-53，F：33-47"
                    },
                    "08011C005": {
                        "code": "08011C005",
                        "name_cht": "平均紅血球容積",
                        "name_eng": "MCV",
                        "unit": "fL",
                        "ref": "80-100"
                    },
                    "08011C006": {
                        "code": "08011C006",
                        "name_cht": "平均紅血球血紅素量",
                        "name_eng": "MCH",
                        "unit": "pg",
                        "ref": "26-34"
                    },
                    "08011C007": {
                        "code": "08011C007",
                        "name_cht": "平均紅血球血紅素濃度",
                        "name_eng": "MCHC",
                        "unit": "g/dL",
                        "ref": "30-36"
                    },
                    "08011C008": {
                        "code": "08011C008",
                        "name_cht": "血小板計數",
                        "name_eng": "Platelet count",
                        "unit": "103/uL",
                        "ref": "150-400"
                    },
                    "08012C001": {
                        "code": "08012C001",
                        "name_cht": "白血球計數",
                        "name_eng": "W.B.C",
                        "unit": "103/uL",
                        "ref": "3.5-10.0"
                    },
                    "08012C002": {
                        "code": "08012C002",
                        "name_cht": "紅血球計數",
                        "name_eng": "R.B.C",
                        "unit": "106/uL",
                        "ref": "M: 4.7 ~ 6.1；F: 4.2 ~ 5.4"
                    },
                    "08012C003": {
                        "code": "08012C003",
                        "name_cht": "血色素檢查",
                        "name_eng": "Hemoglobin (Hb)",
                        "unit": "g/dL",
                        "ref": "M: 14 ~ 18；F: 12 ~ 16"
                    },
                    "08012C004": {
                        "code": "08012C004",
                        "name_cht": "血球比容值測定",
                        "name_eng": "Hematocrite (Hct)",
                        "unit": "%",
                        "ref": "M：39-53，F：33-47"
                    },
                    "08012C005": {
                        "code": "08012C005",
                        "name_cht": "平均紅血球容積",
                        "name_eng": "MCV",
                        "unit": "fL",
                        "ref": "80-100"
                    },
                    "08012C006": {
                        "code": "08012C006",
                        "name_cht": "平均紅血球血紅素量",
                        "name_eng": "MCH",
                        "unit": "pg",
                        "ref": "26-34"
                    },
                    "08012C007": {
                        "code": "08012C007",
                        "name_cht": "平均紅血球血紅素濃度",
                        "name_eng": "MCHC",
                        "unit": "g/dL",
                        "ref": "30-36"
                    },
                    "08013C001": {
                        "code": "08013C001",
                        "name_cht": "嗜中性細胞白血球",
                        "name_eng": "NEUT",
                        "unit": "%",
                        "ref": "50-70"
                    },
                    "08013C002": {
                        "code": "08013C002",
                        "name_cht": "淋巴球白血球",
                        "name_eng": "LYMPH",
                        "unit": "%",
                        "ref": "19-48"
                    },
                    "08013C003": {
                        "code": "08013C003",
                        "name_cht": "單核球白血球",
                        "name_eng": "MONO",
                        "unit": "%",
                        "ref": "2.0-10.0"
                    },
                    "08013C004": {
                        "code": "08013C004",
                        "name_cht": "嗜酸性白血球計算",
                        "name_eng": "Eosinophil count",
                        "unit": "%",
                        "ref": "<7"
                    },
                    "08013C005": {
                        "code": "08013C005",
                        "name_cht": "嗜鹼細胞白血球",
                        "name_eng": "BASO",
                        "unit": "%",
                        "ref": "0.0-1.5"
                    },
                    "08013C006": {
                        "code": "08013C006",
                        "name_cht": "帶狀嗜中性細胞白血球",
                        "name_eng": "Band",
                        "unit": "%",
                        "ref": "0.0-5"
                    },
                    "08014C001": {
                        "code": "08014C001",
                        "name_cht": "紅血球計數",
                        "name_eng": "R.B.C",
                        "unit": "106/uL",
                        "ref": "M: 4.7 ~ 6.1；F: 4.2 ~ 5.4"
                    },
                    "08014C002": {
                        "code": "08014C002",
                        "name_cht": "白血球計數",
                        "name_eng": "W.B.C",
                        "unit": "103/uL",
                        "ref": "3.5-10.0"
                    },
                    "08014C003": {
                        "code": "08014C003",
                        "name_cht": "血色素檢查",
                        "name_eng": "Hemoglobin (Hb)",
                        "unit": "g/dL",
                        "ref": "M: 14 ~ 18；F: 12 ~ 16"
                    },
                    "08026C": {
                        "code": "08026C",
                        "name_cht": "凝血酶原時間(一段式)",
                        "name_eng": "Prothrombin time",
                        "unit": "秒",
                        "ref": "9.5-11.7"
                    },
                    "08030C": {
                        "code": "08030C",
                        "name_cht": "血紅素電泳",
                        "name_eng": "Hb electrophoresis",
                        "unit": "%",
                        "ref": "Hb A1：>95；Hb A2：1.5~3.5；Hb F：<2"
                    },
                    "08036B": {
                        "code": "08036B",
                        "name_cht": "部份凝血活酶時間",
                        "name_eng": "APTT (activated partial thromboplastin time)",
                        "unit": "秒",
                        "ref": "23.9-34.9"
                    },
                    "08077B": {
                        "code": "08077B",
                        "name_cht": "蛋白C",
                        "name_eng": "Protein C",
                        "unit": "%",
                        "ref": "80 ~ 132"
                    },
                    "08082C001": {
                        "code": "08082C001",
                        "name_cht": "白血球計數",
                        "name_eng": "W.B.C",
                        "unit": "103/uL",
                        "ref": "3.5-10.0"
                    },
                    "08082C002": {
                        "code": "08082C002",
                        "name_cht": "紅血球計數",
                        "name_eng": "R.B.C",
                        "unit": "106/uL",
                        "ref": "M: 4.7 ~ 6.1；F: 4.2 ~ 5.4"
                    },
                    "08082C003": {
                        "code": "08082C003",
                        "name_cht": "血色素檢查",
                        "name_eng": "Hemoglobin (Hb)",
                        "unit": "g/dL",
                        "ref": "M: 14 ~ 18；F: 12 ~ 16"
                    },
                    "08082C004": {
                        "code": "08082C004",
                        "name_cht": "血球比容值測定",
                        "name_eng": "Hematocrite (Hct)",
                        "unit": "%",
                        "ref": "M：39-53，F：33-47"
                    },
                    "08082C005": {
                        "code": "08082C005",
                        "name_cht": "平均紅血球容積",
                        "name_eng": "MCV",
                        "unit": "fL",
                        "ref": "80-100"
                    },
                    "08083C": {
                        "code": "08083C",
                        "name_cht": "平均紅血球血紅素量",
                        "name_eng": "MCH",
                        "unit": "pg",
                        "ref": "26-34"
                    },
                    "08084C": {
                        "code": "08084C",
                        "name_cht": "平均紅血球血紅素濃度",
                        "name_eng": "MCHC",
                        "unit": "g/dL",
                        "ref": "30-36"
                    },
                    "08127C": {
                        "code": "08127C",
                        "name_cht": "平均紅血球容積",
                        "name_eng": "MCV",
                        "unit": "fL",
                        "ref": "80-100"
                    },
                    "08129C": {
                        "code": "08129C",
                        "name_cht": "胰島素血清檢驗",
                        "name_eng": "Ins",
                        "unit": "μU/mL",
                        "ref": "<28.8"
                    },
                    "09001C": {
                        "code": "09001C",
                        "name_cht": "總膽固醇",
                        "name_eng": "Cholestero1, total",
                        "unit": "mg/dL",
                        "ref": "50 ~ 200"
                    },
                    "09002C": {
                        "code": "09002C",
                        "name_cht": "血中尿素氮",
                        "name_eng": "BUN, blood urea nitrogen",
                        "unit": "mg/dL",
                        "ref": "7 ~ 20"
                    },
                    "09004C": {
                        "code": "09004C",
                        "name_cht": "三酸甘油脂",
                        "name_eng": "Triglyceride (TG)",
                        "unit": "mg/dL",
                        "ref": "35 ~ 170"
                    },
                    "09005C001": {
                        "code": "09005C001",
                        "name_cht": "飯前血糖",
                        "name_eng": "Glucose-AC",
                        "unit": "mg/dL",
                        "ref": "70 ~ 100"
                    },
                    "09140C": {
                        "code": "09140C",
                        "name_cht": "飯後血糖",
                        "name_eng": "Glucose-PC",
                        "unit": "mg/dL",
                        "ref": "80-130"
                    },
                    "09006C": {
                        "code": "09006C",
                        "name_cht": "醣化血紅素",
                        "name_eng": "HbA1c (Hemoglobin A1c)",
                        "unit": "%",
                        "ref": "4.3 ~ 6.3"
                    },
                    "09009C": {
                        "code": "09009C",
                        "name_cht": "三碘甲狀腺原氨酸攝取率",
                        "name_eng": "T3 Uptake Ratio",
                        "unit": "%",
                        "ref": "23.2-32.6"
                    },
                    "09010C": {
                        "code": "09010C",
                        "name_cht": "四碘甲狀腺素生化法",
                        "name_eng": "T4",
                        "unit": "ug/dL",
                        "ref": "4 ~ 12"
                    },
                    "09011C": {
                        "code": "09011C",
                        "name_cht": "鈣",
                        "name_eng": "Ca (Calcium)",
                        "unit": "mg/dL",
                        "ref": "8.8 ~ 10.3"
                    },
                    "09012C": {
                        "code": "09012C",
                        "name_cht": "磷",
                        "name_eng": "P (Phosphoras)",
                        "unit": "mg/dL",
                        "ref": "2.6 ~ 4.4"
                    },
                    "09013C": {
                        "code": "09013C",
                        "name_cht": "尿酸",
                        "name_eng": "Uric acid",
                        "unit": "mg/dL",
                        "ref": "M：3.0-7.0；F：2.0-6.0"
                    },
                    "09015C": {
                        "code": "09015C",
                        "name_cht": "肌酸酐、血",
                        "name_eng": "Creatinine (B) CRTN",
                        "unit": "mg/dL",
                        "ref": "0.5-1.3"
                    },
                    "09016C": {
                        "code": "09016C",
                        "name_cht": "肌酐、尿",
                        "name_eng": "Creatinine (U) CRTN",
                        "unit": "mg/dL",
                        "ref": "60-250"
                    },
                    "09017C": {
                        "code": "09017C",
                        "name_cht": "澱粉酶、血",
                        "name_eng": "Amylase (B)",
                        "unit": "U/L",
                        "ref": "33 ~ 96"
                    },
                    "09021C": {
                        "code": "09021C",
                        "name_cht": "鈉",
                        "name_eng": "Na (Sodium)",
                        "unit": "mmol/L",
                        "ref": "137 ~ 149"
                    },
                    "09022C": {
                        "code": "09022C",
                        "name_cht": "鉀",
                        "name_eng": "K (Potassium)",
                        "unit": "mmol/L",
                        "ref": "3.5 ~ 5.0"
                    },
                    "09023C": {
                        "code": "09023C",
                        "name_cht": "氯",
                        "name_eng": "Cl (Chloride)",
                        "unit": "mmol/L",
                        "ref": "98 ~ 108"
                    },
                    "09025C": {
                        "code": "09025C",
                        "name_cht": "血清麩胺酸苯醋酸轉氨基酶",
                        "name_eng": "S-GOT/AST",
                        "unit": "IU/L",
                        "ref": "<40"
                    },
                    "09026C": {
                        "code": "09026C",
                        "name_cht": "血清麩胺酸丙酮酸轉氨基酶",
                        "name_eng": "S-GPT/ALT",
                        "unit": "IU/L",
                        "ref": "<40"
                    },
                    "09027C": {
                        "code": "09027C",
                        "name_cht": "鹼性磷酯酶",
                        "name_eng": "Alkaline phosphatase",
                        "unit": "U/L",
                        "ref": "30 ~ 95"
                    },
                    "09029C": {
                        "code": "09029C",
                        "name_cht": "膽紅素總量",
                        "name_eng": "Bilirubin total",
                        "unit": "mg/dL",
                        "ref": "0.3 ~ 1.0"
                    },
                    "09030C": {
                        "code": "09030C",
                        "name_cht": "直接膽紅素",
                        "name_eng": "Bilirubin direct",
                        "unit": "mg/dL",
                        "ref": "0.0 ~ 0.4"
                    },
                    "09031C": {
                        "code": "09031C",
                        "name_cht": "麩胺轉酸酶",
                        "name_eng": "r-GT(r-glutamyl transferase)",
                        "unit": "IU/L",
                        "ref": "4 ~ 50"
                    },
                    "09032C": {
                        "code": "09032C",
                        "name_cht": "肌酸磷化酶",
                        "name_eng": "CPK (Creatine-phospho-kinase)",
                        "unit": "IU/mL",
                        "ref": "M：38-174，FeM：26-140"
                    },
                    "09033C": {
                        "code": "09033C",
                        "name_cht": "乳酸脫氫酶",
                        "name_eng": "LDH (Lactic dehydrogenase)",
                        "unit": "IU/mL",
                        "ref": "140 ~ 271"
                    },
                    "09035C": {
                        "code": "09035C",
                        "name_cht": "總鐵結合能力",
                        "name_eng": "TIBC (TotalIron Binding Capacity)",
                        "unit": "μg/dL",
                        "ref": "48.3 ~ 68.0"
                    },
                    "09038C": {
                        "code": "09038C",
                        "name_cht": "白蛋白",
                        "name_eng": "Albumin",
                        "unit": "g/dL",
                        "ref": "3.7 ~ 5.3"
                    },
                    "09039C": {
                        "code": "09039C",
                        "name_cht": "球蛋白",
                        "name_eng": "Globubin",
                        "unit": "g/dL",
                        "ref": "3.1 ~ 3.7"
                    },
                    "09chs003": {
                        "code": "09chs003",
                        "name_cht": "蛋白比值",
                        "name_eng": "A/G",
                        "unit": "*",
                        "ref": ""
                    },
                    "09040C002": {
                        "code": "09040C002",
                        "name_cht": "全蛋白",
                        "name_eng": "Total protein",
                        "unit": "mg/dL",
                        "ref": "6.0-8.3"
                    },
                    "09043C": {
                        "code": "09043C",
                        "name_cht": "高密度脂蛋白－膽固醇",
                        "name_eng": "HDL-C(highdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "35 ~ 75"
                    },
                    "09044C": {
                        "code": "09044C",
                        "name_cht": "低密度脂蛋白－膽固醇",
                        "name_eng": "LDL-C(Lowdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "<130"
                    },
                    "09064C": {
                        "code": "09064C",
                        "name_cht": "解脂酶",
                        "name_eng": "Lipase",
                        "unit": "U/L",
                        "ref": "13 ~ 60"
                    },
                    "09071C": {
                        "code": "09071C",
                        "name_cht": "肌酸磷酸酶(MB同功酶)",
                        "name_eng": "CK-MB(Creatine phosphokinase-MB)",
                        "unit": "ng/mL",
                        "ref": "<5.0"
                    },
                    "09106C": {
                        "code": "09106C",
                        "name_cht": "游離甲狀腺素免疫分析",
                        "name_eng": "FreeT4 (EIA/LIA)",
                        "unit": "ng/dL",
                        "ref": "0.9 ~ 1.7"
                    },
                    "09111B": {
                        "code": "09111B",
                        "name_cht": "甲狀腺球蛋白",
                        "name_eng": "Thyroglobulin (EIA/LIA)",
                        "unit": "ng/mL",
                        "ref": "<55"
                    },
                    "09112C": {
                        "code": "09112C",
                        "name_cht": "甲狀腺刺激素免疫分析",
                        "name_eng": "TSH (EIA/LIA)",
                        "unit": "μU/mL",
                        "ref": "0.25 ~ 4.0"
                    },
                    "09117C": {
                        "code": "09117C",
                        "name_cht": "甲狀腺原氨酸免疫分析",
                        "name_eng": "T3 (EIA/LIA)",
                        "unit": "ng/mL",
                        "ref": "78 ~ 182"
                    },
                    "09120C": {
                        "code": "09120C",
                        "name_cht": "催乳激素免疫分析",
                        "name_eng": "Prolactin (PRL),EIA/LIA",
                        "unit": "ng/mL",
                        "ref": "M：2.64~13.13，F：Premenopausal：3.34 ~ 26.72，Postmenopausal：2.74 ~ 19.64"
                    },
                    "09125C": {
                        "code": "09125C",
                        "name_cht": "濾泡刺激素免疫分析",
                        "name_eng": "FSH (EIA/LIA)",
                        "unit": "mIU/mL",
                        "ref": "Ms: 1.27-19.26 mIU/mL，FeMs: Postmenopausal: 16.74-113.59 mIU/mL，FeMs: Mid-Follicular Phase: 3.85-8.78 mIU/mL，FeMs: Mid-Cycle Peak: 4.54-22.51 mIU/mL，FeMs: Mid-Luteal Phase: 1.79-5.12 mIU/mL"
                    },
                    "09126C": {
                        "code": "09126C",
                        "name_cht": "黃體化激素免疫分析",
                        "name_eng": "LH (EIA/LIA)",
                        "unit": "mIU/mL",
                        "ref": "M：1.24-8.62，F：Postmenopausal：10.87-58.64 ，F:Mid-Follicular Phase：2.12-10.89 ，F：Mid-Cycle Peak：19.18-103.03，F：Mid-Luteal Phase：1.20-12.86"
                    },
                    "09127C": {
                        "code": "09127C",
                        "name_cht": "二氫基春情素免疫分析",
                        "name_eng": "Estradiol (E2),EIA/LIA",
                        "unit": "pg/ml",
                        "ref": "Ms ：< 20-47，Post-menopausal FeMs： < 20-40，Non-Pregnant FeMs-Mid folliculat phase：27-122，Mid luteal phase：49-291，Peri-ovulatory phase：95-433"
                    },
                    "IC85": {
                        "code": "IC85",
                        "name_cht": "糞便潛血免疫分析",
                        "name_eng": "Stool occult blood (iFOB)",
                        "unit": "ng/mL",
                        "ref": "<30"
                    },
                    "IC94": {
                        "code": "IC94",
                        "name_cht": "糞便潛血免疫分析",
                        "name_eng": "Stool occult blood (iFOB)",
                        "unit": "ng/mL",
                        "ref": "<30"
                    },
                    "09134C": {
                        "code": "09134C",
                        "name_cht": "糞便潛血免疫分析",
                        "name_eng": "Stool occult blood (iFOB)",
                        "unit": "ng/mL",
                        "ref": "<30"
                    },
                    "09chs001": {
                        "code": "09chs001",
                        "name_cht": "總膽固醇/高密度脂蛋白膽固醇比",
                        "name_eng": "T-Cho/HDL-C",
                        "unit": "*",
                        "ref": "<5"
                    },
                    "09chs002": {
                        "code": "09chs002",
                        "name_cht": "低密度/高密度脂蛋白膽固醇比",
                        "name_eng": "LDL-C/HDL-C",
                        "unit": "*",
                        "ref": "0-4.8"
                    },
                    "10810B": {
                        "code": "10810B",
                        "name_cht": "安非他命檢測(免疫分析)",
                        "name_eng": "Amphetamine (EIA)",
                        "unit": "ng/mL",
                        "ref": "＜500"
                    },
                    "10811B": {
                        "code": "10811B",
                        "name_cht": "嗎啡檢測(免疫分析)",
                        "name_eng": "Morphine (EIA)",
                        "unit": "ng/mL",
                        "ref": "＜300"
                    },
                    "11001C": {
                        "code": "11001C",
                        "name_cht": "ABO血型測定檢驗",
                        "name_eng": "A.B.AB.O blood grouping",
                        "unit": "A.B.AB.O",
                        "ref": "Type A,B,O,AB"
                    },
                    "11003C": {
                        "code": "11003C",
                        "name_cht": "RH（D）型檢驗",
                        "name_eng": "Rh type",
                        "unit": "N/P",
                        "ref": "RH(+)、RH(-)"
                    },
                    "12001C": {
                        "code": "12001C",
                        "name_cht": "梅毒試驗",
                        "name_eng": "RPR/VDRL test",
                        "unit": "-/+",
                        "ref": "Non-reactive"
                    },
                    "12002B": {
                        "code": "12002B",
                        "name_cht": "傷寒凝集試驗",
                        "name_eng": "Widal & Weil-Felix test",
                        "unit": "-/+",
                        "ref": "80x"
                    },
                    "12002B001": {
                        "code": "12002B001",
                        "name_cht": "Widal Typhoid O",
                        "name_eng": "Widal Typhoid O",
                        "unit": "-/+",
                        "ref": "80x"
                    },
                    "12002B002": {
                        "code": "12002B002",
                        "name_cht": "Widal Typhoid H",
                        "name_eng": "Widal Typhoid H",
                        "unit": "-/+",
                        "ref": "80x"
                    },
                    "12002B003": {
                        "code": "12002B003",
                        "name_cht": "Weil-Felix OX-19",
                        "name_eng": "Weil-Felix OX-19",
                        "unit": "-/+",
                        "ref": "80x"
                    },
                    "12002B004": {
                        "code": "12002B004",
                        "name_cht": "Weil-Felix OX-2",
                        "name_eng": "Weil-Felix OX-2",
                        "unit": "-/+",
                        "ref": "80x"
                    },
                    "12002B005": {
                        "code": "12002B005",
                        "name_cht": "Weil-Felix OX-K",
                        "name_eng": "Weil-Felix OX-K",
                        "unit": "-/+",
                        "ref": "80x"
                    },
                    "12002B006": {
                        "code": "12002B006",
                        "name_cht": "Paratyphi A",
                        "name_eng": "Paratyphi A",
                        "unit": "-/+",
                        "ref": "80x"
                    },
                    "12002B007": {
                        "code": "12002B007",
                        "name_cht": "Paratyphi B",
                        "name_eng": "Paratyphi B",
                        "unit": "-/+",
                        "ref": "80x"
                    },
                    "12007C": {
                        "code": "12007C",
                        "name_cht": "α－胎兒蛋白檢驗",
                        "name_eng": "AFP α-fetoprotein（EIA/LIA）",
                        "unit": "ng/mL",
                        "ref": "0 ~ 25.0"
                    },
                    "12009C": {
                        "code": "12009C",
                        "name_cht": "類風濕性關節炎因子試驗-乳膠凝集法",
                        "name_eng": "Rheumatoid factor test- Latex agglutination",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "12011C": {
                        "code": "12011C",
                        "name_cht": "類風濕性關節炎因子試驗－免疫比濁法",
                        "name_eng": "Rheumatoid factor test- Nephelometry",
                        "unit": "IU/mL",
                        "ref": "<17.0"
                    },
                    "12013C": {
                        "code": "12013C",
                        "name_cht": "Ｃ反應性蛋白試驗—乳膠凝集法",
                        "name_eng": "C.R.P (C-reactive protein)- Latex agglutination",
                        "unit": "mg/dL",
                        "ref": "0 ~ 0.5"
                    },
                    "12015C001": {
                        "code": "12015C001",
                        "name_cht": "Ｃ反應性蛋白試驗 － 免疫比濁法",
                        "name_eng": "C.R.P(C-reactive protein)- Nephelometry",
                        "unit": "mg/dL",
                        "ref": "<0.748"
                    },
                    "12015C002": {
                        "code": "12015C002",
                        "name_cht": "高敏感度C反應性蛋白試驗",
                        "name_eng": "hs-CRP",
                        "unit": "mg/dL",
                        "ref": ""
                    },
                    "12021C": {
                        "code": "12021C",
                        "name_cht": "癌胚胎抗原檢驗",
                        "name_eng": "CEA（EIA/LIA）",
                        "unit": "ng/ml",
                        "ref": "≦5.0"
                    },
                    "12031C": {
                        "code": "12031C",
                        "name_cht": "免疫球蛋白Ｅ",
                        "name_eng": "IgE",
                        "unit": "IU/mL",
                        "ref": "1.31 ~ 165.3"
                    },
                    "12077B": {
                        "code": "12077B",
                        "name_cht": "ＣＡ–１２５腫瘤標記(EIA/LIA法)",
                        "name_eng": "CA-125 (EIA/LIA)",
                        "unit": "U/mL",
                        "ref": "<35"
                    },
                    "12079B": {
                        "code": "12079B",
                        "name_cht": "ＣＡ–１９９ 腫瘤標記(EIA/LIA法)",
                        "name_eng": "CA-199 (EIA/LIA)",
                        "unit": "U/mL",
                        "ref": "<37"
                    },
                    "12080B": {
                        "code": "12080B",
                        "name_cht": "SCC腫瘤標記(EIA/LIA法)",
                        "name_eng": "SCC (EIA/LIA)",
                        "unit": "ng/mL",
                        "ref": "< 2.5"
                    },
                    "12081C": {
                        "code": "12081C",
                        "name_cht": "攝護腺特異抗原(EIA/LIA法)",
                        "name_eng": "PSA (prostate specific antigen) (EIA/LIA)",
                        "unit": "ng/mL",
                        "ref": "0 ~ 4.0"
                    },
                    "12106C": {
                        "code": "12106C",
                        "name_cht": "結核菌素測驗",
                        "name_eng": "Tuberculin test",
                        "unit": "mm",
                        "ref": "(1)國小一年級學童：無接種卡介苗疫苗者反應>=10者為陽性，<10者為陰性 ，(2)指標個案之接觸者：>=10者為陽性，<10者為陰性， (3)接觸者如為人類免疫不全病毒感染，或惡性疾病(惡性腫瘤)，或器官移植，或其他免疫功能不全病患：>=5者為陽性，<5者為陰性"
                    },
                    "12111C": {
                        "code": "12111C",
                        "name_cht": "微白蛋白（免疫比濁法）",
                        "name_eng": "Microalbumin (Nephelometry)",
                        "unit": "mg/dL",
                        "ref": "< 20"
                    },
                    "12116C": {
                        "code": "12116C",
                        "name_cht": "鐵蛋白",
                        "name_eng": "Ferritin (EIA/LIA)",
                        "unit": "ng/mL",
                        "ref": "M：23.9-336.2，FeM：11.0-306.8"
                    },
                    "13005B": {
                        "code": "13005B",
                        "name_cht": "披衣菌檢查（定性）",
                        "name_eng": "DNA test for chlamydia (qualitative)",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "13006C": {
                        "code": "13006C",
                        "name_cht": "排泄物，滲出物及分泌物之細菌顯微鏡檢查",
                        "name_eng": "Microscopic examination",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "13007C": {
                        "code": "13007C",
                        "name_cht": "細菌培養鑑定檢查（包括一般細菌、真菌、原蟲等為對象的培養鑑定，抗酸菌除外）",
                        "name_eng": "Bacterial culture and identify",
                        "unit": "-/+",
                        "ref": "No growth in 48 hours"
                    },
                    "13007C001": {
                        "code": "13007C001",
                        "name_cht": "沙門氏菌培養",
                        "name_eng": "Samonella Culture",
                        "unit": "-/+",
                        "ref": "No growth in 48 hours"
                    },
                    "13007C002": {
                        "code": "13007C002",
                        "name_cht": "志賀氏菌培養",
                        "name_eng": "Shigella Culture",
                        "unit": "-/+",
                        "ref": "No growth in 48 hours"
                    },
                    "13012C": {
                        "code": "13012C",
                        "name_cht": "抗酸菌培養",
                        "name_eng": "Acid-fast culture",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "13013C": {
                        "code": "13013C",
                        "name_cht": "抗酸菌鑑定檢查",
                        "name_eng": "Acid-Fast  Exam",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "13015C": {
                        "code": "13015C",
                        "name_cht": "抗酸菌藥物敏感性試驗—四種藥物以上",
                        "name_eng": "Sensitivity test of acid-fast",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "13025C": {
                        "code": "13025C",
                        "name_cht": "抗酸性濃縮抹片染色檢查",
                        "name_eng": "Acid-fast stain",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "13026C": {
                        "code": "13026C",
                        "name_cht": "抗酸菌培養(限同時使用固態培養基及具自動化偵測功能之液態培養系統)",
                        "name_eng": "Mycobacteria culture",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "14032C001": {
                        "code": "14032C001",
                        "name_cht": "Ｂ型肝炎表面抗原",
                        "name_eng": "HBsAg (EIA/LIA)",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜1.0 Reactive：≧1.0"
                    },
                    "14032C002": {
                        "code": "14032C002",
                        "name_cht": "Ｂ型肝炎表面抗原(數值)",
                        "name_eng": "HBsAg (EIA/LIA)",
                        "unit": "IU/mL",
                        "ref": "Non-reactive：＜0.05 ，Reactive：0.05～10 ，High-reactive：＞10"
                    },
                    "14033C": {
                        "code": "14033C",
                        "name_cht": "Ｂ型肝炎表面抗體",
                        "name_eng": "Anti HBs",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜10 ，Reactive：≧10"
                    },
                    "14035C": {
                        "code": "14035C",
                        "name_cht": "B型肝炎e抗原檢查HBeAg",
                        "name_eng": "HBeAg (EIA/LIA)",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜1.0 Reactive：≧1.0"
                    },
                    "14036C": {
                        "code": "14036C",
                        "name_cht": "Ｂ型肝炎Ｅ抗體檢查",
                        "name_eng": "Anti-HBe（EIA/LIA）",
                        "unit": "-/+",
                        "ref": "Non-reactive：＞1.0 ，Reactive：≦1.0"
                    },
                    "14037C": {
                        "code": "14037C",
                        "name_cht": "Ｂ型肝炎核心抗體檢查",
                        "name_eng": "Anti-HBc（EIA/LIA）",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜1.0 ，Reactive：>=1.0"
                    },
                    "14038C": {
                        "code": "14038C",
                        "name_cht": "Ｂ型肝炎核心抗體免疫球蛋白Ｍ檢查(EIA/LIA法)",
                        "name_eng": "Anti-HBc IgM (EIA/LIA)",
                        "unit": "-/+",
                        "ref": "Negative：＜0.5，Grayzone：0.5-0.99 ，Positive：≧1.0"
                    },
                    "14039C": {
                        "code": "14039C",
                        "name_cht": "Ａ型肝炎抗體免疫球蛋白Ｍ檢查（EIA/LIA法）",
                        "name_eng": "Anti-HAV IgM（EIA/LIA）",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜0.80 ，Grayzone：0.80～1.20 ，Reactive： ＞1.20"
                    },
                    "14040C": {
                        "code": "14040C",
                        "name_cht": "Ａ型肝炎抗體",
                        "name_eng": "Anti HAV",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜1.0，Reactive    ：＞=1.0"
                    },
                    "E3046C": {
                        "code": "E3046C",
                        "name_cht": "HIV 抗原/抗體複合型初步檢驗",
                        "name_eng": "HIV Ag/Ab Combo test",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜1.0，Reactive    ：＞=1.1"
                    },
                    "14051C001": {
                        "code": "14051C001",
                        "name_cht": "Ｃ型肝炎病毒抗體檢查",
                        "name_eng": "HCV Ab (EIA/LIA)",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "14051C002": {
                        "code": "14051C002",
                        "name_cht": "Ｃ型肝炎病毒抗體檢查(數值)",
                        "name_eng": "HCV Ab (EIA/LIA)",
                        "unit": "S/Co",
                        "ref": "Non-reactive：＜1.0，Reactive    ：＞=1.0"
                    },
                    "17019C": {
                        "code": "17019C",
                        "name_cht": "支氣管激發試驗",
                        "name_eng": "Bronchial provocation test",
                        "unit": "-/+",
                        "ref": "第一秒吐氣量或用力吐氣肺活量絕對值增加大於200ml，且前後第一秒吐氣量或用力吐氣肺活量增加比率大於12%時，則認為支氣管擴張測驗為陽性。"
                    },
                    "18001C": {
                        "code": "18001C",
                        "name_cht": "心電圖",
                        "name_eng": "E.K.G. (Electrocardiography)",
                        "unit": "*",
                        "ref": ""
                    },
                    "27004C": {
                        "code": "27004C",
                        "name_cht": "甲狀腺刺激素放射免疫分析",
                        "name_eng": "TSH(thyroid stimulating hormone)",
                        "unit": "uIU/mL",
                        "ref": "0.27 ~ 4.2"
                    },
                    "27065B": {
                        "code": "27065B",
                        "name_cht": "微白蛋白",
                        "name_eng": "Microalbumin",
                        "unit": "mg/dL",
                        "ref": "< 20"
                    },
                    "30022C": {
                        "code": "30022C",
                        "name_cht": "特異過敏原免疫檢驗",
                        "name_eng": "Specific Allergen Test",
                        "unit": "-/+",
                        "ref": "<0.35"
                    },
                    "L1001C001": {
                        "code": "L1001C001",
                        "name_cht": "Ｂ型肝炎表面抗原",
                        "name_eng": "HBsAg (EIA/LIA)",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜1.0 Reactive：≧1.0"
                    },
                    "L1001C002": {
                        "code": "L1001C002",
                        "name_cht": "Ｃ型肝炎病毒抗體檢查",
                        "name_eng": "HCV Ab(EIA/LIA)",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "L1001C003": {
                        "code": "L1001C003",
                        "name_cht": "Ｂ型肝炎表面抗原",
                        "name_eng": "HBsAg (EIA/LIA)",
                        "unit": "IU/mL",
                        "ref": "Non-reactive：＜0.05 ，Reactive：0.05～10 ，High-reactive：＞10"
                    },
                    "L1001C004": {
                        "code": "L1001C004",
                        "name_cht": "Ｃ型肝炎病毒抗體檢查",
                        "name_eng": "HCV Ab(EIA/LIA)",
                        "unit": "S/Co",
                        "ref": "Non-reactive：＜1.0，Reactive    ：＞=1.0"
                    },
                    "Y00001": {
                        "code": "Y00001",
                        "name_cht": "腎絲球過濾率計算",
                        "name_eng": "eGFR",
                        "unit": "ml/min/1.73m^2",
                        "ref": ""
                    },
                    "Y00008": {
                        "code": "Y00008",
                        "name_cht": "慢性腎臟病期數",
                        "name_eng": "CKD Stage",
                        "unit": "",
                        "ref": "第0期：正常"
                    },
                    "Y00002001": {
                        "code": "Y00002001",
                        "name_cht": "尿蛋白(數值)／肌酐、尿比值",
                        "name_eng": "U PCR",
                        "unit": "mg/gm",
                        "ref": "<150"
                    },
                    "Y00002002": {
                        "code": "Y00002002",
                        "name_cht": "尿液微量白蛋白/肌酐、尿比值",
                        "name_eng": "U ACR",
                        "unit": "mg/gm",
                        "ref": "<30"
                    },
                    "Y00006001": {
                        "code": "Y00006001",
                        "name_cht": "收縮壓",
                        "name_eng": "Systolic pressure",
                        "unit": "mmHg",
                        "ref": ""
                    },
                    "Y00006002": {
                        "code": "Y00006002",
                        "name_cht": "舒張壓",
                        "name_eng": "Diastolic pressure",
                        "unit": "mmHg",
                        "ref": ""
                    },
                    "Y00004": {
                        "code": "Y00004",
                        "name_cht": "身高",
                        "name_eng": "height",
                        "unit": "cm",
                        "ref": ""
                    },
                    "Y00005": {
                        "code": "Y00005",
                        "name_cht": "體重",
                        "name_eng": "body weight",
                        "unit": "kg",
                        "ref": ""
                    },
                    "Y00007": {
                        "code": "Y00007",
                        "name_cht": "抽菸習慣",
                        "name_eng": "Smoking habit",
                        "unit": "*",
                        "ref": ""
                    },
                    "14044B": {
                        "code": "14044B",
                        "name_cht": "德國麻疹免疫球蛋白Ｇ檢查（EIA/LIA法）",
                        "name_eng": "Anti-rubella IgG(EIA法)",
                        "unit": "IU/mL",
                        "ref": "Non-reactive：<10 Reactive：≧15"
                    },
                    "14045B": {
                        "code": "14045B",
                        "name_cht": "德國麻疹免疫球蛋白M檢查（EIA/LIA法）",
                        "name_eng": "Anti-rubella IgM(EIA法)",
                        "unit": "IU/mL",
                        "ref": "Negative：<1.20 Positive：≧1.6"
                    },
                    "07016C": {
                        "code": "07016C",
                        "name_cht": "蟯蟲膠片",
                        "name_eng": "Perianal swab",
                        "unit": "-/+",
                        "ref": "not found"
                    },
                    "09131C": {
                        "code": "09131C",
                        "name_cht": "春情素醇酵素免疫分析",
                        "name_eng": "Estriol (E3), EIA/LIA",
                        "unit": "ng/ml",
                        "ref": "0.50-2.00 MoM"
                    },
                    "13018C": {
                        "code": "13018C",
                        "name_cht": "幽門桿菌檢驗",
                        "name_eng": "Helicobacter pylori test (Clo test)",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "10511C": {
                        "code": "10511C",
                        "name_cht": "長葉毛地黃",
                        "name_eng": "Digoxin",
                        "unit": "ng/ml",
                        "ref": "0.8-2.0"
                    },
                    "09020C": {
                        "code": "09020C",
                        "name_cht": "鐵",
                        "name_eng": "Fe (Iron-bound)",
                        "unit": "ug/dL",
                        "ref": "男：45-182 女：28-170"
                    },
                    "12078B": {
                        "code": "12078B",
                        "name_cht": "ＣＡ–１５３腫瘤標記 (EIA/LIA法)",
                        "name_eng": "CA-153 (EIA/LIA)",
                        "unit": "U/mL",
                        "ref": "<31.3"
                    },
                    "12053C": {
                        "code": "12053C",
                        "name_cht": "抗核抗體(間接免疫螢光法)",
                        "name_eng": "ANA(Antinuclear Antibodies)",
                        "unit": "-/+",
                        "ref": "Negative：40X"
                    },
                    "12053C001": {
                        "code": "12053C001",
                        "name_cht": "抗核抗體(間接免疫螢光法)",
                        "name_eng": "ANA titer",
                        "unit": "-/+",
                        "ref": "Negative：40X"
                    },
                    "12053C002": {
                        "code": "12053C002",
                        "name_cht": "抗核抗體(間接免疫螢光法)",
                        "name_eng": "ANA result",
                        "unit": "",
                        "ref": ""
                    },
                    "09113B": {
                        "code": "09113B",
                        "name_cht": "皮質素免疫分析",
                        "name_eng": "Cortisol",
                        "unit": "ug/dL",
                        "ref": "6.7-22.6"
                    },
                    "09105C": {
                        "code": "09105C",
                        "name_cht": "黃體脂酮免疫分析",
                        "name_eng": "Progesteron (EIA/LIA)",
                        "unit": "ng/ml",
                        "ref": "0.1-0.84"
                    },
                    "12018C": {
                        "code": "12018C",
                        "name_cht": "梅毒螺旋體抗體試驗",
                        "name_eng": "TPPA/TPHA test",
                        "unit": "-/+",
                        "ref": "Non-reactive"
                    },
                    "07003C": {
                        "code": "07003C",
                        "name_cht": "阿米巴檢驗 (直接法)",
                        "name_eng": "Amoeba (direct smear)",
                        "unit": "-/+",
                        "ref": "not found"
                    },
                    "08009C": {
                        "code": "08009C",
                        "name_cht": "紅血球型態",
                        "name_eng": "RBC morphology",
                        "unit": "",
                        "ref": "Normocytic"
                    },
                    "09107C": {
                        "code": "09107C",
                        "name_cht": "游離三碘甲狀腺素免疫分析",
                        "name_eng": "Free T3 (EIA/LIA)",
                        "unit": "pg/mL",
                        "ref": "2.5-3.9"
                    },
                    "12198C": {
                        "code": "12198C",
                        "name_cht": "游離攝護腺特異抗原",
                        "name_eng": "Free PSA (EIA/LIA)",
                        "unit": "ng/ml",
                        "ref": "0.2-4.9"
                    },
                    "06chs001": {
                        "code": "06chs001",
                        "name_cht": "肌酐酸廓清率",
                        "name_eng": "Creatinine clearance rate (CCR)",
                        "unit": "mL/min",
                        "ref": "男：71-135 女：78-116"
                    },
                    "12027B": {
                        "code": "12027B",
                        "name_cht": "免疫球蛋白A-免疫比濁法",
                        "name_eng": "IgA(Nephelometry)",
                        "unit": "mg/dL",
                        "ref": "40-230"
                    },
                    "15017C": {
                        "code": "15017C",
                        "name_cht": "婦科細胞檢查(子宮頸細胞病理檢驗)",
                        "name_eng": "Cervical Cytology(Pap's smear；cytology)",
                        "unit": "-/+",
                        "ref": "Normal"
                    },
                    "30021C": {
                        "code": "30021C",
                        "name_cht": "過敏原試驗(定性)",
                        "name_eng": "Allergen test(qualitative)",
                        "unit": "PAU/L",
                        "ref": "<0.35"
                    },
                    "12022C": {
                        "code": "12022C",
                        "name_cht": "乙型人類絨毛膜促性腺激素",
                        "name_eng": "β-HCG (EIA)",
                        "unit": "mIU/mL",
                        "ref": "停經前菲懷孕婦女 ≦1 ；停經後婦女≦7；男性≦2"
                    },
                    "09138C": {
                        "code": "09138C",
                        "name_cht": "直接及總膽紅素比值",
                        "name_eng": "Direct Bilirubin/Total Bilirubin Ratio",
                        "unit": "mg/dL",
                        "ref": "0.2-1.2"
                    },
                    "09121C": {
                        "code": "09121C",
                        "name_cht": "睪丸酯醇免疫分析",
                        "name_eng": "Testosterone (EIA/LIA)",
                        "unit": "ng/mL",
                        "ref": "男性：1.75-7.81；女性：0-0.75"
                    },
                    "09108C": {
                        "code": "09108C",
                        "name_cht": "生長激素免疫分析",
                        "name_eng": "GH (Growth hormon), EIA/LIA",
                        "unit": "ng/mL",
                        "ref": "男性：0.003-0.971；女性：0.010-3.607"
                    },
                    "09103C": {
                        "code": "09103C",
                        "name_cht": "胰島素免疫分析",
                        "name_eng": "Insulin(EIA/LIA)",
                        "unit": "mU/L",
                        "ref": "1.5-17"
                    },
                    "16008C": {
                        "code": "16008C",
                        "name_cht": "關節囊液分析-常規檢查",
                        "name_eng": "Synovial fluid analysis-Routine",
                        "unit": "",
                        "ref": ""
                    },
                    "14068B": {
                        "code": "14068B",
                        "name_cht": "帶狀皰疹病毒IgG抗體試驗",
                        "name_eng": "Varicella/zoster-1gG",
                        "unit": "mIU/mL",
                        "ref": "Negative：<150；Positive：≧150"
                    },
                    "14013B": {
                        "code": "14013B",
                        "name_cht": "帶狀皰疹病毒IgM抗體試驗",
                        "name_eng": "Varicella/zoster-1gM",
                        "unit": "mIU/mL",
                        "ref": "Negative：0.9-1.09 Index；Positive：≧1.1 Index"
                    },
                    "14070B": {
                        "code": "14070B",
                        "name_cht": "麻疹病毒抗體IgG",
                        "name_eng": "Measlease IgG",
                        "unit": "AU/mL",
                        "ref": "Negative：<1.35；Equivocal：1.35-16.4；Positive：≧16.5"
                    },
                    "12182C": {
                        "code": "12182C",
                        "name_cht": "(B型肝炎病毒)去氧核醣核酸類定性擴增試驗",
                        "name_eng": "(HBV)DNA qualitative amplification test)",
                        "unit": "-/+",
                        "ref": "undetectable"
                    },
                    "12183C": {
                        "code": "12183C",
                        "name_cht": "(C型肝炎病毒)核醣核酸類定性擴增試驗",
                        "name_eng": "(HCV)RNA qualitative amplification test)",
                        "unit": "-/+",
                        "ref": "undetectable"
                    },
                    "12184C": {
                        "code": "12184C",
                        "name_cht": "(B型肝炎病毒)去氧核醣核酸類定量",
                        "name_eng": "(HBV)-DNA(定量)PCR",
                        "unit": "-/+",
                        "ref": "undetectable"
                    },
                    "12185C": {
                        "code": "12185C",
                        "name_cht": "(C型肝炎病毒)核醣核酸類定量擴增試驗",
                        "name_eng": "(HCV)RNA qualitative amplification test)",
                        "unit": "-/+",
                        "ref": "undetectable"
                    },
                    "09028C": {
                        "code": "09028C",
                        "name_cht": "酸性磷酯脢",
                        "name_eng": "Acid phosphatase",
                        "unit": "U/L",
                        "ref": "0.00-0.80"
                    },
                    "10501C": {
                        "code": "10501C",
                        "name_cht": "卡巴馬平",
                        "name_eng": "Carbamazepine",
                        "unit": "ug/mL",
                        "ref": "4.0-12.0"
                    },
                    "10510C": {
                        "code": "10510C",
                        "name_cht": "發爾波克",
                        "name_eng": "Valproic acid",
                        "unit": "ug/mL",
                        "ref": "50-100"
                    },
                    "09chs004": {
                        "code": "09chs004",
                        "name_cht": "國際標準化比值",
                        "name_eng": "INR(International Normalize Ratio)",
                        "unit": "sec",
                        "ref": "10.6-12.4"
                    },
                    "09chs005": {
                        "code": "09chs005",
                        "name_cht": "平均正常凝血酶原時間",
                        "name_eng": "MNPT(Mean Normal Prothrombin Time)",
                        "unit": "sec",
                        "ref": "11.27"
                    },
                    "09chs006": {
                        "code": "09chs006",
                        "name_cht": "低密度脂蛋白-膽固醇(計算值)",
                        "name_eng": "LDL-C(Lowdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "<130"
                    },
                    "09128C": {
                        "code": "09128C",
                        "name_cht": "C-胜鏈胰島素免疫分析",
                        "name_eng": "C-peptide",
                        "unit": "ng/mL",
                        "ref": "0.81-3.85"
                    },
                    "09122C": {
                        "code": "09122C",
                        "name_cht": "Intact副甲狀腺素免疫分析",
                        "name_eng": "PTH-i(Parathyroid Hormone Intact)",
                        "unit": "pg/mL",
                        "ref": "15-65"
                    },
                    "12151C": {
                        "code": "12151C",
                        "name_cht": "高半胱胺酸",
                        "name_eng": "Hcy(Homocysteine)",
                        "unit": "umol/L",
                        "ref": "血漿:3.7-17.2 血清:6.5-20.0"
                    },
                    "27031B": {
                        "code": "27031B",
                        "name_cht": "醛類脂醇酵素",
                        "name_eng": "Aldosterone",
                        "unit": "Serum:pg/mL Urine:ug/day",
                        "ref": "Serum:立姿:48.3-270.0 臥姿:68.0-173.0；Urine:2.84-33.99"
                    },
                    "09130B": {
                        "code": "09130B",
                        "name_cht": "葉酸免疫分析",
                        "name_eng": "Folic acid/Folate",
                        "unit": "ng/mL",
                        "ref": "Normal:>5.38  Indeterminate:3.38-5.38  Deficient:≦3.37"
                    },
                    "25003C": {
                        "code": "25003C",
                        "name_cht": "外科病理(第三級外科病理)",
                        "name_eng": "Biopsy (Surgical pathology Level Ⅲ)",
                        "unit": "",
                        "ref": "Normal"
                    },
                    "25004C": {
                        "code": "25004C",
                        "name_cht": "外科病理(第四級外科病理)",
                        "name_eng": "Biopsy (Surgical pathology Level Ⅳ)",
                        "unit": "",
                        "ref": "Normal"
                    },
                    "12193B": {
                        "code": "12193B",
                        "name_cht": "原生B型利鈉利尿胜",
                        "name_eng": "Pro-BNP/(BNP)",
                        "unit": "pg/mL",
                        "ref": "<125"
                    },
                    "09037C": {
                        "code": "09037C",
                        "name_cht": "血氨",
                        "name_eng": "Blood ammonia",
                        "unit": "ug/dL",
                        "ref": "19-55"
                    },
                    "10520C": {
                        "code": "10520C",
                        "name_cht": "鋰鹽",
                        "name_eng": "Li(Lithium)",
                        "unit": "mEq/L",
                        "ref": "0.6-1.2"
                    },
                    "12010C": {
                        "code": "12010C",
                        "name_cht": "類風濕性關節炎因子試驗-被動血球凝集法",
                        "name_eng": "Rheumatoid factor test-PHA(Passive hemagglutination)",
                        "unit": "mEq/L",
                        "ref": "0.6-1.2"
                    },
                    "09139C": {
                        "code": "09139C",
                        "name_cht": "醣化白蛋白",
                        "name_eng": "Glycated Albumin (GA)",
                        "unit": "%",
                        "ref": "11.0-16.0"
                    },
                    "12202C": {
                        "code": "12202C",
                        "name_cht": "C型肝炎病毒核酸基因檢測－即時聚合酉每連鎖反應法",
                        "name_eng": "HCV Genotyping Test（RealTime PCR）",
                        "unit": "-/+",
                        "ref": "Undetectable"
                    },
                    "09chs007": {
                        "code": "09chs007",
                        "name_cht": "維生素D",
                        "name_eng": "25-OH Vitamin D Total",
                        "unit": "ng/mL",
                        "ref": "30.0-100.0"
                    },
                    "21+L1001C001": {
                        "code": "21+L1001C001",
                        "name_cht": "B型肝炎表面抗原",
                        "name_eng": "HBsAg (EIA/LIA)",
                        "unit": "-/+",
                        "ref": "Non-reactive：＜1.0 Reactive：≧1.0"
                    },
                    "21+L1001C002": {
                        "code": "21+L1001C002",
                        "name_cht": "Ｂ型肝炎表面抗原(數值)",
                        "name_eng": "HBsAg (EIA/LIA)",
                        "unit": "IU/mL",
                        "ref": "Non-reactive：＜0.05 ，Reactive：0.05～10 ，High-reactive：＞10"
                    },
                    "21+L1001C003": {
                        "code": "21+L1001C003",
                        "name_cht": "Ｃ型肝炎病毒抗體檢查",
                        "name_eng": "HCV Ab (EIA/LIA)",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "21+L1001C004": {
                        "code": "21+L1001C004",
                        "name_cht": "Ｃ型肝炎病毒抗體檢查(數值)",
                        "name_eng": "HCV Ab (EIA/LIA)",
                        "unit": "S/Co",
                        "ref": "Non-reactive：＜1.0，Reactive    ：＞=1.0"
                    },
                    "21+L1001C005": {
                        "code": "21+L1001C005",
                        "name_cht": "血糖",
                        "name_eng": "Glucose-AC",
                        "unit": "mg/dL",
                        "ref": "70 ~ 100"
                    },
                    "21+L1001C006": {
                        "code": "21+L1001C006",
                        "name_cht": "總膽固醇",
                        "name_eng": "Cholestero1, total",
                        "unit": "mg/dL",
                        "ref": "50 ~ 200"
                    },
                    "21+L1001C007": {
                        "code": "21+L1001C007",
                        "name_cht": "三酸甘油脂",
                        "name_eng": "Triglyceride (TG)",
                        "unit": "mg/dL",
                        "ref": "35 ~ 170"
                    },
                    "21+L1001C008": {
                        "code": "21+L1001C008",
                        "name_cht": "高密度脂蛋白－膽固醇",
                        "name_eng": "HDL-C(highdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "35 ~ 75"
                    },
                    "21+L1001C009": {
                        "code": "21+L1001C009",
                        "name_cht": "血清麩胺酸苯醋酸轉氨基酶",
                        "name_eng": "S-GOT/AST",
                        "unit": "IU/L",
                        "ref": "5 ~ 40"
                    },
                    "21+L1001C010": {
                        "code": "21+L1001C010",
                        "name_cht": "血清麩胺酸丙酮酸轉氨基酶",
                        "name_eng": "S-GPT/ALT",
                        "unit": "IU/L",
                        "ref": "5 ~ 40"
                    },
                    "21+L1001C011": {
                        "code": "21+L1001C011",
                        "name_cht": "肌酸酐、血",
                        "name_eng": "Creatinine (B) CRTN",
                        "unit": "mg/dL",
                        "ref": "0.5-1.3"
                    },
                    "21+L1001C012": {
                        "code": "21+L1001C012",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "",
                        "ref": "-/+"
                    },
                    "21+L1001C013": {
                        "code": "21+L1001C013",
                        "name_cht": "腎絲球過濾率計算",
                        "name_eng": "eGFR",
                        "unit": "ml/min/1.73m^2",
                        "ref": ""
                    },
                    "21+L1001C014": {
                        "code": "21+L1001C014",
                        "name_cht": "低密度脂蛋白-膽固醇(計算值)",
                        "name_eng": "LDL-C(Lowdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "<130"
                    },
                    "09129C": {
                        "code": "09129C",
                        "name_cht": "維生素B12免疫分析",
                        "name_eng": "VIT-B12 (EIA/LIA)",
                        "unit": "pg/mL",
                        "ref": "247-911 pg/mL"
                    },
                    "14009C": {
                        "code": "14009C",
                        "name_cht": "腮腺炎病毒補體結合抗體",
                        "name_eng": "Mumps CF virus Ab",
                        "unit": "RU/ml",
                        "ref": "Negative: <16；Borderline:>=16 -< 22；Positive: >=22 RU/ml"
                    },
                    "12121C": {
                        "code": "12121C",
                        "name_cht": "甲促素結合體抗體",
                        "name_eng": "TSH receptor Ab",
                        "unit": "IU/L",
                        "ref": "<0.10"
                    },
                    "07chs001": {
                        "code": "07chs001",
                        "name_cht": "糞便幽門桿菌抗原",
                        "name_eng": "Stool H.Pylori Ag",
                        "unit": "-/+",
                        "ref": "(-)"
                    },
                    "09049B001": {
                        "code": "09049B001",
                        "name_cht": "血中鉛",
                        "name_eng": "Lead(Pb)(Blood",
                        "unit": "μg/dL",
                        "ref": "<= 10"
                    },
                    "09049B002": {
                        "code": "09049B002",
                        "name_cht": "尿鉛",
                        "name_eng": "Lead(Pb)(Urine)",
                        "unit": "μg/dL",
                        "ref": "< 23"
                    },
                    "08079B": {
                        "code": "08079B",
                        "name_cht": "D-D雙合試驗",
                        "name_eng": "D-Dimer",
                        "unit": "mg/L(FEU)",
                        "ref": "<0.55"
                    },
                    "3D001": {
                        "code": "3D001",
                        "name_cht": "身高",
                        "name_eng": "height",
                        "unit": "cm",
                        "ref": ""
                    },
                    "3D002": {
                        "code": "3D002",
                        "name_cht": "體重",
                        "name_eng": "body weight",
                        "unit": "kg",
                        "ref": ""
                    },
                    "3D003": {
                        "code": "3D003",
                        "name_cht": "脈搏",
                        "name_eng": "pulse",
                        "unit": "次/分鐘",
                        "ref": ""
                    },
                    "3D004": {
                        "code": "3D004",
                        "name_cht": "收縮壓",
                        "name_eng": "Systolic pressure",
                        "unit": "mmHg",
                        "ref": "<130mmHg"
                    },
                    "3D005": {
                        "code": "3D005",
                        "name_cht": "舒張壓",
                        "name_eng": "Diastolic pressure",
                        "unit": "mmHg",
                        "ref": "<80mmHg"
                    },
                    "3D006": {
                        "code": "3D006",
                        "name_cht": "腰圍",
                        "name_eng": "Waistline",
                        "unit": "cm",
                        "ref": ""
                    },
                    "3D007": {
                        "code": "3D007",
                        "name_cht": "身體質量指數",
                        "name_eng": "Body Mass Index",
                        "unit": "",
                        "ref": ""
                    },
                    "3D008": {
                        "code": "3D008",
                        "name_cht": "裸視[右眼]",
                        "name_eng": "bare eyesight(right)",
                        "unit": "",
                        "ref": ""
                    },
                    "3D009": {
                        "code": "3D009",
                        "name_cht": "裸視[左眼]",
                        "name_eng": "bare eyesight(left)",
                        "unit": "",
                        "ref": ""
                    },
                    "3D010": {
                        "code": "3D010",
                        "name_cht": "矯正[右眼]",
                        "name_eng": "corrected vision(right)",
                        "unit": "",
                        "ref": ""
                    },
                    "3D011": {
                        "code": "3D011",
                        "name_cht": "矯正[左眼]",
                        "name_eng": "corrected vision(left)",
                        "unit": "",
                        "ref": ""
                    },
                    "3D012": {
                        "code": "3D012",
                        "name_cht": "血液及體液葡萄糖",
                        "name_eng": "Glucose",
                        "unit": "mg/dL",
                        "ref": "70 ~ 100"
                    },
                    "3D013": {
                        "code": "3D013",
                        "name_cht": "肌酸酐、血",
                        "name_eng": "Creatinine (B) CRTN",
                        "unit": "mg/dL",
                        "ref": "0.5-1.3"
                    },
                    "3D014": {
                        "code": "3D014",
                        "name_cht": "血清麩胺酸苯醋酸轉氨基酶",
                        "name_eng": "S-GOT/AST",
                        "unit": "IU/L",
                        "ref": "5 ~ 40"
                    },
                    "3D015": {
                        "code": "3D015",
                        "name_cht": "血清麩胺酸丙酮酸轉氨基酶",
                        "name_eng": "S-GPT/ALT",
                        "unit": "IU/L",
                        "ref": "5 ~ 40"
                    },
                    "3D016": {
                        "code": "3D016",
                        "name_cht": "總膽固醇",
                        "name_eng": "Cholestero1,total",
                        "unit": "mg/dL",
                        "ref": "<200"
                    },
                    "3D017": {
                        "code": "3D017",
                        "name_cht": "三酸甘油脂",
                        "name_eng": "Triglyceride (TG)",
                        "unit": "mg/dL",
                        "ref": "<150"
                    },
                    "3D018": {
                        "code": "3D018",
                        "name_cht": "低密度脂蛋白－膽固醇",
                        "name_eng": "LDL-C(Lowdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "<130"
                    },
                    "3D019": {
                        "code": "3D019",
                        "name_cht": "高密度脂蛋白－膽固醇",
                        "name_eng": "HDL-C(highdensity lipoprotein cholesterol)",
                        "unit": "mg/dL",
                        "ref": "男:≥40；女:≥50"
                    },
                    "3D020": {
                        "code": "3D020",
                        "name_cht": "總膽固醇/高密度脂蛋白膽固醇比",
                        "name_eng": "Cholestero1,total/HDL-C ratio",
                        "unit": "*",
                        "ref": "<5"
                    },
                    "3D021": {
                        "code": "3D021",
                        "name_cht": "低密度/高密度脂蛋白膽固醇比",
                        "name_eng": "LDL-C/HDL-C ratio",
                        "unit": "*",
                        "ref": ""
                    },
                    "3D022": {
                        "code": "3D022",
                        "name_cht": "顏色",
                        "name_eng": "color",
                        "unit": "Yellow",
                        "ref": "Yellow"
                    },
                    "3D023": {
                        "code": "3D023",
                        "name_cht": "混濁度",
                        "name_eng": "turbidity",
                        "unit": "Clear",
                        "ref": "Clear"
                    },
                    "3D024": {
                        "code": "3D024",
                        "name_cht": "尿蛋白",
                        "name_eng": "Urine protein",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "3D025": {
                        "code": "3D025",
                        "name_cht": "尿糖",
                        "name_eng": "Urine sugar",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "3D026": {
                        "code": "3D026",
                        "name_cht": "酸鹼度反應",
                        "name_eng": "pH",
                        "unit": "-",
                        "ref": "5.5 ~ 7.5"
                    },
                    "3D027": {
                        "code": "3D027",
                        "name_cht": "尿潛血",
                        "name_eng": "Urine occult blood",
                        "unit": "-/+",
                        "ref": "Negative"
                    },
                    "3D028": {
                        "code": "3D028",
                        "name_cht": "尿紅血球",
                        "name_eng": "Urine R.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF"
                    },
                    "3D029": {
                        "code": "3D029",
                        "name_cht": "尿白血球",
                        "name_eng": "Urine W.B.C",
                        "unit": "cells/HPF",
                        "ref": "< 5 /HPF"
                    },
                    "3D030": {
                        "code": "3D030",
                        "name_cht": "尿上皮細胞",
                        "name_eng": "Urine Epithelium",
                        "unit": "cells/HPF",
                        "ref": "< 3 /HPF"
                    },
                    "3D031": {
                        "code": "3D031",
                        "name_cht": "尿圓柱體",
                        "name_eng": "Urine Cast",
                        "unit": "(-)/LPF",
                        "ref": "Negative"
                    },
                    "3D032": {
                        "code": "3D032",
                        "name_cht": "尿細菌",
                        "name_eng": "Urine Bacteria",
                        "unit": "HPF",
                        "ref": "Negative"
                    },
                    "3D033": {
                        "code": "3D033",
                        "name_cht": "肌酐、尿",
                        "name_eng": "Creatinine (U) CRTN",
                        "unit": "mg/dL",
                        "ref": "60-250"
                    },
                    "3D034": {
                        "code": "3D034",
                        "name_cht": "腎絲球過濾率計算",
                        "name_eng": "eGFR",
                        "unit": "ml/min/1.73m^2",
                        "ref": ""
                    },
                    "3D035": {
                        "code": "3D035",
                        "name_cht": "尿液總蛋白／肌酐、尿比值",
                        "name_eng": "U PCR",
                        "unit": "mg/gm",
                        "ref": "<150"
                    },
                    "3D036": {
                        "code": "3D036",
                        "name_cht": "慢性腎臟病期數",
                        "name_eng": "CKD Stage",
                        "unit": "",
                        "ref": "第0期：正常"
                    },
                    "3D037": {
                        "code": "3D037",
                        "name_cht": "骨質密度",
                        "name_eng": "BMD",
                        "unit": "",
                        "ref": ""
                    },
                    "3D038": {
                        "code": "3D038",
                        "name_cht": "尿酸、血",
                        "name_eng": "Uric acid",
                        "unit": "mg/dL",
                        "ref": "M：3.0-7.0    F：2.0-6.0"
                    },
                    "14065C": {
                        "code": "14065C",
                        "name_cht": "A型流行性感冒病毒抗原",
                        "name_eng": "Influenza A Viruses Antigen Rapid Test kit",
                        "unit": "",
                        "ref": "Negative"
                    },
                    "14066C": {
                        "code": "14066C",
                        "name_cht": "B型流行性感冒病毒抗原",
                        "name_eng": "Influenza B Viruses Antigen Rapid Test kit",
                        "unit": "",
                        "ref": "Negative"
                    }
                }
                document.getElementById('detailarea').style.display="block";
                document.getElementById('detailname').textContent=document.getElementById('basicname').textContent;
                document.getElementById('detailbirth').textContent=document.getElementById('basicbirth').textContent;
                document.getElementById('detailid').textContent=document.getElementById('basicid').textContent;
                document.getElementById('detailtitle').textContent="衛生所檢驗報告("+examdate+")";
                let detailtable=document.getElementById("detailtable");
                detailtable.innerHTML="<tr><td>中文</td><td>英文</td><td>結果</td><td>單位</td><td>參考值</td></tr>";
                for (let i=0;i<examarray.length;i++){
                    let examitem=examarray[i];
                    for (let j=0;j<examitem.length;j++){
                        let testCode=examitem[j].testCode;
                        let td1=examitem[j].testName;
                        let td2="N/A";
                        let td3=examitem[j].testResult;
                        let td4="N/A";
                        let td5="N/A";
                        if (testCode in examlist){
                            td1=examlist[testCode].name_cht;
                            td2=examlist[testCode].name_eng;
                            td4=examlist[testCode].unit;
                            td5=examlist[testCode].ref;
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
                        td.textContent=td3;
                        newrow.appendChild(td);
                        td=document.createElement('td');
                        td.textContent=td4;
                        newrow.appendChild(td);
                        td=document.createElement('td');
                        td.textContent=td5;
                        newrow.appendChild(td);

                    }
                }
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
        "html {font-family:'微軟正黑體'}" +
        ".title {font-size: 40px; text-align: center; width: 1000px;}" +
        ".basicinfotable { border-collapse: collapse; font-family:'微軟正黑體'; font-size:18px; }" +
        ".basicinfotable td:nth-of-type(1), .basicinfotable td:nth-of-type(3), .basicinfotable td:nth-of-type(5) {text-align: center; width: 80px;}" +
        ".basicinfotable td:nth-of-type(2), .basicinfotable td:nth-of-type(4), .basicinfotable td:nth-of-type(6) {text-align: left; width: 250px;}" +
        ".examtable { border-collapse: collapse; font-family:'微軟正黑體'; font-size:16px; }" +
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
          "height: 212px;" +
          "overflow-y: auto;" +
        "}" +
        ".v-container2 {" +
          "width: 1100px;" +
          "height: 500px;" +
          "overflow-y: auto;" +
        "}" +
        ".detailtable { border-collapse: collapse; font-family:'微軟正黑體'; font-size:18px; }" +
        ".detailtable td { border: 1px solid black; text-align: center; }" +
        ".detailtable td:nth-of-type(1) { text-align: center; width: 250px; }" +
        ".detailtable td:nth-of-type(2) { text-align: center; width: 250px; }" +
        ".detailtable td:nth-of-type(3) { text-align: center; width: 100px; }" +
        ".detailtable td:nth-of-type(4) { text-align: center; width: 100px; }" +
        ".detailtable td:nth-of-type(5) { text-align: center; width: 200px; }" +
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
                        <button onclick="printElement('commanarea', 'portrait')">列印</button>
                    </div>
                    
                    <div class="v-container1">
                        <table class="examtable" id="examtable"></table>
                    </div>
                </div>
                <div>
                    <canvas id="Chart" width="600" height="250"></canvas>
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
                        <td>身分證:</td>
                        <td id="detailid"></td>
                    </tr>
                </table>
                <button onclick="printElement('detailarea', 'portrait')">列印</button>
            </div>
            
            <div class="v-container2">
                <table class="detailtable" id="detailtable"></table>
            </div>
        </div>
        <iframe id="printarea" style="width: 0px; height:0px;"></iframe>
        
    </body>
	
</html>`;y=y.replace("please_change_me",retobjs),console.log(_);let C=window.open("","_blank");C.document.open(),C.document.write(y),C.document.close()}function button_trydebug_handle(){if(cc=document.URL,d1="https://phpcis.chshb.gov.tw/consultationMainPage/",cc.includes(d1)){errmsg="出現以下錯誤",CKDICD=["A1811","A5275","C641","C642","C649","C7A093","Z5112","D3000","D3001","D3002","D3A093","D4100","D4101","D4102","D4110","D4111","D4112","D4120","D4121","D4122","E1121","E1122","E1129","E1321","E1322","E1329","E1021","E1022","E1029","E1121","E1122","E1129","E1165","E1021","E1065","E748","M1030","M10311","M10312","M10319","M10321","M10322","M10329","M10331","M10332","M10339","M10341","M10342","M10349","M10351","M10352","M10359","M10361","M10362","M10369","M10371","M10372","M10379","M1038","M1039","N200","M1030","D593","I120","I129","I1311","I132","I701","I7581","I722","I7773","I773","K767","N000","N001","N002","N003","N004","N005","N006","N007","N010","N011","N012","N013","N014","N015","N016","N017","N018","N019","N08","N008","N009","N044","N021","N022","N023","N041","N042","N024","N025","N026","N027","N043","N044","N045","N046","N020","N040","N028","N047","N048","N029","N049","N032","N031","N033","N034","N035","N036","N037","N038","","N030","N039","N059","N052","N062","N072","N053","N054","N055","N063","N064","N065","N073","N074","N075","N059","N171","N172","E1021","E1121","N16","N050","N051","N056","N057","N058","N060","N061","N066","N067","N068","N070","N071","N076","N077","N078","N140","N141","N142","N143","N144","N150","N158","N059","N069","N079","N159","N170","N171","N172","N178","N179","N181","N182","N183","N189","N19","N261","N269","N250","N251","N2581","N2589","N259","N131","N132","N1330","N1339","O10419","O10411","O10412","O10413","O1042","O1043","Q6101","Q613","Q612","Q6111","Q6119","Q614","Q615","Q615","Q6102","Q618","Q6239","Q6211","Q6212","Q6231","Q6232","Q620","Q6210","Q6211","Q622","R944"],DMICD=["E08","E09","E10","E11","E12","E13"],vaccinelist=["KC00452206","KC00452209","KC00452221","K000301206","K000301209","K000351206","K000351209","K000906206","X000153206","K000702206","X000154206","X000155229","K000440206","X000157206","J000085216","K000364206","K000510206","K000450206","K000480206","K000456206","K000456209","K000501206","K000501209","K000967206","K000981206","X000164206","X000165206"],translist=["01036C","01037C"];try{mainICD=document.getElementsByClassName("table table-striped table-bordered table-sm consultationMainPageTable commonTable")[7].children[1].rows[0].cells[1].textContent.replaceAll(".","")}catch(e){mainICD="",errmsg=t(errmsg,"無診斷碼")}for(ttt=document.getElementsByClassName("table table-striped table-bordered table-condensed consultationMainPageTable commonTable")[0],i=0;i<ttt.children[0].rows[0].cells.length;i++)"申報代碼"==ttt.children[0].rows[0].cells[i].textContent&&(codecolumn=i),"主成分"==ttt.children[0].rows[0].cells[i].textContent&&(maincolumn=i),"自費組序"==ttt.children[0].rows[0].cells[i].textContent&&(selfpaycolumn=i),"醫囑名稱"==ttt.children[0].rows[0].cells[i].textContent&&(ordernamecolumn=i),"轉診院所代碼"==ttt.children[0].rows[0].cells[i].textContent&&(transsitecolumn=i),"慢箋"==ttt.children[0].rows[0].cells[i].textContent&&(ischroniccolumn=i);for(alllist=document.getElementsByClassName("form-control consultationMainPage__value"),changeevent=new Event("change",{bubbles:!0}),i=0;i<alllist.length;i++)"visitTypeId"==alllist[i].id&&(visitTypeId=alllist[i].value),"caseTypeId"==alllist[i].id&&(caseTypeId=alllist[i].value),"shareId"==alllist[i].id&&(shareId=alllist[i].value);for(checklist=document.getElementsByClassName("form-check-input"),i=0;i<checklist.length;i++)"isChronic"==checklist[i].name&&(isChronic=checklist[i].checked);for(codearray=[],P1found=!1,P2found=!1,P3found=!1,P4found=!1,P5found=!1,SSfound=!1,chronicchronic=!1,i=1;i<ttt.rows.length;i++)thecode=ttt.rows[i].cells[codecolumn].textContent,themain=ttt.rows[i].cells[maincolumn].textContent,"P1407C"==thecode&&(DMICD.includes(mainICD.substring(0,3))||(errmsg=t(errmsg,"DM收案診斷不符")),"22"!=visitTypeId&&(errmsg=t(errmsg,"DM收案身分別應為6a"))),"P1408C"!=thecode&&"P1410C"!=thecode||"23"!=visitTypeId&&(errmsg=t(errmsg,"DM追蹤身分別應為6b")),"P1409C"!=thecode&&"P1411C"!=thecode||"24"!=visitTypeId&&(errmsg=t(errmsg,"DM年度身分別應為6c")),"P4301C"==thecode&&(CKDICD.includes(mainICD)||(errmsg=t(errmsg,"CKD收案診斷不符")),"26"!=visitTypeId&&(errmsg=t(errmsg,"CKD收案身分別應為6s"))),"P4302C"==thecode&&"27"!=visitTypeId&&(errmsg=t(errmsg,"CKD追蹤身分別應為6t")),"P7001C"==thecode&&"23"!=visitTypeId&&(errmsg=t(errmsg,"DKD追蹤身分別應為6b")),"P7002C"==thecode&&"24"!=visitTypeId&&(errmsg=t(errmsg,"DKD年度身分別應為6c")),"E4003C"!=thecode&&"E4004C"!=thecode||("69"!=visitTypeId&&(errmsg=t(errmsg,"TT/IGRA身分別應為6T結核病接觸者")),"37"!=caseTypeId&&(errmsg=t(errmsg,"TT/IGRA案件別應為C4行政協助無健保結核病患就醫案件"))),(themain.toUpperCase().includes("ISONIAZID")||themain.toUpperCase().includes("RIFAPENTINE"))&&("4"!=visitTypeId&&(errmsg=t(errmsg,"LTBI身分別應為65")),"21"!=caseTypeId&&(errmsg=t(errmsg,"LTBI案件別應為06結核病"))),"28"==visitTypeId&&("申報代碼"==thecode||"A2051C"==thecode||vaccinelist.includes(thecode)||translist.includes(thecode)||(errmsg=t(errmsg,"6x兒童預注身分別不可開立接種、疫苗及轉診以外處方")),vaccinelist.includes(thecode)&&""==ttt.rows[i].cells[selfpaycolumn].children[0].children[0].value&&(errmsg=t(errmsg,ttt.rows[i].cells[ordernamecolumn].textContent+"須有自費組序")),"9"!=shareId&&(errmsg=t(errmsg,"6x兒童預注身分別部分負擔為009"))),translist.includes(thecode)&&""==ttt.rows[i].cells[transsitecolumn].children[0].children[0].value&&(errmsg=t(errmsg,"轉診需填寫轉診院所代號")),"31"!=visitTypeId&&"1"!=visitTypeId&&"2"!=visitTypeId&&"3"!=visitTypeId||"19"!=caseTypeId&&"23"!=caseTypeId&&(errmsg=t(errmsg,"健保身分建議案件類別為04或09")),"E1022C"!=thecode&&"E1027C"!=thecode||"18"!=caseTypeId&&(errmsg=t(errmsg,"戒菸處置身分別為6S")),"22"==visitTypeId&&"P1407C"==thecode&&(P1found=!0),"23"==visitTypeId&&("P1408C"!=thecode&&"P1410C"!=thecode&&"P7001C"!=thecode||(P2found=!0)),"24"==visitTypeId&&("P1409C"!=thecode&&"P1411C"!=thecode&&"P7002C"!=thecode||(P3found=!0)),"26"==visitTypeId&&"P4301C"==thecode&&(P4found=!0),"27"==visitTypeId&&"P4302C"==thecode&&(P5found=!0),"18"==visitTypeId&&"E1027C"==thecode&&(SSfound=!0),theischronic=ttt.rows[i].cells[ischroniccolumn].children[0].checked,theischronic&&(chronicchronic=!0),!isChronic&&theischronic&&(errmsg=t(errmsg,"開立慢籤藥物請使用F12建立慢籤資訊")),codearray.push(thecode);for(isChronic&&(chronicchronic||(errmsg=t(errmsg,"F12建立慢籤但無勾選慢籤藥物"))),P1found||"22"!=visitTypeId||(errmsg=t(errmsg,"6a身分別需開立P1407C")),P2found||"23"!=visitTypeId||(errmsg=t(errmsg,"6b身分別需開立P1408C或P14010C或P70010C")),P3found||"24"!=visitTypeId||(errmsg=t(errmsg,"6c身分別需開立P1409C或P14011C或P7002C")),P4found||"26"!=visitTypeId||(errmsg=t(errmsg,"6s身分別需開立P4301C")),P5found||"27"!=visitTypeId||(errmsg=t(errmsg,"6t身分別需開立P4302C")),SSfound||"18"!=visitTypeId||(errmsg=t(errmsg,"戒菸身分別需開立E1027C")),thedupli=0,i=0;i<ttt.rows.length;i++)thecode=ttt.rows[i].cells[codecolumn].textContent,thecodecount=e(codearray,thecode),thecodecount>1&&(ttt.rows[i].style.backgroundColor="#FF5151",thedupli+=1);thedupli>0&&(errmsg+="\n重複開立處方，請檢查下方紅色欄位"),"出現以下錯誤"!=errmsg?(errmsg+="\n是否仍存檔?",result=confirm(errmsg),result&&document.getElementsByClassName("consultationMainPage__btn btn btn-primary")[0].click()):document.getElementsByClassName("consultationMainPage__btn btn btn-primary")[0].click()}else alert("請在看診頁面使用");function e(e,t){for(var n=0,i=0;i<e.length;i++)e[i]===t&&n++;return n}function t(e,t){return e.includes(t)||(e=e+"\n"+t),e}}function button_autocomplete_handle(){if(c=document.URL,d1="https://phpcis.chshb.gov.tw/populanceRegistration",d2="https://phpcis.chshb.gov.tw/registration",c==d1||c==d2){if(date0=document.getElementsByClassName("form-control ampInput")[0].value,date1=date0.split(" ")[1],period1=document.getElementsByClassName("form-control ampInput")[1].selectedOptions[0].value,room0=document.getElementsByClassName("form-control ampInput")[2].selectedOptions[0].innerText.split(" ")[0],xmlHttp=new XMLHttpRequest,URL="https://phpcis.chshb.gov.tw/api/v1/clinics/settings/find",xmlHttp.open("GET",URL,!1),xmlHttp.send(),res=xmlHttp.responseText,jres=JSON.parse(res),200==jres.code){for(ok=jres.result,upj={},upj.FOBTHospitalId=ok.CCSHospitalId,upj.FOBTLocation="",upj.adultTestType="Y",upj.clinicId=ok.clinicId,upj.healthExamHospitalId=ok.healthExamHospitalId,upj.isChargeReceipt=!1,upj.isIncludeAdultLevelOne=!0,upj.isIncludeAdultLevelTwo=!0,upj.isIncludeChild=!0,upj.isIncludeChildGuardian=!0,upj.isIncludeChildScreening=!0,upj.isIncludeCovid19=!0,upj.isIncludeFOBT=!0,upj.isIncludeFreeInfluenza=!0,upj.isIncludeFreePneumonia=!0,upj.isIncludeInfluenza=!0,upj.isIncludeOral=!0,upj.isIncludePneumonia=!0,upj.isIncludePneumonia13PCV=!0,upj.isIncludeUterus=!0,upj.isReplace=!1,upj.markFromIntegratedScreening=!1,upj.oralDivision="3",upj.oralLocation="2",upj.period=period1,URL2="https://phpcis.chshb.gov.tw/api/v1/rooms/list?clinicId="+upj.clinicId,xmlHttp.open("GET",URL2,!1),xmlHttp.send(),res2=xmlHttp.responseText,jres2=JSON.parse(res2),i=0;i<jres2.result.length;i++)if(jres2.result[i].name.includes(room0)){room1=jres2.result[i].roomId;break}if(upj.roomId=room1,upj.treatmentDate=date1,upjs=JSON.stringify(upj),URL3="https://phpcis.chshb.gov.tw/api/v1/preventions/batch_complete/create",xmlHttp.open("POST",URL3,!1),xmlHttp.setRequestHeader("Content-Type","application/json; charset=utf-8"),xmlHttp.send(upjs),res3=xmlHttp.responseText,jres3=JSON.parse(res3),200==jres3.code){for(alllist=document.getElementsByClassName("sidebar__nav")[0],i=0;i<alllist.childElementCount;i++)if("掛號"==alllist.children[i].innerText)regc=i;else if("門診看診作業"==alllist.children[i].innerText){opdc=i;break}alert("批次完成"),changeevent=new Event("change",{bubbles:!0}),document.getElementsByClassName("form-control ampInput")[2].dispatchEvent(changeevent)}else alert(jres3.message)}}else alert("請在掛號資訊列表或候診患者查詢使用")}function button_reflash_handle(){ccc=document.URL,d1="https://phpcis.chshb.gov.tw/registration",d2="https://phpcis.chshb.gov.tw/populanceRegistration",ccc.includes("https://phpcis.chshb.gov.tw")?ccc!=d1&&ccc!=d2||(changeevent=new Event("change",{bubbles:!0}),document.getElementsByClassName("form-control ampInput")[2].dispatchEvent(changeevent)):alert("請在PHPCIIS網域中使用")}function button_autocompletev2_handle(){function e(){var e=document.createElement("div");e.id="myDraggable_2",e.style.width="450px",e.style.background="#f9f9f9",e.style.border="1px solid #ccc",e.style.position="absolute",e.style.cursor="move",e.style.zIndex="9999",e.style.left=Math.ceil(window.innerWidth/2-225)+"px",e.style.top="300px",document.body.insertBefore(e,document.body.firstChild),e.addEventListener("mousedown",function(e){mouseX=e.clientX,mouseY=e.clientY,document.addEventListener("mousemove",p),document.addEventListener("mouseup",g)});var t=document.createElement("div");t.textContent="身分代號",e.appendChild(t);var n=document.createElement("select");for(n.id="visittypecombo",n.style.width="250px",i=0;i<json_visittype.result.length;i++)newOption=document.createElement("option"),visitTypeCode=json_visittype.result[i].visitTypeCode,visitTypeName=json_visittype.result[i].visitTypeName,newOption.text=visitTypeCode+" "+visitTypeName,newOption.value=visitTypeName,n.appendChild(newOption);t.appendChild(n);var a=document.createElement("button");a.id="confirmbutton",a.textContent="確定執行",a.style.height="50px",a.style.left="315px",a.style.position="absolute",a.addEventListener("click",s),t.appendChild(a);var r=document.createElement("button");r.id="exitbutton",r.textContent="關閉",r.style.height="50px",r.style.left="398px",r.style.position="absolute",r.addEventListener("click",u),t.appendChild(r);var o=document.createElement("div");o.textContent="標準處方",e.appendChild(o);var l=document.createElement("select");for(l.id="ordercombo",l.style.width="250px",i2=0;i2<json_freq_orders.result.length;i2++)newOption=document.createElement("option"),freqOrderCode=json_freq_orders.result[i2].freqOrderCode,freqOrderName=json_freq_orders.result[i2].freqOrderName,freqOrderId=json_freq_orders.result[i2].freqOrderId,newOption.text=freqOrderCode+" : "+freqOrderName,newOption.value=freqOrderId,l.appendChild(newOption);o.appendChild(l),l.addEventListener("change",h);var c=document.createElement("div");c.id="line3",c.textContent="主診斷:",e.appendChild(c);var d=document.createElement("div");function s(){if(tb=document.getElementsByClassName("table table-striped table-bordered table-sm role-list__role-table commonTable")[0],array_patient=[],tb.rows[1].cells.length>2)for(i9=1;i9<tb.rows.length;i9++)visittype=tb.rows[i9].cells[7].textContent,href=tb.rows[i9].cells[4].children[0].href.split("/"),registrationId=href[href.length-1],visittype.includes(n.value)&&array_patient.push(registrationId);array_patient.length>0?json_orderdetail.result.diseases.length>0?json_orderdetail.result.FreqOrderPrescription.length>0?confirm(n.value+" 身份別共 "+array_patient.length+" 位，是否執行?")&&m():alert("該標準處方無處置"):alert("該標準處方無診斷"):alert("該身分別無個案")}function m(){for(errmsg="",i3=0;i3<array_patient.length;i3++){for(registrationId=array_patient[i3],url_registrationId="https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId="+registrationId,xmlHttp=new XMLHttpRequest,xmlHttp.open("GET",url_registrationId,!1),xmlHttp.send(),res_registrations=xmlHttp.responseText,jres_registrations=JSON.parse(res_registrations),url_health_records="https://phpcis.chshb.gov.tw/api/v1/health_records/find?registrationId="+registrationId,xmlHttp=new XMLHttpRequest,xmlHttp.open("GET",url_health_records,!1),xmlHttp.send(),res_health_records=xmlHttp.responseText,jres_health_records=JSON.parse(res_health_records),forinjectdate={},forinjectdate.CC=json_orderdetail.result.CC,forinjectdate.PE=json_orderdetail.result.PE,forinjectdate.abnormalTreatmentSeqNo=null,forinjectdate.benefitTypeCode=jres_registrations.result.benefitTypeCode,forinjectdate.benefitTypeId=jres_registrations.result.benefitTypeId,forinjectdate.bmi=1*jres_health_records.result.bmi,16==jres_registrations.result.caseTypeId?(forinjectdate.caseTypeId=23,forinjectdate.caseTypeCode="09"):(forinjectdate.caseTypeId=jres_registrations.result.caseTypeId,forinjectdate.caseTypeCode=jres_registrations.result.caseTypeCode),forinjectdate.clinicId=json_freq_orders.result[0].clinicId,forinjectdate.codContent=jres_health_records.result.codContent,forinjectdate.courseHealthRecordId=jres_health_records.result.courseHealthRecordId,forinjectdate.dbp=1*jres_health_records.result.dbp,forinjectdate.diseases=[],i4=0;i4<json_orderdetail.result.diseases.length;i4++)tempdisease={},tempdisease.ICD10Code=json_orderdetail.result.diseases[i4].ICD10Code,tempdisease.diseaseId=json_orderdetail.result.diseases[i4].diseaseId,tempdisease.isChronic=json_orderdetail.result.diseases[i4].isChronic,0==i4?tempdisease.isMaster=!0:tempdisease.isMaster=!1,forinjectdate.diseases.push(tempdisease);for(forinjectdate.dispensingType=null,forinjectdate.glucoseAC=1*jres_health_records.result.glucoseAC,forinjectdate.glucosePC=1*jres_health_records.result.glucosePC,forinjectdate.healthRecordId=jres_health_records.result.healthRecordId,forinjectdate.height=1*jres_health_records.result.height,forinjectdate.homeCareType=jres_health_records.result.homeCareType,forinjectdate.isAutoCorrect=jres_health_records.result.isAutoCorrect,forinjectdate.isChronicPrescription=jres_health_records.result.isChronicPrescription,forinjectdate.isEmergencyVisit=jres_health_records.result.isEmergencyVisit,forinjectdate.isIncludeFamilyCare=jres_health_records.result.isIncludeFamilyCare,forinjectdate.isICCardWritten=jres_registrations.result.isICCard,forinjectdate.personalInfoId=jres_health_records.result.personalInfoId,forinjectdate.physicalExamHistoryId=jres_health_records.result.physicalExamHistoryId,forinjectdate.prescriptionDeadline=jres_health_records.result.prescriptionDeadline,forinjectdate.prescriptionNo=jres_health_records.result.prescriptionNo,forinjectdate.prescriptionReuseTimes=jres_health_records.result.prescriptionReuseTimes,forinjectdate.prescriptionType=jres_health_records.result.prescriptionType,forinjectdate.prescriptions=[],i5=0;i5<json_orderdetail.result.FreqOrderPrescription.length;i5++)tempprescription={},tempprescription.bureauTestCode=json_orderdetail.result.FreqOrderPrescription[i5].bureauTestCode,tempprescription.day=json_orderdetail.result.FreqOrderPrescription[i5].day,tempprescription.description="",tempprescription.drugCode=json_orderdetail.result.FreqOrderPrescription[i5].prescriptionCode,tempprescription.drugName=json_orderdetail.result.FreqOrderPrescription[i5].prescriptionName,tempprescription.drugRouteId=json_orderdetail.result.FreqOrderPrescription[i5].drugRouteId,tempprescription.drugUsageId=json_orderdetail.result.FreqOrderPrescription[i5].drugUsageId,tempprescription.endTime=null,tempprescription.isApplicable=json_orderdetail.result.FreqOrderPrescription[i5].isApplicable,tempprescription.isChronicPrescription=json_orderdetail.result.FreqOrderPrescription[i5].isChronicPrescription,tempprescription.isSchedule=!1,tempprescription.isScheduleCorrection=!1,tempprescription.modelType=json_orderdetail.result.FreqOrderPrescription[i5].modelType,tempprescription.ownExpenseSeq=json_orderdetail.result.FreqOrderPrescription[i5].ownExpenseSeq,tempprescription.prescriptionId=json_orderdetail.result.FreqOrderPrescription[i5].prescriptionId,tempprescription.prescriptionModel=json_orderdetail.result.FreqOrderPrescription[i5].prescriptionModel,tempprescription.qty=json_orderdetail.result.FreqOrderPrescription[i5].qty,json_visittype.result[n.selectedIndex].isApplicable?tempprescription.selfPayType=json_orderdetail.result.FreqOrderPrescription[i5].selfPayType:(selfPayType=json_orderdetail.result.FreqOrderPrescription[i5].selfPayType,"*"==selfPayType||"#"==selfPayType?tempprescription.selfPayType=json_orderdetail.result.FreqOrderPrescription[i5].selfPayType:tempprescription.selfPayType="*"),tempprescription.startTime="",tempprescription.testPackageCode=json_orderdetail.result.FreqOrderPrescription[i5].testPackageCode,tempprescription.testPackageId=json_orderdetail.result.FreqOrderPrescription[i5].testPackageId,tempprescription.testPackageName=json_orderdetail.result.FreqOrderPrescription[i5].testPackageName,json_orderdetail.result.FreqOrderPrescription[i5].totalQty<1?tempprescription.totalQty=1:tempprescription.totalQty=json_orderdetail.result.FreqOrderPrescription[i5].totalQty,forinjectdate.prescriptions.push(tempprescription);forinjectdate.pulse=1*jres_health_records.result.pulse,forinjectdate.registrationDate=jres_registrations.result.date,forinjectdate.registrationId=jres_registrations.result.registrationId,forinjectdate.sbp=jres_registrations.result.sbp,forinjectdate.scheduleTest=null,forinjectdate.scheduleTestId=null,forinjectdate.shareCode=jres_registrations.result.shareCode,forinjectdate.shareId=jres_registrations.result.shareId,forinjectdate.supplyReportType=jres_health_records.result.supplyReportType,forinjectdate.transferClinicCode=jres_health_records.result.transferClinicCode,forinjectdate.treatmentEndDate=jres_registrations.result.date,forinjectdate.treatmentTypeId=jres_registrations.result.treatmentTypeId,forinjectdate.visitTypeCode=jres_registrations.result.visitTypeCode,forinjectdate.visitTypeId=jres_registrations.result.visitTypeId,forinjectdate.waist=null,forinjectdate.weight=1*jres_health_records.result.weight,forinjectdate.writeICCard=jres_registrations.result.isCardCheck,forinjectdates=JSON.stringify(forinjectdate),url_check_valid="https://phpcis.chshb.gov.tw/api/v1/health_records/check_valid",xmlHttp=new XMLHttpRequest,xmlHttp.open("POST",url_check_valid,!1),xmlHttp.setRequestHeader("Content-Type","application/json; charset=utf-8"),xmlHttp.send(forinjectdates),res_check_valid=xmlHttp.responseText,jres_check_valid=JSON.parse(res_check_valid),200==jres_check_valid.code?(url_update="https://phpcis.chshb.gov.tw/api/v1/health_records/update",xmlHttp=new XMLHttpRequest,xmlHttp.open("POST",url_update,!1),xmlHttp.setRequestHeader("Content-Type","application/json; charset=utf-8"),xmlHttp.send(forinjectdates),res_update=xmlHttp.responseText,jres_update=JSON.parse(res_update),200!=jres_update.code&&(errmsg=errmsg+"update錯誤，ID:"+registrationId+":"+jres3.message+"\n")):errmsg=errmsg+"valid錯誤，ID:"+registrationId+":"+jres_check_valid.message+"\n"}""==errmsg?(alert("完成"+array_patient.length+"筆"),changeevent=new Event("change",{bubbles:!0}),document.getElementsByClassName("form-control ampInput")[2].dispatchEvent(changeevent)):alert(errmsg)}function u(){document.getElementById("myDraggable_2").remove()}function h(){if(url_orderdetail="https://phpcis.chshb.gov.tw/api/v1/freq_orders/find?clinicId=4&freqOrderId="+l.value,xmlHttp=new XMLHttpRequest,xmlHttp.open("GET",url_orderdetail,!1),xmlHttp.send(),res_orderdetail=xmlHttp.responseText,json_orderdetail=JSON.parse(res_orderdetail),json_orderdetail.result.diseases.length>0?diagnosis=json_orderdetail.result.diseases[0].ICD10Code+" : "+json_orderdetail.result.diseases[0].ICD10Name:diagnosis="無",orderall="",json_orderdetail.result.FreqOrderPrescription.length>0)for(i6=0;i6<json_orderdetail.result.FreqOrderPrescription.length;i6++)neworder=json_orderdetail.result.FreqOrderPrescription[i6].applicationId+"_"+json_orderdetail.result.FreqOrderPrescription[i6].prescriptionName,""==orderall?orderall+=neworder:orderall=orderall+";"+neworder;else orderall="無";c.textContent="主診斷:"+diagnosis,d.textContent="處方:"+orderall}function p(t){posX=mouseX-t.clientX,posY=mouseY-t.clientY,mouseX=t.clientX,mouseY=t.clientY,e.style.left=e.offsetLeft-posX+"px",e.style.top=e.offsetTop-posY+"px"}function g(){document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",g)}d.id="line4",d.textContent="處方:",e.appendChild(d),h()}ccc=document.URL,"https://phpcis.chshb.gov.tw/populanceRegistration"==ccc?(url_visittype="https://phpcis.chshb.gov.tw/api/v1/visit_types/list_visibility",xmlHttp=new XMLHttpRequest,xmlHttp.open("GET",url_visittype,!1),xmlHttp.send(),res_visittype=xmlHttp.responseText,json_visittype=JSON.parse(res_visittype),visittypelist={},url_freq_orders="https://phpcis.chshb.gov.tw/api/v1/freq_orders/list",xmlHttp=new XMLHttpRequest,xmlHttp.open("GET",url_freq_orders,!1),xmlHttp.send(),res_freq_orders=xmlHttp.responseText,json_freq_orders=JSON.parse(res_freq_orders),document.getElementById("myDraggable_2")?(document.getElementById("myDraggable_2").remove(),e()):e()):alert("需在候診患者查詢使用")}function button_fastreg_handle(){if(cc=document.URL,d1="https://phpcis.chshb.gov.tw/registration/create",d2="https://phpcis.chshb.gov.tw/registration",changeevent=new Event("change",{bubbles:!0}),alllist=[],cc.includes("https://phpcis.chshb.gov.tw"))if(thecode=document.getElementById("input_fasttype").value,""!=thecode)if(cc!=d2){if(cc==d1)alllist=document.getElementsByClassName("form-control ampInput"),age=(new Date).getFullYear()-1911-document.getElementsByClassName("form-control ampInput")[2].value.split("-")[0],popup=document.getElementsByClassName("modal-content"),popup.length>0&&(popup[1]&&popup[1].getElementsByClassName("btn btn-secondary")[0].click(),popup[0]&&popup[0].getElementsByClassName("col-xl-1 col-lg-1")[0].children[0].click());else for(sidebarlist=document.getElementsByClassName("sidebar__nav")[0].children,i=0;i<sidebarlist.length;i++)if("掛號"==sidebarlist[i].textContent){sidebarlist[i].click();break}for(find=!1,i=0;i<alllist.length;i++)"visitTypeId"==alllist[i].id?(targetelement=alllist[i],find=!0):"prevention"==alllist[i].name?targetelement2=alllist[i]:"preventionId"==alllist[i].name&&(targetelement3=alllist[i]);if(find){if(thecode=thecode.toString(),"691"==thecode)if(cc==d1){for(i=0;i<targetelement.options.length;i++)if(targetelement.options[i].text.includes("69")){targetelement.options[i].selected=!0,targetelement.dispatchEvent(changeevent);break}targetelement2.value="02",targetelement2.dispatchEvent(changeevent),age>64?(targetelement3.value="10",targetelement3.dispatchEvent(changeevent)):(targetelement3.value="8",targetelement3.dispatchEvent(changeevent))}else alert("請在新增掛號時使用");else if("692"==thecode)if(cc==d1){for(i=0;i<targetelement.options.length;i++)if(targetelement.options[i].text.includes("69")){targetelement.options[i].selected=!0,targetelement.dispatchEvent(changeevent);break}targetelement2.value="02",targetelement2.dispatchEvent(changeevent),age>64?(targetelement3.value="11",targetelement3.dispatchEvent(changeevent)):(targetelement3.value="9",targetelement3.dispatchEvent(changeevent))}else alert("請在新增掛號時使用");else for(i=0;i<targetelement.options.length;i++)if(targetelement.options[i].text.includes(thecode)){targetelement.options[i].selected=!0,targetelement.dispatchEvent(changeevent);break}document.getElementsByClassName("ampRegistationBtn btn btn-danger")[0].click()}}else document.getElementsByClassName("commonBtn ampCommonBtn btn btn-info")[0].click();else alert("未輸入身分別");else alert("請在PHPCIIS網域中使用")}function button_showvaccine_handle(){if(ccc=document.URL,ccc.includes("https://phpcis.chshb.gov.tw")){vaccinelist={J000151206:"高端",J000138206:"國光",K001036206:"賽諾菲",K001126206:"東洋",K000906206:"PCV13",K000492206:"PPV23"},Url="https://phpcis.chshb.gov.tw/api/v1/clinics/settings/find",xmlHttp=new XMLHttpRequest,xmlHttp.open("GET",Url,!1),xmlHttp.send(),res=xmlHttp.responseText;try{jres=JSON.parse(res),msg="流感疫苗廠牌",msg=msg+"\n\t一般:"+vaccinelist[jres.result.influenzaId],msg=msg+"\n\t3-"+jres.result.influenzaAgeN+"歲:"+vaccinelist[jres.result.influenzaCode3toN],msg=msg+"\n\t<3歲:"+vaccinelist[jres.result.influenzaCodeUnder3Id],msg=msg+"\n\t縣購:"+vaccinelist[jres.result.freeInfluenzaVaccineApplicationId],msg+="\n肺炎鏈球菌疫苗廠牌:",msg=msg+"\n\t65歲PPV:"+vaccinelist[jres.result.pneumoniaCode],msg=msg+"\n\t65歲PCV:"+vaccinelist[jres.result.pneumonia13PCVCode],msg=msg+"\n\t縣購:"+vaccinelist[jres.result.freePneumoniaVaccineApplicationId],msg+="\n是否需修改?",confirmact=confirm(msg),confirmact&&window.open("https://phpcis.chshb.gov.tw/healthCenterSetting")}catch(e){alert("出錯了，可能未登入")}}else alert("請在PHPCIIS內使用")}function button_countvaccine_handle(){if(ccc=document.URL,d2="https://phpcis.chshb.gov.tw/registration",ccc==d2)if(t6z=0,t6f=0,t6v=0,t7w=0,t7z=0,t7y=0,t7z=0,t7t=0,sb=document.querySelector("table"),sb.textContent.includes("無資料"))alert("無掛號");else{for(i=0;i<sb.rows[0].cells.length;i++)"身分證號"==sb.rows[0].cells[i].innerText&&(theidc=i),"姓名"==sb.rows[0].cells[i].innerText&&(thenamec=i),"身分"==sb.rows[0].cells[i].innerText&&(thetypec=i);for(i=1;i<sb.rows.length;i++)sb.rows[i].cells[thetypec].textContent.includes("6Z")?t6z+=1:sb.rows[i].cells[thetypec].textContent.includes("6F")?t6f+=1:sb.rows[i].cells[thetypec].textContent.includes("6V")?t6v+=1:sb.rows[i].cells[thetypec].textContent.includes("6Z")?t6z+=1:sb.rows[i].cells[thetypec].textContent.includes("7T")?t7t+=1:sb.rows[i].cells[thetypec].textContent.includes("7W")?t7w+=1:sb.rows[i].cells[thetypec].textContent.includes("7X")?t7y+=1:sb.rows[i].cells[thetypec].textContent.includes("7Y")?t7y+=1:sb.rows[i].cells[thetypec].textContent.includes("7Z")&&(t7z+=1);fall=t6z+t7w+t7z,jjjj="流感共"+fall+"支，含\n\t公費流感:"+t6z+"支\n\t流感學生:"+t7w+"支\n\t縣購流感:"+t7z+"支\n公費PCV13:"+t6f+"支\n公費PPV23:"+t6v+"支\n縣購肺鏈:"+t7y+"支\n新冠疫苗"+t7t+"支",alert(jjjj)}else alert("請在掛號列表中使用")}function button_listdelete_handle(){function e(e){if(tb=document.getElementsByClassName("table table-striped table-bordered table-sm role-list__role-table commonTable")[e],array_patient=[],tb.rows[1].cells.length>2)for(let e=1;e<tb.rows.length;e++)tb.rows[e].cells[0].children[0].checked&&(href=tb.rows[e].cells[4].children[0].href.split("/"),p_name=tb.rows[e].cells[4].textContent,p_visittype=tb.rows[e].cells[7].textContent,registrationId=href[href.length-1],array_patient.push(registrationId));return 1==array_patient.length&&array_patient[0]}function t(e){return period=document.getElementById("period").value,shiftId=document.getElementById("shiftId").value,url="https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId="+e,xmlHttp.open("GET",url,!1),xmlHttp.send(),res=xmlHttp.responseText,jres=JSON.parse(res),jres}function n(e){payload={},payload.registrationId=1*e,payloads=JSON.stringify(payload),delurl="https://phpcis.chshb.gov.tw/api/v1/registrations/delete",xmlHttp.open("POST",delurl,!1),xmlHttp.setRequestHeader("Content-Type","application/json; charset=utf-8"),xmlHttp.send(payloads),delres=xmlHttp.responseText,jdelres=JSON.parse(delres),200==jdelres.code?alert("刪除成功"):alert(jdelres.message)}function i(e){payload={},payload.date=e.result.date,payload.healthRecordId=e.result.healthRecordId,payload.period=e.result.period,payload.shiftId=e.result.shiftId,payloads=JSON.stringify(payload),delurl="https://phpcis.chshb.gov.tw/api/v1/health_records/delete",xmlHttp.open("POST",delurl,!1),xmlHttp.setRequestHeader("Content-Type","application/json; charset=utf-8"),xmlHttp.send(payloads),delres=xmlHttp.responseText,jdelres=JSON.parse(delres),200==jdelres.code?alert("刪除成功"):alert(jdelres.message)}function a(){changeevent=new Event("change",{bubbles:!0}),document.getElementById("shiftId").dispatchEvent(changeevent)}ccc=document.URL,"https://phpcis.chshb.gov.tw/populanceRegistration"==ccc?(xmlHttp=new XMLHttpRequest,"true"==document.getElementById("uncontrolled-tab-example-tab-consulted").getAttribute("aria-selected")?(registrationId=e(1),registrationId?(jres=t(registrationId),ans=confirm("姓名:"+jres.result.name+"\n身分證:"+jres.result.personalId+"\n身分代碼:"+jres.result.visitTypeCode+"\n是否刪除看診紀錄?"),ans&&(i(jres),a())):alert("無選擇個案")):(registrationId=e(0),registrationId?(jres=t(registrationId),ans=confirm("姓名:"+jres.result.name+"\n身分證:"+jres.result.personalId+"\n身分代碼:"+jres.result.visitTypeCode+"\n是否刪除掛號紀錄?"),ans&&(n(registrationId),a())):alert("無選擇個案"))):alert("需到候診患者查詢頁面")}async function button_changenumber_handle(){uuu=document.URL,mode="","https://phpcis.chshb.gov.tw/populanceRegistration"==uuu?(shiftId=document.getElementById("shiftId").value,mode="OPD"):"https://phpcis.chshb.gov.tw/registration"==uuu?(shiftId=document.getElementsByName("period")[1].value,mode="REG"):alert("非掛號資訊列表或候診患者查詢"),""!=mode&&await fetch("https://phpcis.chshb.gov.tw/api/v1/registrations/list?clinicId=4&shiftId="+shiftId,{headers:{"content-type":"application/json"},body:null,method:"GET"}).then(e=>e.text()).then(e=>{if("OPD"==mode?ttt=document.getElementsByClassName("table table-striped table-bordered table-sm role-list__role-table commonTable"):"REG"==mode&&(ttt=document.getElementsByClassName("table table-striped table-bordered table-sm commonTable ampTableFontSize")),ccc=JSON.parse(e),alllist={},"病歷號(新)"==ttt[0].rows[0].cells[2].textContent){for(i=0;i<ccc.result.length;i++)alllist[ccc.result[i].personalId]=ccc.result[i].recordNo;if(ttt[0].rows[0].cells[2].innerHTML="病歷號(舊)<span class='order-4'></span>","無資料"!=ttt[0].rows[1].textContent)for(i=1;i<ttt[0].rows.length;i++)ttt[0].rows[i].cells[2].textContent=alllist[ttt[0].rows[i].cells[3].textContent];if("OPD"==mode&&(ttt[1].rows[0].cells[2].innerHTML="病歷號(舊)<span class='order-4'></span>","無資料"!=ttt[1].rows[1].textContent))for(i=1;i<ttt[1].rows.length;i++)ttt[1].rows[i].cells[2].textContent=alllist[ttt[1].rows[i].cells[3].textContent]}else{for(i=0;i<ccc.result.length;i++)alllist[ccc.result[i].personalId]=ccc.result[i].bureauRecordNo;if(ttt[0].rows[0].cells[2].innerHTML="病歷號(新)<span class='order-4'></span>","無資料"!=ttt[0].rows[1].textContent)for(i=1;i<ttt[0].rows.length;i++)ttt[0].rows[i].cells[2].textContent=alllist[ttt[0].rows[i].cells[3].textContent];if("OPD"==mode&&(ttt[1].rows[0].cells[2].textContent="病歷號(新)","無資料"!=ttt[1].rows[1].textContent))for(i=1;i<ttt[1].rows.length;i++)ttt[1].rows[i].cells[2].textContent=alllist[ttt[1].rows[i].cells[3].textContent]}})}function button_detail_handle(){if(ccc=document.URL,d1="https://phpcis.chshb.gov.tw/registration",d2="https://phpcis.chshb.gov.tw/registration/create",d3="https://phpcis.chshb.gov.tw/registration/",ccc==d1)if(tb=document.getElementsByClassName("table table-striped table-bordered table-sm commonTable ampTableFontSize")[0],tb.textContent.includes("無資料"))alert("無個案");else{for(theindex=!1,i=1;i<tb.rows.length;i++)if(tb.rows[i].cells[0].children[0].checked){theindex=i;break}theindex?(bureauRecordNo=tb.rows[theindex].cells[2].textContent,xmlHttp=new XMLHttpRequest,Url="https://phpcis.chshb.gov.tw/api/v1/personal_infos/list?bureauRecordNo="+bureauRecordNo,xmlHttp.open("GET",Url,!1),xmlHttp.setRequestHeader("Content-Type","application/json; charset=UTF-8"),xmlHttp.send(),uuu=xmlHttp.responseText,uuujson=JSON.parse(uuu),personalInfoId=uuujson.result[0].personalInfoId,window.open("https://phpcis.chshb.gov.tw/case/"+personalInfoId,"_blank")):alert("無選擇個案")}else ccc==d2||ccc.includes(d3)?(bureauRecordNo=document.getElementsByName("bureauRecordNo")[0].value,null!=bureauRecordNo&&""!=bureauRecordNo&&(xmlHttp=new XMLHttpRequest,Url="https://phpcis.chshb.gov.tw/api/v1/personal_infos/list?bureauRecordNo="+bureauRecordNo,xmlHttp.open("GET",Url,!1),xmlHttp.setRequestHeader("Content-Type","application/json; charset=UTF-8"),xmlHttp.send(),uuu=xmlHttp.responseText,uuujson=JSON.parse(uuu),personalInfoId=uuujson.result[0].personalInfoId,window.open("https://phpcis.chshb.gov.tw/case/"+personalInfoId,"_blank"))):alert("請在掛號資訊列表使用")}async function button_OPDhistory_handle(){if(countlimit=10,url=document.URL,d0="https://phpcis.chshb.gov.tw/registration/create",d1="https://phpcis.chshb.gov.tw/registration/",d2="https://phpcis.chshb.gov.tw/registration",url==d0||url.includes(d1))theID=document.getElementsByClassName("form-control ampInput")[1].value,thename=document.getElementsByClassName("form-control ampInput")[0].value,url="https://phpcis.chshb.gov.tw/api/v1/registrations/list?personalId="+theID,await fetch(url,{headers:{"content-type":"application/json"},body:null,method:"GET"}).then(e=>e.text()).then(t=>{for(res=JSON.parse(t),count=0,msg="",i=0;i<res.result.length;i++)count<countlimit&&"1"==res.result[i].treatmentStatus&&(msg=msg+"日期:"+e(res.result[i].treatmentDate)+",類別:"+res.result[i].visitTypeCode+res.result[i].visitType+",就醫序號:"+res.result[i].treatmentSeqNo+"\n",count+=1);0==count?alert("該個案無已完成就診紀錄"):(msg="個案 "+thename+" 最近 "+count+" 次完成就診紀錄\n"+msg,alert(msg))}).catch(e=>console.log(e));else if(url==d2)if(tb=document.querySelector("table"),tb.textContent.includes("無資料"))alert("無掛號資料");else{for(theID="",i=1;i<tb.rows.length;i++)if(tb.rows[i].cells[0].children[0].checked){theID=tb.rows[i].cells[3].textContent,thename=tb.rows[i].cells[4].textContent;break}""==theID?alert("未選擇個案"):(url="https://phpcis.chshb.gov.tw/api/v1/registrations/list?personalId="+theID,await fetch(url,{headers:{"content-type":"application/json"},body:null,method:"GET"}).then(e=>e.text()).then(t=>{for(res=JSON.parse(t),count=0,msg="",i=0;i<res.result.length;i++)count<countlimit&&"1"==res.result[i].treatmentStatus&&(msg=msg+"日期:"+e(res.result[i].treatmentDate)+",類別:"+res.result[i].visitTypeCode+res.result[i].visitType+",就醫序號:"+res.result[i].treatmentSeqNo+"\n",count+=1);0==count?alert("該個案無已完成就診紀錄"):(msg="個案 "+thename+" 最近 "+count+" 次完成就診紀錄\n"+msg,alert(msg))}).catch(e=>console.log(e)))}else alert("請在新增掛號資料或編輯掛號資料時使用");function e(e){return yy=e.split("-")[0]-1911,mm=e.split("-")[1],dd=e.split("-")[2],mky=yy+mm+dd,mky}}async function button_FMdebug_handle(){if(tu=document.URL,wu="https://phpcis.chshb.gov.tw/familyMedicine",tu==wu)if(tb=document.querySelector("#uncontrolled-tab-example-tabpane-02 > div > div.line > div > table"),null==tb)alert("發生錯誤");else if(tb.textContent.includes("無資料"))changeevent=new Event("change",{bubbles:!0}),document.querySelector("#uncontrolled-tab-example-tab-02").click(),pan=document.getElementById("uncontrolled-tab-example-tabpane-02"),sel=pan.getElementsByClassName("form-control ampInput"),sel[0].options[3].selected=!0,sel[0].dispatchEvent(changeevent),sel[1].options[1].selected=!0,sel[1].dispatchEvent(changeevent),sel[2].options[1].selected=!0,sel[2].dispatchEvent(changeevent),tb.rows[0].cells[1].children[0].click(),pan.getElementsByClassName("ampCommonBtn btn btn-primary")[0].click();else{if(!("showOpenFilePicker"in self))throw Error("unsupported browser");try{for(txtopt={types:[{description:"醫療群上傳檔案",accept:{"TXT/*":[".txt"]}}],excludeAcceptAllOption:!0,multiple:!1},handles=await showOpenFilePicker(txtopt),file=await handles[0].getFile(),txtar=await file.arrayBuffer(),txtcon=new TextDecoder("big5").decode(txtar),a_txtcon=txtcon.split("\r\n"),csvopt={types:[{description:"健保局回饋錯誤檔",accept:{"CSV/*":[".csv"]}}],excludeAcceptAllOption:!0,multiple:!1},handles=await showOpenFilePicker(csvopt),file=await handles[0].getFile(),csvar=await file.arrayBuffer(),csvcon=new TextDecoder("big5").decode(csvar),csvcon=csvcon.replaceAll("'",""),csvcon=csvcon.replaceAll('"',""),a_csvcon=csvcon.split("\r\n"),list=[],i=1;i<a_csvcon.length-1;i++)temp=a_csvcon[i].split(",")[0],temp=a_txtcon[temp-1].substring(14,24),list.push(temp);for(i=0;i<list.length;i++)for(LID=list[i],find=0,j=1;j<tb.rows.length;j++)if(TID=tb.rows[j].cells[1].innerText,LID==TID){tb.rows[j].style.backgroundColor="#82D900";break}tb.rows[0].cells[1].children[0].click(),alert("完成，請對綠色欄位點選失效")}catch(e){alert("錯誤，請選擇正確的檔案")}}else confirm("非家醫計畫作業頁面,是否跳轉業面?")&&gotourl("/familyMedicine")}function button_autocompletesingle_handle(){if(ccc=document.URL,"https://phpcis.chshb.gov.tw/populanceRegistration"==ccc){for(smokefuid="",smokefu=["E1023C","E1024C","E1025C","E1026C","E1028C","E1029C"],url_visittype="https://phpcis.chshb.gov.tw/api/v1/visit_types/list_visibility",xmlHttp=new XMLHttpRequest,xmlHttp.open("GET",url_visittype,!1),xmlHttp.send(),res_visittype=xmlHttp.responseText,json_visittype=JSON.parse(res_visittype),transvisittype={},zz=0;zz<json_visittype.result.length;zz++)transvisittype[json_visittype.result[zz].visitTypeCode]=json_visittype.result[zz].isApplicable;url_freq_orders="https://phpcis.chshb.gov.tw/api/v1/freq_orders/list",xmlHttp=new XMLHttpRequest,xmlHttp.open("GET",url_freq_orders,!1),xmlHttp.send(),res_freq_orders=xmlHttp.responseText,json_freq_orders=JSON.parse(res_freq_orders),document.getElementById("myDraggable_3")?(document.getElementById("myDraggable_3").remove(),e()):e()}else alert("需在候診患者查詢使用");function e(){var e=document.createElement("div");e.id="myDraggable_3",e.style.width="450px",e.style.background="#f9f9f9",e.style.border="1px solid #ccc",e.style.position="absolute",e.style.cursor="move",e.style.zIndex="9999",e.style.left=Math.ceil(window.innerWidth/2-225)+"px",e.style.top="300px",document.body.insertBefore(e,document.body.firstChild),e.addEventListener("mousedown",function(e){mouseX=e.clientX,mouseY=e.clientY,document.addEventListener("mousemove",m),document.addEventListener("mouseup",u)});var t=document.createElement("div");t.textContent="標準處方",t.style.height="30px",e.appendChild(t);var n=document.createElement("select");for(n.style.height="30px",n.id="ordercombo",n.style.width="250px",i2=0;i2<json_freq_orders.result.length;i2++)newOption=document.createElement("option"),freqOrderCode=json_freq_orders.result[i2].freqOrderCode,freqOrderName=json_freq_orders.result[i2].freqOrderName,freqOrderId=json_freq_orders.result[i2].freqOrderId,newOption.text=freqOrderCode+" : "+freqOrderName,newOption.value=freqOrderId,n.appendChild(newOption);t.appendChild(n),n.addEventListener("change",s);var i=document.createElement("button");i.id="confirmbutton",i.textContent="帶入處方",i.style.height="30px",i.style.left="315px",i.style.position="absolute",i.addEventListener("click",l),t.appendChild(i);var a=document.createElement("button");a.id="exitbutton",a.textContent="關閉",a.style.height="30px",a.style.left="398px",a.style.position="absolute",a.addEventListener("click",d),t.appendChild(a);var r=document.createElement("div");r.id="line3",r.textContent="主診斷:",e.appendChild(r);var o=document.createElement("div");function l(){if(tb=document.getElementsByClassName("table table-striped table-bordered table-sm role-list__role-table commonTable")[0],array_patient=[],tb.rows[1].cells.length>2)for(i9=1;i9<tb.rows.length;i9++)tb.rows[i9].cells[0].children[0].checked&&(href=tb.rows[i9].cells[4].children[0].href.split("/"),p_name=tb.rows[i9].cells[4].textContent,p_visittype=tb.rows[i9].cells[7].textContent,registrationId=href[href.length-1],array_patient.push(registrationId));if(1==array_patient.length)if(json_orderdetail.result.diseases.length>0)if(json_orderdetail.result.FreqOrderPrescription.length>0){hadsmokefu=!1;for(let e=0;e<json_orderdetail.result.FreqOrderPrescription.length;e++)if(smokefu.includes(json_orderdetail.result.FreqOrderPrescription[e].applicationId)){hadsmokefu=!0;break}confirm("是否將處方帶入個案"+p_name+"，身分別:"+p_visittype+"?")&&(hadsmokefu&&(smokefuid=prompt("請輸入戒菸追蹤人員ID",smokefuid)),c())}else alert("該標準處方無處置");else alert("該標準處方無診斷");else alert("無選擇個案")}function c(){for(errmsg="",i3=0;i3<array_patient.length;i3++){for(registrationId=array_patient[i3],url_registrationId="https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId="+registrationId,xmlHttp=new XMLHttpRequest,xmlHttp.open("GET",url_registrationId,!1),xmlHttp.send(),res_registrations=xmlHttp.responseText,jres_registrations=JSON.parse(res_registrations),url_health_records="https://phpcis.chshb.gov.tw/api/v1/health_records/find?registrationId="+registrationId,xmlHttp=new XMLHttpRequest,xmlHttp.open("GET",url_health_records,!1),xmlHttp.send(),res_health_records=xmlHttp.responseText,jres_health_records=JSON.parse(res_health_records),forinjectdate={},forinjectdate.CC=json_orderdetail.result.CC,forinjectdate.PE=json_orderdetail.result.PE,forinjectdate.abnormalTreatmentSeqNo=null,forinjectdate.benefitTypeCode=jres_registrations.result.benefitTypeCode,forinjectdate.benefitTypeId=jres_registrations.result.benefitTypeId,forinjectdate.bmi=1*jres_health_records.result.bmi,16==jres_registrations.result.caseTypeId?(forinjectdate.caseTypeId=23,forinjectdate.caseTypeCode="09"):(forinjectdate.caseTypeId=jres_registrations.result.caseTypeId,forinjectdate.caseTypeCode=jres_registrations.result.caseTypeCode),forinjectdate.caseTypeId=jres_registrations.result.caseTypeId,forinjectdate.clinicId=json_freq_orders.result[0].clinicId,forinjectdate.codContent=jres_health_records.result.codContent,forinjectdate.courseHealthRecordId=jres_health_records.result.courseHealthRecordId,forinjectdate.dbp=1*jres_health_records.result.dbp,forinjectdate.diseases=[],i4=0;i4<json_orderdetail.result.diseases.length;i4++)tempdisease={},tempdisease.ICD10Code=json_orderdetail.result.diseases[i4].ICD10Code,tempdisease.diseaseId=json_orderdetail.result.diseases[i4].diseaseId,tempdisease.isChronic=json_orderdetail.result.diseases[i4].isChronic,0==i4?tempdisease.isMaster=!0:tempdisease.isMaster=!1,forinjectdate.diseases.push(tempdisease);for(forinjectdate.dispensingType=null,forinjectdate.glucoseAC=1*jres_health_records.result.glucoseAC,forinjectdate.glucosePC=1*jres_health_records.result.glucosePC,forinjectdate.healthRecordId=jres_health_records.result.healthRecordId,forinjectdate.height=1*jres_health_records.result.height,forinjectdate.homeCareType=jres_health_records.result.homeCareType,forinjectdate.isAutoCorrect=jres_health_records.result.isAutoCorrect,forinjectdate.isChronicPrescription=jres_health_records.result.isChronicPrescription,forinjectdate.isEmergencyVisit=jres_health_records.result.isEmergencyVisit,forinjectdate.isIncludeFamilyCare=jres_health_records.result.isIncludeFamilyCare,forinjectdate.isICCardWritten=jres_registrations.result.isICCard,forinjectdate.personalInfoId=jres_health_records.result.personalInfoId,forinjectdate.physicalExamHistoryId=jres_health_records.result.physicalExamHistoryId,forinjectdate.prescriptionDeadline=jres_health_records.result.prescriptionDeadline,forinjectdate.prescriptionNo=jres_health_records.result.prescriptionNo,forinjectdate.prescriptionReuseTimes=jres_health_records.result.prescriptionReuseTimes,forinjectdate.prescriptionType=jres_health_records.result.prescriptionType,forinjectdate.prescriptions=[],i5=0;i5<json_orderdetail.result.FreqOrderPrescription.length;i5++)tempprescription={},smokefu.includes(json_orderdetail.result.FreqOrderPrescription[i5].applicationId)&&""!=smokefuid&&null!=smokefuid&&(tempprescription.doctorVisitRemark=smokefuid),tempprescription.bureauTestCode=json_orderdetail.result.FreqOrderPrescription[i5].bureauTestCode,tempprescription.day=json_orderdetail.result.FreqOrderPrescription[i5].day,tempprescription.description="",tempprescription.drugCode=json_orderdetail.result.FreqOrderPrescription[i5].prescriptionCode,tempprescription.drugName=json_orderdetail.result.FreqOrderPrescription[i5].prescriptionName,tempprescription.drugRouteId=json_orderdetail.result.FreqOrderPrescription[i5].drugRouteId,tempprescription.drugUsageId=json_orderdetail.result.FreqOrderPrescription[i5].drugUsageId,tempprescription.endTime=null,tempprescription.isApplicable=json_orderdetail.result.FreqOrderPrescription[i5].isApplicable,tempprescription.isChronicPrescription=json_orderdetail.result.FreqOrderPrescription[i5].isChronicPrescription,tempprescription.isSchedule=!1,tempprescription.isScheduleCorrection=!1,tempprescription.modelType=json_orderdetail.result.FreqOrderPrescription[i5].modelType,tempprescription.ownExpenseSeq=json_orderdetail.result.FreqOrderPrescription[i5].ownExpenseSeq,tempprescription.prescriptionId=json_orderdetail.result.FreqOrderPrescription[i5].prescriptionId,tempprescription.prescriptionModel=json_orderdetail.result.FreqOrderPrescription[i5].prescriptionModel,tempprescription.qty=json_orderdetail.result.FreqOrderPrescription[i5].qty,transvisittype[jres_registrations.result.visitTypeCode]?tempprescription.selfPayType=json_orderdetail.result.FreqOrderPrescription[i5].selfPayType:(selfPayType=json_orderdetail.result.FreqOrderPrescription[i5].selfPayType,"*"==selfPayType||"#"==selfPayType?tempprescription.selfPayType=json_orderdetail.result.FreqOrderPrescription[i5].selfPayType:tempprescription.selfPayType="*"),tempprescription.startTime="",tempprescription.testPackageCode=json_orderdetail.result.FreqOrderPrescription[i5].testPackageCode,tempprescription.testPackageId=json_orderdetail.result.FreqOrderPrescription[i5].testPackageId,tempprescription.testPackageName=json_orderdetail.result.FreqOrderPrescription[i5].testPackageName,json_orderdetail.result.FreqOrderPrescription[i5].totalQty<1?tempprescription.totalQty=1:tempprescription.totalQty=json_orderdetail.result.FreqOrderPrescription[i5].totalQty,forinjectdate.prescriptions.push(tempprescription);forinjectdate.pulse=1*jres_health_records.result.pulse,forinjectdate.registrationDate=jres_registrations.result.date,forinjectdate.registrationId=jres_registrations.result.registrationId,forinjectdate.sbp=jres_registrations.result.sbp,forinjectdate.scheduleTest=null,forinjectdate.scheduleTestId=null,forinjectdate.shareCode=jres_registrations.result.shareCode,forinjectdate.shareId=jres_registrations.result.shareId,forinjectdate.supplyReportType=jres_health_records.result.supplyReportType,forinjectdate.transferClinicCode=jres_health_records.result.transferClinicCode,forinjectdate.treatmentEndDate=jres_registrations.result.date,forinjectdate.treatmentTypeId=jres_registrations.result.treatmentTypeId,forinjectdate.visitTypeCode=jres_registrations.result.visitTypeCode,forinjectdate.visitTypeId=jres_registrations.result.visitTypeId,forinjectdate.waist=null,forinjectdate.weight=1*jres_health_records.result.weight,forinjectdate.writeICCard=jres_registrations.result.isCardCheck,forinjectdates=JSON.stringify(forinjectdate),url_check_valid="https://phpcis.chshb.gov.tw/api/v1/health_records/check_valid",xmlHttp=new XMLHttpRequest,xmlHttp.open("POST",url_check_valid,!1),xmlHttp.setRequestHeader("Content-Type","application/json; charset=utf-8"),xmlHttp.send(forinjectdates),res_check_valid=xmlHttp.responseText,jres_check_valid=JSON.parse(res_check_valid),200==jres_check_valid.code?(url_update="https://phpcis.chshb.gov.tw/api/v1/health_records/update",xmlHttp=new XMLHttpRequest,xmlHttp.open("POST",url_update,!1),xmlHttp.setRequestHeader("Content-Type","application/json; charset=utf-8"),xmlHttp.send(forinjectdates),res_update=xmlHttp.responseText,jres_update=JSON.parse(res_update),200!=jres_update.code&&(errmsg=errmsg+"update錯誤，ID:"+registrationId+":"+jres3.message+"\n")):errmsg=errmsg+"valid錯誤，ID:"+registrationId+":"+jres_check_valid.message+"\n"}""==errmsg?(alert("標準處方帶入完成"),changeevent=new Event("change",{bubbles:!0}),document.getElementsByClassName("form-control ampInput")[2].dispatchEvent(changeevent)):alert(errmsg)}function d(){document.getElementById("myDraggable_3").remove()}function s(){if(url_orderdetail="https://phpcis.chshb.gov.tw/api/v1/freq_orders/find?clinicId=4&freqOrderId="+n.value,xmlHttp=new XMLHttpRequest,xmlHttp.open("GET",url_orderdetail,!1),xmlHttp.send(),res_orderdetail=xmlHttp.responseText,json_orderdetail=JSON.parse(res_orderdetail),json_orderdetail.result.diseases.length>0?diagnosis=json_orderdetail.result.diseases[0].ICD10Code+" : "+json_orderdetail.result.diseases[0].ICD10Name:diagnosis="無",orderall="",json_orderdetail.result.FreqOrderPrescription.length>0)for(i6=0;i6<json_orderdetail.result.FreqOrderPrescription.length;i6++)neworder=json_orderdetail.result.FreqOrderPrescription[i6].applicationId+"_"+json_orderdetail.result.FreqOrderPrescription[i6].prescriptionName,""==orderall?orderall+=neworder:orderall=orderall+";"+neworder;else orderall="無";r.textContent="主診斷:"+diagnosis,o.textContent="處方:"+orderall}function m(t){posX=mouseX-t.clientX,posY=mouseY-t.clientY,mouseX=t.clientX,mouseY=t.clientY,e.style.left=e.offsetLeft-posX+"px",e.style.top=e.offsetTop-posY+"px"}function u(){document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",u)}o.id="line4",o.textContent="處方:",e.appendChild(o),s()}}function button_countmonth_handle(){if(ccc=document.URL,"https://phpcis.chshb.gov.tw/medicalRefee"==ccc){document.querySelectorAll("input")[0].style.background="#F9F900",nowarr=document.querySelectorAll("input")[0].value.split(" ")[1].split("-"),mky=""+(nowarr[0]-1911),mkm=nowarr[1],monthdocurl="https://phpcis.chshb.gov.tw/api/v1/applications/monthly/statistics/doctors/list?targetYearMonth="+mky+mkm,xmlHttp=new XMLHttpRequest,xmlHttp.open("GET",monthdocurl,!1),xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),xmlHttp.send(),res_monthdoc=xmlHttp.responseText,jres_monthdoc=JSON.parse(res_monthdoc),msg="",data=jres_monthdoc.result.data;for(let e=0;e<data.length;e++)ord=""+(e+1),msg+=ord+". "+data[e].doctorName+" : "+data[e].dateCount+" 天\n";""!=msg?msg="反黃月份("+mky+mkm+")進行查詢結果如下\n"+msg:msg="無看診醫師",alert(msg)}}function button_NIIS_handle(){if(ccc=document.URL,ccc.includes("https://phpcis.chshb.gov.tw/consultationMainPage/"))chn=document.querySelector("#root > div.wrapper > main > div > form > div:nth-child(1) > div:nth-child(12) > div").textContent,getvaccineviaid(chn);else if("https://phpcis.chshb.gov.tw/populanceRegistration"==ccc||"https://phpcis.chshb.gov.tw/registration"==ccc){radiolist=document.querySelectorAll('input[type="radio"]'),targeturl="";for(let e=0;e<radiolist.length;e++)if(radiolist[e].checked&&radiolist[e].getBoundingClientRect().height>0){targeturl=radiolist[e].parentElement.parentElement.children[2].textContent;break}""!=targeturl?getvaccineviaid(targeturl):alert("請選擇個案")}else(ccc.includes("https://phpcis.chshb.gov.tw/registration/")||"https://phpcis.chshb.gov.tw/registration/create"==ccc)&&("https://phpcis.chshb.gov.tw/registration/create"==ccc?chn=document.querySelector("#root > div.wrapper > main > div > form > div:nth-child(4) > div:nth-child(4) > div > div > input").value:chn=document.querySelector("#root > div.wrapper > main > div > form > div:nth-child(4) > div:nth-child(2) > div > div > input").value,getvaccineviaid(chn))}function getvaccineviaid(t){if(testmode=!1,personalinfoobj=chntoinfoid(t),personalinfoobj){vhurl="https://phpcis.chshb.gov.tw/api/v1/niis/vaccination_history/list?personalInfoId="+personalinfoobj.personalInfoId,retjson=JSON.parse(httpGet(vhurl)),ay=personalinfoobj.birthday.split("-"),gy="000"+(ay[0]-1911),patientidbirth=gy.substring(gy.length-3,gy.length)+ay[1]+ay[2],thename=personalinfoobj.name,resultobj={Record:[],ApplyRecord:[],VaccRecord:"",Error:""},tempobj={};for(let e=0;e<retjson.result.length;e++)injitem=retjson.result[e],injitem.immuDate in tempobj||(tempobj[injitem.immuDate]=[]),tempobj[injitem.immuDate].push(injitem);tempdatelist=Object.keys(tempobj),tempdatelist=tempdatelist.sort();for(let e=0;e<tempdatelist.length;e++){idhis=tempobj[tempdatelist[e]];for(let e=0;e<idhis.length;e++)immuDate=idhis[e].immuDate,theY=1*immuDate.substring(0,3)+1911,theM=immuDate.substring(3,5),theD=immuDate.substring(5,7),tempid={SRVC:idhis[e].vaccineID,ID:theY+"-"+theM+"-"+theD+"T00:00:00",ON:idhis[e].immuAgcyName,VB:""},resultobj.ApplyRecord.push(tempid)}vaccinelist=["rHepB-1","rHepB-2","rHepB-3","13PCV-1","13PCV-2","13PCV-3","13PCV-4","5in1-1","5in1-2","5in1-3","5in1-4","BCG","MMR-1","MMR-2","Var-1","2HepA-1","2HepA-2","JE-CV_LiveAtd-1","JE-CV_LiveAtd-2","DTaP-IPV-5"],vacnameprolist={BCG:["BCG"],"rHepB-1":["HBV"],"rHepB-2":["HBV"],"rHepB-3":["HBV"],"5in1-1":["Tetanus","Diphtheria","Pertusis","Polio","Hib"],"5in1-2":["Tetanus","Diphtheria","Pertusis","Polio","Hib"],"5in1-3":["Tetanus","Diphtheria","Pertusis","Polio","Hib"],"5in1-4":["Tetanus","Diphtheria","Pertusis","Polio","Hib"],"MMR-1":["Measles","Mumps","Rubella"],"MMR-2":["Measles","Mumps","Rubella"],"JE-1":["JE"],"JE-2":["JE"],"JE-3":["JE"],"JE-4":["JE"],"JE-CV_LiveAtd-1":["JE"],"JE-CV_LiveAtd-2":["JE"],"JE_LiveAtd-1":["JE"],"JE_LiveAtd-2":["JE"],"JE-VC_Inactd-1":["JE"],"JE-VC_Inactd-2":["JE"],"JE-VC_Inactd-3":["JE"],"JE-VC_Inactd-4":["JE"],"Tdap-IPV":["Tetanus","Diphtheria","Pertusis","Polio"],Td:["Tetanus","Diphtheria"],"2HepA-1":["HAV"],"2HepA-2":["HAV"],"6in1-1":["Tetanus","Diphtheria","Pertusis","Polio","Hib","HBV"],"6in1-2":["Tetanus","Diphtheria","Pertusis","Polio","Hib","HBV"],"6in1-3":["Tetanus","Diphtheria","Pertusis","Polio","Hib","HBV"],"6in1-4":["Tetanus","Diphtheria","Pertusis","Polio","Hib","HBV"],"13PCV-1":["PCV"],"13PCV-2":["PCV"],"13PCV-3":["PCV"],"13PCV-4":["PCV"],"DTaP-IPV-1":["Tetanus","Diphtheria","Pertusis","Polio"],"DTaP-IPV-2":["Tetanus","Diphtheria","Pertusis","Polio"],"DTaP-IPV-3":["Tetanus","Diphtheria","Pertusis","Polio"],"DTaP-IPV-4":["Tetanus","Diphtheria","Pertusis","Polio"],MV:["Measles"],"DTaP-1":["Tetanus","Diphtheria","Pertusis"],"DTaP-2":["Tetanus","Diphtheria","Pertusis"],"DTaP-3":["Tetanus","Diphtheria","Pertusis"],"DTaP-4":["Tetanus","Diphtheria","Pertusis"],"DTaP-5":["Tetanus","Diphtheria","Pertusis"],"IPV-1":["Polio"],"IPV-2":["Polio"],"IPV-3":["Polio"],"IPV-4":["Polio"],"IPV-5":["Polio"],"Hib-1":["Hib"],"Hib-2":["Hib"],"Hib-3":["Hib"],"Hib-4":["Hib"],"DTP-1":["Tetanus","Diphtheria","Pertusis"],"DTP-2":["Tetanus","Diphtheria","Pertusis"],"DTP-3":["Tetanus","Diphtheria","Pertusis"],"DTP-4":["Tetanus","Diphtheria","Pertusis"],"DT-1":["Tetanus","Diphtheria"],"DT-2":["Tetanus","Diphtheria"],"DT-3":["Tetanus","Diphtheria"],"DT-4":["Tetanus","Diphtheria"],"7PCV-1":["PCV"],"7PCV-2":["PCV"],"7PCV-3":["PCV"],"7PCV-4":["PCV"],"10PCV-1":["PCV"],"10PCV-2":["PCV"],"10PCV-3":["PCV"],"10PCV-4":["PCV"],"HepAB-1":["HAV","HBV"],"HepAB-2":["HAV","HBV"],"HepAB-3":["HAV","HBV"],Tdap:["AP"],"+BCG":["BCG"],"HepB-LBW":["HBV"],"HepB-LBWe":["HBV"],"HepB-LBWs":["HBV"],"HepB-LBWu":["HBV"],"+JE-1":["JE"],"+JE-2":["JE"],"+Td-1":["Tetanus","Diphtheria"],"+Td-2":["Tetanus","Diphtheria"],"+Tdap-IPV-1":["AP"],"+Tdap-IPV-2":["AP"],"+MMR-1":["Measles","Mumps","Rubella"],"+MMR-2":["Measles","Mumps","Rubella"],"+rHepB-1":["HBV"],"+rHepB-2":["HBV"],"+rHepB-3":["HBV"],"pHepB-1":["HBV"],"pHepB-2":["HBV"],"pHepB-3":["HBV"],"pHepB-4":["HBV"],Mumps:["Mumps"],"+MV":["Measles"],"OPV-1":["Polio"],"OPV-2":["Polio"],"OPV-3":["Polio"],"OPV-4":["Polio"],"OPV-5":["Polio"],"+OPV-1":["Polio"],"+OPV-2":["Polio"],"+OPV-3":["Polio"],"+IPV-1":["Polio"],"+IPV-2":["Polio"],"+IPV-3":["Polio"],"DTaP-IPV-5":["AP"],"+DTaP-IPV-1":["Tetanus","Diphtheria","Pertusis","Polio","AP"],"+DTaP-IPV-2":["Tetanus","Diphtheria","Pertusis","Polio","AP"],"MMRV-1":["Measles","Mumps","Rubella","Var"],"MMRV-2":["Measles","Mumps","Rubella","Var"],"+2HepA-1":["HAV"],"+2HepA-2":["HAV"],"3HepA-1":["HAV"],"3HepA-2":["HAV"],"3HepA-3":["HAV"],MMR0:["Measles","Mumps","Rubella"],"MR-1":["Measles","Rubella"],"MR-2":["Measles","Rubella"],RV:["Rubella"],"Var-1":["Var"],"Var-2":["Var"],MMR:["Measles","Mumps","Rubella"],"15PCV-1":["PCV"],"15PCV-2":["PCV"],"15PCV-3":["PCV"],"15PCV-4":["PCV"],"DTaP-HepB-IPV-1":["Tetanus","Diphtheria","Pertusis","Polio","HBV"],"DTaP-HepB-IPV-2":["Tetanus","Diphtheria","Pertusis","Polio","HBV"],"DTaP-HepB-IPV-3":["Tetanus","Diphtheria","Pertusis","Polio","HBV"],"DTaP-HepB-IPV-4":["Tetanus","Diphtheria","Pertusis","Polio","HBV"],"DTaP-HepB-IPV-5":["Tetanus","Diphtheria","Pertusis","Polio","HBV","AP"],TT:["Tetanus"],"DTwP-HepB-Hib-1":["Tetanus","Diphtheria","Pertusis","Polio","HBV"],"DTwP-HepB-Hib-2":["Tetanus","Diphtheria","Pertusis","Polio","HBV"],"DTwP-HepB-Hib-3":["Tetanus","Diphtheria","Pertusis","Polio","HBV"],"DTwP-HepB-Hib-4":["Tetanus","Diphtheria","Pertusis","Polio","HBV"],"DTwP-HepB-Hib-5":["Tetanus","Diphtheria","Pertusis","Polio","HBV","AP"],rHepB:["HBV"],"20PCV-1":["PCV"],"20PCV-2":["PCV"],"20PCV-3":["PCV"],"20PCV-4":["PCV"]},vacprolist=["HBV","Tetanus","Diphtheria","Pertusis","Hib","Polio","PCV","BCG","Measles","Mumps","Rubella","Var","HAV","JE","AP"],returnvalue=I(patientidbirth,resultobj),showvacwindow(returnvalue,patientidbirth)}function n(e){for(applylistbyvaccine={},a=0;a<e.ApplyRecord.length;a++)SRVC=e.ApplyRecord[a].SRVC,temprecord={},temprecord.ID=e.ApplyRecord[a].ID,temprecord.ON=e.ApplyRecord[a].ON,temprecord.VB=e.ApplyRecord[a].VB,temprecord.SRVC=SRVC,applylistbyvaccine[SRVC]=temprecord;return applylistbyvaccine}function i(e){return TBY=1*e.substring(0,3),TBM=1*e.substring(3,5),TBD=1*e.substring(5,7),ND=new Date,NY=ND.getFullYear()-1911,NM=ND.getMonth()+1,ND=ND.getDate(),DO=ND-TBD,MO=NM-TBM,YO=NY-TBY,DO<0&&(DO+=30,MO-=1),MO<0&&(MO+=12,YO-=1),returnvalue=[YO,MO,DO],returnvalue}function r(e){return TBY=1*e.substring(0,3),ND=new Date,NY=ND.getFullYear()-1911,NY-TBY}function o(e,t){return TBY=1*e.substring(0,3)+1911,IDY=new Date(t).getFullYear(),IDY-TBY}function l(e,t){return TBY=1*e.substring(0,3)+1911,TBM=1*e.substring(3,5),TBD=1*e.substring(3,5),IDY=new Date(t).getFullYear(),IDM=new Date(t).getMonth()+1,IDD=new Date(t).getDate(),DDY=IDY-TBY,DDM=IDM-TBM,DDD=IDD-TBD,DDD<0&&(DDD+=30,DDM-=1),DDM<0&&(DDM+=12,DDY-=1),VMO=12*DDY+DDM,VMO}function s(e,t){return date_1=new Date(e),date_2=new Date(date_1.getTime()+1e3*t*3600*24+288e5).toISOString(),date_2}function m(e){for(needtoapplylist=[],recvaccinelist={0:["rHepB-1"],1:["rHepB-2"],2:["13PCV-1","5in1-1"],4:["13PCV-2","5in1-2"],5:["BCG"],6:["rHepB-3","5in1-3"],12:["MMR-1","Var-1","2HepA-1","13PCV-3"],15:["JE-CV_LiveAtd-1"],18:["2HepA-2","5in1-4"],27:["JE-CV_LiveAtd-2"],60:["DTaP-IPV-5","MMR-2"]},monthlist=Object.keys(recvaccinelist),b=0;b<monthlist.length;b++)if(monthlist[b]<=e)for(c=0;c<recvaccinelist[monthlist[b]].length;c++)needtoapplylist.push(recvaccinelist[monthlist[b]][c]);return needtoapplylist}function u(e){recvaccinelist={0:["rHepB-1"],1:["rHepB-2"],2:["13PCV-1","5in1-1"],4:["13PCV-2","5in1-2"],5:["BCG"],6:["rHepB-3","5in1-3"],12:["MMR-1","Var-1","2HepA-1","13PCV-3"],15:["JE-CV_LiveAtd-1"],18:["2HepA-2","5in1-4"],27:["JE-CV_LiveAtd-2"],60:["DTaP-IPV-5","MMR-2"]},monthlist=Object.keys(recvaccinelist),nexttimevaccine=[];for(let t=0;t<monthlist.length;t++)if(monthlist[t]>e){nexttimevaccine=recvaccinelist[monthlist[t]];break}return nexttimevaccine}function p(e,t){if(old_array=i(t),monthold=1*(12*old_array[0]+old_array[1]+old_array[2]/30).toFixed(2),ageold=r(t),need_array=m(monthold),next_array=u(monthold),applylist=n(e),returnobj={},returnobj.needtoapply={},returnobj.nexttoapply={},applylist_array=Object.keys(applylist),applylist_array.includes("13PCV-3")&&(PCV3ID=applylist["13PCV-3"].ID,PCV3IDageold=l(t,PCV3ID),PCV3IDageold<12&&monthold>=12&&need_array.push("13PCV-4")),applypro=x(applylist_array),needpro=x(need_array),monthold<216){for(d=0;d<need_array.length;d++)applylist_array.includes(need_array[d])||(returnobj.needtoapply[need_array[d]]=v(applylist,need_array[d],t));for(let e=0;e<next_array.length;e++)returnobj.nexttoapply[next_array[e]]=v(applylist,next_array[e],t)}return returnobj}function _(e){return mkyy=e.substring(0,3),mkym=e.substring(3,5),mkyd=e.substring(5,7),cyy=1*mkyy+1911,cyd=cyy+"-"+mkym+"-"+mkyd,new Date(cyd)}function y(e,t,n){return cyd=new Date(e),cyy=cyd.getFullYear(),cym=cyd.getMonth()+1,cyd=cyd.getDate(),cyy+=t,cym+=n,cym>12&&(cym-=12,cyy+=1),ncyd=cyy+"-"+cym+"-"+cyd,date_1=new Date(ncyd),date_2=new Date(date_1.getTime()+288e5),date_2}function C(e){return cyd=new Date(e),cyy=cyd.getFullYear()-1911,cym=cyd.getMonth()+1,cyd=cyd.getDate(),mky="000"+cyy,mky=mky.substring(mky.length-3,mky.length),mkm="00"+cym,mkm=mkm.substring(mkm.length-2,mkm.length),mkd="00"+cyd,mkd=mkd.substring(mkd.length-2,mkd.length),mkdate=mky+mkm+mkd,mkdate}function v(t,n,i){for(activevaccine=["MMR","MMR-1","MMR-2","Var-1","Var-2","JE-CV_LiveAtd-1","JE-CV_LiveAtd-2"],birthcy=_(i),ALD="",ALDNa="",applykeys=Object.keys(t),e=0;e<activevaccine.length;e++)applykeys.includes(activevaccine[e])&&(ALDN=new Date(t[activevaccine[e]].ID),""==ALD?(ALD=ALDN,ALDNa=activevaccine[e]):ALDN>ALD&&(ALD=ALDN,ALDNa=activevaccine[e]));if(vaccinelist.includes(n)){if("rHepB-1"==n&&(LD="",recommandtime=birthcy,recommandtimeC="出生24小時內儘速",leastinterval=birthcy,leastintervalC="出生24小時內儘速"),"rHepB-2"==n&&(applykeys.includes("rHepB-1")?(LD=t["rHepB-1"].ID,recommandtime1=y(LD,0,1),recommandtime2=y(birthcy,0,1),recommandtime1>recommandtime2?recommandtime=recommandtime1:recommandtime=recommandtime2,recommandtimeC="1個月大(與第一劑間隔1個月)",leastinterval=s(LD,28),leastintervalC="間隔4週(28天)"):(LD="",recommandtime="",recommandtimeC="未接種第一劑",leastinterval="",leastintervalC="未接種第一劑")),"rHepB-3"==n&&(applykeys.includes("rHepB-2")?(LD=t["rHepB-2"].ID,recommandtime1=y(LD,0,5),recommandtime2=y(birthcy,0,6),recommandtime1>recommandtime2?recommandtime=recommandtime1:recommandtime=recommandtime2,recommandtimeC="6個月大(第二劑間隔5個月)",leastinterval1=s(LD,56),applykeys.includes("rHepB-1")&&(LD2=t["rHepB-1"].ID,leastinterval2=s(LD2,112)),leastinterval1>leastinterval2?leastinterval=leastinterval:leastinterval=leastinterval2,leastintervalC="與第二劑間隔56天且第1、第3劑應間隔至少16週"):(LD="",recommandtime="",recommandtimeC="未接種第二劑",leastinterval="",leastintervalC="未接種第二劑")),"5in1-1"==n&&(LD="",recommandtime1=s(birthcy,60),recommandtime2=y(birthcy,0,2),recommandtime1>recommandtime2?recommandtime=recommandtime1:recommandtime=recommandtime2,recommandtimeC="2個月",leastinterval=s(birthcy,42),leastintervalC="6週"),"5in1-2"==n&&(applykeys.includes("5in1-1")?(LD=t["5in1-1"].ID,recommandtime1=y(LD,0,2),recommandtime2=y(birthcy,0,4),recommandtime1>recommandtime2?recommandtime=recommandtime1:recommandtime=recommandtime2,recommandtimeC="4個月(與第一劑間隔2個月)",leastinterval=s(LD,28),leastintervalC="4週(與第一劑間隔28天)"):(LD="",recommandtime="",recommandtimeC="未接種第一劑",leastinterval="",leastintervalC="未接種第一劑")),"5in1-3"==n&&(applykeys.includes("5in1-2")?(LD=t["5in1-2"].ID,recommandtime1=y(LD,0,2),recommandtime2=y(birthcy,0,6),recommandtime1>recommandtime2?recommandtime=recommandtime1:recommandtime=recommandtime2,recommandtimeC="6個月(與第二劑間隔2個月)",leastinterval=s(LD,28),leastintervalC="4週(與第二劑間隔28天)"):(LD="",recommandtime="",recommandtimeC="未接種第二劑",leastinterval="",leastintervalC="未接種第二劑")),"5in1-4"==n&&(applykeys.includes("5in1-3")?(LD=t["5in1-3"].ID,recommandtime1=y(LD,1,0),recommandtime2=y(birthcy,1,6),recommandtime1>recommandtime2?recommandtime=recommandtime1:recommandtime=recommandtime2,recommandtimeC="18個月(與第三劑間隔1年)",leastinterval1=s(LD,180),leastinterval2=y(birthcy,1,0),leastinterval1>leastinterval2?leastinterval=leastinterval1:leastinterval=leastinterval2,leastintervalC="間隔6個月(與第二劑間隔180天)且滿1歲後"):(LD="",recommandtime="",recommandtimeC="未接種第三劑",leastinterval="",leastintervalC="未接種第三劑")),"13PCV-1"==n&&(LD="",recommandtime1=s(birthcy,60),recommandtime2=y(birthcy,0,2),recommandtime1>recommandtime2?recommandtime=recommandtime1:recommandtime=recommandtime2,recommandtimeC="2個月大",leastinterval=s(birthcy,42),leastintervalC="6週大"),"13PCV-2"==n&&(applykeys.includes("13PCV-1")?(LD=t["13PCV-1"].ID,recommandtime1=y(LD,0,2),recommandtime2=y(birthcy,0,4),recommandtime1>recommandtime2?recommandtime=recommandtime1:recommandtime=recommandtime2,recommandtimeC="4個月大(第一劑間隔2個月)",leastinterval=s(LD,56),leastintervalC="間隔8週(56天)"):(LD="",recommandtime="",recommandtimeC="未接種第一劑",leastinterval="",leastintervalC="未接種第一劑")),"13PCV-3"==n&&(applykeys.includes("13PCV-2")?(LD=t["13PCV-2"].ID,recommandtime1=y(LD,0,8),recommandtime2=y(birthcy,1,0),recommandtime1>recommandtime2?recommandtime=recommandtime1:recommandtime=recommandtime2,recommandtimeC="12個月大(與第二劑間隔8個月)",leastinterval1=s(LD,56),leastinterval2=y(birthcy,1,0),leastinterval1>leastinterval2?leastinterval=leastinterval1:leastinterval=leastinterval2,leastintervalC="間隔8週且滿1歲(與第二劑間隔56天)"):(LD="",recommandtime="",recommandtimeC="未接種第二劑",leastinterval="",leastintervalC="未接種第二劑")),"13PCV-4"==n&&(applykeys.includes("13PCV-3")?(LD=t["13PCV-3"].ID,recommandtime1=y(LD,0,6),recommandtime2=y(birthcy,1,0),recommandtime1>recommandtime2?recommandtime=recommandtime1:recommandtime=recommandtime2,recommandtimeC="12個月大(與第三劑間隔6個月)",leastinterval1=s(LD,56),leastinterval2=y(birthcy,1,0),leastinterval1>leastinterval2?leastinterval=leastinterval1:leastinterval=leastinterval2,leastintervalC="間隔8週且滿1歲(與第三劑間隔56天)"):(LD="",recommandtime="",recommandtimeC="未接種第二劑",leastinterval="",leastintervalC="未接種第二劑")),"BCG"==n&&(LD="",recommandtime=y(birthcy,0,5),recommandtimeC="5個月",leastinterval=birthcy,leastintervalC="出生後"),"MMR-1"==n&&(LD="",""==ALD?(recommandtime=y(birthcy,1,0),recommandtimeC="12個月",leastinterval=y(birthcy,1,0),leastintervalC="12個月"):(recommandtime1=y(birthcy,1,0),recommandtime2=s(ALD,29),recommandtime1>recommandtime2?(recommandtime=recommandtime1,leastinterval=recommandtime1,recommandtimeC="12個月",leastintervalC="12個月"):(recommandtime=recommandtime2,leastinterval=recommandtime2,recommandtimeC="滿12個月且與"+ALDNa+"間隔28+1天",leastintervalC="滿12個月且與"+ALDNa+"間隔28+1天"))),"MMR-2"==n&&(applykeys.includes("MMR-1")?(LD=t["MMR-1"].ID,""==ALD?(recommandtime=y(birthcy,5,0),recommandtimeC="滿5歲",leastinterval=s(LD,29),leastintervalC="隔4週(與第一劑間隔28+1天)"):(recommandtime1=y(birthcy,5,0),recommandtime2=s(ALD,29),recommandtime1>recommandtime2?(recommandtime=recommandtime1,recommandtimeC="滿5歲"):(recommandtime=recommandtime2,recommandtimeC="滿5歲且與"+ALDNa+"間隔28+1天"),leastinterval1=s(ALD,29),leastinterval2=s(LD,29),leastinterval1>leastinterval2?(leastinterval=leastinterval1,leastintervalC="隔4週(與第一劑間隔28+1天)"):(leastinterval=leastinterval2,leastintervalC="與"+ALDNa+"間隔28天"))):(LD="",recommandtime="",recommandtimeC="未接種第一劑",leastinterval="",leastintervalC="未接種第一劑")),"Var-1"==n&&(LD="",""==ALD?(recommandtime=y(birthcy,1,0),recommandtimeC="12個月",leastinterval=y(birthcy,1,0),leastintervalC="12個月"):(recommandtime1=y(birthcy,1,0),recommandtime2=s(ALD,29),recommandtime1>recommandtime2?(recommandtime=recommandtime1,leastinterval=recommandtime1,recommandtimeC="12個月",leastintervalC="12個月"):(recommandtime=recommandtime2,leastinterval=recommandtime2,recommandtimeC="滿12個月且與"+ALDNa+"間隔28(+1)天",leastintervalC="滿12個月且與"+ALDNa+"間隔28(+1)天"))),"2HepA-1"==n&&(LD="",recommandtime=y(birthcy,1,6),recommandtimeC="18個月",leastinterval=y(birthcy,1,6),leastintervalC="18個月"),"2HepA-2"==n&&(applykeys.includes("2HepA-1")?(LD=t["2HepA-1"].ID,recommandtime1=y(LD,0,6),recommandtime2=y(birthcy,2,3),recommandtime1>recommandtime2?recommandtime=recommandtime1:recommandtime=recommandtime2,recommandtimeC="27個月(與第一劑間隔6個月)",leastinterval=y(LD,0,6),leastintervalC="與第一劑間隔6個月"):(LD="",recommandtime="",recommandtimeC="未接種第一劑",leastinterval="",leastintervalC="未接種第一劑")),"JE-CV_LiveAtd-1"==n&&(LD="",""==ALD?(recommandtime=y(birthcy,1,3),recommandtimeC="15個月",leastinterval=y(birthcy,1,0),leastintervalC="12個月"):(recommandtime1=y(birthcy,1,3),recommandtime2=s(ALD,29),recommandtime1>recommandtime2?(recommandtime=recommandtime1,recommandtimeC="15個月"):(recommandtime=recommandtime2,recommandtimeC="滿15個月且與"+ALDNa+"間隔28+1天"),leastinterval1=y(birthcy,1,0),leastinterval2=s(ALD,29),leastinterval1>leastinterval2?(leastinterval=leastinterval1,leastintervalC="12個月"):(leastinterval=leastinterval2,leastintervalC="滿12個月且與"+ALDNa+"間隔28+1天"))),"JE-CV_LiveAtd-2"==n&&(applykeys.includes("JE-CV_LiveAtd-1")?(LD=t["JE-CV_LiveAtd-1"].ID,""==ALD?(recommandtime1=y(LD,1,0),recommandtime1=s(recommandtime1,1),recommandtime2=y(birthcy,2,3),recommandtime2=s(recommandtime2,1),recommandtime1>recommandtime2?recommandtime=recommandtime1:recommandtime=recommandtime2,recommandtimeC="27個月+1天(與第一劑間隔12個月+1天)",leastinterval=y(LD,1,0),leastinterval=s(leastinterval,1),leastintervalC="與第一劑間隔12個月+1天"):(recommandtime1=y(LD,1,0),recommandtime1=s(recommandtime1,1),recommandtime2=s(ALD,29),recommandtime1>recommandtime2?(recommandtime=recommandtime1,recommandtimeC="27個月+1天(與第一劑間隔12個月+1天)"):(recommandtime=recommandtime2,recommandtimeC="第一劑間隔12個月+1天且與"+ALDNa+"間隔28+1天"),leastinterval1=y(LD,1,0),leastinterval1=s(leastinterval1,1),leastinterval2=s(ALD,29),leastinterval1>leastinterval2?(leastinterval=leastinterval1,leastintervalC="與第一劑間隔12個月+1天"):(leastinterval=leastinterval2,leastintervalC="與第一劑間隔12個月+1天且與"+ALDNa+"間隔28天"))):(LD="",recommandtime="",recommandtimeC="未接種第一劑",leastinterval="",leastintervalC="未接種第一劑")),"DTaP-IPV-5"==n&&(LD="",recommandtime=y(birthcy,5,0),recommandtimeC="滿5歲",leastinterval=y(birthcy,4,0),leastintervalC="滿4歲"),temparray={},temparray.name=n,temparray.LD=LD,temparray.recommandtime=recommandtime,temparray.recommandtimeC=recommandtimeC,temparray.leastinterval=leastinterval,temparray.leastintervalC=leastintervalC,now0=new Date,nowy=now0.getFullYear(),nowm=now0.getMonth()+1,nowd=now0.getDate(),nowm=nowm.toString().padStart(2,"0"),nowd=nowd.toString().padStart(2,"0"),now=new Date(nowy.toString()+"-"+nowm.toString()+"-"+nowd.toString()+"T15:00:00.000Z"),now>=new Date(leastinterval)){for(thevacpro=vacnameprolist[n],pass=!0,zz=0;zz<thevacpro.length;zz++)apro=Math.ceil(applypro[thevacpro[zz]]),npro=Math.ceil(needpro[thevacpro[zz]]),apro<npro&&(pass=!1);pass?now>=new Date(recommandtime)?(temparray.allsug="?_O",temparray.allsugC="請檢查是否有接種替代疫苗，若無建議接種"):(temparray.allsug="?_▲",temparray.allsugC="請檢查是否有接種替代疫苗，若無可接種(符合最短間隔)"):now>=new Date(recommandtime)?(temparray.allsug="O",temparray.allsugC="建議接種"):(temparray.allsug="▲",temparray.allsugC="僅符合最短接種時程")}else temparray.allsug="X",temparray.allsugC="不符合接種時程";return temparray}}function x(e){for(vacpro={},aa=0;aa<vacprolist.length;aa++)vacpro[vacprolist[aa]]=0;for(ab=0;ab<e.length;ab++)if(thevacname=e[ab],Object.keys(vacnameprolist).includes(thevacname))for(thevacprolist=vacnameprolist[thevacname],["JE-1","JE-2","JE-3","JE-4","JE-VC_Inactd-1","JE-VC_Inactd-2","JE-VC_Inactd-3","JE-VC_Inactd-4"].includes(thevacname)?vproc=.3:vproc=1,ac=0;ac<thevacprolist.length;ac++)vacpro[thevacprolist[ac]]+=vproc;return vacpro}function w(e,t){if(now=new Date,nowy=now.getFullYear(),nowm=now.getMonth()+1,nowm>=10?sy=nowy:sy=nowy-1,flustarttime=new Date(sy+"-10-01 "),old_array=i(t),monthold=1*(12*old_array[0]+old_array[1]+old_array[2]/30).toFixed(2),retobj={},errmsg="",flulist=[],monthold>=6){for(f=0;f<e.ApplyRecord.length;f++)SRVC=e.ApplyRecord[f].SRVC,SRVC.includes("Flu")&&flulist.push(e.ApplyRecord[f]);0==flulist.length?(suggest="O",monthold<108?errmsg="未滿9歲,需接種第二劑":errmsg="不曾接種",LD="",LDsite=""):(LD=flulist[flulist.length-1].ID,LDdate=new Date(LD),LDdate>=flustarttime?1==flulist.length&&monthold<108?now>=new Date(s(LDdate,28))?(suggest="2",LDsite=flulist[flulist.length-1].ON,errmsg="第二劑,間隔滿28天"):(suggest="X",LDsite=flulist[flulist.length-1].ON,errmsg="第二劑間隔未滿28天"):(suggest="X",LDsite=flulist[flulist.length-1].ON,errmsg="當年度已接種"):(suggest="O",errmsg="當年度未接種",LDsite=flulist[flulist.length-1].ON))}else suggest="X",LD="",LDsite="",errmsg="未滿6個月";return retobj.suggest=suggest,retobj.LD=LD,retobj.LDsite=LDsite,retobj.errmsg=errmsg,retobj}function D(e,t){for(ageold=r(t),PPVlist=[],PCVlist=[],g=0;g<e.ApplyRecord.length;g++)SRVC=e.ApplyRecord[g].SRVC,SRVC.includes("PPV")&&PPVlist.push(e.ApplyRecord[g]),SRVC.includes("PCV")&&o(t,e.ApplyRecord[g].ID)>18&&PCVlist.push(e.ApplyRecord[g]);return PPVlist.length>0?(PPVsuggest="X",PPVcomment="已接種過PPV",PPVLD=PPVlist[PPVlist.length-1].ID,PPVLDS=PPVlist[PPVlist.length-1].ON):ageold>=65?PCVlist.length>0?(PCVLD=PCVlist[PCVlist.length-1].ID,now=new Date,now>=y(PCVLD,1,0)?(PPVsuggest="O",PPVcomment="已接種過PCV13,間隔滿1年",PPVLD="",PPVLDS=""):(PPVsuggest="X",PPVcomment="已接種過PCV1,間隔未滿1年",PPVLD="",PPVLDS="")):(PPVsuggest="▲",PPVcomment="年滿65歲,優先接種PCV13",PPVLD="",PPVLDS=""):ageold>=50&&ageold<65?(PPVsuggest="▲",PPVcomment="55-64專案",PPVLD="",PPVLDS=""):(PPVsuggest="X",PPVcomment="未滿50歲,無法施打PPV",PPVLD="",PPVLDS=""),PCVlist.length>0?(PCVsuggest="X",PCVcomment="已接種過PCV",PCVLD=PCVlist[PCVlist.length-1].ID,PCVLDS=PCVlist[PCVlist.length-1].ON):ageold>=65?PPVlist.length>0?(PPVLD=PPVlist[PPVlist.length-1].ID,now=new Date,now>=y(PPVLD,1,0)?(PCVsuggest="O",PCVcomment="已接種過PPV,間隔滿1年",PCVLD="",PCVLDS=""):(PCVsuggest="X",PCVcomment="已接種過PPV,間隔未滿1年",PCVLD="",PCVLDS="")):(PCVsuggest="O",PCVcomment="可接種PCV",PCVLD="",PCVLDS=""):(PCVsuggest="X",PCVcomment="未滿65歲,無法施打PCV",PCVLD="",PCVLDS=""),retobj={},retobj.PCV={},retobj.PCV.PCVsuggest=PCVsuggest,retobj.PCV.PCVcomment=PCVcomment,retobj.PCV.PCVLD=PCVLD,retobj.PCV.PCVLDS=PCVLDS,retobj.PPV={},retobj.PPV.PPVsuggest=PPVsuggest,retobj.PPV.PPVcomment=PPVcomment,retobj.PPV.PPVLD=PPVLD,retobj.PPV.PPVLDS=PPVLDS,retobj}function P(e,t){if(old_array=i(t),monthold=1*(12*old_array[0]+old_array[1]+old_array[2]/30).toFixed(2),retobj={},monthold>6){for(CoVlist=[],h=0;h<e.ApplyRecord.length;h++)SRVC=e.ApplyRecord[h].SRVC,SRVC.includes("CoV_")&&CoVlist.push(e.ApplyRecord[h]);CoVlist.length>0?(theSRVC=CoVlist[CoVlist.length-1].SRVC,retobj.count=CoVlist.length,COVLD=CoVlist[CoVlist.length-1].ID,retobj.LD=COVLD,retobj.LDsite=CoVlist[CoVlist.length-1].ON,retobj.LDtype=theSRVC,now=new Date,now>=y(COVLD,0,3)?retobj.suggest="O":retobj.suggest="X"):(retobj.count=CoVlist.length,retobj.LD="",retobj.LDsite="",retobj.LDtype="",retobj.suggest="O")}else retobj.count=0,retobj.LD="",retobj.LDsite="",retobj.LDtype="<6個月不接種新冠疫苗",retobj.suggest="X";return retobj}function L(e,t){return returnobj={},returnobj.routine=p(e,t),returnobj.flu=w(e,t),returnobj.PV=D(e,t),returnobj.CoV=P(e,t),returnobj}function I(e,t){return result=t,vaccinesug=L(t,e),theretobj={},theretobj.patientName=thename,theretobj.vaccinesuggestion=vaccinesug,theretobj.niisapplylist=result,testmode?theretobj:(theretobj_string=JSON.stringify(theretobj),theretobj_string)}}function chntoinfoid(e){let t,n=httpGet("https://phpcis.chshb.gov.tw/api/v1/personal_infos/list?bureauRecordNo="+e),i=JSON.parse(n);return 1==i.result.length&&i.result[0]}function httpGet(e){var t=new XMLHttpRequest;return t.open("GET",e,!1),t.send(null),t.responseText}function showvacwindow(e,t){let n=JSON.parse(e);null!=document.getElementById("create_niisdrag")&&document.getElementById("create_niisdrag").remove(),thewidth=610,theheight=500,borderx=20,bordery=150;var i=document.createElement("div");i.id="create_niisdrag",i.style.width=thewidth+"px",i.style.left=(window.innerWidth-thewidth)/2+"px",i.style.top=bordery+"px",i.style.background="#f9f9f9",i.style.border="1px solid #ccc",i.style.position="absolute",i.style.zIndex="9999";let a=t.substring(0,3),r=t.substring(3,5),o=t.substring(5,7),l=(new Date).getFullYear()-1911-a,c=(new Date).getMonth()+1-r,d=(new Date).getDate()-o;d<0&&(c-=1,d+=30),c<0&&(l-=1,c+=12);let s="";s=0==l?c+"月"+d+"天":l+"歲"+c+"月"+d+"天";let m=2,u=2,h=2;div_name=p(m,u,40,25),div_name.textContent="姓名:",m=m+40+2,div_name=p(m,u,500,25),div_name.textContent=n.patientName+"("+s+")",div_name.style.textAlign="left",div_exit=g(585,u,25,25),div_exit.textContent="X",div_exit.addEventListener("click",function(){null!=document.getElementById("create_niisdrag")&&document.getElementById("create_niisdrag").remove()}),m=m+40+2,m=2,u+=25,div_flu=p(m,u,40,25),div_flu.textContent="flu:",div_flu.style.textAlign="right",m=m+40+2,div_fluc=p(m,u,110,25),div_fluc.textContent=_(n.vaccinesuggestion.flu.LD)+"("+n.vaccinesuggestion.flu.suggest+")",div_fluc.style.textAlign="left","O"!=n.vaccinesuggestion.flu.suggest&&"2"!=n.vaccinesuggestion.flu.suggest||(div_fluc.style.color="blue"),div_fluc.title=n.vaccinesuggestion.flu.errmsg+"\n上次接種時間:"+_(n.vaccinesuggestion.flu.LD)+"\n上次接種地點:"+n.vaccinesuggestion.flu.LDsite,m=m+110+2,div_PPV=p(m,u,40,25),div_PPV.textContent="PPV:",div_PPV.style.textAlign="right",m=m+40+2,div_PPVc=p(m,u,110,25),div_PPVc.textContent=_(n.vaccinesuggestion.PV.PPV.PPVLD)+"("+n.vaccinesuggestion.PV.PPV.PPVsuggest+")",div_PPVc.style.textAlign="left","O"==n.vaccinesuggestion.PV.PPV.PPVsuggest&&(div_PPVc.style.color="blue"),div_PPVc.title=n.vaccinesuggestion.PV.PPV.PPVcomment+"\n上次接種時間:"+_(n.vaccinesuggestion.PV.PPV.PPVLD)+"\n上次接種地點:"+n.vaccinesuggestion.PV.PPV.PPVLDS,m=m+110+2,div_PCV=p(m,u,40,25),div_PCV.textContent="PCV:",div_PCV.style.textAlign="right",m=m+40+2,div_PCVc=p(m,u,110,25),div_PCVc.textContent=_(n.vaccinesuggestion.PV.PCV.PCVLD)+"("+n.vaccinesuggestion.PV.PCV.PCVsuggest+")",div_PCVc.style.textAlign="left","O"==n.vaccinesuggestion.PV.PCV.PCVsuggest&&(div_PCVc.style.color="blue"),div_PCVc.title=n.vaccinesuggestion.PV.PCV.PCVcomment+"\n上次接種時間:"+_(n.vaccinesuggestion.PV.PCV.PCVLD)+"\n上次接種地點:"+n.vaccinesuggestion.PV.PCV.PCVLDS,m=m+110+2,div_COV=p(m,u,40,25),div_COV.textContent="COV:",div_COV.style.textAlign="right",m=m+40+2,div_COVc=p(m,u,110,25),div_COVc.textContent=_(n.vaccinesuggestion.CoV.LD)+"("+n.vaccinesuggestion.CoV.suggest+")",div_COVc.style.textAlign="left","O"==n.vaccinesuggestion.CoV.suggest&&(div_COVc.style.color="blue"),div_COVc.title="共接種"+n.vaccinesuggestion.CoV.count+"劑\n上次接種時間:"+_(n.vaccinesuggestion.CoV.LD)+"\n上次接種地點:"+n.vaccinesuggestion.CoV.LDsite,m=2,u+=25,div_ti=p(m,u,500,25),div_ti.textContent="1. 疫苗接種紀錄",div_ti.style.textAlign="left",u+=25,tab_his=b(m,u,600,150,["劑次","日期","地點"]);for(let e=0;e<n.niisapplylist.ApplyRecord.length;e++){let t=tab_his.insertRow(1),i=n.niisapplylist.ApplyRecord[e],a=[i.SRVC,_(i.ID),i.ON];for(let e=0;e<a.length;e++){let n=document.createElement("td");n.style.border="1px solid #ddd",n.style.minWidth="100px",n.style.whiteSpace="nowrap",n.textContent=a[e],t.appendChild(n)}}u+=150,div_ti=p(m,u,500,25),div_ti.textContent="2. 應接種疫苗",div_ti.style.textAlign="left",u+=25,tab_rou=b(m,u,600,150,["常規疫苗","上次接種","檢核","建議接種時間","最小接種時間"]),needkeys=Object.keys(n.vaccinesuggestion.needtoapply);for(let e=0;e<needkeys.length;e++){let t=n.vaccinesuggestion.needtoapply[needkeys[e]],i=document.createElement("tr"),a=[t.name,_(t.LD),t.allsug,_(t.recommandtime),_(t.leastinterval)];for(let e=0;e<a.length;e++){let n=document.createElement("td");n.style.border="1px solid #ddd",n.style.minWidth="100px",n.style.whiteSpace="nowrap",n.textContent=a[e],2==e?n.title=t.allsugC:3==e?n.title=t.recommandtimeC:4==e&&(n.title=t.leastintervalC),i.appendChild(n)}tab_rou.appendChild(i)}if(u+=155,nextkeys=Object.keys(n.vaccinesuggestion.nexttoapply),nexttxt=p(m,u,600,25),nexttxt.style.textAlign="left",0==nextkeys.length)nexttxt.textContent="已完成常規疫苗",nexttxt.style.color="blue";else{nexttxt.textContent="未完成常規疫苗",nexttxt.style.color="red";for(let e=0;e<nextkeys.length;e++){u+=25;let t=n.vaccinesuggestion.nexttoapply[nextkeys[e]],i=p(m,u,600,25);i.style.textAlign="left",i.textContent=t.name+"，建議:"+_(t.recommandtime)+"，最短:"+_(t.leastinterval);let a="上次接種日期: "+_(t.LD);a=(a=(a=(a=a+"\n建議接種時程: "+_(t.recommandtime))+"\n建議時程說明: "+t.recommandtimeC)+"\n最短接種時程: "+_(t.leastinterval))+"\n最短時程說明: "+t.leastintervalC,i.title=a}}function p(e,t,n,a){let r=document.createElement("div");return r.style.width=n+"px",r.style.height=a+"px",r.style.left=e+"px",r.style.top=t+"px",r.style.position="absolute",r.style.textAlign="center",i.appendChild(r),r}function g(e,t,n,a){let r=document.createElement("button");return r.style.width=n+"px",r.style.height=a+"px",r.style.left=e+"px",r.style.top=t+"px",r.style.position="absolute",r.style.textAlign="center",i.appendChild(r),r}function b(e,t,n,a,r){let o=document.createElement("div");o.style.borderCollapse="collapse",o.style.width=n+"px",o.style.height=a+"px",o.style.left=e+"px",o.style.top=t+"px",o.style.position="absolute",o.style.textAlign="center",o.style.overflowY="auto",o.style.overflowX="scroll",o.style.border="1px solid";let l=document.createElement("table"),c=document.createElement("thead"),d=document.createElement("tr");for(let e=0;e<r.length;e++){let t=document.createElement("th");t.textContent=r[e],t.style.border="1px solid #ddd",t.style.backgroundColor="#f2f2f2",t.style.minWidth="100px",t.style.textAlign="center",t.style.whiteSpace="nowrap",t.style.position="sticky",t.style.top="0",d.appendChild(t)}return c.appendChild(d),l.appendChild(c),o.appendChild(l),i.appendChild(o),l}function _(e){if(""==e)return"不曾";try{return cyd=new Date(e),cyy=cyd.getFullYear()-1911,cym=cyd.getMonth()+1,cyd=cyd.getDate(),mky="000"+cyy,mky=mky.substring(mky.length-3,mky.length),mkm="00"+cym,mkm=mkm.substring(mkm.length-2,mkm.length),mkd="00"+cyd,mkd=mkd.substring(mkd.length-2,mkd.length),mkdate=mky+mkm+mkd,mkdate}catch(t){return e}}u+=30,i.style.height=u+"px",document.body.insertBefore(i,document.body.firstChild)}}function gotourl(e){window.history.pushState({},"","/peSetting"),window.dispatchEvent(new PopStateEvent("popstate")),window.history.pushState({},"",e),window.dispatchEvent(new PopStateEvent("popstate"))}function addprintbutton(){let e;if(document.URL.includes("https://phpcis.chshb.gov.tw/consultationMainPage/")){let e=document.getElementById("heprint");if(null==e){const t=document.querySelectorAll("button"),n=Array.from(t).find(e=>"帶入問卷預設值"===e.textContent.trim());if(n){const t=n.parentElement;(e=document.createElement("button")).id="heprint",e.textContent="列印成健報告",e.className="btn btn-success",e.addEventListener("click",heprintbutton_handle),t.appendChild(e),genbbb()}else alert("請打開預防保健視窗")}}}function heprintbutton_handle(){let e=grabdata(),t=!0;if(""!=e.errmsg&&(t=!1,t=confirm("錯誤訊息\n"+e.errmsg+"是否繼續?")),t){let t;showbbb(JSON.stringify(e))}}function showbbb(e){let t=document.getElementById("printHEwindow");t.contentWindow.genhe(e),t.contentWindow.print()}function genbbb(){let e=String.raw`
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
	`;printHEwindow=document.createElement("iframe"),printHEwindow.srcdoc=e,printHEwindow.id="printHEwindow",printHEwindow.style.display="none",document.body.appendChild(printHEwindow)}function phpciisdatetomky(e,t){let n=e.split(" ")[1],i,a;return 1*n.split("-")[0]-1911+t+n.split("-")[1]+t+n.split("-")[2]}function grabdata(){let e={};e.name=document.querySelector("body > div.fade.modal.show > div > div > div.modal-body > form > div:nth-child(2) > div:nth-child(2) > div > label.text-left.commonFormlabel.form-label.col-form-label.col-lg-6").textContent,e.gender=document.querySelector("body > div.fade.modal.show > div > div > div.modal-body > form > div:nth-child(2) > div:nth-child(3) > div > label.text-left.commonFormlabel.form-label.col-form-label.col-lg-4").textContent;let t=document.querySelector("body > div.fade.modal.show > div > div > div.modal-body > form > div:nth-child(4) > div:nth-child(2) > div > div > div > div > input").value;e.visitdate=phpciisdatetomky(t,"-");let n=document.querySelector("body > div.fade.modal.show > div > div > div.modal-body > form > div:nth-child(1) > div:nth-child(4) > div > div > div > div > input").value;e.birth=phpciisdatetomky(n,"-");const i=["education","無","小學","國(初)中","高中(職)","專科大學","研究所以上","拒答"];for(let t=1;t<i.length;t++)document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(2) > input[type=checkbox]:nth-child("+t+")").checked&&(e.education=i[t]);let a="";const r=["disease1","高血壓","糖尿病","高血脂","心臟病","腦中風","小兒麻痺"];for(let e=1;e<7;e++)document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(3) > input[type=checkbox]:nth-child("+(2*e-1)+")").checked&&(a=a+r[e]+",");const o=["disease2","腎臟病","B型肝炎","C型肝炎","精神疾病","癌症"];for(let e=1;e<6;e++)document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(4) > input[type=checkbox]:nth-child("+(2*e-1)+")").checked&&(a=a+o[e]+",");a=""!=a?a.substring(0,a.length-1):"無",e.disease=a;let l="";const c=["fd1","高血壓","糖尿病","高血脂症","心臟病"];for(let e=1;e<5;e++)document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(6) > input[type=checkbox]:nth-child("+(2*e-1)+")").checked&&(l=l+c[e]+",");const d=["fd2","腦中風","精神疾病","癌症"];for(let e=1;e<4;e++)document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(7) > input[type=checkbox]:nth-child("+(2*e-1)+")").checked&&(l=l+d[e]+",");l=""!=l?l.substring(0,l.length-1):"無",e.fd=l;const s=["smoke","不吸菸","朋友敬菸或應酬才吸菸","平均一天約吸一包","平均一天約吸一包以上"];for(let t=1;t<s.length;t++)document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(9) > input[type=checkbox]:nth-child("+t+")").checked&&(e.smoke=s[t]);const m=["alcohol","不喝酒","偶爾喝酒或應酬才喝","經常喝酒"];for(let t=1;t<m.length;t++)document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(11) > input[type=checkbox]:nth-child("+t+")").checked&&(e.alcohol=m[t]);const u=["betel","不嚼檳榔","偶爾會嚼或應酬才嚼","經常嚼"];for(let t=1;t<u.length;t++)document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(13) > input[type=checkbox]:nth-child("+t+")").checked&&(e.betel=u[t]);const h=["exercise","沒有","有，但未達每週150分鐘以上(2.5小時)","有，且每週達150分鐘以上(2.5小時)"];for(let t=1;t<h.length;t++)document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(15) > input[type=checkbox]:nth-child("+t+")").checked&&(e.exercise=h[t]);document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(16) > input[type=checkbox]:nth-child(2)").checked?e.cough="沒有":e.cough="有",document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(17) > input[type=checkbox]:nth-child(2)").checked?e.depression1="沒有":e.depression1="有",document.querySelector("#uncontrolled-tab-example-tabpane-tab1 > div:nth-child(18) > input[type=checkbox]:nth-child(2)").checked?e.depression2="沒有":e.depression2="有",e.height=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(2) > input[type=number]:nth-child(1)").value,e.weight=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(2) > input[type=number]:nth-child(3)").value,e.bmi=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(4) > input[type=number]").value,e.pulse=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(2) > input[type=number]:nth-child(5)").value,e.sbp=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(1)").value,e.dbp=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(2)").value,e.waist=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(3) > input[type=number]:nth-child(4)").value;let p=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(6) > input[type=number]:nth-child(2)").value,g=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(7) > input[type=number]:nth-child(2)").value,b=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(6) > input[type=number]:nth-child(4)").value,_=document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(7) > input[type=number]:nth-child(4)").value;e.vision={},e.vision.right=0!=p?{type:"裸視",value:p}:{type:"矯正",value:g},e.vision.left=0!=b?{type:"裸視",value:b}:{type:"矯正",value:_};let y="";const C=["ENT","戴助聽器","齲齒","牙結石或牙周病","耳鼻喉及口腔異常"];for(let e=1;e<5;e++)document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(10) > input[type=checkbox]:nth-child("+(e+1)+")").checked&&(y=y+C[e]+",");document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(12) > input[type=checkbox]:nth-child(2)").checked&&(y+="淋巴腫大,"),document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(12) > input[type=checkbox]:nth-child(5)").checked&&(y+="甲狀線腫大,"),document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(13) > input[type=checkbox]:nth-child(2)").checked&&(y+="胸部異常,"),document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(13) > input[type=checkbox]:nth-child(6)").checked&&(y+="心臟聽診異常,"),document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(14) > input[type=checkbox]:nth-child(2)").checked&&(y+="呼吸聽診異常,"),document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(14) > input[type=checkbox]:nth-child(6)").checked&&(y+="腹部異常,"),document.querySelector("#uncontrolled-tab-example-tabpane-tab2 > div:nth-child(15) > input[type=checkbox]:nth-child(2)").checked&&(y+="四肢異常,"),y=""!=y?y.substring(0,y.length-1):"無明顯異常",e.PE=y,e.UP=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(3) > input[type=string]").value,e.UP>15&&(e.UP+=" ↑"),e.AC=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(5) > input[type=number]").value,e.AC>100&&(e.AC+=" ↑"),e.TC=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(6) > input[type=number]").value,e.TC>200&&(e.TC+=" ↑"),e.TG=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(7) > input[type=number]").value,e.TG>150&&(e.TG+=" ↑"),e.HDL=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(8) > input[type=number]").value,e.gender.includes("男")?e.HDL<40&&(e.HDL+=" ⭣"):e.HDL<50&&(e.HDL+=" ⭣"),e.LDL=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(9) > input[type=number]").value,e.LDL>130&&(e.LDL+=" ↑"),e.GOT=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(11) > input[type=number]").value,e.GOT>40&&(e.GOT+=" ↑"),e.GPT=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(12) > input[type=number]").value,e.GPT>40&&(e.GPT+=" ↑"),e.CRE=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(13) > input[type=number]").value,e.CRE>1.3&&(e.CRE+=" ↑"),e.GFR=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(14) > input[type=number]").value,e.GFR<60&&(e.GFR+=" ⭣"),e.UA=document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(15) > input[type=number]").value,e.UA>7&&(e.UA+=" ↑");const f=["hep","陰性","陽性","未執行"];for(let t=1;t<f.length;t++)document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(16) > input[type=checkbox]:nth-child("+(1+t)+")").checked&&(e.HBV=f[t]),document.querySelector("#uncontrolled-tab-example-tabpane-tab3 > div:nth-child(17) > input[type=checkbox]:nth-child("+(1+t)+")").checked&&(e.HCV=f[t]);let v="";const x=["HElist1","戒菸","節酒","戒檳榔","規律運動"];for(let e=1;e<5;e++)document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(2) > input[type=checkbox]:nth-child("+e+")").checked&&(v=v+x[e]+",");const w=["HElist2","慢性疾病風險評估","維持正常體重","健康飲食","事故傷害預"];for(let e=1;e<5;e++)document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(3) > input[type=checkbox]:nth-child("+e+")").checked&&(v=v+w[e]+",");const D=["HElist3","防口腔保健","腎病識能衛教指導"];for(let e=1;e<3;e++)document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(4) > input[type=checkbox]:nth-child("+e+")").checked&&(v=v+D[e]+",");v=""!=v?v.substring(0,v.length-1):"無",e.HE=v;const P=["HE_BP","HE_AC","HE_LIP","HE_CKD","HE_HEP","HE_META"];for(let t=0;t<6;t++)3==t?document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child("+(7+t)+") > input[type=checkbox]:nth-child(1)").checked?e[P[t]]="正常":document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child("+(7+t)+") > input[type=checkbox]:nth-child(6)").checked?e[P[t]]="異常：建議進一步檢查":document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child("+(7+t)+") > input[type=checkbox]:nth-child(7)").checked?e[P[t]]="異常：建議接受治療":e[P[t]]="異常：建議生活型態改善，並定期3-6個月追蹤":document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child("+(7+t)+") > input[type=checkbox]:nth-child(1)").checked?e[P[t]]="正常":document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child("+(7+t)+") > input[type=checkbox]:nth-child(5)").checked?e[P[t]]="異常：建議進一步檢查":document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child("+(7+t)+") > input[type=checkbox]:nth-child(6)").checked?e[P[t]]="異常：建議接受治療":e[P[t]]="異常：建議生活型態改善，並定期3-6個月追蹤";let L,I=0,E=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(13)").textContent.split("：【")[1].split("】")[0].split("；"),H="";for(let e=0;e<E.length;e++){let t=E[e].replaceAll("脂蛋白","");t.includes("異常")&&(I+=1,H=H+t.replaceAll("(異常)","")+"；")}H=I>0?"【"+H.substring(0,H.length-1)+"】":"",e.HE_META=e.HE_META+" "+H;const k=["risk","R_CAD","R_DM","R_HTN","R_CVA","R_MACE"];for(let t=1;t<6;t++)try{e[k[t]]=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(14) > div > div.react-bootstrap-table > table > tbody > tr:nth-child("+t+") > td.cell-risk > div > input[type=number]").value+" %"}catch(n){e[k[t]]=document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(14) > div > div.react-bootstrap-table > table > tbody > tr:nth-child(3) > td.cell-risk").textContent}"陽性"==e.HBV?e.HE_HBV="陽性，建議進一步檢查":e.HE_HBV=e.HBV,"陽性"==e.HCV?e.HE_HCV="陽性，建議進一步檢查":e.HE_HCV=e.HCV,document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(17) > input[type=checkbox]:nth-child(2)").checked?e.HE_cough="有：建議轉診進一步評估是否可能為結核病":e.HE_cough="沒有",document.querySelector("#uncontrolled-tab-example-tabpane-tab4 > div:nth-child(18) > input[type=checkbox]:nth-child(2)").checked?e.HE_dep="兩題任一題答「是」，建議轉介至相關單位進一步服務":e.HE_dep="兩題皆答否";let T="",N=Object.keys(e);for(let t=0;t<N.length;t++){let n=N[t];"vision"!=n?""!=e[n]&&"0"!=e[n]||(T=T+n+"空白或0\n"):(""!=e[n].left.value&&"0"!=e[n].left.value||(T+="左眼視力空白或0\n"),""!=e[n].right.value&&"0"!=e[n].right.value||(T+="右眼視力空白或0\n"))}let S=new XMLHttpRequest,j,A="https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId="+document.URL.split("https://phpcis.chshb.gov.tw/consultationMainPage/")[1];S.open("GET",A,!1),S.send();let R,B,M="https://phpcis.chshb.gov.tw/api/v1/health_records/prescriptions/find?healthRecordId="+JSON.parse(S.responseText).result.healthRecordId+"&diseaseLocale=1&isCertificate=false&isExportExcel=false";S.open("GET",M,!1),S.send();let V=JSON.parse(S.responseText).result;e.sitetitle=V.clinicShortName+"成人預防保健服務檢查單",e.clinicinfo=V.clinicName+"("+V.clinicCode+")<br>連絡電話:"+V.clinicPhone;let O,q="https://phpcis.chshb.gov.tw/api/v1/doctors/find?doctorId="+V.doctorId;S.open("GET",q,!1),S.send();let U=JSON.parse(S.responseText).result;return e.docinfo=U.specialists[0].specialistName+" "+U.name+"醫師<br>醫師證書字號:"+U.certificationNo,e.errmsg=T,e}!function(){var e,t;if(e=window.history,t=e.pushState,e.pushState=function(n){return setTimeout(function(){document.getElementById("input_fasttype")&&(temptype=document.getElementById("input_fasttype").value),null!=document.getElementById("create_niisdrag")&&document.getElementById("create_niisdrag").remove(),createchest()},0),t.apply(e,arguments)},chestversion="1140409",temptype="",null!=document.getElementById("create_niisdrag")&&document.getElementById("create_niisdrag").remove(),escape_populanceConsultation=confirm("百寶箱版本:"+chestversion+"\n看診前是否自動跳過民眾看診首頁"),confirm("是否縮減標題及移除頁尾?")&&(head=document.querySelector("#root > header"),head.style.position="absolute",head.style.whiteSpace="nowrap",head.style.width="300px",head.style.left="1600px",head.children[0].style.width="30px",head.children[0].title=head.children[0].textContent,head.children[0].textContent="",head.children[0].className="header__toolbar fas fa-home",head.children[0].style.fontSize="24px",document.querySelector("#root > footer")&&document.querySelector("#root > footer").remove(),document.querySelector("#root > div.wrapper")&&(mainwrapper=document.querySelector("#root > div.wrapper"),mainwrapper.style.height="910px",mainwrapper.style.alignItems="flex-start")),confirm("是否隱藏預防接種作業?")){let e=document.querySelector('a[href="/niisVaccination"]');null!=e&&(e.hidden=!0)}createchest()}();
