# eBay業務自動化 Phase1 本番GAS読み取り確認結果

確認日: 2026-05-26

## 結論

2026-05-26、三神さんがGoogleログインを完了した後、Codex in-app browserで本番GASと関連スプレッドシートを読み取り確認した。

本番GAS 12ファイル、不要候補4ファイル、トリガー一覧、スプレッドシート側のメニュー/タブは確認できた。Script Propertiesは値が表示されるリスクがあるため開かず、キー名確認は未実施とした。

削除、変更、GAS関数実行、トリガー追加/削除/変更、Script Properties値の閲覧/保存、Google Driveファイルの削除/移動は行っていない。

2026-05-26追記:

- ブラウザで本番GAS URLを開いたが、Googleログイン画面が表示されたため、指示どおり作業を停止した。
- ログイン情報は要求していない。
- メールアドレス入力、ログイン操作、GAS画面内操作は行っていない。
- そのため、本番GAS 12ファイル、不要候補4ファイル、トリガー、Script Propertiesキー名、ダッシュボード/メニューは引き続き未確認。

2026-05-26ログイン後追記:

- 三神さんログイン後、本番GAS編集画面を開けた。
- 本番GAS 12ファイルはすべて実在確認済み。
- 不要候補4ファイルはすべて実在確認済み。
- トリガー一覧は関数名、時間ベース種別、前回実行、エラー率のみ確認済み。詳細な実行頻度/時刻は一覧上に表示されず、編集画面を開く必要があるため未確認。
- Script Propertiesは値露出リスクを避けるため未確認。
- 関連スプレッドシートは開けた。表示タイトルは「税理士提出チェックリスト - Google スプレッドシート」で、正本上の「eBay業務管理マスター」IDと同一IDを開いている。カスタムらしきメニューとして「プロジェクト管理」「在庫管理」を確認した。

2026-05-26追加確認:

- `runInvoiceBridge` の役割とトリガー詳細時刻を確認した。
- `collectTaxDocuments` / `collectEbayInvoices` は、全GASファイルの関数選択リスト上では見つからなかった。
- 削除、変更、保存、GAS関数実行、トリガー保存、Script Properties確認は行っていない。

## 実施した確認

参照した正本:

- `alf-overnight-work-queue.md`
- `alf-phase1-gas-readonly-check-request.md`
- `ebay-phase1-startup-tasks.md`
- `ebay-automation-phase1-summary.md`
- `ebay-phase1-audit.md`
- `ebay-phase1-test-plan.md`
- `delegated-tasks.md`
- `projects.md`
- `handoff.md`

ローカル環境で確認したこと:

- `clasp` コマンドは見つからなかった。
- `gcloud` コマンドは見つからなかった。
- `.clasprc.json`、`.clasp.json`、`appsscript.json` は、確認した範囲では見つからなかった。
- Google認証済みCLI/API経路は確認できなかった。
- Node.jsは存在するが、Google Apps Script APIへ認証済みでアクセスする設定は確認できなかった。

ブラウザで確認したこと:

- 開いたURL: `https://script.google.com/d/1pT-zVau4y54GsXmFzgIweETGvAuKymK_IzCxBVcfAez7mSwyj0D6KcTA/edit`
- 表示された画面: Googleログイン画面
- 状態: ログインが必要なため停止
- 実施しなかったこと: ログイン、メールアドレス入力、GAS画面操作、Script Properties表示、トリガー操作、関数実行

ログイン後にブラウザで追加確認したこと:

- 本番GAS編集画面URL: `https://script.google.com/home/projects/1pT-zVau4y54GsXmFzgIweETGvAuKymK_IzCxBVcfAez7mSwyj0D6KcTA/edit`
- 表示タイトル: `eBay業務管理マスター - プロジェクト編集者 - Apps Script`
- トリガー画面URL: `https://script.google.com/home/projects/1pT-zVau4y54GsXmFzgIweETGvAuKymK_IzCxBVcfAez7mSwyj0D6KcTA/triggers`
- 表示タイトル: `eBay業務管理マスター - プロジェクトのトリガー - Apps Script`
- 関連スプレッドシートURL: `https://docs.google.com/spreadsheets/d/1SyBOyddLedhQfQL70E7dbuhfspO4NrxUTLqq4rSVujU/edit`
- 表示タイトル: `税理士提出チェックリスト - Google スプレッドシート`
- 操作範囲: 画面遷移と一覧ラベルの読み取りのみ。コード編集、保存、実行、トリガー編集、プロパティ表示はしていない。

