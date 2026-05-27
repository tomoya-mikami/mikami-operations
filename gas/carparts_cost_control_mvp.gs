/**
 * Car parts cost control MVP.
 *
 * Safe-by-default design:
 * - Creates only new helper sheets.
 * - Does not delete sheets, rows, columns, or existing business data.
 * - Does not update eBay/Sellsta/listings.
 * - Does not auto-change selling prices or end listings.
 * - Chatwork API tokens are intentionally not stored here.
 */

const CPCC = {
  sheets: {
    settings: 'コスト監視設定',
    ebayOrders: 'eBay注文取込',
    supplierBilling: '部品商請求明細',
    shipping: '送料差額チェック',
    duty: '関税チェック',
    chatwork: 'Chatwork情報取込',
    orderReconcile: '注文コスト突合',
    reflection: '出品反映候補',
    aiAssist: 'AI入力補助'
  },
  statuses: {
    pending: '未確認',
    review: '要確認',
    ok: 'OK',
    candidate: '候補'
  }
};

function installCarpartsCostControlMenu() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('カーパーツコスト監視')
    .addItem('初期セットアップ', 'setupCarpartsCostControl')
    .addSeparator()
    .addItem('eBay注文取込を整理', 'normalizeEbayOrderImport')
    .addItem('部品商請求明細を再計算', 'recalculateSupplierBilling')
    .addItem('送料差額チェックを再計算', 'recalculateShippingDiffs')
    .addItem('関税チェックを再計算', 'recalculateDutyDiffs')
    .addItem('Chatwork貼付データを解析', 'parseChatworkPastedData')
    .addSeparator()
    .addItem('注文コスト突合を再作成', 'rebuildOrderCostReconciliation')
    .addItem('出品反映候補を再作成', 'rebuildListingReflectionCandidates')
    .addToUi();
}

function setupCarpartsCostControl() {
  const ss = SpreadsheetApp.getActive();
  setupCpccSettings_(getOrCreateCpccSheet_(ss, CPCC.sheets.settings));
  setupCpccSheet_(getOrCreateCpccSheet_(ss, CPCC.sheets.ebayOrders), getCpccEbayOrderHeaders_(), '#dbeafe');
  setupCpccSheet_(getOrCreateCpccSheet_(ss, CPCC.sheets.supplierBilling), getCpccSupplierBillingHeaders_(), '#ccfbf1');
  setupCpccSheet_(getOrCreateCpccSheet_(ss, CPCC.sheets.shipping), getCpccShippingHeaders_(), '#fee2e2');
  setupCpccSheet_(getOrCreateCpccSheet_(ss, CPCC.sheets.duty), getCpccDutyHeaders_(), '#fef3c7');
  setupCpccSheet_(getOrCreateCpccSheet_(ss, CPCC.sheets.chatwork), getCpccChatworkHeaders_(), '#e0f2fe');
  setupCpccSheet_(getOrCreateCpccSheet_(ss, CPCC.sheets.orderReconcile), getCpccOrderReconcileHeaders_(), '#f1f5f9');
  setupCpccSheet_(getOrCreateCpccSheet_(ss, CPCC.sheets.reflection), getCpccReflectionHeaders_(), '#dcfce7');
  setupCpccSheet_(getOrCreateCpccSheet_(ss, CPCC.sheets.aiAssist), getCpccAiAssistHeaders_(), '#ede9fe');
  SpreadsheetApp.getActive().toast('コスト監視MVPの初期セットアップが完了しました。', 'カーパーツコスト監視', 8);
}

function normalizeEbayOrderImport() {
  setupCarpartsCostControl();
  const sheet = SpreadsheetApp.getActive().getSheetByName(CPCC.sheets.ebayOrders);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const headers = getCpccEbayOrderHeaders_();
  const values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  const converted = [];
  const statuses = [];

  values.forEach(row => {
    const salePrice = cpccToNumber_(row[6]);
    const buyerShipping = cpccToNumber_(row[7]);
    const orderTotal = cpccToNumber_(row[8]) || salePrice + buyerShipping;
    const fx = cpccToNumber_(row[11]) || 1;
    const yenRevenue = Math.round(orderTotal * fx);
    const hasKey = String(row[1] || '').trim() && String(row[3] || '').trim();
    converted.push([yenRevenue || '']);
    statuses.push([hasKey ? CPCC.statuses.ok : CPCC.statuses.pending]);
  });

  sheet.getRange(2, 13, converted.length, 1).setValues(converted);
  sheet.getRange(2, 17, statuses.length, 1).setValues(statuses);
  rebuildOrderCostReconciliation();
  SpreadsheetApp.getActive().toast(`${converted.length}件のeBay注文データを整理しました。`, 'カーパーツコスト監視', 8);
}

