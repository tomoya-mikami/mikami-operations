/**
 * Repair management sheet redesign helper.
 *
 * How to use:
 * 1. Open the repair management Google Sheet.
 * 2. Open Extensions > Apps Script.
 * 3. Paste this file into a new script file.
 * 4. Run createRepairManagementRedesign().
 *
 * This script does not overwrite the current source sheet.
 * It creates new sheets with "_新" names.
 */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('修理管理')
    .addItem('デザイン改善版を作成', 'createRepairManagementRedesign')
    .addToUi();
}

function onEdit(e) {
  if (!e || !e.range) return;
  const range = e.range;
  const sheet = range.getSheet();
  const sheetName = sheet.getName();
  if (!/^修理記録_新/.test(sheetName)) return;
  if (range.getRow() < 4 || range.getColumn() !== 9) return;

  const checked = range.getValue() === true || String(range.getValue()).toUpperCase() === 'TRUE';
  const completedDateCell = sheet.getRange(range.getRow(), 10);
  if (checked) {
    completedDateCell.setValue(new Date()).setNumberFormat('yyyy-mm-dd');
  } else {
    completedDateCell.clearContent();
  }
}

function createRepairManagementRedesign() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const source = ss.getSheetByName('修理記録一覧');
  if (!source) {
    SpreadsheetApp.getUi().alert('元シート「修理記録一覧」が見つかりません。');
    return;
  }

  const guideName = makeUniqueSheetName_(ss, '使い方_新');
  const recordName = makeUniqueSheetName_(ss, '修理記録_新');
  const summaryName = makeUniqueSheetName_(ss, '月次集計_新');
  const rulesName = makeUniqueSheetName_(ss, '報酬ルール_新');

  const guide = ss.insertSheet(guideName);
  const records = ss.insertSheet(recordName);
  const summary = ss.insertSheet(summaryName);
  const rules = ss.insertSheet(rulesName);

  buildGuideSheet_(guide);
  buildRulesSheet_(rules);
  buildRecordSheet_(records, source, rulesName);
  buildSummarySheet_(summary, recordName, rulesName);

  ss.setActiveSheet(records);
  SpreadsheetApp.getUi().alert('デザイン改善版を作成しました。元シートは変更していません。');
}

function buildGuideSheet_(sheet) {
  sheet.setHiddenGridlines(true);
  sheet.setColumnWidths(1, 8, 130);
  sheet.getRange('A1:H1').merge().setValue('修理管理シート')
    .setFontSize(18).setFontWeight('bold').setFontColor('#243B53');
  sheet.getRange('A2:H2').merge()
    .setValue('外注さんが迷わず入力でき、社内側では報酬と原価を分けて確認できる構成です。')
    .setFontColor('#5F6B7A');

  const cards = [
    ['1', '1商品1行で入力', '作業日、返送日、本体名称、作業時間、修理結果を入力します。'],
    ['2', '報酬は自動計算', '時間報酬は上限付き。動作確認済みのみインセンティブ対象です。'],
    ['3', '原価は別管理', '仕入れ・送料は後方の社内管理列に分けています。'],
    ['4', '返送月で集計', '返送日が入った月に月次報酬として集計します。'],
  ];

  cards.forEach((card, idx) => {
    const row = 4 + idx * 4;
    sheet.getRange(row, 1, 3, 7).setBackground('#FFFFFF').setBorder(true, true, true, true, true, true, '#D5DAE3', SpreadsheetApp.BorderStyle.SOLID);
    sheet.getRange(row, 1).setValue(card[0]).setBackground('#2F80ED').setFontColor('#FFFFFF').setFontWeight('bold')
      .setFontSize(18).setHorizontalAlignment('center').setVerticalAlignment('middle');
    sheet.getRange(row, 2, 1, 6).merge().setValue(card[1]).setFontSize(13).setFontWeight('bold').setFontColor('#1C2430');
    sheet.getRange(row + 1, 2, 2, 6).merge().setValue(card[2]).setWrap(true).setVerticalAlignment('middle');
  });
}