## 正本上の確認対象

本番GASプロジェクトID:

- `1pT-zVau4y54GsXmFzgIweETGvAuKymK_IzCxBVcfAez7mSwyj0D6KcTA`

正本上の本番GAS 12ファイル:

| ファイル | 正本上の役割 | 本番実体確認 |
|---|---|---|
| `dashboard_manager.gs` | メニュー、システム管理、トリガー管理 | 未確認 |
| `tax_doc_checker.gs` | 税理士提出書類チェック | 未確認 |
| `auto_file_sorter.gs` | 投げ込みフォルダ自動振り分け | 未確認 |
| `auto_file_renamer.gs` | OCR金額照合と自動リネーム | 未確認 |
| `auto_inventory_logger.gs` | 購入メール/スクショ解析による在庫ログ | 未確認 |
| `invoice_email_saver_v3.gs` | 請求書メール添付保存 | 未確認 |
| `ebay_yen_converter.gs` | eBay円貨換算、MURC TTM取得 | 未確認 |
| `ebay_doc_processor.gs` | eBay書類取り込み | 未確認 |
| `receipt_email_processor.gs` | 領収書メール処理 | 未確認 |
| `restore_tax_doc_master.gs` | 69項目チェックリスト復元 | 未確認 |
| `screenshot_data_extractor.gs` | スクショ/CSV/OCRデータ抽出 | 未確認 |
| `outsource_invoice_check.gs` | 外注請求書チェック | 未確認 |

ログイン後の実体確認:

| ファイル | 結果 |
|---|---|
| `dashboard_manager.gs` | あり |
| `tax_doc_checker.gs` | あり |
| `auto_file_sorter.gs` | あり |
| `auto_file_renamer.gs` | あり |
| `auto_inventory_logger.gs` | あり |
| `invoice_email_saver_v3.gs` | あり |
| `ebay_yen_converter.gs` | あり |
| `ebay_doc_processor.gs` | あり |
| `receipt_email_processor.gs` | あり |
| `restore_tax_doc_master.gs` | あり |
| `screenshot_data_extractor.gs` | あり |
| `outsource_invoice_check.gs` | あり |
| `appsscript.json` | あり |

不要候補4ファイル:

| ファイル | 正本上の判断 | 本番実体確認 |
|---|---|---|
| `コード.gs` | 削除候補 / 確認待ち | 未確認 |
| `outsource_tally.gs` | 統合済みの可能性 / 削除候補 | 未確認 |
| `update_keywords_and_resort.gs` | 役割移行済みの可能性 / 削除候補 | 未確認 |
| `auto_invoice_bridge.gs` | v2からv3移行用の可能性 / 削除候補 | 未確認 |

ログイン後の実体確認:

| ファイル | 結果 | 注意 |
|---|---|---|
| `コード.gs` | あり | 削除はしていない |
| `outsource_tally.gs` | あり | 削除はしていない |
| `update_keywords_and_resort.gs` | あり | 削除はしていない |
| `auto_invoice_bridge.gs` | あり | 削除はしていない。後述のとおり `runInvoiceBridge` トリガーが存在するため要注意 |

## トリガー確認結果

本番実画面はログイン後に確認済み。正本上の想定トリガーと、画面上で確認できた結果は以下。