function recalculateSupplierBilling() {
  setupCarpartsCostControl();
  const sheet = SpreadsheetApp.getActive().getSheetByName(CPCC.sheets.supplierBilling);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const headers = getCpccSupplierBillingHeaders_();
  const values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  const totals = [];
  const statuses = [];

  values.forEach(row => {
    const purchase = cpccToNumber_(row[7]);
    const shipping = cpccToNumber_(row[8]);
    const otherCost = cpccToNumber_(row[9]);
    const total = purchase + shipping + otherCost;
    const hasKey = String(row[1] || '').trim() && String(row[4] || '').trim();
    totals.push([total || '']);
    statuses.push([hasKey && total ? CPCC.statuses.ok : CPCC.statuses.pending]);
  });

  sheet.getRange(2, 13, totals.length, 1).setValues(totals);
  sheet.getRange(2, 14, statuses.length, 1).setValues(statuses);
  rebuildOrderCostReconciliation();
  SpreadsheetApp.getActive().toast(`${totals.length}件の部品商請求明細を再計算しました。`, 'カーパーツコスト監視', 8);
}

function recalculateShippingDiffs() {
  setupCarpartsCostControl();
  const settings = readCpccSettings_();
  const sheet = SpreadsheetApp.getActive().getSheetByName(CPCC.sheets.shipping);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const headers = getCpccShippingHeaders_();
  const values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  const updates = [];

  values.forEach(row => {
    const estimate = cpccToNumber_(row[8]);
    const actual = cpccToNumber_(row[11]);
    const diff = estimate && actual ? actual - estimate : '';
    const rate = estimate && actual ? diff / estimate : '';
    const weightCause = judgeWeightCause_(row[6], row[9]);
    const sizeCause = judgeSizeCause_(row[7], row[10]);
    const alert = shouldAlertDiff_(diff, rate, settings.SHIPPING_DIFF_ALERT_YEN, settings.SHIPPING_DIFF_ALERT_RATE);
    const cause = [weightCause, sizeCause].filter(Boolean).join(' / ') || (alert ? '送料差額大' : '');
    const action = alert ? 'Shipping Policy見直し / 推定重量・梱包サイズ確認' : '';
    const candidate = alert ? CPCC.statuses.candidate : '';
    const status = alert ? CPCC.statuses.review : (estimate && actual ? CPCC.statuses.ok : CPCC.statuses.pending);
    updates.push([diff, rate, alert ? '送料超過' : '', cause, action, candidate, status]);
  });

  sheet.getRange(2, 13, updates.length, 7).setValues(updates);
  applyCpccConditionalFormats_(sheet, 'shipping');
  rebuildListingReflectionCandidates();
  SpreadsheetApp.getActive().toast(`${updates.length}件の送料差額を再計算しました。`, 'カーパーツコスト監視', 8);
}

