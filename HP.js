function genhpwindow(){
    let ccc=document.URL;
    if (!ccc.includes("phpcis.chshb.gov.tw")){
        alert("請在PHPCIIS網域中使用")
    }
    if (ccc.includes("login")){
        alert("請登入PHPCIIS後再使用")
    }
    let clinicCode=document.head.innerHTML.split('clinicCode":"')[1].split('"')[0]
    let htmls=String.raw`<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PHPCIIS+HP問卷</title>
  <style>
    * {
      box-sizing: border-box;
      font-family: "Microsoft JhengHei", sans-serif;
    }

    body {
      margin: 0;
      background: #f5f7fb;
      color: #1f2937;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 24px;
    }

    .card {
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
      padding: 20px;
      margin-bottom: 20px;
    }

    h1, h2, h3 {
      margin-top: 0;
    }

    .hint {
      color: #475569;
      font-size: 14px;
      line-height: 1.6;
    }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      margin-bottom: 16px;
    }

    button {
      border: none;
      border-radius: 10px;
      padding: 10px 16px;
      background: #2563eb;
      color: white;
      cursor: pointer;
      font-size: 14px;
    }

    button.secondary {
      background: #475569;
    }

    button.danger {
      background: #dc2626;
    }

    button.success-btn {
      background: #16a34a;
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .tab-btn.active {
      background: #0f172a;
    }

    .tab-panel {
      display: none;
    }

    .tab-panel.active {
      display: block;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
    }

    .field {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 12px;
    }

    .field.full {
      grid-column: 1 / -1;
    }

    label {
      display: block;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .meta {
      display: block;
      font-size: 12px;
      font-weight: 400;
      color: #64748b;
      margin-top: 4px;
      line-height: 1.5;
    }

    input[type="text"],
    input[type="number"],
    textarea {
      width: 100%;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 10px 12px;
      font-size: 14px;
      background: white;
    }

    input:disabled,
    textarea:disabled {
      background: #e2e8f0;
      color: #64748b;
      cursor: not-allowed;
    }

    textarea {
      min-height: 84px;
      resize: vertical;
    }

    .checkbox-group,
    .single-check-group {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 14px;
    }

    .option-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 10px;
      border: 1px solid #cbd5e1;
      border-radius: 999px;
      background: white;
      font-size: 13px;
      cursor: pointer;
      user-select: none;
    }

    .option-chip.is-checked {
      background: #dbeafe;
      border-color: #60a5fa;
    }

    .hidden {
      display: none !important;
    }

    .error {
      color: #b91c1c;
      font-size: 12px;
      margin-top: 8px;
      line-height: 1.5;
    }

    .success {
      color: #166534;
      font-size: 13px;
      margin-top: 8px;
    }

    .warning {
      color: #92400e;
      font-size: 13px;
      margin-top: 8px;
    }

    pre {
      white-space: pre-wrap;
      word-break: break-word;
      background: #0f172a;
      color: #e2e8f0;
      padding: 16px;
      border-radius: 12px;
      overflow: auto;
      font-size: 13px;
      line-height: 1.5;
    }

    .table-wrap {
      overflow: auto;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background: white;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 700px;
    }

    th,
    td {
      border-bottom: 1px solid #e2e8f0;
      padding: 10px 12px;
      text-align: left;
      font-size: 14px;
      vertical-align: middle;
    }

    th {
      background: #f8fafc;
      font-weight: 700;
    }

    .status-done {
      color: #166534;
      font-weight: 700;
    }

    .status-pending {
      color: #92400e;
      font-weight: 700;
    }

    .modal-mask {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.45);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
      z-index: 1000;
    }

    .modal-mask.active {
      display: flex;
    }

    .modal-card {
      width: min(1200px, 100%);
      max-height: calc(100vh - 48px);
      overflow: auto;
      background: white;
      border-radius: 18px;
      box-shadow: 0 12px 36px rgba(15, 23, 42, 0.18);
      padding: 20px;
    }

    .muted {
      color: #64748b;
      font-size: 13px;
    }

    .inline-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    @media (max-width: 1024px) {
      .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 720px) {
      .grid {
        grid-template-columns: 1fr;
      }

      .modal-card {
        padding: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>PHPCIIS+HP問卷</h1>
    </div>

    <div class="card">
      <div class="toolbar">
        <button class="tab-btn active" data-tab="caseListTab">個案列表</button>
        <button class="tab-btn secondary" data-tab="importTab" style="display: none;">表一：個案基本及問卷資料</button>
        <button class="tab-btn secondary" data-tab="deleteTab" style="display: none;">表二：刪除資料</button>
        <button class="tab-btn secondary" data-tab="draftTab">暫存資料</button>
      </div>

      <div id="importTab" class="tab-panel">
        <div id="importForm"></div>
        <div class="toolbar" style="margin-top:16px;">
          <button id="validateImportBtn">檢查資料</button>
          <button id="previewImportBtn" class="secondary" style="display: none;">預覽 CSV</button>
          <button id="downloadImportBtn" style="display: none;">下載 CSV</button>
          <button id="saveDraftBtn" class="success-btn">儲存</button>
          <button id="clearImportBtn" class="danger">清空</button>
        </div>
        <div id="importMessage"></div>
        <pre id="importPreview"></pre>
      </div>

      <div id="deleteTab" class="tab-panel">
        <div id="deleteForm"></div>
        <div class="toolbar" style="margin-top:16px;">
          <button id="previewDeleteBtn" class="secondary">預覽刪除 CSV</button>
          <button id="downloadDeleteBtn">下載刪除 CSV</button>
          <button id="clearDeleteBtn" class="danger">清空</button>
        </div>
        <div id="deleteMessage"></div>
        <pre id="deletePreview"></pre>
      </div>

      <div id="caseListTab" class="tab-panel active">
        <div class="field full">
          <label for="caseListPaste">貼上個案列表</label>
          <span class="meta">支援以 tab 分隔的格式，例如：姓名[tab]身份證號。第一列可有標題，也可沒有。</span>
          <textarea id="caseListPaste" placeholder="姓名	身份證號
王小名	A123456789"></textarea>
        </div>
        <div class="toolbar" style="margin-top:16px;">
          <button id="importCaseListBtn">匯入個案列表</button>
          <button id="clearCaseListBtn" class="danger">清空個案列表</button>
        </div>
        <div id="caseListMessage"></div>
        <div class="table-wrap" style="margin-top:16px;">
          <table>
            <thead>
              <tr>
                <th style="width:72px;">序號</th>
                <th>姓名</th>
                <th>身份證號</th>
                <th style="width:120px;">填寫問卷</th>
                <th style="width:120px;">填寫狀態</th>
              </tr>
            </thead>
            <tbody id="caseListTableBody"></tbody>
          </table>
        </div>
      </div>

      <div id="draftTab" class="tab-panel">
        <div class="toolbar">
          <button id="downloadAllQuestionnaireCsvBtn">匯出全部問卷 CSV</button>
          <button id="downloadDraftCsvBtn">下載暫存 CSV</button>
          <button id="importDraftCsvBtn" class="secondary">匯入 CSV 暫存</button>
          <input id="draftCsvFileInput" type="file" accept=".csv,text/csv" class="hidden" />
          <button id="clearDraftsBtn" class="danger">清空暫存資料</button>
        </div>
        <div id="draftMessage"></div>
        <div class="table-wrap" style="margin-top:16px;">
          <table>
            <thead>
              <tr>
                <th style="width:72px;">序號</th>
                <th>姓名</th>
                <th>身分證</th>
                <th>CSV 摘要</th>
                <th style="width:120px;">狀態</th>
              </tr>
            </thead>
            <tbody id="draftTableBody"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div id="questionnaireModal" class="modal-mask">
    <div class="modal-card">
      <div class="toolbar">
        <h2 style="margin:0;">填寫問卷</h2>
        <button id="closeModalBtn" class="secondary" style="margin-left:auto;">關閉</button>
      </div>
      <div class="muted" id="currentCaseInfo"></div>
      <div style="margin-top:16px;" id="modalImportForm"></div>
      <div class="toolbar" style="margin-top:16px;">
        <button id="validateModalImportBtn">檢查資料</button>
        <button id="previewModalImportBtn" class="secondary" style="display: none;">預覽 CSV</button>
        <button id="saveModalDraftBtn" class="success-btn">儲存</button>
        <button id="clearModalImportBtn" class="danger">清空</button>
        <button id="closeModalBtn2" class="secondary">關閉</button>
      </div>
      <div id="modalImportMessage"></div>
      <pre id="modalImportPreview"></pre>
    </div>
  </div>

  <script>
    const importFields = [
      { no: 1, key: 'payment_type', label: '支付方式', type: 'singlecheck', required: true, options: [['1', '1：預防保健'], ['2', '2：健保醫療給付'], ['3', '3：其他公務預算補助'], ['4', '4：自費健康檢查'], ['9', '9：其他']], note: '長度 1' },
      { no: 2, key: 'sample_org_code', label: '採檢單位代碼', type: 'text', required: true, maxLength: 10, note: '特約醫事機構代碼' },
      { no: 3, key: 'name', label: '姓名', type: 'text', required: true, maxLength: 200 },
      { no: 4, key: 'gender', label: '性別', type: 'singlecheck', required: true, options: [['1', '1：男'], ['2', '2：女']] },
      { no: 5, key: 'aboriginal', label: '原住民', type: 'singlecheck', required: false, options: [['0', '0：否'], ['1', '1：是']] },
      { no: 6, key: 'aboriginal_group', label: '原住民族', type: 'singlecheck', required: false, options: [['1', '1：阿美族'], ['2', '2：排灣族'], ['3', '3：布農族'], ['4', '4：卑南族'], ['5', '5：達悟/雅美族'], ['6', '6：魯凱族'], ['7', '7：泰雅族'], ['8', '8：太魯閣族'], ['9', '9：賽德克族'], ['10', '10：鄒族'], ['11', '11：賽夏族'], ['12', '12：噶瑪蘭族'], ['13', '13：撒奇萊雅族'], ['14', '14：邵族'], ['15', '15：拉阿魯哇族'], ['16', '16：卡那卡那富族'], ['99', '99：其他']], showWhen: { field: 'aboriginal', values: ['1'] } },
      { no: 7, key: 'idno', label: '身分證字號或居留證號(外籍)', type: 'text', required: true, maxLength: 10, note: '大寫半型英數，如 A123456789' },
      { no: 8, key: 'birth_ymd', label: '出生日期', type: 'text', required: true, maxLength: 7, note: 'YYYMMDD，例如 0380202' },
      { no: 9, key: 'visit_ymd', label: '門診日期', type: 'text', required: true, maxLength: 7, note: 'YYYMMDD，例如 0990201' },
      { no: 10, key: 'tel', label: '聯絡電話', type: 'text', required: false, maxLength: 20, note: '與手機擇一必填，例如 (02)34567890#123' },
      { no: 11, key: 'mobile', label: '手機', type: 'text', required: false, maxLength: 10, note: '與聯絡電話擇一必填' },
      { no: 12, key: 'religion', label: '宗教', type: 'singlecheck', required: false, options: [['1', '1：無'], ['2', '2：天主教'], ['3', '3：基督教'], ['4', '4：佛教'], ['5', '5：道教'], ['6', '6：一貫道'], ['9', '9：其他']] },
      { no: 13, key: 'religion_other', label: '宗教-其他', type: 'text', required: false, maxLength: 50, showWhen: { field: 'religion', values: ['9'] } },
      { no: 14, key: 'town_code', label: '鄉鎮市區代碼', type: 'text', required: true, maxLength: 4, note: '非郵遞區號' },
      { no: 15, key: 'address', label: '地址', type: 'text', required: true, maxLength: 60 },
      { no: 16, key: 'education', label: '教育', type: 'singlecheck', required: true, options: [['1', '1：無'], ['2', '2：小學'], ['3', '3：國(初)中'], ['4', '4：高中(職)'], ['5', '5：專科、大學'], ['6', '6：研究所以上'], ['7', '7：拒答']] },
      { no: 17, key: 'job_flag', label: '職業', type: 'singlecheck', required: false, options: [['0', '0：無'], ['1', '1：有'], ['2', '2：拒答']] },
      { no: 18, key: 'job_desc', label: '職業-描述', type: 'text', required: false, maxLength: 50, showWhen: { field: 'job_flag', values: ['1'] } },
      { no: 19, key: 'marital', label: '婚姻狀況', type: 'singlecheck', required: false, options: [['1', '1：未婚'], ['2', '2：已婚'], ['9', '9：其他']] },
      { no: 20, key: 'personal_history', label: '個人病史', type: 'checkbox', required: true, options: [['1', '1：無'], ['2', '2：胃炎'], ['3', '3：胃潰瘍'], ['4', '4：十二指腸潰瘍'], ['5', '5：胃食道逆流'], ['6', '6：胃腫瘤'], ['7', '7：胃癌'], ['8', '8：胃幽門桿菌感染'], ['9', '9：其他']], full: true },
      { no: 21, key: 'personal_history_other', label: '個人病史-其他描述', type: 'text', required: false, maxLength: 10, showWhenIncludes: { field: 'personal_history', values: ['9'] } },
      { no: 22, key: 'personal_history_year', label: '個人病史-民國年', type: 'text', required: false, maxLength: 3, note: 'YYY，例如 110', showWhenNotIncludes: { field: 'personal_history', values: ['1'] } },
      { no: 23, key: 'personal_history_year_unknown', label: '個人病史-民國年-不詳', type: 'singlecheck', required: false, options: [['T', 'T：勾選']], showWhenNotIncludes: { field: 'personal_history', values: ['1'] } },
      { no: 24, key: 'h_pylori_treatment', label: '曾接受胃幽門桿菌除菌治療', type: 'singlecheck', required: true, options: [['0', '0：無'], ['1', '1：有']] },
      { no: 25, key: 'endoscopy_done', label: '曾接受過胃鏡檢查', type: 'singlecheck', required: true, options: [['0', '0：無'], ['1', '1：有']] },
      { no: 26, key: 'endoscopy_year', label: '曾接受過胃鏡檢查-民國年', type: 'text', required: false, maxLength: 3, showWhen: { field: 'endoscopy_done', values: ['1'] } },
      { no: 27, key: 'endoscopy_year_unknown', label: '曾接受過胃鏡檢查-民國年-不詳', type: 'singlecheck', required: false, options: [['T', 'T：勾選']], showWhen: { field: 'endoscopy_done', values: ['1'] } },
      { no: 28, key: 'recent_ulcer_reflux_drug', label: '近一個月內是否使用潰瘍/胃食道逆流特效藥', type: 'singlecheck', required: true, options: [['0', '0：無'], ['1', '1：有']] },
      { no: 29, key: 'drug_allergy', label: '藥物過敏', type: 'singlecheck', required: true, options: [['0', '0：無'], ['1', '1：有']] },
      { no: 30, key: 'drug_allergy_name', label: '過敏藥物-名稱', type: 'text', required: false, maxLength: 50, showWhen: { field: 'drug_allergy', values: ['1'] } },
      { no: 31, key: 'family_h_pylori', label: '幽門桿菌家族史', type: 'singlecheck', required: true, options: [['0', '0：無'], ['1', '1：有'], ['2', '2：不詳']] },
      { no: 32, key: 'family_h_pylori_member', label: '幽門桿菌家族成員', type: 'checkbox', required: false, options: [['1', '1：父親'], ['2', '2：母親'], ['3', '3：夫妻'], ['4', '4：兄弟姊妹'], ['5', '5：子女'], ['9', '9：其他']], full: true, showWhen: { field: 'family_h_pylori', values: ['1'] } },
      { no: 33, key: 'family_h_pylori_sibling_count', label: '幽門桿菌家族成員數-兄弟姊妹', type: 'text', required: false, maxLength: 2, showWhenIncludes: { field: 'family_h_pylori_member', values: ['4'] } },
      { no: 34, key: 'family_h_pylori_child_count', label: '幽門桿菌家族成員數-子女', type: 'text', required: false, maxLength: 2, showWhenIncludes: { field: 'family_h_pylori_member', values: ['5'] } },
      { no: 35, key: 'family_h_pylori_other_desc', label: '幽門桿菌家族成員-其他-描述', type: 'text', required: false, maxLength: 50, showWhenIncludes: { field: 'family_h_pylori_member', values: ['9'] } },
      { no: 36, key: 'family_h_pylori_other_count', label: '幽門桿菌家族成員數-其他', type: 'text', required: false, maxLength: 2, showWhenIncludes: { field: 'family_h_pylori_member', values: ['9'] } },
      { no: 37, key: 'family_ulcer', label: '消化性潰瘍家族史', type: 'singlecheck', required: true, options: [['0', '0：無'], ['1', '1：有'], ['2', '2：不詳']] },
      { no: 38, key: 'family_ulcer_member', label: '消化性潰瘍家族成員', type: 'checkbox', required: false, options: [['1', '1：父親'], ['2', '2：母親'], ['3', '3：夫妻'], ['4', '4：兄弟姊妹'], ['5', '5：子女'], ['9', '9：其他']], full: true, showWhen: { field: 'family_ulcer', values: ['1'] } },
      { no: 39, key: 'family_ulcer_sibling_count', label: '消化性潰瘍家族成員數-兄弟姊妹', type: 'text', required: false, maxLength: 2, showWhenIncludes: { field: 'family_ulcer_member', values: ['4'] } },
      { no: 40, key: 'family_ulcer_child_count', label: '消化性潰瘍家族成員數-子女', type: 'text', required: false, maxLength: 2, showWhenIncludes: { field: 'family_ulcer_member', values: ['5'] } },
      { no: 41, key: 'family_ulcer_other_desc', label: '消化性潰瘍家族成員-其他-描述', type: 'text', required: false, maxLength: 50, showWhenIncludes: { field: 'family_ulcer_member', values: ['9'] } },
      { no: 42, key: 'family_ulcer_other_count', label: '消化性潰瘍家族成員數-其他', type: 'text', required: false, maxLength: 2, showWhenIncludes: { field: 'family_ulcer_member', values: ['9'] } },
      { no: 43, key: 'family_cancer', label: '胃癌家族史', type: 'singlecheck', required: true, options: [['0', '0：無'], ['1', '1：有'], ['2', '2：不詳']] },
      { no: 44, key: 'family_cancer_member', label: '胃癌家族成員', type: 'checkbox', required: false, options: [['1', '1：父親'], ['2', '2：母親'], ['3', '3：夫妻'], ['4', '4：兄弟姊妹'], ['5', '5：子女'], ['9', '9：其他']], full: true, showWhen: { field: 'family_cancer', values: ['1'] } },
      { no: 45, key: 'family_cancer_sibling_count', label: '胃癌家族成員數-兄弟姊妹', type: 'text', required: false, maxLength: 2, showWhenIncludes: { field: 'family_cancer_member', values: ['4'] } },
      { no: 46, key: 'family_cancer_sibling_unknown', label: '胃癌家族成員數-兄弟姊妹-不詳', type: 'singlecheck', required: false, options: [['T', 'T：勾選']], showWhenIncludes: { field: 'family_cancer_member', values: ['4'] } },
      { no: 47, key: 'family_cancer_child_count', label: '胃癌家族成員數-子女', type: 'text', required: false, maxLength: 2, showWhenIncludes: { field: 'family_cancer_member', values: ['5'] } },
      { no: 48, key: 'family_cancer_child_unknown', label: '胃癌家族成員數-子女-不詳', type: 'singlecheck', required: false, options: [['T', 'T：勾選']], showWhenIncludes: { field: 'family_cancer_member', values: ['5'] } },
      { no: 49, key: 'family_cancer_other_desc', label: '胃癌家族成員-其他-描述', type: 'text', required: false, maxLength: 50, showWhenIncludes: { field: 'family_cancer_member', values: ['9'] } },
      { no: 50, key: 'family_cancer_other_count', label: '胃癌家族成員數-其他', type: 'text', required: false, maxLength: 2, showWhenIncludes: { field: 'family_cancer_member', values: ['9'] } },
      { no: 51, key: 'family_cancer_other_unknown', label: '胃癌家族成員數-其他-不詳', type: 'singlecheck', required: false, options: [['T', 'T：勾選']], showWhenIncludes: { field: 'family_cancer_member', values: ['9'] } },
      { no: 52, key: 'recent_drug_flag', label: '最近三個月有無服用下列藥物', type: 'singlecheck', required: false, options: [['0', '0：無'], ['1', '1：有']] },
      { no: 53, key: 'recent_drug_types', label: '最近三個月有無服用下列藥物類別', type: 'checkbox', required: false, options: [['1', '1：止痛藥'], ['2', '2：類固醇'], ['3-1', '3-1：抗血小板藥物(阿斯匹靈)'], ['3-2', '3-2：抗血小板藥物(保栓通)'], ['3-3', '3-3：抗血小板藥物(其他)'], ['4-1', '4-1：抗凝血劑(可邁丁)'], ['4-2', '4-2：抗凝血劑(其他)'], ['5-1', '5-1：糖尿病用藥(口服型)'], ['5-2', '5-2：糖尿病用藥(注射型)'], ['6', '6：使用鐵劑治療貧血']], full: true, showWhen: { field: 'recent_drug_flag', values: ['1'] } },
      { no: 54, key: 'recent_drug_type_33_desc', label: '藥物類別-3-3：抗血小板藥物(其他)-敘述', type: 'text', required: false, maxLength: 50, showWhenIncludes: { field: 'recent_drug_types', values: ['3-3'] } },
      { no: 55, key: 'recent_drug_type_42_desc', label: '藥物類別-4-2：抗凝血劑(其他)-敘述', type: 'text', required: false, maxLength: 50, showWhenIncludes: { field: 'recent_drug_types', values: ['4-2'] } },
      { no: 56, key: 'smoking', label: '吸菸習慣', type: 'singlecheck', required: false, options: [['0', '0：從不'], ['1', '1：已戒'], ['2', '2：目前有'], ['9', '9：其他']] },
      { no: 57, key: 'smoking_other', label: '吸菸習慣-其他描述', type: 'text', required: false, maxLength: 20, showWhen: { field: 'smoking', values: ['9'] } },
      { no: 58, key: 'drinking', label: '飲酒習慣', type: 'singlecheck', required: false, options: [['0', '0：從不'], ['1', '1：已戒'], ['2', '2：目前有'], ['9', '9：其他']] },
      { no: 59, key: 'drinking_other', label: '飲酒習慣-其他描述', type: 'text', required: false, maxLength: 20, showWhen: { field: 'drinking', values: ['9'] } },
      { no: 60, key: 'betel', label: '嚼檳榔習慣', type: 'singlecheck', required: false, options: [['0', '0：從不'], ['1', '1：已戒'], ['2', '2：目前有'], ['9', '9：其他']] },
      { no: 61, key: 'betel_other', label: '嚼檳榔習慣-其他描述', type: 'text', required: false, maxLength: 20, showWhen: { field: 'betel', values: ['9'] } },
      { no: 62, key: 'pickled_food', label: '每週3次以上食用醃漬食物習慣', type: 'singlecheck', required: false, options: [['0', '0：無'], ['1', '1：有']] },
      { no: 63, key: 'bbq_spicy_food', label: '每週3次以上食用煙燻、燒烤、高香料肉類習慣', type: 'singlecheck', required: false, options: [['0', '0：無'], ['1', '1：有']] },
      { no: 64, key: 'raw_food', label: '每週3次以上食用生食習慣', type: 'singlecheck', required: false, options: [['0', '0：無'], ['1', '1：有']] }
    ];

    const deleteFields = [
      { no: 1, key: 'del_idno', label: '身分證統一編號或統一證號(外籍)', type: 'text', required: true, maxLength: 10 },
      { no: 2, key: 'del_org_code', label: '檢查醫療院所代碼', type: 'text', required: true, maxLength: 10 },
      { no: 3, key: 'del_visit_ymd', label: '門診日期', type: 'text', required: true, maxLength: 7, note: 'YYYMMDD' }
    ];

    const eitherOrPairs = [
      { textKey: 'personal_history_year', unknownKey: 'personal_history_year_unknown' },
      { textKey: 'endoscopy_year', unknownKey: 'endoscopy_year_unknown' },
      { textKey: 'family_cancer_sibling_count', unknownKey: 'family_cancer_sibling_unknown' },
      { textKey: 'family_cancer_child_count', unknownKey: 'family_cancer_child_unknown' },
      { textKey: 'family_cancer_other_count', unknownKey: 'family_cancer_other_unknown' }
    ];

    const siteid="please_change_me";

    let currentEditingCaseId = '';
    let caseList = [];
    let draftRecords = [];

    function renderFields(containerId, fields, prefix) {
      const root = document.getElementById(containerId);
      root.innerHTML = '';
      const grid = document.createElement('div');
      grid.className = 'grid';

      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const wrapper = document.createElement('div');
        wrapper.className = 'field' + (field.full ? ' full' : '');
        wrapper.dataset.fieldKey = field.key;
        wrapper.id = prefix + field.key + '_wrapper';

        const label = document.createElement('label');
        label.htmlFor = prefix + field.key;
        label.innerHTML = field.no + '. ' + field.label + (field.required ? ' *' : '') + '<span class="meta">' + (field.note || '') + '</span>';
        wrapper.appendChild(label);

        let input = null;

        if (field.type === 'text' || field.type === 'number') {
          input = document.createElement('input');
          input.type = 'text';
          input.id = prefix + field.key;
          input.dataset.fieldKey = field.key;
          if (field.maxLength) {
            input.maxLength = field.maxLength;
          }
          wrapper.appendChild(input);
        }

        if (field.type === 'checkbox' || field.type === 'singlecheck') {
          input = document.createElement('div');
          input.className = field.type === 'checkbox' ? 'checkbox-group' : 'single-check-group';
          input.dataset.fieldKey = field.key;

          for (let j = 0; j < field.options.length; j++) {
            const opt = field.options[j];
            const chip = document.createElement('label');
            chip.className = 'option-chip';

            const box = document.createElement('input');
            box.type = 'checkbox';
            box.value = opt[0];
            box.name = field.type === 'checkbox' ? (prefix + field.key) : (prefix + field.key + '_single');
            box.dataset.fieldKey = field.key;
            if (field.type === 'singlecheck') {
              box.dataset.singlecheck = '1';
            }
            box.id = prefix + field.key + '_' + j;

            const text = document.createElement('span');
            text.textContent = opt[1];

            chip.appendChild(box);
            chip.appendChild(text);
            input.appendChild(chip);
          }

          wrapper.appendChild(input);
        }

        const error = document.createElement('div');
        error.className = 'error';
        error.id = prefix + field.key + '_error';
        wrapper.appendChild(error);

        grid.appendChild(wrapper);
      }

      root.appendChild(grid);
    }

    function findFieldByKey(fields, key) {
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].key === key) {
          return fields[i];
        }
      }
      return null;
    }

    function updateSingleCheckStyles(prefix, key) {
      const nodes = document.querySelectorAll('input[name="' + prefix + key + '_single"]');
      for (let i = 0; i < nodes.length; i++) {
        const chip = nodes[i].closest('.option-chip');
        if (chip) {
          chip.classList.toggle('is-checked', nodes[i].checked);
        }
      }
    }

    function updateMultiCheckStyles(prefix, key) {
      const nodes = document.querySelectorAll('input[name="' + prefix + key + '"]');
      for (let i = 0; i < nodes.length; i++) {
        const chip = nodes[i].closest('.option-chip');
        if (chip) {
          chip.classList.toggle('is-checked', nodes[i].checked);
        }
      }
    }

    function getFieldValue(key, prefix, fields) {
      const field = findFieldByKey(fields, key);
      if (!field) {
        return '';
      }

      if (field.type === 'checkbox') {
        const checked = document.querySelectorAll('input[name="' + prefix + key + '"]:checked');
        const result = [];
        for (let i = 0; i < checked.length; i++) {
          result.push(checked[i].value);
        }
        return result;
      }

      if (field.type === 'singlecheck') {
        const checked = document.querySelector('input[name="' + prefix + key + '_single"]:checked');
        return checked ? checked.value : '';
      }

      const el = document.getElementById(prefix + key);
      return el ? el.value.trim() : '';
    }

    function setFieldValue(key, prefix, fields, value) {
      const field = findFieldByKey(fields, key);
      if (!field) {
        return;
      }

      if (field.type === 'checkbox') {
        const values = Array.isArray(value) ? value : (String(value || '').split('、').filter(Boolean));
        const nodes = document.querySelectorAll('input[name="' + prefix + key + '"]');
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].checked = values.includes(nodes[i].value);
        }
        updateMultiCheckStyles(prefix, key);
        return;
      }

      if (field.type === 'singlecheck') {
        const nodes = document.querySelectorAll('input[name="' + prefix + key + '_single"]');
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].checked = String(value || '') === nodes[i].value;
        }
        updateSingleCheckStyles(prefix, key);
        return;
      }

      const el = document.getElementById(prefix + key);
      if (el) {
        el.value = value || '';
      }
    }

    function arrayIncludesAny(values, targets) {
      for (let i = 0; i < targets.length; i++) {
        if (values.includes(targets[i])) {
          return true;
        }
      }
      return false;
    }

    function isVisible(field, prefix, fields) {
      if (field.showWhen) {
        const value = getFieldValue(field.showWhen.field, prefix, fields);
        if (!field.showWhen.values.includes(value)) {
          return false;
        }
      }

      if (field.showWhenIncludes) {
        const values = getFieldValue(field.showWhenIncludes.field, prefix, fields);
        if (!arrayIncludesAny(values, field.showWhenIncludes.values)) {
          return false;
        }
      }

      if (field.showWhenNotIncludes) {
        const values = getFieldValue(field.showWhenNotIncludes.field, prefix, fields);
        if (arrayIncludesAny(values, field.showWhenNotIncludes.values)) {
          return false;
        }
      }

      return true;
    }

    function clearFieldValue(field, prefix) {
      if (field.type === 'checkbox') {
        const nodes = document.querySelectorAll('input[name="' + prefix + field.key + '"]');
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].checked = false;
        }
        updateMultiCheckStyles(prefix, field.key);
        return;
      }

      if (field.type === 'singlecheck') {
        const nodes = document.querySelectorAll('input[name="' + prefix + field.key + '_single"]');
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].checked = false;
        }
        updateSingleCheckStyles(prefix, field.key);
        return;
      }

      const el = document.getElementById(prefix + field.key);
      if (el) {
        el.value = '';
      }
    }

    function clearAllErrors(prefix, fields) {
      for (let i = 0; i < fields.length; i++) {
        const err = document.getElementById(prefix + fields[i].key + '_error');
        if (err) {
          err.textContent = '';
        }
      }
    }

    function setFieldDisabled(field, prefix, disabled) {
      if (!field) {
        return;
      }

      if (field.type === 'checkbox') {
        const nodes = document.querySelectorAll('input[name="' + prefix + field.key + '"]');
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].disabled = disabled;
        }
        return;
      }

      if (field.type === 'singlecheck') {
        const nodes = document.querySelectorAll('input[name="' + prefix + field.key + '_single"]');
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].disabled = disabled;
        }
        return;
      }

      const el = document.getElementById(prefix + field.key);
      if (el) {
        el.disabled = disabled;
      }
    }

    function refreshEitherOrPair(prefix, fields, textKey, unknownKey) {
      const textField = findFieldByKey(fields, textKey);
      const unknownField = findFieldByKey(fields, unknownKey);
      if (!textField || !unknownField) {
        return;
      }

      const textWrapper = document.getElementById(prefix + textKey + '_wrapper');
      const unknownWrapper = document.getElementById(prefix + unknownKey + '_wrapper');
      if (!textWrapper || !unknownWrapper) {
        return;
      }

      const textVisible = !textWrapper.classList.contains('hidden');
      const unknownVisible = !unknownWrapper.classList.contains('hidden');

      if (!textVisible || !unknownVisible) {
        setFieldDisabled(textField, prefix, false);
        setFieldDisabled(unknownField, prefix, false);
        return;
      }

      const textEl = document.getElementById(prefix + textKey);
      const unknownValue = getFieldValue(unknownKey, prefix, fields);
      if (!textEl) {
        return;
      }

      const textHasValue = textEl.value.trim() !== '';
      const unknownChecked = unknownValue === 'T';

      if (textHasValue) {
        clearFieldValue(unknownField, prefix);
        setFieldDisabled(unknownField, prefix, true);
        textEl.disabled = false;
      } else {
        setFieldDisabled(unknownField, prefix, false);
      }

      if (unknownChecked) {
        textEl.value = '';
        textEl.disabled = true;
        setFieldDisabled(unknownField, prefix, false);
      } else if (!textHasValue) {
        textEl.disabled = false;
      }
    }

    function refreshAllEitherOr(prefix, fields) {
      for (let i = 0; i < eitherOrPairs.length; i++) {
        refreshEitherOrPair(prefix, fields, eitherOrPairs[i].textKey, eitherOrPairs[i].unknownKey);
      }
    }

    function refreshVisibility(prefix, fields) {
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const wrapper = document.getElementById(prefix + field.key + '_wrapper');
        if (!wrapper) {
          continue;
        }

        const visible = isVisible(field, prefix, fields);
        wrapper.classList.toggle('hidden', !visible);

        if (!visible) {
          clearFieldValue(field, prefix);
          setFieldDisabled(field, prefix, false);
          const err = document.getElementById(prefix + field.key + '_error');
          if (err) {
            err.textContent = '';
          }
        }
      }

      refreshAllEitherOr(prefix, fields);
    }

    function bindVisibility(prefix, fields) {
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];

        if (field.type === 'checkbox') {
          const nodes = document.querySelectorAll('input[name="' + prefix + field.key + '"]');
          for (let j = 0; j < nodes.length; j++) {
            nodes[j].addEventListener('change', function () {
              updateMultiCheckStyles(prefix, field.key);
              refreshVisibility(prefix, fields);
            });
          }
          continue;
        }

        if (field.type === 'singlecheck') {
          const nodes = document.querySelectorAll('input[name="' + prefix + field.key + '_single"]');
          for (let j = 0; j < nodes.length; j++) {
            nodes[j].addEventListener('change', function () {
              if (this.checked) {
                for (let k = 0; k < nodes.length; k++) {
                  if (nodes[k] !== this) {
                    nodes[k].checked = false;
                  }
                }
              }
              updateSingleCheckStyles(prefix, field.key);
              refreshVisibility(prefix, fields);
            });
          }
          continue;
        }

        const el = document.getElementById(prefix + field.key);
        if (el) {
          el.addEventListener('input', function () {
            refreshVisibility(prefix, fields);
          });
          el.addEventListener('change', function () {
            refreshVisibility(prefix, fields);
          });
        }
      }
    }

    function bindEitherOr(prefix, fields, textKey, unknownKey) {
      const textEl = document.getElementById(prefix + textKey);
      if (!textEl) {
        return;
      }

      textEl.addEventListener('input', function () {
        refreshEitherOrPair(prefix, fields, textKey, unknownKey);
      });
      textEl.addEventListener('change', function () {
        refreshEitherOrPair(prefix, fields, textKey, unknownKey);
      });

      const unknownNodes = document.querySelectorAll('input[name="' + prefix + unknownKey + '_single"]');
      for (let i = 0; i < unknownNodes.length; i++) {
        unknownNodes[i].addEventListener('change', function () {
          refreshEitherOrPair(prefix, fields, textKey, unknownKey);
        });
      }
    }

    function validateEitherOrExclusive(prefix, fields, textKey, unknownKey, textMsg, unknownMsg) {
      const textEl = document.getElementById(prefix + textKey);
      const textWrapper = document.getElementById(prefix + textKey + '_wrapper');
      const unknownWrapper = document.getElementById(prefix + unknownKey + '_wrapper');

      if (!textEl || !textWrapper || !unknownWrapper) {
        return true;
      }

      if (textWrapper.classList.contains('hidden') || unknownWrapper.classList.contains('hidden')) {
        return true;
      }

      const textHasValue = textEl.value.trim() !== '';
      const unknownChecked = getFieldValue(unknownKey, prefix, fields) === 'T';

      if (textHasValue && unknownChecked) {
        document.getElementById(prefix + textKey + '_error').textContent = textMsg;
        document.getElementById(prefix + unknownKey + '_error').textContent = unknownMsg;
        return false;
      }

      return true;
    }

    function validate(prefix, fields, messageId) {
      let ok = true;
      clearAllErrors(prefix, fields);

      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (!isVisible(field, prefix, fields)) {
          continue;
        }

        const value = getFieldValue(field.key, prefix, fields);
        const error = document.getElementById(prefix + field.key + '_error');

        if (field.required) {
          const empty = Array.isArray(value) ? value.length === 0 : value === '';
          if (empty) {
            ok = false;
            if (error) {
              error.textContent = '此欄位為必填';
            }
            continue;
          }
        }

        if (field.maxLength && !Array.isArray(value) && String(value).length > field.maxLength) {
          ok = false;
          if (error) {
            error.textContent = '長度不可超過 ' + field.maxLength;
          }
        }
      }

      const isImportForm = fields === importFields;

      if (isImportForm) {
        const tel = getFieldValue('tel', prefix, fields);
        const mobile = getFieldValue('mobile', prefix, fields);
        if (tel === '' && mobile === '') {
          ok = false;
          document.getElementById(prefix + 'tel_error').textContent = '聯絡電話與手機擇一必填';
          document.getElementById(prefix + 'mobile_error').textContent = '聯絡電話與手機擇一必填';
        }

        if (getFieldValue('religion', prefix, fields) === '9' && getFieldValue('religion_other', prefix, fields) === '') {
          ok = false;
          document.getElementById(prefix + 'religion_other_error').textContent = '宗教為 9 時，此欄位必填';
        }

        if (getFieldValue('job_flag', prefix, fields) === '1' && getFieldValue('job_desc', prefix, fields) === '') {
          ok = false;
          document.getElementById(prefix + 'job_desc_error').textContent = '職業為 1 時，此欄位必填';
        }

        const personalHistory = getFieldValue('personal_history', prefix, fields);
        if (personalHistory.includes('9') && getFieldValue('personal_history_other', prefix, fields) === '') {
          ok = false;
          document.getElementById(prefix + 'personal_history_other_error').textContent = '個人病史含 9 時，此欄位必填';
        }
        if (!personalHistory.includes('1')) {
          if (getFieldValue('personal_history_year', prefix, fields) === '' && getFieldValue('personal_history_year_unknown', prefix, fields) === '') {
            ok = false;
            document.getElementById(prefix + 'personal_history_year_error').textContent = '民國年與不詳擇一必填';
            document.getElementById(prefix + 'personal_history_year_unknown_error').textContent = '民國年與不詳擇一必填';
          }
        }
        if (!validateEitherOrExclusive(prefix, fields, 'personal_history_year', 'personal_history_year_unknown', '民國年與不詳只能擇一', '民國年與不詳只能擇一')) {
          ok = false;
        }

        if (getFieldValue('endoscopy_done', prefix, fields) === '1') {
          if (getFieldValue('endoscopy_year', prefix, fields) === '' && getFieldValue('endoscopy_year_unknown', prefix, fields) === '') {
            ok = false;
            document.getElementById(prefix + 'endoscopy_year_error').textContent = '民國年與不詳擇一必填';
            document.getElementById(prefix + 'endoscopy_year_unknown_error').textContent = '民國年與不詳擇一必填';
          }
        }
        if (!validateEitherOrExclusive(prefix, fields, 'endoscopy_year', 'endoscopy_year_unknown', '民國年與不詳只能擇一', '民國年與不詳只能擇一')) {
          ok = false;
        }

        if (getFieldValue('drug_allergy', prefix, fields) === '1' && getFieldValue('drug_allergy_name', prefix, fields) === '') {
          ok = false;
          document.getElementById(prefix + 'drug_allergy_name_error').textContent = '藥物過敏為 1 時，此欄位必填';
        }

        if (getFieldValue('recent_drug_flag', prefix, fields) === '1') {
          const recentDrugTypes = getFieldValue('recent_drug_types', prefix, fields);
          if (recentDrugTypes.length === 0) {
            ok = false;
            document.getElementById(prefix + 'recent_drug_types_error').textContent = '有服藥時，請至少勾選一種類別';
          }
        }

        const familyCancerMember = getFieldValue('family_cancer_member', prefix, fields);
        if (familyCancerMember.includes('4')) {
          if (getFieldValue('family_cancer_sibling_count', prefix, fields) === '' && getFieldValue('family_cancer_sibling_unknown', prefix, fields) === '') {
            ok = false;
            document.getElementById(prefix + 'family_cancer_sibling_count_error').textContent = '人數與不詳擇一必填';
            document.getElementById(prefix + 'family_cancer_sibling_unknown_error').textContent = '人數與不詳擇一必填';
          }
        }
        if (!validateEitherOrExclusive(prefix, fields, 'family_cancer_sibling_count', 'family_cancer_sibling_unknown', '人數與不詳只能擇一', '人數與不詳只能擇一')) {
          ok = false;
        }

        if (familyCancerMember.includes('5')) {
          if (getFieldValue('family_cancer_child_count', prefix, fields) === '' && getFieldValue('family_cancer_child_unknown', prefix, fields) === '') {
            ok = false;
            document.getElementById(prefix + 'family_cancer_child_count_error').textContent = '人數與不詳擇一必填';
            document.getElementById(prefix + 'family_cancer_child_unknown_error').textContent = '人數與不詳擇一必填';
          }
        }
        if (!validateEitherOrExclusive(prefix, fields, 'family_cancer_child_count', 'family_cancer_child_unknown', '人數與不詳只能擇一', '人數與不詳只能擇一')) {
          ok = false;
        }

        if (familyCancerMember.includes('9')) {
          if (getFieldValue('family_cancer_other_desc', prefix, fields) === '') {
            ok = false;
            document.getElementById(prefix + 'family_cancer_other_desc_error').textContent = '有勾其他時，此欄位必填';
          }
          if (getFieldValue('family_cancer_other_count', prefix, fields) === '' && getFieldValue('family_cancer_other_unknown', prefix, fields) === '') {
            ok = false;
            document.getElementById(prefix + 'family_cancer_other_count_error').textContent = '人數與不詳擇一必填';
            document.getElementById(prefix + 'family_cancer_other_unknown_error').textContent = '人數與不詳擇一必填';
          }
        }
        if (!validateEitherOrExclusive(prefix, fields, 'family_cancer_other_count', 'family_cancer_other_unknown', '人數與不詳只能擇一', '人數與不詳只能擇一')) {
          ok = false;
        }
      }

      const msg = document.getElementById(messageId);
      msg.innerHTML = ok ? '<div class="success">檢查通過</div>' : '<div class="error">資料仍有缺漏或條件錯誤，請依欄位提示修正。</div>';
      return ok;
    }

    function getCsvHeaders(fields) {
      const headers = [];
      for (let i = 0; i < fields.length; i++) {
        headers.push(fields[i].label);
      }
      return headers;
    }

    function getCsvRow(prefix, fields) {
      const row = [];
      for (let i = 0; i < fields.length; i++) {
        const value = getFieldValue(fields[i].key, prefix, fields);
        row.push(Array.isArray(value) ? value.join('、') : value);
      }
      return row;
    }

    function escapeCsvValue(value) {
      const text = String(value ?? '');
      if (text.includes('"') || text.includes(',') || text.includes('\n')) {
        return '"' + text.replace(/"/g, '""') + '"';
      }
      return text;
    }

    function buildCsv(prefix, fields) {
      const headers = getCsvHeaders(fields).map(escapeCsvValue).join(',');
      const row = getCsvRow(prefix, fields).map(escapeCsvValue).join(',');
      return headers + '\n' + row;
    }

    function downloadCsv(content, filename) {
      const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    function parseTsvCaseList(text) {
      const lines = text.replace(/\r/g, '').split('\n').map(function (line) {
        return line.trim();
      }).filter(Boolean);

      const result = [];
      for (let i = 0; i < lines.length; i++) {
        const parts = lines[i].split('\t');
        if (parts.length < 2) {
          continue;
        }

        const name = parts[0].trim();
        const idno = parts[1].trim();

        if ((name === '姓名' || name === '名字') && (idno === '身份證號' || idno === '身分證號' || idno === '身份證字號' || idno === '身分證字號')) {
          continue;
        }

        if (name === '' || idno === '') {
          continue;
        }

        result.push({
          caseId: 'CASE_' + Date.now() + '_' + i + '_' + Math.random().toString(36).slice(2, 8),
          name: name,
          idno: idno,
          status: '待填寫'
        });
      }

      return result;
    }

    function renderCaseList() {
      const tbody = document.getElementById('caseListTableBody');
      tbody.innerHTML = '';

      if (caseList.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="5" class="muted">尚無個案列表</td>';
        tbody.appendChild(tr);
        return;
      }

      for (let i = 0; i < caseList.length; i++) {
        const item = caseList[i];
        const tr = document.createElement('tr');
        tr.innerHTML = '' +
          '<td>' + (i + 1) + '</td>' +
          '<td>' + escapeHtml(item.name) + '</td>' +
          '<td>' + escapeHtml(item.idno) + '</td>' +
          '<td><button data-case-id="' + item.caseId + '" class="fill-questionnaire-btn">填寫問卷</button></td>' +
          '<td class="' + (item.status === '完成' ? 'status-done' : 'status-pending') + '">' + item.status + '</td>';
        tbody.appendChild(tr);
      }

      const buttons = document.querySelectorAll('.fill-questionnaire-btn');
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
          openQuestionnaireForCase(this.dataset.caseId);
        });
      }
    }

    function renderDraftTable() {
      const tbody = document.getElementById('draftTableBody');
      tbody.innerHTML = '';

      if (draftRecords.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="5" class="muted">尚無暫存資料</td>';
        tbody.appendChild(tr);
        return;
      }

      for (let i = 0; i < draftRecords.length; i++) {
        const item = draftRecords[i];
        const tr = document.createElement('tr');
        tr.innerHTML = '' +
          '<td>' + (i + 1) + '</td>' +
          '<td>' + escapeHtml(item.name || '') + '</td>' +
          '<td>' + escapeHtml(item.idno || '') + '</td>' +
          '<td>' + escapeHtml(item.summary || '') + '</td>' +
          '<td class="status-done">完成</td>';
        tbody.appendChild(tr);
      }
    }

    function escapeHtml(text) {
      return String(text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function bindTab() {
      const buttons = document.querySelectorAll('.tab-btn');
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
          for (let j = 0; j < buttons.length; j++) {
            buttons[j].classList.remove('active');
          }
          this.classList.add('active');

          const panels = document.querySelectorAll('.tab-panel');
          for (let j = 0; j < panels.length; j++) {
            panels[j].classList.remove('active');
          }
          document.getElementById(this.dataset.tab).classList.add('active');
        });
      }
    }

    function clearForm(prefix, fields, previewId, messageId) {
      for (let i = 0; i < fields.length; i++) {
        clearFieldValue(fields[i], prefix);
        setFieldDisabled(fields[i], prefix, false);
        const error = document.getElementById(prefix + fields[i].key + '_error');
        if (error) {
          error.textContent = '';
        }
      }
      document.getElementById(previewId).textContent = '';
      document.getElementById(messageId).innerHTML = '';
      refreshVisibility(prefix, fields);
    }

    function fillImportFormByCase(prefix, caseInfo) {
      setFieldValue('name', prefix, importFields, caseInfo.name);
      setFieldValue('idno', prefix, importFields, caseInfo.idno);
      let moredata=gethpsadata(caseInfo.idno);
      if (moredata){
        setFieldValue('birth_ymd', prefix, importFields, moredata.birthday);
        setFieldValue('visit_ymd', prefix, importFields, moredata.treatmentDate);
        setFieldValue('address', prefix, importFields, moredata.residentAddress);
        setFieldValue('town_code', prefix, importFields, moredata.addcode);
        setFieldValue('tel', prefix, importFields, moredata.phone);
        setFieldValue('mobile', prefix, importFields, moredata.mobile);
        setFieldValue('sample_org_code', prefix, importFields, siteid);
        if (!document.getElementById("mod_payment_type_0").checked){
          document.getElementById("mod_payment_type_0").click();
        }


        if (moredata.gender=="1"){
          if (!document.getElementById("mod_gender_0").checked){
            document.getElementById("mod_gender_0").click();
          }
        } else {
          if (!document.getElementById("mod_gender_1").checked){
            document.getElementById("mod_gender_1").click();
          }
        }
        mod_religion_0.click();
        mod_education_0.click();
        mod_job_flag_0.click();
        mod_marital_0.click();
        mod_personal_history_0.click();
        mod_h_pylori_treatment_0.click();
        mod_endoscopy_done_0.click();
        mod_recent_ulcer_reflux_drug_0.click();
        mod_drug_allergy_0.click();
        mod_family_h_pylori_0.click();
        mod_family_ulcer_0.click();
        mod_family_cancer_0.click();
        mod_recent_drug_flag_0.click();
        mod_smoking_0.click();
        mod_drinking_0.click();
        mod_betel_0.click();
        mod_pickled_food_0.click();
        mod_bbq_spicy_food_0.click();
        mod_raw_food_0.click();
      }
      refreshVisibility(prefix, importFields);
    }

    function gethpsadata(personalId){
      let xhr = new XMLHttpRequest();
      let regurl="https://phpcis.chshb.gov.tw/api/v1/registrations/list?clinicId=4&personalId="+personalId;
      xhr.open("GET", regurl, false);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send();
        let regjres=JSON.parse(xhr.responseText).result;
        if (regjres.length==0){
            alert("查無掛號資料");
            return false;
        }
        let personalInfoId=regjres[0].personalInfoId;
        let birthday=cytomky(regjres[0].birthday);
        let find=false;
        let treatmentDate=null;
        let registrationId=null;
        for (let i=0;i<regjres.length;i++){
            let r=regjres[i];
            if (r.visitTypeCode=="6O"){
                find=true;
                treatmentDate=cytomky(r.treatmentDate);
                registrationId=r.registrationId;
                break;
            }
        }
        if (!find){
            alert("查無6O掛號資料");
            return false;
        }
        let basicurl="https://phpcis.chshb.gov.tw/api/v1/registrations/find?registrationId="+registrationId;
        xhr.open("GET", basicurl, false);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.send();
        let basicjres=JSON.parse(xhr.responseText).result;
        let residentAddress=basicjres.residentAddress;
        let addcode=transfercode(residentAddress);
        let phone=basicjres.phone;
        let mobile=basicjres.mobile;
        let gender=basicjres.gender;
        let name=basicjres.name;
        let data={
            personalInfoId,
            birthday,
            treatmentDate,
            registrationId,
            residentAddress,
            addcode,
            phone,
            mobile,
            gender,
            name
        }
        return data
    }
    
    function cytomky(cydate) {
        let cydatearray = cydate.split("-");
        // 計算民國年並補足至 3 位 (例如 79 -> 079)
        let cyyear = (parseInt(cydatearray[0]) - 1911).toString().padStart(3, '0');
        // 月份補足至 2 位 (例如 1 -> 01)
        let cymonth = cydatearray[1].padStart(2, '0');
        // 日期補足至 2 位 (例如 8 -> 08)
        let cyday = cydatearray[2].padStart(2, '0');
        return cyyear + cymonth + cyday;
    }
    
    
    function transfercode(address){
        const codelist={
            "台北市松山區": "0101",
            "台北市大安區": "0102",
            "台北市大同區": "0109",
            "台北市中山區": "0110",
            "台北市內湖區": "0111",
            "台北市南港區": "0112",
            "台北市士林區": "0115",
            "台北市北投區": "0116",
            "台北市信義區": "0117",
            "台北市中正區": "0118",
            "台北市萬華區": "0119",
            "台北市文山區": "0120",
            "台中市豐原區": "0301",
            "台中市東勢區": "0302",
            "台中市大甲區": "0303",
            "台中市清水區": "0304",
            "台中市沙鹿區": "0305",
            "台中市梧棲區": "0306",
            "台中市后里區": "0307",
            "台中市神岡區": "0308",
            "台中市潭子區": "0309",
            "台中市大雅區": "0310",
            "台中市新社區": "0311",
            "台中市石岡區": "0312",
            "台中市外埔區": "0313",
            "台中市大安區": "0314",
            "台中市烏日區": "0315",
            "台中市大肚區": "0316",
            "台中市龍井區": "0317",
            "台中市霧峰區": "0318",
            "台中市太平區": "0319",
            "台中市大里區": "0320",
            "台中市和平區": "0321",
            "台中市中區": "0322",
            "台中市東區": "0323",
            "台中市西區": "0324",
            "台中市南區": "0325",
            "台中市北區": "0326",
            "台中市西屯區": "0327",
            "台中市南屯區": "0328",
            "台中市北屯區": "0329",
            "台南市新營區": "0501",
            "台南市鹽水區": "0502",
            "台南市白河區": "0503",
            "台南市麻豆區": "0504",
            "台南市佳里區": "0505",
            "台南市新化區": "0506",
            "台南市善化區": "0507",
            "台南市學甲區": "0508",
            "台南市柳營區": "0509",
            "台南市後壁區": "0510",
            "台南市東山區": "0511",
            "台南市下營區": "0512",
            "台南市六甲區": "0513",
            "台南市官田區": "0514",
            "台南市大內區": "0515",
            "台南市西港區": "0516",
            "台南市七股區": "0517",
            "台南市將軍區": "0518",
            "台南市北門區": "0519",
            "台南市新市區": "0520",
            "台南市安定區": "0521",
            "台南市山上區": "0522",
            "台南市玉井區": "0523",
            "台南市楠西區": "0524",
            "台南市南化區": "0525",
            "台南市左鎮區": "0526",
            "台南市仁德區": "0527",
            "台南市歸仁區": "0528",
            "台南市關廟區": "0529",
            "台南市龍崎區": "0530",
            "台南市永康區": "0531",
            "台南市東區": "0532",
            "台南市南區": "0533",
            "台南市中西區": "0534",
            "台南市北區": "0535",
            "台南市安南區": "0537",
            "台南市安平區": "0538",
            "高雄市鳳山區": "0701",
            "高雄市岡山區": "0702",
            "高雄市旗山區": "0703",
            "高雄市美濃區": "0704",
            "高雄市林園區": "0705",
            "高雄市大寮區": "0706",
            "高雄市大樹區": "0707",
            "高雄市仁武區": "0708",
            "高雄市大社區": "0709",
            "高雄市鳥松區": "0710",
            "高雄市橋頭區": "0711",
            "高雄市燕巢區": "0712",
            "高雄市田寮區": "0713",
            "高雄市阿蓮區": "0714",
            "高雄市路竹區": "0715",
            "高雄市湖內區": "0716",
            "高雄市茄萣區": "0717",
            "高雄市永安區": "0718",
            "高雄市彌陀區": "0719",
            "高雄市梓官區": "0720",
            "高雄市六龜區": "0721",
            "高雄市甲仙區": "0722",
            "高雄市杉林區": "0723",
            "高雄市內門區": "0724",
            "高雄市茂林區": "0725",
            "高雄市桃源區": "0726",
            "高雄市那瑪夏區": "0727",
            "高雄市鹽埕區": "0728",
            "高雄市鼓山區": "0729",
            "高雄市左營區": "0730",
            "高雄市楠梓區": "0731",
            "高雄市三民區": "0732",
            "高雄市新興區": "0733",
            "高雄市前金區": "0734",
            "高雄市苓雅區": "0735",
            "高雄市前鎮區": "0736",
            "高雄市旗津區": "0737",
            "高雄市小港區": "0738",
            "基隆市中正區": "1101",
            "基隆市七堵區": "1102",
            "基隆市暖暖區": "1103",
            "基隆市仁愛區": "1104",
            "基隆市中山區": "1105",
            "基隆市安樂區": "1106",
            "基隆市信義區": "1107",
            "新竹市東區": "1201",
            "新竹市北區": "1204",
            "新竹市香山區": "1205",
            "嘉義市東區": "2201",
            "嘉義市西區": "2202",
            "新北市板橋區": "3101",
            "新北市三重區": "3102",
            "新北市永和區": "3103",
            "新北市中和區": "3104",
            "新北市新店區": "3105",
            "新北市新莊區": "3106",
            "新北市樹林區": "3107",
            "新北市鶯歌區": "3108",
            "新北市三峽區": "3109",
            "新北市淡水區": "3110",
            "新北市汐止區": "3111",
            "新北市瑞芳區": "3112",
            "新北市土城區": "3113",
            "新北市蘆洲區": "3114",
            "新北市五股區": "3115",
            "新北市泰山區": "3116",
            "新北市林口區": "3117",
            "新北市深坑區": "3118",
            "新北市石碇區": "3119",
            "新北市坪林區": "3120",
            "新北市三芝區": "3121",
            "新北市石門區": "3122",
            "新北市八里區": "3123",
            "新北市平溪區": "3124",
            "新北市雙溪區": "3125",
            "新北市貢寮區": "3126",
            "新北市金山區": "3127",
            "新北市萬里區": "3128",
            "新北市烏來區": "3129",
            "桃園市桃園區": "3201",
            "桃園市中壢區": "3202",
            "桃園市大溪區": "3203",
            "桃園市楊梅區": "3204",
            "桃園市蘆竹區": "3205",
            "桃園市大園區": "3206",
            "桃園市龜山區": "3207",
            "桃園市八德區": "3208",
            "桃園市龍潭區": "3209",
            "桃園市平鎮區": "3210",
            "桃園市新屋區": "3211",
            "桃園市觀音區": "3212",
            "桃園市復興區": "3213",
            "新竹縣關西鎮": "3301",
            "新竹縣新埔鎮": "3302",
            "新竹縣竹東鎮": "3303",
            "新竹縣竹北市": "3305",
            "新竹縣湖口鄉": "3306",
            "新竹縣橫山鄉": "3307",
            "新竹縣新豐鄉": "3308",
            "新竹縣芎林鄉": "3309",
            "新竹縣寶山鄉": "3310",
            "新竹縣北埔鄉": "3311",
            "新竹縣峨眉鄉": "3312",
            "新竹縣尖石鄉": "3313",
            "新竹縣五峰鄉": "3314",
            "宜蘭縣宜蘭市": "3401",
            "宜蘭縣羅東鎮": "3402",
            "宜蘭縣蘇澳鎮": "3403",
            "宜蘭縣頭城鎮": "3404",
            "宜蘭縣礁溪鄉": "3405",
            "宜蘭縣壯圍鄉": "3406",
            "宜蘭縣員山鄉": "3407",
            "宜蘭縣冬山鄉": "3408",
            "宜蘭縣五結鄉": "3409",
            "宜蘭縣三星鄉": "3410",
            "宜蘭縣大同鄉": "3411",
            "宜蘭縣南澳鄉": "3412",
            "苗栗縣苗栗市": "3501",
            "苗栗縣苑裡鎮": "3502",
            "苗栗縣通霄鎮": "3503",
            "苗栗縣竹南鎮": "3504",
            "苗栗縣頭份市": "3505",
            "苗栗縣後龍鎮": "3506",
            "苗栗縣卓蘭鎮": "3507",
            "苗栗縣大湖鄉": "3508",
            "苗栗縣公館鄉": "3509",
            "苗栗縣銅鑼鄉": "3510",
            "苗栗縣南庄鄉": "3511",
            "苗栗縣頭屋鄉": "3512",
            "苗栗縣三義鄉": "3513",
            "苗栗縣西湖鄉": "3514",
            "苗栗縣造橋鄉": "3515",
            "苗栗縣三灣鄉": "3516",
            "苗栗縣獅潭鄉": "3517",
            "苗栗縣泰安鄉": "3518",
            "彰化縣彰化市": "3701",
            "彰化縣鹿港鎮": "3702",
            "彰化縣和美鎮": "3703",
            "彰化縣北斗鎮": "3704",
            "彰化縣員林市": "3705",
            "彰化縣溪湖鎮": "3706",
            "彰化縣田中鎮": "3707",
            "彰化縣二林鎮": "3708",
            "彰化縣線西鄉": "3709",
            "彰化縣伸港鄉": "3710",
            "彰化縣福興鄉": "3711",
            "彰化縣秀水鄉": "3712",
            "彰化縣花壇鄉": "3713",
            "彰化縣芬園鄉": "3714",
            "彰化縣大村鄉": "3715",
            "彰化縣埔鹽鄉": "3716",
            "彰化縣埔心鄉": "3717",
            "彰化縣永靖鄉": "3718",
            "彰化縣社頭鄉": "3719",
            "彰化縣二水鄉": "3720",
            "彰化縣田尾鄉": "3721",
            "彰化縣埤頭鄉": "3722",
            "彰化縣芳苑鄉": "3723",
            "彰化縣大城鄉": "3724",
            "彰化縣竹塘鄉": "3725",
            "彰化縣溪州鄉": "3726",
            "南投縣南投市": "3801",
            "南投縣埔里鎮": "3802",
            "南投縣草屯鎮": "3803",
            "南投縣竹山鎮": "3804",
            "南投縣集集鎮": "3805",
            "南投縣名間鄉": "3806",
            "南投縣鹿谷鄉": "3807",
            "南投縣中寮鄉": "3808",
            "南投縣魚池鄉": "3809",
            "南投縣國姓鄉": "3810",
            "南投縣水里鄉": "3811",
            "南投縣信義鄉": "3812",
            "南投縣仁愛鄉": "3813",
            "雲林縣斗六市": "3901",
            "雲林縣斗南鎮": "3902",
            "雲林縣虎尾鎮": "3903",
            "雲林縣西螺鎮": "3904",
            "雲林縣土庫鎮": "3905",
            "雲林縣北港鎮": "3906",
            "雲林縣古坑鄉": "3907",
            "雲林縣大埤鄉": "3908",
            "雲林縣莿桐鄉": "3909",
            "雲林縣林內鄉": "3910",
            "雲林縣二崙鄉": "3911",
            "雲林縣崙背鄉": "3912",
            "雲林縣麥寮鄉": "3913",
            "雲林縣東勢鄉": "3914",
            "雲林縣褒忠鄉": "3915",
            "雲林縣台西鄉": "3916",
            "雲林縣元長鄉": "3917",
            "雲林縣四湖鄉": "3918",
            "雲林縣口湖鄉": "3919",
            "雲林縣水林鄉": "3920",
            "嘉義縣朴子市": "4001",
            "嘉義縣布袋鎮": "4002",
            "嘉義縣大林鎮": "4003",
            "嘉義縣民雄鄉": "4004",
            "嘉義縣溪口鄉": "4005",
            "嘉義縣新港鄉": "4006",
            "嘉義縣六腳鄉": "4007",
            "嘉義縣東石鄉": "4008",
            "嘉義縣義竹鄉": "4009",
            "嘉義縣鹿草鄉": "4010",
            "嘉義縣太保市": "4011",
            "嘉義縣水上鄉": "4012",
            "嘉義縣中埔鄉": "4013",
            "嘉義縣竹崎鄉": "4014",
            "嘉義縣梅山鄉": "4015",
            "嘉義縣番路鄉": "4016",
            "嘉義縣大埔鄉": "4017",
            "嘉義縣阿里山鄉": "4018",
            "屏東縣屏東市": "4301",
            "屏東縣潮州鎮": "4302",
            "屏東縣東港鎮": "4303",
            "屏東縣恆春鎮": "4304",
            "屏東縣萬丹鄉": "4305",
            "屏東縣長治鄉": "4306",
            "屏東縣麟洛鄉": "4307",
            "屏東縣九如鄉": "4308",
            "屏東縣里港鄉": "4309",
            "屏東縣鹽埔鄉": "4310",
            "屏東縣高樹鄉": "4311",
            "屏東縣萬巒鄉": "4312",
            "屏東縣內埔鄉": "4313",
            "屏東縣竹田鄉": "4314",
            "屏東縣新埤鄉": "4315",
            "屏東縣枋寮鄉": "4316",
            "屏東縣新園鄉": "4317",
            "屏東縣崁頂鄉": "4318",
            "屏東縣林邊鄉": "4319",
            "屏東縣南州鄉": "4320",
            "屏東縣佳冬鄉": "4321",
            "屏東縣琉球鄉": "4322",
            "屏東縣車城鄉": "4323",
            "屏東縣滿州鄉": "4324",
            "屏東縣枋山鄉": "4325",
            "屏東縣三地門鄉": "4326",
            "屏東縣霧台鄉": "4327",
            "屏東縣瑪家鄉": "4328",
            "屏東縣泰武鄉": "4329",
            "屏東縣來義鄉": "4330",
            "屏東縣春日鄉": "4331",
            "屏東縣獅子鄉": "4332",
            "屏東縣牡丹鄉": "4333",
            "澎湖縣馬公市": "4401",
            "澎湖縣湖西鄉": "4402",
            "澎湖縣白沙鄉": "4403",
            "澎湖縣西嶼鄉": "4404",
            "澎湖縣望安鄉": "4405",
            "澎湖縣七美鄉": "4406",
            "花蓮縣花蓮市": "4501",
            "花蓮縣鳳林鎮": "4502",
            "花蓮縣玉里鎮": "4503",
            "花蓮縣新城鄉": "4504",
            "花蓮縣吉安鄉": "4505",
            "花蓮縣壽豐鄉": "4506",
            "花蓮縣光復鄉": "4507",
            "花蓮縣豐濱鄉": "4508",
            "花蓮縣瑞穗鄉": "4509",
            "花蓮縣富里鄉": "4510",
            "花蓮縣秀林鄉": "4511",
            "花蓮縣萬榮鄉": "4512",
            "花蓮縣卓溪鄉": "4513",
            "台東縣台東市": "4601",
            "台東縣成功鎮": "4602",
            "台東縣關山鎮": "4603",
            "台東縣卑南鄉": "4604",
            "台東縣大武鄉": "4605",
            "台東縣太麻里鄉": "4606",
            "台東縣東河鄉": "4607",
            "台東縣長濱鄉": "4608",
            "台東縣鹿野鄉": "4609",
            "台東縣池上鄉": "4610",
            "台東縣綠島鄉": "4611",
            "台東縣延平鄉": "4612",
            "台東縣海端鄉": "4613",
            "台東縣達仁鄉": "4614",
            "台東縣金峰鄉": "4615",
            "台東縣蘭嶼鄉": "4616",
            "金門縣金城鎮": "9001",
            "金門縣金沙鎮": "9002",
            "金門縣金湖鎮": "9003",
            "金門縣金寧鄉": "9004",
            "金門縣烈嶼鄉": "9005",
            "金門縣烏坵鄉": "9006",
            "連江縣南竿鄉": "9101",
            "連江縣北竿鄉": "9102",
            "連江縣莒光鄉": "9103",
            "連江縣東引鄉": "9104"
        };
        const codekeys=Object.keys(codelist);
        let result="";
        for (let i=0;i<codekeys.length;i++){
            if (address.includes(codekeys[i])){
                result=codelist[codekeys[i]];
                break;
            }
        }
        return result;
    }
    
  


    function getImportFieldMap(prefix) {
      const obj = {};
      for (let i = 0; i < importFields.length; i++) {
        const key = importFields[i].key;
        const value = getFieldValue(key, prefix, importFields);
        obj[key] = Array.isArray(value) ? value.join('、') : value;
      }
      return obj;
    }

    function applyImportFieldMap(prefix, map) {
      for (let i = 0; i < importFields.length; i++) {
        const field = importFields[i];
        if (Object.prototype.hasOwnProperty.call(map, field.key)) {
          setFieldValue(field.key, prefix, importFields, map[field.key]);
        } else {
          clearFieldValue(field, prefix);
        }
      }
      refreshVisibility(prefix, importFields);
    }

    function getCaseById(caseId) {
      for (let i = 0; i < caseList.length; i++) {
        if (caseList[i].caseId === caseId) {
          return caseList[i];
        }
      }
      return null;
    }

    function findDraftByIdno(idno) {
      for (let i = 0; i < draftRecords.length; i++) {
        if (draftRecords[i].idno === idno) {
          return draftRecords[i];
        }
      }
      return null;
    }

    function openQuestionnaireForCase(caseId) {
      currentEditingCaseId = caseId;
      const item = getCaseById(caseId);
      if (!item) {
        return;
      }

      

      document.getElementById('questionnaireModal').classList.add('active');
      document.getElementById('currentCaseInfo').textContent = '目前個案：' + item.name + ' / ' + item.idno;
      clearForm('mod_', importFields, 'modalImportPreview', 'modalImportMessage');

      const draft = findDraftByIdno(item.idno);
      if (draft) {
        applyImportFieldMap('mod_', draft.fieldMap);
      } else {
        fillImportFormByCase('mod_', item);
      }

      
      
    }

    function closeModal() {
      document.getElementById('questionnaireModal').classList.remove('active');
      currentEditingCaseId = '';
    }

    function buildDraftStorageCsv() {
      const rows = [];
      const headers = ['caseId', 'name', 'idno', 'status', 'csvContent', 'fieldMapJson'];
      rows.push(headers.map(escapeCsvValue).join(','));

      for (let i = 0; i < draftRecords.length; i++) {
        const item = draftRecords[i];
        const row = [
          item.caseId || '',
          item.name || '',
          item.idno || '',
          '完成',
          item.csvContent || '',
          JSON.stringify(item.fieldMap || {})
        ];
        rows.push(row.map(escapeCsvValue).join(','));
      }

      return rows.join('\n');
    }

    function buildAllQuestionnaireCsv() {
      const headers = getCsvHeaders(importFields);
      const rows = [headers.map(escapeCsvValue).join(',')];

      for (let i = 0; i < draftRecords.length; i++) {
        const item = draftRecords[i];
        const row = [];

        for (let j = 0; j < importFields.length; j++) {
          const key = importFields[j].key;
          row.push(escapeCsvValue(item.fieldMap && Object.prototype.hasOwnProperty.call(item.fieldMap, key) ? item.fieldMap[key] : ''));
        }

        rows.push(row.join(','));
      }

      return rows.join('\n');
    }

    function parseCsvLine(line) {
      const result = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (inQuotes) {
          if (ch === '"') {
            if (line[i + 1] === '"') {
              current += '"';
              i++;
            } else {
              inQuotes = false;
            }
          } else {
            current += ch;
          }
        } else {
          if (ch === '"') {
            inQuotes = true;
          } else if (ch === ',') {
            result.push(current);
            current = '';
          } else {
            current += ch;
          }
        }
      }

      result.push(current);
      return result;
    }

    function parseCsvText(text) {
      const normalized = text.replace(/^\uFEFF/, '').replace(/\r/g, '');
      const rows = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < normalized.length; i++) {
        const ch = normalized[i];
        if (ch === '"') {
          current += ch;
          if (inQuotes && normalized[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (ch === '\n' && !inQuotes) {
          rows.push(current);
          current = '';
        } else {
          current += ch;
        }
      }
      if (current !== '') {
        rows.push(current);
      }
      return rows.map(parseCsvLine);
    }

    function importDraftStorageCsv(text) {
      const rows = parseCsvText(text);
      if (rows.length < 2) {
        throw new Error('CSV 內容不足');
      }

      const header = rows[0];
      const expected = ['caseId', 'name', 'idno', 'status', 'csvContent', 'fieldMapJson'];
      for (let i = 0; i < expected.length; i++) {
        if (header[i] !== expected[i]) {
          throw new Error('CSV 格式不符，需使用暫存 CSV');
        }
      }

      draftRecords = [];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length === 0 || row.every(function (cell) { return String(cell).trim() === ''; })) {
          continue;
        }

        let fieldMap = {};
        try {
          fieldMap = JSON.parse(row[5] || '{}');
        } catch (err) {
          fieldMap = {};
        }

        draftRecords.push({
          caseId: row[0] || '',
          name: row[1] || '',
          idno: row[2] || '',
          csvContent: row[4] || '',
          fieldMap: fieldMap,
          summary: (row[1] || '') + ' / ' + (row[2] || '')
        });
      }

      for (let i = 0; i < caseList.length; i++) {
        const matched = findDraftByIdno(caseList[i].idno);
        caseList[i].status = matched ? '完成' : '待填寫';
      }

      renderCaseList();
      renderDraftTable();
    }

    function saveCurrentQuestionnaire(prefix, previewId, messageId) {
      const ok = validate(prefix, importFields, messageId);
      if (!ok) {
        return;
      }

      const csvContent = buildCsv(prefix, importFields);
      document.getElementById(previewId).textContent = csvContent;

      const map = getImportFieldMap(prefix);
      const name = map.name || '';
      const idno = map.idno || '';

      let targetCaseId = currentEditingCaseId;
      if (!targetCaseId) {
        const matchedCase = caseList.find(function (item) {
          return item.idno === idno;
        });
        if (matchedCase) {
          targetCaseId = matchedCase.caseId;
        }
      }

      let draft = null;
      for (let i = 0; i < draftRecords.length; i++) {
        if (draftRecords[i].idno === idno) {
          draft = draftRecords[i];
          break;
        }
      }

      if (draft) {
        draft.caseId = targetCaseId || draft.caseId || '';
        draft.name = name;
        draft.idno = idno;
        draft.csvContent = csvContent;
        draft.fieldMap = map;
        draft.summary = name + ' / ' + idno;
      } else {
        draftRecords.push({
          caseId: targetCaseId || '',
          name: name,
          idno: idno,
          csvContent: csvContent,
          fieldMap: map,
          summary: name + ' / ' + idno
        });
      }

      if (targetCaseId) {
        const item = getCaseById(targetCaseId);
        if (item) {
          item.status = '完成';
        }
      }

      renderCaseList();
      renderDraftTable();
      document.getElementById(messageId).innerHTML = '<div class="success">已儲存，目前 CSV 內容已暫存，個案狀態已更新為完成。</div>';
    }

    renderFields('importForm', importFields, 'imp_');
    renderFields('modalImportForm', importFields, 'mod_');
    renderFields('deleteForm', deleteFields, 'del_');

    bindVisibility('imp_', importFields);
    bindVisibility('mod_', importFields);
    bindVisibility('del_', deleteFields);

    for (let i = 0; i < eitherOrPairs.length; i++) {
      bindEitherOr('imp_', importFields, eitherOrPairs[i].textKey, eitherOrPairs[i].unknownKey);
      bindEitherOr('mod_', importFields, eitherOrPairs[i].textKey, eitherOrPairs[i].unknownKey);
    }

    refreshVisibility('imp_', importFields);
    refreshVisibility('mod_', importFields);
    refreshVisibility('del_', deleteFields);
    bindTab();
    renderCaseList();
    renderDraftTable();

    document.getElementById('validateImportBtn').addEventListener('click', function () {
      validate('imp_', importFields, 'importMessage');
    });

    document.getElementById('previewImportBtn').addEventListener('click', function () {
      if (!validate('imp_', importFields, 'importMessage')) {
        return;
      }
      document.getElementById('importPreview').textContent = buildCsv('imp_', importFields);
    });

    document.getElementById('downloadImportBtn').addEventListener('click', function () {
      if (!validate('imp_', importFields, 'importMessage')) {
        return;
      }
      const orgCode = getFieldValue('sample_org_code', 'imp_', importFields) || 'ORGCODE';
      downloadCsv(buildCsv('imp_', importFields), 'HpSA' + orgCode + '_00001.csv');
    });

    document.getElementById('saveDraftBtn').addEventListener('click', function () {
      saveCurrentQuestionnaire('imp_', 'importPreview', 'importMessage');
    });

    document.getElementById('clearImportBtn').addEventListener('click', function () {
      clearForm('imp_', importFields, 'importPreview', 'importMessage');
    });

    document.getElementById('previewDeleteBtn').addEventListener('click', function () {
      if (!validate('del_', deleteFields, 'deleteMessage')) {
        return;
      }
      document.getElementById('deletePreview').textContent = buildCsv('del_', deleteFields);
    });

    document.getElementById('downloadDeleteBtn').addEventListener('click', function () {
      if (!validate('del_', deleteFields, 'deleteMessage')) {
        return;
      }
      const orgCode = getFieldValue('del_org_code', 'del_', deleteFields) || 'ORGCODE';
      downloadCsv(buildCsv('del_', deleteFields), 'HpSA' + orgCode + '_00001_Del.csv');
    });

    document.getElementById('clearDeleteBtn').addEventListener('click', function () {
      clearForm('del_', deleteFields, 'deletePreview', 'deleteMessage');
    });

    document.getElementById('importCaseListBtn').addEventListener('click', function () {
      const text = document.getElementById('caseListPaste').value;
      const parsed = parseTsvCaseList(text);
      if (parsed.length === 0) {
        document.getElementById('caseListMessage').innerHTML = '<div class="error">沒有讀到有效個案資料，請確認格式為 姓名[tab]身份證號。</div>';
        return;
      }
      caseList = parsed;
      for (let i = 0; i < caseList.length; i++) {
        if (findDraftByIdno(caseList[i].idno)) {
          caseList[i].status = '完成';
        }
      }
      renderCaseList();
      document.getElementById('caseListMessage').innerHTML = '<div class="success">已匯入 ' + parsed.length + ' 筆個案。</div>';
    });

    document.getElementById('clearCaseListBtn').addEventListener('click', function () {
      caseList = [];
      renderCaseList();
      document.getElementById('caseListMessage').innerHTML = '<div class="warning">個案列表已清空。</div>';
    });

    document.getElementById('closeModalBtn').addEventListener('click', function () {
      closeModal();
    });
    document.getElementById('closeModalBtn2').addEventListener('click', function () {
      closeModal();
    });

    document.getElementById('validateModalImportBtn').addEventListener('click', function () {
      validate('mod_', importFields, 'modalImportMessage');
    });

    document.getElementById('previewModalImportBtn').addEventListener('click', function () {
      if (!validate('mod_', importFields, 'modalImportMessage')) {
        return;
      }
      document.getElementById('modalImportPreview').textContent = buildCsv('mod_', importFields);
    });

    document.getElementById('saveModalDraftBtn').addEventListener('click', function () {
      saveCurrentQuestionnaire('mod_', 'modalImportPreview', 'modalImportMessage');
      if (document.getElementById('modalImportMessage').textContent.indexOf('已儲存') > -1) {
        closeModal();
      }
    });

    document.getElementById('clearModalImportBtn').addEventListener('click', function () {
      clearForm('mod_', importFields, 'modalImportPreview', 'modalImportMessage');
      const item = getCaseById(currentEditingCaseId);
      if (item) {
        fillImportFormByCase('mod_', item);
      }
    });

    document.getElementById('downloadAllQuestionnaireCsvBtn').addEventListener('click', function () {
      if (draftRecords.length === 0) {
        document.getElementById('draftMessage').innerHTML = '<div class="error">目前沒有可匯出的問卷資料。</div>';
        return;
      }
      const now = new Date();
      const year = now.getFullYear() - 1911;
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      downloadCsv(buildAllQuestionnaireCsv(), 'HpSA'+siteid+'_'+year+month+'.csv');
      document.getElementById('draftMessage').innerHTML = '<div class="success">已匯出全部問卷 CSV。</div>';
    });

    document.getElementById('downloadDraftCsvBtn').addEventListener('click', function () {
      downloadCsv(buildDraftStorageCsv(), 'draft_storage.csv');
    });

    document.getElementById('importDraftCsvBtn').addEventListener('click', function () {
      document.getElementById('draftCsvFileInput').click();
    });

    document.getElementById('draftCsvFileInput').addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = function () {
        try {
          importDraftStorageCsv(String(reader.result || ''));
          document.getElementById('draftMessage').innerHTML = '<div class="success">已匯入暫存 CSV，資料已帶回暫存區。</div>';
        } catch (err) {
          document.getElementById('draftMessage').innerHTML = '<div class="error">匯入失敗：' + escapeHtml(err.message) + '</div>';
        }
      };
      reader.readAsText(file, 'utf-8');
      event.target.value = '';
    });

    document.getElementById('clearDraftsBtn').addEventListener('click', function () {
      draftRecords = [];
      for (let i = 0; i < caseList.length; i++) {
        caseList[i].status = '待填寫';
      }
      renderCaseList();
      renderDraftTable();
      document.getElementById('draftMessage').innerHTML = '<div class="warning">暫存資料已清空。</div>';
    });
    mod_personal_history_0.addEventListener('change', function () {
      if (mod_personal_history_0.checked){
        mod_personal_history_1.checked?mod_personal_history_1.click():null;
        mod_personal_history_2.checked?mod_personal_history_2.click():null;
        mod_personal_history_3.checked?mod_personal_history_3.click():null;
        mod_personal_history_4.checked?mod_personal_history_4.click():null;
        mod_personal_history_5.checked?mod_personal_history_5.click():null;
        mod_personal_history_6.checked?mod_personal_history_6.click():null;
        mod_personal_history_7.checked?mod_personal_history_7.click():null;
        mod_personal_history_8.checked?mod_personal_history_8.click():null;
      }
    })
    function historychange(){
      if (mod_personal_history_1.checked || mod_personal_history_2.checked || mod_personal_history_3.checked || mod_personal_history_4.checked || mod_personal_history_5.checked || mod_personal_history_6.checked || mod_personal_history_7.checked || mod_personal_history_8.checked){
        mod_personal_history_0.checked?mod_personal_history_0.click():null;
      }
    }
    mod_personal_history_1.addEventListener('change', function () {
      historychange();
    })
    mod_personal_history_2.addEventListener('change', function () {
      historychange();
    })
    mod_personal_history_3.addEventListener('change', function () {
      historychange();
    })
    mod_personal_history_4.addEventListener('change', function () {
      historychange();
    })
    mod_personal_history_5.addEventListener('change', function () {
      historychange();
    })
    mod_personal_history_6.addEventListener('change', function () {
      historychange();
    })
    mod_personal_history_7.addEventListener('change', function () {
      historychange();
    })
    mod_personal_history_8.addEventListener('change', function () {
      historychange();
    })
  </script>
</body>
</html>
`
	htmls=htmls.replace("please_change_me",clinicCode);
	let newWin = window.open('', '_blank');
	newWin.document.open();
    newWin.document.write(htmls);
    newWin.document.close();
    
}
genhpwindow();
