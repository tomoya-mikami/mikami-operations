# eBay業務自動化 Phase1 本番GAS読み取り確認結果

確認日: 2026-05-26

## 結論

A-001として本番GAS読み取り確認を開始したが、このAlf環境には本番GASへ認証済みで読み取りアクセスする手段が見つからなかった。

そのため、GAS本体の実在確認、トリガー実画面確認、Script Propertiesキー名確認、ダッシュボード/メニュー実体確認は未完了。削除・変更・GAS関数実行・トリガー変更・Google Drive操作・Script Properties値の閲覧/保存は行っていない。

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

不要候補4ファイル:

| ファイル | 正本上の判断 | 本番実体確認 |
|---|---|---|
| `コード.gs` | 削除候補 / 確認待ち | 未確認 |
| `outsource_tally.gs` | 統合済みの可能性 / 削除候補 | 未確認 |
| `update_keywords_and_resort.gs` | 役割移行済みの可能性 / 削除候補 | 未確認 |
| `auto_invoice_bridge.gs` | v2からv3移行用の可能性 / 削除候補 | 未確認 |

## トリガー確認結果

本番実画面は未確認。正本上の想定トリガーは以下。

| 種別 | 関数 | 想定ファイル | 想定時刻 | 本番確認 |
|---|---|---|---|---|
| 日次 | `saveInvoicesFromGmail_v3` | `invoice_email_saver_v3.gs` | 8:00 | 未確認 |
| 日次 | `processReceiptEmails` | `receipt_email_processor.gs` | 9:00 | 未確認 |
| 日次 | `processPurchaseEmails` | `auto_inventory_logger.gs` | 10:00 / 22:00 | 未確認 |
| 日次 | `processScreenshots` | `auto_inventory_logger.gs` | 21:00 | 未確認 |
| 日次 | `runAutoSorterWithRename` | `auto_file_renamer.gs` + `auto_file_sorter.gs` | 23:00 | 未確認 |
| 月次 | `collectTaxDocuments` | `dashboard_manager.gs` 経由 | 7日 9:00 | 未確認 |
| 月次 | `collectEbayInvoices` | `dashboard_manager.gs` 経由 | 7日 10:00 | 未確認 |
| 月次 | `tallyMonthlyRewards` | `dashboard_manager.gs` 経由 | 7日 11:00 | 未確認 |
| 月次 | `checkInvoicesAndAlert` | `outsource_invoice_check.gs` | 11日 9:00 | 未確認 |
| 月次 | `checkTaxDocuments` | `tax_doc_checker.gs` | 15日 9:00 | 未確認 |

## Script Properties確認結果

未確認。

理由:

- このAlf環境から、値を表示せずキー名だけ安全に取得できる認証済み経路が見つからなかった。
- Script Propertiesの値にはAPIキー、トークン、通知先などが含まれる可能性があるため、ブラウザ画面や生データを無理に取得しない方針とした。

## ダッシュボード/メニュー確認結果

未確認。

確認したい項目:

- `onOpen` メニューの有無
- システム管理ダッシュボードの有無
- 手動実行ボタンの有無
- 最終実行日時の表示
- エラー/ログ表示の有無

## 次に実行してよいテスト案

本番GAS画面を確認できる状態になった後でも、最初は以下の読み取りだけにする。

1. GASエディタのファイル一覧を目視確認し、ファイル名だけ記録する。
2. トリガー画面を開き、関数名、実行頻度、時刻だけ記録する。
3. Script Properties画面ではキー名だけ確認し、値は開かない/保存しない。
4. スプレッドシートを開き、メニュー名とダッシュボードシート名だけ確認する。
5. 不要候補4ファイルは存在確認だけ行い、削除しない。

## 実行前に三神さん確認が必要なこと

- `clasp` を導入してGoogleアカウント認証するか。
- ブラウザで本番GASを開き、三神さん操作または画面共有でファイル名・トリガーだけ確認するか。
- Script Propertiesのキー名確認を誰が行うか。
- スクリーンショットを保存する場合、値や個人情報が写らないようにマスクする運用にするか。
- 次段階で、ドライラン関数や読み取り系関数を実行してよいか。

## Fayへ戻す内容

- A-001は開始済みだが、Alf環境から本番GASへ認証済み読み取りアクセスできず、実体確認は未完了。
- 削除・変更・実行・トリガー変更・Drive操作・Script Properties値保存は行っていない。
- 次は、三神さんがブラウザでGAS画面を開いて目視確認するか、`clasp` 等の読み取り用認証経路を整える必要がある。
