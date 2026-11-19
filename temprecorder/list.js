"use strict";

// ========================================
// 設定
// ========================================

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbyVDOIE_vuBCNrU9qj-KbTNEkIlwaymSatRXOCVsXdiScmkeTOmDaADR5tydSp_qte-/exec";

// GAS 若需要 sheetname，填入名稱；不需要則留空。
const SHEET_NAME = "";

const QUERY_TIMEOUT_MS = 60000;

const $ = (id) => document.getElementById(id);

const ITEMS = [
  {
    label: "最高溫",
    key: "maxTemperature",
    aggregate: "max"
  },
  {
    label: "現在溫",
    key: "currentTemperature",
    aggregate: "min"
  },
  {
    label: "最低溫",
    key: "minTemperature",
    aggregate: "min"
  },
  {
    label: "疫苗監視片",
    key: "vaccineMonitor"
  },
  {
    label: "冷凍監視片",
    key: "freezeMonitor"
  }
];

// GAS 回傳的原始陣列
let queriedArray = [];

// 解析後的紀錄；null 表示尚未查詢
let queriedEntries = null;

let queriedStart = "";
let queriedEnd = "";

let isBusy = false;
let queryRevision = 0;
let activeController = null;
let focusBeforeLoading = null;

// ========================================
// 初始化
// ========================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}

function initialize() {
  // 預設查詢最近 7 天，包含今天
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - 6);

  if (!$("startDate").value) {
    $("startDate").value = localDateString(start);
  }

  if (!$("endDate").value) {
    $("endDate").value = localDateString(today);
  }

  $("generateButton").disabled = true;
  $("printButton").disabled = true;

  // 使用 GAS 後，隱藏舊版 JSON 示範資料區
  const sourceDetails = $("source")?.closest("details");

  if (sourceDetails) {
    sourceDetails.hidden = true;
  }

  $("queryForm").addEventListener("submit", (event) => {
    event.preventDefault();
    queryData();
  });

  $("generateButton").addEventListener(
    "click",
    generateReportWithLoading
  );

  $("printButton").addEventListener("click", () => {
    if (!isBusy) {
      window.print();
    }
  });

  // 日期改變後，需要重新查詢
  for (const id of ["startDate", "endDate"]) {
    $(id).addEventListener("input", invalidateQuery);
  }

  // 冰箱改變後，不必重新呼叫 GAS，只需重新產製
  $("fridge").addEventListener("change", () => {
    $("report").replaceChildren();
    $("printButton").disabled = true;

    if (queriedEntries !== null) {
      showMessage("冰箱已變更，請按「產製表格」。");
    }
  });

  showMessage("請選擇開始與結束日期，再按「查詢」。");
}

// ========================================
// 查詢 GAS
// ========================================

async function queryData() {
  if (isBusy) {
    return;
  }

  invalidateQuery(false);

  const start = $("startDate").value;
  const end = $("endDate").value;

  if (!validDate(start) || !validDate(end)) {
    showMessage("請輸入有效的開始與結束日期。", true);
    return;
  }

  if (start > end) {
    showMessage("開始日期不可晚於結束日期。", true);
    return;
  }

  if (GAS_URL.includes("你的部署ID")) {
    showMessage("請先在 app.js 設定 GAS_URL。", true);
    return;
  }

  const revision = queryRevision;
  const controller = new AbortController();

  activeController = controller;
  isBusy = true;

  const queryButton =
    $("queryForm").querySelector('button[type="submit"]');

  showLoading("正在從 GAS 讀取資料…");
  queryButton.disabled = true;

  let timedOut = false;

  const timeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, QUERY_TIMEOUT_MS);

  try {
    const url = new URL(GAS_URL);

    url.searchParams.set("starttime", start);
    url.searchParams.set("endtime", end);

    if (SHEET_NAME.trim()) {
      url.searchParams.set("sheetname", SHEET_NAME.trim());
    }

    const response = await fetch(url.toString(), {
      signal: controller.signal,
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`HTTP 錯誤：${response.status}`);
    }

    const text = await response.text();

    // 資料接收完成，停止網路逾時計時
    clearTimeout(timeoutId);

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(
        "GAS 沒有回傳有效 JSON，請確認部署網址與存取權限。"
      );
    }

    if (data && !Array.isArray(data) && data.error) {
      throw new Error(String(data.error));
    }

    if (!Array.isArray(data)) {
      throw new Error("GAS 回傳資料必須是陣列。");
    }

    updateLoadingText("正在整理資料…");
    await waitForPaint();

    const entries = parseSource(data);

    // 避免舊查詢結果覆蓋新的查詢條件
    if (
      revision !== queryRevision ||
      $("startDate").value !== start ||
      $("endDate").value !== end
    ) {
      showMessage("日期已變更，請重新查詢。");
      return;
    }

    queriedArray = data;

    queriedEntries = entries.filter((entry) =>
      entry.date >= start &&
      entry.date <= end
    );

    queriedStart = start;
    queriedEnd = end;

    $("generateButton").disabled = false;

    showMessage(
      `查詢完成：${queriedArray.length} 筆上傳資料，` +
      `日期範圍內共 ${queriedEntries.length} 筆紀錄。` +
      "\n請選擇冰箱，再按「產製表格」。"
    );

  } catch (error) {
    if (revision !== queryRevision) {
      showMessage("查詢條件已變更，請重新查詢。");
    } else if (error.name === "AbortError") {
      showMessage(
        timedOut ? "查詢逾時，請稍後再試。" : "查詢已取消。",
        true
      );
    } else {
      showMessage(`查詢失敗：${error.message}`, true);
      console.error(error);
    }

  } finally {
    clearTimeout(timeoutId);

    if (activeController === controller) {
      activeController = null;
    }

    queryButton.disabled = false;
    isBusy = false;
    hideLoading();
  }
}