function recalculateDutyDiffs() {
  setupCarpartsCostControl();
  const settings = readCpccSettings_();
  const sheet = SpreadsheetApp.getActive().getSheetByName(CPCC.sheets.duty);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const headers = getCpccDutyHeaders_();
  const values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  const updates = [];

  values.forEach(row => {
    const declared = cpccToNumber_(row[10]);
    const freightInsurance = cpccToNumber_(row[11]);
    const taxable = cpccToNumber_(row[12]) || declared + freightInsurance;
    const rate = normalizeRate_(row[13]);
    const expectedDuty = taxable && rate ? Math.round(taxable * rate) : cpccToNumber_(row[14]) || '';
    const chargedDuty = cpccToNumber_(row[15]);
    const handlingFee = cpccToNumber_(row[16]);
    const billedTotal = cpccToNumber_(row[17]) || chargedDuty + handlingFee;
    const diff = expectedDuty && chargedDuty ? chargedDuty - expectedDuty : '';
    const diffRate = expectedDuty && chargedDuty ? diff / expectedDuty : '';
    const alert = shouldAlertDiff_(diff, diffRate, settings.DUTY_DIFF_ALERT_YEN, settings.DUTY_DIFF_ALERT_RATE);
    const judgment = alert ? '関税差額要確認' : (expectedDuty && chargedDuty ? CPCC.statuses.ok : CPCC.statuses.pending);
    const action = alert ? '関税請求書 / 配送会社明細 / 申告価格 / HTS候補を確認' : '';
    const candidate = alert ? CPCC.statuses.candidate : '';
    const status = alert ? CPCC.statuses.review : judgment;
    updates.push([
      taxable || '',
      rate || '',
      expectedDuty || '',
      chargedDuty || '',
      handlingFee || '',
      billedTotal || '',
      diff,
      diffRate,
      judgment,
      row[21],
      action,
      candidate,
      status
    ]);
  });

  sheet.getRange(2, 13, updates.length, 13).setValues(updates);
  applyCpccConditionalFormats_(sheet, 'duty');
  rebuildOrderCostReconciliation();
  rebuildListingReflectionCandidates();
  SpreadsheetApp.getActive().toast(`${updates.length}件の関税差額を再計算しました。`, 'カーパーツコスト監視', 8);
}

function parseChatworkPastedData() {
  setupCarpartsCostControl();
  const settings = readCpccSettings_();
  const sheet = SpreadsheetApp.getActive().getSheetByName(CPCC.sheets.chatwork);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const headers = getCpccChatworkHeaders_();
  const values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  const updates = [];

  values.forEach(row => {
    const body = String(row[4] || '').trim();
    const parts = extractPartNumbers_(body, settings.PART_NUMBER_REGEX);
    const infoType = detectChatworkInfoType_(body, settings);
    const confidence = parts.length && infoType ? '中' : (infoType ? '低' : '');
    const action = buildChatworkAction_(infoType);
    const candidate = infoType ? CPCC.statuses.candidate : '';
    const reflectStatus = infoType ? CPCC.statuses.review : '';
    updates.push([
      parts.join(', '),
      infoType,
      confidence,
      row[8],
      action,
      candidate,
      reflectStatus,
      row[12]
    ]);
  });

  sheet.getRange(2, 6, updates.length, 8).setValues(updates);
  applyCpccConditionalFormats_(sheet, 'chatwork');
  rebuildListingReflectionCandidates();
  SpreadsheetApp.getActive().toast(`${updates.length}件のChatwork貼付データを解析しました。`, 'カーパーツコスト監視', 8);
}

function rebuildListingReflectionCandidates() {
  setupCarpartsCostControl();
  const ss = SpreadsheetApp.getActive();
  const reflection = ss.getSheetByName(CPCC.sheets.reflection);
  const existingKeys = getExistingReflectionKeys_(reflection);
  const rows = []
    .concat(buildShippingReflectionRows_(ss))
    .concat(buildDutyReflectionRows_(ss))
    .concat(buildChatworkReflectionRows_(ss))
    .concat(buildOrderReconcileReflectionRows_(ss))
    .filter(row => {
      const key = makeReflectionKey_(row);
      if (existingKeys[key]) return false;
      existingKeys[key] = true;
      return true;
    });

  if (rows.length) {
    reflection.getRange(reflection.getLastRow() + 1, 1, rows.length, getCpccReflectionHeaders_().length).setValues(rows);
  }
  applyCpccConditionalFormats_(reflection, 'reflection');
  SpreadsheetApp.getActive().toast(`${rows.length}件の出品反映候補を追加しました。`, 'カーパーツコスト監視', 8);
}

function buildShippingReflectionRows_(ss) {
  const sheet = ss.getSheetByName(CPCC.sheets.shipping);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet.getRange(2, 1, lastRow - 1, getCpccShippingHeaders_().length).getValues()
    .filter(row => String(row[17] || '') === CPCC.statuses.candidate)
    .map(row => [
      new Date(),
      CPCC.sheets.shipping,
      cpccToNumber_(row[12]) >= 3000 ? '高' : '中',
      row[1],
      row[2],
      row[3],
      `送料差額 ${row[12] || ''} 円`,
      row[16],
      row[12],
      'Shipping Policy見直し',
      CPCC.statuses.review,
      '',
      row[19]
    ]);
}

