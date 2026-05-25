# eBay業務自動化 Phase1 取り込み要約

最終更新: 2026-05-25

## 目的

旧プロジェクト `eBay業務自動化Phase1` から受け取った引き継ぎ目次を、`mikami-operations` の正本へ取り込むための中間メモです。

請求書、領収書、税理士提出書類、eBayインボイス、外注報酬、在庫ログなど、Google Apps Scriptで稼働中の自動化群を管理する。

## 取り込みID

- `chat-import-ledger.md`: I-009
- 詳細追記: I-013
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

## 2026-05-25 詳細引き継ぎ受領

以下4ファイルを受領し、I-013として詳細取り込みした。

- `/Users/tomoya/Documents/Claude/Projects/eBay業務自動化Phase1/引き継ぎ_Phase1全システム.md`
- `/Users/tomoya/Documents/Claude/Projects/eBay業務自動化Phase1/引き継ぎ_GAS詳細_Part1.md`
- `/Users/tomoya/Documents/Claude/Projects/eBay業務自動化Phase1/引き継ぎ_GAS詳細_Part2.md`
- `/Users/tomoya/Documents/Claude/Projects/eBay業務自動化Phase1/引き継ぎ_GAS詳細_Part3.md`

詳細な起動・確認タスクは `ebay-phase1-startup-tasks.md` を正本にする。

### 現在地

- Phase1は全システム完了・本番稼働中として扱う。
- 2026-04-07に基本完了、2026-04-08に強化完了、2026-05-07に最終整理完了。
- 旧要約では9本のトリガー、GAS詳細では在庫ログ系を含めた11スケジュールが記載されている。数え方の差分として扱い、実画面で確認する。
- 追加拡張のeBay書類OCR取り込み、スクリーンショット/CSV解析、在庫ログも実装・テスト済みとして扱う。

### 詳細トリガー

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

### 起動時に確認すること

- GASプロジェクトに本番12ファイルがあること。
- 不要候補4ファイルは削除せず、存在確認だけ行うこと。
- Script Propertiesは必要キーの存在だけ確認し、値を表示・保存しないこと。
- `dashboard_manager.gs` の `onOpen` メニューと「システム管理」シートを確認すること。
- `applyTriggerChanges` は、変更内容を理解したうえで実行すること。
- Chatwork/メール通知のテストは必要時のみ行い、トークンや宛先は保存しないこと。

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

### ファイル別の追加メモ

| ファイル | 追加メモ |
|---|---|
| `auto_file_sorter.gs` | 投げ込みフォルダをマスターリストのキーワードとOCR月判定で月次フォルダへ振り分ける。判定不能は `00_要確認` |
| `auto_file_renamer.gs` | Drive API OCRで金額を抽出し、領収書取得状況SSと照合してリネーム後に振り分けへ渡す |
| `auto_inventory_logger.gs` | Claude APIで購入メールを構造化し、Gemini Visionでスクショ解析。在庫シートへUpsert |
| `dashboard_manager.gs` | 全8システムのON/OFF、時間変更、手動実行ボタン、最終実行日時を管理 |
| `ebay_doc_processor.gs` | eBay書類PDF/CSVをOCRまたはファイル名で判定し、月次/eBay売上へ配置 |
| `ebay_yen_converter.gs` | MURC TTM取得、USD→JPY換算、Transaction ReportからPayoutシート作成 |
| `invoice_email_saver_v3.gs` | 件名キーワード12種、送信元ドメイン11種で請求書メールを検出。5分制限あり |
| `outsource_invoice_check.gs` | 毎月11日に請求書未提出スタッフを検出して通知 |
| `receipt_email_processor.gs` | 14サービス対応。処理済みラベルは英語 `receipt_processed` |
| `restore_tax_doc_master.gs` | 税理士提出書類リスト69項目を復元。実行すると既存データを上書きするため注意 |
| `screenshot_data_extractor.gs` | Drive API v3 OCRを使用。JREバンクは精度問題でスキップ状態 |
| `tax_doc_checker.gs` | 69項目と月次フォルダ内ファイルを照合し、レポートと通知を作る |

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
- コード修正を依頼する場合は、部分差分ではなく貼り替え可能な全文を出す。
- GASエディタ上の削除はブラウザ自動操作で保存されないことがある。削除は手動、かつ三神さん確認後に行う。

## 技術メモ

- MURC TTMレート取得は `past/index.php?id=YYMMDD` を使う。
- 休日は前営業日へフォールバックする。
- メルカードCSVはMoneyForward MEの `収入・支出詳細_YYYY-MM-DD_YYYY-MM-DD.csv` 形式。
- 税理士提出書類マスターリストは69項目で、`restore_tax_doc_master.gs` で復元可能。
- eBayアカウント名は正本ファイルには保存しない。必要時は安全な原資料で確認する。
- 5期は2025年8月から2026年7月。6期に入る前に `ebay_yen_converter.gs` の月列マッピングを確認する。
- `auto_inventory_logger.gs` はClaude API、Gemini Vision API、Chatwork APIに依存する。APIキーはScript Propertiesで管理する。
- Drive API OCRはv3を使う。

