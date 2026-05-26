import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir =
  "/Users/mikami/.codex/worktrees/ebe0/mikami-operations-official/spreadsheets";
await fs.mkdir(outDir, { recursive: true });

const workbook = Workbook.create();
const sheetNames = [
  "経営サマリー",
  "月次利益",
  "データ取込状況",
  "支出サブスク",
  "商品カテゴリ別",
  "要確認",
  "月次チェック",
  "設定",
];
const sheets = {};

for (const name of sheetNames) {
  sheets[name] = workbook.worksheets.add(name);
  sheets[name].showGridLines = false;
}

function header(sheet, range) {
  sheet.getRange(range).format = {
    fill: "#164E63",
    font: { bold: true, color: "#FFFFFF" },
    wrapText: true,
  };
}

function targetOf(category, month) {
  const m = month === "不明" ? "YYYY年MM月" : month;
  if (category === "FedEx請求書")
    return `${m}/各種請求書（送料・配送費として分類）`;
  if (category === "サブスク/サービス系請求書・領収書")
    return `${m}/サブスク または 各種請求書`;
  if (category === "配送/通関/納品ラベル系")
    return `${m}/配送・通関（提出対象確認後）`;
  if (category === "CSV/Excel配送・返送・フルフィルメント系")
    return `${m}/eBay配送書類 または 保管専用`;
  if (category === "振込明細") return `${m}/支払・振込明細`;
  if (category === "Refund/CreditNote") return `${m}/返金・調整`;
  if (category === "画像ノイズ候補") return "保存対象外候補（削除は確認後）";
  if (category === "ZIP") return "保留（中身確認後）";
  return "保留";
}

const months = [
  "2026年01月",
  "2026年02月",
  "2026年03月",
  "2026年04月",
  "2026年05月",
  "2026年06月",
  "2026年07月",
  "2026年08月",
  "2026年09月",
  "2026年10月",
  "2026年11月",
  "2026年12月",
];

// 設定
sheets["設定"].getRange("A1:D1").values = [["区分", "値", "説明", "変更可否"]];
header(sheets["設定"], "A1:D1");
sheets["設定"].getRange("A2:D16").values = [
  ["対象月", "2026年05月", "経営サマリーで見る月", "可"],
  ["状態ラベル", "済", "データあり", "固定"],
  ["状態ラベル", "未", "データなし", "固定"],
  ["状態ラベル", "要確認", "分類・月・金額に確認あり", "固定"],
  ["カテゴリ", "ゲーム機", "商品カテゴリ", "可"],
  ["カテゴリ", "無線機", "商品カテゴリ", "可"],
  ["カテゴリ", "ブランド品", "商品カテゴリ", "可"],
  ["カテゴリ", "カーパーツ", "商品カテゴリ", "可"],
  ["カテゴリ", "カーオーディオ", "商品カテゴリ", "可"],
  ["カテゴリ", "その他", "商品カテゴリ", "可"],
  ["注意", "本番GASは未変更", "この試作ブックは参照設計用", "固定"],
  ["注意", "金額は未入力", "実データ接続前の雛形", "固定"],
  ["注意", "個人情報は入れない", "月合計・分類名だけ扱う", "固定"],
  ["注意", "Drive移動なし", "移動は別承認後", "固定"],
  ["注意", "Script Properties値は扱わない", "キー名確認も別承認", "固定"],
];

// 月次利益
sheets["月次利益"].getRange("A1:L1").values = [
  [
    "月",
    "売上",
    "仕入原価",
    "eBay費用",
    "送料",
    "関税",
    "外注費",
    "固定費",
    "調整",
    "実質利益",
    "利益率",
    "状態",
  ],
];
header(sheets["月次利益"], "A1:L1");
sheets["月次利益"].getRange("A2:A13").values = months.map((m) => [m]);
sheets["月次利益"].getRange("J2").formulas = [
  ['=IF(B2="","",B2-C2-D2-E2-F2-G2-H2+I2)'],
];
sheets["月次利益"].getRange("J2:J13").fillDown();
sheets["月次利益"].getRange("K2").formulas = [['=IFERROR(J2/B2,"")']];
sheets["月次利益"].getRange("K2:K13").fillDown();
sheets["月次利益"].getRange("L2").formulas = [
  ['=IF(B2="","未",IF(COUNTBLANK(C2:H2)>0,"要確認","締め可"))'],
];
sheets["月次利益"].getRange("L2:L13").fillDown();
sheets["月次利益"].getRange("B2:J13").format.numberFormat =
  "¥#,##0;[Red]-¥#,##0;¥0";
sheets["月次利益"].getRange("K2:K13").format.numberFormat = "0.0%";