function buildDutyReflectionRows_(ss) {
  const sheet = ss.getSheetByName(CPCC.sheets.duty);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet.getRange(2, 1, lastRow - 1, getCpccDutyHeaders_().length).getValues()
    .filter(row => String(row[18] || '') === CPCC.statuses.candidate)
    .map(row => [
      new Date(),
      CPCC.sheets.duty,
      cpccToNumber_(row[18]) >= 3000 ? '高' : '中',
      row[1],
      row[2],
      row[3],
      `関税差額 ${row[18] || ''} 円 / 請求書 ${row[4] || ''}`,
      row[22],
      row[18],
      '利益率/関税設定見直し',
      CPCC.statuses.review,
      '',
      row[25]
    ]);
}

function buildChatworkReflectionRows_(ss) {
  const sheet = ss.getSheetByName(CPCC.sheets.chatwork);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet.getRange(2, 1, lastRow - 1, getCpccChatworkHeaders_().length).getValues()
    .filter(row => String(row[10] || '') === CPCC.statuses.candidate)
    .map(row => [
      new Date(),
      CPCC.sheets.chatwork,
      isHighPriorityChatworkType_(row[6]) ? '高' : '中',
      '',
      row[8],
      row[5],
      `${row[6] || 'Chatwork情報'}: ${String(row[4] || '').slice(0, 80)}`,
      row[9],
      '',
      '価格/在庫/出品状態見直し',
      CPCC.statuses.review,
      '',
      row[12]
    ]);
}

function buildOrderReconcileReflectionRows_(ss) {
  const sheet = ss.getSheetByName(CPCC.sheets.orderReconcile);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet.getRange(2, 1, lastRow - 1, getCpccOrderReconcileHeaders_().length).getValues()
    .filter(row => String(row[18] || '') === CPCC.statuses.candidate)
    .map(row => [
      new Date(),
      CPCC.sheets.orderReconcile,
      row[16] === '利益率下限割れ' ? '高' : '中',
      row[1],
      row[2],
      row[3],
      `${row[16] || '注文コスト要確認'}: 粗利 ${row[14] || ''} 円 / 利益率 ${formatPercentText_(row[15])}`,
      row[17],
      row[14],
      '価格/送料/仕入条件見直し',
      CPCC.statuses.review,
      '',
      row[19]
    ]);
}

function rebuildOrderCostReconciliation() {
  setupCarpartsCostControl();
  const settings = readCpccSettings_();
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName(CPCC.sheets.orderReconcile);
  const headers = getCpccOrderReconcileHeaders_();
  sheet.clearContents();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  setupCpccSheet_(sheet, headers, '#f1f5f9');

  const ebayMap = buildEbayOrderMap_(ss);
  const supplierMap = buildSupplierBillingMap_(ss);
  const dutyMap = buildDutyBillingMap_(ss);
  const dutyByOrderMap = buildDutyBillingByOrderMap_(ss);
  const keys = {};
  Object.keys(ebayMap).forEach(key => keys[key] = true);
  Object.keys(supplierMap).forEach(key => keys[key] = true);
  Object.keys(dutyMap).forEach(key => keys[key] = true);

  const out = Object.keys(keys).map(key => {
    const ebay = ebayMap[key] || {};
    const supplier = supplierMap[key] || {};
    const orderIdFromKey = String(key).split('|')[0];
    const duty = dutyMap[key] || dutyByOrderMap[orderIdFromKey] || {};
    const orderId = ebay.orderId || supplier.orderId || duty.orderId || '';
    const sku = ebay.sku || supplier.sku || duty.sku || '';
    const partNumber = ebay.partNumber || supplier.partNumber || duty.partNumber || '';
    const country = ebay.country || supplier.country || duty.country || '';
    const revenue = ebay.revenue || 0;
    const buyerShipping = ebay.buyerShipping || 0;
    const ebayFee = ebay.fee || 0;
    const purchase = supplier.purchase || 0;
    const supplierShipping = supplier.shipping || 0;
    const supplierOther = supplier.otherCost || 0;
    const dutyAmount = duty.duty || 0;
    const customsFee = duty.handlingFee || 0;
    const actualCost = ebayFee + purchase + supplierShipping + supplierOther + dutyAmount + customsFee;
    const grossProfit = revenue ? revenue - actualCost : '';
    const margin = revenue && grossProfit !== '' ? grossProfit / revenue : '';
    const missing = [];
    if (!ebay.orderId) missing.push('eBay注文なし');
    if (!supplier.orderId) missing.push('部品商明細なし');
    const judgment = judgeOrderCost_(margin, missing, settings);
    const candidate = judgment.candidate ? CPCC.statuses.candidate : '';
    return [
      new Date(),
      orderId,
      sku,
      partNumber,
      country,
      revenue || '',
      buyerShipping || '',
      ebayFee || '',
      purchase || '',
      supplierShipping || '',
      supplierOther || '',
      dutyAmount || '',
      customsFee || '',
      actualCost || '',
      grossProfit,
      margin,
      judgment.label,
      judgment.action,
      candidate,
      missing.join(' / ')
    ];
  });

  if (out.length) {
    sheet.getRange(2, 1, out.length, headers.length).setValues(out);
    sheet.getRange(2, 16, out.length, 1).setNumberFormat('0.0%');
  }
  rebuildListingReflectionCandidates();
  SpreadsheetApp.getActive().toast(`${out.length}件の注文コスト突合を再作成しました。`, 'カーパーツコスト監視', 8);
}

