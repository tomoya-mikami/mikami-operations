/**
 * Car parts price monitor MVP.
 *
 * Safe-by-default design:
 * - Creates only new monitoring sheets.
 * - Does not delete sheets, rows, columns, or existing business data.
 * - Does not update eBay/Sellsta/listings.
 * - Does not auto-change selling prices.
 * - Writes alerts as candidates only.
 */

const CP_MONITOR = {
  sheets: {
    settings: '設定',
    master: '価格監視マスター',
    history: '価格履歴',
    candidates: '販売価格見直し候補',
    manualQueue: '手動確認キュー'
  },
  status: {
    ok: 'OK',
    manual: '要手動確認',
    error: 'エラー',
    noUrl: 'URL不明',
    priceUnknown: '価格不明'
  }
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('カーパーツ価格監視')
    .addItem('初期セットアップ', 'setupCarpartsPriceMonitor')
    .addSeparator()
    .addItem('現在のシートから監視マスター作成', 'buildMonitorMasterFromActiveSheet')
    .addItem('今日の確認分を実行', 'runDuePriceChecks')
    .addItem('選択行だけ価格確認', 'runSelectedMonitorRows')
    .addSeparator()
    .addItem('見直し候補を再作成', 'rebuildReviewCandidates')
    .addItem('手動確認キューを再作成', 'rebuildManualQueue')
    .addToUi();
}

function setupCarpartsPriceMonitor() {
  const ss = SpreadsheetApp.getActive();
  const settings = getOrCreateSheet_(ss, CP_MONITOR.sheets.settings);
  const master = getOrCreateSheet_(ss, CP_MONITOR.sheets.master);
  const history = getOrCreateSheet_(ss, CP_MONITOR.sheets.history);
  const candidates = getOrCreateSheet_(ss, CP_MONITOR.sheets.candidates);
  const manualQueue = getOrCreateSheet_(ss, CP_MONITOR.sheets.manualQueue);

  setupSettingsSheet_(settings);
  setupMasterSheet_(master);
  setupHistorySheet_(history);
  setupCandidatesSheet_(candidates);
  setupManualQueueSheet_(manualQueue);

  SpreadsheetApp.getActive().toast('価格監視MVPの初期セットアップが完了しました。', 'カーパーツ価格監視', 8);
}