// 経営サマリー
sheets["経営サマリー"].getRange("A1:H1").values = [
  ["経営防御ダッシュボード v1 試作（本番GAS未変更）", "", "", "", "", "", "", ""],
];
sheets["経営サマリー"].getRange("A1:H1").merge();
sheets["経営サマリー"].getRange("A1:H1").format = {
  fill: "#0F172A",
  font: { bold: true, color: "#FFFFFF", size: 16 },
};
sheets["経営サマリー"].getRange("A2:B2").values = [["対象月", "2026年05月"]];
header(sheets["経営サマリー"], "A2:B2");
sheets["経営サマリー"].getRange("A4:B10").values = [
  ["指標", "値"],
  ["売上", ""],
  ["実質利益", ""],
  ["利益率", ""],
  ["最大コスト", ""],
  ["要確認件数", ""],
  ["月次締め状態", ""],
];
header(sheets["経営サマリー"], "A4:B4");
sheets["経営サマリー"].getRange("B5").formulas = [
  ['=IFERROR(INDEX(\'月次利益\'!B:B,MATCH($B$2,\'月次利益\'!A:A,0)),"")'],
];
sheets["経営サマリー"].getRange("B6").formulas = [
  ['=IFERROR(INDEX(\'月次利益\'!J:J,MATCH($B$2,\'月次利益\'!A:A,0)),"")'],
];
sheets["経営サマリー"].getRange("B7").formulas = [
  ['=IFERROR(INDEX(\'月次利益\'!K:K,MATCH($B$2,\'月次利益\'!A:A,0)),"")'],
];
sheets["経営サマリー"].getRange("B8").formulas = [
  [
    '=IF(B5="","入力待ち",INDEX({"仕入原価","eBay費用","送料","関税","外注費","固定費"},1,MATCH(MAX(INDEX(\'月次利益\'!C:H,MATCH($B$2,\'月次利益\'!A:A,0),0)),INDEX(\'月次利益\'!C:H,MATCH($B$2,\'月次利益\'!A:A,0),0),0)))',
  ],
];
sheets["経営サマリー"].getRange("B9").formulas = [
  ['=COUNTIF(\'要確認\'!E:E,"<>完了")-1'],
];
sheets["経営サマリー"].getRange("B10").formulas = [
  ['=IFERROR(INDEX(\'月次利益\'!L:L,MATCH($B$2,\'月次利益\'!A:A,0)),"未")'],
];
sheets["経営サマリー"].getRange("A12:H12").values = [
  ["次に見ること", "", "", "", "", "", "", ""],
];
sheets["経営サマリー"].getRange("A12:H12").merge();
header(sheets["経営サマリー"], "A12:H12");
sheets["経営サマリー"].getRange("A13:H17").values = [
  ["1", "データ取込状況で「未」「要確認」を見る", "", "", "", "", "", ""],
  ["2", "月次利益に売上・費用の月合計を入れる", "", "", "", "", "", ""],
  ["3", "要確認シートで迷子ファイルと不足データを確認する", "", "", "", "", "", ""],
  ["4", "固定費・サブスクを支出サブスクへ分類する", "", "", "", "", "", ""],
  ["5", "商品カテゴリ別の採算を確認する", "", "", "", "", "", ""],
];
sheets["経営サマリー"].getRange("D4:E4").values = [["月", "実質利益"]];
header(sheets["経営サマリー"], "D4:E4");
sheets["経営サマリー"].getRange("D5:E16").formulas = months.map((_, i) => [
  `='月次利益'!A${i + 2}`,
  `='月次利益'!J${i + 2}`,
]);

// データ取込状況
sheets["データ取込状況"].getRange("A1:J1").values = [
  [
    "月",
    "eBay売上",
    "円換算",
    "eBayインボイス",
    "請求書",
    "領収書",
    "メルカード",
    "外注費",
    "在庫ログ",
    "締め状態",
  ],
];
header(sheets["データ取込状況"], "A1:J1");
sheets["データ取込状況"].getRange("A2:A13").values = months.map((m) => [m]);
sheets["データ取込状況"].getRange("B2:J13").values = months.map(() => [
  "未",
  "未",
  "未",
  "未",
  "未",
  "未",
  "未",
  "未",
  "未",
]);

// 支出サブスク
sheets["支出サブスク"].getRange("A1:H1").values = [
  ["支払月", "支払先分類", "金額", "区分", "継続/単発", "削減候補", "根拠", "確認事項"],
];
header(sheets["支出サブスク"], "A1:H1");
sheets["支出サブスク"].getRange("A2:H21").values = Array.from({ length: 20 }, () => [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
]);
sheets["支出サブスク"].getRange("C2:C21").format.numberFormat =
  "¥#,##0;[Red]-¥#,##0;¥0";

