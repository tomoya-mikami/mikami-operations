# 送料・Shipping Policy 取り込み要約

最終更新: 2026-05-25

## 目的

旧チャットから受け取った「eBay越境輸出の送料・関税・Shipping Policy設計」の引き継ぎ目次案を、Fay/Alfで正本化するための中間メモです。

このメモは、eBay画面上のShipping Policy、Rate Table、除外国、高リスク国、パートスタッフ手順を中心に管理する。送料マスター/GAS側の詳細は `master-shipping-expansion-summary.md` と接続する。

## 取り込みID

- `chat-import-ledger.md`: I-004
- `delegated-tasks.md`: T-001, T-003, T-017
- `projects.md`: P-003, P-005

## 現在の判定

| 項目 | 判定 |
|---|---|
| 分類 | 送料 / 関税 / Shipping Policy |
| 重要度 | 高 |
| 緊急度 | 高 |
| 状態 | 反映中 / 要最新確認 |
| Alf依頼 | 必要 |

## 対象範囲

- eBay越境輸出の送料、関税、Shipping Policy設計。
- Google Sheets + GASリサーチツールへの送料・ポリシー連携。
- CPaSS / SpeedPAK / FedEx / DHL 送料データ活用。
- パートスタッフ向け運用・作業手順。

## 最新方針として扱うもの

- 米国向けはDDP想定。関税分を送料として追加徴収する方針。
- 米国外は基本DDU想定。
- 商品価格に基準送料を含め、一部地域は送料0表示、その他地域はRate Tableで差額送料を徴収する。
- USD 2,501以上はDDU切替。
- 重量・価格帯ごとにShipping Policyを選択する。
- Handling timeは7 business days。
- Descriptionは `Fedex,DHL`。

## Shipping Policy最終体系

- 最新マスター: `Triad_Shipping_Policy_Master_v9_通し番号.xlsx`
- 66ポリシー構成:
  - DDP: 60個
  - DDU: 6個
- 通し番号体系:
  - No.01-10: 0-1kg
  - No.11-20: 1-5kg
  - No.21-30: 5-15kg
  - No.31-40: 15-25kg
  - No.41-50: 25-30kg
  - No.51-60: 30-50kg
  - No.61-66: DDU USD 2,501+

## Rate Table設計

- 3つのRate Table:
  - `RT-Light`
  - `RT-Mid`
  - `RT-Heavy`
- 最新の国名詳細版: `Triad_Rate_Tables_詳細版_国名.xlsx`
- Free Shipping対象国、追加送料対象国、高リスク国の暫定高額送料設定がある。
- 高リスク国の暫定送料:
  - RT-Light: USD 500
  - RT-Mid: USD 1,000
  - RT-Heavy: USD 2,000

## 配送除外国・高リスク国対応

Business Policies利用中のため、Account全体除外設定が使えない可能性がある。

暫定対応:

- Rate Tableに高リスク送料を設定する。

後日対応:

- 各Shipping PolicyでExcluded shipping locations設定を確認・設定する。

要除外・高リスク候補:

- Belarus
- Russian Federation
- Ukraine
- Haiti
- Venezuela
- Africa全域
- APO/FPO/DPO
- PO Box

## CPaSS / SpeedPAK 送料表データ

読み込み済みPDF:

- SpeedPAK via FedEx
- SpeedPAK via DHL
- SpeedPAK Economy
- Orange Connex Multi-Channel Economy
- Pegasus Express PEN-DHL

必要な構造化データ:

- 配送方法
- Zone
- 国
- 重量帯
- 料金
- サイズ制限
- 容積重量ルール
- サーチャージ

Google Sheets / GASで参照可能なマスターデータ化が必要。

## Pegasus Express / DHLの扱い