function buildMonitorMasterFromActiveSheet() {
  setupCarpartsPriceMonitor();

  const ss = SpreadsheetApp.getActive();
  const source = ss.getActiveSheet();
  if (isMonitorSystemSheet_(source.getName())) {
    SpreadsheetApp.getUi().alert('入力用シートを開いた状態で実行してください。監視用タブからは作成しません。');
    return;
  }

  const settings = readSettings_();
  const master = ss.getSheetByName(CP_MONITOR.sheets.master);
  const lastRow = source.getLastRow();
  if (lastRow < settings.SOURCE_DATA_START_ROW) {
    SpreadsheetApp.getUi().alert('入力用シートにデータ行が見つかりません。');
    return;
  }

  const sourceRange = source.getRange(
    settings.SOURCE_DATA_START_ROW,
    1,
    lastRow - settings.SOURCE_DATA_START_ROW + 1,
    Math.max(source.getLastColumn(), settings.SOURCE_EBAY_BASE_URL_COL)
  );
  const sourceValues = sourceRange.getValues();
  const existingKeys = getExistingMasterKeys_(master);
  const now = new Date();
  const rows = [];

  sourceValues.forEach((row, idx) => {
    const sourceRowNumber = settings.SOURCE_DATA_START_ROW + idx;
    const monotaroUrl = normalizeUrl_(cell_(row, settings.SOURCE_MONOTARO_URL_COL));
    if (!monotaroUrl) return;

    const partNumber = String(cell_(row, settings.SOURCE_PART_NUMBER_COL) || '').trim();
    const sku = String(cell_(row, settings.SOURCE_SKU_COL) || '').trim();
    const key = makeMasterKey_(source.getName(), sourceRowNumber, monotaroUrl, partNumber);
    if (existingKeys[key]) return;

    const currentPrice = toNumber_(cell_(row, settings.SOURCE_MONOTARO_PRICE_COL));
    const packQty = toNumber_(cell_(row, settings.SOURCE_PACK_QTY_COL)) || 1;
    const purchasePrice = currentPrice ? Math.round(currentPrice * settings.PURCHASE_FACTOR) : '';
    const ebayBaseUrl = normalizeUrl_(cell_(row, settings.SOURCE_EBAY_BASE_URL_COL));

    rows.push([
      true,
      'B',
      source.getName(),
      sourceRowNumber,
      sku,
      String(cell_(row, settings.SOURCE_MAKER_COL) || '').trim(),
      partNumber,
      monotaroUrl,
      packQty,
      currentPrice || '',
      '',
      purchasePrice,
      '',
      '',
      '',
      '',
      now,
      now,
      '',
      '',
      '',
      ebayBaseUrl,
      '',
      '',
      '',
      '',
      '',
      '初回取込'
    ]);
  });

  if (rows.length) {
    master.getRange(master.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    formatMasterBody_(master);
  }

  SpreadsheetApp.getActive().toast(`${rows.length}件を価格監視マスターに追加しました。`, 'カーパーツ価格監視', 8);
}

function runDuePriceChecks() {
  setupCarpartsPriceMonitor();
  const settings = readSettings_();
  const master = SpreadsheetApp.getActive().getSheetByName(CP_MONITOR.sheets.master);
  const lastRow = master.getLastRow();
  if (lastRow < 2) return;

  const values = master.getRange(2, 1, lastRow - 1, getMasterHeaders_().length).getValues();
  const today = startOfDay_(new Date());
  const targetRows = [];

  values.forEach((row, idx) => {
    if (targetRows.length >= settings.MAX_ROWS_PER_RUN) return;
    const enabled = row[0] === true;
    const nextDate = row[17] ? startOfDay_(new Date(row[17])) : today;
    if (enabled && nextDate <= today) {
      targetRows.push(idx + 2);
    }
  });

  runMonitorRows_(targetRows, settings);
}

function runSelectedMonitorRows() {
  setupCarpartsPriceMonitor();
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getActiveSheet();
  if (sheet.getName() !== CP_MONITOR.sheets.master) {
    SpreadsheetApp.getUi().alert('価格監視マスターで確認したい行を選択してから実行してください。');
    return;
  }

  const range = sheet.getActiveRange();
  if (!range) return;
  const start = Math.max(2, range.getRow());
  const end = Math.min(sheet.getLastRow(), range.getLastRow());
  const rows = [];
  for (let row = start; row <= end; row++) rows.push(row);
  runMonitorRows_(rows, readSettings_());
}

function rebuildReviewCandidates() {
  setupCarpartsPriceMonitor();
  const ss = SpreadsheetApp.getActive();
  const master = ss.getSheetByName(CP_MONITOR.sheets.master);
  const candidates = ss.getSheetByName(CP_MONITOR.sheets.candidates);
  const headers = getCandidatesHeaders_();
  candidates.clearContents();
  candidates.getRange(1, 1, 1, headers.length).setValues([headers]);

  const lastRow = master.getLastRow();
  if (lastRow < 2) return;
  const rows = master.getRange(2, 1, lastRow - 1, getMasterHeaders_().length).getValues();
  const out = [];
  rows.forEach(row => {
    const review = String(row[24] || '').trim();
    const stop = String(row[25] || '').trim();
    if (!review && !stop) return;
    out.push([
      new Date(),
      row[1],
      row[4],
      row[6],
      row[7],
      row[9],
      row[10],
      row[12],
      row[13],
      row[14],
      row[20],
      review,
      stop,
      row[27]
    ]);
  });
  if (out.length) candidates.getRange(2, 1, out.length, headers.length).setValues(out);
  formatListSheet_(candidates);
}

function rebuildManualQueue() {
  setupCarpartsPriceMonitor();
  const ss = SpreadsheetApp.getActive();
  const master = ss.getSheetByName(CP_MONITOR.sheets.master);
  const queue = ss.getSheetByName(CP_MONITOR.sheets.manualQueue);
  const headers = getManualQueueHeaders_();
  queue.clearContents();
  queue.getRange(1, 1, 1, headers.length).setValues([headers]);

  const lastRow = master.getLastRow();
  if (lastRow < 2) return;
  const rows = master.getRange(2, 1, lastRow - 1, getMasterHeaders_().length).getValues();
  const out = [];
  rows.forEach(row => {
    const status = String(row[18] || '').trim();
    if (![CP_MONITOR.status.manual, CP_MONITOR.status.error, CP_MONITOR.status.noUrl, CP_MONITOR.status.priceUnknown].includes(status)) {
      return;
    }
    out.push([
      new Date(),
      row[1],
      row[4],
      row[6],
      row[7],
      status,
      row[14],
      row[27]
    ]);
  });
  if (out.length) queue.getRange(2, 1, out.length, headers.length).setValues(out);
  formatListSheet_(queue);
}

function runMonitorRows_(rowNumbers, settings) {
  if (!rowNumbers.length) {
    SpreadsheetApp.getActive().toast('今回確認対象の行はありません。', 'カーパーツ価格監視', 5);
    return;
  }

  const ss = SpreadsheetApp.getActive();
  const master = ss.getSheetByName(CP_MONITOR.sheets.master);
  const history = ss.getSheetByName(CP_MONITOR.sheets.history);
  const headers = getMasterHeaders_();
  const historyRows = [];
  const now = new Date();
  let processed = 0;

  rowNumbers.slice(0, settings.MAX_ROWS_PER_RUN).forEach(rowNumber => {
    const row = master.getRange(rowNumber, 1, 1, headers.length).getValues()[0];
    const result = checkMonotaroUrl_(row[7], settings);
    const previousPrice = toNumber_(row[10]) || toNumber_(row[9]) || '';
    const currentPrice = result.price || '';
    const diff = previousPrice && currentPrice ? currentPrice - previousPrice : '';
    const changeRate = previousPrice && currentPrice ? diff / previousPrice : '';
    const purchasePrice = currentPrice ? Math.round(currentPrice * settings.PURCHASE_FACTOR) : row[11];
    const nextDate = addDays_(now, settings.PRICE_CHECK_CYCLE_DAYS);
    const alert = judgeAlert_(previousPrice, currentPrice, changeRate, result.itemStatus, settings);

    master.getRange(rowNumber, 10, 1, 19).setValues([[
      previousPrice || row[9],
      currentPrice,
      purchasePrice,
      diff,
      changeRate,
      result.itemStatus,
      now,
      now,
      nextDate,
      result.fetchStatus,
      row[19],
      row[20],
      row[21],
      row[22],
      row[23],
      row[24],
      alert.reviewCandidate,
      alert.stopCandidate,
      [result.message, alert.memo].filter(Boolean).join(' / ')
    ]]);

    historyRows.push([
      now,
      row[4],
      row[6],
      row[7],
      previousPrice,
      currentPrice,
      diff,
      changeRate,
      result.itemStatus,
      result.fetchStatus,
      result.message
    ]);

    processed++;
    Utilities.sleep(settings.MIN_SLEEP_MS);
  });

  if (historyRows.length) {
    history.getRange(history.getLastRow() + 1, 1, historyRows.length, getHistoryHeaders_().length).setValues(historyRows);
  }
  rebuildReviewCandidates();
  rebuildManualQueue();
  applyMasterConditionalFormats_(master);
  SpreadsheetApp.getActive().toast(`${processed}件の価格確認が完了しました。`, 'カーパーツ価格監視', 8);
}

function checkMonotaroUrl_(url, settings) {
  if (!url) {
    return {
      price: '',
      itemStatus: '要確認',
      fetchStatus: CP_MONITOR.status.noUrl,
      message: 'URLが空です'
    };
  }

  try {
    const response = UrlFetchApp.fetch(url, {
      method: 'get',
      muteHttpExceptions: true,
      followRedirects: true,
      headers: {
        'User-Agent': settings.USER_AGENT
      }
    });
    const code = response.getResponseCode();
    const html = response.getContentText('UTF-8');
    if (code >= 400) {
      return {
        price: '',
        itemStatus: '要確認',
        fetchStatus: CP_MONITOR.status.error,
        message: `HTTP ${code}`
      };
    }

    const text = stripHtml_(html);
    const itemStatus = detectMonotaroStatus_(text);
    const price = extractMonotaroPrice_(html, text);
    const fetchStatus = price ? CP_MONITOR.status.ok : CP_MONITOR.status.priceUnknown;
    return {
      price,
      itemStatus,
      fetchStatus,
      message: price ? '' : '価格を自動取得できませんでした'
    };
  } catch (err) {
    return {
      price: '',
      itemStatus: '要確認',
      fetchStatus: CP_MONITOR.status.error,
      message: String(err && err.message ? err.message : err).slice(0, 200)
    };
  }
}

function extractMonotaroPrice_(html, text) {
  const patterns = [
    /"price"\s*:\s*"?([0-9,]+)"?/i,
    /"lowPrice"\s*:\s*"?([0-9,]+)"?/i,
    /販売価格[^0-9]{0,40}([0-9,]+)\s*円/,
    /税別[^0-9]{0,40}([0-9,]+)\s*円/,
    /￥\s*([0-9,]+)/
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern) || text.match(pattern);
    if (match && match[1]) {
      const value = toNumber_(match[1]);
      if (value) return value;
    }
  }
  return '';
}