// 商品カテゴリ別
sheets["商品カテゴリ別"].getRange("A1:K1").values = [
  [
    "月",
    "カテゴリ",
    "売上",
    "仕入原価",
    "送料",
    "関税",
    "手数料",
    "外注費",
    "実質利益",
    "利益率",
    "判断",
  ],
];
header(sheets["商品カテゴリ別"], "A1:K1");
const categories = ["ゲーム機", "無線機", "ブランド品", "カーパーツ", "カーオーディオ", "その他"];
sheets["商品カテゴリ別"].getRange("A2:B7").values = categories.map((c) => [
  "2026年05月",
  c,
]);
sheets["商品カテゴリ別"].getRange("I2").formulas = [
  ['=IF(C2="","",C2-D2-E2-F2-G2-H2)'],
];
sheets["商品カテゴリ別"].getRange("I2:I7").fillDown();
sheets["商品カテゴリ別"].getRange("J2").formulas = [['=IFERROR(I2/C2,"")']];
sheets["商品カテゴリ別"].getRange("J2:J7").fillDown();
sheets["商品カテゴリ別"].getRange("K2").formulas = [
  ['=IF(C2="","未入力",IF(J2>=0.2,"伸ばす",IF(J2>=0.08,"価格見直し","停止候補")))'],
];
sheets["商品カテゴリ別"].getRange("K2:K7").fillDown();
sheets["商品カテゴリ別"].getRange("C2:I7").format.numberFormat =
  "¥#,##0;[Red]-¥#,##0;¥0";
sheets["商品カテゴリ別"].getRange("J2:J7").format.numberFormat = "0.0%";

// 要確認
sheets["要確認"].getRange("A1:F1").values = [
  ["ID", "種別", "推定月", "理由", "状態", "次アクション"],
];
header(sheets["要確認"], "A1:F1");
sheets["要確認"].getRange("A2:F8").values = [
  ["REV-001", "未分類ファイル", "全体", "00_要確認に50件", "未完了", "マスク済み移動予定リストを確認"],
  ["REV-002", "年フォルダ表記", "2026年", "2026 と 2026年 が混在", "未完了", "正式表記を決める"],
  ["REV-003", "画像ノイズ", "2025年12月", "メール装飾画像候補", "未完了", "削除せず除外候補にする"],
  ["REV-004", "Script Properties", "全体", "値露出リスク", "未確認", "キー名確認も別承認"],
  ["REV-005", "関税実績", "全体", "保存場所未確定", "未完了", "保存場所を確認"],
  ["REV-006", "商品別仕入原価", "全体", "在庫ログ接続未確定", "未完了", "列名を確認"],
  ["REV-007", "実行ログ", "全体", "既存ログ有無未確認", "未完了", "ログシート仕様を実装候補化"],
];

// 月次チェック
sheets["月次チェック"].getRange("A1:E1").values = [
  ["目安", "チェック", "状態", "確認先", "備考"],
];
header(sheets["月次チェック"], "A1:E1");
sheets["月次チェック"].getRange("A2:E9").values = [
  ["毎月7日", "eBay売上・円換算の確認", "未", "eBay売上一覧 / 円換算", "本番GAS変更なし"],
  ["毎月7日", "請求書・領収書の保存確認", "未", "01_請求書メール / 税理士提出用", "迷子は要確認へ"],
  ["毎月11日", "外注費の確認", "未", "外注費一覧", "個人情報は保存しない"],
  ["毎月15日", "税理士提出チェック", "未", "税理士提出チェックリスト", "通知テストは確認後"],
  ["月末", "経営サマリー確認", "未", "経営サマリー", "実質利益を見る"],
  ["月末", "固定費・サブスク見直し", "未", "支出サブスク", "削減候補を見る"],
  ["随時", "00_要確認の整理", "未", "マスク済みリスト", "実移動は承認後"],
  ["随時", "エラー確認", "未", "実行ログ / トリガー履歴", "再実行は確認後"],
];

for (const name of Object.keys(sheets)) {
  const sheet = sheets[name];
  try {
    sheet.freezePanes.freezeRows(1);
  } catch {}
  const used = sheet.getUsedRange();
  if (used) {
    used.format.wrapText = true;
    used.format.font = { name: "Arial", size: 10 };
    used.format.autofitColumns();
  }
}

try {
  const chart = sheets["経営サマリー"].charts.add(
    "line",
    sheets["経営サマリー"].getRange("D4:E16"),
  );
  chart.title = "月次 実質利益";
  chart.hasLegend = false;
  chart.xAxis = { axisType: "textAxis" };
  chart.yAxis = { numberFormatCode: "¥#,##0" };
  chart.setPosition("D18", "H34");
} catch {
  sheets["経営サマリー"].getRange("D18").values = [["チャートはGoogle Sheets側で作成予定"]];
}

const inspect = await workbook.inspect({
  kind: "table",
  range: "経営サマリー!A1:H17",
  include: "values,formulas",
  tableMaxRows: 20,
  tableMaxCols: 8,
  maxChars: 5000,
});
const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "formula error scan",
  maxChars: 2000,
});

let previewPath = "";
try {
  const preview = await workbook.render({
    sheetName: "経営サマリー",
    range: "A1:H34",
    scale: 1,
    format: "png",
  });
  previewPath = `${outDir}/management-defense-dashboard-v1-preview.png`;
  await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));
} catch {
  previewPath = "render skipped";
}

const output = await SpreadsheetFile.exportXlsx(workbook);
const xlsxPath = `${outDir}/management-defense-dashboard-v1-prototype.xlsx`;
await output.save(xlsxPath);

console.log(
  JSON.stringify(
    {
      xlsxPath,
      previewPath,
      formulaErrors: errors.ndjson,
      inspected: inspect.ndjson.slice(0, 1000),
    },
    null,
    2,
  ),
);