function invalidateQuery(showNotice = true) {
  queryRevision++;

  if (activeController) {
    activeController.abort();
  }

  queriedArray = [];
  queriedEntries = null;
  queriedStart = "";
  queriedEnd = "";

  $("report").replaceChildren();
  $("generateButton").disabled = true;
  $("printButton").disabled = true;

  showMessage(
    showNotice
      ? "查詢條件已變更，請重新查詢。"
      : ""
  );
}

// ========================================
// Loading
// ========================================

function showLoading(text) {
  focusBeforeLoading = document.activeElement;

  $("loadingText").textContent = text;
  $("loadingOverlay").hidden = false;

  const main = document.querySelector("main");

  if (main) {
    main.inert = true;
  }

  $("report").setAttribute("aria-busy", "true");

  $("loadingOverlay").setAttribute("tabindex", "-1");
  $("loadingOverlay").focus();
}

function updateLoadingText(text) {
  $("loadingText").textContent = text;
}

function hideLoading() {
  $("loadingOverlay").hidden = true;

  const main = document.querySelector("main");

  if (main) {
    main.inert = false;
  }

  $("report").setAttribute("aria-busy", "false");

  if (
    focusBeforeLoading instanceof HTMLElement &&
    focusBeforeLoading.isConnected &&
    !focusBeforeLoading.matches(":disabled")
  ) {
    focusBeforeLoading.focus();
  }

  focusBeforeLoading = null;
}

function waitForPaint() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      setTimeout(resolve, 0);
    });
  });
}

// ========================================
// 解析 GAS 回傳資料
//
// 預期格式：
// [
//   {
//     time: "2026-10-02 13:43:15",
//     json: "{\"records\":[...]}"
//   }
// ]
// ========================================