function detectMonotaroStatus_(text) {
  const normalized = String(text || '').replace(/\s+/g, '');
  if (/取扱終了|販売終了|廃番|掲載終了|販売中止/.test(normalized)) return '取扱終了';
  if (/在庫切れ|欠品中|一時欠品/.test(normalized)) return '在庫切れ';
  if (/納期未定|入荷未定/.test(normalized)) return '納期未定';
  if (/ログイン|会員価格/.test(normalized)) return '要確認';
  return '通常';
}

function judgeAlert_(previousPrice, currentPrice, changeRate, itemStatus, settings) {
  const memo = [];
  let reviewCandidate = '';
  let stopCandidate = '';
  const diff = previousPrice && currentPrice ? currentPrice - previousPrice : 0;

  if (currentPrice && previousPrice && diff > 0) {
    reviewCandidate = '価格上昇: 販売価格見直し';
    memo.push(`差額 ${diff} 円`);
  }
  if (changeRate && changeRate >= settings.PRICE_UP_ALERT_RATE) {
    reviewCandidate = '価格上昇率超過: 販売価格見直し';
    memo.push(`変動率 ${Math.round(changeRate * 1000) / 10}%`);
  }
  if (diff >= settings.PRICE_UP_ALERT_YEN) {
    reviewCandidate = '価格上昇額超過: 販売価格見直し';
  }
  if (['取扱終了', '在庫切れ', '納期未定'].includes(itemStatus)) {
    stopCandidate = `${itemStatus}: 出品停止候補`;
  }
  return { reviewCandidate, stopCandidate, memo: memo.join(', ') };
}

