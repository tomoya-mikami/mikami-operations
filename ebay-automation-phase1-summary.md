# eBay業務自動化 Phase1 取り込み要約

最終更新: 2026-05-25

## 目的

旧プロジェクト `eBay業務自動化Phase1` から受け取った引き継ぎ目次を、`mikami-operations` の正本へ取り込むための中間メモです。

請求書、領収書、税理士提出書類、eBayインボイス、外注報酬、在庫ログなど、Google Apps Scriptで稼働中の自動化群を管理する。

## 取り込みID

- `chat-import-ledger.md`: I-009
- `delegated-tasks.md`: T-020
- `projects.md`: P-009

## 現在の判定

| 項目 | 判定 |
|---|---|
| 分類 | ツール / eBay業務自動化 / GAS / 税理士提出書類 |
| 重要度 | 高 |
| 緊急度 | 中 |
| 状態 | 進行中 / 一部機密あり |
| Alf依頼 | 必要 |

## 全体像

Phase1は、eBay業務と税理士提出書類まわりのGAS自動化群。

主な対象:

- 請求書メール自動保存。
- 税理士書類自動収集。
- eBayインボイス管理。
- 外注報酬自動集計。
- 外注請求書チェックとChatworkアラート。
- システム管理ダッシュボード。
- 領収書メール自動処理。
- 書類自動振り分け。
- eBay書類取り込み。
- ファイル自動リネーム。
- 在庫ログ自動記録。
- スクリーンショット/CSVデータ抽出。

## Phase1 基本6システム

2026-04-07完了。

| # | システム名 | トリガー | スクリプト |
|---|---|---|---|
| 1 | 請求書メール自動保存 v3 | 毎日 8:00 | `invoice_email_saver_v3.gs` |
| 2 | 税理士書類自動収集 | 毎月7日 9:00 | `dashboard_manager.gs` 内 |
| 3 | eBayインボイス管理 | 毎月7日 10:00 | `ebay_yen_converter.gs` |
| 4 | 外注報酬自動集計 | 毎月7日 11:00 | `outsource_invoice_check.gs` |
| 5 | 外注請求書チェックとChatworkアラート | 毎月11日 9:00 | `outsource_invoice_check.gs` |
| 6 | システム管理ダッシュボード | 手動メニュー | `dashboard_manager.gs` |

## 強化3件

2026-04-08完了。

| # | 機能 | トリガー | スクリプト |
|---|---|---|---|
| 強化1 | 税理士提出書類チェックとChatwork通知 | 毎月15日 9:00 | `tax_doc_checker.gs` |
| 強化2 | 領収書メール自動処理 | 毎日 9:00 | `receipt_email_processor.gs` |
| 強化3 | 書類自動振り分け | 毎日 23:00 | `auto_file_sorter.gs` |

## 追加機能

2026-04から2026-05にかけて決定済み。

| 機能 | 状態 | スクリプト |
|---|---|---|
| eBay書類取り込み | 決定済み | `ebay_doc_processor.gs` |
| ファイル自動リネーム | 決定済み | `auto_file_renamer.gs` |
| 在庫ログ自動記録 | 決定済み | `auto_inventory_logger.gs` |
| スクリーンショット/CSVデータ抽出 | 決定済み | `screenshot_data_extractor.gs` |
| チェックリスト自動復元 | 決定済み | `restore_tax_doc_master.gs` |

## 本番GAS 12ファイル

| ファイル名 | 役割 |
|---|---|
| `dashboard_manager.gs` | メニュー、ボタンUI、onOpen |
| `tax_doc_checker.gs` | 税理士提出書類チェックとレポート |
| `auto_file_sorter.gs` | 書類自動振り分け、OCR月判定含む |
| `auto_file_renamer.gs` | ファイル自動リネーム |
| `auto_inventory_logger.gs` | 在庫ログ |
| `invoice_email_saver_v3.gs` | 請求書メール自動保存 |
| `ebay_yen_converter.gs` | eBay円貨換算 |
| `ebay_doc_processor.gs` | eBay書類取り込み、OCR判別 |
| `receipt_email_processor.gs` | 領収書メール自動処理 |
| `restore_tax_doc_master.gs` | チェックリスト復元 |
| `screenshot_data_extractor.gs` | スクリーンショット/CSV解析 |
| `outsource_invoice_check.gs` | 外注請求書チェック |