function setupCpccSettings_(sheet) {
  const rows = [
    ['設定名', '値', '説明'],
    ['SHIPPING_DIFF_ALERT_YEN', 1000, '推定送料と実送料の差額アラート'],
    ['SHIPPING_DIFF_ALERT_RATE', 0.2, '送料差額率アラート。0.2 = 20%'],
    ['DUTY_DIFF_ALERT_YEN', 1000, '想定関税額と請求関税額の差額アラート'],
    ['DUTY_DIFF_ALERT_RATE', 0.2, '関税差額率アラート。0.2 = 20%'],
    ['MIN_MARGIN_RATE', 0.2, '利益率下限。利益計算接続後に使用'],
    ['CHATWORK_PRICE_KEYWORDS', '値上げ,価格改定,価格変更,値段上がる,単価改定', '価格変動として拾う語句'],
    ['CHATWORK_STOCK_KEYWORDS', '品切れ,欠品,在庫切れ,取扱終了,販売終了,廃番,納期未定,入荷未定', '在庫/取扱リスクとして拾う語句'],
    ['CHATWORK_SUCCESSOR_KEYWORDS', '代替品,後継品,置き換え,変更品番', '代替/後継として拾う語句'],
    ['PART_NUMBER_REGEX', '[A-Z0-9][A-Z0-9\\-\\.\\/]{3,}', '品番らしい文字列を拾う正規表現']
  ];
  if (sheet.getLastRow() === 0 || sheet.getRange(1, 1).getValue() !== '設定名') {
    sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  }
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, 3).setFontWeight('bold').setBackground('#dcfce7');
  sheet.autoResizeColumns(1, 3);
}

function setupCpccSheet_(sheet, headers, color) {
  const needsHeader = sheet.getLastRow() === 0
    || sheet.getRange(1, 1).getValue() !== headers[0]
    || sheet.getLastColumn() < headers.length;
  if (needsHeader) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground(color);
  sheet.autoResizeColumns(1, Math.min(headers.length, 12));
}

function getCpccShippingHeaders_() {
  return ['確認対象', '注文ID', 'SKU', '品番', '商品名', '出品時Shipping Policy', '推定重量kg', '推定サイズ', '推定送料', '実重量kg', '実サイズ', '実送料', '差額', '差額率', '判定', '原因候補', '対応候補', '出品反映候補', '確認状態', 'メモ'];
}

function getCpccDutyHeaders_() {
  return ['確認対象', '注文ID', 'SKU', '品番', '請求書番号', '請求日', '請求元', '国', 'HS/HTS候補', '原産国', '申告価格', '送料/保険', '課税対象額', '想定関税率', '想定関税額', '請求関税額', '通関/立替手数料', '請求合計', '差額', '差額率', '判定', '根拠URL/請求書URL', '対応候補', '出品反映候補', '確認状態', 'メモ'];
}