- Pegasus基本料金は重量品で有利に見えた。
- ただし燃油サーチャージが高額。
- 2026年4月27日から2026年5月17日付近の情報では約46.75%-48%。
- 現時点ではFedEx / SpeedPAKの方が総額で有利と判断。
- 68kg超、FedEx不可品、特殊地域、最新サーチャージは保留・要検証。

## 既存出品のShipping Policy移行

未完了の次工程候補:

- 既存出品に現在どのShipping Policyが付いているか確認する。
- 商品名からサイズ・重量を推定する。
- 適切な新Shipping Policyを判定する。
- eBay出品一覧CSVから一括変更用CSVを作成する。

必要データ:

- Item ID
- 商品名
- 現在のShipping Policy
- 推定重量
- 推定梱包サイズ
- 推奨Shipping Policy
- 変更用CSV形式

## Google Sheets + GAS連携構想

- 商品名入力。
- AIでサイズ・重量推定。
- 梱包後サイズ・重量推定。
- Shipping Policy自動選択。
- 最安送料表示。
- 商品価格への送料上乗せ計算。
- 仕入額入力。
- 利益率計算。
- eBay手数料、為替、送料を考慮。
- CPaSS送料マスターと連携。

## 利益計算で要確認の項目

- 目標利益率20%。
- 商品価格に基準送料を上乗せ。
- 米国向けは価格帯別DDP追加送料。
- その他地域はRate Table追加送料。
- eBay最新手数料率。
- 国際取引手数料。
- Payoneer等の実効手数料。
- 為替レート更新方式。
- 返品リスク係数。
- 広告費・Promoted Listings費用。

## 作成済み成果物

- `Triad_Shipping_Policy_Master_v8.xlsx`
- `Triad_Shipping_Policy_Master_v9_通し番号.xlsx`
- `Triad_Rate_Tables_詳細版_国名.xlsx`
- `Triad_eBay_Setup_Guide_for_Part_Staff.docx`
- `Genspark相談用プロンプト.md`
- 各種旧バージョン v1-v7
- PDFフローチャート類
- Word運用マニュアル類

## 古い情報・上書きされた方針

- 初期の27ポリシー案。
- v4以前のRate Table。
- v5の簡易Free Shipping案。
- v6/v7の番号なしポリシー名。
- Pegasusを重量品メインにする案。
- FedEx International Connect PlusをeBay画面で直接選ぶ前提。
- Handling time 1 business day案。

## 要検証事項

- `RT-Light` / `RT-Mid` / `RT-Heavy` の最終画面設定。
- 高リスク国がExpedited側に入っているか。
- Africa全域が高リスクグループに入っているか。
- SpeedPAK Expedited選択時にRate Tableが正しく効くか。
- Belarus / Russia / Ukraine等が購入可能になっていないか。
- CPaSS送料表の最新性。
- Pegasus燃油サーチャージ最新値。
- eBay手数料率の最新値。
- Google Sheets側の列設計。
- GASで扱う送料マスター形式。

## 機密・保存禁止

以下は保存しない。

- パスワード
- 口座番号
- マイナンバー
- 顧客個人情報
- 個人メールアドレス
- APIキー
- eBayログイン情報
- eBayアカウント名
- 取引先との契約条件の詳細
- 個別顧客の住所・氏名・注文情報

## Alf向け作業メモ

詳細引き継ぎ要約が届いたら、以下を行う。

1. 最新マスターと古いバージョンを分離する。
2. 66ポリシー、3Rate Table、高リスク国、Excluded設定の実装状態を一覧化する。
3. CPaSS/SpeedPAK/FedEx/DHL/Pegasusの送料データを、GAS参照用マスターと接続する。
4. 既存出品のShipping Policy移行CSV構想を、必要入力・判定ロジック・出力形式に分ける。
5. パートスタッフ向け手順を、最新番号付きマスターに合わせて更新する。
6. eBay手数料、CPaSS料金、Pegasus燃油サーチャージ、eBay画面仕様は最新確認が必要なものとして明記する。