function setupSettingsSheet_(sheet) {
  const rows = [
    ['設定名', '値', '説明'],
    ['PRICE_CHECK_CYCLE_DAYS', 14, '何日で1周するか'],
    ['MAX_ROWS_PER_RUN', 80, '1回のGAS実行で確認する最大件数'],
    ['MIN_SLEEP_MS', 2000, 'モノタロウURL確認ごとの待機ミリ秒'],
    ['PRICE_UP_ALERT_RATE', 0.03, '価格上昇率アラート。0.03 = 3%'],
    ['PRICE_UP_ALERT_YEN', 100, '価格上昇額アラート'],
    ['MIN_MARGIN_RATE', 0.2, '利益率下限。利益計算接続後に使用'],
    ['PURCHASE_FACTOR', 0.85, 'モノタロウ税別価格に掛ける想定仕入係数'],
    ['SOURCE_DATA_START_ROW', 2, '入力用シートのデータ開始行'],
    ['SOURCE_MONOTARO_URL_COL', 2, 'B列: モノタロウURL'],
    ['SOURCE_MONOTARO_PRICE_COL', 3, 'C列: モノタロウ税別価格'],
    ['SOURCE_PACK_QTY_COL', 4, 'D列: 入数'],
    ['SOURCE_SKU_COL', 1, 'SKU列。不要なら0'],
    ['SOURCE_MAKER_COL', 0, 'メーカー列。不要なら0'],
    ['SOURCE_PART_NUMBER_COL', 5, '品番列。必要に応じて変更'],
    ['SOURCE_EBAY_BASE_URL_COL', 8, 'H列: eBay基準店舗URL'],
    ['USER_AGENT', 'Mozilla/5.0 compatible; TriadPriceMonitor/0.1', 'UrlFetch時のUser-Agent']
  ];
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  } else if (sheet.getRange(1, 1).getValue() !== '設定名') {
    sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  }
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, 3);
  sheet.getRange(1, 1, 1, 3).setFontWeight('bold').setBackground('#dbeafe');
}