function getCpccChatworkHeaders_() {
  return ['処理対象', '取得/貼付日時', 'メッセージ日時', '投稿者', '本文', '抽出品番', '情報種別', '信頼度', '対象SKU候補', '対応候補', '出品反映候補', '反映状態', 'メモ'];
}

function getCpccReflectionHeaders_() {
  return ['作成日時', '発生元', '重要度', '注文ID', 'SKU', '品番', '理由', '対応候補', '金額影響', '出品反映種別', '反映状態', '確認者', 'メモ'];
}

function getCpccAiAssistHeaders_() {
  return ['SKU', '品番', '商品名', 'カテゴリ', 'AI_推定重量kg', 'AI_推定サイズ', 'AI_信頼度', '推奨Shipping Policy', '推定送料', '送料リスク', 'HS/HTS候補', '要確認理由', '出品OK', 'メモ'];
}

function getCpccEbayOrderHeaders_() {
  return ['処理対象', '注文ID', '注文日', 'SKU', '品番', '商品名', '販売価格', '購入者支払送料', '注文合計', '販売手数料', '通貨', '為替', '円換算売上', '国', 'Shipping Policy', 'eBay配送サービス', '確認状態', 'メモ'];
}

function getCpccSupplierBillingHeaders_() {
  return ['処理対象', '注文ID', '部品商注文ID', '請求日', 'SKU', '品番', '商品名', '仕入価格', '部品商送料', 'その他費用', '直送先国', '追跡番号', '請求合計', '確認状態', 'メモ'];
}

function getCpccOrderReconcileHeaders_() {
  return ['作成日時', '注文ID', 'SKU', '品番', '国', '円換算売上', '購入者支払送料', 'eBay販売手数料', '仕入価格', '部品商送料', '部品商その他費用', '関税請求額', '通関/立替手数料', '実コスト', '粗利', '利益率', '判定', '対応候補', '出品反映候補', 'メモ'];
}

function readCpccSettings_() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName(CPCC.sheets.settings);
  if (!sheet) setupCarpartsCostControl();
  const values = ss.getSheetByName(CPCC.sheets.settings).getDataRange().getValues();
  const settings = {};
  values.slice(1).forEach(row => {
    if (!row[0]) return;
    settings[String(row[0]).trim()] = row[1];
  });
  return {
    SHIPPING_DIFF_ALERT_YEN: Number(settings.SHIPPING_DIFF_ALERT_YEN || 1000),
    SHIPPING_DIFF_ALERT_RATE: Number(settings.SHIPPING_DIFF_ALERT_RATE || 0.2),
    DUTY_DIFF_ALERT_YEN: Number(settings.DUTY_DIFF_ALERT_YEN || 1000),
    DUTY_DIFF_ALERT_RATE: Number(settings.DUTY_DIFF_ALERT_RATE || 0.2),
    MIN_MARGIN_RATE: Number(settings.MIN_MARGIN_RATE || 0.2),
    CHATWORK_PRICE_KEYWORDS: splitKeywords_(settings.CHATWORK_PRICE_KEYWORDS),
    CHATWORK_STOCK_KEYWORDS: splitKeywords_(settings.CHATWORK_STOCK_KEYWORDS),
    CHATWORK_SUCCESSOR_KEYWORDS: splitKeywords_(settings.CHATWORK_SUCCESSOR_KEYWORDS),
    PART_NUMBER_REGEX: String(settings.PART_NUMBER_REGEX || '[A-Z0-9][A-Z0-9\\-\\.\\/]{3,}')
  };
}

function shouldAlertDiff_(diff, rate, yenThreshold, rateThreshold) {
  const amountAlert = diff !== '' && Number(diff) >= Number(yenThreshold || 0);
  const rateAlert = rate !== '' && Number(rate) >= Number(rateThreshold || 0);
  return amountAlert || rateAlert;
}

function judgeWeightCause_(estimatedWeight, actualWeight) {
  const estimated = cpccToNumber_(estimatedWeight);
  const actual = cpccToNumber_(actualWeight);
  if (!estimated || !actual) return '';
  if (actual > estimated * 1.2) return '実重量が推定より重い';
  return '';
}

