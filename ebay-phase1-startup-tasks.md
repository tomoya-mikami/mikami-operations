# eBay Phase1 起動・確認タスク

最終更新: 2026-05-25

## 目的

eBay業務自動化 Phase1 の本番GASを、壊さずに状態確認・起動確認・次のWebダッシュボード仕様化へ進めるためのチェックリスト。

参照元:

- `/Users/tomoya/Documents/Claude/Projects/eBay業務自動化Phase1/引き継ぎ_Phase1全システム.md`
- `/Users/tomoya/Documents/Claude/Projects/eBay業務自動化Phase1/引き継ぎ_GAS詳細_Part1.md`
- `/Users/tomoya/Documents/Claude/Projects/eBay業務自動化Phase1/引き継ぎ_GAS詳細_Part2.md`
- `/Users/tomoya/Documents/Claude/Projects/eBay業務自動化Phase1/引き継ぎ_GAS詳細_Part3.md`

## 結論

Phase1は本番稼働中。Alfでやるべきことは、新規変更ではなく以下。

1. 本番GAS 12ファイルとトリガー状態を確認する。
2. Script Propertiesの存在だけ確認し、値は表示・保存しない。
3. 手動メニューとダッシュボードの状態を確認する。
4. Webダッシュボード仕様書を作る。
5. 不要候補4ファイルの削除は、三神さん確認まで実行しない。

## 絶対禁止

- スプレッドシート行を `deleteRow` で削除しない。
- Script Propertiesの値を表示、保存、貼り付けしない。
- Chatwork/APIトークン、Claude/Gemini APIキー、ルームIDを正本に書かない。
- GAS本番12ファイルを勝手に削除しない。
- 不要候補4ファイルも、三神さん確認なしに削除しない。
- Google Drive上のファイル削除・移動は三神さん確認なしに行わない。

## 起動確認

| 順番 | 確認項目 | やること | 結果の残し方 |
|---|---|---|---|
| 1 | GASプロジェクト | 本番ファイル12件と不要候補4件の存在を確認 | ファイル名だけ記録 |
| 2 | Script Properties | 必要キーが存在するかだけ確認 | 値は記録しない |
| 3 | トリガー | 日次・月次・在庫ログ系のトリガーを確認 | 関数名と時刻のみ記録 |
| 4 | `dashboard_manager.gs` | スプレッドシート起動時メニューとシステム管理シートを確認 | 動作可否を記録 |
| 5 | 通知系 | Chatwork/メール通知の疎通は必要時のみテスト | トークン/宛先は記録しない |
| 6 | フォルダ構成 | 投げ込み、月次、要確認、eBay売上、サブスク等を確認 | フォルダ名だけ記録 |

## トリガー確認対象

| 種別 | 関数 | ファイル | 時刻 |
|---|---|---|---|
| 日次 | `saveInvoicesFromGmail_v3` | `invoice_email_saver_v3.gs` | 8:00 |
| 日次 | `processReceiptEmails` | `receipt_email_processor.gs` | 9:00 |
| 日次 | `processPurchaseEmails` | `auto_inventory_logger.gs` | 10:00 / 22:00 |
| 日次 | `processScreenshots` | `auto_inventory_logger.gs` | 21:00 |
| 日次 | `runAutoSorterWithRename` | `auto_file_renamer.gs` + `auto_file_sorter.gs` | 23:00 |
| 月次 | `collectTaxDocuments` | `dashboard_manager.gs` 経由 | 7日 9:00 |
| 月次 | `collectEbayInvoices` | `dashboard_manager.gs` 経由 | 7日 10:00 |
| 月次 | `tallyMonthlyRewards` | `dashboard_manager.gs` 経由 | 7日 11:00 |
| 月次 | `checkInvoicesAndAlert` | `outsource_invoice_check.gs` | 11日 9:00 |
| 月次 | `checkTaxDocuments` | `tax_doc_checker.gs` | 15日 9:00 |

メモ: 旧要約では「9本のトリガー」と表現されているが、詳細引き継ぎでは在庫ログ系を含めて11スケジュールが記載されている。数え方の差分として扱い、Alfで実画面確認する。

## 本番12ファイル

| ファイル | 役割 | 状態 |
|---|---|---|
| `dashboard_manager.gs` | メニュー、システム管理、トリガー管理 | 稼働中 |
| `tax_doc_checker.gs` | 税理士提出書類チェック | 稼働中 |
| `auto_file_sorter.gs` | 投げ込みフォルダ自動振り分け | 稼働中 |
| `auto_file_renamer.gs` | OCR金額照合と自動リネーム | 稼働中 |
| `auto_inventory_logger.gs` | 購入メール/スクショ解析による在庫ログ | 稼働中 |
| `invoice_email_saver_v3.gs` | 請求書メール添付保存 | 稼働中 |
| `ebay_yen_converter.gs` | eBay円貨換算、MURC TTM取得 | 稼働中 |
| `ebay_doc_processor.gs` | eBay書類取り込み | 稼働中 |
| `receipt_email_processor.gs` | 領収書メール処理 | 稼働中 |
| `restore_tax_doc_master.gs` | 69項目チェックリスト復元 | 手動のみ |
| `screenshot_data_extractor.gs` | スクショ/CSV/OCRデータ抽出 | 稼働中 |
| `outsource_invoice_check.gs` | 外注請求書チェック | 稼働中 |

## 不要候補4ファイル

| ファイル | 判断 |
|---|---|
| `コード.gs` | 削除候補。ただし確認待ち |
| `outsource_tally.gs` | `outsource_invoice_check.gs` に統合済み。削除候補 |
| `update_keywords_and_resort.gs` | `restore_tax_doc_master.gs` に役割移行済み。削除候補 |
| `auto_invoice_bridge.gs` | v2からv3移行用。削除候補 |

## 次に作るもの

最優先はManus AI向けWebダッシュボード仕様書。

入れる内容:

- 税理士提出書類チェック結果をブラウザ表示する。
- ブラウザから安全な手動実行を行えるようにする。
- 請求書の追加/削除管理を設計する。
- ファイル名から書類種別を自動判定する。
- 実ファイル削除、GASファイル削除、Script Properties変更は確認必須にする。

## 要対応期限があるもの

- 6期対応: 決算月7月のため、2026年7月中に `ebay_yen_converter.gs` の月列マッピングを確認する。
- MURC TTM: MURCサイト構造変更時の代替取得・フォールバックを検討する。
- JREバンクOCR: 現在スキップ設定。必要になったらOCRパーサー改善。