function setupMasterSheet_(sheet) {
  const headers = getMasterHeaders_();
  if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#dbeafe');
  applyMasterConditionalFormats_(sheet);
}

function setupHistorySheet_(sheet) {
  const headers = getHistoryHeaders_();
  if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  formatListSheet_(sheet);
}

function setupCandidatesSheet_(sheet) {
  const headers = getCandidatesHeaders_();
  if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  formatListSheet_(sheet);
}

function setupManualQueueSheet_(sheet) {
  const headers = getManualQueueHeaders_();
  if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  formatListSheet_(sheet);
}

function getMasterHeaders_() {
  return [
    '監視対象',
    '優先度',
    '元シート名',
    '元行番号',
    'SKU',
    'メーカー',
    '品番',
    'モノタロウURL',
    '入数',
    '前回税別価格',
    '今回税別価格',
    '想定仕入価格',
    '差額',
    '変動率',
    'モノタロウ状態',
    '前回確認日時',
    '最終確認日時',
    '次回確認日',
    '取得状態',
    '利益率',
    '利益率判定',
    'eBay基準店舗URL',
    '基準セラー総額',
    '自社総額',
    '総額下回り判定',
    '販売価格見直し候補',
    '出品停止候補',
    'メモ'
  ];
}

function getHistoryHeaders_() {
  return ['確認日時', 'SKU', '品番', 'モノタロウURL', '前回価格', '今回価格', '差額', '変動率', 'モノタロウ状態', '取得状態', 'メモ'];
}

function getCandidatesHeaders_() {
  return ['作成日時', '優先度', 'SKU', '品番', 'モノタロウURL', '前回価格', '今回価格', '差額', '変動率', 'モノタロウ状態', '利益率判定', '販売価格見直し候補', '出品停止候補', 'メモ'];
}

function getManualQueueHeaders_() {
  return ['作成日時', '優先度', 'SKU', '品番', 'モノタロウURL', '取得状態', 'モノタロウ状態', 'メモ'];
}

function readSettings_() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName(CP_MONITOR.sheets.settings);
  if (!sheet) setupCarpartsPriceMonitor();
  const values = ss.getSheetByName(CP_MONITOR.sheets.settings).getDataRange().getValues();
  const settings = {};
  values.slice(1).forEach(row => {
    if (!row[0]) return;
    settings[String(row[0]).trim()] = row[1];
  });
  return {
    PRICE_CHECK_CYCLE_DAYS: Number(settings.PRICE_CHECK_CYCLE_DAYS || 14),
    MAX_ROWS_PER_RUN: Number(settings.MAX_ROWS_PER_RUN || 80),
    MIN_SLEEP_MS: Number(settings.MIN_SLEEP_MS || 2000),
    PRICE_UP_ALERT_RATE: Number(settings.PRICE_UP_ALERT_RATE || 0.03),
    PRICE_UP_ALERT_YEN: Number(settings.PRICE_UP_ALERT_YEN || 100),
    MIN_MARGIN_RATE: Number(settings.MIN_MARGIN_RATE || 0.2),
    PURCHASE_FACTOR: Number(settings.PURCHASE_FACTOR || 0.85),
    SOURCE_DATA_START_ROW: Number(settings.SOURCE_DATA_START_ROW || 2),
    SOURCE_MONOTARO_URL_COL: Number(settings.SOURCE_MONOTARO_URL_COL || 2),
    SOURCE_MONOTARO_PRICE_COL: Number(settings.SOURCE_MONOTARO_PRICE_COL || 3),
    SOURCE_PACK_QTY_COL: Number(settings.SOURCE_PACK_QTY_COL || 4),
    SOURCE_SKU_COL: Number(settings.SOURCE_SKU_COL || 1),
    SOURCE_MAKER_COL: Number(settings.SOURCE_MAKER_COL || 4),
    SOURCE_PART_NUMBER_COL: Number(settings.SOURCE_PART_NUMBER_COL || 5),
    SOURCE_EBAY_BASE_URL_COL: Number(settings.SOURCE_EBAY_BASE_URL_COL || 8),
    USER_AGENT: String(settings.USER_AGENT || 'Mozilla/5.0 compatible; TriadPriceMonitor/0.1')
  };
}