## 主要リソース

以下は運用上のリソースID。APIトークンやChatworkルームIDではないが、取り扱いは社内限定。

### スプレッドシート

| 名称 | ID |
|---|---|
| eBay業務管理マスター | `1SyBOyddLedhQfQL70E7dbuhfspO4NrxUTLqq4rSVujU` |
| eBay売上一覧表 | `1QQ_sQ2X-dQvhiqXIi9AfgKmaR1NzaSv8uwMKkXE5Fn0` |
| 円換算スプレッドシート | `1qPzUJHzEGHy_gx-9wDMOAvjmJdQDCfxtl3R1lmUu6CI` |

### Google Driveフォルダ

| 名称 | ID |
|---|---|
| 01_請求書メール | `1_G8BBfe-jkA7BOyytVbZjJ5KGJJqxXoe` |
| 02_外注管理 | `1jfEgSMfJ0K0SeN_S_Kq3qagnBtS-3nET` |
| 03_eBayインボイス | `15Lh3C1_XY48UeiSlZm9OvXTkzNwW9-yK` |
| 04_税理士提出用 | `1rAmHVBTE7ykyx5cgBmPM0RwgoCbDT31E` |
| メルカード利用明細 | `1_UtBZHAboOAG3LWI62yl4siZQDpviRDN` |
| 税理士共有の毎月提出書類 | `1Un0HZrw7QYdRXEm7USUlhk7FlOzSorRN` |
| 外注費一覧 | `171VgCc8nB_ipn8OL5VOxCP-yUtG4l3a_` |
| 第5期税理士共有フォルダ | `1e2vWCbSL_AF8XfSqRg5fJk9J65JPOhJX` |

### GASプロジェクト

| 項目 | 値 |
|---|---|
| プロジェクトID | `1pT-zVau4y54GsXmFzgIweETGvAuKymK_IzCxBVcfAez7mSwyj0D6KcTA` |

## 絶対ルール

- スプレッドシートの既存データ行を `deleteRow` で削除しない。
  - P/Q列に手入力メモがあり、行ズレで壊れるため。
  - セル単位の上書きで対応する。
- `GmailApp.search()` で日本語ラベルを `-label:` フィルタに使わない。
  - `receipt_processed` など英語ラベルを使う。
- 操作指示は、ファイル名と関数名を明記する。
  - 例: `receipt_email_processor.gs` の `関数名()` を実行。

## 技術メモ

- MURC TTMレート取得は `past/index.php?id=YYMMDD` を使う。
- 休日は前営業日へフォールバックする。
- メルカードCSVはMoneyForward MEの `収入・支出詳細_YYYY-MM-DD_YYYY-MM-DD.csv` 形式。
- 税理士提出書類マスターリストは69項目で、`restore_tax_doc_master.gs` で復元可能。
- eBayアカウント名は正本ファイルには保存しない。必要時は安全な原資料で確認する。

## 未完了タスク

| タスク | 状態 | 備考 |
|---|---|---|
| GASエディタから不要4ファイル削除 | 保留 | 実害なし。削除は手動、確認必須 |
| Webダッシュボード構築 | 作業中 | Manus AI用プロンプト作成が次ステップ |
| Webダッシュボードに請求書管理機能追加 | 新規要望 | 請求書の追加/削除、ファイル名からの書類種別自動判定を含む |

不要候補ファイル:

- `コード.gs`
- `outsource_tally.gs`
- `update_keywords_and_resort.gs`
- `auto_invoice_bridge.gs`

## 次アクション

1. Manus AIへ渡すWebダッシュボード仕様書を作成する。
2. 仕様書には以下を含める。
   - 税理士提出書類チェック結果のブラウザ表示。
   - ブラウザからの操作実行。
   - 請求書の追加/削除管理。
   - ファイル名パターンからの書類種別自動判定。
3. 不要4ファイル削除は、三神さん確認後に手動実施する。

## 機密・保存禁止

以下は保存しない。

- Chatwork APIトークン。
- ChatworkルームID。
- 税理士事務所のメールアドレス。
- 外注スタッフの個人情報。
- eBayアカウント名。
- パスワード。
- 口座番号。
- マイナンバー。
- 顧客個人情報。