function parseSource(source) {
  // 同時支援陣列與 JSON 字串
  if (typeof source === "string") {
    source = JSON.parse(source);
  }

  if (!Array.isArray(source)) {
    throw new Error("最外層資料必須是陣列。");
  }

  const entries = [];
  let sequence = 0;

  source.forEach((submission, submissionIndex) => {
    const prefix = `第 ${submissionIndex + 1} 筆上傳資料`;

    if (!submission || typeof submission !== "object") {
      throw new Error(`${prefix}格式不正確。`);
    }

    const time = parseServerTime(submission.time);

    if (!time) {
      throw new Error(
        `${prefix}的 time 必須是有效的 YYYY-MM-DD HH:mm:ss。`
      );
    }

    let payload;

    try {
      payload = typeof submission.json === "string"
        ? JSON.parse(submission.json)
        : submission.json;
    } catch {
      throw new Error(`${prefix}的 json 不是有效 JSON。`);
    }

    if (!payload || !Array.isArray(payload.records)) {
      throw new Error(`${prefix}缺少 records 陣列。`);
    }

    payload.records.forEach((record, recordIndex) => {
      const location =
        `${prefix}，第 ${recordIndex + 1} 筆紀錄`;

      if (!record || typeof record !== "object") {
        throw new Error(`${location}格式不正確。`);
      }

      if (!["temperature", "recorder_min"].includes(record.type)) {
        throw new Error(`${location}的 type 不支援。`);
      }

      const fridge = Number(record.fridge);

      if (
        !Number.isInteger(fridge) ||
        fridge < 1 ||
        fridge > 3
      ) {
        throw new Error(`${location}的冰箱編號必須是 1～3。`);
      }

      const layer = record.type === "temperature"
        ? Number(record.layer)
        : null;

      if (
        record.type === "temperature" &&
        (!Number.isInteger(layer) || layer < 1 || layer > 10)
      ) {
        throw new Error(`${location}的層數必須是 1～10。`);
      }

      const normalized = {
        ...record,
        fridge,
        layer,
        user: String(record.user ?? "").trim(),
        notes: String(record.notes ?? "").trim()
      };

      const numericKeys = record.type === "temperature"
        ? [
            "maxTemperature",
            "currentTemperature",
            "minTemperature"
          ]
        : ["recorderMinTemperature"];

      for (const key of numericKeys) {
        normalized[key] = optionalNumber(
          record[key],
          location,
          key
        );
      }

      if (record.type === "temperature") {
        for (const key of ["vaccineMonitor", "freezeMonitor"]) {
          const value = record[key];

          if (
            value !== null &&
            value !== undefined &&
            value !== "" &&
            !["正常", "異常","-A","1/4A","1/3A","其他"].includes(value)
          ) {
            throw new Error(
              `${location}的 ${key} 必須是正常或異常。`
            );
          }

          normalized[key] = value || null;
        }
      }

      entries.push({
        date: time.date,
        period: time.hour < 12 ? "上午" : "下午",
        sortTime: time.sortTime,
        sequence: sequence++,
        record: normalized
      });
    });
  });

  // 同一秒的紀錄依回傳陣列順序排列
  entries.sort((a, b) =>
    a.sortTime.localeCompare(b.sortTime) ||
    a.sequence - b.sequence
  );

  return entries;
}

function optionalNumber(value, location, key) {
  if (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return null;
  }

  if (
    !["number", "string"].includes(typeof value) ||
    !Number.isFinite(Number(value))
  ) {
    throw new Error(`${location}的 ${key} 不是有效數字。`);
  }

  return Number(value);
}

function parseServerTime(value) {
  const match =
    /^(\d{4}-\d{2}-\d{2}) (\d{2}):(\d{2}):(\d{2})$/
      .exec(String(value ?? ""));

  if (!match || !validDate(match[1])) {
    return null;
  }

  const hour = Number(match[2]);
  const minute = Number(match[3]);
  const second = Number(match[4]);

  if (hour > 23 || minute > 59 || second > 59) {
    return null;
  }

  // 直接依 server 提供的日期與小時分組，
  // 不轉換成瀏覽器時區。
  return {
    date: match[1],
    hour,
    sortTime: match[0]
  };
}

// ========================================
// 同日期、同時段統計
// ========================================

function summarize(entries) {
  const layers = Array.from({ length: 10 }, () => ({
    maxTemperature: null,
    currentTemperature: null,
    minTemperature: null,
    vaccineMonitor: null,
    freezeMonitor: null
  }));

  const users = new Set();
  const notes = [];

  let recorderMin = null;

  for (const entry of entries) {
    const record = entry.record;

    if (record.user) {
      users.add(record.user);
    }

    if (record.notes) {
      const position = record.type === "temperature"
        ? `第 ${record.layer} 層`
        : "持續記錄器";

      notes.push(
        `${position}｜${record.user || "未填姓名"}：` +
        record.notes
      );
    }

    if (record.type === "recorder_min") {
      recorderMin = mergeNumber(
        recorderMin,
        record.recorderMinTemperature,
        "min"
      );

      continue;
    }

    const layer = layers[record.layer - 1];

    // 同層同時段：最高溫取最高
    layer.maxTemperature = mergeNumber(
      layer.maxTemperature,
      record.maxTemperature,
      "max"
    );

    // 同層同時段：最低溫取最低
    layer.minTemperature = mergeNumber(
      layer.minTemperature,
      record.minTemperature,
      "min"
    );

    // 現在溫取最後一筆有填寫的數值
    if (record.currentTemperature !== null) {
      layer.currentTemperature = record.currentTemperature;
    }

    // 同時段只要出現異常，就維持異常
    layer.vaccineMonitor = mergeMonitor(
      layer.vaccineMonitor,
      record.vaccineMonitor
    );

    layer.freezeMonitor = mergeMonitor(
      layer.freezeMonitor,
      record.freezeMonitor
    );
  }

  return {
    layers,
    users: [...users],
    notes,
    recorderMin
  };
}