function judgeSizeCause_(estimatedSize, actualSize) {
  const estimated = String(estimatedSize || '').trim();
  const actual = String(actualSize || '').trim();
  if (!estimated || !actual) return '';
  return estimated !== actual ? '実サイズが推定と違う' : '';
}

function normalizeRate_(value) {
  if (typeof value === 'number') return value > 1 ? value / 100 : value;
  const text = String(value || '').trim();
  if (!text) return 0;
  const num = cpccToNumber_(text);
  return /%/.test(text) || num > 1 ? num / 100 : num;
}

function splitKeywords_(value) {
  return String(value || '').split(',').map(item => item.trim()).filter(Boolean);
}

function detectChatworkInfoType_(body, settings) {
  const text = String(body || '');
  if (settings.CHATWORK_STOCK_KEYWORDS.some(word => text.includes(word))) return '品切れ/取扱リスク';
  if (settings.CHATWORK_PRICE_KEYWORDS.some(word => text.includes(word))) return '値上げ/価格改定';
  if (settings.CHATWORK_SUCCESSOR_KEYWORDS.some(word => text.includes(word))) return '代替/後継品';
  return '';
}

function buildChatworkAction_(infoType) {
  if (infoType === '品切れ/取扱リスク') return '仕入先確認 / 出品停止候補';
  if (infoType === '値上げ/価格改定') return '仕入価格確認 / 販売価格見直し';
  if (infoType === '代替/後継品') return '型番一致確認 / 代替品として扱えるか確認';
  return '';
}

function isHighPriorityChatworkType_(infoType) {
  return ['品切れ/取扱リスク', '値上げ/価格改定'].includes(String(infoType || ''));
}

function extractPartNumbers_(body, regexText) {
  const text = String(body || '').toUpperCase();
  let regex;
  try {
    regex = new RegExp(regexText, 'g');
  } catch (err) {
    regex = /[A-Z0-9][A-Z0-9\-\.\/]{3,}/g;
  }
  const matches = text.match(regex) || [];
  const ignore = {
    HTTP: true,
    HTTPS: true,
    WWW: true,
    MONOTARO: true,
    CHATWORK: true
  };
  return Array.from(new Set(matches.map(item => item.replace(/[.,;:]+$/, '')).filter(item => !ignore[item] && item.length <= 32))).slice(0, 8);
}

function getExistingReflectionKeys_(sheet) {
  const keys = {};
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return keys;
  const values = sheet.getRange(2, 1, lastRow - 1, getCpccReflectionHeaders_().length).getValues();
  values.forEach(row => {
    keys[makeReflectionKey_(row)] = true;
  });
  return keys;
}

function makeReflectionKey_(row) {
  return [row[1], row[3], row[4], row[5], row[6], row[9]].map(value => String(value || '').trim()).join('|');
}

function applyCpccConditionalFormats_(sheet, type) {
  const lastRow = Math.max(sheet.getLastRow(), 2);
  if (type === 'shipping') {
    sheet.getRange(2, 13, lastRow - 1, 2).setNumberFormat('#,##0;[Red]-#,##0');
    sheet.getRange(2, 14, lastRow - 1, 1).setNumberFormat('0.0%');
  }
  if (type === 'duty') {
    sheet.getRange(2, 14, lastRow - 1, 1).setNumberFormat('0.0%');
    sheet.getRange(2, 20, lastRow - 1, 1).setNumberFormat('0.0%');
  }
  if (type === 'reflection') {
    sheet.getRange(1, 1, 1, getCpccReflectionHeaders_().length).setBackground('#dcfce7').setFontWeight('bold');
  }
}