| 種別 | 関数 | 想定時刻 | 本番画面の確認結果 |
|---|---|---|---|
| 日次 | `saveInvoicesFromGmail_v3` | 8:00 | あり。時間ベース。前回実行 `2026/05/26 4:07:44`、エラー率 `0%`。詳細時刻は未確認 |
| 日次 | `processReceiptEmails` | 9:00 | あり。時間ベース。前回実行 `2026/05/25 9:45:43`、エラー率 `0%`。詳細時刻は未確認 |
| 日次 | `processPurchaseEmails` | 10:00 / 22:00 | 2件あり。どちらも時間ベース。前回実行 `2026/05/25 12:44:49` / `2026/05/26 5:29:58`、エラー率 `0%`。詳細時刻は未確認 |
| 日次 | `processScreenshots` | 21:00 | あり。時間ベース。前回実行 `2026/05/25 21:41:47`、エラー率 `0%`。詳細時刻は未確認 |
| 日次 | `runAutoSorterWithRename` | 23:00 | あり。時間ベース。前回実行 `2026/05/26 5:36:27`、エラー率 `0%`。詳細時刻は未確認 |
| 月次 | `collectTaxDocuments` | 7日 9:00 | 一覧上では見つからず |
| 月次 | `collectEbayInvoices` | 7日 10:00 | 一覧上では見つからず |
| 月次 | `tallyMonthlyRewards` | 7日 11:00 | あり。時間ベース。前回実行 `-`、エラー率 `-`。詳細時刻は未確認 |
| 月次 | `checkInvoicesAndAlert` | 11日 9:00 | あり。時間ベース。前回実行 `-`、エラー率 `-`。詳細時刻は未確認 |
| 月次 | `checkTaxDocuments` | 15日 9:00 | あり。時間ベース。前回実行 `-`、エラー率 `-`。詳細時刻は未確認 |
| 想定外 | `runInvoiceBridge` | 正本上は不要候補寄り | あり。時間ベース。前回実行 `2026/05/26 4:23:47`、エラー率 `0%`。`auto_invoice_bridge.gs` が削除候補でも実トリガーありのため、削除不可・要確認 |

注意:

- トリガー一覧の表示列は、オーナー、前回の実行、導入、イベント、関数、エラー率。
- 一覧上で分かる頻度は「時間ベース」まで。毎日/毎月、日付、時刻の詳細は編集画面を開かないと確認できない可能性がある。
- 編集画面を開くこと自体が誤操作につながるため、今回は開いていない。

## 追加確認: `runInvoiceBridge` / `collectTaxDocuments` / `collectEbayInvoices`

### `runInvoiceBridge`

確認結果:

- 実在ファイル: `auto_invoice_bridge.gs`
- 実在関数: `runInvoiceBridge`
- 関数選択リスト上の同系関数:
  - `runInvoiceBridge`
  - `testInvoiceBridge`
  - `runInvoiceBridgeFullScan`
  - `markAllExistingAsProcessed`
  - `setInvoiceBridgeTrigger`

役割:

- `01_請求書メール` フォルダに保存された添付ファイルを、`04_税理士提出用/00_投げ込み用` フォルダへ自動コピーする中継処理。
- 請求書メール自動保存v3の後、書類自動振り分けの前に動く想定。
- 処理済みファイルIDをスプレッドシートへ記録し、同じファイルを二重コピーしない設計。

トリガー詳細:

| 項目 | 確認結果 |
|---|---|
| 関数 | `runInvoiceBridge` |
| イベントソース | 時間主導型 |
| トリガータイプ | 日付ベースのタイマー |
| 実行時間帯 | 午前4時-5時 |
| 前回実行 | `2026/05/26 4:23:47` |
| エラー率 | `0%` |

注意:

- ファイル内コメントでは「請求書メール自動保存v3（毎日8:00）の後に実行」「ブリッジ: 8:30」と読める記載がある。
- 実際の本番トリガーは午前4時-5時で、コメント上の想定時刻とズレている。
- 削除候補だった `auto_invoice_bridge.gs` に現役トリガーがあるため、削除不可。まず「要確認」にする。

### `collectTaxDocuments`

確認結果:

- 本番GAS全ファイルの関数選択リストでは、`collectTaxDocuments` は見つからなかった。
- トリガー一覧にも `collectTaxDocuments` は見つからなかった。

現時点の見立て:

- 旧設計・旧ドキュメント上の関数名が残っている可能性が高い。
- 税理士提出書類まわりの現役関数としては、`tax_doc_checker.gs` の `checkTaxDocuments` 系が存在する。
- ただし、`collectTaxDocuments` と `checkTaxDocuments` が同じ役割かは未確定。

### `collectEbayInvoices`

確認結果:

- 本番GAS全ファイルの関数選択リストでは、`collectEbayInvoices` は見つからなかった。
- トリガー一覧にも `collectEbayInvoices` は見つからなかった。

現時点の見立て:

- 旧設計・旧ドキュメント上の関数名が残っている可能性が高い。
- eBay書類まわりの現役候補としては、`ebay_yen_converter.gs` の `findAndOrganizeEbayDocs`、`ebay_doc_processor.gs` の `processEbayDocuments` が存在する。
- ただし、`collectEbayInvoices` とこれらの関数が同じ役割かは未確定。

## Script Properties確認結果

未確認。ログイン後も確認しなかった。

理由:

- Apps Scriptの設定画面では値が表示される可能性があり、APIキー、トークン、通知先などの値を読んだり保存したりするリスクがあるため。
- Script Propertiesの値にはAPIキー、トークン、通知先などが含まれる可能性があるため、ブラウザ画面や生データを無理に取得しない方針とした。

## ダッシュボード/メニュー確認結果

ログイン後に関連スプレッドシートを開いて、画面ラベルのみ確認した。

| 確認項目 | 結果 |
|---|---|
| 正本上のシートID | `1SyBOyddLedhQfQL70E7dbuhfspO4NrxUTLqq4rSVujU` |
| ブラウザ表示タイトル | `税理士提出チェックリスト - Google スプレッドシート` |
| Phase1系のカスタムメニュー | ありそう。`プロジェクト管理`、`在庫管理` を確認 |
| システム管理ダッシュボード | タブ名として `更新と管理` を確認。内容確認は未実施 |
| 手動実行ボタン | 未確認。ボタン押下やメニュー展開はしていない |
| 最終実行日時の表示 | 未確認。シート内データは読んでいない |
| エラー/ログ表示 | 未確認。シート内データは読んでいない |

確認できたシートタブ名:

- `2026年03月`
- `2026年02月`
- `シート1`
- `抽出`
- `更新と管理`

注意:

- シート内の行データや金額、個人情報の可能性がある内容は記録していない。
- メニューをクリックして関数を実行する操作は行っていない。

## 次に実行してよいテスト案

次は、三神さん確認後に以下を進めるのが安全。

1. トリガー詳細を、編集せずに安全に読める方法があるか確認する。難しければ「詳細時刻は未確認」で固定する。
2. `collectTaxDocuments` と `collectEbayInvoices` が本当に未設定か、別プロジェクト/別トリガー/手動メニュー経由かを確認する。
3. `runInvoiceBridge` は不要候補4ファイル側の関数と思われるが、実トリガーがあるため、削除候補から一旦「要確認」に引き上げる。
4. Script Propertiesは、三神さん立ち会いまたはマスク前提でキー名だけ確認する。値は記録しない。
5. スプレッドシートの `プロジェクト管理` / `在庫管理` メニューと `更新と管理` タブの役割を、クリック実行なしで確認する。

## 実行前に三神さん確認が必要なこと

- トリガー編集画面を「閲覧だけ」で開いてよいか。
- Script Propertiesのキー名確認を実施してよいか。実施する場合、値を見ない/保存しない運用をどう担保するか。
- スプレッドシート上のカスタムメニューを開くだけならよいか。メニュー項目によっては実行系が混ざる可能性があるため、クリック実行は禁止のままにする。
- 次段階で、ドライラン関数や読み取り系関数を実行してよいか。

## Fayへ戻す内容

- A-001は、三神さんログイン後にブラウザ読み取り確認を実施。
- 本番GAS 12ファイルと不要候補4ファイルはすべて実在確認済み。
- トリガーは一覧上で9種類/10行を確認。`processPurchaseEmails` は2件、`runInvoiceBridge` は想定外で存在。`collectTaxDocuments` と `collectEbayInvoices` は一覧上で見つからず。
- Script Propertiesは値露出リスクのため未確認。
- スプレッドシート側は `プロジェクト管理`、`在庫管理`、`更新と管理` を確認。表示タイトルは正本上の名称と異なり `税理士提出チェックリスト`。
- 削除・変更・実行・トリガー変更・Drive操作・Script Properties値保存は行っていない。