function mergeNumber(previous, incoming, mode) {
  if (incoming === null) {
    return previous;
  }

  if (previous === null) {
    return incoming;
  }

  return mode === "max"
    ? Math.max(previous, incoming)
    : Math.min(previous, incoming);
}

function mergeMonitor(previous, incoming) {
  if (previous === "異常" || incoming === "異常") {
    return "異常";
  }

  return incoming || previous;
}

function aggregateLayers(layers, key, mode) {
  const values = layers
    .map((layer) => layer[key])
    .filter((value) =>
      typeof value === "number" &&
      Number.isFinite(value)
    );

  if (values.length === 0) {
    return null;
  }

  return mode === "max"
    ? Math.max(...values)
    : Math.min(...values);
}

// ========================================
// 產製報表
// ========================================

async function generateReportWithLoading() {
  if (isBusy) {
    return;
  }

  if (queriedEntries === null) {
    showMessage("請先查詢資料，再產製表格。", true);
    return;
  }

  isBusy = true;
  showLoading("正在產製表格…");

  try {
    await waitForPaint();
    await generateReport();

  } catch (error) {
    $("report").replaceChildren();
    $("printButton").disabled = true;

    showMessage(`產製失敗：${error.message}`, true);
    console.error(error);

  } finally {
    isBusy = false;
    hideLoading();
  }
}

async function generateReport() {
  if (queriedEntries === null) {
    throw new Error("請先查詢資料。");
  }

  const report = $("report");

  report.replaceChildren();
  $("printButton").disabled = true;

  const start = queriedStart;
  const end = queriedEnd;
  const fridge = Number($("fridge").value);
  const revision = queryRevision;

  if (!Number.isInteger(fridge) || fridge < 1 || fridge > 3) {
    throw new Error("請選擇有效的冰箱。");
  }

  const selected = queriedEntries.filter(
    (entry) => entry.record.fridge === fridge
  );

  const groups = new Map();

  for (const entry of selected) {
    const key = `${entry.date}|${entry.period}`;

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key).push(entry);
  }

  const fragment = document.createDocumentFragment();

  const title = document.createElement("h2");
  title.className = "report-title";
  title.textContent =
    `冰箱 ${fridge}｜${rocDate(start)}～${rocDate(end)}` +
    "｜單位：°C";

  fragment.appendChild(title);

// 加入溫度折線圖
fragment.appendChild(
  createTemperatureChart(start, end, fridge, groups)
);


  let days = 0;

  for (const date of dateRange(start, end)) {
    days++;

    for (const period of ["上午", "下午"]) {
      const entries = groups.get(`${date}|${period}`) || [];
      const summary = summarize(entries);

      fragment.appendChild(
        createPeriodTable(date, period, fridge, summary)
      );
    }

    // 大範圍查詢時，定期讓瀏覽器更新 Loading
    if (days % 7 === 0) {
      updateLoadingText(`正在產製表格…已整理 ${days} 天`);
      await waitForPaint();
    }

    if (revision !== queryRevision) {
      throw new Error("查詢條件已變更，請重新查詢。");
    }
  }

  report.appendChild(fragment);
  $("printButton").disabled = false;

  showMessage(
    `冰箱 ${fridge}：共 ${days} 天、${days * 2} 個時段，` +
    `符合條件的紀錄共 ${selected.length} 筆。` +
    "\n空白表示沒有資料；手機或平板可左右滑動表格。"
  );
}