function getOrCreateCpccSheet_(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function cpccToNumber_(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  const text = String(value || '').replace(/[^\d.-]/g, '');
  const num = Number(text);
  return Number.isFinite(num) ? num : 0;
}

function buildEbayOrderMap_(ss) {
  const sheet = ss.getSheetByName(CPCC.sheets.ebayOrders);
  const lastRow = sheet.getLastRow();
  const map = {};
  if (lastRow < 2) return map;
  const values = sheet.getRange(2, 1, lastRow - 1, getCpccEbayOrderHeaders_().length).getValues();
  values.forEach(row => {
    const key = makeOrderSkuKey_(row[1], row[3]);
    if (!key) return;
    map[key] = {
      orderId: String(row[1] || '').trim(),
      sku: String(row[3] || '').trim(),
      partNumber: String(row[4] || '').trim(),
      revenue: cpccToNumber_(row[12]) || cpccToNumber_(row[8]),
      buyerShipping: cpccToNumber_(row[7]),
      fee: cpccToNumber_(row[9]),
      country: String(row[13] || '').trim()
    };
  });
  return map;
}

function buildSupplierBillingMap_(ss) {
  const sheet = ss.getSheetByName(CPCC.sheets.supplierBilling);
  const lastRow = sheet.getLastRow();
  const map = {};
  if (lastRow < 2) return map;
  const values = sheet.getRange(2, 1, lastRow - 1, getCpccSupplierBillingHeaders_().length).getValues();
  values.forEach(row => {
    const key = makeOrderSkuKey_(row[1], row[4]);
    if (!key) return;
    map[key] = {
      orderId: String(row[1] || '').trim(),
      sku: String(row[4] || '').trim(),
      partNumber: String(row[5] || '').trim(),
      purchase: cpccToNumber_(row[7]),
      shipping: cpccToNumber_(row[8]),
      otherCost: cpccToNumber_(row[9]),
      country: String(row[10] || '').trim()
    };
  });
  return map;
}

function buildDutyBillingMap_(ss) {
  const sheet = ss.getSheetByName(CPCC.sheets.duty);
  const lastRow = sheet.getLastRow();
  const map = {};
  if (lastRow < 2) return map;
  const values = sheet.getRange(2, 1, lastRow - 1, getCpccDutyHeaders_().length).getValues();
  values.forEach(row => {
    const key = makeOrderSkuKey_(row[1], row[2]);
    if (!key) return;
    map[key] = {
      orderId: String(row[1] || '').trim(),
      sku: String(row[2] || '').trim(),
      partNumber: String(row[3] || '').trim(),
      country: String(row[7] || '').trim(),
      duty: cpccToNumber_(row[15]),
      handlingFee: cpccToNumber_(row[16])
    };
  });
  return map;
}

function buildDutyBillingByOrderMap_(ss) {
  const sheet = ss.getSheetByName(CPCC.sheets.duty);
  const lastRow = sheet.getLastRow();
  const map = {};
  if (lastRow < 2) return map;
  const values = sheet.getRange(2, 1, lastRow - 1, getCpccDutyHeaders_().length).getValues();
  values.forEach(row => {
    const orderId = String(row[1] || '').trim();
    if (!orderId) return;
    const current = map[orderId] || {
      orderId,
      sku: '',
      partNumber: '',
      country: String(row[7] || '').trim(),
      duty: 0,
      handlingFee: 0
    };
    current.duty += cpccToNumber_(row[15]);
    current.handlingFee += cpccToNumber_(row[16]);
    if (!current.partNumber) current.partNumber = String(row[3] || '').trim();
    if (!current.sku) current.sku = String(row[2] || '').trim();
    map[orderId] = current;
  });
  return map;
}

function makeOrderSkuKey_(orderId, sku) {
  const order = String(orderId || '').trim();
  const itemSku = String(sku || '').trim();
  if (!order || !itemSku) return '';
  return `${order}|${itemSku}`;
}

function judgeOrderCost_(margin, missing, settings) {
  if (missing.length) {
    return {
      label: '突合不足',
      action: `${missing.join(' / ')} を確認`,
      candidate: true
    };
  }
  if (margin === '' || margin === null || typeof margin === 'undefined') {
    return {
      label: '利益率不明',
      action: '売上/仕入/送料/関税の不足を確認',
      candidate: true
    };
  }
  if (margin < settings.MIN_MARGIN_RATE) {
    return {
      label: '利益率下限割れ',
      action: '販売価格 / Shipping Policy / 仕入条件を見直し',
      candidate: true
    };
  }
  return {
    label: CPCC.statuses.ok,
    action: '',
    candidate: false
  };
}

function formatPercentText_(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '';
  return `${Math.round(value * 1000) / 10}%`;
}