function getOrCreateSheet_(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function getExistingMasterKeys_(sheet) {
  const lastRow = sheet.getLastRow();
  const keys = {};
  if (lastRow < 2) return keys;
  const values = sheet.getRange(2, 3, lastRow - 1, 6).getValues();
  values.forEach(row => {
    const key = makeMasterKey_(row[0], row[1], row[5], row[4]);
    keys[key] = true;
  });
  return keys;
}

function makeMasterKey_(sheetName, rowNumber, url, partNumber) {
  return [sheetName, rowNumber, url, partNumber].join('|');
}

function isMonitorSystemSheet_(name) {
  return Object.values(CP_MONITOR.sheets).includes(name);
}

function normalizeUrl_(value) {
  const text = String(value || '').trim();
  return /^https?:\/\//i.test(text) ? text : '';
}

function cell_(row, colNumber) {
  const col = Number(colNumber || 0);
  if (col <= 0) return '';
  return row[col - 1];
}

function toNumber_(value) {
  if (typeof value === 'number') return value;
  const text = String(value || '').replace(/[^\d.-]/g, '');
  const num = Number(text);
  return Number.isFinite(num) ? num : 0;
}

function startOfDay_(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays_(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + Number(days || 0));
  return d;
}

function stripHtml_(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&yen;/g, '￥')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatMasterBody_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  sheet.getRange(2, 1, lastRow - 1, 1).insertCheckboxes();
  sheet.getRange(2, 10, lastRow - 1, 4).setNumberFormat('#,##0');
  sheet.getRange(2, 14, lastRow - 1, 1).setNumberFormat('0.0%');
  sheet.getRange(2, 16, lastRow - 1, 3).setNumberFormat('yyyy-mm-dd hh:mm');
  sheet.autoResizeColumns(1, Math.min(sheet.getLastColumn(), 12));
}

function formatListSheet_(sheet) {
  const lastCol = sheet.getLastColumn();
  sheet.setFrozenRows(1);
  if (lastCol) sheet.getRange(1, 1, 1, lastCol).setFontWeight('bold').setBackground('#dbeafe');
  sheet.autoResizeColumns(1, Math.min(lastCol || 1, 12));
}

function applyMasterConditionalFormats_(sheet) {
  const lastRow = Math.max(sheet.getMaxRows(), 1000);
  const rules = [];
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(0)
    .setBackground('#fce8e6')
    .setFontColor('#b3261e')
    .setRanges([sheet.getRange(`M2:M${lastRow}`)])
    .build());
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains('取扱終了')
    .setBackground('#fce8e6')
    .setFontColor('#b3261e')
    .setRanges([sheet.getRange(`O2:O${lastRow}`), sheet.getRange(`AA2:AA${lastRow}`)])
    .build());
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains('在庫切れ')
    .setBackground('#fff4ce')
    .setRanges([sheet.getRange(`O2:O${lastRow}`), sheet.getRange(`AA2:AA${lastRow}`)])
    .build());
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains('見直し')
    .setBackground('#fff4ce')
    .setRanges([sheet.getRange(`Z2:Z${lastRow}`)])
    .build());
  sheet.setConditionalFormatRules(rules);
}