function createPeriodTable(date, period, fridge, summary) {
  const section = document.createElement("section");
  section.className = "period";

  const wrapper = document.createElement("div");
  wrapper.className = "table-scroll";
  wrapper.tabIndex = 0;

  wrapper.setAttribute(
    "aria-label",
    `${rocDate(date)} ${period} 冰箱 ${fridge}，可左右捲動`
  );

  const table = document.createElement("table");

  const caption = table.createCaption();
  caption.textContent =
    `${rocDate(date)} ${period}｜冰箱 ${fridge}`;

  const colgroup = document.createElement("colgroup");

  const columnClasses = [
    "date-col",
    "item-col",
    ...Array(10).fill(""),
    "summary-col",
    "recorder-col"
  ];

  for (const className of columnClasses) {
    const col = document.createElement("col");
    col.className = className;
    colgroup.appendChild(col);
  }

  table.appendChild(colgroup);

  const headRow = table.createTHead().insertRow();

  const headers = [
    "日期",
    "項目",
    ...Array.from(
      { length: 10 },
      (_, index) => `第${index + 1}層`
    ),
    "判讀綜合溫度",
    "持續記錄器最低溫"
  ];

  for (const text of headers) {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = text;
    headRow.appendChild(th);
  }

  const tbody = table.createTBody();

  ITEMS.forEach((item, index) => {
    const tr = tbody.insertRow();

    // 左側日期、時段與紀錄者，合併五列
    if (index === 0) {
      const dateCell = document.createElement("th");

      dateCell.rowSpan = ITEMS.length;
      dateCell.scope = "rowgroup";
      dateCell.className = "date-cell";

      appendTextBlock(dateCell, rocDate(date));
      appendTextBlock(dateCell, period, "period-name");
      appendTextBlock(dateCell, "紀錄者");
      appendTextBlock(
        dateCell,
        summary.users.join("\n"),
        "users"
      );

      tr.appendChild(dateCell);
    }

    const itemCell = document.createElement("th");
    itemCell.scope = "row";
    itemCell.className = "item-cell";
    itemCell.textContent = item.label;
    tr.appendChild(itemCell);

    // 第 1～10 層
    for (const layer of summary.layers) {
      const value = layer[item.key];
      const td = tr.insertCell();

      // 保留 0，只將 null / undefined 顯示為空白
      td.textContent = value ?? "";

      if (value === "異常") {
        td.classList.add("abnormal");
      }
    }

    // 判讀綜合溫度
    const aggregateCell = tr.insertCell();
    aggregateCell.className = "aggregate";

    if (item.aggregate) {
      aggregateCell.textContent = aggregateLayers(
        summary.layers,
        item.key,
        item.aggregate
      ) ?? "";
    }

    // 每個時段只有一個持續記錄器最低溫，合併五列
    if (index === 0) {
      const recorderCell = tr.insertCell();

      recorderCell.rowSpan = ITEMS.length;
      recorderCell.className = "recorder";
      recorderCell.textContent = summary.recorderMin ?? "";
    }
  });

  wrapper.appendChild(table);
  section.appendChild(wrapper);

  if (summary.notes.length > 0) {
    const notes = document.createElement("p");

    notes.className = "notes";
    notes.textContent =
      `備註：\n${summary.notes.join("\n")}`;

    section.appendChild(notes);
  }

  return section;
}

function appendTextBlock(parent, text, className = "") {
  const div = document.createElement("div");
  div.className = className;
  div.textContent = text;
  parent.appendChild(div);
}

// ========================================
// 共用工具
// ========================================