## 業務フロー

### 税理士提出書類

1. 毎日8:00に請求書メールを検出して保存する。
2. 毎日9:00にサブスク等の領収書メールをPDF化または添付保存する。
3. 毎日23:00に投げ込みフォルダのファイルをOCRリネームし、月次フォルダへ振り分ける。
4. 毎月7日に税理士書類収集、eBay円換算、外注報酬集計を行う。
5. 毎月11日に外注請求書未提出を通知する。
6. 毎月15日に69項目チェックリストと実ファイルを照合する。

### eBayインボイス

1. eBay Seller HubからFinancial Summary / Transaction Reportをダウンロードする。
2. 投げ込みフォルダのeBayサブフォルダへ配置する。
3. `ebay_doc_processor.gs` で書類種別とアカウントを判定し、月次/eBay売上へ配置する。
4. `ebay_yen_converter.gs` でMURC TTMを取得し、USDをJPYへ換算し、Payoutシートを作る。
5. `tax_doc_checker.gs` が毎月15日に提出状況を確認する。

### 在庫ログ

1. 毎日10:00/22:00に購入完了メールをClaude APIで解析し、在庫シートへUpsertする。
2. 毎日21:00にスクショをGemini Visionで解析し、出品者名・追跡番号を更新する。
3. 処理済みメールにラベルを付け、メールPDFをDrive保存する。

## 過去エラーと注意点

| 内容 | 対応 |
|---|---|
| 日本語Gmailラベルが `-label:` で動作しない | 英語ラベルへ変更 |
| MURC HTML構造変更 | セレクタ修正済み。今後も変更リスクあり |
| 行削除でP/Q列メモがズレた | `deleteRow` 禁止 |
| マスターリストが20項目に減少 | `restore_tax_doc_master.gs` で69項目へ復元 |
| GASエディタ削除が保存されない | 手動削除のみ有効 |
| Drive API OCR精度不足 | `00_要確認` で目視確認 |
| JREバンクOCR精度問題 | 現在スキップ設定 |

## 未完了タスク

| タスク | 状態 | 備考 |
|---|---|---|
| GASエディタから不要4ファイル削除 | 保留 | 実害なし。削除は手動、確認必須 |
| Webダッシュボード構築 | 作業中 | Manus AI用プロンプト作成が次ステップ |
| Webダッシュボードに請求書管理機能追加 | 新規要望 | 請求書の追加/削除、ファイル名からの書類種別自動判定を含む |
| 6期対応 | 要対応 | 2026年7月中に `getMonthColumn_()` の確認・更新が必要 |
| JREバンクOCR改善 | 保留 | 現在スキップ設定 |
| MURC耐性強化 | 保留 | HTML構造変更時の代替APIやフォールバック検討 |

不要候補ファイル:

- `コード.gs`
- `outsource_tally.gs`
- `update_keywords_and_resort.gs`
- `auto_invoice_bridge.gs`

## 2026-05-25 Alf整理結果

T-020として、Phase1の現行機能・禁止事項・未完了要望を整理した。現時点のGit作業ツリー内には本番GAS 12ファイルの実体はなく、正本Markdown上のファイル名、トリガー、絶対ルールを確認した段階。

確認できたこと:

- 本番GASは12ファイル構成として管理する。
- 基本6システムと強化3件は稼働中として扱い、勝手に変更しない。
- `deleteRow` 禁止、日本語Gmailラベルを `GmailApp.search()` の除外条件に使わない、実行指示は「ファイル名 + 関数名」形式にする。
- 不要候補4ファイルは、実害なし・削除確認待ちとして保留する。
- Webダッシュボード仕様書作成前に、現行機能、追加要望、実行可能操作、削除禁止範囲を分ける必要がある。

Webダッシュボード仕様書に入れるべき整理項目:

1. 税理士提出書類チェック結果の閲覧。
2. ブラウザから実行できる操作と、手動確認が必要な操作の分離。
3. 請求書追加/削除管理。ただし実ファイル削除は三神さん確認が必要。
4. ファイル名からの書類種別自動判定。
5. 既存GAS 12ファイルを変更せずに参照・補助する構成。

## 次アクション

1. `ebay-phase1-startup-tasks.md` に沿ってAlfで起動・トリガー・Script Properties存在確認を行う。
2. Manus AIへ渡すWebダッシュボード仕様書を作成する。
3. 仕様書には以下を含める。
   - 税理士提出書類チェック結果のブラウザ表示。
   - ブラウザからの操作実行。
   - 請求書の追加/削除管理。
   - ファイル名パターンからの書類種別自動判定。
4. 不要4ファイル削除は、三神さん確認後に手動実施する。
5. 2026年7月中に6期対応を確認する。

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
