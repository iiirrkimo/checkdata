"use strict";

// 自行修改使用者名單
const USERS = ["鄭桂芬", "蘇湘茹", "林鑫莉", "劉慧華", "蔡瑱諭", "陳伶俐", "吳宣珊", "洪芷瑄"];

// 使用新版 key，避免和舊版含時間的資料混用

const $ = (id) => document.getElementById(id);

let records = [];
let recordType = "temperature";
let recordUser = "";
let editingId = null;

// 初始化選單
for (const name of USERS) {
  $("user").add(new Option(name, name));
}

for (let i = 1; i <= 3; i++) {
  $("fridge").add(new Option(`冰箱 ${i}`, String(i)));
}

for (let i = 1; i <= 10; i++) {
  $("layer").add(new Option(`第 ${i} 層`, String(i)));
}


renderRecords();

// 按鈕事件
$("addTemperature").addEventListener("click", () => {
  openForm("temperature");
});

$("addRecorder").addEventListener("click", () => {
  openForm("recorder_min");
});

$("cancel").addEventListener("click", () => {
  $("recordDialog").close();
});

$("recordForm").addEventListener("submit", saveRecord);
$("download").addEventListener("click", uploadjson);

function openForm(type) {
  const user = $("user").value;
  editingId = null;

$("recordForm").querySelector('button[type="submit"]').textContent =
  "加入紀錄";

  if (!user) {
    showMessage("請先選擇使用者。");
    $("user").focus();
    return;
  }

  recordType = type;
  recordUser = user;

  $("recordForm").reset();
  $("formError").textContent = "";
  $("recordUser").textContent = user;

  const isTemperature = type === "temperature";

  $("dialogTitle").textContent = isTemperature
    ? "新增紀錄"
    : "新增持續記錄器最低溫";

  $("temperatureFields").hidden = !isTemperature;
  $("temperatureFields").disabled = !isTemperature;

  $("recorderFields").hidden = isTemperature;
  $("recorderFields").disabled = isTemperature;

  $("layerField").hidden = !isTemperature;
  $("layer").disabled = !isTemperature;

  // 每次新增預設正常
  $("vaccineMonitor").value = "正常";
  $("freezeMonitor").value = "正常";

  $("recordDialog").showModal();
}

function saveRecord(event) {
  event.preventDefault();
  $("formError").textContent = "";

  try {
    const isEditing = editingId !== null;

    const record = {
      id: isEditing ? editingId : makeId(),
      type: recordType,
      user: recordUser,
      fridge: Number($("fridge").value),
      notes: $("notes").value.trim()
    };

    if (recordType === "temperature") {
      const max = readOptionalNumber("maxTemperature");
      const current = readOptionalNumber("currentTemperature");
      const min = readOptionalNumber("minTemperature");

      if (max !== null && min !== null && max < min) {
        throw new Error("最高溫不可小於最低溫。");
      }

      if (max !== null && current !== null && current > max) {
        throw new Error("現在溫不可高於最高溫。");
      }

      if (min !== null && current !== null && current < min) {
        throw new Error("現在溫不可低於最低溫。");
      }

      Object.assign(record, {
        layer: Number($("layer").value),
        maxTemperature: max,
        currentTemperature: current,
        minTemperature: min,
        vaccineMonitor: $("vaccineMonitor").value,
        freezeMonitor: $("freezeMonitor").value
      });
    } else {
      record.recorderMinTemperature =
        readOptionalNumber("recorderMinTemperature");

      if (
        record.recorderMinTemperature === null &&
        record.notes === ""
      ) {
        throw new Error("請填寫持續記錄器最低溫或備註。");
      }
    }

    if (isEditing) {
      const index = records.findIndex(
        (item) => item.id === editingId
      );

      if (index === -1) {
        throw new Error("找不到要修改的紀錄，請關閉表單後重試。");
      }

      // 更新原有紀錄，保留位置與其他既有欄位
      records[index] = {
        ...records[index],
        ...record
      };
    } else {
      records.push(record);
    }

    renderRecords();
    $("recordDialog").close();
    editingId = null;

    const action = isEditing ? "修改" : "新增";

    showMessage(`已${action}紀錄。請下載 JSON 保存，重新整理後資料會消失。`);
  } catch (error) {
    $("formError").textContent = error.message;
  }
}