function showMessage(text, isError = false) {
  $("message").className = isError ? "error" : "";
  $("message").textContent = text;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function localDateString(date) {
  return (
    `${date.getFullYear()}-` +
    `${pad(date.getMonth() + 1)}-` +
    `${pad(date.getDate())}`
  );
}

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);

  return (
    Number.isFinite(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

function rocDate(value) {
  const [year, month, day] = value.split("-");
  const rocYear = Number(year) - 1911;

  const displayYear = rocYear > 0
    ? rocYear
    : `民前${1 - rocYear}`;

  return `${displayYear}/${month}/${day}`;
}

function* dateRange(start, end) {
  const current = new Date(`${start}T00:00:00Z`);
  const last = new Date(`${end}T00:00:00Z`);

  while (current <= last) {
    yield current.toISOString().slice(0, 10);
    current.setUTCDate(current.getUTCDate() + 1);
  }
}

function createTemperatureChart(start, end, fridge, groups) {
  const series = [
    {
      label: "最高溫",
      key: "maxTemperature",
      aggregate: "max",
      color: "#111111"
    },
    {
      label: "現在溫",
      key: "currentTemperature",
      aggregate: "min",
      color: "#1565c0"
    },
    {
      label: "最低溫",
      key: "minTemperature",
      aggregate: "min",
      color: "#d32f2f"
    }
  ];

  const points = [];
  const dates = [...dateRange(start, end)];

  for (const date of dates) {
    for (const period of ["上午", "下午"]) {
      const entries = groups.get(`${date}|${period}`) || [];
      const summary = summarize(entries);

      const point = {
        date,
        period,
        notes: summary.notes
      };

      for (const item of series) {
        point[item.key] = aggregateLayers(
          summary.layers,
          item.key,
          item.aggregate
        );
      }

      points.push(point);
    }
  }

  const section = document.createElement("section");
  section.className = "temperature-chart";

  const heading = document.createElement("h2");
  heading.textContent = `冰箱 ${fridge}｜溫度折線圖`;
  section.appendChild(heading);

  const description = document.createElement("p");
  description.className = "chart-description";
  description.textContent =
    `${rocDate(start)}～${rocDate(end)}。` +
    "每日上午、下午各一點；淡綠區為標準範圍 2～8°C。" +
    "空白資料不連線，超出縱軸範圍的數值以邊界三角形標示。";

  section.appendChild(description);

  const legend = document.createElement("div");
  legend.className = "chart-legend";

  for (const item of series) {
    const label = document.createElement("span");
    const line = document.createElement("i");

    line.style.backgroundColor = item.color;
    label.append(line, document.createTextNode(item.label));
    legend.appendChild(label);
  }

  section.appendChild(legend);

  // 日期較多時擴大圖表，手機可左右滑動。
  const width = Math.max(760, dates.length * 100 + 100);
  const height = 380;

  const margin = {
    left: 55,
    right: 25,
    top: 25,
    bottom: 75
  };

  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const plotBottom = margin.top + plotHeight;

  const minY = -2;
  const maxY = 13;

  const x = (index) =>
    margin.left + ((index + 0.5) / points.length) * plotWidth;

  const y = (value) =>
    margin.top + ((maxY - value) / (maxY - minY)) * plotHeight;

  const svg = chartSvgElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    width,
    height,
    role: "img",
    "aria-label":
      `冰箱 ${fridge} 溫度折線圖，最高溫黑色、現在溫藍色、最低溫紅色`
  });

  const svgTitle = chartSvgElement("title");
  svgTitle.textContent =
    `${rocDate(start)}～${rocDate(end)}，冰箱 ${fridge} 溫度折線圖`;

  svg.appendChild(svgTitle);

  // 標準範圍底色
  svg.appendChild(chartSvgElement("rect", {
    x: margin.left,
    y: y(8),
    width: plotWidth,
    height: y(2) - y(8),
    fill: "#e8f5e9"
  }));

  // Y 軸刻度與水平格線
  for (let value = minY; value <= maxY; value++) {
    svg.appendChild(chartSvgElement("line", {
      x1: margin.left,
      y1: y(value),
      x2: width - margin.right,
      y2: y(value),
      stroke: "#dce3e8",
      "stroke-width": 1
    }));

    chartSvgText(
      svg,
      margin.left - 10,
      y(value) + 4,
      String(value),
      { "text-anchor": "end" }
    );
  }

  // 2°C、8°C 標準界線
  for (const value of [2, 8]) {
    svg.appendChild(chartSvgElement("line", {
      x1: margin.left,
      y1: y(value),
      x2: width - margin.right,
      y2: y(value),
      stroke: "#43864a",
      "stroke-width": 1.5,
      "stroke-dasharray": "6 4"
    }));
  }

  chartSvgText(svg, 8, 16, "°C");

  // 每日分隔線與日期
  dates.forEach((date, index) => {
    const dayStart =
      margin.left + (index / dates.length) * plotWidth;

    svg.appendChild(chartSvgElement("line", {
      x1: dayStart,
      y1: margin.top,
      x2: dayStart,
      y2: plotBottom,
      stroke: "#e5eaf0",
      "stroke-width": 1
    }));

    const middle = (x(index * 2) + x(index * 2 + 1)) / 2;

    chartSvgText(
      svg,
      middle,
      plotBottom + 43,
      rocDate(date),
      { "text-anchor": "middle" }
    );
  });

  points.forEach((point, index) => {
    chartSvgText(
      svg,
      x(index),
      plotBottom + 20,
      point.period,
      {
        "text-anchor": "middle",
        fill: "#657789"
      }
    );
  });

  // 座標軸
  svg.appendChild(chartSvgElement("path", {
    d:
      `M ${margin.left} ${margin.top} ` +
      `V ${plotBottom} H ${width - margin.right}`,
    fill: "none",
    stroke: "#536575",
    "stroke-width": 1.2
  }));

  // 用裁切範圍處理超過 -2～13 的線段，
  // 不把實際溫度改成邊界數值。
  const clipId =
    "temperature-clip-" + Math.random().toString(36).slice(2);

  const defs = chartSvgElement("defs");
  const clipPath = chartSvgElement("clipPath", { id: clipId });

  clipPath.appendChild(chartSvgElement("rect", {
    x: margin.left,
    y: margin.top,
    width: plotWidth,
    height: plotHeight
  }));

  defs.appendChild(clipPath);
  svg.appendChild(defs);

  const lineGroup = chartSvgElement("g", {
    "clip-path": `url(#${clipId})`
  });

  svg.appendChild(lineGroup);

  // 各條折線依時間順序連接有效的溫度點
  for (const item of series) {
    let path = "";

    points.forEach((point, index) => {
      const value = point[item.key];
      if (value === null) return;

      const command = path ? "L" : "M";
      path += `${command} ${x(index)} ${y(value)} `;
    });

    lineGroup.appendChild(chartSvgElement("path", {
      d: path,
      fill: "none",
      stroke: item.color,
      "stroke-width": 2,
      "stroke-linejoin": "round",
      "stroke-linecap": "round"
    }));
  }

  // 資料點：超出標準範圍時，加大並改為空心。
  for (const item of series) {
    points.forEach((point, index) => {
      const value = point[item.key];

      if (value === null) {
        return;
      }

      const abnormal = value < 2 || value > 8;
      const outsideAxis = value < minY || value > maxY;
      const px = x(index);

      let marker;

      if (outsideAxis) {
        const py = value > maxY ? y(maxY) : y(minY);
        const direction = value > maxY ? 1 : -1;

        marker = chartSvgElement("polygon", {
          points:
            `${px},${py} ` +
            `${px - 5},${py + direction * 8} ` +
            `${px + 5},${py + direction * 8}`,
          fill: item.color,
          stroke: item.color
        });
      } else {
        marker = chartSvgElement("circle", {
          cx: px,
          cy: y(value),
          r: abnormal ? 4.5 : 3,
          fill: abnormal ? "#ffffff" : item.color,
          stroke: item.color,
          "stroke-width": 2
        });
      }

      const tooltip = chartSvgElement("title");
      tooltip.textContent =
        `${rocDate(point.date)} ${point.period}｜` +
        `${item.label}：${value}°C` +
        (abnormal ? "（超出標準範圍）" : "");

      marker.appendChild(tooltip);
      svg.appendChild(marker);
    });
  }

  const scroll = document.createElement("div");
  // 將異常原因寫入 SVG 圖表內
const annotatedHeight = addChartAnnotations({
  svg,
  points,
  series,
  x,
  y,
  width,
  height,
  minY,
  maxY
});

// 擴大 SVG，容納異常原因
svg.setAttribute("height", annotatedHeight);
svg.setAttribute(
  "viewBox",
  `0 0 ${width} ${annotatedHeight}`
);
  scroll.className = "chart-scroll";
  scroll.tabIndex = 0;
  scroll.setAttribute("aria-label", "溫度折線圖，可左右捲動");
  scroll.appendChild(svg);
  section.appendChild(scroll);

  

  return section;
}

