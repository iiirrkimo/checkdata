function genmetawindow(){
    let ccc=document.URL;
    if (!ccc.includes("phpcis.chshb.gov.tw")){
        alert("請在PHPCIIS網域中使用")
    }
    if (ccc.includes("login")){
        alert("請登入PHPCIIS後再使用")
    }
    let htmls=String.raw`<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>

  <title>代謝症候群疾病管理總表</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Arial, "Microsoft JhengHei", sans-serif;
      background: #f1f5f9;
      color: #1f2937;
    }
    
    .listarea {
      max-width: 1400px;
      margin: 24px auto;
      padding: 20px;
    }
    
    .queryarea {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px 12px;
      background: #ffffff;
      border-radius: 12px;
      padding: 14px 16px;
      margin-bottom: 14px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
    }
    
    .queryarea span {
      font-size: 14px;
      font-weight: 700;
      color: #334155;
    }
    
    .queryarea input {
      height: 38px;
      padding: 8px 10px;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 14px;
      background: #fff;
    }
    
    .queryarea input[type="date"] {
      width: 160px;
    }
    
    .queryarea input[type="text"] {
      width: 180px;
    }
    
    .queryarea button {
      height: 38px;
      border: none;
      border-radius: 8px;
      padding: 0 16px;
      background: #2563eb;
      color: #fff;
      cursor: pointer;
      font-size: 14px;
    }
    
    .queryarea button:hover {
      background: #1d4ed8;
    }
    
    .queryarea span[id$="_result"] {
      font-weight: 400;
      color: #475569;
    }
    
    .resultarea {
      background: #ffffff;
      border-radius: 12px;
      padding: 14px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
      overflow-x: auto;
    }
    .resultarea button {
      height: 38px;
      border: none;
      border-radius: 8px;
      padding: 0 16px;
      background: #2563eb;
      color: #fff;
      cursor: pointer;
      font-size: 14px;
    }
    
    .resultarea button:hover {
      background: #1d4ed8;
    }
    
    .querytable {
      width: 100%;
      border-collapse: collapse;
      min-width: 1200px;
      font-size: 14px;
    }
    
    .querytable thead th {
      position: sticky;
      top: 0;
      background: #e2e8f0;
      color: #0f172a;
      font-weight: 700;
      border: 1px solid #cbd5e1;
      padding: 10px 8px;
      text-align: center;
      white-space: nowrap;
    }
    
    .querytable tbody td {
      border: 1px solid #e2e8f0;
      padding: 10px 8px;
      vertical-align: middle;
      background: #fff;
    }
    
    .querytable tbody tr:nth-child(even) td {
      background: #f8fafc;
    }
    
    .querytable tbody tr:hover td {
      background: #eff6ff;
    }
    
    .querytable .action-btn {
      border: none;
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 13px;
      cursor: pointer;
      color: #fff;
      background: #0f766e;
    }
    
    .querytable .action-btn:hover {
      background: #115e59;
    }
    .inputmodal {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(15, 23, 42, 0.45);
      overflow-y: auto;
      padding: 30px 16px;
      font-family: Arial, "Microsoft JhengHei", sans-serif;
      color: #1f2937;
    }
    
    .inputmodal.show {
      display: block;
    }
    
    .inputmodal .wrap {
      max-width: 1100px;
      margin: 0 auto;
      background: transparent;
    }
    
    .modal-panel {
      background: #f5f7fb;
      border-radius: 16px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
      padding: 20px;
      position: relative;
      min-height: calc(100vh - 60px);
    }
    
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
    }
    
    .modaltitle {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    
    .modal-close {
      border: none;
      background: #e2e8f0;
      color: #1e293b;
      border-radius: 10px;
      padding: 8px 14px;
      cursor: pointer;
      font-size: 14px;
    }
    
    .modal-close:hover {
      background: #cbd5e1;
    }
    .card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
      padding: 16px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .sub-title {
      font-size: 16px;
      font-weight: 700;
      margin: 8px 0 12px;
    }
    .grid-basic {
      display: grid;
      grid-template-columns: repeat(4, minmax(180px, 1fr));
      gap: 12px;
    }
    .grid-fields {
      display: grid;
      grid-template-columns: repeat(3, minmax(250px, 1fr));
      gap: 12px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 10px;
      background: #fafafa;
    }
    .field label {
      font-size: 14px;
      font-weight: 700;
      line-height: 1.3;
    }
    .field .meta {
      font-size: 12px;
      color: #6b7280;
      line-height: 1.4;
    }
    .modaltitle {
      margin: 0 0 16px;
      font-size: 28px;
    }
    .wrap input, select, textarea {
      width: 100%;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 8px 10px;
      font-size: 14px;
      background: #fff;
    }
    .wrap textarea {
      min-height: 220px;
      resize: vertical;
      font-family: Consolas, monospace;
    }
    .toolbar {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    .wrap button {
      border: none;
      border-radius: 8px;
      padding: 10px 16px;
      cursor: pointer;
      color: #fff;
      background: #2563eb;
      font-size: 14px;
    }
    .wrap button.secondary { background: #475569; }
    .wrap button.success { background: #059669; }
    .wrap button.warn { background: #b45309; }
    .hint {
      font-size: 13px;
      color: #6b7280;
      margin-top: 8px;
      line-height: 1.5;
    }
    .group {
      margin-top: 18px;
    }
    .group:first-child {
      margin-top: 0;
    }
    .group-header {
      font-size: 17px;
      font-weight: 700;
      margin-bottom: 10px;
      padding-bottom: 6px;
      border-bottom: 2px solid #e5e7eb;
    }

    .importarea {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(15, 23, 42, 0.45);
      padding: 30px 16px;
      overflow-y: auto;
    }
    
    .importarea.show {
      display: block;
    }
    
    .import-panel {
      max-width: 1000px;
      margin: 0 auto;
      background: #f8fafc;
      border-radius: 16px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
      padding: 20px;
      min-height: 240px;
    }
    
    .import-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
    }
    
    .import-title {
      font-size: 24px;
      font-weight: 700;
      color: #0f172a;
    }
    
    .import-close {
      border: none;
      background: #e2e8f0;
      color: #1e293b;
      border-radius: 10px;
      padding: 8px 14px;
      cursor: pointer;
      font-size: 14px;
    }
    
    .import-close:hover {
      background: #cbd5e1;
    }
    
    .import-table-wrap {
      background: #fff;
      border-radius: 12px;
      padding: 12px;
      overflow-x: auto;
    }
    
    .import_table {
      width: 100%;
      border-collapse: collapse;
      min-width: 760px;
      font-size: 14px;
    }
    
    .import_table thead th {
      background: #e2e8f0;
      color: #0f172a;
      border: 1px solid #cbd5e1;
      padding: 10px 8px;
      text-align: center;
      white-space: nowrap;
    }
    
    .import_table tbody td {
      border: 1px solid #e2e8f0;
      padding: 10px 8px;
      text-align: center;
      background: #fff;
    }
    .import_table button {
      width: 90%;
      border: none;
      border-radius: 8px;
      padding: 10px 16px;
      cursor: pointer;
      color: #fff;
      background: #217e47;
      font-size: 14px;
    }
    
    .import_table tbody tr:nth-child(even) td {
      background: #f8fafc;
    }
    
    .import_table tbody tr:hover td {
      background: #eff6ff;
    }

    @media (max-width: 1100px) {
      .grid-fields { grid-template-columns: repeat(2, minmax(240px, 1fr)); }
      .grid-basic { grid-template-columns: repeat(2, minmax(180px, 1fr)); }
    }
    @media (max-width: 700px) {
      .grid-fields, .grid-basic { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="listarea">
    <div class="queryarea">
      <span>開始時間:</span><input type="date" id="start_date">
      <span>結束時間:</span><input type="date" id="end_date">
      <button id="querybydate">依時間查詢</button>
      <span id="querybydate_result"></span>
      <span>身分證字號:</span><input type="text" id="queryid">
      <button id="querybyid">依身分證字號查詢</button>
      <span id="querybyid_result"></span>

      <button id="exportXML">匯出XML</button>
    </div>
    <div class="resultarea">
      <table class="querytable" id="querytable">
        <thead>
          <tr>
            <th>編號</th>
            <th>身分證字號</th>
            <th>姓名</th>
            <th>生日</th>
            <th>就醫日期</th>
            <th>就醫類別</th>
            <th style="display: none;">registrationId</th>
            <th style="display: none;">healthRecordId</th>
            <th>問卷內容</th>
            <th>填寫狀態</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  </div>
  <div class="inputmodal" id="inputmodal">
    <div class="wrap">
      <div class="modal-panel">
        <div class="modal-header">
          <div class="modaltitle">代謝症候群問卷登打</div>
          <button type="button" class="modal-close" id="btnCloseModal">關閉</button>
        </div>
  
        <div class="card">
          <div class="section-title">基本資料</div>
          <div class="grid-basic">
            <div class="field"><label>院所名稱</label><input id="clinicName" type="text"></div>
            <div class="field"><label>院所代碼</label><input id="clinicCode" type="text"></div>
            <div class="field"><label>姓名</label><input id="name" type="text"></div>
            <div class="field"><label>身分證號</label><input id="personalId" type="text" readonly></div>
            <div class="field"><label>生日</label><input id="birthday" type="text" placeholder="YYYYMMDD"></div>
            <div class="field"><label>性別</label><select id="gender"><option value="1">男</option><option value="2">女</option></select></div>
            <div class="field"><label>檢查日期</label><input id="checkdate" type="date"></div>
            <div class="field"><label>說明日期</label><input id="explainDate" type="date"></div>
            <div class="field"><label>追蹤日期</label><input id="followDate" type="date"></div>
            <div class="field">
              <button id="btnCalcFollow" class="warn">追蹤+3個月</button>
             <button id="btnCalcFollow6" class="warn">追蹤+6個月</button>
            </div>
              <button id="btnadddata" class="secondary">帶入問卷及檢驗值</button>
            
            <div class="field" style="display: none;"><label>registrationId</label><input id="registrationId"  ></div>
            <div class="field"style="display: none;"><label>healthRecordId</label><input id="healthRecordId"  ></div>
            
          </div>
        </div>
  
        <div class="card">
          <div id="sec01Container"></div>
        </div>
  
        <div class="card">
          <div class="section-title">輸出</div>
          <div class="toolbar">
            <button id="btnLoad" style="display: none;">載入範例資料</button>

            <button id="allmodel" class="danger">重算風險</button>
            <button id="btnSaveJson" class="success">儲存</button>
            <button id="printJson" class="secondary">列印</button>
            <button type="button" class="modal-close" id="btnCloseModal2">關閉</button>
            <button id="btnSaveXml" class="secondary" style="display: none;">轉 HU XML</button>
          </div>
          <textarea id="output"></textarea>
        </div>
      </div>
    </div>
  </div>
  <div class="importarea" id="importarea">
    <div class="import-panel">
      <div class="import-header">
        <div class="import-title">匯入問卷及檢驗資料</div>
        <button type="button" class="import-close" id="btnCloseImport">關閉</button>
      </div>
  
      <div class="import-table-wrap">
        <table class="import_table" id="import_table">
          <thead>
            <tr>
              <th>日期</th>
              <th>問卷</th>
              <th>AC</th>
              <th>A1C</th>
              <th>TC</th>
              <th>TG</th>
              <th>HDL</th>
              <th>LDL</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>
  <script>
    window.onload = function () {
      resultarray=[];
      let now=new Date();
      let nowdate=now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2, '0')+"-"+String(now.getDate()).padStart(2, '0');
      let nowdate01=now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2, '0')+"-01";
      document.getElementById("start_date").value=nowdate01;
      document.getElementById("end_date").value=nowdate;
      document.getElementById("querybyid").addEventListener("click", ()=>{
        let queryid=document.getElementById("queryid").value;
        if (queryid.length==10){
          querybyid(queryid);
        } else {
          document.getElementById("querybyid_result").innerHTML=("請輸入10碼身分證字號")
        }
        
      });
      document.getElementById("querybydate").addEventListener("click", ()=>{
        let start_date=document.getElementById("start_date").value;
        let end_date=document.getElementById("end_date").value;
        let querydatelist=getDateRange(start_date,end_date);
        if (querydatelist.length==0){
          document.getElementById("querybydate_result").innerHTML=("請輸入正確的日期")
          return
        }
        querybydate(querydatelist);
        
      });

      fieldGroups = [
      {
        title: "基本收案與追蹤",
        fields: [
          { key: "d001", label: "姓名", type: "text" },
          { key: "d002", label: "性別", type: "select", options: [{v:"1",t:"男"},{v:"2",t:"女"}] },
          { key: "d003", label: "診療階段", type: "select", options: [{v:"0",t:"新收案"},{v:"1",t:"追蹤管理"},{v:"2",t:"年度評估"}] },
          { key: "d004", label: "收案/追蹤/年度評估日期", type: "text" },
          { key: "d005", label: "醫事人員身分證號", type: "text" },
          { key: "d006", label: "追蹤方式", type: "select", options: [{v:"",t:"請選擇"},{v:"1",t:"電話追蹤"},{v:"2",t:"訪視"},{v:"3",t:"回診"}] },
          { key: "d007", label: "追蹤項目-營養指導", type: "selectYN" },
          { key: "d008", label: "追蹤項目-運動計畫", type: "selectYN" },
          { key: "d009", label: "追蹤項目-戒菸", type: "selectYN" },
          { key: "d010", label: "追蹤項目-戒檳", type: "selectYN" }
        ]
      },
      {
        title: "危險因子與戒檳",
        fields: [
          { key: "d011", label: "危險因子:抽菸", type: "select", options: [{v:"1",t:"無"},{v:"2",t:"偶爾交際應酬"},{v:"3",t:"平均一天約10支以下"},{v:"4",t:"平均一天約10支(含)以上"}] },
          { key: "d012", label: "危險因子:嚼檳榔", type: "select", options: [{v:"1",t:"無"},{v:"2",t:"偶爾交際應酬"},{v:"3",t:"經常嚼或習慣在嚼"}] }
        ]
      },
      {
        title: "伴隨疾病",
        fields: [
          { key: "d025", label: "伴隨疾病-無", type: "selectYN" },
          { key: "d026", label: "伴隨疾病-糖尿病", type: "selectYN" },
          { key: "d027", label: "伴隨疾病-高血壓", type: "selectYN" },
          { key: "d028", label: "伴隨疾病-心臟血管疾病", type: "selectYN" },
          { key: "d029", label: "伴隨疾病-高血脂症", type: "selectYN" },
          { key: "d030", label: "伴隨疾病-腎臟病", type: "selectYN" },
          { key: "d031", label: "伴隨疾病-腦血管疾病", type: "selectYN" },
          { key: "d032", label: "伴隨疾病-其他 ICD10", type: "text" }
        ]
      },
      {
        title: "檢查數據與風險值",
        fields: [
          { key: "d033", label: "檢查日期", type: "text" },
          { key: "d034", label: "身高", type: "number", step: "0.1" },
          { key: "d035", label: "體重", type: "number", step: "0.1" },
          { key: "d036", label: "腰圍", type: "number", step: "0.1" },
          { key: "d037", label: "血壓-收縮壓", type: "number" },
          { key: "d038", label: "血壓-舒張壓", type: "number" },
          { key: "d040", label: "降血壓藥物", type: "select01" },
          { key: "d041", label: "飯前血糖值", type: "number" },
          { key: "d042", label: "降血糖藥物", type: "select01" },
          { key: "d043", label: "三酸甘油酯", type: "number" },
          { key: "d044", label: "高密度脂蛋白", type: "number" },
          { key: "d045", label: "降血脂藥物", type: "select01" },
          { key: "d046", label: "低密度脂蛋白", type: "number" },
          { key: "d047", label: "醣化血紅素", type: "number", step: "0.1" },
          { key: "d048", label: "總膽固醇", type: "number" },
          { key: "d049", label: "慢性疾病風險值-冠心病", type: "number", step: "0.01" },
          { key: "d050", label: "慢性疾病風險值-糖尿病", type: "number", step: "0.01" },
          { key: "d051", label: "慢性疾病風險值-高血壓", type: "number", step: "0.01" },
          { key: "d052", label: "慢性疾病風險值-腦中風", type: "number", step: "0.01" },
          { key: "d053", label: "慢性疾病風險值-心血管不良事件", type: "number", step: "0.01" }
        ]
      },
      {
        title: "疾病管理指引-戒菸戒檳",
        fields: [
          { key: "d054", label: "戒菸1", type: "select", options: [{v:"",t:"請選擇"},{v:"1",t:"戒菸指導"},{v:"2",t:"自行提供戒菸服務"},{v:"3",t:"轉介戒菸服務"}] },
          { key: "d058", label: "嚼檳原因-社交", type: "select01" },
          { key: "d059", label: "嚼檳原因-提神專注", type: "select01" },
          { key: "d060", label: "嚼檳原因-習慣想嚼", type: "select01" },
          { key: "d061", label: "嚼檳原因-壓力情緒", type: "select01" },
          { key: "d062", label: "嚼檳原因-禦寒", type: "select01" },
          { key: "d063", label: "嚼檳原因-解渴", type: "select01" },
          { key: "d064", label: "戒檳-評估動機/技巧/目標/支持", type: "select01" },
          { key: "d068", label: "戒檳-安排口篩", type: "select01" }
        ]
      },
      {
        title: "疾病管理指引-熱量與運動建議",
        fields: [
          { key: "d069", label: "每日建議熱量", type: "select", options: [{v:"",t:"請選擇"},{v:"1",t:"1200"},{v:"2",t:"1500"},{v:"3",t:"1800"},{v:"4",t:"2000"},{v:"9",t:"其他"}] },
          { key: "d070", label: "每日建議熱量其他", type: "number" },
          { key: "d071", label: "提供運動指導及中度身體活動類別建議", type: "select01" },
          { key: "d072", label: "提供社區運動資源", type: "select01" },
          { key: "d083", label: "722血壓量測指導", type: "select01" }
        ]
      },
      {
        title: "目標值與檢驗日期",
        fields: [
          { key: "d084", label: "目標值-腰圍", type: "number", step: "0.1" },
          { key: "d085", label: "目標值-體重", type: "number", step: "0.1" },
          { key: "d086", label: "目標值-飯前血糖", type: "number" },
          { key: "d087", label: "目標值-三酸甘油脂", type: "number" },
          { key: "d088", label: "目標值-低密度脂蛋白膽固醇", type: "number" },
          { key: "d089", label: "目標值-高密度脂蛋白膽固醇", type: "number" },
          { key: "d090", label: "目標值-醣化血紅素", type: "number", step: "0.1" },
          { key: "d092", label: "危險因子-運動", type: "select", options: [{v:"",t:"請選擇"},{v:"0",t:"無"},{v:"1",t:"偶爾運動"},{v:"2",t:"經常運動(每週累計達150分鐘)"}] },
          { key: "d093", label: "飯前血糖檢驗日期", type: "text" },
          { key: "d094", label: "三酸甘油酯檢驗日期", type: "text" },
          { key: "d095", label: "高密度脂蛋白檢驗日期", type: "text" },
          { key: "d096", label: "低密度脂蛋白檢驗日期", type: "text" },
          { key: "d097", label: "醣化血紅素檢驗日期", type: "text" },
          { key: "d098", label: "總膽固醇檢驗日期", type: "text" }
        ]
      }
    ];
      renderAllFields();



     

      document.getElementById("btnCloseModal").addEventListener("click", function () {
        closeModal();
      });
      document.getElementById("btnCloseModal2").addEventListener("click", function () {
        closeModal();
      });
      document.getElementById("btnadddata").addEventListener("click", function () {
        let personalId=document.getElementById("personalId").value
        btnadddata(personalId);
      });
      document.getElementById("allmodel").addEventListener("click", function () {
        allmodel();
      });
      document.getElementById("btnCloseImport").addEventListener("click", function () {
        closeImportModal();
      });

      document.getElementById("importarea").addEventListener("click", function (e) {
        if (e.target === importarea) {
          closeImportModal();
        }
      });

      document.getElementById("exportXML").addEventListener("click", function () {
        exportXML();
      });

    };
    function exportXML(){
      if (confirm("依照查詢日期範圍產出XML，是否確定")){
        let start_date=document.getElementById("start_date").value;
        let end_date=document.getElementById("end_date").value;
        let datearray=getDateRange(start_date,end_date);
        if (datearray.length==0){
          document.getElementById("querybydate_result").innerHTML=("請輸入正確的日期")
          return
        }
        let preresult=[];
        let healthRecordIdarray=[];
        let xhr = new XMLHttpRequest();
        let apiurl="https://phpcis.chshb.gov.tw/api/v1/health_records/prescriptions/list?personalId=&period=&roomId=&prescriptionType=1&visitTypeId=&date="
        for (let i=0;i<datearray.length;i++){
          let url=apiurl+datearray[i];
          xhr.open("GET", url, false);
          xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
          xhr.send();
          let preres=JSON.parse(xhr.responseText).result;
          for (let j=0;j<preres.length;j++){
            let pr=preres[j];
            if (pr.visitTypeName.includes("代謝_")){
              preresult.push(pr);
              healthRecordIdarray.push(pr.healthRecordId);
            }
          }
        }
        let hrres=gethealthrecord(healthRecordIdarray);
        let hrreskeys=Object.keys(hrres);
        let prexmlarray=[];
        for (let i=0;i<hrreskeys.length;i++){
          let key=hrreskeys[i];
          let hr=hrres[key];
          if (isJSON(hr.PE)){
            prexmlarray.push(JSON.parse(hr.PE))
          }
        }
        if (prexmlarray.length==0){
          alert("無填寫完成之代謝症候群問卷")
          return
        }
        let xml={}
        xml["hu"]={};
        xml["hu"]["hospid"]=prexmlarray[0].clinicCode;
        xml["hu"]["case"]=[];
        for (let i=0;i<prexmlarray.length;i++){
          let prexml=prexmlarray[i];
          xml["hu"]["case"].push(prexml["xml"])
        }

        
        console.log(xml)
        let upy=start_date.split("-")[0]-1911;
        let upm=start_date.split("-")[1];
        let num=prompt("流水號")
        let filename="HU"+prexmlarray[0].clinicCode+upy+upm+num+".XML";
        let xmlString = transfertoxml(xml);
        downloadHuXmlBig5(xmlString, filename)
      }
    }

    function downloadHuXmlBig5(xml, filename = "HU.xml") {
 
      if (typeof cptable === "undefined" || !cptable.utils || !cptable.utils.encode) {
        alert("Big5 編碼模組未載入成功");
        return;
      }
    
      // 950 = CP950 / Big5 (台灣 Windows 常用)
      const bytes = cptable.utils.encode(950, xml);
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/xml" });
    
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }

    function transfertoxml(xml){
      let res="";
      res+='<?xml version="1.0" encoding="Big5"?>\n';
      res+='<hu>\n';
      res+='<hospid>'+xml.hu.hospid+'</hospid>\n';
      for (let i=0;i<xml.hu.case.length;i++){
        let c=xml.hu.case[i];
        res+='<case>\n';
        res+='<id>'+c.id+'</id>\n';
        res+='<birthday>'+c.birthday+'</birthday>\n';
        res+='<sec01>\n';
        let dkey=Object.keys(c.sec01);
        for (let j=0;j<dkey.length;j++){
          let dk=dkey[j];
          res+='<'+dk+'>'+c.sec01[dk]+'</'+dk+'>\n';
        }
        res+='</sec01>\n';
        res+='</case> \n';
      }
      res+='</hu>';
      return res
    }

   

    function openImportModal() {
      importarea.classList.add("show");
      document.body.style.overflow = "hidden";
    }
    
    function closeImportModal() {
      importarea.classList.remove("show");
      document.body.style.overflow = "";
    }

    function isEmpty(v) {
      return v === null || v === undefined || v === "";
    }
    function allmodel(){
      let vy=document.getElementById("explainDate").value.split("-")[0];
      let by=document.getElementById("birthday").value.substring(0,4);
      let age=vy-by;
      let chol=document.getElementById("d048").value;
      let diabetes=document.getElementById("d026").value=="Y"?"1":"0";
      let gender=document.getElementById("d002").value==1?"1":"0";
      let glu=document.getElementById("d041").value;
      let hbp=document.getElementById("d027").value=="Y"?"1":"0";
      let hdlc=document.getElementById("d044").value;
      let height=document.getElementById("d034").value;
      let ldlc=document.getElementById("d046").value;
      let sbp=document.getElementById("d037").value;
      let smoke=document.getElementById("d011").value==1?"0":"1";
      let tg=document.getElementById("d043").value;
      let waist=document.getElementById("d036").value;
      let weight=document.getElementById("d035").value;
      if (
        isEmpty(chol) ||
        isEmpty(glu) ||
        isEmpty(hdlc) ||
        isEmpty(height) ||
        isEmpty(ldlc) ||
        isEmpty(sbp) ||
        isEmpty(tg) ||
        isEmpty(waist) ||
        isEmpty(weight)
      ) {
        alert("有欄位未填寫");
        return;
      }
      let payload={
          "age":age,
          "chol":chol,
          "diabetes":diabetes,
          "gender":gender,
          "glu":glu,
          "hbp":hbp,
          "hdlc":hdlc,
          "height":height,
          "ldlc":ldlc,
          "sbp":sbp,
          "smoke":smoke,
          "tg":tg,
          "waist":waist,
          "weight":weight
      }
      let xhr = new XMLHttpRequest();
      let api="https://phpcis.chshb.gov.tw/api/v1/preventions/hra/allmodel";
      xhr.open("POST", api, false);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send(JSON.stringify(payload));
      let allmodelres=JSON.parse(xhr.responseText).result;
      console.log(allmodelres)
      setValue('d049', allmodelres.CHDRisk);
      setValue('d050', allmodelres.DiabetesRisk);
      setValue('d051', allmodelres.HypertensionRisk);
      setValue('d052', allmodelres.StrokeRisk);
      setValue('d053', allmodelres.MACERisk);
      alert("計算完成")
    }
    function btnadddata(personalId){
      let listobj={};  
      //檢查成健
      let xhr = new XMLHttpRequest();
      let healthurl="https://phpcis.chshb.gov.tw/api/v1/prevention_datas/list?personalId="+personalId+"&itemId=02";
      xhr.open("GET", healthurl, false);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send();
      let healthjres=JSON.parse(xhr.responseText).result;
      for (let i=0;i<healthjres.length;i++){
          let h=healthjres[i];
          if (h["serviceName"]=="第一階段"){
            let treatmentDate=h.treatmentDate;
            if (!(treatmentDate in listobj)){
              listobj[treatmentDate]=[];
            }
            let tempitem={};
            tempitem["type"]="ques";
            tempitem["text"]="一階問卷";
            let preventionDataId=h.preventionDataId;
            tempitem["preventionDataId"]=preventionDataId;
            listobj[treatmentDate].push(tempitem);
          }
      }
      //檢查檢驗
      let getinfourl="https://phpcis.chshb.gov.tw/api/v1/personal_infos/list_with_registration?search=false&personalId="+personalId;
      xhr.open("GET", getinfourl, false);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send();
      let getinfres=JSON.parse(xhr.responseText).result;
      let personalInfoId=getinfres[0].personalInfoId;
      let examallurl="https://phpcis.chshb.gov.tw/api/v1/tests/results/personal/health_record_list?personalInfoId="+personalInfoId;
      xhr.open("GET", examallurl, false);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send();
      let examallres=JSON.parse(xhr.responseText).result;
      let examalllength=8;
      if (examalllength>examallres.length){
        examalllength=examallres.length;
      }
      for (let i=0;i<examalllength;i++){
        let examdate=examallres[i].treatmentDate;
        let healthRecordId=examallres[i].healthRecordId;
        if (!(examdate in listobj)){
          listobj[examdate]=[];
        }
        let examdetailurl="https://phpcis.chshb.gov.tw/api/v1/tests/results/personal/list?healthRecordId="+healthRecordId;
        xhr.open("GET", examdetailurl, false);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.send();
        let examdetailres=JSON.parse(xhr.responseText).result;
        for (j=0;j<examdetailres.length;j++){
          let item=examdetailres[j];
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
          if (clist["AC"].includes(item.testCode)){
            if (item.testResult){
              let tempitem={};
              tempitem["type"]="AC";
              tempitem["text"]=item.testResult;
              tempitem["value"]=item.testResult;
              listobj[examdate].push(tempitem);
            }
          } else if (clist["A1C"].includes(item.testCode)){
            if (item.testResult){
              let tempitem={};
              tempitem["type"]="A1C";
              tempitem["text"]=item.testResult;
              tempitem["value"]=item.testResult;
              listobj[examdate].push(tempitem);
            }
          } else if (clist["TC"].includes(item.testCode)){
            if (item.testResult){
              let tempitem={};
              tempitem["type"]="TC";
              tempitem["text"]=item.testResult;
              tempitem["value"]=item.testResult;
              listobj[examdate].push(tempitem);
            }
          } else if (clist["TG"].includes(item.testCode)){
            if (item.testResult){
              let tempitem={};
              tempitem["type"]="TG";
              tempitem["text"]=item.testResult;
              tempitem["value"]=item.testResult;
              listobj[examdate].push(tempitem);
            }
          } else if (clist["HDL"].includes(item.testCode)){
            if (item.testResult){
              let tempitem={};
              tempitem["type"]="HDL";
              tempitem["text"]=item.testResult;
              tempitem["value"]=item.testResult;
              listobj[examdate].push(tempitem);
            }
          } else if (clist["LDL"].includes(item.testCode)){
            if (item.testResult){
              let tempitem={};
              tempitem["type"]="LDL";
              tempitem["text"]=item.testResult;
              tempitem["value"]=item.testResult;
              listobj[examdate].push(tempitem);
            }
          }
          

        }
        
      }

      renderimporttable(listobj);
      openImportModal() 
    }
    

    function renderimporttable(listobj){
      let it=document.getElementById("import_table").children[1];
      it.innerHTML="";
      let html="";
      let keys = Object.keys(listobj).sort((a, b) => a.localeCompare(b));
      for (let i=0;i<keys.length;i++){
        let key=keys[keys.length-1-i]
        let li=listobj[key];
        if (li.length==0){
          continue;
        }
        let tr=document.createElement("tr")
        it.appendChild(tr);
        let c1=document.createElement("td");
        let c2=document.createElement("td");
        let c3=document.createElement("td");
        let c4=document.createElement("td");
        let c5=document.createElement("td");
        let c6=document.createElement("td");
        let c7=document.createElement("td");
        let c8=document.createElement("td");
        tr.appendChild(c1);
        tr.appendChild(c2);
        tr.appendChild(c3);
        tr.appendChild(c4);
        tr.appendChild(c5);
        tr.appendChild(c6);
        tr.appendChild(c7);
        tr.appendChild(c8);

        let c1btn=document.createElement("button");
        c1btn.textContent=key;
        c1btn.addEventListener("click", function () {
          document.getElementById("checkdate").value=key;
          alert("帶入成功")
        })
        c1.appendChild(c1btn);
        for (let j=0;j<li.length;j++){
          let item=li[j];
          if (item.type=="ques"){
            let btn=document.createElement("button");
            btn.textContent=item.text;
            btn.addEventListener("click", function () {
              addhetorecord(item.preventionDataId);
            })
            c2.appendChild(btn);
          } else if (item.type=="AC"){
            let btn=document.createElement("button");
            btn.textContent=item.text;
            btn.addEventListener("click", function () {
              addlabdata(item.type,key,item.value)
            })
            c3.appendChild(btn);
          }  else if (item.type=="A1C"){
            let btn=document.createElement("button");
            btn.textContent=item.text;
            btn.addEventListener("click", function () {
              addlabdata(item.type,key,item.value)
            })
            c4.appendChild(btn);
          }  else if (item.type=="TC"){
            let btn=document.createElement("button");
            btn.textContent=item.text;
            btn.addEventListener("click", function () {
              addlabdata(item.type,key,item.value)
            })
            c5.appendChild(btn);
          } else if (item.type=="TG"){
            let btn=document.createElement("button");
            btn.textContent=item.text;
            btn.addEventListener("click", function () {
              addlabdata(item.type,key,item.value)
            })
            c6.appendChild(btn);
          }  else if (item.type=="HDL"){
            let btn=document.createElement("button");
            btn.textContent=item.text;
            btn.addEventListener("click", function () {
              addlabdata(item.type,key,item.value)
            })
            c7.appendChild(btn);
          }  else if (item.type=="LDL"){
            let btn=document.createElement("button");
            btn.textContent=item.text;
            btn.addEventListener("click", function () {
              addlabdata(item.type,key,item.value)
            })
            c8.appendChild(btn);
          }
        } 

      }
    }


    function addlabdata(type,date,value){
      let mapping={
        "AC":{"dateid":"d093","valueid":"d041"},
        "A1C":{"dateid":"d097","valueid":"d047"},
        "TC":{"dateid":"d098","valueid":"d048"},
        "TG":{"dateid":"d094","valueid":"d043"},
        "HDL":{"dateid":"d095","valueid":"d044"},
        "LDL":{"dateid":"d096","valueid":"d046"},
      }
      setValue(mapping[type].dateid, date.replaceAll("-", ""));
      setValue(mapping[type].valueid, value);
      alert("帶入成功")
    }


    function addhetorecord(preventionDataId){
      let xhr = new XMLHttpRequest();
      let result={};
      let clinicName=document.getElementById("clinicName").value;
      let clinicCode=document.getElementById("clinicCode").value;
      result["clinicName"]=clinicName;
      result["clinicCode"]=clinicCode;
      
      result["xml"]={};
      let adurl="https://phpcis.chshb.gov.tw/api/v1/prevention_datas/find?preventionDataId="+preventionDataId;
      xhr.open("GET", adurl, false);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send();
      result.BMR=0;
      result.TDEE=0;
      let adjres=JSON.parse(xhr.responseText).result;

      result.name=adjres.name;
      result.followDate=addMonths(adjres.treatmentDate, 3);
      result.personalId=adjres.personalId;
      result["xml"]["id"]=adjres.personalId;
      result.gender=adjres.gender;
      result["checkdate"]=adjres.treatmentDate;


      let age=adjres.treatmentDate.split("-")[0]-adjres.birthday.split("-")[0];
      let exe={
          "0": 1.2,
          "1": 1.375,
          "2": 1.55
      }
      result.exeindex=exe[adjres.adultScreenOrm.isSport];




      /*
      男性(10×體重kg)+(6.25×身高cm)-(5×年齡)+5 
      女性(10×體重kg)+(6.25×身高cm)-(5×年齡)-161
      */
      if (adjres.gender=="1"){
          result.BMR=(10*adjres.adultScreenOrm.weight)+(6.25*adjres.adultScreenOrm.height)-(5*age)+5
      } else {
          result.BMR=(10*adjres.adultScreenOrm.weight)+(6.25*adjres.adultScreenOrm.height)-(5*age)-161
      }
      result.TDEE=result.BMR*result.exeindex;

      result["xml"]["birthday"]=adjres.birthday.replaceAll("-","");
      result["xml"]["sec01"]={};
      result["xml"]["sec01"]["d001"]=adjres.name;
      result["xml"]["sec01"]["d002"]=adjres.gender;
      //result["xml"]["sec01"]["d003"]="0"; //診療階段 0:新收案 , 1:追蹤管理  , 2:年度評估 
      result["xml"]["sec01"]["d004"]=document.querySelector("#explainDate").value.replaceAll("-","");
      result["xml"]["sec01"]["d005"]="D122491269";   //醫事人員身分證號
      //result["xml"]["sec01"]["d006"]="1";   //1.電話追蹤     2.訪視     3.回診 
      //result["xml"]["sec01"]["d007"]="Y";   //追蹤項目-營養指導
      //result["xml"]["sec01"]["d008"]="Y";   //追蹤項目-運動計畫 
      //result["xml"]["sec01"]["d009"]=adjres.adultScreenOrm.isSmoke!="1"?"Y":"N";   //追蹤項目-戒菸  
      //result["xml"]["sec01"]["d010"]=adjres.adultScreenOrm.isBetel!="1"?"Y":"N";   //追蹤項目-戒檳  
      result["xml"]["sec01"]["d011"]=adjres.adultScreenOrm.isSmoke;   //危險因子:抽菸
      result["xml"]["sec01"]["d012"]=adjres.adultScreenOrm.isBetel;   //危險因子: 嚼檳榔
      result["xml"]["sec01"]["d025"]=adjres.adultScreenOrm.HENone?"Y":"N";   //伴隨疾病-無 
      result["xml"]["sec01"]["d026"]=adjres.adultScreenOrm.HEDiabetes?"Y":"N";   //伴隨疾病-糖尿病 
      result["xml"]["sec01"]["d027"]=adjres.adultScreenOrm.HEHypertension?"Y":"N";   //伴隨疾病-高血壓 
      result["xml"]["sec01"]["d028"]=adjres.adultScreenOrm.HEHeartDisease?"Y":"N";   //伴隨疾病-心臟血管疾病 
      result["xml"]["sec01"]["d029"]=adjres.adultScreenOrm.HEHyperlipidemia?"Y":"N";   //伴隨疾病-高血脂症
      result["xml"]["sec01"]["d030"]=adjres.adultScreenOrm.HEKidneyDiseases?"Y":"N";   //伴隨疾病-腎臟病
      result["xml"]["sec01"]["d031"]=adjres.adultScreenOrm.HEStroke?"Y":"N";   //伴隨疾病-腦血管疾病 
      //result["xml"]["sec01"]["d032"]=adjres.adultScreenOrm.HEOther?"Y":"N";   //伴隨疾病-其他  ICD10國際疾病分類號碼，「小數點」免填
      result["xml"]["sec01"]["d033"]=result["checkdate"].replaceAll("-","");
      result["xml"]["sec01"]["d034"]=adjres.adultScreenOrm.height;
      result["xml"]["sec01"]["d035"]=adjres.adultScreenOrm.weight;
      result["xml"]["sec01"]["d036"]=adjres.adultScreenOrm.waistline;
      result["xml"]["sec01"]["d037"]=adjres.adultScreenOrm.SBP;
      result["xml"]["sec01"]["d038"]=adjres.adultScreenOrm.DBP;
      result["xml"]["sec01"]["d040"]=adjres.adultScreenOrm.HEHypertension?"1":"0";
      result["xml"]["sec01"]["d041"]=adjres.adultScreenOrm.GluecoreAC;
      result["xml"]["sec01"]["d042"]=adjres.adultScreenOrm.HEDiabetes?"1":"0";
      result["xml"]["sec01"]["d043"]=adjres.adultScreenOrm.TG;
      result["xml"]["sec01"]["d044"]=adjres.adultScreenOrm.HDL;
      result["xml"]["sec01"]["d045"]=adjres.adultScreenOrm.HEHyperlipidemia?"1":"0";
      result["xml"]["sec01"]["d046"]=adjres.adultScreenOrm.LDL;
      //result["xml"]["sec01"]["d047"]=adjres.adultScreenOrm.A1C;
      result["xml"]["sec01"]["d048"]=adjres.adultScreenOrm.TChol;
      result["xml"]["sec01"]["d049"]=Math.round(adjres.adultScreenOrm.CHDRisk);
      result["xml"]["sec01"]["d050"]=Math.round(adjres.adultScreenOrm.DiabetesRisk);
      result["xml"]["sec01"]["d051"]=Math.round(adjres.adultScreenOrm.HypertensionRisk);
      result["xml"]["sec01"]["d052"]=Math.round(adjres.adultScreenOrm.StrokeRisk);
      result["xml"]["sec01"]["d053"]=Math.round(adjres.adultScreenOrm.MACERisk);
      if (adjres.adultScreenOrm.isSmoke!="1"){
          result["xml"]["sec01"]["d054"]="1";  // 1：戒菸指導(無意願戒菸或<10支/日或尼古丁成癮<4分)； 2：自行提供戒菸服務(≧10支/日或尼古丁成癮≧4分)； 3：轉介戒菸服務(≧10支/日或尼古丁成癮≧4分) d011為2、3、4時必填 
      }
      if (adjres.adultScreenOrm.isBetel!="1"){
          result["xml"]["sec01"]["d058"]="0"; //疾病管理指引-嚼檳原因-社交 
          result["xml"]["sec01"]["d059"]="1"; //疾病管理指引-嚼檳原因-提神專注 
          result["xml"]["sec01"]["d060"]="1";  //疾病管理指引-嚼檳原因-習慣想嚼
          result["xml"]["sec01"]["d061"]="0";  //疾病管理指引-嚼檳原因-壓力情緒 
          result["xml"]["sec01"]["d062"]="0"  //病管理指引-嚼檳原因-禦寒 
          result["xml"]["sec01"]["d063"]="0"  //疾病管理指引-嚼檳原因-解渴 
          result["xml"]["sec01"]["d064"]="1"  //疾病管理指引-戒檳-評估動機、指導技巧、設定目標、支持行為 
          result["xml"]["sec01"]["d068"]="1"  //疾病管理指引-戒檳-安排口篩
      }
      
      let calnum="1";
      if (result.TDEE*0.8>2000){
          calnum="4";
      } else if (result.TDEE*0.8>1800){
          calnum="3";
      } else if (result.TDEE*0.8>1500){
          calnum="2";
      }
      result["xml"]["sec01"]["d069"]=calnum;
      result["xml"]["sec01"]["d071"]="1"; // 疾病管理指引-運動建議-提供運動指導及中度身體活動類別建議 
      result["xml"]["sec01"]["d072"]="0"; // 疾病管理指引-運動建議-提供社區運動資源
      result["xml"]["sec01"]["d083"]="1"; // 疾病管理指引-722血壓量測指導
      result["xml"]["sec01"]["d084"]=adjres.gender=="1"?"90":"80"; //目標值-腰圍 
      result["xml"]["sec01"]["d085"]=Math.round((adjres.adultScreenOrm.height/100)*(adjres.adultScreenOrm.height/100)*22); //目標值-體重 
      result["xml"]["sec01"]["d086"]=adjres.adultScreenOrm.HEDiabetes?130:100; //目標值-飯前血糖
      result["xml"]["sec01"]["d087"]=150; //目標值-三酸甘油脂
      result["xml"]["sec01"]["d088"]=adjres.adultScreenOrm.HEDiabetes?100:130; //目標值-低密度脂蛋    白膽固醇
      result["xml"]["sec01"]["d089"]=adjres.gender=="1"?40:50; //目標值-高密度脂蛋    白膽固醇
      result["xml"]["sec01"]["d090"]=adjres.adultScreenOrm.HEDiabetes?7:5.6; //目標值-醣化血紅素
      result["xml"]["sec01"]["d092"]=adjres.adultScreenOrm.isSport-1; //危險因子-運動
      result["xml"]["sec01"]["d093"]=result["checkdate"].replaceAll("-",""); //飯前血糖檢驗日期
      result["xml"]["sec01"]["d094"]=result["checkdate"].replaceAll("-",""); //三酸甘油酯檢驗日期 
      result["xml"]["sec01"]["d095"]=result["checkdate"].replaceAll("-",""); //高密度脂蛋白檢驗日期 
      result["xml"]["sec01"]["d096"]=result["checkdate"].replaceAll("-",""); //低密度脂蛋白檢驗日期
      //result["xml"]["sec01"]["d097"]=result["checkdate"].replaceAll("-",""); //醣化血紅素檢驗日期 
      result["xml"]["sec01"]["d098"]=result["checkdate"].replaceAll("-",""); //總膽固醇檢驗日期

      setValue('checkdate', result.checkdate);
      var sec01 = result.xml && result.xml.sec01 ? result.xml.sec01 : {};
      for (var i = 1; i <= 98; i++) {
        var key = 'd' + String(i).padStart(3, '0');
        if (sec01[key]){
          setValue(key, sec01[key]);
        }
        
      }
      alert("帶入成功")
    }


    function openModal() {
      document.getElementById("inputmodal").classList.add("show");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      document.getElementById("inputmodal").classList.remove("show");
      document.body.style.overflow = "";
    }
    function renderAllFields() {
      var container = document.getElementById('sec01Container');
      var html = '';
      for (var i = 0; i < fieldGroups.length; i++) {
        html += '<div class="group">';
        html += '<div class="group-header">' + fieldGroups[i].title + '</div>';
        html += '<div class="grid-fields">';
        for (var j = 0; j < fieldGroups[i].fields.length; j++) {
          html += renderField(fieldGroups[i].fields[j]);
        }
        html += '</div>';
        html += '</div>';
      }
      container.innerHTML = html;
    }
    function renderField(field) {
      var html = '<div class="field">';
      html += '<label for="' + field.key + '">' + field.key + ' ' + field.label + '</label>';
      if (field.meta) {
        html += '<div class="meta">' + field.meta + '</div>';
      }
      if (field.type === 'select' || field.type === 'selectYN' || field.type === 'select01') {
        var options = field.options || [];
        if (field.type === 'selectYN') {
          options = [{v:'',t:'請選擇'},{v:'Y',t:'Y'},{v:'N',t:'N'}];
        }
        if (field.type === 'select01') {
          options = [{v:'',t:'請選擇'},{v:'0',t:'0:無'},{v:'1',t:'1:有'}];
        }
        html += '<select id="' + field.key + '">';
        for (var i = 0; i < options.length; i++) {
          html += '<option value="' + options[i].v + '">' + options[i].t + '</option>';
        }
        html += '</select>';
      } else {
        var step = field.step ? ' step="' + field.step + '"' : '';
        html += '<input id="' + field.key + '" type="' + (field.type || 'text') + '"' + step + ' />';
      }
      html += '</div>';
      return html;
    }
    function setValue(id, value) {
      var el = document.getElementById(id);
      if (!el) { return; }
      el.value = value == null ? '' : value;
    }

    function getValue(id) {
      var el = document.getElementById(id);
      if (!el) { return ''; }
      return el.value;
    }

    function loadForm(data) {
      setValue('clinicName', data.clinicName);
      setValue('clinicCode', data.clinicCode);
      setValue('name', data.name);
      setValue('personalId', data.personalId);
      setValue('birthday', data.xml.birthday);
      setValue('gender', data.gender);
      setValue('checkdate', data.checkdate);
      setValue('explainDate', data.explainDate);
      setValue('followDate', data.followDate);
      setValue('registrationId', data.registrationId);
      setValue('healthRecordId', data.healthRecordId);
      

      var sec01 = data.xml && data.xml.sec01 ? data.xml.sec01 : {};
      for (var i = 1; i <= 98; i++) {
        var key = 'd' + String(i).padStart(3, '0');
        setValue(key, sec01[key]);
      }
    }

    function parseValue(raw) {
      if (raw === '') { return ''; }
      if (/^-?\d+(\.\d+)?$/.test(raw)) { return Number(raw); }
      return raw;
    }

    function collectFormData() {
      var obj = {
        clinicName: getValue('clinicName'),
        clinicCode: getValue('clinicCode'),
        registrationId: getValue('registrationId'),
        healthRecordId: getValue('healthRecordId'),
        xml: {
          id: getValue('personalId'),
          birthday: getValue('birthday'),
          sec01: {}
        },
        checkdate: getValue('checkdate'),
        name: getValue('name'),
        explainDate: getValue('explainDate'),
        followDate: getValue('followDate'),
        personalId: getValue('personalId'),
        gender: getValue('gender')
      };

      for (var i = 1; i <= 98; i++) {
        var key = 'd' + String(i).padStart(3, '0');
        obj.xml.sec01[key] = parseValue(getValue(key));
      }

      return obj;
    }

    function cleanObject(obj) {
      var result = Array.isArray(obj) ? [] : {};
      for (var key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) { continue; }
        var value = obj[key];
        if (value === '' || value === undefined || value === null) { continue; }
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          var child = cleanObject(value);
          if (Object.keys(child).length > 0) {
            result[key] = child;
          }
          continue;
        }
        result[key] = value;
      }
      return result;
    }

    function escapeXml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    }

    function buildHuXml(data) {
      var sec01 = data.xml.sec01 || {};
      var keys = Object.keys(sec01).sort(function(a, b) {
        return a.localeCompare(b, undefined, { numeric: true });
      });
      var sec01Tags = '';
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = sec01[key];
        if (value === '' || value === null || value === undefined) { continue; }
        sec01Tags += '      <' + key + '>' + escapeXml(value) + '</' + key + '>\n';
      }
      return '<?xml version="1.0" encoding="Big5"?>\n'
        + '<hu>\n'
        + '  <hospid>' + escapeXml(data.clinicCode) + '</hospid>\n'
        + '  <case>\n'
        + '    <id>' + escapeXml(data.xml.id) + '</id>\n'
        + '    <birthday>' + escapeXml(data.xml.birthday) + '</birthday>\n'
        + '    <sec01>\n'
        + sec01Tags
        + '    </sec01>\n'
        + '  </case>\n'
        + '</hu>';
    }

    function addMonthsSafe(dateStr, months) {
      if (!dateStr) { return ''; }
      var d = new Date(dateStr + 'T00:00:00');
      if (Number.isNaN(d.getTime())) { return ''; }
      var day = d.getDate();
      d.setDate(1);
      d.setMonth(d.getMonth() + months);
      var lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      d.setDate(Math.min(day, lastDay));
      var y = d.getFullYear();
      var m = String(d.getMonth() + 1).padStart(2, '0');
      var da = String(d.getDate()).padStart(2, '0');
      return y + '-' + m + '-' + da;
    }
    document.getElementById('btnLoad').addEventListener('click', function() {
      loadForm(inputobj);
      document.getElementById('output').value = '';
    });

    document.getElementById('btnSaveJson').addEventListener('click', function() {
      let err=errbeforesave();
      if (err!=""){
        if (confirm("出現以下錯誤，是否繼續?"+err)){
          var obj = cleanObject(collectFormData());
          document.getElementById('output').value = JSON.stringify(obj, null, 2);
          savetophpciis(obj);
        }
      } else {
        var obj = cleanObject(collectFormData());
        document.getElementById('output').value = JSON.stringify(obj, null, 2);
        savetophpciis(obj);
      }

    });

    document.getElementById('btnSaveXml').addEventListener('click', function() {
      var obj = cleanObject(collectFormData());
      document.getElementById('output').value = buildHuXml(obj);
    });

    document.getElementById('btnCalcFollow').addEventListener('click', function() {
      var explainDate = getValue('explainDate');
      setValue('followDate', addMonthsSafe(explainDate, 3));
    });
    document.getElementById('btnCalcFollow6').addEventListener('click', function() {
        var explainDate = getValue('explainDate');
        setValue('followDate', addMonthsSafe(explainDate, 6));
      });

      document.getElementById('printJson').addEventListener('click', function() {
        let outputobj = cleanObject(collectFormData());
        const htmlString = 'PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9InpoLUhhbnQiPgo8aGVhZD4KICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiPgogIDx0aXRsZT7ku6PorJ3nl4flgJnnvqTnlr7nl4XnrqHnkIbntIDpjITooag8L3RpdGxlPgogIDxzdHlsZT4KICAgIEBwYWdlIHsKICAgICAgc2l6ZTogQTQgcG9ydHJhaXQ7CiAgICAgIG1hcmdpbjogNm1tOwogICAgfQogICAgCiAgICBib2R5IHsKICAgICAgbWFyZ2luOiAwOwogICAgICBwYWRkaW5nOiAyMHB4OwogICAgICBiYWNrZ3JvdW5kOiAjZWVlOwogICAgICBmb250LXNpemU6IDE2cHg7CiAgICB9CiAgICAKICAgIC5wYWdlIHsKICAgICAgd2lkdGg6IDIxMG1tOwogICAgICBtaW4taGVpZ2h0OiAyOTdtbTsKICAgICAgbWFyZ2luOiAwIGF1dG87CiAgICAgIHBhZGRpbmc6IDEwbW07CiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7CiAgICAgIGJhY2tncm91bmQ6ICNmZmY7CiAgICB9CiAgICAKICAgIC5hX3RpdGxlIHsKICAgICAgdGV4dC1hbGlnbjogY2VudGVyOwogICAgICBtYXJnaW46IDAgMCAxMHB4IDA7CiAgICAgIGZvbnQtc2l6ZTogMjJweDsKICAgICAgZm9udC13ZWlnaHQ6IDcwMDsKICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4OwogICAgfQogICAgCiAgICAvKiDlhbHnlKggdGFibGUg5Z+65pys6Kit5a6aICovCiAgICAudGFibGVfaW5mbywKICAgIC50YWJsZV9xdWVzdGlvbm5haXJlLAogICAgLnRhYmxlX3N1Z2dlc3Rpb24gewogICAgICB3aWR0aDogMTAwJTsKICAgICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTsKICAgICAgdGFibGUtbGF5b3V0OiBmaXhlZDsKICAgICAgZm9udC1zaXplOiAxNnB4OwogICAgfQogICAgCiAgICAvKiB0YWJsZV9pbmZvICovCiAgICAudGFibGVfaW5mbyB7CiAgICAgIG1hcmdpbi1ib3R0b206IDhweDsKICAgIH0KICAgIAogICAgLnRhYmxlX2luZm8gdGgsCiAgICAudGFibGVfaW5mbyB0ZCB7CiAgICAgIHBhZGRpbmc6IDJweCA2cHg7CiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsKICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICAgICAgYm9yZGVyOiBub25lOwogICAgfQogICAgCiAgICAudGFibGVfaW5mbyB0aCB7CiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOwogICAgfQogICAgCiAgICAudGFibGVfaW5mbyB0aDpudGgtY2hpbGQoMSksCiAgICAudGFibGVfaW5mbyB0ZDpudGgtY2hpbGQoMSkgewogICAgICB3aWR0aDogMjAlOwogICAgfQogICAgCiAgICAudGFibGVfaW5mbyB0aDpudGgtY2hpbGQoMiksCiAgICAudGFibGVfaW5mbyB0ZDpudGgtY2hpbGQoMikgewogICAgICB3aWR0aDogMTAlOwogICAgfQogICAgCiAgICAudGFibGVfaW5mbyB0aDpudGgtY2hpbGQoMyksCiAgICAudGFibGVfaW5mbyB0ZDpudGgtY2hpbGQoMykgewogICAgICB3aWR0aDogMTAlOwogICAgfQogICAgCiAgICAudGFibGVfaW5mbyB0aDpudGgtY2hpbGQoNCksCiAgICAudGFibGVfaW5mbyB0ZDpudGgtY2hpbGQoNCkgewogICAgICB3aWR0aDogMTAlOwogICAgfQogICAgCiAgICAudGFibGVfaW5mbyB0aDpudGgtY2hpbGQoNSksCiAgICAudGFibGVfaW5mbyB0ZDpudGgtY2hpbGQoNSkgewogICAgICB3aWR0aDogMTAlOwogICAgfQogICAgCiAgICAudGFibGVfaW5mbyB0aDpudGgtY2hpbGQoNiksCiAgICAudGFibGVfaW5mbyB0ZDpudGgtY2hpbGQoNikgewogICAgICB3aWR0aDogMjAlOwogICAgfQogICAgCiAgICAudGFibGVfaW5mbyB0aDpudGgtY2hpbGQoNyksCiAgICAudGFibGVfaW5mbyB0ZDpudGgtY2hpbGQoNykgewogICAgICB3aWR0aDogMjAlOwogICAgfQogICAgLnRhYmxlX2luZm8gaW5wdXQsCiAgICAudGFibGVfaW5mbyBzZWxlY3QgewogICAgICB3aWR0aDogMTAwJTsKICAgICAgZm9udC1zaXplOiAxNXB4OwogICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OwogICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICB9CiAgICAKICAgIC8qIHRhYmxlX3F1ZXN0aW9ubmFpcmUgKi8KICAgIC50YWJsZV9xdWVzdGlvbm5haXJlIHRoLAogICAgLnRhYmxlX3F1ZXN0aW9ubmFpcmUgdGQgewogICAgICBwYWRkaW5nOiAzcHggNnB4OwogICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7CiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7CiAgICB9CiAgICAKICAgIC50YWJsZV9xdWVzdGlvbm5haXJlIHRoIHsKICAgICAgd2hpdGUtc3BhY2U6IG5vcm1hbDsKICAgICAgd29yZC1icmVhazogYnJlYWstd29yZDsKICAgIH0KICAgIAogICAgLnRhYmxlX3F1ZXN0aW9ubmFpcmUgdGQgewogICAgICB3aGl0ZS1zcGFjZTogbm93cmFwOwogICAgfQogICAgCiAgICAKICAgIC8qIOWVj+WNt+WFp+eahOi8uOWFpeashOiIh+mBuOWWriAqLwogICAgLnRhYmxlX3F1ZXN0aW9ubmFpcmUgaW5wdXRbdHlwZT0ibnVtYmVyIl0sCiAgICAudGFibGVfcXVlc3Rpb25uYWlyZSBzZWxlY3QgewogICAgICBmb250LXNpemU6IDE1cHg7CiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7CiAgICAgIHdpZHRoOiAyMDBweDsKICAgICAgdGV4dC1hbGlnbjogY2VudGVyOwogICAgfQogICAgCiAgICAudGFibGVfcXVlc3Rpb25uYWlyZSBpbnB1dFt0eXBlPSJudW1iZXIiXSB7CiAgICAgIHdpZHRoOiA2MHB4OwogICAgfQogICAgCiAgICAudGFibGVfcXVlc3Rpb25uYWlyZSBzZWxlY3QgewogICAgICBtYXgtd2lkdGg6IDEyMHB4OwogICAgfQogICAgCiAgICAudGFibGVfc3VnZ2VzdGlvbiB7CiAgICAgIHdpZHRoOiAxMDAlOwogICAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlOwogICAgICB0YWJsZS1sYXlvdXQ6IGZpeGVkOwogICAgICBib3JkZXI6IDJweCBzb2xpZCAjMDAwOwogICAgfQogICAgCiAgICAudGFibGVfc3VnZ2VzdGlvbiB0ZCwKICAgIC50YWJsZV9zdWdnZXN0aW9uIHRoIHsKICAgICAgYm9yZGVyOiAxcHggc29saWQgIzAwMDsKICAgIH0KCiAgICAudGFibGVfc3VnZ2VzdGlvbiBpbnB1dFt0eXBlPSJudW1iZXIiXSwKICAgIC50YWJsZV9zdWdnZXN0aW9uIGlucHV0W3R5cGU9ImRhdGUiXSwKICAgIC50YWJsZV9zdWdnZXN0aW9uIGlucHV0W3R5cGU9Im1vbnRoIl0sCiAgICAudGFibGVfc3VnZ2VzdGlvbiBzZWxlY3QgewogICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OwogICAgICB3aWR0aDogMTUwcHg7CiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgIH0KCiAgICAuYV9lbmQgewogICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICAgIG1hcmdpbjogMCAwIDEwcHggMDsKICAgICAgZm9udC1zaXplOiAxNnB4OwogICAgICBsZXR0ZXItc3BhY2luZzogMC41cHg7CiAgICB9CiAgICAuYV9lbmQgaW5wdXRbdHlwZT0iZGF0ZSJdLAogICAgLmFfZW5kIGlucHV0W3R5cGU9InRleHQiXXsKICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDsKICAgICAgd2lkdGg6IDIwMHB4OwogICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICB9CiAgICAKCiAgICAvKiDliJfljbAgKi8KICAgIEBtZWRpYSBwcmludCB7CiAgICAgIGh0bWwsIGJvZHkgewogICAgICAgIHdpZHRoOiAyMTBtbTsKICAgICAgICBoZWlnaHQ6IDI5N21tOwogICAgICAgIG1hcmdpbjogMDsKICAgICAgICBwYWRkaW5nOiAwOwogICAgICAgIG92ZXJmbG93OiBoaWRkZW47CiAgICAgICAgYmFja2dyb3VuZDogI2ZmZjsKICAgICAgfQogICAgCiAgICAgIC5wYWdlIHsKICAgICAgICB3aWR0aDogMTAwJTsKICAgICAgICBtaW4taGVpZ2h0OiBhdXRvOwogICAgICAgIG1hcmdpbjogMDsKICAgICAgICBwYWRkaW5nOiAwOwogICAgICB9CiAgICAgIGlucHV0W3R5cGU9InRleHQiXSwKICAgICAgaW5wdXRbdHlwZT0ibnVtYmVyIl0sCiAgICAgIGlucHV0W3R5cGU9ImRhdGUiXSwKICAgICAgaW5wdXRbdHlwZT0ibW9udGgiXSB7CiAgICAgICAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50OwogICAgICAgIGJvcmRlci1sZWZ0OiBub25lICFpbXBvcnRhbnQ7CiAgICAgICAgYm9yZGVyLXJpZ2h0OiBub25lICFpbXBvcnRhbnQ7CiAgICAgICAgb3V0bGluZTogbm9uZSAhaW1wb3J0YW50OwogICAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDsKICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50OwogICAgICB9CiAgICAgIHNlbGVjdCB7CiAgICAgICAgYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7CiAgICAgICAgb3V0bGluZTogbm9uZSAhaW1wb3J0YW50OwogICAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDsKICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50OwogICAgICAgIGFwcGVhcmFuY2U6IG5vbmU7CiAgICAgICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lOwogICAgICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTsKICAgICAgfQogICAgfQogIDwvc3R5bGU+CjwvaGVhZD4KPGJvZHk+CiAgPGRpdiBjbGFzcz0icGFnZSI+CiAgICA8ZGl2IGNsYXNzPSJhX3RpdGxlIj7ku6PorJ3nl4flgJnnvqTnlr7nl4XnrqHnkIbntIDpjITooag8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImFfY29udGVudCI+CiAgICAgIDx0YWJsZSBjbGFzcz0idGFibGVfaW5mbyI+CiAgICAgICAgPHRoZWFkPgogICAgICAgICAgPHRyPgogICAgICAgICAgICA8dGg+5aeT5ZCNPC90aD4KICAgICAgICAgICAgPHRoPuaAp+WIpTwvdGg+CiAgICAgICAgICAgIDx0aD7lubTpvaE8L3RoPgogICAgICAgICAgICA8dGg+CiAgICAgICAgICAgICAgPGxhYmVsIGZvcj0iaXNIVE4iPumrmOihgOWjkzwvbGFiZWw+CiAgICAgICAgICAgIDwvdGg+CiAgICAgICAgICAgIDx0aD4KICAgICAgICAgICAgICA8bGFiZWwgZm9yPSJpc0RNIj7ns5blsL/nl4U8L2xhYmVsPjwvdGg+CiAgICAgICAgICAgIDx0aD7mlLbmoYjnrqHnkIY8L3RoPgogICAgICAgICAgICA8dGg+5pyN5YuZ5pel5pyfPC90aD4KICAgICAgICAgIDwvdHI+CiAgICAgICAgPC90aGVhZD4KICAgICAgICA8dGJvZHk+CiAgICAgICAgICA8dHI+CiAgICAgICAgICAgIDx0ZD4KICAgICAgICAgICAgICA8aW5wdXQgaWQ9ImQwMDEiIHR5cGU9InRleHQiID4KICAgICAgICAgICAgPHRkPgogICAgICAgICAgICAgIDxzZWxlY3QgaWQ9ImQwMDIiPgogICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMSI+55S3PC9vcHRpb24+CiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIyIj7lpbM8L29wdGlvbj4KICAgICAgICAgICAgICA8L3NlbGVjdD4KICAgICAgICAgICAgPC90ZD4KICAgICAgICAgICAgPHRkPgogICAgICAgICAgICAgIDxpbnB1dCBpZD0iYWdlIiB0eXBlPSJudW1iZXIiPgogICAgICAgICAgICA8L3RkPgogICAgICAgICAgICA8dGQ+CiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iZDAyNyI+CiAgICAgICAgICAgIDwvdGQ+CiAgICAgICAgICAgIDx0ZD4KICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJkMDI2Ij4KICAgICAgICAgICAgPC90ZD4KICAgICAgICAgICAgPHRkPgogICAgICAgICAgICAgIDxzZWxlY3QgaWQ9ImQwMDMiPgogICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMCI+5pS25qGI566h55CGPC9vcHRpb24+CiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIyIj7lubTluqbnrqHnkIY8L29wdGlvbj4KICAgICAgICAgICAgICA8L3NlbGVjdD4KICAgICAgICAgICAgPC90ZD4KICAgICAgICAgICAgPHRkPgogICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSJkYXRlIiBpZD0iZDAwNCI+CiAgICAgICAgICAgIDwvdGQ+CiAgICAgICAgICA8L3RyPgogICAgICAgIDwvdGJvZHk+CiAgICAgIDwvdGFibGU+CiAgICAgIDx0YWJsZSBjbGFzcz0idGFibGVfcXVlc3Rpb25uYWlyZSI+CiAgICAgICAgPHRoZWFkPgogICAgICAgICAgPHRyPgogICAgICAgICAgICA8dGggY29sc3Bhbj0iMSIgc3R5bGU9IndpZHRoOiA1MCU7Ij7ln7rmnKzos4fmlpnoiIfnlJ/mtLvnv5LmhaM8L3RoPgogICAgICAgICAgICA8dGggY29sc3Bhbj0iMiI+5b6X5Yiw5oWi5oCn55eF55qE6aKo6ZqqKOWDhemcgOaUtuahiOaZguipleS8sCk8L3RoPgogICAgICAgICAgPC90cj4KICAgICAgICA8L3RoZWFkPgogICAgICAgIDx0Ym9keT4KICAgICAgICAgIDx0cj4KICAgICAgICAgICAgPHRkIHJvd3NwYW49IjUiIHN0eWxlPSJ0ZXh0LWFsaWduOiBsZWZ0OyAiPgogICAgICAgICAgICAgIDEu6Lqr6auYOuOAgDxpbnB1dCBpZD0iZDAzNCIgdHlwZT0ibnVtYmVyIiBzdHlsZT0ibWFyZ2luLWxlZnQ6IDRweDsiPuOAgOWFrOWIhjxicj4KICAgICAgICAgICAgICAyLumrlOmHjTrjgIA8aW5wdXQgaWQ9ImQwMzUiIHR5cGU9Im51bWJlciIgc3R5bGU9Im1hcmdpbi1sZWZ0OiA0cHg7Ij7jgIDlhazmlqQ8YnI+CiAgICAgICAgICAgICAgMy7pgYvli5U644CACiAgICAgICAgICAgICAgPHNlbGVjdCBpZD0iZDA5MiI+CiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIxIj4xLueEoTwvb3B0aW9uPgogICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMiI+Mi7lgbbniL48L29wdGlvbj4KICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjMiPjMu57aT5bi4PC9vcHRpb24+CiAgICAgICAgICAgICAgPC9zZWxlY3Q+PGJyPgogICAgICAgICAgICAgIDQu5oq96I+4OuOAgAogICAgICAgICAgICAgIDxzZWxlY3QgaWQ9ImQwMTEiPgogICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMSI+MS7nhKE8L29wdGlvbj4KICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjIiPjIu5YG254i+PC9vcHRpb24+CiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIzIj4zLuS4gOWkqeKJpDEw5pSvPC9vcHRpb24+CiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSI0Ij40LuS4gOWkqT4xMOaUrzwvb3B0aW9uPgogICAgICAgICAgICAgIDwvc2VsZWN0Pjxicj4KICAgICAgICAgICAgICA1LuWavOaqszrjgIAKICAgICAgICAgICAgICA8c2VsZWN0IGlkPSJkMDEyIj4KICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjEiPjEu54ShPC9vcHRpb24+CiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIyIj4yLuWBtueIvjwvb3B0aW9uPgogICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMyI+My7ntpPluLg8L29wdGlvbj4KICAgICAgICAgICAgICA8L3NlbGVjdD4KICAgICAgICAgICAgPC90ZD4KICAgICAgICAgICAgPHRkPuWGoOW/g+eXhTwvdGQ+CiAgICAgICAgICAgIDx0ZD4KICAgICAgICAgICAgICA8c2VsZWN0IGlkPSJkMDQ5Ij4KICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IkgiPumrmDwvb3B0aW9uPgogICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iTSI+5LitPC9vcHRpb24+CiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSJMIj7kvY48L29wdGlvbj4KICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9Ik4iPuS4jemBqeeUqDwvb3B0aW9uPgogICAgICAgICAgICAgIDwvc2VsZWN0PgogICAgICAgICAgICA8L3RkPgogICAgICAgICAgPC90cj4KICAgICAgICAgIDx0cj4KICAgICAgICAgICAgPHRkPuezluWwv+eXhTwvdGQ+CiAgICAgICAgICAgIDx0ZD4KICAgICAgICAgICAgICA8c2VsZWN0IGlkPSJkMDUwIj4KICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IkgiPumrmDwvb3B0aW9uPgogICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iTSI+5LitPC9vcHRpb24+CiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSJMIj7kvY48L29wdGlvbj4KICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9Ik4iPuS4jemBqeeUqDwvb3B0aW9uPgogICAgICAgICAgICAgIDwvc2VsZWN0PgogICAgICAgICAgICA8L3RkPgogICAgICAgICAgPC90cj4KICAgICAgICAgIDx0cj4KICAgICAgICAgICAgPHRkPumrmOihgOWjkzwvdGQ+CiAgICAgICAgICAgIDx0ZD4KICAgICAgICAgICAgICA8c2VsZWN0IGlkPSJkMDUxIj4KICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IkgiPumrmDwvb3B0aW9uPgogICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iTSI+5LitPC9vcHRpb24+CiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSJMIj7kvY48L29wdGlvbj4KICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9Ik4iPuS4jemBqeeUqDwvb3B0aW9uPgogICAgICAgICAgICAgIDwvc2VsZWN0PgogICAgICAgICAgICA8L3RkPgogICAgICAgICAgPC90cj4KICAgICAgICAgIDx0cj4KICAgICAgICAgICAgPHRkPuiFpuS4remiqDwvdGQ+CiAgICAgICAgICAgIDx0ZD4KICAgICAgICAgICAgICA8c2VsZWN0IGlkPSJkMDUyIj4KICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IkgiPumrmDwvb3B0aW9uPgogICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iTSI+5LitPC9vcHRpb24+CiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSJMIj7kvY48L29wdGlvbj4KICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9Ik4iPuS4jemBqeeUqDwvb3B0aW9uPgogICAgICAgICAgICAgIDwvc2VsZWN0PgogICAgICAgICAgICA8L3RkPgogICAgICAgICAgPC90cj4KICAgICAgICAgIDx0cj4KICAgICAgICAgICAgPHRkPuW/g+ihgOeuoeS4jeiJr+S6i+S7tjwvdGQ+CiAgICAgICAgICAgIDx0ZD4KICAgICAgICAgICAgICA8c2VsZWN0IGlkPSJkMDUzIj4KICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IkgiPumrmDwvb3B0aW9uPgogICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iTSI+5LitPC9vcHRpb24+CiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSJMIj7kvY48L29wdGlvbj4KICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9Ik4iPuS4jemBqeeUqDwvb3B0aW9uPgogICAgICAgICAgICAgIDwvc2VsZWN0PgogICAgICAgICAgICA8L3RkPgogICAgICAgICAgPC90cj4KICAgICAgICAgIDx0cj4KICAgICAgICAgICAgPHRkIGNvbHNwYW49IjMiPuS7o+isneeXh+WAmee+pOS6lOWkp+aMh+aomeWPiui6q+mrlOizqumHj+aMh+aVuCjnlbDluLjlgLwpPC90ZD4KICAgICAgICAgIDwvdHI+CiAgICAgICAgICA8dHI+CiAgICAgICAgICAgIDx0ZCBjb2xzcGFuPSIzIiBzdHlsZT0idGV4dC1hbGlnbjogbGVmdDsiPgogICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9ImNfZDAzNiI+PHNwYW4gc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgd2lkdGg6IDExMHB4OyI+6IWw5ZyNOjwvc3Bhbj48aW5wdXQgaWQ9ImQwMzYiIHR5cGU9Im51bWJlciI+PHNwYW4gc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgd2lkdGg6IDIxNnB4OyI+44CA5YWs5YiGPC9zcGFuPijnlLfmgKfiiac5MOWFrOWIhu+8jOWls+aAp+KJpzgw5YWs5YiGKTxicj4KICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJjX2QwNDEiPjxzcGFuIHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHdpZHRoOiAxMTBweDsiPuepuuiFueihgOezljo8L3NwYW4+PGlucHV0IGlkPSJkMDQxIiB0eXBlPSJudW1iZXIiPjxzcGFuIHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHdpZHRoOiAyMDBweDsiPuOAgG1nL2RMPC9zcGFuPuOAgCjiiacxMDBtZy9kTCk8YnI+CiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iY19kMDQ3Ij48c3BhbiBzdHlsZT0iZGlzcGxheTogaW5saW5lLWJsb2NrOyB3aWR0aDogMTEwcHg7Ij7ns5bljJbooYDoibLntKA6PC9zcGFuPjxpbnB1dCBpZD0iZDA0NyIgdHlwZT0ibnVtYmVyIj48c3BhbiBzdHlsZT0iZGlzcGxheTogaW5saW5lLWJsb2NrOyB3aWR0aDogMjAwcHg7Ij7jgIAlPC9zcGFuPuOAgCjvvJ41LjYlKTxicj4KICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJjX0JQIj48c3BhbiBzdHlsZT0iZGlzcGxheTogaW5saW5lLWJsb2NrOyB3aWR0aDogMTEwcHg7Ij7ooYDlo5M6PC9zcGFuPjxpbnB1dCBpZD0iZDAzNyIgdHlwZT0ibnVtYmVyIj7jgIAv44CAPGlucHV0IGlkPSJkMDM4IiB0eXBlPSJudW1iZXIiPjxzcGFuIHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHdpZHRoOiAxMDRweDsiPuOAgG1tSGc8L3NwYW4+44CAKOaUtue4ruWjk+KJpzEzMG1tSGfvvIzoiJLlvLXlo5Piiac4NW1tSGcpPGJyPgogICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9ImNfZDA0MyI+PHNwYW4gc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgd2lkdGg6IDExMHB4OyI+5LiJ6YW455SY5rK56ISCOjwvc3Bhbj48aW5wdXQgaWQ9ImQwNDMiIHR5cGU9Im51bWJlciIgdmFsdWU9IjE3NSI+PHNwYW4gc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgd2lkdGg6IDIwMHB4OyI+44CAbWcvZEw8L3NwYW4+44CAKOKJpzE1MG1nL2RMKTxicj4KICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJjX2QwNDQiPjxzcGFuIHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHdpZHRoOiAxMTBweDsiPumrmOWvhuW6puiGveWbuumGhzo8L3NwYW4+PGlucHV0IGlkPSJkMDQ0IiB0eXBlPSJudW1iZXIiIHZhbHVlPSIxNzUiPjxzcGFuIHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHdpZHRoOiAyMDBweDsiPuOAgG1nL2RMPC9zcGFuPuOAgCjnlLfmgKfvvJw0MG1nL2RM77yM5aWz5oCn77ycNTBtZy9kTCk8YnI+CiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iY19ibWkiPjxzcGFuIHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHdpZHRoOiAxMTBweDsiPui6q+mrlOizqumHj+aMh+aVuDo8L3NwYW4+PGlucHV0IGlkPSJibWkiIHR5cGU9Im51bWJlciIgdmFsdWU9IjE3NSI+PHNwYW4gc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgd2lkdGg6IDIwMHB4OyI+44CAa2cvbTI8L3NwYW4+44CAKOKJpzI3KQogICAgICAgICAgICAgIAogICAgICAgICAgICA8L3RkPgogICAgICAgICAgPC90cj4KICAgICAgICA8L3Rib2R5PgogICAgICA8L3RhYmxlPgogICAgICA8dGFibGUgY2xhc3M9InRhYmxlX3N1Z2dlc3Rpb24iPgogICAgICAgIDx0cj4KICAgICAgICAgIDx0ZD7nlr7nl4XnrqHnkIbmjIflvJUo6Yar5bir5bCN55eF5Lq66Kqq5piO5rK755mC55So6Jel5aSW77yM5Lqm6aCI5pS55ZaE5Y2x6Zqq5Zug5a2Q55qE6YeN6KaB5oCnKTwvdGQ+CiAgICAgICAgPC90cj4KICAgICAgICA8dHI+CiAgICAgICAgICA8dGQ+CiAgICAgICAgICAgIDxsYWJlbCBmb3I9IlJfc21va2UiPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9IlJfc21va2UiPuaIkuiPuCjlkLjoj7jiiacxMOaUry/ml6XmiJblsLzlj6TkuIHmiJDnma7luqbiiac05YiG77yM5Y+v5o+Q5L6b5oiW6L2J5LuL5oiS6I+45pyN5YuZKTwvbGFiZWw+PGJyPgogICAgICAgICAgICA8bGFiZWwgZm9yPSJkMDU0XzEiIHN0eWxlPSJtYXJnaW4tbGVmdDogMjBweDsiPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9ImQwNTRfMSI+5oiS6I+45oyH5bCOKOeEoeaEj+mhmOaOpeWPl+aIkuiPuOacjeWLmeaIlu+8nDEw5pSvL+aXpeaIluWwvOWPpOS4geaIkOeZruW6pu+8nDTliIYpPC9sYWJlbD48YnI+CiAgICAgICAgICAgIDxsYWJlbCBmb3I9IlJfc21va2VfcXVpdCIgc3R5bGU9Im1hcmdpbi1sZWZ0OiAyMHB4OyI+PGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iUl9zbW9rZV9xdWl0Ij7miJLoj7jmnI3li5ko4omnMTDmlK8v5pel5oiW5bC85Y+k5LiB5oiQ55mu5bqm4omnNOWIhinvvJo8bGFiZWwgZm9yPSJkMDU0XzIiPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9ImQwNTRfMiI+5o+Q5L6b5oiS6I+45pyN5YuZPC9sYWJlbD48bGFiZWwgZm9yPSJkMDU0XzMiPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9ImQwNTRfMyI+5ZCM5oSP6L2J5LuL5oiS6I+45pyN5YuZPC9sYWJlbD48YnI+PC9sYWJlbD4KICAgICAgICAgICAgPGxhYmVsIGZvcj0iUl9iZXRlbCI+PGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iUl9iZXRlbCI+5oiS5qqzKDblgIvmnIjlhafmnInlmrzmqrPmppQpPGJyPjwvbGFiZWw+CiAgICAgICAgICAgIDxsYWJlbCBmb3I9IlJfYmV0ZWxfcXVpdCIgc3R5bGU9Im1hcmdpbi1sZWZ0OiAyMHB4OyI+PGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iUl9iZXRlbF9xdWl0Ij7miJLmqrPnm67mqJnvvJo8aW5wdXQgdHlwZT0iZGF0ZSIgaWQ9IlJfYmV0ZWxfcXVpdF9kYXRlIj7liY3miJLpmaTmqrPmppQ8YnI+PC9sYWJlbD4KICAgICAgICAgICAgPGxhYmVsIGZvcj0iZDA2OCIgc3R5bGU9Im1hcmdpbi1sZWZ0OiAyMHB4OyI+PGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iZDA2OCI+5Y+j6IWU5qqi5p+l77yaPGlucHV0IHR5cGU9Im1vbnRoIj48YnI+PC9sYWJlbD4KICAgICAgICAgICAgPGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iUl9jYWwiPuavj+aXpeW7uuitsOaUneWPlueGsemHj++8mijlpKfljaEv5aSpKe+8mgogICAgICAgICAgICA8c2VsZWN0IGlkPSJkMDY5Ij4KICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIxIj4xMjAwPC9vcHRpb24+CiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMiI+MTUwMDwvb3B0aW9uPgogICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjMiPjE4MDA8L29wdGlvbj4KICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSI0Ij4yMDAwPC9vcHRpb24+CiAgICAgICAgICAgIDwvc2VsZWN0PuOAgOWkp+WNoTxicj4KICAgICAgICAgICAgPHNwYW4gc3R5bGU9Im1hcmdpbi1sZWZ0OiAyMHB4OyI+55uh6YeP5rib5bCRCiAgICAgICAgICAgICAgPGxhYmVsIGZvcj0iUl9jYWxfMSI+PGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iUl9jYWxfMSI+5rK554K454mp44CAPC9sYWJlbD4KICAgICAgICAgICAgICA8bGFiZWwgZm9yPSJSX2NhbF8yIj48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJSX2NhbF8yIj7nlJzpo5/jgIDjgIA8L2xhYmVsPgogICAgICAgICAgICAgIDxsYWJlbCBmb3I9IlJfY2FsXzMiPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9IlJfY2FsXzMiPum5veOAgOOAgOOAgDwvbGFiZWw+CiAgICAgICAgICAgICAgPGxhYmVsIGZvcj0iUl9jYWxfNCI+PGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iUl9jYWxfNCI+5ZCr57OW6aOy5paZPC9sYWJlbD4KICAgICAgICAgICAgICA8bGFiZWwgZm9yPSJSX2NhbF81Ij48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJSX2NhbF81Ij7lhbbku5YoX19fX19fX19fXyk8YnI+PC9sYWJlbD4KICAgICAgICAgICAgPC9zcGFuPgogICAgICAgICAgICA8bGFiZWwgZm9yPSJSX2V4ZXIiPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9IlJfZXhlciI+6YGL5YuV5bu66K2w77yaPGJyPjwvbGFiZWw+CiAgICAgICAgICAgIDxsYWJlbCBmb3I9ImQwNzEiIHN0eWxlPSJtYXJnaW4tbGVmdDogMjBweDsiPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9ImQwNzEiPuaPkOS+m+mBi+WLleaMh+Wwjjrmr4/pgLHntK/nqY0xNTDliIbpkJjkuK3nrYnosrvlipvpgYvli5Uo5rS75YuV5pmC5LuN5Y+v5Lqk6KuH77yM5L2G54Sh5rOV5ZSx5q2MKTxicj48L2xhYmVsPgogICAgICAgICAgICA8bGFiZWwgZm9yPSJkMDcyIiBzdHlsZT0ibWFyZ2luLWxlZnQ6IDIwcHg7Ij48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJkMDcyIj7mj5DkvpvnpL7ljYDpgYvli5Xos4fmupA6X19fX19fX19fX19fXzxicj48L2xhYmVsPgogICAgICAgICAgICA8bGFiZWwgZm9yPSJSX2JtaSI+PGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iUl9ibWkiPuaDs+mBlOaIkOeahOiFsOWcjeWPiumrlOmHje+8muiFsOWcjTxpbnB1dCB0eXBlPSJudW1iZXIiIGlkPSJkMDg0Ij7lhazliIbjgIHpq5Tph408aW5wdXQgdHlwZT0ibnVtYmVyIiBpZD0iZDA4NSI+5YWs5pakPGJyPjwvbGFiZWw+CiAgICAgICAgICAgIDxsYWJlbCBmb3I9ImQwODMiPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9ImQwODMiPumHj+ihgOWjk++8muaMh+WwjjcyMumHj+a4rDxicj48L2xhYmVsPgogICAgICAgICAgICA8bGFiZWwgZm9yPSJSX290aGVyIj48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJSX290aGVyIj7lhbbku5blj67lmoDvvJo8YnI+PC9sYWJlbD4KICAgICAgICAgICAgPHNwYW4gc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgbWFyZ2luLWxlZnQ6IDIwcHg7IHdpZHRoOiA0MHB4Ij4oMS0xKTwvc3Bhbj4KICAgICAgICAgICAgPGxhYmVsIGZvcj0iUl9nbHVjb3NlIj48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJSX2dsdWNvc2UiPumjr+WJjeihgOezluWAi+S6uuebruaomeWAvO+8mjxpbnB1dCB0eXBlPSJudW1iZXIiIHN0eWxlPSJtYXJnaW4tbGVmdDogMTVweDsiIGlkPSJkMDg2Ij7jgIBtZy9kTDxicj48L2xhYmVsPgogICAgICAgICAgICA8c3BhbiBzdHlsZT0iZGlzcGxheTogaW5saW5lLWJsb2NrOyBtYXJnaW4tbGVmdDogMjBweDsgd2lkdGg6IDQwcHgiPigxLTIpPC9zcGFuPgogICAgICAgICAgICA8bGFiZWwgZm9yPSJSX2ExYyI+PGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iUl9hMWMiPuezluWMluihgOiJsue0oOWAi+S6uuebruaomeWAvO+8mjxpbnB1dCB0eXBlPSJudW1iZXIiIGlkPSJkMDkwIj7jgIAlPGJyPjwvbGFiZWw+CiAgICAgICAgICAgIDxzcGFuIHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IG1hcmdpbi1sZWZ0OiAyMHB4OyB3aWR0aDogNDBweCI+KDIpPC9zcGFuPgogICAgICAgICAgICA8bGFiZWwgZm9yPSJSX3RnIj48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJSX3RnIj7kuInphbjnlJjmsrnohILlgIvkurrnm67mqJnlgLzvvJo8aW5wdXQgdHlwZT0ibnVtYmVyIiBpZD0iZDA4NyI+44CAbWcvZEw8YnI+PC9sYWJlbD4KICAgICAgICAgICAgPHNwYW4gc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgbWFyZ2luLWxlZnQ6IDIwcHg7IHdpZHRoOiA0MHB4Ij4oMy0xKTwvc3Bhbj4KICAgICAgICAgICAgPGxhYmVsIGZvcj0iUl9oZGwiPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9IlJfaGRsIj7pq5jlr4bluqbohr3lm7rphoflgIvkurrnm67mqJnvvJo8aW5wdXQgdHlwZT0ibnVtYmVyIiBpZD0iZDA4OSI+44CAbWcvZEw8YnI+PC9sYWJlbD4KICAgICAgICAgICAgPHNwYW4gc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgbWFyZ2luLWxlZnQ6IDIwcHg7IHdpZHRoOiA0MHB4Ij4oMy0yKTwvc3Bhbj4KICAgICAgICAgICAgPGxhYmVsIGZvcj0iUl9sZGwiPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9IlJfbGRsIj7kvY7lr4bluqbohr3lm7rphoflgIvkurrnm67mqJnvvJo8aW5wdXQgdHlwZT0ibnVtYmVyIiBpZD0iZDA4OCI+44CAbWcvZEw8YnI+PC9sYWJlbD4KICAgICAgICAgIDwvdGQ+CiAgICAgICAgPC90cj4KICAgICAgPC90YWJsZT4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0iYV9lbmQiPgogICAgICA8aW5wdXQgdHlwZT0idGV4dCIgaWQ9ImNsaW5pY25hbWUiID7vvIzlu7rorbDlm57oqLrml6XmnJ88aW5wdXQgdHlwZT0iZGF0ZSIgaWQ9ImZvbGxvd19kYXRlIj48YnI+CuKAu+WQjOaEj+aUtuahiOiAhe+8jOiri+aPkOS+m+WAi+S6uumAo+e1oembu+ipseWBmueCuuWAi+ahiOi/vei5pOWBpeW6t+euoeeQhuaIluihm+eUn+WWruS9jeaUv+etluipleS8sOS9v+eUqOOAgjxicj4K4oC75pys6KGo6KuL5Y+D54Wn5ZyL5rCR5YGl5bq3572y5o+Q5L6b5LmL44CM5Luj6Kyd55eH5YCZ576k566h55CG6KiI55Wr54Wn6K235rWB56iL6IiH5oyH5bCO5omL5YaK44CN5Z+36KGM44CCPGJyPgoKICAgIDwvZGl2PgogIDwvZGl2PgogIDxzY3JpcHQ+CiAgICBmdW5jdGlvbiByZW5kZXJwYWdlKGlucHV0b2JqKXsKICAgICAgbGV0IHNlYz1pbnB1dG9iai54bWwuc2VjMDE7CiAgICAgIGxldCBhZ2U9bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLWlucHV0b2JqLnhtbC5iaXJ0aGRheS5zdWJzdHJpbmcoMCw0KTsKICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImFnZSIpLnZhbHVlPWFnZTsKICAgICAgbGV0IG9iamtleT1PYmplY3Qua2V5cyhpbnB1dG9iai54bWwuc2VjMDEpOwogICAgICBmb3IgKGxldCBpPTA7aTxvYmprZXkubGVuZ3RoO2krKyl7CiAgICAgICAgbGV0IGtleT1vYmprZXlbaV07CiAgICAgICAgbGV0IHY9aW5wdXRvYmoueG1sLnNlYzAxW2tleV07CiAgICAgICAgbGV0IGU9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoa2V5KTsKICAgICAgICBpZiAoZSl7CiAgICAgICAgICBlLnZhbHVlPXY7CiAgICAgICAgICBpZiAoa2V5PT0iZDAwNCIpewogICAgICAgICAgICB2PXYudG9TdHJpbmcoKQogICAgICAgICAgICBlLnZhbHVlPXYuc3Vic3RyaW5nKDAsNCkrIi0iK3Yuc3Vic3RyaW5nKDQsNikrIi0iK3Yuc3Vic3RyaW5nKDYsOCk7CiAgICAgICAgICB9IGVsc2UgaWYgKFsiZDA0OSIsImQwNTAiLCJkMDUxIiwiZDA1MiIsImQwNTMiXS5pbmNsdWRlcyhrZXkpKXsKICAgICAgICAgICAgaWYgKHY+PTMwKXsKICAgICAgICAgICAgICBlLnZhbHVlPSJIIjsKICAgICAgICAgICAgfSBlbHNlIGlmICh2Pj0yMCl7CiAgICAgICAgICAgICAgZS52YWx1ZT0iTSIKICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICBlLnZhbHVlPSJMIgogICAgICAgICAgICB9IAogICAgICAgICAgICBpZiAoa2V5PT0iZDA1MCIgJiYgaW5wdXRvYmoueG1sLnNlYzAxLmQwMjY9PSJZIil7CiAgICAgICAgICAgICAgZS52YWx1ZT0iTiIKICAgICAgICAgICAgfSBlbHNlIGlmIChrZXk9PSJkMDUxIiAmJiBpbnB1dG9iai54bWwuc2VjMDEuZDAyNz09IlkiKXsKICAgICAgICAgICAgICBlLnZhbHVlPSJOIgogICAgICAgICAgICB9CiAgICAgICAgICB9IGVsc2UgaWYgKFsiZDAyNiIsImQwMjciXS5pbmNsdWRlcyhrZXkpKXsKICAgICAgICAgICAgaWYgKHY9PSJZIil7CiAgICAgICAgICAgICAgZS5jaGVja2VkPXRydWU7CiAgICAgICAgICAgIH0KICAgICAgICAgIH0gZWxzZSBpZiAoWyJkMDcxIiwiZDA3MiIsImQwODMiXS5pbmNsdWRlcyhrZXkpKXsKICAgICAgICAgICAgZS5jaGVja2VkPXY7CiAgICAgICAgICB9CiAgICAgICAgfQogICAgICB9CiAgICAgIGlmICgoc2VjLmQwMDI9PTEgJiYgc2VjLmQwMzY+PTkwKSB8fCAoc2VjLmQwMDI9PTIgJiYgc2VjLmQwMzY+PTgwKSl7CiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImNfZDAzNiIpLmNoZWNrZWQ9dHJ1ZTsKICAgICAgfSAKICAgICAgaWYgKHNlYy5kMDQxPj0xMDApewogICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjX2QwNDEiKS5jaGVja2VkPXRydWU7CiAgICAgIH0KICAgICAgaWYgKHNlYy5kMDQ3PjUuNil7CiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImNfZDA0NyIpLmNoZWNrZWQ9dHJ1ZTsKICAgICAgfQogICAgICBpZiAoc2VjLmQwMzc+PTEzMCB8fCBzZWMuZDAzOD49ODUpewogICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjX0JQIikuY2hlY2tlZD10cnVlOwogICAgICB9CiAgICAgIGlmIChzZWMuZDA0Mz49MTUwKXsKICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY19kMDQzIikuY2hlY2tlZD10cnVlOwogICAgICB9CiAgICAgIGlmICgoc2VjLmQwMDI9PTEgJiYgc2VjLmQwNDQ8NDApIHx8IChzZWMuZDAwMj09MiAmJiBzZWMuZDA0NDw1MCkpewogICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjX2QwNDQiKS5jaGVja2VkPXRydWU7CiAgICAgIH0gCiAgICAgIGxldCBibWk9c2VjLmQwMzUvKChzZWMuZDAzNC8xMDApKihzZWMuZDAzNC8xMDApKTsKICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImJtaSIpLnZhbHVlPWJtaTsKICAgICAgaWYgKGJtaT49MjcpewogICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjX2JtaSIpLmNoZWNrZWQ9dHJ1ZTsKICAgICAgfQogICAgICBpZiAoc2VjLmQwMTEhPTEpewogICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJSX3Ntb2tlIikuY2hlY2tlZD10cnVlOwogICAgICB9CiAgICAgIGlmIChzZWMuZDAxMiE9MSl7CiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIlJfYmV0ZWwiKS5jaGVja2VkPXRydWU7CiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIlJfYmV0ZWxfcXVpdCIpLmNoZWNrZWQ9dHJ1ZTsKICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiUl9iZXRlbF9xdWl0X2RhdGUiKS52YWx1ZT1pbnB1dG9iai5mb2xsb3dEYXRlOwogICAgICB9CiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJSX2NhbCIpLmNoZWNrZWQ9dHJ1ZTsKICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIlJfY2FsXzEiKS5jaGVja2VkPXRydWU7CiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJSX2NhbF8yIikuY2hlY2tlZD10cnVlOwogICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiUl9jYWxfMyIpLmNoZWNrZWQ9dHJ1ZTsKICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIlJfY2FsXzQiKS5jaGVja2VkPXRydWU7CiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJSX2V4ZXIiKS5jaGVja2VkPXRydWU7CiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJSX2JtaSIpLmNoZWNrZWQ9dHJ1ZTsKICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIlJfb3RoZXIiKS5jaGVja2VkPXRydWU7CiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJSX2dsdWNvc2UiKS5jaGVja2VkPXRydWU7CiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJSX2ExYyIpLmNoZWNrZWQ9dHJ1ZTsKICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIlJfdGciKS5jaGVja2VkPXRydWU7CiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJSX2hkbCIpLmNoZWNrZWQ9dHJ1ZTsKICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIlJfbGRsIikuY2hlY2tlZD10cnVlOwogICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY2xpbmljbmFtZSIpLnZhbHVlPWlucHV0b2JqLmNsaW5pY05hbWU7CiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJmb2xsb3dfZGF0ZSIpLnZhbHVlPWlucHV0b2JqLmZvbGxvd0RhdGU7CiAgICB9CgogICAgCiAgPC9zY3JpcHQ+CjwvYm9keT4KPC9odG1sPgo='

        const win = window.open("", "_blank");
        win.document.open();
        win.document.write(decodeBase64(htmlString)); // 你的整份HTML
        win.document.close();

        win.onload = function () {
            win.renderpage(outputobj);
        };
    });
    function $v(id){
      const el = document.getElementById(id);
      return el ? el.value : "";
    }
    function errbeforesave(){
      let err="";
      if ($v("clinicName")==""){err+="缺院所名稱\n"};
      if ($v("clinicCode")==""){err+="缺院所代碼\n"};
      if ($v("name")==""){err+="缺個案姓名\n"};
      if ($v("personalId")==""){err+="缺個案ID\n"};
      if ($v("birthday")==""){err+="缺個案生日\n"};
      if ($v("checkdate")==""){err+="缺檢查日期\n"};
      if ($v("explainDate")==""){err+="缺解釋日期\n"};
      if ($v("followDate")==""){err+="缺追蹤日期\n"};
      if ($v("d001")==""){err+="缺d001個案姓名\n"};
      if ($v("d003")==0){
        if ($v("d006")!="" ||
          $v("d007")!="" ||
          $v("d008")!="" ||
          $v("d009")!="" ||
          $v("d0010")!="" ){
            err+="新收案d006~d010不可填\n"
        }
      } else if ($v("d003")==1){
        if ($v("d006")=="" ||
          $v("d007")=="" ||
          $v("d008")=="" ||
          $v("d009")=="" ||
          $v("d0010")=="" ){
            err+="追蹤管理d006~d010必填\n"
        }
      }
      if ($v("d011")==1){
        if ($v("d054")!=""){
          err+="d011無抽菸，d054戒菸不可填\n"
        }
      } else if ($v("d011")==2 || $v("d011")==3 || $v("d011")==4){
        if ($v("d054")==""){
          err+="d011有抽菸，d054戒菸必填\n"
        }
      }
      if ($v("d012")==1){
        if ($v("d058")!="" ||
          $v("d059")!="" ||
          $v("d060")!="" ||
          $v("d061")!="" ||
          $v("d062")!="" ||
          $v("d063")!="" ||
          $v("d064")!="" ||
          $v("d068")!="" ){
          err+="d012無嚼檳，d058~64嚼檳原因及d068安排口篩不可填\n"
        }
      } else if ($v("d012")==2 ||$v("d012")==3){
        if ($v("d058")!="" ||
          $v("d059")=="" ||
          $v("d060")=="" ||
          $v("d061")=="" ||
          $v("d062")=="" ||
          $v("d063")=="" ||
          $v("d064")=="" ||
          $v("d068")=="" ){
          err+="d012有嚼檳，d058~64嚼檳原因及d068安排口篩必填\n"
        }
      } 
      if ($v("d003")==0){
        if ($v("d025")=="" ||
          $v("d026")=="" ||
          $v("d027")=="" ||
          $v("d028")=="" ||
          $v("d029")=="" ||
          $v("d030")=="" ||
          $v("d031")=="" ){
          err+="d003新收案，d025-d031伴隨疾病皆必填Y或N\n"
        } else if ($v("d025")=="Y"){
          if ($v("d026")=="Y" ||
          $v("d027")=="Y" ||
          $v("d028")=="Y" ||
          $v("d029")=="Y" ||
          $v("d030")=="Y" ||
          $v("d031")=="Y" ||
          $v("d032")!="" ){
            err+="d003新收案，d025伴隨疾病為無填Y，d026~d032必為N，且d032不可填\n"
          }
        } else if ($v("d025")=="N"){
          if ($v("d026")=="N" &&
          $v("d027")=="N" &&
          $v("d028")=="N" &&
          $v("d029")=="N" &&
          $v("d030")=="N" &&
          $v("d031")=="N" &&
          $v("d032")=="" ){
            err+="d003新收案，d025伴隨疾病為無填N，d026~d032不可全無\n"
          }
        }
      }
      if ($v("d033")==""){err+="缺d033檢查日期\n"};
      if ($v("d034")==""){
        err+="缺d034身高\n"
      } else if ($v("d034")<80 || $v("d034")>220){
        err+="d034身高範圍異常\n"
      }
      if ($v("d035")==""){
        err+="缺d035體重\n"
      } else if ($v("d035")<20 || $v("d035")>300){
        err+="d035體重範圍異常\n"
      }
      if ($v("d036")==""){
        err+="缺d036腰圍\n"
      } else if ($v("d036")<20 || $v("d036")>200){
        err+="d036腰圍範圍異常\n"
      }
      if ($v("d037")==""){
        err+="缺d037SBP\n"
      } else if ($v("d037")<50 || $v("d037")>300){
        err+="d037SBP範圍異常\n"
      }
      if ($v("d038")==""){
        err+="缺d038DBP\n"
      } else if ($v("d038")<20 || $v("d038")>200){
        err+="d038DBP範圍異常\n"
      }
      if ($v("d040")==""){
        err+="缺d040降血壓藥物\n"
      } 

      if ($v("d040")==""){
        err+="缺d040降血壓藥物\n"
      } 
      if ($v("d042")==""){
        err+="缺d042降血糖藥物\n"
      } 
      if ($v("d045")==""){
        err+="缺d045降血脂藥物\n"
      } 
      if ($v("d003")==0 || $v("d003")==2){
        if ($v("d041")==""){
          err+="新收案及年度評估必填d041血糖\n"
        } 
        if ($v("d043")==""){
          err+="新收案及年度評估必填d043TG\n"
        } 
        if ($v("d044")==""){
          err+="新收案及年度評估必填d044HDL\n"
        } 
        if ($v("d048")==""){
          err+="新收案及年度評估必填d048TC\n"
        } 
        if ($v("d069")==""){
          err+="新收案及年度評估必填d069每日建議熱量\n"
        } 
        if ($v("d071")=="" || $v("d072")==""){
          err+="新收案及年度評估必填d071-d072運動建議\n"
        } else if ($v("d071")=="N" && $v("d072")=="N"){
          err+="新收案及年度評估必填d071-d072運動建議其中一個必為Y\n"
        }
        if ($v("d084")==""){
          err+="新收案及年度評估必填d084目標值-腰圍\n"
        } 
        if ($v("d085")==""){
          err+="新收案及年度評估必填d085目標值-體重\n"
        } 
        if ($v("d086")==""){
          err+="新收案及年度評估必填d086目標值-飯前血糖\n"
        } 
        if ($v("d087")==""){
          err+="新收案及年度評估必填d087目標值-三酸甘油脂\n"
        } 
        if ($v("d088")==""){
          err+="新收案及年度評估必填d087目標值-低密度脂蛋白膽固醇\n"
        } 
        if ($v("d089")==""){
          err+="新收案及年度評估必填d087目標值-高密度脂蛋白膽固醇 \n"
        } 
        if ($v("d090")==""){
          err+="新收案及年度評估必填d087目標值-醣化血紅素\n"
        } 
      }
      if ($v("d069")==9 && $v("d070")==""){
        err+="每日建議熱量其他時必填d070每日建議熱量其他 \n"
      } 
      if ($v("d003")==0){
        if ($v("d083")==""){
          err+="新收案必填d083722血壓量測指導\n"
        }
      }
      if ($v("d092")==""){
        err+="缺d092危險因子-運動\n"
      } 
      if ($v("d041")!="" && $v("d093")==""){
        err+="飯前血糖值(d041)有值時必填d093飯前血糖檢驗日期\n"
      } else if ($v("d041")=="" && $v("d093")!=""){
        err+="飯前血糖值(d041)無值時不可填d093飯前血糖檢驗日期\n"
      }
      if ($v("d043")!="" && $v("d094")==""){
        err+="三酸甘油酯(d043)有值時必填d094三酸甘油酯檢驗日期\n"
      } else if ($v("d043")=="" && $v("d094")!=""){
        err+="三酸甘油酯(d043)無值時不可填d094三酸甘油酯檢驗日期\n"
      }
      if ($v("d044")!="" && $v("d095")==""){
        err+="高密度脂蛋白(d044)有值時必填d095高密度脂蛋白檢驗日期\n"
      } else if ($v("d044")=="" && $v("d095")!=""){
        err+="高密度脂蛋白(d044)無值時不可填d095高密度脂蛋白檢驗日期\n"
      }
      if ($v("d046")!="" && $v("d096")==""){
        err+="低密度脂蛋白(d046)有值時必填d096低密度脂蛋白檢驗日期\n"
      } else if ($v("d046")=="" && $v("d096")!=""){
        err+="低密度脂蛋白(d046)無值時不可填d096低密度脂蛋白檢驗日期\n"
      }
      if ($v("d047")!="" && $v("d097")==""){
        err+="醣化血紅素(d047)有值時必填d097醣化血紅素檢驗日期\n"
      } else if ($v("d047")=="" && $v("d097")!=""){
        err+="醣化血紅素(d047)無值時不可填d097醣化血紅素檢驗日期\n"
      }
      if ($v("d048")!="" && $v("d098")==""){
        err+="總膽固醇(d048)有值時必填d098總膽固醇檢驗日期\n"
      } else if ($v("d048")=="" && $v("d098")!=""){
        err+="總膽固醇(d048)無值時不可填d09總膽固醇檢驗日期\n"
      }
      return err
    }
    function decodeBase64(str) {
        const binary = atob(str);
        const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
        return new TextDecoder().decode(bytes);
      }


    function savetophpciis(obj){
      let xhr = new XMLHttpRequest();
      let registrationId=obj.registrationId;
      let registrationsurl="https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId="+registrationId;
      xhr.open("GET", registrationsurl, false);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send();
      let r=JSON.parse(xhr.responseText).result;
      let health_recordsurl="https://phpcis.chshb.gov.tw/api/v1/health_records/find?registrationId="+registrationId;
      xhr.open("GET", health_recordsurl, false);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send();
      let hr=JSON.parse(xhr.responseText).result;
      let payload={};
      payload.CC=hr.CC;
      payload.PE=JSON.stringify(obj,null,2);
      payload.abnormalTreatmentSeqNo="MSPT";
      payload.benefitTypeCode=r.benefitTypeCode;
      payload.benefitTypeId=r.benefitTypeId;
      payload.bmi=hr.bmi;
      payload.caseTypeCode=r.caseTypeCode;
      payload.caseTypeId=r.caseTypeId;
      payload.codContent=hr.codContent
      payload.courseHealthRecordId=hr.courseHealthRecordId
      payload.dbp=hr.dbp
      payload.diseases=[];
      for (let i=0;i<hr.diseases.length;i++){
        let d=hr.diseases[i];
        let td={};
        td.ICD10Code=d.ICD10;
        td.diseaseId=d.diseaseId;
        td.isChronic=d.isChronic;
        td.isMaster=d.isMaster;
        payload.diseases.push(td)
      }
      payload.dispensingType=hr.dispensingType
      payload.glucoseAC=hr.glucoseAC
      payload.glucosePC=hr.glucosePC
      payload.healthRecordId=r.healthRecordId
      payload.height=hr.height
      payload.homeCareType=hr.homeCareType
      payload.isAutoCorrect=hr.isAutoCorrect;
      payload.isCH=true
      payload.isChronicPrescription=hr.isChronicPrescription
      payload.isEmergencyVisit=hr.isEmergencyVisit
      payload.isICCardWritten=hr.isICCardWritten
      payload.isIncludeFamilyCare=hr.isIncludeFamilyCare
      payload.lastTakingAt=hr.lastTakingAt
      payload.personalInfoId=r.personalInfoId
      payload.physicalExamHistoryId=hr.physicalExamHistoryId
      payload.prescriptionDeadline=hr.prescriptionDeadline
      payload.prescriptionNo=hr.prescriptionNo
      payload.prescriptionReuseTimes=hr.prescriptionReuseTimes
      payload.prescriptionType=hr.prescriptionType
      payload.prescriptionUseTimes=hr.prescriptionUseTimes
      payload.prescriptions=[];
      for (let i=0;i<hr.prescriptions.length;i++){
        let p=hr.prescriptions[i];
        let tp={};
        tp.bureauTestCode=p.bureauTestCode;
        tp.day=p.day
        tp.description=p.description
        tp.doctorVisitRemark=p.doctorVisitRemark
        tp.drugCode=p.prescriptionCode
        tp.drugName=p.prescriptionName
        tp.drugRouteId=p.drugRouteId
        tp.drugUsageId=p.drugUsageId
        tp.endTime=p.endTime
        tp.isApplicable=p.isApplicable
        tp.isChronicPrescription=p.isChronicPrescription
        tp.isSchedule=p.isSchedule
        tp.isScheduleCorrection=p.isScheduleCorrection
        tp.modelType=p.modelType
        tp.ownExpenseSeq=p.ownExpenseSeq
        tp.prescriptionId=p.prescriptionId
        tp.prescriptionModel=p.prescriptionModel
        tp.qty=p.qty
        tp.selfPayType=p.selfPayType
        tp.startTime=p.startTime
        tp.testPackageCode=p.testPackageCode
        tp.testPackageId=p.testPackageId
        tp.testPackageName=p.testPackageName
        tp.totalQty=p.totalQty
        payload.prescriptions.push(tp)
      }
      payload.pulse=hr.pulse
      payload.registrationDate=hr.treatmentEndDate
      payload.registrationId=r.registrationId
      payload.sbp=hr.sbp
      payload.scheduleTest=null;
      payload.scheduleTestId=hr.scheduleTestId
      payload.shareCode=r.shareCode
      payload.shareId=r.shareId
      payload.supplyReportType=hr.supplyReportType
      payload.transferClinicCode=hr.transferClinicCode
      payload.treatmentEndDate=hr.treatmentEndDate
      payload.treatmentTypeId=r.treatmentTypeId
      payload.visitTypeCode=r.visitTypeCode
      payload.visitTypeId=r.visitTypeId
      payload.waist=null
      payload.weight=hr.weight
      payload.writeICCard=true

      let validurl="https://phpcis.chshb.gov.tw/api/v1/health_records/check_valid";
      xhr.open("POST", validurl, false);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send(JSON.stringify(payload));
      let validjson=JSON.parse(xhr.responseText);
      if (validjson.code!=200){
				alert(validjson.message);
				return
			} 
      xhr.open( 'POST', "https://phpcis.chshb.gov.tw/api/v1/health_records/update", false );
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xhr.send(JSON.stringify(payload));
			let updateres=xhr.responseText
			let updatejson=JSON.parse(updateres);
			if (updatejson.code!=200){
				alert(updatejson.message);
			} else {
				alert("成功");
			}
    }
    function querybydate(datearray){
      let preresult=[];
      let healthRecordIdarray=[];
      let xhr = new XMLHttpRequest();
      let apiurl="https://phpcis.chshb.gov.tw/api/v1/health_records/prescriptions/list?personalId=&period=&roomId=&prescriptionType=1&visitTypeId=&date="
      for (let i=0;i<datearray.length;i++){
        let url=apiurl+datearray[i];
        xhr.open("GET", url, false);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.send();
        let preres=JSON.parse(xhr.responseText).result;
        for (let j=0;j<preres.length;j++){
          let pr=preres[j];
          if (pr.visitTypeName.includes("代謝_")){
            preresult.push(pr);
            healthRecordIdarray.push(pr.healthRecordId);
          }
        }
      }
      let hrres=gethealthrecord(healthRecordIdarray);
      rendertable(preresult,hrres);
      
    }

    function gethealthrecord(healthRecordIdarray){
      const baseUrl = "https://phpcis.chshb.gov.tw/api/v1/prescriptions/list_by_type";
      const printType = "1";
      const params = new URLSearchParams();
      params.append("healthRecordIds", healthRecordIdarray.join(","));
      params.append("printType", printType);
      const url = baseUrl + "?" + params.toString();
  
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, false);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send();
      let hrres=JSON.parse(xhr.responseText).result;
      let returnarray={};
      for (let i=0;i<hrres.length;i++){
        let hr=hrres[i];
        returnarray[hr.personalId]={};
        returnarray[hr.personalId].PE=hr.PE;
        returnarray[hr.personalId].clinicCode=hr.clinicCode;
        returnarray[hr.personalId].clinicName=hr.clinicName;
      }
      return returnarray
  }
    




    function rendertable(preresult,hrres){
      let table=document.getElementById("querytable").children[1];
      table.innerHTML="";
      for (let i=0;i<preresult.length;i++){
        let pr=preresult[i];
        let hr=hrres[pr.personalId];
        let tr=document.createElement("tr");
        table.appendChild(tr);
        let countnum=i+1;
        let td1=document.createElement("td");
        td1.innerHTML=countnum;
        tr.appendChild(td1);
        let td2=document.createElement("td");
        td2.innerHTML=pr.personalId;
        tr.appendChild(td2);
        let td21=document.createElement("td");
        td21.innerHTML=pr.name;
        tr.appendChild(td21);
        let td3=document.createElement("td");
        td3.innerHTML=pr.birthday;
        tr.appendChild(td3);
        let td4=document.createElement("td");
        td4.innerHTML=pr.treatmentDate;
        tr.appendChild(td4);
        let td5=document.createElement("td");
        td5.innerHTML=pr.visitTypeName;
        tr.appendChild(td5);
        let td6=document.createElement("td");
        td6.innerHTML=pr.registrationId;
        td6.style.display="none"
        tr.appendChild(td6);
        let td7=document.createElement("td");
        td7.innerHTML=pr.healthRecordId;
        td7.style.display="none"
        tr.appendChild(td7);
        let td8=document.createElement("td");
        tr.appendChild(td8);
        let td8button=document.createElement("button");
        td8.appendChild(td8button);
        let td9=document.createElement("td");
        tr.appendChild(td9);
        if (isJSON(hr.PE)){
          td8button.textContent="編輯問卷";
          td9.innerHTML="已填寫";
        } else {
          td8button.textContent="新增問卷";
          td9.innerHTML="未填寫";
        }
        td8button.addEventListener("click", ()=>{
          generaterecordmodal(pr,hr)
          openModal()
        })
      }
    }
    function isJSON(str) {
      try {
          JSON.parse(str);
          return true;
      } catch (e) {
          return false;
      }
    }
    function generaterecordmodal(pr,hr){
      cleanform();
      if (isJSON(hr.PE)){
        loadForm(JSON.parse(hr.PE))
      } else {
        loadbasic(pr,hr)
      }
      console.log(pr)
      console.log(hr)
    }
    function loadbasic(pr,hr) {
      setValue('clinicName', hr.clinicName);
      setValue('clinicCode', hr.clinicCode);
      setValue('name', pr.name);
      setValue('d001', pr.name);
      setValue('personalId', pr.personalId);
      setValue('birthday', pr.birthday.replaceAll("-", ""));
      setValue('gender',pr.gender=="男"?"1":"2");
      setValue('d002',pr.gender=="男"?"1":"2");
      if (pr.visitTypeName.includes("收案")){
        setValue('d003',"0");
      } else if (pr.visitTypeName.includes("追蹤")){
        setValue('d003',"1");
      } else if (pr.visitTypeName.includes("年度")){
        setValue('d003',"2");
      }
      setValue('checkdate', "");
      setValue('explainDate', pr.treatmentDate);
      setValue('d004', pr.treatmentDate.replaceAll("-", ""));
      setValue('followDate', addMonths(pr.treatmentDate, 3));
      setValue('registrationId', pr.registrationId);
      setValue('healthRecordId', pr.healthRecordId);
    }

    function cleanform() {
      setValue('clinicName', "");
      setValue('clinicCode', "");
      setValue('name', "");
      setValue('personalId', "");
      setValue('birthday', "");
      setValue('gender',"");
      setValue('checkdate', "");
      setValue('explainDate', "");
      setValue('followDate', "");
      setValue('registrationId', "");
      setValue('healthRecordId', "");
      for (var i = 1; i <= 98; i++) {
        var key = 'd' + String(i).padStart(3, '0');
        setValue(key, "");
      }
    }


    function getDateRange(start, end) {
      let result = []
      let current = new Date(start)
      let endDate = new Date(end)
      while (current <= endDate) {
          let yyyy = current.getFullYear()
          let mm = String(current.getMonth() + 1).padStart(2, '0')
          let dd = String(current.getDate()).padStart(2, '0')
          result.push(yyyy + '-' + mm + '-' + dd)
          // +1 天
          current.setDate(current.getDate() + 1)
      }
      return result
    }
    function querybyid(queryid){
      let xhr = new XMLHttpRequest();
      let apiurl="https://phpcis.chshb.gov.tw/api/v1/registrations/list?personalId="+queryid;
      xhr.open("GET", apiurl, false);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send();
      let apires=JSON.parse(xhr.responseText).result;
      if (apires.length==0){
        alert("無掛號紀錄")
        return
      }
      let preresult=[];
      let healthRecordIdarray=[];
      for (let i=0;i<apires.length;i++){
        let r=apires[i];
        if (r.visitType.includes("代謝_")){
          let tempitem={};
          tempitem.birthday=r.birthday;
          tempitem.bureauRecordNo=r.bureauRecordNo;
          tempitem.gender=r.gender=="1"?"男":"女";
          tempitem.healthRecordId=r.healthRecordId;
          tempitem.name=r.name;
          tempitem.personalId=r.personalId;
          tempitem.recordNo=r.recordNo;
          tempitem.registrationId=r.registrationId;
          tempitem.sequenceNo=r.sequenceNo;
          tempitem.treatmentDate=r.treatmentDate;
          tempitem.visitTypeCode=r.visitTypeCode;
          tempitem.visitTypeName=r.visitType;
          preresult.push(tempitem)
          healthRecordIdarray.push(r.healthRecordId);
        }
      }
      let hrres=gethealthrecord(healthRecordIdarray);
      rendertable(preresult,hrres);
      
    }
    
    function addMonths(dateStr, months) {
      var d = new Date(dateStr);
      d.setMonth(d.getMonth() + months);
      return d.toISOString().split("T")[0];
    }

    function decodeBase64(str) {
      const binary = atob(str);
      const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    }

  </script>
</body>
</html>
`
	let newWin = window.open('', '_blank');
	newWin.document.open();
    newWin.document.write(htmls);
    newWin.document.close();
    
}
genmetawindow();