// 空白回傳 null，避免 Number("") 被轉成 0
function readOptionalNumber(id) {
  const input = $(id);

  if (input.validity.badInput) {
    throw new Error("溫度必須是有效數字。");
  }

  if (input.value.trim() === "") {
    return null;
  }

  const value = input.valueAsNumber;

  if (!Number.isFinite(value)) {
    throw new Error("溫度必須是有效數字。");
  }

  return value;
}

function persistRecords() {
  if (!storageAvailable) {
    return false;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function renderRecords() {
  const tbody = $("records");
  tbody.replaceChildren();

  for (const record of [...records].reverse()) {
    const tr = document.createElement("tr");
    const isTemperature = record.type === "temperature";

    const cells = [
      ["使用者", record.user],
      ["類型", isTemperature ? "溫度紀錄" : "持續記錄器"],
      ["冰箱", `冰箱 ${record.fridge}`],
      ["層數", isTemperature ? `第 ${record.layer} 層` : "—"],
      ["最高溫", formatTemperature(record.maxTemperature)],
      ["現在溫", formatTemperature(record.currentTemperature)],
      ["最低溫", formatTemperature(record.minTemperature)],
      ["疫苗監視片", record.vaccineMonitor ?? "—"],
      ["冷凍監視片", record.freezeMonitor ?? "—"],
      [
        "持續記錄器最低溫",
        formatTemperature(record.recorderMinTemperature)
      ],
      ["備註", record.notes || "—"]
    ];

    for (const [label, value] of cells) {
      const td = document.createElement("td");
      const span = document.createElement("span");

      td.dataset.label = label;
      span.className = "cell-value";

      // 不使用 innerHTML，避免輸入內容被當成 HTML
      span.textContent = value;

      if (label === "備註") {
        td.classList.add("notes-cell");
      }

      if (
        ["疫苗監視片", "冷凍監視片"].includes(label) &&
        value === "異常"
      ) {
        td.classList.add("abnormal");
      }

      td.appendChild(span);
      tr.appendChild(td);
    }

    const actionCell = document.createElement("td");
    actionCell.className = "action-cell";
    actionCell.dataset.label = "操作";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute(
      "aria-label",
      `刪除 ${record.user} 的冰箱 ${record.fridge} 紀錄`
    );

    deleteButton.addEventListener("click", () => {
      deleteRecord(record.id);
    });

    const editButton = document.createElement("button");
editButton.type = "button";
editButton.className = "secondary";
editButton.textContent = "修改";

editButton.setAttribute(
  "aria-label",
  `修改 ${record.user} 的冰箱 ${record.fridge} 紀錄`
);

editButton.addEventListener("click", () => {
  editRecord(record.id);
});

// 使用現有 actions 樣式，讓手機按鈕保留適當間距
const actionButtons = document.createElement("div");
actionButtons.className = "actions";
actionButtons.style.marginTop = "0";

actionButtons.append(editButton, deleteButton);
actionCell.appendChild(actionButtons);

tr.appendChild(actionCell);
tbody.appendChild(tr);
  }

  $("count").textContent = `${records.length} 筆`;
  $("empty").hidden = records.length > 0;
  $("tableWrapper").hidden = records.length === 0;
  $("download").disabled = records.length === 0;
}

function deleteRecord(id) {
  if (!confirm("確定刪除這筆紀錄？")) {
    return;
  }

  records = records.filter((record) => record.id !== id);

  renderRecords();
  showMessage("已刪除紀錄。");
}

// 之後要上傳 server 時，也可以使用這個函式取得資料
function buildPayload() {
  return {
    title: "冰箱溫度記錄",
    schemaVersion: 2,
    temperatureUnit: "°C",
    records
  };
}

function downloadJSON() {
  if (records.length === 0) {
    return;
  }

  const json = JSON.stringify(buildPayload(), null, 2);

  const blob = new Blob([json], {
    type: "application/json;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "冰箱溫度記錄.json";

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 10000);

  showMessage("已啟動 JSON 下載，請確認瀏覽器的下載位置。");
}

function uploadjson() {
  if (records.length === 0) {
    alert("沒有可以上傳的紀錄。");
    return;
  }

  // 不加縮排，縮小傳送內容
  const json = JSON.stringify(buildPayload());

  submitGoogleForm({
    "entry.837880529": json
  });
}


function submitGoogleForm(formData) {
  const formResponseUrl =
    "https://docs.google.com/forms/d/e/" +
    "1FAIpQLSduAQ3ifWG1pRbvohPYqaIxc5oBXzoTnYh5E3P1OHk8-L_-xg/" +
    "formResponse";

  const form = document.createElement("form");

  form.method = "POST";
  form.action = formResponseUrl;

  // 測試時顯示 Google 回傳畫面，不使用隱藏 iframe
  form.target = "_blank";

  form.acceptCharset = "UTF-8";
  form.enctype = "application/x-www-form-urlencoded";
  form.style.display = "none";

  for (const [name, value] of Object.entries(formData)) {
    const input = document.createElement("input");

    input.type = "hidden";
    input.name = name;
    input.value = value == null ? "" : String(value);

    form.appendChild(input);
  }

  document.body.appendChild(form);

  form.submit();

  setTimeout(() => form.remove(), 1000);

  // 不在這裡宣告上傳成功
}

function formatTemperature(value) {
  return typeof value === "number" && Number.isFinite(value)
    ? `${value} °C`
    : "—";
}

function showMessage(text) {
  $("message").textContent = text;
}

function makeId() {
  // 使用 getRandomValues，支援區網 HTTP，不以時間產生 ID
  const bytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(bytes);

  return Array.from(
    bytes,
    (byte) => byte.toString(16).padStart(2, "0")
  ).join("");
}

function editRecord(id) {
  const record = records.find((item) => item.id === id);

  if (!record) {
    showMessage("找不到這筆紀錄。");
    return;
  }

  editingId = record.id;
  recordType = record.type;
  recordUser = record.user;

  $("recordForm").reset();
  $("formError").textContent = "";
  $("recordUser").textContent = record.user;

  const isTemperature = record.type === "temperature";

  $("dialogTitle").textContent = isTemperature
    ? "修改紀錄"
    : "修改持續記錄器最低溫";

  $("recordForm").querySelector('button[type="submit"]').textContent =
    "儲存修改";

  $("temperatureFields").hidden = !isTemperature;
  $("temperatureFields").disabled = !isTemperature;

  $("recorderFields").hidden = isTemperature;
  $("recorderFields").disabled = isTemperature;

  $("layerField").hidden = !isTemperature;
  $("layer").disabled = !isTemperature;

  $("fridge").value = String(record.fridge);
  $("notes").value = record.notes ?? "";

  if (isTemperature) {
    $("layer").value = String(record.layer);

    // 使用 ??，確保 0 不會被當成空白
    $("maxTemperature").value = record.maxTemperature ?? "";
    $("currentTemperature").value = record.currentTemperature ?? "";
    $("minTemperature").value = record.minTemperature ?? "";

    $("vaccineMonitor").value = record.vaccineMonitor ?? "正常";
    $("freezeMonitor").value = record.freezeMonitor ?? "正常";
  } else {
    $("recorderMinTemperature").value =
      record.recorderMinTemperature ?? "";
  }

  $("recordDialog").showModal();
}