function chartSvgElement(tag, attributes = {}) {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    tag
  );

  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, String(value));
  }

  return element;
}

function chartSvgText(svg, x, y, text, attributes = {}) {
  const element = chartSvgElement("text", {
    x,
    y,
    fill: "#34495e",
    "font-size": 12,
    ...attributes
  });

  element.textContent = text;
  svg.appendChild(element);

  return element;
}
function addChartAnnotations({
  svg,
  points,
  series,
  x,
  y,
  width,
  height,
  minY,
  maxY
}) {
  const annotations = [];

  // 每個時段合併成一則註記，避免三種溫度重複顯示原因
  points.forEach((point, index) => {
    const abnormalItems = series.filter((item) => {
      const value = point[item.key];

      return Number.isFinite(value) &&
        (value < 2 || value > 8);
    });

    if (abnormalItems.length === 0) {
      return;
    }

    const readings = abnormalItems.map(
      (item) => `${item.label} ${point[item.key]}°C`
    );

    const originalNotes = [...new Set(point.notes || [])];

    annotations.push({
      point,
      pointIndex: index,
      abnormalItems,
      readings: readings.join("、"),
      reason: originalNotes.length > 0
        ? originalNotes.join("\n")
        : "未填寫異常原因"
    });
  });

  if (annotations.length === 0) {
    return height;
  }

  const left = 55;
  const right = 25;
  const boxWidth = width - left - right;
  const textWidth = boxWidth - 24;

  const fontSize = 12;
  const lineHeight = 18;

  let cursorY = height + 12;

  chartSvgText(
    svg,
    left,
    cursorY,
    "異常原因／該時段原始備註",
    {
      "font-size": 14,
      "font-weight": "bold",
      fill: "#9d2633"
    }
  );

  cursorY += 16;

  annotations.forEach((annotation, index) => {
    const number = index + 1;

    const {
      point,
      pointIndex,
      abnormalItems,
      readings,
      reason
    } = annotation;

    // 在異常點附近顯示編號，並用引線指向異常點
    abnormalItems.forEach((item, itemIndex) => {
      const value = point[item.key];

      // 超出縱軸的點，以圖表邊界作為引線起點
      const visibleValue = Math.max(minY, Math.min(maxY, value));

      const px = x(pointIndex);
      const py = y(visibleValue);

      const direction = px > width / 2 ? -1 : 1;
      const labelX = px + direction * (18 + itemIndex * 13);

      const labelY = value >= 8
        ? py + 18 + itemIndex * 13
        : py - 18 - itemIndex * 13;

      svg.appendChild(chartSvgElement("line", {
        x1: px,
        y1: py,
        x2: labelX,
        y2: labelY,
        stroke: item.color,
        "stroke-width": 1
      }));

      svg.appendChild(chartSvgElement("circle", {
        cx: labelX,
        cy: labelY,
        r: 8,
        fill: "#ffffff",
        stroke: item.color,
        "stroke-width": 1
      }));

      chartSvgText(
        svg,
        labelX,
        labelY + 3,
        String(number),
        {
          "text-anchor": "middle",
          "font-size": 9,
          "font-weight": "bold",
          fill: item.color
        }
      );
    });

    const heading =
      `【${number}】${rocDate(point.date)} ${point.period}｜${readings}`;

    const headingLines = wrapChartText(
      heading,
      textWidth,
      fontSize
    );

    const reasonLines = wrapChartText(
      `備註：${reason}`,
      textWidth,
      fontSize
    );

    const boxHeight =
      (headingLines.length + reasonLines.length) * lineHeight + 20;

    svg.appendChild(chartSvgElement("rect", {
      x: left,
      y: cursorY,
      width: boxWidth,
      height: boxHeight,
      rx: 5,
      fill: "#fff7f7",
      stroke: "#e6b9bf",
      "stroke-width": 1
    }));

    let textY = cursorY + 18;

    for (const line of headingLines) {
      chartSvgText(svg, left + 12, textY, line, {
        "font-size": fontSize,
        "font-weight": "bold",
        fill: "#9d2633"
      });

      textY += lineHeight;
    }

    for (const line of reasonLines) {
      chartSvgText(svg, left + 12, textY, line, {
        "font-size": fontSize,
        fill: "#34495e"
      });

      textY += lineHeight;
    }

    cursorY += boxHeight + 10;
  });

  return cursorY + 10;
}

// SVG 文字不會自動換行，依實際文字寬度分行
function wrapChartText(text, maxWidth, fontSize = 12) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  context.font =
    `${fontSize}px "Microsoft JhengHei", system-ui, sans-serif`;

  const lines = [];

  for (const paragraph of String(text).split(/\r?\n/)) {
    let line = "";

    for (const character of paragraph) {
      const candidate = line + character;

      if (
        line !== "" &&
        context.measureText(candidate).width > maxWidth
      ) {
        lines.push(line);
        line = character;
      } else {
        line = candidate;
      }
    }

    lines.push(line);
  }

  return lines;
}