function buildRulesSheet_(sheet) {
  sheet.setHiddenGridlines(true);
  sheet.setColumnWidths(1, 3, 220);
  sheet.getRange('A1:C1').merge().setValue('報酬ルール')
    .setFontSize(18).setFontWeight('bold').setFontColor('#243B53');
  sheet.getRange('A2:C2').merge()
    .setValue('動作確認とクリーニングは毎回行う前提のため、個別報酬項目にはしません。')
    .setFontColor('#5F6B7A');

  const rows = [
    ['項目', '値', 'メモ'],
    ['基準時給', 1500, '実作業時間を1分単位で入力し、分/60×時給で算出'],
    ['動作確認済み/ワケあり 上限', 1500, '1商品あたり。ワケありはインセンティブなし'],
    ['ジャンク上限', 1000, '修理不可・ジャンク扱いの上限'],
    ['インセン対象件数', 30, '修理完了かつ動作確認済み'],
    ['インセンティブ額', 1000, '30件ごとに加算'],
  ];

  const range = sheet.getRange(4, 1, rows.length, 3);
  range.setValues(rows).setBorder(true, true, true, true, true, true, '#D5DAE3', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(4, 1, 1, 3).setBackground('#243B53').setFontColor('#FFFFFF').setFontWeight('bold').setHorizontalAlignment('center');
  sheet.getRange(5, 1, rows.length - 1, 3).setWrap(true);
  sheet.getRange(5, 2, rows.length - 1, 1).setNumberFormat('#,##0');
  for (let i = 5; i < 5 + rows.length - 1; i++) {
    sheet.getRange(i, 1, 1, 3).setBackground(i % 2 === 1 ? '#E8F2FF' : '#FFFFFF');
  }
}

function buildRecordSheet_(sheet, source, rulesName) {
  sheet.setHiddenGridlines(true);
  sheet.getRange('A1:W1').merge().setValue('修理記録')
    .setFontSize(18).setFontWeight('bold').setFontColor('#243B53')
    .setBackground('#F7F4ED');

  sheet.getRange('A2:N2').merge().setValue('外注さん入力');
  sheet.getRange('O2:R2').merge().setValue('自動計算');
  sheet.getRange('S2:W2').merge().setValue('社内管理');
  sheet.getRange('A2:N2').setBackground('#2F80ED').setFontColor('#FFFFFF').setFontWeight('bold').setHorizontalAlignment('center');
  sheet.getRange('O2:R2').setBackground('#2F855A').setFontColor('#FFFFFF').setFontWeight('bold').setHorizontalAlignment('center');
  sheet.getRange('S2:W2').setBackground('#6B7280').setFontColor('#FFFFFF').setFontWeight('bold').setHorizontalAlignment('center');

  const headers = [
    '修理ID', '作業日', '返送日', '商品カテゴリ', '本体名称', '色', 'シリアル', '実作業時間(分)',
    '修理完了', '修理完了日', '修理後状態', '修理内容', '新品部品名', '備考',
    '報酬計上月', '作業報酬', 'インセン対象', '要確認',
    '部品代', '仕入れ金額', '送料', '商品原価合計', '総コスト'
  ];
  sheet.getRange(3, 1, 1, headers.length).setValues([headers])
    .setBackground('#243B53').setFontColor('#FFFFFF').setFontWeight('bold')
    .setHorizontalAlignment('center').setVerticalAlignment('middle').setWrap(true);

  sheet.setFrozenRows(3);
  sheet.setColumnWidths(1, 23, 120);
  const widths = [90, 95, 95, 110, 190, 80, 130, 120, 90, 105, 110, 260, 190, 260, 105, 105, 105, 240, 90, 115, 95, 120, 105];
  widths.forEach((w, idx) => sheet.setColumnWidth(idx + 1, w));

  const maxRows = 500;
  sheet.getRange(4, 1, maxRows - 3, 14).setBackground('#FFF9E8');
  sheet.getRange(4, 15, maxRows - 3, 4).setBackground('#DDF4EA');
  sheet.getRange(4, 19, maxRows - 3, 3).setBackground('#E7E6E6');
  sheet.getRange(4, 22, maxRows - 3, 2).setBackground('#DDF4EA');
  sheet.getRange(4, 18, maxRows - 3, 1).setBackground('#FCE4D6');
  sheet.getRange(1, 1, maxRows, 23).setBorder(true, true, true, true, true, true, '#D5DAE3', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(1, 1, maxRows, 23).setWrap(true).setVerticalAlignment('middle');

  const sourceRows = source.getLastRow();
  if (sourceRows >= 4) {
    const output = [];
    for (let r = 4; r <= sourceRows; r++) {
      const repairId = source.getRange(r, 1).getValue();
      const product = source.getRange(r, 3).getValue();
      if (!repairId && !product) continue;

      const tasks = extractCheckedLabels_(source, r, {
        I: 'バッテリー交換',
        J: 'アナログスティック交換1個',
        K: 'アナログスティック交換2個',
        L: '液晶画面交換',
        M: 'ボタン修理',
        N: '基板清掃',
        O: '部品移設作業',
        P: 'ジャンク組み上げ',
        Q: '動作品組み上げ',
        R: '動作確認',
      });
      const parts = extractCheckedLabels_(source, r, {
        U: 'バッテリー',
        V: 'アナログスティック',
        W: 'フレキケーブル',
        X: 'ボタンセット',
        Y: '液晶画面',
      });
      ['Z', 'AB', 'AD'].forEach(col => {
        const val = source.getRange(`${col}${r}`).getValue();
        if (val) parts.push(String(val));
      });

      const partCost = source.getRange(r, 32).getValue();
      output.push([
        repairId,
        source.getRange(r, 2).getValue(),
        source.getRange(r, 8).getValue(),
        inferCategory_(product),
        product,
        source.getRange(r, 4).getValue(),
        source.getRange(r, 5).getValue(),
        source.getRange(r, 6).getValue(),
        '',
        '',
        '',
        tasks.join('、'),
        parts.join('、'),
        source.getRange(r, 37).getValue(),
        '',
        '',
        '',
        '',
        partCost,
        '',
        '',
        '',
        '',
      ]);
    }
    if (output.length) {
      sheet.getRange(4, 1, output.length, 23).setValues(output);
    }
  }

  const rules = quoteSheetName_(rulesName);
  for (let r = 4; r <= maxRows; r++) {
    sheet.getRange(r, 15).setFormula(`=IF($C${r}="","",DATE(YEAR($C${r}),MONTH($C${r}),1))`);
    sheet.getRange(r, 16).setFormula(`=IF($C${r}="","",IFS($K${r}="ジャンク",MIN($H${r}/60*${rules}!$B$5,${rules}!$B$7),OR($K${r}="動作確認済み",$K${r}="ワケあり",$I${r}=TRUE,$I${r}="TRUE",$J${r}<>""),MIN($H${r}/60*${rules}!$B$5,${rules}!$B$6),TRUE,0))`);
    sheet.getRange(r, 17).setFormula(`=AND($C${r}<>"",OR($I${r}=TRUE,$I${r}="TRUE",$J${r}<>""),$K${r}="動作確認済み")`);
    sheet.getRange(r, 18).setFormula(`=TEXTJOIN(", ",TRUE,IF(AND(COUNTA($A${r}:$N${r})>0,$C${r}=""),"返送日なし",""),IF(AND($C${r}<>"",$K${r}=""),"修理後状態なし",""),IF(AND($K${r}="動作確認済み",NOT(OR($I${r}=TRUE,$I${r}="TRUE",$J${r}<>""))),"修理完了未チェック",""),IF(AND($C${r}<>"",$P${r}=0),"報酬0",""))`);
    sheet.getRange(r, 22).setFormula(`=IF(COUNTA($A${r}:$N${r})=0,"",SUM($S${r},$T${r},$U${r}))`);
    sheet.getRange(r, 23).setFormula(`=IF($V${r}="","",$V${r}+$P${r})`);
  }

  sheet.getRange('B4:C500').setNumberFormat('yyyy-mm-dd');
  sheet.getRange('J4:J500').setNumberFormat('yyyy-mm-dd');
  sheet.getRange('O4:O500').setNumberFormat('yyyy-mm');
  sheet.getRange('P4:P500').setNumberFormat('#,##0');
  sheet.getRange('S4:W500').setNumberFormat('#,##0');

  const categoryRule = SpreadsheetApp.newDataValidation().requireValueInList(['ゲーム機', 'カーオーディオ', 'その他'], true).setAllowInvalid(false).build();
  const stateRule = SpreadsheetApp.newDataValidation().requireValueInList(['動作確認済み', 'ワケあり', 'ジャンク'], true).setAllowInvalid(false).build();
  sheet.getRange('D4:D500').setDataValidation(categoryRule);
  sheet.getRange('I4:I500').insertCheckboxes();
  sheet.getRange('K4:K500').setDataValidation(stateRule);

  sheet.getRange('A3:W500').createFilter();
}

function buildSummarySheet_(sheet, recordName, rulesName) {
  sheet.setHiddenGridlines(true);
  sheet.getRange('A1:P1').merge().setValue('月次集計')
    .setFontSize(18).setFontWeight('bold').setFontColor('#243B53');
  sheet.getRange('A2:P2').merge()
    .setValue('返送日が入った月に集計。インセンティブは修理完了かつ動作確認済みを30件ごとに加算。')
    .setFontColor('#5F6B7A');

  const headers = [
    '月', '返送台数', '動作確認済み', 'ワケあり', 'ジャンク', 'インセン対象',
    '作業時間(分)', '作業報酬', 'インセンティブ', '作業者報酬計',
    '部品代', '仕入れ', '送料', '商品原価合計', '総コスト', '要確認件数'
  ];
  sheet.getRange(4, 1, 1, headers.length).setValues([headers])
    .setBackground('#243B53').setFontColor('#FFFFFF').setFontWeight('bold')
    .setHorizontalAlignment('center').setWrap(true);
  sheet.setFrozenRows(4);
  sheet.setColumnWidths(1, 16, 110);

  const rec = quoteSheetName_(recordName);
  const rules = quoteSheetName_(rulesName);
  for (let r = 5; r <= 16; r++) {
    sheet.getRange(r, 1).setFormula(r === 5 ? '=DATE(2026,1,1)' : `=EDATE(A${r - 1},1)`).setNumberFormat('yyyy-mm');
    const start = `">="&$A${r}`;
    const end = `"<"&EDATE($A${r},1)`;
    const dateRange = `${rec}!$C$4:$C$500`;
    sheet.getRange(r, 2).setFormula(`=COUNTIFS(${dateRange},${start},${dateRange},${end})`);
    sheet.getRange(r, 3).setFormula(`=COUNTIFS(${dateRange},${start},${dateRange},${end},${rec}!$K$4:$K$500,"動作確認済み")`);
    sheet.getRange(r, 4).setFormula(`=COUNTIFS(${dateRange},${start},${dateRange},${end},${rec}!$K$4:$K$500,"ワケあり")`);
    sheet.getRange(r, 5).setFormula(`=COUNTIFS(${dateRange},${start},${dateRange},${end},${rec}!$K$4:$K$500,"ジャンク")`);
    sheet.getRange(r, 6).setFormula(`=COUNTIFS(${dateRange},${start},${dateRange},${end},${rec}!$Q$4:$Q$500,TRUE)`);
    sheet.getRange(r, 7).setFormula(`=SUMIFS(${rec}!$H$4:$H$500,${dateRange},${start},${dateRange},${end})`);
    sheet.getRange(r, 8).setFormula(`=SUMIFS(${rec}!$P$4:$P$500,${dateRange},${start},${dateRange},${end})`);
    sheet.getRange(r, 9).setFormula(`=QUOTIENT(F${r},${rules}!$B$8)*${rules}!$B$9`);
    sheet.getRange(r, 10).setFormula(`=H${r}+I${r}`);
    sheet.getRange(r, 11).setFormula(`=SUMIFS(${rec}!$S$4:$S$500,${dateRange},${start},${dateRange},${end})`);
    sheet.getRange(r, 12).setFormula(`=SUMIFS(${rec}!$T$4:$T$500,${dateRange},${start},${dateRange},${end})`);
    sheet.getRange(r, 13).setFormula(`=SUMIFS(${rec}!$U$4:$U$500,${dateRange},${start},${dateRange},${end})`);
    sheet.getRange(r, 14).setFormula(`=SUMIFS(${rec}!$V$4:$V$500,${dateRange},${start},${dateRange},${end})`);
    sheet.getRange(r, 15).setFormula(`=SUMIFS(${rec}!$W$4:$W$500,${dateRange},${start},${dateRange},${end})`);
    sheet.getRange(r, 16).setFormula(`=COUNTIFS(${dateRange},${start},${dateRange},${end},${rec}!$R$4:$R$500,"<>")`);
  }

  sheet.getRange('A4:P16').setBorder(true, true, true, true, true, true, '#D5DAE3', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange('H5:O16').setNumberFormat('#,##0');

  const chart = sheet.newChart()
    .asColumnChart()
    .addRange(sheet.getRange('A4:A16'))
    .addRange(sheet.getRange('J4:J16'))
    .setPosition(4, 18, 0, 0)
    .setOption('title', '月別 作業者報酬')
    .setOption('legend', { position: 'none' })
    .setOption('colors', ['#2F80ED'])
    .build();
  sheet.insertChart(chart);
}

function extractCheckedLabels_(sheet, row, colMap) {
  const labels = [];
  Object.keys(colMap).forEach(col => {
    const value = sheet.getRange(`${col}${row}`).getValue();
    if (value === true || String(value).toUpperCase() === 'TRUE') {
      labels.push(colMap[col]);
    }
  });
  return labels;
}

function inferCategory_(name) {
  const text = String(name || '').toUpperCase();
  if (/(VITA|PSP|PS |PS2|PS3|PS4|DS|WII|SWITCH)/.test(text)) return 'ゲーム機';
  if (/(KW|DPX|MD|CD|KENWOOD|CAR)/.test(text)) return 'カーオーディオ';
  return 'その他';
}

function makeUniqueSheetName_(ss, baseName) {
  if (!ss.getSheetByName(baseName)) return baseName;
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MMdd_HHmmss');
  return `${baseName}_${stamp}`;
}

function quoteSheetName_(name) {
  return `'${String(name).replace(/'/g, "''")}'`;
}
